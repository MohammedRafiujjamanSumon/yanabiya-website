import { useEffect, useState } from 'react'
import { Save, Globe } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { languages, type LanguageMeta } from '../../../i18n'

interface LangSettings {
  defaultLang: string
  enabled: string[]
}

const DEFAULTS: LangSettings = {
  defaultLang: 'en',
  enabled: ['en', 'ar', 'bn', 'fr', 'de'],
}

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const REGION_LABELS: Record<LanguageMeta['region'], string> = {
  global: 'Global',
  gulf: 'Gulf',
  europe: 'Europe',
  asia: 'Asia',
}

const REGION_COLORS: Record<LanguageMeta['region'], string> = {
  global: 'bg-blue-500/20 text-blue-300',
  gulf: 'bg-amber-500/20 text-amber-300',
  europe: 'bg-purple-500/20 text-purple-300',
  asia: 'bg-emerald-500/20 text-emerald-300',
}

export default function LanguageEdit() {
  const [data, setData] = useState<LangSettings>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('language-settings')
      .then(res => {
        if (res.data && typeof res.data === 'object') {
          setData({ ...DEFAULTS, ...(res.data as Partial<LangSettings>) })
        }
      })
      .catch(() => { /* use defaults */ })
  }, [])

  const toggleEnabled = (code: string) => {
    if (code === data.defaultLang) return // cannot disable default
    setData(prev => {
      const isEnabled = prev.enabled.includes(code)
      if (isEnabled) {
        return { ...prev, enabled: prev.enabled.filter(c => c !== code) }
      } else {
        return { ...prev, enabled: [...prev.enabled, code] }
      }
    })
  }

  const setDefault = (code: string) => {
    setData(prev => ({
      ...prev,
      defaultLang: code,
      // ensure the new default is always enabled
      enabled: prev.enabled.includes(code) ? prev.enabled : [...prev.enabled, code],
    }))
  }

  const enabledLanguages = languages.filter(l => data.enabled.includes(l.code))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('language-settings', data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Language Settings</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Control which languages appear in the website language switcher
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Default language selector */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={15} className="text-brand-accent" />
            <h2 className="text-sm font-semibold text-white">Default Language</h2>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            The language shown to visitors before they make a selection. Must be an enabled language.
          </p>
          <select
            value={data.defaultLang}
            onChange={e => setDefault(e.target.value)}
            className={ipt}
          >
            {enabledLanguages.map(l => (
              <option key={l.code} value={l.code}>
                {l.flag}  {l.label} — {l.native}
              </option>
            ))}
          </select>
        </div>

        {/* Language grid */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Enabled Languages</h2>
          <p className="text-xs text-slate-500 mb-4">
            Toggle each language on or off. The default language cannot be disabled.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {languages.map(lang => {
              const isEnabled = data.enabled.includes(lang.code)
              const isDefault = data.defaultLang === lang.code

              return (
                <div
                  key={lang.code}
                  onClick={() => toggleEnabled(lang.code)}
                  className={[
                    'relative rounded-xl border p-3 cursor-pointer select-none transition-all',
                    isEnabled
                      ? 'border-brand-accent/50 bg-brand-accent/5'
                      : 'border-slate-700 bg-slate-800 opacity-50',
                    isDefault ? 'cursor-default' : 'hover:border-slate-500',
                  ].join(' ')}
                >
                  {/* Toggle checkbox */}
                  <div className="absolute top-2.5 right-2.5">
                    <input
                      type="checkbox"
                      readOnly
                      checked={isEnabled}
                      disabled={isDefault}
                      onClick={e => { e.stopPropagation(); toggleEnabled(lang.code) }}
                      className="accent-brand-accent w-3.5 h-3.5 cursor-pointer disabled:cursor-default"
                    />
                  </div>

                  {/* Default badge */}
                  {isDefault && (
                    <span className="absolute top-2.5 left-2.5 bg-green-500/20 text-green-400 text-[10px] font-semibold px-1.5 py-0.5 rounded-full leading-none">
                      Default
                    </span>
                  )}

                  <div className={isDefault ? 'mt-5' : 'mt-0'}>
                    <div className="text-2xl mb-1 leading-none">{lang.flag}</div>
                    <div className="text-xs font-semibold text-white leading-tight">{lang.label}</div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{lang.native}</div>
                    <div className="mt-2">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${REGION_COLORS[lang.region]}`}>
                        {REGION_LABELS[lang.region]}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Save footer */}
        <div className="flex justify-end mt-5">
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
