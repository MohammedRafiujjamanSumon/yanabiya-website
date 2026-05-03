import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Building2, FileBadge, Calendar, MapPin,
  Cpu, Boxes, Briefcase, Ship, Plane, Handshake,
  TrendingUp, Sparkles, Lightbulb, Megaphone, Globe2,
  Heart, Send, Users, ShoppingCart, Monitor,
  type LucideIcon,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'
import { countries } from '../data/countries'

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
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ────────────────────────────────────────────────────────────
 *  Country operations data — premium naming applied
 *  (Local Presence / About Our Operation / What We Offer /
 *   Our Network / Business Domains / Future Roadmap).
 * ────────────────────────────────────────────────────────── */

type CountryOps = {
  /** Section 1 — Country Overview */
  intro: string
  /** Section 2 — Who We Are */
  branchIntro: string
  parentCompany: string
  mission: string
  vision?: string
  /** Section 3 — Company Information */
  established: string
  registration: { label: string; value: string }
  legalEntity: string
  license?: { name: string; authority: string }
  address: string
  postCode?: string
  /** Section 4 — Our Services / What We Offer */
  services: { label: string; desc: string; icon: LucideIcon; slug: string; image: string }[]
  /** Section 5 — Our Network */
  strategicPartners: PartnerItem[]
  operationalPartners: PartnerItem[]
  /** Section 6 — Business Domains */
  categories: { label: string; icon: LucideIcon; tone: string; image: string; href?: string; to?: string }[]
  /** Section 7 — Licensed Activities */
  licensedActivities: string[]
  /** Section 8 — Current Operations */
  currentProjects: { title: string; body: string; image?: string }[]
  activeSectors: string[]
  /** Section 9 — Future Roadmap */
  futurePlans: { title: string; body: string; icon: LucideIcon; image?: string }[]
}

type PartnerItem = {
  name: string
  /** Direct logo URL. If absent, the renderer tries Clearbit using `domain`. */
  logo?: string
  /** Fallback domain used to fetch the logo via Clearbit (logo.clearbit.com). */
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
      'To be South Asia\'s most trusted multi-sector delivery partner — engineered in Dhaka, deployed globally.',
    established: '17 November 1998',
    registration: { label: 'Trade License', value: 'TRAD/DNCC/100677/1998' },
    legalEntity: 'Yanabiya Gulf International BD Trade',
    license: { name: 'Trade License — General Trading & IT', authority: 'Dhaka North City Corporation' },
    address: 'Office #211, Plot #322/B, Block-Kanchkura, Uttarkhan, Dhaka-1230, Bangladesh',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',               desc: 'Private-label apparel sourcing, manufacturing, and retail supply.',    icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane, slug: 'manpower', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    // Group of partner companies operating in Bangladesh under the
    // Yanabiya umbrella. Strategic = long-term partners that anchor
    // core categories (internet, cloud, aviation); Operational =
    // service partners delivering connectivity, comms and tech.
    strategicPartners: [
      { name: 'Plexus Cloud', logo: '/logos/partners-co/plexuscloud.png' },
    ],
    operationalPartners: [],
    categories: [
      { label: 'Internet Services & Connectivity',          icon: Globe2,    tone: 'from-emerald-500/40 to-emerald-700/40', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80' },
      { label: 'Cloud Computing & Technology Services',     icon: Cpu,       tone: 'from-cyan-500/40 to-sky-700/40',        image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80' },
      { label: 'Aviation & Workforce Mobility',             icon: Plane,     tone: 'from-amber-500/40 to-orange-700/40',    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80' },
      { label: 'Communications & Telecommunications',       icon: Megaphone, tone: 'from-fuchsia-500/40 to-rose-700/40',    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
      { label: 'Trading & International Logistics',         icon: Boxes,     tone: 'from-violet-500/40 to-indigo-700/40',   image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80' },
      { label: 'Construction & Civil Infrastructure Works', icon: Building2,    tone: 'from-rose-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { label: 'Yanabiya Commerce',                         icon: ShoppingCart, tone: 'from-orange-500/40 to-amber-700/40',     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-commerce' },
      { label: 'Yanabiya Digital Platform',                 icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-digital-platform' },
    ],
    // Activities aggregated across the entire group of partner
    // companies in Bangladesh — covers everything the umbrella runs
    // under one trade licence.
    licensedActivities: [
      'Internet service provision (ISP) & last-mile connectivity',
      'WiFi network deployment & managed connectivity services',
      'Cloud computing, hosting & data-centre operations',
      'IT solutions, software development & systems integration',
      'Cyber security consultancy & compliance support',
      'Aviation services, flight coordination & travel ticketing',
      'Telecommunications & inter-carrier voice / data services',
      'Information technology consulting & advisory',
      'Construction, civil works & infrastructure projects',
      'General trading, import & export operations',
      'Apparel & ready-made-garment sourcing and supply',
      'Workforce supply, manpower mobility & overseas placement',
      'Office administration, PRO & business support services',
      'Tour, travel & ground-handling services',
      'Wholesale & retail trade in technology products',
    ],
    currentProjects: [
      { title: 'Regional Delivery Centre',     body: '24×7 engineering & QA support for clients across the four-country group.',  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Apparel Sourcing Network',     body: 'Active relationships with vetted RMG factories supplying private-label clients.', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { title: 'Workforce Mobility Pipeline',  body: 'Skilled & semi-skilled placement into the Gulf, UK and US under group employer.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Government IT Engagements',    body: 'Public-sector digitalisation pilots in coordination with local partners.',    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
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
      { title: 'Green Data Centre',             body: 'Investment in a sustainable Tier-III data-centre facility serving regional cloud workloads.', icon: Sparkles,    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
      { title: 'Global Digital Infrastructure', body: 'Expand the Dhaka delivery centre into a 500+ engineer hub serving all four group countries.', icon: TrendingUp,  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'Innovation-Driven Services',    body: 'Productised AI, security & analytics offerings exported under the Yanabiya brand.',           icon: Lightbulb,   image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'New Country Entry: KSA',         body: 'Saudi Arabia entity in 2027 to extend Gulf-wide trade and manpower coverage.',                  icon: Globe2,      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  OM: {
    intro:
      'Yanabiya Gulf International Business and Trade SPC is the Group\'s headquarters, anchoring multi-sector operations across Oman through a coordinated network of seven partner companies in Muscat.',
    branchIntro:
      'Operating from Muscat since 2021, our Oman headquarters coordinates trade, contracting, technology and hospitality across the Sultanate under one integrated business structure.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC',
    mission:
      'Deliver the Stamp of Quality & Professionalism — built on morals, ethics, honesty, and customer satisfaction across every Yanabiya engagement.',
    vision:
      'A leading global performer in trade, technology and integrated services, headquartered in Oman and scaling across four continents.',
    established: '19 September 2021',
    postCode: 'P.O. Box 1432, PC-133, Al Khuwair, Muscat, Sultanate of Oman',
    registration: { label: 'Commercial Registration', value: '1395664' },
    legalEntity: 'Yanabiya Gulf International Business & Trade SPC',
    license: { name: 'Commercial Registration & Activities Licence', authority: 'Ministry of Commerce, Industry & Investment Promotion (MOCIIP), Oman' },
    address: 'Office-41, 4th Floor, Building-846, Way-4011, Complex-240, Al Gubrah, Bushar, Muscat, Sultanate of Oman',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',               desc: 'Wholesale clothing, retail textiles, and accessories trade.',          icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane, slug: 'manpower', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    // Oman group of partner companies — the seven Yanabiya entities
    // operating across Muscat under the SPC umbrella.
    strategicPartners: [
      { name: 'Yanabiya Muscat United Trade' },
      { name: 'Yanabiya Muscat for Comprehensive Projects' },
      { name: 'Yanabiya Muscat Integrated LLC' },
      { name: 'Yanabiya Al Khairat United Trade LLC' },
      { name: 'Yanabiya Muscat World Business' },
      { name: 'Yanabiya Muscat Al Mumyazat' },
      { name: 'Yanabiya Al Rustaq Contracting' },
    ],
    // Global tech partners powering Oman delivery.
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
      { label: 'Construction & Infrastructure',         icon: Building2, tone: 'from-rose-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { label: 'Trading, Wholesale & Retail',           icon: Boxes,     tone: 'from-violet-500/40 to-indigo-700/40',   image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80' },
      { label: 'Logistics, Warehousing & Shipping',     icon: Ship,      tone: 'from-cyan-500/40 to-sky-700/40',        image: 'https://images.unsplash.com/photo-1494412574745-e1e7c8faa40d?auto=format&fit=crop&w=800&q=80' },
      { label: 'IT, Software & Cyber Security',         icon: Cpu,       tone: 'from-emerald-500/40 to-emerald-700/40', image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80' },
      { label: 'Hospitality, Cafés & Catering',         icon: Megaphone, tone: 'from-amber-500/40 to-orange-700/40',    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management & Facilities',        icon: Briefcase,    tone: 'from-fuchsia-500/40 to-rose-700/40',    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Yanabiya Commerce',                    icon: ShoppingCart, tone: 'from-orange-500/40 to-amber-700/40',     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-commerce' },
      { label: 'Yanabiya Digital Platform',            icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-digital-platform' },
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
      { title: 'Group Headquarters Operations',  body: 'Coordinated administration across seven partner companies in Muscat.',                  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & Software Engagements',   body: 'Active enterprise IT projects spanning AWS, Microsoft, Oracle and SAP stacks.',          image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Construction & Contracting',     body: 'Building, civil works and utility-network projects across the Sultanate.',                image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80' },
      { title: 'Trade & Wholesale Operations',   body: 'Active import / export pipelines for textiles, IT equipment and construction materials.', image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
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
      { title: 'Regional HQ Expansion',          body: 'Scale Muscat operations to coordinate Group activity across all four countries from Oman.',  icon: TrendingUp,  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & AI Centre of Excellence', body: 'Build a Gulf-region centre of excellence delivering AI, security and analytics consulting.', icon: Sparkles,    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'Sustainable Construction',       body: 'Adopt green building standards and lower-emission construction materials across new projects.', icon: Lightbulb,   image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Vision 2040 Alignment',          body: 'Active participation in Oman Vision 2040 initiatives across IT, trade and infrastructure.',     icon: Globe2,      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80' },
    ],
  },
  GB: {
    intro:
      'Yanabiya Gulf International UK Ltd is the Group\'s European operations hub, bridging Gulf and Asian capability into the British and EU markets through 21+ trusted partners across IT, retail and hospitality.',
    branchIntro:
      'Operating from London since 2023, our UK office handles European-market business development, cross-border trade representation, and IT delivery into UK enterprises and SMEs.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC, Sultanate of Oman',
    mission:
      'Connect Gulf and South-Asian capability with British and European demand — delivered with UK governance and enterprise-grade compliance.',
    vision:
      'A trusted European partner for Gulf-rooted enterprises and the UK gateway for Yanabiya Group\'s global network.',
    established: '1 June 2023',
    registration: { label: 'Company Number', value: '14907791' },
    legalEntity: 'Yanabiya Gulf International UK Ltd',
    license: { name: 'Companies House Registration — Private Limited Company', authority: 'Companies House, United Kingdom' },
    address: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, United Kingdom',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Clothing & Accessories',               desc: 'Wholesale clothing, retail textiles, and accessories trade.',          icon: Briefcase, slug: 'clothing',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane, slug: 'manpower', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    // UK group of partner companies (real names from the existing
    // global-presence dataset). Domain best-guesses fed to Clearbit
    // with monogram fallback.
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
      { name: 'Arpatech',                logo: '/logos/partners-co/arpatech.svg' },
      { name: 'DataSoft Systems',        logo: '/logos/partners-co/datasoft.svg' },
      { name: 'REVE Systems',            logo: '/logos/partners-co/revesoft.svg' },
      { name: 'Bestway Group',           logo: '/logos/partners-co/bestway.svg' },
      { name: 'Taj Stores',              logo: '/logos/partners-co/tajstores.svg' },
      { name: 'East End Foods',          logo: '/logos/partners-co/eastendfoods.svg' },
      { name: 'Dishoom',                 logo: '/logos/partners-co/dishoom.svg' },
      { name: 'Tayyabs',                 logo: '/logos/partners-co/tayyabs.svg' },
    ],
    categories: [
      { label: 'IT, Software & Cloud Services',         icon: Cpu,       tone: 'from-emerald-500/40 to-emerald-700/40', image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80', href: 'https://yanabiyagibt.com/' },
      { label: 'Wholesale Trade & Retail Distribution', icon: Boxes,     tone: 'from-violet-500/40 to-indigo-700/40',   image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80' },
      { label: 'Hospitality, Restaurants & Foodservice', icon: Megaphone, tone: 'from-amber-500/40 to-orange-700/40',   image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
      { label: 'Cross-Border Trade & Brokerage',        icon: Handshake, tone: 'from-cyan-500/40 to-sky-700/40',        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'European Market Entry Advisory',        icon: Globe2,    tone: 'from-rose-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office, Compliance & Admin Services',   icon: Briefcase,    tone: 'from-fuchsia-500/40 to-rose-700/40',    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Yanabiya Commerce',                    icon: ShoppingCart, tone: 'from-orange-500/40 to-amber-700/40',     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-commerce' },
      { label: 'Yanabiya Digital Platform',            icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-digital-platform' },
    ],
    licensedActivities: [
      'Information technology consultancy and software development',
      'Computer programming, web design and systems integration',
      'Cloud hosting, data analytics and AI services',
      'Cyber security advisory and compliance support',
      'Wholesale of food, beverages and consumer goods',
      'Retail trade in supermarkets, cash-and-carry and specialised stores',
      'Licensed restaurant operations and foodservice',
      'Commercial agency, brokerage and import/export representation',
      'European market-entry advisory and partner identification',
      'Cross-border trade representation and contract negotiation',
      'Business administration, accounting and PRO services',
      'Recruitment, immigration support and overseas placement coordination',
    ],
    currentProjects: [
      { title: 'European Market-Entry Advisory',  body: 'Guiding Gulf-rooted enterprises into the UK & EU markets — from registration to compliance.',     image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80' },
      { title: 'IT Delivery Into UK SMEs',         body: 'Software, cloud and AI engagements with UK financial-services and retail clients.',                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
      { title: 'Wholesale & Retail Network',       body: 'Active relationships with UK supermarkets, cash-and-carry and ethnic-grocery distributors.',         image: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Hospitality Partnerships',         body: 'Sourcing, supply and operational support for London restaurant groups.',                            image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
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
      { title: 'Continental Europe Expansion',      body: 'Open representation in Frankfurt and Amsterdam to extend EU market coverage from London.',          icon: TrendingUp,  image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80' },
      { title: 'UK Cloud & AI Practice',            body: 'Build a London-anchored cloud-and-AI practice serving financial-services and public-sector clients.', icon: Sparkles,    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'ESG-Aligned Trade',                  body: 'Strengthen ethical-sourcing, carbon-reporting and supplier-code commitments across UK trade.',         icon: Lightbulb,   image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80' },
      { title: 'Hospitality Brand Investments',      body: 'Strategic investment in London restaurant groups bridging South-Asian and Middle-Eastern cuisine.',     icon: Globe2,      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    ],
  },

  US: {
    intro:
      'Yanabiya Gulf International US LLC is the Group\'s North America operations entity, anchored in Austin, Texas, with a partner network onboarding through 2026 to serve enterprise clients across the US market.',
    branchIntro:
      'Established in 2025, our US LLC is in active onboarding — building cloud, AI and partnership-network engagements with North-American clients while preparing to scale through Austin into the wider Texas tech corridor.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC, Sultanate of Oman',
    mission:
      'Bring Gulf and South-Asian delivery capability to North-American enterprises — under US governance, with US-based account leadership.',
    vision:
      'A trusted Texas-anchored bridge between Yanabiya Group\'s global delivery network and the US technology economy.',
    established: '11 August 2025',
    registration: { label: 'File Number', value: '806163411' },
    legalEntity: 'Yanabiya Gulf International US LLC',
    license: { name: 'LLC Registration — Limited Liability Company', authority: 'Texas Secretary of State, USA' },
    address: '5900 Balcones Drive #18651, Austin, TX 78731, United States of America',
    services: [
      { label: 'Technology & Digital Solutions',        desc: 'Custom software, cloud platforms, and AI solutions.',                  icon: Cpu,       slug: 'it-software',      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Trade & Supply Chain',          desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import',    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Agents & Brokerage Business',          desc: 'Cross-border commercial agency, deals, and partnership matchmaking.',  icon: Handshake, slug: 'agents-brokerage', image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'Office Management Services',           desc: 'Serviced offices, PRO services, accounting, and administration.',      icon: Building2, slug: 'office-management', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane, slug: 'manpower', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    ],
    // US partner network is still onboarding — show the global tech
    // partners that anchor early engagements as 'strategic' and a
    // few US-leaning advisory partners as 'operational'.
    strategicPartners: [
      { name: 'Amazon Web Services',  logo: '/logos/partners-co/aws.svg' },
      { name: 'Microsoft',            logo: '/logos/partners-co/microsoft.svg' },
      { name: 'Google Cloud',         logo: '/logos/partners/gc.png' },
      { name: 'Oracle',               logo: '/logos/partners-co/oracle.svg' },
      { name: 'NVIDIA',               logo: '/logos/partners-co/nvidia.svg' },
    ],
    operationalPartners: [
      { name: 'GitHub',               logo: '/logos/partners-co/github_com.png' },
      { name: 'Salesforce',           logo: '/logos/partners-co/salesforce.svg' },
      { name: 'HubSpot',              logo: '/logos/partners-co/hubspot_com.png' },
      { name: 'Atlassian',            logo: '/logos/partners-co/atlassian.svg' },
      { name: 'Okta',                 logo: '/logos/partners-co/okta.svg' },
    ],
    categories: [
      { label: 'Cloud & AI Advisory',               icon: Cpu,       tone: 'from-emerald-500/40 to-emerald-700/40', image: 'https://images.unsplash.com/photo-1558494950-b8e691424ad9?auto=format&fit=crop&w=800&q=80' },
      { label: 'Technology Partnership Network',    icon: Handshake, tone: 'from-cyan-500/40 to-sky-700/40',        image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { label: 'North American Market Entry',       icon: Globe2,    tone: 'from-amber-500/40 to-orange-700/40',    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
      { label: 'Strategic & Boardroom Consulting',  icon: Briefcase, tone: 'from-violet-500/40 to-indigo-700/40',   image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
      { label: 'Workforce Mobility (US-bound)',     icon: Plane,     tone: 'from-fuchsia-500/40 to-rose-700/40',    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
      { label: 'Cross-Border Trade Representation', icon: Boxes,        tone: 'from-rose-500/40 to-red-700/40',        image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80' },
      { label: 'Yanabiya Commerce',                icon: ShoppingCart, tone: 'from-orange-500/40 to-amber-700/40',     image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-commerce' },
      { label: 'Yanabiya Digital Platform',        icon: Monitor,      tone: 'from-blue-500/40 to-indigo-700/40',     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80', to: '/business/yanabiya-digital-platform' },
    ],
    licensedActivities: [
      'Cloud computing, AI and frontier-technology consulting',
      'Custom software development and systems integration',
      'Cyber-security advisory and compliance support',
      'Information technology managed services',
      'Cross-border trade representation and brokerage',
      'Strategic and management consulting services',
      'Partnership development and joint-venture facilitation',
      'Workforce mobility, immigration and US-bound placement',
      'Office administration, accounting and back-office services',
      'Market research and US market-entry advisory',
    ],
    currentProjects: [
      { title: 'Texas Operations Onboarding',     body: 'Standing up the Austin entity, partner contracts, and US banking/compliance setup.',           image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Cloud & AI Advisory Pilots',      body: 'Early pilot engagements with North-American enterprises around AWS, Azure and AI rollouts.',  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
      { title: 'Partner Network Build-Out',       body: 'Onboarding US-side technology, services and advisory partners for early-2026 launch.',         image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' },
      { title: 'Strategic Account Programme',     body: 'Identifying anchor accounts across financial services, retail and government tech.',             image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
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
      { title: 'Full US Launch — 2026',           body: 'Public launch of the US LLC after partner network closes; first Austin-based engagement live.',  icon: TrendingUp,  image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80' },
      { title: 'AI Centre of Excellence',         body: 'Stand up an Austin-anchored AI centre of excellence delivering frontier-tech engagements.',     icon: Sparkles,    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80' },
      { title: 'East-Coast Expansion',             body: 'Open New York representation in 2027 to anchor financial-services and corporate clients.',     icon: Globe2,      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80' },
      { title: 'Investor & Advisory Programme',    body: 'Build a US investor-and-advisor circle around Yanabiya Group\'s global growth roadmap.',        icon: Lightbulb,   image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80' },
    ],
  },
}

export default function CountryOperations({ codeOverride }: { codeOverride: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [codeOverride])

  const upper = codeOverride.toUpperCase()
  const country = countries.find((c) => c.code === upper)
  const ops = OPS[upper]

  if (!country || !ops) {
    return (
      <main className="relative bg-brand-50
                       text-brand-deep overflow-hidden min-h-screen grid place-items-center px-6">
        <BackButton to="/" label="Back to Home" />
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-brand-accentDark mb-3">
            Coming soon
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-deep mb-3">
            Operations page launching for this region
          </h1>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-brand-accentDark hover:text-brand-deep">
            Talk to us → <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative bg-brand-50
                     text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* SECTION 1 — Country Overview / Local Presence */}
      <PageHero
        eyebrow="Local Presence"
        title={
          <>
            {country.flag} {country.name}
          </>
        }
        subtitle={ops.intro}
        centered
      />

      {/* SECTION 2 — About Our Operation */}
      <SectionFrame eyebrow="About Our Operation" title="Who we are on the ground." compact>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 [perspective:1400px]">
          <Card3D delay={0}   title="Local Branch"  body={ops.branchIntro}   icon={Building2}
            image="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80" />
          <Card3D delay={120} title="Parent Group"  body={ops.parentCompany} icon={Globe2}
            image="https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80" />
          <Card3D delay={240} title="Our Mission"   body={ops.mission}       icon={Megaphone}
            image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80" />
          <Card3D delay={360} title="Our Vision"    body={ops.vision ?? ops.mission} icon={Sparkles}
            image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80" />
        </div>
      </SectionFrame>

      {/* SECTION 3 — Company Information.
       *  Registration number intentionally omitted (kept on the
       *  CountryOps record but not surfaced publicly). */}
      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label="Established"  value={ops.established} icon={Calendar} />
          <InfoRow label="Legal Entity" value={ops.legalEntity} icon={Building2} />
          {ops.license && (
            <>
              <InfoRow label="License Name"      value={ops.license.name}      icon={FileBadge} />
              <InfoRow label="Issuing Authority" value={ops.license.authority} icon={Building2} />
            </>
          )}
          <InfoRow label="Head Office" value={ops.address} icon={MapPin} />
          {ops.postCode && (
            <InfoRow label="Postal Address" value={ops.postCode} icon={MapPin} />
          )}
        </div>
      </SectionFrame>

      {/* SECTION 4 — What We Offer.
       *  3 cards per row from sm and up so each tile stays compact
       *  even on tablet/mobile-landscape. */}
      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally.">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto [perspective:1400px]">
          {ops.services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </SectionFrame>

      {/* SECTION 5 — Trusted Network CTA */}
      <SectionFrame eyebrow="Our Network" title="Explore Our Global Trusted Network.">
        <div className="flex justify-center">
          <a
            href="/#partnerships"
            className="group inline-flex items-center gap-4 rounded-2xl
                       bg-brand-deep text-white px-10 py-6
                       shadow-[0_8px_32px_rgba(15,58,35,0.25)]
                       hover:shadow-[0_16px_48px_rgba(15,58,35,0.35)]
                       hover:-translate-y-1 transition-all duration-300"
          >
            <span className="text-lg font-semibold leading-tight">
              View Our Trusted Partners &amp; Network
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M7 17 17 7"/><path d="M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </SectionFrame>


      {/* SECTION 6 — Business Domains */}
      <SectionFrame eyebrow="Business Domains" title="The verticals we operate in.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {/* Yanabiya Commerce */}
          <Reveal delay={0}>
            <Link
              to="/business/yanabiya-commerce"
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg
                         border border-white/80 hover:border-brand-accent/50
                         hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
                  alt="Yanabiya Commerce"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/30 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500/60 to-amber-700/60
                                ring-1 ring-white/30 grid place-items-center shadow-md">
                  <ShoppingCart size={16} className="text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accentDark mb-0.5">New Division</p>
                  <h4 className="font-semibold text-brand-deep text-sm leading-snug">Yanabiya Commerce</h4>
                  <p className="text-[11px] text-brand-deep/55 mt-0.5">Online retail, marketplace & fulfilment</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-brand-accentDark group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Reveal>

          {/* Yanabiya Digital Platform */}
          <Reveal delay={120}>
            <Link
              to="/business/yanabiya-digital-platform"
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg
                         border border-white/80 hover:border-brand-accent/50
                         hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
                  alt="Yanabiya Digital Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/30 to-transparent" />
                <div className="absolute top-3 left-3 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/60 to-indigo-700/60
                                ring-1 ring-white/30 grid place-items-center shadow-md">
                  <Monitor size={16} className="text-white" strokeWidth={2} />
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accentDark mb-0.5">New Division</p>
                  <h4 className="font-semibold text-brand-deep text-sm leading-snug">Yanabiya Digital Platform</h4>
                  <p className="text-[11px] text-brand-deep/55 mt-0.5">Apps, field ops & digital services</p>
                </div>
                <ArrowRight size={16} className="shrink-0 text-brand-accentDark group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </Reveal>
        </div>
      </SectionFrame>

      {/* SECTION 7 — Licensed Activities */}
      <SectionFrame eyebrow="Approved Activities Under License" title="Government-approved scope of operations.">
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-brand-deep/80">
          {ops.licensedActivities.map((a, i) => (
            <Reveal key={a} delay={i * 40}>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-amber-300 shrink-0" />
                <span>{a}</span>
              </li>
            </Reveal>
          ))}
        </ul>
      </SectionFrame>


      {/* SECTION 9 — Future Roadmap */}
      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next.">
        <div className={`grid gap-3 [perspective:1400px] ${ops.futurePlans.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'}`}>
          {ops.futurePlans.map((p, i) => (
            <Card3D
              key={p.title}
              title={p.title}
              body={p.body}
              icon={p.icon}
              delay={i * 110}
              accent
              image={p.image}
            />
          ))}
        </div>
      </SectionFrame>

      {/* SECTION 11 — Become a Sponsor / Contributor */}
      <SectionFrame eyebrow="Become a Sponsor / Contributor" title="Bring your ideas, capital or expertise.">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7 [perspective:1400px]">
          <Card3D title="Share Your Idea"  body="Submit a proposal. We'll review and respond within 5 business days." icon={Lightbulb} delay={0}
            image="https://images.unsplash.com/photo-1542744095-291d1f67b221?auto=format&fit=crop&w=800&q=80" />
          <Card3D title="Invest With Us"   body="Take a position in our growth roadmap or specific country expansion." icon={TrendingUp} delay={110}
            image="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80" />
          <Card3D title="Advisory Support" body="Lend strategic advice to our board across IT, trade or governance."  icon={Heart} delay={220}
            image="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3
                       bg-brand-accent text-brand-ink text-xs font-bold uppercase tracking-[0.22em]
                       shadow-md hover:bg-brand-50 hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-300"
          >
            Share Your Idea <Send size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3
                       border border-brand-deep/20 text-brand-deep text-xs font-bold uppercase tracking-[0.22em]
                       bg-brand-50 shadow-sm
                       hover:bg-brand-deep hover:text-white hover:-translate-y-0.5
                       transition-all duration-300"
          >
            Become a Sponsor <ArrowUpRight size={14} />
          </Link>
        </div>
      </SectionFrame>

      <div className="h-8 md:h-12" />
    </main>
  )
}

/* ────────────────────────────────────────────────────────────
 *  Reusable bits
 * ────────────────────────────────────────────────────────── */

function SectionFrame({
  eyebrow,
  title,
  children,
  compact = false,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <section className="relative">
      <div className={`container-x ${compact ? 'pt-2 pb-4 md:pt-3 md:pb-6' : 'py-4 md:py-5'}`}>
        <Reveal>
          <div className={`text-center max-w-2xl mx-auto ${compact ? 'mb-3' : 'mb-5 md:mb-6'}`}>
            <span className="inline-block text-[10px] font-semibold uppercase
                             tracking-[0.32em] text-brand-accentDark mb-1.5">
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
        className={`group relative h-full overflow-hidden rounded-lg
                    bg-brand-50
                    border ${accent ? 'border-amber-300/40' : 'border-slate-200'}
                    [transform-style:preserve-3d]
                    transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.02)]
                    hover:border-brand-accent`}
      >
        {image && (
          <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
            <img
              src={image}
              alt=""
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover
                         transition-transform duration-500 group-hover:scale-105"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/85 via-[#04100a]/30 to-transparent" />
            <div
              className={`absolute top-1.5 left-1.5 w-5 h-5 rounded grid place-items-center
                          ${accent ? 'bg-brand-deep text-[#0a1410]' : 'bg-white/95 text-[#0a1410]'}
                          shadow-sm [transform:translateZ(20px)]`}
            >
              <Icon size={10} strokeWidth={2.4} />
            </div>
          </div>
        )}

        <div className="p-2 md:p-2.5">
          {!image && (
            <div
              className={`w-6 h-6 rounded grid place-items-center mb-2
                          ${accent ? 'bg-brand-accent/25 text-brand-accentDark' : 'bg-brand-deep text-white'}
                          ring-1 ${accent ? 'ring-brand-accentDark/40' : 'ring-slate-200'}
                          shadow-sm [transform:translateZ(18px)]`}
            >
              <Icon size={11} strokeWidth={2} />
            </div>
          )}
          <div className="font-serif text-[12px] md:text-[13px] text-brand-deep leading-tight
                          [transform:translateZ(10px)]">
            {title}
          </div>
          <p className="mt-0.5 text-[10px] md:text-[11px] text-brand-deep/70 leading-snug text-justify
                        [transform:translateZ(4px)]">
            {body}
          </p>
        </div>
      </div>
    </Reveal>
  )
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Reveal>
      <div className="flex items-start gap-2 rounded-lg bg-brand-50
                      border border-slate-200 p-2.5 md:p-3
                      transition-colors duration-300 hover:border-brand-accent">
        <div className="shrink-0 w-7 h-7 rounded bg-brand-accent/20 text-brand-accentDark
                        ring-1 ring-brand-accentDark/35 grid place-items-center">
          <Icon size={12} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] uppercase tracking-[0.22em] font-semibold text-brand-accentDark/90 mb-0.5">
            {label}
          </div>
          <div className="text-[12px] text-brand-deep/85 leading-snug break-words">
            {value}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: { label: string; desc: string; icon: LucideIcon; slug: string; image: string }
  index: number
}) {
  return (
    <Reveal delay={index * 80}>
      <Link
        to={`/business/${service.slug}`}
        className="group relative block h-full overflow-hidden rounded-lg
                   bg-brand-50 border border-brand-deep/15
                   [transform-style:preserve-3d]
                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                   hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(10px)_scale(1.02)]
                   hover:border-brand-accent"
      >
        {/* Real photo header — wider/shorter so tiles stay compact at 3-up */}
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          <img
            src={service.image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover
                       transition-transform duration-500 group-hover:scale-105"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04100a]/85 via-[#04100a]/30 to-transparent" />
          {/* Floating icon chip on top of the image */}
          <div className="absolute top-1 left-1 w-5 h-5 rounded
                          bg-brand-deep text-[#0a1410]
                          grid place-items-center shadow-sm
                          [transform:translateZ(22px)]">
            <service.icon size={10} strokeWidth={2.4} />
          </div>
        </div>

        {/* Body */}
        <div className="p-2 md:p-2.5">
          <div className="font-serif text-[12px] md:text-[13px] text-brand-deep leading-tight [transform:translateZ(12px)]">
            {service.label}
          </div>
          <p className="mt-0.5 text-[10px] md:text-[11px] text-brand-deep/70 leading-snug [transform:translateZ(4px)]">
            {service.desc}
          </p>
          <div className="mt-1.5 inline-flex items-center gap-1 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.22em]
                          text-brand-accentDark group-hover:gap-2 transition-all">
            Learn more <ArrowRight size={9} />
          </div>
        </div>
      </Link>
    </Reveal>
  )
}

/* Coloured initials fallback when no logo is available. The colour is
 * derived from a quick hash of the name so each partner gets a stable
 * unique tile. */
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

/* Partner row with continuous horizontal marquee — same chain feel
 * as the home Partnerships section. The strip is duplicated so the
 * scroll loops seamlessly. */
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
  // Repeat enough tiles so the strip fills the viewport even with
  // small partner counts.
  const minTiles = 12
  const repeats = Math.max(1, Math.ceil(minTiles / Math.max(items.length, 1)))
  const half = Array(repeats).fill(items).flat() as PartnerItem[]
  const loop = [...half, ...half]
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'

  return (
    <div className={className}>
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-brand-accentDark mb-1">
          {title}
        </div>
        <div className="text-sm text-brand-deep/65">{subtitle}</div>
      </div>

      <div className="relative overflow-hidden [perspective:1400px]">
        <div
          className={`flex ${animClass} gap-6 w-max py-3 [transform-style:preserve-3d]`}
          style={{
            animationDuration: `${durationSec}s`,
            animationTimingFunction: 'linear',
            willChange: 'transform',
          }}
        >
          {loop.map((p, i) => (
            <div key={`${p.name}-${i}`} className="shrink-0 w-36">
              <PartnerLogo item={p} />
            </div>
          ))}
        </div>
        {/* Edge fades — let the strip dissolve into the dark page bg */}
        <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-[#0a1410] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-[#0a1410] to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

/* Individual partner tile. Tries the explicit logo URL first,
 * then Clearbit (logo.clearbit.com/<domain>), and finally falls
 * back to a coloured monogram with the partner's initials + name
 * underneath. */
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
    <div className="group relative h-20 rounded-lg bg-brand-50 border border-brand-deep/15
                    grid place-items-center p-2 overflow-hidden
                    transition-all duration-300 hover:-translate-y-1 hover:scale-[1.04]
                    hover:shadow-[0_18px_36px_-14px_rgba(0,0,0,0.45)]">
      {src ? (
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          className="max-w-[78%] max-h-[55%] object-contain"
          onError={() => {
            setStage((s: Stage) => (s === 'logo' ? (item.domain ? 'clearbit' : 'fallback') : 'fallback'))
          }}
        />
      ) : (
        <div
          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${toneFor(item.name)}
                      grid place-items-center text-brand-deep font-serif text-sm
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_8px_rgba(0,0,0,0.18)]`}
        >
          {monogramOf(item.name)}
        </div>
      )}
      <span className="absolute inset-x-1.5 bottom-1 text-[9px] font-semibold text-slate-700
                       text-center leading-tight truncate">
        {item.name}
      </span>
    </div>
  )
}
