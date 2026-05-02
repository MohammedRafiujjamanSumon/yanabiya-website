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
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] delay-[${delay}ms] ${
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
  readMoreLabel?: string
}

const HUBS: Hub[] = [
  {
    to: '/community/blog',
    eyebrow: 'Stories & Insights',
    title: 'Blog',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/community/sustainable-growth',
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/community/community-care',
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/community/careers',
    eyebrow: 'Join the Team',
    title: 'Careers',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    to: '/community/testimonials',
    eyebrow: 'Voices & Stories',
    title: 'Testimonials',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80',
  },
]

export default function Community() {
  return (
    <Section id="community" className="bg-brand-50">
      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pt-4 md:pt-6 mb-8 md:mb-10">
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

        {/* Cards grid — 2-col mobile, 5-col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6 max-w-5xl mx-auto">
          {HUBS.map((h, i) => (
            <Reveal key={h.to} delay={i * 90} className="flex flex-col">
              <Link
                to={h.to}
                aria-label={`Open ${h.title}`}
                className="group flex flex-col rounded-2xl overflow-hidden
                           bg-white/60 border border-white/80 shadow-sm
                           hover:shadow-xl hover:-translate-y-1 hover:border-brand-accent/40
                           transition-all duration-300 flex-1"
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

                {/* Text panel below image */}
                <div className="flex flex-col gap-1.5 p-4 flex-1">
                  <p className="text-brand-accentDark text-[10px] font-semibold tracking-[0.2em] uppercase">
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
    </Section>
  )
}
