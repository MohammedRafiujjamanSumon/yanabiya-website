import { Link } from 'react-router-dom'
import { ArrowRight, Globe2 } from 'lucide-react'
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

const orbitDots = [
  { code: 'OM', label: 'Muscat',  top: '50%', left: '54%' },
  { code: 'GB', label: 'London',  top: '32%', left: '48%' },
  { code: 'BD', label: 'Dhaka',   top: '54%', left: '70%' },
  { code: 'US', label: 'Austin',  top: '46%', left: '22%' },
]

export default function About() {
  return (
    <Section id="about" className="bg-[#fbfdfb] overflow-hidden">
      <div className="container-x py-20 md:py-28 grid lg:grid-cols-12 gap-10 items-center">

        {/* LEFT — emotional copy + CTA */}
        <div className="lg:col-span-5">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-5">
              About Yanabiya Group
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.05] tracking-tight">
              One group.
              <span className="block">Four countries.</span>
              <span className="block text-brand-accentDark">Many futures.</span>
            </h2>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-md">
              A trust-led platform building enterprises across continents — quietly,
              consistently, for over a decade.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white font-semibold uppercase tracking-wider text-xs
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

        {/* RIGHT — animated globe-mesh */}
        <Reveal delay={300} className="lg:col-span-7">
          <div className="relative aspect-[5/4] w-full max-w-[640px] mx-auto">
            {/* Soft halo */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[80%] h-[80%] rounded-full bg-brand-accent/15 blur-[80px] animate-gradient" />
            </div>

            {/* Concentric orbit rings */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center">
              {[0.95, 0.75, 0.55, 0.35].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-brand-accent/20"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
            </div>

            {/* Globe icon center */}
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-20 h-20 rounded-full bg-white shadow-xl ring-2 ring-brand-accent/20
                              grid place-items-center text-brand-accentDark animate-spin-slow">
                <Globe2 size={36} strokeWidth={1.4} />
              </div>
            </div>

            {/* Country pulse dots + connecting lines */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 80"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Lines from each dot to center (50,40) */}
              {orbitDots.map((d, i) => {
                const x = parseFloat(d.left)
                const y = parseFloat(d.top) * 0.8
                return (
                  <line
                    key={d.code}
                    x1="50" y1="40" x2={x} y2={y}
                    stroke="rgba(125,164,42,0.35)"
                    strokeWidth="0.2"
                    strokeDasharray="0.8 0.6"
                    style={{ animation: `dividerGrow 4s ease-in-out ${i * 0.3}s infinite` }}
                  />
                )
              })}
            </svg>

            {orbitDots.map((d, i) => (
              <div
                key={d.code}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2"
                style={{ top: d.top, left: d.left }}
              >
                <span
                  className="block w-3 h-3 rounded-full bg-brand-accent shadow-[0_0_12px_rgba(158,199,58,0.7)]"
                  style={{ animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite` }}
                />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500
                                 bg-white/80 backdrop-blur px-2 py-0.5 rounded-full">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
