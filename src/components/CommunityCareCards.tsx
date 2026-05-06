import { ReactNode } from 'react'
import { Heart, BookOpen, Stethoscope, Sparkles } from 'lucide-react'
import type { CircleItem } from './CircleInfographic'

type Props = {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  items: CircleItem[]
}

const BG_TO_HEX: Record<string, string> = {
  'bg-emerald-500': '#10b981',
  'bg-sky-500':     '#0ea5e9',
  'bg-amber-500':   '#f59e0b',
  'bg-rose-500':    '#f43f5e',
  'bg-teal-700':    '#0f766e',
  'bg-violet-500':  '#8b5cf6',
}

const BG_TO_LIGHT: Record<string, string> = {
  'bg-emerald-500': '#f0fdf4',
  'bg-sky-500':     '#f0f9ff',
  'bg-amber-500':   '#fffbeb',
  'bg-rose-500':    '#fff1f2',
  'bg-teal-700':    '#f0fdfa',
  'bg-violet-500':  '#faf5ff',
}

const NUMS = ['01', '02', '03', '04', '05', '06']

function getIcon(label: string): ReactNode {
  const l = label.toLowerCase()
  if (l.includes('welfare') || l.includes('care'))             return <Heart        size={15} strokeWidth={2.5} className="text-white" />
  if (l.includes('education') || l.includes('school'))         return <BookOpen     size={15} strokeWidth={2.5} className="text-white" />
  if (l.includes('health') || l.includes('medical'))           return <Stethoscope  size={15} strokeWidth={2.5} className="text-white" />
  return                                                               <Sparkles     size={15} strokeWidth={2.5} className="text-white" />
}

export default function CommunityCareCards({ eyebrow, titleLine1, titleLine2, items }: Props) {
  return (
    <section>
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="text-center mb-12">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-rose-400 rounded-full" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-rose-500">
              {eyebrow}
            </span>
            <span className="block w-8 h-px bg-rose-400 rounded-full" />
          </div>
        )}
        <h2 className="font-serif text-slate-900 leading-[1.1] text-2xl md:text-3xl lg:text-[36px]">
          {titleLine1}{' '}
          <span className="bg-gradient-to-r from-rose-500 to-amber-500 bg-clip-text text-transparent">
            {titleLine2}
          </span>
        </h2>
      </div>

      {/* ── Alternating strips ──────────────────────────────── */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {items.map((item, i) => {
          const hex       = BG_TO_HEX[item.bg]   ?? '#f43f5e'
          const lightBg   = BG_TO_LIGHT[item.bg]  ?? '#fff1f2'
          const photoLeft = i % 2 === 0

          return (
            <div
              key={item.label}
              className={`group flex ${photoLeft ? 'flex-row' : 'flex-row-reverse'}
                         rounded-2xl overflow-hidden h-36 md:h-40
                         shadow-[0_4px_20px_rgba(15,58,35,0.07)]
                         hover:shadow-[0_10px_36px_rgba(15,58,35,0.14)]
                         transition-shadow duration-300`}
            >
              {/* Photo */}
              <div className="relative w-40 md:w-52 shrink-0 overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover
                               transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-black/10" />
              </div>

              {/* Colored accent bar */}
              <div className="w-1 shrink-0" style={{ backgroundColor: hex }} />

              {/* Content */}
              <div
                className="relative flex-1 flex items-center px-5 py-4 overflow-hidden"
                style={{ backgroundColor: lightBg }}
              >
                {/* Large faded number in background */}
                <span
                  aria-hidden
                  className="absolute right-4 top-1/2 -translate-y-1/2
                             font-serif text-7xl font-black leading-none select-none opacity-[0.07] text-slate-900"
                >
                  {NUMS[i] ?? `0${i + 1}`}
                </span>

                {/* Icon + text */}
                <div className="relative flex items-start gap-3.5">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center
                               shadow-md ring-2 ring-white mt-0.5"
                    style={{ backgroundColor: hex }}
                  >
                    {item.icon ?? getIcon(item.label)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm md:text-base mb-1 leading-snug">
                      {item.label}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
