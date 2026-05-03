import { Link } from 'react-router-dom'
import { ArrowRight, Crown, Star, Briefcase, Globe2, type LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { board } from '../data/leadership'

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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─────────── DATA ───────────
 *  Four-tier leadership hierarchy displayed on the landing page.
 *  01 Board & Advisory   |  02 CEO + Vice Chairman
 *  03 Executive Mgmt     |  04 Country-Based Management
 */

type Person = { name: string; role: string; image: string }

const BOARD: Person[] = [
  { name: 'H.E. Khalifa Al-Hinai',  role: 'Chairman of the Board',    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { name: 'Sir Anthony Whitfield',  role: 'Senior Strategic Advisor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dr. Amina Rahman',       role: 'Independent Director',     image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Tariq Al-Balushi',       role: 'Audit & Risk Advisor',     image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
]

const FOUNDERS: Person[] = [
  { name: 'S M Shamim Ahmed',     role: 'Global CEO',    image: board[0].photo },
  { name: 'Mohammad Abu Jaheed',  role: 'Vice Chairman', image: board[1].photo },
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

/* ─────────── SHARED PIECES ─────────── */

function TierHeader({
  icon: Icon, kicker, title, subtitle, href,
}: {
  icon: LucideIcon
  kicker: string
  title: string
  subtitle?: string
  href: string
}) {
  return (
    <Reveal className="text-center max-w-2xl mx-auto mb-5 md:mb-7">
      <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/15 px-3 py-1
                      border border-brand-accentDark/30 mb-2">
        <Icon size={11} className="text-brand-accentDark" />
        <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-deep">
          {kicker}
        </span>
      </div>
      <Link to={href} className="group inline-block">
        <h3 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight
                       group-hover:text-brand-accentDark transition-colors duration-300">
          {title}
        </h3>
      </Link>
      {subtitle && (
        <p className="mt-1.5 text-[12px] md:text-[13px] text-slate-500 leading-snug">
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}

function PersonTile({ p, size = 'sm', href }: { p: Person; size?: 'sm' | 'lg'; href?: string }) {
  const ringSize = size === 'lg' ? 'w-32 h-32 md:w-40 md:h-40' : 'w-20 h-20 md:w-24 md:h-24'
  const nameClass = size === 'lg'
    ? 'text-base md:text-lg font-serif text-brand-deep'
    : 'text-[12px] md:text-[13px] font-semibold text-brand-deep'
  const roleClass = size === 'lg'
    ? 'text-[11px] md:text-[12px] text-brand-accentDark uppercase tracking-[0.18em]'
    : 'text-[10px] md:text-[11px] text-slate-500'

  const content = (
    <div className="text-center">
      <div className={`relative mx-auto ${ringSize} rounded-full overflow-hidden
                       ring-1 ring-brand-deep/10
                       shadow-[0_8px_20px_-10px_rgba(15,58,35,0.35)]
                       transition-all duration-500
                       hover:shadow-[0_16px_32px_-12px_rgba(15,58,35,0.45)]
                       hover:ring-brand-accent/60`}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
      <div className={`mt-2.5 ${nameClass} leading-tight`}>{p.name}</div>
      <div className={`mt-0.5 ${roleClass} leading-tight`}>{p.role}</div>
    </div>
  )

  return href ? <Link to={href} className="block">{content}</Link> : content
}

/* ─────────── SECTION ─────────── */

export default function Leadership() {
  return (
    <Section id="leadership" className="relative overflow-hidden bg-brand-50">

      {/* Ambient brand glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-8 md:pb-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal>
            <Eyebrow>Global Leadership</Eyebrow>
          </Reveal>
        </div>

        {/* TIER 01 — BOARD */}
        <div className="mb-12 md:mb-16">
          <TierHeader
            icon={Crown}
            kicker="Tier 01"
            title="Global Board & Advisory"
            href="/leadership/board"
          />
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {BOARD.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <PersonTile p={p} size="sm" href="/leadership/board" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 02 — CEO + VICE CHAIRMAN */}
        <div className="mb-12 md:mb-16">
          <TierHeader
            icon={Star}
            kicker="Tier 02"
            title="Global CEO & Vice Chairman"
            href="/leadership/management"
          />
          <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6 sm:gap-8 md:gap-10 justify-items-center">
            {FOUNDERS.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <PersonTile p={p} size="lg" href="/leadership/management" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 03 — EXEC */}
        <div className="mb-14 md:mb-20">
          <TierHeader
            icon={Briefcase}
            kicker="Tier 03"
            title="Global Executive Management"
            href="/leadership/executive"
          />
          <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-5 md:gap-6">
            {EXECS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <PersonTile p={p} size="sm" href="/leadership/executive" />
              </Reveal>
            ))}
          </div>
        </div>

        {/* TIER 04 — COUNTRIES */}
        <div>
          <TierHeader
            icon={Globe2}
            kicker="Tier 04"
            title="Country-Based Management"
            href="/leadership/countries"
          />
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.code} delay={i * 90}>
                <Link
                  to={`/leadership/country/${c.code}`}
                  aria-label={`Open ${c.name} management team`}
                  className="group relative block rounded-xl overflow-hidden
                             bg-brand-50 border border-brand-deep/15
                             shadow-[0_8px_22px_-14px_rgba(15,58,35,0.25)]
                             transition-all duration-500
                             hover:-translate-y-1 hover:border-brand-accent/60
                             hover:shadow-[0_18px_36px_-14px_rgba(15,58,35,0.35)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/85 via-brand-deep/30 to-transparent" />
                    <div className="absolute top-2 left-2 inline-flex items-center gap-1.5
                                    rounded-full bg-white/95 backdrop-blur px-2.5 py-1
                                    text-[10px] font-bold uppercase tracking-[0.2em] text-brand-deep">
                      <span className="text-sm leading-none">{c.flag}</span>
                      {c.name}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 px-3 py-2.5">
                      <div className="text-brand-deep font-serif text-[14px] md:text-[15px] leading-tight">
                        {c.head}
                      </div>
                      <div className="text-brand-deep/70 text-[10px] md:text-[11px] mt-0.5">
                        {c.role}
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2.5 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500
                                     group-hover:text-brand-accentDark transition-colors duration-300">
                      View Team
                    </span>
                    <ArrowRight size={12} className="text-brand-accentDark
                                                     group-hover:translate-x-0.5 transition-transform duration-300" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA — opens the full leadership overview */}
        <div className="text-center mt-10 md:mt-14">
          <Reveal>
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Leadership <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
