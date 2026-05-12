import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Phone, AtSign } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface FooterLink { label: string; href: string }
interface FooterData {
  tagline: string; description: string; newsletterPlaceholder: string
  groupLinks: FooterLink[]; corporateLinks: FooterLink[]
  socialLinks: { platform: string; href: string; icon: string }[]
  copyrightText: string
}

interface OfficeAddress {
  code: string
  region: string
  officeAddress: string
  postAddress: string
  phones: string[]
  emails: string[]
  mapQuery: string
  hours: string
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const FLAG: Record<string, string> = { OM: '🇴🇲', GB: '🇬🇧', BD: '🇧🇩', US: '🇺🇸' }

const DEFAULT_OFFICES: OfficeAddress[] = [
  {
    code: 'OM', region: 'Sultanate of Oman',
    officeAddress: 'Office-41, 4th Floor, Building-846\nWay-4011, Complex-240\nAl Gubrah, Bushar, Muscat',
    postAddress: 'P.O. Box 1432, PC-133\nAl Khuwair, Muscat\nSultanate of Oman',
    phones: ['+968 2249 5566'], emails: ['info@yanabiyagroup.com'],
    mapQuery: 'Office-41, 4th Floor, Building-846, Way-4011, Al Gubrah, Bushar, Muscat, Oman',
    hours: 'Sunday to Thursday, 8:00 AM to 6:00 PM (GST)',
  },
  {
    code: 'GB', region: 'United Kingdom',
    officeAddress: '167-169 Great Portland Street\n5th Floor, W1W 5PF',
    postAddress: 'London, United Kingdom',
    phones: ['+44 7988 518877'], emails: ['info@yanabiya.com'],
    mapQuery: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, UK',
    hours: 'Monday to Friday, 9:00 AM to 6:00 PM (GMT)',
  },
  {
    code: 'BD', region: 'Bangladesh',
    officeAddress: 'Office #211, Plot #322/B\nBlock-Kanchkura, Uttarkhan, 1230',
    postAddress: 'Dhaka, Bangladesh',
    phones: ['+880 1711 030489'], emails: ['info@yanabiyabd.com'],
    mapQuery: 'Office #211, Plot #322/B, Kanchkura, Uttarkhan, Dhaka 1230, Bangladesh',
    hours: 'Sunday to Thursday, 9:00 AM to 6:00 PM (BST)',
  },
  {
    code: 'US', region: 'United States of America',
    officeAddress: '5900 Balcones Drive\nSuite #18651, TX 78731',
    postAddress: 'Austin, Texas, United States of America',
    phones: ['+1 512 355 5715'], emails: ['info@yanabiyaus.com'],
    mapQuery: '5900 Balcones Drive #18651, Austin, TX 78731, USA',
    hours: 'Monday to Friday, 9:00 AM to 5:00 PM (CT)',
  },
]

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
    { label: 'Group Profile',      href: '/about-us' },
    { label: 'Our Story',          href: '/about/our-story' },
    { label: 'Contact Network',    href: '/contact' },
    { label: 'Our Management',     href: '/leadership/management' },
    { label: 'Blog',               href: '/community/blog' },
    { label: 'Sustainable Growth', href: '/community/sustainable-growth' },
    { label: 'Community Care',     href: '/community/community-care' },
    { label: 'Careers',            href: '/community/careers' },
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
        <button type="button" onClick={() => onChange([...links, { label: '', href: '' }])}
          className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
          <Plus size={12} /> Add
        </button>
      </div>
      <div className="space-y-2">
        {links.map((l, i) => (
          <div key={i} className="flex gap-2">
            <input value={l.label} onChange={e => update(i, 'label', e.target.value)} className={`${ipt} flex-1`} placeholder="Label" />
            <input value={l.href} onChange={e => update(i, 'href', e.target.value)} className={`${ipt} flex-1`} placeholder="/path or /#section" />
            <button type="button" title="Remove" onClick={() => onChange(links.filter((_, j) => j !== i))}
              className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function OfficeCard({ office, onChange }: { office: OfficeAddress; onChange: (v: OfficeAddress) => void }) {
  const [open, setOpen] = useState(false)
  const upd = (field: keyof OfficeAddress, val: string) => onChange({ ...office, [field]: val })

  return (
    <div className="border border-slate-700 rounded-xl overflow-hidden">
      <button type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 hover:bg-slate-750 transition-colors text-left">
        <span className="text-xl">{FLAG[office.code] ?? '🌍'}</span>
        <div className="flex-1">
          <span className="text-sm font-semibold text-white">{office.region || office.code}</span>
          <p className="text-xs text-slate-400 truncate mt-0.5">{office.officeAddress.split('\n')[0]}</p>
        </div>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>

      {open && (
        <div className="p-4 bg-slate-900 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Country Code</label>
              <input value={office.code} onChange={e => upd('code', e.target.value)} className={ipt} placeholder="OM" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Region / Country Name</label>
              <input value={office.region} onChange={e => upd('region', e.target.value)} className={ipt} placeholder="Sultanate of Oman" />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Office Address (use new line for each row)</label>
            <textarea rows={3} value={office.officeAddress} onChange={e => upd('officeAddress', e.target.value)}
              className={`${ipt} resize-none`} placeholder={'Building name\nStreet, Area\nCity'} />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Post / P.O. Box Address</label>
            <textarea rows={2} value={office.postAddress} onChange={e => upd('postAddress', e.target.value)}
              className={`${ipt} resize-none`} placeholder={'P.O. Box 1432\nCity, Country'} />
          </div>

          {/* Phone numbers */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-400">Phone Numbers</label>
              <button type="button"
                onClick={() => onChange({ ...office, phones: [...office.phones, ''] })}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={11} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {office.phones.map((ph, pi) => (
                <div key={pi} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 shrink-0">
                    <Phone size={13} className="text-emerald-400" />
                  </div>
                  <input
                    value={ph}
                    onChange={e => {
                      const p = [...office.phones]; p[pi] = e.target.value
                      onChange({ ...office, phones: p })
                    }}
                    className={`${ipt} flex-1`} placeholder="+968 2249 5566"
                  />
                  {office.phones.length > 1 && (
                    <button type="button" title="Remove phone" onClick={() => onChange({ ...office, phones: office.phones.filter((_, j) => j !== pi) })}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Email addresses */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-slate-400">Email Addresses</label>
              <button type="button"
                onClick={() => onChange({ ...office, emails: [...office.emails, ''] })}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={11} /> Add
              </button>
            </div>
            <div className="space-y-2">
              {office.emails.map((em, ei) => (
                <div key={ei} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 shrink-0">
                    <AtSign size={13} className="text-sky-400" />
                  </div>
                  <input
                    value={em}
                    onChange={e => {
                      const p = [...office.emails]; p[ei] = e.target.value
                      onChange({ ...office, emails: p })
                    }}
                    className={`${ipt} flex-1`} placeholder="info@yanabiyagroup.com"
                  />
                  {office.emails.length > 1 && (
                    <button type="button" title="Remove email" onClick={() => onChange({ ...office, emails: office.emails.filter((_, j) => j !== ei) })}
                      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Office Hours</label>
            <input value={office.hours} onChange={e => upd('hours', e.target.value)}
              className={ipt} placeholder="Sunday to Thursday, 8:00 AM to 6:00 PM" />
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Google Maps Search Query</label>
            <input value={office.mapQuery} onChange={e => upd('mapQuery', e.target.value)}
              className={ipt} placeholder="Full address for Google Maps" />
          </div>
        </div>
      )}
    </div>
  )
}

export default function FooterEdit() {
  const [data, setData] = useState<FooterData | null>(null)
  const [offices, setOffices] = useState<OfficeAddress[]>(DEFAULT_OFFICES)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      api.getSection('footer'),
      api.getSection('contact'),
    ]).then(([footerRes, contactRes]) => {
      const d = (footerRes.data ?? {}) as Record<string, unknown>
      setData({
        tagline:               (d.tagline as string)               || DEFAULTS.tagline,
        description:           (d.description as string)           || DEFAULTS.description,
        newsletterPlaceholder: (d.newsletterPlaceholder as string) || DEFAULTS.newsletterPlaceholder,
        copyrightText:         (d.copyrightText as string) || (d.copyright as string) || DEFAULTS.copyrightText,
        groupLinks:            (d.groupLinks as FooterLink[])      || DEFAULTS.groupLinks,
        corporateLinks:        (d.corporateLinks as FooterLink[])  || DEFAULTS.corporateLinks,
        socialLinks: (d.socialLinks as FooterData['socialLinks'])
          || ((d.social as { platform: string; url?: string; href?: string; icon: string }[])
              ?.map(s => ({ platform: s.platform, href: s.url || s.href || '', icon: s.icon })))
          || DEFAULTS.socialLinks,
      })

      const cd = (contactRes.data ?? {}) as Record<string, unknown>
      const savedOffices = (cd.countries as OfficeAddress[]) || (cd.offices as OfficeAddress[])
      if (savedOffices?.length) setOffices(savedOffices)
    }).catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await Promise.all([
        api.updateSection('footer', data),
        api.updateSection('contact', { countries: offices }),
      ])
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateSocial = (i: number, field: string, val: string) => {
    if (!data) return
    const c = [...data.socialLinks]; c[i] = { ...c[i], [field]: val }
    setData({ ...data, socialLinks: c })
  }

  const updateOffice = (i: number, val: OfficeAddress) => {
    const c = [...offices]; c[i] = val; setOffices(c)
  }

  if (!data) return <AdminLayout><div className="h-96 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Footer</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit footer text, office addresses, links and social media</p>
          </div>
          <button type="button" onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">

          {/* ── Office Addresses ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-semibold text-white">Office Addresses</h2>
                <p className="text-xs text-slate-400 mt-0.5">Country cards shown in the footer</p>
              </div>
              <button type="button"
                onClick={() => setOffices([...offices, { code: '', region: '', officeAddress: '', postAddress: '', phones: [''], emails: [''], mapQuery: '', hours: '' }])}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add Office
              </button>
            </div>
            <div className="space-y-2">
              {offices.map((office, i) => (
                <div key={i} className="relative">
                  <OfficeCard office={office} onChange={v => updateOffice(i, v)} />
                  <button type="button" title="Remove office"
                    onClick={() => setOffices(offices.filter((_, j) => j !== i))}
                    className="absolute top-2.5 right-10 p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors z-10">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Brand Section ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-semibold text-white">Brand Section</h2>
            <div><label className="block text-xs text-slate-400 mb-1.5">Tagline (below logo)</label>
              <input title="Tagline" placeholder="Global Enterprise Platform" value={data.tagline} onChange={e => setData({...data, tagline: e.target.value})} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Description</label>
              <textarea title="Description" placeholder="Description text..." rows={3} value={data.description} onChange={e => setData({...data, description: e.target.value})} className={`${ipt} resize-none`} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Newsletter Placeholder</label>
              <input title="Newsletter placeholder" placeholder="Subscribe to group updates" value={data.newsletterPlaceholder} onChange={e => setData({...data, newsletterPlaceholder: e.target.value})} className={ipt} /></div>
            <div><label className="block text-xs text-slate-400 mb-1.5">Copyright Text</label>
              <input title="Copyright text" placeholder="Yanabiya Group · All rights reserved." value={data.copyrightText} onChange={e => setData({...data, copyrightText: e.target.value})} className={ipt} /></div>
          </div>

          {/* ── Social Links ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Social Links</h2>
              <button type="button" onClick={() => setData({...data, socialLinks: [...data.socialLinks, {platform:'',icon:'',href:''}]})}
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
                  <button type="button" title="Remove" onClick={() => setData({...data, socialLinks: data.socialLinks.filter((_,j)=>j!==i)})}
                    className="px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <LinkListEditor title="Group Links (quick links)" links={data.groupLinks}
            onChange={v => setData({...data, groupLinks: v})} />
          <LinkListEditor title="Corporate Links (bottom nav)" links={data.corporateLinks}
            onChange={v => setData({...data, corporateLinks: v})} />
        </div>
      </div>
    </AdminLayout>
  )
}
