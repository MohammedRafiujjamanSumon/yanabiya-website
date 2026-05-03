import { useEffect, useRef, useState } from 'react'
import { Save, Plus, Trash2, Upload, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { countries } from '../../../data/countries'

type CountryCode = 'OM' | 'GB' | 'BD' | 'US'

interface Activity { code: string; name: string; icon: string; image: string }
interface CountryPageData {
  code: CountryCode; heroImage: string; heroTitle: string; heroSubtitle: string
  mission: string; vision: string; branchIntro: string; parentCompany: string
  entities: string[]; activities: Activity[]
}

const CODES: CountryCode[] = ['OM','GB','BD','US']
const FLAG: Record<string,string> = { OM:'🇴🇲', GB:'🇬🇧', BD:'🇧🇩', US:'🇺🇸' }
const LABEL: Record<string,string> = { OM:'Oman (HQ)', GB:'United Kingdom', BD:'Bangladesh', US:'USA' }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

function ImageUploadField({ label, value, onChange, folder }: {
  label: string; value: string; onChange: (v: string) => void; folder: string
}) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try { const r = await api.uploadFile(folder, file); onChange(r.url) }
    catch { /* ignore */ } finally { setUploading(false) }
  }

  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input value={value} onChange={e => onChange(e.target.value)} className={`${ipt} flex-1`} placeholder="https://... or upload →" />
        <button type="button" onClick={() => ref.current?.click()} disabled={uploading}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-xs flex items-center gap-1 shrink-0 disabled:opacity-50">
          {uploading ? <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" /> : <Upload size={13}/>}
          Upload
        </button>
        <input ref={ref} type="file" accept="image/*" className="hidden"
          onChange={e => { if (e.target.files?.[0]) handleUpload(e.target.files[0]) }} />
      </div>
      {value && <img src={value} alt="" className="mt-2 h-20 w-full object-cover rounded-lg opacity-70" />}
    </div>
  )
}

export default function CountryPagesEdit() {
  const [data, setData] = useState<Record<CountryCode, CountryPageData> | null>(null)
  const [active, setActive] = useState<CountryCode>('OM')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [actExp, setActExp] = useState(false)

  useEffect(() => {
    api.getSection('country-pages')
      .then(res => setData(res.data as Record<CountryCode, CountryPageData>))
      .catch(() => {
        const d: Record<string, CountryPageData> = {}
        countries.forEach(c => {
          d[c.code] = {
            code: c.code as CountryCode,
            heroImage: (c as {heroImage?: string}).heroImage || '',
            heroTitle: `Yanabiya ${c.name}`,
            heroSubtitle: c.role || '',
            mission: '', vision: '', branchIntro: '',
            parentCompany: (c as {parentCompany?: string}).parentCompany || '',
            entities: (c as {entities?: string[]}).entities || [],
            activities: ((c as {activities?: {code?:string;name:string;icon?:string;image?:string}[]}).activities || []).map(a => ({
              code: a.code || '', name: a.name, icon: a.icon || '', image: a.image || '',
            })),
          }
        })
        setData(d as Record<CountryCode, CountryPageData>)
      })
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('country-pages', data); setSaved(true); setTimeout(()=>setSaved(false),3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const update = (field: keyof CountryPageData, val: unknown) => {
    if (!data) return
    setData({ ...data, [active]: { ...data[active], [field]: val } })
  }

  const updateActivity = (i: number, field: keyof Activity, val: string) => {
    if (!data) return
    const acts = [...data[active].activities]; acts[i] = { ...acts[i], [field]: val }; update('activities', acts)
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  const country = data[active]

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Country Pages</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit content for each country landing page</p>
          </div>
          <button type="button" onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {/* Country tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {CODES.map(code => (
            <button key={code} type="button" onClick={() => setActive(code)} aria-label={`Edit ${LABEL[code]}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all
                ${active === code ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {FLAG[code]} {LABEL[code].split(' ')[0]}
            </button>
          ))}
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Hero Banner</h2>
            <ImageUploadField label="Background Image" value={country.heroImage} onChange={v => update('heroImage', v)} folder="countries" />
            <div><label className="block text-xs text-slate-400 mb-1.5">Page Title</label>
              <input value={country.heroTitle} onChange={e => update('heroTitle', e.target.value)} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Subtitle / Role</label>
              <input value={country.heroSubtitle} onChange={e => update('heroSubtitle', e.target.value)} className={ipt} /></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Content</h2>
            <div><label className="block text-xs text-slate-400 mb-1.5">Branch Intro</label>
              <textarea rows={3} value={country.branchIntro} onChange={e => update('branchIntro', e.target.value)} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Parent Company Name</label>
              <input value={country.parentCompany} onChange={e => update('parentCompany', e.target.value)} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Mission</label>
              <textarea rows={3} value={country.mission} onChange={e => update('mission', e.target.value)} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Vision</label>
              <textarea rows={3} value={country.vision} onChange={e => update('vision', e.target.value)} className={`${ipt} resize-none`} /></div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Partner Companies / Entities</h2>
              <button type="button" onClick={() => update('entities', [...country.entities, ''])} aria-label="Add entity"
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12}/> Add
              </button>
            </div>
            <div className="space-y-2">
              {country.entities.map((e, i) => (
                <div key={i} className="flex gap-2">
                  <input value={e} onChange={ev => { const c=[...country.entities]; c[i]=ev.target.value; update('entities',c) }}
                    className={`${ipt} flex-1`} placeholder="Company name" aria-label={`Entity ${i + 1}`} />
                  <button type="button" onClick={() => update('entities', country.entities.filter((_,j)=>j!==i))} aria-label={`Remove entity ${i + 1}`}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13}/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <button type="button" onClick={() => setActExp(!actExp)}
              className="w-full flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Activities / Services ({country.activities.length})</h2>
              {actExp ? <ChevronUp size={16} className="text-slate-400"/> : <ChevronDown size={16} className="text-slate-400"/>}
            </button>
            {actExp && (
              <div className="mt-4 space-y-3">
                <button type="button" aria-label="Add activity"
                  onClick={() => update('activities', [...country.activities, {code:'',name:'',icon:'🏢',image:''}])}
                  className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                  <Plus size={12}/> Add Activity
                </button>
                {country.activities.map((act, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2 relative group">
                    <div className="grid grid-cols-4 gap-2">
                      <input value={act.icon} onChange={e => updateActivity(i,'icon',e.target.value)} aria-label="Activity icon"
                        className="bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-2xl text-center focus:outline-none" placeholder="🏢" />
                      <input value={act.code} onChange={e => updateActivity(i,'code',e.target.value)} aria-label="Activity code"
                        className="bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-xs text-white focus:outline-none" placeholder="Code" />
                      <input value={act.name} onChange={e => updateActivity(i,'name',e.target.value)} aria-label="Activity name"
                        className="col-span-2 bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-xs text-white focus:outline-none" placeholder="Activity Name" />
                    </div>
                    <input value={act.image} onChange={e => updateActivity(i,'image',e.target.value)} aria-label="Activity image URL"
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-2 py-2 text-xs text-white focus:outline-none" placeholder="Image URL" />
                    <button type="button" onClick={() => update('activities', country.activities.filter((_,j)=>j!==i))} aria-label={`Remove activity ${i + 1}`}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                      <Trash2 size={11} className="text-white"/>
                    </button>
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
