import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sparkles, X as CloseIcon, ExternalLink, ArrowRight,
  Cpu, Globe2, Shirt, Handshake, Building2, Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section from '../components/Section'
import { businesses } from '../data/businesses'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'

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

/* Short, plain-English overrides + 3 sub-service teasers per division.
 * Verbose names kept in /data/businesses.ts for the /business/<slug> pages. */
const BUSINESS_DISPLAY: Record<
  string,
  { title: string; tag: string; sample: string[] }
> = {
  'it-software':       { title: 'IT Software & Web Development',  tag: 'Custom software, cloud, AI.',         sample: ['Software', 'Cloud', 'Cyber Security'] },
  'export-import':     { title: 'Export & Import Business',       tag: 'Sourcing, freight, fulfilment.',      sample: ['Freight', 'Customs', 'Warehousing'] },
  'clothing':          { title: 'Clothing & Accessories',         tag: 'Private label, sourcing, retail.',    sample: ['Private Label', 'Sourcing', 'QA'] },
  'agents-brokerage':  { title: 'Agents & Brokerage Business',    tag: 'Cross-border deals & partnerships.',  sample: ['Deals', 'Market Entry', 'Tenders'] },
  'office-management': { title: 'Office Management Services',     tag: 'Serviced offices, PRO, admin.',       sample: ['Workspace', 'Accounting', 'PRO'] },
  'manpower':          { title: 'Manpower Supply Services',       tag: 'Workforce, students, aviation.',      sample: ['Recruitment', 'Student Visa', 'Aviation'] },
}

/* Bottom-up gradient palette per pyramid layer. Bottom is the broad
 * "foundation" layer; top is the strategic apex. Order matches the
 * order each layer is rendered (top of array → bottom of pyramid
 * via reverse positioning). */
type PyramidLayer = {
  slug: string
  label: string
  icon: LucideIcon
  from: string  // gradient TOP (lighter)
  to: string    // gradient BOTTOM (darker)
  glow: string  // outer shadow rgba when active
}

const PYRAMID_LAYERS: PyramidLayer[] = [
  { slug: 'it-software',       label: 'IT Software & Web Development', icon: Cpu,       from: '#7dd3fc', to: '#0369a1', glow: 'rgba(56,189,248,0.55)' },
  { slug: 'export-import',     label: 'Export & Import Business',      icon: Globe2,    from: '#6ee7b7', to: '#047857', glow: 'rgba(52,211,153,0.55)' },
  { slug: 'clothing',          label: 'Clothing & Accessories',        icon: Shirt,     from: '#fcd34d', to: '#b45309', glow: 'rgba(251,191,36,0.55)' },
  { slug: 'agents-brokerage',  label: 'Agents & Brokerage Business',   icon: Handshake, from: '#d8b4fe', to: '#7e22ce', glow: 'rgba(192,132,252,0.55)' },
  { slug: 'office-management', label: 'Office Management Services',    icon: Building2, from: '#fda4af', to: '#be123c', glow: 'rgba(251,113,133,0.55)' },
  { slug: 'manpower',          label: 'Manpower Supply Services',      icon: Users,     from: '#67e8f9', to: '#0e7490', glow: 'rgba(34,211,238,0.55)' },
]

/* ServicesFlowchart — six division cards in a distributed-leadership
 * style flowchart layout: 3 cards on top, central "Our Services" pill,
 * 3 cards on the bottom, with subtle SVG arrow connectors. Each card
 * navigates to /business/<slug>. Inspired by the user-provided
 * "Distributed Leadership" infographic. */
type FlowCard = {
  slug: string
  title: string
  body: string
  /** Tailwind background colour for the card itself. */
  bg: string
  /** SVG hex for the matching connector arrow. */
  stroke: string
}

const FLOW_CARDS: FlowCard[] = [
  { slug: 'it-software',       title: 'IT Software & Web Development', body: 'Custom software, web platforms, ERP, and AI solutions.', bg: 'bg-emerald-500',  stroke: '#10b981' },
  { slug: 'export-import',     title: 'Export & Import Business',      body: 'Sourcing, freight, customs, and end-to-end fulfilment.', bg: 'bg-teal-500',     stroke: '#14b8a6' },
  { slug: 'clothing',          title: 'Clothing & Accessories',        body: 'Private label, garment sourcing, QA, and retail supply.', bg: 'bg-sky-500',       stroke: '#0ea5e9' },
  { slug: 'agents-brokerage',  title: 'Agents & Brokerage Business',   body: 'Cross-border deals, partnerships, and tender support.',   bg: 'bg-slate-500',     stroke: '#64748b' },
  { slug: 'office-management', title: 'Office Management Services',    body: 'Serviced offices, PRO services, accounting, and admin.',  bg: 'bg-violet-500',    stroke: '#8b5cf6' },
  { slug: 'manpower',          title: 'Manpower Supply Services',      body: 'Workforce, student placement, visa, and aviation.',       bg: 'bg-indigo-700',    stroke: '#4338ca' },
]

function ServicesFlowchart({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Top row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {FLOW_CARDS.slice(0, 3).map((card) => (
          <FlowCardTile key={card.slug} card={card} onSelect={onSelect} />
        ))}
      </div>

      {/* Centre divider — "Our Services" pill on a subtle bar */}
      <div className="relative my-8 md:my-10">
        <div aria-hidden="true" className="absolute inset-x-6 top-1/2 -translate-y-1/2 h-px bg-slate-200" />
        <div className="relative mx-auto max-w-md">
          <div className="rounded-xl bg-gradient-to-r from-slate-700 via-slate-800 to-slate-700
                          text-white text-center py-3 px-6 shadow-md
                          ring-1 ring-slate-700/30">
            <div className="text-[10px] font-bold tracking-[0.32em] uppercase text-brand-accent mb-0.5">
              Yanabiya Group
            </div>
            <div className="font-serif text-xl tracking-tight">Our Services</div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {FLOW_CARDS.slice(3, 6).map((card) => (
          <FlowCardTile key={card.slug} card={card} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

/* ServicesGBSModel — eight-circle "Global Business Services" style layout
 * (six in our case, one per division) on a dark navy panel. Each circle is
 * numbered, solid-coloured, and surrounded by an overlapping outline ring
 * that links it to its neighbour — producing the chain look from the
 * reference infographic. Circles alternate up/down to create the
 * characteristic zig-zag rhythm. */
type GbsItem = {
  slug: string
  title: string
  /** Real photo shown as the circle background. Pulled from `data/businesses.ts`
   *  so the imagery stays in sync with the detail pages. The decorative HQ
   *  centrepiece uses the company logo on a white background instead. */
  image: string
  /** Renders an image as the centre badge (used for the decorative logo tile). */
  logoUrl?: string
  /** Optional override route for clicks. Defaults to `/business/<slug>`. */
  href?: string
  /** Outline ring colour for the chain look. */
  ring: string
  /** Decorative tile — hides the number and title; shows only the logo. */
  decorative?: boolean
}

const businessBySlug = Object.fromEntries(businesses.map((b) => [b.slug, b]))

const GBS_ITEMS: GbsItem[] = [
  { slug: 'it-software',       title: 'IT Software & Web Development', image: businessBySlug['it-software'].image,       ring: '#9a3412' },
  { slug: 'export-import',     title: 'Export & Import Business',      image: businessBySlug['export-import'].image,     ring: '#7c2d12' },
  { slug: 'clothing',          title: 'Clothing & Accessories',        image: businessBySlug['clothing'].image,          ring: '#831843' },
  { slug: 'yanabiya-group',    title: 'Yanabiya Group HQ',             image: assets.logo, logoUrl: assets.logo, href: '/about-us', ring: '#9a3412', decorative: true },
  { slug: 'office-management', title: 'Office Management Services',    image: businessBySlug['office-management'].image, ring: '#9f1239' },
  { slug: 'manpower',          title: 'Manpower Supply Services',      image: businessBySlug['manpower'].image,          ring: '#500724' },
  { slug: 'agents-brokerage',  title: 'Agents & Brokerage Business',   image: businessBySlug['agents-brokerage'].image,  ring: '#14532d' },
]

function ServicesGBSModel({ onSelect }: { onSelect: (target: string) => void }) {
  // Resolve each item to its navigation target up-front.
  const resolve = (item: GbsItem) => item.href ?? `/business/${item.slug}`

  return (
    <div className="relative">
      {/* Mobile: 2-column grid. Desktop: zig-zag row, modest spacing. */}
      <div className="relative grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:hidden">
        {GBS_ITEMS.map((item, i) => (
          <GbsCircle
            key={item.slug}
            item={item}
            index={i}
            variant={i % 2 === 0 ? 'tall' : 'short'}
            onSelect={() => onSelect(resolve(item))}
          />
        ))}
      </div>

      <div className="relative hidden md:flex md:items-center md:justify-center">
        {GBS_ITEMS.map((item, i) => {
          const isUp = i % 2 === 0
          return (
            <div
              key={item.slug}
              className={`relative ${isUp ? 'mb-10 lg:mb-12' : 'mt-10 lg:mt-12'} ${i > 0 ? '-ml-4 lg:-ml-5' : ''}`}
              style={{ zIndex: GBS_ITEMS.length - i }}
            >
              <GbsCircle item={item} index={i} variant={isUp ? 'tall' : 'short'} onSelect={() => onSelect(resolve(item))} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GbsCircle({
  item,
  variant = 'tall',
  onSelect,
}: {
  item: GbsItem
  index: number
  variant?: 'tall' | 'short'
  onSelect: () => void
}) {
  const isLogoTile = !!item.logoUrl
  // All tiles share the same compact size — the rhythm comes from zig-zag
  // vertical offset, not from size variation. `variant` is kept on the type
  // for future flexibility but no longer affects sizing.
  void variant
  const sizeCls = 'w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40'

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Open ${item.title}`}
      className={`group relative ${sizeCls} mx-auto rounded-full
                  transition-transform duration-300 hover:scale-[1.04]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500`}
      style={{
        filter:
          'drop-shadow(0 14px 22px rgba(15,23,42,0.25)) drop-shadow(0 4px 6px rgba(15,23,42,0.18))',
      }}
    >
      {/* Outer coloured ring — chain look */}
      <span
        aria-hidden
        className="absolute -inset-[6px] rounded-full"
        style={{
          background: `linear-gradient(145deg, ${item.ring} 0%, ${item.ring}cc 60%, ${item.ring}66 100%)`,
          boxShadow: `inset 0 2px 0 rgba(255,255,255,0.45), inset 0 -4px 8px rgba(0,0,0,0.28)`,
        }}
      />

      {/* Inner sphere — 3D-shaded image */}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full overflow-hidden ring-[3px] ring-white
                    ${isLogoTile ? 'bg-white' : 'bg-slate-100'}`}
        style={{
          boxShadow: [
            'inset 0 6px 12px rgba(255,255,255,0.45)',
            'inset 0 -10px 20px rgba(0,0,0,0.35)',
            'inset 0 0 0 1px rgba(255,255,255,0.18)',
          ].join(', '),
        }}
      >
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className={`absolute inset-0 w-full h-full ${isLogoTile ? 'object-contain p-4' : 'object-cover'}
                      transition-transform duration-500 group-hover:scale-105`}
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />

        {/* Top glossy reflection */}
        <span
          aria-hidden
          className="absolute inset-x-3 top-2 h-1/3 rounded-full
                     bg-gradient-to-b from-white/40 via-white/10 to-transparent
                     pointer-events-none blur-[1px]"
        />

        {/* Stronger lower-half emerald gradient — anchors the title */}
        {!item.decorative && (
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-1/2
                       bg-gradient-to-t from-emerald-950/95 via-emerald-900/70 to-transparent
                       pointer-events-none"
          />
        )}
      </span>

      {/* Title plate — sits well inside the round, centred horizontally,
       *  vertically pinned to ~60% from top so it never clips the rim. */}
      {!item.decorative && (
        <span className="absolute left-1/2 top-[62%] -translate-x-1/2 z-10
                         w-[78%] text-center text-white
                         font-semibold leading-snug
                         text-[11px] md:text-[12px] lg:text-[13px]
                         tracking-tight
                         drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
          {item.title}
        </span>
      )}

      {/* "Learn more" pill — slides up from the bottom on hover so the
       *  click affordance is unmistakable while keeping idle state clean. */}
      {!item.decorative && (
        <span
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-2 z-20
                     inline-flex items-center gap-1
                     px-2.5 py-0.5 rounded-full
                     bg-white/95 text-emerald-700
                     text-[9px] font-bold uppercase tracking-[0.18em] shadow
                     opacity-0 translate-y-1
                     transition-all duration-300 ease-out
                     group-hover:opacity-100 group-hover:translate-y-0
                     group-focus-visible:opacity-100 group-focus-visible:translate-y-0"
        >
          Learn <ArrowRight size={9} />
        </span>
      )}
    </button>
  )
}

function FlowCardTile({ card, onSelect }: { card: FlowCard; onSelect: (slug: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(card.slug)}
      aria-label={`Open ${card.title}`}
      className={`group relative text-left rounded-2xl ${card.bg}
                  text-white p-5 md:p-6
                  shadow-[0_10px_24px_-8px_rgba(15,23,42,0.45)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-[0_18px_36px_-10px_rgba(15,23,42,0.55)]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60`}
    >
      <div className="font-bold text-sm md:text-base leading-tight mb-2">
        {card.title}
      </div>
      <div className="text-[11px] md:text-xs opacity-90 leading-snug">
        {card.body}
      </div>
      <div className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                      opacity-90 group-hover:gap-1.5 transition-all">
        Read More <ArrowRight size={11} />
      </div>
    </button>
  )
}

/* ServicesPyramid — six-layer 3D rotating "turntable" pyramid.
 *
 * Each layer is an elliptical disc of decreasing width going up. The
 * whole stack lives inside a `transform-style: preserve-3d` wrapper
 * that rotates around its central Y axis on a 12s loop. Each disc is
 * pre-tilted with rotateX(72deg) so that, viewed from the front with
 * a slight perspective, it looks like a flat horizontal layer. As the
 * wrapper spins, every disc spins around the central axis together.
 *
 * Active layer (auto-cycled every ~2.4s, paused on hover) lifts up
 * 5px, scales 1.05, and gains a coloured glow. Hovering pauses the
 * rotation and sets the hovered layer as active. Clicking opens the
 * NodeDetailPanel for that service. */
function ServicesPyramid({
  active,
  setActive,
  paused,
  setPaused,
  onSelect,
  onSelectHub,
}: {
  active: number
  setActive: (i: number) => void
  paused: boolean
  setPaused: (p: boolean) => void
  onSelect: (slug: string) => void
  onSelectHub: () => void
}) {
  const total = PYRAMID_LAYERS.length
  // Pipe-ring dimensions — tighter stack, fatter rings.
  const baseWidth = 440   // bottom ring width (px)
  const stepWidth = 48    // shrink per step going up
  const layerH = 88       // ring thickness (px)
  const stepY = 74        // vertical step — rings overlap slightly for stacked feel
  const tiltX = 58        // less aggressive tilt so the ring's rim is visible

  return (
    <div
      className="relative mx-auto w-full max-w-[600px] aspect-[5/5] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ perspective: '1200px' }}
    >
      {/* Faint orbit ring around the base */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[78%] -translate-x-1/2 -translate-y-1/2
                   w-[88%] aspect-[4/1] rounded-full
                   border border-brand-accent/25
                   bg-gradient-to-b from-brand-accent/0 via-brand-accent/10 to-brand-accent/0
                   pointer-events-none"
      />
      {/* Two orbit indicator dots travelling along the ring */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[78%] -translate-x-1/2 -translate-y-1/2
                   w-[88%] aspect-[4/1] pointer-events-none"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {[0, 0.5].map((delay, i) => (
          <span
            key={i}
            className="absolute top-1/2 left-1/2 -ml-1 -mt-1 w-2 h-2 rounded-full bg-brand-accent
                       shadow-[0_0_8px_rgba(158,199,58,0.7)]"
            style={{
              ['--orbit-r' as never]: '180px',
              animation: `orbitDot 8s linear ${delay * 8}s infinite`,
              transform: `rotate(0deg) translateX(180px)`,
            }}
          />
        ))}
      </div>

      {/* Pyramid stack */}
      <div
        className="absolute inset-0 grid place-items-center"
        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(8deg)' }}
      >
        <div
          className="animate-pyramid-spin"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            position: 'relative',
            width: '460px',
            height: '540px',
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {PYRAMID_LAYERS.map((layer, i) => {
            // i=0 top → smallest. Reverse for visual: bottom layer is widest.
            const fromBottom = total - 1 - i  // 5,4,3,2,1,0 → bottom row first
            const width = baseWidth - fromBottom * stepWidth
            // yOffset: top layer (i=0) goes highest (negative), bottom layer (i=total-1) lowest.
            const yOffset = (i - (total - 1) / 2) * stepY
            const isActive = active === i

            const Icon = layer.icon
            const fontPx = Math.max(11, Math.min(14, width / 28))

            // Multi-stop gradient with a top highlight band → suggests
            // a glossy curved pipe surface.
            const ringBg =
              `linear-gradient(180deg, ` +
              `${layer.from} 0%, ` +
              `${layer.from} 22%, ` +
              `${layer.to} 78%, ` +
              `${layer.to} 100%)`

            // Layered shadows: outer drop, inner top highlight (light from
            // above), inner bottom shadow (curvature), faint outer rim.
            const ringShadow = isActive
              ? [
                  `0 20px 50px -10px ${layer.glow}`,
                  `0 8px 18px -4px rgba(15,58,35,0.30)`,
                  `inset 0 2px 0 rgba(255,255,255,0.55)`,
                  `inset 0 -10px 18px -8px rgba(0,0,0,0.35)`,
                  `inset 0 0 0 1px rgba(255,255,255,0.30)`,
                ].join(', ')
              : [
                  `0 10px 22px -8px rgba(15,58,35,0.28)`,
                  `inset 0 2px 0 rgba(255,255,255,0.45)`,
                  `inset 0 -8px 14px -8px rgba(0,0,0,0.32)`,
                  `inset 0 0 0 1px rgba(255,255,255,0.22)`,
                ].join(', ')

            return (
              <div
                key={layer.slug}
                className="absolute left-1/2 top-1/2"
                style={{
                  marginLeft: `-${width / 2}px`,
                  marginTop: `-${layerH / 2}px`,
                  width: `${width}px`,
                  height: `${layerH}px`,
                  transformStyle: 'preserve-3d',
                  transform: `translate3d(0, ${yOffset}px, 0) ${isActive ? 'scale(1.05) translateY(-6px)' : ''}`,
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {/* Pipe ring — thick rounded slab, gently tilted so the rim
                 *  reads as solid + 3D. */}
                <button
                  type="button"
                  onClick={() => onSelect(layer.slug)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={layer.label}
                  className="absolute inset-0 cursor-pointer outline-none
                             focus-visible:ring-2 focus-visible:ring-brand-accent"
                  style={{
                    transform: `rotateX(${tiltX}deg)`,
                    background: ringBg,
                    borderRadius: `${layerH}px`,  // capsule
                    boxShadow: ringShadow,
                    transition: 'box-shadow 0.5s ease, background 0.4s ease',
                  }}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Floating labels — separate non-rotating layer, positioned at each
       *  ring's vertical level. They never spin with the pyramid, so the
       *  white pill + dark-green text + icon stay 100% readable at every
       *  angle and even when paused. */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="relative" style={{ width: '460px', height: '540px' }}>
          {PYRAMID_LAYERS.map((layer, i) => {
            const fromBottom = total - 1 - i
            const width = baseWidth - fromBottom * stepWidth
            const yOffset = (i - (total - 1) / 2) * stepY
            const isActive = active === i
            const fontPx = Math.max(11, Math.min(14, width / 28))
            const Icon = layer.icon
            return (
              <span
                key={layer.slug}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translateY(${yOffset}px) ${isActive ? 'scale(1.06)' : ''}`,
                  transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <span
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full
                             bg-white/95 backdrop-blur-sm
                             px-3.5 py-1 font-bold uppercase text-brand-deep
                             shadow-[0_6px_14px_-6px_rgba(15,58,35,0.45)]
                             ring-1 ring-white/70"
                  style={{
                    fontSize: `${fontPx}px`,
                    letterSpacing: '0.18em',
                  }}
                >
                  <Icon size={fontPx + 3} strokeWidth={2.4} className="text-brand-deep" />
                  {layer.label}
                </span>
              </span>
            )
          })}
        </div>
      </div>

      {/* Apex hub — small Yanabiya logo above the pyramid, click → overview */}
      <button
        type="button"
        onClick={onSelectHub}
        aria-label="Open all services overview"
        className="group/hub absolute left-1/2 top-2 -translate-x-1/2 z-10"
      >
        <div className="relative w-12 h-12 rounded-full bg-white ring-2 ring-brand-accent
                        shadow-[0_8px_22px_-6px_rgba(15,58,35,0.45)]
                        grid place-items-center overflow-hidden
                        transition-transform duration-300 group-hover/hub:scale-110">
          <img src={assets.logo} alt="Yanabiya Group" className="w-10 h-10 object-contain p-1" />
        </div>
        <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap
                         text-[8px] font-bold tracking-[0.32em] uppercase text-brand-accentDark">
          Group HQ
        </span>
      </button>

      {/* Active layer label below the pyramid (responsive to active index) */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 text-center">
        <div className="text-[9px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
          Active · 0{active + 1} of {total}
        </div>
        <div
          className="font-serif text-lg text-brand-deep mt-1 leading-tight transition-colors duration-300"
          style={{ color: PYRAMID_LAYERS[active].to }}
        >
          {PYRAMID_LAYERS[active].label}
        </div>
      </div>
    </div>
  )
}

/* Slide-in detail panel — supports a single-division view OR a special
 * 'overview' mode that lists every division (when the HQ is clicked). */
function NodeDetailPanel({
  slug,
  onClose,
}: {
  slug: string | 'overview' | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!slug) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [slug, onClose])

  if (!slug) return null

  // OVERVIEW mode — HQ click. Show every division in one panel.
  if (slug === 'overview') {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="All Yanabiya Group divisions"
        className="fixed inset-0 z-[100]"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />
        <aside
          onClick={(e) => e.stopPropagation()}
          className="absolute top-0 right-0 h-full w-full sm:w-[480px] md:w-[560px]
                     bg-white shadow-[0_0_60px_rgba(0,0,0,0.35)]
                     border-l border-brand-accent/30
                     overflow-y-auto"
          style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
        >
          <div aria-hidden="true" className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full
                       bg-slate-100 hover:bg-slate-200 border border-slate-200
                       grid place-items-center text-slate-700 hover:text-brand-deep transition-colors"
          >
            <CloseIcon size={16} />
          </button>

          <div className="relative p-7 md:p-9">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-brand-deep grid place-items-center
                              ring-2 ring-brand-accent overflow-hidden">
                <img src={assets.logo} alt="" className="w-9 h-9 object-contain bg-white rounded p-0.5" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
                  Group HQ
                </div>
                <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
                  All Divisions
                </h3>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-snug">
              Yanabiya Group operates six diversified business divisions, each
              independent yet aligned under one strategic group vision.
            </p>

            <div className="mt-7 space-y-2.5">
              {businesses.map((b, i) => {
                const display = BUSINESS_DISPLAY[b.slug] ?? { title: b.title, tag: '', sample: [] }
                const Icon = b.icon
                const num = String(i + 1).padStart(2, '0')
                return (
                  <Link
                    key={b.slug}
                    to={`/business/${b.slug}`}
                    onClick={onClose}
                    className="group flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200
                               px-3 py-2.5 transition-all duration-300
                               hover:bg-brand-accent/8 hover:border-brand-deep/40 hover:translate-x-1"
                  >
                    <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg
                                     bg-brand-accent/15 text-brand-deep
                                     transition-colors duration-300
                                     group-hover:bg-brand-deep group-hover:text-white">
                      <Icon size={16} strokeWidth={1.7} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                        {display.title}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5 truncate">
                        {display.tag}
                      </div>
                    </div>
                    <span className="shrink-0 font-mono text-[10px] text-slate-400">
                      {num}
                    </span>
                    <ExternalLink size={12} className="shrink-0 text-slate-400 group-hover:text-brand-deep transition-colors" />
                  </Link>
                )
              })}
            </div>
          </div>
        </aside>
      </div>
    )
  }

  // SINGLE DIVISION mode — node click
  const b = businesses.find((bb) => bb.slug === slug)
  if (!b) return null
  const display = BUSINESS_DISPLAY[slug] ?? { title: b.title, tag: '', sample: [] }
  const Icon = b.icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${display.title} division detail`}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-full w-full sm:w-[440px] md:w-[500px]
                   bg-white shadow-[0_0_60px_rgba(0,0,0,0.35)]
                   border-l border-brand-accent/30
                   overflow-y-auto"
        style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div aria-hidden="true" className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full
                     bg-slate-100 hover:bg-slate-200 border border-slate-200
                     grid place-items-center text-slate-700 hover:text-brand-deep transition-colors"
        >
          <CloseIcon size={16} />
        </button>

        <div className="relative p-7 md:p-9">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-deep
                            ring-1 ring-brand-accent/30">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
                Division
              </div>
              <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
                {display.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-600 leading-snug">
            {display.tag}
          </p>

          {/* Sub-services */}
          {display.sample.length > 0 && (
            <>
              <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accentDark mb-3">
                What's Inside
              </div>
              <ul className="space-y-2">
                {display.sample.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2
                               text-sm text-slate-700 flex items-baseline gap-2"
                  >
                    <span className="block w-1 h-1 rounded-full bg-brand-accent shrink-0 translate-y-[-2px]" />
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Sub-services count from real data */}
          {b.subServices && b.subServices.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full
                            bg-brand-deep/5 border border-brand-deep/15 px-3 py-1
                            text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
              <span className="font-mono">{b.subServices.length.toString().padStart(2, '0')}</span>
              Total Services
            </div>
          )}

          {/* CTA out to detail page */}
          <div className="mt-8">
            <Link
              to={`/business/${slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         hover:bg-brand-accentDark transition-colors"
            >
              Open Full Page
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function Businesses() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<string | 'overview' | null>(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const tickRef = useRef<number | undefined>(undefined)

  /* Auto-cycle the active layer every 2.4s while not paused. Hovering
   * the pyramid (or its surrounding card) sets paused=true, which
   * also halts the rotation animation. */
  useEffect(() => {
    if (paused) {
      if (tickRef.current) window.clearInterval(tickRef.current)
      return
    }
    tickRef.current = window.setInterval(() => {
      setActive((a) => (a + 1) % PYRAMID_LAYERS.length)
    }, 2400)
    return () => {
      if (tickRef.current) window.clearInterval(tickRef.current)
    }
  }, [paused])

  return (
    <Section id="businesses" className="relative overflow-hidden bg-white">
      {/* Soft ambient mint glow on the white surface */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/3 w-[520px] h-[520px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[460px] h-[460px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6 relative">

        {/* TEXT ON TOP — pyramid below (matches /#about pattern). */}
        <div className="flex flex-col gap-12 md:gap-16 items-center">

          {/* TOP — Our Service text, centered */}
          <div className="w-full max-w-3xl mx-auto text-center order-1">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4 inline-flex items-center gap-2">
                <Sparkles size={12} className="text-brand-accent" />
                Our Service
                <Sparkles size={12} className="text-brand-accent" />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[42px] leading-[1.15] tracking-tight text-brand-deep lg:whitespace-nowrap">
                Structured into specialised{' '}
                <span className="text-brand-accentDark">divisions.</span>
              </h2>
            </Reveal>
          </div>

          {/* MIDDLE — GBS-Model numbered-circle chain */}
          <Reveal delay={200} className="w-full order-2">
            <ServicesGBSModel onSelect={(target) => navigate(target)} />
          </Reveal>

          {/* BOTTOM — Get a Quote CTA + Live signal pill */}
          <Reveal delay={320} className="w-full order-3">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Get a Quote
                <ArrowRight size={14} />
              </Link>
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-brand-accentDark font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                Live · {PYRAMID_LAYERS.length} layers
              </div>
            </div>
          </Reveal>
        </div>

      </div>

      {/* Slide-in detail panel for the workflow node click */}
      <NodeDetailPanel slug={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
