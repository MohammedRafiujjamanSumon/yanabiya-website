import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Globe2 } from 'lucide-react'
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

const orbitDots = [
  { code: 'OM', flag: '🇴🇲', label: 'Muscat, Oman',       top: '64%', left: '56%' },
  { code: 'GB', flag: '🇬🇧', label: 'London, UK',         top: '24%', left: '46%' },
  { code: 'BD', flag: '🇧🇩', label: 'Dhaka, Bangladesh',  top: '54%', left: '78%' },
  { code: 'US', flag: '🇺🇸', label: 'Austin, USA',        top: '44%', left: '14%' },
]

export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x pt-4 md:pt-6 pb-14 md:pb-20">

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

          {/* Country pins — surfaced right under the headline so the four
           *  hubs read at a glance before the descriptive copy. */}
          <Reveal delay={220}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-slate-700">
              <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none">🇴🇲</span> Muscat, Oman</span>
              <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none">🇬🇧</span> London, United Kingdom</span>
              <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none">🇧🇩</span> Dhaka, Bangladesh</span>
              <span className="inline-flex items-center gap-1.5"><span className="text-base leading-none">🇺🇸</span> Austin, United States</span>
            </div>
          </Reveal>

          {/* Description — split into individual lines so each reveals
           *  on scroll one after the other; justified so both edges align. */}
          <div className="mt-6 max-w-3xl mx-auto space-y-1 text-base md:text-lg text-slate-600 leading-relaxed text-justify [text-align-last:center]">
            <Reveal delay={380}>
              <p>We operate through a coordinated structure across key global markets,</p>
            </Reveal>
            <Reveal delay={540}>
              <p>where every location follows shared systems, standards,</p>
            </Reveal>
            <Reveal delay={700}>
              <p>and strategic direction.</p>
            </Reveal>
          </div>
          <Reveal delay={900}>
            <div className="mt-8">
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

            {/* Concentric orbit rings */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              {[0.95, 0.75, 0.55, 0.35].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-brand-accentDark/40"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
            </div>

            {/* Globe icon centre */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl ring-2 ring-brand-accentDark/60
                              grid place-items-center text-brand-deep animate-spin-slow">
                <Globe2 size={36} strokeWidth={1.6} />
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

            {/* Outer city pins — clickable flag cards routing to each country page */}
            {orbitDots.map((d, i) => (
              <Link
                key={d.code}
                to={`/country/${d.code.toLowerCase()}`}
                aria-label={`Explore ${d.label}`}
                className="group absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 z-10
                           hover:z-20"
                style={{ top: d.top, left: d.left }}
              >
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-brand-accent/40"
                    style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                  />
                  <span
                    className="relative inline-grid place-items-center w-9 h-9 rounded-full bg-white
                               ring-2 ring-brand-accent/60 shadow-md text-base
                               transition-all duration-300
                               group-hover:scale-110 group-hover:ring-brand-accent
                               group-hover:shadow-[0_0_20px_rgba(158,199,58,0.7)]"
                  >
                    {d.flag}
                  </span>
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600
                                 bg-white/85 backdrop-blur px-2.5 py-0.5 rounded-full whitespace-nowrap
                                 transition-colors duration-300 group-hover:text-brand-accentDark">
                  {d.label}
                </span>
              </Link>
            ))}
          </div>
        </Reveal>

      </div>

      <GlobalOverviewPanel open={presenceOpen} onClose={() => setPresenceOpen(false)} />
    </Section>
  )
}
