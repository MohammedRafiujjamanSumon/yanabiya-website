import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import Section from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'
import { businesses } from '../data/businesses'

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

/* Compact pill button used for each floating "service feature" tile
 * around the 3D logo. */
type FeaturePill = {
  label: string
  to: string
  /** Tailwind classes for the gradient bg of the pill. */
  tone: string
}

const FEATURES: FeaturePill[] = [
  { label: 'IT, Software & Cloud',           to: '/business/it-software',      tone: 'from-emerald-500/40 to-emerald-700/40' },
  { label: 'Global Trade & Supply Chain',    to: '/business/export-import',    tone: 'from-cyan-500/40 to-sky-700/40'        },
  { label: 'Manpower & Mobility',            to: '/business/manpower',         tone: 'from-amber-500/40 to-orange-700/40'    },
  { label: 'Office Management & Admin',      to: '/business/office-management', tone: 'from-fuchsia-500/40 to-rose-700/40'   },
]

/* Showcase — dark hero-style panel inspired by the user-supplied
 * reference. Centerpiece is a big floating 3D-styled Yanabiya logo,
 * with a massive thin-outline "YANABIYA" wordmark sitting behind it.
 * Featured service pills float around the bottom; a circular "View
 * Services" CTA anchors the right side. */
export default function Showcase() {
  // First three businesses → use as featured pills if no override.
  // (We've hand-picked four above for variety.)
  void businesses

  return (
    <Section id="showcase" className="bg-[#fbfdfb]">
      <div className="container-x py-4 md:py-6">
        <div
          className="relative rounded-3xl overflow-hidden
                     bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a]
                     ring-1 ring-emerald-500/15
                     shadow-[0_28px_60px_-20px_rgba(4,16,10,0.55)]
                     px-5 py-10 md:px-12 md:py-14
                     min-h-[520px] md:min-h-[600px]"
        >

          {/* ─── Background glows ─── */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-emerald-500/15 blur-[150px]" />
            <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[150px]" />
          </div>

          {/* ─── Massive ghost-outline wordmark behind the logo ───
           *  Sits absolute, sized via vw so it scales with viewport.
           *  Stroke-only via -webkit-text-stroke so it reads as an
           *  outline like the reference's "NEX". */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 md:pr-12"
          >
            <span
              className="font-serif font-black select-none
                         text-[18vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter
                         text-transparent"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.10)' }}
            >
              YANABIYA
            </span>
          </div>

          {/* ─── Top-left: heading + subtitle + demo CTA ─── */}
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <Reveal>
              <div className="max-w-md">
                <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                                 tracking-[0.32em] text-amber-300 mb-4">
                  Showcase
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                               leading-[1.1] tracking-tight text-white">
                  Everything you need to{' '}
                  <span className="text-amber-300">build &amp; scale</span> your business.
                </h2>
                <p className="mt-4 text-sm md:text-base text-white/70 leading-snug max-w-sm">
                  Four countries, six divisions, one unified Yanabiya team — engineered
                  to power enterprises across IT, trade, mobility and beyond.
                </p>

                {/* Demo CTA — pill matching the reference */}
                <div className="mt-7">
                  <Link
                    to="/about-us"
                    className="group inline-flex items-center gap-3 rounded-full
                               pl-2 pr-5 py-2 bg-white/8 backdrop-blur-sm
                               border border-white/15 text-white/90
                               hover:bg-white/15 hover:border-amber-300/50
                               transition-all duration-300"
                  >
                    <span className="grid place-items-center w-9 h-9 rounded-full
                                     bg-gradient-to-br from-amber-300 via-rose-400 to-fuchsia-500
                                     text-white shadow-md">
                      <Play size={14} fill="currentColor" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-left">
                      View Demos<br className="hidden sm:block" />
                      <span className="text-white/60 sm:ml-0 ml-1">and Highlights</span>
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* ─── Right: caption + "View Services" circular CTA ─── */}
            <Reveal delay={140} className="hidden md:block">
              <div className="text-right">
                <div className="text-white/95 font-semibold text-base lg:text-lg leading-snug">
                  The ideas that<br />improve your products
                </div>
                <p className="mt-2 text-[12px] text-white/55 leading-snug max-w-[18rem] ml-auto">
                  Be among the first founders to experience the easiest way to
                  start and run a business.
                </p>
                <div className="mt-5 flex justify-end">
                  <Link
                    to="/#businesses"
                    className="grid place-items-center w-20 h-20 rounded-full
                               bg-white/8 backdrop-blur-sm
                               border border-white/15 text-white/90
                               hover:bg-white/15 hover:border-amber-300/60 hover:-translate-y-0.5
                               transition-all duration-300"
                    aria-label="View Services"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em]
                                     leading-tight text-center">
                      View<br />Services
                    </span>
                    <ArrowUpRight size={14} className="absolute mt-12 ml-12 text-amber-300" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ─── Centerpiece: big 3D Yanabiya logo ───
           *  Floats on its own animation, sits in front of the ghost
           *  wordmark but behind the foreground text/CTAs. */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[55%] max-w-[420px] aspect-square pointer-events-none animate-float-3d
                       [perspective:1200px]"
          >
            {/* Outer glow halo */}
            <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-[80px]" />
            <div className="absolute inset-[10%] rounded-full bg-amber-300/15 blur-[60px]" />

            {/* Logo with depth shadow */}
            <img
              src={assets.logo}
              alt=""
              className="relative w-full h-full object-contain
                         drop-shadow-[0_30px_60px_rgba(252,211,77,0.25)]
                         drop-shadow-[0_12px_24px_rgba(15,58,35,0.35)]"
              style={{
                transform: 'rotateY(-12deg) rotateX(8deg)',
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
              }}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          {/* ─── Floating feature pills along the bottom ─── */}
          <div className="relative mt-10 md:mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={120 + i * 90}>
                  <Link
                    to={f.to}
                    className={`group relative block rounded-full px-4 py-3 md:px-5 md:py-3.5
                                bg-gradient-to-br ${f.tone}
                                backdrop-blur-md
                                border border-white/15
                                text-center text-white/90 text-[12px] md:text-[13px] font-semibold
                                leading-tight tracking-tight
                                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                hover:-translate-y-1 hover:border-amber-300/60
                                hover:shadow-[0_12px_28px_-12px_rgba(252,211,77,0.30)]`}
                  >
                    {f.label}
                    <ArrowUpRight
                      size={12}
                      className="absolute top-2 right-3 opacity-0 -translate-x-1 transition-all
                                 group-hover:opacity-100 group-hover:translate-x-0 text-amber-300"
                    />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>
    </Section>
  )
}
