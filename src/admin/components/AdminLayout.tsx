import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Phone, Users, Image, Globe, Settings,
  LogOut, Menu, X, ChevronRight, Building2, FileText,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { assets } from '../../data/assets'

const NAV = [
  { to: '/admin', label: 'Dashboard',    icon: LayoutDashboard },
  { to: '/admin/contact',   label: 'Contact Info',   icon: Phone },
  { to: '/admin/partners',  label: 'Partners & Logos', icon: Image },
  { to: '/admin/hero',      label: 'Hero Section',   icon: Globe },
  { to: '/admin/about',     label: 'About Section',  icon: Building2 },
  { to: '/admin/services',  label: 'Services',       icon: FileText },
  { to: '/admin/leadership',label: 'Leadership',     icon: Users },
  { to: '/admin/settings',  label: 'Settings',       icon: Settings },
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
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800
                    flex flex-col transition-transform duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white grid place-items-center shrink-0">
            <img src={assets.logo} alt="Yanabiya" className="h-6 w-auto object-contain" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Yanabiya Admin</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Control Panel</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV.map(({ to, label, icon: Icon }) => {
            const active = location.pathname === to
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                            ${active
                              ? 'bg-brand-accent/20 text-brand-accent border border-brand-accent/30'
                              : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
              >
                <Icon size={16} />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={14} />}
              </Link>
            )
          })}
        </nav>

        {/* User + logout */}
        <div className="px-4 py-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-brand-accent/20 grid place-items-center text-brand-accent font-bold text-sm">
              {admin?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{admin?.name}</div>
              <div className="text-[11px] text-slate-400 truncate">{admin?.email}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400
                       hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={14} /> Log out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800
                           flex items-center px-4 gap-4">
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1">
            <span className="text-sm text-slate-400">
              {NAV.find(n => n.to === location.pathname)?.label ?? 'Admin Panel'}
            </span>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-slate-400 hover:text-brand-accent transition-colors"
          >
            View Site ↗
          </a>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
