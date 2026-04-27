import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Briefcase } from 'lucide-react'
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
    to: '/leadership/management',
    icon: Briefcase,
    eyebrow: 'Founding Leadership',
    title: 'Our Management',
    body: 'Messages from the Chairman & Vice Chairman. The voices behind the group strategy and long-term vision.',
    cta: 'Read Messages',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
  },
  {
    to: '/leadership/professionals',
    icon: Users,
    eyebrow: 'Group Talent',
    title: 'High-Skilled Professionals',
    body: 'The cross-functional team driving delivery across IT, trade, mobility and operations in four countries.',
    cta: 'Meet the Team',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=80',
  },
]

export default function LeadershipOverview() {
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
              Leadership
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
              The people behind the group.
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-snug">
              Founding chairs and a cross-country professional bench. Pick a hub to dive in.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HUB CARDS */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {HUBS.map((h, i) => (
              <Reveal key={h.to} delay={i * 120}>
                <Link
                  to={h.to}
                  className="group block h-full rounded-2xl bg-white border border-slate-200
                             overflow-hidden shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                             transition-all duration-500
                             hover:border-brand-deep/40 hover:-translate-y-1
                             hover:shadow-[0_24px_60px_-20px_rgba(15,58,35,0.25)]"
                >
                  {/* Photo header */}
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <img
                      src={h.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-brand-deep/20 to-transparent" />
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5
                                    rounded-full bg-white/90 backdrop-blur px-3 py-1
                                    text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
                      <h.icon size={12} />
                      {h.eyebrow}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-brand-deep leading-tight">
                      {h.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-600 leading-snug">
                      {h.body}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em]
                                    text-brand-accentDark group-hover:text-brand-deep group-hover:gap-2
                                    transition-all duration-300">
                      {h.cta} <ArrowRight size={12} />
                    </div>
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
