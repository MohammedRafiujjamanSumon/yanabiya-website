import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'

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

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '6',   label: 'Business Units'      },
  { value: '4',   label: 'Continents Reached'  },
]

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-[#fbfdfb]">

      {/* ───────── Ambient background: abstract global network ───────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="netLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(125,164,42,0)" />
              <stop offset="50%"  stopColor="rgba(125,164,42,0.55)" />
              <stop offset="100%" stopColor="rgba(125,164,42,0)" />
            </linearGradient>
            <radialGradient id="netNode" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"   stopColor="rgba(158,199,58,0.9)" />
              <stop offset="100%" stopColor="rgba(158,199,58,0)" />
            </radialGradient>
          </defs>

          <g stroke="url(#netLine)" strokeWidth="1.1" fill="none">
            <path d="M -50 420 Q 240 280 520 360 T 1080 220" />
            <path d="M -50 200 Q 320 320 620 240 T 1250 360" />
            <path d="M -50 320 Q 200 180 480 260 T 920 460" />
            <path d="M 100 540 Q 380 420 700 480 T 1300 380" />
            <path d="M 200 60  Q 460 220 760 140 T 1280 240" />
          </g>

          {[
            [180, 365], [420, 305], [620, 245], [810, 285], [1010, 235],
            [320, 235], [560, 275], [880, 415], [710, 470], [950, 175],
            [240, 95],  [490, 140], [770, 175], [1130, 320],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14" fill="url(#netNode)" />
              <circle cx={cx} cy={cy} r="2.4" fill="rgba(125,164,42,0.85)" />
            </g>
          ))}
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[80%] h-[60%] rounded-full bg-white/70 blur-[80px]" />
        </div>
      </div>

      {/* ───────── Foreground content ───────── */}
      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">
        <div className="flex flex-col gap-12 md:gap-16 items-center">

          {/* TOP — eyebrow + serif title + subtitle + CTAs (centered) */}
          <div className="w-full max-w-3xl mx-auto text-center order-1">
            <Reveal>
              <Eyebrow>About Us</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="group relative inline-block font-serif
                             text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                             leading-[1.15] tracking-tight text-brand-deep lg:whitespace-nowrap cursor-default
                             after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                             after:h-[3px] after:bg-brand-accent after:rounded-full
                             after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                             hover:after:scale-x-100 focus-within:after:scale-x-100 active:after:scale-x-100">
                One group operating across{' '}
                <span className="text-brand-accentDark">multiple futures.</span>
              </h2>
            </Reveal>
          </div>

          {/* BELOW — composition card: clean office photo on the left,
           *  brand-deep stats panel on the right (matches the supplied
           *  design reference). No overlay on the photo — the two halves
           *  sit side-by-side under one mint-bordered wrapper. */}
          <div className="w-full max-w-4xl mx-auto order-2">
            <Reveal>
              <div className="grid grid-cols-12 rounded-2xl overflow-hidden
                              border border-brand-accent/30
                              shadow-[0_18px_44px_-14px_rgba(15,58,35,0.30)]">

                {/* LEFT — clean office photo */}
                <div className="col-span-12 md:col-span-8 relative bg-slate-900 aspect-[5/3] md:aspect-auto md:min-h-[300px]">
                  <img
                    src={assets.office}
                    alt="Yanabiya Group office"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </div>

                {/* RIGHT — light stats panel (no dark background) */}
                <div className="col-span-12 md:col-span-4 relative bg-white p-3 md:p-4">
                  <div
                    aria-hidden="true"
                    className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-brand-accent/15 blur-3xl pointer-events-none"
                  />
                  <div className="relative flex md:flex-col h-full md:divide-y divide-slate-200">
                    {stats.map((s, i) => (
                      <Reveal key={s.label} delay={120 + i * 110} className="flex-1">
                        <div className="h-full px-4 py-5 md:py-6 grid place-items-center text-center">
                          <div>
                            <div className="font-serif text-3xl md:text-4xl text-brand-accentDark leading-none">
                              {s.value}
                            </div>
                            <div className="mt-2 text-[9px] md:text-[10px] uppercase tracking-[0.32em]
                                            font-semibold text-slate-600 leading-tight">
                              {s.label}
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* BOTTOM — CTAs (centered, below the office card) */}
          <Reveal delay={340} className="order-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Explore About
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/about/our-story"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}
