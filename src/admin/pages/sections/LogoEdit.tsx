import { useEffect, useState } from 'react'
import { Save, ImageIcon } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface BrandingData {
  logoUrl: string
  brandmarkUrl: string
  siteName: string
  tagline: string
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULT: BrandingData = {
  logoUrl: '',
  brandmarkUrl: '',
  siteName: 'Yanabiya Group',
  tagline: '',
}

export default function LogoEdit() {
  const [data, setData] = useState<BrandingData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('branding')
      .then(res => setData(res.data as BrandingData))
      .catch(() => setData(DEFAULT))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('branding', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const set = (field: keyof BrandingData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }))
  }

  return (
    <AdminLayout>
      <div className="max-w-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Logo & Branding</h1>
            <p className="text-slate-400 text-sm mt-0.5">Update site logo, brandmark and identity details</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <div className="space-y-5">
          {/* Logo */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Primary Logo</h2>

            {/* Preview */}
            <div className="w-full h-28 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              {data.logoUrl
                ? <img src={data.logoUrl} alt="Logo preview" className="max-h-20 max-w-full object-contain" />
                : <div className="flex flex-col items-center gap-2 text-slate-600">
                    <ImageIcon size={28} />
                    <span className="text-xs">No logo uploaded</span>
                  </div>}
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Logo URL</div>
              <div className="flex gap-2 items-center">
                <input type="text" className={ipt} value={data.logoUrl}
                  onChange={e => set('logoUrl', e.target.value)}
                  placeholder="https://…/logo.svg" />
                <label className="shrink-0 cursor-pointer text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-2.5 rounded-lg transition-colors">
                  Upload
                  <input type="file" accept="image/*" className="hidden" onChange={async e => {
                    const file = e.target.files?.[0]; if (!file) return
                    try {
                      const res = await api.uploadFile('branding', file)
                      set('logoUrl', res.url)
                    } catch { /* ignore */ }
                  }} />
                </label>
              </div>
            </div>
          </div>

          {/* Brandmark */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Brandmark / Icon</h2>

            {/* Preview */}
            <div className="w-24 h-24 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
              {data.brandmarkUrl
                ? <img src={data.brandmarkUrl} alt="Brandmark preview" className="max-h-16 max-w-full object-contain" />
                : <ImageIcon size={22} className="text-slate-600" />}
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Brandmark URL</div>
              <input type="text" className={ipt} value={data.brandmarkUrl}
                onChange={e => set('brandmarkUrl', e.target.value)}
                placeholder="https://…/brandmark.svg" />
            </div>
          </div>

          {/* Identity */}
          <div className="bg-slate-900 rounded-xl border border-slate-800 p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white">Site Identity</h2>

            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Site Name</div>
              <input className={ipt} value={data.siteName} placeholder="Yanabiya Group"
                onChange={e => set('siteName', e.target.value)} />
            </div>

            <div>
              <div className="text-xs font-medium text-slate-400 mb-1">Tagline</div>
              <input className={ipt} value={data.tagline}
                placeholder="e.g. Building the Future, Together"
                onChange={e => set('tagline', e.target.value)} />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
