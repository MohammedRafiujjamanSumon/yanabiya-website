import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Home, Users, Globe, Settings, LogOut, Menu, X, ChevronDown,
  Building2, FileText, Briefcase, Quote, Navigation, Layout,
  MonitorPlay, Info, FolderOpen, MapPin, ImageIcon, Heart,
  BarChart3, BookOpen, MessageSquare, Globe2, Phone, Flag, Image,
  Users2, Network, Target, Award, Calendar, Bell, Clapperboard, MessageCircle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { assets } from '../../data/assets'

// ─── Types ───────────────────────────────────────────────────────────────────

interface NavLeaf {
  to?: string
  label: string
  icon: LucideIcon
}

interface NavGroup {
  id: string
  label: string
  icon: LucideIcon
  to?: string
  accent: string
  items: NavLeaf[]
}

type NavSingle = { single: true; to: string; label: string; icon: LucideIcon }
type NavEntry  = NavSingle | NavGroup

// ─── Navigation Tree ─────────────────────────────────────────────────────────

const NAV: NavEntry[] = [
  { single: true, to: '/admin',          label: 'Dashboard',      icon: LayoutDashboard },
  { single: true, to: '/admin/chat',     label: 'Live Chat',       icon: MessageCircle  },
  { single: true, to: '/admin/ai-video', label: 'AI Video Studio', icon: Clapperboard   },

  {
    id: 'home', label: 'Home Management', icon: Home, to: '/admin/home',
    accent: 'text-sky-400 bg-sky-400/10',
    items: [
      { to: '/admin/group/home/hero',              label: 'Hero Section',     icon: MonitorPlay },
      { to: '/admin/about',                        label: 'About Preview',    icon: Building2   },
      { to: '/admin/group/home/services-preview',  label: 'Services Preview', icon: FileText    },
      { to: '/admin/group/home/branch-preview',    label: 'Branch Preview',   icon: Globe       },
      { to: '/admin/group/home/stats',         label: 'Statistics',       icon: BarChart3   },
      { to: '/admin/group/home/testimonials',  label: 'Testimonials',     icon: Quote       },
      { to: '/admin/group/home/cta',           label: 'CTA Sections',     icon: Layout      },
      { to: '/admin/group/home/seo',           label: 'SEO Settings',     icon: Globe2      },
    ],
  },

  {
    id: 'about-us', label: 'About Us Management', icon: Info, to: '/admin/about-us',
    accent: 'text-emerald-400 bg-emerald-400/10',
    items: [
      { to: '/admin/page-heroes',                    label: 'Hero Banner',      icon: Image     },
      { to: '/admin/about-page',                     label: 'Company Overview', icon: Building2 },
      { to: '/admin/group/about-us/mission-vision',  label: 'Mission & Vision', icon: Target    },
      { to: '/admin/leadership',                     label: 'CEO Message',      icon: Quote     },
      { to: '/admin/group/about-us/timeline',        label: 'Timeline',         icon: BookOpen  },
      { to: '/admin/group/about-us/gallery',         label: 'Gallery',          icon: ImageIcon },
      { to: '/admin/group/about-us/stats',           label: 'Statistics',       icon: BarChart3 },
      { to: '/admin/group/about-us/cta',             label: 'CTA Section',      icon: Layout    },
      { to: '/admin/group/about-us/seo',             label: 'SEO Settings',     icon: Globe2    },
    ],
  },

  {
    id: 'services', label: 'Our Service Management', icon: Briefcase, to: '/admin/our-services',
    accent: 'text-violet-400 bg-violet-400/10',
    items: [
      { to: '/admin/group/our-services/hero',          label: 'Hero Banner',        icon: Image         },
      { to: '/admin/services',                        label: 'Service Categories', icon: FileText      },
      { to: '/admin/group/our-services/service-cards', label: 'Service Cards',     icon: Layout        },
      { to: '/admin/group/our-services/pricing',      label: 'Pricing',            icon: BarChart3     },
      { to: '/admin/group/our-services/faqs',  label: 'FAQs',               icon: MessageSquare },
      { to: '/admin/group/our-services/cta',   label: 'CTA Sections',       icon: Layout        },
      { to: '/admin/group/our-services/seo',   label: 'SEO Settings',       icon: Globe2        },
    ],
  },

  {
    id: 'branches', label: 'Our Global Branches Management', icon: Globe, to: '/admin/our-branches',
    accent: 'text-teal-400 bg-teal-400/10',
    items: [
      { to: '/admin/page-heroes',                  label: 'Hero Banner',         icon: Image     },
      { to: '/admin/country-pages',                label: 'Countries',           icon: Flag      },
      { to: '/admin/group/our-branches/offices',           label: 'Branch Offices',      icon: MapPin    },
      { to: '/admin/group/our-branches/maps',             label: 'Maps',                icon: Globe     },
      { to: '/admin/contact',                             label: 'Contact Information', icon: Phone     },
      { to: '/admin/group/our-branches/regional-managers', label: 'Regional Managers',  icon: Users     },
      { to: '/admin/group/our-branches/gallery',   label: 'Gallery',             icon: ImageIcon },
      { to: '/admin/group/our-branches/stats',     label: 'Statistics',          icon: BarChart3 },
      { to: '/admin/group/our-branches/seo',       label: 'SEO Settings',        icon: Globe2    },
    ],
  },

  {
    id: 'network', label: 'Our Network Management', icon: Network, to: '/admin/our-network',
    accent: 'text-orange-400 bg-orange-400/10',
    items: [
      { to: '/admin/page-heroes',                         label: 'Hero Banner',    icon: Image         },
      { to: '/admin/group/our-network/partners',          label: 'Partners',       icon: ImageIcon     },
      { to: '/admin/group/our-network/network-cards',     label: 'Network Cards',  icon: Globe2    },
      { to: '/admin/group/our-network/collaborations',   label: 'Collaborations', icon: Network   },
      { to: '/admin/group/our-network/logos',            label: 'Logos',          icon: Image     },
      { to: '/admin/group/our-network/cta',               label: 'CTA Section',    icon: Layout        },
      { to: '/admin/group/our-network/seo',               label: 'SEO Settings',   icon: Globe2        },
    ],
  },

  {
    id: 'community', label: 'Our Community Management', icon: Heart, to: '/admin/our-community',
    accent: 'text-rose-400 bg-rose-400/10',
    items: [
      { to: '/admin/page-heroes',                         label: 'Hero Banner',          icon: Image     },
      { to: '/admin/group/our-community/programs',        label: 'Community Programs',   icon: Heart     },
      { to: '/admin/group/our-community/events',          label: 'Events',               icon: Calendar  },
      { to: '/admin/group/our-community/gallery',         label: 'Gallery',              icon: ImageIcon },
      { to: '/admin/group/our-community/testimonials',    label: 'Testimonials',         icon: Quote     },
      { to: '/admin/group/our-community/stats',           label: 'Community Statistics', icon: BarChart3 },
      { to: '/admin/group/our-community/cta',             label: 'CTA Sections',         icon: Layout    },
      { to: '/admin/group/our-community/seo',             label: 'SEO Settings',         icon: Globe2    },
    ],
  },

  {
    id: 'people', label: 'Our People Management', icon: Users, to: '/admin/our-people',
    accent: 'text-amber-400 bg-amber-400/10',
    items: [
      { to: '/admin/page-heroes',                    label: 'Hero Banner',     icon: Image     },
      { to: '/admin/group/our-people/leadership',    label: 'Leadership Team', icon: Users     },
      { to: '/admin/group/our-people/team',              label: 'Team Members',    icon: Users2    },
      { to: '/admin/group/our-people/departments',      label: 'Departments',     icon: Building2 },
      { to: '/admin/group/our-people/employee-cards',   label: 'Employee Cards',  icon: Users2    },
      { to: '/admin/group/our-people/achievements',     label: 'Achievements',    icon: Award     },
      { to: '/admin/group/our-people/gallery',       label: 'Gallery',         icon: ImageIcon },
      { to: '/admin/group/our-people/seo',           label: 'SEO Settings',    icon: Globe2    },
    ],
  },

  {
    id: 'global-settings', label: 'Global Settings', icon: Settings, to: '/admin/global-hub',
    accent: 'text-slate-300 bg-slate-400/10',
    items: [
      { to: '/admin/navbar',      label: 'Navbar',               icon: Navigation    },
      { to: '/admin/footer',      label: 'Footer',               icon: Layout        },
      { to: '/admin/contact',     label: 'Contact Information',  icon: Phone         },
      { to: '/admin/social',      label: 'Social Links',         icon: Globe2        },
      { to: '/admin/logo',        label: 'Branding',             icon: ImageIcon     },
      { to: '/admin/media',       label: 'Media Library',        icon: FolderOpen    },
      { to: '/admin/seo/global',  label: 'SEO Global Settings',  icon: Globe         },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isGroup(e: NavEntry): e is NavGroup { return !('single' in e) }

function findActiveGroup(pathname: string): string | null {
  for (const e of NAV) {
    if (isGroup(e) && e.items.some(i => i.to === pathname)) return e.id
  }
  return null
}

// ─── AdminLayout ─────────────────────────────────────────────────────────────

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const lastUnreadRef = useRef<number | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  // ── Background message polling + browser notifications ───────────────────
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

    const checkMessages = async () => {
      try {
        const token = localStorage.getItem('yg_token')
        if (!token) return
        const res = await fetch(`${BASE}/api/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) return
        const msgs: { read: boolean }[] = await res.json()
        const unread = msgs.filter(m => !m.read).length
        setUnreadCount(unread)

        if (lastUnreadRef.current !== null && unread > lastUnreadRef.current) {
          const diff = unread - lastUnreadRef.current
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New message — Yanabiya CMS', {
              body: `${diff} new message${diff > 1 ? 's' : ''} from visitors.`,
              icon: '/favicon.ico',
            })
          }
        }
        lastUnreadRef.current = unread
      } catch { /* silent */ }
    }

    checkMessages()
    const interval = setInterval(checkMessages, 60_000)
    return () => clearInterval(interval)
  }, [])

  const activeGroupId = useMemo(() => findActiveGroup(location.pathname), [location.pathname])

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>()
    const ag = findActiveGroup(location.pathname)
    if (ag) s.add(ag)
    return s
  })

  useEffect(() => {
    if (activeGroupId) setExpanded(prev => new Set([...prev, activeGroupId]))
  }, [activeGroupId])

  const toggle = (id: string) =>
    setExpanded(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s })

  const handleLogout = () => { logout(); navigate('/admin/login') }

  const breadcrumb = useMemo(() => {
    for (const e of NAV) {
      if (!isGroup(e)) { if (e.to === location.pathname) return e.label; continue }
      const item = e.items.find(i => i.to === location.pathname)
      if (item) return `${e.label}  ›  ${item.label}`
    }
    return 'Admin'
  }, [location.pathname])

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">

      {/* ── Sidebar ── */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800/60
                         flex flex-col transition-transform duration-300
                         ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>

        {/* Branding */}
        <div className="px-4 py-4 border-b border-slate-800/60 flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-white grid place-items-center shrink-0 shadow-sm">
            <img src={assets.logo} alt="Yanabiya" className="h-5 w-auto object-contain" />
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Yanabiya CMS</div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Content Management</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {NAV.map((entry, idx) => {

            /* Single link */
            if (!isGroup(entry)) {
              const active = location.pathname === entry.to
              const Icon = entry.icon
              return (
                <Link key={idx} to={entry.to} onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all
                              ${active
                                ? 'bg-brand-accent/20 text-brand-accent'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
                  <Icon size={14} className="shrink-0" />
                  {entry.label}
                </Link>
              )
            }

            /* Group accordion */
            const isExp    = expanded.has(entry.id)
            const isActive = activeGroupId === entry.id
            const Icon = entry.icon
            const [iconTxt, iconBg] = entry.accent.split(' ')

            return (
              <div key={entry.id}>
                {entry.to ? (
                  /* Group with hub link — label is a Link, chevron is a separate button */
                  <div className={`w-full flex items-center rounded-lg text-xs font-semibold transition-all
                    ${isActive ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}>
                    <Link to={entry.to} onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center gap-2.5 px-3 py-2 min-w-0">
                      <div className={`w-5 h-5 rounded-md grid place-items-center shrink-0 ${iconTxt} ${iconBg}`}>
                        <Icon size={11} />
                      </div>
                      <span className="flex-1 text-left truncate">{entry.label}</span>
                    </Link>
                    <button type="button" onClick={() => toggle(entry.id)}
                      title={isExp ? 'Collapse' : 'Expand'}
                      className="px-2 py-2 shrink-0">
                      <ChevronDown size={12}
                        className={`text-slate-600 transition-transform duration-200 ${isExp ? 'rotate-180' : ''}`} />
                    </button>
                  </div>
                ) : (
                  /* Group without hub link — whole row is the toggle button */
                  <button type="button" onClick={() => toggle(entry.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold
                                 transition-all ${isActive
                                   ? 'text-white bg-slate-800'
                                   : 'text-slate-400 hover:text-white hover:bg-slate-800/60'}`}>
                    <div className={`w-5 h-5 rounded-md grid place-items-center shrink-0 ${iconTxt} ${iconBg}`}>
                      <Icon size={11} />
                    </div>
                    <span className="flex-1 text-left truncate">{entry.label}</span>
                    <ChevronDown size={12}
                      className={`text-slate-600 transition-transform duration-200 shrink-0 ${isExp ? 'rotate-180' : ''}`} />
                  </button>
                )}

                <div className={`overflow-hidden transition-all duration-200 ${isExp ? 'max-h-[600px]' : 'max-h-0'}`}>
                  <div className="ml-3 mt-0.5 mb-1 pl-3 border-l border-slate-800 space-y-0.5">
                    {entry.items.map((item, j) => {
                      const ItemIcon = item.icon

                      if (!item.to) {
                        return (
                          <div key={j}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-not-allowed">
                            <ItemIcon size={11} className="shrink-0 text-slate-700" />
                            <span className="flex-1 text-[11px] text-slate-700 truncate">{item.label}</span>
                            <span className="text-[8px] bg-slate-800/80 text-slate-600 border border-slate-700/60
                                             rounded px-1.5 py-0.5 uppercase tracking-wider shrink-0">Soon</span>
                          </div>
                        )
                      }

                      const active = location.pathname === item.to
                      return (
                        <Link key={j} to={item.to} onClick={() => setMobileOpen(false)}
                          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all
                                      ${active
                                        ? 'bg-brand-accent/15 text-brand-accent border border-brand-accent/20'
                                        : 'text-slate-500 hover:text-white hover:bg-slate-800/60'}`}>
                          <ItemIcon size={11} className="shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
          <div className="h-3" />
        </nav>

        {/* User */}
        <div className="px-3 py-3 border-t border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-7 h-7 rounded-full bg-brand-accent/20 grid place-items-center
                            text-brand-accent font-bold text-xs shrink-0">
              {admin?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">{admin?.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{admin?.email}</div>
            </div>
          </div>
          <button type="button" onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-slate-500
                       hover:text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={12} /> Log out
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* ── Main ── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 h-12 bg-slate-900/90 backdrop-blur
                           border-b border-slate-800/60 flex items-center px-4 gap-4">
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-slate-800 text-slate-400">
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
          <div className="flex-1 text-sm text-slate-400 truncate">{breadcrumb}</div>

          {/* Notification bell */}
          <Link to="/admin/messages" title="Messages"
            className="relative p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-brand-accent text-white
                               text-[9px] font-bold rounded-full grid place-items-center leading-none">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </Link>

          <a href={import.meta.env.BASE_URL} target="_blank" rel="noreferrer"
            className="text-xs text-slate-500 hover:text-brand-accent transition-colors whitespace-nowrap">
            View Site ↗
          </a>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
