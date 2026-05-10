import { useEffect, useState } from 'react'
import { Save, ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Branch {
  code: string
  name: string
  flag: string
  established: string
  legalEntity: string
  address: string
  phone: string
  email: string
  website: string
  description: string
  active: boolean
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULT_BRANCHES: Branch[] = [
  {
    code: 'OM', name: 'Oman', flag: '🇴🇲', established: '2010',
    legalEntity: '', address: '', phone: '', email: '', website: '', description: '', active: true,
  },
  {
    code: 'GB', name: 'United Kingdom', flag: '🇬🇧', established: '2015',
    legalEntity: '', address: '', phone: '', email: '', website: '', description: '', active: true,
  },
  {
    code: 'BD', name: 'Bangladesh', flag: '🇧🇩', established: '2018',
    legalEntity: '', address: '', phone: '', email: '', website: '', description: '', active: true,
  },
  {
    code: 'US', name: 'United States', flag: '🇺🇸', established: '2020',
    legalEntity: '', address: '', phone: '', email: '', website: '', description: '', active: true,
  },
]

function newBranch(): Branch {
  return {
    code: '',
    name: '',
    flag: '',
    established: '',
    legalEntity: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
    active: true,
  }
}

export default function BranchesEdit() {
  const [data, setData] = useState<Branch[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('branches')
      .then(res => setData(res.data as Branch[]))
      .catch(() => setData(DEFAULT_BRANCHES))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('branches', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const update = (idx: number, field: keyof Branch, val: unknown) => {
    setData(prev => {
      const copy = [...prev]
      copy[idx] = { ...copy[idx], [field]: val }
      return copy
    })
  }

  const addBranch = () => {
    const b = newBranch()
    setData(prev => [...prev, b])
    setExpanded(`__new__${data.length}`)
  }

  const deleteBranch = (idx: number, code: string) => {
    const label = code || `branch #${idx + 1}`
    if (!confirm(`Delete ${label}? This cannot be undone.`)) return
    setData(prev => prev.filter((_, i) => i !== idx))
    setExpanded(null)
  }

  // Use code or index as accordion key
  const keyFor = (branch: Branch, idx: number) => branch.code || `__new__${idx}`

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Global Branches</h1>
            <p className="text-slate-400 text-sm mt-0.5">Manage country offices, addresses and contact details</p>
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
          {data.map((branch, idx) => {
            const key = keyFor(branch, idx)
            return (
              <div key={`${key}-${idx}`} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpanded(expanded === key ? null : key)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xl shrink-0">{branch.flag || '🏳'}</span>
                    <div className="min-w-0">
                      <span className="font-medium text-white text-sm block truncate">
                        {branch.name || 'Unnamed Branch'}
                      </span>
                      {branch.legalEntity && (
                        <span className="text-xs text-slate-500 block truncate">{branch.legalEntity}</span>
                      )}
                    </div>
                    {branch.code && (
                      <span className="shrink-0 text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {branch.code}
                      </span>
                    )}
                    {!branch.active && (
                      <span className="shrink-0 text-[10px] uppercase px-2 py-0.5 rounded-md bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <button
                      onClick={e => { e.stopPropagation(); deleteBranch(idx, branch.code) }}
                      className="text-red-400 hover:text-red-300 p-1 transition-colors"
                      title="Delete branch"
                    >
                      <Trash2 size={14} />
                    </button>
                    {expanded === key
                      ? <ChevronUp size={16} className="text-slate-400" />
                      : <ChevronDown size={16} className="text-slate-400" />}
                  </div>
                </button>

                {expanded === key && (
                  <div className="px-5 pb-5 space-y-4 border-t border-slate-800">
                    <div className="pt-4 grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Country Code</div>
                        <div className="flex items-center gap-2">
                          <span className="shrink-0 text-xs font-mono uppercase px-3 py-2.5 rounded-lg bg-slate-700 text-slate-300 border border-slate-600 select-none">
                            {branch.code || '—'}
                          </span>
                          <input className={ipt} value={branch.code}
                            placeholder="OM" maxLength={4}
                            onChange={e => update(idx, 'code', e.target.value.toUpperCase())} />
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Country Name</div>
                        <input className={ipt} value={branch.name} placeholder="e.g. Oman"
                          onChange={e => update(idx, 'name', e.target.value)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Flag Emoji</div>
                        <input className={ipt} value={branch.flag} placeholder="🇴🇲"
                          onChange={e => update(idx, 'flag', e.target.value)} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Year Established</div>
                        <input className={ipt} value={branch.established} placeholder="e.g. 2010"
                          onChange={e => update(idx, 'established', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Legal Entity Name</div>
                      <input className={ipt} value={branch.legalEntity}
                        placeholder="e.g. Yanabiya Group LLC"
                        onChange={e => update(idx, 'legalEntity', e.target.value)} />
                    </div>

                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Address</div>
                      <textarea rows={3} className={`${ipt} resize-none`} value={branch.address}
                        placeholder="Street, City, Postal Code, Country"
                        onChange={e => update(idx, 'address', e.target.value)} />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Phone</div>
                        <input className={ipt} value={branch.phone} placeholder="+968 xxxx xxxx"
                          onChange={e => update(idx, 'phone', e.target.value)} />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-400 mb-1">Email</div>
                        <input type="email" className={ipt} value={branch.email}
                          placeholder="office@yanabiyagroup.com"
                          onChange={e => update(idx, 'email', e.target.value)} />
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Website</div>
                      <input type="url" className={ipt} value={branch.website}
                        placeholder="https://yanabiyagroup.com"
                        onChange={e => update(idx, 'website', e.target.value)} />
                    </div>

                    <div>
                      <div className="text-xs font-medium text-slate-400 mb-1">Description</div>
                      <textarea rows={3} className={`${ipt} resize-none`} value={branch.description}
                        placeholder="Brief description of this office…"
                        onChange={e => update(idx, 'description', e.target.value)} />
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" checked={branch.active}
                          onChange={e => update(idx, 'active', e.target.checked)} />
                        <div className="w-9 h-5 rounded-full bg-slate-700 peer-checked:bg-brand-accent transition-colors" />
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform peer-checked:translate-x-4" />
                      </div>
                      <span className="text-sm text-slate-300">Active / Visible on site</span>
                    </label>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <button onClick={addBranch}
          className="mt-4 flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
          <Plus size={14} /> Add Branch
        </button>
      </div>
    </AdminLayout>
  )
}
