import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Globe } from 'lucide-react'
import { languages, type LanguageMeta } from '../i18n'

const GROUPS: { key: LanguageMeta['region']; label: string }[] = [
  { key: 'global',  label: 'Global'  },
  { key: 'gulf',    label: 'Gulf'    },
  { key: 'asia',    label: 'Asia'    },
  { key: 'europe',  label: 'Europe'  },
]

/**
 * Bulletproof language switch:
 * 1. Persist the new code to localStorage synchronously (the key i18next's
 *    detector reads on next load)
 * 2. Hard-reload the page with location.replace — re-renders everything,
 *    bypasses any cached translations and any hardcoded strings rendered
 *    before mount
 *
 * The reload guarantees the user sees an immediate change every time.
 */
function selectLanguage(code: string) {
  try {
    localStorage.setItem('i18nextLng', code)
  } catch {/* private mode / disabled storage */}
  // Use replace so the language switch isn't an extra entry in browser history
  window.location.replace(window.location.pathname + window.location.search + window.location.hash)
}

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = languages.find((l) => l.code === i18n.language) ?? languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full
                   hover:bg-slate-100 transition text-brand-deep"
      >
        <Globe size={15} className="shrink-0 text-brand-accentDark" />
        <span className="text-[15px] leading-none">{current.flag}</span>
        <span className="hidden sm:inline text-[11px] font-semibold text-brand-deep/60 leading-none">
          {current.code.toUpperCase()}
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 z-40
                       bg-white border border-brand-deep/10 rounded-2xl shadow-2xl
                       w-[min(92vw,440px)] p-3 overflow-hidden"
          >
            {GROUPS.map(({ key, label }) => {
              const group = languages.filter(l => l.region === key)
              if (!group.length) return null
              return (
                <div key={key} className="mb-2 last:mb-0">
                  <p className="px-1 pt-1 pb-1.5 text-[9px] uppercase tracking-[0.25em] font-bold text-brand-deep/40">
                    {label}
                  </p>
                  {/* Horizontal scrollable strip of flag chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.map((l) => {
                      const isActive = l.code === current.code
                      return (
                        <button
                          key={l.code}
                          onClick={() => { setOpen(false); selectLanguage(l.code) }}
                          className={`inline-flex items-center gap-1.5 rounded-full
                                      px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap
                                      border transition-colors
                                      ${isActive
                                        ? 'bg-brand-accent text-white border-brand-accent'
                                        : 'bg-brand-50 text-brand-deep border-brand-deep/10 hover:border-brand-accent hover:bg-brand-accent/10'}`}
                          title={l.label}
                        >
                          <span className="text-[14px] leading-none">{l.flag}</span>
                          <span>{l.native}</span>
                          {isActive && <Check size={11} className="shrink-0" />}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
