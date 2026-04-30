import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase, MessageSquareQuote, type LucideIcon } from 'lucide-react'
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

type Hub = {
  to: string
  icon: LucideIcon
  eyebrow: string
  title: string
  /** Tailwind background colour used as fallback / outer ring tint. */
  bg: string
  /** Real photo for the circle. */
  image: string
  /** Vertical offset (Tailwind) — alternating to mirror the infographic. */
  offset: string
}

const HUBS: Hub[] = [
  {
    to: '/community/blog',
    icon: Newspaper,
    eyebrow: 'Stories & Insights',
    title: 'Blog',
    bg: 'bg-emerald-600',
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=600&q=80',
    offset: '',
  },
  {
    to: '/community/sustainable-growth',
    icon: Leaf,
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    bg: 'bg-cyan-500',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-10',
  },
  {
    to: '/community/community-care',
    icon: HeartHandshake,
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    bg: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-20',
  },
  {
    to: '/community/careers',
    icon: Briefcase,
    eyebrow: 'Join the Team',
    title: 'Careers',
    bg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-10',
  },
  {
    to: '/community/testimonials',
    icon: MessageSquareQuote,
    eyebrow: 'Voices & Stories',
    title: 'Testimonials',
    bg: 'bg-teal-700',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    offset: '',
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

        {/* HEADER — centred two-line title with a thin horizontal divider.
         *  Headings turn brand-green on hover/touch. */}
        <div className="relative">
          <div className="text-center max-w-3xl mx-auto pt-4 md:pt-6 mb-2 md:mb-4">
            <Reveal>
              <Eyebrow>Our Community</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="group relative inline-block mt-3 font-serif
                             text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                             leading-[1.15] tracking-tight text-brand-deep cursor-default
                             after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                             after:h-[3px] after:bg-brand-accent after:rounded-full
                             after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                             hover:after:scale-x-100 focus-within:after:scale-x-100 active:after:scale-x-100">
                Driven by Purpose,{' '}
                <span className="italic text-brand-accentDark">
                  Across Our Community
                </span>
              </h2>
            </Reveal>
          </div>
        </div>

        {/* RAINBOW ARC + 5 COLOUR-CODED CIRCLE NODES
         *  Visual hierarchy mirrors the user-supplied infographic:
         *    • 5 PARALLEL coloured arcs (concentric, not a single
         *      gradient stroke) form a rainbow band over the circles.
         *    • Vertical drop connectors in matching colours descend
         *      from the band to each circle below.
         *    • Circles alternate heights: outer ones up, middle one
         *      lowest — same stair pattern as the reference.
         */}
        <div className="relative max-w-5xl mx-auto">

          {/* Hidden on small screens where the geometry doesn't read;
           *  circles + descriptions still stack in a 2-col grid. */}
          <svg
            viewBox="0 0 1000 280"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="hidden md:block w-full h-auto -mb-16 lg:-mb-20"
          >
            {/* 5 parallel rainbow bands — outermost (green) wraps the
             *  widest arc, innermost (teal) the tightest */}
            <path d="M 80  240 C 240 -60, 760 -60, 920 240" stroke="#059669" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 112 240 C 258 -30, 742 -30, 888 240" stroke="#06b6d4" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 144 240 C 276   0, 724   0, 856 240" stroke="#f59e0b" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 176 240 C 294  30, 706  30, 824 240" stroke="#f43f5e" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 208 240 C 312  60, 688  60, 792 240" stroke="#0f766e" strokeWidth="11" fill="none" strokeLinecap="round" />

            {/* Drop connectors — vertical lines in matching colours.
             *  y1 chosen so each drop visually emerges from the band
             *  it shares a colour with; y2 lands at the SVG bottom
             *  so the negative bottom-margin overlaps the circles. */}
            <line x1="100" y1="240" x2="100" y2="280" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
            <line x1="300" y1="170" x2="300" y2="280" stroke="#06b6d4" strokeWidth="11" strokeLinecap="round" />
            <line x1="500" y1="110" x2="500" y2="280" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" />
            <line x1="700" y1="170" x2="700" y2="280" stroke="#f43f5e" strokeWidth="11" strokeLinecap="round" />
            <line x1="900" y1="240" x2="900" y2="280" stroke="#0f766e" strokeWidth="11" strokeLinecap="round" />
          </svg>

          {/* Five hub circles, image-led, alternating heights to mirror the
           *  "Our Range of … Services" infographic style. */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-4 lg:gap-x-6 justify-items-center">
            {HUBS.map((h, i) => (
              <Reveal key={h.to} delay={i * 90} className={`${h.offset} flex flex-col items-center text-center max-w-[15rem]`}>
                <Link
                  to={h.to}
                  aria-label={`Open ${h.title}`}
                  className="group relative w-28 h-28 md:w-32 md:h-32 rounded-full
                             shadow-[0_12px_28px_-8px_rgba(15,23,42,0.35)]
                             transition-all duration-300
                             hover:scale-110 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.45)]
                             focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
                >
                  {/* Image background fills the circle */}
                  <span aria-hidden className={`absolute inset-0 rounded-full overflow-hidden ring-2 ring-white ${h.bg}`}>
                    <img
                      src={h.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    {/* Lower gradient anchors the title */}
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </span>
                  {/* Content */}
                  <span className="relative z-10 flex flex-col items-center justify-end h-full pb-3 px-2 text-white">
                    <h.icon size={20} strokeWidth={1.8} className="mb-1 opacity-90 drop-shadow" />
                    <span className="font-bold text-sm md:text-[15px] leading-tight tracking-tight drop-shadow">
                      {h.title}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

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

