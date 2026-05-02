import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
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

        <div className="relative px-1 py-4 md:px-6 md:py-6 min-h-[520px] md:min-h-[600px]">

          {/* Background glows */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-accent/25 blur-[150px]" />
            <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-brand-accentDark/15 blur-[150px]" />
          </div>

          {/* Two-column row: 3D logo on the LEFT, heading + body on the RIGHT */}
          <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 items-center">

            {/* LEFT — 3D logo */}
            <div className="relative h-[260px] md:h-[360px] order-2 md:order-1">
              <div
                aria-hidden
                className="absolute left-0 md:left-2 top-0
                           w-[88%] max-w-[340px] aspect-square pointer-events-none animate-float-3d
                           [perspective:1200px]"
              >
                <div className="absolute inset-0 rounded-full bg-brand-accent/30 blur-[80px]" />
                <div className="absolute inset-[10%] rounded-full bg-brand-accentDark/20 blur-[55px]" />
                <img
                  src={assets.logo}
                  alt=""
                  className="relative w-full h-full object-contain
                             drop-shadow-[0_22px_44px_rgba(15,58,35,0.22)]
                             drop-shadow-[0_10px_22px_rgba(15,58,35,0.16)]"
                  style={{
                    transform: 'rotateY(12deg) rotateX(8deg)',
                  }}
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
            </div>

            {/* RIGHT — heading + subtitle */}
            <Reveal className="order-1 md:order-2">
              <div className="max-w-md md:ml-auto md:text-right">
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                               leading-[1.1] tracking-tight text-brand-deep">
                  A trusted multinational group,{' '}
                  <span className="text-brand-accentDark">built on integrity</span> and excellence.
                </h2>
                <p className="mt-4 text-sm md:text-base text-brand-deep/70 leading-snug md:ml-auto">
                  Headquartered in Muscat and operating across the United Kingdom,
                  Bangladesh, and the United States — Yanabiya unites four cultures
                  under one shared standard of trust, professionalism, and long-term vision.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Feature pills — anchored to the right side */}
          <div className="relative mt-10 md:mt-12">
            <div className="md:ml-auto md:max-w-2xl
                            grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
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
