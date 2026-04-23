import { useEffect, useState } from 'react'
import Section, { H2 } from '../components/Section'
import { partners, valuableClients, memberships } from '../data/partners'

const aboutNetworkParagraphs = [
  "We collaborate with a diverse global ecosystem of technology leaders, strategic partners, sponsors, and valued clients who share our commitment to innovation, excellence, and sustainable growth. These relationships are founded on trust, transparency, and consistent performance, forming the core strength of everything we build and deliver.",
  "Together, we enable organizations to achieve enterprise-level efficiency, scale with confidence, and stay resilient in an increasingly fast-moving digital economy. Through close collaboration and continuous innovation, we transform ideas into impactful, future-ready solutions that create long-term value.",
  "Every partnership we establish reflects our dedication to quality, reliability, and measurable outcomes. We work hand in hand with our ecosystem to ensure alignment with global standards, industry best practices, and evolving business needs.",
  "At the heart of our approach is a simple yet powerful belief: lasting success is achieved together through trust, innovation, and shared ambition.",
]

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
  const [readMoreOpen, setReadMoreOpen] = useState(false)

  useEffect(() => {
    if (!readMoreOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setReadMoreOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [readMoreOpen])

  return (
    <Section id="partnerships" className="bg-stone-50">
      <div className="container-x text-center mx-auto mb-12">
        <H2 className="text-center">Trusted Network</H2>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-slate-600">
          <span>Connecting Opportunities Worldwide to Build Strong, Scalable Global Businesses.</span>
          <button
            type="button"
            onClick={() => setReadMoreOpen(true)}
            className="inline-flex items-center gap-2 rounded-full
                       bg-brand-accent px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white
                       shadow-sm transition-all hover:bg-brand-accentDark
                       hover:shadow-md
                       focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
          >
            Read More
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>

      {readMoreOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="About our Trusted Network"
          onClick={() => setReadMoreOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-slate-900/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto
                       bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setReadMoreOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900 text-center">
              Trusted Network
            </h3>
            <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
              {aboutNetworkParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}

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
          Valuable Clients
        </h3>
        <LogoMarquee items={valuableClients} direction="right" durationSec={75} />
      </div>

      {/* Our Membership */}
      <div id="sponsors" className="mb-4 scroll-mt-28">
        <h3 className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6">
          Our Membership
        </h3>
        <LogoMarquee items={memberships} direction="left" durationSec={45} />
      </div>
    </Section>
  )
}
