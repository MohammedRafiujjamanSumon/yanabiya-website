import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Save, Globe2, Info } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { ImageField } from '../../components/MediaPicker'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface SEOData {
  pageTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  canonicalUrl: string
  noIndex: boolean
  keywords: string
}

const DEFAULT: SEOData = {
  pageTitle: '',
  metaDescription: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  canonicalUrl: '',
  noIndex: false,
  keywords: '',
}

export default function SEOEdit() {
  const { page = 'global' } = useParams<{ page: string }>()
  const [data, setData] = useState<SEOData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const pageLabel = page.charAt(0).toUpperCase() + page.slice(1).replace(/-/g, ' ')
  const key = `seo-${page}`

  useEffect(() => {
    api
      .getSection(key)
      .then(res => {
        if (res.data) setData({ ...DEFAULT, ...(res.data as SEOData) })
      })
      .catch(() => {})
  }, [key])

  const set = <K extends keyof SEOData>(field: K, val: SEOData[K]) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection(key, data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const descLen = data.metaDescription.length

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <Globe2 size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SEO Settings</h1>
              <p className="text-slate-400 text-sm">{pageLabel} page</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg">
                {error}
              </span>
            )}
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Tip */}
        <div className="flex items-start gap-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-6">
          <Info size={14} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-400">
            SEO settings control how this page appears in Google search results and when shared on
            social media. Open Graph fields are used by Facebook, LinkedIn, and WhatsApp previews.
          </p>
        </div>

        <div className="space-y-5">
          {/* Page Title */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Page Title{' '}
              <span className="text-slate-600">(shown in browser tab &amp; Google)</span>
            </label>
            <input
              value={data.pageTitle}
              onChange={e => set('pageTitle', e.target.value)}
              className={ipt}
              placeholder="e.g. About Us | Yanabiya Group"
            />
          </div>

          {/* Meta Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-400 font-medium">Meta Description</label>
              <span className={`text-[10px] ${descLen > 160 ? 'text-red-400' : 'text-slate-600'}`}>
                {descLen}/160
              </span>
            </div>
            <textarea
              rows={3}
              value={data.metaDescription}
              onChange={e => set('metaDescription', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Brief description for search engine results (aim for 150-160 characters)"
            />
          </div>

          {/* Open Graph divider */}
          <div className="border-t border-slate-800 pt-1">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Open Graph (Social Sharing)
            </div>
          </div>

          {/* OG Title */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              OG Title{' '}
              <span className="text-slate-600">(defaults to Page Title if blank)</span>
            </label>
            <input
              value={data.ogTitle}
              onChange={e => set('ogTitle', e.target.value)}
              className={ipt}
              placeholder="Title shown when shared on social media"
            />
          </div>

          {/* OG Description */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">OG Description</label>
            <textarea
              rows={2}
              value={data.ogDescription}
              onChange={e => set('ogDescription', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Description shown in social media link previews"
            />
          </div>

          {/* OG Image */}
          <ImageField
            label="OG Image (1200×630px recommended)"
            value={data.ogImage}
            onChange={v => set('ogImage', v)}
            folder="misc"
          />

          {/* Advanced divider */}
          <div className="border-t border-slate-800 pt-1">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Advanced
            </div>
          </div>

          {/* Canonical URL */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Canonical URL <span className="text-slate-600">(optional)</span>
            </label>
            <input
              value={data.canonicalUrl}
              onChange={e => set('canonicalUrl', e.target.value)}
              className={ipt}
              placeholder="https://yanabiyagroup.com/about-us"
            />
          </div>

          {/* Keywords */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Keywords <span className="text-slate-600">(comma-separated)</span>
            </label>
            <textarea
              rows={2}
              value={data.keywords}
              onChange={e => set('keywords', e.target.value)}
              className={`${ipt} resize-none font-mono text-xs`}
              placeholder="Yanabiya, trading, Oman, global business…"
            />
          </div>

          {/* No Index toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div>
              <div className="text-sm font-medium text-white">Hide from search engines</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Adds noindex tag — Google will not index this page
              </div>
            </div>
            <button
              type="button"
              onClick={() => set('noIndex', !data.noIndex)}
              className={`relative rounded-full transition-colors shrink-0 ${
                data.noIndex ? 'bg-red-500/70' : 'bg-slate-700'
              }`}
              style={{ width: '40px', height: '22px' }}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${
                  data.noIndex ? 'translate-x-[18px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
