import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Check, Globe } from 'lucide-react'
import { languages, type LanguageMeta } from '../i18n'

const GROUPS: { key: LanguageMeta['region']; label: string }[] = [
  { key: 'global',  label: 'Global'  },
  { key: 'gulf',    label: 'Gulf'    },
  { key: 'europe',  label: 'Europe'  },
  { key: 'asia',    label: 'Asia'    },
]

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = languages.find((l) => l.code === i18n.language) ?? languages[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
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
                       bg-white border border-brand-deep/10 rounded-xl shadow-2xl
                       w-56 overflow-hidden"
          >
            {GROUPS.map(({ key, label }) => {
              const group = languages.filter(l => l.region === key)
              if (!group.length) return null
              return (
                <div key={key}>
                  <p className="px-3 pt-2.5 pb-1 text-[9px] uppercase tracking-[0.25em] font-bold text-brand-deep/35">
                    {label}
                  </p>
                  {group.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { i18n.changeLanguage(l.code); setOpen(false) }}
                      className={`flex items-center justify-between w-full px-3 py-2
                                  hover:bg-slate-50 transition-colors
                                  ${l.code === current.code ? 'bg-brand-accent/10' : ''}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base leading-none">{l.flag}</span>
                        <span className="text-[12px] font-medium text-brand-deep">{l.native}</span>
                      </span>
                      {l.code === current.code && (
                        <Check size={13} className="text-brand-accent shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )
            })}
            <div className="h-2" />
          </div>
        </>
      )}
    </div>
  )
}
