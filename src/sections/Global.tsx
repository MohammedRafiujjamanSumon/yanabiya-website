import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { assets } from '../data/assets'
import Section from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import GlobalOverviewPanel from '../components/GlobalOverviewPanel'

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

/* Four country nodes evenly spaced on the orbit ring. Compass mapping:
 * UK · north (top), Oman · east (right), Bangladesh · south (bottom),
 * USA · west (left). Coordinates assume the dashed orbit ring is at
 * inset 18%, so its visible radius is 32% of the container width. */
const ORBIT_NODES = [
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom',          role: 'European Operations',      top: '18%', left: '50%' },
  { code: 'OM', flag: '🇴🇲', name: 'Sultanate of Oman',        role: 'Headquarters',             top: '50%', left: '82%' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',               role: 'South Asia Operations',    top: '82%', left: '50%' },
  { code: 'US', flag: '🇺🇸', name: 'United States of America', role: 'North America Operations', top: '50%', left: '18%' },
]

/* Particle ring around an active node. Each dot sits at a fixed angle
 * with a staggered animation delay so the cluster reads as orbiting
 * sparks. */
const PARTICLE_OFFSETS = [
  { x: 32, y: 0 },
  { x: 22, y: -22 },
  { x: 0, y: -32 },
  { x: -22, y: -22 },
  { x: -32, y: 0 },
  { x: -22, y: 22 },
  { x: 0, y: 32 },
  { x: 22, y: 22 },
]


export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)
  const [activeCode, setActiveCode] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)

  return (
    <Section id="global" className="relative overflow-hidden bg-white">
      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6">

        {/* ───────── TEXT FIRST ───────── */}
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              {t('global.eyebrow', 'Global Presence')}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] lg:text-[40px] leading-[1.15] tracking-tight text-slate-900 lg:whitespace-nowrap">
              Aligned across borders as{' '}
              <span className="text-brand-accentDark">one unified network.</span>
            </h2>
          </Reveal>
        </div>

        {/* ───────── GEOMAP — single circular orbit system ───────── */}
        <Reveal delay={1080}>
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative aspect-square w-full max-w-[640px] mx-auto mt-12 md:mt-16
                       rounded-full
                       bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900
                       ring-1 ring-white/10 shadow-2xl
                       overflow-hidden"
          >
            {/* Ambient blobs */}
            <div
              aria-hidden="true"
              className="absolute -top-20 -left-20 w-72 h-72 rounded-full
                         bg-blue-500/20 blur-3xl pointer-events-none"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-24 -right-20 w-80 h-80 rounded-full
                         bg-amber-500/15 blur-3xl pointer-events-none"
            />

            {/* Static outer guide rings (subtle, decorative) */}
            <div aria-hidden="true" className="absolute inset-[8%] rounded-full border border-white/8 pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-[28%] rounded-full border border-white/10 pointer-events-none" />

            {/* Rotating dashed orbit line — slows + reverses on hover, pauses on click */}
            <div
              aria-hidden="true"
              className="absolute inset-[18%] rounded-full border-2 border-dashed border-amber-300/30
                         transition-[border-color] duration-500
                         group-hover:border-amber-300/55 pointer-events-none"
              style={{
                animation: activeCode
                  ? 'none'
                  : `spin-slow ${hovered ? '80s' : '36s'} linear infinite ${hovered ? 'reverse' : 'normal'}`,
              }}
            />

            {/* Connection lines from centre to each node */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {ORBIT_NODES.map((n, i) => {
                const x = parseFloat(n.left)
                const y = parseFloat(n.top)
                const isActive = n.code === activeCode
                return (
                  <line
                    key={n.code}
                    x1="50" y1="50" x2={x} y2={y}
                    stroke={isActive ? 'rgba(252,211,77,0.85)' : 'rgba(255,255,255,0.14)'}
                    strokeWidth={isActive ? '0.5' : '0.25'}
                    strokeDasharray="0.8 1.5"
                    style={{
                      animation: isActive
                        ? 'none'
                        : `dividerGrow 5s ease-in-out ${i * 0.4}s infinite`,
                      transition: 'stroke 0.5s ease, stroke-width 0.5s ease',
                    }}
                  />
                )
              })}
            </svg>

            {/* Country nodes — N / E / S / W on the orbit */}
            {ORBIT_NODES.map((n) => {
              const isActive = n.code === activeCode
              const isHQ = n.code === 'OM'
              return (
                <div
                  key={n.code}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: n.top, left: n.left }}
                >
                  {/* Particle ring around the active node */}
                  {isActive && (
                    <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none z-0">
                      {PARTICLE_OFFSETS.map((p, idx) => (
                        <span
                          key={idx}
                          className="absolute w-1 h-1 rounded-full bg-amber-300
                                     shadow-[0_0_5px_rgba(252,211,77,0.95)]"
                          style={{
                            transform: `translate(${p.x}px, ${p.y}px)`,
                            animation: `haloPulse 2.4s ease-in-out ${idx * 0.18}s infinite`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setActiveCode((prev) => (prev === n.code ? null : n.code))
                    }
                    aria-label={`Toggle ${n.name} details`}
                    aria-expanded={isActive ? 'true' : 'false'}
                    className={`relative grid place-items-center rounded-full z-10
                                w-12 h-12 md:w-14 md:h-14
                                bg-white/[0.08] backdrop-blur-md
                                border transition-all duration-500
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300
                                ${
                                  isActive
                                    ? 'border-amber-300/85 scale-110 shadow-[0_0_30px_rgba(252,211,77,0.7)] bg-white/15'
                                    : 'border-white/30 opacity-80 hover:opacity-100 hover:scale-105 hover:border-amber-300/50 hover:shadow-[0_0_18px_rgba(252,211,77,0.45)]'
                                }`}
                  >
                    <span className="text-2xl drop-shadow-md">{n.flag}</span>
                  </button>

                  {/* Expanded detail card — appears on click, slides outward
                   *  away from the centre so it doesn't overlap the hub. */}
                  {isActive && (
                    <div
                      className={`absolute z-30 fade-up
                                  min-w-[200px] px-4 py-3 rounded-2xl
                                  bg-slate-900/90 backdrop-blur-xl
                                  ring-1 ring-amber-300/40 shadow-2xl
                                  ${
                                    n.code === 'GB'
                                      ? 'top-full left-1/2 -translate-x-1/2 mt-3'
                                      : n.code === 'BD'
                                        ? 'bottom-full left-1/2 -translate-x-1/2 mb-3'
                                        : n.code === 'OM'
                                          ? 'top-1/2 left-full -translate-y-1/2 ml-3'
                                          : 'top-1/2 right-full -translate-y-1/2 mr-3'
                                  }`}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300/85">
                          {n.role}
                        </span>
                        {isHQ && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                           bg-amber-300/15 text-amber-200 border border-amber-300/40">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className="text-base font-semibold text-white mt-1 leading-tight">
                        {n.name}
                      </div>
                      <Link
                        to={`/country/${n.code.toLowerCase()}`}
                        className="mt-2 inline-flex items-center gap-1
                                   text-[11px] font-bold uppercase tracking-[0.18em]
                                   text-amber-200 hover:text-white transition-colors"
                      >
                        Explore <ArrowRight size={12} />
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Centre — Yanabiya hub */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div className="relative grid place-items-center
                              w-24 h-24 md:w-28 md:h-28 rounded-full
                              bg-gradient-to-br from-white/25 via-white/10 to-white/5
                              backdrop-blur-xl ring-2 ring-amber-300/40
                              shadow-[0_0_40px_rgba(252,211,77,0.35)]">
                <img
                  src={assets.logo}
                  alt="Yanabiya Group"
                  className="w-3/4 h-3/4 object-contain animate-spin-slow"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
            </div>

            {/* Hub label — floats just below the medallion */}
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 text-center pointer-events-none">
              <div className="text-[9px] md:text-[10px] uppercase tracking-[0.32em] text-amber-300/75 font-bold">
                Global Hub
              </div>
            </div>

            {/* Live status pill — anchored to the inside-bottom of the orbit */}
            <div className="absolute left-1/2 bottom-[6%] -translate-x-1/2
                            inline-flex items-center gap-2
                            px-3 py-1 rounded-full
                            bg-slate-950/60 ring-1 ring-amber-300/30 backdrop-blur-md
                            text-[9px] uppercase tracking-[0.32em] text-amber-200/80 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse
                               shadow-[0_0_6px_rgba(212,175,55,0.9)]" />
              Live · 4 regions
            </div>
          </div>
        </Reveal>

        {/* CTA — sits BELOW the geomap */}
        <Reveal delay={1200}>
          <div className="mt-10 md:mt-12 text-center">
            <button
              type="button"
              onClick={() => setPresenceOpen(true)}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Global Presence
              <ArrowRight size={14} />
            </button>
          </div>
        </Reveal>

      </div>

      <GlobalOverviewPanel open={presenceOpen} onClose={() => setPresenceOpen(false)} />
    </Section>
  )
}
