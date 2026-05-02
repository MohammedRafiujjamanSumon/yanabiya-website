import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
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

type FeaturePill = {
  label: string
  to: string
  tone: string
}

const FEATURES: FeaturePill[] = [
  { label: 'Our Mission',  to: '/about-us#mission',  tone: 'from-emerald-200 to-emerald-400' },
  { label: 'Our Vision',   to: '/about-us#vision',   tone: 'from-cyan-200 to-sky-400'        },
  { label: 'Our Values',   to: '/about-us#values',   tone: 'from-amber-200 to-orange-400'    },
  { label: 'Our Story',    to: '/about/our-story',   tone: 'from-fuchsia-200 to-rose-400'    },
]

export default function About() {
  return (
    <Section
      id="about"
      className="relative overflow-hidden bg-brand-50"
    >
      <div className="container-x py-4 md:py-6">

        <div className="mb-6 md:mb-8">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
          </Reveal>
        </div>

        <div
          className="relative px-1 py-4 md:px-6 md:py-6
                     min-h-[520px] md:min-h-[600px]"
        >

          {/* Background glows — soft mint over mint */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-accent/25 blur-[150px]" />
            <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-brand-accentDark/15 blur-[150px]" />
          </div>

          {/* Top-left: heading + subtitle + CTA */}
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 items-center">
            <Reveal>
              <div className="max-w-md">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                               leading-[1.1] tracking-tight text-brand-deep">
                  A trusted multinational group,{' '}
                  <span className="text-brand-accentDark">built on integrity</span> and excellence.
                </h2>
                <p className="mt-4 text-sm md:text-base text-brand-deep/70 leading-snug max-w-sm">
                  Headquartered in Muscat and operating across the United Kingdom,
                  Bangladesh, and the United States — Yanabiya unites four cultures
                  under one shared standard of trust, professionalism, and long-term vision.
                </p>

                <div className="mt-7">
                  <Link
                    to="/about/our-story"
                    className="group inline-flex items-center gap-3 rounded-full
                               pl-2 pr-5 py-2 bg-brand-50
                               border border-brand-deep/15 text-brand-deep
                               shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                               hover:border-brand-accent hover:shadow-[0_8px_24px_rgba(15,58,35,0.12)]
                               transition-all duration-300"
                  >
                    <span className="grid place-items-center w-9 h-9 rounded-full
                                     bg-gradient-to-br from-brand-accent to-brand-accentDark
                                     text-white shadow-md">
                      <Play size={14} fill="currentColor" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-left">
                      Read Our Story<br className="hidden sm:block" />
                      <span className="text-brand-deep/60 sm:ml-0 ml-1">Yanabiya Group</span>
                    </span>
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* Right: caption + circular CTA */}
            <Reveal delay={140} className="hidden md:block">
              <div className="text-right">
                <div className="text-brand-deep font-semibold text-base lg:text-lg leading-snug">
                  The values that<br />shape who we are
                </div>
                <p className="mt-2 text-[12px] text-brand-deep/60 leading-snug max-w-[18rem] ml-auto">
                  Built on morals, ethics, honesty, and customer satisfaction —
                  the Stamp of Quality and Professionalism that defines every decision.
                </p>
                <div className="mt-5 flex justify-end">
                  <Link
                    to="/about-us"
                    className="relative grid place-items-center w-24 h-24 rounded-full
                               bg-brand-50 border border-brand-deep/15 text-brand-deep
                               shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                               hover:border-brand-accent hover:-translate-y-0.5
                               hover:shadow-[0_8px_24px_rgba(15,58,35,0.12)]
                               transition-all duration-300"
                    aria-label="Open Yanabiya Group company overview"
                  >
                    <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em]
                                     leading-tight text-center px-2">
                      Company<br />Overview
                    </span>
                    <ArrowUpRight size={14} className="absolute bottom-2 right-2 text-brand-accentDark" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Bottom-right 3D Yanabiya logo — anchored inside the card so the
           *  float animation never lets it bleed out. Lifted slightly off
           *  the bottom so the shadow has room to breathe. */}
          <div
            aria-hidden
            className="absolute right-4 md:right-8 bottom-16 md:bottom-20
                       w-[40%] max-w-[260px] aspect-square pointer-events-none animate-float-3d
                       [perspective:1200px]"
          >
            <div className="absolute inset-0 rounded-full bg-brand-accent/30 blur-[60px]" />
            <div className="absolute inset-[10%] rounded-full bg-brand-accentDark/20 blur-[40px]" />

            <img
              src={assets.logo}
              alt=""
              className="relative w-full h-full object-contain
                         drop-shadow-[0_18px_36px_rgba(15,58,35,0.20)]
                         drop-shadow-[0_8px_18px_rgba(15,58,35,0.14)]"
              style={{
                transform: 'rotateY(-12deg) rotateX(8deg)',
              }}
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          {/* Floating feature pills */}
          <div className="relative mt-10 md:mt-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {FEATURES.map((f, i) => (
                <Reveal key={f.label} delay={120 + i * 90}>
                  <Link
                    to={f.to}
                    className={`group relative block rounded-full px-4 py-3 md:px-5 md:py-3.5
                                bg-gradient-to-br ${f.tone}
                                border border-white/40
                                text-center text-brand-deep text-[12px] md:text-[13px] font-semibold
                                leading-tight tracking-tight
                                shadow-[0_6px_16px_rgba(15,58,35,0.08)]
                                transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                hover:-translate-y-1
                                hover:shadow-[0_12px_28px_-8px_rgba(15,58,35,0.18)]`}
                  >
                    {f.label}
                    <ArrowUpRight
                      size={12}
                      className="absolute top-2 right-3 opacity-0 -translate-x-1 transition-all
                                 group-hover:opacity-100 group-hover:translate-x-0 text-brand-deep"
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
