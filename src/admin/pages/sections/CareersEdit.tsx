import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Job { id: string; title: string; type: string; location: string }
interface CareersData {
  intro: string
  roles: Record<string, Job[]>
  applyEmail: string
}

const COUNTRIES = ['OM','GB','BD','US']
const FLAG: Record<string, string> = { OM:'🇴🇲', GB:'🇬🇧', BD:'🇧🇩', US:'🇺🇸' }
const LABEL: Record<string, string> = { OM:'Oman', GB:'United Kingdom', BD:'Bangladesh', US:'USA' }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULTS: CareersData = {
  intro: 'Join Yanabiya Group and help build the future across four countries.',
  applyEmail: 'careers@yanabiyagroup.com',
  roles: {
    OM: [
      { id:'o1', title:'Project Manager',              type:'Full-time', location:'Muscat, Oman' },
      { id:'o2', title:'Trade and Logistics Officer',  type:'Full-time', location:'Muscat, Oman' },
      { id:'o3', title:'Full Stack Developer',         type:'Full-time', location:'Muscat, Oman' },
      { id:'o4', title:'Cyber Security Engineer',      type:'Full-time', location:'Muscat, Oman' },
    ],
    GB: [
      { id:'g1', title:'Business Development Manager', type:'Full-time', location:'London, UK' },
      { id:'g2', title:'UI / UX Designer',             type:'Full-time', location:'London, UK' },
      { id:'g3', title:'Data Analyst',                  type:'Full-time', location:'London, UK' },
    ],
    BD: [
      { id:'b1', title:'Software Engineer',               type:'Full-time', location:'Dhaka, Bangladesh' },
      { id:'b2', title:'Database Administrator',          type:'Full-time', location:'Dhaka, Bangladesh' },
      { id:'b3', title:'Business Intelligence Specialist', type:'Full-time', location:'Dhaka, Bangladesh' },
    ],
    US: [
      { id:'u1', title:'Cloud Architect',           type:'Full-time', location:'Sheridan, WY, USA' },
      { id:'u2', title:'DevOps Engineer',           type:'Full-time', location:'Remote, USA' },
      { id:'u3', title:'Technical Account Manager', type:'Full-time', location:'Remote, USA' },
    ],
  },
}

export default function CareersEdit() {
  const [data, setData] = useState<CareersData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('careers').then(res => setData(res.data as CareersData)).catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('careers', data); setSaved(true); setTimeout(()=>setSaved(false),3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const updateJob = (country: string, id: string, field: keyof Job, val: string) => {
    if (!data) return
    const roles = { ...data.roles }
    roles[country] = roles[country].map(j => j.id === id ? {...j, [field]: val} : j)
    setData({...data, roles})
  }
  const addJob = (country: string) => {
    if (!data) return
    const newJob: Job = { id:`j-${Date.now()}`, title:'New Role', type:'Full-time', location:LABEL[country] }
    setData({...data, roles: {...data.roles, [country]: [...(data.roles[country]||[]), newJob]}})
  }
  const removeJob = (country: string, id: string) => {
    if (!data) return
    setData({...data, roles: {...data.roles, [country]: data.roles[country].filter(j=>j.id!==id)}})
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Careers</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit job listings per country</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-4 mb-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div><label className="block text-xs text-slate-400 mb-1.5">Intro Text</label>
              <textarea rows={2} value={data.intro} onChange={e => setData({...data, intro: e.target.value})} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Apply Email</label>
              <input type="email" value={data.applyEmail} onChange={e => setData({...data, applyEmail: e.target.value})} className={ipt} /></div>
          </div>
        </div>

        <div className="space-y-5">
          {COUNTRIES.map(code => (
            <div key={code} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">{FLAG[code]} {LABEL[code]}</h2>
                <button onClick={() => addJob(code)}
                  className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                  <Plus size={12}/> Add Role
                </button>
              </div>
              <div className="space-y-2">
                {(data.roles[code] || []).map(job => (
                  <div key={job.id} className="flex gap-2">
                    <input value={job.title} onChange={e => updateJob(code,job.id,'title',e.target.value)}
                      className={`${ipt} flex-1`} placeholder="Job Title" />
                    <input value={job.type} onChange={e => updateJob(code,job.id,'type',e.target.value)}
                      className="w-28 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-all" placeholder="Type" />
                    <input value={job.location} onChange={e => updateJob(code,job.id,'location',e.target.value)}
                      className={`${ipt} flex-1`} placeholder="Location" />
                    <button onClick={() => removeJob(code, job.id)}
                      className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={13}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
