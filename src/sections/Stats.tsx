import { useEffect, useRef, useState } from 'react'
import { Globe2, Layers, Calendar, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { company } from '../data/company'
import { useSection } from '../hooks/useSection'

const STAT_ICONS: Record<string, LucideIcon> = {
  Countries: Globe2,
  Industries: Layers,
  Experience: Calendar,
  Clients: Users,
}

const STAT_KEYS: Record<string, string> = {
  Countries: 'hero.stats.countries',
  Industries: 'hero.stats.industries',
  Experience: 'hero.stats.experience',
  Clients: 'hero.stats.clients',
}

function parseValue(raw: string) {
  const match = raw.match(/^(\d+)([\w+%]*)$/)
  return match ? { num: parseInt(match[1], 10), suffix: match[2] } : { num: null, suffix: raw }
}

function JumpCounter({ value, play, delay }: { value: string; play: boolean; delay: number }) {
  const { num, suffix } = parseValue(value)
  const [display, setDisplay] = useState(0)
  const [done, setDone] = useState(false)
  const raf = useRef<number>(0)

  useEffect(() => {
    if (!play || num === null) return
    const later = setTimeout(() => {
      const duration = 1200
      const start = performance.now()

      const tick = (now: number) => {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        // Elastic-out easing for the "jump" bounce effect
        const eased = progress === 1
          ? 1
          : 1 - Math.pow(2, -10 * progress) * Math.cos((progress * 10 - 0.75) * (2 * Math.PI) / 3)
        setDisplay(Math.round(eased * num))
        if (progress < 1) {
          raf.current = requestAnimationFrame(tick)
        } else {
          setDone(true)
        }
      }
      raf.current = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(later); cancelAnimationFrame(raf.current) }
  }, [play, num, delay])

  if (num === null) return <span>{value}</span>

  return (
    <span>
      {play ? display : 0}
      {suffix && (
        <span
          className="transition-opacity duration-300"
          style={{ opacity: done ? 1 : 0 }}
        >
          {suffix}
        </span>
      )}
    </span>
  )
}

export default function Stats() {
  const { t } = useTranslation()
  const ref = useRef<HTMLElement>(null)
  const [played, setPlayed] = useState(false)

  const apiCompany = useSection<{ stats?: { value: string; label: string }[] }>('company')
  const stats = apiCompany?.stats ?? company.stats

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setPlayed(true); obs.disconnect() } },
      { threshold: 0.3 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} id="stats" className="bg-brand-50 border-y border-brand-deep/10">
      <div className="container-x px-2 md:px-4 py-2 md:py-2.5">
        <div className="grid grid-cols-4 gap-3 md:gap-4 [perspective:1400px]">
          {stats.map((s, i) => {
            const Icon = STAT_ICONS[s.label] ?? Globe2
            return (
              <div
                key={s.label}
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
                                 grid place-items-center ring-1 ring-brand-deep/20
                                 [transform:translateZ(18px)]"
                  >
                    <Icon size={12} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col items-start [transform:translateZ(10px)]">
                    <span className="font-serif text-base md:text-lg text-brand-deep leading-none">
                      <JumpCounter value={s.value} play={played} delay={i * 150} />
                    </span>
                    <span className="mt-0.5 text-[8px] md:text-[9px] uppercase tracking-[0.22em]
                                       font-semibold text-brand-accentDark leading-tight">
                      {t(STAT_KEYS[s.label] ?? '', s.label)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
