import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section from '../components/Section'
import { businesses } from '../data/businesses'
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Short, plain-English overrides for the landing-page card titles + a
 * one-liner each. Keep the verbose names on the data file for /business/<slug>
 * detail pages. */
const BUSINESS_DISPLAY: Record<string, { title: string; tag: string }> = {
  'it-software':       { title: 'Tech & Software',  tag: 'Custom software, cloud, AI.' },
  'export-import':     { title: 'Global Trade',     tag: 'Sourcing, freight, fulfilment.' },
  'clothing':          { title: 'Apparel',          tag: 'Private label, sourcing, retail.' },
  'agents-brokerage':  { title: 'Brokerage',        tag: 'Cross-border deals & partnerships.' },
  'office-management': { title: 'Office Services',  tag: 'Serviced offices, PRO, admin.' },
  'manpower':          { title: 'Global Mobility',  tag: 'Workforce, students, aviation.' },
}

export default function Businesses() {
  return (
    <Section id="businesses" className="relative overflow-hidden bg-white">
      <div className="container-x py-14 md:py-20">

        {/* Header — minimal, on-brand to match Global Presence */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              Our Service
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-brand-deep">
              Six divisions.
              <span className="block text-brand-accentDark">One group.</span>
            </h2>
          </Reveal>
        </div>

        {/* 6-card grid — clean white cards with mint icon chip + short title + 1-line tag */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {businesses.map((b, i) => {
            const display = BUSINESS_DISPLAY[b.slug] ?? { title: b.title, tag: '' }
            return (
              <Reveal key={b.slug} delay={i * 70}>
                <Link
                  to={`/business/${b.slug}`}
                  className="group block h-full rounded-2xl bg-white border border-slate-200
                             p-5 shadow-[0_4px_12px_rgba(15,58,35,0.05)]
                             transition-all duration-300
                             hover:border-brand-deep/40 hover:-translate-y-1
                             hover:shadow-[0_18px_40px_-12px_rgba(15,58,35,0.22)]"
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-11 h-11 rounded-xl bg-brand-accent/15
                                    grid place-items-center text-brand-deep
                                    transition-all duration-300
                                    group-hover:bg-brand-accent group-hover:text-white
                                    group-hover:scale-110">
                      <b.icon size={20} strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-serif text-lg font-bold text-brand-deep leading-tight">
                        {display.title}
                      </h3>
                      <p className="mt-1 text-[12.5px] text-slate-600 leading-snug">
                        {display.tag}
                      </p>
                    </div>
                  </div>

                  {/* Bottom CTA row */}
                  <div className="mt-5 flex items-center justify-between
                                  text-[10px] uppercase tracking-[0.22em] font-bold">
                    <span className="text-slate-500">Division 0{i + 1}</span>
                    <span className="inline-flex items-center gap-1 text-brand-accentDark
                                     transition-all duration-300
                                     group-hover:text-brand-deep group-hover:gap-1.5">
                      Explore <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
