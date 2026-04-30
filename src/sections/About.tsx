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

          {/* BELOW — flowchart-hierarchy on a dark navy panel.
           *  Yanabiya logo lives as a giant faded watermark behind the
           *  whole composition. SVG curves connect a top "Yanabiya Group"
           *  node to the three founding pillars (People · Process ·
           *  Clients), each rendered as a glassy 3D card. Glowing brand-
           *  accent dots scatter the field for the same lit-up tech
           *  diagram feel as the reference image. */}
          <div className="w-full max-w-5xl mx-auto order-2">
            <Reveal>
              <div className="relative rounded-3xl overflow-hidden
                              bg-gradient-to-br from-[#0a1f2c] via-[#082233] to-[#04121b]
                              ring-1 ring-emerald-500/15
                              shadow-[0_28px_60px_-20px_rgba(4,18,27,0.55)]">

                {/* Yanabiya logo watermark — huge, faded, centred. */}
                <img
                  src={assets.logo}
                  alt=""
                  aria-hidden
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                             w-[80%] max-w-[520px] opacity-[0.06] pointer-events-none
                             select-none"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />

                {/* Soft brand glows — top-left and bottom-right. */}
                <div aria-hidden className="absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
                <div aria-hidden className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-amber-400/10 blur-[120px] pointer-events-none" />

                {/* Drifting accent dots */}
                <div aria-hidden className="absolute inset-0 pointer-events-none">
                  {[
                    { x: 12, y: 22 }, { x: 28, y: 68 }, { x: 44, y: 14 },
                    { x: 58, y: 78 }, { x: 72, y: 30 }, { x: 88, y: 60 },
                    { x: 36, y: 50 }, { x: 80, y: 18 },
                  ].map((d, i) => (
                    <span
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-amber-300/80 animate-float-3d
                                 shadow-[0_0_8px_rgba(252,211,77,0.7)]"
                      style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${i * 0.6}s` }}
                    />
                  ))}
                </div>

                <div className="relative px-5 py-9 md:px-10 md:py-12">
                  {/* Section label inside the panel */}
                  <div className="text-center mb-7 md:mb-9">
                    <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                                     tracking-[0.32em] text-amber-300">
                      Founding Pillars
                    </span>
                  </div>

                  {/* SVG connector tree — root node at top, three pillars
                   *  fanning down. Drawn at the same scale as the grid
                   *  beneath so the curves land at each card's top. */}
                  <svg
                    aria-hidden
                    viewBox="0 0 100 30"
                    preserveAspectRatio="none"
                    className="w-full h-16 md:h-20 mb-2"
                  >
                    <defs>
                      <linearGradient id="pillarLine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%"   stopColor="rgba(252,211,77,0.85)" />
                        <stop offset="100%" stopColor="rgba(16,185,129,0.55)" />
                      </linearGradient>
                    </defs>
                    {/* Root node circle */}
                    <circle cx="50" cy="4" r="2.4" fill="rgba(252,211,77,0.95)" />
                    <circle cx="50" cy="4" r="4.5" fill="rgba(252,211,77,0.18)" />

                    {/* Three curves to the pillar tops at x = 18, 50, 82 */}
                    {[18, 50, 82].map((x, i) => (
                      <g key={i}>
                        <path
                          d={`M 50 4 Q 50 18 ${x} 28`}
                          fill="none"
                          stroke="url(#pillarLine)"
                          strokeWidth="0.4"
                          strokeLinecap="round"
                        />
                        <circle cx={x} cy="28" r="0.9" fill="rgba(252,211,77,0.95)" />
                      </g>
                    ))}
                  </svg>

                  {/* Three pillar nodes */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 [perspective:1400px]">
                    {company.pillars.map((p, i) => {
                      const meta = PILLAR_META[p.title] ?? {
                        icon: Users,
                        tint: 'bg-slate-50 text-slate-700',
                        ring: 'ring-slate-200/70',
                      }
                      const Icon = meta.icon
                      return (
                        <Reveal key={p.title} delay={120 + i * 110}>
                          <div
                            className="group h-full animate-float-3d will-change-transform"
                            style={{ animationDelay: `${i * 1.4}s` }}
                          >
                            <div
                              className="relative h-full rounded-2xl
                                         bg-white/[0.04] backdrop-blur-md
                                         p-5 md:p-6 [transform-style:preserve-3d]
                                         border border-white/15
                                         shadow-[0_10px_24px_-12px_rgba(0,0,0,0.55)]
                                         transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                         group-hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(14px)_scale(1.02)]
                                         group-hover:border-amber-300/40
                                         group-hover:shadow-[0_16px_36px_-14px_rgba(252,211,77,0.35)]"
                            >
                              {/* Glossy highlight band */}
                              <span
                                aria-hidden
                                className="pointer-events-none absolute inset-x-3 top-2 h-8 rounded-2xl
                                           bg-gradient-to-b from-white/15 via-white/5 to-transparent
                                           [transform:translateZ(18px)]"
                              />

                              <span className="absolute top-3 right-4 font-serif text-[12px] text-white/30
                                               [transform:translateZ(8px)]">
                                {String(i + 1).padStart(2, '0')}
                              </span>

                              <div
                                className={`w-12 h-12 rounded-xl grid place-items-center
                                            ${meta.tint} ring-1 ${meta.ring}
                                            shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)]
                                            [transform:translateZ(24px)]`}
                              >
                                <Icon size={22} strokeWidth={2} />
                              </div>

                              <div className="mt-4 font-serif text-[16px] text-amber-100 leading-tight
                                              [transform:translateZ(12px)]">
                                {p.title}
                              </div>
                              <p className="mt-1.5 text-[13px] text-white/70 leading-relaxed
                                            [transform:translateZ(4px)]">
                                {p.body}
                              </p>
                            </div>
                          </div>
                        </Reveal>
                      )
                    })}
                  </div>
                </div>
              </div>
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
