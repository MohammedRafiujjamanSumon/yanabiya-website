import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { DISTRIBUTIONS } from '../data/distribution'

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

/**
 * Five-tier Leadership Pyramid — visual layout inspired by the
 * competency-pyramid reference. Each tier is a horizontal band that
 * narrows toward the apex; clicking any cell opens its detail page.
 *
 * APEX  ─ Board & Advisory  |  CEO + Vice Chairman      (deep navy)
 * Tier 4 ─ Country-Based Management (4 country tiles)    (amber)
 * Tier 3 ─ Global Executive Management (6 C-suite tiles) (amber)
 * Tier 2 ─ Distributed Leadership (6 distribution types) (red-rose)
 * Tier 1 ─ Personal Effectiveness Foundations (7 values) (slate)
 */

type Cell = { label: string; href?: string; sub?: string }

const COUNTRIES: Cell[] = [
  { label: 'Oman',       sub: '🇴🇲',  href: '/leadership/country/om' },
  { label: 'UK',         sub: '🇬🇧',  href: '/leadership/country/gb' },
  { label: 'Bangladesh', sub: '🇧🇩',  href: '/leadership/country/bd' },
  { label: 'USA',        sub: '🇺🇸',  href: '/leadership/country/us' },
]

const EXECS: Cell[] = [
  { label: 'COO',  sub: 'Operations',  href: '/leadership/executive' },
  { label: 'CFO',  sub: 'Finance',     href: '/leadership/executive' },
  { label: 'CTO',  sub: 'Technology',  href: '/leadership/executive' },
  { label: 'CMO',  sub: 'Marketing',   href: '/leadership/executive' },
  { label: 'CPO',  sub: 'People',      href: '/leadership/executive' },
  { label: 'CSO',  sub: 'Strategy',    href: '/leadership/executive' },
]

const DIST: Cell[] = DISTRIBUTIONS.map((d) => ({
  label: d.label.replace('Distribution ', ''),
  href: `/leadership/distributed/${d.slug}`,
}))

const FOUNDATIONS: Cell[] = [
  { label: 'Integrity' },
  { label: 'Professionalism' },
  { label: 'Initiative' },
  { label: 'Adaptability' },
  { label: 'Reliability' },
  { label: 'Customer Focus' },
  { label: 'Lifelong Learning' },
]

/* Each tier band — width % shrinks toward the top to draw the pyramid shape. */
function TierBand({
  width,
  color,
  textColor = 'text-white',
  children,
  delay = 0,
}: {
  width: string
  color: string
  textColor?: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="w-full flex justify-center">
      <div
        className={`${color} ${textColor} rounded-lg
                    shadow-[0_8px_22px_-12px_rgba(15,23,42,0.35)]
                    ring-1 ring-white/15
                    transition-all duration-500 hover:-translate-y-0.5`}
        style={{ width }}
      >
        {children}
      </div>
    </Reveal>
  )
}

function TierTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="px-4 py-2 text-center">
      <div className="font-bold text-[11px] md:text-[12px] uppercase tracking-[0.18em] leading-tight">
        <span className="opacity-90">{kicker} ·</span> {title}
      </div>
    </div>
  )
}

function CellRow({ cells, accent = 'bg-white/15' }: { cells: Cell[]; accent?: string }) {
  return (
    <div className="grid gap-1.5 px-2 pb-2"
         style={{ gridTemplateColumns: `repeat(${cells.length}, minmax(0, 1fr))` }}>
      {cells.map((c) => {
        const inner = (
          <div className={`${accent} rounded px-1.5 py-1.5 text-center
                           transition-all duration-300
                           hover:brightness-110`}>
            {c.sub && <div className="text-[14px] leading-none mb-0.5">{c.sub}</div>}
            <div className="text-[9px] md:text-[10px] font-semibold leading-tight tracking-tight">
              {c.label}
            </div>
          </div>
        )
        return c.href ? (
          <Link key={c.label} to={c.href} aria-label={c.label}>
            {inner}
          </Link>
        ) : (
          <div key={c.label}>{inner}</div>
        )
      })}
    </div>
  )
}

export default function LeadershipPyramid() {
  return (
    <Section id="leadership" className="relative overflow-hidden bg-brand-50">
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-8 md:pb-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-6 md:mb-8">
          <Reveal>
            <Eyebrow>Global Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px] leading-snug tracking-tight text-brand-deep mt-1">
              Five tiers of leadership across the group —{' '}
              <span className="italic text-brand-accentDark">from foundations to the apex.</span>
            </h2>
          </Reveal>
        </div>

        {/* PYRAMID */}
        <div className="max-w-5xl mx-auto flex flex-col gap-1.5 md:gap-2 items-center">

          {/* APEX — two-cell trapezoid (Board | CEO + VC) */}
          <TierBand
            width="100%"
            color="bg-gradient-to-br from-slate-700 to-slate-900"
            delay={0}
          >
            <div className="grid grid-cols-2 divide-x divide-white/15">
              <Link
                to="/leadership/board"
                className="px-4 py-3 md:py-4 text-center transition-colors duration-300 hover:bg-white/5"
              >
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 mb-1">
                  Apex
                </div>
                <div className="font-serif text-[14px] md:text-base text-white leading-tight">
                  Global Board &amp; Advisory
                </div>
              </Link>
              <Link
                to="/leadership/management"
                className="px-4 py-3 md:py-4 text-center transition-colors duration-300 hover:bg-white/5"
              >
                <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.22em] text-white/70 mb-1">
                  Apex
                </div>
                <div className="font-serif text-[14px] md:text-base text-white leading-tight">
                  Global CEO &amp; Vice Chairman
                </div>
              </Link>
            </div>
          </TierBand>

          {/* TIER 4 — Country-Based Management */}
          <TierBand
            width="75%"
            color="bg-gradient-to-br from-amber-400 to-amber-500"
            textColor="text-amber-950"
            delay={120}
          >
            <TierTitle kicker="Tier 04" title="Country-Based Management" />
            <CellRow cells={COUNTRIES} accent="bg-white/40" />
          </TierBand>

          {/* TIER 3 — Global Executive Management */}
          <TierBand
            width="82%"
            color="bg-gradient-to-br from-amber-500 to-orange-500"
            textColor="text-amber-950"
            delay={200}
          >
            <TierTitle kicker="Tier 03" title="Global Executive Management" />
            <CellRow cells={EXECS} accent="bg-white/40" />
          </TierBand>

          {/* TIER 2 — Distributed Leadership */}
          <TierBand
            width="90%"
            color="bg-gradient-to-br from-rose-500 to-red-600"
            delay={280}
          >
            <TierTitle kicker="Tier 02" title="Distributed Leadership" />
            <CellRow cells={DIST} accent="bg-white/20" />
          </TierBand>

          {/* TIER 1 — Personal Effectiveness Foundations */}
          <TierBand
            width="100%"
            color="bg-gradient-to-br from-slate-400 to-slate-600"
            delay={360}
          >
            <TierTitle kicker="Tier 01" title="Personal Effectiveness Foundations" />
            <CellRow cells={FOUNDATIONS} accent="bg-white/25" />
          </TierBand>

        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-10">
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
