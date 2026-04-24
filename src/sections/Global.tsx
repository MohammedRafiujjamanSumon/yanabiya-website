import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight } from 'lucide-react'
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

/* Outer cities (Oman is the centre, so it's not in this list). */
const orbitDots = [
  { code: 'GB', label: 'London, UK',         top: '22%', left: '50%' },
  { code: 'BD', label: 'Dhaka, Bangladesh',  top: '54%', left: '82%' },
  { code: 'US', label: 'Austin, USA',        top: '46%', left: '12%' },
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

              {/* Connecting lines: outer city → Oman centre, with a flowing dash
                  that travels in and "arrives" at the centre on every loop. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 80"
                className="absolute inset-0 w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Background hairline guide for each link */}
                {orbitDots.map((d) => {
                  const x = parseFloat(d.left)
                  const y = parseFloat(d.top) * 0.8
                  return (
                    <line
                      key={`${d.code}-base`}
                      x1="50" y1="40" x2={x} y2={y}
                      stroke="rgba(125,164,42,0.18)"
                      strokeWidth="0.18"
                    />
                  )
                })}
                {/* Flowing signal — short dash that travels from outer city into centre */}
                {orbitDots.map((d, i) => {
                  const x = parseFloat(d.left)
                  const y = parseFloat(d.top) * 0.8
                  return (
                    <line
                      key={`${d.code}-flow`}
                      x1={x} y1={y} x2="50" y2="40"
                      stroke="rgba(125,164,42,0.95)"
                      strokeWidth="0.35"
                      strokeLinecap="round"
                      className="animate-svg-flow"
                      style={{ animationDelay: `${i * 0.6}s` }}
                    />
                  )
                })}
              </svg>

              {/* CENTRE — Oman country silhouette as the HQ "goal box" */}
              <div className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="relative">
                  <span
                    className="absolute inset-0 rounded-full bg-brand-accent/35 blur-md"
                    style={{ animation: 'haloPulse 3s ease-in-out infinite' }}
                  />
                  <div className="relative w-24 h-24 rounded-full bg-white shadow-xl ring-2 ring-brand-accent
                                  grid place-items-center overflow-hidden">
                    {/* Stylised Oman country outline — recognisable boomerang shape
                        along the SE Arabian peninsula */}
                    <svg viewBox="0 0 100 100" className="w-14 h-14">
                      <defs>
                        <linearGradient id="om-fill" x1="0" x2="1" y1="0" y2="1">
                          <stop offset="0%"  stopColor="#9ec73a" />
                          <stop offset="100%" stopColor="#7da42a" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 22 38 Q 28 24 44 22 Q 56 22 64 28 L 78 36 Q 84 44 80 56 Q 74 70 60 74 Q 46 78 34 70 Q 22 60 20 50 Z"
                        fill="url(#om-fill)"
                        stroke="#0f3a23"
                        strokeWidth="1.2"
                      />
                      {/* Musandam enclave (small piece up north) */}
                      <path
                        d="M 70 14 Q 78 10 82 16 Q 80 22 72 22 Z"
                        fill="url(#om-fill)"
                        stroke="#0f3a23"
                        strokeWidth="1.2"
                      />
                      {/* Capital marker — Muscat */}
                      <circle cx="62" cy="34" r="3" fill="#fff" stroke="#0f3a23" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 whitespace-nowrap
                                  text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-accentDark
                                  bg-white/85 backdrop-blur px-2.5 py-0.5 rounded-full">
                    Muscat, Oman · HQ
                  </div>
                </div>
              </div>

              {/* Outer city pulse dots + labels */}
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
