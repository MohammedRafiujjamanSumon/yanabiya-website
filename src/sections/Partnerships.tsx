import Section, { Eyebrow, H2 } from '../components/Section'
import { partners, valuableClients, memberships, affiliations } from '../data/partners'

type Item = { name: string; logo: string }

function LogoMarquee({
  items,
  direction = 'left',
  durationSec = 50,
}: {
  items: Item[]
  direction?: 'left' | 'right'
  durationSec?: number
}) {
  const minTiles = 10
  const repeats = Math.max(1, Math.ceil(minTiles / Math.max(items.length, 1)))
  const half = Array(repeats).fill(items).flat()
  const loop = [...half, ...half]
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="relative overflow-hidden [perspective:1400px]">
      {/* Strip keeps moving forever — no group-pause, so the chain never stops.
       *  Individual tiles react on their own when touched / hovered. */}
      <div
        className={`flex ${animClass} gap-10 w-max py-4 [transform-style:preserve-3d]`}
        style={{
          animationDuration: `${durationSec}s`,
          animationTimingFunction: 'linear',
          willChange: 'transform',
        }}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            tabIndex={0}
            className="relative h-32 w-44 p-3 mx-1 shrink-0 rounded-lg
                       bg-white border border-slate-200/70
                       shadow-[0_4px_10px_-4px_rgba(15,23,42,0.10)]
                       flex items-center justify-center
                       [transform-style:preserve-3d]
                       transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                       hover:[transform:rotateY(8deg)_rotateX(-5deg)_translateZ(20px)_scale(1.06)]
                       hover:shadow-[0_22px_44px_-14px_rgba(15,23,42,0.30)]
                       hover:border-brand-accent/50
                       focus-visible:[transform:rotateY(8deg)_rotateX(-5deg)_translateZ(20px)_scale(1.06)]
                       focus-visible:shadow-[0_22px_44px_-14px_rgba(15,23,42,0.30)]
                       focus-visible:border-brand-accent/50
                       focus:outline-none"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="block max-w-full max-h-full m-auto object-contain"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 end-0 w-32 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none" />
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

      {/* Valuable Clients */}
      <div id="clients" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Valuable Clients
        </h3>
        <LogoMarquee items={valuableClients} direction="right" durationSec={75} />
      </div>

      {/* Our Membership */}
      <div id="sponsors" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Our Membership
        </h3>
        <LogoMarquee items={memberships} direction="left" durationSec={45} />
      </div>

      {/* Technology Partners */}
      <div id="partners" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Our Partners
        </h3>
        <LogoMarquee items={partners} direction="left" durationSec={55} />
      </div>

      {/* Affiliations */}
      <div id="affiliations" className="mb-4 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark tracking-[0.18em] text-sm md:text-base font-bold mb-6">
          Affiliations
        </h3>
        <LogoMarquee items={affiliations} direction="right" durationSec={45} />
      </div>
    </Section>
  )
}
