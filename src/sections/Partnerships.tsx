import { useRef } from 'react'
import type React from 'react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { partners, valuableClients, memberships, affiliations } from '../data/partners'

type Item = { name: string; logo: string }

function LogoMarquee({
  items,
  direction = 'left',
  durationSec = 70,
}: {
  items: Item[]
  direction?: 'left' | 'right'
  durationSec?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  const pause  = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'  }
  const resume = () => { if (trackRef.current) trackRef.current.style.animationPlayState = 'running' }

  const minTiles = 20
  const repeats  = Math.max(1, Math.ceil(minTiles / Math.max(items.length, 1)))
  const half     = Array(repeats).fill(items).flat()
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
        className={`flex ${animClass} w-max py-4 gap-2 [animation-timing-function:linear] [will-change:transform]`}
        style={{ animationDuration: `${durationSec}s` } as React.CSSProperties}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="group relative shrink-0 w-36 h-24 rounded-3xl overflow-hidden
                       bg-brand-accent/10 hover:bg-brand-deep
                       flex items-center justify-center p-2
                       transition-all duration-300 ease-out cursor-pointer
                       hover:-translate-y-1
                       hover:shadow-[0_8px_24px_rgba(15,58,35,0.20)]"
          >
            {/* Logo — visible while moving, fades out on hover */}
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-contain p-3
                         brightness-110 mix-blend-multiply
                         opacity-100 group-hover:opacity-0
                         transition-opacity duration-300"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />

            {/* Company name — shows on hover only */}
            <span className="relative z-10 text-[11px] font-bold tracking-widest
                             text-center text-brand-accent uppercase px-2 leading-tight
                             opacity-0 scale-90
                             group-hover:opacity-100 group-hover:scale-100
                             transition-all duration-300">
              {p.name}
            </span>
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0  w-24 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none z-10" />
    </div>
  )
}

export default function Partnerships() {
  return (
    <Section id="partnerships" className="bg-stone-50">
      <div className="container-x text-center mx-auto pt-2 md:pt-3 pb-4 md:pb-6 mb-10">
        <Eyebrow>Trusted Network</Eyebrow>
        <H2 className="!text-[18px] md:!text-[20px] text-center">
          Connecting opportunities worldwide. Building strong, scalable global businesses.
        </H2>
      </div>

      <div id="clients" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Valuable Clients
        </h3>
        <LogoMarquee items={valuableClients} direction="right" durationSec={70} />
      </div>

      <div id="sponsors" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Our Membership
        </h3>
        <LogoMarquee items={memberships} direction="left" durationSec={70} />
      </div>

      <div id="partners" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Our Partners
        </h3>
        <LogoMarquee items={partners} direction="left" durationSec={70} />
      </div>

      <div id="affiliations" className="mb-4 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Affiliations
        </h3>
        <LogoMarquee items={affiliations} direction="right" durationSec={70} />
      </div>
    </Section>
  )
}
