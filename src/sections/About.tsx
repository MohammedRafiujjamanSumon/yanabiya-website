import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../components/Section'
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
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-5">
                About Us
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] leading-[1.15] tracking-tight text-slate-900 lg:whitespace-nowrap">
                One group operating across{' '}
                <span className="text-brand-accentDark">multiple futures.</span>
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-5 font-serif italic text-base sm:text-lg md:text-xl lg:text-2xl text-brand-accentDark leading-snug mx-auto lg:whitespace-nowrap">
                Built on trust, scaled with purpose, and proven over time.
              </p>
            </Reveal>
          </div>

          {/* BELOW — combined office card: image with YANABIYA wall logo + 3 stats */}
          <div className="w-full max-w-3xl mx-auto order-2">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200
                              shadow-[0_12px_40px_-12px_rgba(15,58,35,0.18)]">

                {/* Office image with Yanabiya logo overlaid on the wall */}
                <div className="relative aspect-[5/3] overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                    alt="Yanabiya Group office"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Wall vignette so the logo reads on any image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-brand-deep/15 to-transparent" />
                  {/* Yanabiya logo — positioned as if mounted on the back wall */}
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="flex flex-col items-center gap-2 text-white">
                      <img
                        src={assets.logo}
                        alt=""
                        aria-hidden="true"
                        className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]"
                      />
                      <div className="text-[10px] font-bold tracking-[0.4em] uppercase">
                        Yanabiya Group
                      </div>
                    </div>
                  </div>
                  {/* Bottom caption */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between
                                  text-white/85 text-[10px] uppercase tracking-[0.22em]">
                    <span>Group Office · Muscat</span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="block w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                      Live
                    </span>
                  </div>
                </div>

                {/* 3 stat tiles inside the same card */}
                <div className="grid grid-cols-3 divide-x divide-slate-200">
                  {stats.map((s, i) => (
                    <Reveal key={s.label} delay={150 + i * 100}>
                      <div className="px-3 py-5 text-center transition-colors duration-300 hover:bg-brand-accent/5">
                        <div className="font-serif text-3xl md:text-4xl text-brand-accentDark leading-none">
                          {s.value}
                        </div>
                        <div className="mt-2 text-[9px] uppercase tracking-[0.22em] text-slate-600 font-semibold leading-tight">
                          {s.label}
                        </div>
                      </div>
                    </Reveal>
                  ))}
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
