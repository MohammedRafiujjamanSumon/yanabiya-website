import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────── Five leadership pillars (zigzag layout) ─────────
 *
 *   01 Strategic Board & Advisory   — Board of Directors + Advisory Board
 *   02 Global CEO & Co-Founders     — Vision + Engineering + Revenue + Ops
 *   03 Executive Management         — COO / CFO / CTO / CMO / CHRO
 *   04 Country Partners & Heads     — 4 regional founders + local management
 *   05 High-Skill Execution Engine  — AI · Software · Strategy · Design · Delivery
 *
 * Each pillar links to its dedicated page (some already exist —
 * /leadership/management, /leadership/professionals — others are
 * scaffolded so the wiring works end-to-end). */

type Pillar = {
  name: string
  href: string
  /** Real photo for the top half of the card. */
  image: string
  /** Card gradient (bottom half + outer glow). */
  from: string
  to: string
  glow: string
}

const PILLARS: Pillar[] = [
  {
    name: 'Strategic Board & Advisory',
    href: '/leadership/management',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80',
    from: '#a7f3d0', to: '#059669',
    glow: 'rgba(5,150,105,0.35)',
  },
  {
    name: 'Global CEO & Co-Founders',
    href: '/leadership/management',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80',
    from: '#bae6fd', to: '#0284c7',
    glow: 'rgba(2,132,199,0.35)',
  },
  {
    name: 'Executive Management',
    href: '/leadership/professionals',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    from: '#e9d5ff', to: '#7e22ce',
    glow: 'rgba(126,34,206,0.35)',
  },
  {
    name: 'Country Partners & Heads',
    href: '/leadership/professionals',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
    from: '#fde68a', to: '#d97706',
    glow: 'rgba(217,119,6,0.35)',
  },
  {
    name: 'High-Skill Execution Engine',
    href: '/leadership/professionals',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    from: '#fecdd3', to: '#e11d48',
    glow: 'rgba(225,29,72,0.35)',
  },
]

export default function Leadership() {
  const { t } = useTranslation()

  return (
    <Section id="leadership" className="relative overflow-hidden bg-[#fbfdfb]">
      {/* Ambient background glows */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10">
          <Reveal>
            <Eyebrow>{t('leadership.eyebrow', 'Leadership')}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-[16px]
                           leading-snug tracking-tight text-brand-deep lg:whitespace-nowrap mt-1">
              Experienced leadership across four continents,{' '}
              <span className="italic text-brand-accentDark">anchored by integrity and execution.</span>
            </h2>
          </Reveal>
        </div>

        {/* TINY CARDS — 5 in a row. Top half = real photo, bottom half =
         *  solid gradient. No text or number chip. */}
        <div className="relative max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 justify-items-center">
            {PILLARS.map((p, i) => (
              <Reveal key={p.href + i} delay={i * 90} className="w-full max-w-[180px]">
                <Link
                  to={p.href}
                  aria-label={`Open ${p.name} page`}
                  className="group relative block rounded-xl overflow-hidden
                             border border-white/40
                             shadow-[0_10px_24px_-12px_var(--tw-shadow-color)]
                             transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                             hover:-translate-y-1
                             hover:shadow-[0_16px_36px_-12px_var(--tw-shadow-color)]"
                  style={{ ['--tw-shadow-color' as never]: p.glow }}
                >
                  <div className="aspect-[3/4] flex flex-col">
                    {/* Top half — real photo */}
                    <div className="relative h-1/2 w-full overflow-hidden bg-slate-200">
                      <img
                        src={p.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover
                                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                                   group-hover:scale-105"
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                      />
                    </div>
                    {/* Bottom half — solid gradient block with the pillar name */}
                    <div
                      className="relative h-1/2 w-full grid place-items-center px-2 text-center"
                      style={{ backgroundImage: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)` }}
                    >
                      <span className="font-semibold text-white text-[12px] md:text-[13px]
                                       leading-tight tracking-tight
                                       drop-shadow-[0_1px_3px_rgba(0,0,0,0.45)]">
                        {p.name}
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* CTA — opens the full leadership overview */}
        <div className="text-center mt-8 md:mt-10">
          <Reveal>
            <Link
              to="/leadership"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                         transition-all duration-300"
            >
              Explore Leadership <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
