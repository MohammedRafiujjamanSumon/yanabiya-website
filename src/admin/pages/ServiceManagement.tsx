import ManagementHub from '../components/ManagementHub'
import {
  Image, FileText, Layout, Lightbulb, BarChart3, MessageSquare, Globe2,
} from 'lucide-react'

export default function ServiceManagement() {
  return (
    <ManagementHub
      title="Our Service Management"
      subtitle="Edit all service page content and offerings."
      accent="text-violet-400"
      bgAccent="bg-violet-400/10"
      borderAccent="border-violet-400/20"
      frontendPath="/business/technology"
      sections={[
        { label: 'Hero Banner',        icon: Image,         to: '/admin/group/our-services/hero',  desc: 'Services page hero banner and headline', frontendNote: 'Top of any service page' },
        { label: 'Service Categories', icon: FileText,      to: '/admin/services',                 desc: 'All service category cards, descriptions & sub-pages', frontendNote: 'Main service grid' },
        { label: 'Service Cards',      icon: Layout,        to: '/admin/group/our-services/service-cards', desc: 'Visual card layout and styling for service items', frontendNote: 'Card display configuration' },
        { label: 'Features',           icon: Lightbulb,     to: '/admin/solutions',                        desc: '10 solution items shown across service pages', frontendNote: 'Feature/solutions list' },
        { label: 'Pricing',            icon: BarChart3,     to: '/admin/group/our-services/pricing',       desc: 'Service pricing tables and packages', frontendNote: 'Pricing section' },
        { label: 'FAQs',               icon: MessageSquare, to: '/admin/group/our-services/faqs',  desc: 'Frequently asked questions for services', frontendNote: 'FAQ accordion section' },
        { label: 'CTA Sections',       icon: Layout,        to: '/admin/group/our-services/cta',   desc: 'Call-to-action prompts on service pages', frontendNote: 'CTA banners' },
        { label: 'SEO Settings',       icon: Globe2,        to: '/admin/group/our-services/seo',   desc: 'Meta tags for all service pages', frontendNote: 'Search engine settings' },
      ]}
    />
  )
}
