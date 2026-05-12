import ManagementHub from '../components/ManagementHub'
import {
  Navigation, Layout, Phone, Globe2, ImageIcon, FolderOpen, Globe,
} from 'lucide-react'

export default function GlobalManagement() {
  return (
    <ManagementHub
      title="Global Settings"
      subtitle="Site-wide configuration: navbar, footer, branding, social links and SEO."
      accent="text-slate-300"
      bgAccent="bg-slate-400/10"
      borderAccent="border-slate-400/20"
      frontendPath="/"
      sections={[
        { label: 'Navbar',               icon: Navigation, to: '/admin/navbar',      desc: 'Navigation links, CTA button & mobile menu', frontendNote: 'Appears on every page' },
        { label: 'Footer',               icon: Layout,     to: '/admin/footer',      desc: 'Footer links, social icons & copyright text', frontendNote: 'Appears on every page' },
        { label: 'Contact Information',  icon: Phone,      to: '/admin/contact',     desc: 'Office addresses, phone numbers & emails', frontendNote: 'Used in contact section & footer' },
        { label: 'Social Links',         icon: Globe2,     to: '/admin/social',      desc: 'LinkedIn, Twitter, Instagram, Facebook URLs', frontendNote: 'Used in footer & social float' },
        { label: 'Branding',             icon: ImageIcon,  to: '/admin/logo',        desc: 'Site logo, favicon & brand colours', frontendNote: 'Appears sitewide' },
        { label: 'Media Library',        icon: FolderOpen, to: '/admin/media',       desc: 'Upload and manage all media files in S3', frontendNote: 'Shared asset library' },
        { label: 'SEO Global Settings',  icon: Globe,      to: '/admin/seo/global',  desc: 'Default meta tags, robots.txt & site verification', frontendNote: 'Fallback SEO for all pages' },
      ]}
    />
  )
}
