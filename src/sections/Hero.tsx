import { useTranslation } from 'react-i18next'
import { ArrowRight, Handshake, ChevronDown, Volume2, VolumeX } from 'lucide-react'
import { useRef, useState } from 'react'

// YouTube embed used as full-bleed background.
const YT_VIDEO_ID = 'iEpJwprxDdk'
const YT_EMBED = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&showinfo=0&iv_load_policy=3&enablejsapi=1`

export default function Hero() {
  const { t } = useTranslation()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    const cmd = muted ? 'unMute' : 'mute'
    win.postMessage(`{"event":"command","func":"${cmd}","args":""}`, '*')
    if (muted) {
      win.postMessage('{"event":"command","func":"setVolume","args":[80]}', '*')
    }
    setMuted(!muted)
  }

  return (
    <section id="home" className="relative scroll-mt-24">

      {/* ─────────── Welcome banner — dark navy, sits right under the navbar ─────────── */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 animate-gradient border-y border-brand-accent/30">
        {/* decorative grid */}
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        {/* soft lime accent halo for that green-on-navy glow — pulses */}
        <div className="absolute -top-20 left-1/2 w-[480px] h-[220px] bg-brand-accent/30 rounded-full blur-3xl pointer-events-none animate-halo" />

        {/* spotlight sweep across whole banner */}
        <div className="absolute inset-y-0 -inset-x-1/2 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-spotlight" />

        {/* slow scanline */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-accent/60 to-transparent animate-scanline" />
        </div>

        {/* floating decorative orbs */}
        <div className="absolute top-6 left-[8%] w-3 h-3 rounded-full bg-brand-accent/70 blur-sm animate-float pointer-events-none"
             style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-8 left-[20%] w-2 h-2 rounded-full bg-white/60 blur-sm animate-float pointer-events-none"
             style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-10 right-[12%] w-2.5 h-2.5 rounded-full bg-brand-accent/60 blur-sm animate-float pointer-events-none"
             style={{ animationDelay: '0.8s' }} />
        <div className="absolute bottom-6 right-[22%] w-1.5 h-1.5 rounded-full bg-white/70 blur-sm animate-float pointer-events-none"
             style={{ animationDelay: '2.2s' }} />

        {/* drifting upward particles */}
        <div className="absolute bottom-0 left-[15%] w-1 h-1 rounded-full bg-brand-accent pointer-events-none animate-drift"
             style={{ animationDelay: '0s' }} />
        <div className="absolute bottom-0 left-[35%] w-1.5 h-1.5 rounded-full bg-white/80 pointer-events-none animate-drift"
             style={{ animationDelay: '2.5s' }} />
        <div className="absolute bottom-0 left-[55%] w-1 h-1 rounded-full bg-brand-accent/80 pointer-events-none animate-drift"
             style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-0 left-[75%] w-1.5 h-1.5 rounded-full bg-brand-accent/70 pointer-events-none animate-drift"
             style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-0 left-[88%] w-1 h-1 rounded-full bg-white/70 pointer-events-none animate-drift"
             style={{ animationDelay: '5.5s' }} />

        {/* corner sparkles */}
        <div className="absolute top-4 left-1/2 -translate-x-[140px] text-brand-accent text-xs animate-sparkle pointer-events-none"
             style={{ animationDelay: '0.5s' }}>✦</div>
        <div className="absolute top-4 left-1/2 translate-x-[120px] text-brand-accent text-xs animate-sparkle pointer-events-none"
             style={{ animationDelay: '1.8s' }}>✦</div>
        <div className="absolute bottom-5 left-1/2 -translate-x-[180px] text-white/70 text-[10px] animate-sparkle pointer-events-none"
             style={{ animationDelay: '2.4s' }}>✧</div>
        <div className="absolute bottom-5 left-1/2 translate-x-[160px] text-white/70 text-[10px] animate-sparkle pointer-events-none"
             style={{ animationDelay: '3.6s' }}>✧</div>

        <div className="relative container-x text-center py-1.5 md:py-2">
          {/* tagline pill with glow ring */}
          <div className="inline-block relative fade-up">
            <span className="absolute inset-0 rounded-full animate-ring pointer-events-none" />
            <p className="relative italic whitespace-nowrap text-[9px] sm:text-[10px] md:text-xs text-brand-accent tracking-wide
                          px-3 py-0.5 rounded-full border border-brand-accent/40 bg-brand-accent/5">
              {t('topbar.tagline')}
            </p>
          </div>

          <h1 className="font-serif font-bold whitespace-nowrap text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mt-1.5 drop-shadow-lg fade-up shimmer-text"
              style={{ animationDelay: '120ms' }}>
            {t('hero.welcome')}
          </h1>

          {/* divider with rotating star accent */}
          <div className="flex items-center justify-center gap-2 mt-1.5 fade-up"
               style={{ animationDelay: '180ms' }}>
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent to-brand-accent rounded-full animate-divider" />
            <span className="text-brand-accent text-xs inline-block animate-spin-slow">✦</span>
            <div className="w-10 h-0.5 bg-gradient-to-l from-transparent to-brand-accent rounded-full animate-divider" />
          </div>
        </div>
      </div>

      {/* ─────────── Video block — sits under the welcome banner ─────────── */}
      <div className="relative w-full h-[72svh] min-h-[460px] overflow-hidden">
        {/* Full-bleed background video */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-1/2 -translate-x-1/2
                       w-[max(100vw,177.78vh)] h-[max(56.25vw,100vh)]"
            src={YT_EMBED}
            title="Yanabiya Future Vision"
            allow="autoplay; encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            frameBorder={0}
          />
        </div>

        {/* Dark gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-transparent to-transparent" />

        {/* Video-overlay content: description + CTAs */}
        <div className="relative h-full container-x flex flex-col items-center justify-center text-center">
          <p className="text-white/95 text-base md:text-lg leading-relaxed mx-auto max-w-2xl drop-shadow-lg fade-up"
             style={{ animationDelay: '240ms' }}>
            {t('hero.desc1')}
          </p>

          <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center fade-up"
               style={{ animationDelay: '320ms' }}>
            <a href="#businesses" className="btn-primary !px-8 !py-3.5 !rounded-full">
              {t('hero.cta1')} <ArrowRight size={18} className="ltr-flip" />
            </a>
            <a href="#contact"
               className="btn-ghost !px-8 !py-3.5 !rounded-full !border-white/50 !text-white hover:!bg-white hover:!text-brand-ink hover:!border-white">
              <Handshake size={18} /> {t('hero.cta2')}
            </a>
          </div>
        </div>

        {/* Mute / unmute toggle */}
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="absolute top-6 end-6 z-20 flex items-center gap-2 px-3 py-2 rounded-full
                     bg-black/45 backdrop-blur border border-white/20 text-white text-xs
                     hover:bg-brand-accent hover:border-brand-accent transition"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span className="hidden sm:inline">{muted ? 'Unmute' : 'Mute'}</span>
        </button>

        {/* Scroll indicator */}
        <a href="#about"
           className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 hover:text-brand-accent transition flex flex-col items-center gap-1 z-10">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
