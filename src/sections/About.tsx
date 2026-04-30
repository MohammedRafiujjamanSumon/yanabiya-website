import { Link } from 'react-router-dom'
import { ArrowRight, Quote, Users, Workflow, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { company } from '../data/company'

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

          {/* BELOW — three founding pillars (People · Process · Clients).
           *  Replaces the office photo with a real brand hierarchy
           *  drawn from company.ts. Anchored by a small "FOUNDING
           *  PILLARS" header so the section reads as a structure, not
           *  three loose tiles. */}
          <div className="w-full max-w-4xl mx-auto order-2">
            <Reveal>
              <div className="text-center mb-5 md:mb-6">
                <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                                 tracking-[0.32em] text-brand-accentDark">
                  Founding Pillars
                </span>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-5 md:gap-6 [perspective:1400px]">
              {company.pillars.map((p, i) => {
                const meta = PILLAR_META[p.title] ?? {
                  icon: Users,
                  tint: 'bg-slate-50 text-slate-700',
                  ring: 'ring-slate-200/70',
                }
                const Icon = meta.icon
                return (
                  <Reveal key={p.title} delay={120 + i * 110}>
                    {/* 3D pillar card.
                     *   - Outer: perspective + a gentle Y-float loop (each
                     *     card on a different delay so they breathe out
                     *     of sync).
                     *   - Card: preserve-3d + a tilt-on-hover that lifts
                     *     the card forward in space (translateZ), with
                     *     a slight rotateY/X for depth.
                     *   - Inside: glossy top highlight + soft bottom
                     *     under-shadow so the card reads as solid, not
                     *     flat. */}
                    <div
                      className="group h-full animate-float-3d will-change-transform"
                      style={{ animationDelay: `${i * 1.4}s` }}
                    >
                      <div
                        className="relative h-full rounded-2xl bg-white/95 backdrop-blur-sm
                                   p-5 md:p-6 [transform-style:preserve-3d]
                                   border border-emerald-100
                                   shadow-[0_10px_24px_-12px_rgba(15,58,35,0.20),0_4px_10px_-6px_rgba(15,58,35,0.12)]
                                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                   group-hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(14px)_scale(1.02)]"
                      >
                        {/* Glossy top highlight band — sits "in front" via
                         *  translateZ so the 3D feel reads on hover. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-3 top-2 h-8 rounded-2xl
                                     bg-gradient-to-b from-white/70 via-white/20 to-transparent
                                     [transform:translateZ(20px)]"
                        />

                        {/* Soft under-shadow plate — sits "behind" so the
                         *  card looks lifted off the page. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-x-4 bottom-2 h-6 rounded-full
                                     bg-emerald-900/15 blur-md
                                     [transform:translateZ(-25px)]"
                        />

                        {/* Step indicator — tiny serif numeral so the three
                         *  cards visibly form a 1-2-3 hierarchy. */}
                        <span className="absolute top-3 right-4 font-serif text-[12px] text-slate-300
                                         [transform:translateZ(8px)]">
                          {String(i + 1).padStart(2, '0')}
                        </span>

                        <div
                          className={`w-12 h-12 rounded-xl grid place-items-center
                                      ${meta.tint} ring-1 ${meta.ring}
                                      shadow-[0_6px_14px_-6px_rgba(15,58,35,0.25)]
                                      [transform:translateZ(24px)]`}
                        >
                          <Icon size={22} strokeWidth={2} />
                        </div>

                        <div className="mt-4 font-serif text-[16px] text-brand-deep leading-tight
                                        [transform:translateZ(12px)]">
                          {p.title}
                        </div>
                        <p className="mt-1.5 text-[13px] text-slate-600 leading-relaxed
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
