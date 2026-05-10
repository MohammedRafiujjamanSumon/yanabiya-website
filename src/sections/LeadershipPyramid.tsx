import { Link } from 'react-router-dom'
import { ArrowRight, Users, Handshake, Briefcase, Building2 } from 'lucide-react'
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
  const DELAY: Record<number, string> = {
    0: '', 80: 'delay-[80ms]', 160: 'delay-[160ms]', 240: 'delay-[240ms]',
    320: 'delay-[320ms]', 340: 'delay-[340ms]', 360: 'delay-[360ms]', 480: 'delay-[480ms]',
  }
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

function Connector() {
  return <div className="w-px h-2 bg-brand-deep/20 mx-auto" />
}

type CardColor = {
  bg: string
  border: string
  ring: string
  badge: string
  badgeText: string
  label: string
  sub: string
  readMore: string
  readMoreText: string
  glow: string
}

const COLORS: Record<string, CardColor> = {
  ceo: {
    bg:           'bg-gradient-to-b from-brand-50 to-brand-100',
    border:       'border-brand-accentDark',
    ring:         'ring-brand-accentDark',
    badge:        'bg-brand-100 text-brand-deep border border-brand-accentDark',
    badgeText:    'text-brand-deep',
    label:        'text-brand-deep',
    sub:          'text-brand-accentDark',
    readMore:     'bg-brand-deep hover:bg-brand-ink',
    readMoreText: 'Read about the CEO',
    glow:         'shadow-brand-200/60',
  },
  vice: {
    bg:           'bg-gradient-to-b from-brand-100 to-brand-200',
    border:       'border-brand-accent',
    ring:         'ring-brand-accent',
    badge:        'bg-brand-200 text-brand-deep border border-brand-accent',
    badgeText:    'text-brand-deep',
    label:        'text-brand-deep',
    sub:          'text-brand-accentDark',
    readMore:     'bg-brand-accentDark hover:bg-brand-deep',
    readMoreText: 'Read About The Vice Chairman',
    glow:         'shadow-brand-accent/40',
  },
  board: {
    bg:           'bg-gradient-to-b from-blue-50 to-indigo-50',
    border:       'border-blue-300',
    ring:         'ring-blue-300',
    badge:        'bg-blue-100 text-blue-700 border border-blue-300',
    badgeText:    'text-blue-700',
    label:        'text-blue-900',
    sub:          'text-blue-700/70',
    readMore:     'bg-blue-500 hover:bg-blue-600',
    readMoreText: 'Meet the Board',
    glow:         'shadow-blue-200/60',
  },
  group: {
    bg:           'bg-gradient-to-b from-violet-50 to-purple-50',
    border:       'border-violet-300',
    ring:         'ring-violet-300',
    badge:        'bg-violet-100 text-violet-700 border border-violet-300',
    badgeText:    'text-violet-700',
    label:        'text-violet-900',
    sub:          'text-violet-700/70',
    readMore:     'bg-violet-500 hover:bg-violet-600',
    readMoreText: 'View Management',
    glow:         'shadow-violet-200/60',
  },
  coa: {
    bg:           'bg-gradient-to-b from-rose-50 to-pink-50',
    border:       'border-rose-300',
    ring:         'ring-rose-300',
    badge:        'bg-rose-100 text-rose-700 border border-rose-300',
    badgeText:    'text-rose-700',
    label:        'text-rose-900',
    sub:          'text-rose-700/70',
    readMore:     'bg-rose-500 hover:bg-rose-600',
    readMoreText: 'View Accounts',
    glow:         'shadow-rose-200/60',
  },
  dept: {
    bg:           'bg-gradient-to-b from-orange-50 to-amber-50',
    border:       'border-orange-300',
    ring:         'ring-orange-300',
    badge:        'bg-orange-100 text-orange-700 border border-orange-300',
    badgeText:    'text-orange-700',
    label:        'text-orange-900',
    sub:          'text-orange-700/70',
    readMore:     'bg-orange-500 hover:bg-orange-600',
    readMoreText: 'View Heads',
    glow:         'shadow-orange-200/60',
  },
}

function HierarchyCard({
  colorKey,
  label,
  sub,
  to,
  photo,
  delay = 0,
  size = 'md',
}: {
  colorKey: keyof typeof COLORS
  label: string
  sub?: string
  to: string
  photo?: string
  delay?: number
  size?: 'lg' | 'md' | 'sm' | 'xs' | 'xxs'
}) {
  const c = COLORS[colorKey]

  const imgSize  = size === 'lg' ? 'w-28 h-28' : size === 'md' ? 'w-14 h-14' : size === 'sm' ? 'w-12 h-12' : size === 'xs' ? 'w-10 h-10' : 'w-8 h-8'
  const maxW     = size === 'lg' ? 'max-w-[320px]' : size === 'md' ? 'max-w-[220px]' : size === 'sm' ? 'max-w-[136px]' : size === 'xs' ? 'max-w-[118px]' : 'max-w-[100px]'
  const pad      = size === 'lg' ? 'px-7 py-6' : size === 'md' ? 'px-3.5 py-3' : size === 'sm' ? 'px-3 py-2' : size === 'xs' ? 'px-2.5 py-1.5' : 'px-2 py-1'
  const labelSz  = size === 'lg' ? 'text-[15px] font-bold' : size === 'md' ? 'text-[11px] font-semibold' : size === 'sm' ? 'text-[10px] font-semibold' : size === 'xs' ? 'text-[9px] font-semibold' : 'text-[8px] font-semibold'
  const subSz    = 'text-[9px]'
  const btnSz    = 'text-[8px] px-2.5 py-0.5'

  return (
    <Reveal delay={delay}>
      <Link
        to={to}
        className={`group flex flex-col items-center gap-2 text-center w-full ${maxW} ${pad} rounded-2xl
                    border shadow-lg ${c.bg} ${c.border} ${c.glow}
                    hover:-translate-y-1.5 hover:shadow-xl
                    transition-all duration-300`}
      >
        {/* Photo */}
        <div className={`${imgSize} rounded-full overflow-hidden shrink-0
                         ring-2 ${c.ring} ring-offset-2
                         transition-all duration-300`}>
          {photo
            ? <img src={photo} alt={label} className="w-full h-full object-cover object-top" />
            : <div className="w-full h-full bg-white/60 grid place-items-center">
                <Users size={size === 'sm' ? 16 : 20} className="text-brand-deep/30" />
              </div>
          }
        </div>

        {/* Text */}
        <div className="flex flex-col items-center gap-0.5">
          <p className={`${labelSz} ${c.label} leading-snug whitespace-nowrap`}>{label}</p>
          {sub && <p className={`${subSz} ${c.sub}`}>{sub}</p>}
        </div>

        {/* Read More button */}
        <span className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wider
                          text-white whitespace-nowrap ${btnSz} ${c.readMore}
                          group-hover:gap-2 transition-all duration-200`}>
          {c.readMoreText} <ArrowRight size={9} />
        </span>
      </Link>
    </Reveal>
  )
}

const BOARD_PHOTO = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=200&q=80'
const GROUP_PHOTO = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'
const DEPT_PHOTO  = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=200&q=80'

export default function LeadershipPyramid() {
  return (
    <Section id="leadership" className="bg-brand-50">
      <div className="container-x pt-4 pb-10 md:pb-14">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-center gap-2 mb-12 text-center">
            <Eyebrow>Our People</Eyebrow>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-deep leading-snug tracking-tight">
              The People Behind{' '}
              <span className="italic text-brand-accentDark">Yanabiya</span>
            </h2>
          </div>
        </Reveal>

        {/* ── Org Chart ── */}
        <div className="flex flex-col items-center w-full">

          {/* ══ Row 1: Vice Chairman (left) · CEO elevated (center) · Board of Members (right) ══ */}
          <div className="relative w-full max-w-[700px]">
            {/* L-shape connector lines */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-[65px] left-[16%] right-[50%] h-0.5 bg-brand-deep/25" />
              <div className="absolute top-[65px] left-[50%] right-[16%] h-0.5 bg-brand-deep/25" />
              <div className="absolute top-[65px] left-[16%] -translate-x-px w-0.5 h-[55px] bg-brand-deep/25" />
              <div className="absolute top-[65px] right-[16%] w-0.5 h-[55px] bg-brand-deep/25" />
              <div className="absolute top-[65px] left-[16%] -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-deep/15 border border-brand-deep/25" />
              <div className="absolute top-[65px] right-[16%] translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-deep/15 border border-brand-deep/25" />
              <div className="absolute top-[65px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-deep/10 border-2 border-brand-deep/20" />
            </div>

            <div className="relative grid grid-cols-3 gap-8 z-10">
              {/* Vice Chairman — left, pushed down */}
              <Reveal delay={100}>
                <div className="flex justify-center pt-16">
                  <HierarchyCard colorKey="vice" label="Vice Chairman" to="/people/vice-chairman" photo={board[1]?.photo} delay={0} size="md" />
                </div>
              </Reveal>
              {/* CEO — elevated at top center */}
              <Reveal delay={80}>
                <div className="flex justify-center">
                  <HierarchyCard colorKey="ceo" label="Founder & CEO" to="/people/ceo" photo={board[0]?.photo} delay={0} size="lg" />
                </div>
              </Reveal>
              {/* Board of Members — right, pushed down */}
              <Reveal delay={120}>
                <div className="flex justify-center pt-16">
                  <HierarchyCard colorKey="board" label="Board of Members" to="/people/board" photo={BOARD_PHOTO} delay={0} size="md" />
                </div>
              </Reveal>
            </div>
          </div>

          {/* CEO → fork → Chief of Accounts + Global Executive Management */}
          <div className="relative w-full max-w-[700px] h-12 shrink-0 -mt-10">
            <div className="absolute top-0 left-1/2 -translate-x-px w-0.5 h-6 bg-brand-deep/30" />
            <div className="absolute top-6 left-[33%] right-[33%] h-0.5 bg-brand-deep/30" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-deep/20 border border-brand-deep/25" />
            <div className="absolute top-6 left-[33%] -translate-x-px w-0.5 h-6 bg-brand-deep/30" />
            <div className="absolute top-6 right-[33%] w-0.5 h-6 bg-brand-deep/30" />
          </div>

          {/* ══ Row 2: Chief of Accounts · Global Executive Management ══ */}
          <div className="w-full max-w-[700px] grid grid-cols-2 gap-24 px-[10%]">
            <Reveal delay={260}>
              <div className="flex justify-center">
                <HierarchyCard colorKey="coa" label="Chief of Accounts" to="/people/accounts" photo={DEPT_PHOTO} delay={0} size="md" />
              </div>
            </Reveal>
            <Reveal delay={300}>
              <div className="flex justify-center">
                <HierarchyCard colorKey="group" label="Global Executive Management" to="/people/executive" photo={GROUP_PHOTO} delay={0} size="md" />
              </div>
            </Reveal>
          </div>

          {/* Chief of Accounts + Global Exec → merge → Regional Operations Team */}
          <div className="relative w-full max-w-[700px] h-20 shrink-0">
            <div className="absolute top-0 left-[33%] -translate-x-px w-0.5 h-10 bg-brand-deep/30" />
            <div className="absolute top-0 right-[33%] w-0.5 h-10 bg-brand-deep/30" />
            <div className="absolute top-10 left-[33%] right-[33%] h-0.5 bg-brand-deep/30" />
            <div className="absolute top-10 left-[33%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-deep/25" />
            <div className="absolute top-10 right-[33%] translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand-deep/25" />
            <div className="absolute top-10 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-deep/20 border border-brand-deep/25" />
            <div className="absolute top-10 left-1/2 -translate-x-px w-0.5 h-10 bg-brand-deep/30" />
          </div>

          {/* ══ Row 3: Regional Operations Team ══ */}
          <HierarchyCard colorKey="dept" label="Regional Operations Team" to="/people/departments" photo={DEPT_PHOTO} delay={400} size="md" />

          {/* CTA buttons */}
          <Reveal delay={520}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-brand-deep text-white text-xs font-semibold
                           hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-deep/20
                           transition-all duration-300"
              >
                <Handshake size={13} className="text-amber-400" />
                Become a Partner
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/community/careers"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-brand-accent text-white text-xs font-semibold
                           hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand-accent/30
                           transition-all duration-300"
              >
                <Briefcase size={13} />
                Join Our Team
                <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/about-us"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                           bg-white border border-brand-accent/25 text-brand-deep text-xs font-semibold
                           hover:-translate-y-0.5 hover:border-brand-accent/50 hover:shadow-md
                           transition-all duration-300"
              >
                <Building2 size={13} className="text-brand-accentDark" />
                Our Companies
                <ArrowRight size={11} className="text-brand-accentDark group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}
