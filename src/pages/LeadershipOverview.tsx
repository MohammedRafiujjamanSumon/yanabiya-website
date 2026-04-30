import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Star, Briefcase, Cpu, Globe2, type LucideIcon } from 'lucide-react'
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

type Person = { name: string; role: string; image: string }

const BOARD: Person[] = [
  { name: 'H.E. Khalifa Al-Hinai',  role: 'Chairman of the Board',   image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sir Anthony Whitfield',  role: 'Senior Strategic Advisor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dr. Amina Rahman',       role: 'Independent Director',    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tariq Al-Balushi',       role: 'Audit & Risk Advisor',    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
]

const FOUNDERS: Person[] = [
  { name: 'Mohammed Rafiujjaman Sumon', role: 'Group CEO & Co-Founder',  image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80' },
  { name: 'Ahmed Al-Yanabi',            role: 'Co-Founder & Chairman',   image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80' },
]

const EXECS: Person[] = [
  { name: 'Sara Al-Mahrouqi', role: 'Chief Operating Officer',  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Daniel Whitmore',  role: 'Chief Financial Officer',  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Priya Iyer',       role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
  { name: 'Nasser Al-Rawahi', role: 'Chief Marketing Officer',  image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
  { name: 'Layla Hossain',    role: 'Chief People Officer',     image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
  { name: "James O'Connor",   role: 'Chief Strategy Officer',   image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80' },
]

const COUNTRIES = [
  { code: 'om', name: 'Oman',       flag: '🇴🇲', head: 'Yousuf Al-Lawati', role: 'Country Head — Oman',       image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=600&q=80' },
  { code: 'gb', name: 'UK',         flag: '🇬🇧', head: 'Eleanor Hayward',  role: 'Country Head — UK',         image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩', head: 'Imran Chowdhury',  role: 'Country Head — Bangladesh', image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&q=80' },
  { code: 'us', name: 'USA',        flag: '🇺🇸', head: 'Michael Reeves',   role: 'Country Head — USA',        image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=600&q=80' },
]

function TierHeader({ icon: Icon, kicker, title, subtitle }: {
  icon: LucideIcon
  kicker: string
  title: string
  subtitle?: string
}) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-5 md:mb-7">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/15 px-3 py-1
                      border border-brand-accent/30 mb-2">
        <Icon size={11} className="text-brand-accent" />
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accent">
          {kicker}
        </span>
      </div>
      <h3 className="font-serif text-xl md:text-2xl text-white leading-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-1.5 text-[12px] md:text-[13px] text-white/60 leading-snug">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

function PersonTile({ p, size = 'sm' }: { p: Person; size?: 'sm' | 'lg' }) {
  const ringSize = size === 'lg' ? 'w-32 h-32 md:w-40 md:h-40' : 'w-20 h-20 md:w-24 md:h-24'
  const nameClass = size === 'lg'
    ? 'text-base md:text-lg font-serif text-white'
    : 'text-[12px] md:text-[13px] font-semibold text-white'
  const roleClass = size === 'lg'
    ? 'text-[11px] md:text-[12px] text-brand-accent uppercase tracking-[0.18em]'
    : 'text-[10px] md:text-[11px] text-white/60'

  return (
    <div className="text-center">
      <div className={`relative mx-auto ${ringSize} rounded-full overflow-hidden
                       ring-1 ring-white/15
                       shadow-[0_8px_20px_-10px_rgba(0,0,0,0.6)]
                       transition-all duration-500
                       hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.7)]
                       hover:ring-brand-accent/60`}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
      <div className={`mt-2.5 ${nameClass} leading-tight`}>{p.name}</div>
      <div className={`mt-0.5 ${roleClass} leading-tight`}>{p.role}</div>
    </div>
  )
}

export default function LeadershipOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a] text-white overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="Global Leadership"
        title={<>Leadership across <span className="italic text-brand-accent">four continents.</span></>}
        subtitle="Anchored by integrity and execution — five tiers from board to bench."
      />

      <div className="container-x relative pt-12 md:pt-16 pb-20 md:pb-28 space-y-16 md:space-y-20">

        {/* TIER 01 — BOARD */}
        <div>
          <TierHeader
            icon={Crown}
            kicker="Tier 01"
            title="Global Board & Advisory"
            subtitle="Strategic oversight from independent directors and senior advisors."
          />
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {BOARD.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <PersonTile p={p} size="sm" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 02 — FOUNDERS */}
        <div>
          <TierHeader
            icon={Star}
            kicker="Tier 02"
            title="Global CEO & Co-Founders"
            subtitle="The vision-bearers behind the group — driving strategy across every market."
          />
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 justify-items-center">
            {FOUNDERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <PersonTile p={p} size="lg" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 03 — EXEC */}
        <div>
          <TierHeader
            icon={Briefcase}
            kicker="Tier 03"
            title="Global Executive Management"
            subtitle="Senior leaders running operations, finance, technology, marketing, and people."
          />
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 md:gap-6">
            {EXECS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <PersonTile p={p} size="sm" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 04 — EXECUTION ENGINE */}
        <div>
          <TierHeader
            icon={Cpu}
            kicker="Tier 04"
            title="High-Skill Execution Engine"
            subtitle="The cross-functional bench of engineers, operators, and specialists who ship."
          />
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <Link
                to="/leadership/execution-engine"
                className="group relative block rounded-2xl overflow-hidden
                           bg-white/5 backdrop-blur border border-white/10
                           transition-all duration-500
                           hover:-translate-y-1 hover:border-brand-accent/60
                           hover:bg-white/8"
              >
                <div className="absolute inset-0 opacity-25 group-hover:opacity-35 transition-opacity duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep via-brand-deep/80 to-transparent" />
                </div>

                <div className="relative px-6 py-8 md:px-10 md:py-10 grid md:grid-cols-[1fr_auto] gap-6 items-center">
                  <div>
                    <h4 className="font-serif text-2xl md:text-3xl text-white leading-tight">
                      Meet the engineers, operators &amp; specialists who ship.
                    </h4>
                    <p className="mt-2 text-[13px] md:text-sm text-white/70 max-w-xl leading-snug">
                      Software, AI, trade ops, design, delivery — the cross-functional bench
                      behind every project across our four markets.
                    </p>
                  </div>
                  <div className="md:justify-self-end">
                    <span className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                                     bg-brand-accent text-brand-deep text-[11px] font-bold
                                     uppercase tracking-[0.22em] shadow-md
                                     group-hover:gap-3 transition-all duration-300">
                      Open Full Team <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>

        {/* TIER 05 — COUNTRIES */}
        <div>
          <TierHeader
            icon={Globe2}
            kicker="Tier 05"
            title="Country-Based Management"
            subtitle="Country heads and local leadership teams across our four operating markets."
          />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.code} delay={i * 90}>
                <Link
                  to={`/leadership/country/${c.code}`}
                  aria-label={`Open ${c.name} management team`}
                  className="group relative block rounded-xl overflow-hidden
                             bg-white/5 backdrop-blur border border-white/10
                             transition-all duration-500
                             hover:-translate-y-1 hover:border-brand-accent/60
                             hover:bg-white/8"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/40 to-transparent" />
                    <div className="absolute top-2 left-2 inline-flex items-center gap-1.5
                                    rounded-full bg-white/95 backdrop-blur px-2.5 py-1
                                    text-[10px] font-bold uppercase tracking-[0.2em] text-brand-deep">
                      <span className="text-sm leading-none">{c.flag}</span>
                      {c.name}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 px-3 py-2.5">
                      <div className="text-white font-serif text-[14px] md:text-[15px] leading-tight">
                        {c.head}
                      </div>
                      <div className="text-white/70 text-[10px] md:text-[11px] mt-0.5">
                        {c.role}
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-between border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60
                                     group-hover:text-brand-accent transition-colors duration-300">
                      View Team
                    </span>
                    <ArrowRight size={12} className="text-brand-accent
                                                     group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}
