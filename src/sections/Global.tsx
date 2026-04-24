import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
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

/* Approximate equirectangular coordinates (% of width / % of height) for the
 * 4 cities, mapped against the simplified continent SVG below. */
const cityPins = [
  { code: 'US', label: 'Austin',   x: 22, y: 46 },
  { code: 'GB', label: 'London',   x: 47, y: 32 },
  { code: 'OM', label: 'Muscat',   x: 60, y: 52 },
  { code: 'BD', label: 'Dhaka',    x: 71, y: 50 },
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

        {/* ───────── 2. VISUAL AREA — stylised world map ───────── */}
        <Reveal delay={150}>
          <div className="mt-14 relative mx-auto w-full max-w-5xl aspect-[2.4/1] rounded-3xl
                          bg-gradient-to-b from-[#f3f8ee] to-[#fbfdfb] border border-slate-100
                          overflow-hidden">
            {/* Soft brand-accent halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[55%] h-[80%] rounded-full bg-brand-accent/15 blur-[100px]" />
            </div>

            {/* Stylised continent silhouettes — low-opacity blobs that read as a world map
                without pulling in a heavy real-map asset */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 42"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="continent" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%"  stopColor="rgba(125,164,42,0.18)" />
                  <stop offset="100%" stopColor="rgba(125,164,42,0.08)" />
                </linearGradient>
              </defs>
              {/* North America */}
              <path d="M5,12 Q10,7 18,9 Q24,11 26,18 Q24,24 18,25 Q10,24 6,20 Z" fill="url(#continent)" />
              {/* South America */}
              <path d="M22,26 Q26,28 27,33 Q25,38 22,38 Q19,34 20,29 Z" fill="url(#continent)" />
              {/* Europe */}
              <path d="M44,15 Q49,12 53,15 Q54,19 50,22 Q46,21 44,18 Z" fill="url(#continent)" />
              {/* Africa */}
              <path d="M48,22 Q54,21 56,28 Q55,35 50,36 Q46,32 47,26 Z" fill="url(#continent)" />
              {/* Asia */}
              <path d="M55,12 Q66,9 78,14 Q82,20 78,26 Q70,28 60,25 Q56,21 55,16 Z" fill="url(#continent)" />
              {/* India / South Asia */}
              <path d="M68,24 Q72,23 73,28 Q70,32 67,30 Z" fill="url(#continent)" />
              {/* Australia */}
              <path d="M80,30 Q86,29 88,33 Q86,36 81,35 Z" fill="url(#continent)" />

              {/* Connection lines between Yanabiya cities */}
              <g stroke="rgba(125,164,42,0.45)" strokeWidth="0.18" strokeDasharray="0.9 0.6" fill="none">
                <line x1="22" y1="46" x2="47" y2="32" />
                <line x1="47" y1="32" x2="60" y2="52" />
                <line x1="60" y1="52" x2="71" y2="50" />
                <line x1="22" y1="46" x2="60" y2="52" />
              </g>
            </svg>

            {/* Pulsing city pins + labels */}
            {cityPins.map((p, i) => (
              <div
                key={p.code}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="relative block">
                  <span
                    className="absolute inset-0 rounded-full bg-brand-accent/40"
                    style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                  />
                  <span className="relative block w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(158,199,58,0.6)]" />
                </span>
                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600
                                 bg-white/85 backdrop-blur px-2 py-0.5 rounded-full whitespace-nowrap">
                  {p.label}
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
