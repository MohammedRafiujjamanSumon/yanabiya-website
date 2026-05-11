import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Milestone { year: string; title: string; body: string }

interface OurStoryData {
  heroPara: string
  s01Para: string
  s02Para: string
  s03Para: string
  s04Para: string
  milestones: Milestone[]
}

const DEFAULT_MILESTONES: Milestone[] = [
  { year: '2009', title: 'Founded in Oman', body: 'Yanabiya Group established in Muscat with a focus on trade and services.' },
  { year: '2014', title: 'UK Expansion', body: 'London office opened to serve European and Gulf-facing clients.' },
  { year: '2018', title: 'Bangladesh Hub', body: 'Technology delivery centre launched in Dhaka.' },
  { year: '2022', title: 'USA Entity', body: 'Yanabiya LLC incorporated in Wyoming to anchor North American operations.' },
  { year: '2024', title: 'Group Consolidation', body: 'Four entities unified under a single group brand and leadership structure.' },
]

const DEFAULTS: OurStoryData = {
  heroPara: '',
  s01Para: '',
  s02Para: '',
  s03Para: '',
  s04Para: '',
  milestones: DEFAULT_MILESTONES,
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all resize-none'

const iptLine = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

function Field({ label, value, onChange, rows = 3, hint }: { label: string; value: string; onChange: (v: string) => void; rows?: number; hint?: string }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{label}</label>
      {hint && <p className="text-[11px] text-slate-500 mb-1.5">{hint}</p>}
      <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className={ipt} />
    </div>
  )
}

export default function OurStoryEdit() {
  const [data, setData] = useState<OurStoryData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('our-story')
      .then(res => {
        if (res?.data) setData(res.data as OurStoryData)
        else setData(DEFAULTS)
      })
      .catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('our-story', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const set = (field: keyof Omit<OurStoryData, 'milestones'>, val: string) => {
    if (!data) return
    setData({ ...data, [field]: val })
  }

  const setMilestone = (i: number, field: keyof Milestone, val: string) => {
    if (!data) return
    const milestones = [...data.milestones]
    milestones[i] = { ...milestones[i], [field]: val }
    setData({ ...data, milestones })
  }

  const addMilestone = () => {
    if (!data) return
    setData({ ...data, milestones: [...data.milestones, { year: '', title: '', body: '' }] })
  }

  const removeMilestone = (i: number) => {
    if (!data) return
    setData({ ...data, milestones: data.milestones.filter((_, j) => j !== i) })
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Our Story Page</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit hero text, section paragraphs, and the journey timeline</p>
          </div>
          <button
            onClick={save}
            disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {!data && !error && <div className="h-80 bg-slate-900 rounded-xl animate-pulse" />}

        {data && (
          <div className="space-y-6">
            {/* Paragraphs */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Page Paragraphs</h2>
              <Field
                label="Hero Paragraph"
                hint="Displayed under the main hero title"
                value={data.heroPara}
                onChange={v => set('heroPara', v)}
                rows={3}
              />
              <Field
                label="Section 1 — The Founding Story"
                value={data.s01Para}
                onChange={v => set('s01Para', v)}
                rows={3}
              />
              <Field
                label="Section 2 — Mission in Action"
                value={data.s02Para}
                onChange={v => set('s02Para', v)}
                rows={3}
              />
              <Field
                label="Section 3 — Vision for the Future"
                value={data.s03Para}
                onChange={v => set('s03Para', v)}
                rows={3}
              />
              <Field
                label="Section 4 — Journey Timeline Intro"
                value={data.s04Para}
                onChange={v => set('s04Para', v)}
                rows={3}
              />
            </div>

            {/* Milestones */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-sm font-semibold text-white">Journey Milestones</h2>
                <button
                  onClick={addMilestone}
                  className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark transition-colors"
                >
                  <Plus size={13} /> Add Milestone
                </button>
              </div>

              {data.milestones.map((m, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Milestone {i + 1}
                    </span>
                    <button
                      onClick={() => removeMilestone(i)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg p-1 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Year</label>
                      <input
                        value={m.year}
                        onChange={e => setMilestone(i, 'year', e.target.value)}
                        className={iptLine}
                        placeholder="e.g. 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title</label>
                      <input
                        value={m.title}
                        onChange={e => setMilestone(i, 'title', e.target.value)}
                        className={iptLine}
                        placeholder="e.g. UK Expansion"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5 font-medium">Body</label>
                    <textarea
                      rows={2}
                      value={m.body}
                      onChange={e => setMilestone(i, 'body', e.target.value)}
                      className={ipt}
                      placeholder="Brief description of this milestone"
                    />
                  </div>
                </div>
              ))}

              {data.milestones.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No milestones yet. Click "Add Milestone" to begin.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
