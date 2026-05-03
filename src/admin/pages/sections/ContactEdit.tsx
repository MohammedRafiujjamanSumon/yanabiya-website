import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, Phone, Mail, MapPin, Clock } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Office {
  code: string; region: string; legalName: string
  officeAddress: string; postAddress: string
  phones: string[]; mobile: string; emails: string[]; hours: string
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

function ArrayField({ label, values, onChange, icon: Icon }: {
  label: string; values: string[]; onChange: (v: string[]) => void; icon: React.ElementType
}) {
  const update = (i: number, val: string) => {
    const copy = [...values]; copy[i] = val; onChange(copy)
  }
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{label}</label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex gap-2">
            <div className="relative flex-1">
              <Icon size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input value={v} onChange={e => update(i, e.target.value)} className={`${ipt} pl-8`} />
            </div>
            <button onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
        <button onClick={() => onChange([...values, ''])}
          className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
          <Plus size={12} /> Add {label.toLowerCase()}
        </button>
      </div>
    </div>
  )
}

function OfficeCard({ office, onChange }: { office: Office; onChange: (o: Office) => void }) {
  const set = (field: keyof Office, val: unknown) => onChange({ ...office, [field]: val })
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-brand-accent/20 grid place-items-center text-xs font-bold text-brand-accent">
          {office.code}
        </div>
        <span className="font-semibold text-white">{office.region}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 font-medium">Legal Name</label>
          <input value={office.legalName} onChange={e => set('legalName', e.target.value)} className={ipt} />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1.5 font-medium">Office Hours</label>
          <div className="relative">
            <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={office.hours} onChange={e => set('hours', e.target.value)} className={`${ipt} pl-8`} />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Office Address</label>
        <div className="relative">
          <MapPin size={13} className="absolute left-3 top-3 text-slate-500" />
          <textarea rows={2} value={office.officeAddress}
            onChange={e => set('officeAddress', e.target.value)}
            className={`${ipt} pl-8 resize-none`} />
        </div>
      </div>
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Postal / P.O. Box</label>
        <input value={office.postAddress} onChange={e => set('postAddress', e.target.value)} className={ipt} />
      </div>

      <ArrayField label="Phone Numbers" values={office.phones} onChange={v => set('phones', v)} icon={Phone} />
      <ArrayField label="Email Addresses" values={office.emails} onChange={v => set('emails', v)} icon={Mail} />
    </div>
  )
}

export default function ContactEdit() {
  const [data, setData] = useState<{ offices: Office[] } | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('contact')
      .then(res => setData(res.data as { offices: Office[] }))
      .catch(() => setError('Failed to load contact data'))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('contact', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateOffice = (i: number, updated: Office) => {
    if (!data) return
    const copy = [...data.offices]; copy[i] = updated
    setData({ ...data, offices: copy })
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Contact Information</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit office addresses, phones and emails for all countries</p>
          </div>
          <button onClick={save} disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        {!data && !error && (
          <div className="space-y-4">{[1,2,3,4].map(i => <div key={i} className="h-64 bg-slate-900 rounded-xl animate-pulse" />)}</div>
        )}

        {data && (
          <div className="space-y-5">
            {data.offices.map((office, i) => (
              <OfficeCard key={office.code} office={office} onChange={updated => updateOffice(i, updated)} />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
