import { useEffect, useState, useRef } from 'react'
import { Save, Plus, Trash2, Upload, Image } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface LogoItem { name: string; logo: string }
interface PartnersData {
  partners: LogoItem[]
  memberships: LogoItem[]
  affiliations: LogoItem[]
}

const SECTIONS: { key: keyof PartnersData; label: string }[] = [
  { key: 'partners',     label: 'Partners' },
  { key: 'memberships',  label: 'Memberships' },
  { key: 'affiliations', label: 'Affiliations' },
]

function LogoGrid({
  items, onChange, folder,
}: { items: LogoItem[]; onChange: (v: LogoItem[]) => void; folder: string }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const { url } = await api.uploadFile(folder, file)
      const name = file.name.replace(/\.[^.]+$/, '')
      onChange([...items, { name, logo: url }])
    } catch { /* ignore */ }
    finally { setUploading(false) }
  }

  const updateName = (i: number, name: string) => {
    const copy = [...items]; copy[i] = { ...copy[i], name }; onChange(copy)
  }
  const remove = (i: number) => onChange(items.filter((_, j) => j !== i))

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
        {items.map((item, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-3 group relative">
            <div className="h-16 flex items-center justify-center mb-2 bg-slate-700/50 rounded-lg overflow-hidden">
              {item.logo
                ? <img src={item.logo} alt={item.name} className="max-h-12 max-w-full object-contain" />
                : <Image size={24} className="text-slate-500" />}
            </div>
            <input
              value={item.name}
              onChange={e => updateName(i, e.target.value)}
              className="w-full bg-transparent text-xs text-slate-300 focus:outline-none text-center"
              placeholder="Name"
            />
            <button
              onClick={() => remove(i)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6
                         bg-red-500/80 rounded-full grid place-items-center transition-opacity"
            >
              <Trash2 size={11} className="text-white" />
            </button>
          </div>
        ))}

        {/* Upload button */}
        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="h-[7.5rem] border-2 border-dashed border-slate-700 hover:border-brand-accent
                     rounded-xl flex flex-col items-center justify-center gap-2 text-slate-500
                     hover:text-brand-accent transition-all disabled:opacity-50"
        >
          {uploading
            ? <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
            : <><Upload size={20} /><span className="text-xs">Add Logo</span></>}
        </button>
      </div>

      <input
        ref={fileRef} type="file" accept="image/*" className="hidden"
        onChange={e => { if (e.target.files?.[0]) handleUpload(e.target.files[0]) }}
      />

      {/* Add by URL */}
      <button
        onClick={() => onChange([...items, { name: 'New Logo', logo: '' }])}
        className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark transition-colors mt-1"
      >
        <Plus size={12} /> Add by URL
      </button>
    </div>
  )
}

export default function PartnersEdit() {
  const [data, setData] = useState<PartnersData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('partners')
      .then(res => setData(res.data as PartnersData))
      .catch(() => setError('Failed to load partners data'))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('partners', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Partners & Logos</h1>
            <p className="text-slate-400 text-sm mt-0.5">Upload or remove partner, client and membership logos</p>
          </div>
          <button onClick={save} disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        {!data && !error && <div className="h-64 bg-slate-900 rounded-xl animate-pulse" />}

        {data && (
          <div className="space-y-8">
            {SECTIONS.map(({ key, label }) => (
              <div key={key} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h2 className="text-sm font-semibold text-white mb-4">{label}</h2>
                <LogoGrid
                  items={data[key]}
                  onChange={val => setData({ ...data, [key]: val })}
                  folder={key}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
