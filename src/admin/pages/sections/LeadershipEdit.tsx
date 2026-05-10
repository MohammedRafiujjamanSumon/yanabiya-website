import { useEffect, useState, useRef } from 'react'
import { Save, Upload, User, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Leader { name: string; role: string; photo: string; bio: string }
interface LeadershipData {
  chairman?: Leader
  viceChairman?: Leader
  board?: Leader[]
  management?: Leader[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const blank = (): Leader => ({ name: '', role: '', photo: '', bio: '' })

function LeaderCard({
  leader, onChange, onUpload, onDelete, label,
}: {
  leader: Leader
  onChange: (f: keyof Leader, v: string) => void
  onUpload: (file: File) => void
  onDelete?: () => void
  label?: string
}) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative">
      {label && <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">{label}</p>}
      <div className="flex gap-4">
        <div
          onClick={() => fileRef.current?.click()}
          className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-slate-800 cursor-pointer
                     hover:ring-2 hover:ring-brand-accent transition-all relative group"
        >
          {leader.photo
            ? <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" onError={e => (e.currentTarget.style.display='none')} />
            : <div className="w-full h-full flex items-center justify-center"><User size={28} className="text-slate-600" /></div>}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Upload size={18} className="text-white" />
          </div>
        </div>
        <input type="file" accept="image/*" className="hidden" ref={fileRef} aria-label="Upload photo"
          onChange={e => { if (e.target.files?.[0]) onUpload(e.target.files[0]) }} />

        <div className="flex-1 space-y-3">
          <input value={leader.name} onChange={e => onChange('name', e.target.value)} className={ipt} placeholder="Full Name" />
          <input value={leader.role} onChange={e => onChange('role', e.target.value)} className={ipt} placeholder="Role / Title" />
          <textarea rows={2} value={leader.bio} onChange={e => onChange('bio', e.target.value)}
            className={`${ipt} resize-none`} placeholder="Short bio…" />
        </div>
      </div>
      {onDelete && (
        <button type="button" onClick={onDelete} title="Remove"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-red-500/10 hover:bg-red-500/30
                     text-red-400 grid place-items-center transition-all">
          <Trash2 size={12} />
        </button>
      )}
    </div>
  )
}

export default function LeadershipEdit() {
  const [data, setData] = useState<LeadershipData>({ chairman: blank(), viceChairman: blank(), board: [], management: [] })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('leadership')
      .then(res => {
        const d = res.data as LeadershipData
        setData({
          chairman:    d.chairman    ?? blank(),
          viceChairman:d.viceChairman?? blank(),
          board:       d.board       ?? [],
          management:  d.management  ?? [],
        })
      })
      .catch(() => {})
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('leadership', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const uploadPhoto = async (folder: string, file: File): Promise<string> => {
    const { url } = await api.uploadFile(folder, file)
    return url
  }

  const setTop = (key: 'chairman' | 'viceChairman', f: keyof Leader, v: string) =>
    setData(prev => ({ ...prev, [key]: { ...prev[key]!, [f]: v } }))

  const setList = (key: 'board' | 'management', i: number, f: keyof Leader, v: string) =>
    setData(prev => {
      const arr = [...(prev[key] ?? [])]
      arr[i] = { ...arr[i], [f]: v }
      return { ...prev, [key]: arr }
    })

  const addToList = (key: 'board' | 'management') =>
    setData(prev => ({ ...prev, [key]: [...(prev[key] ?? []), blank()] }))

  const removeFromList = (key: 'board' | 'management', i: number) =>
    setData(prev => ({ ...prev, [key]: (prev[key] ?? []).filter((_, idx) => idx !== i) }))

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Leadership</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit Chairman, Vice Chairman, board and management team</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        {/* Chairman */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Chairman & CEO</h2>
        <LeaderCard
          leader={data.chairman!}
          label="Chairman & CEO"
          onChange={(f, v) => setTop('chairman', f, v)}
          onUpload={async file => { const url = await uploadPhoto('leadership', file); setTop('chairman', 'photo', url) }}
        />

        {/* Vice Chairman */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 mt-6">Vice Chairman</h2>
        <LeaderCard
          leader={data.viceChairman!}
          label="Vice Chairman"
          onChange={(f, v) => setTop('viceChairman', f, v)}
          onUpload={async file => { const url = await uploadPhoto('leadership', file); setTop('viceChairman', 'photo', url) }}
        />

        {/* Board */}
        <div className="flex items-center justify-between mt-6 mb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Board Members</h2>
          <button type="button" onClick={() => addToList('board')}
            className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
            <Plus size={12} /> Add Member
          </button>
        </div>
        <div className="space-y-3">
          {(data.board ?? []).map((leader, i) => (
            <LeaderCard key={i} leader={leader}
              onChange={(f, v) => setList('board', i, f, v)}
              onUpload={async file => { const url = await uploadPhoto('leadership', file); setList('board', i, 'photo', url) }}
              onDelete={() => removeFromList('board', i)}
            />
          ))}
          {!(data.board?.length) && (
            <p className="text-xs text-slate-600 text-center py-4">No board members yet. Click Add Member.</p>
          )}
        </div>

        {/* Management */}
        <div className="flex items-center justify-between mt-6 mb-2">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Management Team</h2>
          <button type="button" onClick={() => addToList('management')}
            className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
            <Plus size={12} /> Add Member
          </button>
        </div>
        <div className="space-y-3">
          {(data.management ?? []).map((leader, i) => (
            <LeaderCard key={i} leader={leader}
              onChange={(f, v) => setList('management', i, f, v)}
              onUpload={async file => { const url = await uploadPhoto('leadership', file); setList('management', i, 'photo', url) }}
              onDelete={() => removeFromList('management', i)}
            />
          ))}
          {!(data.management?.length) && (
            <p className="text-xs text-slate-600 text-center py-4">No management members yet. Click Add Member.</p>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
