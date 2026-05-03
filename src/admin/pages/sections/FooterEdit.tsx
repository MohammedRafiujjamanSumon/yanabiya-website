import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface FooterLink { label: string; href: string }
interface FooterData {
  tagline: string; description: string; newsletterPlaceholder: string
  groupLinks: FooterLink[]; corporateLinks: FooterLink[]
  socialLinks: { platform: string; href: string; icon: string }[]
  copyrightText: string
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULTS: FooterData = {
  tagline: 'Global Enterprise Platform',
  description: 'A trusted international group of companies — building, scaling, and operating high-impact ventures across technology, trade, talent and consulting.',
  newsletterPlaceholder: 'Subscribe to group updates',
  groupLinks: [
    { label: 'Home',            href: '/#home' },
    { label: 'About Us',        href: '/#about' },
    { label: 'Global Presence', href: '/#global' },
    { label: 'Our Service',     href: '/#businesses' },
    { label: 'Trusted Network', href: '/#partnerships' },
    { label: 'Contact Us',      href: '/#contact' },
  ],
  corporateLinks: [
    { label: 'Group Profile',    href: '/about-us' },
    { label: 'Our Story',        href: '/about/our-story' },
    { label: 'Contact Network',  href: '/contact' },
    { label: 'Our Management',   href: '/leadership/management' },
    { label: 'Blog',             href: '/community/blog' },
    { label: 'Sustainable Growth', href: '/community/sustainable-growth' },
    { label: 'Community Care',   href: '/community/community-care' },
    { label: 'Careers',          href: '/community/careers' },
  ],
  socialLinks: [
    { platform: 'LinkedIn',  icon: 'Linkedin',  href: 'https://www.linkedin.com/company/yanabiya-group' },
    { platform: 'Facebook',  icon: 'Facebook',  href: 'https://www.facebook.com/yanabiyagroup' },
    { platform: 'Instagram', icon: 'Instagram', href: 'https://www.instagram.com/yanabiyagroup' },
    { platform: 'Twitter',   icon: 'Twitter',   href: 'https://twitter.com/yanabiyagroup' },
    { platform: 'YouTube',   icon: 'Youtube',   href: 'https://www.youtube.com/@yanabiyagroup' },
  ],
  copyrightText: 'Yanabiya Group · All rights reserved.',
}

function LinkListEditor({ title, links, onChange }: { title: string; links: FooterLink[]; onChange: (v: FooterLink[]) => void }) {
  const update = (i: number, f: keyof FooterLink, v: string) => {
    const c = [...links]; c[i] = { ...c[i], [f]: v }; onChange(c)
  }
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        <button onClick={() => onChange([...links, { label: '', href: '' }])}
          className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {links.map((l, i) => (
          <div key={i} className="flex gap-2">
            <input value={l.label} onChange={e => update(i, 'label', e.target.value)} className={`${ipt} flex-1`} placeholder="Label" />
            <input value={l.href} onChange={e => update(i, 'href', e.target.value)} className={`${ipt} flex-1`} placeholder="/path or /#section" />
            <button onClick={() => onChange(links.filter((_, j) => j !== i))}
              className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function FooterEdit() {
  const [data, setData] = useState<FooterData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('footer')
      .then(res => setData(res.data as FooterData))
      .catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('footer', data); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const updateSocial = (i: number, field: string, val: string) => {
    if (!data) return
    const c = [...data.socialLinks]; c[i] = { ...c[i], [field]: val }
    setData({ ...data, socialLinks: c })
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Footer</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit footer text, links and social media</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Brand Section</h2>
            <div><label className="block text-xs text-slate-400 mb-1.5">Tagline (below logo)</label>
              <input value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Description</label>
              <textarea rows={3} value={data.description} onChange={e => setData({...data, description: e.target.value})} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Newsletter Input Placeholder</label>
              <input value={data.newsletterPlaceholder} onChange={e => setData({...data, newsletterPlaceholder: e.target.value})} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Copyright Text</label>
              <input value={data.copyrightText} onChange={e => setData({...data, copyrightText: e.target.value})} className={ipt} /></div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Social Links</h2>
              <button onClick={() => setData({...data, socialLinks: [...data.socialLinks, {platform:'',icon:'',href:''}]})}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {data.socialLinks.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s.platform} onChange={e => updateSocial(i,'platform',e.target.value)}
                    className="w-28 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-all" placeholder="Platform" />
                  <input value={s.href} onChange={e => updateSocial(i,'href',e.target.value)}
                    className={`${ipt} flex-1`} placeholder="https://..." />
                  <button onClick={() => setData({...data, socialLinks: data.socialLinks.filter((_,j)=>j!==i)})}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <LinkListEditor title="Group Links (left column)" links={data.groupLinks}
            onChange={v => setData({...data, groupLinks: v})} />
          <LinkListEditor title="Corporate Links (right column)" links={data.corporateLinks}
            onChange={v => setData({...data, corporateLinks: v})} />
        </div>
      </div>
    </AdminLayout>
  )
}
