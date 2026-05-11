import { useEffect, useState } from 'react'
import { Save, Phone } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface DonationData {
  bankName: string
  accountName: string
  accountNo: string
  routing: string
  swift: string
  bkashNumber: string
  nagadNumber: string
}

const DEFAULTS: DonationData = {
  bankName: 'Shahjalal Islami Bank Ltd.',
  accountName: 'Jamiya Ahmadiya Madrasha & Orphanage',
  accountNo: '4057-11100000795',
  routing: '190260871',
  swift: 'SJBLBDDHCPC',
  bkashNumber: '01772921788',
  nagadNumber: '01772921788',
}

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function DonationEdit() {
  const [data, setData] = useState<DonationData>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('donation')
      .then(res => {
        if (res.data && typeof res.data === 'object') {
          setData({ ...DEFAULTS, ...(res.data as Partial<DonationData>) })
        }
      })
      .catch(() => { /* use defaults */ })
  }, [])

  const set = (field: keyof DonationData, val: string) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('donation', data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Donation & Bank Details</h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Edit bank transfer info and payment gateway numbers shown on the Donation page
            </p>
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Save size={15} />
            {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Bank Details */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 mb-5">
          <h2 className="text-sm font-semibold text-white">Bank Transfer Details</h2>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Bank Name</label>
            <input
              value={data.bankName}
              onChange={e => set('bankName', e.target.value)}
              className={ipt}
              placeholder="e.g. Shahjalal Islami Bank Ltd."
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Account Name</label>
            <input
              value={data.accountName}
              onChange={e => set('accountName', e.target.value)}
              className={ipt}
              placeholder="e.g. Jamiya Ahmadiya Madrasha & Orphanage"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Account Number</label>
            <input
              value={data.accountNo}
              onChange={e => set('accountNo', e.target.value)}
              className={ipt}
              placeholder="e.g. 4057-11100000795"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Routing Number</label>
              <input
                value={data.routing}
                onChange={e => set('routing', e.target.value)}
                className={ipt}
                placeholder="e.g. 190260871"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">SWIFT / BIC Code</label>
              <input
                value={data.swift}
                onChange={e => set('swift', e.target.value)}
                className={ipt}
                placeholder="e.g. SJBLBDDHCPC"
              />
            </div>
          </div>
        </div>

        {/* Payment Gateways */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Phone size={15} className="text-brand-accent" />
            <h2 className="text-sm font-semibold text-white">Payment Gateway Numbers</h2>
          </div>
          <p className="text-xs text-slate-500">
            Enter the raw phone number (digits only, no country code). The +880 prefix is added automatically.
          </p>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">bKash Number</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm shrink-0">+880</span>
              <input
                value={data.bkashNumber}
                onChange={e => set('bkashNumber', e.target.value)}
                className={`${ipt} flex-1`}
                placeholder="01772921788"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Nagad Number</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm shrink-0">+880</span>
              <input
                value={data.nagadNumber}
                onChange={e => set('nagadNumber', e.target.value)}
                className={`${ipt} flex-1`}
                placeholder="01772921788"
              />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
