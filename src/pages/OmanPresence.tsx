import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  HardHat, Truck, Laptop, TrendingUp, Coffee,
  Briefcase, Wrench, ArrowUpRight,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import BackButton from '../components/BackButton'
import { assets } from '../data/assets'

/* ───────────────────────── Helpers ───────────────────────── */

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

function SectionWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
    >
      <img
        src={assets.logo}
        alt=""
        className="w-[55%] max-w-[480px] opacity-[0.07] object-contain"
      />
    </div>
  )
}

/* ───────────────────────── Types ───────────────────────── */

type CountryCode = 'OM' | 'BD' | 'GB' | 'US'

type NodeAlign = 'left' | 'right'

type Capability = {
  icon: LucideIcon
  title: string
  /** items are { code?, name } — code is the official registry id when known */
  items: { code?: string; name: string }[]
}

type Partner = {
  name: string
  category: string
  x: number
  y: number
  align: NodeAlign
}

type CountryProfile = {
  code: CountryCode
  flag: string
  shortName: string
  hero: { eyebrow: string; title: string; subtitle: string }
  hq: { label: string; group: string; city: string; x: number; y: number }
  partners: Partner[]                  // empty array → single-HQ map
  mapNote: { fig: string; source: string }
  capabilityHeading: { eyebrow: string; title: string; subtitle: string }
  capabilities: { columnA?: { label: string; clusters: Capability[] }; columnB?: { label: string; clusters: Capability[] } }
  contact: {
    eyebrow: string
    title: string
    postal?: string[]                  // first column
    head: string[]                     // second column
  }
}

/* ───────────────────────── Country profiles ───────────────────────── */

/* OMAN — flagship hub. Content is byte-for-byte identical to the previous
 * single-country Oman page. */
const OMAN: CountryProfile = {
  code: 'OM',
  flag: '🇴🇲',
  shortName: 'Oman',
  hero: {
    eyebrow: 'Sultanate of Oman',
    title: 'Oman Global Presence',
    subtitle: 'Yanabiya Group — Integrated Business Network in Sultanate of Oman',
  },
  hq: { label: 'Muscat HQ', group: 'Yanabiya Group · Oman', city: 'Muscat', x: 80, y: 32 },
  partners: [
    { name: 'Yanabiya Muscat United Trade',                category: 'Trade & Commerce',     x: 70, y: 22, align: 'right' },
    { name: 'Yanabiya Muscat for Comprehensive Projects',  category: 'Construction',         x: 60, y: 18, align: 'right' },
    { name: 'Yanabiya Muscat Integrated LLC',              category: 'Diversified Holdings', x: 50, y: 30, align: 'right' },
    { name: 'Yanabiya Al Khairat United Trade LLC',        category: 'Trade & Commerce',     x: 86, y: 46, align: 'left'  },
    { name: 'Yanabiya Muscat World Business',              category: 'Business Services',    x: 72, y: 56, align: 'right' },
    { name: 'Yanabiya Muscat Al Mumyazat',                 category: 'Services',             x: 56, y: 62, align: 'right' },
    { name: 'Yanabiya Al Rustaq Contracting',              category: 'Contracting',          x: 38, y: 42, align: 'right' },
  ],
  mapNote: { fig: 'Fig. 01 · Group Network · Oman', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s regional growth.',
  },
  capabilities: {
    columnA: {
      label: 'Industrial Core',
      clusters: [
        {
          icon: HardHat,
          title: 'Infrastructure & Engineering',
          items: [
            { code: '410001', name: 'Construction of Buildings' },
            { code: '422002', name: 'Construction of Water, Electricity & Telephone Networks' },
            { code: '433003', name: 'Plastering, Painting & Decorating' },
            { code: '439008', name: 'Construction / Demolition Equipment Rental with Operator' },
            { code: '475207', name: 'Retail of Construction Materials' },
          ],
        },
        {
          icon: Truck,
          title: 'Logistics & Industrial Operations',
          items: [
            { code: '522401', name: 'Loading & Unloading of Goods' },
            { code: '829201', name: 'Packaging Activities' },
            { code: '521001', name: 'Cold & Frozen Warehousing' },
            { code: '501201', name: 'International Maritime Goods Transport' },
          ],
        },
      ],
    },
    columnB: {
      label: 'Business & Digital Core',
      clusters: [
        {
          icon: Laptop,
          title: 'Technology & Digital Systems',
          items: [
            { code: '474105', name: 'Retail of Software & Computer Accessories' },
            { code: '620101', name: 'Systems Analysis' },
            { code: '620103', name: 'Software Maintenance & Website Design' },
            { code: '620902', name: 'Installation of Computer Software' },
            { code: '620902', name: 'Development of Computer Network' },
            { code: '620204', name: 'IT & Cyber Security Consulting' },
            { code: '631101', name: 'Data Entry Services' },
            { code: '631103', name: 'Cloud & Hosting Services' },
            { code: '951100', name: 'Repair of Computers & Peripheral Equipment' },
            { code: '951201', name: 'Repair of Mobile Phones' },
          ],
        },
        {
          icon: TrendingUp,
          title: 'Trade & Commercial Services',
          items: [
            { code: '461001', name: 'Commission Agents & Brokerage Business' },
            { code: '461003', name: 'Export & Import Office Operations' },
            { code: '464102', name: 'Wholesale of Clothing & Clothing Accessories' },
            { code: '475101', name: 'Retail of Textiles & Fabrics' },
          ],
        },
        {
          icon: Coffee,
          title: 'Service & Hospitality',
          items: [
            { code: '561007', name: 'Cafés — Meals' },
            { code: '562901', name: 'Catering Activities' },
            { code: '563001', name: 'Cafés — Drinks' },
            { code: '701001', name: 'Management Offices' },
            { code: '812901', name: 'Specialised Building & Exterior Cleaning' },
          ],
        },
      ],
    },
  },
  contact: {
    eyebrow: 'Reach Us in Muscat',
    title: 'Contact.',
    postal: ['P.O. Box 1432, PC-133', 'Al Khuwair, Muscat'],
    head: ['Office-41, 4th Floor, Building-846', 'Way-4011, Complex-240', 'Al Gubrah, Bushar, Muscat, Oman'],
  },
}

const BANGLADESH: CountryProfile = {
  code: 'BD',
  flag: '🇧🇩',
  shortName: 'Bangladesh',
  hero: {
    eyebrow: 'People’s Republic of Bangladesh',
    title: 'Bangladesh Global Presence',
    subtitle: 'Yanabiya Group — Bangladesh Operations Hub',
  },
  hq: { label: 'Dhaka HQ', group: 'Yanabiya Gulf International BD Trade', city: 'Dhaka', x: 50, y: 50 },
  partners: [
    { name: 'Connet Online',                     category: 'Internet & Connectivity', x: 14, y: 14, align: 'right' },
    { name: 'Plexus Cloud',                      category: 'Cloud Services',          x: 32, y: 18, align: 'right' },
    { name: 'Gtech Aviation',                    category: 'Aviation',                x: 50, y: 12, align: 'right' },
    { name: 'Idea Tec',                          category: 'Technology',              x: 68, y: 18, align: 'right' },
    { name: 'Citylink Communication',            category: 'Communications',          x: 86, y: 14, align: 'left'  },
    { name: 'Eham WiFi',                         category: 'WiFi & Connectivity',     x: 8,  y: 32, align: 'right' },
    { name: 'Business Zone Limited Company',     category: 'Business Services',       x: 92, y: 32, align: 'left'  },
    { name: 'Trust Innovation Limited Company',  category: 'Technology',              x: 6,  y: 56, align: 'right' },
    { name: 'Xlink Limited Company',             category: 'Internet & Connectivity', x: 94, y: 56, align: 'left'  },
    { name: 'Dot Internet',                      category: 'Internet & ISP',          x: 10, y: 72, align: 'right' },
    { name: 'Zero Link',                         category: 'Connectivity',            x: 90, y: 72, align: 'left'  },
    { name: 'Global Communication Limited',      category: 'Communications',          x: 24, y: 86, align: 'right' },
    { name: 'Dot Exploration Ltd',               category: 'Tech Services',           x: 50, y: 90, align: 'right' },
    { name: 'Bongo WiFi',                        category: 'WiFi & Connectivity',     x: 76, y: 86, align: 'left'  },
  ],
  mapNote: { fig: 'Fig. 01 · Group Network · Bangladesh', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s South Asia delivery.',
  },
  capabilities: {
    columnA: {
      label: 'Industrial Core',
      clusters: [
        {
          icon: HardHat,
          title: 'Construction & Development',
          items: [
            { name: 'Civil Works' },
            { name: 'Infrastructure Projects' },
          ],
        },
      ],
    },
    columnB: {
      label: 'Business & Digital Core',
      clusters: [
        {
          icon: Laptop,
          title: 'Technology Services',
          items: [
            { name: 'IT Solutions' },
            { name: 'Software Development' },
          ],
        },
        {
          icon: TrendingUp,
          title: 'Trade Operations',
          items: [
            { name: 'Import / Export Support' },
            { name: 'Trading Network' },
          ],
        },
      ],
    },
  },
  contact: {
    eyebrow: 'Reach Us in Dhaka',
    title: 'Contact.',
    head: ['Office #211, Plot #322/B', 'Block #Kanchkura, Uttarkhan', 'Dhaka-1230, Bangladesh'],
  },
}

const UNITED_KINGDOM: CountryProfile = {
  code: 'GB',
  flag: '🇬🇧',
  shortName: 'UK',
  hero: {
    eyebrow: 'United Kingdom',
    title: 'UK Global Presence',
    subtitle: 'Yanabiya Group — European Operations Hub',
  },
  hq: { label: 'London HQ', group: 'Yanabiya Gulf International UK Ltd', city: 'London', x: 50, y: 50 },
  partners: [
    /* IT / Technology Services */
    { name: 'Infosys',                       category: 'IT Services',          x: 10, y: 8,  align: 'right' },
    { name: 'Tata Consultancy Services',     category: 'IT Services',          x: 32, y: 14, align: 'right' },
    { name: 'Wipro',                         category: 'IT Services',          x: 52, y: 6,  align: 'right' },
    { name: 'HCLTech',                       category: 'IT Services',          x: 72, y: 14, align: 'right' },
    { name: 'Tech Mahindra',                 category: 'IT Services',          x: 90, y: 8,  align: 'left'  },
    { name: '10Pearls',                      category: 'Software Development', x: 8,  y: 26, align: 'right' },
    { name: 'Systems Limited',               category: 'Software Engineering', x: 24, y: 32, align: 'right' },
    { name: 'Arpatech',                      category: 'IT & Cloud',           x: 76, y: 32, align: 'left'  },
    { name: 'Brain Station 23',              category: 'Software Development', x: 92, y: 26, align: 'left'  },
    { name: 'DataSoft Systems Bangladesh',   category: 'Software Solutions',   x: 6,  y: 42, align: 'right' },
    { name: 'REVE Systems',                  category: 'Telecom Software',     x: 94, y: 42, align: 'left'  },
    /* Trading & Retail */
    { name: 'Taj Stores',                    category: 'Grocery & Retail',     x: 6,  y: 58, align: 'right' },
    { name: 'Green Valley Supermarket',      category: 'Supermarket',          x: 94, y: 58, align: 'left'  },
    { name: 'Bangla Bazar Cash & Carry',     category: 'Wholesale',            x: 8,  y: 72, align: 'right' },
    { name: 'Bestway Group',                 category: 'Wholesale Group',      x: 92, y: 72, align: 'left'  },
    { name: 'East End Foods',                category: 'Foodservice',          x: 24, y: 78, align: 'right' },
    /* Hospitality / Restaurants */
    { name: 'Dishoom',                       category: 'Restaurants',          x: 76, y: 78, align: 'left'  },
    { name: 'Aladin Brick Lane',             category: 'Restaurants',          x: 10, y: 90, align: 'right' },
    { name: 'City Spice',                    category: 'Restaurants',          x: 32, y: 88, align: 'right' },
    { name: 'Tayyabs',                       category: 'Restaurants',          x: 68, y: 88, align: 'left'  },
    { name: 'Needoo Grill',                  category: 'Restaurants',          x: 90, y: 90, align: 'left'  },
  ],
  mapNote: { fig: 'Fig. 01 · Group Network · United Kingdom', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s European operations.',
  },
  capabilities: {
    columnA: {
      label: 'Business Core',
      clusters: [
        {
          icon: Laptop,
          title: 'Technology & Consulting',
          items: [
            { code: '62020', name: 'Information Technology Consultancy Activities' },
          ],
        },
        {
          icon: Briefcase,
          title: 'Professional Services',
          items: [
            { code: '74909', name: 'Other Professional, Scientific & Technical Activities' },
          ],
        },
      ],
    },
    columnB: {
      label: 'Industrial Core',
      clusters: [
        {
          icon: Wrench,
          title: 'Equipment & Leasing',
          items: [
            { code: '77390', name: 'Renting & Leasing of Other Machinery, Equipment & Tangible Goods' },
          ],
        },
      ],
    },
  },
  contact: {
    eyebrow: 'Reach Us in London',
    title: 'Contact.',
    head: ['167-169 Great Portland Street', '5th Floor, London, W1W 5PF', 'United Kingdom'],
  },
}

const USA: CountryProfile = {
  code: 'US',
  flag: '🇺🇸',
  shortName: 'USA',
  hero: {
    eyebrow: 'United States of America',
    title: 'USA Global Presence',
    subtitle: 'Yanabiya Group — North America Operations',
  },
  hq: { label: 'Austin HQ', group: 'Yanabiya Gulf International US LLC', city: 'Austin', x: 50, y: 50 },
  partners: [],
  mapNote: { fig: 'Fig. 01 · Group Network · United States', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s North America presence.',
  },
  capabilities: {
    columnA: {
      label: 'Business Core',
      clusters: [
        {
          icon: Laptop,
          title: 'Technology Advisory',
          items: [{ name: 'Cloud, AI & frontier-tech engagements' }],
        },
        {
          icon: Briefcase,
          title: 'Partnership Network',
          items: [{ name: 'US-market partnerships & advisory' }],
        },
      ],
    },
  },
  contact: {
    eyebrow: 'Reach Us in Austin',
    title: 'Contact.',
    head: ['5900 Balcones Drive #18651', 'Austin, TX 78731', 'United States of America'],
  },
}

const PROFILES: Record<CountryCode, CountryProfile> = {
  OM: OMAN,
  BD: BANGLADESH,
  GB: UNITED_KINGDOM,
  US: USA,
}

const TAB_ORDER: CountryCode[] = ['OM', 'GB', 'BD', 'US']

/* ───────────────────────── Capability cluster ───────────────────────── */

function CapabilityCluster({ c }: { c: Capability }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-300">
        <div className="flex items-center gap-3 min-w-0">
          <span className="grid place-items-center w-9 h-9 rounded-full border border-slate-300 text-slate-700">
            <c.icon size={16} strokeWidth={1.6} />
          </span>
          <h4 className="font-serif text-lg md:text-xl text-slate-900 leading-tight truncate">
            {c.title}
          </h4>
        </div>
        <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full
                         border border-slate-200 bg-slate-50 px-2.5 py-1
                         text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          <span className="text-slate-900 font-mono text-[10px]">
            {c.items.length.toString().padStart(2, '0')}
          </span>
          {c.items.length === 1 ? 'Activity' : 'Activities'}
        </span>
      </div>

      <ul className="divide-y divide-slate-100">
        {c.items.map((item, idx) => (
          <li
            key={`${item.code ?? 'noid'}-${idx}`}
            className="group/row grid grid-cols-[64px_1fr_16px] items-center gap-4
                       py-2 px-2 -mx-2 rounded-sm
                       transition-colors duration-200
                       hover:bg-blue-50/60 cursor-default"
          >
            <span className="font-mono text-[11px] tracking-wider text-slate-400
                             transition-colors duration-200
                             group-hover/row:text-blue-700/80">
              {item.code ?? '—'}
            </span>
            <span className="text-sm text-slate-800 leading-snug
                             transition-colors duration-200
                             group-hover/row:text-blue-700">
              {item.name}
            </span>
            <ArrowUpRight
              size={14}
              className="text-slate-300 opacity-0 -translate-x-1
                         transition-all duration-200
                         group-hover/row:opacity-100 group-hover/row:translate-x-0
                         group-hover/row:text-blue-700"
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───────────────────────── Country tabs ───────────────────────── */

/* Anchor-jump chips. Clicking smooth-scrolls to the matching country section
 * on the same page. The active chip is highlighted via scroll-spy. */
function CountryAnchorNav({ active }: { active: CountryCode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, code: CountryCode) => {
    e.preventDefault()
    const el = document.getElementById(code.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {TAB_ORDER.map((code) => {
        const p = PROFILES[code]
        const isActive = code === active
        return (
          <a
            key={code}
            href={`#${code.toLowerCase()}`}
            onClick={(e) => handleClick(e, code)}
            aria-current={isActive ? 'true' : undefined}
            className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2
                        text-xs font-semibold uppercase tracking-[0.22em]
                        transition-all duration-300
                        ${
                          isActive
                            ? 'bg-blue-700 text-white border-blue-700 shadow-md'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-blue-700 hover:text-blue-700'
                        }`}
          >
            <span className="text-base leading-none">{p.flag}</span>
            <span>{p.shortName}</span>
          </a>
        )
      })}
    </div>
  )
}

/* ───────────────────────── Single-country view ───────────────────────── */

function CountryView({ data, index = 0 }: { data: CountryProfile; index?: number }) {
  const showPartnerNetwork = data.partners.length > 0
  /* Alternate the map row: even index → text-left/map-right; odd → flipped. */
  const flipMap = index % 2 === 1
  return (
    <>
      {/* HERO */}
      <section className="relative">
        <SectionWatermark />
        <div className="relative container-x py-10 md:py-14 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-blue-700 mb-4">
              {data.hero.eyebrow}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
              {data.hero.title}
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {data.hero.subtitle}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-6 mx-auto w-12 h-px bg-slate-900" />
          </Reveal>
        </div>
      </section>

      {/* MAP — 2-col grid, text and map swap sides on alternate countries */}
      <section className="relative border-t border-slate-100">
        <SectionWatermark />
        <div className="relative container-x py-12 md:py-16">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* TEXT BLOCK */}
            <Reveal className={`lg:col-span-4 ${flipMap ? 'lg:order-2' : 'lg:order-1'}`}>
              <div>
                <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                  {showPartnerNetwork ? 'Partner Network' : 'Operations Hub'}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                  {showPartnerNetwork
                    ? `A unified group operating across ${data.hq.city}.`
                    : `${data.hq.city} operations hub.`}
                </h3>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {showPartnerNetwork
                    ? 'Strategic business entities operating under one integrated ecosystem — every venture connected back to the headquarters.'
                    : 'A single coordinated office anchoring the group’s presence in this market.'}
                </p>
              </div>
            </Reveal>

            {/* MAP BLOCK */}
            <Reveal delay={200} className={`lg:col-span-8 ${flipMap ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative w-full aspect-[16/8] bg-[#fafafa] border border-slate-100 rounded-sm">
              {/* Background outline + grid (stylised, not geographically literal) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 56.25"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                {data.code === 'OM' && (
                  <g
                    fill="none"
                    stroke="rgba(15,23,42,0.18)"
                    strokeWidth="0.18"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  >
                    <path d="M 8 18 Q 18 10 34 12 Q 50 13 64 14 Q 74 12 82 16 L 90 22 Q 94 28 92 36 L 88 44 Q 80 50 70 50 L 56 50 Q 42 50 30 46 L 18 40 Q 10 32 10 24 Z" />
                    <path d="M 78 6 Q 84 4 88 8 L 86 14 Q 80 14 78 10 Z" />
                    <path d="M 56 18 L 58 26 L 56 28 L 54 22 Z" />
                  </g>
                )}
                <g stroke="rgba(15,23,42,0.05)" strokeWidth="0.1">
                  {[12, 24, 36, 48].map((y) => (
                    <line key={`h-${y}`} x1="0" x2="100" y1={y} y2={y} />
                  ))}
                  {[20, 40, 60, 80].map((x) => (
                    <line key={`v-${x}`} x1={x} x2={x} y1="0" y2="56.25" />
                  ))}
                </g>
              </svg>

              {/* Connection lines (only when there are partners) */}
              {showPartnerNetwork && (
                <svg
                  aria-hidden="true"
                  viewBox="0 0 100 56.25"
                  className="absolute inset-0 w-full h-full overflow-visible"
                  preserveAspectRatio="none"
                >
                  {data.partners.map((p) => {
                    const x = p.x
                    const y = p.y * 0.5625
                    return (
                      <line
                        key={`${p.name}-base`}
                        x1={data.hq.x} y1={data.hq.y * 0.5625} x2={x} y2={y}
                        stroke="rgba(30,64,175,0.18)"
                        strokeWidth="0.12"
                      />
                    )
                  })}
                  {data.partners.map((p, i) => {
                    const x = p.x
                    const y = p.y * 0.5625
                    return (
                      <line
                        key={`${p.name}-flow`}
                        x1={x} y1={y} x2={data.hq.x} y2={data.hq.y * 0.5625}
                        stroke="rgba(30,64,175,0.55)"
                        strokeWidth="0.2"
                        strokeLinecap="round"
                        className="animate-svg-flow"
                        style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                      />
                    )
                  })}
                </svg>
              )}

              {/* HQ node */}
              <div
                className="absolute z-20"
                style={{ left: `${data.hq.x}%`, top: `${data.hq.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-blue-700/25"
                    style={{ animation: 'haloPulse 3s ease-in-out infinite' }}
                  />
                  <span className="relative block w-3 h-3 rounded-full bg-blue-700 ring-2 ring-white shadow" />
                </span>
              </div>
              <div
                className="absolute z-20 whitespace-nowrap"
                style={{ left: `${data.hq.x}%`, top: `${data.hq.y}%`, transform: 'translate(12px, -50%)' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700">
                  {data.hq.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 tracking-wide">
                  {data.hq.group}
                </div>
              </div>

              {/* Partner labels */}
              {data.partners.map((p) => (
                <div
                  key={p.name}
                  className="group absolute z-10 hover:z-30"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <span className="block w-1.5 h-1.5 rounded-full bg-slate-900
                                   transition-all duration-300
                                   group-hover:scale-150 group-hover:bg-blue-700" />
                  <div
                    className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap
                                ${p.align === 'right' ? 'left-3' : 'right-3 text-right'}`}
                  >
                    <div className="text-[11px] font-semibold text-slate-900 leading-tight
                                    transition-all duration-300
                                    group-hover:text-blue-700 group-hover:underline underline-offset-2">
                      {p.name}
                    </div>
                    <div className="text-[9px] uppercase tracking-[0.18em] text-slate-400 mt-0.5">
                      {p.category}
                    </div>
                  </div>
                </div>
              ))}

              {/* Editorial chrome */}
              <div className="absolute top-3 left-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-400">
                {data.mapNote.fig}
              </div>
              <div className="absolute bottom-3 right-4 text-[9px] font-semibold uppercase tracking-[0.25em] text-slate-300">
                {data.mapNote.source}
              </div>
            </div>
          </Reveal>
          </div>
        </div>
      </section>

      {/* CAPABILITY MATRIX */}
      <section className="relative border-t border-slate-100">
        <SectionWatermark />
        <div className="relative container-x py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                {data.capabilityHeading.eyebrow}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                {data.capabilityHeading.title}
              </h3>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {data.capabilityHeading.subtitle}
              </p>
            </div>
          </Reveal>

          <div className="mt-8 max-w-6xl grid lg:grid-cols-2 gap-x-12 gap-y-8 relative">
            {data.capabilities.columnA && data.capabilities.columnB && (
              <div
                aria-hidden="true"
                className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-slate-200"
              />
            )}

            {data.capabilities.columnA && (
              <div className={data.capabilities.columnB ? 'lg:pr-10' : ''}>
                <Reveal>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 mb-2">
                    Column A
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight">
                    {data.capabilities.columnA.label}
                  </h4>
                  <div className="mt-3 w-10 h-px bg-slate-900" />
                </Reveal>
                <div className="mt-6 space-y-6">
                  {data.capabilities.columnA.clusters.map((c, i) => (
                    <Reveal key={c.title} delay={i * 120}>
                      <CapabilityCluster c={c} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}

            {data.capabilities.columnB && (
              <div className={data.capabilities.columnA ? 'lg:pl-10' : ''}>
                <Reveal>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.32em] text-slate-500 mb-2">
                    Column B
                  </div>
                  <h4 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight">
                    {data.capabilities.columnB.label}
                  </h4>
                  <div className="mt-3 w-10 h-px bg-slate-900" />
                </Reveal>
                <div className="mt-6 space-y-6">
                  {data.capabilities.columnB.clusters.map((c, i) => (
                    <Reveal key={c.title} delay={i * 120}>
                      <CapabilityCluster c={c} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="relative border-t border-slate-100">
        <SectionWatermark />
        <div className="relative container-x py-12 md:py-16">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                {data.contact.eyebrow}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                {data.contact.title}
              </h3>
            </div>
          </Reveal>

          <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-6 max-w-4xl">
            {data.contact.postal && (
              <Reveal>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                    Postal Address
                  </div>
                  <div className="mt-3 w-8 h-px bg-slate-900/70" />
                  <p className="mt-4 text-slate-700 leading-relaxed">
                    {data.contact.postal.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < data.contact.postal!.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </Reveal>
            )}

            <Reveal delay={data.contact.postal ? 120 : 0}>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-blue-700">
                  Head Office
                </div>
                <div className="mt-3 w-8 h-px bg-slate-900/70" />
                <p className="mt-4 text-slate-700 leading-relaxed">
                  {data.contact.head.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < data.contact.head.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}

/* ───────────────────────── Page (top-level) ───────────────────────── */
/* All four branches render stacked on this single page. A sticky chip strip
 * scroll-spies the active country and jumps to its section on click. */

export default function OmanPresence() {
  const { code } = useParams<{ code: string }>()
  const [active, setActive] = useState<CountryCode>('OM')

  // On mount / URL change: scroll to the requested country section if any.
  useEffect(() => {
    const upper = (code?.toUpperCase() as CountryCode) ?? null
    if (upper && PROFILES[upper]) {
      // Defer one frame so the section has mounted.
      window.requestAnimationFrame(() => {
        const el = document.getElementById(upper.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [code])

  // Scroll-spy: highlight the chip whose section is closest to the top.
  useEffect(() => {
    const onScroll = () => {
      const probeY = window.scrollY + 200
      let next: CountryCode = TAB_ORDER[0]
      for (const c of TAB_ORDER) {
        const el = document.getElementById(c.toLowerCase())
        if (!el) continue
        if (el.offsetTop <= probeY) next = c
      }
      setActive((prev) => (prev === next ? prev : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="relative bg-white text-slate-900 overflow-hidden">
      <BackButton to="/#global" label="Back to Global" />

      {/* GLOBAL HERO */}
      <section className="relative">
        <SectionWatermark />
        <div className="relative container-x py-10 md:py-14 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-blue-700 mb-4">
              Global Presence
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-slate-900">
              Yanabiya Group
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-4 text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              International Business Network — every branch, on one page.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STICKY ANCHOR NAV — sits below the main navbar */}
      <div className="sticky top-[78px] z-30 bg-white/85 backdrop-blur border-y border-slate-200">
        <div className="container-x py-3">
          <CountryAnchorNav active={active} />
        </div>
      </div>

      {/* ALL COUNTRIES STACKED — every branch on the same page */}
      {TAB_ORDER.map((c, i) => (
        <section
          key={c}
          id={c.toLowerCase()}
          className="scroll-mt-[140px] border-t-2 border-slate-200"
        >
          <CountryView data={PROFILES[c]} index={i} />
        </section>
      ))}
    </main>
  )
}
