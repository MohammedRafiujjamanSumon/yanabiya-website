import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Section from '../components/Section'
import { businesses } from '../data/businesses'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'

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

/* Short, plain-English overrides + 3 sub-service teasers per division.
 * Verbose names kept in /data/businesses.ts for the /business/<slug> pages. */
const BUSINESS_DISPLAY: Record<
  string,
  { title: string; tag: string; sample: string[] }
> = {
  'it-software':       { title: 'Tech & Software',  tag: 'Custom software, cloud, AI.',         sample: ['Software', 'Cloud', 'Cyber Security'] },
  'export-import':     { title: 'Global Trade',     tag: 'Sourcing, freight, fulfilment.',      sample: ['Freight', 'Customs', 'Warehousing'] },
  'clothing':          { title: 'Apparel',          tag: 'Private label, sourcing, retail.',    sample: ['Private Label', 'Sourcing', 'QA'] },
  'agents-brokerage':  { title: 'Brokerage',        tag: 'Cross-border deals & partnerships.',  sample: ['Deals', 'Market Entry', 'Tenders'] },
  'office-management': { title: 'Office Services',  tag: 'Serviced offices, PRO, admin.',       sample: ['Workspace', 'Accounting', 'PRO'] },
  'manpower':          { title: 'Global Mobility',  tag: 'Workforce, students, aviation.',      sample: ['Recruitment', 'Student Visa', 'Aviation'] },
}

/* Honeycomb-shape clip-path — pointy-top hex */
const HEX_CLIP =
  'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'

/* Service Honeycomb — 6 services arranged in a flower pattern around a
 * central Yanabiya hub. Each cell is a hexagonal tile (clip-path), and
 * the layout uses absolute positioning to lock the honeycomb shape. */
function ServiceHoneycomb() {
  // Tile width in px; height = w * 1.155 for pointy-top hex.
  // Positions are relative offsets from the centre hex (cx, cy) inside
  // a 480x480 container. The 6 surrounding hexes sit at 60° intervals.
  const cx = 240
  const cy = 240
  const w = 132              // hex tile width (px)
  const h = w * 1.155        // pointy-top hex height
  const dx = w * 0.75        // horizontal offset to a neighbour
  const dy = h * 0.5         // vertical offset to a neighbour

  const slots = [
    { dx: 0,    dy: -h          }, // top
    { dx:  dx,  dy: -dy         }, // top-right
    { dx:  dx,  dy:  dy         }, // bottom-right
    { dx: 0,    dy:  h          }, // bottom
    { dx: -dx,  dy:  dy         }, // bottom-left
    { dx: -dx,  dy: -dy         }, // top-left
  ]

  return (
    <div className="relative mx-auto w-full max-w-[480px] aspect-square">
      {/* Soft mint glow behind the hub */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="w-[60%] h-[60%] rounded-full bg-brand-accent/15 blur-[80px]" />
      </div>

      {/* CENTRE — Yanabiya hex hub */}
      <div
        className="absolute"
        style={{
          left: cx,
          top: cy,
          width: w,
          height: h,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="relative w-full h-full bg-brand-deep grid place-items-center"
          style={{ clipPath: HEX_CLIP }}
        >
          <div className="flex flex-col items-center gap-1.5">
            <img
              src={assets.logo}
              alt="Yanabiya Group"
              className="h-10 w-auto object-contain bg-white rounded p-1"
            />
            <div className="text-[8px] font-bold tracking-[0.3em] uppercase text-brand-accent">
              Yanabiya
            </div>
          </div>
        </div>
        {/* Mint outline overlay (sits just above the dark hex via a slightly bigger hex behind) */}
        <div
          aria-hidden="true"
          className="absolute -inset-[3px] -z-10 bg-brand-accent"
          style={{ clipPath: HEX_CLIP }}
        />
      </div>

      {/* 6 SERVICE HEXES around the centre */}
      {businesses.map((b, i) => {
        const slot = slots[i]
        const display = BUSINESS_DISPLAY[b.slug] ?? { title: b.title, tag: '', sample: [] }
        const Icon = b.icon
        return (
          <Link
            key={b.slug}
            to={`/business/${b.slug}`}
            className="group absolute"
            style={{
              left: cx + slot.dx,
              top: cy + slot.dy,
              width: w,
              height: h,
              transform: 'translate(-50%, -50%)',
            }}
            aria-label={display.title}
          >
            {/* Outer mint outline sits behind the white hex face */}
            <div
              aria-hidden="true"
              className="absolute -inset-[2px] bg-brand-deep/15
                         transition-all duration-300
                         group-hover:bg-brand-accent group-hover:-inset-[3px]"
              style={{ clipPath: HEX_CLIP }}
            />
            {/* White hex face with content */}
            <div
              className="relative w-full h-full bg-white grid place-items-center
                         transition-all duration-300
                         group-hover:bg-brand-accent/8"
              style={{ clipPath: HEX_CLIP }}
            >
              <div className="flex flex-col items-center gap-1.5 px-2 text-center">
                <span className="grid place-items-center w-9 h-9 rounded-full
                                 bg-brand-accent/15 text-brand-deep
                                 transition-all duration-300
                                 group-hover:bg-brand-deep group-hover:text-white
                                 group-hover:scale-110">
                  <Icon size={16} strokeWidth={1.6} />
                </span>
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-deep leading-tight">
                  {display.title}
                </span>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default function Businesses() {
  return (
    <Section id="businesses" className="relative overflow-hidden bg-white">
      {/* Soft ambient mint glow on the white surface */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/3 w-[520px] h-[520px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[460px] h-[460px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x py-14 md:py-20 relative">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} className="text-brand-accent" />
              Our Service
              <Sparkles size={12} className="text-brand-accent" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] tracking-tight text-brand-deep">
              Six divisions.
              <span className="block text-brand-accentDark">One group.</span>
            </h2>
          </Reveal>
        </div>

        {/* SERVICE HONEYCOMB — Yanabiya hub + 6 hexagonal service tiles */}
        <Reveal delay={200}>
          <ServiceHoneycomb />
        </Reveal>

        <div className="text-center mt-4 mb-10">
          <span className="text-[10px] uppercase tracking-[0.32em] text-slate-400 font-bold">
            Tap a hex — or browse the cards below
          </span>
        </div>

        {/* 6-card premium grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {businesses.map((b, i) => {
            const display = BUSINESS_DISPLAY[b.slug] ?? { title: b.title, tag: '', sample: [] }
            const subCount = b.subServices?.length ?? 0
            const num = String(i + 1).padStart(2, '0')
            return (
              <Reveal key={b.slug} delay={i * 70}>
                <Link
                  to={`/business/${b.slug}`}
                  className="group relative block h-full rounded-2xl bg-white border border-slate-200
                             p-6 shadow-[0_4px_12px_rgba(15,58,35,0.05)]
                             overflow-hidden
                             transition-all duration-500
                             hover:border-brand-deep/50 hover:-translate-y-1.5
                             hover:shadow-[0_24px_50px_-14px_rgba(15,58,35,0.28)]"
                >
                  {/* Decorative serif numeral watermark — bottom-right */}
                  <span aria-hidden="true"
                        className="absolute -bottom-4 -right-2 font-serif text-[120px] font-bold leading-none
                                   text-brand-accent/[0.06] select-none pointer-events-none
                                   transition-colors duration-500
                                   group-hover:text-brand-accent/[0.14]">
                    {num}
                  </span>

                  {/* Hover gradient sweep */}
                  <span aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-br from-brand-accent/0 to-brand-accent/0
                                   opacity-0 group-hover:opacity-100 group-hover:from-brand-accent/8 group-hover:to-transparent
                                   transition-opacity duration-500 pointer-events-none" />

                  <div className="relative">
                    {/* Top row — icon + sub-service count */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-accent/15
                                      grid place-items-center text-brand-deep
                                      ring-1 ring-brand-accent/20
                                      transition-all duration-300
                                      group-hover:bg-brand-accent group-hover:text-white
                                      group-hover:ring-brand-accent group-hover:scale-110
                                      group-hover:rotate-3">
                        <b.icon size={22} strokeWidth={1.6} />
                      </div>
                      {subCount > 0 && (
                        <span className="inline-flex items-center gap-1 rounded-full
                                         bg-slate-50 border border-slate-200
                                         px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">
                          <span className="font-mono text-[10px] text-brand-deep">{subCount.toString().padStart(2, '0')}</span>
                          Services
                        </span>
                      )}
                    </div>

                    {/* Title + animated underline */}
                    <div className="mt-5">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-deep leading-tight">
                        {display.title}
                      </h3>
                      <span aria-hidden="true"
                            className="block mt-2 h-px bg-brand-accent w-8
                                       transition-all duration-500
                                       group-hover:w-20" />
                    </div>

                    {/* Tag */}
                    <p className="mt-3 text-[13px] text-slate-600 leading-snug">
                      {display.tag}
                    </p>

                    {/* Sub-service teaser chips — fade in on hover */}
                    {display.sample.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5
                                      opacity-0 -translate-y-1
                                      transition-all duration-500
                                      group-hover:opacity-100 group-hover:translate-y-0">
                        {display.sample.map((s) => (
                          <span key={s}
                                className="inline-block px-2 py-0.5 rounded-full
                                           bg-brand-accent/10 border border-brand-accent/30
                                           text-[9px] font-bold uppercase tracking-[0.18em] text-brand-deep">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between
                                    text-[10px] uppercase tracking-[0.22em] font-bold">
                      <span className="text-slate-400">Division · {num}</span>
                      <span className="inline-flex items-center gap-1 text-brand-accentDark
                                       transition-all duration-300
                                       group-hover:text-brand-deep group-hover:gap-2">
                        Explore <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
