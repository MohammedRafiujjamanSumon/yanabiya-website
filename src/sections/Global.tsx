import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import Section from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import GlobalOverviewPanel from '../components/GlobalOverviewPanel'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* The four offices rendered as glassmorphism dashboard cards in a
 * 2x2 grid. Each card carries its country silhouette blended in at
 * ~25% opacity along with subtle orbit rings, motion lines, and node
 * dots — a high-end fintech / corporate look. Order: Oman (HQ) ·
 * UK · Bangladesh · USA. */
const COUNTRY_NODES = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       role: 'Headquarters'        },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         role: 'European Operations' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', role: 'South Asia Operations' },
  { code: 'US', flag: '🇺🇸', name: 'USA',        role: 'North America Operations' },
]

const MAP_BASE = `${import.meta.env.BASE_URL}maps/`

export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6">

        {/* ───────── TEXT FIRST ───────── */}
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              {t('global.eyebrow', 'Global Presence')}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] leading-[1.15] tracking-tight text-slate-900 lg:whitespace-nowrap">
              Aligned across borders as{' '}
              <span className="text-brand-accentDark">one unified network.</span>
            </h2>
          </Reveal>
        </div>

        {/* ───────── GEOMAP — fintech-style 4-card dashboard ───────── */}
        <Reveal delay={1080}>
          <div className="relative max-w-5xl mx-auto mt-12 md:mt-16
                          rounded-3xl
                          bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900
                          ring-1 ring-white/10 shadow-2xl
                          p-5 md:p-8 overflow-hidden">

            {/* Ambient gradient blobs */}
            <div
              aria-hidden="true"
              className="absolute -top-16 -left-16 w-72 h-72 rounded-full
                         bg-blue-500/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-20 -right-16 w-80 h-80 rounded-full
                         bg-amber-500/15 blur-3xl pointer-events-none"
            />

            {/* 2×2 grid of country cards */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 z-10">
              {COUNTRY_NODES.map((c, i) => {
                const mapUrl = `${MAP_BASE}${c.code.toLowerCase()}.svg`
                const isHQ = c.code === 'OM'
                return (
                  <Link
                    key={c.code}
                    to={`/country/${c.code.toLowerCase()}`}
                    aria-label={`Explore ${c.name}`}
                    className="group relative block rounded-2xl
                               bg-white/[0.04] backdrop-blur-md
                               border border-white/10
                               shadow-[0_8px_32px_rgba(0,0,0,0.35)]
                               transition-all duration-500 overflow-hidden
                               hover:bg-white/[0.07]
                               hover:border-amber-300/40
                               hover:-translate-y-1
                               hover:shadow-[0_16px_48px_rgba(212,175,55,0.18)]"
                  >
                    {/* Inner gradient sheen */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-br
                                 from-blue-500/10 via-transparent to-amber-500/10
                                 pointer-events-none"
                    />

                    <div className="relative aspect-[4/3] flex flex-col">
                      {/* Concentric orbit rings */}
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 grid place-items-center pointer-events-none"
                      >
                        <div className="absolute w-[78%] aspect-square rounded-full border border-white/10" />
                        <div className="absolute w-[58%] aspect-square rounded-full border border-white/15" />
                        <div className="absolute w-[38%] aspect-square rounded-full border border-amber-300/25" />
                        {/* Outer dashed motion ring */}
                        <div
                          className="absolute w-[88%] aspect-square rounded-full
                                     border border-dashed border-amber-300/15"
                          style={{ animation: `spin-slow 32s linear ${i * 1.5}s infinite` }}
                        />
                      </div>

                      {/* Country silhouette — blended at ~25% opacity */}
                      <div className="absolute inset-0 grid place-items-center p-10 md:p-12">
                        <img
                          src={mapUrl}
                          alt=""
                          aria-hidden="true"
                          className="w-full h-full object-contain
                                     opacity-25 group-hover:opacity-45
                                     transition-all duration-500
                                     group-hover:scale-105"
                          style={{
                            filter:
                              'drop-shadow(0 0 18px rgba(255,255,255,0.35)) drop-shadow(0 0 8px rgba(212,175,55,0.4))',
                          }}
                          onError={(e) =>
                            ((e.currentTarget as HTMLImageElement).style.display = 'none')
                          }
                        />
                      </div>

                      {/* Animated SVG light trail — radial dashed orbit */}
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 100 75"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
                      >
                        <defs>
                          <linearGradient id={`trail-${c.code}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(96,165,250,0.6)" />
                            <stop offset="50%" stopColor="rgba(212,175,55,0.7)" />
                            <stop offset="100%" stopColor="rgba(96,165,250,0.0)" />
                          </linearGradient>
                        </defs>
                        <ellipse
                          cx="50" cy="37.5" rx="42" ry="32"
                          fill="none"
                          stroke={`url(#trail-${c.code})`}
                          strokeWidth="0.4"
                          strokeDasharray="1.5 2.5"
                          style={{ animation: `dividerGrow 5s ease-in-out ${i * 0.4}s infinite` }}
                        />
                      </svg>

                      {/* Node connection points */}
                      <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-2 h-2 rounded-full bg-amber-300
                                   shadow-[0_0_10px_rgba(212,175,55,0.9)] animate-pulse"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute bottom-12 left-3 w-1.5 h-1.5 rounded-full bg-blue-300
                                   shadow-[0_0_8px_rgba(96,165,250,0.9)] animate-pulse"
                        style={{ animationDelay: `${i * 0.4}s` }}
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 right-6 w-1 h-1 rounded-full bg-white/80
                                   shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-pulse"
                        style={{ animationDelay: `${i * 0.7}s` }}
                      />

                      {/* Footer card content — flag + name + role + HQ */}
                      <div className="absolute left-0 right-0 bottom-0 px-4 md:px-5 py-3
                                      bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent
                                      flex items-center gap-3">
                        <span className="text-2xl shrink-0 drop-shadow-md">{c.flag}</span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm md:text-base font-semibold text-white leading-tight">
                              {c.name}
                            </span>
                            {isHQ && (
                              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                               bg-amber-300/15 text-amber-200 border border-amber-300/40">
                                HQ
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em]
                                        text-amber-200/70 mt-0.5">
                            {c.role}
                          </p>
                        </div>
                        <ArrowRight
                          size={16}
                          className="text-amber-300/80 shrink-0
                                     transition-all duration-300
                                     group-hover:translate-x-1 group-hover:text-amber-200"
                        />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>

            {/* Bottom signal pill */}
            <div className="relative z-10 mt-5 md:mt-6 flex items-center justify-center gap-2
                            text-[10px] uppercase tracking-[0.32em] text-amber-200/70 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse
                               shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
              Live · 4 connected regions
            </div>
          </div>
        </Reveal>

        {/* CTA — sits BELOW the geomap */}
        <Reveal delay={1200}>
          <div className="mt-10 md:mt-12 text-center">
            <button
              type="button"
              onClick={() => setPresenceOpen(true)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Global Presence
              <ArrowRight size={14} />
            </button>
          </div>
        </Reveal>

      </div>

      <GlobalOverviewPanel open={presenceOpen} onClose={() => setPresenceOpen(false)} />
    </Section>
  )
}
