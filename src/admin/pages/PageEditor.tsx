import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Save, Plus, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, ChevronDown, ChevronUp, Globe, ArrowLeft } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import type { CmsPage, CmsSection } from '../api/adminApi'

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const SECTION_TYPES = [
  { type: 'hero',         label: 'Hero Banner',     icon: '🖼' },
  { type: 'text',         label: 'Text / Content',  icon: '📝' },
  { type: 'cards',        label: 'Cards Grid',      icon: '🃏' },
  { type: 'stats',        label: 'Stats Bar',       icon: '📊' },
  { type: 'cta',          label: 'Call to Action',  icon: '🎯' },
  { type: 'faq',          label: 'FAQ',             icon: '❓' },
  { type: 'testimonials', label: 'Testimonials',    icon: '💬' },
  { type: 'team',         label: 'Team Members',    icon: '👥' },
  { type: 'gallery',      label: 'Gallery',         icon: '🖼️' },
  { type: 'contact',      label: 'Contact Info',    icon: '📞' },
  { type: 'spacer',       label: 'Spacer',          icon: '↕' },
]

function SectionDataEditor({ section, onChange }: { section: CmsSection; onChange: (data: Record<string, unknown>) => void }) {
  const d = section.data
  const set = (key: string, val: unknown) => onChange({ ...d, [key]: val })
  const ta = `${ipt} resize-none`

  if (section.type === 'hero') return (
    <div className="space-y-3">
      <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Subheading</label><textarea rows={2} value={String(d.subheading||'')} onChange={e=>set('subheading',e.target.value)} className={ta} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Button Label</label><input value={String(d.buttonLabel||'')} onChange={e=>set('buttonLabel',e.target.value)} className={ipt} /></div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Button Link</label><input value={String(d.buttonHref||'')} onChange={e=>set('buttonHref',e.target.value)} className={ipt} /></div>
      </div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Background Image URL</label><input value={String(d.backgroundImage||'')} onChange={e=>set('backgroundImage',e.target.value)} className={ipt} placeholder="https://..." /></div>
    </div>
  )

  if (section.type === 'text') return (
    <div className="space-y-3">
      <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Body (HTML allowed)</label><textarea rows={6} value={String(d.body||'')} onChange={e=>set('body',e.target.value)} className={ta} /></div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Alignment</label>
        <select value={String(d.alignment||'left')} onChange={e=>set('alignment',e.target.value)} className={ipt}>
          <option value="left">Left</option><option value="center">Center</option>
        </select>
      </div>
    </div>
  )

  if (section.type === 'cta') return (
    <div className="space-y-3">
      <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Subheading</label><input value={String(d.subheading||'')} onChange={e=>set('subheading',e.target.value)} className={ipt} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Primary Button</label><input value={String(d.primaryLabel||'')} onChange={e=>set('primaryLabel',e.target.value)} className={ipt} placeholder="Label" /></div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Primary Link</label><input value={String(d.primaryHref||'')} onChange={e=>set('primaryHref',e.target.value)} className={ipt} /></div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Secondary Button</label><input value={String(d.secondaryLabel||'')} onChange={e=>set('secondaryLabel',e.target.value)} className={ipt} placeholder="Label (optional)" /></div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Secondary Link</label><input value={String(d.secondaryHref||'')} onChange={e=>set('secondaryHref',e.target.value)} className={ipt} /></div>
      </div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Background</label>
        <select value={String(d.background||'brand')} onChange={e=>set('background',e.target.value)} className={ipt}>
          <option value="brand">Brand (dark)</option><option value="white">White</option>
        </select>
      </div>
    </div>
  )

  if (section.type === 'stats') {
    const stats = (d.stats as {value:string;label:string}[]) || []
    return (
      <div className="space-y-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-slate-400">Stats</label>
            <button type="button" onClick={() => set('stats', [...stats, {value:'',label:''}])} className="text-xs text-brand-accent hover:text-brand-accentDark">+ Add Stat</button>
          </div>
          <div className="space-y-2">
            {stats.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input value={s.value} onChange={e=>{const ns=[...stats];ns[i]={...ns[i],value:e.target.value};set('stats',ns)}} className={`${ipt} w-28`} placeholder="500+" />
                <input value={s.label} onChange={e=>{const ns=[...stats];ns[i]={...ns[i],label:e.target.value};set('stats',ns)}} className={`${ipt} flex-1`} placeholder="Clients" />
                <button type="button" onClick={() => set('stats', stats.filter((_,j)=>j!==i))} className="px-2 text-red-400 hover:text-red-300"><Trash2 size={13}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section.type === 'faq') {
    const items = (d.items as {id:string;question:string;answer:string}[]) || []
    return (
      <div className="space-y-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-slate-400">FAQ Items</label>
            <button type="button" onClick={()=>set('items',[...items,{id:`faq-${Date.now()}`,question:'New Question',answer:'Answer here'}])} className="text-xs text-brand-accent">+ Add Item</button>
          </div>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="bg-slate-800 rounded-lg p-3 space-y-2 relative">
                <input value={item.question} onChange={e=>{const ni=[...items];ni[i]={...ni[i],question:e.target.value};set('items',ni)}} className={ipt} placeholder="Question" />
                <textarea rows={2} value={item.answer} onChange={e=>{const ni=[...items];ni[i]={...ni[i],answer:e.target.value};set('items',ni)}} className={ta} placeholder="Answer" />
                <button type="button" onClick={()=>set('items',items.filter((_,j)=>j!==i))} className="absolute top-3 right-3 text-red-400 hover:text-red-300"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section.type === 'cards') {
    const cards = (d.cards as {id:string;title:string;body:string;image?:string;link?:string}[]) || []
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
          <div><label className="block text-xs text-slate-400 mb-1.5">Columns</label>
            <select value={String(d.columns||3)} onChange={e=>set('columns',Number(e.target.value))} className={ipt}>
              <option value={2}>2</option><option value={3}>3</option><option value={4}>4</option>
            </select>
          </div>
        </div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Subheading</label><input value={String(d.subheading||'')} onChange={e=>set('subheading',e.target.value)} className={ipt} /></div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-slate-400">Cards</label>
            <button type="button" onClick={()=>set('cards',[...cards,{id:`card-${Date.now()}`,title:'New Card',body:'Description',image:'',link:''}])} className="text-xs text-brand-accent">+ Add Card</button>
          </div>
          <div className="space-y-3">
            {cards.map((card, i) => (
              <div key={card.id} className="bg-slate-800 rounded-lg p-3 space-y-2 relative">
                <input value={card.title} onChange={e=>{const nc=[...cards];nc[i]={...nc[i],title:e.target.value};set('cards',nc)}} className={ipt} placeholder="Title" />
                <textarea rows={2} value={card.body} onChange={e=>{const nc=[...cards];nc[i]={...nc[i],body:e.target.value};set('cards',nc)}} className={ta} placeholder="Description" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={card.image||''} onChange={e=>{const nc=[...cards];nc[i]={...nc[i],image:e.target.value};set('cards',nc)}} className={ipt} placeholder="Image URL" />
                  <input value={card.link||''} onChange={e=>{const nc=[...cards];nc[i]={...nc[i],link:e.target.value};set('cards',nc)}} className={ipt} placeholder="Link (optional)" />
                </div>
                <button type="button" onClick={()=>set('cards',cards.filter((_,j)=>j!==i))} className="absolute top-3 right-3 text-red-400 hover:text-red-300"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section.type === 'testimonials') {
    const items = (d.items as {id:string;quote:string;author:string;role:string;rating:number}[]) || []
    return (
      <div className="space-y-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-slate-400">Testimonials</label>
            <button type="button" onClick={()=>set('items',[...items,{id:`t-${Date.now()}`,quote:'',author:'',role:'',rating:5}])} className="text-xs text-brand-accent">+ Add</button>
          </div>
          <div className="space-y-3">
            {items.map((t, i) => (
              <div key={t.id} className="bg-slate-800 rounded-lg p-3 space-y-2 relative">
                <textarea rows={2} value={t.quote} onChange={e=>{const ni=[...items];ni[i]={...ni[i],quote:e.target.value};set('items',ni)}} className={ta} placeholder="Quote" />
                <div className="grid grid-cols-2 gap-2">
                  <input value={t.author} onChange={e=>{const ni=[...items];ni[i]={...ni[i],author:e.target.value};set('items',ni)}} className={ipt} placeholder="Author Name" />
                  <input value={t.role} onChange={e=>{const ni=[...items];ni[i]={...ni[i],role:e.target.value};set('items',ni)}} className={ipt} placeholder="Role / Company" />
                </div>
                <button type="button" onClick={()=>set('items',items.filter((_,j)=>j!==i))} className="absolute top-3 right-3 text-red-400 hover:text-red-300"><Trash2 size={12}/></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (section.type === 'contact') return (
    <div className="space-y-3">
      <div><label className="block text-xs text-slate-400 mb-1.5">Heading</label><input value={String(d.heading||'')} onChange={e=>set('heading',e.target.value)} className={ipt} /></div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Subheading</label><input value={String(d.subheading||'')} onChange={e=>set('subheading',e.target.value)} className={ipt} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-xs text-slate-400 mb-1.5">Email</label><input type="email" value={String(d.email||'')} onChange={e=>set('email',e.target.value)} className={ipt} /></div>
        <div><label className="block text-xs text-slate-400 mb-1.5">Phone</label><input value={String(d.phone||'')} onChange={e=>set('phone',e.target.value)} className={ipt} /></div>
      </div>
      <div><label className="block text-xs text-slate-400 mb-1.5">Address</label><input value={String(d.address||'')} onChange={e=>set('address',e.target.value)} className={ipt} /></div>
    </div>
  )

  if (section.type === 'spacer') return (
    <div><label className="block text-xs text-slate-400 mb-1.5">Height (px)</label>
      <input type="number" value={Number(d.height||60)} onChange={e=>set('height',Number(e.target.value))} className={ipt} />
    </div>
  )

  if (section.type === 'html') return (
    <div><label className="block text-xs text-slate-400 mb-1.5">HTML Content</label>
      <textarea rows={8} value={String(d.content||'')} onChange={e=>set('content',e.target.value)} className={`${ta} font-mono text-xs`} placeholder="<div>Your HTML here</div>" />
    </div>
  )

  return <div className="text-slate-500 text-sm">No editor for section type: {section.type}</div>
}

function SectionCard({
  section, index, total, onMoveUp, onMoveDown, onDelete, onToggle, onDataChange,
}: {
  section: CmsSection; index: number; total: number
  onMoveUp: () => void; onMoveDown: () => void
  onDelete: () => void; onToggle: () => void
  onDataChange: (data: Record<string, unknown>) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const sectionMeta = SECTION_TYPES.find(t => t.type === section.type)

  return (
    <div className={`bg-slate-900 border rounded-xl overflow-hidden transition-all ${section.visible ? 'border-slate-800' : 'border-slate-800/50 opacity-60'}`}>
      <div className="flex items-center gap-3 px-4 py-3.5">
        <span className="text-lg shrink-0">{sectionMeta?.icon || '📦'}</span>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-medium text-white">{sectionMeta?.label || section.type}</span>
          {!!section.data.heading && <span className="ml-2 text-xs text-slate-500">— {String(section.data.heading).slice(0, 40)}</span>}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button type="button" onClick={onMoveUp} disabled={index === 0} className="p-1.5 text-slate-600 hover:text-white disabled:opacity-30 transition-colors"><ArrowUp size={14}/></button>
          <button type="button" onClick={onMoveDown} disabled={index === total - 1} className="p-1.5 text-slate-600 hover:text-white disabled:opacity-30 transition-colors"><ArrowDown size={14}/></button>
          <button type="button" onClick={onToggle} className="p-1.5 text-slate-500 hover:text-white transition-colors" title={section.visible ? 'Hide' : 'Show'}>
            {section.visible ? <Eye size={14}/> : <EyeOff size={14}/>}
          </button>
          <button type="button" onClick={() => setExpanded(!expanded)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
            {expanded ? <ChevronUp size={15}/> : <ChevronDown size={15}/>}
          </button>
          <button type="button" onClick={onDelete} className="p-1.5 text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={14}/></button>
        </div>
      </div>
      {expanded && (
        <div className="px-5 pb-5 border-t border-slate-800 pt-4">
          <SectionDataEditor section={section} onChange={onDataChange} />
        </div>
      )}
    </div>
  )
}

export default function PageEditor() {
  const { slug } = useParams<{ slug: string }>()
  const isNew = slug === 'new'
  const navigate = useNavigate()

  const [page, setPage] = useState<CmsPage | null>(null)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [tab, setTab] = useState<'settings' | 'sections'>('settings')
  const [showAddSection, setShowAddSection] = useState(false)

  // For new pages
  const [newSlug, setNewSlug] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    if (isNew) return
    api.getPage(slug!).then(setPage).catch(() => navigate('/admin/pages')).finally(() => setLoading(false))
  }, [slug, isNew, navigate])

  const handleCreate = async () => {
    if (!newSlug || !newTitle) { setError('Title and slug are required'); return }
    setCreating(true); setError('')
    try {
      const p = await api.createPage({ slug: newSlug, title: newTitle, status: 'draft' })
      navigate(`/admin/pages/${p.slug}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to create page')
    } finally { setCreating(false) }
  }

  const saveSettings = async () => {
    if (!page) return
    setSaving(true); setError('')
    try {
      const updated = await api.updatePage(page.slug, { title: page.title, metaTitle: page.metaTitle, metaDescription: page.metaDescription, status: page.status, parentSlug: page.parentSlug || undefined, template: page.template, heroImage: page.heroImage })
      setPage(updated); setSaved(true); setTimeout(() => setSaved(false), 2500)
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const saveSections = async () => {
    if (!page) return
    setSaving(true); setError('')
    try {
      const updated = await api.updateSections(page.slug, page.sections)
      setPage(updated); setSaved(true); setTimeout(() => setSaved(false), 2500)
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const addSection = async (type: string) => {
    if (!page) return
    setShowAddSection(false)
    try {
      const updated = await api.addSection(page.slug, type)
      setPage(updated)
    } catch { setError('Failed to add section') }
  }

  const moveSection = (index: number, direction: 'up' | 'down') => {
    if (!page) return
    const sections = [...page.sections]
    const target = direction === 'up' ? index - 1 : index + 1
    if (target < 0 || target >= sections.length) return
    ;[sections[index], sections[target]] = [sections[target], sections[index]]
    sections.forEach((s, i) => { s.order = i })
    setPage({ ...page, sections })
  }

  const deleteSection = (id: string) => {
    if (!page || !confirm('Remove this section?')) return
    setPage({ ...page, sections: page.sections.filter(s => s.id !== id) })
  }

  const toggleSection = (id: string) => {
    if (!page) return
    setPage({ ...page, sections: page.sections.map(s => s.id === id ? { ...s, visible: !s.visible } : s) })
  }

  const updateSectionData = (id: string, data: Record<string, unknown>) => {
    if (!page) return
    setPage({ ...page, sections: page.sections.map(s => s.id === id ? { ...s, data } : s) })
  }

  if (isNew) return (
    <AdminLayout>
      <div className="max-w-xl">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/pages" className="p-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft size={16}/></Link>
          <h1 className="text-xl font-bold text-white">Create New Page</h1>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>}
          <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">Page Title</label>
            <input value={newTitle} onChange={e => { setNewTitle(e.target.value); if (!newSlug) setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')) }} className={ipt} placeholder="e.g. AI Solutions" /></div>
          <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">URL Slug</label>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 text-sm">domain.com/p/</span>
              <input value={newSlug} onChange={e => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))} className={`${ipt} flex-1`} placeholder="ai-solutions" />
            </div>
            <p className="text-xs text-slate-600 mt-1">Lowercase letters, numbers, and hyphens only</p>
          </div>
          <button onClick={handleCreate} disabled={creating || !newSlug || !newTitle}
            className="w-full bg-brand-accent hover:bg-brand-accentDark text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-50">
            {creating ? 'Creating…' : 'Create Page & Add Sections'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )

  if (loading) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>
  if (!page) return null

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/admin/pages" className="p-2 text-slate-400 hover:text-white transition-colors"><ArrowLeft size={16}/></Link>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white truncate">{page.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <code className="text-xs text-slate-500">/p/{page.slug}</code>
              {page.status === 'published' && (
                <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer" className="text-xs text-brand-accent flex items-center gap-1 hover:underline"><Globe size={10}/> View live</a>
              )}
            </div>
          </div>
          <button onClick={tab === 'settings' ? saveSettings : saveSections} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-5 w-fit">
          {(['settings', 'sections'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${tab === t ? 'bg-brand-accent text-white' : 'text-slate-400 hover:text-white'}`}>
              {t} {t === 'sections' && `(${page.sections.length})`}
            </button>
          ))}
        </div>

        {/* Settings tab */}
        {tab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">Page Title</label><input value={page.title} onChange={e => setPage({...page, title: e.target.value})} className={ipt} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">Status</label>
                <select value={page.status} onChange={e => setPage({...page, status: e.target.value as 'draft'|'published'})} className={ipt}>
                  <option value="draft">Draft</option><option value="published">Published</option>
                </select>
              </div>
              <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">Template</label>
                <select value={page.template} onChange={e => setPage({...page, template: e.target.value})} className={ipt}>
                  <option value="default">Default</option><option value="landing">Landing Page</option><option value="service">Service Page</option>
                </select>
              </div>
            </div>
            <div><label className="block text-xs text-slate-400 mb-1.5 font-medium">Parent Page Slug (optional)</label><input value={page.parentSlug || ''} onChange={e => setPage({...page, parentSlug: e.target.value || null})} className={ipt} placeholder="e.g. services (makes URL: /p/services/this-page)" /></div>
            <div className="pt-2 border-t border-slate-800">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-3 font-semibold">SEO</p>
              <div className="space-y-3">
                <div><label className="block text-xs text-slate-400 mb-1.5">Meta Title</label><input value={page.metaTitle} onChange={e => setPage({...page, metaTitle: e.target.value})} className={ipt} placeholder={page.title} /></div>
                <div><label className="block text-xs text-slate-400 mb-1.5">Meta Description</label><textarea rows={2} value={page.metaDescription} onChange={e => setPage({...page, metaDescription: e.target.value})} className={`${ipt} resize-none`} placeholder="Brief description for search engines (150 chars)" /></div>
              </div>
            </div>
          </div>
        )}

        {/* Sections tab */}
        {tab === 'sections' && (
          <div className="space-y-3">
            {page.sections.length === 0 && (
              <div className="bg-slate-900 border border-slate-800 border-dashed rounded-xl p-10 text-center">
                <p className="text-slate-500 mb-4">No sections yet. Add your first section below.</p>
              </div>
            )}
            {[...page.sections].sort((a,b)=>a.order-b.order).map((section, index) => (
              <SectionCard key={section.id} section={section} index={index} total={page.sections.length}
                onMoveUp={() => moveSection(index, 'up')}
                onMoveDown={() => moveSection(index, 'down')}
                onDelete={() => deleteSection(section.id)}
                onToggle={() => toggleSection(section.id)}
                onDataChange={(data) => updateSectionData(section.id, data)}
              />
            ))}

            {/* Add section */}
            <div className="relative">
              <button onClick={() => setShowAddSection(!showAddSection)}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-slate-700 hover:border-brand-accent text-slate-500 hover:text-brand-accent py-4 rounded-xl transition-all text-sm font-medium">
                <Plus size={16}/> Add Section
              </button>
              {showAddSection && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl p-3 z-10 grid grid-cols-3 gap-2">
                  {SECTION_TYPES.map(st => (
                    <button key={st.type} onClick={() => addSection(st.type)}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-800 text-left transition-colors">
                      <span>{st.icon}</span>
                      <span className="text-xs text-slate-300 font-medium">{st.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
