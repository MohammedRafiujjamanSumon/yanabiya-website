/**
 * Yanabiya Admin — Full Content Seed
 * Run: node seed-all.js
 * Seeds every content section with real data from the static codebase.
 */
require('dotenv').config()
const { setSection } = require('./src/models/Content')

function seed(key, data) {
  setSection(key, data, 'seed')
  console.log(`✓ seeded: ${key}`)
}

/* ─────────────────────────────────────────── COMPANY ── */
seed('company', {
  name: 'Yanabiya Group',
  legalName: 'Yanabiya Gulf International Business & Trade',
  tagline: 'Built on Trust, Driven by Excellence',
  subTagline: 'A Global Group of Companies',
  heroDescription:
    'Yanabiya Group delivers innovative solutions across multiple industries and continents, connecting Bangladesh, the United Kingdom, Oman and the USA through technology, trade and talent.',
  qualityStatement:
    '"The Stamp of Quality & Professionalism", built on morals, ethics, honesty, and customer satisfaction.',
  stats: [
    { value: '4+', label: 'Countries' },
    { value: '6+', label: 'Industries' },
    { value: '15Y', label: 'Experience' },
    { value: '500+', label: 'Clients' },
  ],
  mission:
    'To deliver top-class internet services and optimal software solutions at reasonable prices, complemented by consulting and business process outsourcing, built on three pillars: People, Process, and Clients.',
  vision:
    'To become a leading global performer in providing quality web and software development solutions, leveraging professional talent from agency, corporate, and private sectors to help clients accelerate growth.',
  pillars: [
    { title: 'People',  body: 'A skilled workforce experienced across business domains and modern technologies.' },
    { title: 'Process', body: 'Balancing quality with efficiency in development timelines and costs.' },
    { title: 'Clients', body: 'Continuously improving satisfaction through teamwork and individual recognition.' },
  ],
  values: [
    'Superior performance and teamwork',
    'Respect for individual contributions',
    'Diverse and challenging opportunities',
    'Flexible, rewarding career advancement',
    'Professional, integrated processes',
    'Passion for success with practical expertise',
  ],
})

/* ────────────────────────────────────────── BRANDING ── */
seed('branding', {
  logoUrl: '/yanabiya-website/images/logo.png',
  brandmarkUrl: 'https://yanabiyagroup.com/img/yanabiya-group-1.png',
  siteName: 'Yanabiya Group',
  tagline: 'Built on Trust, Driven by Excellence',
  faviconUrl: '/yanabiya-website/images/logo.png',
})

/* ──────────────────────────────────────────── ABOUT ── */
seed('about', {
  intro: 'A trusted international group of companies — building, scaling, and operating high-impact ventures across technology, trade, talent and consulting.',
  pillars: [
    { title: 'Technology', body: 'Digital transformation, IT infrastructure, and software development across 4 countries.' },
    { title: 'Trade',      body: 'International trading, procurement, and supply chain management.' },
    { title: 'Talent',     body: 'HR consulting, recruitment, and professional training programs.' },
    { title: 'Consulting', body: 'Business strategy, management consulting, and advisory services.' },
  ],
})

/* ─────────────────────────────────────────── NAVBAR ── */
seed('navbar', {
  ctaLabel: 'Contact Us',
  ctaHref: '/contact',
  announcement: '',
})

/* ──────────────────────────────────────────── FOOTER ── */
seed('footer', {
  copyright: '© 2024 Yanabiya Group. All rights reserved.',
  groupLinks: [
    { label: 'Home',              href: '/'                       },
    { label: 'About Us',          href: '/about-us'               },
    { label: 'Our Services',      href: '/#businesses'            },
    { label: 'Global Presence',   href: '/#global'                },
    { label: 'Community',         href: '/community/community-care' },
    { label: 'Contact',           href: '/contact'                },
  ],
  corporateLinks: [
    { label: 'Our Story',         href: '/about/our-story'        },
    { label: 'Leadership',        href: '/people/board'           },
    { label: 'CEO Message',       href: '/people/ceo'             },
    { label: 'Vice Chairman',     href: '/people/vice-chairman'   },
    { label: 'Careers',           href: '/community/careers'      },
    { label: 'Blog',              href: '/community/blog'         },
    { label: 'Testimonials',      href: '/community/testimonials' },
    { label: 'Donations',         href: '/community/donation'     },
    { label: 'Sustainable Growth',href: '/community/sustainable-growth' },
  ],
  social: [
    { platform: 'LinkedIn',   url: 'https://linkedin.com/company/yanabiya-group', icon: 'linkedin' },
    { platform: 'Facebook',   url: 'https://facebook.com/yanabiyagroup',          icon: 'facebook' },
    { platform: 'Instagram',  url: 'https://instagram.com/yanabiyagroup',         icon: 'instagram' },
    { platform: 'Twitter',    url: 'https://twitter.com/yanabiyagroup',           icon: 'twitter' },
    { platform: 'YouTube',    url: 'https://youtube.com/@yanabiyagroup',          icon: 'youtube' },
  ],
  newsletter: { heading: 'Stay Updated', subheading: 'Get the latest from Yanabiya Group' },
})

/* ─────────────────────────────────────── HERO SCENES ── */
seed('hero-scenes', [
  {
    id: 'tech',
    eyebrow: 'Technology & Digital',
    title: 'Engineering Tomorrow\'s Solutions Today',
    body: 'Custom software, AI, and cloud solutions built for enterprise scale.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore IT Services', href: '/services/it-software' },
  },
  {
    id: 'trade',
    eyebrow: 'Export & Import Business',
    title: 'Moving Goods Across Every Border',
    body: 'Sourcing, freight, customs clearance and end-to-end supply chain fulfilment.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore Trade', href: '/services/export-import' },
  },
  {
    id: 'clothing',
    eyebrow: 'Clothing & Accessories',
    title: 'Private Label to Retail Supply',
    body: 'Garment sourcing, quality assurance, and accessories wholesale.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore Clothing', href: '/services/clothing' },
  },
  {
    id: 'brokerage',
    eyebrow: 'Agents & Brokerage',
    title: 'Connecting Businesses Across Markets',
    body: 'Cross-border deals, partnerships, and tender support.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore Brokerage', href: '/services/agents-brokerage' },
  },
  {
    id: 'office',
    eyebrow: 'Office Management',
    title: 'Professional Workspaces & Operations',
    body: 'Serviced offices, PRO services, accounting and administration.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore Office Services', href: '/services/office-management' },
  },
  {
    id: 'manpower',
    eyebrow: 'Manpower Supply',
    title: 'Connecting Talent with Opportunity',
    body: 'Workforce supply, student placement, visa and aviation coordination.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Explore Manpower', href: '/services/manpower' },
  },
  {
    id: 'global',
    eyebrow: 'Global Presence',
    title: 'Four Countries. One Unified Group.',
    body: 'Operating across Oman, UK, Bangladesh and USA with local expertise.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    cta: { label: 'Our Global Presence', href: '/#global' },
  },
])

/* ──────────────────────────────────────── SOLUTIONS ── */
seed('solutions', [
  { title: 'Custom Software Development',    body: 'Bespoke applications tailored to your operational workflow.' },
  { title: 'Web Design & Development',       body: 'Modern, responsive corporate and e-commerce platforms.' },
  { title: 'UI / UX Design',                 body: 'Research-driven product and interface design.' },
  { title: 'Cyber Security & Ethical Hacking', body: 'Penetration testing and continuous security hardening.' },
  { title: 'AWS Cloud Services',             body: 'Cloud architecture, migration, and managed infrastructure.' },
  { title: 'Data Analytics & BI',            body: 'Dashboards, reporting, and data-pipeline engineering.' },
  { title: 'ERP Design & Implementation',    body: 'End-to-end enterprise resource planning roll-outs.' },
  { title: 'Digital Marketing',              body: 'Online marketing and digital-transformation roadmaps.' },
  { title: 'Infrastructure Projects',        body: 'Network, datacentre, and on-premise build-outs.' },
  { title: 'Business Process Outsourcing',   body: 'BPO services across finance, support, and operations.' },
])

/* ──────────────────────────────────────── SERVICES ── */
seed('services', [
  {
    slug: 'it-software',
    iconName: 'Code2',
    title: 'Technology & Digital Solutions',
    body: 'Custom software, web platforms, ERP systems, and infrastructure projects engineered for enterprises of every size.',
    details: 'We design and develop custom software, scalable web platforms, enterprise ERP systems, and robust infrastructure solutions for businesses of all sizes. We also build custom AI solutions, including AI agents and prompt-based services, to automate processes, enhance decision-making, and improve operational efficiency.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4',
    features: ['Custom web & mobile applications','ERP design and implementation','Cloud migration (AWS / Azure / hybrid infrastructure)','UI/UX research, design & engineering','Cybersecurity assessments & system hardening','Business intelligence dashboards & data analytics','AI solutions, including AI agents and automation systems','Prompt-based AI workflows & intelligent task automation','API development & system integration services','Scalable SaaS product development','DevOps, CI/CD & infrastructure automation','Legacy system modernization & digital transformation'],
    countries: [{ code: 'OM', note: 'Delivery hub & regional client engagements across the Gulf.' },{ code: 'GB', note: 'Enterprise architecture & client-facing teams for EMEA.' },{ code: 'BD', note: 'Engineering centre, development, QA and 24×7 support.' },{ code: 'US', note: 'North-America partnerships & cloud/AI advisory.' }],
    subServicesHeading: 'Explore Our IT & Development Services',
    subServices: [
      { slug: 'custom-software-development', iconName: 'Code2', title: 'Custom Software Development', body: 'Bespoke software engineered around your exact workflows.', image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80', features: ['Web app development','Mobile app development','Cloud app development','Blockchain','AI and machine learning','DevOps','Maintenance'] },
      { slug: 'web-design-development', iconName: 'Globe', title: 'Web Design & Development', body: 'Pixel-perfect, high-performance websites and web applications.', image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80', features: ['Corporate website design','E-commerce platforms','CMS integration','SEO optimisation','Performance tuning'] },
      { slug: 'ui-ux-design', iconName: 'Palette', title: 'UI / UX Design', body: 'Research-driven interfaces that convert and delight users.', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80', features: ['User research','Wireframing & prototyping','Accessibility audits','Design systems'] },
      { slug: 'cloud-devops', iconName: 'Cloud', title: 'Cloud & DevOps', body: 'Cloud architecture, migration, and fully automated CI/CD pipelines.', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80', features: ['AWS / Azure / GCP','Kubernetes & Docker','CI/CD pipelines','Infrastructure as Code'] },
      { slug: 'data-analytics', iconName: 'BarChart3', title: 'Data Analytics & BI', body: 'Transform raw data into clear, actionable business intelligence.', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80', features: ['Dashboard development','ETL pipelines','Predictive analytics','Data visualisation'] },
      { slug: 'digital-marketing', iconName: 'TrendingUp', title: 'Digital Marketing', body: 'Grow your brand online with data-driven digital marketing strategies.', image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80', features: ['SEO & content marketing','PPC campaigns','Social media management','Email marketing'] },
    ],
  },
  {
    slug: 'export-import',
    iconName: 'Ship',
    title: 'Export & Import Business',
    body: 'Sourcing, freight, customs, and end-to-end fulfilment.',
    details: 'We handle the full spectrum of international trade — from supplier identification and product sourcing to freight forwarding, customs clearance, and last-mile delivery.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=800&q=80',
    features: ['International product sourcing','Freight forwarding (air, sea, road)','Customs clearance & documentation','Letter of credit & trade finance','Quality inspection & assurance','Warehousing & last-mile delivery','Import/export licensing & compliance'],
    countries: [{ code: 'OM', note: 'Gulf trade hub and regional distribution.' },{ code: 'GB', note: 'European market import and compliance.' },{ code: 'BD', note: 'RMG exports and South Asia sourcing.' },{ code: 'US', note: 'North America imports and logistics.' }],
    subServices: [],
  },
  {
    slug: 'clothing',
    iconName: 'Shirt',
    title: 'Clothing & Accessories',
    body: 'Private label, garment sourcing, QA, and retail supply.',
    details: 'We provide end-to-end clothing and accessories solutions — from private label design and factory sourcing through quality assurance to wholesale and retail supply.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
    features: ['Private label design & branding','Factory sourcing & vetting','Quality assurance & compliance','Wholesale distribution','Retail supply chain management','Accessories & lifestyle products'],
    countries: [{ code: 'OM', note: 'Gulf retail and wholesale distribution.' },{ code: 'GB', note: 'UK wholesale and e-commerce supply.' },{ code: 'BD', note: 'RMG manufacturing and export hub.' }],
    subServices: [],
  },
  {
    slug: 'agents-brokerage',
    iconName: 'Handshake',
    title: 'Agents & Brokerage Business',
    body: 'Cross-border deals, partnerships, and tender support.',
    details: 'We act as your trusted commercial agents and brokers — identifying opportunities, structuring deals, and facilitating partnerships across international markets.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    features: ['Commercial agency representation','Business matchmaking & introductions','Tender & bid support','Insurance & financial product brokerage','Home loan facilitation','Partnership structuring'],
    countries: [{ code: 'OM', note: 'Gulf commercial agency and brokerage.' },{ code: 'GB', note: 'UK and European deal facilitation.' },{ code: 'BD', note: 'South Asia partnership brokerage.' }],
    subServices: [],
  },
  {
    slug: 'office-management',
    iconName: 'Building2',
    title: 'Office Management Services',
    body: 'Serviced offices, PRO services, accounting, and admin.',
    details: 'Comprehensive office solutions including fully serviced workspace, government liaison (PRO), accounting services, and complete administrative support.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    features: ['Serviced & virtual offices','PRO and government liaison services','Bookkeeping & financial reporting','Payroll management','Document clearing & attestation','Facility management & security'],
    countries: [{ code: 'OM', note: 'Oman PRO, licensing and office solutions.' },{ code: 'GB', note: 'London virtual and serviced offices.' },{ code: 'BD', note: 'Dhaka admin and accounting services.' }],
    subServices: [],
  },
  {
    slug: 'manpower',
    iconName: 'Users',
    title: 'Manpower Supply Services',
    body: 'Workforce, student placement, visa, and aviation.',
    details: 'We connect skilled and semi-skilled talent with employers across the Gulf, UK and USA — managing the full recruitment, visa and mobilisation cycle.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    features: ['Skilled & semi-skilled recruitment','Gulf & international placements','Student placement & internships','Visa processing & coordination','Aviation crew coordination','Workforce mobilisation & onboarding','Employer-of-record services'],
    countries: [{ code: 'OM', note: 'Gulf workforce deployment hub.' },{ code: 'GB', note: 'UK student and professional placements.' },{ code: 'BD', note: 'Source market for Gulf and UK placements.' }],
    subServices: [],
  },
  {
    slug: 'ecommerce',
    iconName: 'ShoppingCart',
    title: 'Yanabiya E-Commerce',
    body: 'Shop globally with Yanabiya — our e-commerce platform ships worldwide.',
    details: 'Yanabiya\'s global e-commerce arm offers curated products across fashion, electronics, home goods and more, shipped from our international warehouses.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    features: ['Global product catalogue','Secure checkout & payments','International shipping','Returns & customer support','Brand partnerships','Wholesale B2B portal'],
    countries: [{ code: 'OM', note: 'Gulf e-commerce warehouse & delivery.' },{ code: 'GB', note: 'European e-commerce operations.' }],
    subServices: [],
  },
  {
    slug: 'digital-platform',
    iconName: 'Globe',
    title: 'Digital Platform Services',
    body: 'SaaS products, portals, and digital transformation consulting.',
    details: 'We build and operate digital platforms — from enterprise SaaS and customer portals to full digital transformation programmes.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    features: ['SaaS product development','Customer & partner portals','Digital transformation consulting','Platform integration services','API monetisation'],
    countries: [{ code: 'OM', note: 'Gulf digital platform delivery.' },{ code: 'GB', note: 'UK SaaS and platform consulting.' }],
    subServices: [],
  },
])

/* ─────────────────────────────────────── BRANCHES ── */
seed('branches', [
  {
    code: 'OM', flag: '🇴🇲', name: 'Oman', active: true,
    established: '19 September 2021',
    legalEntity: 'Yanabiya Gulf International Business & Trade SPC',
    registration: 'Commercial Registration: 1395664',
    address: 'Office-41, 4th Floor, Building-846\nWay-4011, Complex-240\nAl Gubrah, Bushar, Muscat\nSultanate of Oman',
    phone: '+968 2249 5566', mobile: '+968 9116 1677',
    email: 'info@yanabiyagroup.com', website: 'www.yanabiyagroup.com',
    hours: 'Sunday to Thursday, 8:00 AM to 6:00 PM (GST)',
    description: 'Group Headquarters — anchoring multi-sector operations across Oman through a coordinated network of seven partner companies in Muscat.',
    mapQuery: 'Office-41, 4th Floor, Building-846, Way-4011, Al Gubrah, Bushar, Muscat, Oman',
  },
  {
    code: 'GB', flag: '🇬🇧', name: 'United Kingdom', active: true,
    established: '1 June 2023',
    legalEntity: 'Yanabiya Gulf International UK Ltd',
    registration: 'Company No: 14907791',
    address: '167-169 Great Portland Street\n5th Floor, W1W 5PF\nLondon, United Kingdom',
    phone: '+44 7988 518877', mobile: '+44 7988 518877',
    email: 'info@yanabiya.com', website: 'www.yanabiya.com',
    hours: 'Monday to Friday, 9:00 AM to 6:00 PM (GMT)',
    description: 'European operations hub — IT consulting, trade and workforce services from the heart of London.',
    mapQuery: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, UK',
  },
  {
    code: 'BD', flag: '🇧🇩', name: 'Bangladesh', active: true,
    established: '17 November 1998',
    legalEntity: 'Yanabiya Gulf International BD Trade',
    registration: 'Trade License: TRAD/DNCC/100677/1998',
    address: 'Office #211, Plot #322/B\nBlock-Kanchkura, Uttarkhan, 1230\nDhaka, Bangladesh',
    phone: '+880 1711 030489', mobile: '+880 1711 030489',
    email: 'info@yanabiyagroup.com', website: 'www.yanabiyagroup.com',
    hours: 'Sunday to Thursday, 9:00 AM to 6:00 PM (BST)',
    description: 'South Asia delivery centre — technology, garment trade, and workforce mobility hub since 1998.',
    mapQuery: 'Plot 322/B, Kanchkura, Uttarkhan, Dhaka, Bangladesh',
  },
  {
    code: 'US', flag: '🇺🇸', name: 'United States', active: true,
    established: '2025',
    legalEntity: 'Yanabiya Gulf International US LLC',
    registration: 'Austin, Texas LLC',
    address: 'Austin, Texas\nUnited States of America',
    phone: '', mobile: '',
    email: 'info@yanabiyagroup.com', website: 'www.yanabiyagroup.com',
    hours: 'Monday to Friday, 9:00 AM to 6:00 PM (CST)',
    description: 'North America operations — cloud, AI and strategic consulting engagements across the US market.',
    mapQuery: 'Austin, Texas, USA',
  },
])

/* ──────────────────────────────────────── PARTNERS ── */
seed('partners', {
  partners: [
    { name: 'Amazon Web Services', logo: '/yanabiya-website/logos/partners/aws.png' },
    { name: 'Microsoft',           logo: '/yanabiya-website/logos/partners/ms.png'  },
    { name: 'Oracle',              logo: '/yanabiya-website/logos/partners/oracle.png' },
    { name: 'SAP',                 logo: '/yanabiya-website/logos/partners/sap.png' },
    { name: 'Adobe',               logo: '/yanabiya-website/logos/partners/adobe.png' },
    { name: 'Dell',                logo: '/yanabiya-website/logos/partners/dell.png' },
    { name: 'HP',                  logo: '/yanabiya-website/logos/partners/hp.png'  },
    { name: 'Huawei',              logo: '/yanabiya-website/logos/partners/huawei.png' },
    { name: 'Cisco',               logo: '/yanabiya-website/logos/partners/cisco.png' },
    { name: 'Google Cloud',        logo: '/yanabiya-website/logos/partners/gc.png'  },
  ],
  clients: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18].map(n => ({ name: `Client ${n}`, logo: `/yanabiya-website/logos/clients/${n}.png` })),
  ukClients: [1,2,3,4,5,6,7].map(n => ({ name: `UK Client ${n}`, logo: `/yanabiya-website/logos/uk-clients/${n}.png` })),
  memberships: [
    { name: 'Membership 1', logo: '/yanabiya-website/logos/mb/1.png' },
    { name: 'Membership 2', logo: '/yanabiya-website/logos/mb/2.png' },
    { name: 'Membership 3', logo: '/yanabiya-website/logos/mb/3.png' },
  ],
  affiliations: [
    { name: 'Affiliation 1', logo: '/yanabiya-website/logos/mb/4.png' },
    { name: 'Affiliation 2', logo: '/yanabiya-website/logos/mb/5.png' },
    { name: 'Affiliation 3', logo: '/yanabiya-website/logos/mb/6.png' },
  ],
})

/* ──────────────────────────────────────── CONTACT ── */
seed('contact', {
  hq: {
    address: 'Al-Khuwair, Muscat, Sultanate of Oman',
    poBox: 'P.O. Box: 1432, Postal Code: 133',
    phone: '+968 2249 5566',
    mobile: '+968 9116 1677',
    email: 'info@yanabiyagroup.com',
    hours: 'Sunday to Thursday, 8:00 AM to 6:00 PM',
  },
  countries: [
    { code: 'OM', legalName: 'Yanabiya Gulf International Business and Trade SPC', officeAddress: 'Office-41, 4th Floor, Building-846\nWay-4011, Complex-240\nAl Gubrah, Bushar, Muscat', postAddress: 'P.O. Box 1432, PC-133\nAl Khuwair, Muscat\nSultanate of Oman', region: 'Sultanate of Oman', phones: ['+968 2249 5566'], mobile: '+968 9116 1677', whatsapp: '+968 9116 1677', emails: ['info@yanabiyagroup.com','admin@yanabiyagroup.com'], websites: ['www.yanabiyagroup.com'], hours: 'Sunday to Thursday, 8:00 AM to 6:00 PM (GST)', mapQuery: 'Office-41, 4th Floor, Building-846, Way-4011, Al Gubrah, Bushar, Muscat, Oman' },
    { code: 'GB', legalName: 'Yanabiya Gulf International UK Ltd', officeAddress: '167-169 Great Portland Street\n5th Floor, W1W 5PF', postAddress: 'London, United Kingdom', region: 'United Kingdom', phones: ['+44 7988 518877'], mobile: '+44 7988 518877', emails: ['info@yanabiya.com','info@yanabiyagibt.com'], websites: ['www.yanabiya.com','www.yanabiyagibt.com'], hours: 'Monday to Friday, 9:00 AM to 6:00 PM (GMT)', mapQuery: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, UK' },
    { code: 'BD', legalName: 'Yanabiya Gulf International BD Trade', officeAddress: 'Office #211, Plot #322/B\nBlock-Kanchkura, Uttarkhan, 1230', postAddress: 'Dhaka, Bangladesh', region: 'Bangladesh', phones: ['+880 1711 030489'], mobile: '+880 1711 030489', emails: ['info@yanabiyagroup.com'], websites: ['www.yanabiyagroup.com'], hours: 'Sunday to Thursday, 9:00 AM to 6:00 PM (BST)', mapQuery: 'Plot 322/B, Kanchkura, Uttarkhan, Dhaka, Bangladesh' },
    { code: 'US', legalName: 'Yanabiya Gulf International US LLC', officeAddress: 'Austin, Texas', postAddress: 'United States of America', region: 'USA', phones: [], emails: ['info@yanabiyagroup.com'], websites: ['www.yanabiyagroup.com'], hours: 'Monday to Friday, 9:00 AM to 6:00 PM (CST)', mapQuery: 'Austin, Texas, USA' },
  ],
})

/* ─────────────────────────────────────── LEADERSHIP ── */
seed('leadership', {
  chairman: { name: 'S M Shamim Ahmed', role: 'Founder, Chairman & CEO', image: '/yanabiya-website/images/chairman.jpg', bio: 'S M Shamim Ahmed founded Yanabiya Group with a vision to build a world-class international enterprise delivering technology, trade and talent solutions across continents. Under his leadership, the Group has expanded to four countries, establishing operations in Oman, the United Kingdom, Bangladesh, and the United States.' },
  viceChairman: { name: 'Mohammad Abu Jaheed', role: 'Co-founder & Vice Chairman', image: '/yanabiya-website/images/vice-chairman.jpg', bio: 'Mohammad Abu Jaheed co-founded Yanabiya Group and serves as Vice Chairman, providing strategic oversight across all four operating countries. His leadership anchors the Group\'s international expansion strategy.' },
  board: [
    { name: 'S M Shamim Ahmed',                  role: 'Founder, Chairman & CEO',   photo: '/yanabiya-website/images/chairman.jpg' },
    { name: 'Badar Humaid Salim Al-Shaqsi',       role: 'Board Member',               photo: '' },
    { name: 'Ismail Khalfan Gharib Al Sulaimani', role: 'Board Member',               photo: '' },
    { name: 'Mohammed Salim Al-Bakri',             role: 'Board Member',               photo: '' },
    { name: 'Mohammad Abu Jaheed',                role: 'Co-founder & Vice Chairman', photo: '/yanabiya-website/images/vice-chairman.jpg' },
  ],
  management: [
    { name: 'S M Momim Ahmed',                   role: 'Managing Director, Bangladesh', country: 'BD' },
    { name: 'Khalid Saif Ahmed Al Sulaimani',     role: 'General Manager, Oman',         country: 'OM' },
    { name: 'Sumon Ahmed Saleheen',               role: 'Business Development Manager',  country: 'OM' },
  ],
})

/* ──────────────────────────────────────── PAGE HEROES ── */
seed('page-heroes', {
  'about-us':          { eyebrow: 'About Yanabiya Group', title: 'Built on Trust, Driven by Excellence', subtitle: 'A diversified international group of companies operating across technology, trade, talent and consulting in four countries.' },
  'our-story':         { eyebrow: 'Our Journey', title: 'From Dhaka to the World', subtitle: 'Three decades of growth, trust and global expansion — the story of Yanabiya Group.' },
  'careers':           { eyebrow: 'Join Our Team', title: 'Build Your Career with Yanabiya', subtitle: 'Explore opportunities across our global offices in Oman, UK, Bangladesh and USA.' },
  'community-care':    { eyebrow: 'Community Care', title: 'Giving Back to the Community', subtitle: 'Supporting communities through education, healthcare, welfare and charitable initiatives.' },
  'sustainable-growth':{ eyebrow: 'Sustainable Growth', title: 'Growing Responsibly', subtitle: 'Our commitment to sustainable business practices, environmental responsibility and social impact.' },
  'community-overview':{ eyebrow: 'Community', title: 'Yanabiya in the Community', subtitle: 'From charitable foundations to sustainable development — our community impact.' },
  'blog':              { eyebrow: 'Insights & Updates', title: 'Yanabiya Group Blog', subtitle: 'News, insights and updates from across the Yanabiya Group.' },
  'testimonials':      { eyebrow: 'Client Stories', title: 'What Our Clients Say', subtitle: 'Real experiences from clients across Oman, UK, Bangladesh and USA.' },
  'donation':          { eyebrow: 'Yanabiya Charitable Foundation', title: 'Donations Portal for Charitable', subtitle: '100% of every donation goes directly to the cause you choose, no deductions, no hidden fees. Give with confidence.' },
  'contact':           { eyebrow: 'Get in Touch', title: 'Contact Yanabiya Group', subtitle: 'Our teams in Oman, UK, Bangladesh and USA are ready to assist you.' },
  'global-presence':   { eyebrow: 'Global Presence', title: 'Four Countries. One Group.', subtitle: 'Operating across Oman, United Kingdom, Bangladesh and the United States.' },
})

/* ───────────────────────────────────────── PEOPLE ── */
seed('people', [
  { id: 'shamim-ahmed',    name: 'S M Shamim Ahmed',                  role: 'Founder, Chairman & CEO',           image: '/yanabiya-website/images/chairman.jpg',          tier: 'board',   tierLabel: 'Board & Advisory',        country: 'OM', flag: '🇴🇲', email: 'chairman@yanabiyagroup.com', shortBio: 'Founder of Yanabiya Group, driving quality and professionalism across global markets.', fullBio: ['S M Shamim Ahmed founded Yanabiya Group with a vision to build a world-class international enterprise.','Under his leadership, the Group has expanded to four countries.'] },
  { id: 'abu-jaheed',      name: 'Mohammad Abu Jaheed',               role: 'Co-founder & Vice Chairman',        image: '/yanabiya-website/images/vice-chairman.jpg',      tier: 'board',   tierLabel: 'Board & Advisory',        country: 'OM', flag: '🇴🇲', email: '', shortBio: 'Co-founder and Vice Chairman overseeing Yanabiya\'s global strategy.', fullBio: ['Mohammad Abu Jaheed co-founded Yanabiya Group and serves as Vice Chairman.'] },
  { id: 'badar-al-shaqsi', name: 'Badar Humaid Salim Al-Shaqsi',      role: 'Board Member',                      image: '',                                                tier: 'board',   tierLabel: 'Board & Advisory',        country: 'OM', flag: '🇴🇲', email: '', shortBio: 'Board Member contributing to Yanabiya Group\'s governance and strategic direction.', fullBio: ['Badar Humaid Salim Al-Shaqsi serves on the Yanabiya Group Board.'] },
  { id: 'ismail-sulaimani',name: 'Ismail Khalfan Gharib Al Sulaimani',role: 'Board Member',                      image: '',                                                tier: 'board',   tierLabel: 'Board & Advisory',        country: 'OM', flag: '🇴🇲', email: '', shortBio: 'Board Member supporting Yanabiya\'s governance and stakeholder engagement.', fullBio: ['Ismail Khalfan Gharib Al Sulaimani is a Board Member of Yanabiya Group.'] },
  { id: 'mohammed-al-bakri',name: 'Mohammed Salim Al-Bakri',          role: 'Board Member',                      image: '',                                                tier: 'board',   tierLabel: 'Board & Advisory',        country: 'OM', flag: '🇴🇲', email: '', shortBio: 'Board Member providing governance oversight.', fullBio: ['Mohammed Salim Al-Bakri serves on the Yanabiya Group Board.'] },
  { id: 'momim-ahmed',     name: 'S M Momim Ahmed',                   role: 'Managing Director, Bangladesh',     image: '/yanabiya-website/images/people/momim-ahmed.jpg', tier: 'exec',    tierLabel: 'Executive Management',    country: 'BD', flag: '🇧🇩', email: '', shortBio: 'Managing Director leading Yanabiya Bangladesh\'s day-to-day operations.', fullBio: ['Leads Yanabiya Bangladesh\'s day-to-day operations, directing a multi-sector team across technology delivery, garment trade, and workforce mobility.'] },
  { id: 'khalid-sulaimani',name: 'Khalid Saif Ahmed Al Sulaimani',    role: 'General Manager, Oman',             image: '/yanabiya-website/images/people/khalid-sulaimani.jpg', tier: 'exec', tierLabel: 'Executive Management', country: 'OM', flag: '🇴🇲', email: '', shortBio: 'General Manager overseeing Yanabiya\'s Oman operations.', fullBio: ['Oversees daily operations and client relationships across Yanabiya\'s Oman entity.'] },
  { id: 'sumon-saleheen',  name: 'Sumon Ahmed Saleheen',              role: 'Business Development Manager',      image: '/yanabiya-website/images/people/sumon-ahmed.jpg', tier: 'exec',    tierLabel: 'Executive Management',    country: 'OM', flag: '🇴🇲', email: '', shortBio: 'Business Development Manager driving growth across Yanabiya\'s service portfolio.', fullBio: ['Sumon Ahmed Saleheen leads business development activities across Yanabiya\'s Oman operations.'] },
])

/* ──────────────────────────────────── TESTIMONIALS ── */
seed('testimonials', [
  { id: '1', name: 'Ahmed Al-Rashidi',    role: 'CEO, Al-Rashidi Trading',    country: 'OM', flag: '🇴🇲', rating: 5, text: 'Yanabiya Group delivered our ERP system on time and within budget. Their team was professional and responsive throughout the entire project.', image: '', verified: true },
  { id: '2', name: 'James Williams',     role: 'Director, TechVentures UK',  country: 'GB', flag: '🇬🇧', rating: 5, text: 'Exceptional IT consulting services. The team at Yanabiya UK understood our requirements perfectly and delivered a solution that exceeded our expectations.', image: '', verified: true },
  { id: '3', name: 'Rahima Begum',       role: 'MD, Dhaka Exports Ltd',      country: 'BD', flag: '🇧🇩', rating: 5, text: 'Our garment exports have grown significantly since partnering with Yanabiya Bangladesh. Their trade expertise and network is unmatched.', image: '', verified: true },
  { id: '4', name: 'Michael Thompson',   role: 'VP Operations, TechCorp USA', country: 'US', flag: '🇺🇸', rating: 5, text: 'Yanabiya\'s cloud and AI solutions helped us reduce operational costs by 30%. Highly recommend their services.', image: '', verified: true },
  { id: '5', name: 'Fatima Al-Zahrawi', role: 'Manager, Gulf Retail Group',  country: 'OM', flag: '🇴🇲', rating: 5, text: 'The office management services from Yanabiya have been outstanding. They handle everything from PRO services to accounting seamlessly.', image: '', verified: true },
])

/* ────────────────────────────────────────── CAREERS ── */
seed('careers', [
  { id: '1', title: 'Senior Software Engineer', department: 'Technology', country: 'OM', flag: '🇴🇲', type: 'Full-time', salary: 'Competitive', description: 'We are looking for an experienced Senior Software Engineer to join our Oman technology team.', requirements: ['5+ years experience in software development','Proficiency in React, Node.js or Python','Experience with cloud platforms (AWS/Azure)','Strong communication skills'], posted: '2026-05-01', active: true },
  { id: '2', title: 'Business Development Executive', department: 'Sales', country: 'GB', flag: '🇬🇧', type: 'Full-time', salary: 'Competitive + Commission', description: 'Join our UK team as a Business Development Executive and help grow our client base across Europe.', requirements: ['3+ years B2B sales experience','IT or professional services background','Excellent presentation skills','UK work authorization'], posted: '2026-05-01', active: true },
  { id: '3', title: 'HR & Recruitment Specialist', department: 'HR', country: 'BD', flag: '🇧🇩', type: 'Full-time', salary: 'Negotiable', description: 'Support our manpower supply division by sourcing and placing skilled workers across the Gulf.', requirements: ['2+ years HR/recruitment experience','Knowledge of Gulf visa processes','Fluent in Bengali and English','Strong networking skills'], posted: '2026-05-01', active: true },
])

/* ─────────────────────────────────────────── BLOG ── */
seed('blog', [
  { id: '1', title: 'Yanabiya Group Expands Operations to the USA', slug: 'yanabiya-expands-usa', excerpt: 'Yanabiya Group has officially established its US LLC in Austin, Texas, marking a significant milestone in the group\'s global expansion strategy.', content: 'Yanabiya Group is proud to announce the establishment of Yanabiya Gulf International US LLC in Austin, Texas. This marks a key milestone in our journey to become a truly global enterprise. Our US operations will focus on cloud computing, AI solutions, and strategic consulting for North American enterprises.', image: 'https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?auto=format&fit=crop&w=800&q=80', category: 'Company News', author: 'Yanabiya Group', date: '2026-01-15', published: true },
  { id: '2', title: 'Yanabiya IT Solutions Wins Enterprise Digital Transformation Award', slug: 'enterprise-digital-award', excerpt: 'Our IT division has been recognised for delivering excellence in enterprise digital transformation across the Gulf region.', content: 'Yanabiya IT Solutions has been awarded the Enterprise Digital Transformation Award for 2025 at the Gulf Tech Summit. This recognition reflects our team\'s commitment to delivering world-class software solutions to our clients across Oman and the wider Gulf region.', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80', category: 'Awards', author: 'Yanabiya Group', date: '2025-11-20', published: true },
  { id: '3', title: 'How AI is Transforming Business Operations in the Gulf', slug: 'ai-gulf-business', excerpt: 'Explore how artificial intelligence and automation are reshaping the business landscape across Oman and the wider Gulf region.', content: 'Artificial intelligence is no longer a future concept — it\'s reshaping how businesses operate today. At Yanabiya, we\'ve been at the forefront of implementing AI solutions for Gulf enterprises, from automated customer service systems to predictive analytics dashboards.', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80', category: 'Technology', author: 'Yanabiya IT Team', date: '2025-09-10', published: true },
])

/* ──────────────────────────────── COMMUNITY CARE ── */
seed('community-care', {
  intro: 'Yanabiya Charitable Foundation works to uplift communities across Oman, Bangladesh, the United Kingdom and the USA through education, healthcare, welfare and humanitarian initiatives.',
  initiatives: [
    { title: 'Education Support', body: 'Scholarships, school supplies and learning centres for underprivileged children across Bangladesh and Oman.', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80' },
    { title: 'Healthcare Programmes', body: 'Free medical camps, medicine distribution and health awareness drives for communities in need.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Orphan & Elderly Care', body: 'Supporting orphanages and elderly care homes with regular welfare visits and financial assistance.', image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=800&q=80' },
    { title: 'Humanitarian Relief', body: 'Emergency relief and food distribution during natural disasters and community crises.', image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80' },
  ],
  stats: [{ value: '1,000+', label: 'Lives Impacted' },{ value: '4', label: 'Countries' },{ value: '15+', label: 'Years Active' },{ value: '12+', label: 'Welfare Partners' }],
})

/* ──────────────────────────── SUSTAINABLE GROWTH ── */
seed('sustainable-growth', {
  intro: 'Yanabiya Group is committed to building a sustainable future — integrating environmental responsibility, social impact and ethical governance into every aspect of our business.',
  pillars: [
    { title: 'Environmental Responsibility', body: 'Reducing our carbon footprint through green technology adoption, paperless operations and sustainable procurement.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80' },
    { title: 'Social Impact', body: 'Investing in communities through education, healthcare, employment and charitable foundations.', image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80' },
    { title: 'Ethical Governance', body: 'Maintaining the highest standards of corporate governance, transparency and Shariah-compliant business practices.', image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80' },
    { title: 'Economic Growth', body: 'Creating jobs, nurturing local talent and contributing to the economic development of every country we operate in.', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' },
  ],
  goals: ['Achieve carbon neutrality across all operations by 2030','Create 500 new jobs across our four countries by 2027','Support 10,000 community members through welfare programmes by 2026','Establish green data centre operations in Oman and Bangladesh'],
})

/* ──────────────────────────────────── OUR STORY ── */
seed('our-story', {
  intro: 'From a small trading company in Dhaka to a multi-country international group — the Yanabiya story is one of vision, perseverance and principled growth.',
  milestones: [
    { year: '1998', title: 'Founded in Bangladesh', body: 'Yanabiya was established in Dhaka, Bangladesh as a trading and services company.' },
    { year: '2010', title: 'Regional Expansion', body: 'Expanded operations across South Asia, building a reputation for quality and reliability.' },
    { year: '2021', title: 'Oman Headquarters', body: 'Established Yanabiya Gulf International Business & Trade SPC in Muscat, Oman.' },
    { year: '2023', title: 'UK Operations', body: 'Launched Yanabiya Gulf International UK Ltd in London.' },
    { year: '2024', title: 'E-Commerce & Digital', body: 'Launched global e-commerce platform and expanded AI solutions portfolio.' },
    { year: '2025', title: 'USA Expansion', body: 'Established Yanabiya Gulf International US LLC in Austin, Texas.' },
  ],
})

/* ──────────────────────────────── OMAN PRESENCE ── */
seed('oman-presence', {
  intro: 'Yanabiya\'s Oman headquarters coordinates trade, contracting, technology and hospitality across the Sultanate through a network of seven partner companies.',
  partnerCompanies: [
    'Yanabiya Muscat United Trade',
    'Yanabiya Muscat for Comprehensive Projects',
    'Yanabiya Muscat Integrated LLC',
    'Yanabiya Al Khairat United Trade LLC',
    'Yanabiya Muscat World Business',
    'Yanabiya Muscat Al Mumyazat',
    'Yanabiya Al Rustaq Contracting',
  ],
})

/* ──────────────────────────── SETTINGS (site config) ── */
seed('settings', {
  maintenanceMode: false,
  googleAnalyticsId: '',
  metaTitle: 'Yanabiya Group — Built on Trust, Driven by Excellence',
  metaDescription: 'Yanabiya Group is a diversified international enterprise operating across technology, trade, talent and consulting in Oman, UK, Bangladesh and USA.',
  metaImage: '/yanabiya-website/images/logo.png',
})

console.log('\n✅ All sections seeded successfully!')
