import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Phone, Users, Image, Globe, Settings,
  LogOut, Menu, X, ChevronRight, Building2, FileText,
  Newspaper, Briefcase, Quote, Navigation, Layout, MonitorPlay, Info, FolderOpen,
  Lightbulb, MapPin, ImageIcon, Heart, Banknote, BarChart3,
  BookOpen, Languages, MessageSquare, Globe2,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { assets } from '../../data/assets'

const NAV = [
  { to: '/admin',                label: 'Dashboard',         icon: LayoutDashboard },

  { header: 'BRANDING & MEDIA' },
  { to: '/admin/logo',           label: 'Logo & Branding',   icon: ImageIcon },
  { to: '/admin/media',          label: 'Media Library',     icon: FolderOpen },

  { header: 'NAVBAR' },
  { to: '/admin/navbar',         label: 'Navbar Editor',     icon: Navigation },

  { header: 'HERO' },
  { to: '/admin/hero-scenes',    label: 'Hero Slides',       icon: MonitorPlay },
  { to: '/admin/page-heroes',    label: 'Page Banners',      icon: Image },

  { header: 'STATS' },
  { to: '/admin/company',        label: 'Company Stats',     icon: BarChart3 },

  { header: 'ABOUT US' },
  { to: '/admin/about-page',     label: 'About Us Page',     icon: Info },
  { to: '/admin/about',          label: 'About Section',     icon: Building2 },
  { to: '/admin/our-story',      label: 'Our Story',         icon: BookOpen },
  { to: '/admin/pages',          label: 'Custom Subpages',   icon: Layout },

  { header: 'OUR SERVICES' },
  { to: '/admin/services',       label: 'Services',          icon: FileText },
  { to: '/admin/solutions',      label: 'Solutions',         icon: Lightbulb },

  { header: 'GLOBAL BRANCHES' },
  { to: '/admin/branches',       label: 'Global Branches',   icon: MapPin },
  { to: '/admin/partners',       label: 'Partners & Logos',  icon: Image },

  { header: 'COUNTRY PAGES' },
  { to: '/admin/country-pages',  label: 'Country Pages',     icon: Globe },

  { header: 'COMMUNITY' },
  { to: '/admin/network',        label: 'Our Network',       icon: Globe2 },
  { to: '/admin/community-hubs', label: 'Community Hubs',    icon: Heart },
  { to: '/admin/community-pages',label: 'Community Pages',   icon: Layout },
  { to: '/admin/blog',           label: 'Blog Posts',        icon: Newspaper },
  { to: '/admin/testimonials',   label: 'Testimonials',      icon: Quote },
  { to: '/admin/donation',       label: 'Donation & Bank',   icon: Banknote },

  { header: 'OUR PEOPLE' },
  { to: '/admin/leadership',     label: 'Leadership',        icon: Users },
  { to: '/admin/people',         label: 'People Profiles',   icon: Users },
  { to: '/admin/careers',        label: 'Careers',           icon: Briefcase },

  { header: 'LANGUAGE' },
  { to: '/admin/language',       label: 'Language Settings', icon: Languages },

  { header: 'CONTACT' },
  { to: '/admin/contact',        label: 'Contact Info',      icon: Phone },
  { to: '/admin/messages',       label: 'Messages',          icon: MessageSquare },

  { header: 'FOOTER' },
  { to: '/admin/footer',         label: 'Footer',            icon: Layout },

  { header: 'ACCOUNT' },
  { to: '/admin/settings',       label: 'Settings',          icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const handleLogout = () => { logout(); navigate('/admin/login') }

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 bg-slate-900 border-r border-slate-800
                    flex flex-col transition-transform duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-4 py-4 border-b border-slate-800 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white grid place-items-center shrink-0">
            <img src={assets.logo} alt="Yanabiya" className="h-5 w-auto object-contain" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Yanabiya Admin</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400">Control Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map((item, idx) => {
            if ('header' in item) {
              return (
                <div key={idx} className="px-3 pt-4 pb-1 text-[9px] uppercase tracking-[0.18em] text-slate-600 font-semibold">
                  {item.header}
                </div>
              )
            }
            const active = location.pathname === item.to
            const Icon = item.icon!
            return (
              <Link
                key={item.to}
                to={item.to!}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all
                            ${active
                              ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/25'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <Icon size={14} className="shrink-0" />
                <span className="flex-1">{item.label}</span>
                {active && <ChevronRight size={12} />}
              </Link>
            )
          })}
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-brand-accent/20 grid place-items-center text-brand-accent font-bold text-xs shrink-0">
              {admin?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{admin?.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{admin?.email}</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500
                       hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={12} /> Log out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 h-12 bg-slate-900/90 backdrop-blur border-b border-slate-800 flex items-center px-4 gap-4">
          <button type="button" onClick={() => setOpen(!open)} className="lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
            {open ? <X size={16}/> : <Menu size={16}/>}
          </button>
          <div className="flex-1 text-sm text-slate-400">
            {NAV.find(n => 'to' in n && n.to === location.pathname)?.label ?? 'Admin'}
          </div>
          <a href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer" className="text-xs text-slate-500 hover:text-brand-accent transition-colors">
            View Site ↗
          </a>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
