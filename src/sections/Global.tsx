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

/* Country map silhouettes — Oman (HQ), UK, Bangladesh, USA — used as
 * the centrepiece of the orbit-rings geomap. Each silhouette is masked
 * out of an SVG outline (mapsicon) so we can fill it with the brand
 * accent gradient and apply a soft glow halo. */
const COUNTRY_MAPS = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       label: 'Muscat, Oman'        },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         label: 'London, UK'          },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', label: 'Dhaka, Bangladesh'   },
  { code: 'US', flag: '🇺🇸', name: 'USA',        label: 'Austin, USA'         },
]

/* Orbit positions for the flag pins — same coordinates as before so the
 * outer pyramid + connecting lines line up correctly. */
const orbitDots = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       label: 'Muscat, Oman',       top: '50%', left: '69%' },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         label: 'London, UK',         top: '22%', left: '50%' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', label: 'Dhaka, Bangladesh',  top: '85%', left: '50%' },
  { code: 'US', flag: '🇺🇸', name: 'USA',        label: 'Austin, USA',        top: '45%', left: '5%'  },
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

        {/* ───────── GEOMAP — orbit rings + central 2×2 silhouettes ───────── */}
        <Reveal delay={1080}>
          <div className="relative aspect-[5/4] w-full max-w-[640px] mx-auto mt-12 md:mt-16">
            {/* Soft halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[80%] h-[80%] rounded-full bg-brand-accent/30 blur-[80px] animate-gradient" />
            </div>

            {/* Concentric orbit rings — 5 rings so each office can sit on
             *  its own (Oman·2, UK·3, BD·4, USA·5/outermost). */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              {[0.92, 0.74, 0.56, 0.38, 0.20].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-brand-accentDark/40"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
            </div>

            {/* Connecting lines from each flag pin to the centre */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 80"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {orbitDots.map((d, i) => {
                const x = parseFloat(d.left)
                const y = parseFloat(d.top) * 0.8
                return (
                  <line
                    key={d.code}
                    x1="50" y1="40" x2={x} y2={y}
                    stroke="rgba(15,58,35,0.55)"
                    strokeWidth="0.28"
                    strokeDasharray="0.8 0.6"
                    style={{ animation: `dividerGrow 4s ease-in-out ${i * 0.3}s infinite` }}
                  />
                )
              })}
            </svg>

            {/* CENTRE — 2×2 country silhouettes inside the innermost ring,
             *  replacing the previous spinning logo medallion. Each
             *  silhouette is a small Link with a glow halo. */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative grid grid-cols-2 gap-1.5 md:gap-2 p-2.5 md:p-3
                              w-[24%] aspect-square rounded-2xl bg-white/95
                              ring-2 ring-brand-accentDark/60 shadow-xl
                              backdrop-blur-sm">
                {COUNTRY_MAPS.map((c) => {
                  const mapUrl = `${MAP_BASE}${c.code.toLowerCase()}.svg`
                  return (
                    <Link
                      key={c.code}
                      to={`/country/${c.code.toLowerCase()}`}
                      aria-label={`Explore ${c.label}`}
                      title={c.label}
                      className="group relative grid place-items-center rounded-md
                                 bg-brand-accent/5 hover:bg-brand-accent/15
                                 transition-colors duration-300"
                    >
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-70 group-hover:opacity-100
                                   transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, rgba(158,199,58,0.55) 0%, transparent 70%)',
                          filter: 'blur(8px)',
                        }}
                      />
                      <div
                        className="relative w-[80%] h-[80%] transition-transform duration-300
                                   group-hover:scale-110"
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
                            'drop-shadow(0 0 6px rgba(158,199,58,0.7)) drop-shadow(0 0 2px rgba(158,199,58,0.5))',
                        }}
                      />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Outer city pins — flag medallion in the centre of one
             *  continuous pill that expands BOTH sides on hover/tap:
             *  "Read more" slides out to the left, country name slides
             *  out to the right. Symmetric growth keeps the flag (and
             *  the pin's coordinate) anchored. */}
            {orbitDots.map((d, i) => (
              <Link
                key={d.code}
                to={`/country/${d.code.toLowerCase()}`}
                aria-label={`Explore ${d.label}`}
                title={d.label}
                className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20"
                style={{ top: d.top, left: d.left }}
              >
                <div className="relative inline-flex items-center
                                bg-white rounded-full ring-2 ring-brand-accent/60 shadow-md
                                transition-shadow duration-300
                                group-hover:ring-brand-accent
                                group-hover:shadow-[0_0_20px_rgba(158,199,58,0.7)]">
                  {/* Halo behind the flag medallion */}
                  <span
                    aria-hidden="true"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                               w-10 h-10 rounded-full bg-brand-accent/40 pointer-events-none -z-10"
                    style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                  />

                  <div className="overflow-hidden max-w-0 group-hover:max-w-[110px]
                                  transition-all duration-300 ease-out">
                    <span className="block whitespace-nowrap pl-3 pr-1
                                     text-[9px] font-bold uppercase tracking-[0.22em] text-brand-accentDark">
                      Read more
                    </span>
                  </div>

                  <span className="relative grid place-items-center w-10 h-10 text-lg shrink-0">
                    {d.flag}
                  </span>

                  <div className="overflow-hidden max-w-0 group-hover:max-w-[140px]
                                  transition-all duration-300 ease-out">
                    <span className="block whitespace-nowrap pr-3 pl-1
                                     text-[11px] font-semibold text-brand-deep">
                      {d.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
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
