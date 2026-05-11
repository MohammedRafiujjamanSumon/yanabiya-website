import { useEffect, useRef, useState } from 'react'
import { Save, Plus, Trash2, Upload } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Pillar {
  label: string
  description: string
  image: string
}

type Tab = 'sustainable-growth' | 'community-care'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const SG_DEFAULTS: Pillar[] = [
  {
    label: 'Green Operations',
    description: 'Energy-efficient offices and responsible resource usage across all branches.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Circular Practices',
    description: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Climate Commitment',
    description: 'Tree plantation drives and lower-emission business models for long-term impact.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Inclusive Growth',
    description: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
  },
]

const CC_DEFAULTS: Pillar[] = [
  {
    label: 'Welfare',
    description: 'Structured charitable drives supporting families in need with dignity and transparency.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Education',
    description: 'Scholarships, school programmes and learning resources for underserved communities.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Health',
    description: 'Free health camps, medical support and awareness programmes across regions.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Empowerment',
    description: 'Skills training and livelihood programmes that build long-term independence.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
  },
]

function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  const [uploading, setUploading] = useState(false)
  const ref = useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      const r = await api.uploadFile('community', file)
      onChange(r.url)
    } catch {
      /* ignore */
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
      <div className="flex gap-2">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${ipt} flex-1`}
          placeholder="https://... or upload →"
        />
        <button
          type="button"
          onClick={() => ref.current?.click()}
          disabled={uploading}
          className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all text-xs flex items-center gap-1 shrink-0 disabled:opacity-50"
        >
          {uploading ? (
            <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Upload size={13} />
          )}
          Upload
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            if (e.target.files?.[0]) handleUpload(e.target.files[0])
          }}
        />
      </div>
      {value && (
        <img src={value} alt="" className="mt-2 h-20 w-full object-cover rounded-lg opacity-70" />
      )}
    </div>
  )
}

function PillarEditor({
  pillars,
  onChange,
}: {
  pillars: Pillar[]
  onChange: (pillars: Pillar[]) => void
}) {
  const updatePillar = (idx: number, field: keyof Pillar, val: string) => {
    const next = [...pillars]
    next[idx] = { ...next[idx], [field]: val }
    onChange(next)
  }

  const addPillar = () =>
    onChange([...pillars, { label: '', description: '', image: '' }])

  const removePillar = (idx: number) =>
    onChange(pillars.filter((_, i) => i !== idx))

  return (
    <div className="space-y-4">
      {pillars.map((pillar, idx) => (
        <div
          key={idx}
          className="bg-slate-800 border border-slate-700 rounded-xl p-4 space-y-3 relative group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Pillar {idx + 1}
            </span>
            <button
              type="button"
              onClick={() => removePillar(idx)}
              aria-label={`Remove pillar ${idx + 1}`}
              className="w-6 h-6 bg-red-500/80 rounded-full grid place-items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={11} className="text-white" />
            </button>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Label</label>
            <input
              value={pillar.label}
              onChange={e => updatePillar(idx, 'label', e.target.value)}
              className={ipt}
              placeholder="e.g. Green Operations"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Description</label>
            <textarea
              rows={2}
              value={pillar.description}
              onChange={e => updatePillar(idx, 'description', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Short description of this pillar…"
            />
          </div>

          <ImageUploadField
            label="Image"
            value={pillar.image}
            onChange={v => updatePillar(idx, 'image', v)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addPillar}
        className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark transition-colors"
      >
        <Plus size={13} /> Add Pillar
      </button>
    </div>
  )
}

export default function CommunityPagesEdit() {
  const [activeTab, setActiveTab] = useState<Tab>('sustainable-growth')

  const [sgPillars, setSgPillars] = useState<Pillar[]>(SG_DEFAULTS)
  const [ccPillars, setCcPillars] = useState<Pillar[]>(CC_DEFAULTS)

  const [sgSaving, setSgSaving] = useState(false)
  const [sgSaved, setSgSaved] = useState(false)
  const [ccSaving, setCcSaving] = useState(false)
  const [ccSaved, setCcSaved] = useState(false)

  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('sustainable-growth')
      .then(res => {
        const d = res.data as { pillars?: Pillar[] }
        if (d?.pillars) setSgPillars(d.pillars)
      })
      .catch(() => { /* use defaults */ })

    api.getSection('community-care')
      .then(res => {
        const d = res.data as { pillars?: Pillar[] }
        if (d?.pillars) setCcPillars(d.pillars)
      })
      .catch(() => { /* use defaults */ })
  }, [])

  const saveSG = async () => {
    setSgSaving(true)
    setError('')
    try {
      await api.updateSection('sustainable-growth', { pillars: sgPillars })
      setSgSaved(true)
      setTimeout(() => setSgSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSgSaving(false)
    }
  }

  const saveCC = async () => {
    setCcSaving(true)
    setError('')
    try {
      await api.updateSection('community-care', { pillars: ccPillars })
      setCcSaved(true)
      setTimeout(() => setCcSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setCcSaving(false)
    }
  }

  const isSG = activeTab === 'sustainable-growth'

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Community Pages</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Edit pillar cards for Sustainable Growth and Community Care pages
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('sustainable-growth')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all
              ${isSG ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            Sustainable Growth
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('community-care')}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all
              ${!isSG ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            Community Care
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Sustainable Growth tab */}
        {isSG && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white">Sustainable Growth Pillars</h2>
              <button
                type="button"
                onClick={saveSG}
                disabled={sgSaving}
                className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                <Save size={14} />
                {sgSaving ? 'Saving…' : sgSaved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
            <PillarEditor pillars={sgPillars} onChange={setSgPillars} />
          </div>
        )}

        {/* Community Care tab */}
        {!isSG && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-white">Community Care Pillars</h2>
              <button
                type="button"
                onClick={saveCC}
                disabled={ccSaving}
                className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                <Save size={14} />
                {ccSaving ? 'Saving…' : ccSaved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>
            <PillarEditor pillars={ccPillars} onChange={setCcPillars} />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
