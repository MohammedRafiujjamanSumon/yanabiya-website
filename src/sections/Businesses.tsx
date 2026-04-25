import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, X as CloseIcon, ExternalLink } from 'lucide-react'
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

/* Service Workflow — n8n.io-inspired canvas card with a Yanabiya hub on
 * the left and 6 service nodes laid out to the right, each connected to
 * the hub by a curved bezier line with a flowing mint signal. Clicking
 * any node opens a slide-in detail panel on the right edge. */

type WorkflowNode = {
  slug: string
  x: number   // % of canvas
  y: number   // % of canvas
}

const WORKFLOW_NODES: WorkflowNode[] = [
  { slug: 'it-software',       x: 38, y: 18 },
  { slug: 'export-import',     x: 60, y: 18 },
  { slug: 'clothing',          x: 82, y: 28 },
  { slug: 'agents-brokerage',  x: 38, y: 82 },
  { slug: 'office-management', x: 60, y: 82 },
  { slug: 'manpower',          x: 82, y: 72 },
]

const HUB_X = 14
const HUB_Y = 50

function ServiceWorkflow({ onSelect }: { onSelect: (slug: string) => void }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Editor-like card */}
      <div className="relative rounded-2xl bg-white border border-slate-200
                      shadow-[0_18px_40px_-16px_rgba(15,58,35,0.18)] overflow-hidden">
        {/* Top toolbar — IDE feel */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
            <span className="ml-3 text-[10px] font-mono text-slate-500 tracking-wide">
              yanabiya-group.workflow
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-accentDark">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Live
          </div>
        </div>

        {/* Canvas */}
        <div className="relative aspect-[21/10] bg-[#fafbf8]">
          {/* Subtle dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(15,58,35,0.12) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Connection lines (curved bezier per node → hub) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            {WORKFLOW_NODES.map((n, i) => {
              const sx = HUB_X
              const sy = HUB_Y
              const ex = n.x
              const ey = n.y
              // control point in the middle for a soft curve
              const cx1 = sx + (ex - sx) * 0.6
              const cy1 = sy
              const path = `M ${sx} ${sy} C ${cx1} ${cy1}, ${ex - 6} ${ey}, ${ex} ${ey}`
              return (
                <g key={n.slug}>
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(15,58,35,0.25)"
                    strokeWidth="0.32"
                  />
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(158,199,58,0.95)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.4}s`, animationDuration: '5s' }}
                  />
                </g>
              )
            })}
          </svg>

          {/* HUB — Yanabiya */}
          <div
            className="absolute z-10"
            style={{ left: `${HUB_X}%`, top: `${HUB_Y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-2xl bg-brand-accent/30 blur-md animate-pulse" />
              <div className="relative w-[120px] rounded-2xl bg-brand-deep text-white
                              ring-2 ring-brand-accent shadow-[0_10px_30px_-8px_rgba(15,58,35,0.5)]
                              p-3 flex flex-col items-center gap-1.5">
                <img
                  src={assets.logo}
                  alt="Yanabiya"
                  className="h-9 w-auto object-contain bg-white rounded-md p-1"
                />
                <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-brand-accent">
                  Group HQ
                </div>
              </div>
            </div>
          </div>

          {/* Service nodes */}
          {WORKFLOW_NODES.map((n, i) => {
            const b = businesses.find((bb) => bb.slug === n.slug)
            if (!b) return null
            const display = BUSINESS_DISPLAY[n.slug] ?? { title: b.title, tag: '', sample: [] }
            const Icon = b.icon
            return (
              <button
                key={n.slug}
                type="button"
                onClick={() => onSelect(n.slug)}
                aria-label={display.title}
                className="group absolute z-10"
                style={{ left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex items-center gap-2.5 rounded-xl bg-white
                                border border-slate-200 px-3 py-2.5
                                shadow-[0_4px_12px_rgba(15,58,35,0.08)]
                                transition-all duration-300
                                group-hover:border-brand-deep group-hover:-translate-y-0.5
                                group-hover:shadow-[0_12px_28px_-8px_rgba(15,58,35,0.28)]">
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg
                                   bg-brand-accent/15 text-brand-deep
                                   transition-all duration-300
                                   group-hover:bg-brand-accent group-hover:text-white">
                    <Icon size={16} strokeWidth={1.7} />
                  </span>
                  <div className="text-left">
                    <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                      {display.title}
                    </div>
                    <div className="text-[8.5px] font-mono text-slate-400 tracking-wide leading-none mt-0.5">
                      0{i + 1} · {n.slug}
                    </div>
                  </div>
                </div>
                {/* Pulsing arrival dot anchored on the inbound edge */}
                <span
                  aria-hidden="true"
                  className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent
                             shadow-[0_0_8px_rgba(158,199,58,0.7)]"
                  style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.3}s infinite` }}
                />
              </button>
            )
          })}

          {/* Editorial chrome */}
          <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-400 tracking-wide">
            6 nodes · live signal
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-400 tracking-wide">
            tap a node →
          </div>
        </div>
      </div>
    </div>
  )
}

/* Slide-in detail panel for a clicked workflow node */
function NodeDetailPanel({
  slug,
  onClose,
}: {
  slug: string | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!slug) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [slug, onClose])

  if (!slug) return null
  const b = businesses.find((bb) => bb.slug === slug)
  if (!b) return null
  const display = BUSINESS_DISPLAY[slug] ?? { title: b.title, tag: '', sample: [] }
  const Icon = b.icon

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${display.title} division detail`}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-full w-full sm:w-[440px] md:w-[500px]
                   bg-white shadow-[0_0_60px_rgba(0,0,0,0.35)]
                   border-l border-brand-accent/30
                   overflow-y-auto"
        style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        <div aria-hidden="true" className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full
                     bg-slate-100 hover:bg-slate-200 border border-slate-200
                     grid place-items-center text-slate-700 hover:text-brand-deep transition-colors"
        >
          <CloseIcon size={16} />
        </button>

        <div className="relative p-7 md:p-9">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-deep
                            ring-1 ring-brand-accent/30">
              <Icon size={22} strokeWidth={1.6} />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
                Division
              </div>
              <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
                {display.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-600 leading-relaxed">
            {display.tag}
          </p>

          {/* Sub-services */}
          {display.sample.length > 0 && (
            <>
              <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accentDark mb-3">
                What's Inside
              </div>
              <ul className="space-y-2">
                {display.sample.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2
                               text-sm text-slate-700 flex items-baseline gap-2"
                  >
                    <span className="block w-1 h-1 rounded-full bg-brand-accent shrink-0 translate-y-[-2px]" />
                    {s}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Sub-services count from real data */}
          {b.subServices && b.subServices.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-full
                            bg-brand-deep/5 border border-brand-deep/15 px-3 py-1
                            text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
              <span className="font-mono">{b.subServices.length.toString().padStart(2, '0')}</span>
              Total Services
            </div>
          )}

          {/* CTA out to detail page */}
          <div className="mt-8">
            <Link
              to={`/business/${slug}`}
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3
                         bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                         hover:bg-brand-accentDark transition-colors"
            >
              Open Full Page
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default function Businesses() {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <Section id="businesses" className="relative overflow-hidden bg-white">
      {/* Soft ambient mint glow on the white surface */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 right-1/3 w-[520px] h-[520px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute -bottom-40 left-1/3 w-[460px] h-[460px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x py-14 md:py-20 relative">

        {/* HEADER + WORKFLOW — 2-col split (workflow left, header right) */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-12">

          {/* LEFT — workflow canvas (lg:col-span-7) */}
          <Reveal delay={200} className="lg:col-span-7">
            <ServiceWorkflow onSelect={(s) => setSelected(s)} />
          </Reveal>

          {/* RIGHT — header text (lg:col-span-5) */}
          <div className="lg:col-span-5">
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
            <Reveal delay={260}>
              <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-md">
                Tap any node on the live workflow to open its profile — or scroll
                to the cards below for the full breakdown.
              </p>
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-brand-accentDark font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                Live signal · 6 active nodes
              </div>
            </Reveal>
          </div>
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

      {/* Slide-in detail panel for the workflow node click */}
      <NodeDetailPanel slug={selected} onClose={() => setSelected(null)} />
    </Section>
  )
}
