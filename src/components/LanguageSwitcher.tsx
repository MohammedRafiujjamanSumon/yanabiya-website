import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe, Check } from 'lucide-react'
import { languages } from '../i18n'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const current = languages.find((l) => l.code === i18n.language) ?? languages[0]
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        className="flex items-center justify-center w-7 h-7 rounded-full text-current hover:text-brand-accent hover:bg-white/10 transition"
      >
        <Globe size={14} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 z-40 bg-white border border-slate-200 rounded-md py-2 min-w-[160px] shadow-xl">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => { i18n.changeLanguage(l.code); setOpen(false) }}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-slate-800 hover:bg-slate-50"
              >
                <span className="flex items-center gap-2"><span>{l.flag}</span> {l.native}</span>
                {l.code === current.code && <Check size={14} className="text-brand-accent" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
