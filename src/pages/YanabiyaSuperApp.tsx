import {
  Smartphone, LayoutGrid, CreditCard, CalendarCheck,
  Bell, Headphones, UserCircle, Globe,
} from 'lucide-react'
import PlatformPage, { type PlatformConfig } from './PlatformPage'

const config: PlatformConfig = {
  eyebrow: 'Yanabiya Super App',
  icon: Smartphone,
  accent: '#9333ea',
  headline: 'Every Yanabiya service,',
  headlineAccent: 'in one app.',
  intro:
    'The Yanabiya Super App brings all of the group’s divisions into a single platform — trade, technology, manpower, e-commerce and more. One account, one login, every service at your fingertips on web and mobile.',
  primary: { label: 'Visit yanabiya.com', href: 'https://yanabiya.com', external: true, icon: Globe },
  secondary: { label: 'Request Early Access', to: '/#contact' },
  sectionLabel: 'One platform, everything',
  sectionTitle: 'All your services, beautifully unified.',
  features: [
    { icon: LayoutGrid,    title: 'Every Division, One Place', body: 'Access trade, IT, manpower, e-commerce and office services from a single dashboard.' },
    { icon: UserCircle,    title: 'One Unified Account',       body: 'A single Yanabiya identity across every service — no juggling logins.' },
    { icon: CalendarCheck, title: 'Book & Track Services',     body: 'Request services, track orders and follow progress in real time.' },
    { icon: CreditCard,    title: 'Integrated Payments',       body: 'Secure multi-currency payments and wallets built right in.' },
    { icon: Bell,          title: 'Smart Notifications',       body: 'Stay updated with order, shipment and service alerts as they happen.' },
    { icon: Headphones,    title: 'In-App Support',            body: 'Live chat and customer care available whenever you need it.' },
  ],
  closingTitle: 'One app for the whole group.',
  closingBody: 'Be among the first to experience the Yanabiya Super App across all your services.',
}

export default function YanabiyaSuperApp() {
  return <PlatformPage config={config} />
}
