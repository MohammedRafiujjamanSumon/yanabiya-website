import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Play } from 'lucide-react'
import { assets } from '../data/assets'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
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

type PageHeroProps = {
  /** Small uppercase tag above the title — typically the section name. */
  eyebrow?: string
  /** Main heading. Supports React nodes so callers can highlight a span. */
  title: ReactNode
  /** Sub-line under the heading. */
  subtitle?: string
  /** Massive ghost-outline word behind the 3D logo (default: YANABIYA). */
  ghostText?: string
  /** Optional CTA pill at the top-left. */
  cta?: { label: string; sublabel?: string; to: string }
  /** Optional secondary caption + circular CTA on the right. */
  rightCaption?: { caption: ReactNode; body?: string; cta: { label: string; to: string } }
}

/**
 * Shared dark hero that mirrors the About Us section's design language
 * across every inner page (service, business, country, community,
 * leadership, contact). Keeps brand voice consistent: forest-green
 * gradient panel, ghost YANABIYA wordmark, big floating 3D logo,
 * brand-accent halos, eyebrow + serif title + optional pills/CTAs.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ghostText = 'YANABIYA',
  cta,
  rightCaption,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden
                        bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a]">
      <div className="container-x relative px-5 py-10 md:px-12 md:py-14
                      min-h-[420px] md:min-h-[480px]">

        {/* Soft brand-accent halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-emerald-500/15 blur-[150px]" />
          <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[150px]" />
        </div>

        {/* Massive ghost-outline wordmark — sits behind the 3D logo */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 md:pr-12"
        >
          <span
            className="font-serif font-black select-none
                       text-[18vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter
                       text-transparent"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.10)' }}
          >
            {ghostText}
          </span>
        </div>

        {/* Top-left content + optional right caption */}
        <div className="relative grid md:grid-cols-2 gap-8 md:gap-10 items-center">
          <Reveal>
            <div className="max-w-md">
              {eyebrow && (
                <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                                 tracking-[0.32em] text-amber-300 mb-4">
                  {eyebrow}
                </span>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                             leading-[1.1] tracking-tight text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-4 text-sm md:text-base text-white/70 leading-snug max-w-sm">
                  {subtitle}
                </p>
              )}

              {cta && (
                <div className="mt-7">
                  <Link
                    to={cta.to}
                    className="group inline-flex items-center gap-3 rounded-full
                               pl-2 pr-5 py-2 bg-white/8 backdrop-blur-sm
                               border border-white/15 text-white/90
                               hover:bg-white/15 hover:border-amber-300/50
                               transition-all duration-300"
                  >
                    <span className="grid place-items-center w-9 h-9 rounded-full
                                     bg-gradient-to-br from-amber-300 via-rose-400 to-fuchsia-500
                                     text-white shadow-md">
                      <Play size={14} fill="currentColor" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-left">
                      {cta.label}
                      {cta.sublabel && (
                        <>
                          <br className="hidden sm:block" />
                          <span className="text-white/60 sm:ml-0 ml-1">{cta.sublabel}</span>
                        </>
                      )}
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </Reveal>

          {rightCaption && (
            <Reveal delay={140} className="hidden md:block">
              <div className="text-right">
                <div className="text-white/95 font-semibold text-base lg:text-lg leading-snug">
                  {rightCaption.caption}
                </div>
                {rightCaption.body && (
                  <p className="mt-2 text-[12px] text-white/55 leading-snug max-w-[18rem] ml-auto">
                    {rightCaption.body}
                  </p>
                )}
                <div className="mt-5 flex justify-end">
                  <Link
                    to={rightCaption.cta.to}
                    className="relative grid place-items-center w-24 h-24 rounded-full
                               bg-white/8 backdrop-blur-sm
                               border border-white/15 text-white/90
                               hover:bg-white/15 hover:border-amber-300/60 hover:-translate-y-0.5
                               transition-all duration-300"
                    aria-label={rightCaption.cta.label}
                  >
                    <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em]
                                     leading-tight text-center px-2">
                      {rightCaption.cta.label}
                    </span>
                    <ArrowUpRight size={14} className="absolute bottom-2 right-2 text-amber-300" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Big floating 3D Yanabiya logo — centerpiece */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[55%] max-w-[380px] aspect-square pointer-events-none animate-float-3d
                     [perspective:1200px]"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-[80px]" />
          <div className="absolute inset-[10%] rounded-full bg-amber-300/15 blur-[60px]" />
          <img
            src={assets.logo}
            alt=""
            className="relative w-full h-full object-contain opacity-80
                       drop-shadow-[0_30px_60px_rgba(252,211,77,0.25)]
                       drop-shadow-[0_12px_24px_rgba(15,58,35,0.35)]"
            style={{
              transform: 'rotateY(-12deg) rotateX(8deg)',
              filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.5))',
            }}
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </div>
      </div>
    </section>
  )
}
