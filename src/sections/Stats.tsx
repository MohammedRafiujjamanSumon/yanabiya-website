import { Globe2, Layers, Calendar, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section from '../components/Section'
import { company } from '../data/company'
import { useReveal } from '../hooks/useReveal'

const STAT_ICONS: Record<string, LucideIcon> = {
  Countries: Globe2,
  Industries: Layers,
  Experience: Calendar,
  Clients: Users,
}

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

/* Compact 4-up stats strip immediately under the hero — three seconds
 * of trust-by-numbers (countries · industries · years · clients) so a
 * first-time visitor sees the scale of the group before scrolling into
 * the long-form sections.
 *
 * Panel uses the Yanabiya brand-green palette so the strip reads as
 * a continuation of the logo rather than another generic white card. */
export default function Stats() {
  return (
    <Section id="stats" className="bg-[#fbfdfb]">
      <div className="container-x py-4 md:py-6">
        <div
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden
                     bg-gradient-to-br from-[#0c2c1d] via-[#0e3a26] to-[#06231a]
                     ring-1 ring-emerald-400/20
                     shadow-[0_18px_44px_-18px_rgba(6,26,16,0.55)]
                     px-5 py-7 md:px-10 md:py-9"
        >
          {/* Soft brand-accent halos so the green panel reads as lit. */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-[280px] h-[280px] rounded-full bg-emerald-300/15 blur-[100px]" />
            <div className="absolute -bottom-20 -right-20 w-[280px] h-[280px] rounded-full bg-amber-300/10 blur-[100px]" />
          </div>

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 [perspective:1400px]">
            {company.stats.map((s, i) => {
              const Icon = STAT_ICONS[s.label] ?? Globe2
              return (
                <Reveal key={s.label} delay={i * 90}>
                  <div
                    className="group h-full animate-float-3d will-change-transform"
                    style={{ animationDelay: `${i * 0.9}s` }}
                  >
                    <div
                      className="relative h-full flex flex-col items-center text-center px-2 py-3
                                 [transform-style:preserve-3d]
                                 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 group-hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(12px)_scale(1.04)]"
                    >
                      <div
                        className="w-11 h-11 rounded-full bg-white/10 text-amber-200
                                   grid place-items-center mb-2
                                   shadow-[0_6px_14px_-6px_rgba(0,0,0,0.45)]
                                   ring-1 ring-amber-300/40 backdrop-blur-sm
                                   [transform:translateZ(20px)]"
                      >
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <div
                        className="font-serif text-3xl md:text-4xl text-white leading-none
                                   drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]
                                   [transform:translateZ(14px)]"
                      >
                        {s.value}
                      </div>
                      <div
                        className="mt-1.5 text-[11px] md:text-xs uppercase tracking-[0.22em]
                                   font-semibold text-amber-200/95
                                   [transform:translateZ(6px)]"
                      >
                        {s.label}
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </Section>
  )
}
