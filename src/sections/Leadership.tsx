import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Star, Briefcase, Cpu, Globe2, type LucideIcon } from 'lucide-react'
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Five tier cards on landing — names + icons only.
 *  Each card is a clickable hub to its dedicated detail page. */

type Tier = {
  step: string
  title: string
  blurb: string
  icon: LucideIcon
  href: string
  /** Solid bottom-half gradient. */
  from: string
  to: string
  /** Outer hover glow. */
  glow: string
}

const TIERS: Tier[] = [
  {
    step: '01',
    title: 'Global Board & Advisory',
    blurb: 'Strategic oversight & counsel.',
    icon: Crown,
    href: '/leadership',
    from: '#a7f3d0', to: '#059669',
    glow: 'rgba(5,150,105,0.35)',
  },
  {
    step: '02',
    title: 'Global CEO & Co-Founders',
    blurb: 'The vision-bearers of the group.',
    icon: Star,
    href: '/leadership',
    from: '#bae6fd', to: '#0284c7',
    glow: 'rgba(2,132,199,0.35)',
  },
  {
    step: '03',
    title: 'Global Executive Management',
    blurb: 'Senior operating leadership.',
    icon: Briefcase,
    href: '/leadership',
    from: '#e9d5ff', to: '#7e22ce',
    glow: 'rgba(126,34,206,0.35)',
  },
  {
    step: '04',
    title: 'High-Skill Execution Engine',
    blurb: 'Engineers, operators, specialists.',
    icon: Cpu,
    href: '/leadership/execution-engine',
    from: '#fde68a', to: '#d97706',
    glow: 'rgba(217,119,6,0.35)',
  },
  {
    step: '05',
    title: 'Country-Based Management',
    blurb: 'Local heads across four markets.',
    icon: Globe2,
    href: '/leadership',
    from: '#fecdd3', to: '#e11d48',
    glow: 'rgba(225,29,72,0.35)',
  },
]

export default function Leadership() {
  return (
    <Section id="leadership" className="relative overflow-hidden bg-[#fbfdfb]">

      {/* Ambient brand glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <Reveal>
            <Eyebrow>Global Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px] leading-snug tracking-tight text-brand-deep
                           lg:whitespace-nowrap mt-1">
              Experienced leadership across four continents,{' '}
              <span className="italic text-brand-accentDark">anchored by integrity and execution.</span>
            </h2>
          </Reveal>
        </div>

        {/* FIVE HIERARCHICAL TIER CARDS — minimal: step + icon + title.
         *  Names/photos live on the dedicated detail pages. */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
            {TIERS.map((t, i) => (
              <Reveal key={t.step} delay={i * 90} className="w-full">
                <Link
                  to={t.href}
                  aria-label={`Open ${t.title} page`}
                  className="group relative block rounded-xl overflow-hidden
                             border border-white/40 bg-white
                             shadow-[0_10px_24px_-12px_var(--tw-shadow-color)]
                             transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1
                             hover:shadow-[0_16px_36px_-12px_var(--tw-shadow-color)]"
                  style={{ ['--tw-shadow-color' as never]: t.glow }}
                >
                  <div className="aspect-[3/4] flex flex-col">
                    {/* Top half — soft gradient with step number + icon */}
                    <div
                      className="relative h-1/2 w-full grid place-items-center"
                      style={{ backgroundImage: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)` }}
                    >
                      <div className="text-center text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
                        <div className="font-serif italic text-[11px] opacity-80 leading-none">
                          Tier
                        </div>
                        <div className="font-serif text-3xl md:text-4xl leading-none mt-0.5">
                          {t.step}
                        </div>
                        <t.icon size={18} className="mx-auto mt-2 opacity-90" />
                      </div>
                    </div>
                    {/* Bottom half — name + tiny blurb */}
                    <div className="relative h-1/2 w-full flex flex-col items-center justify-center
                                    text-center px-2.5">
                      <span className="font-semibold text-brand-deep text-[12px] md:text-[13px]
                                       leading-tight tracking-tight">
                        {t.title}
                      </span>
                      <span className="mt-1 text-[10px] md:text-[11px] text-slate-500 leading-snug">
                        {t.blurb}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA — opens the full leadership overview */}
        <div className="text-center mt-8 md:mt-10">
          <Reveal>
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Leadership <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
