import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  HardHat, Truck, Laptop, TrendingUp, Coffee,
  Briefcase, Wrench, ArrowUpRight, MapPin,
  X as CloseIcon, Building2, Mail, Phone, Globe2,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import BackButton from '../components/BackButton'
import { assets } from '../data/assets'
import Contact from '../sections/Contact'

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

/* Premium scroll-card model: each card title + a pure-text item list that
 * vertically marquees inside a clipped frame. */
type CapabilityCard = { title: string; items: string[] }

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
  hero: { eyebrow: string; title: string; subtitle: string; tagline?: string }
  hq: { label: string; group: string; city: string; x: number; y: number }
  partners: Partner[]                  // empty array → single-HQ map
  mapNote: { fig: string; source: string }
  capabilityHeading: { eyebrow: string; title: string; subtitle: string }
  capabilities: {
    columnA?: { label: string; clusters: Capability[] }
    columnB?: { label: string; clusters: Capability[] }
    /** When present, renders the new 4-card scrolling layout instead of
     *  the columnA/B matrix. */
    cards?: CapabilityCard[]
  }
  contact: {
    eyebrow: string
    title: string
    postal?: string[]                  // first column
    head: string[]                     // second column
    /** Optional Google Maps integration. When present the Contact section
     *  becomes 2-col: address text on left, embedded map iframe on right,
     *  with a "View on Maps ↗" link out to the source. */
    map?: { embedQuery: string; openUrl: string }
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
    tagline: 'Connecting Businesses Across Borders',
    subtitle:
      'Yanabiya Group — Integrated Business Network in the Sultanate of Oman, where a unified partner network operates across Muscat under a single integrated ecosystem with every venture directly connected back to the headquarters, including Yanabiya Muscat United Trade, Yanabiya Muscat for Comprehensive Projects, Yanabiya Muscat Integrated LLC, Yanabiya Al Khairat United Trade LLC, Yanabiya Muscat World Business, Yanabiya Muscat Al Mumyazat, and Yanabiya Al Rustaq Contracting, forming a coordinated and strategically aligned business structure.',
  },
  hq: { label: 'Muscat HQ', group: 'Yanabiya Group · Oman', city: 'Muscat', x: 50, y: 50 },
  /* X-hierarchy layout — 7 partners distributed across 4 diagonal arms
   * (NE / NW / SE / SW) radiating from the HQ. Each arm has 1-2 depth
   * levels (inner / outer). Forms a clear X shape on the canvas. */
  partners: [
    /* NW arm */
    { name: 'Yanabiya Muscat United Trade',                category: 'Trade & Commerce',     x: 36, y: 32, align: 'right' },
    { name: 'Yanabiya Al Rustaq Contracting',              category: 'Contracting',          x: 18, y: 14, align: 'right' },
    /* NE arm */
    { name: 'Yanabiya Muscat for Comprehensive Projects',  category: 'Construction',         x: 64, y: 32, align: 'left'  },
    { name: 'Yanabiya Muscat Integrated LLC',              category: 'Diversified Holdings', x: 82, y: 14, align: 'left'  },
    /* SW arm */
    { name: 'Yanabiya Muscat Al Mumyazat',                 category: 'Services',             x: 36, y: 68, align: 'right' },
    /* SE arm */
    { name: 'Yanabiya Al Khairat United Trade LLC',        category: 'Trade & Commerce',     x: 64, y: 68, align: 'left'  },
    { name: 'Yanabiya Muscat World Business',              category: 'Business Services',    x: 82, y: 86, align: 'left'  },
  ],
  mapNote: { fig: 'Fig. 01 · Group Network · Oman', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s regional growth.',
  },
  capabilities: {
    /* 4-card scroll layout — each card vertically marquees its activities. */
    cards: [
      {
        title: 'Infrastructure & Engineering',
        items: [
          'Construction of Buildings',
          'Utility Networks',
          'Plastering & Decorating',
          'Equipment Rental',
          'Construction Materials Retail',
        ],
      },
      {
        title: 'Logistics & Warehousing',
        items: [
          'Loading & Unloading',
          'Packaging Operations',
          'Cold & Frozen Warehousing',
          'International Maritime Transport',
        ],
      },
      {
        title: 'Technology & Digital Systems',
        items: [
          'Software Development & Web Design',
          'Computer Network Development',
          'Cloud & Hosting Services',
          'Cyber Security Consulting',
          'Systems Analysis',
          'IT Consultancy',
          'Computer & Mobile Repair',
          'Data Entry Services',
          'Software & Hardware Retail',
        ],
      },
      {
        title: 'Trade, Service & Hospitality',
        items: [
          'Export & Import Operations',
          'Commission & Brokerage',
          'Wholesale Clothing & Accessories',
          'Retail Textiles & Fabrics',
          'Café Operations',
          'Catering Services',
          'Specialised Cleaning',
          'Management Offices',
        ],
      },
    ],
  },
  contact: {
    eyebrow: 'Reach Us in Muscat',
    title: 'Contact.',
    postal: ['P.O. Box 1432, PC-133', 'Al Khuwair, Muscat'],
    head: ['Office-41, 4th Floor, Building-846', 'Way-4011, Complex-240', 'Al Gubrah, Bushar, Muscat, Oman'],
    map: {
      embedQuery: 'Building 846, Way 4011, Al Gubrah, Bushar, Muscat, Oman',
      openUrl: 'https://maps.app.goo.gl/8kfKBHGkBEZ7ExsT9',
    },
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
  /* X-hierarchy: 14 partners on 4 diagonal arms, 3-4 depth levels each. */
  partners: [
    /* NW arm (3 levels) */
    { name: 'Connet Online',                     category: 'Internet & Connectivity', x: 38, y: 36, align: 'right' },
    { name: 'Plexus Cloud',                      category: 'Cloud Services',          x: 26, y: 22, align: 'right' },
    { name: 'Trust Innovation Limited Company',  category: 'Technology',              x: 14, y: 8,  align: 'right' },
    /* NE arm (3 levels) */
    { name: 'Idea Tec',                          category: 'Technology',              x: 62, y: 36, align: 'left'  },
    { name: 'Citylink Communication',            category: 'Communications',          x: 74, y: 22, align: 'left'  },
    { name: 'Business Zone Limited Company',     category: 'Business Services',       x: 86, y: 8,  align: 'left'  },
    /* SW arm (4 levels) */
    { name: 'Eham WiFi',                         category: 'WiFi & Connectivity',     x: 38, y: 64, align: 'right' },
    { name: 'Dot Internet',                      category: 'Internet & ISP',          x: 26, y: 78, align: 'right' },
    { name: 'Global Communication Limited',      category: 'Communications',          x: 14, y: 92, align: 'right' },
    /* SE arm (4 levels) */
    { name: 'Xlink Limited Company',             category: 'Internet & Connectivity', x: 62, y: 64, align: 'left'  },
    { name: 'Zero Link',                         category: 'Connectivity',            x: 74, y: 78, align: 'left'  },
    { name: 'Bongo WiFi',                        category: 'WiFi & Connectivity',     x: 86, y: 92, align: 'left'  },
    /* Two extras placed at the cardinal axes for balance */
    { name: 'Dot Exploration Ltd',               category: 'Tech Services',           x: 50, y: 92, align: 'right' },
    { name: 'Gtech Aviation',                    category: 'Aviation',                x: 50, y: 8,  align: 'right' },
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
    tagline: 'Bridging Markets Across Europe',
    subtitle:
      'Yanabiya Group — European Operations Hub, where 21 trusted partners across IT services, retail, and hospitality connect through the London office to deliver scalable cross-border value.',
  },
  hq: { label: 'London HQ', group: 'Yanabiya Gulf International UK Ltd', city: 'London', x: 50, y: 50 },
  /* X-hierarchy — 21 partners over 4 diagonal arms (~5 each) by category cluster:
   *   NW = IT giants, NE = subcontinent IT/dev, SW = trading/retail,
   *   SE = hospitality/restaurants. */
  partners: [
    /* NW arm — global IT giants */
    { name: 'Infosys',                       category: 'IT Services',          x: 40, y: 38, align: 'right' },
    { name: 'Tata Consultancy Services',     category: 'IT Services',          x: 32, y: 30, align: 'right' },
    { name: 'Wipro',                         category: 'IT Services',          x: 24, y: 22, align: 'right' },
    { name: 'HCLTech',                       category: 'IT Services',          x: 16, y: 14, align: 'right' },
    { name: 'Tech Mahindra',                 category: 'IT Services',          x: 8,  y: 6,  align: 'right' },
    /* NE arm — subcontinent software houses */
    { name: '10Pearls',                      category: 'Software Development', x: 60, y: 38, align: 'left'  },
    { name: 'Systems Limited',               category: 'Software Engineering', x: 68, y: 30, align: 'left'  },
    { name: 'Arpatech',                      category: 'IT & Cloud',           x: 76, y: 22, align: 'left'  },
    { name: 'Brain Station 23',              category: 'Software Development', x: 84, y: 14, align: 'left'  },
    { name: 'DataSoft Systems Bangladesh',   category: 'Software Solutions',   x: 92, y: 6,  align: 'left'  },
    { name: 'REVE Systems',                  category: 'Telecom Software',     x: 50, y: 8,  align: 'right' },
    /* SW arm — trading & retail */
    { name: 'Taj Stores',                    category: 'Grocery & Retail',     x: 40, y: 62, align: 'right' },
    { name: 'Green Valley Supermarket',      category: 'Supermarket',          x: 32, y: 70, align: 'right' },
    { name: 'Bangla Bazar Cash & Carry',     category: 'Wholesale',            x: 24, y: 78, align: 'right' },
    { name: 'Bestway Group',                 category: 'Wholesale Group',      x: 16, y: 86, align: 'right' },
    { name: 'East End Foods',                category: 'Foodservice',          x: 8,  y: 94, align: 'right' },
    /* SE arm — hospitality */
    { name: 'Dishoom',                       category: 'Restaurants',          x: 60, y: 62, align: 'left'  },
    { name: 'Aladin Brick Lane',             category: 'Restaurants',          x: 68, y: 70, align: 'left'  },
    { name: 'City Spice',                    category: 'Restaurants',          x: 76, y: 78, align: 'left'  },
    { name: 'Tayyabs',                       category: 'Restaurants',          x: 84, y: 86, align: 'left'  },
    { name: 'Needoo Grill',                  category: 'Restaurants',          x: 92, y: 94, align: 'left'  },
  ],
  mapNote: { fig: 'Fig. 01 · Group Network · United Kingdom', source: 'Source: Yanabiya Group' },
  capabilityHeading: {
    eyebrow: 'Capability Matrix',
    title: 'Core Business Capabilities.',
    subtitle: 'Integrated operational sectors driving Yanabiya Group’s European operations.',
  },
  capabilities: {
    /* 4-card scroll layout — UK partner clusters as scrolling activity lists */
    cards: [
      {
        title: 'IT Services & Consulting',
        items: [
          'Information Technology Consultancy',
          'Enterprise IT Strategy',
          'Cloud & Infrastructure Advisory',
          'Cyber Security Consulting',
          'Software & Systems Integration',
          'Digital Transformation',
        ],
      },
      {
        title: 'Professional Services',
        items: [
          'Scientific & Technical Activities',
          'Business Advisory',
          'Cross-border Consulting',
          'Market Entry Support',
          'Compliance & Regulatory',
        ],
      },
      {
        title: 'Equipment & Leasing',
        items: [
          'Machinery Renting & Leasing',
          'Tangible Goods Leasing',
          'Equipment Procurement',
          'Asset Management',
        ],
      },
      {
        title: 'Trade, Retail & Hospitality',
        items: [
          'Wholesale & Retail Trading',
          'Foodservice & Catering',
          'Restaurant Operations',
          'Brand Distribution',
          'Supply Chain Coordination',
        ],
      },
    ],
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

/* ───────────────────────── Capability scroll card ───────────────────────── */
/* Premium white card with title + vertical marquee of activity names.
 * Items render twice for a seamless loop. Pauses on hover with a slight
 * scale lift. Even-index cards run slower than odd ones for asymmetric
 * "premium feel" called out in the spec. */
function CapabilityScrollCard({ card, index }: { card: CapabilityCard; index: number }) {
  const speed = index % 2 === 0 ? 22 : 16
  return (
    <div
      className="group relative h-full rounded-2xl bg-white border border-slate-200/90
                 p-6 md:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04)]
                 transition-all duration-500
                 hover:scale-[1.02] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
    >
      <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-blue-700 mb-2">
        0{index + 1}
      </div>
      <h4 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight">
        {card.title}
      </h4>
      <div className="mt-3 w-8 h-px bg-slate-900/70" />

      {/* Marquee viewport — clipped, vertically scrolling */}
      <div className="relative mt-5 h-[260px] overflow-hidden">
        <div
          className="flex flex-col animate-vertical-marquee group-hover:[animation-play-state:paused]"
          style={{ animationDuration: `${speed}s` }}
        >
          {[...card.items, ...card.items].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="py-2.5 border-b border-slate-100 flex items-baseline gap-3
                         text-sm text-brand-deep font-semibold leading-snug"
            >
              <span aria-hidden className="block w-1 h-1 rounded-full bg-brand-deep/70 shrink-0 translate-y-[-2px]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        {/* Top + bottom fade masks for the marquee */}
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

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

/* Horizontal moving country marquee — sits below the hero subtitle.
 * Each chip is a small branch card: flag medallion + country name + HQ
 * city + partner count chip. List is doubled for a seamless loop. */
function CountryMarquee({ active }: { active: CountryCode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, code: CountryCode) => {
    e.preventDefault()
    const el = document.getElementById(code.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const loop = [...TAB_ORDER, ...TAB_ORDER]
  return (
    <div className="group relative w-full overflow-hidden py-1">
      <div
        className="flex items-stretch gap-4 w-max animate-marquee marquee-pause"
        style={{ animationDuration: '40s' }}
      >
        {loop.map((code, idx) => {
          const p = PROFILES[code]
          const isActive = code === active
          const partnerCount = p.partners.length
          return (
            <a
              key={`${code}-${idx}`}
              href={`#${code.toLowerCase()}`}
              onClick={(e) => handleClick(e, code)}
              aria-current={isActive ? 'true' : undefined}
              className={`shrink-0 group/chip flex items-center gap-3 px-4 py-3 rounded-2xl
                          border bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]
                          transition-all duration-300
                          hover:-translate-y-0.5 hover:shadow-md
                          ${
                            isActive
                              ? 'border-brand-deep bg-brand-deep/5'
                              : 'border-slate-200 hover:border-brand-deep/40'
                          }`}
            >
              {/* Flag medallion */}
              <div className={`shrink-0 w-10 h-10 rounded-full bg-white grid place-items-center
                               text-xl shadow-sm ring-2 transition-colors duration-300
                               ${isActive ? 'ring-brand-deep' : 'ring-slate-200 group-hover/chip:ring-brand-deep/40'}`}>
                {p.flag}
              </div>
              {/* Name + city stack */}
              <div className="text-left">
                <div className={`font-serif text-sm font-bold leading-tight whitespace-nowrap
                                 ${isActive ? 'text-brand-deep' : 'text-slate-900'}`}>
                  {p.shortName}
                </div>
                <div className="text-[9px] uppercase tracking-[0.22em] text-slate-500 mt-0.5">
                  {p.hq.city}
                </div>
              </div>
              {/* Partner count badge */}
              <div className="shrink-0 ml-1 inline-flex items-center gap-1
                              rounded-full bg-slate-100 px-2 py-0.5
                              text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                <span className="font-mono text-[10px] text-brand-deep">
                  {partnerCount.toString().padStart(2, '0')}
                </span>
                {partnerCount === 1 ? 'Branch' : 'Partners'}
              </div>
            </a>
          )
        })}
      </div>
      {/* edge fades */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white via-white/95 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none" />
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
      {/* HERO + ACTIVITIES — 40 / 60 editorial split (text left, capabilities right) */}
      <section className="relative">
        <SectionWatermark />
        <div className="relative container-x py-10 md:py-14">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">

            {/* TEXT BLOCK — 40% (left on even index, right on odd) */}
            <div className={`lg:col-span-5 ${flipMap ? 'lg:order-2' : 'lg:order-1'}`}>
              <Reveal>
                <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-blue-700 mb-4">
                  {data.hero.eyebrow}
                </div>
              </Reveal>
              <Reveal delay={120}>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-[44px] leading-[1.05] tracking-tight text-slate-900">
                  {data.hero.title}
                </h2>
              </Reveal>
              {data.hero.tagline && (
                <Reveal delay={200}>
                  <div className="mt-3 font-serif italic text-xl md:text-2xl text-brand-accentDark leading-snug">
                    {data.hero.tagline}
                  </div>
                </Reveal>
              )}
              <Reveal delay={300}>
                <p className="mt-5 text-base text-slate-600 leading-relaxed text-justify">
                  {data.hero.subtitle}
                </p>
              </Reveal>
              <Reveal delay={420}>
                <div className="mt-6 w-12 h-px bg-slate-900" />
              </Reveal>
            </div>

            {/* ORBIT BLOCK — 60% (right on even index, left on odd) */}
            <Reveal delay={200} className={`lg:col-span-7 ${flipMap ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="group/map relative w-full aspect-[16/8] bg-[#fafafa] border border-slate-100 rounded-sm">
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
                {/* X-hierarchy guide arms — faint dark-green diagonals from HQ to corners */}
                {showPartnerNetwork && (
                  <g stroke="rgba(15,58,35,0.20)" strokeWidth="0.18" strokeDasharray="0.6 0.5">
                    <line x1="0"   y1="0"     x2={data.hq.x} y2={data.hq.y * 0.5625} />
                    <line x1="100" y1="0"     x2={data.hq.x} y2={data.hq.y * 0.5625} />
                    <line x1="0"   y1="56.25" x2={data.hq.x} y2={data.hq.y * 0.5625} />
                    <line x1="100" y1="56.25" x2={data.hq.x} y2={data.hq.y * 0.5625} />
                  </g>
                )}
              </svg>

              {/* HQ node — STATIC at the centre */}
              <div
                className="absolute z-20"
                style={{ left: `${data.hq.x}%`, top: `${data.hq.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <span className="relative inline-flex">
                  <span
                    className="absolute inset-0 rounded-full bg-brand-accent/45"
                    style={{ animation: 'haloPulse 3s ease-in-out infinite' }}
                  />
                  <span className="relative block w-4 h-4 rounded-full bg-brand-deep ring-2 ring-brand-accent shadow-[0_0_14px_rgba(158,199,58,0.65)]" />
                </span>
              </div>
              <div
                className="absolute z-20 whitespace-nowrap"
                style={{ left: `${data.hq.x}%`, top: `${data.hq.y}%`, transform: 'translate(14px, -50%)' }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
                  {data.hq.label}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5 tracking-wide">
                  {data.hq.group}
                </div>
              </div>

              {/* ORBITAL CONSTELLATION — connection lines + partner chips
                  rotate together around the HQ. Each chip's inner content
                  counter-rotates so the text stays upright. Hovering anywhere
                  in the map area pauses both rotations in sync (no merge,
                  no spin — just frozen). */}
              {showPartnerNetwork && (
                <div
                  className="absolute inset-0 pointer-events-none animate-orbit-ring
                             group-hover/map:[animation-play-state:paused]"
                  style={{ transformOrigin: `${data.hq.x}% ${data.hq.y}%` }}
                >
                  {/* Connection lines — short stub (max ~2 inches) extending
                      from each partner toward the HQ. Long full-length lines
                      reaching all the way to the centre were too noisy; we
                      now clamp the segment to MAX_LEN viewBox units. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 56.25"
                    className="absolute inset-0 w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                  >
                    {data.partners.map((p, i) => {
                      const px = p.x
                      const py = p.y * 0.5625
                      const hx = data.hq.x
                      const hy = data.hq.y * 0.5625
                      const dx = hx - px
                      const dy = hy - py
                      const len = Math.sqrt(dx * dx + dy * dy)
                      const MAX_LEN = 14   // ≈ 2 inches at typical map width
                      const t = len > 0 ? Math.min(1, MAX_LEN / len) : 0
                      const ex = px + dx * t
                      const ey = py + dy * t
                      return (
                        <g key={p.name}>
                          {/* Static base — dark green */}
                          <line
                            x1={px} y1={py} x2={ex} y2={ey}
                            stroke="rgba(15,58,35,0.45)"
                            strokeWidth="0.16"
                          />
                          {/* Flowing signal — mint */}
                          <line
                            x1={px} y1={py} x2={ex} y2={ey}
                            stroke="rgba(158,199,58,0.95)"
                            strokeWidth="0.22"
                            strokeLinecap="round"
                            className="animate-svg-flow"
                            style={{ animationDelay: `${i * 0.5}s`, animationDuration: '5s' }}
                          />
                        </g>
                      )
                    })}
                  </svg>

                  {/* Partner chips — orbit with parent, counter-rotate inner content */}
                  {data.partners.map((p) => (
                    <div
                      key={p.name}
                      className="group absolute z-10 pointer-events-auto hover:z-30"
                      style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                      {/* Counter-rotate so text reads upright while travelling */}
                      <div className="animate-orbit-ring-counter
                                      group-hover/map:[animation-play-state:paused]">
                        {/* Anchor dot — dark green default, mint on hover */}
                        <span className="block w-2 h-2 rounded-full bg-brand-deep
                                         ring-2 ring-brand-accent/60
                                         transition-all duration-300
                                         group-hover:scale-150 group-hover:bg-brand-accent
                                         group-hover:ring-brand-deep
                                         group-hover:shadow-[0_0_10px_rgba(158,199,58,0.7)]" />
                        {/* Chip pill — dark green border + text, mint accent dot */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap
                                      ${p.align === 'right' ? 'left-3' : 'right-3'}`}
                        >
                          <div
                            className={`inline-flex items-center gap-1 px-2 py-[2px] rounded
                                        bg-white/95 backdrop-blur-sm border border-brand-deep/30
                                        shadow-[0_1px_2px_rgba(15,58,35,0.08)]
                                        transition-all duration-300
                                        group-hover:border-brand-deep group-hover:bg-brand-accent/15
                                        group-hover:shadow-[0_8px_24px_-8px_rgba(158,199,58,0.55)]
                                        group-hover:-translate-y-0.5`}
                          >
                            <span className="block w-[4px] h-[4px] rounded-full bg-brand-accent" />
                            <span className="text-[10px] font-bold text-brand-deep leading-tight
                                             transition-colors duration-300">
                              {p.name}
                            </span>
                          </div>
                          {/* Category — visible on chip hover only */}
                          <div className={`text-[9px] uppercase tracking-[0.18em] text-brand-deep/65 mt-0.5
                                           opacity-0 -translate-y-1
                                           transition-all duration-300
                                           group-hover:opacity-100 group-hover:translate-y-0
                                           ${p.align === 'right' ? 'pl-1.5' : 'pr-1.5 text-right'}`}>
                            {p.category}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

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

          {/* If country has the new 4-card scroll layout, render that.
              Otherwise fall back to the legacy column matrix. */}
          {data.capabilities.cards ? (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5">
              {data.capabilities.cards.map((card, i) => (
                <Reveal key={card.title} delay={i * 120}>
                  <CapabilityScrollCard card={card} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* CONTACT — text on left, optional Google Maps embed on right */}
      <section className="relative border-t border-slate-100">
        <SectionWatermark />
        <div className="relative container-x py-12 md:py-16">
          <div className={`grid gap-8 lg:gap-12 items-start ${data.contact.map ? 'lg:grid-cols-12' : ''}`}>

            {/* LEFT — address text */}
            <div className={data.contact.map ? 'lg:col-span-6' : 'max-w-md lg:max-w-lg'}>
              <Reveal>
                <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-blue-700 mb-3">
                  {data.contact.eyebrow}
                </div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight text-slate-900">
                  {data.contact.title}
                </h3>
              </Reveal>

              <div className="mt-8 space-y-8">
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

            {/* RIGHT — embedded Google Map (only when contact.map is provided) */}
            {data.contact.map && (
              <Reveal delay={200} className="lg:col-span-6">
                <div className="group relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-slate-200 shadow-sm">
                  <iframe
                    title={`Map of ${data.hq.city} office`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(data.contact.map.embedQuery)}&output=embed`}
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* Hover/touch overlay — red MapPin + Yanabiya logo badge */}
                  <div className="absolute inset-0 z-10 grid place-items-center
                                  bg-red-600/15 backdrop-blur-[1px]
                                  opacity-0 group-hover:opacity-100 group-focus-within:opacity-100
                                  transition-opacity duration-300 pointer-events-none">
                    <div className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl
                                    bg-white/95 shadow-2xl ring-2 ring-red-500/70">
                      <div className="relative">
                        <MapPin
                          size={42}
                          className="text-red-600 drop-shadow"
                          strokeWidth={1.6}
                          fill="currentColor"
                        />
                        <img
                          src={assets.logo}
                          alt=""
                          className="absolute top-[6px] left-1/2 -translate-x-1/2 w-5 h-5 object-contain rounded-sm bg-white"
                        />
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-900">
                        Yanabiya Group
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={data.contact.map.openUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]
                             text-blue-700 hover:text-blue-900 transition-colors"
                >
                  View on Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </Reveal>
            )}

          </div>
        </div>
      </section>
    </>
  )
}

/* ───────────────────────── Country detail slide-in panel ───────────────────────── */
/* Glassmorphic dashboard panel that slides in from the right when a tree
 * branch card is clicked. Shows the full corporate profile we have on the
 * country: flag + name, parent entity, HQ city, address lines, status,
 * and the complete partner list with categories. ESC + backdrop click
 * close it. Body scroll locked while open. */

function CountryDetailPanel({
  data,
  onClose,
}: {
  data: CountryProfile | null
  onClose: () => void
}) {
  useEffect(() => {
    if (!data) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [data, onClose])

  if (!data) return null

  const status =
    data.partners.length === 0
      ? { label: 'Launching', tone: 'bg-amber-500/15 text-amber-400 ring-amber-500/30' }
      : { label: 'Active', tone: 'bg-brand-accent/20 text-brand-accent ring-brand-accent/40' }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${data.shortName} corporate profile`}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />

      {/* Panel */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-full w-full sm:w-[460px] md:w-[520px]
                   bg-brand-deep text-white shadow-[0_0_60px_rgba(0,0,0,0.5)]
                   border-l border-brand-accent/30
                   overflow-y-auto
                   animate-[fadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]"
        style={{ animationName: 'slideInRight' }}
      >
        {/* Glow accents */}
        <div aria-hidden="true" className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-0 -right-20 w-[360px] h-[360px] rounded-full bg-brand-accentDark/15 blur-[120px] pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full
                     bg-white/10 hover:bg-white/20 backdrop-blur-md
                     border border-white/20
                     grid place-items-center text-white/80 hover:text-white
                     transition-colors"
        >
          <CloseIcon size={16} />
        </button>

        <div className="relative p-7 md:p-8 space-y-7">

          {/* Header: flag + name + status */}
          <div>
            <div className="text-[10px] font-semibold tracking-[0.32em] uppercase text-brand-accent mb-2">
              Country Profile
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/10 grid place-items-center text-2xl ring-2 ring-brand-accent/40">
                {data.flag}
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-2xl md:text-3xl leading-tight">
                  {data.shortName}
                </h3>
                <div className="text-xs text-white/65 mt-0.5">
                  {data.hero.eyebrow}
                </div>
              </div>
            </div>
            <div className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1
                             text-[10px] font-bold uppercase tracking-[0.22em]
                             ring-1 ${status.tone}`}>
              <span className="block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {status.label}
            </div>
          </div>

          {/* Corporate facts */}
          <div className="space-y-4 text-sm">
            <ProfileRow icon={Building2} label="Parent Company" value={data.hq.group} />
            <ProfileRow icon={MapPin}    label="Headquarters"  value={data.hq.city} />
            <ProfileRow icon={Globe2}    label="Region"        value={data.hero.eyebrow} />
            {data.contact.head && (
              <ProfileRow
                icon={MapPin}
                label="Address"
                value={data.contact.head.join(', ')}
              />
            )}
            {data.contact.postal && (
              <ProfileRow
                icon={Mail}
                label="Postal"
                value={data.contact.postal.join(', ')}
              />
            )}
            <ProfileRow
              icon={Phone}
              label="Group Switchboard"
              value="+968 2249 5566"
            />
          </div>

          {/* Partner network */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-accent">
                Partner Network
              </div>
              <span className="text-[10px] font-mono font-bold text-white/60">
                {data.partners.length.toString().padStart(2, '0')} entities
              </span>
            </div>
            {data.partners.length > 0 ? (
              <ul className="space-y-2">
                {data.partners.map((p) => (
                  <li
                    key={p.name}
                    className="rounded-lg bg-white/[0.05] border border-white/10
                               px-3 py-2 hover:bg-white/[0.10] hover:border-brand-accent/40
                               transition-colors"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <div className="text-[12px] font-semibold leading-tight">
                        {p.name}
                      </div>
                      <div className="shrink-0 text-[8.5px] uppercase tracking-[0.18em] text-brand-accent/80">
                        {p.category}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-lg bg-white/[0.04] border border-white/10 px-4 py-5 text-center">
                <div className="text-[11px] uppercase tracking-[0.22em] text-amber-400/90 font-bold">
                  Operations Launching
                </div>
                <div className="text-xs text-white/55 mt-1">
                  Local entity registered — partner network onboarding in progress.
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

function ProfileRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-8 h-8 rounded-lg bg-white/[0.06] ring-1 ring-white/15
                      grid place-items-center text-brand-accent">
        <Icon size={14} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.25em] text-white/55 font-semibold">
          {label}
        </div>
        <div className="text-sm text-white/90 mt-0.5 leading-snug break-words">
          {value}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Company Tree ───────────────────────── */
/* Single tree visualisation: HQ root at the top, 4 country branches in a
 * row, partner names listed under each. Replaces the four stacked country
 * sections with one compact view of the whole group. */

/* Mock activity feed per country — 'live' updates that animate beside each branch */
const ACTIVITY_FEED: Record<CountryCode, { label: string; meta: string }[]> = {
  OM: [
    { label: 'Group HQ sync completed',   meta: '2 min ago · Live' },
    { label: 'Gulf trade route operational', meta: 'Active · Tier 1' },
    { label: 'New partner onboarded',     meta: '1 hr ago' },
  ],
  GB: [
    { label: 'EMEA expansion activated',  meta: '5 min ago · Live' },
    { label: 'London office sync online', meta: 'Active · Tier 1' },
    { label: 'IT consultancy queue +3',   meta: '14 min ago' },
  ],
  BD: [
    { label: 'South Asia delivery active', meta: '12 min ago · Live' },
    { label: 'New partner onboarded',     meta: '1 hr ago' },
    { label: 'Engineering throughput +8%',meta: 'Today' },
  ],
  US: [
    { label: 'Austin entity registered',  meta: 'Today · New' },
    { label: 'Operations launching',      meta: 'Q4 2026' },
    { label: 'Network onboarding',        meta: 'In Progress' },
  ],
}

/* Compact radial network diagram showing the country's partners as nodes
 * around a central country pulse. Limits to first 8 partners with +N badge. */
function PartnerRadialNetwork({ data }: { data: CountryProfile }) {
  const partners = data.partners.slice(0, 8)
  const overflow = data.partners.length - partners.length
  const radius = 38   // % of container
  const centerX = 50
  const centerY = 50

  return (
    <div className="relative w-full aspect-square max-w-[320px] mx-auto">
      {/* Connection lines — partner → centre */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        {partners.map((_, i) => {
          const angle = (i / Math.max(partners.length, 1)) * Math.PI * 2 - Math.PI / 2
          const x = centerX + Math.cos(angle) * radius
          const y = centerY + Math.sin(angle) * radius
          return (
            <g key={i}>
              <line
                x1={centerX} y1={centerY} x2={x} y2={y}
                stroke="rgba(158,199,58,0.32)"
                strokeWidth="0.4"
              />
              <line
                x1={centerX} y1={centerY} x2={x} y2={y}
                stroke="rgba(158,199,58,0.85)"
                strokeWidth="0.45"
                strokeLinecap="round"
                className="animate-svg-flow"
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: '4.5s' }}
              />
            </g>
          )
        })}
      </svg>

      {/* Centre — country flag + name */}
      <div className="absolute z-10" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <div className="relative">
          <span className="absolute inset-0 rounded-full bg-brand-accent/35 blur-md animate-pulse" />
          <div className="relative w-16 h-16 rounded-full bg-brand-deep grid place-items-center
                          text-2xl ring-2 ring-brand-accent shadow-[0_0_18px_rgba(158,199,58,0.5)]">
            {data.flag}
          </div>
        </div>
      </div>

      {/* Partner nodes — small pulsing dots with hover-revealed name */}
      {partners.map((p, i) => {
        const angle = (i / Math.max(partners.length, 1)) * Math.PI * 2 - Math.PI / 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius
        const onLeft = x < 50
        return (
          <div
            key={p.name}
            className="group absolute z-20"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
            title={p.name}
          >
            <span className="relative inline-flex">
              <span
                className="absolute inset-0 rounded-full bg-brand-accent/40"
                style={{ animation: `haloPulse 3s ease-in-out ${i * 0.3}s infinite` }}
              />
              <span className="relative block w-2.5 h-2.5 rounded-full bg-brand-accent
                               ring-2 ring-brand-deep
                               group-hover:scale-150 transition-transform duration-300
                               group-hover:shadow-[0_0_10px_rgba(158,199,58,0.9)]" />
            </span>
            {/* Hover label */}
            <div className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200
                             ${onLeft ? 'right-4' : 'left-4'}`}>
              <span className="inline-block px-2 py-0.5 rounded bg-brand-deep text-brand-accent
                               text-[9px] font-bold uppercase tracking-[0.18em]
                               shadow-md">
                {p.name}
              </span>
            </div>
          </div>
        )
      })}

      {/* Overflow badge */}
      {overflow > 0 && (
        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-full
                        bg-brand-deep/80 backdrop-blur border border-brand-accent/40
                        text-[9px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          +{overflow} more
        </div>
      )}
    </div>
  )
}

/* Country block: full glassmorphic card with header + radial network + count */
function CountryNetworkCard({
  data,
  onClick,
}: {
  data: CountryProfile
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group block w-full text-left rounded-2xl
                 bg-white/[0.05] backdrop-blur-md border border-white/10
                 p-5 md:p-6
                 transition-all duration-500
                 hover:bg-white/[0.08] hover:border-brand-accent/40 hover:-translate-y-1
                 hover:shadow-[0_30px_60px_-20px_rgba(158,199,58,0.35)]"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 ring-2 ring-brand-accent/40
                        grid place-items-center text-2xl
                        group-hover:ring-brand-accent transition-colors duration-300">
          {data.flag}
        </div>
        <div className="min-w-0 flex-1">
          <div className="font-serif text-lg font-bold text-white leading-tight">
            {data.shortName}
          </div>
          <div className="text-[9px] uppercase tracking-[0.22em] text-brand-accent/85 mt-0.5">
            {data.hq.city} · {data.hero.eyebrow}
          </div>
        </div>
        <div className="shrink-0 inline-flex items-center gap-1 rounded-full
                        bg-brand-accent/15 border border-brand-accent/40
                        px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.18em]
                        text-brand-accent">
          <span className="font-mono text-[10px]">
            {data.partners.length.toString().padStart(2, '0')}
          </span>
          Partners
        </div>
      </div>

      <div className="mt-4">
        <PartnerRadialNetwork data={data} />
      </div>

      <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em]
                      text-brand-accent/70 group-hover:text-brand-accent transition-colors">
        View Full Profile →
      </div>
    </button>
  )
}

/* Activity feed beside a country — looks like a live log */
function ActivityFeed({ code, isRight }: { code: CountryCode; isRight: boolean }) {
  const items = ACTIVITY_FEED[code] ?? []
  return (
    <div className={`text-${isRight ? 'left' : 'right'}`}>
      <div className={`text-[10px] font-semibold tracking-[0.32em] uppercase text-brand-accent mb-3
                       inline-flex items-center gap-2`}>
        <span className="block w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
        Live Activity
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li
            key={it.label}
            className={`rounded-lg bg-white/[0.04] backdrop-blur-sm border border-white/10
                        px-3 py-2 transition-all duration-300
                        hover:bg-white/[0.08] hover:border-brand-accent/30`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="text-[12px] text-white/90 font-semibold leading-tight">
              {it.label}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] text-brand-accent/70 mt-0.5">
              {it.meta}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function CompanyTree({ onSelect }: { onSelect: (code: CountryCode) => void }) {
  return (
    <div className="relative max-w-6xl mx-auto py-6">

      {/* ROOT — Yanabiya Group HQ */}
      <Reveal>
        <div className="flex justify-center">
          <div className="relative inline-flex flex-col items-center gap-2 rounded-2xl
                          bg-brand-deep text-white px-8 py-6 shadow-2xl
                          ring-4 ring-brand-accent/40">
            <span className="absolute -inset-1 rounded-2xl bg-brand-accent/15 blur-xl animate-pulse pointer-events-none" />
            <div className="relative text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-accent">
              Yanabiya Group
            </div>
            <div className="relative font-serif text-2xl md:text-3xl leading-tight">
              Parent · Group HQ
            </div>
            <div className="relative text-[10px] uppercase tracking-[0.22em] text-white/65">
              Sultanate of Oman · Est. Muscat
            </div>
          </div>
        </div>
      </Reveal>

      {/* ZIGZAG — vertical spine with alternating country/activity rows */}
      <div className="relative mt-14 pb-4">
        {/* Centre spine */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-px
                     bg-gradient-to-b from-brand-accent/50 via-brand-accent/25 to-transparent"
        />

        <div className="space-y-16">
          {TAB_ORDER.map((code, i) => {
            const p = PROFILES[code]
            const isRight = i % 2 === 0   // OM right, UK left, BD right, USA left
            return (
              <Reveal key={code} delay={i * 110}>
                <div className="relative grid md:grid-cols-2 gap-6 md:gap-10 items-center">

                  {/* Spine dot — pulsing */}
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                               w-4 h-4 rounded-full bg-brand-accent z-10
                               ring-4 ring-brand-deep shadow-[0_0_18px_rgba(158,199,58,0.7)]"
                  >
                    <span className="absolute inset-0 rounded-full bg-brand-accent animate-ping opacity-50" />
                  </span>

                  {/* Country card on one side */}
                  <div className={isRight ? 'md:order-2' : 'md:order-1'}>
                    <CountryNetworkCard data={p} onClick={() => onSelect(code)} />
                  </div>

                  {/* Activity feed on opposite side */}
                  <div className={isRight ? 'md:order-1' : 'md:order-2'}>
                    <ActivityFeed code={code} isRight={!isRight} />
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Page (top-level) ───────────────────────── */

export default function OmanPresence() {
  const { code } = useParams<{ code: string }>()
  const [selected, setSelected] = useState<CountryCode | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  // If the URL came in as /country/<code>, auto-open that country's panel.
  useEffect(() => {
    const upper = (code?.toUpperCase() as CountryCode) ?? null
    if (upper && PROFILES[upper]) setSelected(upper)
  }, [code])

  return (
    <main className="relative bg-brand-deep text-white overflow-hidden">
      <BackButton to="/#global" label="Back to Global" />

      {/* Ambient dark-theme glow layer */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-brand-accent/10 blur-[160px]" />
        <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[560px] h-[560px] rounded-full bg-brand-accentDark/8 blur-[140px]" />
      </div>

      {/* GLOBAL HERO */}
      <section className="relative">
        <div className="relative container-x py-10 md:py-14 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accent mb-4">
              Global Network · Live
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white">
              Yanabiya Group
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-4 text-base md:text-lg text-white/65 max-w-3xl mx-auto leading-relaxed">
              Connecting Opportunities. Building Global Businesses.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ZIGZAG NETWORK MAP — HQ + alternating country/activity rows */}
      <section className="relative border-t border-white/10">
        <div className="relative container-x py-10 md:py-14">
          <CompanyTree onSelect={(c) => setSelected(c)} />
        </div>
      </section>

      {/* FULL CONTACT SECTION (back to white surface) */}
      <div className="border-t-2 border-white/10 bg-white text-slate-900 relative z-10">
        <Contact />
      </div>

      {/* SLIDE-IN COUNTRY DETAIL PANEL */}
      <CountryDetailPanel
        data={selected ? PROFILES[selected] : null}
        onClose={() => setSelected(null)}
      />
    </main>
  )
}
