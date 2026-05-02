import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { DISTRIBUTIONS } from '../data/distribution'

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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/**
 * Six-card "Distributed Leadership" infographic.
 *
 * Layout (md+):
 *   [ formally ] [ pragmatically ] [ strategically ]
 *   [ ───────  CENTRE PILL  ─────── ] [ incrementally ]
 *   [ culturally ] [ opportunistically ]
 *
 * On mobile we collapse to a clean 2-col grid with the centre pill
 * stretched across the top so the structure still reads.
 */

export default function DistributedLeadership() {
  return (
    <Section id="distributed-leadership" className="relative overflow-hidden bg-brand-50">

      {/* Ambient glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -left-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-8 md:pb-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <Reveal>
            <Eyebrow>Distributed Leadership</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px] leading-snug tracking-tight text-brand-deep mt-1">
              Six ways leadership is distributed across the group —{' '}
              <span className="italic text-brand-accentDark">formal, pragmatic, strategic, incremental, opportunistic, cultural.</span>
            </h2>
          </Reveal>
        </div>

        {/* INFOGRAPHIC GRID */}
        <div className="relative max-w-6xl mx-auto">

          {/* Centre pill — large grey banner that anchors the diagram */}
          <Reveal delay={150}>
            <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                            md:w-[42%] md:max-w-[420px]
                            mb-6 md:mb-0 z-0
                            rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900
                            shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)]
                            ring-1 ring-white/10
                            px-6 py-5 md:px-8 md:py-7 text-center">
              <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.32em] text-brand-accent mb-1.5">
                The Centre
              </div>
              <div className="font-serif font-bold text-white text-xl md:text-2xl leading-tight">
                DISTRIBUTED LEADERSHIP
              </div>
              <div className="mt-2 text-[11px] md:text-[12px] text-white/60 leading-snug">
                One group. Six distributions. Anchored by integrity & execution.
              </div>
            </div>
          </Reveal>

          {/* SIX CARDS */}
          <div className="relative grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 z-10">
            {DISTRIBUTIONS.map((d, i) => {
              // Push the centre row down so it visually sits around the pill
              const isMiddleRow = i === 3 || i === 4
              return (
                <Reveal key={d.slug} delay={i * 80} className={isMiddleRow ? 'md:mt-32' : ''}>
                  <Link
                    to={`/leadership/distributed/${d.slug}`}
                    aria-label={`Open ${d.label} page`}
                    className="group relative block rounded-2xl overflow-hidden
                               text-left p-4 md:p-5 h-full min-h-[170px] md:min-h-[200px]
                               shadow-[0_12px_28px_-14px_var(--tw-shadow-color)]
                               transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                               hover:-translate-y-1
                               hover:shadow-[0_20px_40px_-14px_var(--tw-shadow-color)]"
                    style={{
                      ['--tw-shadow-color' as never]: d.glow,
                      backgroundImage: `linear-gradient(135deg, ${d.from} 0%, ${d.to} 100%)`,
                    }}
                  >
                    {/* Hover sheen */}
                    <span aria-hidden className="absolute inset-0 bg-white/0
                                                  group-hover:bg-white/5 transition-colors duration-500" />

                    <div className="relative">
                      <h3 className="font-bold text-white text-[13px] md:text-[14px] leading-tight
                                     drop-shadow-[0_1px_3px_rgba(0,0,0,0.35)]">
                        {d.label}
                      </h3>
                      <p className="mt-2 text-white text-[11px] md:text-[12px] leading-snug
                                    drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
                        {d.short}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-[9px] md:text-[10px]
                                       font-bold uppercase tracking-[0.22em] text-white
                                       opacity-80 group-hover:opacity-100 group-hover:gap-1.5
                                       transition-all duration-300">
                        Learn more <ArrowRight size={11} />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-10">
          <Reveal>
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Leadership <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
