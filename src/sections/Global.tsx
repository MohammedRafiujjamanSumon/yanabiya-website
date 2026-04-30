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

/* Country map silhouettes — Oman (HQ), UK, Bangladesh, USA — rendered
 * as a 2×2 grid. Each card uses CSS mask-image to colour the SVG
 * outline in the brand-accent gradient and applies a soft halo so the
 * shape "lights up" on hover. */
const COUNTRY_MAPS = [
  { code: 'OM', flag: '🇴🇲', name: 'Sultanate of Oman',       role: 'Headquarters'        },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom',          role: 'European Operations' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',              role: 'South Asia Operations' },
  { code: 'US', flag: '🇺🇸', name: 'United States of America', role: 'North America Operations' },
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

        {/* ───────── GEOMAP — 2×2 country map silhouettes ───────── */}
        <Reveal delay={1080}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto mt-12 md:mt-16">
            {COUNTRY_MAPS.map((c) => {
              const mapUrl = `${MAP_BASE}${c.code.toLowerCase()}.svg`
              const isHQ = c.code === 'OM'
              return (
                <Link
                  key={c.code}
                  to={`/country/${c.code.toLowerCase()}`}
                  aria-label={`Explore ${c.name}`}
                  className="group relative rounded-2xl border border-brand-accent/30 bg-white
                             p-4 md:p-6 transition-all duration-500 overflow-hidden
                             hover:-translate-y-1 hover:border-brand-accentDark
                             hover:shadow-[0_20px_40px_rgba(158,199,58,0.25)]"
                >
                  {/* Map silhouette area */}
                  <div className="relative aspect-[5/4] flex items-center justify-center">
                    {/* Pulsing halo behind the silhouette */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-60 group-hover:opacity-100
                                 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(158,199,58,0.45) 0%, transparent 65%)',
                        filter: 'blur(24px)',
                      }}
                    />
                    {/* The country silhouette — coloured via CSS mask so we
                     *  can light it with the brand accent gradient + glow. */}
                    <div
                      className="relative w-full h-full transition-transform duration-500
                                 group-hover:scale-[1.04]"
                      style={{
                        WebkitMaskImage: `url(${mapUrl})`,
                        maskImage: `url(${mapUrl})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        backgroundImage:
                          'linear-gradient(135deg, #b8d75a 0%, #9ec73a 50%, #6f9526 100%)',
                        filter:
                          'drop-shadow(0 0 18px rgba(158,199,58,0.65)) drop-shadow(0 0 4px rgba(158,199,58,0.5))',
                      }}
                    />
                  </div>

                  {/* Card footer */}
                  <div className="mt-3 md:mt-4 flex items-center gap-3 border-t border-brand-accent/20 pt-3 md:pt-4">
                    <span className="text-2xl shrink-0">{c.flag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm md:text-base font-semibold text-brand-deep leading-tight">
                          {c.name}
                        </span>
                        {isHQ && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                           bg-brand-accentDark text-white">
                            HQ
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
                        {c.role}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-brand-accent shrink-0 transition-transform duration-300
                                 group-hover:translate-x-1 group-hover:text-brand-accentDark"
                    />
                  </div>
                </Link>
              )
            })}
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
