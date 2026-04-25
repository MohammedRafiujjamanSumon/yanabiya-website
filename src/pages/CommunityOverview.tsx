import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase } from 'lucide-react'
import BackButton from '../components/BackButton'
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
  },
  {
    to: '/community/sustainable-growth',
    icon: Leaf,
    eyebrow: 'Long-term Value',
    title: 'Sustainable Growth',
    body: 'Our commitment to growth that benefits people, communities, and the planet.',
  },
  {
    to: '/community/community-care',
    icon: HeartHandshake,
    eyebrow: 'Welfare Programmes',
    title: 'Community Care',
    body: 'Humanitarian aid, education, and healthcare initiatives across our regions.',
  },
  {
    to: '/community/careers',
    icon: Briefcase,
    eyebrow: 'Join the Team',
    title: 'Careers',
    body: 'Build your career with a global group across IT, trade, and operations.',
  },
]

export default function CommunityOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient mint glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="container-x py-14 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              Community
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
              Beyond the balance sheet.
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
              Stories, sustainability, welfare, careers — four ways into the group beyond business.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HUB CARDS */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28">
          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {HUBS.map((h, i) => (
              <Reveal key={h.to} delay={i * 90}>
                <Link
                  to={h.to}
                  className="group block h-full rounded-2xl bg-white border border-slate-200
                             p-6 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                             transition-all duration-500
                             hover:border-brand-deep/40 hover:-translate-y-1
                             hover:shadow-[0_24px_60px_-20px_rgba(15,58,35,0.25)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-accent/15
                                    grid place-items-center text-brand-deep
                                    transition-all duration-300
                                    group-hover:bg-brand-accent group-hover:text-white
                                    group-hover:scale-110">
                      <h.icon size={20} strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accentDark mb-1">
                        {h.eyebrow}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-brand-deep leading-tight">
                        {h.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                    {h.body}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                                  text-brand-accentDark group-hover:text-brand-deep group-hover:gap-2
                                  transition-all duration-300">
                    Open <ArrowRight size={12} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
