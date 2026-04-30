import { Quote } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
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

type Testimonial = {
  quote: string
  name: string
  role: string
  org: string
  flag: string
  /** Tailwind tint applied to the initials chip + accent line. */
  accent: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Yanabiya delivered our ERP rollout on time and under budget. Their Muscat–Dhaka delivery model gave us 24×7 coverage without compromising quality.',
    name: 'Ahmed Al-Rashid',
    role: 'Group CEO',
    org: 'Gulf Holdings, Muscat',
    flag: '🇴🇲',
    accent: 'bg-emerald-500',
  },
  {
    quote:
      'Their cross-border deal team handled regulatory friction we couldn’t crack ourselves. We closed a £12M trade transaction in eight weeks.',
    name: 'Sarah Mitchell',
    role: 'Chief Operating Officer',
    org: 'Mitchell Trade Co., London',
    flag: '🇬🇧',
    accent: 'bg-cyan-500',
  },
  {
    quote:
      'For garment sourcing and QA at scale, this is the partner you want. Communication is constant, the factory floor is transparent, and shipments land on time.',
    name: 'Rashedul Karim',
    role: 'Managing Director',
    org: 'Dhaka Apparel Group',
    flag: '🇧🇩',
    accent: 'bg-rose-500',
  },
  {
    quote:
      'We brought Yanabiya in for AI advisory and walked out with a working RAG pipeline. They speak both engineering and boardroom — rare combination.',
    name: 'Michael Anderson',
    role: 'VP of Engineering',
    org: 'Austin Tech Inc.',
    flag: '🇺🇸',
    accent: 'bg-amber-500',
  },
  {
    quote:
      'From visa processing to payroll to office facilities, the team in Muscat just gets it done. We focus on customers; they handle the rest.',
    name: 'Khalid bin Saif',
    role: 'Director',
    org: 'Muscat Contracting LLC',
    flag: '🇴🇲',
    accent: 'bg-violet-500',
  },
  {
    quote:
      'Yanabiya placed twelve skilled engineers across our UK projects in under six weeks — pre-vetted, work-permitted, and ready to ship.',
    name: 'Priya Patel',
    role: 'Head of People',
    org: 'Northgate Engineering, Manchester',
    flag: '🇬🇧',
    accent: 'bg-indigo-600',
  },
]

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()
}

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-[#f6f8f3] via-[#fbfdfb] to-[#fbfaf6]"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute -bottom-32 right-1/4 w-[460px] h-[460px] rounded-full bg-amber-200/15 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal>
            <Eyebrow>Testimonials</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-3 font-serif text-xl sm:text-2xl md:text-[26px] lg:text-[30px] leading-[1.2] tracking-tight text-brand-deep">
              What our partners and clients{' '}
              <span className="italic text-brand-accentDark">say about us.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <figure className="group relative h-full rounded-2xl bg-white border border-slate-200
                                 p-6 md:p-7
                                 shadow-[0_8px_24px_-12px_rgba(15,58,35,0.18)]
                                 transition-all duration-300
                                 hover:-translate-y-1
                                 hover:shadow-[0_18px_40px_-16px_rgba(15,58,35,0.30)]
                                 hover:border-brand-accent/45">
                {/* Accent rail */}
                <div aria-hidden="true" className={`absolute top-0 left-6 right-6 h-0.5 rounded-full ${t.accent}`} />

                {/* Quote mark */}
                <Quote
                  size={28}
                  strokeWidth={1.4}
                  className="text-brand-accent mb-4 -scale-x-100 opacity-80"
                />

                <blockquote className="text-sm md:text-[15px] text-slate-800 leading-relaxed">
                  {t.quote}
                </blockquote>

                <figcaption className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3">
                  {/* Avatar initials chip */}
                  <div className={`shrink-0 w-10 h-10 rounded-full ${t.accent} text-white grid place-items-center
                                  font-bold text-sm shadow-sm`}>
                    {initials(t.name)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-brand-deep leading-tight inline-flex items-center gap-1.5">
                      {t.name}
                      <span className="text-base leading-none">{t.flag}</span>
                    </div>
                    <div className="text-[11px] text-slate-700 leading-snug mt-0.5">
                      {t.role} · {t.org}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
