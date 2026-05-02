import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Star, Briefcase, Globe2, type LucideIcon } from 'lucide-react'
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

/* Four hierarchy cards on landing — every card opens its own dedicated
 * detail page where the names, portraits, and content live. */

type Tier = {
  step: string
  title: string
  blurb: string
  icon: LucideIcon
  href: string
  cta: string
  /** Real-life scenery / portrait header. */
  image: string
}

const TIERS: Tier[] = [
  {
    step: '01',
    title: 'Global Board & Advisory',
    blurb: 'Independent directors and senior advisors providing governance, risk oversight, and long-term strategic guidance.',
    icon: Crown,
    href: '/leadership/board',
    cta: 'Meet the Board',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
  },
  {
    step: '02',
    title: 'Global CEO & Vice Chairman',
    blurb: 'The vision-bearers behind the group — read messages from the Global CEO and Vice Chairman.',
    icon: Star,
    href: '/leadership/management',
    cta: 'Read Messages',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=900&q=80',
  },
  {
    step: '03',
    title: 'Global Executive Management',
    blurb: 'Four country heads of department running operations on the ground in each market.',
    icon: Briefcase,
    href: '/leadership/executive',
    cta: 'See Executives',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80',
  },
  {
    step: '04',
    title: 'Country-Based Operation Team',
    blurb: 'Each country page covers its co-founder, executive management, and high-skill professionals.',
    icon: Globe2,
    href: '/leadership/countries',
    cta: 'Pick a Country',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
  },
]

export default function LeadershipPyramid() {
  return (
    <Section id="leadership" className="relative overflow-hidden bg-brand-50">

      {/* Ambient brand glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/15 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/10 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-10 md:pb-14">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <Reveal>
            <Eyebrow>Global Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px] leading-snug tracking-tight text-brand-deep mt-1">
              Four tiers of leadership across the group —{' '}
              <span className="italic text-brand-accentDark">from boardroom to country teams.</span>
            </h2>
          </Reveal>
        </div>

        {/* FOUR HIERARCHY CARDS */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {TIERS.map((t, i) => (
            <Reveal key={t.step} delay={i * 90}>
              <Link
                to={t.href}
                aria-label={`Open ${t.title} page`}
                className="group relative block h-full rounded-2xl overflow-hidden
                           border border-brand-deep/15 bg-brand-50
                           shadow-[0_10px_24px_-12px_rgba(15,58,35,0.20)]
                           transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:-translate-y-1
                           hover:shadow-[0_18px_36px_-14px_rgba(15,58,35,0.30)]
                           hover:border-brand-accent"
              >
                {/* Photo header */}
                <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                  <img
                    src={t.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
                  {/* Tier badge */}
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5
                                  rounded-full bg-brand-accent/25 backdrop-blur
                                  border border-brand-accent/40 px-2.5 py-1
                                  text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accent">
                    <t.icon size={11} /> Tier {t.step}
                  </div>
                </div>
                {/* Body */}
                <div className="p-5">
                  <h3 className="font-serif text-[16px] md:text-lg text-brand-deep leading-tight">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-[12px] md:text-[13px] text-brand-deep/65 leading-snug">
                    {t.blurb}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-bold
                                   uppercase tracking-[0.22em] text-brand-accentDark
                                   group-hover:gap-2 transition-all duration-300">
                    {t.cta} <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
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
