import { useRef } from 'react'
import type React from 'react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { partners, valuableClients, ukValuableClients, memberships, affiliations } from '../data/partners'
import { useReveal } from '../hooks/useReveal'

type Item = { name: string; logo: string }

function LogoMarquee({
  items,
  direction = 'left',
  durationSec = 60,
}: {
  items: Item[]
  direction?: 'left' | 'right'
  durationSec?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused' }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  const minTiles = 20
  const repeats  = Math.max(1, Math.ceil(minTiles / Math.max(items.length, 1)))
  const half     = Array(repeats).fill(items).flat() as Item[]
  const loop     = [...half, ...half]
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div
        ref={trackRef}
        className={`flex ${animClass} w-max py-3 gap-8 [animation-timing-function:linear] [will-change:transform]`}
        style={{ animationDuration: `${durationSec}s` } as React.CSSProperties}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="group shrink-0 flex items-center justify-center cursor-pointer"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="h-12 max-w-[140px] object-contain
                         opacity-25 grayscale
                         group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110
                         group-hover:drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]
                         active:opacity-100 active:grayscale-0 active:brightness-125 active:scale-110
                         transition-all duration-300"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0  w-16 bg-gradient-to-r from-brand-50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-brand-50 to-transparent pointer-events-none z-10" />
    </div>
  )
}

function SlideRow({
  label,
  items,
  direction,
  durationSec,
  delay,
}: {
  label: string
  items: Item[]
  direction: 'left' | 'right'
  durationSec: number
  delay: number
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className="mb-5 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: shown ? 1 : 0,
        transform: shown
          ? 'translateX(0)'
          : direction === 'left' ? 'translateX(-60px)' : 'translateX(60px)',
      }}
    >
      <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-xs font-bold mb-3 uppercase">
        {label}
      </h3>
      <LogoMarquee items={items} direction={direction} durationSec={durationSec} />
    </div>
  )
}

export default function Partnerships() {
  return (
    <Section id="partnerships" className="bg-brand-50">
      <div className="container-x">

        <div className="text-center pt-1 pb-6 mb-2">
          <Eyebrow>Trusted Network</Eyebrow>
          <H2 className="!text-[18px] md:!text-[20px] text-center">
            Connecting opportunities worldwide. Building strong, scalable global businesses.
          </H2>
        </div>

        <SlideRow label="Our Valuable Clients" items={ukValuableClients} direction="left"  durationSec={55} delay={0}   />
        <SlideRow label="Our Clients"           items={valuableClients}   direction="right" durationSec={65} delay={80}  />
        <SlideRow label="Our Membership"        items={memberships}       direction="left"  durationSec={60} delay={160} />
        <SlideRow label="Our Partners"          items={partners}          direction="right" durationSec={70} delay={240} />
        <SlideRow label="Our Affiliations"      items={affiliations}      direction="left"  durationSec={65} delay={320} />

      </div>
    </Section>
  )
}
