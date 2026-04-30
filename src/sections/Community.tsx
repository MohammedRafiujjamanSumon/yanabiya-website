import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase, CheckCircle2, Quote, type LucideIcon } from 'lucide-react'
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

type Hub = {
  to: string
  icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  /** Tailwind background colour for the circle. */
  bg: string
  /** Vertical offset (Tailwind) — alternating to mirror the infographic. */
  offset: string
}

const HUBS: Hub[] = [
  {
    to: '/community/blog',
    icon: Newspaper,
    eyebrow: 'Stories & Insights',
    title: 'Blog',
    body: 'Articles, case studies, and field notes from across the group.',
    bg: 'bg-emerald-600',
    offset: '',
  },
  {
    to: '/community/sustainable-growth',
    icon: Leaf,
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    body: 'Our commitment to growth that benefits people, communities, and the planet.',
    bg: 'bg-cyan-500',
    offset: 'md:mt-14',
  },
  {
    to: '/community/community-care',
    icon: HeartHandshake,
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    body: 'Humanitarian aid, education, and healthcare initiatives across our regions.',
    bg: 'bg-amber-500',
    offset: '',
  },
  {
    to: '/community/careers',
    icon: Briefcase,
    eyebrow: 'Join the Team',
    title: 'Careers',
    body: 'Build your career with a global group across IT, trade, and operations.',
    bg: 'bg-rose-500',
    offset: 'md:mt-14',
  },
]

export default function Community() {
  return (
    <Section
      id="community"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfaf6] via-[#fbfdfb] to-[#f6f8f3]"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-brand-accent/10 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-amber-200/20 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal>
            <div className="flex justify-center mb-4">
              <img
                src={assets.logo}
                alt="Yanabiya Group"
                className="h-14 md:h-16 w-auto object-contain drop-shadow-sm"
              />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <Eyebrow>Community</Eyebrow>
          </Reveal>
          <Reveal delay={160}>
            <h2 className="mt-3 font-serif text-xl sm:text-2xl md:text-[26px] lg:text-[30px] leading-[1.2] tracking-tight text-brand-deep">
              Driven by <span className="italic text-brand-accentDark">purpose</span> across a connected ecosystem of people and initiatives.
            </h2>
          </Reveal>
        </div>

        {/* RAINBOW ARC + 4 COLOUR-CODED CIRCLE NODES */}
        <div className="relative max-w-5xl mx-auto">

          {/* SVG arc + drop connectors. Hidden on small screens where
           *  the geometry doesn't read; circles + descriptions still
           *  stack in a 2-col grid. */}
          <svg
            viewBox="0 0 1000 240"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="hidden md:block w-full h-auto -mb-16 lg:-mb-20"
          >
            <defs>
              <linearGradient id="comm-rainbow-home" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="33%" stopColor="#06b6d4" />
                <stop offset="66%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
            </defs>
            {/* Curved arc along the top */}
            <path
              d="M 125 220 C 280 -40, 720 -40, 875 220"
              stroke="url(#comm-rainbow-home)"
              strokeWidth="14"
              strokeLinecap="round"
              fill="none"
            />
            {/* Drop connectors — same colour as the matching arc stop */}
            <line x1="125" y1="220" x2="125" y2="240" stroke="#059669" strokeWidth="14" strokeLinecap="round" />
            <line x1="375" y1="125" x2="375" y2="240" stroke="#06b6d4" strokeWidth="14" strokeLinecap="round" />
            <line x1="625" y1="125" x2="625" y2="240" stroke="#f59e0b" strokeWidth="14" strokeLinecap="round" />
            <line x1="875" y1="220" x2="875" y2="240" stroke="#f43f5e" strokeWidth="14" strokeLinecap="round" />
          </svg>

          {/* Four hub circles with a description below each — mirrors the
           *  "Our Range of … Services" infographic style: alternating
           *  heights, coloured drop-line, body copy under the circle. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 justify-items-center">
            {HUBS.map((h, i) => (
              <Reveal key={h.to} delay={i * 90} className={`${h.offset} flex flex-col items-center text-center max-w-[15rem]`}>
                <Link
                  to={h.to}
                  aria-label={`Open ${h.title}`}
                  className={`group inline-flex flex-col items-center justify-center
                              w-28 h-28 md:w-32 md:h-32 rounded-full
                              ${h.bg} text-white text-center px-3
                              shadow-[0_12px_28px_-8px_rgba(15,23,42,0.35)]
                              transition-all duration-300
                              hover:scale-110 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.45)]
                              focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60`}
                >
                  <h.icon size={24} strokeWidth={1.8} className="mb-1.5 opacity-90 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-bold text-sm md:text-base leading-tight tracking-tight">
                    {h.title}
                  </span>
                </Link>
                <p className="mt-4 px-2 text-[13px] md:text-sm text-slate-700 leading-relaxed">
                  {h.body}
                </p>
              </Reveal>
            ))}
          </div>

          {/* WHAT THE COMMUNITY DELIVERS — list */}
          <Reveal delay={350}>
            <div className="mt-16 md:mt-24 max-w-4xl mx-auto">
              <div className="text-center mb-6 md:mb-8">
                <h3 className="font-serif text-xl md:text-2xl text-brand-deep">
                  Across the group, we focus on
                </h3>
                <div className="w-14 h-0.5 bg-brand-accent rounded-full mx-auto mt-3" />
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm md:text-[15px] text-slate-700">
                {COMMUNITY_HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* TESTIMONIALS CTA */}
          <Reveal delay={420}>
            <div className="mt-10 md:mt-14 max-w-3xl mx-auto">
              <Link
                to="/community/testimonials"
                className="group flex items-center gap-4 rounded-2xl bg-white/80 backdrop-blur
                           border border-brand-accent/30 px-5 py-4 md:px-6 md:py-5
                           shadow-[0_8px_24px_-12px_rgba(15,23,42,0.25)]
                           hover:border-brand-accent hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="grid place-items-center w-11 h-11 md:w-12 md:h-12 rounded-full
                                 bg-brand-accent/15 text-brand-accentDark shrink-0">
                  <Quote size={20} />
                </span>
                <div className="flex-1 text-left">
                  <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-brand-accentDark">
                    Voices from our community
                  </div>
                  <div className="font-serif text-base md:text-lg text-brand-deep leading-snug">
                    Read testimonials from partners, employees, and beneficiaries
                  </div>
                </div>
                <ArrowRight
                  size={18}
                  className="text-brand-deep shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>

          {/* TAIL CTA */}
          <Reveal delay={500}>
            <div className="mt-10 md:mt-14 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3
                           bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                           transition-all duration-300"
              >
                Get in Touch <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

const COMMUNITY_HIGHLIGHTS: string[] = [
  'Education sponsorships, scholarships and youth mentorship',
  'Healthcare drives and seasonal medical camps',
  'Humanitarian aid in partnership with local NGOs',
  'Sustainable growth — energy, water and waste programmes',
  'Career development and graduate training pathways',
  'Cultural and community events across all four regions',
]
