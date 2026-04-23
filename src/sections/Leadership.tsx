import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'
import { board, chairmanMessage, viceChairmanMessage } from '../data/leadership'
import { ArrowRight, Quote, Users, Sparkles } from 'lucide-react'

export default function Leadership() {
  const { t } = useTranslation()
  const [chairmanOpen, setChairmanOpen] = useState(false)
  const [viceOpen, setViceOpen] = useState(false)

  useEffect(() => {
    const anyOpen = chairmanOpen || viceOpen
    if (!anyOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setChairmanOpen(false)
        setViceOpen(false)
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [chairmanOpen, viceOpen])

  return (
    <Section id="leadership" className="bg-stone-50">
      <div className="container-x">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Eyebrow>{t('leadership.eyebrow')}</Eyebrow>
          <h2 className="mt-2 font-serif text-xl md:text-2xl leading-tight text-brand-accentDark">
            Guided by <span className="italic text-brand-accent">experience</span>
            , Driven by <span className="italic text-brand-accent">integrity</span>.
          </h2>
          <div className="mt-4 mx-auto w-20 h-[2px] bg-brand-accent rounded-full" />
          <p className="mt-6 text-slate-600 leading-relaxed text-justify-center">
            {t('leadership.sub')}
          </p>
        </div>

        {/* Two-column layout: LEFT = logo + Vice Chairman, RIGHT = Chairman + nav cards */}
        <div id="management" className="grid lg:grid-cols-2 gap-6 scroll-mt-28 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6 h-full">
            <div className="relative card-panel overflow-hidden p-0 h-[168px] md:h-[200px] bg-brand-deep">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4"
                poster="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex flex-col items-center text-center">
                <img
                  src={assets.logo}
                  alt="Yanabiya Group"
                  className="h-10 md:h-12 w-auto object-contain drop-shadow-md mb-2"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-brand-accent font-bold">
                  Strength in Leadership
                </div>
              </div>
            </div>

            <article className="card-panel relative overflow-hidden flex-1">
              <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={140} />
              <div className="relative flex flex-col md:flex-row gap-5 items-start">
                <img
                  src={board[1].photo}
                  alt={board[1].name}
                  className="w-28 h-36 md:w-32 md:h-40 rounded-2xl object-cover object-top border-2 border-brand-accent/40 shrink-0 bg-white"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">
                    Vice Chairman Message
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-slate-900 mb-3">
                    {board[1].name}
                  </h3>
                  <p className="text-slate-700 mb-2">Dear Visitors,</p>
                  <div className="space-y-3 text-slate-600 leading-relaxed text-justify">
                    {viceChairmanMessage.slice(0, 2).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setViceOpen(true)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-accentDark hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  >
                    Read Full Message <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6 h-full">
            <article className="card-panel relative overflow-hidden flex-1">
              <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={160} />
              <div className="relative flex flex-col md:flex-row gap-6 items-start">
                <img
                  src={board[0].photo}
                  alt={board[0].name}
                  className="w-28 h-36 md:w-32 md:h-44 rounded-2xl object-cover border-2 border-brand-accent/40 shrink-0 bg-white"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">
                    Founder &amp; Chairman Message
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">
                    {board[0].name}
                  </h3>
                  <p className="text-slate-700 mb-3">Greetings from YANABIYA GROUP,</p>
                  <p className="text-slate-600 leading-relaxed text-justify">
                    {chairmanMessage[0]}
                  </p>
                  <button
                    type="button"
                    onClick={() => setChairmanOpen(true)}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-brand-accentDark hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                  >
                    Read Full Message <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>

            {/* Two navigation cards */}
            <div id="professionals" className="grid sm:grid-cols-2 gap-4 scroll-mt-28">
              <Link
                to="/leadership/management"
                className="group relative rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition h-36 md:h-44"
              >
                <img
                  src="./images/management-event.jpg"
                  alt="Yanabiya Group management"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-1">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                    <Users size={14} /> Management
                  </div>
                  <div className="font-serif text-base md:text-lg text-white leading-tight drop-shadow">
                    Our Management
                  </div>
                  <span className="inline-flex items-center gap-2 mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 group-hover:text-brand-accent transition">
                    View Page <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              <Link
                to="/leadership/professionals"
                className="group relative rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition h-36 md:h-44"
              >
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="High skilled professionals team"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-1">
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                    <Sparkles size={14} /> Specialists
                  </div>
                  <div className="font-serif text-base md:text-lg text-white leading-tight drop-shadow">
                    High Skilled Professionals
                  </div>
                  <span className="inline-flex items-center gap-2 mt-1 text-[11px] font-semibold uppercase tracking-wider text-white/90 group-hover:text-brand-accent transition">
                    View Team <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Chairman full-message modal (same pattern as About Vision card) */}
      {chairmanOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Founder & Chairman Message"
          onClick={() => setChairmanOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setChairmanOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <div className="text-xs uppercase tracking-widest text-brand-accent text-center mb-2">
              Founder &amp; Chairman Message
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900 text-center">
              {board[0].name}
            </h3>
            <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />

            <p className="mt-6 text-slate-700">Greetings from YANABIYA GROUP,</p>
            <div className="mt-4 space-y-4 text-slate-600 leading-relaxed text-justify">
              {chairmanMessage.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-6 text-slate-700">
              <p>Sincerely,</p>
              <p className="font-semibold text-slate-900 mt-1">S M Shamim Ahmed</p>
              <p className="text-sm text-brand-accent uppercase tracking-widest">
                Founder &amp; Chairman — Yanabiya Group
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Vice Chairman full-message modal */}
      {viceOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vice Chairman Message"
          onClick={() => setViceOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setViceOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>

            <div className="text-xs uppercase tracking-widest text-brand-accent text-center mb-2">
              Vice Chairman Message
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900 text-center">
              {board[1].name}
            </h3>
            <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />

            <p className="mt-6 text-slate-700">Dear Visitors,</p>
            <div className="mt-4 space-y-4 text-slate-600 leading-relaxed text-justify">
              {viceChairmanMessage.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-6 text-slate-700">
              <p>Sincerely,</p>
              <p className="font-semibold text-slate-900 mt-1">Mohammad Abu Jaheed</p>
              <p className="text-sm text-brand-accent uppercase tracking-widest">
                Vice Chairman — Yanabiya Group
              </p>
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
