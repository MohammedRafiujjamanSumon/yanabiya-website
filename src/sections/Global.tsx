import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { assets } from '../data/assets'
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

/* The four offices, plotted around the orbit pyramid like points on a
 * globe — Yanabiya logo medallion sits at the centre, each country
 * silhouette card sits at its compass position (Oman·east, UK·north,
 * BD·south, USA·west) so the whole arrangement reads as the four
 * regions drawn together on a single round body. */
const COUNTRY_NODES = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       label: 'Muscat, Oman',      top: '50%', left: '78%' },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         label: 'London, UK',        top: '14%', left: '50%' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', label: 'Dhaka, Bangladesh', top: '88%', left: '50%' },
  { code: 'US', flag: '🇺🇸', name: 'USA',        label: 'Austin, USA',       top: '45%', left: '12%' },
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

            {/* Connecting lines from each country card to the centre logo */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 80"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {COUNTRY_NODES.map((d, i) => {
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

            {/* CENTRE — Yanabiya spinning logo medallion (restored). */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-xl
                              ring-2 ring-brand-accentDark/60 overflow-hidden
                              grid place-items-center animate-spin-slow">
                <img
                  src={assets.logo}
                  alt="Yanabiya Group"
                  className="w-full h-full object-contain scale-[1.35]"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
            </div>

            {/* COUNTRY NODES — silhouette cards plotted around the orbit at
             *  N / E / S / W like four regions drawn on a globe. Each card
             *  shows the country shape (glowing brand-accent gradient) +
             *  flag + name and links through to the country detail page. */}
            {COUNTRY_NODES.map((d, i) => {
              const mapUrl = `${MAP_BASE}${d.code.toLowerCase()}.svg`
              return (
                <Link
                  key={d.code}
                  to={`/country/${d.code.toLowerCase()}`}
                  aria-label={`Explore ${d.label}`}
                  title={d.label}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20"
                  style={{ top: d.top, left: d.left }}
                >
                  <div className="relative flex flex-col items-center gap-1.5 px-3 pt-3 pb-2
                                  w-[110px] md:w-[120px]
                                  rounded-2xl bg-white ring-2 ring-brand-accent/60 shadow-md
                                  transition-all duration-300
                                  group-hover:-translate-y-0.5 group-hover:ring-brand-accent
                                  group-hover:shadow-[0_0_24px_rgba(158,199,58,0.7)]">
                    {/* Pulsing halo behind the silhouette */}
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]
                                 w-14 h-14 rounded-full bg-brand-accent/40 pointer-events-none -z-10"
                      style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                    />

                    {/* Country silhouette */}
                    <div className="relative w-12 h-12 md:w-14 md:h-14">
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-70 group-hover:opacity-100
                                   transition-opacity duration-300 pointer-events-none"
                        style={{
                          background:
                            'radial-gradient(ellipse at center, rgba(158,199,58,0.55) 0%, transparent 70%)',
                          filter: 'blur(10px)',
                        }}
                      />
                      <div
                        className="relative w-full h-full transition-transform duration-300
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
                            'drop-shadow(0 0 8px rgba(158,199,58,0.7)) drop-shadow(0 0 2px rgba(158,199,58,0.5))',
                        }}
                      />
                    </div>

                    {/* Flag + name */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-base leading-none">{d.flag}</span>
                      <span className="text-[11px] md:text-xs font-semibold text-brand-deep leading-tight">
                        {d.name}
                      </span>
                    </div>
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
