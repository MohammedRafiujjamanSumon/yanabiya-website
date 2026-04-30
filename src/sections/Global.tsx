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
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       capital: 'Muscat',  label: 'Muscat, Oman',      top: '50%', left: '82%' },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         capital: 'London',  label: 'London, UK',        top: '18%', left: '50%' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', capital: 'Dhaka',   label: 'Dhaka, Bangladesh', top: '82%', left: '50%' },
  { code: 'US', flag: '🇺🇸', name: 'USA',        capital: 'Austin',  label: 'Austin, USA',       top: '50%', left: '18%' },
]

const MAP_BASE = `${import.meta.env.BASE_URL}maps/`

export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)
  const [flippedCode, setFlippedCode] = useState<string | null>(null)

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

            {/* CENTRE — Yanabiya logo medallion, fixed (no spin). Sized
             *  down from 80/96 to 56/64 so the whole orbit reads clean. */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white shadow-xl
                              ring-2 ring-brand-accentDark/60 overflow-hidden
                              grid place-items-center">
                <img
                  src={assets.logo}
                  alt="Yanabiya Group"
                  className="w-full h-full object-contain scale-[1.35]"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                {/* No spin — logo sits still in the centre. */}
              </div>
            </div>

            {/* COUNTRY NODES — flag-filled silhouettes that flip on touch
             *  to reveal a green card with flag + capital + country +
             *  "Explore about <country>" link in white text. */}
            {COUNTRY_NODES.map((d) => {
              const mapUrl = `${MAP_BASE}${d.code.toLowerCase()}.svg`
              const flagUrl = `${MAP_BASE}flags/${d.code.toLowerCase()}.svg`
              const isFlipped = flippedCode === d.code
              return (
                <button
                  key={d.code}
                  type="button"
                  onClick={() =>
                    setFlippedCode((prev) => (prev === d.code ? null : d.code))
                  }
                  aria-label={`Toggle ${d.label} details`}
                  aria-pressed={isFlipped ? 'true' : 'false'}
                  title={d.label}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20
                             [perspective:1200px] focus:outline-none"
                  style={{ top: d.top, left: d.left }}
                >
                  <div
                    className="relative w-40 h-40 md:w-44 md:h-44
                               transition-transform duration-700 ease-out
                               [transform-style:preserve-3d]"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front — flag-filled country silhouette */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden]
                                 [-webkit-backface-visibility:hidden]"
                    >
                      <div
                        className="w-full h-full transition-transform duration-300
                                   group-hover:scale-105"
                        style={{
                          WebkitMaskImage: `url(${mapUrl})`,
                          maskImage: `url(${mapUrl})`,
                          WebkitMaskSize: 'contain',
                          maskSize: 'contain',
                          WebkitMaskRepeat: 'no-repeat',
                          maskRepeat: 'no-repeat',
                          WebkitMaskPosition: 'center',
                          maskPosition: 'center',
                          backgroundImage: `url(${flagUrl})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                    </div>

                    {/* Back — green rounded card with white text */}
                    <div
                      className="absolute inset-0 rounded-3xl
                                 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800
                                 ring-2 ring-emerald-300/50 shadow-[0_8px_24px_rgba(15,58,35,0.4)]
                                 grid place-items-center text-center text-white
                                 [backface-visibility:hidden]
                                 [-webkit-backface-visibility:hidden]"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div className="px-3 py-3 flex flex-col items-center gap-1">
                        <span className="text-3xl leading-none drop-shadow-md">
                          {d.flag}
                        </span>
                        <div className="text-[11px] uppercase tracking-[0.18em] text-emerald-100/85
                                        font-semibold mt-1">
                          {d.capital}
                        </div>
                        <div className="text-base font-bold leading-tight">
                          {d.name}
                        </div>
                        <Link
                          to={`/country/${d.code.toLowerCase()}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center gap-1 px-2 py-1 rounded-full
                                     bg-white/15 hover:bg-white/25 ring-1 ring-white/40
                                     text-[9px] font-bold uppercase tracking-wider
                                     transition-colors"
                        >
                          Explore about {d.name}
                          <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </button>
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
