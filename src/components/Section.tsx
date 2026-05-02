import { ReactNode } from 'react'

interface Props {
  id: string
  className?: string
  children: ReactNode
}

export default function Section({ id, className = '', children }: Props) {
  return (
    <section id={id} className={`scroll-mt-24 section-pad ${className}`}>
      {children}
    </section>
  )
}

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: 'dark' | 'light' }) {
  const color = tone === 'light' ? 'text-brand-deep' : 'text-brand-accentDark'
  // Group + after:pseudo for the horizontal underline that scales in
  // from the centre on hover / focus / active (touch).
  return (
    <div className="text-center mb-2">
      <span className={`group relative inline-block font-semibold tracking-[0.28em] uppercase
                        text-[14px] ${color} cursor-default
                        after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1
                        after:h-[2px] after:bg-brand-accent after:rounded-full
                        after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                        hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100`}>
        {children}
      </span>
    </div>
  )
}

export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  // Compact heading — 16 px to match the user's design (size 14/16
  // pair for eyebrow + heading). No hover underline.
  return (
    <h2
      className={`font-serif text-[16px]
                  leading-snug tracking-tight text-brand-deep ${className}`}
    >
      {children}
    </h2>
  )
}
