import ManagementHub from '../components/ManagementHub'
import {
  Image, ImageIcon, Globe2, Network, Layout, Globe,
} from 'lucide-react'

export default function NetworkManagement() {
  return (
    <ManagementHub
      title="Our Network Management"
      subtitle="Manage partnerships, network cards, and collaboration content."
      accent="text-orange-400"
      bgAccent="bg-orange-400/10"
      borderAccent="border-orange-400/20"
      frontendPath="/country/om"
      sections={[
        { label: 'Hero Banner',    icon: Image,     to: '/admin/page-heroes',                      desc: 'Network page hero banner & headline', frontendNote: 'Top of network page' },
        { label: 'Partners',       icon: ImageIcon, to: '/admin/group/our-network/partners',        desc: 'Partner company profiles and details', frontendNote: 'Partner showcase section' },
        { label: 'Network Cards',  icon: Globe2,    to: '/admin/group/our-network/network-cards',   desc: 'Partnership network cards and descriptions', frontendNote: 'Network grid' },
        { label: 'Collaborations', icon: Network,  to: '/admin/group/our-network/collaborations',  desc: 'Collaboration highlights and joint ventures', frontendNote: 'Collaboration section' },
        { label: 'Logos',          icon: Image,    to: '/admin/group/our-network/logos',            desc: 'Partner and member logo grid/carousel', frontendNote: 'Logo wall section' },
        { label: 'CTA Section',    icon: Layout,    to: '/admin/group/our-network/cta',             desc: 'Call-to-action for network/partnership enquiries', frontendNote: 'CTA block' },
        { label: 'SEO Settings',   icon: Globe,     to: '/admin/group/our-network/seo',             desc: 'Meta tags for the network page', frontendNote: 'Search engine settings' },
      ]}
    />
  )
}
