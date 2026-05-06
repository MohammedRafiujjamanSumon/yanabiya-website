import { Globe, Code2, TrendingUp, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CircleItem } from './CircleInfographic'

type Props = {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  items: CircleItem[]
}

// Tailwind gradient classes, listed as literals so JIT picks them up
const BG_TO_GRADIENT: Record<string, string> = {
  'bg-emerald-500': 'from-emerald-500 to-emerald-700',
  'bg-sky-500':     'from-sky-500 to-sky-700',
  'bg-amber-500':   'from-amber-400 to-amber-600',
  'bg-rose-500':    'from-rose-500 to-rose-700',
  'bg-teal-700':    'from-teal-500 to-teal-700',
  'bg-violet-500':  'from-violet-500 to-violet-700',
}

function getIcon(label: string): LucideIcon {
  const l = label.toLowerCase()
  if (l.includes('global') || l.includes('expos') || l.includes('international')) return Globe
  if (l.includes('stack') || l.includes('tech') || l.includes('modern') || l.includes('cloud')) return Code2
  if (l.includes('growth') || l.includes('career') || l.includes('path')) return TrendingUp
  return Award
}

const NUMS = ['01', '02', '03', '04', '05', '06']

export default function CareersReasons({ eyebrow, titleLine1, titleLine2, items }: Props) {
  return (
    <section>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="text-center mb-12">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-sky-400 rounded-full" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-accentDark">
              {eyebrow}
            </span>
            <span className="block w-8 h-px bg-sky-400 rounded-full" />
          </div>
        )}
        <h2 className="font-serif text-slate-900 leading-[1.1] text-2xl md:text-3xl lg:text-[36px]">
          {titleLine1}{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
            {titleLine2}
          </span>
        </h2>
      </div>

      {/* ── Gradient icon cards ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {items.map((item, i) => {
          const gradient = BG_TO_GRADIENT[item.bg] ?? 'from-emerald-500 to-emerald-700'
          const Icon = getIcon(item.label)

          return (
            <div
              key={item.label}
              className={`group relative rounded-2xl overflow-hidden
                         bg-gradient-to-br ${gradient}
                         px-4 py-6 flex flex-col items-center text-center
                         shadow-[0_6px_24px_rgba(0,0,0,0.14)]
                         hover:shadow-[0_14px_40px_rgba(0,0,0,0.22)]
                         hover:-translate-y-1.5 transition-all duration-300`}
            >
              {/* Soft inner glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

              {/* Faded number */}
              <span
                aria-hidden
                className="absolute top-2.5 right-3 font-serif text-4xl font-black
                           text-white/15 leading-none select-none"
              >
                {NUMS[i] ?? `0${i + 1}`}
              </span>

              {/* Icon circle */}
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/20 ring-2 ring-white/30
                             flex items-center justify-center mb-4
                             group-hover:bg-white/30 transition-colors duration-300">
                <Icon size={26} strokeWidth={1.8} className="text-white" />
              </div>

              <h3 className="relative z-10 font-bold text-white text-sm md:text-base leading-snug mb-2">
                {item.label}
              </h3>
              <p className="relative z-10 text-white/75 text-[11px] md:text-xs leading-relaxed">
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
