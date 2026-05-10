import { useEffect, useState } from 'react'
import { Save, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { businesses } from '../../../data/businesses'

interface ServiceItem {
  slug: string; title: string; tagline: string; image: string
  body: string; details: string; features: string[]
}

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const BLANK: Omit<ServiceItem, 'slug'> = {
  title: '', tagline: '', image: '', body: '', details: '', features: [],
}

export default function ServicesEdit() {
  const [data, setData] = useState<ServiceItem[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('services')
      .then(res => {
        const items = res.data as ServiceItem[]
        setData(items.map(s => ({
          slug: s.slug ?? '', title: s.title ?? '', tagline: s.tagline ?? s.body ?? '',
          image: s.image ?? '', body: s.body ?? '', details: s.details ?? '',
          features: s.features ?? [],
        })))
      })
      .catch(() => {
        setData(businesses.map(b => ({
          slug: b.slug, title: b.title, tagline: b.body,
          image: '', body: b.body, details: b.details, features: b.features,
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

  const update = (slug: string, field: keyof ServiceItem, val: unknown) =>
    setData(prev => prev.map(s => s.slug === slug ? { ...s, [field]: val } : s))

  const addService = () => {
    const newSlug = `service-${Date.now()}`
    const item: ServiceItem = { slug: newSlug, ...BLANK }
    setData(prev => [...prev, item])
    setExpanded(newSlug)
  }

  const removeService = (slug: string) => {
    setData(prev => prev.filter(s => s.slug !== slug))
    if (expanded === slug) setExpanded(null)
  }

  const updateSlug = (oldSlug: string, title: string) => {
    const newSlug = slugify(title) || oldSlug
    setData(prev => prev.map(s => s.slug === oldSlug ? { ...s, slug: newSlug, title } : s))
    if (expanded === oldSlug) setExpanded(newSlug)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Services</h1>
            <p className="text-slate-400 text-sm mt-0.5">Add, remove and edit service cards shown on the website</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addService}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white
                         text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
              <Plus size={15} /> Add Service
            </button>
            <button onClick={save} disabled={saving || !data.length}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
              <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-3">
          {data.map((svc, idx) => (
            <div key={svc.slug} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center">
                <button
                  onClick={() => setExpanded(expanded === svc.slug ? null : svc.slug)}
                  className="flex-1 flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[10px] font-bold text-slate-600 w-5">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-medium text-white text-sm">{svc.title || <em className="text-slate-500">Untitled service</em>}</span>
                  </span>
                  {expanded === svc.slug ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                </button>
                <button
                  onClick={() => removeService(svc.slug)}
                  title="Delete service"
                  className="px-4 py-4 text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {expanded === svc.slug && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-800">
                  <div className="pt-4">
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title</label>
                    <input
                      value={svc.title}
                      onChange={e => updateSlug(svc.slug, e.target.value)}
                      className={ipt}
                      placeholder="e.g. IT & Software Services"
                    />
                    <p className="mt-1 text-[10px] text-slate-600">Slug: <code className="text-slate-500">{svc.slug}</code></p>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Tagline (short, shown on card)</label>
                    <input value={svc.tagline} onChange={e => update(svc.slug, 'tagline', e.target.value)}
                      className={ipt} placeholder="e.g. Custom software, cloud & AI solutions" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Card Image URL</label>
                    <input value={svc.image} onChange={e => update(svc.slug, 'image', e.target.value)}
                      className={ipt} placeholder="https://… or /yanabiya-website/images/…" />
                    {svc.image && (
                      <img src={svc.image} alt="" className="mt-2 h-24 rounded-lg object-cover"
                        onError={e => (e.currentTarget.style.display = 'none')} />
                    )}
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
                      onChange={e => update(svc.slug, 'features', e.target.value.split('\n').filter(Boolean))}
                      className={`${ipt} resize-none font-mono text-xs`} />
                  </div>
                </div>
              )}
            </div>
          ))}

          {data.length === 0 && (
            <div className="text-center py-12 text-slate-600 text-sm">
              No services yet. Click <strong className="text-slate-400">Add Service</strong> to create one.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
