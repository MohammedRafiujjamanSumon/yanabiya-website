import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight, Globe2 } from 'lucide-react'
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
  { code: 'OM', label: 'Muscat, Oman',       top: '64%', left: '56%' },
  { code: 'GB', label: 'London, UK',         top: '24%', left: '46%' },
  { code: 'BD', label: 'Dhaka, Bangladesh',  top: '54%', left: '78%' },
  { code: 'US', label: 'Austin, USA',        top: '44%', left: '14%' },
]

const cardTags: Record<string, { label: string; desc: string }> = {
  OM: { label: 'Headquarters',          desc: 'Headquarters · Gulf hub'  },
  GB: { label: 'European Operations',   desc: 'European operations'      },
  BD: { label: 'South Asia Operations', desc: 'South Asia delivery'      },
  US: { label: 'North America Operations', desc: 'North America presence' },
}

export default function Global() {
  const { t } = useTranslation()

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x py-20 md:py-24">

        {/* ───────── 2-COLUMN HEADER + GEOMAP ───────── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT — title + description + CTA */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-5">
                {t('global.eyebrow', 'Global Presence')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-slate-900">
                We operate across
                <span className="block text-brand-accentDark">four countries.</span>
              </h2>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-md">
                One coordinated network — not separate offices. Every market we
                enter is wired into the same operating discipline.
              </p>
            </Reveal>
            <Reveal delay={420}>
              <div className="mt-8">
                <Link
                  to="/about-us#presence"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3
                             bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                             shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                             transition-all duration-300"
                >
                  Explore Global Presence
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — labeled globe-mesh (the "geomap" from About) */}
          <Reveal delay={200} className="lg:col-span-7">
            <div className="relative aspect-[5/4] w-full max-w-[640px] mx-auto">
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

              {/* Globe icon centre */}
              <div className="absolute inset-0 grid place-items-center">
                <div className="w-20 h-20 rounded-full bg-white shadow-xl ring-2 ring-brand-accent/20
                                grid place-items-center text-brand-accentDark animate-spin-slow">
                  <Globe2 size={36} strokeWidth={1.4} />
                </div>
              </div>

              {/* Connecting lines: Oman (HQ) is the hub — every other city links to it */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 80"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                {(() => {
                  const oman = orbitDots.find((d) => d.code === 'OM')!
                  const ox = parseFloat(oman.left)
                  const oy = parseFloat(oman.top) * 0.8
                  return orbitDots
                    .filter((d) => d.code !== 'OM')
                    .map((d, i) => {
                      const x = parseFloat(d.left)
                      const y = parseFloat(d.top) * 0.8
                      return (
                        <line
                          key={d.code}
                          x1={ox} y1={oy} x2={x} y2={y}
                          stroke="rgba(125,164,42,0.55)"
                          strokeWidth="0.3"
                          strokeDasharray="0.9 0.7"
                          style={{ animation: `dividerGrow 4s ease-in-out ${i * 0.3}s infinite` }}
                        />
                      )
                    })
                })()}
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
        </div>

        {/* ───────── COUNTRY CARDS GRID — below the 2-column block ───────── */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {countries.map((c, i) => {
            const tag = cardTags[c.code] ?? { label: c.role, desc: c.role }
            return (
              <Reveal key={c.code} delay={i * 100}>
                <Link
                  to={`/country/${c.code.toLowerCase()}`}
                  className="group block rounded-2xl bg-white/85 backdrop-blur-md border border-slate-200 p-5 h-full
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
                        {tag.label}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">{tag.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider
                                  text-slate-400 group-hover:text-brand-accentDark transition-colors">
                    Explore
                    <ChevronRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>

      </div>
    </Section>
  )
}
