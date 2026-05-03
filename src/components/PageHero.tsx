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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  ghostText?: string
  cta?: { label: string; sublabel?: string; to: string }
  rightCaption?: { caption: ReactNode; body?: string; cta: { label: string; to: string } }
  centered?: boolean
}

/**
 * Shared light-mint hero used on every inner page. Mirrors the home
 * About Us section: brand-50 surface with brand-deep type, brand-accent
 * halos, ghost YANABIYA wordmark in deep-green stroke, and a floating
 * 3D logo at the top.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  ghostText = 'YANABIYA',
  cta,
  rightCaption,
  centered = false,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-brand-50">
      <div className="container-x relative px-5 py-10 md:px-12 md:py-14
                      min-h-[420px] md:min-h-[480px]">

        {/* Soft brand-accent halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-brand-accent/30 blur-[150px]" />
          <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-brand-accentDark/15 blur-[150px]" />
        </div>

        {/* Massive ghost-outline wordmark — deep-green stroke for the mint surface */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none flex items-center justify-end pr-6 md:pr-12"
        >
          <span
            className="font-serif font-black select-none
                       text-[18vw] md:text-[16vw] lg:text-[14vw] leading-none tracking-tighter
                       text-transparent"
            style={{ WebkitTextStroke: '1px rgba(15,58,35,0.12)' }}
          >
            {ghostText}
          </span>
        </div>

        {/* Top-left content + optional right caption */}
        <div className={`relative grid gap-8 md:gap-10 items-center
                        ${centered ? '' : 'md:grid-cols-2'}`}>
          <Reveal className={centered ? 'mx-auto text-center' : ''}>
            <div className={centered ? 'max-w-2xl mx-auto' : 'max-w-md'}>
              {eyebrow && (
                <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                                 tracking-[0.32em] text-brand-accentDark mb-4">
                  {eyebrow}
                </span>
              )}
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                             leading-[1.1] tracking-tight text-brand-deep">
                {title}
              </h1>
              {subtitle && (
                <p className={`mt-4 text-sm md:text-base text-brand-deep/70 leading-snug
                              ${centered ? 'max-w-xl mx-auto text-justify md:text-center' : 'max-w-sm'}`}>
                  {subtitle}
                </p>
              )}

              {cta && (
                <div className="mt-7">
                  <Link
                    to={cta.to}
                    className="group inline-flex items-center gap-3 rounded-full
                               pl-2 pr-5 py-2 bg-brand-50
                               border border-brand-deep/15 text-brand-deep
                               shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                               hover:border-brand-accent hover:shadow-[0_8px_24px_rgba(15,58,35,0.12)]
                               transition-all duration-300"
                  >
                    <span className="grid place-items-center w-9 h-9 rounded-full
                                     bg-gradient-to-br from-brand-accent to-brand-accentDark
                                     text-brand-deep shadow-md">
                      <Play size={14} fill="currentColor" />
                    </span>
                    <span className="text-[12px] font-semibold leading-tight text-left">
                      {cta.label}
                      {cta.sublabel && (
                        <>
                          <br className="hidden sm:block" />
                          <span className="text-brand-deep/60 sm:ml-0 ml-1">{cta.sublabel}</span>
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
                <div className="text-brand-deep font-semibold text-base lg:text-lg leading-snug">
                  {rightCaption.caption}
                </div>
                {rightCaption.body && (
                  <p className="mt-2 text-[12px] text-brand-deep/60 leading-snug max-w-[18rem] ml-auto">
                    {rightCaption.body}
                  </p>
                )}
                <div className="mt-5 flex justify-end">
                  <Link
                    to={rightCaption.cta.to}
                    className="relative grid place-items-center w-24 h-24 rounded-full
                               bg-brand-50 border border-brand-deep/15 text-brand-deep
                               shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                               hover:border-brand-accent hover:-translate-y-0.5
                               hover:shadow-[0_8px_24px_rgba(15,58,35,0.12)]
                               transition-all duration-300"
                    aria-label={rightCaption.cta.label}
                  >
                    <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.18em]
                                     leading-tight text-center px-2">
                      {rightCaption.cta.label}
                    </span>
                    <ArrowUpRight size={14} className="absolute bottom-2 right-2 text-brand-accentDark" />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
        </div>

      </div>
    </section>
  )
}
