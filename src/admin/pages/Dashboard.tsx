import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Image, Globe, Building2, Users, FileText, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import { useAuth } from '../context/AuthContext'

const SECTIONS = [
  { key: 'contact',   label: 'Contact Info',    icon: Phone,     to: '/admin/contact',    desc: 'Office addresses, phones & emails' },
  { key: 'partners',  label: 'Partners & Logos', icon: Image,     to: '/admin/partners',   desc: 'Partner, client & membership logos' },
  { key: 'hero',      label: 'Hero Section',     icon: Globe,     to: '/admin/hero',       desc: 'Main headline, subtext & stats' },
  { key: 'about',     label: 'About Section',    icon: Building2, to: '/admin/about',      desc: 'Company pillars & intro' },
  { key: 'services',  label: 'Services',         icon: FileText,  to: '/admin/services',   desc: 'Business cards & descriptions' },
  { key: 'leadership',label: 'Leadership',       icon: Users,     to: '/admin/leadership', desc: 'Board & management team' },
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
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {admin?.name?.split(' ')[0]} 👋
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Manage your website content from here. All changes are saved instantly.
          </p>
        </div>

        {/* Status bar */}
        <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-xl px-5 py-4 mb-8 flex items-center gap-3">
          <CheckCircle size={18} className="text-brand-accent shrink-0" />
          <div>
            <div className="text-sm font-semibold text-white">API Connected</div>
            <div className="text-xs text-slate-400">Backend is online — all edits save to MongoDB</div>
          </div>
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTIONS.map(({ key, label, icon: Icon, to, desc }) => (
            <Link
              key={key}
              to={to}
              className="group bg-slate-900 border border-slate-800 rounded-xl p-5
                         hover:border-brand-accent/40 hover:bg-slate-800/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-accent">
                  <Icon size={18} />
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-600 group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all"
                />
              </div>
              <div className="font-semibold text-white text-sm mb-1">{label}</div>
              <div className="text-slate-500 text-xs mb-3">{desc}</div>
              {lastUpdated[key] && (
                <div className="flex items-center gap-1.5 text-[11px] text-slate-600">
                  <Clock size={11} />
                  Updated {new Date(lastUpdated[key]).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
