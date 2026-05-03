import { useEffect, useState } from 'react'
import { Save, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface PageHero {
  eyebrow: string
  title: string
  subtitle: string
}

interface PageHeroesData {
  [pageKey: string]: PageHero
}

const PAGES = [
  { key: 'about',            label: 'About Us',              path: '/about-us' },
  { key: 'our-story',        label: 'Our Story',             path: '/about/our-story' },
  { key: 'contact',          label: 'Contact',               path: '/contact' },
  { key: 'blog',             label: 'Blog',                  path: '/community/blog' },
  { key: 'careers',          label: 'Careers',               path: '/community/careers' },
  { key: 'testimonials',     label: 'Testimonials',          path: '/community/testimonials' },
  { key: 'community',        label: 'Community Overview',    path: '/community' },
  { key: 'sustainable',      label: 'Sustainable Growth',    path: '/community/sustainable-growth' },
  { key: 'community-care',   label: 'Community Care',        path: '/community/community-care' },
  { key: 'board',            label: 'Board of Directors',    path: '/leadership/board' },
  { key: 'executive',        label: 'Executive Team',        path: '/leadership/executive' },
  { key: 'management',       label: 'Management',            path: '/leadership/management' },
  { key: 'professionals',    label: 'Professionals',         path: '/leadership/professionals' },
  { key: 'departments',      label: 'Department Heads',      path: '/leadership/departments' },
  { key: 'countries',        label: 'Countries Overview',    path: '/leadership/countries' },
  { key: 'execution-engine', label: 'Execution Engine',      path: '/leadership/execution-engine' },
]

const DEFAULTS: PageHeroesData = {
  'about':            { eyebrow: 'Who We Are', title: 'About Yanabiya Group', subtitle: 'A diversified global group built on trust, technology and trade.' },
  'our-story':        { eyebrow: 'Our Journey', title: 'Our Story', subtitle: 'From Oman to the world — how Yanabiya Group grew into a multi-sector enterprise.' },
  'contact':          { eyebrow: 'Get In Touch', title: 'Contact Us', subtitle: 'Reach our offices across Oman, UK, Bangladesh and the USA.' },
  'blog':             { eyebrow: 'Insights', title: 'Blog & News', subtitle: 'Latest updates, stories and insights from Yanabiya Group.' },
  'careers':          { eyebrow: 'Join Us', title: 'Careers at Yanabiya', subtitle: 'Explore opportunities across our global operations.' },
  'testimonials':     { eyebrow: 'What They Say', title: 'Testimonials', subtitle: 'Stories from our partners and clients around the world.' },
  'community':        { eyebrow: 'Community', title: 'Community & Impact', subtitle: 'How Yanabiya gives back to the communities we operate in.' },
  'sustainable':      { eyebrow: 'Sustainability', title: 'Sustainable Growth', subtitle: 'Our commitment to responsible and sustainable business.' },
  'community-care':   { eyebrow: 'Community Care', title: 'Community Care', subtitle: "Initiatives that make a real difference in people's lives." },
  'board':            { eyebrow: 'Governance', title: 'Board of Directors', subtitle: "The leadership guiding Yanabiya Group's strategic direction." },
  'executive':        { eyebrow: 'Leadership', title: 'Executive Team', subtitle: 'The team driving operations and growth across all divisions.' },
  'management':       { eyebrow: 'Management', title: 'Senior Management', subtitle: 'Experienced professionals steering each business unit.' },
  'professionals':    { eyebrow: 'Professionals', title: 'Our Professionals', subtitle: "Specialists powering Yanabiya's global capabilities." },
  'departments':      { eyebrow: 'Departments', title: 'Department Heads', subtitle: 'Leaders of each functional department across the group.' },
  'countries':        { eyebrow: 'Global Presence', title: 'Countries Overview', subtitle: 'Our presence in Oman, UK, Bangladesh and the USA.' },
  'execution-engine': { eyebrow: 'Operations', title: 'Execution Engine', subtitle: 'The operating system that powers Yanabiya Group.' },
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function PageHeroesEdit() {
  const [data, setData] = useState<PageHeroesData | null>(null)
  const [expanded, setExpanded] = useState<string | null>('about')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('page-heroes')
      .then(res => setData({ ...DEFAULTS, ...(res.data as PageHeroesData) }))
      .catch(() => setData({ ...DEFAULTS }))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try { await api.updateSection('page-heroes', data); setSaved(true); setTimeout(() => setSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSaving(false) }
  }

  const update = (pageKey: string, field: keyof PageHero, val: string) => {
    if (!data) return
    setData({ ...data, [pageKey]: { ...data[pageKey], [field]: val } })
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Page Heroes</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit the hero banner text for every sub-page</p>
          </div>
          <button type="button" onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-2">
          {PAGES.map(({ key, label, path }) => {
            const isOpen = expanded === key
            const hero = data[key] || DEFAULTS[key]
            return (
              <div key={key} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                <button type="button" onClick={() => setExpanded(isOpen ? null : key)}
                  className="w-full flex items-center justify-between px-5 py-3.5 text-left">
                  <div>
                    <span className="text-sm font-semibold text-white">{label}</span>
                    <span className="ml-2 text-xs text-slate-500">{path}</span>
                  </div>
                  {isOpen ? <ChevronUp size={16} className="text-slate-400 shrink-0"/> : <ChevronDown size={16} className="text-slate-400 shrink-0"/>}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 space-y-3 border-t border-slate-800 pt-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Eyebrow (small text above title)</label>
                      <input value={hero.eyebrow} onChange={e => update(key, 'eyebrow', e.target.value)} className={ipt} aria-label={`${label} eyebrow`} placeholder="e.g. Who We Are" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Title</label>
                      <input value={hero.title} onChange={e => update(key, 'title', e.target.value)} className={ipt} aria-label={`${label} title`} placeholder="Page title" />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Subtitle / Description</label>
                      <textarea rows={2} value={hero.subtitle} onChange={e => update(key, 'subtitle', e.target.value)}
                        className={`${ipt} resize-none`} aria-label={`${label} subtitle`} placeholder="Short description" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
