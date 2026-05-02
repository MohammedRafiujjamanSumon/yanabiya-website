import { ReactNode } from 'react'

export type CircleItem = {
  label: string
  description: string
  /** Tailwind background colour class for the circle, e.g. 'bg-emerald-500'. */
  bg: string
  /** Optional icon node rendered above the label inside the circle. */
  icon?: ReactNode
}

type Props = {
  eyebrow?: string
  titleLine1: string
  titleLine2: string
  items: CircleItem[]
}

// Five-stop "rainbow" gradient roughly matching the reference infographic.
const GRADIENT_ID = 'circle-infographic-gradient'

// Each circle is offset vertically to produce the zig-zag rhythm seen in the
// reference image. Pattern repeats for items beyond index 4.
const ZIG_ZAG_OFFSETS = ['md:mt-0', 'md:mt-16', 'md:mt-8', 'md:mt-16', 'md:mt-0']

export default function CircleInfographic({
  eyebrow,
  titleLine1,
  titleLine2,
  items,
}: Props) {
  return (
    <section className="relative">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 70' fill='none' stroke='%23475569' stroke-width='1'><polygon points='20,2 60,2 78,35 60,68 20,68 2,35'/></svg>\")",
          backgroundSize: '80px 70px',
        }}
      />

      <div className="relative">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {eyebrow && (
            <div className="text-xs uppercase tracking-[0.28em] text-brand-accent mb-3">
              {eyebrow}
            </div>
          )}
          <h2 className="font-serif font-light text-slate-900 leading-tight">
            <span className="block text-4xl md:text-5xl lg:text-6xl">{titleLine1}</span>
            <span className="block w-32 sm:w-48 md:w-64 h-px bg-slate-900 mx-auto my-3 md:my-4" />
            <span className="block text-4xl md:text-5xl lg:text-6xl">{titleLine2}</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          <svg
            className="absolute inset-x-0 top-4 md:top-8 w-full h-40 md:h-56 pointer-events-none hidden md:block"
            viewBox="0 0 1200 280"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="28%" stopColor="#0ea5e9" />
                <stop offset="55%" stopColor="#f59e0b" />
                <stop offset="78%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#0f766e" />
              </linearGradient>
            </defs>
            <path
              d="M 60 40 C 220 40 250 230 420 240 S 620 40 760 130 S 1000 260 1140 60"
              stroke={`url(#${GRADIENT_ID})`}
              strokeWidth="10"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`flex flex-col items-center text-center ${ZIG_ZAG_OFFSETS[i % ZIG_ZAG_OFFSETS.length]}`}
              >
                <div
                  className={`relative grid place-items-center w-28 h-28 md:w-32 md:h-32 rounded-full text-brand-deep shadow-xl
                              ring-4 ring-white/90 ${item.bg}`}
                >
                  {item.icon && <div className="mb-1 opacity-90">{item.icon}</div>}
                  <span className="px-3 font-semibold text-sm md:text-base leading-tight">
                    {item.label}
                  </span>
                </div>
                <p className="mt-4 text-xs md:text-sm text-slate-700 leading-snug max-w-[14rem]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
