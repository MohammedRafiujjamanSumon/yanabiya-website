import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface HeroStat { label: string; value: string }
interface HeroData { headline: string; subheadline: string; stats: HeroStat[] }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function HeroEdit() {
  const [data, setData] = useState<HeroData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('hero')
      .then(res => setData(res.data as HeroData))
      .catch(() => setError('Failed to load hero data'))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('hero', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const setStat = (i: number, field: keyof HeroStat, val: string) => {
    if (!data) return
    const stats = [...data.stats]
    stats[i] = { ...stats[i], [field]: val }
    setData({ ...data, stats })
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Hero Section</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit the main homepage banner text and stats</p>
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
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Main Headline</label>
                <input value={data.headline}
                  onChange={e => setData({ ...data, headline: e.target.value })}
                  className={ipt} placeholder="One Group. Four Countries. Infinite Possibilities." />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">Subheadline</label>
                <textarea rows={3} value={data.subheadline}
                  onChange={e => setData({ ...data, subheadline: e.target.value })}
                  className={`${ipt} resize-none`}
                  placeholder="Yanabiya Group is a diversified international enterprise…" />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Stats / Key Numbers</h2>
                <button onClick={() => setData({ ...data, stats: [...data.stats, { label: '', value: '' }] })}
                  className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                  <Plus size={12} /> Add Stat
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {data.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 relative group">
                    <input value={stat.value}
                      onChange={e => setStat(i, 'value', e.target.value)}
                      className="w-full bg-transparent text-2xl font-bold text-brand-accent focus:outline-none mb-1"
                      placeholder="4" />
                    <input value={stat.label}
                      onChange={e => setStat(i, 'label', e.target.value)}
                      className="w-full bg-transparent text-xs text-slate-400 focus:outline-none"
                      placeholder="Countries" />
                    <button onClick={() => setData({ ...data, stats: data.stats.filter((_, j) => j !== i) })}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-5 h-5
                                 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                      <Trash2 size={10} className="text-white" />
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
