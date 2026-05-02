import { Globe2, Layers, Calendar, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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
    <section id="stats" className="bg-brand-50 border-y border-brand-deep/10">
      <div className="bg-brand-50">
        <div className="container-x px-2 md:px-4 py-2 md:py-2.5">
          <div className="grid grid-cols-4 gap-3 md:gap-4 [perspective:1400px]">
            {company.stats.map((s, i) => {
              const Icon = STAT_ICONS[s.label] ?? Globe2
              return (
                <Reveal key={s.label} delay={i * 90}>
                  <div
                    className="group h-full animate-float-3d will-change-transform"
                    style={{ animationDelay: `${i * 0.9}s` }}
                  >
                    <div
                      className="relative h-full flex items-center justify-center gap-2 md:gap-3
                                 [transform-style:preserve-3d]
                                 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 group-hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.03)]"
                    >
                      <div
                        className="shrink-0 w-7 h-7 rounded-full bg-brand-deep/10 text-brand-deep
                                   grid place-items-center
                                   ring-1 ring-brand-deep/20
                                   [transform:translateZ(18px)]"
                      >
                        <Icon size={12} strokeWidth={2} />
                      </div>
                      <div className="flex flex-col items-start [transform:translateZ(10px)]">
                        <span className="font-serif text-base md:text-lg text-brand-deep leading-none">
                          {s.value}
                        </span>
                        <span className="mt-0.5 text-[8px] md:text-[9px] uppercase tracking-[0.22em]
                                         font-semibold text-brand-accentDark leading-tight">
                          {s.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
