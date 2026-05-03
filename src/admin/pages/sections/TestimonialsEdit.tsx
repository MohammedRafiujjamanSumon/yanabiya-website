import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, Star } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Testimonial { id: string; country: string; quote: string; author: string; role: string; rating: number }

const COUNTRIES = ['OM','GB','BD','US']
const FLAG: Record<string,string> = { OM:'🇴🇲', GB:'🇬🇧', BD:'🇧🇩', US:'🇺🇸' }
const LABEL: Record<string,string> = { OM:'Oman', GB:'United Kingdom', BD:'Bangladesh', US:'USA' }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const defaults: Testimonial[] = [
  { id:'t1', country:'OM', quote:'Yanabiya Group delivered our ERP rollout across three branches without a single business-day disruption.', author:'Khalid Al-Hashmi', role:'Operations Director, Muscat', rating:5 },
  { id:'t2', country:'OM', quote:'From procurement to deployment, the Yanabiya team treated our project as their own.', author:'Aisha Al-Balushi', role:'Group CFO, Al Khuwair', rating:5 },
  { id:'t3', country:'GB', quote:'A reliable European delivery partner is hard to find. The Yanabiya London team brought enterprise-grade architecture.', author:'James Whitcombe', role:'Head of Engineering, London', rating:5 },
  { id:'t4', country:'BD', quote:'Our Dhaka warehouse automation project was delivered on time, on budget, and exceeded our throughput targets.', author:'Tanvir Rahman', role:'Director of Operations, Dhaka', rating:5 },
  { id:'t5', country:'US', quote:'Yanabiya\'s US team bridged the gap between our Gulf operations and domestic compliance requirements seamlessly.', author:'Sarah Mitchell', role:'VP Technology, Sheridan', rating:5 },
]

export default function TestimonialsEdit() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('testimonials').then(res => setTestimonials(res.data as Testimonial[])).catch(() => setTestimonials(defaults))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try { await api.updateSection('testimonials', testimonials); setSaved(true); setTimeout(()=>setSaved(false),3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const update = (id: string, field: keyof Testimonial, val: string | number) =>
    setTestimonials(prev => prev.map(t => t.id === id ? {...t, [field]: val} : t))

  const addNew = (country: string) => {
    const t: Testimonial = { id:`t-${Date.now()}`, country, quote:'', author:'', role:'', rating:5 }
    setTestimonials([...testimonials, t])
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Testimonials</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit client testimonials per country</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-6">
          {COUNTRIES.map(code => {
            const group = testimonials.filter(t => t.country === code)
            return (
              <div key={code} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-white">{FLAG[code]} {LABEL[code]}</h2>
                  <button onClick={() => addNew(code)}
                    className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                    <Plus size={12}/> Add
                  </button>
                </div>
                <div className="space-y-4">
                  {group.map(t => (
                    <div key={t.id} className="bg-slate-800 rounded-xl p-4 space-y-3 relative group">
                      <div>
                        <label className="block text-xs text-slate-400 mb-1.5">Quote</label>
                        <textarea rows={3} value={t.quote} onChange={e => update(t.id,'quote',e.target.value)} className={`${ipt} resize-none`} placeholder="Client quote…" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs text-slate-400 mb-1.5">Author Name</label>
                          <input value={t.author} onChange={e => update(t.id,'author',e.target.value)} className={ipt} placeholder="Full Name" /></div>
                        <div><label className="block text-xs text-slate-400 mb-1.5">Role / Company</label>
                          <input value={t.role} onChange={e => update(t.id,'role',e.target.value)} className={ipt} placeholder="Director, Company Name" /></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label className="text-xs text-slate-400">Rating</label>
                        <div className="flex gap-1">
                          {[1,2,3,4,5].map(n => (
                            <button key={n} onClick={() => update(t.id,'rating',n)}>
                              <Star size={16} className={n <= t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => setTestimonials(testimonials.filter(x => x.id !== t.id))}
                        className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-7 h-7 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                        <Trash2 size={12} className="text-white" />
                      </button>
                    </div>
                  ))}
                  {group.length === 0 && (
                    <p className="text-xs text-slate-600 text-center py-4">No testimonials yet. Click Add.</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
