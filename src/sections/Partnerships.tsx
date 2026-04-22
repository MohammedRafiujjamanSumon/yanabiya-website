import Section, { H2 } from '../components/Section'
import { partners, valuableClients, memberships } from '../data/partners'

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
  const loop = [...items, ...items]
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="group relative overflow-hidden">
      <div
        className={`flex ${animClass} marquee-pause gap-6 w-max py-2`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {loop.map((p, i) => (
          <div
            key={`${p.name}-${i}`}
            className="bg-white rounded-xl p-5 h-24 w-44 grid place-items-center shrink-0 shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="max-h-14 max-w-full object-contain"
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
      <div className="container-x text-center max-w-3xl mx-auto mb-12">
        <H2 className="text-center">Trusted Network</H2>
        <p className="mt-5 text-slate-600">
          Connecting Opportunities Worldwide to Build Strong, Scalable Global Businesses.
        </p>
      </div>

      {/* Technology Partners */}
      <div id="partners" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6">
          Our Partners
        </h3>
        <LogoMarquee items={partners} direction="left" durationSec={55} />
      </div>

      {/* Valuable Clients */}
      <div id="clients" className="mb-12 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6">
          Our Clients
        </h3>
        <LogoMarquee items={valuableClients} direction="right" durationSec={75} />
      </div>

      {/* Memberships / Sponsors */}
      <div id="sponsors" className="mb-4 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6">
          Our Sponsors
        </h3>
        <LogoMarquee items={memberships} direction="left" durationSec={45} />
      </div>
    </Section>
  )
}
