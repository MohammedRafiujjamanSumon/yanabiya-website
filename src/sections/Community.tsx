import { Link } from 'react-router-dom'
import {
  ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase, Hand,
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

type Accent = {
  ring: string         // ring color on hover (border)
  iconBg: string       // icon chip background
  iconText: string     // icon chip text
  rope: string         // rope stroke color (rgba)
  shadow: string       // hover shadow color (rgba)
}

type CommunityCard = {
  id: string
  href: string
  eyebrow: string
  title: string
  desc: string
  icon: LucideIcon
  cta: string
  accent: Accent
  /** SVG endpoint of the rope on this card (% of container, 0-100) */
  endX: number
  endY: number
}

/* 2×2 grid card targets — endpoints sit just above the top edge of each
 * card so the rope visually joins the card. */
const cards: CommunityCard[] = [
  {
    id: 'blog',
    href: '/community/blog',
    eyebrow: 'Insights',
    title: 'Blog',
    desc: 'Stories, market views and ideas from across our group and partner network.',
    icon: Newspaper,
    cta: 'Read articles',
    accent: {
      ring: 'hover:border-sky-400/60',
      iconBg: 'bg-sky-100', iconText: 'text-sky-700',
      rope: 'rgba(2,132,199,0.55)',
      shadow: 'hover:shadow-[0_24px_60px_-24px_rgba(2,132,199,0.35)]',
    },
    endX: 28, endY: 60,
  },
  {
    id: 'sustainable-growth',
    href: '/community/sustainable-growth',
    eyebrow: 'Environment',
    title: 'Sustainable Growth',
    desc: 'Greener operations, circular practices and climate commitments shaping how we work.',
    icon: Leaf,
    cta: 'Explore initiatives',
    accent: {
      ring: 'hover:border-emerald-400/60',
      iconBg: 'bg-emerald-100', iconText: 'text-emerald-700',
      rope: 'rgba(5,150,105,0.55)',
      shadow: 'hover:shadow-[0_24px_60px_-24px_rgba(5,150,105,0.35)]',
    },
    endX: 72, endY: 60,
  },
  {
    id: 'community-care',
    href: '/community/community-care',
    eyebrow: 'Welfare',
    title: 'Community Care',
    desc: 'Charitable donations and welfare programmes built on transparency and lasting impact.',
    icon: HeartHandshake,
    cta: 'See programmes',
    accent: {
      ring: 'hover:border-rose-400/60',
      iconBg: 'bg-rose-100', iconText: 'text-rose-700',
      rope: 'rgba(225,29,72,0.55)',
      shadow: 'hover:shadow-[0_24px_60px_-24px_rgba(225,29,72,0.35)]',
    },
    endX: 28, endY: 88,
  },
  {
    id: 'careers',
    href: '/community/careers',
    eyebrow: 'People',
    title: 'Careers',
    desc: 'Join a team that values craft, integrity and growth across the Gulf and beyond.',
    icon: Briefcase,
    cta: 'View openings',
    accent: {
      ring: 'hover:border-amber-400/60',
      iconBg: 'bg-amber-100', iconText: 'text-amber-700',
      rope: 'rgba(217,119,6,0.55)',
      shadow: 'hover:shadow-[0_24px_60px_-24px_rgba(217,119,6,0.35)]',
    },
    endX: 72, endY: 88,
  },
]

/** Hand image — palm-down hand. Lucide Hand icon is the safe fallback. */
const HAND_IMAGE =
  'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=600&q=80'

/* Junction point where the central trunk splits into 4 branches.
 * Sits below the hand and above the top row of cards. */
const HUB_X = 50
const HUB_Y = 32

export default function Community() {
  return (
    <Section
      id="community"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfaf6] via-[#fbfdfb] to-[#f6f8f3]"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-brand-accent/10 blur-[160px]" />
        <div className="absolute bottom-0 right-1/4 w-[480px] h-[480px] rounded-full bg-amber-200/20 blur-[140px]" />
      </div>

      <div className="container-x relative">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <Reveal>
            <Eyebrow>Community</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight text-brand-deep">
              Built around <span className="italic text-brand-accentDark">people</span>,
              <span className="block">driven by <span className="italic text-brand-accentDark">purpose</span>.</span>
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
              From insights and sustainability to welfare and careers — explore the ways
              Yanabiya Group invests in the communities and teams that grow with us.
            </p>
          </Reveal>
        </div>

        {/* ROPE NETWORK + CARDS — single positioned canvas so the SVG
         *  ropes can route from the hand at the top center down to each
         *  card's endpoint in the 2×2 grid below. */}
        <div className="relative mx-auto max-w-5xl">

          {/* Hand at the very top, centered */}
          <Reveal>
            <div className="relative z-20 mx-auto w-32 md:w-40 aspect-square">
              {/* Soft halo */}
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-brand-accent/25 blur-2xl animate-pulse"
              />
              <div className="relative w-full h-full rounded-full overflow-hidden
                              ring-2 ring-brand-accent/40 shadow-[0_18px_40px_-12px_rgba(15,58,35,0.35)]
                              bg-white grid place-items-center">
                <img
                  src={HAND_IMAGE}
                  alt="A guiding hand"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
                {/* Lucide Hand fallback (always rendered behind, only visible
                 *  when the photo fails). */}
                <Hand size={56} strokeWidth={1.4} className="text-brand-deep relative" />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-6
                              inline-flex items-center gap-1.5 rounded-full
                              bg-brand-deep text-brand-accent px-3 py-1
                              text-[9px] font-bold tracking-[0.32em] uppercase shadow-md">
                <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
                Yanabiya Group
              </div>
            </div>
          </Reveal>

          {/* Rope network — single SVG covering the area between the hand
           *  and the cards. Trunk descends from (50, 0) to the hub, then 4
           *  branches curve out to each card endpoint. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
            style={{ animation: 'haloPulse 6s ease-in-out infinite' }}
          >
            {/* Trunk: hand → hub */}
            <path
              d={`M 50 6 Q 50 ${HUB_Y * 0.55}, ${HUB_X} ${HUB_Y}`}
              fill="none"
              stroke="rgba(120,113,108,0.55)"
              strokeWidth="0.55"
              strokeLinecap="round"
            />
            <path
              d={`M 50 6 Q 50 ${HUB_Y * 0.55}, ${HUB_X} ${HUB_Y}`}
              fill="none"
              stroke="rgba(168,162,158,0.5)"
              strokeWidth="0.18"
              strokeDasharray="0.7 0.7"
              strokeLinecap="round"
            />

            {/* Branches: hub → each card endpoint */}
            {cards.map((c, i) => {
              const cx1 = HUB_X
              const cy1 = HUB_Y + (c.endY - HUB_Y) * 0.5
              const cx2 = c.endX + (HUB_X - c.endX) * 0.2
              const cy2 = c.endY - 6
              const path = `M ${HUB_X} ${HUB_Y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${c.endX} ${c.endY}`
              return (
                <g key={c.id}>
                  {/* Rope under-shadow */}
                  <path d={path} fill="none" stroke="rgba(120,113,108,0.45)" strokeWidth="0.55" strokeLinecap="round" />
                  {/* Rope highlight */}
                  <path d={path} fill="none" stroke="rgba(245,240,232,0.6)" strokeWidth="0.18" strokeLinecap="round" />
                  {/* Accent flow (subtle colored pulse along the rope) */}
                  <path
                    d={path}
                    fill="none"
                    stroke={c.accent.rope}
                    strokeWidth="0.22"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.6}s`, animationDuration: '6s' }}
                  />
                  {/* Endpoint dot */}
                  <circle cx={c.endX} cy={c.endY} r="0.7" fill="rgba(120,113,108,0.7)" />
                </g>
              )
            })}

            {/* Hub dot */}
            <circle cx={HUB_X} cy={HUB_Y} r="0.9" fill="rgba(120,113,108,0.85)" />
            <circle cx={HUB_X} cy={HUB_Y} r="1.6" fill="none" stroke="rgba(120,113,108,0.35)" strokeWidth="0.18" />
          </svg>

          {/* CARDS — 2×2 grid with extra top-padding so the rope endpoints
           *  visibly attach to each card. */}
          <div className="relative z-10 mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {cards.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.id} delay={i * 90}>
                  <Link
                    to={c.href}
                    className={`group h-full block rounded-2xl bg-white/80 backdrop-blur-sm
                                border border-slate-200 p-6
                                shadow-[0_10px_30px_-12px_rgba(15,58,35,0.18)]
                                transition-all duration-500
                                hover:-translate-y-1.5 ${c.accent.ring} ${c.accent.shadow}`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`shrink-0 grid place-items-center w-12 h-12 rounded-xl
                                        ${c.accent.iconBg} ${c.accent.iconText}
                                        transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={22} strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500 mb-1">
                          {c.eyebrow}
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                          {c.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-4 text-sm md:text-[15px] text-slate-600 leading-relaxed">
                      {c.desc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em]
                                    text-brand-accentDark group-hover:text-brand-deep group-hover:gap-2
                                    transition-all duration-300">
                      {c.cta} <ArrowRight size={12} />
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
