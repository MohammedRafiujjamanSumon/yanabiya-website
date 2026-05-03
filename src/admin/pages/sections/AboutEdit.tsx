import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Pillar { title: string; body: string }
interface AboutData { intro: string; pillars: Pillar[] }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function AboutEdit() {
  const [data, setData] = useState<AboutData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('about')
      .then(res => setData(res.data as AboutData))
      .catch(() => setError('Failed to load about data'))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('about', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const setPillar = (i: number, field: keyof Pillar, val: string) => {
    if (!data) return
    const pillars = [...data.pillars]; pillars[i] = { ...pillars[i], [field]: val }
    setData({ ...data, pillars })
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">About Section</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit company intro and pillar cards</p>
          </div>
          <button onClick={save} disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}
        {!data && !error && <div className="h-80 bg-slate-900 rounded-xl animate-pulse" />}

        {data && (
          <div className="space-y-5">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Company Intro</label>
              <textarea rows={3} value={data.intro}
                onChange={e => setData({ ...data, intro: e.target.value })}
                className={`${ipt} resize-none`}
                placeholder="A trusted international group of companies…" />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Pillars</h2>
                <button onClick={() => setData({ ...data, pillars: [...data.pillars, { title: '', body: '' }] })}
                  className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                  <Plus size={12} /> Add Pillar
                </button>
              </div>
              <div className="space-y-4">
                {data.pillars.map((p, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-4 space-y-3 relative group">
                    <input value={p.title} onChange={e => setPillar(i, 'title', e.target.value)}
                      className={ipt} placeholder="Technology" />
                    <textarea rows={2} value={p.body} onChange={e => setPillar(i, 'body', e.target.value)}
                      className={`${ipt} resize-none`} placeholder="Description…" />
                    <button onClick={() => setData({ ...data, pillars: data.pillars.filter((_, j) => j !== i) })}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-6 h-6
                                 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                      <Trash2 size={11} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
