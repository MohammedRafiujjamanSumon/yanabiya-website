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
  const color = tone === 'light' ? 'text-white' : 'text-brand-accentDark'
  return (
    <div className="text-center mb-2">
      <span className={`inline-block font-semibold tracking-[0.28em] uppercase
                        text-[14px] ${color}`}>
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
