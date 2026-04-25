import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
      <div className="container-x relative py-14 md:py-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT — 3 premium stat tiles */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-px bg-slate-200/70 rounded-2xl overflow-hidden">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 120}>
                  <div className="bg-[#fbfdfb] px-7 py-8 h-full
                                  transition-colors duration-300 hover:bg-white">
                    <div className="font-serif text-5xl md:text-6xl text-brand-accentDark leading-none">
                      {s.value}
                    </div>
                    <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-slate-600 font-semibold">
                      {s.label}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* RIGHT — eyebrow + serif title + subtitle + CTAs */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-5">
                About Yanabiya Group
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-slate-900">
                One group.
                <span className="block">Many futures.</span>
              </h2>
            </Reveal>
            <Reveal delay={280}>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                A trust-led platform building enterprises across continents — quietly,
                consistently, for over a decade.
              </p>
            </Reveal>

            <Reveal delay={420}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
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
      </div>
    </Section>
  )
}
