import { useEffect } from 'react'
import { Briefcase } from 'lucide-react'
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

type Exec = {
  name: string
  role: string
  bio: string
  image: string
}

const EXECS: Exec[] = [
  { name: 'Sara Al-Mahrouqi', role: 'Chief Operating Officer',  bio: 'Group-wide operations across four countries — process, supply chain, and country P&L coordination.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80' },
  { name: 'Daniel Whitmore',  role: 'Chief Financial Officer',  bio: 'Treasury, FP&A, audit, and group-level financial governance — 20+ years across multinational holdings.',  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Priya Iyer',       role: 'Chief Technology Officer', bio: 'Engineering, platform, and AI strategy — leads the cross-country technology roadmap.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80' },
  { name: 'Nasser Al-Rawahi', role: 'Chief Marketing Officer',  bio: 'Brand, growth, and demand generation across MENA, South Asia, EU, and the US.', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80' },
  { name: 'Layla Hossain',    role: 'Chief People Officer',     bio: 'Talent, culture, and learning — keeping the bench world-class across all four markets.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80' },
  { name: "James O'Connor",   role: 'Chief Strategy Officer',   bio: 'Group strategy, M&A, and partnership architecture — long-range planning for the group.', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=600&q=80' },
]

export default function Executive() {
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
        eyebrow="Tier 03 · Global Executive Management"
        title={<>The senior bench <span className="italic text-brand-accentDark">running the group.</span></>}
        subtitle="Operations, finance, technology, marketing, people, and strategy — six leaders responsible for executing the group's plan."
        centered
      />

      <section className="relative">
        <div className="container-x py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
            {EXECS.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="group rounded-2xl overflow-hidden
                                bg-brand-50 border border-brand-deep/15 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                                transition-all duration-500
                                hover:-translate-y-1 hover:border-brand-accent
                                hover:bg-brand-50 h-full">
                  <div className="relative aspect-[4/5] overflow-hidden bg-brand-50">
                    <img
                      src={m.image}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04100a] via-[#04100a]/40 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full
                                    bg-brand-accent/20 backdrop-blur border border-brand-accent/30
                                    px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em]
                                    text-brand-accentDark">
                      <Briefcase size={10} /> Executive
                    </div>
                  </div>
                  <div className="p-4 md:p-5">
                    <div className="font-serif text-base md:text-lg text-brand-deep leading-tight">
                      {m.name}
                    </div>
                    <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-brand-accentDark">
                      {m.role}
                    </div>
                    <p className="mt-3 text-[12px] md:text-[13px] text-brand-deep/65 leading-snug">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
