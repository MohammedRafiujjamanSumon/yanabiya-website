import { ReactNode } from 'react'

export type CircleItem = {
  label: string
  description: string
  bg: string
  icon?: ReactNode
  image?: string
}

type Props = {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  items: CircleItem[]
}

const GRADIENT_ID = 'cig-snake'

// Zig-zag: circles alternate high/low; card goes on the opposite side
const ZZ = [
  { offset: 'md:mt-0',  card: 'below' },
  { offset: 'md:mt-16', card: 'above' },
  { offset: 'md:mt-4',  card: 'below' },
  { offset: 'md:mt-6',  card: 'above' },
  { offset: 'md:mt-0',  card: 'below' },
] as const

function DescCard({
  label,
  text,
  bg,
  dotSide,
}: {
  label: string
  text: string
  bg: string
  dotSide: 'top' | 'bottom'
}) {
  return (
    <div className="relative w-full rounded-xl bg-white border border-slate-100 shadow-sm px-2.5 pt-3.5 pb-2.5">
      {/* Colored dot where the stem enters the card */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${bg} shadow-sm ring-2 ring-white
                    ${dotSide === 'top' ? '-top-1.5' : '-bottom-1.5'}`}
      />
      <p className="text-[11px] font-semibold text-slate-800 text-center leading-tight mb-1">{label}</p>
      <p className="text-[10px] leading-snug text-slate-500 text-center">{text}</p>
    </div>
  )
}

export default function CircleInfographic({ eyebrow, titleLine1, titleLine2, items }: Props) {
  return (
    <section className="relative">
      <div className="text-center mb-10 mx-auto">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.28em] text-brand-accent mb-3">{eyebrow}</div>
        )}
        <h2 className="font-serif font-light text-slate-900 leading-tight text-2xl md:text-3xl">
          {titleLine1} {titleLine2}
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        {/* Snake connector line */}
        <svg
          className="absolute inset-x-0 top-4 md:top-6 w-full h-40 md:h-56 pointer-events-none hidden md:block"
          viewBox="0 0 1200 280"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#10b981" />
              <stop offset="28%"  stopColor="#0ea5e9" />
              <stop offset="55%"  stopColor="#f59e0b" />
              <stop offset="78%"  stopColor="#ef4444" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <path
            d="M 60 40 C 220 40 250 230 420 240 S 620 40 760 130 S 1000 260 1140 60"
            stroke={`url(#${GRADIENT_ID})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-6">
          {items.map((item, i) => {
            const zz = ZZ[i % ZZ.length]
            const cardAbove = zz.card === 'above'

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center gap-1.5 ${zz.offset}`}
              >
                {/* Top zone: card or empty spacer */}
                <div className="w-full min-h-[56px] flex items-end justify-center">
                  {cardAbove && <DescCard label={item.label} text={item.description} bg={item.bg} dotSide="bottom" />}
                </div>

                {/* Stem top */}
                <div className={`w-0.5 h-4 ${cardAbove ? item.bg : 'bg-transparent'}`} />

                {/* Circle with label inside */}
                <div
                  className={`relative z-10 overflow-hidden w-24 h-24 md:w-28 md:h-28 rounded-full
                              shadow-xl ring-4 ring-white/90 flex-shrink-0
                              ${item.image ? '' : item.bg}`}
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                  {item.image && (
                    <div className={`absolute inset-0 ${item.bg} opacity-50`} />
                  )}
                </div>

                {/* Stem bottom */}
                <div className={`w-0.5 h-4 ${!cardAbove ? item.bg : 'bg-transparent'}`} />

                {/* Bottom zone: card or empty spacer */}
                <div className="w-full min-h-[56px] flex items-start justify-center">
                  {!cardAbove && <DescCard label={item.label} text={item.description} bg={item.bg} dotSide="top" />}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
