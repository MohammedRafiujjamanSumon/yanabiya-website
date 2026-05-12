import ManagementHub from '../components/ManagementHub'
import {
  Image, Flag, MapPin, Globe, Phone, Users, ImageIcon, BarChart3, Globe2,
} from 'lucide-react'

export default function BranchesManagement() {
  return (
    <ManagementHub
      title="Our Global Branches Management"
      subtitle="Manage all international branch offices, countries, and contact details."
      accent="text-teal-400"
      bgAccent="bg-teal-400/10"
      borderAccent="border-teal-400/20"
      frontendPath="/country/om"
      sections={[
        { label: 'Hero Banner',         icon: Image,     to: '/admin/page-heroes',                  desc: 'Hero banner for global branches page', frontendNote: 'Top of branches/global page' },
        { label: 'Countries',           icon: Flag,      to: '/admin/country-pages',                desc: 'Country landing pages — Oman, UK, Bangladesh, USA', frontendNote: 'Country-specific content' },
        { label: 'Branch Offices',      icon: MapPin,    to: '/admin/group/our-branches/offices',   desc: 'Branch office details, addresses & photos', frontendNote: 'Office listings section' },
        { label: 'Maps',                icon: Globe,     to: '/admin/group/our-branches/maps',              desc: 'Embedded maps for each office location', frontendNote: 'Map embeds section' },
        { label: 'Contact Information', icon: Phone,     to: '/admin/contact',                              desc: 'Phone numbers, emails & office addresses', frontendNote: 'Contact details per branch' },
        { label: 'Regional Managers',   icon: Users,     to: '/admin/group/our-branches/regional-managers', desc: 'Country manager profiles & contacts', frontendNote: 'Regional leadership section' },
        { label: 'Gallery',             icon: ImageIcon, to: '/admin/group/our-branches/gallery',   desc: 'Country and office photo galleries', frontendNote: 'Visual gallery section' },
        { label: 'Statistics',          icon: BarChart3, to: '/admin/group/our-branches/stats',     desc: 'Countries served, offices, regional stats', frontendNote: 'Numbers section' },
        { label: 'SEO Settings',        icon: Globe2,    to: '/admin/group/our-branches/seo',       desc: 'Meta tags for global branches pages', frontendNote: 'Search engine settings' },
      ]}
    />
  )
}
