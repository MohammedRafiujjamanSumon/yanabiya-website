import { useEffect, useState } from 'react'
import { Save, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { businesses } from '../../../data/businesses'

interface ServiceItem {
  slug: string; title: string; body: string; details: string; features: string[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function ServicesEdit() {
  const [data, setData] = useState<ServiceItem[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    // Try API first, fall back to local static data
    api.getSection('services')
      .then(res => setData(res.data as ServiceItem[]))
      .catch(() => {
        setData(businesses.map(b => ({
          slug: b.slug, title: b.title, body: b.body,
          details: b.details, features: b.features,
        })))
      })
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('services', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const update = (slug: string, field: keyof ServiceItem, val: unknown) => {
    setData(prev => prev.map(s => s.slug === slug ? { ...s, [field]: val } : s))
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit service titles, descriptions and features</p>
          </div>
          <button onClick={save} disabled={saving || !data.length}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-3">
          {data.map(svc => (
            <div key={svc.slug} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === svc.slug ? null : svc.slug)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className="font-medium text-white text-sm">{svc.title}</span>
                {expanded === svc.slug ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
              </button>

              {expanded === svc.slug && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-800">
                  <div className="pt-4">
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title</label>
                    <input value={svc.title} onChange={e => update(svc.slug, 'title', e.target.value)} className={ipt} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Short Description</label>
                    <textarea rows={2} value={svc.body}
                      onChange={e => update(svc.slug, 'body', e.target.value)}
                      className={`${ipt} resize-none`} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Details / Long Description</label>
                    <textarea rows={4} value={svc.details}
                      onChange={e => update(svc.slug, 'details', e.target.value)}
                      className={`${ipt} resize-none`} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Features (one per line)</label>
                    <textarea rows={4}
                      value={svc.features.join('\n')}
                      onChange={e => update(svc.slug, 'features', e.target.value.split('\n'))}
                      className={`${ipt} resize-none font-mono text-xs`} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
