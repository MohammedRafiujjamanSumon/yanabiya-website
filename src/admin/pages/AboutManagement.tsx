import ManagementHub from '../components/ManagementHub'
import {
  Image, Building2, Target, Quote, BookOpen, ImageIcon, BarChart3, Layout, Globe2,
} from 'lucide-react'

export default function AboutManagement() {
  return (
    <ManagementHub
      title="About Us Management"
      subtitle="Edit all About Us page sections in the exact order they appear on the page."
      accent="text-emerald-400"
      bgAccent="bg-emerald-400/10"
      borderAccent="border-emerald-400/20"
      frontendPath="/about-us"
      sections={[
        { label: 'Hero Banner',      icon: Image,      to: '/admin/page-heroes',                    desc: 'Full-width banner image, headline & subtitle', frontendNote: 'Page hero — very top of About Us page' },
        { label: 'Company Overview', icon: Building2,  to: '/admin/about-page',                     desc: 'Hero proof points, mission, vision & company story', frontendNote: 'First content section' },
        { label: 'Mission & Vision', icon: Target,     to: '/admin/group/about-us/mission-vision',  desc: 'Mission statement, vision & core values cards', frontendNote: 'Appears after company overview' },
        { label: 'CEO Message',      icon: Quote,      to: '/admin/leadership',                     desc: 'CEO profile, message & leadership bios', frontendNote: 'Leadership introduction section' },
        { label: 'Timeline',         icon: BookOpen,   to: '/admin/group/about-us/timeline',        desc: 'Company history milestones & founding story', frontendNote: 'Our Story / Timeline section' },
        { label: 'Gallery',          icon: ImageIcon,  to: '/admin/group/about-us/gallery',         desc: 'Photo gallery for the About Us page', frontendNote: 'Visual gallery section' },
        { label: 'Statistics',       icon: BarChart3,  to: '/admin/group/about-us/stats',           desc: 'About page specific stats & achievements', frontendNote: 'Numbers section on About page' },
        { label: 'CTA Section',      icon: Layout,     to: '/admin/group/about-us/cta',             desc: 'Call-to-action block at bottom of About page', frontendNote: 'Pre-footer CTA' },
        { label: 'SEO Settings',     icon: Globe2,     to: '/admin/group/about-us/seo',             desc: 'Page title, meta description & Open Graph tags', frontendNote: 'Google search appearance' },
      ]}
    />
  )
}
