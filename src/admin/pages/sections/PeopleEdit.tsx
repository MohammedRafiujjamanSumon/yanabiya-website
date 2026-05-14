import { useEffect, useState } from 'react'
import { Save, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Person {
  id: string
  name: string
  role: string
  image: string
  tier: string
  tierLabel: string
  country: string
  flag: string
  email: string
  shortBio: string
  fullBio: string[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const TIERS = [
  { value: 'board', label: 'Board' },
  { value: 'exec', label: 'Executive' },
  { value: 'country', label: 'Country Lead' },
  { value: 'dept', label: 'Department Head' },
]

function newPerson(): Person {
  return {
    id: `person-${Date.now()}`,
    name: '',
    role: '',
    image: '',
    tier: 'exec',
    tierLabel: '',
    country: '',
    flag: '',
    email: '',
    shortBio: '',
    fullBio: [],
  }
}

export default function PeopleEdit() {
  const [data, setData] = useState<Person[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('people')
      .then(res => setData((res.data as Person[]) || []))
      .catch(() => setData([]))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('people', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const update = (id: string, field: keyof Person, val: unknown) => {
    setData(prev => prev.map(p => p.id === id ? { ...p, [field]: val } : p))
  }

  const addPerson = () => {
    const p = newPerson()
    setData(prev => [...prev, p])
    setExpanded(p.id)
  }

  const deletePerson = (id: string) => {
    if (!confirm('Delete this person?')) return
    setData(prev => prev.filter(p => p.id !== id))
    if (expanded === id) setExpanded(null)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">People & Team</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage all team profiles, bios and contact details</p>
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
          {data.map(person => (
            <div key={person.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === person.id ? null : person.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {person.image && (
                    <img src={person.image} alt={person.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 bg-slate-700" />
                  )}
                  <div className="min-w-0">
                    <span className="font-medium text-white text-sm block truncate">
                      {person.name || 'Unnamed Person'}
                    </span>
                    {person.role && (
                      <span className="text-xs text-slate-500 block truncate">{person.role}</span>
                    )}
                  </div>
                  {person.tier && (
                    <span className="shrink-0 text-[10px] uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                      {person.tier}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-3">
                  <button
                    onClick={e => { e.stopPropagation(); deletePerson(person.id) }}
                    className="text-red-400 hover:text-red-300 p-1 transition-colors"
                    title="Delete person"
                  >
                    <Trash2 size={14} />
                  </button>
                  {expanded === person.id
                    ? <ChevronUp size={16} className="text-slate-400" />
                    : <ChevronDown size={16} className="text-slate-400" />}
                </div>
              </button>

              {expanded === person.id && (
                <div className="px-5 pb-5 space-y-4 border-t border-slate-800">
                  <div className="pt-4 grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Full Name</div>
                      <input className={ipt} value={person.name} placeholder="Full Name"
                        onChange={e => update(person.id, 'name', e.target.value)} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Role / Title</div>
                      <input className={ipt} value={person.role} placeholder="e.g. Chief Executive Officer"
                        onChange={e => update(person.id, 'role', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">Profile Image</div>
                    <div className="flex gap-2 items-center">
                      <input type="text" className={ipt} value={person.image}
                        onChange={e => update(person.id, 'image', e.target.value)}
                        placeholder="Image URL" />
                      <label className="shrink-0 cursor-pointer text-xs bg-slate-700 hover:bg-slate-600 text-white px-3 py-2.5 rounded-lg transition-colors">
                        Upload
                        <input type="file" accept="image/*,video/*" className="hidden" onChange={async e => {
                          const file = e.target.files?.[0]; if (!file) return
                          try {
                            const res = await api.uploadFile('people', file)
                            update(person.id, 'image', res.url)
                          } catch { /* ignore */ }
                        }} />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Tier</div>
                      <select className={ipt} value={person.tier}
                        onChange={e => update(person.id, 'tier', e.target.value)}>
                        {TIERS.map(t => (
                          <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Tier Label</div>
                      <input className={ipt} value={person.tierLabel} placeholder="e.g. Board Member"
                        onChange={e => update(person.id, 'tierLabel', e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Country</div>
                      <input className={ipt} value={person.country} placeholder="e.g. Oman"
                        onChange={e => update(person.id, 'country', e.target.value)} />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Flag Emoji</div>
                      <input className={ipt} value={person.flag} placeholder="🇴🇲"
                        onChange={e => update(person.id, 'flag', e.target.value)} />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">Email</div>
                    <input type="email" className={ipt} value={person.email} placeholder="name@yanabiyagroup.com"
                      onChange={e => update(person.id, 'email', e.target.value)} />
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">Short Bio</div>
                    <textarea rows={2} className={`${ipt} resize-none`} value={person.shortBio}
                      placeholder="One or two sentence summary…"
                      onChange={e => update(person.id, 'shortBio', e.target.value)} />
                  </div>

                  <div>
                    <div className="text-xs font-medium text-slate-400 mb-1">
                      Full Bio <span className="text-slate-600 font-normal">(separate paragraphs with a blank line)</span>
                    </div>
                    <textarea rows={6} className={`${ipt} resize-none`}
                      value={person.fullBio.join('\n\n')}
                      placeholder="Full biography text…&#10;&#10;Second paragraph here…"
                      onChange={e => update(person.id, 'fullBio', e.target.value.split(/\n\n+/))} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={addPerson}
          className="mt-4 flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
          <Plus size={14} /> Add Person
        </button>
      </div>
    </AdminLayout>
  )
}
