import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Home, Info, Briefcase, Globe, Globe2, Heart, Users, Settings,
  MonitorPlay, Building2, BarChart3, Quote, Layout, Image, BookOpen,
  Lightbulb, MessageSquare, MapPin, ImageIcon, Flag, Network,
  Users2, Navigation, Phone, FolderOpen, ArrowRight, Clock, LayoutDashboard,
  Target, Award, Calendar,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import { useAuth } from '../context/AuthContext'

interface SectionItem {
  key?: string
  label: string
  icon: LucideIcon
  to?: string
  desc: string
}

interface DashGroup {
  id: string
  label: string
  icon: LucideIcon
  accent: string
  bgAccent: string
  borderAccent: string
  hubTo: string
  items: SectionItem[]
}

const GROUPS: DashGroup[] = [
  {
    id: 'home', label: 'Home Management', icon: Home, hubTo: '/admin/home',
    accent: 'text-sky-400', bgAccent: 'bg-sky-400/10', borderAccent: 'border-sky-400/20',
    items: [
      { key: 'hero-scenes',  label: 'Hero Section',    icon: MonitorPlay, to: '/admin/hero-scenes',  desc: 'Rotating hero slides & background video' },
      { key: 'about',        label: 'About Preview',   icon: Building2,   to: '/admin/about',         desc: 'Intro, tagline & VMG cards' },
      {                      label: 'Services Preview', icon: Briefcase,                               desc: 'Services section preview on homepage' },
      {                      label: 'Branch Preview',   icon: Globe,                                   desc: 'Global branches preview section' },
      { key: 'company',      label: 'Statistics',      icon: BarChart3,   to: '/admin/company',       desc: 'Company stats & key metrics' },
      { key: 'testimonials', label: 'Testimonials',    icon: Quote,       to: '/admin/testimonials',  desc: 'Client testimonials carousel' },
      {                      label: 'CTA Sections',    icon: Layout,      to: '/admin/cta/home',      desc: 'Call-to-action banners on homepage' },
      {                      label: 'SEO Settings',    icon: Globe2,      to: '/admin/seo/home',      desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'about-us', label: 'About Us Management', icon: Info, hubTo: '/admin/about-us',
    accent: 'text-emerald-400', bgAccent: 'bg-emerald-400/10', borderAccent: 'border-emerald-400/20',
    items: [
      { key: 'page-heroes',    label: 'Hero Banner',      icon: Image,     to: '/admin/page-heroes',    desc: 'Banner image & text for About Us page' },
      { key: 'about-page',     label: 'Company Overview', icon: Building2, to: '/admin/about-page',     desc: 'Hero, proof points, mission & vision' },
      { key: 'mission-vision', label: 'Mission & Vision', icon: Target,    to: '/admin/mission-vision', desc: 'Mission, vision & values content' },
      { key: 'leadership',     label: 'CEO Message',      icon: Quote,     to: '/admin/leadership',     desc: 'CEO message & leadership profiles' },
      { key: 'our-story',      label: 'Timeline',         icon: BookOpen,  to: '/admin/our-story',      desc: 'Company history timeline' },
      { key: 'gallery-about',  label: 'Gallery',          icon: ImageIcon, to: '/admin/gallery/about',  desc: 'Photo gallery for About Us page' },
      { key: 'stats-about',    label: 'Statistics',       icon: BarChart3, to: '/admin/stats/about',    desc: 'About page stats & key figures' },
      {                        label: 'CTA Section',       icon: Layout,    to: '/admin/cta/about',      desc: 'Call-to-action banner on About page' },
      {                        label: 'SEO Settings',      icon: Globe2,    to: '/admin/seo/about',      desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'services', label: 'Our Service Management', icon: Briefcase, hubTo: '/admin/our-services',
    accent: 'text-violet-400', bgAccent: 'bg-violet-400/10', borderAccent: 'border-violet-400/20',
    items: [
      { key: 'page-heroes',    label: 'Hero Banner',        icon: Image,         to: '/admin/page-heroes',  desc: 'Banner image & text for Services page' },
      { key: 'services',       label: 'Service Categories', icon: Briefcase,     to: '/admin/services',     desc: 'Business area cards & descriptions' },
      {                        label: 'Service Cards',       icon: Layout,                                   desc: 'Individual service detail cards' },
      { key: 'solutions',      label: 'Features',           icon: Lightbulb,     to: '/admin/solutions',    desc: 'Solution features & highlights' },
      {                        label: 'Pricing',             icon: BarChart3,                                desc: 'Service pricing tables' },
      { key: 'faqs',           label: 'FAQs',               icon: MessageSquare, to: '/admin/faqs',         desc: 'Frequently asked questions' },
      {                        label: 'CTA Sections',        icon: Layout,        to: '/admin/cta/services', desc: 'Call-to-action banners on Services page' },
      {                        label: 'SEO Settings',        icon: Globe2,        to: '/admin/seo/services', desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'branches', label: 'Our Global Branches Management', icon: Globe, hubTo: '/admin/our-branches',
    accent: 'text-teal-400', bgAccent: 'bg-teal-400/10', borderAccent: 'border-teal-400/20',
    items: [
      { key: 'page-heroes',      label: 'Hero Banner',         icon: Image,     to: '/admin/page-heroes',      desc: 'Banner image & text for Branches page' },
      { key: 'country-pages',    label: 'Countries',           icon: Flag,      to: '/admin/country-pages',    desc: 'Country landing pages & details' },
      { key: 'branches',         label: 'Branch Offices',      icon: MapPin,    to: '/admin/branches',         desc: 'Oman, UK, Bangladesh, USA offices' },
      {                          label: 'Maps',                 icon: Globe,                                    desc: 'Office location maps' },
      { key: 'contact',          label: 'Contact Information', icon: Phone,     to: '/admin/contact',          desc: 'Office addresses & phone numbers' },
      {                          label: 'Regional Managers',    icon: Users,                                    desc: 'Country manager profiles' },
      { key: 'gallery-branches', label: 'Gallery',             icon: ImageIcon, to: '/admin/gallery/branches', desc: 'Country & office photo galleries' },
      { key: 'stats-branches',   label: 'Statistics',          icon: BarChart3, to: '/admin/stats/branches',   desc: 'Branch stats & key figures' },
      {                          label: 'SEO Settings',         icon: Globe2,    to: '/admin/seo/branches',     desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'network', label: 'Our Network Management', icon: Network, hubTo: '/admin/our-network',
    accent: 'text-orange-400', bgAccent: 'bg-orange-400/10', borderAccent: 'border-orange-400/20',
    items: [
      { key: 'page-heroes',   label: 'Hero Banner',   icon: Image,     to: '/admin/page-heroes',   desc: 'Banner image & text for Network page' },
      { key: 'partners',      label: 'Partners',       icon: ImageIcon, to: '/admin/partners',      desc: 'Partner & membership logos' },
      { key: 'network',       label: 'Network Cards',  icon: Globe2,    to: '/admin/network',       desc: 'Partnership network cards' },
      {                       label: 'Collaborations', icon: Network,                                desc: 'Collaboration highlights' },
      {                       label: 'Logos',          icon: Image,                                  desc: 'Client & partner logo grid' },
      {                       label: 'CTA Section',    icon: Layout,    to: '/admin/cta/network',   desc: 'Network call-to-action banner' },
      {                       label: 'SEO Settings',   icon: Globe2,    to: '/admin/seo/network',   desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'community', label: 'Our Community Management', icon: Heart, hubTo: '/admin/our-community',
    accent: 'text-rose-400', bgAccent: 'bg-rose-400/10', borderAccent: 'border-rose-400/20',
    items: [
      { key: 'page-heroes',       label: 'Hero Banner',          icon: Image,     to: '/admin/page-heroes',       desc: 'Banner image & text for Community page' },
      { key: 'community-hubs',    label: 'Community Programs',   icon: Heart,     to: '/admin/community-hubs',    desc: 'Community hub cards & overview' },
      {                           label: 'Events',                icon: Calendar,                                  desc: 'Upcoming community events' },
      { key: 'gallery-community', label: 'Gallery',              icon: ImageIcon, to: '/admin/gallery/community', desc: 'Community photo gallery' },
      { key: 'testimonials',      label: 'Testimonials',         icon: Quote,     to: '/admin/testimonials',      desc: 'Community testimonials' },
      { key: 'stats-community',   label: 'Community Statistics', icon: BarChart3, to: '/admin/stats/community',   desc: 'Community stats & key figures' },
      {                           label: 'CTA Sections',         icon: Layout,    to: '/admin/cta/community',     desc: 'Call-to-action banners on Community page' },
      {                           label: 'SEO Settings',         icon: Globe2,    to: '/admin/seo/community',     desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'people', label: 'Our People Management', icon: Users, hubTo: '/admin/our-people',
    accent: 'text-amber-400', bgAccent: 'bg-amber-400/10', borderAccent: 'border-amber-400/20',
    items: [
      { key: 'page-heroes',    label: 'Hero Banner',     icon: Image,     to: '/admin/page-heroes',    desc: 'Banner image & text for People page' },
      { key: 'leadership',     label: 'Leadership Team', icon: Users,     to: '/admin/leadership',     desc: 'Board, CEO & management bios' },
      { key: 'people',         label: 'Team Members',    icon: Users2,    to: '/admin/people',         desc: 'All team member profiles' },
      {                        label: 'Departments',      icon: Building2,                              desc: 'Department structure & info' },
      {                        label: 'Employee Cards',   icon: Users2,                                 desc: 'Individual employee showcase cards' },
      {                        label: 'Achievements',     icon: Award,                                  desc: 'Awards & recognitions' },
      { key: 'gallery-people', label: 'Gallery',         icon: ImageIcon, to: '/admin/gallery/people', desc: 'Team & people photos' },
      {                        label: 'SEO Settings',     icon: Globe2,    to: '/admin/seo/people',     desc: 'Page title, meta tags & open graph' },
    ],
  },
  {
    id: 'global-settings', label: 'Global Settings', icon: Settings, hubTo: '/admin/global-hub',
    accent: 'text-slate-300', bgAccent: 'bg-slate-400/10', borderAccent: 'border-slate-400/20',
    items: [
      { key: 'navbar',   label: 'Navbar',              icon: Navigation, to: '/admin/navbar',      desc: 'Navigation links & CTA button' },
      { key: 'footer',   label: 'Footer',              icon: Layout,     to: '/admin/footer',      desc: 'Footer links, social & copyright' },
      { key: 'contact',  label: 'Contact Information', icon: Phone,      to: '/admin/contact',     desc: 'Office addresses & phone numbers' },
      { key: 'social',   label: 'Social Links',        icon: Globe2,     to: '/admin/social',      desc: 'Social media profile links' },
      { key: 'logo',     label: 'Branding',            icon: ImageIcon,  to: '/admin/logo',        desc: 'Site logo, colours & brandmark' },
      { key: 'media',    label: 'Media Library',       icon: FolderOpen, to: '/admin/media',       desc: 'Upload & manage all media files' },
      {                  label: 'SEO Global Settings', icon: Globe,      to: '/admin/seo/global',  desc: 'Default meta tags & robots.txt' },
    ],
  },
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
      <div className="max-w-6xl">

        {/* Welcome header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0">
            <LayoutDashboard size={18} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Welcome back, {admin?.name?.split(' ')[0]}
            </h1>
            <p className="text-slate-400 text-sm">Select any section below to edit its content.</p>
          </div>
        </div>

        {/* Groups */}
        <div className="space-y-8">
          {GROUPS.map(group => {
            const GroupIcon = group.icon
            return (
              <div key={group.id}>
                {/* Group header */}
                <div className={`flex items-center justify-between mb-3 pb-3 border-b border-slate-800`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-md grid place-items-center shrink-0 ${group.accent} ${group.bgAccent}`}>
                      <GroupIcon size={13} />
                    </div>
                    <h2 className={`text-sm font-bold ${group.accent}`}>{group.label}</h2>
                  </div>
                  <Link to={group.hubTo}
                    className={`text-[11px] font-medium ${group.accent} hover:underline flex items-center gap-1`}>
                    Manage <ArrowRight size={11} />
                  </Link>
                </div>

                {/* Section cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                  {group.items.map((item) => {
                    const ItemIcon = item.icon
                    const updatedAt = item.key ? lastUpdated[item.key] : undefined

                    if (!item.to) {
                      return (
                        <div key={item.label}
                          className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-3.5 opacity-50 cursor-not-allowed">
                          <div className="flex items-start justify-between mb-2.5">
                            <div className="w-8 h-8 rounded-lg bg-slate-800 grid place-items-center text-slate-600 shrink-0">
                              <ItemIcon size={14} />
                            </div>
                            <span className="text-[9px] bg-slate-800 text-slate-600 border border-slate-700/60
                                             rounded px-1.5 py-0.5 uppercase tracking-wider">Soon</span>
                          </div>
                          <div className="text-xs font-semibold text-slate-600 mb-0.5 leading-tight">{item.label}</div>
                          <div className="text-[11px] text-slate-700 leading-snug">{item.desc}</div>
                        </div>
                      )
                    }

                    return (
                      <Link key={item.label} to={item.to}
                        className={`group bg-slate-900 border border-slate-800 rounded-xl p-3.5
                                    hover:border-${group.accent.replace('text-', '')}/30
                                    hover:bg-slate-800/60 transition-all duration-200`}>
                        <div className="flex items-start justify-between mb-2.5">
                          <div className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 ${group.bgAccent} ${group.accent}`}>
                            <ItemIcon size={14} />
                          </div>
                          <ArrowRight size={12}
                            className={`text-slate-700 group-hover:${group.accent} group-hover:translate-x-0.5 transition-all mt-0.5`} />
                        </div>
                        <div className="text-xs font-semibold text-white mb-0.5 leading-tight">{item.label}</div>
                        <div className="text-[11px] text-slate-500 leading-snug mb-1.5">{item.desc}</div>
                        {updatedAt && (
                          <div className="flex items-center gap-1 text-[10px] text-slate-700">
                            <Clock size={9} />
                            {new Date(updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          </div>
                        )}
                      </Link>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
