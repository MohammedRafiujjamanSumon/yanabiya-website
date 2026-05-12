import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, Target } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface ValueItem {
  id: string
  title: string
  description: string
}

interface MVData {
  missionTitle: string
  missionText: string
  visionTitle: string
  visionText: string
  valuesTitle: string
  values: ValueItem[]
}

const DEFAULT: MVData = {
  missionTitle: 'Our Mission',
  missionText: '',
  visionTitle: 'Our Vision',
  visionText: '',
  valuesTitle: 'Our Values',
  values: [],
}

function newValue(): ValueItem {
  return { id: `val-${Date.now()}`, title: '', description: '' }
}

export default function MissionVisionEdit() {
  const [data, setData] = useState<MVData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getSection('mission-vision')
      .then(res => {
        if (res.data) setData({ ...DEFAULT, ...(res.data as MVData) })
      })
      .catch(() => {})
  }, [])

  const set = <K extends keyof MVData>(field: K, val: MVData[K]) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('mission-vision', data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateValue = (id: string, field: keyof ValueItem, val: string) =>
    setData(prev => ({
      ...prev,
      values: prev.values.map(v => (v.id === id ? { ...v, [field]: val } : v)),
    }))

  const removeValue = (id: string) =>
    setData(prev => ({ ...prev, values: prev.values.filter(v => v.id !== id) }))

  const moveValueUp = (idx: number) => {
    if (idx === 0) return
    const next = [...data.values]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    setData(prev => ({ ...prev, values: next }))
  }

  const moveValueDown = (idx: number) => {
    if (idx === data.values.length - 1) return
    const next = [...data.values]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    setData(prev => ({ ...prev, values: next }))
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <Target size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Mission, Vision &amp; Values</h1>
              <p className="text-slate-400 text-sm">Core identity of Yanabiya Group</p>
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

        <div className="space-y-6">
          {/* Mission + Vision — side by side on wider screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mission */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Mission
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Section Title
                </label>
                <input
                  value={data.missionTitle}
                  onChange={e => set('missionTitle', e.target.value)}
                  className={ipt}
                  placeholder="Our Mission"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Mission Statement
                </label>
                <textarea
                  rows={6}
                  value={data.missionText}
                  onChange={e => set('missionText', e.target.value)}
                  className={`${ipt} resize-none`}
                  placeholder="Describe what Yanabiya Group is here to do…"
                />
              </div>
            </div>

            {/* Vision */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Vision
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Section Title
                </label>
                <input
                  value={data.visionTitle}
                  onChange={e => set('visionTitle', e.target.value)}
                  className={ipt}
                  placeholder="Our Vision"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                  Vision Statement
                </label>
                <textarea
                  rows={6}
                  value={data.visionText}
                  onChange={e => set('visionText', e.target.value)}
                  className={`${ipt} resize-none`}
                  placeholder="Describe the future Yanabiya Group is working towards…"
                />
              </div>
            </div>
          </div>

          {/* Values section */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                  Values
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1 font-medium">
                    Section Title
                  </label>
                  <input
                    value={data.valuesTitle}
                    onChange={e => set('valuesTitle', e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all"
                    placeholder="Our Values"
                    style={{ width: '220px' }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  setData(prev => ({ ...prev, values: [...prev.values, newValue()] }))
                }
                className="flex items-center gap-1.5 border border-slate-700 hover:border-slate-500
                           text-slate-300 hover:text-white text-sm font-medium px-4 py-2 rounded-xl transition-all"
              >
                <Plus size={14} /> Add Value
              </button>
            </div>

            {data.values.length === 0 ? (
              <div className="border border-dashed border-slate-800 rounded-xl py-10 flex flex-col items-center justify-center text-slate-600">
                <div className="text-sm font-medium mb-1">No values defined yet</div>
                <div className="text-xs">Click "Add Value" to add your first company value</div>
              </div>
            ) : (
              <div className="space-y-3">
                {data.values.map((val, idx) => (
                  <div
                    key={val.id}
                    className="bg-slate-800/50 border border-slate-800 rounded-xl p-3"
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                        Value {String(idx + 1).padStart(2, '0')}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveValueUp(idx)}
                          disabled={idx === 0}
                          className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition-all"
                        >
                          <ChevronUp size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveValueDown(idx)}
                          disabled={idx === data.values.length - 1}
                          className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-700 disabled:opacity-30 transition-all"
                        >
                          <ChevronDown size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeValue(val.id)}
                          className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <input
                        value={val.title}
                        onChange={e => updateValue(val.id, 'title', e.target.value)}
                        className={ipt}
                        placeholder="Value title (e.g. Integrity)"
                      />
                      <textarea
                        rows={2}
                        value={val.description}
                        onChange={e => updateValue(val.id, 'description', e.target.value)}
                        className={`${ipt} resize-none`}
                        placeholder="Brief description of this value…"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
