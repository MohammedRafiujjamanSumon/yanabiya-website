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

/* Composite world-view map — the four offices combined into a single
 * geographic-style tile, with each country plotted west→east in its
 * approximate longitude band: USA (far west), UK (north-Atlantic),
 * Oman (Arabian peninsula), Bangladesh (south Asia). Sizes are
 * roughly proportional so USA reads larger than UK / OM / BD without
 * crowding them out. */
const COUNTRY_NODES = [
  { code: 'US', flag: '🇺🇸', name: 'USA',        label: 'Austin, USA',       left: '14%', top: '40%', w: 'w-[26%] md:w-[28%]', h: 'h-[44%] md:h-[48%]' },
  { code: 'GB', flag: '🇬🇧', name: 'UK',         label: 'London, UK',        left: '40%', top: '22%', w: 'w-[12%] md:w-[14%]', h: 'h-[26%] md:h-[28%]' },
  { code: 'OM', flag: '🇴🇲', name: 'Oman',       label: 'Muscat, Oman',      left: '60%', top: '52%', w: 'w-[14%] md:w-[15%]', h: 'h-[28%] md:h-[30%]' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh', label: 'Dhaka, Bangladesh', left: '80%', top: '50%', w: 'w-[10%] md:w-[11%]', h: 'h-[20%] md:h-[22%]' },
]

const MAP_BASE = `${import.meta.env.BASE_URL}maps/`

export default function Global() {
  const { t } = useTranslation()
  const [presenceOpen, setPresenceOpen] = useState(false)

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

        {/* ───────── GEOMAP — composite/union map of all four offices ───────── */}
        <Reveal delay={1080}>
          <div className="relative aspect-[16/9] w-full max-w-[820px] mx-auto mt-12 md:mt-16
                          rounded-2xl bg-gradient-to-br from-slate-50 via-white to-emerald-50
                          ring-1 ring-brand-accent/30 shadow-xl overflow-hidden">
            {/* Subtle map-grid background */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(15,58,35,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,58,35,0.08) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }}
            />
            {/* Composite-map watermark — the four flags inside their
             *  country outlines + Yanabiya gold medallion. Sits behind
             *  the silhouette nodes at low opacity for a finished feel.
             *  Image lives at public/maps/composite-watermark.png. */}
            <img
              src={`${MAP_BASE}composite-watermark.png`}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain opacity-20
                         pointer-events-none select-none"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            {/* Soft halo behind the whole composition */}
            <div
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center pointer-events-none"
            >
              <div className="w-[70%] h-[70%] rounded-full bg-brand-accent/25 blur-[80px] animate-gradient" />
            </div>

            {/* Connecting lines linking the four countries west → east */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 56"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {COUNTRY_NODES.slice(0, -1).map((d, i) => {
                const next = COUNTRY_NODES[i + 1]
                const x1 = parseFloat(d.left)
                const y1 = parseFloat(d.top) * 0.56
                const x2 = parseFloat(next.left)
                const y2 = parseFloat(next.top) * 0.56
                return (
                  <line
                    key={`${d.code}-${next.code}`}
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="rgba(15,58,35,0.5)"
                    strokeWidth="0.22"
                    strokeDasharray="0.8 0.6"
                    style={{ animation: `dividerGrow 4s ease-in-out ${i * 0.3}s infinite` }}
                  />
                )
              })}
            </svg>

            {/* Yanabiya watermark — subtle spinning logo at the geographic
             *  centre of the composition (between OM and BD over the
             *  Arabian Sea). Sits behind the country nodes. */}
            <div
              aria-hidden="true"
              className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 opacity-30"
              style={{ top: '50%', left: '50%' }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-lg
                              ring-2 ring-brand-accentDark/50 overflow-hidden
                              grid place-items-center animate-spin-slow">
                <img
                  src={assets.logo}
                  alt=""
                  className="w-full h-full object-contain scale-[1.3]"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
            </div>

            {/* COUNTRY NODES — silhouettes plotted at their approximate
             *  longitude on the composite. Each is a clickable Link to the
             *  country detail page. */}
            {COUNTRY_NODES.map((d, i) => {
              const mapUrl = `${MAP_BASE}${d.code.toLowerCase()}.svg`
              return (
                <Link
                  key={d.code}
                  to={`/country/${d.code.toLowerCase()}`}
                  aria-label={`Explore ${d.label}`}
                  title={d.label}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-20"
                  style={{ top: d.top, left: d.left }}
                >
                  <div className={`relative grid place-items-center ${d.w} ${d.h}`}>
                    {/* Pulsing halo */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 -z-10 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at center, rgba(158,199,58,0.6) 0%, transparent 65%)',
                        filter: 'blur(12px)',
                        animation: `haloPulse 3s ease-in-out ${i * 0.4}s infinite`,
                      }}
                    />
                    {/* Country silhouette — SVG already filled in
                     *  brand-accent green so we render it as a plain
                     *  <img> and add a drop-shadow glow on top. */}
                    <img
                      src={mapUrl}
                      alt={`${d.name} map`}
                      className="relative w-full h-full object-contain
                                 transition-transform duration-300
                                 group-hover:scale-110"
                      style={{
                        filter:
                          'drop-shadow(0 0 10px rgba(158,199,58,0.85)) drop-shadow(0 0 3px rgba(158,199,58,0.6))',
                      }}
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).style.display = 'none')
                      }
                    />
                    {/* Pin badge — small white tag with flag + name, sits
                     *  just above the silhouette so each country is
                     *  identifiable on the composite. */}
                    <div className="absolute -top-7 md:-top-8 left-1/2 -translate-x-1/2
                                    flex items-center gap-1 px-2 py-0.5 rounded-full
                                    bg-white ring-1 ring-brand-accent/60 shadow-sm
                                    text-[10px] md:text-[11px] font-semibold text-brand-deep
                                    whitespace-nowrap
                                    transition-all duration-300
                                    group-hover:-translate-y-0.5 group-hover:ring-brand-accentDark
                                    group-hover:shadow-md">
                      <span className="text-sm leading-none">{d.flag}</span>
                      <span>{d.name}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
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
