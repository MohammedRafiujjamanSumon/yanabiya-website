import { useLayoutEffect, useRef, useState } from 'react'
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
}

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
  },
]

/** Hand image — palm-down hand. Lucide Hand icon is the safe fallback. */
const HAND_IMAGE =
  'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=600&q=80'

type Geometry = {
  width: number
  height: number
  handX: number
  handY: number
  hubX: number
  hubY: number
  ends: { x: number; y: number }[]
}

export default function Community() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const handRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [geo, setGeo] = useState<Geometry | null>(null)

  /* Measure hand-bottom + top-centre of each card relative to the wrap
   * container, then derive a single hub point that sits between the hand
   * and the top row of cards. Recompute on resize so the rope endpoints
   * always land on the actual card edges. */
  useLayoutEffect(() => {
    const compute = () => {
      const wrap = wrapRef.current
      const hand = handRef.current
      if (!wrap || !hand) return
      const wRect = wrap.getBoundingClientRect()
      const hRect = hand.getBoundingClientRect()
      const handX = (hRect.left + hRect.right) / 2 - wRect.left
      const handY = hRect.bottom - wRect.top
      const ends = cardRefs.current.map((el) => {
        if (!el) return { x: 0, y: 0 }
        const r = el.getBoundingClientRect()
        return { x: (r.left + r.right) / 2 - wRect.left, y: r.top - wRect.top }
      })
      // Hub: horizontally centred, vertically halfway between hand bottom
      // and the top of the upper card row.
      const topRowY = Math.min(...ends.slice(0, 2).map((p) => p.y || Infinity))
      const hubX = wRect.width / 2
      const hubY = handY + Math.max(24, (topRowY - handY) * 0.45)
      setGeo({
        width: wRect.width,
        height: wRect.height,
        handX,
        handY,
        hubX,
        hubY,
        ends,
      })
    }
    compute()
    const ro = new ResizeObserver(compute)
    if (wrapRef.current) ro.observe(wrapRef.current)
    cardRefs.current.forEach((el) => el && ro.observe(el))
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [])

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

        {/* CANVAS — hand at top, four ropes drawn from the hand directly
         *  to each card (like /#businesses HQ → service nodes), then the
         *  2×2 card grid. Endpoints are measured at runtime so the lines
         *  always meet the actual card edges. */}
        <div ref={wrapRef} className="relative mx-auto max-w-5xl">

          {/* Hand at the very top, centred */}
          <Reveal>
            <div ref={handRef} className="relative z-20 mx-auto w-32 md:w-40 aspect-square">
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

          {/* Rope SVG — pixel-coord viewBox tied to the actual measured
           *  container size. One curved bezier per card from hand → card. */}
          {geo && (
            <svg
              aria-hidden="true"
              viewBox={`0 0 ${geo.width} ${geo.height}`}
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              className="absolute inset-0 pointer-events-none z-0 overflow-visible"
            >
              {cards.map((c, i) => {
                const end = geo.ends[i]
                if (!end) return null
                const sx = geo.handX
                const sy = geo.handY
                const ex = end.x
                /* End the rope a bit above the card top so the dot floats
                 * clearly between the rope tip and the card edge. */
                const ey = end.y - 14
                const c1x = sx
                const c1y = sy + (ey - sy) * 0.55
                const c2x = ex
                const c2y = ey - Math.min(70, (ey - sy) * 0.45)
                const path = `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`
                return (
                  <g key={c.id}>
                    {/* Under-shadow rope */}
                    <path
                      d={path}
                      fill="none"
                      stroke="rgba(15,58,35,0.28)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Accent flow */}
                    <path
                      d={path}
                      fill="none"
                      stroke={c.accent.rope}
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      className="animate-svg-flow"
                      style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                    />
                    {/* Terminator dot — line stops here */}
                    <circle cx={ex} cy={ey} r="3.5" fill="white" stroke={c.accent.rope} strokeWidth="1.8" />
                  </g>
                )
              })}
            </svg>
          )}

          {/* CARDS — 2×2 grid (compact) */}
          <div className="relative z-10 mt-14 md:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-3xl mx-auto">
            {cards.map((c, i) => {
              const Icon = c.icon
              return (
                <Reveal key={c.id} delay={i * 90}>
                  <Link
                    ref={(el) => { cardRefs.current[i] = el }}
                    to={c.href}
                    className={`group h-full block rounded-xl bg-white/80 backdrop-blur-sm
                                border border-slate-200 p-4
                                shadow-[0_8px_24px_-12px_rgba(15,58,35,0.18)]
                                transition-all duration-500
                                hover:-translate-y-1 ${c.accent.ring} ${c.accent.shadow}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className={`shrink-0 grid place-items-center w-9 h-9 rounded-lg
                                        ${c.accent.iconBg} ${c.accent.iconText}
                                        transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={16} strokeWidth={1.7} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-bold uppercase tracking-[0.26em] text-slate-500 mb-0.5">
                          {c.eyebrow}
                        </div>
                        <h3 className="font-serif text-base md:text-lg text-brand-deep leading-tight">
                          {c.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-[12.5px] text-slate-600 leading-relaxed line-clamp-3">
                      {c.desc}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                                    text-brand-accentDark group-hover:text-brand-deep group-hover:gap-1.5
                                    transition-all duration-300">
                      {c.cta} <ArrowRight size={11} />
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
