import { useEffect } from 'react'
import { Crown } from 'lucide-react'
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

type Member = {
  name: string
  role: string
  bio: string
  image: string
}

const BOARD: Member[] = [
  {
    name: 'H.E. Khalifa Al-Hinai',
    role: 'Chairman of the Board',
    bio: 'Three decades of multinational governance experience across MENA, with a focus on industrial holdings and corporate stewardship.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Sir Anthony Whitfield',
    role: 'Senior Strategic Advisor',
    bio: 'Former senior partner at a Big-Four advisory practice; counsels Yanabiya Group on cross-border expansion and capital structuring.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Dr. Amina Rahman',
    role: 'Independent Director',
    bio: 'Independent director and academic advisor specialising in technology governance, ethics, and ESG frameworks.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Tariq Al-Balushi',
    role: 'Audit & Risk Advisor',
    bio: 'Chartered accountant with 25+ years across Big-Four assurance practices; chairs the group audit & risk committee.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
  },
]

export default function Board() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/20 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/12 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="Tier 01 · Global Board & Advisory"
        title={<>Strategic oversight, <span className="italic text-brand-accentDark">independent counsel.</span></>}
        subtitle="Board members and senior advisors providing governance, risk oversight, and long-term strategic guidance."
        centered
      />

      <section className="relative">
        <div className="container-x py-12 md:py-16 space-y-6">
          {BOARD.map((m, i) => (
            <Reveal key={m.name} delay={i * 90}>
              <article className="rounded-3xl bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                                  shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] overflow-hidden
                                  grid md:grid-cols-[220px_1fr]">
                <div className="relative aspect-square md:aspect-auto bg-white">
                  <img
                    src={m.image}
                    alt={m.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full
                                   bg-brand-accent/15 border border-brand-accentDark/40
                                   px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]
                                   text-brand-accentDark w-fit">
                    <Crown size={11} /> Board & Advisory
                  </span>
                  <h2 className="mt-3 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                    {m.name}
                  </h2>
                  <div className="mt-1 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-brand-accentDark">
                    {m.role}
                  </div>
                  <p className="mt-4 text-sm text-brand-deep/70 leading-snug max-w-2xl">
                    {m.bio}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
