import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface StatItem { value: string; kKey: string }
interface NetworkData {
  stats: StatItem[]
  memberships: string[]
  body: string[]
}

const DEFAULTS: NetworkData = {
  stats: [
    { value: '500+', kKey: 'clients' },
    { value: '9',    kKey: 'entities' },
    { value: '4',    kKey: 'countries' },
    { value: '15Y+', kKey: 'track' },
  ],
  memberships: [
    'Oman Chamber of Commerce & Industry',
    'UK British-Arab Trade Network',
    'Bangladesh Chamber of Commerce',
    'AWS Partner Network',
    'Microsoft Partner Network',
    'Oracle Partner Network',
  ],
  body: [
    "Yanabiya Group operates a trusted, multi-regional network that connects clients, partners, and communities across Oman, the UK, Bangladesh, and the USA.",
    "We maintain active memberships with chambers of commerce, trade bodies, and industry associations, ensuring our operations remain aligned with global standards.",
    "Our network is built on long-term relationships, not transactions. By collaborating with established organisations and reliable partners, we create strong, scalable global businesses.",
  ],
}

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function NetworkEdit() {
  const [data, setData] = useState<NetworkData>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('network')
      .then(res => {
        const d = res.data as Partial<NetworkData>
        setData({
          stats:       d.stats       ?? DEFAULTS.stats,
          memberships: d.memberships ?? DEFAULTS.memberships,
          body:        d.body        ?? DEFAULTS.body,
        })
      })
      .catch(() => {})
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('network', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  // --- Stats helpers (fixed 4 rows) ---
  const setStat = (i: number, field: keyof StatItem, value: string) =>
    setData(prev => {
      const stats = [...prev.stats]
      stats[i] = { ...stats[i], [field]: value }
      return { ...prev, stats }
    })

  // --- Memberships helpers ---
  const setMembership = (i: number, value: string) =>
    setData(prev => {
      const memberships = [...prev.memberships]
      memberships[i] = value
      return { ...prev, memberships }
    })
  const addMembership = () =>
    setData(prev => ({ ...prev, memberships: [...prev.memberships, ''] }))
  const removeMembership = (i: number) =>
    setData(prev => ({ ...prev, memberships: prev.memberships.filter((_, idx) => idx !== i) }))

  // --- Body helpers ---
  const setBodyPara = (i: number, value: string) =>
    setData(prev => {
      const body = [...prev.body]
      body[i] = value
      return { ...prev, body }
    })
  const addBodyPara = () =>
    setData(prev => ({ ...prev, body: [...prev.body, ''] }))
  const removeBodyPara = (i: number) =>
    setData(prev => ({ ...prev, body: prev.body.filter((_, idx) => idx !== i) }))

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Network Section</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit stats, memberships and body paragraphs</p>
          </div>
          <button
            onClick={save}
            disabled={saving}
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

        {/* Stats */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Stats (4 fixed)</h2>
          <div className="space-y-3">
            {data.stats.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Value</label>
                  <input
                    value={s.value}
                    onChange={e => setStat(i, 'value', e.target.value)}
                    className={ipt}
                    placeholder="e.g. 500+"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Label key</label>
                  <input
                    value={s.kKey}
                    onChange={e => setStat(i, 'kKey', e.target.value)}
                    className={ipt}
                    placeholder="e.g. clients"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Memberships */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Memberships</h2>
            <button
              type="button"
              onClick={addMembership}
              className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors"
            >
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {data.memberships.map((m, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  value={m}
                  onChange={e => setMembership(i, e.target.value)}
                  className={`${ipt} flex-1`}
                  placeholder="Membership name"
                />
                <button
                  type="button"
                  onClick={() => removeMembership(i)}
                  title="Remove"
                  className="shrink-0 w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/30
                             text-red-400 grid place-items-center transition-all"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            {data.memberships.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-3">No memberships yet. Click Add.</p>
            )}
          </div>
        </section>

        {/* Body Paragraphs */}
        <section className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Body Paragraphs</h2>
            <button
              type="button"
              onClick={addBodyPara}
              className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors"
            >
              <Plus size={12} /> Add
            </button>
          </div>
          <div className="space-y-3">
            {data.body.map((para, i) => (
              <div key={i} className="relative">
                <textarea
                  rows={3}
                  value={para}
                  onChange={e => setBodyPara(i, e.target.value)}
                  className={`${ipt} resize-none pr-10`}
                  placeholder="Paragraph text…"
                />
                <button
                  type="button"
                  onClick={() => removeBodyPara(i)}
                  title="Remove"
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500/30
                             text-red-400 grid place-items-center transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
            {data.body.length === 0 && (
              <p className="text-xs text-slate-600 text-center py-3">No paragraphs yet. Click Add.</p>
            )}
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
