import { useRef } from 'react'
import type React from 'react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { partners, valuableClients, ukValuableClients, memberships, affiliations } from '../data/partners'

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
            className="group shrink-0 flex items-center justify-center px-8 cursor-pointer"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="h-16 max-w-[140px] object-contain
                         opacity-85 group-hover:opacity-100
                         scale-100 group-hover:scale-125
                         transition-all duration-300"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-y-0 left-0  w-24 bg-gradient-to-r from-lime-100 to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-lime-100 to-transparent pointer-events-none z-10" />
    </div>
  )
}

export default function Partnerships() {
  return (
    <Section id="partnerships" className="bg-lime-100">
      <div className="container-x text-center mx-auto pt-1 pb-2 mb-4">
        <Eyebrow>Trusted Network</Eyebrow>
        <H2 className="!text-[18px] md:!text-[20px] text-center">
          Connecting opportunities worldwide. Building strong, scalable global businesses.
        </H2>
      </div>

      <div id="valuable-clients" className="mb-5 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-3">
          Our Valuable Clients
        </h3>
        <LogoMarquee items={ukValuableClients} direction="left" durationSec={60} />
      </div>

      <div id="clients" className="mb-5 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-3">
          Our Clients
        </h3>
        <LogoMarquee items={valuableClients} direction="right" durationSec={70} />
      </div>

      <div id="sponsors" className="mb-5 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-3">
          Our Membership
        </h3>
        <LogoMarquee items={memberships} direction="left" durationSec={70} />
      </div>

      <div id="partners" className="mb-5 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-3">
          Our Partners
        </h3>
        <LogoMarquee items={partners} direction="left" durationSec={70} />
      </div>

      <div id="affiliations" className="mb-2 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-3">
          Our Affiliations
        </h3>
        <LogoMarquee items={affiliations} direction="right" durationSec={70} />
      </div>
    </Section>
  )
}
