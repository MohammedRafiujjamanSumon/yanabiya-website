import ManagementHub from '../components/ManagementHub'
import {
  MonitorPlay, Building2, FileText, Globe, BarChart3, Quote, Layout, Globe2,
} from 'lucide-react'

export default function HomeManagement() {
  return (
    <ManagementHub
      title="Home Management"
      subtitle="Edit all content shown on the homepage, section by section."
      accent="text-sky-400"
      bgAccent="bg-sky-400/10"
      borderAccent="border-sky-400/20"
      frontendPath="/"
      sections={[
        { label: 'Hero Section',     icon: MonitorPlay, to: '/admin/group/home/hero',         desc: 'Rotating hero slides, headlines & background video', frontendNote: 'Top of homepage — first impression' },
        { label: 'About Preview',    icon: Building2,   to: '/admin/about',                               desc: 'Intro paragraph, tagline & VMG cards below hero', frontendNote: 'Appears just below the hero section' },
        { label: 'Services Preview', icon: FileText,   to: '/admin/group/home/services-preview',           desc: 'Service category cards shown on homepage', frontendNote: 'Mid-page services grid' },
        { label: 'Branch Preview',   icon: Globe,      to: '/admin/group/home/branch-preview',             desc: 'Global branches preview section', frontendNote: 'Country/branch highlights on homepage' },
        { label: 'Statistics',       icon: BarChart3,   to: '/admin/group/home/stats',         desc: 'Key numbers: years, countries, employees, projects', frontendNote: 'Stats counter row' },
        { label: 'Testimonials',     icon: Quote,       to: '/admin/group/home/testimonials',  desc: 'Client testimonials carousel', frontendNote: 'Social proof section' },
        { label: 'CTA Sections',     icon: Layout,      to: '/admin/group/home/cta',           desc: 'Call-to-action banners and contact prompts', frontendNote: 'Bottom of homepage before footer' },
        { label: 'SEO Settings',     icon: Globe2,      to: '/admin/group/home/seo',           desc: 'Page title, meta description & Open Graph tags', frontendNote: 'Controls how homepage appears in Google' },
      ]}
    />
  )
}
