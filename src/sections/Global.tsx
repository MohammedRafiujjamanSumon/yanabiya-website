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

/* The circle is divided into four pie-slice segments. Each segment is
 * a 3D flip card — front face shows the country's full map (object
 * contain, anchored at the triangle's centroid) and the back face is
 * a light-green tile revealing the flag + capital, country on touch. */
const SEGMENTS = [
  {
    code: 'GB',
    flag: '🇬🇧',
    name: 'United Kingdom',
    capital: 'London',
    /** Pie-slice triangle: centre → top-left corner → top-right corner */
    clip: 'polygon(50% 50%, 0% 0%, 100% 0%)',
    /** Map / back-face content placement inside the slice (centroid-anchored). */
    mapStyle: { top: '16%', left: '50%', transform: 'translate(-50%, -50%)', width: '32%', height: '30%' },
  },
  {
    code: 'OM',
    flag: '🇴🇲',
    name: 'Sultanate of Oman',
    capital: 'Muscat',
    clip: 'polygon(50% 50%, 100% 0%, 100% 100%)',
    mapStyle: { top: '50%', left: '84%', transform: 'translate(-50%, -50%)', width: '30%', height: '32%' },
  },
  {
    code: 'BD',
    flag: '🇧🇩',
    name: 'Bangladesh',
    capital: 'Dhaka',
    clip: 'polygon(50% 50%, 100% 100%, 0% 100%)',
    mapStyle: { top: '84%', left: '50%', transform: 'translate(-50%, -50%)', width: '24%', height: '30%' },
  },
  {
    code: 'US',
    flag: '🇺🇸',
    name: 'United States of America',
    capital: 'Austin',
    clip: 'polygon(50% 50%, 0% 100%, 0% 0%)',
    mapStyle: { top: '50%', left: '16%', transform: 'translate(-50%, -50%)', width: '32%', height: '30%' },
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

            {/* Four pie-slice flip-cards. Tap/click flips the slice to
             *  reveal a light-green back face with flag + capital,
             *  country. Other slices fade while one is flipped. */}
            {SEGMENTS.map((s) => {
              const isFlipped = activeCode === s.code
              const isOther = activeCode !== null && !isFlipped
              const mapUrl = `${MAP_BASE}${s.code.toLowerCase()}.svg`
              return (
                <button
                  key={s.code}
                  type="button"
                  onClick={() =>
                    setActiveCode((prev) => (prev === s.code ? null : s.code))
                  }
                  aria-label={`Toggle ${s.name} details`}
                  aria-pressed={isFlipped ? 'true' : 'false'}
                  className={`absolute inset-0 z-10 [perspective:1200px]
                              transition-all duration-500
                              ${isFlipped ? 'z-20 scale-[1.03]' : ''}
                              ${isOther ? 'opacity-30' : 'opacity-100'}`}
                  style={{ clipPath: s.clip, WebkitClipPath: s.clip }}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d]"
                    style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front — country silhouette (consistent style across
                     *  all four; transparent SVG so it blends into the
                     *  dark theme like the central logo). */}
                    <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
                      <img
                        src={mapUrl}
                        alt=""
                        aria-hidden="true"
                        className="absolute object-contain transition-all duration-500"
                        style={{
                          ...s.mapStyle,
                          filter:
                            'drop-shadow(0 0 14px rgba(255,255,255,0.35)) drop-shadow(0 0 6px rgba(252,211,77,0.4))',
                        }}
                        onError={(e) =>
                          ((e.currentTarget as HTMLImageElement).style.display = 'none')
                        }
                      />
                    </div>

                    {/* Back — light green card with flag + capital, country */}
                    <div
                      className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                                 bg-gradient-to-br from-emerald-100 via-emerald-50 to-emerald-200"
                      style={{ transform: 'rotateY(180deg)' }}
                    >
                      <div
                        className="absolute flex flex-col items-center justify-center text-center"
                        style={s.mapStyle}
                      >
                        <span className="text-3xl md:text-4xl drop-shadow-md leading-none">
                          {s.flag}
                        </span>
                        <div className="text-[11px] md:text-xs font-bold text-emerald-900 mt-2 leading-tight whitespace-nowrap">
                          {s.capital}, {s.name}
                        </div>
                        <Link
                          to={`/country/${s.code.toLowerCase()}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full
                                     bg-emerald-600 text-white text-[9px] font-bold uppercase tracking-wider
                                     hover:bg-emerald-700 transition-colors"
                        >
                          Explore <ArrowRight size={10} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </button>
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
