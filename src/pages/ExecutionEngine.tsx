import { useEffect } from 'react'
import { Cpu, Code2, Brain, PenTool, Truck, BarChart3, type LucideIcon } from 'lucide-react'
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
  image: string
  tags?: string[]
}

const SQUADS: { id: string; icon: LucideIcon; title: string; blurb: string; members: Member[] }[] = [
  {
    id: 'engineering',
    icon: Code2,
    title: 'Software Engineering',
    blurb: 'Full-stack delivery across web, mobile, and platform.',
    members: [
      { name: 'Arjun Mehta',     role: 'Principal Engineer',  image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80', tags: ['React', 'Node'] },
      { name: 'Hana Kim',        role: 'Senior Frontend Engineer', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80', tags: ['TypeScript', 'Next.js'] },
      { name: 'Mahmoud Al-Saidi', role: 'Backend Engineer',   image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', tags: ['Go', 'Postgres'] },
      { name: 'Riya Sengupta',   role: 'Mobile Engineer',     image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=400&q=80', tags: ['Flutter', 'iOS'] },
    ],
  },
  {
    id: 'ai',
    icon: Brain,
    title: 'AI & Data',
    blurb: 'Applied ML, data engineering, and analytics for the group.',
    members: [
      { name: 'Dr. Lina Faruq',  role: 'Lead AI Engineer',     image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80', tags: ['LLMs', 'PyTorch'] },
      { name: 'Owen Bridges',    role: 'Data Engineer',        image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80', tags: ['dbt', 'Snowflake'] },
      { name: 'Zara Iqbal',      role: 'ML Researcher',        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80', tags: ['NLP', 'CV'] },
    ],
  },
  {
    id: 'design',
    icon: PenTool,
    title: 'Design & Product',
    blurb: 'Product strategy, UX, and brand systems across markets.',
    members: [
      { name: 'Noor Al-Habsi',   role: 'Head of Design',       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', tags: ['Brand', 'Systems'] },
      { name: 'Ethan Park',      role: 'Senior Product Designer', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80', tags: ['UX', 'Figma'] },
      { name: 'Sumi Akter',      role: 'UX Researcher',        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80', tags: ['Research'] },
    ],
  },
  {
    id: 'trade',
    icon: Truck,
    title: 'Trade & Operations',
    blurb: 'Sourcing, logistics, and country-side delivery.',
    members: [
      { name: 'Saif Al-Mahrouqi', role: 'Trade Operations Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Beatrice Hall',    role: 'Logistics Manager',   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rakib Hasan',      role: 'Supply Chain Analyst', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  {
    id: 'strategy',
    icon: BarChart3,
    title: 'Strategy & Delivery',
    blurb: 'Programme leads, PMs, and revenue strategists.',
    members: [
      { name: 'James Whitlock',   role: 'Programme Director',  image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80' },
      { name: 'Aisha Rahman',     role: 'Senior Project Manager', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Marcus Coleman',   role: 'Revenue Strategist',  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
    ],
  },
]

const STATS = [
  { v: '60+', k: 'Specialists' },
  { v: '4',   k: 'Countries' },
  { v: '12',  k: 'Disciplines' },
  { v: '24/7', k: 'Coverage' },
]

export default function ExecutionEngine() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a] text-white overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="High-Skill Execution Engine"
        title={<>Engineers, operators &amp; specialists <span className="italic text-brand-accent">who ship.</span></>}
        subtitle="The cross-functional bench behind every Yanabiya project across IT, AI, trade, design, and delivery."
      />

      {/* STATS STRIP */}
      <section className="relative">
        <div className="container-x py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {STATS.map((s, i) => (
              <Reveal key={s.k} delay={i * 80}>
                <div className="rounded-2xl bg-white/5 backdrop-blur border border-white/10
                                px-4 py-5 text-center">
                  <div className="font-serif text-2xl md:text-3xl text-brand-accent">{s.v}</div>
                  <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-white/60">
                    {s.k}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SQUADS */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28 space-y-12 md:space-y-16">
          {SQUADS.map((sq) => (
            <div key={sq.id} id={sq.id}>
              <Reveal>
                <div className="flex items-end justify-between gap-4 mb-5 md:mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full
                                    bg-brand-accent/15 border border-brand-accent/30
                                    px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]
                                    text-brand-accent">
                      <sq.icon size={11} /> {sq.title}
                    </div>
                    <h2 className="mt-3 font-serif text-xl md:text-2xl text-white leading-tight max-w-xl">
                      {sq.blurb}
                    </h2>
                  </div>
                </div>
              </Reveal>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
                {sq.members.map((m, i) => (
                  <Reveal key={m.name} delay={i * 70}>
                    <div className="group rounded-2xl overflow-hidden
                                    bg-white/5 backdrop-blur border border-white/10
                                    transition-all duration-500
                                    hover:-translate-y-1 hover:border-brand-accent/50
                                    hover:bg-white/8">
                      <div className="relative aspect-[4/5] overflow-hidden bg-white/5">
                        <img
                          src={m.image}
                          alt={m.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover
                                     transition-transform duration-700 group-hover:scale-105"
                          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t
                                        from-[#04100a] via-[#04100a]/30 to-transparent" />
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="font-serif text-[14px] md:text-[15px] text-white leading-tight">
                          {m.name}
                        </div>
                        <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-accent">
                          {m.role}
                        </div>
                        {m.tags && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {m.tags.map((t) => (
                              <span key={t} className="inline-block rounded-full bg-white/8
                                                       border border-white/10 px-2 py-0.5
                                                       text-[9px] uppercase tracking-[0.16em] text-white/70">
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section className="relative border-t border-white/10">
        <div className="container-x py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-full
                              bg-brand-accent/15 border border-brand-accent/30 text-brand-accent">
                <Cpu size={16} />
              </div>
              <div>
                <div className="font-serif text-lg text-white leading-tight">
                  Building something complex?
                </div>
                <div className="text-[12px] text-white/60">
                  Our execution bench picks it up — across countries and time zones.
                </div>
              </div>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                         bg-brand-accent text-brand-deep text-[11px] font-bold uppercase tracking-[0.22em]
                         hover:gap-3 transition-all duration-300"
            >
              Talk to the team
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
