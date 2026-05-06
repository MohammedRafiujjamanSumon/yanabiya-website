import { ReactNode } from 'react'
import { Zap, RefreshCw, Leaf, Users } from 'lucide-react'
import type { CircleItem } from './CircleInfographic'

type Props = {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  items: CircleItem[]
}

// Safe color map, avoids dynamic Tailwind class construction
const BG_TO_HEX: Record<string, string> = {
  'bg-emerald-500': '#10b981',
  'bg-sky-500':     '#0ea5e9',
  'bg-amber-500':   '#f59e0b',
  'bg-rose-500':    '#f43f5e',
  'bg-teal-700':    '#0f766e',
  'bg-violet-500':  '#8b5cf6',
}

function getIcon(label: string): ReactNode {
  const l = label.toLowerCase()
  if (l.includes('green') || l.includes('energy') || l.includes('operation'))
    return <Zap size={15} strokeWidth={2.5} className="text-white" />
  if (l.includes('circular') || l.includes('recycle') || l.includes('waste'))
    return <RefreshCw size={15} strokeWidth={2.5} className="text-white" />
  if (l.includes('climate') || l.includes('tree') || l.includes('carbon'))
    return <Leaf size={15} strokeWidth={2.5} className="text-white" />
  return <Users size={15} strokeWidth={2.5} className="text-white" />
}

const NUMS = ['01', '02', '03', '04', '05', '06']

export default function SustainabilityPillars({ eyebrow, titleLine1, titleLine2, items }: Props) {
  return (
    <section>
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="text-center mb-12">
        {eyebrow && (
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="block w-8 h-px bg-emerald-400 rounded-full" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-brand-accentDark">
              {eyebrow}
            </span>
            <span className="block w-8 h-px bg-emerald-400 rounded-full" />
          </div>
        )}
        <h2 className="font-serif text-slate-900 leading-[1.1] text-2xl md:text-3xl lg:text-[36px]">
          {titleLine1}{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {titleLine2}
          </span>
        </h2>
      </div>

      {/* ── Cards grid ─────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
        {items.map((item, i) => {
          const hex = BG_TO_HEX[item.bg] ?? '#10b981'
          return (
            <div
              key={item.label}
              className="group rounded-2xl overflow-hidden bg-white
                         shadow-[0_4px_20px_rgba(15,58,35,0.08)]
                         hover:shadow-[0_12px_40px_rgba(15,58,35,0.16)]
                         transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="relative h-44 overflow-hidden">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover
                               transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/35" />
                {/* Faded pillar number */}
                <span
                  aria-hidden
                  className="absolute top-3 right-4 font-serif text-6xl font-black
                             leading-none select-none text-white/25"
                >
                  {NUMS[i] ?? `0${i + 1}`}
                </span>
              </div>

              {/* Content, colored top border via inline style */}
              <div
                className="relative px-5 pt-7 pb-5 border-t-[3px]"
                style={{ borderTopColor: hex }}
              >
                {/* Floating icon bubble */}
                <div
                  className="absolute -top-4 left-5 w-8 h-8 rounded-full
                             flex items-center justify-center
                             shadow-md ring-2 ring-white"
                  style={{ backgroundColor: hex }}
                >
                  {item.icon ?? getIcon(item.label)}
                </div>

                <h3 className="font-semibold text-slate-900 text-sm md:text-base mb-1.5 leading-snug">
                  {item.label}
                </h3>
                <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
