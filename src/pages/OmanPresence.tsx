import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import BackButton from '../components/BackButton'

/* ───────────────────────── Reveal helper (subtle, editorial) ───────────────────────── */
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────── Data ───────────────────────── */

/* Each node holds its (x, y) on the map (% of container) plus an `align`
 * controlling whether the text label sits left or right of the dot. */
type NodeAlign = 'left' | 'right'
const HQ = { name: 'Muscat HQ', x: 80, y: 32 } as const

const partners: { name: string; category: string; x: number; y: number; align: NodeAlign }[] = [
  { name: 'Yanabiya Muscat United Trade',                category: 'Trade & Commerce',     x: 70, y: 22, align: 'right' },
  { name: 'Yanabiya Muscat for Comprehensive Projects',  category: 'Construction',         x: 60, y: 18, align: 'right' },
  { name: 'Yanabiya Muscat Integrated LLC',              category: 'Diversified Holdings', x: 50, y: 30, align: 'right' },
  { name: 'Yanabiya Al Khairat United Trade LLC',        category: 'Trade & Commerce',     x: 86, y: 46, align: 'left'  },
  { name: 'Yanabiya Muscat World Business',              category: 'Business Services',    x: 72, y: 56, align: 'right' },
  { name: 'Yanabiya Muscat Al Mumyazat',                 category: 'Services',             x: 56, y: 62, align: 'right' },
  { name: 'Yanabiya Al Rustaq Contracting',              category: 'Contracting',          x: 38, y: 42, align: 'right' },
]

const activities: { title: string; items: string[] }[] = [
  {
    title: 'Infrastructure & Construction',
    items: ['Building & Civil Works', 'Electrical Networks', 'Interior Finishing'],
  },
  {
    title: 'Logistics & Industrial Services',
    items: ['Warehousing & Transport', 'Loading & Packaging', 'Maritime Services'],
  },
  {
    title: 'Technology & IT Solutions',
    items: ['Cloud Infrastructure', 'Cyber Security', 'Software Development'],
  },
  {
    title: 'Trade & Commercial Operations',
    items: ['Import & Export', 'Retail & Wholesale Trading'],
  },
  {
    title: 'Hospitality & Services',
    items: ['Catering', 'Facility Support'],
  },
]

/* ───────────────────────── Page ───────────────────────── */

export default function OmanPresence() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="bg-white text-slate-900">
      <BackButton to="/#global" label="Back to Global" />

      {/* ───────── 1. HERO ───────── */}
      <section className="relative">
        <div className="container-x py-24 md:py-32 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-blue-700 mb-6">
              Sultanate of Oman
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-slate-900">
              Oman Global Presence
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-6 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Yanabiya Group — Integrated Business Network in Sultanate of Oman
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10 mx-auto w-12 h-px bg-slate-900" />
          </Reveal>
        </div>
      </section>

      {/* ───────── 2. PARTNER NETWORK MAP ───────── */}
      <section className="relative border-t border-slate-100">
        <div className="container-x py-20 md:py-28">

          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                Partner Network
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                A unified group operating across Muscat.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Strategic business entities operating across Oman under one integrated
                ecosystem — every venture connected back to the Muscat headquarters.
              </p>
            </div>
          </Reveal>

          {/* Map canvas */}
          <Reveal delay={200}>
            <div className="mt-12 relative w-full aspect-[16/9] bg-[#fafafa] border border-slate-100 rounded-sm">
              {/* Subtle Arabian peninsula outline */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 56.25"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <g
                  fill="none"
                  stroke="rgba(15,23,42,0.18)"
                  strokeWidth="0.18"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  {/* Stylised Arabian peninsula — Saudi mass + UAE bump + Oman coastline + Yemen */}
                  <path d="M 8 18 Q 18 10 34 12 Q 50 13 64 14 Q 74 12 82 16 L 90 22 Q 94 28 92 36 L 88 44 Q 80 50 70 50 L 56 50 Q 42 50 30 46 L 18 40 Q 10 32 10 24 Z" />
                  {/* Musandam enclave (UAE / Oman north tip) */}
                  <path d="M 78 6 Q 84 4 88 8 L 86 14 Q 80 14 78 10 Z" />
                  {/* Qatar peninsula nub */}
                  <path d="M 56 18 L 58 26 L 56 28 L 54 22 Z" />
                </g>
                {/* Faint grid for the dashboard feel */}
                <g stroke="rgba(15,23,42,0.05)" strokeWidth="0.1">
                  {[12, 24, 36, 48].map((y) => (
                    <line key={`h-${y}`} x1="0" x2="100" y1={y} y2={y} />
                  ))}
                  {[20, 40, 60, 80].map((x) => (
                    <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="56.25" />
                  ))}
                </g>
              </svg>

              {/* Connection lines: every partner → Muscat HQ, with slow flowing dash */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 56.25"
                className="absolute inset-0 w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Static hairline base */}
                {partners.map((p) => {
                  const x = p.x
                  const y = p.y * 0.5625
                  return (
                    <line
                      key={`${p.name}-base`}
                      x1={HQ.x} y1={HQ.y * 0.5625} x2={x} y2={y}
                      stroke="rgba(30,64,175,0.18)"
                      strokeWidth="0.12"
                    />
                  )
                })}
                {/* Animated flowing dash */}
                {partners.map((p, i) => {
                  const x = p.x
                  const y = p.y * 0.5625
                  return (
                    <line
                      key={`${p.name}-flow`}
                      x1={x} y1={y} x2={HQ.x} y2={HQ.y * 0.5625}
                      stroke="rgba(30,64,175,0.55)"
                      strokeWidth="0.2"
                      strokeLinecap="round"
                      className="animate-svg-flow"
                      style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                    />
                  )
                })}
              </svg>

              {/* Muscat HQ — the only "highlighted" point */}
              <div
                className="absolute -translate-y-1/2 z-20 flex items-center gap-2"
                style={{ left: `${HQ.x}%`, top: `${HQ.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-blue-700/25"
                    style={{ animation: 'haloPulse 3s ease-in-out infinite' }}
                  />
                  <span className="relative block w-3 h-3 rounded-full bg-blue-700 ring-2 ring-white shadow" />
                </span>
              </div>
              {/* HQ label as a separate, larger element */}
              <div
                className="absolute z-20 whitespace-nowrap"
                style={{ left: `${HQ.x}%`, top: `${HQ.y}%`, transform: 'translate(12px, -50%)' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">
                  Muscat HQ
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 tracking-wide">
                  Yanabiya Group · Oman
                </div>
              </div>

              {/* Partner nodes — text labels visible on the map */}
              {partners.map((p) => (
                <div
                  key={p.name}
                  className="group absolute z-10 hover:z-30"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {/* Dot */}
                  <span className="block w-1.5 h-1.5 rounded-full bg-slate-900
                                   transition-all duration-300
                                   group-hover:scale-150 group-hover:bg-blue-700" />
                  {/* Label — anchored left or right of dot, never on top */}
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap
                                ${p.align === 'right' ? 'left-3' : 'right-3 text-right'}`}
                  >
                    <div className="text-[11px] font-semibold text-slate-900 leading-tight
                                    transition-all duration-300
                                    group-hover:text-blue-700 group-hover:underline underline-offset-2">
                      {p.name}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
                      {p.category}
                    </div>
                  </div>
                </div>
              ))}

              {/* Editorial chrome */}
              <div className="absolute top-3 left-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                Fig. 01 · Group Network · Oman
              </div>
              <div className="absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-300">
                Source: Yanabiya Group
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ───────── 3. BUSINESS ACTIVITIES (editorial text) ───────── */}
      <section className="relative border-t border-slate-100">
        <div className="container-x py-20 md:py-28">

          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                Operating Capabilities
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                Core Business Activities.
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Five integrated capability areas under a single licensed group structure
                in the Sultanate of Oman.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl">
            {activities.map((a, i) => (
              <Reveal key={a.title} delay={i * 100}>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                    0{i + 1}
                  </div>
                  <h3 className="mt-2 font-serif text-xl md:text-2xl text-slate-900 leading-tight">
                    {a.title}
                  </h3>
                  <div className="mt-3 w-8 h-px bg-slate-900/70" />
                  <ul className="mt-4 space-y-1.5 text-slate-700">
                    {a.items.map((item) => (
                      <li key={item} className="text-sm leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 4. CONTACT (text only) ───────── */}
      <section className="relative border-t border-slate-100">
        <div className="container-x py-20 md:py-28">

          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                Reach Us in Muscat
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                Contact.
              </h2>
            </div>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-2 gap-x-16 gap-y-10 max-w-4xl">
            <Reveal>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Head Office
                </div>
                <div className="mt-3 w-8 h-px bg-slate-900/70" />
                <p className="mt-4 text-slate-700 leading-relaxed">
                  Office-41, 4th Floor, Building-846<br />
                  Way-4011, Complex-240<br />
                  Al Gubrah, Bushar, Muscat, Oman
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Postal Address
                </div>
                <div className="mt-3 w-8 h-px bg-slate-900/70" />
                <p className="mt-4 text-slate-700 leading-relaxed">
                  P.O. Box 1432, PC-133<br />
                  Al Khuwair, Muscat
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
