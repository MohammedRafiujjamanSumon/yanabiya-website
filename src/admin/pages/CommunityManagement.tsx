import ManagementHub from '../components/ManagementHub'
import {
  Image, Heart, Calendar, ImageIcon, Quote, BarChart3, Layout, Globe2,
} from 'lucide-react'

export default function CommunityManagement() {
  return (
    <ManagementHub
      title="Our Community Management"
      subtitle="Edit all community programs, events, gallery and testimonials."
      accent="text-rose-400"
      bgAccent="bg-rose-400/10"
      borderAccent="border-rose-400/20"
      frontendPath="/community/sustainable-growth"
      sections={[
        { label: 'Hero Banner',          icon: Image,     to: '/admin/page-heroes',                        desc: 'Community page hero banner & headline', frontendNote: 'Top of community pages' },
        { label: 'Community Programs',   icon: Heart,     to: '/admin/group/our-community/programs',        desc: 'Hub cards: sustainable growth, community care, etc.', frontendNote: 'Community hubs overview grid' },
        { label: 'Events',               icon: Calendar,  to: '/admin/group/our-community/events',          desc: 'Upcoming and past community events', frontendNote: 'Events section' },
        { label: 'Gallery',              icon: ImageIcon, to: '/admin/group/our-community/gallery',         desc: 'Community photo gallery and event photos', frontendNote: 'Visual gallery section' },
        { label: 'Testimonials',         icon: Quote,     to: '/admin/group/our-community/testimonials',    desc: 'Community member testimonials', frontendNote: 'Social proof section' },
        { label: 'Community Statistics', icon: BarChart3, to: '/admin/group/our-community/stats',           desc: 'Impact numbers: beneficiaries, programs, years', frontendNote: 'Impact stats section' },
        { label: 'CTA Sections',         icon: Layout,    to: '/admin/group/our-community/cta',             desc: 'Get involved / donate call-to-action blocks', frontendNote: 'CTA banners' },
        { label: 'SEO Settings',         icon: Globe2,    to: '/admin/group/our-community/seo',             desc: 'Meta tags for community pages', frontendNote: 'Search engine settings' },
      ]}
    />
  )
}
