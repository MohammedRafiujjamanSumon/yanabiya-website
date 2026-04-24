import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ChevronRight, Globe2 } from 'lucide-react'
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
  /** Pulse-dot position on the globe mesh (% of container width / height). */
  dot: { top: string; left: string }
  /** Card corner position (Tailwind classes). One card per corner avoids
   *  overlap and gives a calm, airy composition. */
  corner: string
  /** Stagger delay for the floating animation so cards don't move in unison. */
  floatDelay: string
}

const cards: CountryCard[] = [
  {
    code: 'US', flag: '🇺🇸',
    name: 'United States',
    label: 'North America Operations',
    desc: 'North America presence',
    dot: { top: '46%', left: '24%' },
    corner: 'top-3 left-3',
    floatDelay: '0s',
  },
  {
    code: 'GB', flag: '🇬🇧',
    name: 'United Kingdom',
    label: 'European Operations',
    desc: 'European operations',
    dot: { top: '30%', left: '50%' },
    corner: 'top-3 right-3',
    floatDelay: '1.5s',
  },
  {
    code: 'OM', flag: '🇴🇲',
    name: 'Sultanate of Oman',
    label: 'Headquarters',
    desc: 'Headquarters · Gulf hub',
    dot: { top: '52%', left: '50%' },
    corner: 'bottom-3 left-3',
    floatDelay: '3s',
  },
  {
    code: 'BD', flag: '🇧🇩',
    name: 'Bangladesh',
    label: 'South Asia Operations',
    desc: 'South Asia delivery',
    dot: { top: '58%', left: '72%' },
    corner: 'bottom-3 right-3',
    floatDelay: '4.5s',
  },
]

function FloatingCard({ c, delay }: { c: CountryCard; delay: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <Link
      to={`/country/${c.code.toLowerCase()}`}
      ref={ref as never}
      className={`group absolute z-20 w-[180px] xl:w-[200px] ${c.corner}
                  rounded-xl bg-white/85 backdrop-blur-md border border-white/70
                  shadow-[0_10px_30px_-10px_rgba(15,58,35,0.25)]
                  px-3.5 py-3
                  transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  hover:bg-white hover:scale-[1.04] hover:shadow-[0_18px_40px_-10px_rgba(125,164,42,0.4)]
                  hover:z-30 animate-float
                  ${shown ? 'opacity-100' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms`, animationDelay: c.floatDelay, animationDuration: '8s' }}
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
    </Link>
  )
}

function GlobeMesh() {
  return (
    <>
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 grid place-items-center pointer-events-none"
      >
        <div className="w-[80%] h-[80%] rounded-full bg-brand-accent/15 blur-[80px] animate-gradient" />
      </div>

      {/* Concentric orbit rings */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
        {[0.92, 0.72, 0.52, 0.32].map((s, i) => (
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

      {/* Pulsing geographic dots — connect cards to globe visually */}
      {cards.map((c, i) => (
        <span
          key={c.code}
          aria-hidden="true"
          className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          style={{ left: c.dot.left, top: c.dot.top }}
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
    </>
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

          {/* RIGHT — globe-mesh + floating corner cards */}
          <Reveal delay={200} className="lg:col-span-7">
            {/* Desktop: globe with floating overlay cards in corners */}
            <div className="hidden lg:block relative w-full aspect-[5/4]
                            rounded-3xl bg-gradient-to-br from-[#f3f8ee] to-[#fbfdfb]
                            border border-slate-100 overflow-hidden">
              <GlobeMesh />
              {cards.map((c, i) => (
                <FloatingCard key={c.code} c={c} delay={250 + i * 130} />
              ))}
            </div>

            {/* Mobile / tablet: globe alone */}
            <div className="block lg:hidden relative w-full aspect-[5/4]
                            rounded-3xl bg-gradient-to-br from-[#f3f8ee] to-[#fbfdfb]
                            border border-slate-100 overflow-hidden">
              <GlobeMesh />
            </div>
          </Reveal>
        </div>

        {/* MOBILE / TABLET — stacked card grid below the globe */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 lg:hidden">
          {cards.map((c, i) => (
            <Reveal key={c.code} delay={i * 100}>
              <Link
                to={`/country/${c.code.toLowerCase()}`}
                className="group block rounded-xl bg-white/85 backdrop-blur-md border border-slate-200 p-4
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
