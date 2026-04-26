import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, Award, Handshake, Users2,
  X as CloseIcon, ArrowRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import BackButton from '../components/BackButton'
import { partners, valuableClients, memberships } from '../data/partners'
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

/* ───────────── Category model ───────────── */

type CategoryKey = 'technology' | 'memberships' | 'clients'

type Category = {
  key: CategoryKey
  title: string
  shortLabel: string
  body: string
  icon: LucideIcon
  items: { name: string; logo: string }[]
  /** workflow node position on the canvas (% of 100) */
  x: number
  y: number
}

const CATEGORIES: Category[] = [
  {
    key: 'technology',
    title: 'Technology Partners',
    shortLabel: 'Technology',
    body: 'Hyperscalers, enterprise software, and hardware platforms behind our IT and trade systems.',
    icon: Handshake,
    items: partners,
    x: 14,
    y: 16,
  },
  {
    key: 'memberships',
    title: 'Memberships',
    shortLabel: 'Memberships',
    body: 'Industry bodies and accreditations that anchor our cross-border operations.',
    icon: Award,
    items: memberships,
    x: 14,
    y: 50,
  },
  {
    key: 'clients',
    title: 'Valuable Clients',
    shortLabel: 'Clients',
    body: 'A selection of organisations we have delivered for — across sectors and countries.',
    icon: Users2,
    items: valuableClients,
    x: 14,
    y: 84,
  },
]

const HUB_X = 86
const HUB_Y = 50

/* ───────────── Workflow card ───────────── */

function NetworkWorkflow({
  onSelect,
  onSelectHub,
}: {
  onSelect: (k: CategoryKey) => void
  onSelectHub: () => void
}) {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="relative rounded-2xl bg-white border border-slate-200
                      shadow-[0_18px_40px_-16px_rgba(15,58,35,0.18)] overflow-hidden">
        {/* IDE toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-brand-accent" />
            <span className="ml-3 text-[10px] font-mono text-slate-500 tracking-wide">
              yanabiya-group.network
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-accentDark">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Live
          </div>
        </div>

        {/* Canvas — squarer on mobile, landscape on desktop so the HQ +
         *  3 nodes don't crowd each other. */}
        <div className="relative aspect-[5/6] md:aspect-[21/14] bg-[#fafbf8]">
          {/* Dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.45]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(15,58,35,0.12) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Connection lines */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            {CATEGORIES.map((c, i) => {
              const sx = HUB_X
              const sy = HUB_Y
              const ex = c.x
              const ey = c.y
              const cx1 = sx + (ex - sx) * 0.6
              const cy1 = sy
              const path = `M ${sx} ${sy} C ${cx1} ${cy1}, ${ex + 6} ${ey}, ${ex} ${ey}`
              return (
                <g key={c.key}>
                  <path d={path} fill="none" stroke="rgba(15,58,35,0.25)" strokeWidth="0.32" />
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(158,199,58,0.95)"
                    strokeWidth="0.4"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                  />
                </g>
              )
            })}
          </svg>

          {/* HUB */}
          <button
            type="button"
            onClick={onSelectHub}
            aria-label="Open the full trusted network overview"
            className="group/hub absolute z-10"
            style={{ left: `${HUB_X}%`, top: `${HUB_Y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative">
              <span className="absolute inset-0 rounded-2xl bg-brand-accent/35 blur-md animate-pulse" />
              <span aria-hidden="true"
                    className="absolute -inset-1 rounded-2xl bg-brand-accent
                               opacity-0 group-hover/hub:opacity-100 blur-sm transition-opacity duration-300" />
              <div className="relative w-[88px] h-[88px] md:w-[140px] md:h-[140px] rounded-2xl bg-white
                              ring-2 ring-brand-accent shadow-[0_12px_30px_-8px_rgba(15,58,35,0.5)]
                              grid place-items-center overflow-hidden
                              transition-transform duration-300
                              group-hover/hub:scale-105">
                <img
                  src={assets.logo}
                  alt="Yanabiya Group"
                  className="w-full h-full object-contain p-3"
                />
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap">
                <span className="inline-flex items-center gap-1.5 rounded-full
                                 bg-brand-deep text-brand-accent
                                 px-2.5 py-0.5
                                 text-[9px] font-bold tracking-[0.3em] uppercase
                                 shadow-md">
                  <span className="w-1 h-1 rounded-full bg-brand-accent animate-pulse" />
                  Group HQ · Tap
                </span>
              </div>
            </div>
          </button>

          {/* Category nodes */}
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => onSelect(c.key)}
                aria-label={c.title}
                className="group absolute z-10"
                style={{ left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="flex items-center gap-3 rounded-2xl bg-white
                                border border-slate-200 px-4 py-3
                                shadow-[0_6px_16px_rgba(15,58,35,0.10)]
                                transition-all duration-300
                                group-hover:border-brand-deep group-hover:-translate-y-0.5
                                group-hover:shadow-[0_14px_32px_-8px_rgba(15,58,35,0.30)]">
                  <span className="shrink-0 grid place-items-center w-11 h-11 rounded-xl
                                   bg-brand-accent/15 text-brand-deep
                                   transition-all duration-300
                                   group-hover:bg-brand-accent group-hover:text-white">
                    <Icon size={18} strokeWidth={1.7} />
                  </span>
                  <div className="text-left">
                    <div className="text-[12.5px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                      {c.shortLabel}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 tracking-wide leading-none mt-1">
                      0{i + 1} · {c.items.length} entries
                    </div>
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-accent
                             shadow-[0_0_8px_rgba(158,199,58,0.7)]"
                  style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.3}s infinite` }}
                />
              </button>
            )
          })}

          <div className="absolute top-3 left-4 text-[9px] font-mono text-slate-400 tracking-wide">
            3 nodes · live signal
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-400 tracking-wide">
            tap a node →
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────── Slide-in panel ───────────── */

function CategoryPanel({
  selected,
  onClose,
  onSelect,
}: {
  selected: CategoryKey | 'overview' | null
  onClose: () => void
  onSelect: (k: CategoryKey) => void
}) {
  useEffect(() => {
    if (!selected) return
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
  }, [selected, onClose])

  if (!selected) return null

  // OVERVIEW mode — HQ click. Lists all 3 categories.
  if (selected === 'overview') {
    return (
      <PanelShell onClose={onClose} ariaLabel="All trusted-network categories" wide>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-brand-deep grid place-items-center
                          ring-2 ring-brand-accent overflow-hidden">
            <img src={assets.logo} alt="" className="w-9 h-9 object-contain bg-white rounded p-0.5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
              Group HQ
            </div>
            <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
              Trusted Network
            </h3>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Three pillars of the network behind Yanabiya Group's delivery — tap a category to explore in detail.
        </p>

        <div className="mt-7 space-y-2.5">
          {CATEGORIES.map((c, i) => {
            const Icon = c.icon
            const num = String(i + 1).padStart(2, '0')
            return (
              <button
                type="button"
                key={c.key}
                onClick={() => onSelect(c.key)}
                className="group w-full flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200
                           px-3 py-3 text-left transition-all duration-300
                           hover:bg-brand-accent/8 hover:border-brand-deep/40 hover:translate-x-1"
              >
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                                 bg-brand-accent/15 text-brand-deep
                                 transition-colors duration-300
                                 group-hover:bg-brand-deep group-hover:text-white">
                  <Icon size={18} strokeWidth={1.7} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {c.body}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-[10px] text-slate-400">
                  {num}
                </span>
                <ArrowRight size={12} className="shrink-0 text-slate-400 group-hover:text-brand-deep transition-colors" />
              </button>
            )
          })}
        </div>
      </PanelShell>
    )
  }

  // SINGLE CATEGORY mode
  const c = CATEGORIES.find((x) => x.key === selected)
  if (!c) return null
  const Icon = c.icon

  return (
    <PanelShell onClose={onClose} ariaLabel={`${c.title} detail`} wide>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-deep
                        ring-1 ring-brand-accent/30">
          <Icon size={22} strokeWidth={1.6} />
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
            Network · {c.items.length} entries
          </div>
          <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
            {c.title}
          </h3>
        </div>
      </div>

      <p className="mt-5 text-sm text-slate-600 leading-relaxed">
        {c.body}
      </p>

      {/* Logo grid */}
      <div className="mt-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {c.items.map((p, i) => (
          <div
            key={p.name + i}
            title={p.name}
            className="group h-full rounded-xl bg-white border border-slate-200
                       p-3 aspect-[5/3] flex items-center justify-center
                       transition-all duration-300
                       hover:border-brand-accent/50 hover:-translate-y-0.5
                       hover:shadow-[0_12px_28px_-12px_rgba(158,199,58,0.45)]"
          >
            <img
              src={p.logo}
              alt={p.name}
              loading="lazy"
              className="max-h-full max-w-full object-contain
                         grayscale opacity-80 transition-all duration-300
                         group-hover:grayscale-0 group-hover:opacity-100"
              onError={(e) => {
                const img = e.currentTarget
                img.style.display = 'none'
                const parent = img.parentElement
                if (parent && !parent.querySelector('.fallback')) {
                  const span = document.createElement('span')
                  span.className = 'fallback text-[10px] font-semibold uppercase tracking-wider text-slate-400 text-center'
                  span.textContent = p.name
                  parent.appendChild(span)
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3
                     bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                     hover:bg-brand-accentDark transition-colors"
        >
          Become a Partner <ArrowRight size={14} />
        </Link>
      </div>
    </PanelShell>
  )
}

function PanelShell({
  children,
  onClose,
  ariaLabel,
  wide,
}: {
  children: React.ReactNode
  onClose: () => void
  ariaLabel: string
  wide?: boolean
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className={`absolute top-0 right-0 h-full w-full ${wide ? 'sm:w-[520px] md:w-[620px]' : 'sm:w-[440px] md:w-[500px]'}
                   bg-white shadow-[0_0_60px_rgba(0,0,0,0.35)]
                   border-l border-brand-accent/30
                   overflow-y-auto`}
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
          {children}
        </div>
      </aside>
    </div>
  )
}

/* ───────────── Page ───────────── */

export default function Partners() {
  const [selected, setSelected] = useState<CategoryKey | 'overview' | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    // Deep-link via hash → opens corresponding panel
    const hash = window.location.hash.replace('#', '') as CategoryKey | ''
    if (hash === 'technology' || hash === 'memberships' || hash === 'clients') {
      setSelected(hash)
    }
  }, [])

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      {/* HEADER + WORKFLOW — same 2-col pattern as /#businesses */}
      <section className="relative">
        <div className="container-x py-14 md:py-20">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT — workflow card (lg:col-span-8) */}
            <Reveal delay={200} className="lg:col-span-8">
              <NetworkWorkflow
                onSelect={(k) => setSelected(k)}
                onSelectHub={() => setSelected('overview')}
              />
            </Reveal>

            {/* RIGHT — header (lg:col-span-4) */}
            <div className="lg:col-span-4">
              <Reveal>
                <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4 inline-flex items-center gap-2">
                  <Sparkles size={12} className="text-brand-accent" />
                  Trusted Network
                  <Sparkles size={12} className="text-brand-accent" />
                </div>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] leading-[1.05] tracking-tight text-brand-deep">
                  Three pillars.
                  <span className="block text-brand-accentDark">One network.</span>
                </h1>
              </Reveal>
              <Reveal delay={260}>
                <p className="mt-5 text-base text-slate-600 leading-relaxed max-w-md">
                  Tap a node — or the HQ for the full network at once.
                </p>
              </Reveal>
              <Reveal delay={400}>
                <div className="mt-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-brand-accentDark font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  Live signal · 3 active nodes
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CategoryPanel
        selected={selected}
        onClose={() => setSelected(null)}
        onSelect={(k) => setSelected(k)}
      />
    </main>
  )
}
