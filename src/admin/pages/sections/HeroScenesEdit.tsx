import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Scene {
  id: string; eyebrow: string; headline: string; body: string
  photo: string; photoPos: string; cta: { label: string; href: string }
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const defaultScene = (): Scene => ({
  id: `scene-${Date.now()}`,
  eyebrow: 'New Scene',
  headline: 'Your headline here',
  body: 'Short description',
  photo: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=1600&q=80',
  photoPos: 'center',
  cta: { label: 'Learn More', href: '/' },
})

export default function HeroScenesEdit() {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('hero-scenes')
      .then(res => setScenes(res.data as Scene[]))
      .catch(() => {
        // fallback: default 7 scenes
        setScenes([
          { id: 's1', eyebrow: 'Scene 01 · Opening', headline: 'Connecting Businesses Across Borders', body: 'A world driven by connection, innovation, and opportunity.', photo: 'https://images.unsplash.com/photo-1493946740644-2d8a1f1a6aff?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Explore Global Presence', href: '/#global' } },
          { id: 's2', eyebrow: 'Scene 02 · The Group', headline: 'A dynamic group of companies.', body: 'Building an integrated global business ecosystem across multiple industries.', photo: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Explore About Us', href: '/about-us' } },
          { id: 's3', eyebrow: 'Scene 03 · Services', headline: 'Complete business solutions.', body: 'International trade · Strategic consulting · Logistics · Investment.', photo: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Explore Our Services', href: '/#businesses' } },
          { id: 's4', eyebrow: 'Scene 04 · Trusted Network', headline: 'Trusted by partners worldwide.', body: 'We collaborate with leading organisations to create long-term value.', photo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Explore Trusted Network', href: '/#partnerships' } },
          { id: 's5', eyebrow: 'Scene 05 · Community', headline: 'Growth beyond business.', body: 'Empowering communities and creating sustainable impact.', photo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Explore Community', href: '/community' } },
          { id: 's6', eyebrow: 'Scene 06 · Leadership', headline: 'Visionary leadership.', body: 'Turning ideas into global success stories.', photo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80', photoPos: 'center top', cta: { label: 'Meet Our Leadership', href: '/leadership/management' } },
          { id: 's7', eyebrow: 'Scene 07 · Closing', headline: 'Yanabiya Group', body: 'Building the Future, Together.', photo: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80', photoPos: 'center', cta: { label: 'Get in Touch', href: '/contact' } },
        ])
      })
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('hero-scenes', scenes)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const update = (id: string, field: string, val: unknown) =>
    setScenes(prev => prev.map(s => s.id === id ? { ...s, [field]: val } : s))
  const updateCta = (id: string, field: string, val: string) =>
    setScenes(prev => prev.map(s => s.id === id ? { ...s, cta: { ...s.cta, [field]: val } } : s))
  const remove = (id: string) => setScenes(prev => prev.filter(s => s.id !== id))
  const moveUp = (i: number) => { if (i === 0) return; const c = [...scenes]; [c[i-1],c[i]]=[c[i],c[i-1]]; setScenes(c) }
  const moveDown = (i: number) => { if (i === scenes.length-1) return; const c = [...scenes]; [c[i],c[i+1]]=[c[i+1],c[i]]; setScenes(c) }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Hero Slides</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit the 7 rotating hero banner scenes</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setScenes([...scenes, defaultScene()])}
              className="flex items-center gap-1.5 text-sm text-brand-accent border border-brand-accent/30
                         px-4 py-2.5 rounded-xl hover:bg-brand-accent/10 transition-all">
              <Plus size={14} /> Add Scene
            </button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
              <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-3">
          {scenes.map((scene, i) => (
            <div key={scene.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 hover:bg-slate-800/50 transition-colors">
                <GripVertical size={16} className="text-slate-600 shrink-0" />
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => moveUp(i)} className="p-1 text-slate-600 hover:text-slate-300 transition-colors"><ChevronUp size={13} /></button>
                  <button onClick={() => moveDown(i)} className="p-1 text-slate-600 hover:text-slate-300 transition-colors"><ChevronDown size={13} /></button>
                </div>
                <button onClick={() => setExpanded(expanded === scene.id ? null : scene.id)}
                  className="flex-1 text-left text-sm font-medium text-white">
                  <span className="text-slate-500 text-xs mr-2">{i+1}.</span>{scene.headline}
                </button>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setExpanded(expanded === scene.id ? null : scene.id)}
                    className="text-slate-500 hover:text-slate-300 p-1.5 transition-colors">
                    {expanded === scene.id ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
                  </button>
                  <button onClick={() => remove(scene.id)}
                    className="text-slate-600 hover:text-red-400 p-1.5 transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>

              {expanded === scene.id && (
                <div className="px-5 pb-5 border-t border-slate-800 space-y-3 pt-4">
                  {/* Preview */}
                  {scene.photo && (
                    <div className="relative h-28 rounded-xl overflow-hidden mb-4">
                      <img src={scene.photo} alt="" className="w-full h-full object-cover" style={{ objectPosition: scene.photoPos }} />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">{scene.eyebrow}</div>
                          <div className="text-sm font-bold">{scene.headline}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Eyebrow</label>
                      <input value={scene.eyebrow} onChange={e => update(scene.id, 'eyebrow', e.target.value)} className={ipt} placeholder="Scene 01 · Opening" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Photo Position</label>
                      <select value={scene.photoPos} onChange={e => update(scene.id, 'photoPos', e.target.value)}
                        className={ipt}>
                        {['center','center top','center bottom','left center','right center'].map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Headline</label>
                    <input value={scene.headline} onChange={e => update(scene.id, 'headline', e.target.value)} className={ipt} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Body Text</label>
                    <textarea rows={2} value={scene.body} onChange={e => update(scene.id, 'body', e.target.value)} className={`${ipt} resize-none`} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Background Photo URL</label>
                    <input value={scene.photo} onChange={e => update(scene.id, 'photo', e.target.value)} className={ipt} placeholder="https://..." />
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">CTA Button Label</label>
                      <input value={scene.cta.label} onChange={e => updateCta(scene.id, 'label', e.target.value)} className={ipt} />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">CTA Link</label>
                      <input value={scene.cta.href} onChange={e => updateCta(scene.id, 'href', e.target.value)} className={ipt} placeholder="/#section or /page" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
