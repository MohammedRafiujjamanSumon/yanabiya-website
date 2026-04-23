import { useTranslation } from 'react-i18next'
import { ArrowRight, Handshake, Volume2, VolumeX } from 'lucide-react'
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

      {/* ─────────── Video block ─────────── */}
      <div className="relative w-full h-[calc(72svh+1in)] min-h-[556px] overflow-hidden">
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
          <h1 className="font-serif text-white drop-shadow-lg fade-up
                         text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-5"
              style={{ animationDelay: '120ms' }}>
            {t('hero.welcome')}
          </h1>
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

      </div>
    </section>
  )
}
