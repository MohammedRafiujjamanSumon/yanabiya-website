import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronUp, ChevronDown } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface SolutionItem {
  title: string
  body: string
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function SolutionsEdit() {
  const [data, setData] = useState<SolutionItem[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('solutions')
      .then(res => setData(res.data as SolutionItem[]))
      .catch(() => setData([]))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('solutions', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const update = (idx: number, field: keyof SolutionItem, val: string) => {
    setData(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
  }

  const addItem = () => {
    setData(prev => [...prev, { title: '', body: '' }])
  }

  const removeItem = (idx: number) => {
    if (!confirm('Remove this solution item?')) return
    setData(prev => prev.filter((_, i) => i !== idx))
  }

  const moveUp = (idx: number) => {
    if (idx === 0) return
    setData(prev => {
      const copy = [...prev]
      ;[copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]]
      return copy
    })
  }

  const moveDown = (idx: number) => {
    setData(prev => {
      if (idx === prev.length - 1) return prev
      const copy = [...prev]
      ;[copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]]
      return copy
    })
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Solutions</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit solution cards shown on the homepage</p>
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

        <div className="space-y-3">
          {data.map((item, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl border border-slate-800 p-5">
              <div className="flex items-start gap-3">
                {/* Reorder controls */}
                <div className="flex flex-col gap-1 shrink-0 pt-1">
                  <button
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    onClick={() => moveDown(idx)}
                    disabled={idx === data.length - 1}
                    className="p-1 rounded text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Item number badge */}
                <div className="shrink-0 w-6 h-6 rounded-md bg-slate-800 border border-slate-700 grid place-items-center text-[10px] font-mono text-slate-400 mt-1">
                  {idx + 1}
                </div>

                {/* Fields */}
                <div className="flex-1 space-y-3">
                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">Title</div>
                    <input className={ipt} value={item.title} placeholder="Solution title…"
                      onChange={e => update(idx, 'title', e.target.value)} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">Body / Description</div>
                    <textarea rows={3} className={`${ipt} resize-none`} value={item.body}
                      placeholder="Describe this solution…"
                      onChange={e => update(idx, 'body', e.target.value)} />
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => removeItem(idx)}
                  className="text-red-400 hover:text-red-300 p-1 shrink-0 transition-colors mt-1"
                  title="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div className="bg-slate-900 rounded-xl border border-slate-800 p-8 text-center">
              <p className="text-slate-500 text-sm">No solutions yet. Add your first one below.</p>
            </div>
          )}
        </div>

        <button onClick={addItem}
          className="mt-4 flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
          <Plus size={14} /> Add Solution
        </button>
      </div>
    </AdminLayout>
  )
}
