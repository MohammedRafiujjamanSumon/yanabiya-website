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
      <div className="container-x py-2 md:py-3">
        <div
          className="relative max-w-md mx-auto rounded-2xl overflow-hidden
                     bg-black
                     ring-1 ring-white/10
                     shadow-[0_12px_26px_-14px_rgba(0,0,0,0.55)]
                     px-3 py-3 md:px-4 md:py-4"
        >

          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [perspective:1400px]">
            {company.stats.map((s, i) => {
              const Icon = STAT_ICONS[s.label] ?? Globe2
              return (
                <Reveal key={s.label} delay={i * 90}>
                  <div
                    className="group h-full animate-float-3d will-change-transform"
                    style={{ animationDelay: `${i * 0.9}s` }}
                  >
                    <div
                      className="relative h-full flex flex-col items-center text-center px-1.5 py-2
                                 [transform-style:preserve-3d]
                                 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                 group-hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.03)]"
                    >
                      <div
                        className="w-8 h-8 rounded-full bg-white/10 text-white
                                   grid place-items-center mb-1
                                   ring-1 ring-white/15 backdrop-blur-sm
                                   [transform:translateZ(18px)]"
                      >
                        <Icon size={13} strokeWidth={2} />
                      </div>
                      <div
                        className="font-serif text-xl md:text-2xl text-white leading-none
                                   [transform:translateZ(12px)]"
                      >
                        {s.value}
                      </div>
                      <div
                        className="mt-0.5 text-[9px] md:text-[10px] uppercase tracking-[0.22em]
                                   font-semibold text-white
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
