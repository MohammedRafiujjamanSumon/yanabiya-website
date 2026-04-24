import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, Globe2 } from 'lucide-react'
import Section from '../components/Section'
import { countries } from '../data/countries'
import { useReveal } from '../hooks/useReveal'

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
  { code: 'OM', label: 'Muscat',  top: '50%', left: '54%' },
  { code: 'GB', label: 'London',  top: '32%', left: '48%' },
  { code: 'BD', label: 'Dhaka',   top: '54%', left: '70%' },
  { code: 'US', label: 'Austin',  top: '46%', left: '22%' },
]

const cardTags: Record<string, string> = {
  OM: 'Headquarters · Gulf hub',
  GB: 'European operations',
  BD: 'South Asia delivery',
  US: 'North America presence',
}

export default function Global() {
  const { t } = useTranslation()

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x py-20 md:py-24">

        {/* ───────── 1. HEADER ───────── */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              {t('global.eyebrow', 'Global Presence')}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-slate-900">
              We operate across
              <span className="block text-brand-accentDark">four countries.</span>
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              One coordinated network — not separate offices. Every market we enter
              is wired into the same operating discipline.
            </p>
          </div>
        </Reveal>

        {/* ───────── 2. VISUAL AREA — globe mesh with city pulse dots ───────── */}
        <Reveal delay={150}>
          <div className="mt-14 relative mx-auto w-full max-w-3xl aspect-[5/4]">
            {/* Soft halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[80%] h-[80%] rounded-full bg-brand-accent/15 blur-[80px] animate-gradient" />
            </div>

            {/* Concentric orbit rings */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              {[0.95, 0.75, 0.55, 0.35].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-brand-accent/20"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
            </div>

            {/* Globe icon center */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl ring-2 ring-brand-accent/20
                              grid place-items-center text-brand-accentDark animate-spin-slow">
                <Globe2 size={36} strokeWidth={1.4} />
              </div>
            </div>

            {/* Connecting lines from each dot to the center */}
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
                    stroke="rgba(125,164,42,0.35)"
                    strokeWidth="0.2"
                    strokeDasharray="0.8 0.6"
                    style={{ animation: `dividerGrow 4s ease-in-out ${i * 0.3}s infinite` }}
                  />
                )
              })}
            </svg>

            {/* City pulse dots + labels */}
            {orbitDots.map((d, i) => (
              <div
                key={d.code}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
                style={{ top: d.top, left: d.left }}
              >
                <span
                  className="block w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(158,199,58,0.7)]"
                  style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600
                                 bg-white/85 backdrop-blur px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ───────── 3. COUNTRY CARDS GRID ───────── */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((c, i) => (
            <Reveal key={c.code} delay={i * 100}>
              <Link
                to={`/country/${c.code.toLowerCase()}`}
                className="group block rounded-2xl bg-white border border-slate-200 p-5 h-full
                           hover:border-brand-accent/40 hover:-translate-y-1
                           hover:shadow-[0_20px_60px_-20px_rgba(158,199,58,0.35)]
                           transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className="text-3xl leading-none shrink-0">{c.flag}</div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg leading-tight text-slate-900">
                      {c.name}
                    </h3>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-brand-accentDark font-semibold">
                      {c.role}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                  {cardTags[c.code] ?? c.role}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider
                                text-slate-400 group-hover:text-brand-accentDark transition-colors">
                  Explore
                  <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* ───────── 4. CTA ───────── */}
        <Reveal delay={400}>
          <div className="mt-12 text-center">
            <Link
              to="/about-us#presence"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                         bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                         shadow-md hover:bg-brand-accentDark hover:shadow-xl hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Global Presence
              <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>

      </div>
    </Section>
  )
}
