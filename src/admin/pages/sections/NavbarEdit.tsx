import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface NavLink { id: string; label: string; href?: string }
interface NavData {
  ctaLabel: string; ctaHref: string
  topLinks: NavLink[]
  socialLinks: { platform: string; href: string }[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULTS: NavData = {
  ctaLabel: 'Get in Touch',
  ctaHref: '/contact',
  topLinks: [
    { id: 'home',         label: 'Home' },
    { id: 'about',        label: 'About' },
    { id: 'businesses',   label: 'Our Services' },
    { id: 'global',       label: 'Global Presence' },
    { id: 'partnerships', label: 'Our Network' },
    { id: 'community',    label: 'Our Community' },
    { id: 'contact',      label: 'Contact Us' },
  ],
  socialLinks: [
    { platform: 'LinkedIn',  href: 'https://www.linkedin.com/company/yanabiya-group' },
    { platform: 'Facebook',  href: 'https://www.facebook.com/yanabiyagroup' },
    { platform: 'Instagram', href: 'https://www.instagram.com/yanabiyagroup' },
    { platform: 'Twitter',   href: 'https://twitter.com/yanabiyagroup' },
    { platform: 'YouTube',   href: 'https://www.youtube.com/@yanabiyagroup' },
  ],
}

export default function NavbarEdit() {
  const [data, setData] = useState<NavData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('navbar')
      .then(res => setData(res.data as NavData))
      .catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('navbar', data); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const updateLink = (i: number, field: keyof NavLink, val: string) => {
    if (!data) return
    const c = [...data.topLinks]; c[i] = { ...c[i], [field]: val }
    setData({ ...data, topLinks: c })
  }
  const updateSocial = (i: number, field: string, val: string) => {
    if (!data) return
    const c = [...data.socialLinks]; c[i] = { ...c[i], [field]: val }
    setData({ ...data, socialLinks: c })
  }

  if (!data) return <AdminLayout><div className="h-64 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Navbar</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit navigation labels, CTA button and social links</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">
          {/* CTA Button */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">CTA Button (top right)</h2>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-xs text-slate-400 mb-1.5">Button Label</label>
                <input value={data.ctaLabel} onChange={e => setData({ ...data, ctaLabel: e.target.value })} className={ipt} /></div>
              <div><label className="block text-xs text-slate-400 mb-1.5">Button Link</label>
                <input value={data.ctaHref} onChange={e => setData({ ...data, ctaHref: e.target.value })} className={ipt} /></div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Navigation Links</h2>
              <button onClick={() => setData({ ...data, topLinks: [...data.topLinks, { id: `link-${Date.now()}`, label: 'New Link', href: '/' }] })}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add Link
              </button>
            </div>
            <div className="space-y-2">
              {data.topLinks.map((link, i) => (
                <div key={link.id} className="flex gap-2">
                  <input value={link.label} onChange={e => updateLink(i, 'label', e.target.value)}
                    className={`${ipt} flex-1`} placeholder="Label" />
                  <input value={link.href || ''} onChange={e => updateLink(i, 'href', e.target.value)}
                    className={`${ipt} flex-1`} placeholder="/#section or /page" />
                  <button onClick={() => setData({ ...data, topLinks: data.topLinks.filter((_, j) => j !== i) })}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Social Media Links</h2>
            <div className="space-y-2">
              {data.socialLinks.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input value={s.platform} onChange={e => updateSocial(i, 'platform', e.target.value)}
                    className="w-28 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-accent transition-all" placeholder="Platform" />
                  <input value={s.href} onChange={e => updateSocial(i, 'href', e.target.value)}
                    className={`${ipt} flex-1`} placeholder="https://..." />
                  <button onClick={() => setData({ ...data, socialLinks: data.socialLinks.filter((_, j) => j !== i) })}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
              <button onClick={() => setData({ ...data, socialLinks: [...data.socialLinks, { platform: '', href: '' }] })}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add Social Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
