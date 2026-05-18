#!/usr/bin/env python3
"""
Yanabiya — Self-hosted AI video generator (HeyGen-style).

Features:
  1. Text prompt → AI images from Pollinations.ai (FREE, no key).
  2. If prompt contains a URL → scrapes website, uses real images + content as
     narration script (e.g. "visit yanabiya.com and make a video about it").
  3. gTTS narration audio (FREE, no key).
  4. Ken-Burns animated MP4 with crossfade transitions.
  5. Muxes narration audio into the final video using bundled ffmpeg.

Usage:
  python3 generate_video.py \
      --prompt "visit https://yanabiya.com and make a corporate intro video" \
      --output /path/to/out.mp4 \
      --aspect 16:9 \
      --duration 20 \
      --style cinematic
"""

import argparse
import io
import json
import os
import re
import subprocess
import sys
import tempfile
import time
import traceback
import urllib.parse

try:
    import numpy as np
    import requests
    from PIL import Image
    import imageio.v2 as imageio
    import imageio_ffmpeg
    from bs4 import BeautifulSoup
    from gtts import gTTS
except ImportError as e:
    print(json.dumps({"ok": False, "error": f"Missing Python dep: {e}. Run: pip install -r requirements.txt"}))
    sys.exit(1)


ASPECT_DIMS = {
    "16:9": (1280, 720),
    "9:16": (720, 1280),
    "1:1":  (960, 960),
}

STYLE_KEYWORDS = {
    "cinematic":  "cinematic, dramatic lighting, film still, 35mm, depth of field",
    "realistic":  "photorealistic, hyperdetailed, 4k, sharp focus, natural light",
    "animation":  "animated, illustration, stylised, vibrant colors, smooth",
    "3d":         "3D render, octane, unreal engine, volumetric lighting, ultra detailed",
}

URL_RE = re.compile(r"https?://[^\s,]+", re.IGNORECASE)

USER_AGENT = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"


# ─── Website scraping ────────────────────────────────────────────────────────

def scrape_site(url: str) -> dict:
    """Fetch a webpage and extract title, description, images, and key text."""
    try:
        r = requests.get(url, timeout=20, headers={"User-Agent": USER_AGENT})
        r.raise_for_status()
    except Exception as e:
        return {"ok": False, "error": str(e), "url": url}

    soup = BeautifulSoup(r.text, "lxml")

    title = (soup.title.string or "").strip() if soup.title else ""

    def meta(prop):
        tag = soup.find("meta", attrs={"property": prop}) or soup.find("meta", attrs={"name": prop})
        return tag.get("content", "").strip() if tag else ""

    og_title       = meta("og:title")       or title
    og_description = meta("og:description") or meta("description")
    og_image       = meta("og:image")

    h1 = soup.find("h1")
    h1_text = h1.get_text(" ", strip=True) if h1 else ""

    # Extract first few paragraphs of substantive content
    paragraphs = []
    for p in soup.find_all("p"):
        text = p.get_text(" ", strip=True)
        if len(text) > 60:
            paragraphs.append(text)
        if len(paragraphs) >= 5:
            break

    # Collect image candidates
    images = []
    if og_image:
        images.append(urllib.parse.urljoin(url, og_image))
    for img in soup.find_all("img"):
        src = img.get("src") or img.get("data-src")
        if src and not src.startswith("data:"):
            images.append(urllib.parse.urljoin(url, src))
        if len(images) >= 8:
            break
    # Dedupe preserving order
    seen = set(); images_unique = []
    for u in images:
        if u not in seen:
            seen.add(u); images_unique.append(u)

    return {
        "ok": True,
        "url": url,
        "title": og_title[:200],
        "description": og_description[:500],
        "h1": h1_text[:200],
        "paragraphs": paragraphs[:5],
        "images": images_unique[:8],
    }


def build_narration_from_site(site: dict, user_prompt: str) -> str:
    """Compose a 30-90 word narration script from scraped site content."""
    parts = []
    if site.get("title"):
        parts.append(site["title"].rstrip("."))
    if site.get("description"):
        parts.append(site["description"].rstrip("."))
    elif site.get("paragraphs"):
        # Take first short paragraph
        for p in site["paragraphs"]:
            if 40 < len(p) < 400:
                parts.append(p.rstrip("."))
                break
    # Trim to ~90 words total
    text = ". ".join(parts).replace("\n", " ").replace("\r", " ").strip()
    words = text.split()
    if len(words) > 90:
        text = " ".join(words[:90]) + "."
    if not text:
        text = user_prompt
    return text


# ─── Image fetching ──────────────────────────────────────────────────────────

def fetch_pollinations_image(prompt: str, w: int, h: int, seed: int) -> Image.Image:
    enc = urllib.parse.quote(prompt)
    url = (f"https://image.pollinations.ai/prompt/{enc}"
           f"?width={w}&height={h}&seed={seed}&nologo=true&enhance=true")
    r = requests.get(url, timeout=120, headers={"User-Agent": USER_AGENT})
    r.raise_for_status()
    return Image.open(io.BytesIO(r.content)).convert("RGB")


def fetch_remote_image(url: str, w: int, h: int) -> Image.Image | None:
    try:
        r = requests.get(url, timeout=30, headers={"User-Agent": USER_AGENT})
        r.raise_for_status()
        img = Image.open(io.BytesIO(r.content)).convert("RGB")
        # Filter out tiny icons (logos < 200px)
        if min(img.size) < 200:
            return None
        return img
    except Exception:
        return None


# ─── Animation ───────────────────────────────────────────────────────────────

def ken_burns_frames(img: Image.Image, w: int, h: int, n_frames: int, zoom_in: bool) -> list:
    iw, ih = img.size
    scale = max(w / iw, h / ih)
    nw, nh = int(iw * scale), int(ih * scale)
    img = img.resize((nw, nh), Image.LANCZOS)
    iw, ih = img.size

    frames = []
    for i in range(n_frames):
        t = i / max(n_frames - 1, 1)
        zoom = (1.0 + 0.08 * t) if zoom_in else (1.08 - 0.08 * t)
        cw, ch = int(w / zoom), int(h / zoom)
        cx = int((iw - cw) * (0.4 + 0.2 * t))
        cy = int((ih - ch) * (0.4 + 0.2 * t))
        cx = max(0, min(cx, iw - cw))
        cy = max(0, min(cy, ih - ch))
        crop = img.crop((cx, cy, cx + cw, cy + ch)).resize((w, h), Image.LANCZOS)
        frames.append(np.array(crop))
    return frames


def crossfade(frames_a: list, frames_b: list, n_overlap: int) -> list:
    if not frames_b:
        return frames_a
    if n_overlap <= 0 or len(frames_a) < n_overlap or len(frames_b) < n_overlap:
        return frames_a + frames_b
    out = list(frames_a[:-n_overlap])
    for i in range(n_overlap):
        alpha = (i + 1) / (n_overlap + 1)
        a = frames_a[-n_overlap + i].astype(np.float32)
        b = frames_b[i].astype(np.float32)
        out.append((a * (1 - alpha) + b * alpha).astype(np.uint8))
    out.extend(frames_b[n_overlap:])
    return out


# ─── TTS narration ───────────────────────────────────────────────────────────

def generate_narration_mp3(text: str, out_path: str, lang: str = "en", voice: str = "nova") -> bool:
    """Generate narration audio.

    Tries Pollinations openai-audio (much higher quality, sounds natural) first;
    falls back to gTTS if Pollinations fails.
    """
    # Attempt 1: Pollinations openai-audio (free, no key, natural voices)
    try:
        enc = urllib.parse.quote(text[:1500])
        url = f"https://text.pollinations.ai/{enc}?model=openai-audio&voice={voice}"
        r = requests.get(url, timeout=60, headers={"User-Agent": USER_AGENT})
        if r.ok and len(r.content) > 1024:
            with open(out_path, "wb") as f:
                f.write(r.content)
            return True
    except Exception as e:
        print(f"# Pollinations TTS failed: {e}", file=sys.stderr)

    # Attempt 2: gTTS fallback
    try:
        tts = gTTS(text=text, lang=lang, slow=False)
        tts.save(out_path)
        return os.path.exists(out_path) and os.path.getsize(out_path) > 0
    except Exception as e:
        print(f"# gTTS fallback failed: {e}", file=sys.stderr)
        return False


# ─── Audio + video muxing ────────────────────────────────────────────────────

def mux_audio_into_video(video_path: str, audio_path: str, out_path: str) -> bool:
    ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
    cmd = [
        ffmpeg, "-y",
        "-i", video_path,
        "-i", audio_path,
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-map", "0:v:0",
        "-map", "1:a:0",
        "-shortest",
        out_path,
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if result.returncode != 0:
            print(f"# ffmpeg mux failed: {result.stderr[-500:]}", file=sys.stderr)
            return False
        return True
    except Exception as e:
        print(f"# ffmpeg mux error: {e}", file=sys.stderr)
        return False


# ─── Main generation pipeline ────────────────────────────────────────────────

def generate_video(prompt: str, out_path: str, aspect: str, duration: int,
                   style: str, fps: int = 24) -> dict:
    w, h = ASPECT_DIMS.get(aspect, ASPECT_DIMS["16:9"])
    style_extra = STYLE_KEYWORDS.get(style.lower(), STYLE_KEYWORDS["cinematic"])

    # 1) Detect URLs and scrape
    site = None
    urls_found = URL_RE.findall(prompt)
    if urls_found:
        site = scrape_site(urls_found[0])

    # 2) Build prompt + narration
    if site and site.get("ok"):
        narration = build_narration_from_site(site, prompt)
        # AI image prompt augmented with site context
        ai_prompt = f"{site['title']}, {site.get('description', '')}, {style_extra}"
        site_images = site.get("images", [])
    else:
        narration = prompt
        ai_prompt = f"{prompt}, {style_extra}"
        site_images = []

    # Number of slides — based on duration (one image per ~5 seconds)
    n_total = max(2, min(8, duration // 4))

    # Mix: use site images first (if any), fill rest with AI-generated
    images: list = []
    for url in site_images:
        if len(images) >= n_total:
            break
        img = fetch_remote_image(url, w, h)
        if img is not None:
            images.append(img)

    while len(images) < n_total:
        seed = int(time.time() * 1000) % 100000 + len(images) * 17
        try:
            img = fetch_pollinations_image(ai_prompt, w, h, seed)
            images.append(img)
        except Exception as e:
            print(f"# Pollinations fail (image {len(images)}): {e}", file=sys.stderr)
            images.append(Image.new("RGB", (w, h), (15, 56, 35)))

    # 3) Generate TTS narration MP3
    tmp_dir = tempfile.mkdtemp(prefix="yanabiya_")
    audio_path = os.path.join(tmp_dir, "narration.mp3")
    has_audio = generate_narration_mp3(narration, audio_path)

    # Decide target duration: if we have audio, match its length; else use requested duration
    target_duration = duration
    if has_audio:
        try:
            ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
            ffprobe_cmd = [ffmpeg, "-i", audio_path, "-f", "null", "-"]
            r = subprocess.run(ffprobe_cmd, capture_output=True, text=True, timeout=30)
            m = re.search(r"Duration: (\d+):(\d+):(\d+\.\d+)", r.stderr)
            if m:
                hours, mins, secs = int(m.group(1)), int(m.group(2)), float(m.group(3))
                target_duration = max(duration, int(hours * 3600 + mins * 60 + secs) + 1)
        except Exception:
            pass

    # 4) Build video frames
    frames_per_image = max(1, (target_duration * fps) // len(images))
    overlap = min(int(fps * 0.8), frames_per_image // 3)

    all_frames: list = []
    for i, img in enumerate(images):
        seg = ken_burns_frames(img, w, h, frames_per_image, zoom_in=(i % 2 == 0))
        all_frames = crossfade(all_frames, seg, overlap)

    # 5) Write silent video first
    silent_path = out_path if not has_audio else os.path.join(tmp_dir, "silent.mp4")
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    writer = imageio.get_writer(
        silent_path,
        fps=fps,
        codec="libx264",
        quality=8,
        macro_block_size=1,
        ffmpeg_log_level="error",
    )
    try:
        for f in all_frames:
            writer.append_data(f)
    finally:
        writer.close()

    # 6) Mux audio in if we have it
    has_final_audio = False
    if has_audio:
        if mux_audio_into_video(silent_path, audio_path, out_path):
            has_final_audio = True
        else:
            # Fallback: keep silent video
            import shutil
            shutil.copy(silent_path, out_path)

    # Cleanup temp files
    try:
        if os.path.exists(audio_path): os.remove(audio_path)
        if silent_path != out_path and os.path.exists(silent_path): os.remove(silent_path)
        os.rmdir(tmp_dir)
    except Exception:
        pass

    return {
        "ok": True,
        "path": out_path,
        "frames": len(all_frames),
        "duration_sec": len(all_frames) / fps,
        "images_used": len(images),
        "site_images": len([1 for u in site_images if site_images]),
        "resolution": f"{w}x{h}",
        "has_audio": has_final_audio,
        "narration_chars": len(narration),
        "scraped_url": site["url"] if site and site.get("ok") else None,
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--prompt",   required=True)
    p.add_argument("--output",   required=True)
    p.add_argument("--aspect",   default="16:9", choices=["16:9", "9:16", "1:1"])
    p.add_argument("--duration", type=int, default=10)
    p.add_argument("--style",    default="cinematic")
    p.add_argument("--fps",      type=int, default=24)
    args = p.parse_args()

    try:
        result = generate_video(
            prompt=args.prompt,
            out_path=args.output,
            aspect=args.aspect,
            duration=args.duration,
            style=args.style,
            fps=args.fps,
        )
        print(json.dumps(result))
        sys.exit(0)
    except Exception as e:
        traceback.print_exc(file=sys.stderr)
        print(json.dumps({"ok": False, "error": str(e)}))
        sys.exit(1)


if __name__ == "__main__":
    main()
