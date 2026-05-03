import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[${delay}ms] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}

type Hub = {
  to: string
  eyebrow: string
  title: string
  image: string
  /** Tailwind mt-* offset to create the staircase hierarchy */
  offset: string
  /** Arc/connector colour for the top border stripe */
  accent: string
  /** Hex value matching accent — used directly in SVG */
  hex: string
}

const HUBS: Hub[] = [
  {
    to: '/community/blog',
    eyebrow: 'Stories & Insights',
    title: 'Blog',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
    offset: '',
    accent: 'border-t-emerald-600',
    hex: '#059669',
  },
  {
    to: '/community/sustainable-growth',
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-10',
    accent: 'border-t-cyan-500',
    hex: '#06b6d4',
  },
  {
    to: '/community/community-care',
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-20',
    accent: 'border-t-amber-500',
    hex: '#f59e0b',
  },
  {
    to: '/community/careers',
    eyebrow: 'Join the Team',
    title: 'Careers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    offset: 'md:mt-10',
    accent: 'border-t-rose-500',
    hex: '#f43f5e',
  },
  {
    to: '/community/testimonials',
    eyebrow: 'Voices & Stories',
    title: 'Testimonials',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
    offset: '',
    accent: 'border-t-teal-700',
    hex: '#0f766e',
  },
]

export default function Community() {
  return (
    <Section id="community" className="bg-brand-50">
      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pt-4 md:pt-6 mb-2 md:mb-4">
          <Reveal>
            <Eyebrow>Our Community</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px] leading-snug tracking-tight text-brand-deep mt-1">
              Driven by purpose — investing in people,{' '}
              <span className="italic text-brand-accentDark">progress, and shared prosperity.</span>
            </h2>
          </Reveal>
        </div>

        {/* Rainbow arc + staircase cards */}
        <div className="relative max-w-5xl mx-auto">

          {/* 5 parallel coloured arcs + drop connectors — desktop only.
           *  Negative bottom margin pulls the card grid up so connectors
           *  visually meet the coloured top-border of each card. */}
          <svg
            viewBox="0 0 1000 280"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="hidden md:block w-full h-auto -mb-16 lg:-mb-20"
          >
            {/* 5 parallel rainbow bands */}
            <path d="M 80  240 C 240 -60, 760 -60, 920 240" stroke="#059669" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 112 240 C 258 -30, 742 -30, 888 240" stroke="#06b6d4" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 144 240 C 276   0, 724   0, 856 240" stroke="#f59e0b" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 176 240 C 294  30, 706  30, 824 240" stroke="#f43f5e" strokeWidth="11" fill="none" strokeLinecap="round" />
            <path d="M 208 240 C 312  60, 688  60, 792 240" stroke="#0f766e" strokeWidth="11" fill="none" strokeLinecap="round" />

            {/* Drop connectors — each in the matching arc colour */}
            <line x1="100" y1="240" x2="100" y2="280" stroke="#059669" strokeWidth="11" strokeLinecap="round" />
            <line x1="300" y1="170" x2="300" y2="280" stroke="#06b6d4" strokeWidth="11" strokeLinecap="round" />
            <line x1="500" y1="110" x2="500" y2="280" stroke="#f59e0b" strokeWidth="11" strokeLinecap="round" />
            <line x1="700" y1="170" x2="700" y2="280" stroke="#f43f5e" strokeWidth="11" strokeLinecap="round" />
            <line x1="900" y1="240" x2="900" y2="280" stroke="#0f766e" strokeWidth="11" strokeLinecap="round" />
          </svg>

          {/* Five hub cards — staircase heights mirror the infographic.
           *  Each card has a coloured 3-px top border that picks up its
           *  matching arc strand colour so the connection reads clearly. */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-4 lg:gap-x-6 justify-items-center">
            {HUBS.map((h, i) => (
              <Reveal
                key={h.to}
                delay={i * 90}
                className={`${h.offset} w-full flex flex-col`}
              >
                <Link
                  to={h.to}
                  aria-label={`Open ${h.title}`}
                  className={`group flex flex-col rounded-2xl overflow-hidden flex-1
                             bg-white/60 border border-white/80
                             border-t-[3px] ${h.accent}
                             shadow-sm hover:shadow-xl hover:-translate-y-1
                             hover:border-brand-accent/40
                             transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={h.image}
                      alt={h.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                  </div>

                  {/* Text panel — fully visible below image */}
                  <div className="flex flex-col gap-1.5 p-3 md:p-4 flex-1">
                    <p className="text-[10px] font-semibold tracking-[0.18em] uppercase"
                       style={{ color: h.hex }}>
                      {h.eyebrow}
                    </p>
                    <h3 className="text-brand-deep font-bold text-sm leading-snug">
                      {h.title}
                    </h3>
                    <div className="mt-auto pt-2 inline-flex items-center gap-1 text-brand-accentDark text-xs font-semibold group-hover:gap-2 transition-all duration-200">
                      Read More <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Tail CTA */}
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
