import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles, MapPin, Building2, Briefcase, Globe2,
  X as CloseIcon, ArrowRight, ExternalLink, Plus, Minus, Crosshair,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { countries } from '../data/countries'
import { contactByCountry } from '../data/contact'
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

/* ───────────── Country pin coordinates on the world canvas ─────────────
 * Approximate equirectangular projection of the country capitals onto
 * a 100×56 (16:9) canvas. HQ is Oman; arcs flow outward from there. */
type Pin = { code: string; x: number; y: number; isHub?: boolean }

const PINS: Pin[] = [
  { code: 'US', x: 22, y: 28 },           // Austin, TX
  { code: 'GB', x: 47, y: 19 },           // London
  { code: 'OM', x: 62, y: 35, isHub: true }, // Muscat — HQ
  { code: 'BD', x: 75, y: 33 },           // Dhaka
]

/* ───────────── World Map ───────────── */

function WorldMap({
  onSelect,
  onSelectHub,
}: {
  onSelect: (code: string) => void
  onSelectHub: () => void
}) {
  const hub = PINS.find((p) => p.isHub)!
  const others = PINS.filter((p) => !p.isHub)

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div className="relative rounded-2xl bg-white border border-slate-200
                      shadow-[0_18px_40px_-16px_rgba(15,58,35,0.18)] overflow-hidden">
        {/* Map toolbar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50/60">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono text-slate-500 tracking-wide">
            <Crosshair size={12} className="text-brand-accentDark" />
            yanabiya-group.world
          </div>
          <div className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-brand-accentDark">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            Live · 4 hubs
          </div>
        </div>

        {/* Canvas — 16:9 stylised world */}
        <div className="relative aspect-[16/9] bg-gradient-to-b from-[#f5f8f3] to-[#eef3ea]">
          {/* Subtle dot grid */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(15,58,35,0.12) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Stylised continent outlines (simplified) */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 56"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            {/* equator + tropics */}
            <g stroke="rgba(15,58,35,0.08)" strokeWidth="0.12" strokeDasharray="0.6 0.6" fill="none">
              <line x1="0" x2="100" y1="34" y2="34" />
              <line x1="0" x2="100" y1="22" y2="22" />
              <line x1="0" x2="100" y1="46" y2="46" />
            </g>
            {/* Continents — soft fills */}
            <g fill="rgba(15,58,35,0.10)" stroke="rgba(15,58,35,0.18)" strokeWidth="0.18" strokeLinejoin="round">
              {/* North America */}
              <path d="M 6 14 Q 16 9 26 12 L 30 18 Q 32 22 28 26 L 22 30 Q 16 32 12 30 L 8 26 Q 5 20 6 14 Z" />
              {/* South America */}
              <path d="M 24 32 L 30 32 L 32 38 L 30 46 L 26 50 L 22 46 L 22 38 Z" />
              {/* Europe */}
              <path d="M 44 14 Q 50 12 54 14 L 56 18 Q 54 22 50 22 L 44 22 L 42 18 Z" />
              {/* Africa */}
              <path d="M 47 24 L 56 24 L 58 30 L 58 38 L 54 46 L 50 50 L 46 46 L 44 38 L 45 30 Z" />
              {/* Middle East / Arabian peninsula */}
              <path d="M 58 26 L 64 26 L 66 32 L 64 36 L 60 36 L 58 32 Z" />
              {/* Russia / N. Asia */}
              <path d="M 56 10 Q 70 8 84 10 L 88 14 L 86 18 L 70 18 L 60 16 L 56 14 Z" />
              {/* China / S.E Asia */}
              <path d="M 70 20 L 82 20 L 84 26 L 80 30 L 74 30 L 72 26 Z" />
              {/* India / Bangladesh */}
              <path d="M 70 28 L 76 28 L 78 34 L 74 38 L 71 36 Z" />
              {/* Australia */}
              <path d="M 82 40 L 92 40 L 94 46 L 90 48 L 84 46 Z" />
            </g>
          </svg>

          {/* Arc connections from HQ (Oman) → others */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 56"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            {others.map((p, i) => {
              const sx = hub.x
              const sy = hub.y
              const ex = p.x
              const ey = p.y
              // Arc upward — control point above the midpoint
              const mx = (sx + ex) / 2
              const my = Math.min(sy, ey) - Math.abs(ex - sx) * 0.25
              const path = `M ${sx} ${sy} Q ${mx} ${my}, ${ex} ${ey}`
              return (
                <g key={p.code}>
                  <path d={path} fill="none" stroke="rgba(15,58,35,0.32)" strokeWidth="0.22" strokeDasharray="0.8 0.8" />
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(158,199,58,0.95)"
                    strokeWidth="0.32"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                  />
                </g>
              )
            })}
          </svg>

          {/* Pins */}
          {PINS.map((p, i) => {
            const c = countries.find((cc) => cc.code === p.code)
            if (!c) return null
            const isHub = !!p.isHub
            return (
              <button
                key={p.code}
                type="button"
                onClick={() => (isHub ? onSelectHub() : onSelect(p.code))}
                aria-label={`${c.name} · ${c.role}`}
                className="group absolute z-10"
                style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                {/* Halo */}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full
                              ${isHub ? 'w-16 h-16 bg-brand-accent/30' : 'w-12 h-12 bg-brand-accent/25'}`}
                  style={{ animation: `haloPulse 2.6s ease-in-out ${i * 0.25}s infinite` }}
                />
                {/* Outer ring (hover only) */}
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-brand-accent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300
                              ${isHub ? 'w-20 h-20' : 'w-16 h-16'}`}
                />
                {/* Pin head */}
                <span
                  aria-hidden="true"
                  className={`relative block rounded-full grid place-items-center text-white shadow-[0_6px_16px_rgba(15,58,35,0.45)]
                              transition-transform duration-300 group-hover:scale-110
                              ${isHub
                                ? 'w-10 h-10 bg-brand-deep ring-[3px] ring-brand-accent'
                                : 'w-7 h-7 bg-brand-accentDark ring-2 ring-white'}`}
                >
                  <MapPin size={isHub ? 18 : 14} strokeWidth={2.2} />
                </span>

                {/* Label tag */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 ${isHub ? 'top-full mt-4' : 'top-full mt-3'}
                              whitespace-nowrap`}
                >
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5
                                text-[11px] font-bold tracking-[0.22em] uppercase shadow-md
                                transition-all duration-300
                                ${isHub
                                  ? 'bg-brand-deep text-brand-accent'
                                  : 'bg-white text-brand-deep border border-slate-200 group-hover:border-brand-accentDark'}`}
                  >
                    <span className="text-[14px] leading-none">{c.flag}</span>
                    {isHub
                      ? 'HQ · Muscat'
                      : c.name.replace('Sultanate of ', '').replace(' of America', '')}
                  </span>
                </div>
              </button>
            )
          })}

          {/* Map chrome — corner zoom controls (decorative) */}
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-70">
            <button
              type="button"
              aria-label="Zoom in"
              className="w-7 h-7 rounded-md bg-white border border-slate-200 grid place-items-center
                         text-slate-500 hover:text-brand-deep hover:border-brand-accentDark transition"
            >
              <Plus size={12} />
            </button>
            <button
              type="button"
              aria-label="Zoom out"
              className="w-7 h-7 rounded-md bg-white border border-slate-200 grid place-items-center
                         text-slate-500 hover:text-brand-deep hover:border-brand-accentDark transition"
            >
              <Minus size={12} />
            </button>
          </div>

          <div className="absolute bottom-3 left-4 text-[9px] font-mono text-slate-400 tracking-wide">
            equirectangular · stylised
          </div>
          <div className="absolute bottom-3 right-4 text-[9px] font-mono text-slate-400 tracking-wide">
            tap a pin →
          </div>
        </div>
      </div>
    </div>
  )
}

/* ───────────── Slide-in panel ───────────── */

function CountryPanel({
  selected,
  onClose,
  onSelect,
}: {
  selected: string | 'overview' | null
  onClose: () => void
  onSelect: (code: string) => void
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

  // OVERVIEW mode — HQ click. Lists all 4 countries.
  if (selected === 'overview') {
    return (
      <PanelShell onClose={onClose} ariaLabel="All Yanabiya Group countries">
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
              Global Presence
            </h3>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          Yanabiya Group operates across four countries — one coordinated network, four operational hubs.
        </p>

        <div className="mt-7 space-y-2.5">
          {PINS.map((p, i) => {
            const c = countries.find((cc) => cc.code === p.code)
            if (!c) return null
            const num = String(i + 1).padStart(2, '0')
            return (
              <button
                type="button"
                key={c.code}
                onClick={() => onSelect(c.code)}
                className="group w-full flex items-center gap-3 rounded-xl bg-slate-50 border border-slate-200
                           px-3 py-3 text-left transition-all duration-300
                           hover:bg-brand-accent/8 hover:border-brand-deep/40 hover:translate-x-1"
              >
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                                 bg-brand-accent/15 text-2xl leading-none
                                 transition-colors duration-300
                                 group-hover:bg-brand-accent">
                  {c.flag}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                    {c.name}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                    {c.role} · {c.entities.length} {c.entities.length === 1 ? 'entity' : 'entities'}
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

  // SINGLE COUNTRY mode
  const c = countries.find((cc) => cc.code === selected)
  if (!c) return null
  const contact = contactByCountry.find((x) => x.code === selected)
  const activities = (c as { activities?: { code: string; name: string }[] }).activities

  return (
    <PanelShell onClose={onClose} ariaLabel={`${c.name} detail`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-brand-accent/15 grid place-items-center text-3xl leading-none
                        ring-1 ring-brand-accent/30">
          {c.flag}
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
            {c.role}
          </div>
          <h3 className="font-serif text-2xl text-brand-deep leading-tight mt-0.5">
            {c.name}
          </h3>
        </div>
      </div>

      {/* Country map illustration */}
      {(c as { mapImage?: string }).mapImage && (
        <div className="relative mt-6 rounded-xl overflow-hidden
                        bg-gradient-to-b from-[#f5f8f3] to-[#eef3ea]
                        border border-slate-200 shadow-[0_12px_30px_-14px_rgba(15,58,35,0.35)]
                        aspect-[5/4] grid place-items-center p-4">
          <img
            src={(c as { mapImage: string }).mapImage}
            alt={`Administrative map of ${c.name}`}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
          <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-1.5
                          rounded-full bg-white/95 backdrop-blur px-2.5 py-1
                          text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
            <span className="text-[12px] leading-none">{c.flag}</span>
            {c.code} · Map
          </div>
          {contact && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5
                         rounded-full bg-white/95 backdrop-blur px-2.5 py-1
                         text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep
                         hover:bg-brand-accent hover:text-brand-deep transition-colors"
            >
              Find office <ExternalLink size={11} />
            </a>
          )}
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 text-sm text-slate-700">
        <MapPin size={15} className="mt-0.5 shrink-0 text-brand-accentDark" />
        <span className="leading-relaxed">{c.address}</span>
      </div>

      {/* Quick stats */}
      <div className="mt-6 grid grid-cols-3 gap-2">
        <Stat icon={Building2} label="Entities" value={String(c.entities.length)} />
        <Stat icon={Briefcase} label="Activities" value={activities ? String(activities.length) : '—'} />
        <Stat icon={Globe2} label="Code" value={c.code} />
      </div>

      {/* Top entities preview */}
      <div className="mt-7 text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accentDark mb-3">
        Operating Entities
      </div>
      <ul className="space-y-2">
        {c.entities.slice(0, 4).map((e) => (
          <li
            key={e}
            className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2
                       text-sm text-slate-700 flex items-baseline gap-2"
          >
            <span className="block w-1 h-1 rounded-full bg-brand-accent shrink-0 translate-y-[-2px]" />
            {e}
          </li>
        ))}
        {c.entities.length > 4 && (
          <li className="text-[11px] font-semibold text-slate-500 px-1 pt-1">
            + {c.entities.length - 4} more on the dedicated page
          </li>
        )}
      </ul>

      {contact && (
        <div className="mt-6 inline-flex items-center gap-2 rounded-full
                        bg-brand-deep/5 border border-brand-deep/15 px-3 py-1
                        text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
          <span className="font-mono">{contact.hours.split(',')[0]}</span>
          ·
          {contact.emails[0]}
        </div>
      )}

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          to={`/global-presence/${c.code.toLowerCase()}`}
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full px-6 py-3
                     bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                     hover:bg-brand-accentDark transition-colors"
        >
          Open {c.name.replace('Sultanate of ', '').replace(' of America', '')} page
          <ExternalLink size={14} />
        </Link>
        <Link
          to="/contact"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-full px-5 py-3
                     border border-slate-300 text-slate-700 text-xs font-bold uppercase tracking-[0.22em]
                     hover:border-brand-accentDark hover:text-brand-accentDark transition-colors"
        >
          Contact
        </Link>
      </div>
    </PanelShell>
  )
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-3">
      <div className="flex items-center gap-1.5 text-brand-accentDark">
        <Icon size={12} strokeWidth={1.8} />
        <span className="text-[9px] font-bold uppercase tracking-[0.22em]">{label}</span>
      </div>
      <div className="mt-0.5 font-serif text-lg text-brand-deep leading-tight">
        {value}
      </div>
    </div>
  )
}

function PanelShell({
  children,
  onClose,
  ariaLabel,
}: {
  children: React.ReactNode
  onClose: () => void
  ariaLabel: string
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
        className="absolute top-0 right-0 h-full w-full sm:w-[480px] md:w-[560px]
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
          {children}
        </div>
      </aside>
    </div>
  )
}

/* ───────────── Page ───────────── */

export default function GlobalPresence() {
  const [selected, setSelected] = useState<string | 'overview' | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    // Hash deep-link → opens corresponding panel
    const hash = window.location.hash.replace('#', '').toUpperCase()
    if (hash && countries.some((c) => c.code === hash)) {
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

      {/* Header */}
      <section className="relative">
        <div className="container-x pt-14 md:pt-20 pb-6 text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4 inline-flex items-center gap-2">
              <Sparkles size={12} className="text-brand-accent" />
              Global Presence
              <Sparkles size={12} className="text-brand-accent" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
              Four countries.
              <span className="text-brand-accentDark"> One network.</span>
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
              Tap a pin to open a country — or the HQ marker for the full network at once.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28">
          <Reveal delay={200}>
            <WorldMap
              onSelect={(code) => setSelected(code)}
              onSelectHub={() => setSelected('overview')}
            />
          </Reveal>

          {/* Country chip strip — quick alt-nav under the map */}
          <Reveal delay={320}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelected(c.code)}
                  className="group inline-flex items-center gap-2 rounded-full
                             bg-white border border-slate-200 px-3 py-1.5
                             text-[11px] font-semibold uppercase tracking-wider text-brand-deep
                             hover:border-brand-accentDark hover:text-brand-accentDark
                             hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-base leading-none">{c.flag}</span>
                  {c.name.replace('Sultanate of ', '').replace(' of America', '')}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CountryPanel
        selected={selected}
        onClose={() => setSelected(null)}
        onSelect={(code) => setSelected(code)}
      />
    </main>
  )
}
