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

/* Orbit ring assignments (innermost → outermost):
 *   Oman  → ring 1 (scale 0.35), placed east of centre
 *   UK    → ring 2 (scale 0.55), placed north
 *   BD    → ring 3 (scale 0.75), placed south-east
 *   USA   → ring 4 (scale 0.95), placed north-west
 * Position formula: left% = 50 + scale*50·cos(θ), top% = 50 + scale*50·sin(θ). */
/* Orbit ring assignments (innermost ring is 1, outermost is 5):
 *   Oman → ring 2, east
 *   UK   → ring 3, north
 *   BD   → ring 4, south
 *   USA  → ring 5 (outermost), west
 * `name` is what appears in the hover-expand label.
 * `expand` is which side the label slides out to so it stays inside
 * the visible orbit area. */
const orbitDots = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       label: 'Muscat, Oman',       top: '50%', left: '69%', expand: 'left'  as const },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         label: 'London, UK',         top: '22%', left: '50%', expand: 'right' as const },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', label: 'Dhaka, Bangladesh',  top: '85%', left: '50%', expand: 'right' as const },
  { code: 'US', flag: '🇺🇸', name: 'USA',        label: 'Austin, USA',        top: '45%', left: '5%',  expand: 'right' as const },
]

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

        {/* ───────── GEOMAP — sits BELOW the text ───────── */}
        <Reveal delay={1080}>
          <div className="relative aspect-[5/4] w-full max-w-[640px] mx-auto mt-12 md:mt-16">
            {/* Soft halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[80%] h-[80%] rounded-full bg-brand-accent/30 blur-[80px] animate-gradient" />
            </div>

            {/* Concentric orbit rings — 5 rings so each office can sit
             *  on its own (Oman·2, UK·3, BD·4, USA·5/outermost). */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              {[0.92, 0.74, 0.56, 0.38, 0.20].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-brand-accentDark/40"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
            </div>

            {/* Centre — spinning Yanabiya logo medallion. Same circle
             *  size as before; the logo is scaled up inside it to fill
             *  the disc instead of sitting with padding around it. */}
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

            {/* Connecting lines from each dot to the centre */}
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

            {/* Outer city pins — flag medallion by default; on hover/tap
             *  the card extends horizontally to show the country name +
             *  "Read more →" label. Direction (left/right) is per pin so
             *  the expansion always stays inside the orbit area. */}
            {orbitDots.map((d, i) => {
              const expandsLeft = d.expand === 'left'
              return (
                <Link
                  key={d.code}
                  to={`/country/${d.code.toLowerCase()}`}
                  aria-label={`Explore ${d.label}`}
                  title={d.label}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20"
                  style={{ top: d.top, left: d.left }}
                >
                  <div className={`relative inline-flex items-center ${expandsLeft ? 'flex-row-reverse' : ''}`}>
                    {/* Halo behind the flag medallion (stays a circle, doesn't expand) */}
                    <span
                      aria-hidden="true"
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-accent/40 pointer-events-none"
                      style={{
                        ...(expandsLeft ? { right: 0 } : { left: 0 }),
                        animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite`,
                      }}
                    />
                    {/* Flag medallion — anchor of the pin */}
                    <span
                      className="relative inline-grid place-items-center w-10 h-10 rounded-full bg-white
                                 ring-2 ring-brand-accent/60 shadow-md text-lg shrink-0
                                 transition-all duration-300
                                 group-hover:ring-brand-accent
                                 group-hover:shadow-[0_0_20px_rgba(158,199,58,0.7)]"
                    >
                      {d.flag}
                    </span>
                    {/* Expanding label — slides out from the flag on hover */}
                    <div
                      className={`relative overflow-hidden whitespace-nowrap
                                  transition-all duration-300 ease-out
                                  max-w-0 group-hover:max-w-[200px]
                                  ${expandsLeft ? 'pr-1' : 'pl-1'}`}
                    >
                      <div
                        className={`flex flex-col leading-tight px-2.5 py-1 rounded-full
                                    bg-white/95 backdrop-blur ring-1 ring-brand-accent/40
                                    shadow-md
                                    ${expandsLeft ? 'items-end' : 'items-start'}`}
                      >
                        <span className="text-[11px] font-semibold text-brand-deep">
                          {d.name}
                        </span>
                        <span className="text-[8px] uppercase tracking-[0.18em] text-brand-accentDark inline-flex items-center gap-0.5">
                          {expandsLeft ? '← Read more' : 'Read more →'}
                        </span>
                      </div>
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
