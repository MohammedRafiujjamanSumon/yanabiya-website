import { useTranslation } from 'react-i18next'
import { ArrowRight, Handshake } from 'lucide-react'
import { useState } from 'react'
import GlobalOverviewPanel from '../components/GlobalOverviewPanel'
import { assets } from '../data/assets'

/* CSS-only hero — no YouTube embed. Matches the Figma motion spec:
 *   • full-bleed dark gradient background (brand-ink → brand-deep)
 *   • world-map continent outlines at low opacity
 *   • 4 pulsing pins at the four office cities
 *   • beams from Oman HQ to each branch (animated stroke flow)
 *   • drifting particle field
 *   • centred Yanabiya logo with halo glow + scale-in
 *   • welcome copy + CTAs
 */

const PINS = [
  { code: 'OM', x: 62, y: 38, hub: true,  label: 'Muscat'   },
  { code: 'GB', x: 47, y: 22, hub: false, label: 'London'   },
  { code: 'BD', x: 75, y: 36, hub: false, label: 'Dhaka'    },
  { code: 'US', x: 22, y: 32, hub: false, label: 'Austin'   },
]

const HUB = PINS.find((p) => p.hub)!
const BRANCHES = PINS.filter((p) => !p.hub)

/* Particle field — fixed seed so positions are stable across renders. */
const PARTICLES = Array.from({ length: 24 }, (_, i) => {
  // Deterministic pseudo-random (just modular arithmetic on i)
  const x = (i * 37 + 11) % 100
  const y = (i * 23 + 7) % 100
  const size = (i % 3) + 2  // 2, 3, or 4
  const dur = 14 + (i % 7)  // 14–20s
  const delay = (i % 9) * 0.7
  return { x, y, size, dur, delay }
})

export default function Hero() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)

  return (
    <section id="home" className="relative scroll-mt-24">
      <div className="relative w-full h-[78svh] min-h-[520px] overflow-hidden bg-brand-ink">

        {/* ──────── Background gradient stack ──────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 35%, rgba(15,58,35,0.55) 0%, rgba(8,28,18,0.92) 55%, #060f0a 100%)',
          }}
        />
        {/* Mint accent glow upper-right */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -right-24 w-[640px] h-[640px] rounded-full
                     bg-brand-accent/15 blur-[160px] animate-pulse"
        />
        {/* Lime accent glow lower-left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-24 w-[560px] h-[560px] rounded-full
                     bg-brand-accentDark/10 blur-[160px]"
        />

        {/* ──────── World map — continent outlines + grid ──────── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 56"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full opacity-[0.20]"
        >
          {/* equator + tropics dashes */}
          <g stroke="rgba(158,199,58,0.20)" strokeWidth="0.08" strokeDasharray="0.6 0.8" fill="none">
            <line x1="0" x2="100" y1="34" y2="34" />
            <line x1="0" x2="100" y1="22" y2="22" />
            <line x1="0" x2="100" y1="46" y2="46" />
          </g>
          {/* Continent silhouettes — soft mint stroke */}
          <g
            fill="rgba(158,199,58,0.06)"
            stroke="rgba(158,199,58,0.32)"
            strokeWidth="0.14"
            strokeLinejoin="round"
          >
            {/* North America */}
            <path d="M 6 14 Q 16 9 26 12 L 30 18 Q 32 22 28 26 L 22 30 Q 16 32 12 30 L 8 26 Q 5 20 6 14 Z" />
            {/* South America */}
            <path d="M 24 32 L 30 32 L 32 38 L 30 46 L 26 50 L 22 46 L 22 38 Z" />
            {/* Europe */}
            <path d="M 44 14 Q 50 12 54 14 L 56 18 Q 54 22 50 22 L 44 22 L 42 18 Z" />
            {/* Africa */}
            <path d="M 47 24 L 56 24 L 58 30 L 58 38 L 54 46 L 50 50 L 46 46 L 44 38 L 45 30 Z" />
            {/* Middle East / Arabian peninsula */}
            <path d="M 58 26 L 64 26 L 66 32 L 64 36 L 60 36 L 58 32 Z" />
            {/* Russia / N. Asia */}
            <path d="M 56 10 Q 70 8 84 10 L 88 14 L 86 18 L 70 18 L 60 16 L 56 14 Z" />
            {/* China / SE Asia */}
            <path d="M 70 20 L 82 20 L 84 26 L 80 30 L 74 30 L 72 26 Z" />
            {/* India / Bangladesh */}
            <path d="M 70 28 L 76 28 L 78 34 L 74 38 L 71 36 Z" />
            {/* Australia */}
            <path d="M 82 40 L 92 40 L 94 46 L 90 48 L 84 46 Z" />
          </g>
        </svg>

        {/* ──────── Beam paths — HQ → each branch (mint flow) ──────── */}
        <svg
          aria-hidden="true"
          viewBox="0 0 100 56"
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          {BRANCHES.map((b, i) => {
            const sx = HUB.x
            const sy = HUB.y
            const ex = b.x
            const ey = b.y
            // Arc upward — control point above midpoint
            const mx = (sx + ex) / 2
            const my = Math.min(sy, ey) - Math.abs(ex - sx) * 0.18
            const path = `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`
            return (
              <g key={b.code}>
                <path d={path} fill="none" stroke="rgba(158,199,58,0.30)" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
                <path
                  d={path}
                  fill="none"
                  stroke="rgba(158,199,58,0.95)"
                  strokeWidth="0.32"
                  strokeLinecap="round"
                  className="animate-svg-flow"
                  style={{ animationDelay: `${i * 0.55}s`, animationDuration: '5s' }}
                />
              </g>
            )
          })}
        </svg>

        {/* ──────── Country pins (positioned in % over the map) ──────── */}
        {PINS.map((p, i) => (
          <div
            key={p.code}
            aria-hidden="true"
            className="absolute"
            style={{
              left: `${p.x}%`,
              top: `${(p.y / 56) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {/* Halo */}
              <span
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                            ${p.hub ? 'w-12 h-12 bg-brand-accent/45' : 'w-8 h-8 bg-brand-accent/35'}`}
                style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.3}s infinite` }}
              />
              {/* Pin head */}
              <span
                className={`relative block rounded-full ring-2
                            ${p.hub
                              ? 'w-3 h-3 bg-brand-accent ring-white/70 shadow-[0_0_12px_rgba(158,199,58,0.9)]'
                              : 'w-2 h-2 bg-brand-accent ring-white/50 shadow-[0_0_8px_rgba(158,199,58,0.7)]'}`}
              />
              {/* Label (subtle) */}
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1.5 whitespace-nowrap
                               text-[9px] font-bold tracking-[0.22em] uppercase
                               text-brand-accent/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
                {p.label}
              </span>
            </div>
          </div>
        ))}

        {/* ──────── Drifting particles ──────── */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-brand-accent/60"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: 0.5,
                animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite`,
                boxShadow: '0 0 8px rgba(158,199,58,0.6)',
              }}
            />
          ))}
        </div>

        {/* ──────── Soft vignette for legibility ──────── */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* ──────── Centre content: logo + welcome + CTAs ──────── */}
        <div className="relative h-full container-x flex flex-col items-center justify-center text-center">

          {/* Logo with halo glow + scale-in reveal */}
          <div className="relative mb-6 fade-up" style={{ animationDelay: '60ms' }}>
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-full bg-brand-accent/30 blur-2xl animate-pulse"
            />
            <img
              src={assets.logo}
              alt="Yanabiya Group"
              className="h-16 md:h-24 w-auto object-contain
                         drop-shadow-[0_8px_28px_rgba(158,199,58,0.5)]"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          {/* Welcome heading */}
          <h1
            className="font-serif text-white drop-shadow-lg fade-up
                       text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 md:mb-5
                       tracking-tight"
            style={{ animationDelay: '180ms' }}
          >
            {t('hero.welcome')}
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/95 text-base md:text-lg leading-snug mx-auto max-w-2xl
                       drop-shadow-lg fade-up"
            style={{ animationDelay: '320ms' }}
          >
            {t('hero.desc1')}
          </p>

          {/* CTAs */}
          <div
            className="mt-9 flex flex-col sm:flex-row gap-4 justify-center items-center fade-up"
            style={{ animationDelay: '440ms' }}
          >
            <button
              type="button"
              onClick={() => setPresenceOpen(true)}
              className="btn-primary !px-8 !py-3.5 !rounded-full"
            >
              Explore Global Presence <ArrowRight size={18} className="ltr-flip" />
            </button>
            <a
              href="#contact"
              className="btn-ghost !px-8 !py-3.5 !rounded-full !border-white/50 !text-white
                         hover:!bg-white hover:!text-brand-ink hover:!border-white"
            >
              <Handshake size={18} /> {t('hero.cta2')}
            </a>
          </div>

          {/* Live tagline pill */}
          <div
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/40
                       bg-brand-deep/40 backdrop-blur-sm px-4 py-1.5 fade-up"
            style={{ animationDelay: '600ms' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-brand-accent">
              4 countries · 6 sectors · one platform
            </span>
          </div>
        </div>
      </div>

      <GlobalOverviewPanel open={presenceOpen} onClose={() => setPresenceOpen(false)} />
    </section>
  )
}
