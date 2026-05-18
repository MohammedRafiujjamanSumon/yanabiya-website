import { useEffect, useState, useRef } from 'react'
import { Save, Upload } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Hub { key: string; title: string; eyebrow: string; image: string }
interface CommunityHubsData { hubs: Hub[] }

const DEFAULT_HUBS: Hub[] = [
  { key: 'sustainable-growth', title: 'Sustainable Growth', eyebrow: 'Long-term Value',    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80' },
  { key: 'blog',               title: 'Blog',               eyebrow: 'Stories & Insights', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80' },
  { key: 'community-care',     title: 'Community Care',     eyebrow: 'Welfare Programmes', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80' },
  { key: 'donation',           title: 'Donation',           eyebrow: 'Give & Impact',      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80' },
  { key: 'testimonials',       title: 'Testimonials',       eyebrow: 'Voices & Stories',   image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
  { key: 'careers',            title: 'Careers',            eyebrow: 'Join the Team',      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80' },
]

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

function HubCard({
  hub,
  onChange,
  onUpload,
}: {
  hub: Hub
  onChange: (field: keyof Omit<Hub, 'key'>, value: string) => void
  onUpload: (file: File) => void
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFile = async (file: File) => {
    setUploading(true)
    try { onUpload(file) } finally { setUploading(false) }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">{hub.key}</p>

      <div className="flex gap-4">
        {/* Image preview + upload */}
        <div
          onClick={() => fileRef.current?.click()}
          className="shrink-0 w-24 h-20 rounded-xl overflow-hidden bg-slate-800 cursor-pointer
                     hover:ring-2 hover:ring-brand-accent transition-all relative group"
        >
          {hub.image ? (
            <img
              src={hub.image}
              alt={hub.title}
              className="w-full h-full object-cover"
              onError={e => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No image</div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            {uploading
              ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              : <Upload size={16} className="text-white" />}
          </div>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Upload hub image"
          onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
        />

        {/* Fields */}
        <div className="flex-1 space-y-2">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Title</label>
            <input
              value={hub.title}
              onChange={e => onChange('title', e.target.value)}
              className={ipt}
              placeholder="Hub title"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Eyebrow</label>
            <input
              value={hub.eyebrow}
              onChange={e => onChange('eyebrow', e.target.value)}
              className={ipt}
              placeholder="Eyebrow text"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-slate-500 mb-1">Image URL</label>
            <input
              value={hub.image}
              onChange={e => onChange('image', e.target.value)}
              className={ipt}
              placeholder="https://…"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommunityHubsEdit() {
  const [data, setData] = useState<CommunityHubsData>({ hubs: DEFAULT_HUBS })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('community-hubs')
      .then(res => {
        const d = res.data as Partial<CommunityHubsData>
        if (d.hubs?.length) {
          // Merge API data onto defaults so any new hubs added later still appear
          const merged = DEFAULT_HUBS.map(def => {
            const apiHub = d.hubs!.find(h => h.key === def.key)
            return apiHub ? { ...def, ...apiHub } : def
          })
          setData({ hubs: merged })
        }
      })
      .catch(() => {})
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('community-hubs', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const updateHub = (i: number, field: keyof Omit<Hub, 'key'>, value: string) =>
    setData(prev => {
      const hubs = [...prev.hubs]
      hubs[i] = { ...hubs[i], [field]: value }
      return { ...prev, hubs }
    })

  const uploadHubImage = async (i: number, file: File) => {
    const { url } = await api.uploadFile('community', file)
    updateHub(i, 'image', url)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Community Hubs</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit titles, eyebrows and images for each community hub card</p>
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

        <div className="space-y-4">
          {data.hubs.map((hub, i) => (
            <HubCard
              key={hub.key}
              hub={hub}
              onChange={(field, value) => updateHub(i, field, value)}
              onUpload={file => uploadHubImage(i, file)}
            />
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
