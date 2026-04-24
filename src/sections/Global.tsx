import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Section from '../components/Section'
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

type CountryCard = {
  code: 'OM' | 'GB' | 'BD' | 'US'
  flag: string
  name: string
  label: string
  desc: string
  /** Position on the map container (% of width / height). Anchored bottom-center
   *  so the card sits "above" its geographic point with a small offset arrow. */
  x: number
  y: number
  /** Card alignment relative to its anchor — controls the translate so cards
   *  don't fall off the edges of the map. */
  anchor: 'left' | 'right' | 'center'
}

const cards: CountryCard[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States',  label: 'North America Operations', desc: 'North America presence',   x: 18, y: 48, anchor: 'left'   },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', label: 'European Operations',      desc: 'European operations',       x: 46, y: 26, anchor: 'center' },
  { code: 'OM', flag: '🇴🇲', name: 'Sultanate of Oman', label: 'Headquarters',         desc: 'Headquarters · Gulf hub',   x: 58, y: 60, anchor: 'center' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',     label: 'South Asia Operations',    desc: 'South Asia delivery',       x: 76, y: 56, anchor: 'right'  },
]

function FloatingCard({ c, delay }: { c: CountryCard; delay: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const translateX =
    c.anchor === 'left'   ? 'translate-x-0'
    : c.anchor === 'right' ? '-translate-x-full'
    : '-translate-x-1/2'

  return (
    <Link
      to={`/country/${c.code.toLowerCase()}`}
      ref={ref as never}
      className={`group absolute z-10 w-[200px] ${translateX} -translate-y-full
                  rounded-xl bg-white/80 backdrop-blur-md border border-white/70
                  shadow-[0_10px_30px_-10px_rgba(15,58,35,0.25)]
                  px-3.5 py-3
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:bg-white hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(125,164,42,0.35)]
                  ${shown ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
      style={{ left: `${c.x}%`, top: `${c.y}%`, transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-2">
        <span className="text-xl leading-none mt-0.5">{c.flag}</span>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-[13px] font-semibold text-slate-900 leading-tight truncate">
            {c.name}
          </div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.16em] text-brand-accentDark font-semibold">
            {c.label}
          </div>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-slate-600 leading-snug">{c.desc}</p>
      <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider
                      text-slate-400 group-hover:text-brand-accentDark transition-colors">
        Explore
        <ChevronRight size={10} className="transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>

      {/* Pin / pointer connecting card to its geographic dot */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-2 ${
          c.anchor === 'left'   ? 'left-4'
          : c.anchor === 'right' ? 'right-4'
          : 'left-1/2 -translate-x-1/2'
        } w-2 h-2 rotate-45 bg-white/80 border-r border-b border-white/70`}
      />
    </Link>
  )
}

function MapVisual({ withFloatingCards = false }: { withFloatingCards?: boolean }) {
  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl
                    bg-gradient-to-br from-[#f3f8ee] to-[#fbfdfb]
                    border border-slate-100 overflow-hidden">
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <div className="w-[60%] h-[70%] rounded-full bg-brand-accent/12 blur-[100px]" />
      </div>

      {/* Stylised continent silhouettes — abstract, low-opacity */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 75"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="g-continent" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"  stopColor="rgba(125,164,42,0.22)" />
            <stop offset="100%" stopColor="rgba(125,164,42,0.08)" />
          </linearGradient>
        </defs>
        {/* North America */}
        <path d="M5,22 Q12,14 22,16 Q30,20 30,30 Q26,40 18,40 Q10,38 6,32 Z" fill="url(#g-continent)" />
        {/* South America */}
        <path d="M24,42 Q30,44 31,52 Q29,60 24,60 Q20,54 22,46 Z" fill="url(#g-continent)" />
        {/* Europe */}
        <path d="M42,20 Q50,16 56,22 Q56,28 50,30 Q44,28 42,24 Z" fill="url(#g-continent)" />
        {/* Africa */}
        <path d="M48,32 Q56,30 58,42 Q56,56 50,58 Q44,52 46,38 Z" fill="url(#g-continent)" />
        {/* Asia */}
        <path d="M55,18 Q70,12 86,18 Q90,28 84,36 Q72,40 60,36 Q56,28 55,22 Z" fill="url(#g-continent)" />
        {/* India / South Asia */}
        <path d="M70,36 Q76,34 78,44 Q72,50 68,46 Z" fill="url(#g-continent)" />
        {/* Australia */}
        <path d="M82,52 Q90,50 92,58 Q88,62 82,60 Z" fill="url(#g-continent)" />

        {/* Connection arcs between Yanabiya cities */}
        <g stroke="rgba(125,164,42,0.45)" strokeWidth="0.16" strokeDasharray="0.9 0.6" fill="none">
          <path d="M 18 48 Q 32 30 46 26" />
          <path d="M 46 26 Q 52 38 58 60" />
          <path d="M 58 60 Q 67 56 76 56" />
          <path d="M 18 48 Q 38 60 58 60" />
        </g>
      </svg>

      {/* Geographic anchor dots — visible behind the cards */}
      {cards.map((c, i) => (
        <span
          key={c.code}
          aria-hidden="true"
          className="absolute -translate-x-1/2 -translate-y-1/2 z-0"
          style={{ left: `${c.x}%`, top: `${c.y}%` }}
        >
          <span className="relative block">
            <span
              className="absolute inset-0 rounded-full bg-brand-accent/40"
              style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
            />
            <span className="relative block w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_10px_rgba(158,199,58,0.6)]" />
          </span>
        </span>
      ))}

      {/* Floating cards (desktop only) */}
      {withFloatingCards && cards.map((c, i) => (
        <FloatingCard key={c.code} c={c} delay={250 + i * 130} />
      ))}
    </div>
  )
}

export default function Global() {
  const { t } = useTranslation()

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x py-20 md:py-24">

        {/* ───────── 2-COLUMN LAYOUT ───────── */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* LEFT — title + description */}
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

          {/* RIGHT — map with floating cards (desktop) */}
          <Reveal delay={200} className="lg:col-span-7">
            {/* Desktop: map + floating overlay cards */}
            <div className="hidden lg:block">
              <MapVisual withFloatingCards />
            </div>
            {/* Mobile / tablet: map alone */}
            <div className="block lg:hidden">
              <MapVisual />
            </div>
          </Reveal>
        </div>

        {/* MOBILE / TABLET — stacked card grid below the map */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 lg:hidden">
          {cards.map((c, i) => (
            <Reveal key={c.code} delay={i * 100}>
              <Link
                to={`/country/${c.code.toLowerCase()}`}
                className="group block rounded-xl bg-white/80 backdrop-blur-md border border-slate-200 p-4
                           hover:border-brand-accent/40 hover:-translate-y-0.5 hover:shadow-lg
                           transition-all duration-300"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-2xl leading-none">{c.flag}</span>
                  <div className="min-w-0">
                    <div className="font-serif text-[15px] font-semibold text-slate-900 leading-tight">
                      {c.name}
                    </div>
                    <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-brand-accentDark font-semibold">
                      {c.label}
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider
                                text-slate-400 group-hover:text-brand-accentDark transition-colors">
                  Explore <ChevronRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </div>
    </Section>
  )
}
