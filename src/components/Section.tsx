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
    <div className="text-center mb-5">
      <h2 className={`group inline-block relative font-serif uppercase tracking-[0.18em]
                     text-2xl md:text-3xl lg:text-4xl font-bold ${color} cursor-default
                     after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                     after:h-[3px] after:bg-brand-accent after:rounded-full
                     after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                     hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100`}>
        {children}
      </h2>
    </div>
  )
}

export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  // Standard section heading scale used across the home flow.
  // Mobile → desktop: 24 / 30 / 36 / 42 px. Keep all `<H2>` consumers
  // on this scale unless a section needs a deliberate, documented exception.
  return (
    <h2
      className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px]
                  leading-[1.15] tracking-tight text-slate-900 ${className}`}
    >
      {children}
    </h2>
  )
}
