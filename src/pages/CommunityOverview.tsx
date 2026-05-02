import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
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

const HUBS = [
  {
    to: '/community/blog',
    icon: Newspaper,
    eyebrow: 'Stories & Insights',
    title: 'Blog',
    body: 'Articles, case studies, and field notes from across the group.',
    /** Tailwind background colour for the circle and the SVG drop line. */
    bg: 'bg-emerald-600',
    stop: '#059669',
    /** Vertical offset (Tailwind) — alternating to mirror the infographic. */
    offset: '',
  },
  {
    to: '/community/sustainable-growth',
    icon: Leaf,
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    body: 'Our commitment to growth that benefits people, communities, and the planet.',
    bg: 'bg-cyan-500',
    stop: '#06b6d4',
    offset: 'md:mt-14',
  },
  {
    to: '/community/community-care',
    icon: HeartHandshake,
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    body: 'Humanitarian aid, education, and healthcare initiatives across our regions.',
    bg: 'bg-amber-500',
    stop: '#f59e0b',
    offset: '',
  },
  {
    to: '/community/careers',
    icon: Briefcase,
    eyebrow: 'Join the Team',
    title: 'Careers',
    body: 'Build your career with a global group across IT, trade, and operations.',
    bg: 'bg-rose-500',
    stop: '#f43f5e',
    offset: 'md:mt-14',
  },
]

export default function CommunityOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient mint glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/20 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/12 blur-[160px]" />
      </div>

      {/* HERO — shared brand card */}
      <PageHero
        eyebrow="Our Community"
        title="Beyond the balance sheet."
        subtitle="Stories, sustainability, welfare, careers — four ways into the group beyond business."
      />

      {/* HUB CARDS — rainbow arc + four colour-coded circles */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28">
          <div className="relative max-w-5xl mx-auto">

            {/* SVG arc + drop connectors. Hides on small screens where
             *  the arc geometry doesn't read; the circles + descriptions
             *  still stack in a 2-col grid. */}
            <svg
              viewBox="0 0 1000 240"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              className="hidden md:block w-full h-auto -mb-16 lg:-mb-20"
            >
              <defs>
                <linearGradient id="comm-rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="33%" stopColor="#06b6d4" />
                  <stop offset="66%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
              {/* Curved arc along the top */}
              <path
                d="M 125 220 C 280 -40, 720 -40, 875 220"
                stroke="url(#comm-rainbow)"
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

            {/* Four hub circles — name only, click navigates to the page */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 justify-items-center">
              {HUBS.map((h, i) => (
                <Reveal key={h.to} delay={i * 90} className={h.offset}>
                  <Link
                    to={h.to}
                    aria-label={`Open ${h.title}`}
                    className={`group inline-flex flex-col items-center justify-center
                                w-32 h-32 md:w-36 md:h-36 rounded-full
                                ${h.bg} text-brand-deep text-center px-3
                                shadow-[0_12px_28px_-8px_rgba(15,23,42,0.35)]
                                transition-all duration-300
                                hover:scale-110 hover:shadow-[0_20px_40px_-10px_rgba(15,23,42,0.45)]
                                focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60`}
                  >
                    <h.icon size={26} strokeWidth={1.8} className="mb-1.5 opacity-90 transition-transform duration-300 group-hover:scale-110" />
                    <span className="font-bold text-sm md:text-base leading-tight tracking-tight">
                      {h.title}
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
