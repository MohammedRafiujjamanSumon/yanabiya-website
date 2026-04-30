import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Users, Workflow, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { company } from '../data/company'
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const PROMISE = {
  quote:
    'We deliver what we promise and place customer satisfaction above all — built on trust, integrity, and service excellence across every market we operate in.',
  attribution: 'Yanabiya Group · Built on Trust, Driven by Excellence',
}

// Map the three founding pillars (data lives in company.ts) to icons
// + an accent palette so each card has visual identity without
// drifting from the brand.
const PILLAR_META: Record<string, { icon: LucideIcon; tint: string; ring: string }> = {
  People:  { icon: Users,     tint: 'bg-emerald-50 text-emerald-700', ring: 'ring-emerald-200/70' },
  Process: { icon: Workflow,  tint: 'bg-amber-50 text-amber-700',     ring: 'ring-amber-200/70'   },
  Clients: { icon: Handshake, tint: 'bg-sky-50 text-sky-700',         ring: 'ring-sky-200/70'     },
}

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-[#fbfdfb]">

      {/* ───────── Ambient background: abstract global network ───────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="netLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(125,164,42,0)" />
              <stop offset="50%"  stopColor="rgba(125,164,42,0.55)" />
              <stop offset="100%" stopColor="rgba(125,164,42,0)" />
            </linearGradient>
            <radialGradient id="netNode" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"   stopColor="rgba(158,199,58,0.9)" />
              <stop offset="100%" stopColor="rgba(158,199,58,0)" />
            </radialGradient>
          </defs>

          <g stroke="url(#netLine)" strokeWidth="1.1" fill="none">
            <path d="M -50 420 Q 240 280 520 360 T 1080 220" />
            <path d="M -50 200 Q 320 320 620 240 T 1250 360" />
            <path d="M -50 320 Q 200 180 480 260 T 920 460" />
            <path d="M 100 540 Q 380 420 700 480 T 1300 380" />
            <path d="M 200 60  Q 460 220 760 140 T 1280 240" />
          </g>

          {[
            [180, 365], [420, 305], [620, 245], [810, 285], [1010, 235],
            [320, 235], [560, 275], [880, 415], [710, 470], [950, 175],
            [240, 95],  [490, 140], [770, 175], [1130, 320],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14" fill="url(#netNode)" />
              <circle cx={cx} cy={cy} r="2.4" fill="rgba(125,164,42,0.85)" />
            </g>
          ))}
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[80%] h-[60%] rounded-full bg-white/70 blur-[80px]" />
        </div>
      </div>

      {/* ───────── Foreground content ───────── */}
      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">
        <div className="flex flex-col gap-12 md:gap-16 items-center">

          {/* TOP — eyebrow + serif title + subtitle + CTAs (centered) */}
          <div className="w-full max-w-3xl mx-auto text-center order-1">
            <Reveal>
              <Eyebrow>About Us</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-[16px]
                             leading-snug tracking-tight text-brand-deep lg:whitespace-nowrap">
                A trusted global group, headquartered in Muscat,{' '}
                <span className="text-brand-accentDark">operating across four continents.</span>
              </h2>
            </Reveal>
          </div>

          {/* BELOW — flowchart hierarchy on top of a real businessman /
           *  laptop hero photo (dark cityscape mood, matches reference).
           *  Eight nodes float over the photo like a holographic data
           *  diagram; the largest box on the right holds the Yanabiya
           *  logo, the rest are short brand tags. White connector lines
           *  + glowing amber data-points complete the look. */}
          <div className="w-full max-w-5xl mx-auto order-2">
            <Reveal>
              <FlowchartHero />
            </Reveal>
          </div>

          {/* PULL-QUOTE — brand promise under the picture. Replaces the
           *  redundant side-stats panel; gives the section a clear voice
           *  and links the visual to the brand line. */}
          <Reveal delay={200} className="order-3 w-full max-w-3xl mx-auto -mt-2">
            <figure className="relative rounded-2xl bg-white px-6 py-7 md:px-10 md:py-9
                              border border-emerald-100
                              shadow-[0_10px_28px_-14px_rgba(15,58,35,0.18)]">
              {/* Vertical brand-accent bar on the left */}
              <span aria-hidden className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-brand-accent" />
              <Quote
                aria-hidden
                size={26}
                className="absolute -top-3 -left-3 md:-top-4 md:-left-4 text-brand-accent
                           bg-white rounded-full p-1 ring-1 ring-emerald-100"
              />
              <blockquote className="font-serif italic text-slate-800 leading-relaxed text-[15px] md:text-base">
                &ldquo;{PROMISE.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.28em]
                                     font-semibold text-brand-accentDark">
                {PROMISE.attribution}
              </figcaption>
            </figure>
          </Reveal>

          {/* BOTTOM — CTAs (centered, below the pull-quote) */}
          <Reveal delay={340} className="order-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Explore About
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/about/our-story"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}

/* ────────────────────────────────────────────────────────────
 *  Flowchart hero — 8 floating nodes layered over a real
 *  businessman/laptop photo. Boxes are positioned in % so the
 *  whole composition scales cleanly between mobile and desktop.
 * ────────────────────────────────────────────────────────── */

type Node = {
  /** id used to wire SVG connectors */
  id: 'mission' | 'vision' | 'people' | 'process' | 'clients' | 'trust' | 'logo' | 'excellence'
  label: string
  /** Short read-more line shown when the card is flipped. */
  body?: string
  /** Bounds in % of the panel — origin top-left of each box. */
  x: number
  y: number
  w: number
  h: number
}

const FLOW_NODES: Node[] = [
  { id: 'mission',    label: 'Mission',    body: 'Top-class IT, software & trade services delivered globally.', x: 27, y: 9,  w: 12, h: 11 },
  { id: 'vision',     label: 'Vision',     body: 'A leading global performer in technology and trade.',          x: 46, y: 9,  w: 12, h: 11 },
  { id: 'people',     label: 'People',     body: 'Skilled multinational teams across four continents.',           x: 13, y: 37, w: 12, h: 11 },
  { id: 'process',    label: 'Process',    body: 'Quality and efficiency in every engagement.',                   x: 30, y: 41, w: 11, h: 10 },
  { id: 'clients',    label: 'Clients',    body: 'Long-term partnerships built on trust.',                        x: 44, y: 41, w: 11, h: 10 },
  { id: 'trust',      label: 'Trust',      body: 'Built on ethics, honesty and customer satisfaction.',           x: 58, y: 37, w: 12, h: 12 },
  { id: 'logo',       label: 'Yanabiya',                                                                          x: 74, y: 24, w: 22, h: 40 },
  { id: 'excellence', label: 'Excellence', body: 'Industry-leading standards in every market.',                   x: 30, y: 69, w: 11, h: 10 },
]

// Connector edges between nodes — drawn as orthogonal lines with
// arrow heads, mirroring the reference flowchart.
const FLOW_EDGES: Array<{ from: Node['id']; to: Node['id'] }> = [
  { from: 'mission', to: 'vision'     },  // top horizontal
  { from: 'people',  to: 'mission'    },  // up
  { from: 'people',  to: 'process'    },  // mid horizontal
  { from: 'process', to: 'clients'    },  // mid horizontal
  { from: 'clients', to: 'trust'      },  // mid horizontal
  { from: 'trust',   to: 'logo'       },  // into the big box
  { from: 'process', to: 'excellence' },  // down
]

function FlowchartHero() {
  const [flippedId, setFlippedId] = useState<Node['id'] | null>(null)
  const nodeById = (id: Node['id']) => FLOW_NODES.find((n) => n.id === id)!

  return (
    <div className="relative rounded-3xl overflow-hidden
                    aspect-[3/2] bg-slate-900
                    ring-1 ring-white/10
                    shadow-[0_28px_60px_-20px_rgba(4,18,27,0.55)]">

      {/* Background photo — businessman with laptop, dark city mood */}
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2400&q=80"
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
      />

      {/* Dark navy gradient over the photo so the boxes & text stay
       *  legible without losing the photographic depth. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-br
                                  from-[#0a1f2c]/80 via-[#082233]/82 to-[#04121b]/92" />

      {/* Glowing amber data-points scattered (matches reference) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {[
          { x: 14, y: 26 }, { x: 22, y: 60 }, { x: 38, y: 18 },
          { x: 50, y: 28 }, { x: 64, y: 70 }, { x: 70, y: 40 },
          { x: 80, y: 18 }, { x: 92, y: 64 }, { x: 6, y: 50 },
        ].map((d, i) => (
          <span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 animate-float-3d
                       shadow-[0_0_10px_rgba(252,211,77,0.85)]"
            style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      {/* SVG connectors — drawn first so the boxes sit on top */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <marker id="flowArrow" markerWidth="6" markerHeight="6" refX="5" refY="3"
                  orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="rgba(255,255,255,0.85)" />
          </marker>
        </defs>
        {FLOW_EDGES.map((e, i) => {
          const a = nodeById(e.from)
          const b = nodeById(e.to)
          // Pick anchor edges based on relative position so the
          // line exits one box and enters the other cleanly.
          const aCx = a.x + a.w / 2
          const aCy = a.y + a.h / 2
          const bCx = b.x + b.w / 2
          const bCy = b.y + b.h / 2

          let x1, y1, x2, y2
          if (Math.abs(aCx - bCx) >= Math.abs(aCy - bCy)) {
            // primarily horizontal
            if (aCx < bCx) { x1 = a.x + a.w; y1 = aCy; x2 = b.x;       y2 = bCy }
            else            { x1 = a.x;       y1 = aCy; x2 = b.x + b.w; y2 = bCy }
          } else {
            // primarily vertical
            if (aCy < bCy) { x1 = aCx; y1 = a.y + a.h; x2 = bCx; y2 = b.y       }
            else            { x1 = aCx; y1 = a.y;       x2 = bCx; y2 = b.y + b.h }
          }
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="0.35"
              markerEnd="url(#flowArrow)"
            />
          )
        })}
      </svg>

      {/* Floating nodes. Logo is the central black anchor; the rest are
       *  click-to-flip cards revealing a one-line "read more" on the
       *  back side. */}
      {FLOW_NODES.map((n) => {
        const isLogo = n.id === 'logo'
        const isFlipped = flippedId === n.id
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => {
              if (isLogo) return
              setFlippedId((prev) => (prev === n.id ? null : n.id))
            }}
            aria-pressed={isFlipped}
            aria-label={isLogo ? 'Yanabiya Group' : `Show details about ${n.label}`}
            className={`absolute [perspective:900px] focus:outline-none
                        ${isLogo ? 'cursor-default' : 'cursor-pointer'}`}
            style={{
              left:   `${n.x}%`,
              top:    `${n.y}%`,
              width:  `${n.w}%`,
              height: `${n.h}%`,
            }}
          >
            <span
              className={`relative block w-full h-full [transform-style:preserve-3d]
                          transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                          ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
              {/* FRONT */}
              <span
                className={`absolute inset-0 [backface-visibility:hidden]
                            rounded-2xl flex items-center justify-center text-center
                            transition-colors duration-300
                            ${isLogo
                              ? 'bg-black ring-2 ring-amber-300/50 shadow-[0_0_24px_rgba(252,211,77,0.25)]'
                              : 'bg-transparent border border-white/45 hover:border-amber-200/90 hover:bg-white/5'}`}
              >
                {isLogo ? (
                  <img
                    src={assets.logo}
                    alt="Yanabiya Group"
                    className="max-w-[78%] max-h-[78%] object-contain
                               drop-shadow-[0_0_12px_rgba(252,211,77,0.45)]"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                ) : (
                  <span className="font-semibold uppercase tracking-[0.18em]
                                   text-[9px] sm:text-[10px] md:text-[11px]
                                   text-white/95 drop-shadow-md px-2 leading-tight">
                    {n.label}
                  </span>
                )}
              </span>

              {/* BACK — only for non-logo cards. Shows a one-line read-more
               *  on a slightly darker, amber-bordered face. */}
              {!isLogo && (
                <span
                  className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]
                             rounded-2xl flex flex-col items-center justify-center text-center px-2
                             bg-slate-950/80 backdrop-blur-sm border border-amber-300/60
                             shadow-[0_0_18px_rgba(252,211,77,0.25)]"
                >
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] text-white/90 leading-tight">
                    {n.body}
                  </span>
                  <span className="mt-1 text-[7px] sm:text-[8px] uppercase tracking-[0.25em] text-amber-300/90">
                    Tap to close
                  </span>
                </span>
              )}
            </span>
          </button>
        )
      })}

      {/* Bottom-centre label */}
      <div className="absolute inset-x-0 bottom-4 md:bottom-5 text-center pointer-events-none">
        <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                         tracking-[0.32em] text-amber-300/90">
          Yanabiya Group
        </span>
      </div>
    </div>
  )
}
