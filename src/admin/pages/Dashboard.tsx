import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone, Image, Globe, Building2, Users, FileText,
  ArrowRight, Clock, MonitorPlay, Info, Navigation,
  Layout, Newspaper, Briefcase, Quote, FolderOpen,
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  { key: 'hero-scenes',  label: 'Hero Slides',      icon: MonitorPlay, to: '/admin/hero-scenes',  desc: '7 rotating banner scenes' },
  { key: 'company',      label: 'Company Info',      icon: Info,        to: '/admin/company',      desc: 'Name, tagline, stats, mission & vision' },
  { key: 'navbar',       label: 'Navbar',            icon: Navigation,  to: '/admin/navbar',       desc: 'Navigation labels & CTA button' },
  { key: 'about',        label: 'About Section',     icon: Building2,   to: '/admin/about',        desc: 'Company pillars & intro' },
  { key: 'services',     label: 'Services',          icon: FileText,    to: '/admin/services',     desc: 'Business cards & descriptions' },
  { key: 'partners',     label: 'Partners & Logos',  icon: Image,       to: '/admin/partners',     desc: 'Partner, client & membership logos' },
  { key: 'leadership',   label: 'Leadership',        icon: Users,       to: '/admin/leadership',   desc: 'Board & management profiles' },
  { key: 'contact',      label: 'Contact Info',      icon: Phone,       to: '/admin/contact',      desc: 'Office addresses, phones & emails' },
  { key: 'footer',       label: 'Footer',            icon: Layout,      to: '/admin/footer',       desc: 'Links, social media & copyright' },
  { key: 'blog',         label: 'Blog Posts',        icon: Newspaper,   to: '/admin/blog',         desc: 'Create & manage blog articles' },
  { key: 'careers',      label: 'Careers',           icon: Briefcase,   to: '/admin/careers',      desc: 'Job listings per country' },
  { key: 'testimonials', label: 'Testimonials',      icon: Quote,       to: '/admin/testimonials', desc: 'Client testimonials per country' },
  { key: 'hero',          label: 'Hero Text',         icon: Globe,       to: '/admin/hero',          desc: 'Homepage headline & stats' },
  { key: 'page-heroes',   label: 'Page Heroes',       icon: Image,       to: '/admin/page-heroes',   desc: 'Hero banner text on every sub-page' },
  { key: 'country-pages', label: 'Country Pages',     icon: Globe,       to: '/admin/country-pages', desc: 'Oman, UK, Bangladesh, USA landing pages' },
  { key: 'media',         label: 'Media Library',     icon: FolderOpen,  to: '/admin/media',         desc: 'Upload and manage all images & videos' },
]

export default function Dashboard() {
  const { admin } = useAuth()
  const [lastUpdated, setLastUpdated] = useState<Record<string, string>>({})

  useEffect(() => {
    api.listSections()
      .then(list => {
        const map: Record<string, string> = {}
        list.forEach(s => { map[s.key] = s.updatedAt })
        setLastUpdated(map)
      })
      .catch(() => {})
  }, [])

  return (
    <AdminLayout>
      <div className="max-w-5xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Welcome back, {admin?.name?.split(' ')[0]} 👋</h1>
          <p className="text-slate-400 mt-1 text-sm">Edit any section of the Yanabiya website below.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECTIONS.map(({ key, label, icon: Icon, to, desc }) => (
            <Link
              key={key}
              to={to}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-4
                         hover:border-brand-accent/40 hover:bg-slate-800/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0">
                  <Icon size={16} />
                </div>
                <ArrowRight size={14} className="text-slate-600 group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all mt-1" />
              </div>
              <div className="font-semibold text-white text-sm mb-0.5">{label}</div>
              <div className="text-slate-500 text-xs mb-2">{desc}</div>
              {lastUpdated[key] && (
                <div className="flex items-center gap-1 text-[10px] text-slate-700">
                  <Clock size={10} />
                  {new Date(lastUpdated[key]).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
