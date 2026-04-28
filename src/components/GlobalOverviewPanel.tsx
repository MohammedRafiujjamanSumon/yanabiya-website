import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X as CloseIcon, ArrowRight } from 'lucide-react'
import { countries } from '../data/countries'
import { contactByCountry } from '../data/contact'
import { assets } from '../data/assets'

/* Right-side slide-in panel that lists all 4 countries — same look &
 * feel as the HQ-overview panel on /global-presence, but reusable so
 * we can open it from any landing-page CTA without navigating away. */

const ORDER = ['OM', 'GB', 'BD', 'US'] as const

export default function GlobalOverviewPanel({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
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
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Yanabiya Group global presence overview"
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
          <p className="mt-3 text-sm text-slate-600 leading-snug">
            Yanabiya Group operates across four countries — one coordinated network, four operational hubs.
          </p>

          <div className="mt-7 space-y-3">
            {ORDER.map((code, i) => {
              const c = countries.find((cc) => cc.code === code)
              const k = contactByCountry.find((cc) => cc.code === code)
              if (!c) return null
              const num = String(i + 1).padStart(2, '0')
              return (
                <Link
                  key={c.code}
                  to={`/global-presence/${c.code.toLowerCase()}`}
                  onClick={onClose}
                  className="group block w-full rounded-xl bg-slate-50 border border-slate-200
                             p-3.5 text-left transition-all duration-300
                             hover:bg-brand-accent/8 hover:border-brand-deep/40 hover:translate-x-1"
                >
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                                     bg-brand-accent/15 text-2xl leading-none
                                     transition-colors duration-300
                                     group-hover:bg-brand-accent">
                      {c.flag}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="text-[12px] font-bold uppercase tracking-[0.18em] text-brand-deep leading-tight">
                          {c.name}
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-slate-400">
                          {num}
                        </span>
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mt-0.5">
                        {c.role}
                      </div>
                      {k && (
                        <>
                          <div className="text-[11.5px] font-semibold text-slate-700 mt-1.5 leading-snug">
                            {k.legalName}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1">
                            <span className="font-bold uppercase tracking-wider text-brand-accentDark">
                              Est.
                            </span>{' '}
                            {k.established}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="mt-2.5 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                                  text-brand-accentDark group-hover:text-brand-deep group-hover:gap-1.5 transition-all">
                    Open page <ArrowRight size={11} />
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </aside>
    </div>
  )
}
