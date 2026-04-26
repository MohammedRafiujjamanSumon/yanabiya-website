import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin, Building2, Briefcase,
  X as CloseIcon, ArrowRight, ExternalLink,
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
          {(['OM', 'GB', 'BD', 'US'] as const).map((code, i) => {
            const c = countries.find((cc) => cc.code === code)
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
            Map
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
      <div className="mt-6 grid grid-cols-2 gap-2">
        <Stat icon={Building2} label="Entities" value={String(c.entities.length)} />
        <Stat icon={Briefcase} label="Activities" value={activities ? String(activities.length) : '—'} />
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

      {/* Country chip strip — direct nav to each country panel */}
      <section className="relative">
        <div className="container-x pt-14 md:pt-20 pb-20 md:pb-28">
          <Reveal>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {countries.map((c) => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => setSelected(c.code)}
                  className="group inline-flex items-center gap-2 rounded-full
                             bg-white border border-slate-200 px-4 py-2
                             text-[12px] font-semibold uppercase tracking-wider text-brand-deep
                             hover:border-brand-accentDark hover:text-brand-accentDark
                             hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-lg leading-none">{c.flag}</span>
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
