import { useEffect, useState, useRef } from 'react'
import { Save, Upload, User } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { board } from '../../../data/leadership'

interface Leader { name: string; role: string; photo: string; bio: string }

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function LeadershipEdit() {
  const [leaders, setLeaders] = useState<Leader[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const fileRefs = useRef<Record<number, HTMLInputElement | null>>({})

  useEffect(() => {
    api.getSection('leadership')
      .then(res => setLeaders(res.data as Leader[]))
      .catch(() => {
        setLeaders(board.map(m => ({
          name: m.name,
          role: m.roleKey,
          photo: typeof m.photo === 'string' ? m.photo : '',
          bio: '',
        })))
      })
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('leadership', leaders)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const update = (i: number, field: keyof Leader, val: string) => {
    setLeaders(prev => { const c = [...prev]; c[i] = { ...c[i], [field]: val }; return c })
  }

  const uploadPhoto = async (i: number, file: File) => {
    try {
      const { url } = await api.uploadFile('leadership', file)
      update(i, 'photo', url)
    } catch { /* ignore */ }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Leadership</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit board and management team profiles</p>
          </div>
          <button onClick={save} disabled={saving || !leaders.length}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-4">
          {leaders.map((leader, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex gap-4">
                {/* Photo */}
                <div
                  onClick={() => fileRefs.current[i]?.click()}
                  className="shrink-0 w-20 h-20 rounded-xl overflow-hidden bg-slate-800 cursor-pointer
                             hover:ring-2 hover:ring-brand-accent transition-all relative group"
                >
                  {leader.photo
                    ? <img src={leader.photo} alt={leader.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><User size={28} className="text-slate-600" /></div>}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload size={18} className="text-white" />
                  </div>
                </div>
                <input
                  type="file" accept="image/*" className="hidden"
                  ref={el => { fileRefs.current[i] = el }}
                  onChange={e => { if (e.target.files?.[0]) uploadPhoto(i, e.target.files[0]) }}
                />

                {/* Fields */}
                <div className="flex-1 space-y-3">
                  <input value={leader.name} onChange={e => update(i, 'name', e.target.value)}
                    className={ipt} placeholder="Full Name" />
                  <input value={leader.role} onChange={e => update(i, 'role', e.target.value)}
                    className={ipt} placeholder="Role / Title" />
                  <textarea rows={2} value={leader.bio} onChange={e => update(i, 'bio', e.target.value)}
                    className={`${ipt} resize-none`} placeholder="Short bio…" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
