import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { company } from '../../../data/company'

interface Stat { value: string; label: string }
interface Pillar { title: string; body: string }
interface CompanyData {
  name: string; tagline: string; subTagline: string
  heroDescription: string; qualityStatement: string
  stats: Stat[]; mission: string; vision: string
  pillars: Pillar[]; values: string[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <h2 className="text-sm font-semibold text-white mb-4">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
)

export default function CompanyEdit() {
  const [data, setData] = useState<CompanyData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('company')
      .then(res => setData(res.data as CompanyData))
      .catch(() => setData({ ...company }))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('company', data); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const set = (field: keyof CompanyData, val: unknown) => setData(d => d ? { ...d, [field]: val } : d)

  const setStat = (i: number, f: keyof Stat, v: string) => {
    if (!data) return
    const s = [...data.stats]; s[i] = { ...s[i], [f]: v }; set('stats', s)
  }
  const setPillar = (i: number, f: keyof Pillar, v: string) => {
    if (!data) return
    const p = [...data.pillars]; p[i] = { ...p[i], [f]: v }; set('pillars', p)
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Company Info</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit name, taglines, stats, mission & vision</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">
          <Card title="Brand">
            <div><label className="block text-xs text-slate-400 mb-1.5">Company Name</label><input value={data.name} onChange={e => set('name', e.target.value)} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Tagline</label><input value={data.tagline} onChange={e => set('tagline', e.target.value)} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Sub-Tagline</label><input value={data.subTagline} onChange={e => set('subTagline', e.target.value)} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Hero Description</label><textarea rows={3} value={data.heroDescription} onChange={e => set('heroDescription', e.target.value)} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Quality Statement</label><textarea rows={2} value={data.qualityStatement} onChange={e => set('qualityStatement', e.target.value)} className={`${ipt} resize-none`} /></div>
          </Card>

          <Card title="Key Stats">
            <div className="grid grid-cols-2 gap-3">
              {data.stats.map((s, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-3 relative group">
                  <input value={s.value} onChange={e => setStat(i, 'value', e.target.value)}
                    className="w-full bg-transparent text-2xl font-bold text-brand-accent focus:outline-none mb-1" placeholder="4+" />
                  <input value={s.label} onChange={e => setStat(i, 'label', e.target.value)}
                    className="w-full bg-transparent text-xs text-slate-400 focus:outline-none" placeholder="Countries" />
                  <button onClick={() => set('stats', data.stats.filter((_, j) => j !== i))}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-5 h-5 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                    <Trash2 size={10} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={() => set('stats', [...data.stats, { value: '', label: '' }])}
              className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
              <Plus size={12} /> Add Stat
            </button>
          </Card>

          <Card title="Mission & Vision">
            <div><label className="block text-xs text-slate-400 mb-1.5">Mission</label><textarea rows={4} value={data.mission} onChange={e => set('mission', e.target.value)} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Vision</label><textarea rows={4} value={data.vision} onChange={e => set('vision', e.target.value)} className={`${ipt} resize-none`} /></div>
          </Card>

          <Card title="Pillars">
            {data.pillars.map((p, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2 relative group">
                <input value={p.title} onChange={e => setPillar(i, 'title', e.target.value)} className={ipt} placeholder="Title" />
                <textarea rows={2} value={p.body} onChange={e => setPillar(i, 'body', e.target.value)} className={`${ipt} resize-none`} placeholder="Description" />
                <button onClick={() => set('pillars', data.pillars.filter((_, j) => j !== i))}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                  <Trash2 size={11} className="text-white" />
                </button>
              </div>
            ))}
            <button onClick={() => set('pillars', [...data.pillars, { title: '', body: '' }])}
              className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
              <Plus size={12} /> Add Pillar
            </button>
          </Card>

          <Card title="Company Values">
            <div className="space-y-2">
              {data.values.map((v, i) => (
                <div key={i} className="flex gap-2">
                  <input value={v} onChange={e => { const c=[...data.values]; c[i]=e.target.value; set('values',c) }}
                    className={`${ipt} flex-1`} placeholder={`Value ${i+1}`} />
                  <button onClick={() => set('values', data.values.filter((_,j)=>j!==i))}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => set('values', [...data.values, ''])}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add Value
              </button>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
