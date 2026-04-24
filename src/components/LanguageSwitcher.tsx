import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, ChevronDown } from 'lucide-react'
import { languages } from '../i18n'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = languages.find((l) => l.code === i18n.language) ?? languages[0]
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : 'false'}
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full
                   bg-white/95 text-brand-deep
                   hover:bg-white transition-colors
                   focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <span className="text-[18px] leading-none">{current.flag}</span>
        <span className="text-xs font-semibold uppercase tracking-wider">{current.code}</span>
        <ChevronDown
          size={12}
          className={`text-brand-deep/70 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 z-40
                       bg-white border border-slate-200 rounded-xl py-2 min-w-[200px]
                       shadow-2xl shadow-slate-900/15 overflow-hidden"
          >
            {languages.map((l) => {
              const isActive = l.code === current.code
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => { i18n.changeLanguage(l.code); setOpen(false) }}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 text-sm
                              transition-colors ${
                                isActive
                                  ? 'bg-brand-accent/10 text-brand-accentDark'
                                  : 'text-slate-800 hover:bg-slate-50'
                              }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <span className="text-[20px] leading-none shrink-0">
                      {l.flag}
                    </span>
                    <span className="flex flex-col items-start leading-tight min-w-0">
                      <span className="font-semibold truncate">{l.native}</span>
                      <span className="text-[11px] text-slate-500 uppercase tracking-wider">
                        {l.label}
                      </span>
                    </span>
                  </span>
                  {isActive && <Check size={16} className="text-brand-accent shrink-0" />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
