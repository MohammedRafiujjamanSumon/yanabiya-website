import { Crown, Briefcase, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { ALL_PEOPLE, type PersonData } from '../data/people'

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
  const DELAY: Record<number, string> = { 0: '', 60: 'delay-[60ms]', 80: 'delay-[80ms]', 90: 'delay-[90ms]', 120: 'delay-[120ms]', 150: 'delay-[150ms]', 180: 'delay-[180ms]', 210: 'delay-[210ms]', 240: 'delay-[240ms]', 270: 'delay-[270ms]' }
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${DELAY[delay] ?? ''} ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  )
}

type TierTheme = {
  panelBg: string
  panelBorder: string
  badge: string
  badgeBorder: string
  badgeIcon: string
  badgeText: string
  title: string
  accentLine: string
  readMore: string
  connector: string
  roleText: string
  overlayBg: string
}

const THEMES: Record<string, TierTheme> = {
  board: {
    panelBg:     'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50',
    panelBorder: 'border-amber-200',
    badge:       'bg-amber-100',
    badgeBorder: 'border-amber-300',
    badgeIcon:   'text-amber-600',
    badgeText:   'text-amber-800',
    title:       'text-amber-900',
    accentLine:  'bg-amber-400',
    readMore:    'bg-amber-500 hover:bg-amber-600',
    connector:   'bg-amber-300',
    roleText:    'text-amber-400',
    overlayBg:   'from-amber-900/85',
  },
  exec: {
    panelBg:     'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50',
    panelBorder: 'border-blue-200',
    badge:       'bg-blue-100',
    badgeBorder: 'border-blue-300',
    badgeIcon:   'text-blue-600',
    badgeText:   'text-blue-800',
    title:       'text-blue-900',
    accentLine:  'bg-blue-400',
    readMore:    'bg-blue-500 hover:bg-blue-600',
    connector:   'bg-blue-300',
    roleText:    'text-blue-300',
    overlayBg:   'from-blue-900/85',
  },
}

function TierBadge({
  icon: Icon,
  kicker,
  title,
  theme,
}: {
  icon: LucideIcon
  kicker: string
  title: string
  theme: TierTheme
}) {
  return (
    <Reveal className="text-center mb-6 md:mb-8">
      <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border mb-3
                       ${theme.badge} ${theme.badgeBorder}`}>
        <Icon size={11} className={theme.badgeIcon} />
        <span className={`text-[10px] font-bold uppercase tracking-[0.28em] ${theme.badgeText}`}>
          {kicker}
        </span>
      </div>
      <h3 className={`font-serif text-xl md:text-2xl leading-tight ${theme.title}`}>{title}</h3>
    </Reveal>
  )
}


function PersonCard({ person, theme, delay }: { person: PersonData; theme: TierTheme; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to={`/people/${person.id}`}
        className="group block relative rounded-2xl overflow-hidden cursor-pointer"
        style={{ aspectRatio: '3/4' }}
      >
        {/* Photo */}
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top
                     transition-transform duration-700 group-hover:scale-110"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />

        {/* Always-on gradient, bottom 55% */}
        <div className={`absolute inset-x-0 bottom-0 h-[55%]
                         bg-gradient-to-t ${theme.overlayBg} via-black/40 to-transparent`} />

        {/* Hover full overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100
                        transition-opacity duration-500" />

        {/* Content, always visible at bottom-left */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          {/* Thin accent line */}
          <div className={`w-8 h-0.5 rounded-full mb-2.5 ${theme.accentLine}
                           transition-all duration-300 group-hover:w-14`} />

          {/* Role */}
          <p className={`text-[10px] font-bold uppercase tracking-[0.22em] mb-1 ${theme.roleText}`}>
            {person.role}
            {person.flag && <span className="ml-1.5">{person.flag}</span>}
          </p>

          {/* Name */}
          <h4 className="font-serif text-white text-base md:text-lg leading-tight">
            {person.name}
          </h4>

          {/* Short bio, slides up on hover */}
          <p className="text-white/70 text-[11px] leading-snug mt-1.5 line-clamp-2
                        max-h-0 overflow-hidden opacity-0
                        group-hover:max-h-12 group-hover:opacity-100
                        transition-all duration-500 ease-out">
            {person.shortBio}
          </p>

          {/* Read More, slides up on hover */}
          <div className="mt-3 translate-y-3 opacity-0
                          group-hover:translate-y-0 group-hover:opacity-100
                          transition-all duration-400 ease-out">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5
                              text-white text-[10px] font-bold uppercase tracking-[0.2em]
                              ${theme.readMore} transition-colors duration-200`}>
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

export default function Leadership() {
  const t = THEMES

  const boardPeople = ALL_PEOPLE.filter((p) => p.tier === 'board')
  const execPeople  = ALL_PEOPLE.filter((p) => p.tier === 'exec')

  return (
    <Section id="leadership" className="relative overflow-hidden bg-slate-100">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-amber-200/20 blur-[160px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-blue-200/20 blur-[140px]" />
        <div className="absolute bottom-0 -left-20 w-[480px] h-[480px] rounded-full bg-emerald-200/20 blur-[140px]" />
      </div>

      <div className="container-x relative pt-4 pb-12 md:pb-16">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <Reveal>
            <Eyebrow>Our People</Eyebrow>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep mt-2">
              Leadership Hierarchy
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              The people driving Yanabiya Group's global vision
            </p>
          </Reveal>
        </div>

        {/* ── TIER 01, BOARD ── */}
        <div className={`rounded-2xl border p-6 md:p-10 mb-4 ${t.board.panelBg} ${t.board.panelBorder} shadow-sm`}>
          <TierBadge icon={Crown} kicker="Tier 01, Global Board & Advisory" title="Board of Directors" theme={t.board} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {boardPeople.map((p, i) => (
              <PersonCard key={p.id} person={p} theme={t.board} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="flex justify-center my-1">
          <div className={`w-px h-8 ${t.exec.connector}`} />
        </div>

        {/* ── TIER 02, EXEC ── */}
        <div className={`rounded-2xl border p-6 md:p-10 ${t.exec.panelBg} ${t.exec.panelBorder} shadow-sm`}>
          <TierBadge icon={Briefcase} kicker="Tier 02, Global Executive Management" title="C-Suite Leadership" theme={t.exec} />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-5xl mx-auto">
            {execPeople.map((p, i) => (
              <PersonCard key={p.id} person={p} theme={t.exec} delay={i * 60} />
            ))}
          </div>
        </div>


      </div>
    </Section>
  )
}
