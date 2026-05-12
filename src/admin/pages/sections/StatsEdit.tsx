import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, BarChart2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface StatItem {
  id: string
  value: string
  label: string
  icon: string
}

function newStat(): StatItem {
  return { id: `stat-${Date.now()}`, value: '', label: '', icon: '' }
}

export default function StatsEdit() {
  const { key = 'general' } = useParams<{ key: string }>()
  const [stats, setStats] = useState<StatItem[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const sectionKey = `stats-${key}`
  const pageLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')

  useEffect(() => {
    api
      .getSection(sectionKey)
      .then(res => {
        if (Array.isArray(res.data)) setStats(res.data as StatItem[])
      })
      .catch(() => {})
  }, [sectionKey])

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection(sectionKey, stats)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const update = (id: string, field: keyof StatItem, val: string) =>
    setStats(prev => prev.map(s => (s.id === id ? { ...s, [field]: val } : s)))

  const remove = (id: string) => setStats(prev => prev.filter(s => s.id !== id))

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const next = [...stats]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    setStats(next)
  }

  const moveDown = (idx: number) => {
    if (idx === stats.length - 1) return
    const next = [...stats]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    setStats(next)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <BarChart2 size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Stats</h1>
              <p className="text-slate-400 text-sm">{pageLabel} page statistics</p>
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
              onClick={() => setStats(prev => [...prev, newStat()])}
              className="flex items-center gap-1.5 border border-slate-700 hover:border-slate-500
                         text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
            >
              <Plus size={14} /> Add Stat
            </button>
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

        {stats.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-2xl py-16 flex flex-col items-center justify-center text-slate-600">
            <BarChart2 size={32} className="mb-3" />
            <div className="text-sm font-medium mb-1">No stats yet</div>
            <div className="text-xs">Click "Add Stat" to create your first statistic</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4"
              >
                {/* Card header: order controls + delete */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                    Stat {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                      <ChevronUp size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === stats.length - 1}
                      className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                      <ChevronDown size={13} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(stat.id)}
                      className="p-1 rounded text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                {/* Preview */}
                {(stat.value || stat.label) && (
                  <div className="mb-3 text-center bg-slate-800/50 rounded-lg py-3 px-2">
                    {stat.icon && (
                      <div className="text-2xl mb-1">{stat.icon}</div>
                    )}
                    <div className="text-xl font-bold text-brand-accent">
                      {stat.value || '—'}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {stat.label || 'Label'}
                    </div>
                  </div>
                )}

                {/* Fields */}
                <div className="space-y-2.5">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">
                      Value <span className="text-slate-600">(e.g. 15+, $2M, 98%)</span>
                    </label>
                    <input
                      value={stat.value}
                      onChange={e => update(stat.id, 'value', e.target.value)}
                      className={ipt}
                      placeholder="15+"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">Label</label>
                    <input
                      value={stat.label}
                      onChange={e => update(stat.id, 'label', e.target.value)}
                      className={ipt}
                      placeholder="Countries Served"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1 font-medium">
                      Icon <span className="text-slate-600">(emoji, optional)</span>
                    </label>
                    <input
                      value={stat.icon}
                      onChange={e => update(stat.id, 'icon', e.target.value)}
                      className={ipt}
                      placeholder="🌍"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
