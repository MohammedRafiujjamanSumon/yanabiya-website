import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Edit2, Trash2, Globe, FileText, Eye, EyeOff } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import type { PageMeta } from '../api/adminApi'

const STATUS_STYLES = {
  published: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  draft:     'bg-amber-500/10 text-amber-400 border-amber-500/30',
}

export default function PagesManager() {
  const [pages, setPages] = useState<PageMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => { api.listPages().then(setPages).finally(() => setLoading(false)) }, [])

  const handleDelete = async (slug: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    setDeleting(slug)
    await api.deletePage(slug).catch(() => {})
    setPages(pages.filter(p => p.slug !== slug))
    setDeleting(null)
  }

  const toggleStatus = async (page: PageMeta) => {
    const newStatus = page.status === 'published' ? 'draft' : 'published'
    await api.updatePage(page.slug, { status: newStatus })
    setPages(pages.map(p => p.slug === page.slug ? { ...p, status: newStatus } : p))
  }

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Pages</h1>
            <p className="text-slate-400 text-sm mt-0.5">Create and manage dynamic CMS pages</p>
          </div>
          <Link to="/admin/pages/new"
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all">
            <Plus size={15} /> New Page
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">{Array.from({length:4}).map((_,i)=><div key={i} className="h-16 bg-slate-900 rounded-xl animate-pulse"/>)}</div>
        ) : pages.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
            <FileText size={36} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 font-medium mb-2">No pages yet</p>
            <p className="text-slate-600 text-sm mb-6">Create your first dynamic page</p>
            <Link to="/admin/pages/new" className="inline-flex items-center gap-2 bg-brand-accent text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-brand-accentDark transition-all">
              <Plus size={14} /> Create First Page
            </Link>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-xs text-slate-500 uppercase tracking-widest px-5 py-3">Title</th>
                  <th className="text-left text-xs text-slate-500 uppercase tracking-widest px-4 py-3 hidden md:table-cell">Slug</th>
                  <th className="text-left text-xs text-slate-500 uppercase tracking-widest px-4 py-3 hidden md:table-cell">Sections</th>
                  <th className="text-left text-xs text-slate-500 uppercase tracking-widest px-4 py-3">Status</th>
                  <th className="text-right text-xs text-slate-500 uppercase tracking-widest px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {pages.map(page => (
                  <tr key={page.slug} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-medium text-white text-sm">{page.title}</div>
                      {page.parentSlug && <div className="text-xs text-slate-500 mt-0.5">under /{page.parentSlug}</div>}
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <code className="text-xs text-slate-400 bg-slate-800 px-2 py-0.5 rounded">/{page.slug}</code>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-slate-400">{page.sectionCount} sections</span>
                    </td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleStatus(page)}
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border transition-all ${STATUS_STYLES[page.status]}`}>
                        {page.status === 'published' ? <Eye size={10}/> : <EyeOff size={10}/>}
                        {page.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        {page.status === 'published' && (
                          <a href={`/p/${page.slug}`} target="_blank" rel="noreferrer"
                            className="p-1.5 text-slate-500 hover:text-brand-accent transition-colors" title="View page">
                            <Globe size={14}/>
                          </a>
                        )}
                        <Link to={`/admin/pages/${page.slug}`}
                          className="p-1.5 text-slate-500 hover:text-white transition-colors" title="Edit">
                          <Edit2 size={14}/>
                        </Link>
                        <button onClick={() => handleDelete(page.slug, page.title)} disabled={deleting === page.slug}
                          className="p-1.5 text-slate-600 hover:text-red-400 transition-colors disabled:opacity-40" title="Delete">
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
