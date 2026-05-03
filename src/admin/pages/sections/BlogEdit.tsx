import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Edit2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface Post {
  id: string; country: string; category: string
  title: string; date: string; excerpt: string; content?: string
}

const COUNTRIES = ['ALL','OM','GB','BD','US']
const CATEGORIES = ['Group Update','Insights','People','Technology','Community','Trade']

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const defaultPost = (): Post => ({
  id: `post-${Date.now()}`,
  country: 'ALL', category: 'Group Update',
  title: 'New Post Title',
  date: new Date().toISOString().split('T')[0],
  excerpt: 'Short summary of the post.',
  content: '',
})

const defaultPosts: Post[] = [
  { id:'p1', country:'ALL', category:'Group Update', title:'Yanabiya Group expands footprint across four countries', date:'2026-04-10', excerpt:'A year of growth across Oman, the United Kingdom, Bangladesh and the USA.' },
  { id:'p2', country:'OM',  category:'Trade',        title:'Inside our Muscat operations: trade, logistics and technology under one roof', date:'2026-03-22', excerpt:'How the Omani headquarters coordinates multi-sector activities for the wider group.' },
  { id:'p3', country:'GB',  category:'Insights',     title:'From London: European market outlook for Gulf-based businesses', date:'2026-03-05', excerpt:'Why our UK office sees a widening opportunity for cross-border services in 2026.' },
  { id:'p4', country:'BD',  category:'People',       title:'Bangladesh hub: building a regional talent engine for the group', date:'2026-02-14', excerpt:'The story of our growing Dhaka team and their contribution across business lines.' },
  { id:'p5', country:'US',  category:'Technology',   title:'Austin office on cloud, cyber and the AI roadmap', date:'2026-01-30', excerpt:'How our US LLC anchors technology delivery for clients across the group.' },
  { id:'p6', country:'ALL', category:'Community',    title:'Our 2026 CSR report: impact across four regions', date:'2026-01-12', excerpt:'Figures, stories and commitments from our community work this year.' },
]

const FLAG: Record<string, string> = { ALL:'🌍', OM:'🇴🇲', GB:'🇬🇧', BD:'🇧🇩', US:'🇺🇸' }

export default function BlogEdit() {
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('blog').then(res => setPosts(res.data as Post[])).catch(() => setPosts(defaultPosts))
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try { await api.updateSection('blog', posts); setSaved(true); setTimeout(()=>setSaved(false),3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const update = (id: string, field: keyof Post, val: string) =>
    setPosts(prev => prev.map(p => p.id === id ? {...p, [field]: val} : p))

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Blog Posts</h1>
            <p className="text-slate-400 text-sm mt-0.5">Create, edit and delete blog posts</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => { const p=defaultPost(); setPosts([p,...posts]); setEditing(p.id) }}
              className="flex items-center gap-1.5 text-sm text-brand-accent border border-brand-accent/30 px-4 py-2.5 rounded-xl hover:bg-brand-accent/10 transition-all">
              <Plus size={14}/> New Post
            </button>
            <button onClick={save} disabled={saving}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
              <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save All'}
            </button>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-lg">{FLAG[post.country] ?? '🌍'}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{post.title}</div>
                  <div className="text-[11px] text-slate-500">{post.date} · {post.category}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button onClick={() => setEditing(editing === post.id ? null : post.id)}
                    className="p-1.5 text-slate-400 hover:text-brand-accent transition-colors">
                    {editing === post.id ? <ChevronUp size={15}/> : <Edit2 size={14}/>}
                  </button>
                  <button onClick={() => setPosts(posts.filter(p => p.id !== post.id))}
                    className="p-1.5 text-slate-600 hover:text-red-400 transition-colors">
                    <Trash2 size={14}/>
                  </button>
                </div>
              </div>

              {editing === post.id && (
                <div className="px-5 pb-5 border-t border-slate-800 space-y-3 pt-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Country</label>
                      <select value={post.country} onChange={e => update(post.id,'country',e.target.value)} className={ipt}>
                        {COUNTRIES.map(c => <option key={c} value={c}>{FLAG[c]} {c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Category</label>
                      <select value={post.category} onChange={e => update(post.id,'category',e.target.value)} className={ipt}>
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Date</label>
                      <input type="date" value={post.date} onChange={e => update(post.id,'date',e.target.value)} className={ipt} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Title</label>
                    <input value={post.title} onChange={e => update(post.id,'title',e.target.value)} className={ipt} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Excerpt</label>
                    <textarea rows={2} value={post.excerpt} onChange={e => update(post.id,'excerpt',e.target.value)} className={`${ipt} resize-none`} />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Full Content (optional)</label>
                    <textarea rows={6} value={post.content || ''} onChange={e => update(post.id,'content',e.target.value)} className={`${ipt} resize-none`} placeholder="Full article content…" />
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
