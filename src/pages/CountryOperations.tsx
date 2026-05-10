import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Building2, Calendar, MapPin,
  Landmark, ScrollText, ShieldCheck, Mail,
  Cpu, Boxes, Briefcase, Ship, Plane, Handshake,
  TrendingUp, Sparkles, Lightbulb, Megaphone, Globe2,
  Heart, Send, Users, ShoppingCart, Monitor,
  type LucideIcon,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'
import { countries } from '../data/countries'
import Partnerships from '../sections/Partnerships'
import { assets } from '../data/assets'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [transition-delay:var(--reveal-delay)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  )
}

type LeaderProfile = {
  name: string
  role: string
  image: string
  bio: string
}

type CountryOps = {
  intro: string
  branchIntro: string
  parentCompany: string
  mission: string
  vision?: string
  established: string
  registration: { label: string; value: string }
  legalEntity: string
  license?: { name: string; authority: string }
  address: string
  postCode?: string
  services: { label: string; desc: string; icon: LucideIcon; slug: string; image: string; href?: string }[]
  strategicPartners: PartnerItem[]
  operationalPartners: PartnerItem[]
  categories: { label: string; icon: LucideIcon; tone: string; image: string; href?: string; to?: string; badge?: string; sic?: string; desc?: string }[]
  licensedActivities: string[]
  currentProjects: { title: string; body: string; image?: string }[]
  activeSectors: string[]
  futurePlans: { title: string; body: string; icon: LucideIcon; image?: string }[]
  countryLeadership: { cofounder: LeaderProfile; managingDirector: LeaderProfile }
}

type PartnerItem = {
  name: string
  logo?: string
  domain?: string
}

const OPS: Record<string, CountryOps> = {
  BD: {
    intro:
      'Yanabiya Gulf International BD Trade is the Group\'s South Asia delivery hub, built around an engineering bench in Dhaka, an apparel-manufacturing network nationwide, and a fast-growing partner ecosystem.',
    branchIntro:
      'Our Bangladesh operation acts as the regional engine for technology delivery, garment trade, and workforce mobility. From Uttarkhan, we coordinate cross-border services for clients across Yanabiya\'s four countries.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC, Sultanate of Oman',
    mission:
      'Deliver world-class digital and trade services from Bangladesh, with the discipline and scale of a multinational group.',
    vision:
      'To be South Asia\'s most trusted multi-sector delivery partner, engineered in Dhaka, deployed globally.',
    established: '17 November 1998',
    registration: { label: 'Trade License', value: 'TRAD/DNCC/100677/1998' },
    legalEntity: 'Yanabiya Gulf International BD Trade',
    license: { name: 'Trade License, General Trading & IT', authority: 'Dhaka North City Corporation' },
    address: 'Office #211, Plot #322/B, Block-Kanchkura, Uttarkhan, Dhaka-1230, Bangladesh',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',               desc: 'Private-label apparel sourcing, manufacturing, and retail supply.',    icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane,     slug: 'manpower',         image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    strategicPartners: [
      { name: 'Plexus Cloud', logo: '/logos/partners-co/plexuscloud.png' },
    ],
    operationalPartners: [],
    categories: [
      { label: 'Management & Corporate Admin',           icon: Building2,    tone: 'from-slate-500/40 to-slate-700/40',    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=70' },
      { label: 'Building & Civil Construction',          icon: Building2,    tone: 'from-rose-500/40 to-red-700/40',       image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=70' },
      { label: 'Utilities & Telecom Networks',           icon: Cpu,          tone: 'from-blue-500/40 to-blue-700/40',      image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=400&q=70' },
      { label: 'Plastering, Painting & Decorating',     icon: Sparkles,     tone: 'from-yellow-500/40 to-yellow-700/40',  image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=400&q=70' },
      { label: 'Specialised Cleaning',                   icon: Sparkles,     tone: 'from-cyan-500/40 to-cyan-700/40',      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=70' },
      { label: 'Construction Equipment Rental',          icon: Building2,    tone: 'from-orange-500/40 to-orange-700/40',  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
      { label: 'Construction Materials Retail',          icon: Boxes,        tone: 'from-amber-500/40 to-amber-700/40',    image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?auto=format&fit=crop&w=400&q=70' },
      { label: 'International Maritime Transport',       icon: Ship,         tone: 'from-cyan-500/40 to-sky-700/40',       image: 'https://images.unsplash.com/photo-1494412574745-e1e7c8faa40d?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cold & Frozen Warehousing',              icon: Boxes,        tone: 'from-sky-400/40 to-blue-700/40',       image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=70' },
      { label: 'Loading & Unloading Goods',              icon: Boxes,        tone: 'from-violet-500/40 to-indigo-700/40',  image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=70' },
      { label: 'Packaging & Storage Operations',         icon: Boxes,        tone: 'from-amber-400/40 to-yellow-700/40',   image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=400&q=70' },
      { label: 'Export & Import Offices',                icon: Plane,        tone: 'from-green-500/40 to-emerald-700/40',  image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=400&q=70' },
      { label: 'Commission Agents & Brokerage',          icon: Handshake,    tone: 'from-purple-500/40 to-purple-700/40',  image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=70' },
      { label: 'Wholesale Clothing & Accessories',       icon: Briefcase,    tone: 'from-pink-500/40 to-rose-700/40',      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=70' },
      { label: 'Textiles & Fabrics Retail',              icon: Briefcase,    tone: 'from-fuchsia-500/40 to-pink-700/40',   image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software & Computer Accessories Retail', icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70' },
      { label: 'Computer & Phone Repair',                icon: Cpu,          tone: 'from-red-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software & Network Installation',        icon: Cpu,          tone: 'from-teal-500/40 to-teal-700/40',      image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cloud Computing & Hosting',              icon: Monitor,      tone: 'from-sky-500/40 to-blue-700/40',       image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=70' },
      { label: 'Systems Analysis & IT Consulting',       icon: Cpu,          tone: 'from-emerald-500/40 to-green-700/40',  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software Maintenance & Web Design',      icon: Monitor,      tone: 'from-indigo-500/40 to-violet-700/40',  image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=70' },
      { label: 'IT & Cyber-Security Consulting',         icon: Cpu,          tone: 'from-red-400/40 to-rose-700/40',       image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=70' },
      { label: 'Data Entry & Digital Operations',        icon: Monitor,      tone: 'from-slate-500/40 to-zinc-700/40',     image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cafés & Beverage Services',              icon: Megaphone,    tone: 'from-amber-500/40 to-amber-700/40',    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=70' },
      { label: 'Catering & Food Services',               icon: Megaphone,    tone: 'from-orange-500/40 to-orange-700/40',  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=70' },
    ],
    licensedActivities: [
      'Management offices and corporate administration',
      'Construction of buildings and civil works',
      'Construction of water, electricity and telecommunications networks',
      'Plastering, painting and decorating',
      'Specialised cleaning and exterior cleaning of buildings',
      'Renting of construction or demolition equipment with operator',
      'Retail sale in specialised stores of construction materials',
      'International maritime goods transport',
      'Cold and frozen warehousing',
      'Loading and unloading of goods',
      'Packaging activities and storage operations',
      'Activities of export and import offices',
      'Activities of commission agents and brokerage business',
      'Wholesale of clothing and clothing accessories',
      'Retail sale in specialised stores of textiles and fabrics',
      'Retail sale of software and computer accessories',
      'Repair of computers, peripherals and mobile phones',
      'Installation of computer software and network development',
      'Cloud computing and hosting services',
      'Systems analysis and IT consultancy',
      'Maintenance of software and designing of websites',
      'Information technology and cyber-security consulting',
      'Data entry services and digital operations',
      'Cafés that offer meals or beverages',
      'Catering activities and food service',
    ],
    currentProjects: [
      { title: 'Regional Delivery Centre',    body: '24×7 engineering & QA support for clients across the four-country group.',           image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Apparel Sourcing Network',    body: 'Active relationships with vetted RMG factories supplying private-label clients.',     image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { title: 'Workforce Mobility Pipeline', body: 'Skilled & semi-skilled placement into the Gulf, UK and US under group employer.',     image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Government IT Engagements',   body: 'Public-sector digitalisation pilots in coordination with local partners.',           image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
    ],
    activeSectors: [
      'Information Technology, Software Development & Cloud Services',
      'Apparel & Textile Trade Operations',
      'Manpower Mobility & Overseas Workforce Placement',
      'Education Pathways & Student Placement',
      'Logistics, Customs & International Shipping',
      'Office Administration & Business Support Services',
    ],
    futurePlans: [
      { title: 'Green Data Centre',             body: 'Investment in a sustainable Tier-III data-centre facility serving regional cloud workloads.', icon: Sparkles,   image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
      { title: 'Global Digital Infrastructure', body: 'Expand the Dhaka delivery centre into a 500+ engineer hub serving all four group countries.', icon: TrendingUp, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'Innovation-Driven Services',    body: 'Productised AI, security & analytics offerings exported under the Yanabiya brand.',           icon: Lightbulb,  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'New Country Entry: KSA',        body: 'Saudi Arabia entity in 2027 to extend Gulf-wide trade and manpower coverage.',                icon: Globe2,     image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80' },
    ],
    countryLeadership: {
      cofounder: {
        name: 'Mohammad Abu Jaheed',
        role: 'Co-founder & Vice Chairman',
        image: assets.viceChairman,
        bio: 'As Co-founder and Vice Chairman, Mohammad Abu Jaheed champions Yanabiya\'s South Asia presence, overseeing the Bangladesh operation as the Group\'s technology and trade delivery hub.',
      },
      managingDirector: {
        name: 'S M Momim Ahmed',
        role: 'Managing Director',
        image: assets.people.momiimAhmed,
        bio: 'S M Momim Ahmed leads Yanabiya Bangladesh\'s day-to-day operations, directing a multi-sector team across technology delivery, garment trade, and workforce mobility.',
      },
    },
  },
  OM: {
    intro:
      'Yanabiya Gulf International Business and Trade SPC is the Group\'s headquarters, anchoring multi-sector operations across Oman through a coordinated network of seven partner companies in Muscat.',
    branchIntro:
      'Operating from Muscat since 2021, our Oman headquarters coordinates trade, contracting, technology and hospitality across the Sultanate under one integrated business structure.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC',
    mission:
      'Deliver the Stamp of Quality & Professionalism, built on morals, ethics, honesty, and customer satisfaction across every Yanabiya engagement.',
    vision:
      'A leading global performer in trade, technology and integrated services, headquartered in Oman and scaling across four continents.',
    established: '19 September 2021',
    postCode: 'P.O. Box 1432, PC-133\nAl Khuwair, Muscat\nSultanate of Oman',
    registration: { label: 'Commercial Registration', value: '1395664' },
    legalEntity: 'Yanabiya Gulf International Business & Trade SPC',
    license: { name: 'Commercial Registration & Activities Licence', authority: 'Ministry of Commerce, Industry & Investment Promotion (MOCIIP), Oman' },
    address: 'Office-41, 4th Floor, Building-846\nWay-4011, Complex-240\nAl Gubrah, Bushar, Muscat\nSultanate of Oman',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',               desc: 'Wholesale clothing, retail textiles, and accessories trade.',          icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane,    slug: 'manpower',         image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    strategicPartners: [
      { name: 'Yanabiya Muscat United Trade' },
      { name: 'Yanabiya Muscat for Comprehensive Projects' },
      { name: 'Yanabiya Muscat Integrated LLC' },
      { name: 'Yanabiya Al Khairat United Trade LLC' },
      { name: 'Yanabiya Muscat World Business' },
      { name: 'Yanabiya Muscat Al Mumyazat' },
      { name: 'Yanabiya Al Rustaq Contracting' },
    ],
    operationalPartners: [
      { name: 'Amazon Web Services', logo: '/logos/partners-co/aws.svg' },
      { name: 'Microsoft',           logo: '/logos/partners-co/microsoft.svg' },
      { name: 'Oracle',              logo: '/logos/partners-co/oracle.svg' },
      { name: 'SAP',                 logo: '/logos/partners-co/sap.svg' },
      { name: 'Adobe',               logo: '/logos/partners-co/adobe.svg' },
      { name: 'Cisco',               logo: '/logos/partners-co/cisco.svg' },
      { name: 'Dell Technologies',   logo: '/logos/partners-co/dell.svg' },
      { name: 'HP',                  logo: '/logos/partners-co/hp.svg' },
    ],
    categories: [
      { label: 'Management & Corporate Admin',           icon: Building2,    tone: 'from-slate-500/40 to-slate-700/40',    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=70' },
      { label: 'Building & Civil Construction',          icon: Building2,    tone: 'from-rose-500/40 to-red-700/40',       image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=70' },
      { label: 'Utilities & Telecom Networks',           icon: Cpu,          tone: 'from-blue-500/40 to-blue-700/40',      image: 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=400&q=70' },
      { label: 'Plastering, Painting & Decorating',     icon: Sparkles,     tone: 'from-yellow-500/40 to-yellow-700/40',  image: 'https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?auto=format&fit=crop&w=400&q=70' },
      { label: 'Specialised Cleaning',                   icon: Sparkles,     tone: 'from-cyan-500/40 to-cyan-700/40',      image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=400&q=70' },
      { label: 'Construction Equipment Rental',          icon: Building2,    tone: 'from-orange-500/40 to-orange-700/40',  image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
      { label: 'Construction Materials Retail',          icon: Boxes,        tone: 'from-amber-500/40 to-amber-700/40',    image: 'https://images.unsplash.com/photo-1504817343863-5092a923803e?auto=format&fit=crop&w=400&q=70' },
      { label: 'International Maritime Transport',       icon: Ship,         tone: 'from-cyan-500/40 to-sky-700/40',       image: 'https://images.unsplash.com/photo-1494412574745-e1e7c8faa40d?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cold & Frozen Warehousing',              icon: Boxes,        tone: 'from-sky-400/40 to-blue-700/40',       image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=70' },
      { label: 'Loading & Unloading Goods',              icon: Boxes,        tone: 'from-violet-500/40 to-indigo-700/40',  image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=400&q=70' },
      { label: 'Packaging & Storage Operations',         icon: Boxes,        tone: 'from-amber-400/40 to-yellow-700/40',   image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&w=400&q=70' },
      { label: 'Export & Import Offices',                icon: Plane,        tone: 'from-green-500/40 to-emerald-700/40',  image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=400&q=70' },
      { label: 'Commission Agents & Brokerage',          icon: Handshake,    tone: 'from-purple-500/40 to-purple-700/40',  image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=70' },
      { label: 'Wholesale Clothing & Accessories',       icon: Briefcase,    tone: 'from-pink-500/40 to-rose-700/40',      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=400&q=70' },
      { label: 'Textiles & Fabrics Retail',              icon: Briefcase,    tone: 'from-fuchsia-500/40 to-pink-700/40',   image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software & Computer Accessories Retail', icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=70' },
      { label: 'Computer & Phone Repair',                icon: Cpu,          tone: 'from-red-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software & Network Installation',        icon: Cpu,          tone: 'from-teal-500/40 to-teal-700/40',      image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cloud Computing & Hosting',              icon: Monitor,      tone: 'from-sky-500/40 to-blue-700/40',       image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=70' },
      { label: 'Systems Analysis & IT Consulting',       icon: Cpu,          tone: 'from-emerald-500/40 to-green-700/40',  image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=70' },
      { label: 'Software Maintenance & Web Design',      icon: Monitor,      tone: 'from-indigo-500/40 to-violet-700/40',  image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=400&q=70' },
      { label: 'IT & Cyber-Security Consulting',         icon: Cpu,          tone: 'from-red-400/40 to-rose-700/40',       image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=70' },
      { label: 'Data Entry & Digital Operations',        icon: Monitor,      tone: 'from-slate-500/40 to-zinc-700/40',     image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=400&q=70' },
      { label: 'Cafés & Beverage Services',              icon: Megaphone,    tone: 'from-amber-500/40 to-amber-700/40',    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=400&q=70' },
      { label: 'Catering & Food Services',               icon: Megaphone,    tone: 'from-orange-500/40 to-orange-700/40',  image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=70' },
    ],
    licensedActivities: [
      'Management offices and corporate administration',
      'Construction of buildings and civil works',
      'Construction of water, electricity and telecommunications networks',
      'Plastering, painting and decorating',
      'Specialised cleaning and exterior cleaning of buildings',
      'Renting of construction or demolition equipment with operator',
      'Retail sale in specialised stores of construction materials',
      'International maritime goods transport',
      'Cold and frozen warehousing',
      'Loading and unloading of goods',
      'Packaging activities and storage operations',
      'Activities of export and import offices',
      'Activities of commission agents and brokerage business',
      'Wholesale of clothing and clothing accessories',
      'Retail sale in specialised stores of textiles and fabrics',
      'Retail sale of software and computer accessories',
      'Repair of computers, peripherals and mobile phones',
      'Installation of computer software and network development',
      'Cloud computing and hosting services',
      'Systems analysis and IT consultancy',
      'Maintenance of software and designing of websites',
      'Information technology and cyber-security consulting',
      'Data entry services and digital operations',
      'Cafés that offer meals or beverages',
      'Catering activities and food service',
    ],
    currentProjects: [
      { title: 'Group Headquarters Operations', body: 'Coordinated administration across seven partner companies in Muscat.',                  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & Software Engagements',  body: 'Active enterprise IT projects spanning AWS, Microsoft, Oracle and SAP stacks.',          image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Construction & Contracting',    body: 'Building, civil works and utility-network projects across the Sultanate.',              image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { title: 'Trade & Wholesale Operations',  body: 'Active import / export pipelines for textiles, IT equipment and construction materials.', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
    ],
    activeSectors: [
      'Construction, Civil Works & Infrastructure',
      'International Trade, Import & Export',
      'IT, Software & Cyber Security Services',
      'Wholesale Clothing & Textile Trade',
      'Logistics, Warehousing & Maritime Transport',
      'Office Management & Facilities Services',
      'Hospitality, Cafés & Catering Operations',
    ],
    futurePlans: [
      { title: 'Regional HQ Expansion',           body: 'Scale Muscat operations to coordinate Group activity across all four countries from Oman.',  icon: TrendingUp, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & AI Centre of Excellence', body: 'Build a Gulf-region centre of excellence delivering AI, security and analytics consulting.', icon: Sparkles,   image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'Sustainable Construction',        body: 'Adopt green building standards and lower-emission construction materials across new projects.', icon: Lightbulb, image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Vision 2040 Alignment',           body: 'Active participation in Oman Vision 2040 initiatives across IT, trade and infrastructure.',    icon: Globe2,    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80' },
    ],
    countryLeadership: {
      cofounder: {
        name: 'Mohammad Abu Jaheed',
        role: 'Co-founder & Vice Chairman',
        image: assets.viceChairman,
        bio: 'As Co-founder and Vice Chairman, Mohammad Abu Jaheed guides Yanabiya\'s flagship Oman headquarters, steering the Group\'s strategic vision from Muscat across all four operating countries.',
      },
      managingDirector: {
        name: 'Khalid Saif Ahmed Al Sulaimani',
        role: 'General Manager, Oman',
        image: assets.people.khalidSulaimani,
        bio: 'Khalid Saif Ahmed Al Sulaimani oversees daily operations and client relationships across Yanabiya\'s Oman entity, ensuring premium delivery and alignment with the Group\'s quality standards.',
      },
    },
  },
  GB: {
    intro:
      'Yanabiya Gulf International UK Ltd serves as the Group\'s strategic gateway to the UK and European markets, connecting Gulf and Asian expertise with a strong network of 21+ trusted partners across the IT, retail, and hospitality sectors. The company is focused on building long-term international collaborations, delivering innovative solutions, and expanding business opportunities across Europe.',
    branchIntro:
      'Operating from London since 2023, our UK office handles European-market business development, cross-border trade representation, and IT delivery into UK enterprises and SMEs.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC, Sultanate of Oman',
    mission:
      'Connect Gulf and South-Asian capability with British and European demand, delivered with UK governance and enterprise-grade compliance.',
    vision:
      'A trusted European partner for Gulf-rooted enterprises and the UK gateway for Yanabiya Group\'s global network.',
    established: '1 June 2023',
    registration: { label: 'Company Number', value: '14907791' },
    legalEntity: 'Yanabiya Gulf International UK Ltd',
    license: { name: 'Companies House Registration, Private Limited Company', authority: 'Companies House, United Kingdom' },
    address: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom',
    services: [
      { label: 'IT Consulting & Digital Solutions',      desc: 'UK-based IT consulting, software, cloud & AI — via yanabiyagibt.com.', icon: Cpu,       slug: 'it-software',      href: 'https://yanabiyagibt.com', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',           desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',                desc: 'Wholesale clothing, retail textiles, and accessories trade.',          icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',           desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',            desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services',  desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane,    slug: 'manpower',         image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    strategicPartners: [
      { name: 'Tata Consultancy Services', logo: '/logos/partners-co/tcs.svg' },
      { name: 'Infosys',                   logo: '/logos/partners-co/infosys.svg' },
      { name: 'Wipro',                     logo: '/logos/partners-co/wipro.svg' },
      { name: 'HCLTech',                   logo: '/logos/partners-co/hcltech.svg' },
      { name: 'Tech Mahindra',             logo: '/logos/partners-co/techmahindra.svg' },
      { name: '10Pearls',                  logo: '/logos/partners-co/10pearls.svg' },
      { name: 'Systems Limited',           logo: '/logos/partners-co/systemsltd.svg' },
      { name: 'Brain Station 23',          logo: '/logos/partners-co/brainstation.svg' },
    ],
    operationalPartners: [
      { name: 'Arpatech',         logo: '/logos/partners-co/arpatech.svg' },
      { name: 'DataSoft Systems', logo: '/logos/partners-co/datasoft.svg' },
      { name: 'REVE Systems',     logo: '/logos/partners-co/revesoft.svg' },
      { name: 'Bestway Group',    logo: '/logos/partners-co/bestway.svg' },
      { name: 'Taj Stores',       logo: '/logos/partners-co/tajstores.svg' },
      { name: 'East End Foods',   logo: '/logos/partners-co/eastendfoods.svg' },
      { name: 'Dishoom',          logo: '/logos/partners-co/dishoom.svg' },
      { name: 'Tayyabs',          logo: '/logos/partners-co/tayyabs.svg' },
    ],
    categories: [
      { label: 'Information Technology Consultancy Activities',                               icon: Cpu,       tone: 'from-emerald-500/40 to-emerald-700/40', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Other Professional, Scientific and Technical Activities',                     icon: Lightbulb, tone: 'from-amber-500/40 to-orange-700/40',    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
      { label: 'Renting and Leasing of Other Machinery, Equipment and Tangible Goods',       icon: Briefcase, tone: 'from-fuchsia-500/40 to-rose-700/40',    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80' },
    ],
    licensedActivities: [
      'Information technology consultancy and software development (SIC 62020)',
      'Other professional, scientific and technical activities not elsewhere classified (SIC 74909)',
      'Renting and leasing of other machinery, equipment and tangible goods not elsewhere classified (SIC 77390)',
    ],
    currentProjects: [
      { title: 'European Market-Entry Advisory', body: 'Guiding Gulf-rooted enterprises into the UK & EU markets, from registration to compliance.',    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
      { title: 'IT Delivery Into UK SMEs',       body: 'Software, cloud and AI engagements with UK financial-services and retail clients.',              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
      { title: 'Wholesale & Retail Network',     body: 'Active relationships with UK supermarkets, cash-and-carry and ethnic-grocery distributors.',     image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Hospitality Partnerships',       body: 'Sourcing, supply and operational support for London restaurant groups.',                         image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    ],
    activeSectors: [
      'Information Technology & Software Engineering',
      'Wholesale & Retail Distribution',
      'Hospitality, Restaurants & Foodservice',
      'Cross-Border Trade & Brokerage',
      'European Market-Entry Advisory',
      'Workforce Mobility & Student Placement',
    ],
    futurePlans: [
      { title: 'Continental Europe Expansion',  body: 'Open representation in Frankfurt and Amsterdam to extend EU market coverage from London.',          icon: TrendingUp, image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80' },
      { title: 'UK Cloud & AI Practice',        body: 'Build a London-anchored cloud-and-AI practice serving financial-services and public-sector clients.', icon: Sparkles,  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'ESG-Aligned Trade',             body: 'Strengthen ethical-sourcing, carbon-reporting and supplier-code commitments across UK trade.',       icon: Lightbulb, image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Hospitality Brand Investments', body: 'Strategic investment in London restaurant groups bridging South-Asian and Middle-Eastern cuisine.',   icon: Globe2,    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    ],
    countryLeadership: {
      cofounder: {
        name: 'Mohammad Abu Jaheed',
        role: 'Co-founder & Vice Chairman',
        image: assets.viceChairman,
        bio: 'Mohammad Abu Jaheed oversees Yanabiya\'s European expansion from London, positioning the UK entity as the Group\'s gateway into Western and European markets.',
      },
      managingDirector: {
        name: 'Managing Director — UK Operations',
        role: 'Managing Director',
        image: `https://ui-avatars.com/api/?name=MD+UK&background=0e2d4e&color=9ec73a&size=200&bold=true`,
        bio: 'Yanabiya UK\'s Managing Director steers the London operation across IT consulting, trade, and workforce services — building the Group\'s European footprint from the heart of the city.',
      },
    },
  },
  US: {
    intro:
      'Yanabiya Gulf International US LLC is the Group\'s North America operations entity, anchored in Austin, Texas, with a partner network onboarding through 2026 to serve enterprise clients across the US market.',
    branchIntro:
      'Established in 2025, our US LLC is in active onboarding, building cloud, AI and partnership-network engagements with North-American clients while preparing to scale through Austin into the wider Texas tech corridor.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC, Sultanate of Oman',
    mission:
      'Bring Gulf and South-Asian delivery capability to North-American enterprises, under US governance, with US-based account leadership.',
    vision:
      'A trusted Texas-anchored bridge between Yanabiya Group\'s global delivery network and the US technology economy.',
    established: '11 August 2025',
    registration: { label: 'File Number', value: '806163411' },
    legalEntity: 'Yanabiya Gulf International US LLC',
    license: { name: 'LLC Registration, Limited Liability Company', authority: 'Texas Secretary of State, USA' },
    address: '5900 Balcones Drive #18651, Austin, TX 78731, United States of America',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane,    slug: 'manpower',         image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    strategicPartners: [
      { name: 'Amazon Web Services', logo: '/logos/partners-co/aws.svg' },
      { name: 'Microsoft',           logo: '/logos/partners-co/microsoft.svg' },
      { name: 'Google Cloud',        logo: '/logos/partners/gc.png' },
      { name: 'Oracle',              logo: '/logos/partners-co/oracle.svg' },
      { name: 'NVIDIA',              logo: '/logos/partners-co/nvidia.svg' },
    ],
    operationalPartners: [
      { name: 'GitHub',      logo: '/logos/partners-co/github_com.png' },
      { name: 'Salesforce',  logo: '/logos/partners-co/salesforce.svg' },
      { name: 'HubSpot',     logo: '/logos/partners-co/hubspot_com.png' },
      { name: 'Atlassian',   logo: '/logos/partners-co/atlassian.svg' },
      { name: 'Okta',        logo: '/logos/partners-co/okta.svg' },
    ],
    categories: [
      { label: 'E-Commerce',          icon: ShoppingCart, tone: 'from-orange-500/40 to-amber-700/40', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-commerce' },
      { label: 'Import & Export',     icon: Boxes,        tone: 'from-blue-500/40 to-indigo-700/40',  image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80', to: '/business/export-import' },
    ],
    licensedActivities: [
      'E-Commerce — online retail and digital sales operations',
      'Import and Export — international goods trade and cross-border logistics',
    ],
    currentProjects: [
      { title: 'Texas Operations Onboarding',  body: 'Standing up the Austin entity, partner contracts, and US banking/compliance setup.',          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & AI Advisory Pilots',   body: 'Early pilot engagements with North-American enterprises around AWS, Azure and AI rollouts.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
      { title: 'Partner Network Build-Out',    body: 'Onboarding US-side technology, services and advisory partners for early-2026 launch.',       image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { title: 'Strategic Account Programme',  body: 'Identifying anchor accounts across financial services, retail and government tech.',          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
    ],
    activeSectors: [
      'Cloud, AI & Frontier Technology Advisory',
      'Strategic & Management Consulting',
      'North American Market Entry',
      'Cross-Border Trade & Brokerage',
      'Workforce Mobility & Student Placement',
      'Partnership Network Development',
    ],
    futurePlans: [
      { title: 'Full US Launch, 2026',        body: 'Public launch of the US LLC after partner network closes; first Austin-based engagement live.',  icon: TrendingUp, image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'AI Centre of Excellence',     body: 'Stand up an Austin-anchored AI centre of excellence delivering frontier-tech engagements.',     icon: Sparkles,   image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'East-Coast Expansion',        body: 'Open New York representation in 2027 to anchor financial-services and corporate clients.',      icon: Globe2,     image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Investor & Advisory Programme', body: 'Build a US investor-and-advisor circle around Yanabiya Group\'s global growth roadmap.',      icon: Lightbulb,  image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
    ],
    countryLeadership: {
      cofounder: {
        name: 'Mohammad Abu Jaheed',
        role: 'Co-founder & Vice Chairman',
        image: assets.viceChairman,
        bio: 'Mohammad Abu Jaheed leads Yanabiya\'s North America strategy, anchoring the Austin, Texas LLC as the Group\'s bridge between Gulf delivery capability and the US technology market.',
      },
      managingDirector: {
        name: 'Managing Director — North America',
        role: 'Managing Director',
        image: `https://ui-avatars.com/api/?name=MD+USA&background=0e2d4e&color=9ec73a&size=200&bold=true`,
        bio: 'Yanabiya US\'s Managing Director leads Austin-based operations, growing an enterprise partner network and delivering cloud, AI and strategic consulting engagements across the US market.',
      },
    },
  },
}

/* ── Layout shared types ─────────────────────────────────────── */
type NavItem = { code: string; label: string; to: string }
type LayoutProps = {
  country: { code: string; name: string; flag: string }
  ops: CountryOps
  prevNav: NavItem | null
  nextNav: NavItem | null
}

/* ══════════════════════════════════════════════════════════════
 *  Main export — dispatches to per-country layout
 * ══════════════════════════════════════════════════════════════ */
export default function CountryOperations({ codeOverride }: { codeOverride: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [codeOverride])

  const upper = codeOverride.toUpperCase()
  const country = countries.find((c) => c.code === upper)
  const ops = OPS[upper]

  if (!country || !ops) {
    return (
      <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-brand-accentDark mb-3">Coming soon</div>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-deep mb-3">Operations page launching for this region</h1>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-brand-accentDark hover:text-brand-deep">
            Talk to us <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  const NAV_ORDER: NavItem[] = [
    { code: 'GLOBAL', label: 'Our Global Branches', to: '/#global' },
    { code: 'OM',     label: 'Oman',                to: '/global-presence/om' },
    { code: 'BD',     label: 'Bangladesh',           to: '/global-presence/bd' },
    { code: 'GB',     label: 'United Kingdom',       to: '/global-presence/gb' },
    { code: 'US',     label: 'USA',                  to: '/global-presence/us' },
  ]
  const navIdx  = NAV_ORDER.findIndex((n) => n.code === upper)
  const prevNav = navIdx > 0                    ? NAV_ORDER[navIdx - 1] : null
  const nextNav = navIdx < NAV_ORDER.length - 1 ? NAV_ORDER[navIdx + 1] : null
  const props: LayoutProps = { country, ops, prevNav, nextNav }

  if (upper === 'OM') return <OmanPage {...props} />
  if (upper === 'BD') return <BDPage  {...props} />
  if (upper === 'US') return <USPage  {...props} />
  return <GBPage {...props} />
}

/* ══════════════════════════════════════════════════════════════
 *  GB (UK) — Reference design (current layout, clean)
 * ══════════════════════════════════════════════════════════════ */
function GBPage({ country, ops, prevNav, nextNav }: LayoutProps) {
  const { t } = useTranslation()
  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <div className="relative bg-brand-50 overflow-hidden">
        {/* Ambient halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-amber-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-brand-accent/15 blur-[100px]" />
        </div>

        <div className="relative container-x px-5 pt-16 pb-10 md:pt-20 md:pb-12 text-center">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-7 bg-amber-600/40" />
              <span className="text-[10px] uppercase tracking-[0.38em] text-amber-700 font-semibold">
                Our Global Branches
              </span>
              <span className="h-px w-7 bg-amber-600/40" />
            </div>
          </Reveal>

          {/* Main title */}
          <Reveal delay={60}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-tight text-brand-deep mb-3">
              Welcome to Yanabiya United Kingdom
            </h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700/65 font-semibold mb-6">
              {country.flag} United Kingdom &middot; European Operations &middot; Est. 2023
            </p>
          </Reveal>

          {/* Intro text */}
          <Reveal delay={120}>
            <p className="max-w-2xl mx-auto text-brand-deep/65 text-sm md:text-base leading-relaxed mb-10 text-justify [text-align-last:center]">
              {ops.intro}
            </p>
          </Reveal>

          {/* Branch pills */}
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest text-brand-deep/30 mr-1">Explore Branches</span>
              {[
                { flag: '🇴🇲', label: 'Oman',          to: '/global-presence/om' },
                { flag: '🇧🇩', label: 'Bangladesh',    to: '/global-presence/bd' },
                { flag: '🇺🇸', label: 'United States', to: '/global-presence/us' },
              ].map(({ flag, label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-deep/12 bg-white/70 text-brand-deep text-[11px] font-semibold shadow-sm hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {flag} {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <CountryNav prevNav={prevNav} nextNav={nextNav} />
      </div>

      {/* Stats strip */}
      <div className="container-x py-5 md:py-7">
        <Reveal>
          <div className="grid grid-cols-3 divide-x divide-brand-accent/30 border border-brand-accent/30 rounded-xl overflow-hidden bg-brand-50/60">
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-brand-accentDark leading-none">2023</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-brand-accentDark/70 font-semibold mt-1.5">Operational Since</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-brand-accentDark leading-none">{ops.services.length}+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-brand-accentDark/70 font-semibold mt-1.5">Active Service Lines</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-brand-accentDark leading-none">{ops.licensedActivities.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-brand-accentDark/70 font-semibold mt-1.5">Licensed Activities</div>
            </div>
          </div>
        </Reveal>
      </div>

      <CountryLeaderSection leadership={ops.countryLeadership} />

      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label={t('countryOps.established')} value={ops.established} icon={Calendar} />
          <InfoRow label={t('countryOps.legalEntity')}value={ops.legalEntity} icon={Landmark} />
          {ops.license && <>
            <InfoRow label={t('countryOps.licenseName')}value={ops.license.name}      icon={ScrollText} />
            <InfoRow label={t('countryOps.issuingAuthority')}value={ops.license.authority} icon={ShieldCheck} />
          </>}
          <InfoRow label={t('globalContact.headOffice')}value={ops.address} icon={MapPin} />
          {ops.postCode && <InfoRow label={t('globalContact.postalAddress')}value={ops.postCode} icon={Mail} />}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Licensed Business Activities" title="What Yanabiya Is Authorised to Operate in the United Kingdom.">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {ops.categories.map((cat, i) => <OmanLicenceCard key={cat.label} cat={cat} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally.">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto [perspective:1400px]">
          {ops.services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next.">
        <div className={`grid gap-3 [perspective:1400px] ${ops.futurePlans.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {ops.futurePlans.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={p.icon} delay={i * 110} accent image={p.image} />
          ))}
        </div>
      </SectionFrame>

      <Partnerships />
      <SponsorSection />
      <div className="h-8 md:h-12" />
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  OM (Oman) — Premium amber-gold desert theme
 *  2×2 About grid · amber icon accents · 4-col domains
 * ══════════════════════════════════════════════════════════════ */
function OmanPage({ country, ops, prevNav, nextNav }: LayoutProps) {
  const { t } = useTranslation()
  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">

      {/* ── Unified welcome hero ── */}
      <div className="relative bg-brand-50 overflow-hidden">
        {/* Ambient halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-amber-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-brand-accent/15 blur-[100px]" />
        </div>

        <div className="relative container-x px-5 pt-16 pb-10 md:pt-20 md:pb-12 text-center">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-7 bg-amber-600/40" />
              <span className="text-[10px] uppercase tracking-[0.38em] text-amber-700 font-semibold">
                Our Global Branches
              </span>
              <span className="h-px w-7 bg-amber-600/40" />
            </div>
          </Reveal>

          {/* Main title */}
          <Reveal delay={60}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-tight text-brand-deep mb-3">
              Welcome to Yanabiya Oman
            </h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700/65 font-semibold mb-6">
              {country.flag} Sultanate of Oman &middot; Group Headquarters &middot; Est. 2021
            </p>
          </Reveal>

          {/* Intro text */}
          <Reveal delay={120}>
            <p className="max-w-2xl mx-auto text-brand-deep/65 text-sm md:text-base leading-relaxed mb-10 text-justify">
              {ops.intro}
            </p>
          </Reveal>

          {/* Branch pills */}
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest text-brand-deep/30 mr-1">Explore Branches</span>
              {[
                { flag: '🇧🇩', label: 'Bangladesh',     to: '/global-presence/bd' },
                { flag: '🇬🇧', label: 'United Kingdom', to: '/global-presence/gb' },
                { flag: '🇺🇸', label: 'United States',  to: '/global-presence/us' },
              ].map(({ flag, label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-deep/12 bg-white/70 text-brand-deep text-[11px] font-semibold shadow-sm hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {flag} {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
      </div>

      {/* Stats strip */}
      <div className="container-x py-5 md:py-7">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-amber-200 border border-amber-200 rounded-xl overflow-hidden bg-amber-50/40">
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-amber-700 leading-none">2021</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-semibold mt-1.5">Operational Since</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-amber-700 leading-none">{ops.services.length}+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-semibold mt-1.5">Active Service Lines</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-amber-700 leading-none">{ops.licensedActivities.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-semibold mt-1.5">Licensed Activities</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-amber-700 leading-none">{ops.strategicPartners.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-amber-600 font-semibold mt-1.5">Partner Companies</div>
            </div>
          </div>
        </Reveal>
      </div>

      <CountryLeaderSection
        leadership={ops.countryLeadership}
        eyebrowClass="text-amber-700"
        accentBorder="border-amber-300/50"
        accentBg="bg-amber-50/50"
        badgeBg="bg-amber-100"
        badgeText="text-amber-800"
        badgeBorder="border-amber-300/60"
      />

      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored." eyebrowClass="text-amber-700">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label={t('countryOps.established')} value={ops.established} icon={Calendar} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />
          <InfoRow label={t('countryOps.legalEntity')}value={ops.legalEntity} icon={Landmark} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />
          {ops.license && <>
            <InfoRow label={t('countryOps.licenseName')}value={ops.license.name}      icon={ScrollText} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />
            <InfoRow label={t('countryOps.issuingAuthority')}value={ops.license.authority} icon={ShieldCheck} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />
          </>}
          <InfoRow label={t('globalContact.headOffice')}value={ops.address} icon={MapPin} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />
          {ops.postCode && <InfoRow label={t('globalContact.postalAddress')}value={ops.postCode} icon={Mail} iconClass="bg-amber-100 text-amber-700 ring-amber-300/60" />}
        </div>

        {/* Partner company hierarchy */}
        {ops.strategicPartners?.length > 0 && (
          <div className="mt-10">

            {/* Parent node */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-1.5 rounded-2xl bg-amber-50 border-2 border-amber-300
                              px-6 py-3.5 shadow-lg shadow-amber-100/70 text-center">
                <p className="text-[9px] uppercase tracking-[0.22em] text-amber-600 font-bold">
                  Parent Company · Group Headquarters
                </p>
                <p className="text-sm font-semibold text-brand-deep leading-snug">{ops.legalEntity}</p>
              </div>
            </div>

            {/* Vertical drop → horizontal bus → individual drops */}
            <div className="flex justify-center">
              <div className="w-px h-5 bg-amber-300/70" />
            </div>
            <div className="w-full h-px bg-amber-200" />

            {/* Single row of flip cards */}
            <div className="flex gap-1.5 mt-0">
              {ops.strategicPartners.map((p, i) => (
                <PartnerFlipCard key={p.name} name={p.name} colorIndex={i} />
              ))}
            </div>

            <p className="text-center text-[10px] text-brand-deep/35 mt-3 tracking-wider uppercase">
              Network of {ops.strategicPartners.length} Partner Companies · Muscat, Oman
            </p>
          </div>
        )}
      </SectionFrame>

      {/* Business Domains: all 25 govt-approved licensed activities */}
      <SectionFrame
        eyebrow="Licensed Business Activities"
        title="What Yanabiya Is Authorised to Operate in Oman."
        eyebrowClass="text-amber-700"
      >
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mt-2">
          {ops.categories.map((cat, i) => <OmanLicenceCard key={cat.label} cat={cat} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally." eyebrowClass="text-amber-700">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto [perspective:1400px]">
          {ops.services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next." eyebrowClass="text-amber-700">
        <div className={`grid gap-3 [perspective:1400px] ${ops.futurePlans.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {ops.futurePlans.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={p.icon} delay={i * 110} accent image={p.image} />
          ))}
        </div>
      </SectionFrame>

      <Partnerships />
      <SponsorSection />
      <div className="h-8 md:h-12" />
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  BD (Bangladesh) — Teal tech-hub theme
 *  Stats strip · 2×2 left-border cards · 4-col compact domains
 * ══════════════════════════════════════════════════════════════ */
function BDPage({ country, ops, prevNav, nextNav }: LayoutProps) {
  const { t } = useTranslation()
  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <div className="relative bg-brand-50 overflow-hidden">
        {/* Ambient halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-amber-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-brand-accent/15 blur-[100px]" />
        </div>

        <div className="relative container-x px-5 pt-16 pb-10 md:pt-20 md:pb-12 text-center">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-7 bg-amber-600/40" />
              <span className="text-[10px] uppercase tracking-[0.38em] text-amber-700 font-semibold">
                Our Global Branches
              </span>
              <span className="h-px w-7 bg-amber-600/40" />
            </div>
          </Reveal>

          {/* Main title */}
          <Reveal delay={60}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-tight text-brand-deep mb-3">
              Welcome to Yanabiya Bangladesh
            </h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700/65 font-semibold mb-6">
              {country.flag} Bangladesh &middot; South Asia Operations &middot; Est. 1998
            </p>
          </Reveal>

          {/* Intro text */}
          <Reveal delay={120}>
            <p className="max-w-2xl mx-auto text-brand-deep/65 text-sm md:text-base leading-relaxed mb-10 text-justify [text-align-last:center]">
              {ops.intro}
            </p>
          </Reveal>

          {/* Branch pills */}
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest text-brand-deep/30 mr-1">Explore Branches</span>
              {[
                { flag: '🇴🇲', label: 'Oman',           to: '/global-presence/om' },
                { flag: '🇬🇧', label: 'United Kingdom', to: '/global-presence/gb' },
                { flag: '🇺🇸', label: 'United States',  to: '/global-presence/us' },
              ].map(({ flag, label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-deep/12 bg-white/70 text-brand-deep text-[11px] font-semibold shadow-sm hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {flag} {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <CountryNav prevNav={prevNav} nextNav={nextNav} />
      </div>

      {/* Stats strip */}
      <div className="container-x py-5 md:py-7">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-teal-200 border border-teal-200 rounded-xl overflow-hidden bg-teal-50/40">
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-teal-700 leading-none">1998</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-teal-600 font-semibold mt-1.5">Operational Since</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-teal-700 leading-none">{ops.services.length}+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-teal-600 font-semibold mt-1.5">Active Service Lines</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-teal-700 leading-none">{ops.licensedActivities.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-teal-600 font-semibold mt-1.5">Licensed Activities</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-teal-700 leading-none">{ops.strategicPartners.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-teal-600 font-semibold mt-1.5">Partner Companies</div>
            </div>
          </div>
        </Reveal>
      </div>

      <CountryLeaderSection
        leadership={ops.countryLeadership}
        eyebrowClass="text-teal-700"
        accentBorder="border-teal-300/50"
        accentBg="bg-teal-50/50"
        badgeBg="bg-teal-100"
        badgeText="text-teal-800"
        badgeBorder="border-teal-300/60"
      />

      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored." eyebrowClass="text-teal-700">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label={t('countryOps.established')} value={ops.established} icon={Calendar} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />
          <InfoRow label={t('countryOps.legalEntity')}value={ops.legalEntity} icon={Landmark} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />
          {ops.license && <>
            <InfoRow label={t('countryOps.licenseName')}value={ops.license.name}      icon={ScrollText} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />
            <InfoRow label={t('countryOps.issuingAuthority')}value={ops.license.authority} icon={ShieldCheck} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />
          </>}
          <InfoRow label={t('globalContact.headOffice')}value={ops.address} icon={MapPin} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />
          {ops.postCode && <InfoRow label={t('globalContact.postalAddress')}value={ops.postCode} icon={Mail} iconClass="bg-teal-100 text-teal-700 ring-teal-300/60" />}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Licensed Business Activities" title="What Yanabiya Is Authorised to Operate in Bangladesh." eyebrowClass="text-teal-700">
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mt-2">
          {ops.categories.map((cat, i) => <OmanLicenceCard key={cat.label} cat={cat} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally." eyebrowClass="text-teal-700">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto [perspective:1400px]">
          {ops.services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next." eyebrowClass="text-teal-700">
        <div className={`grid gap-3 [perspective:1400px] ${ops.futurePlans.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {ops.futurePlans.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={p.icon} delay={i * 110} accent image={p.image} />
          ))}
        </div>
      </SectionFrame>

      <Partnerships />
      <SponsorSection />
      <div className="h-8 md:h-12" />
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  US — Bold blue modern theme
 *  Asymmetric About (wide+stacked) · blue accents · 2×2 roadmap
 * ══════════════════════════════════════════════════════════════ */
function USPage({ country, ops, prevNav, nextNav }: LayoutProps) {
  const { t } = useTranslation()
  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <div className="relative bg-brand-50 overflow-hidden">
        {/* Ambient halos */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[640px] h-[420px] rounded-full bg-amber-300/25 blur-[130px]" />
          <div className="absolute bottom-0 right-0 w-[320px] h-[320px] rounded-full bg-brand-accent/15 blur-[100px]" />
        </div>

        <div className="relative container-x px-5 pt-16 pb-10 md:pt-20 md:pb-12 text-center">
          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-7 bg-amber-600/40" />
              <span className="text-[10px] uppercase tracking-[0.38em] text-amber-700 font-semibold">
                Our Global Branches
              </span>
              <span className="h-px w-7 bg-amber-600/40" />
            </div>
          </Reveal>

          {/* Main title */}
          <Reveal delay={60}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] leading-[1.1] tracking-tight text-brand-deep mb-3">
              Welcome to Yanabiya United States
            </h1>
            <p className="text-[11px] uppercase tracking-[0.22em] text-amber-700/65 font-semibold mb-6">
              {country.flag} United States &middot; North America Operations &middot; Est. 2025
            </p>
          </Reveal>

          {/* Intro text */}
          <Reveal delay={120}>
            <p className="max-w-2xl mx-auto text-brand-deep/65 text-sm md:text-base leading-relaxed mb-10 text-justify [text-align-last:center]">
              {ops.intro}
            </p>
          </Reveal>

          {/* Branch pills */}
          <Reveal delay={200}>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <span className="text-[9px] uppercase tracking-widest text-brand-deep/30 mr-1">Explore Branches</span>
              {[
                { flag: '🇴🇲', label: 'Oman',           to: '/global-presence/om' },
                { flag: '🇧🇩', label: 'Bangladesh',     to: '/global-presence/bd' },
                { flag: '🇬🇧', label: 'United Kingdom', to: '/global-presence/gb' },
              ].map(({ flag, label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-deep/12 bg-white/70 text-brand-deep text-[11px] font-semibold shadow-sm hover:border-amber-400 hover:bg-amber-50 hover:-translate-y-0.5 transition-all duration-200"
                >
                  {flag} {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <CountryNav prevNav={prevNav} nextNav={nextNav} />
      </div>

      {/* Stats strip */}
      <div className="container-x py-5 md:py-7">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-blue-200 border border-blue-200 rounded-xl overflow-hidden bg-blue-50/40">
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-blue-700 leading-none">2025</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-blue-600 font-semibold mt-1.5">Operational Since</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-blue-700 leading-none">{ops.services.length}+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-blue-600 font-semibold mt-1.5">Active Service Lines</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-blue-700 leading-none">{ops.licensedActivities.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-blue-600 font-semibold mt-1.5">Licensed Activities</div>
            </div>
            <div className="py-5 px-4 text-center">
              <div className="font-serif text-2xl md:text-3xl text-blue-700 leading-none">{ops.strategicPartners.length}</div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-blue-600 font-semibold mt-1.5">Partner Companies</div>
            </div>
          </div>
        </Reveal>
      </div>

      <CountryLeaderSection
        leadership={ops.countryLeadership}
        eyebrowClass="text-blue-700"
        accentBorder="border-blue-300/50"
        accentBg="bg-blue-50/50"
        badgeBg="bg-blue-100"
        badgeText="text-blue-800"
        badgeBorder="border-blue-300/60"
      />

      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored." eyebrowClass="text-blue-700">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label={t('countryOps.established')} value={ops.established} icon={Calendar} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />
          <InfoRow label={t('countryOps.legalEntity')}value={ops.legalEntity} icon={Landmark} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />
          {ops.license && <>
            <InfoRow label={t('countryOps.licenseName')}value={ops.license.name}      icon={ScrollText} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />
            <InfoRow label={t('countryOps.issuingAuthority')}value={ops.license.authority} icon={ShieldCheck} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />
          </>}
          <InfoRow label={t('globalContact.headOffice')}value={ops.address} icon={MapPin} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />
          {ops.postCode && <InfoRow label={t('globalContact.postalAddress')}value={ops.postCode} icon={Mail} iconClass="bg-blue-100 text-blue-700 ring-blue-300/60" />}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Licensed Business Activities" title="What Yanabiya Is Authorised to Operate in the United States." eyebrowClass="text-blue-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
          {ops.categories.map((cat, i) => <DomainCard key={cat.label} cat={cat} index={i} />)}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally." eyebrowClass="text-blue-700">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto [perspective:1400px]">
          {ops.services.map((s, i) => <ServiceCard key={s.slug} service={s} index={i} />)}
        </div>
      </SectionFrame>

      {/* Future Roadmap: 2×2 larger cards */}
      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next." eyebrowClass="text-blue-700">
        <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto [perspective:1400px]">
          {ops.futurePlans.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={p.icon} delay={i * 110} accent image={p.image} />
          ))}
        </div>
      </SectionFrame>

      <Partnerships />
      <SponsorSection />
      <div className="h-8 md:h-12" />
    </main>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  Country-specific About card variants
 * ══════════════════════════════════════════════════════════════ */

/** Oman: amber top-border, landscape image */
function OmanCard({ title, body, icon: Icon, delay, image }: {
  title: string; body: string; icon: LucideIcon; delay: number; image: string
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-xl border-t-2 border-t-amber-400 border border-slate-200 bg-brand-50 hover:border-amber-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[16/7] overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/90 via-[#04100a]/30 to-transparent" />
          <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-amber-400/95 text-brand-deep grid place-items-center shadow-md">
            <Icon size={13} strokeWidth={2.2} />
          </div>
        </div>
        <div className="p-3 md:p-4">
          <div className="font-serif text-sm text-brand-deep leading-tight mb-1">{title}</div>
          <p className="text-[11px] text-brand-deep/70 leading-snug">{body}</p>
        </div>
      </div>
    </Reveal>
  )
}

/** Bangladesh: teal left-border, compact */
function BDCard({ title, body, icon: Icon, delay, image }: {
  title: string; body: string; icon: LucideIcon; delay: number; image: string
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-xl border-l-2 border-l-teal-400 border border-slate-200 bg-brand-50 hover:border-teal-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
        <div className="relative aspect-[16/7] overflow-hidden">
          <img src={image} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/90 via-[#04100a]/30 to-transparent" />
          <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-teal-500/95 text-white grid place-items-center shadow-md">
            <Icon size={13} strokeWidth={2.2} />
          </div>
        </div>
        <div className="p-3 md:p-4">
          <div className="font-serif text-sm text-brand-deep leading-tight mb-1">{title}</div>
          <p className="text-[11px] text-brand-deep/70 leading-snug">{body}</p>
        </div>
      </div>
    </Reveal>
  )
}

/** USA: blue circle icon top-right, title overlaid on image bottom */
function USCard({ title, body, icon: Icon, delay, image, tall = false }: {
  title: string; body: string; icon: LucideIcon; delay: number; image: string; tall?: boolean
}) {
  return (
    <Reveal delay={delay} className={tall ? 'h-full' : ''}>
      <div className={`group relative overflow-hidden rounded-xl border border-slate-200 bg-brand-50 hover:border-blue-300 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${tall ? 'flex flex-col h-full' : ''}`}>
        <div className={`relative overflow-hidden ${tall ? 'flex-1 min-h-[160px]' : 'aspect-[16/8]'}`}>
          <img src={image} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/90 via-[#04100a]/40 to-transparent" />
          <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-blue-500/95 text-white grid place-items-center shadow-md">
            <Icon size={13} strokeWidth={2.2} />
          </div>
          <div className="absolute bottom-2 left-3 font-serif text-sm text-white leading-tight drop-shadow">{title}</div>
        </div>
        <div className="p-3 md:p-4">
          <p className="text-[11px] text-brand-deep/70 leading-snug">{body}</p>
        </div>
      </div>
    </Reveal>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  Shared section components
 * ══════════════════════════════════════════════════════════════ */

function CountryNav({ prevNav, nextNav }: { prevNav: NavItem | null; nextNav: NavItem | null }) {
  return (
    <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-between pt-5 md:pt-6 pointer-events-none">
      {prevNav ? (
        <Link to={prevNav.to} className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
          <ArrowLeft size={13} /> {prevNav.label}
        </Link>
      ) : <span />}
      {nextNav ? (
        <Link to={nextNav.to} className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
          {nextNav.label} <ArrowRight size={13} />
        </Link>
      ) : <span />}
    </div>
  )
}


function SponsorSection() {
  return (
    <SectionFrame eyebrow="Become a Sponsor / Contributor" title="Bring your ideas, capital or expertise.">
      <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7 [perspective:1400px]">
        <Card3D title="Share Your Idea"  body="Submit a proposal. We'll review and respond within 5 business days." icon={Lightbulb}  delay={0}   image="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80" />
        <Card3D title="Invest With Us"   body="Take a position in our growth roadmap or specific country expansion." icon={TrendingUp} delay={110} image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" />
        <Card3D title="Advisory Support" body="Lend strategic advice to our board across IT, trade or governance."  icon={Heart}      delay={220} image="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-brand-accent text-brand-ink text-xs font-bold uppercase tracking-[0.22em] shadow-md hover:bg-brand-50 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
          Share Your Idea <Send size={14} />
        </Link>
        <Link to="/contact" className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-brand-deep/20 text-brand-deep text-xs font-bold uppercase tracking-[0.22em] bg-brand-50 shadow-sm hover:bg-brand-deep hover:text-white hover:-translate-y-0.5 transition-all duration-300">
          Become a Sponsor <ArrowUpRight size={14} />
        </Link>
      </div>
    </SectionFrame>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  Core reusable UI components
 * ══════════════════════════════════════════════════════════════ */

function SectionFrame({
  eyebrow,
  title,
  children,
  compact = false,
  eyebrowClass = 'text-brand-accentDark',
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  compact?: boolean
  eyebrowClass?: string
}) {
  return (
    <section className="relative">
      <div className={`container-x ${compact ? 'pt-2 pb-4 md:pt-3 md:pb-6' : 'py-4 md:py-5'}`}>
        <Reveal>
          <div className={`text-center max-w-2xl mx-auto ${compact ? 'mb-3' : 'mb-5 md:mb-6'}`}>
            <span className={`inline-block text-[10px] font-semibold uppercase tracking-[0.32em] ${eyebrowClass} mb-1.5`}>
              {eyebrow}
            </span>
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-deep leading-tight">
              {title}
            </h2>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  )
}

function CountryLeaderCard({
  person,
  tier,
  accentBorder = 'border-amber-300/50',
  accentBg = 'bg-amber-50/50',
  badgeBg = 'bg-amber-100',
  badgeText = 'text-amber-800',
  badgeBorder = 'border-amber-300/60',
}: {
  person: LeaderProfile
  tier: string
  accentBorder?: string
  accentBg?: string
  badgeBg?: string
  badgeText?: string
  badgeBorder?: string
}) {
  return (
    <Reveal>
      <div className={`flex gap-4 md:gap-6 items-center rounded-xl border ${accentBorder} ${accentBg} p-4 md:p-5`}>
        <div className="shrink-0">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white/80 shadow-md ring-2 ring-white/40">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=0e2d4e&color=9ec73a&size=200&bold=true`
              }}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${badgeBg} border ${badgeBorder} ${badgeText} text-[9px] uppercase tracking-[0.28em] font-bold mb-2`}>
            <Users size={9} />
            {tier}
          </div>
          <h3 className="font-serif text-base md:text-lg text-brand-deep leading-tight mb-0.5">{person.name}</h3>
          <p className="text-[11px] font-semibold text-brand-deep/50 mb-1.5 uppercase tracking-wider">{person.role}</p>
          <p className="text-[11px] text-brand-deep/60 leading-relaxed">{person.bio}</p>
        </div>
      </div>
    </Reveal>
  )
}

function CountryLeaderSection({
  leadership,
  eyebrowClass = 'text-brand-accentDark',
  accentBorder = 'border-amber-300/50',
  accentBg = 'bg-amber-50/50',
  badgeBg = 'bg-amber-100',
  badgeText = 'text-amber-800',
  badgeBorder = 'border-amber-300/60',
}: {
  leadership: CountryOps['countryLeadership']
  eyebrowClass?: string
  accentBorder?: string
  accentBg?: string
  badgeBg?: string
  badgeText?: string
  badgeBorder?: string
}) {
  return (
    <SectionFrame eyebrow="Country Leadership" title="The People Leading This Region." eyebrowClass={eyebrowClass}>
      <div className="max-w-2xl mx-auto space-y-4">
        <CountryLeaderCard
          person={leadership.cofounder}
          tier="Country Co-founder"
          accentBorder={accentBorder}
          accentBg={accentBg}
          badgeBg={badgeBg}
          badgeText={badgeText}
          badgeBorder={badgeBorder}
        />
        <CountryLeaderCard
          person={leadership.managingDirector}
          tier="Managing Director"
          accentBorder="border-slate-200"
          accentBg="bg-white/60"
          badgeBg="bg-slate-100"
          badgeText="text-slate-700"
          badgeBorder="border-slate-300/60"
        />
      </div>
    </SectionFrame>
  )
}

function Card3D({
  title,
  body,
  icon: Icon,
  delay = 0,
  accent = false,
  image,
}: {
  title: string
  body: string
  icon: LucideIcon
  delay?: number
  accent?: boolean
  image?: string
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group relative h-full overflow-hidden rounded-lg bg-brand-50 border ${accent ? 'border-amber-300/40' : 'border-slate-200'} [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.02)] hover:border-brand-accent`}
      >
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/85 via-[#04100a]/30 to-transparent" />
            <div className={`absolute top-1.5 left-1.5 w-5 h-5 rounded grid place-items-center ${accent ? 'bg-brand-deep text-[#0a1410]' : 'bg-white/95 text-[#0a1410]'} shadow-sm [transform:translateZ(20px)]`}>
              <Icon size={10} strokeWidth={2.4} />
            </div>
          </div>
        )}
        <div className="p-2 md:p-2.5">
          {!image && (
            <div className={`w-6 h-6 rounded grid place-items-center mb-2 ${accent ? 'bg-brand-accent/25 text-brand-accentDark' : 'bg-brand-deep text-white'} ring-1 ${accent ? 'ring-brand-accentDark/40' : 'ring-slate-200'} shadow-sm [transform:translateZ(18px)]`}>
              <Icon size={11} strokeWidth={2} />
            </div>
          )}
          <div className="font-serif text-[12px] md:text-[13px] text-brand-deep leading-tight [transform:translateZ(10px)]">
            {title}
          </div>
          <p className="mt-0.5 text-[10px] md:text-[11px] text-brand-deep/70 leading-snug text-justify [transform:translateZ(4px)]">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

function InfoRow({
  label,
  value,
  icon: Icon,
  iconClass = 'bg-brand-accent/20 text-brand-accentDark ring-brand-accentDark/35',
}: {
  label: string
  value: string
  icon: LucideIcon
  iconClass?: string
}) {
  const iconColor = iconClass.split(' ').find(c => c.startsWith('text-')) ?? 'text-brand-accentDark'
  return (
    <Reveal>
      <div className="flex flex-col items-center justify-center text-center gap-1.5 rounded-lg bg-brand-50 border border-slate-200 p-3 md:p-4 transition-colors duration-300 hover:border-brand-accent h-full">
        <div className={`flex items-center justify-center gap-1 ${iconColor}`}>
          <Icon size={12} strokeWidth={2.2} className="shrink-0" />
          <div className="text-[9px] uppercase tracking-[0.22em] font-semibold">
            {label}
          </div>
        </div>
        <div className="text-[12px] text-brand-deep/85 leading-snug break-words whitespace-pre-line text-center">
          {value}
        </div>
      </div>
    </Reveal>
  )
}

const PARTNER_COLORS = [
  'bg-amber-500  border-amber-400',
  'bg-emerald-600 border-emerald-500',
  'bg-blue-500   border-blue-400',
  'bg-violet-500 border-violet-400',
  'bg-rose-500   border-rose-400',
  'bg-teal-600   border-teal-500',
  'bg-orange-500 border-orange-400',
]

function PartnerFlipCard({ name, colorIndex }: { name: string; colorIndex: number }) {
  const [flipped, setFlipped] = useState(false)
  const color = PARTNER_COLORS[colorIndex % PARTNER_COLORS.length]
  return (
    <div
      className="relative flex-1 min-w-0 h-24 cursor-pointer [perspective:800px] shrink"
      onClick={() => setFlipped(f => !f)}
    >
      <div
        className={`absolute inset-0 transition-transform duration-500 [transform-style:preserve-3d]
                    ${flipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'}`}
      >
        {/* Front */}
        <div className={`absolute inset-0 rounded-xl border ${color}
                         flex items-center justify-center px-2 text-center
                         [backface-visibility:hidden] [-webkit-backface-visibility:hidden]`}>
          <p className="text-white text-[9px] md:text-[10px] font-bold leading-snug drop-shadow-sm">
            {name}
          </p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-xl bg-brand-deep border border-brand-deep
                        flex items-center justify-center px-2 text-center
                        [backface-visibility:hidden] [-webkit-backface-visibility:hidden]
                        [transform:rotateY(180deg)]">
          <p className="text-brand-200 text-[8px] md:text-[9px] font-semibold leading-snug">
            Partner Company<br />
            <span className="text-brand-accent">Yanabiya Group</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function OmanLicenceCard({
  cat,
  index,
}: {
  cat: { label: string; icon: LucideIcon; tone: string; image: string }
  index: number
}) {
  return (
    <Reveal delay={index * 30}>
      <div className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-md cursor-default
                      ring-1 ring-white/60 hover:ring-amber-400/70
                      hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
        <img
          src={cat.image}
          alt={cat.label}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 px-1 pb-1.5 pt-4">
          <p className="text-white text-[7px] md:text-[7.5px] font-semibold leading-tight text-center">
            {cat.label}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

function DomainCard({
  cat,
  index,
}: {
  cat: { label: string; icon: LucideIcon; tone: string; image: string; href?: string; to?: string; badge?: string; sic?: string; desc?: string }
  index: number
}) {
  const cardClass =
    'group relative flex flex-col rounded-2xl overflow-hidden shadow-lg border border-white/80 hover:border-brand-accent/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 h-full'

  const badgeColor =
    cat.badge === 'UK IT Portal' ? 'bg-brand-accent/90' :
    cat.badge === 'Our Product'  ? 'bg-blue-500/90' :
    cat.badge === 'New Division' ? 'bg-amber-500/90' :
    'bg-brand-deep/80'

  const inner = (
    <>
      <div className="relative h-36 overflow-hidden shrink-0">
        <img
          src={cat.image}
          alt={cat.label}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/20 to-transparent" />
        <div className={`absolute top-3 left-3 w-8 h-8 rounded-xl bg-gradient-to-br ${cat.tone} ring-1 ring-white/30 grid place-items-center shadow-md`}>
          <cat.icon size={14} className="text-white" strokeWidth={2} />
        </div>
        {cat.badge && (
          <span className={`absolute top-3 right-3 px-2 py-0.5 rounded-md text-white text-[8px] font-bold uppercase tracking-widest ${badgeColor}`}>
            {cat.badge}
          </span>
        )}
        {cat.sic && (
          <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/50 text-white/80 text-[8px] font-mono tracking-wider">
            {cat.sic}
          </span>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 bg-white gap-1.5">
        <h4 className="font-semibold text-brand-deep text-sm leading-snug">{cat.label}</h4>
        {cat.desc && <p className="text-[11px] text-brand-deep/55 leading-snug">{cat.desc}</p>}
        {cat.href && (
          <p className="text-[10px] text-brand-accentDark font-semibold mt-auto pt-1 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            yanabiyagibt.com <ArrowUpRight size={10} />
          </p>
        )}
        {cat.to && !cat.href && (
          <p className="text-[10px] text-brand-accentDark font-semibold mt-auto pt-1 flex items-center gap-1 group-hover:gap-1.5 transition-all">
            Explore <ArrowRight size={10} />
          </p>
        )}
      </div>
    </>
  )

  return (
    <Reveal delay={index * 100}>
      {cat.href ? (
        <a href={cat.href} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</a>
      ) : cat.to ? (
        <Link to={cat.to} className={cardClass}>{inner}</Link>
      ) : (
        <div className={`${cardClass} cursor-default`}>{inner}</div>
      )}
    </Reveal>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: { label: string; desc: string; icon: LucideIcon; slug: string; image: string; href?: string }
  index: number
}) {
  const cardClass =
    'group relative block h-full overflow-hidden rounded-lg bg-brand-50 border border-brand-deep/15 [transform-style:preserve-3d] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.02)] hover:border-brand-accent'

  const inner = (
    <>
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/85 via-[#04100a]/30 to-transparent" />
        <div className="absolute top-1 left-1 w-5 h-5 rounded bg-brand-deep text-[#0a1410] grid place-items-center shadow-sm [transform:translateZ(22px)]">
          <service.icon size={10} strokeWidth={2.4} />
        </div>
        {service.href && (
          <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-brand-accent/90 text-white text-[7px] font-bold uppercase tracking-widest">
            UK Portal
          </div>
        )}
      </div>
      <div className="p-2 md:p-2.5">
        <div className="font-serif text-[12px] md:text-[13px] text-brand-deep leading-tight [transform:translateZ(12px)]">
          {service.label}
        </div>
        <p className="mt-0.5 text-[10px] md:text-[11px] text-brand-deep/70 leading-snug [transform:translateZ(4px)]">
          {service.desc}
        </p>
        <div className="mt-1.5 inline-flex items-center gap-1 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.22em] text-brand-accentDark group-hover:gap-2 transition-all">
          {service.href ? 'Visit Portal' : 'Learn more'} <ArrowRight size={9} />
        </div>
      </div>
    </>
  )

  return (
    <Reveal delay={index * 80}>
      {service.href ? (
        <a href={service.href} target="_blank" rel="noopener noreferrer" className={cardClass}>{inner}</a>
      ) : (
        <Link to={`/business/${service.slug}`} className={cardClass}>{inner}</Link>
      )}
    </Reveal>
  )
}

/* ══════════════════════════════════════════════════════════════
 *  Partner marquee (kept for future use)
 * ══════════════════════════════════════════════════════════════ */

const MONOGRAM_TONES = [
  'from-emerald-500/70 to-emerald-700/70',
  'from-cyan-500/70 to-sky-700/70',
  'from-amber-500/70 to-orange-700/70',
  'from-rose-500/70 to-pink-700/70',
  'from-fuchsia-500/70 to-purple-700/70',
  'from-violet-500/70 to-indigo-700/70',
  'from-teal-500/70 to-emerald-700/70',
]

function monogramOf(name: string): string {
  return name
    .split(' ')
    .filter((w) => w[0] && /[A-Za-z0-9]/.test(w[0]))
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

function toneFor(name: string): string {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0
  return MONOGRAM_TONES[h % MONOGRAM_TONES.length]
}

function PartnerMarquee({
  title,
  subtitle,
  items,
  direction = 'left',
  durationSec = 50,
  className = '',
}: {
  title: string
  subtitle: string
  items: PartnerItem[]
  direction?: 'left' | 'right'
  durationSec?: number
  className?: string
}) {
  const minTiles = 12
  const repeats = Math.max(1, Math.ceil(minTiles / Math.max(items.length, 1)))
  const half = Array(repeats).fill(items).flat() as PartnerItem[]
  const loop = [...half, ...half]
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  const stripRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stripRef.current?.style.setProperty('--marquee-dur', `${durationSec}s`)
  }, [durationSec])

  return (
    <div className={className}>
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-brand-accentDark mb-1">{title}</div>
        <div className="text-sm text-brand-deep/65">{subtitle}</div>
      </div>
      <div className="relative overflow-hidden [perspective:1400px]">
        <div
          ref={stripRef}
          className={`flex ${animClass} gap-6 w-max py-3 [transform-style:preserve-3d] will-change-transform [animation-timing-function:linear] [animation-duration:var(--marquee-dur)]`}
        >
          {loop.map((p, i) => (
            <div key={`${p.name}-${i}`} className="shrink-0 w-36">
              <PartnerLogo item={p} />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-[#0a1410] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-[#0a1410] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

function PartnerLogo({ item }: { item: PartnerItem }) {
  type Stage = 'logo' | 'clearbit' | 'fallback'
  const [stage, setStage] = useState<Stage>(
    item.logo ? 'logo' : item.domain ? 'clearbit' : 'fallback',
  )
  const src =
    stage === 'logo'     ? item.logo :
    stage === 'clearbit' ? `https://logo.clearbit.com/${item.domain}` :
                           undefined

  return (
    <div className="group relative h-20 rounded-lg bg-brand-50 border border-brand-deep/15 grid place-items-center p-2 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45)]">
      {src ? (
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          className="max-w-[78%] max-h-[55%] object-contain"
          onError={() => setStage((s: Stage) => s === 'logo' ? (item.domain ? 'clearbit' : 'fallback') : 'fallback')}
        />
      ) : (
        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${toneFor(item.name)} grid place-items-center text-brand-deep font-serif text-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_8px_rgba(0,0,0,0.18)]`}>
          {monogramOf(item.name)}
        </div>
      )}
      <span className="absolute inset-x-1.5 bottom-1 text-[9px] font-semibold text-slate-700 text-center leading-tight truncate">
        {item.name}
      </span>
    </div>
  )
}
