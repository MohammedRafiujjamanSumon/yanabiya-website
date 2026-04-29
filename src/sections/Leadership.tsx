import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ShieldCheck, Crown, Briefcase, Globe2, Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
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

/* ───────── Five leadership pillars (zigzag layout) ─────────
 *
 *   01 Strategic Board & Advisory   — Board of Directors + Advisory Board
 *   02 Global CEO & Co-Founders     — Vision + Engineering + Revenue + Ops
 *   03 Executive Management         — COO / CFO / CTO / CMO / CHRO
 *   04 Country Partners & Heads     — 4 regional founders + local management
 *   05 High-Skill Execution Engine  — AI · Software · Strategy · Design · Delivery
 *
 * Each pillar links to its dedicated page (some already exist —
 * /leadership/management, /leadership/professionals — others are
 * scaffolded so the wiring works end-to-end). */

type Pillar = {
  num: string
  title: string
  body: string
  icon: LucideIcon
  href: string
  /** Card gradient + accent colour (uses Tailwind arbitrary values
   *  so each card carries its own palette without hard-wiring brand
   *  tokens). */
  from: string
  to: string
  glow: string
  chip: string  // number-chip background (matches accent)
}

const PILLARS: Pillar[] = [
  {
    num: '01',
    title: 'Strategic Board & Advisory',
    body: 'Board of Directors + Advisory Board — strategic control, investment approval, risk governance and industry guidance.',
    icon: ShieldCheck,
    href: '/leadership/management',
    from: '#a7f3d0', to: '#059669',
    glow: 'rgba(5,150,105,0.35)',
    chip: 'bg-emerald-600',
  },
  {
    num: '02',
    title: 'Global CEO & Co-Founders',
    body: 'Global CEO and four founding partners — Product, Tech, Business and Operations — driving long-term strategy.',
    icon: Crown,
    href: '/leadership/management',
    from: '#bae6fd', to: '#0284c7',
    glow: 'rgba(2,132,199,0.35)',
    chip: 'bg-sky-600',
  },
  {
    num: '03',
    title: 'Executive Management',
    body: 'COO · CFO · CTO · CMO · CHRO — the C-suite running operations, finance, technology, marketing and people.',
    icon: Briefcase,
    href: '/leadership/professionals',
    from: '#e9d5ff', to: '#7e22ce',
    glow: 'rgba(126,34,206,0.35)',
    chip: 'bg-purple-600',
  },
  {
    num: '04',
    title: 'Country Partners & Heads',
    body: 'Regional founders and country management heads in Oman, the UK, Bangladesh and the USA — local execution + compliance.',
    icon: Globe2,
    href: '/leadership/professionals',
    from: '#fde68a', to: '#d97706',
    glow: 'rgba(217,119,6,0.35)',
    chip: 'bg-amber-600',
  },
  {
    num: '05',
    title: 'High-Skill Execution Engine',
    body: 'AI & software engineering, growth & research, design & product, and global project squads — the global talent engine.',
    icon: Sparkles,
    href: '/leadership/professionals',
    from: '#fecdd3', to: '#e11d48',
    glow: 'rgba(225,29,72,0.35)',
    chip: 'bg-rose-600',
  },
]

export default function Leadership() {
  const { t } = useTranslation()

  return (
    <Section id="leadership" className="relative overflow-hidden bg-[#fbfdfb]">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal>
            <Eyebrow>{t('leadership.eyebrow', 'Leadership')}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-brand-deep lg:whitespace-nowrap">
              Distributed leadership across <span className="italic text-brand-accentDark">five pillars</span>.
            </h2>
          </Reveal>
        </div>

        {/* ZIGZAG CARDS — each pillar alternates left / right with a curvy
         *  SVG line zig-zagging between them in the background. */}
        <div className="relative max-w-4xl mx-auto">

          {/* Background zigzag connector — drawn behind the cards */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none"
          >
            {PILLARS.slice(0, -1).map((_, i) => {
              // Each card occupies 1/5 of the vertical space.
              const yA = (i + 0.5) / PILLARS.length * 100      // current card centre
              const yB = (i + 1.5) / PILLARS.length * 100      // next card centre
              const xA = i % 2 === 0 ? 32 : 68                 // current card right/left edge
              const xB = (i + 1) % 2 === 0 ? 32 : 68           // next card right/left edge
              const mx = (xA + xB) / 2
              const path = `M ${xA} ${yA} C ${xA} ${(yA + yB) / 2}, ${xB} ${(yA + yB) / 2}, ${xB} ${yB}`
              return (
                <g key={i}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(15,58,35,0.20)"
                    strokeWidth="0.4"
                    strokeDasharray="0.8 0.8"
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(158,199,58,0.85)"
                    strokeWidth="0.45"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.4}s`, animationDuration: '5s' }}
                  />
                  <circle cx={mx} cy={(yA + yB) / 2} r="0.6" fill="rgba(158,199,58,0.95)" />
                </g>
              )
            })}
          </svg>

          {/* Cards */}
          <div className="relative flex flex-col gap-5 md:gap-6">
            {PILLARS.map((p, i) => {
              const right = i % 2 === 1
              const Icon = p.icon
              return (
                <Reveal key={p.num} delay={i * 110} className={`w-full md:w-[60%] ${right ? 'md:self-end' : 'md:self-start'}`}>
                  <Link
                    to={p.href}
                    className="group relative block rounded-2xl
                               border border-white/40
                               shadow-[0_14px_36px_-16px_var(--tw-shadow-color)]
                               transition-all duration-500
                               hover:-translate-y-1
                               hover:shadow-[0_20px_46px_-14px_var(--tw-shadow-color)]"
                    style={{
                      backgroundImage: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
                      ['--tw-shadow-color' as never]: p.glow,
                    }}
                  >
                    <div className="relative flex items-center gap-4 p-5 md:p-6 pr-16 md:pr-20">
                      {/* Icon chip */}
                      <span className="shrink-0 grid place-items-center w-12 h-12 md:w-14 md:h-14 rounded-xl
                                       bg-white/85 backdrop-blur-sm shadow-md">
                        <Icon size={22} strokeWidth={1.8} className="text-brand-deep" />
                      </span>

                      {/* Title + body */}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-lg md:text-xl text-white leading-tight
                                       drop-shadow-[0_1px_4px_rgba(15,58,35,0.45)]">
                          {p.title}
                        </h3>
                        <p className="mt-1.5 text-[12px] md:text-[13px] text-white/95 leading-snug
                                      drop-shadow-[0_1px_3px_rgba(15,58,35,0.35)]">
                          {p.body}
                        </p>
                        <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                                        text-white/95 group-hover:gap-2 transition-all">
                          Open page <ArrowRight size={11} />
                        </div>
                      </div>

                      {/* Number chip — top-right corner */}
                      <span
                        className={`absolute top-4 right-4 inline-flex items-center justify-center
                                    w-12 h-12 rounded-full ${p.chip} text-white
                                    font-serif text-lg ring-4 ring-white/40
                                    shadow-[0_4px_14px_rgba(0,0,0,0.20)]`}
                      >
                        {p.num}
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* CTA — opens the full leadership overview */}
        <div className="text-center mt-12 md:mt-16">
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
