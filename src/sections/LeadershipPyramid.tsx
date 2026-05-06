import { Link } from 'react-router-dom'
import { ArrowRight, Users, Handshake, Briefcase } from 'lucide-react'
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const BOARD_PHOTO  = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=200&q=80'
const GROUP_PHOTO  = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=200&q=80'
const CFO_PHOTO    = 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=200&q=80'
const DEPT_PHOTO   = 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=200&q=80'

const COUNTRIES = [
  { flag: '🇴🇲', name: 'Oman',       to: '/leadership/country/om' },
  { flag: '🇬🇧', name: 'UK',         to: '/leadership/country/gb' },
  { flag: '🇧🇩', name: 'Bangladesh', to: '/leadership/country/bd' },
  { flag: '🇺🇸', name: 'USA',        to: '/leadership/country/us' },
]

const DEPARTMENTS = [
  { label: 'HR'          },
  { label: 'IT'          },
  { label: 'Operations'  },
  { label: 'Marketing'   },
  { label: 'Legal'       },
  { label: 'Support Team'},
]

function OrgNode({
  label,
  sub,
  to,
  photo,
  delay = 0,
  size = 'md',
}: {
  label: string
  sub?: string
  to: string
  photo?: string
  delay?: number
  size?: 'sm' | 'md' | 'lg'
}) {
  const pill =
    size === 'lg' ? 'px-7 py-3.5 min-w-[230px]' :
    size === 'sm' ? 'px-4 py-2.5 min-w-[130px]'  :
                   'px-5 py-3   min-w-[180px]'
  const nameSize =
    size === 'lg' ? 'text-sm font-bold'       :
    size === 'sm' ? 'text-[11px] font-semibold':
                   'text-[13px] font-semibold'
  const iconSz =
    size === 'lg' ? 'w-11 h-11' :
    size === 'sm' ? 'w-7 h-7'   :
                   'w-9 h-9'
  const icon = size === 'lg' ? 20 : size === 'sm' ? 13 : 16

  return (
    <Reveal delay={delay}>
      <Link
        to={to}
        className={`group flex items-center gap-3 bg-white rounded-full ${pill}
                   shadow-[0_4px_24px_rgba(15,58,35,0.10)] border border-brand-accent/20
                   hover:bg-brand-accent/8 hover:border-brand-accentDark/30
                   hover:shadow-[0_8px_32px_rgba(15,58,35,0.18)]
                   hover:-translate-y-0.5 transition-all duration-300`}
      >
        <span className={`shrink-0 ${iconSz} rounded-full overflow-hidden bg-brand-accent/15
                         flex items-center justify-center
                         group-hover:ring-2 group-hover:ring-brand-accentDark/40
                         transition-all duration-300`}>
          {photo
            ? <img src={photo} alt={label} className="w-full h-full object-cover" />
            : <Users size={icon} strokeWidth={2} className="text-brand-deep" />}
        </span>
        <div>
          <div className={`${nameSize} text-brand-deep whitespace-nowrap leading-tight`}>
            {label}
          </div>
          {sub && (
            <div className="text-[10px] text-brand-deep/50 whitespace-nowrap mt-0.5">{sub}</div>
          )}
        </div>
      </Link>
    </Reveal>
  )
}

function Connector({ className = '' }: { className?: string }) {
  return <div className={`bg-brand-accent/30 ${className}`} />
}

function CountryCard({
  flag,
  name,
  to,
  delay = 0,
}: {
  flag: string
  name: string
  to: string
  delay?: number
}) {
  return (
    <Reveal delay={delay}>
      <Link
        to={to}
        className="group flex flex-col items-center gap-1 bg-white rounded-xl px-3 py-2.5
                   shadow-[0_2px_12px_rgba(15,58,35,0.08)] border border-brand-accent/15
                   hover:bg-brand-accent/8 hover:border-brand-accentDark/25
                   hover:-translate-y-0.5 transition-all duration-300 min-w-[68px]"
      >
        <span className="text-2xl leading-none">{flag}</span>
        <span className="text-[10px] font-semibold text-brand-deep">{name}</span>
      </Link>
    </Reveal>
  )
}

function DeptPill({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        to="/leadership/departments"
        className="px-3 py-1.5 rounded-full bg-white
                   shadow-[0_2px_8px_rgba(15,58,35,0.08)] border border-brand-accent/15
                   text-[10px] font-semibold text-brand-deep whitespace-nowrap
                   hover:bg-brand-accent/10 hover:-translate-y-0.5
                   transition-all duration-300"
      >
        {label}
      </Link>
    </Reveal>
  )
}

export default function LeadershipPyramid() {
  return (
    <Section id="leadership" className="bg-brand-50">
      <div className="container-x pt-4 pb-10 md:pb-14">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-center gap-2 mb-10 md:mb-14 text-center">
            <Eyebrow>Our People</Eyebrow>
            <h2 className="font-serif text-2xl md:text-3xl text-brand-deep leading-snug tracking-tight">
              The People Behind{' '}
              <span className="italic text-brand-accentDark">Yanabiya</span>
            </h2>
          </div>
        </Reveal>

        {/* Org chart */}
        <div className="flex flex-col items-center">

          {/* ── Top chain ── */}
          <OrgNode
            label="Founder, Chairman & CEO"
            sub="S M Shamim Ahmed"
            to="/people/ceo"
            photo={board[0]?.photo}
            delay={100}
            size="lg"
          />
          <Connector className="w-px h-7" />
          <OrgNode
            label="Vice Chairman"
            sub="Mohammad Abu Jaheed"
            to="/leadership/management"
            photo={board[1]?.photo}
            delay={180}
          />
          <Connector className="w-px h-7" />
          <OrgNode
            label="Board of Directors"
            to="/leadership/board"
            photo={BOARD_PHOTO}
            delay={260}
          />

          {/* ── 3-way split connector ── */}
          <div className="relative w-full max-w-3xl h-10">
            <Connector className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-5" />
            <Connector className="absolute top-5 left-[10%] right-[10%] h-px" />
            <Connector className="absolute top-5 left-[10%]           w-px h-5" />
            <Connector className="absolute top-5 left-1/2 -translate-x-1/2 w-px h-5" />
            <Connector className="absolute top-5 right-[10%]          w-px h-5" />
          </div>

          {/* ── 3 columns ── */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">

            {/* Column 1, Group of Companies */}
            <div className="flex flex-col items-center gap-3">
              <OrgNode
                label="Group of Companies"
                to="/about-us"
                photo={GROUP_PHOTO}
                size="sm"
                delay={340}
              />
            </div>

            {/* Column 2, CFO */}
            <div className="flex flex-col items-center">
              <OrgNode
                label="CFO"
                to="/leadership/management"
                photo={CFO_PHOTO}
                size="sm"
                delay={360}
              />
            </div>

            {/* Column 3, Department Heads */}
            <div className="flex flex-col items-center gap-3">
              <OrgNode
                label="Department Heads"
                to="/leadership/departments"
                photo={DEPT_PHOTO}
                size="sm"
                delay={380}
              />
            </div>

          </div>

          {/* ── CTA cards ── */}
          <Reveal delay={720}>
            <div className="mt-14 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">

              {/* Become a Partner */}
              <Link
                to="/contact"
                className="group relative rounded-2xl overflow-hidden bg-brand-deep px-6 py-7
                           hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-md"
              >
                <div aria-hidden className="absolute inset-0 opacity-[0.05]
                  [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.4)_0px,rgba(255,255,255,0.4)_1px,transparent_1px,transparent_50%)]
                  [background-size:18px_18px] pointer-events-none" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/15 grid place-items-center mb-4">
                    <Handshake size={18} className="text-amber-400" />
                  </div>
                  <h4 className="font-serif text-white text-lg leading-snug mb-1">Become a Partner</h4>
                  <p className="text-white/50 text-xs leading-relaxed mb-4">
                    Work with us across trade, technology and community, we're always looking for the right collaborators.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-widest
                                   group-hover:gap-3 transition-all duration-300">
                    Get in Touch <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

              {/* Join Our Team */}
              <Link
                to="/community/careers"
                className="group relative rounded-2xl overflow-hidden bg-brand-accent px-6 py-7
                           hover:-translate-y-1 hover:shadow-xl transition-all duration-300 shadow-md"
              >
                <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center mb-4">
                    <Briefcase size={18} className="text-white" />
                  </div>
                  <h4 className="font-serif text-white text-lg leading-snug mb-1">Join Our Team</h4>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">
                    Offices in Oman, UK, Bangladesh and USA, find a role where your skills make a global impact.
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-widest
                                   group-hover:gap-3 transition-all duration-300">
                    See Open Roles <ArrowRight size={12} />
                  </span>
                </div>
              </Link>

            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}
