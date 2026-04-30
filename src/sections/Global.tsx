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

/* The circle is divided into four pie-slice segments by two diagonals
 * from the centre — N (top), E (right), S (bottom), W (left). Each
 * segment carries one country map blended into its quadrant. */
const SEGMENTS = [
  {
    code: 'GB',
    flag: '🇬🇧',
    name: 'United Kingdom',
    role: 'European Operations',
    /** Pie-slice triangle: centre → top-left corner → top-right corner */
    clip: 'polygon(50% 50%, 0% 0%, 100% 0%)',
    /** Where the country map sits inside its slice. */
    mapStyle: { top: '14%', left: '50%', transform: 'translateX(-50%)', width: '22%' },
    /** Where the flag + name label sits. */
    labelPos: 'top-[7%] left-1/2 -translate-x-1/2',
  },
  {
    code: 'OM',
    flag: '🇴🇲',
    name: 'Sultanate of Oman',
    role: 'Headquarters',
    clip: 'polygon(50% 50%, 100% 0%, 100% 100%)',
    mapStyle: { top: '50%', left: '85%', transform: 'translate(-100%, -50%)', width: '18%' },
    labelPos: 'top-1/2 right-[3%] -translate-y-1/2',
  },
  {
    code: 'BD',
    flag: '🇧🇩',
    name: 'Bangladesh',
    role: 'South Asia Operations',
    clip: 'polygon(50% 50%, 100% 100%, 0% 100%)',
    mapStyle: { top: '85%', left: '50%', transform: 'translate(-50%, -100%)', width: '20%' },
    labelPos: 'bottom-[7%] left-1/2 -translate-x-1/2',
  },
  {
    code: 'US',
    flag: '🇺🇸',
    name: 'United States of America',
    role: 'North America Operations',
    clip: 'polygon(50% 50%, 0% 100%, 0% 0%)',
    mapStyle: { top: '50%', left: '15%', transform: 'translate(0, -50%)', width: '24%' },
    labelPos: 'top-1/2 left-[3%] -translate-y-1/2',
  },
]

const MAP_BASE = `${import.meta.env.BASE_URL}maps/`


export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)
  const [activeCode, setActiveCode] = useState<string | null>(null)

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

        {/* ───────── GEOMAP — circle divided into 4 country segments ───────── */}
        <Reveal delay={1080}>
          <div className="relative aspect-square w-full max-w-[640px] mx-auto mt-12 md:mt-16
                          rounded-full
                          bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900
                          ring-1 ring-white/10 shadow-2xl
                          overflow-hidden">

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

            {/* Subtle outer + inner guide rings to keep the unity of the circle */}
            <div aria-hidden="true" className="absolute inset-[5%] rounded-full border border-white/10 pointer-events-none" />
            <div aria-hidden="true" className="absolute inset-[28%] rounded-full border border-amber-300/20 pointer-events-none" />

            {/* Four pie-slice segments — each links to its country page,
             *  brightens its country map on hover, and dims when another
             *  segment is active. */}
            {SEGMENTS.map((s) => {
              const isActive = activeCode === s.code
              const isOther = activeCode !== null && !isActive
              const isBD = s.code === 'BD'
              const mapUrl = isBD
                ? `${MAP_BASE}bd-regional.jpg`
                : `${MAP_BASE}${s.code.toLowerCase()}.svg`
              const isHQ = s.code === 'OM'
              return (
                <Link
                  key={s.code}
                  to={`/country/${s.code.toLowerCase()}`}
                  aria-label={`Explore ${s.name}`}
                  onMouseEnter={() => setActiveCode(s.code)}
                  onMouseLeave={() => setActiveCode(null)}
                  className={`group absolute inset-0 z-10 transition-all duration-500
                              ${isActive ? 'z-20 scale-[1.02]' : ''}
                              ${isOther ? 'opacity-30' : 'opacity-100'}`}
                  style={{ clipPath: s.clip, WebkitClipPath: s.clip }}
                >
                  {/* Slice tint — brightens when active. The radial origin
                   *  matches the slice's outer-edge bias so the highlight
                   *  feels rooted in that quadrant, not at the centre. */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 transition-opacity duration-500
                                ${isActive ? 'opacity-100' : 'opacity-50'}`}
                    style={{
                      background:
                        'radial-gradient(circle at center, rgba(252,211,77,0.14) 0%, rgba(96,165,250,0.06) 35%, transparent 65%)',
                    }}
                  />

                  {/* Country map — softly blended via opacity + drop-shadow
                   *  glow. BD uses the colourful regional map; the other
                   *  three use white silhouettes. */}
                  <img
                    src={mapUrl}
                    alt=""
                    aria-hidden="true"
                    className={`absolute object-contain transition-all duration-500
                                ${isActive ? 'opacity-95 scale-110' : 'opacity-45'}
                                ${isBD ? 'rounded-lg' : ''}`}
                    style={{
                      ...s.mapStyle,
                      filter: isBD
                        ? 'drop-shadow(0 0 16px rgba(252,211,77,0.45))'
                        : 'drop-shadow(0 0 18px rgba(255,255,255,0.4)) drop-shadow(0 0 8px rgba(252,211,77,0.45))',
                    }}
                    onError={(e) =>
                      ((e.currentTarget as HTMLImageElement).style.display = 'none')
                    }
                  />

                  {/* Flag + name + role label */}
                  <div className={`absolute ${s.labelPos} text-center
                                   transition-all duration-500
                                   ${isActive ? 'translate-y-0' : 'translate-y-0.5 opacity-90'}`}>
                    <div className="flex items-center justify-center gap-1.5">
                      <span className="text-lg leading-none drop-shadow-md">{s.flag}</span>
                      <span className="text-xs md:text-sm font-semibold text-white whitespace-nowrap">
                        {s.name}
                      </span>
                      {isHQ && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                         bg-amber-300/15 text-amber-200 border border-amber-300/40">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em]
                                  text-amber-200/75 mt-1">
                      {s.role}
                    </p>
                  </div>
                </Link>
              )
            })}

            {/* Caret-style radial dividers — four glowing diagonals from
             *  the centre to the corners. They give a sense of
             *  segmentation without breaking the circle's unity. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none z-30"
            >
              <defs>
                <linearGradient id="caret-glow" x1="50%" y1="50%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(252,211,77,0)" />
                  <stop offset="20%" stopColor="rgba(252,211,77,0.8)" />
                  <stop offset="100%" stopColor="rgba(252,211,77,0)" />
                </linearGradient>
              </defs>
              {/* NE */}
              <line x1="50" y1="50" x2="100" y2="0"
                    stroke="url(#caret-glow)" strokeWidth="0.4"
                    style={{ filter: 'drop-shadow(0 0 1px rgba(252,211,77,0.6))' }} />
              {/* SE */}
              <line x1="50" y1="50" x2="100" y2="100"
                    stroke="url(#caret-glow)" strokeWidth="0.4"
                    style={{ filter: 'drop-shadow(0 0 1px rgba(252,211,77,0.6))' }} />
              {/* SW */}
              <line x1="50" y1="50" x2="0" y2="100"
                    stroke="url(#caret-glow)" strokeWidth="0.4"
                    style={{ filter: 'drop-shadow(0 0 1px rgba(252,211,77,0.6))' }} />
              {/* NW */}
              <line x1="50" y1="50" x2="0" y2="0"
                    stroke="url(#caret-glow)" strokeWidth="0.4"
                    style={{ filter: 'drop-shadow(0 0 1px rgba(252,211,77,0.6))' }} />
            </svg>

            {/* Centre — Yanabiya hub. Sits above the slices so it always
             *  reads cleanly even when a quadrant is hovered. */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none z-40">
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
