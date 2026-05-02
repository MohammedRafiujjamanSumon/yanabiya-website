import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight, Handshake, Building2, Cpu, Globe2, Truck, Briefcase, Users,
  HeartHandshake, Sparkles, Compass, Download,
} from 'lucide-react'
import GlobalOverviewPanel from '../components/GlobalOverviewPanel'
import { assets } from '../data/assets'

/* ──────────────────────────────────────────────────────────────────────
 * Hero — auto-cycling 7-scene cinematic hero
 *
 * Mirrors the corporate-video brief:
 *   01 OPENING       · "Connecting Businesses Across Borders"
 *   02 ABOUT         · "A dynamic group of companies …"
 *   03 SERVICES      · "Complete business solutions …"
 *   04 PARTNERS      · "Trusted by partners worldwide …"
 *   05 COMMUNITY     · "Growth beyond business …"
 *   06 LEADERSHIP    · "Visionary leadership …"
 *   07 CLOSING       · "Building the Future, Together."
 *
 * Each scene auto-advances every ~7.5s. Hovering the hero pauses the
 * cycle (matching the chat-dock UX). A tiny play/pause toggle and
 * clickable progress dots sit at the bottom-right for manual control.
 * ──────────────────────────────────────────────────────────────────── */

const SCENE_MS = 4500

type Scene = {
  id: string
  eyebrow: string
  headline: string
  body: string
  /** Real-life background photo (Unsplash) — full-bleed, dark-overlay-on-top. */
  photo: string
  /** Photo focal area (CSS object-position). */
  photoPos?: string
  /** SVG / icon "motion overlay" sitting on top of the photo. */
  Visual: () => JSX.Element
  /** Per-scene primary CTA — links to the matching landing section
   *  or detail page so the video scene becomes navigation. */
  cta: { label: string; href: string }
}

/* ─────────── Scene visuals (each ~40-80 lines of SVG/CSS) ─────────── */

const PINS = [
  { x: 62, y: 38, hub: true,  label: 'Muscat' },
  { x: 47, y: 22, hub: false, label: 'London' },
  { x: 75, y: 36, hub: false, label: 'Dhaka'  },
  { x: 22, y: 32, hub: false, label: 'Austin' },
]

function Continents() {
  return (
    <g
      fill="rgba(158,199,58,0.06)"
      stroke="rgba(158,199,58,0.32)"
      strokeWidth="0.14"
      strokeLinejoin="round"
    >
      <path d="M 6 14 Q 16 9 26 12 L 30 18 Q 32 22 28 26 L 22 30 Q 16 32 12 30 L 8 26 Q 5 20 6 14 Z" />
      <path d="M 24 32 L 30 32 L 32 38 L 30 46 L 26 50 L 22 46 L 22 38 Z" />
      <path d="M 44 14 Q 50 12 54 14 L 56 18 Q 54 22 50 22 L 44 22 L 42 18 Z" />
      <path d="M 47 24 L 56 24 L 58 30 L 58 38 L 54 46 L 50 50 L 46 46 L 44 38 L 45 30 Z" />
      <path d="M 58 26 L 64 26 L 66 32 L 64 36 L 60 36 L 58 32 Z" />
      <path d="M 56 10 Q 70 8 84 10 L 88 14 L 86 18 L 70 18 L 60 16 L 56 14 Z" />
      <path d="M 70 20 L 82 20 L 84 26 L 80 30 L 74 30 L 72 26 Z" />
      <path d="M 70 28 L 76 28 L 78 34 L 74 38 L 71 36 Z" />
      <path d="M 82 40 L 92 40 L 94 46 L 90 48 L 84 46 Z" />
    </g>
  )
}

/* 01 — OPENING: world map + arc beams from Oman HQ to branches */
function SceneOpening() {
  const hub = PINS[0]
  const branches = PINS.slice(1)
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 56"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-30"
      >
        <Continents />
      </svg>
      {/* Beams */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 56"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full overflow-visible"
      >
        {branches.map((b, i) => {
          const mx = (hub.x + b.x) / 2
          const my = Math.min(hub.y, b.y) - Math.abs(b.x - hub.x) * 0.18
          const path = `M ${hub.x} ${hub.y} Q ${mx} ${my}, ${b.x} ${b.y}`
          return (
            <g key={i}>
              <path d={path} fill="none" stroke="rgba(158,199,58,0.28)" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
              <path
                d={path}
                fill="none"
                stroke="rgba(158,199,58,0.95)"
                strokeWidth="0.32"
                strokeLinecap="round"
                className="animate-svg-flow"
                style={{ animationDelay: `${i * 0.55}s`, animationDuration: '4s' }}
              />
            </g>
          )
        })}
      </svg>
      {/* Pins */}
      {PINS.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute"
          style={{ left: `${p.x}%`, top: `${(p.y / 56) * 100}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <span
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                          ${p.hub ? 'w-12 h-12 bg-brand-accent/45' : 'w-8 h-8 bg-brand-accent/35'}`}
              style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.3}s infinite` }}
            />
            <span
              className={`relative block rounded-full ring-2
                          ${p.hub
                            ? 'w-3 h-3 bg-brand-accent ring-white/70 shadow-[0_0_12px_rgba(158,199,58,0.9)]'
                            : 'w-2 h-2 bg-brand-accent ring-white/50 shadow-[0_0_8px_rgba(158,199,58,0.7)]'}`}
            />
          </div>
        </div>
      ))}
    </>
  )
}

/* 02 — ABOUT: office building silhouettes + grid */
function SceneAbout() {
  return (
    <>
      <svg
        aria-hidden="true"
        viewBox="0 0 100 56"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full opacity-40"
      >
        {/* Skyline silhouettes */}
        <g fill="rgba(158,199,58,0.18)" stroke="rgba(158,199,58,0.42)" strokeWidth="0.12">
          <rect x="6"  y="32" width="6"  height="20" />
          <rect x="13" y="28" width="5"  height="24" />
          <rect x="19" y="34" width="4"  height="18" />
          <rect x="24" y="22" width="6"  height="30" />
          <rect x="31" y="30" width="4"  height="22" />
          <rect x="36" y="26" width="6"  height="26" />
          <rect x="43" y="20" width="7"  height="32" />
          <rect x="51" y="28" width="5"  height="24" />
          <rect x="57" y="24" width="6"  height="28" />
          <rect x="64" y="32" width="4"  height="20" />
          <rect x="69" y="26" width="6"  height="26" />
          <rect x="76" y="30" width="5"  height="22" />
          <rect x="82" y="22" width="7"  height="30" />
          <rect x="90" y="32" width="5"  height="20" />
        </g>
        {/* Window dots — random office lights */}
        <g fill="rgba(255,235,180,0.6)">
          {[
            [8, 36], [10, 42], [14, 32], [16, 40], [20, 38], [25, 26], [27, 32], [29, 40],
            [32, 34], [37, 30], [40, 38], [44, 24], [46, 32], [48, 40], [52, 32], [54, 38],
            [58, 28], [61, 36], [65, 36], [70, 30], [72, 38], [77, 34], [83, 26], [86, 34],
            [88, 42], [91, 36], [93, 44],
          ].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="0.4" />
          ))}
        </g>
      </svg>
      {/* Grid overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(158,199,58,0.18) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(158,199,58,0.18) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </>
  )
}

/* 03 — SERVICES: 6 service icons in a circular constellation */
function SceneServices() {
  const SERVICE_ICONS = [
    { Icon: Cpu,       label: 'Tech & Software', angle: -90 },
    { Icon: Globe2,    label: 'Export & Import Business',     angle: -30 },
    { Icon: Truck,     label: 'Logistics',        angle: 30  },
    { Icon: Briefcase, label: 'Consulting',       angle: 90  },
    { Icon: Building2, label: 'Office Services',  angle: 150 },
    { Icon: Users,     label: 'Mobility',         angle: 210 },
  ]
  const radius = 28  // % of half-width
  return (
    <>
      {/* Centre pulse */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-32 h-32 rounded-full bg-brand-accent/15 blur-2xl animate-pulse"
      />
      {/* Constellation lines */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-50"
      >
        {SERVICE_ICONS.map((s, i) => {
          const θ = (s.angle * Math.PI) / 180
          const ex = 50 + Math.cos(θ) * radius
          const ey = 50 + Math.sin(θ) * radius
          return (
            <line
              key={i}
              x1="50" y1="50" x2={ex} y2={ey}
              stroke="rgba(158,199,58,0.45)"
              strokeWidth="0.18"
              strokeDasharray="0.8 0.8"
            />
          )
        })}
      </svg>
      {/* Icons */}
      {SERVICE_ICONS.map((s, i) => {
        const θ = (s.angle * Math.PI) / 180
        const left = 50 + Math.cos(θ) * radius
        const top  = 50 + Math.sin(θ) * radius
        return (
          <div
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{ left: `${left}%`, top: `${top}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative w-14 h-14 rounded-full bg-brand-deep/80 backdrop-blur
                            ring-2 ring-brand-accent/60 grid place-items-center
                            shadow-[0_8px_22px_-8px_rgba(158,199,58,0.5)]"
                 style={{ animation: `haloPulse 2.8s ease-in-out ${i * 0.2}s infinite` }}>
              <s.Icon size={22} strokeWidth={1.8} className="text-brand-accent" />
            </div>
          </div>
        )
      })}
    </>
  )
}

/* 04 — PARTNERS: handshake centre + partner dot constellation */
function ScenePartners() {
  const dots = Array.from({ length: 18 }).map((_, i) => {
    const θ = (i / 18) * Math.PI * 2
    const r = 30 + (i % 3) * 6
    return {
      x: 50 + Math.cos(θ) * r,
      y: 50 + Math.sin(θ) * r,
      delay: i * 0.15,
    }
  })
  return (
    <>
      {/* Concentric pulse rings */}
      {[0, 0.6, 1.2].map((delay, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-32 h-32 rounded-full border-2 border-brand-accent/40"
          style={{ animation: `haloPulse 3s ease-out ${delay}s infinite` }}
        />
      ))}
      {/* Centre handshake */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-24 h-24 rounded-full bg-brand-deep/80 backdrop-blur
                      ring-2 ring-brand-accent grid place-items-center
                      shadow-[0_12px_30px_-8px_rgba(158,199,58,0.6)]">
        <Handshake size={40} strokeWidth={1.8} className="text-brand-accent" />
      </div>
      {/* Partner dots */}
      {dots.map((d, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute w-2 h-2 rounded-full bg-brand-accent
                     shadow-[0_0_10px_rgba(158,199,58,0.8)]"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            transform: 'translate(-50%, -50%)',
            animation: `haloPulse 2.4s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </>
  )
}

/* 05 — COMMUNITY: heart centre + people ring + outward connections */
function SceneCommunity() {
  const people = Array.from({ length: 8 }).map((_, i) => {
    const θ = -Math.PI / 2 + (i / 8) * Math.PI * 2
    const r = 32
    return { x: 50 + Math.cos(θ) * r, y: 50 + Math.sin(θ) * r, delay: i * 0.18 }
  })
  return (
    <>
      {/* Lines from centre to people */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"
           className="absolute inset-0 w-full h-full opacity-60">
        {people.map((p, i) => (
          <line
            key={i}
            x1="50" y1="50" x2={p.x} y2={p.y}
            stroke="rgba(158,199,58,0.55)"
            strokeWidth="0.18"
            strokeDasharray="0.6 0.8"
          />
        ))}
      </svg>
      {/* Centre heart-handshake */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-20 h-20 rounded-full bg-brand-deep/80 backdrop-blur
                      ring-2 ring-brand-accent grid place-items-center
                      shadow-[0_10px_28px_-8px_rgba(158,199,58,0.6)]">
        <HeartHandshake size={32} strokeWidth={1.8} className="text-brand-accent" />
      </div>
      {/* People nodes */}
      {people.map((p, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="w-10 h-10 rounded-full bg-brand-deep/70 backdrop-blur
                       ring-2 ring-brand-accent/60 grid place-items-center"
            style={{ animation: `haloPulse 2.6s ease-in-out ${p.delay}s infinite` }}
          >
            <Users size={16} strokeWidth={1.8} className="text-brand-accent" />
          </div>
        </div>
      ))}
    </>
  )
}

/* 06 — LEADERSHIP: compass / vision lines radiating outward */
function SceneLeadership() {
  return (
    <>
      {/* Radial vision rays */}
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"
           className="absolute inset-0 w-full h-full opacity-55">
        {Array.from({ length: 16 }).map((_, i) => {
          const θ = (i / 16) * Math.PI * 2
          const ex = 50 + Math.cos(θ) * 45
          const ey = 50 + Math.sin(θ) * 45
          return (
            <line
              key={i}
              x1="50" y1="50" x2={ex} y2={ey}
              stroke="rgba(158,199,58,0.35)"
              strokeWidth={i % 2 === 0 ? '0.2' : '0.14'}
              strokeDasharray={i % 2 === 0 ? undefined : '0.5 0.7'}
            />
          )
        })}
      </svg>
      {/* Concentric vision rings */}
      {[20, 14, 8].map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-accent/40"
          style={{ width: `${s}rem`, height: `${s}rem` }}
        />
      ))}
      {/* Compass core */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                      w-24 h-24 rounded-full bg-brand-deep/85 backdrop-blur
                      ring-2 ring-brand-accent grid place-items-center
                      shadow-[0_12px_30px_-8px_rgba(158,199,58,0.6)]">
        <Compass size={42} strokeWidth={1.8} className="text-brand-accent animate-spin-slow" />
      </div>
    </>
  )
}

/* 07 — CLOSING: logo center + radial network exploding outward */
function SceneClosing() {
  return (
    <>
      {/* Pulsing halo behind logo */}
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                   w-56 h-56 rounded-full bg-brand-accent/30 blur-3xl animate-pulse"
      />
      {/* Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src={assets.logo}
          alt="Yanabiya Group"
          className="h-24 md:h-36 w-auto object-contain
                     drop-shadow-[0_8px_36px_rgba(158,199,58,0.6)]"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
    </>
  )
}

/* ─────────── Scene script ─────────── */

const SCENES: Scene[] = [
  {
    id: 'opening',
    eyebrow: 'Scene 01 · Opening',
    headline: 'Connecting Businesses Across Borders',
    body: 'A world driven by connection, innovation, and opportunity.',
    photo: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: SceneOpening,
    cta: { label: 'Explore Global Presence', href: '/#global' },
  },
  {
    id: 'about',
    eyebrow: 'Scene 02 · The Group',
    headline: 'A dynamic group of companies.',
    body: 'Building an integrated global business ecosystem across multiple industries.',
    photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: SceneAbout,
    cta: { label: 'Explore About Us', href: '/about-us' },
  },
  {
    id: 'services',
    eyebrow: 'Scene 03 · Services',
    headline: 'Complete business solutions.',
    body: 'International trade · Strategic consulting · Logistics · Investment.',
    photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: SceneServices,
    cta: { label: 'Explore Our Services', href: '/#businesses' },
  },
  {
    id: 'partners',
    eyebrow: 'Scene 04 · Trusted Network',
    headline: 'Trusted by partners worldwide.',
    body: 'We collaborate with leading organisations to create long-term value.',
    photo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: ScenePartners,
    cta: { label: 'Explore Trusted Network', href: '/#partnerships' },
  },
  {
    id: 'community',
    eyebrow: 'Scene 05 · Community',
    headline: 'Growth beyond business.',
    body: 'Empowering communities and creating sustainable impact.',
    photo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: SceneCommunity,
    cta: { label: 'Explore Community', href: '/community' },
  },
  {
    id: 'leadership',
    eyebrow: 'Scene 06 · Leadership',
    headline: 'Visionary leadership.',
    body: 'Turning ideas into global success stories.',
    photo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center top',
    Visual: SceneLeadership,
    cta: { label: 'Meet Our Leadership', href: '/leadership' },
  },
  {
    id: 'closing',
    eyebrow: 'Scene 07 · Closing',
    headline: 'Yanabiya Group',
    body: 'Building the Future, Together.',
    photo: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80',
    photoPos: 'center',
    Visual: SceneClosing,
    cta: { label: 'Get in Touch', href: '/contact' },
  },
]

/* ─────────── Component ─────────── */

export default function Hero() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [scene, setScene] = useState(0)
  const [presenceOpen, setPresenceOpen] = useState(false)

  /* Click handler for the per-scene CTA. The opening scene routes to the
   * global-presence overview panel (in-place), every other scene navigates
   * to the matching landing anchor or detail page. */
  const onSceneCta = (s: Scene) => {
    if (s.id === 'opening') {
      setPresenceOpen(true)
      return
    }
    const href = s.cta.href
    if (href.startsWith('/#')) {
      // Smooth-scroll to the landing anchor.
      const id = href.slice(2)
      navigate('/')
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    navigate(href)
  }

  /* Auto-advance scene every SCENE_MS — always running, no pause. */
  useEffect(() => {
    const id = window.setInterval(() => {
      setScene((s) => (s + 1) % SCENES.length)
    }, SCENE_MS)
    return () => window.clearInterval(id)
  }, [])

  const active = SCENES[scene]

  return (
    <section id="home" className="relative scroll-mt-24">
      <div className="relative w-full h-[78svh] min-h-[520px] overflow-hidden bg-brand-ink">

        {/* ──────── Persistent: dark gradient background ──────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, rgba(15,58,35,0.55) 0%, rgba(8,28,18,0.92) 55%, #060f0a 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 w-[640px] h-[640px] rounded-full
                     bg-brand-accent/15 blur-[160px] animate-pulse"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-24 w-[560px] h-[560px] rounded-full
                     bg-brand-accentDark/10 blur-[160px]"
        />

        {/* ──────── Scene layers (stacked, fade in/out)
         *
         *  Each layer:
         *    1. Real-life Unsplash background photo (full-bleed object-cover,
         *       very subtle Ken-Burns scale-in via animate-pulse on the img
         *       wrapper to give the photo motion across the scene).
         *    2. Dark brand-deep gradient over the photo so the text + motion
         *       overlay still read clearly.
         *    3. The SVG/icon motion overlay (continents, beams, icons, etc.).
         */}
        {SCENES.map((s, i) => {
          const isActive = i === scene
          const SceneViz = s.Visual
          return (
            <div
              key={s.id}
              aria-hidden={!isActive ? 'true' : 'false'}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                          ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              {/* Real-life photo background */}
              <img
                src={s.photo}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: s.photoPos ?? 'center' }}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              {/* Dark gradient overlay (legibility) */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(8,28,18,0.78) 0%, rgba(8,28,18,0.55) 40%, rgba(8,28,18,0.85) 100%)',
                }}
              />
              {/* SVG / icon motion overlay */}
              <SceneViz />
            </div>
          )
        })}

        {/* ──────── Vignette (legibility) ──────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* ──────── Centre content (per-scene text + persistent CTAs) ──────── */}
        <div className="relative h-full container-x flex flex-col items-center justify-center text-center">

          {/* Scene-specific eyebrow + headline + body
           *  `key={scene}` forces a re-mount so the fade-up replays each cycle. */}
          <div key={`txt-${scene}`} className="max-w-3xl mx-auto">
            <div
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.32em] uppercase
                         text-brand-accent/85 mb-5 fade-up"
              style={{ animationDelay: '60ms' }}
            >
              <Sparkles size={10} className="text-brand-accent" />
              {active.eyebrow}
            </div>
            <h1
              className="font-serif text-white drop-shadow-lg fade-up
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-5
                         tracking-tight"
              style={{ animationDelay: '180ms' }}
            >
              {active.headline}
            </h1>
            <p
              className="text-white text-base md:text-lg leading-snug mx-auto max-w-2xl
                         drop-shadow-lg fade-up"
              style={{ animationDelay: '300ms' }}
            >
              {active.body}
            </p>
          </div>

          {/* Per-scene primary CTA + persistent "Get in touch" secondary.
           *  The primary CTA's label, href and icon swap per scene so the
           *  hero becomes navigation: each scene = one section/page link.
           *  Re-keyed on scene index so the fade-up replays each cycle. */}
          <div
            key={`cta-${scene}`}
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center fade-up"
            style={{ animationDelay: '500ms' }}
          >
            <button
              type="button"
              onClick={() => onSceneCta(active)}
              className="btn-primary !px-8 !py-3.5 !rounded-full"
            >
              {active.cta.label} <ArrowRight size={18} className="ltr-flip" />
            </button>
            <a
              href="/yanabiya-profile.pdf"
              download
              className="btn-ghost !px-8 !py-3.5 !rounded-full !border-amber-300/60 !text-amber-200
                         hover:!bg-amber-300 hover:!text-brand-ink hover:!border-amber-300"
            >
              <Download size={18} /> {t('topbar.downloadPdf', 'Download Profile')}
            </a>
            <Link
              to="/contact"
              className="btn-ghost !px-8 !py-3.5 !rounded-full !border-white/50 !text-white
                         hover:!bg-white hover:!text-brand-ink hover:!border-white"
            >
              <Handshake size={18} /> {t('hero.cta2')}
            </Link>
          </div>
        </div>

        {/* ──────── Bottom-right: scene progress dots (clickable nav) ──────── */}
        <div className="absolute bottom-5 right-5 md:bottom-6 md:right-6 z-20">
          <div className="flex items-center gap-1.5 rounded-full bg-brand-deep/60 backdrop-blur px-3 py-1.5
                          border border-brand-accent/30">
            {SCENES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setScene(i)}
                aria-label={`Scene ${i + 1}`}
                className={`rounded-full transition-all duration-300
                            ${i === scene
                              ? 'w-6 h-1.5 bg-brand-accent'
                              : 'w-1.5 h-1.5 bg-white/40 hover:bg-brand-accent/70'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <GlobalOverviewPanel open={presenceOpen} onClose={() => setPresenceOpen(false)} />
    </section>
  )
}
