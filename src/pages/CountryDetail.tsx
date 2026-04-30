import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Clock, ArrowRight, Globe2, Send,
  Briefcase, Cpu, Ship, Handshake, Building2, Users,
  Trophy, TrendingUp, Sparkles, Plane, Boxes,
  type LucideIcon,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { countries } from '../data/countries'
import { contactByCountry } from '../data/contact'
import { useReveal } from '../hooks/useReveal'

const MAP_BASE = `${import.meta.env.BASE_URL}maps/`

/* Maps each licensed activity (by trade-classification code) to the
 * matching division / sub-service page under /business/. Lets a
 * visitor jump from "Cyber Security Consulting" on the country page
 * straight to the IT Software → Cyber Security sub-page. */
const ACTIVITY_TO_BUSINESS: Record<string, string> = {
  // Office Management & facilities
  '701001': '/business/office-management',
  '812901': '/business/office-management',
  '410001': '/business/office-management',
  '422002': '/business/office-management',
  '433003': '/business/office-management',
  '439008': '/business/office-management',
  '475207': '/business/office-management',
  '561007': '/business/office-management',
  '563001': '/business/office-management',
  '562901': '/business/office-management',
  // Export-Import & logistics
  '522401': '/business/export-import',
  '829201': '/business/export-import',
  '461003': '/business/export-import',
  '501201': '/business/export-import/freight-forwarding',
  '521001': '/business/export-import/cold-chain-cargo',
  // Clothing
  '464102': '/business/clothing',
  '475101': '/business/clothing',
  // Agents & Brokerage
  '461001': '/business/agents-brokerage',
  // IT Software
  '474105': '/business/it-software',
  '951100': '/business/it-software',
  '620902': '/business/it-software/custom-software-development',
  '620903': '/business/it-software',
  '631103': '/business/it-software/aws-services',
  '620101': '/business/it-software/data-analytics',
  '620103': '/business/it-software/web-design-development',
  '620204': '/business/it-software/cyber-security',
  '631101': '/business/it-software',
  '951201': '/business/it-software',
}

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

type Stat = { label: string; value: string; icon: LucideIcon }
type Service = { label: string; desc: string; icon: LucideIcon; image?: string }

/** Shared real-life photo per service category. Used on every country
 *  card so the service blocks read as real-world scenery instead of
 *  abstract icons. */
const SERVICE_IMAGE: Record<string, string> = {
  Trade: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=600&q=80',
  Tech: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
  Shipping: 'https://images.unsplash.com/photo-1494412574745-e1e7c8faa40d?auto=format&fit=crop&w=600&q=80',
  Deals: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80',
  Office: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  Mobility: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
}
type Presence = { name: string; city: string; type: 'HQ' | 'Branch' | 'Network' | 'Partner' }
type Achievement = { title: string; body: string; icon: LucideIcon }

interface CountryDashboard {
  subtitle: string
  yearsActive: string
  /** Hierarchy tier ,used in the hero pill alongside the flag. */
  tier: { rank: string; label: string }
  stats: Stat[]
  services: Service[]
  presence: Presence[]
  achievements: Achievement[]
}

/** Flag-derived accent palette for the page background. Each country
 *  gets its own ambient blob colours pulled from its national flag. */
const COUNTRY_BG: Record<string, { blobs: { className: string }[] }> = {
  OM: {
    blobs: [
      { className: 'absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-red-700/8 blur-[160px]' },
      { className: 'absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-emerald-600/8 blur-[160px]' },
      { className: 'absolute bottom-0 left-1/3 w-[640px] h-[640px] rounded-full bg-white/8 blur-[160px]' },
    ],
  },
  GB: {
    blobs: [
      { className: 'absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-blue-800/10 blur-[160px]' },
      { className: 'absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-red-700/8 blur-[160px]' },
      { className: 'absolute bottom-0 left-1/3 w-[640px] h-[640px] rounded-full bg-slate-100/8 blur-[160px]' },
    ],
  },
  BD: {
    blobs: [
      // Green field ,large blobs around the edges to dominate the canvas
      { className: 'absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-emerald-600/7 blur-[160px]' },
      { className: 'absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-700/10 blur-[160px]' },
      { className: 'absolute -bottom-40 -left-40 w-[640px] h-[640px] rounded-full bg-emerald-600/9 blur-[160px]' },
      { className: 'absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-emerald-700/9 blur-[160px]' },
      // Red roundel ,centred, mirroring the flag's red disc
      { className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] rounded-full bg-red-600/14 blur-[120px]' },
    ],
  },
  US: {
    blobs: [
      { className: 'absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-red-700/7 blur-[160px]' },
      { className: 'absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-slate-100/9 blur-[160px]' },
      { className: 'absolute bottom-0 left-1/3 w-[640px] h-[640px] rounded-full bg-red-600/9 blur-[160px]' },
    ],
  },
}

const COUNTRY_DASHBOARDS: Record<string, CountryDashboard> = {
  OM: {
    subtitle: 'Global business presence in Oman ,group headquarters & multi-sector operations.',
    yearsActive: '4+',
    tier: { rank: 'Tier 01', label: 'Group Headquarters' },
    stats: [
      { label: 'Years Active', value: '4+', icon: Clock },
      { label: 'Active Projects', value: '50+', icon: Briefcase },
      { label: 'Business Partners', value: '80+', icon: Handshake },
      { label: 'Clients Served', value: '200+', icon: Users },
    ],
    services: [
      { label: 'Trade', desc: 'Import / Export', icon: Boxes },
      { label: 'Tech', desc: 'Software / AI', icon: Cpu },
      { label: 'Shipping', desc: 'Cargo / Delivery', icon: Ship },
      { label: 'Deals', desc: 'Partnerships', icon: Handshake },
      { label: 'Office', desc: 'Support / Admin', icon: Building2 },
      { label: 'Mobility', desc: 'Work / Visa help', icon: Plane },
    ],
    presence: [
      { name: 'Muscat HQ', city: 'Al Gubrah, Muscat', type: 'HQ' },
      { name: 'Business Operations Center', city: 'Al Khuwair, Muscat', type: 'Branch' },
      { name: 'Partner Network', city: 'Across Oman', type: 'Network' },
    ],
    achievements: [
      { title: 'First Overseas HQ', body: 'Group headquarters established 2021 in Muscat', icon: Trophy },
      { title: '7 Partner Companies', body: 'Diversified portfolio across multiple sectors', icon: TrendingUp },
      { title: 'Multi-Sector Reach', body: 'IT, trade, mobility, retail & construction', icon: Sparkles },
    ],
  },
  GB: {
    subtitle: 'Global business presence in the United Kingdom ,European operations & strategic gateway.',
    yearsActive: '2+',
    tier: { rank: 'Tier 03', label: 'Strategic Hub' },
    stats: [
      { label: 'Years Active', value: '2+', icon: Clock },
      { label: 'Active Projects', value: '15+', icon: Briefcase },
      { label: 'Business Partners', value: '25+', icon: Handshake },
      { label: 'Clients Served', value: '60+', icon: Users },
    ],
    services: [
      { label: 'Tech', desc: 'Software / Consulting', icon: Cpu },
      { label: 'Deals', desc: 'Partnerships', icon: Handshake },
      { label: 'Office', desc: 'Support / Admin', icon: Building2 },
      { label: 'Mobility', desc: 'Work / Student visa', icon: Plane },
    ],
    presence: [
      { name: 'London HQ', city: 'Great Portland St, London', type: 'HQ' },
      { name: 'EU/UK Partner Network', city: 'Across UK', type: 'Network' },
    ],
    achievements: [
      { title: 'European Gateway', body: 'EU/UK operations live since June 2023', icon: Trophy },
      { title: 'London HQ', body: 'Prime W1 Central London base', icon: TrendingUp },
      { title: 'Cross-Border Deals', body: 'Bridging Gulf, EU & North America', icon: Sparkles },
    ],
  },
  BD: {
    subtitle: 'Global business presence in Bangladesh ,group’s longest-running entity, full-spectrum operations since 1998.',
    yearsActive: '27+',
    tier: { rank: 'Tier 02', label: 'Established Hub' },
    stats: [
      { label: 'Years Active', value: '27+', icon: Clock },
      { label: 'Active Projects', value: '50+', icon: Briefcase },
      { label: 'Business Partners', value: '80+', icon: Handshake },
      { label: 'Clients Served', value: '200+', icon: Users },
    ],
    services: [
      { label: 'Trade', desc: 'Sourcing / Export', icon: Boxes },
      { label: 'Tech', desc: 'Engineering / QA', icon: Cpu },
      { label: 'Shipping', desc: 'Cargo / Logistics', icon: Ship },
      { label: 'Deals', desc: 'Partnerships', icon: Handshake },
      { label: 'Office', desc: 'Support / Admin', icon: Building2 },
      { label: 'Mobility', desc: 'Recruitment / Training', icon: Plane },
    ],
    presence: [
      { name: 'Dhaka HQ', city: 'Uttarkhan, Dhaka', type: 'HQ' },
      { name: 'Operations Office', city: 'Dhaka', type: 'Branch' },
      { name: 'Manufacturing Network', city: 'Across Bangladesh', type: 'Network' },
    ],
    achievements: [
      { title: '27+ Years in Business', body: 'Group’s longest-running entity, since 1998', icon: Trophy },
      { title: 'Manufacturing Hub', body: 'Garments, sourcing & QA at scale', icon: TrendingUp },
      { title: 'Talent Engine', body: 'Engineering & recruitment for the group', icon: Sparkles },
    ],
  },
  US: {
    subtitle: 'Global business presence in the United States ,North America operations.',
    yearsActive: '<1',
    tier: { rank: 'Tier 04', label: 'Emerging Hub' },
    stats: [
      { label: 'Years Active', value: '<1', icon: Clock },
      { label: 'Active Projects', value: '5+', icon: Briefcase },
      { label: 'Business Partners', value: '10+', icon: Handshake },
      { label: 'Clients Served', value: '20+', icon: Users },
    ],
    services: [
      { label: 'Tech', desc: 'Cloud / AI', icon: Cpu },
      { label: 'Deals', desc: 'Partnerships', icon: Handshake },
      { label: 'Office', desc: 'Support / Admin', icon: Building2 },
      { label: 'Mobility', desc: 'Work-visa advisory', icon: Plane },
    ],
    presence: [
      { name: 'Austin Office', city: 'Balcones Dr, Austin TX', type: 'HQ' },
      { name: 'North America Network', city: 'Across USA', type: 'Network' },
    ],
    achievements: [
      { title: 'Newest Hub', body: 'North America entity formed August 2025', icon: Trophy },
      { title: 'Texas Base', body: 'Austin ,fast-growing tech corridor', icon: TrendingUp },
      { title: 'AI & Cloud Focus', body: 'Frontier-model & AWS engagements', icon: Sparkles },
    ],
  },
}

export default function CountryDetail({ codeOverride }: { codeOverride?: string } = {}) {
  const { code: paramCode } = useParams<{ code: string }>()
  const code = codeOverride ?? paramCode
  const upper = (code ?? '').toUpperCase()
  const country = countries.find((c) => c.code === upper)
  const contact = contactByCountry.find((c) => c.code === upper)
  const dash = COUNTRY_DASHBOARDS[upper]

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [code])

  if (!country || !dash) {
    return (
      <main className="bg-[#fbfdfb] text-slate-900 min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accent mb-3">
            404
          </div>
          <h2 className="font-serif text-3xl text-brand-deep mb-3">Country not found.</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accent hover:text-brand-accent"
          >
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  const c = country
  const otherCountries = countries.filter((o) => o.code !== c.code)
  const mapUrl = `${MAP_BASE}${c.code.toLowerCase()}.svg`
  const flagUrl = `${MAP_BASE}flags/${c.code.toLowerCase()}.svg`
  const parentCompany = (c as { parentCompany?: string }).parentCompany
  const entitiesLabel = (c as { entitiesLabel?: string }).entitiesLabel ?? 'Operating Entities'
  const activities = (c as {
    activities?: { code: string; name: string; icon?: string; image?: string }[]
  }).activities

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Shared About-Us style brand card — opens every country page
       *  with the same forest-green / 3D-logo language as the home
       *  About section. Below this, the country's specific dashboard
       *  (services, hierarchy, leadership, contact) continues. */}
      <PageHero
        eyebrow="Global Presence"
        title={
          <>
            {c.flag} {c.name}
          </>
        }
        subtitle={`${c.role} — ${c.address}`}
      />

      {/* Ambient glow blobs ,coloured from the country's flag palette */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {(COUNTRY_BG[c.code]?.blobs ?? COUNTRY_BG.OM.blobs).map((b, i) => (
          <div key={i} className={b.className} />
        ))}
      </div>

      {/* ───────── 1. HERO (country-specific dashboard banner) ───────── */}
      <Hero country={c} dash={dash} mapUrl={mapUrl} flagUrl={flagUrl} />

      {/* ───────── 3. WHAT WE DO ,3D SERVICE BLOCKS ───────── */}
      <ServiceBlocks services={dash.services} countryName={c.name} />

      {/* ───────── 4. CORPORATE HIERARCHY (parent + partner companies) ───────── */}
      <CorporateHierarchy
        countryName={c.name}
        parentCompany={parentCompany ?? c.entities[0]}
        entities={c.entities}
        entitiesLabel={entitiesLabel}
        hasParent={Boolean(parentCompany)}
      />

      {/* ───────── 4c. BUSINESS ACTIVITIES (only for entities with activities) ───────── */}
      {activities && activities.length > 0 && (
        <BusinessActivities activities={activities} />
      )}

      {/* ───────── 5. 3D GLOBAL CONNECTION ───────── */}
      <GlobalConnection
        currentCode={c.code}
        currentFlagUrl={flagUrl}
        currentMapUrl={mapUrl}
        otherCountries={otherCountries}
      />

      {/* ───────── 6. ACHIEVEMENTS ───────── */}
      <Achievements achievements={dash.achievements} />

      {/* ───────── 7. CONTACT ───────── */}
      <ContactSection country={c} contact={contact} />
    </main>
  )
}

/* ────────────────────────────────────────────────────────────────────────── */

function Hero({
  country,
  dash,
}: {
  country: typeof countries[number]
  dash: CountryDashboard
  mapUrl: string
  flagUrl: string
}) {
  return (
    <section className="relative min-h-[70vh] flex items-center">
      {/* Floating orbit lines (decorative ,flag silhouette removed per
       *  user request) */}
      <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
        <div className="absolute w-[60%] aspect-square rounded-full border border-slate-200 animate-spin-slow" />
        <div className="absolute w-[80%] aspect-square rounded-full border border-brand-accent/20"
             style={{ animation: 'spin-slow 80s linear reverse infinite' }} />
      </div>

      {/* Floating particles */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        {[
          { top: '15%', left: '20%', size: 'w-1.5 h-1.5', delay: '0s' },
          { top: '30%', left: '80%', size: 'w-1 h-1', delay: '0.6s' },
          { top: '65%', left: '15%', size: 'w-1 h-1', delay: '1.2s' },
          { top: '75%', left: '85%', size: 'w-1.5 h-1.5', delay: '1.8s' },
          { top: '50%', left: '50%', size: 'w-1 h-1', delay: '2.4s' },
          { top: '20%', left: '60%', size: 'w-1 h-1', delay: '3s' },
        ].map((p, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-brand-accent shadow-[0_0_8px_rgba(158,199,58,0.9)] ${p.size}`}
            style={{ top: p.top, left: p.left, animation: `haloPulse 4s ease-in-out ${p.delay} infinite` }}
          />
        ))}
      </div>

      <div className="container-x relative z-10 max-w-5xl mx-auto text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="px-2.5 py-1 rounded-full
                             bg-brand-accent text-brand-deep
                             text-[10px] font-black tracking-[0.28em] uppercase">
              {dash.tier.rank}
            </span>
            <span className="px-3 py-1 rounded-full
                             bg-slate-100 backdrop-blur-md ring-1 ring-brand-accent/25
                             text-[11px] font-bold tracking-[0.32em] uppercase text-brand-accent inline-flex items-center gap-2">
              <span className="text-base leading-none">{country.flag}</span>
              {dash.tier.label}
            </span>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-brand-deep">
            {country.name.replace('Sultanate of ', '').replace('United States of America', 'USA')}
            <span className="text-brand-accent"> Operations</span>
          </h1>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-7 text-base md:text-lg text-brand-accentDark leading-snug max-w-2xl mx-auto text-justify">
            {dash.subtitle}
          </p>
        </Reveal>
      </div>
    </section>
  )
}


function ServiceBlocks({ services, countryName }: { services: Service[]; countryName: string }) {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              What we do
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">
              Services in {countryName.replace('Sultanate of ', '').replace('United States of America', 'the US')}
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {services.map((s, i) => {
            const photo = s.image ?? SERVICE_IMAGE[s.label]
            return (
              <Reveal key={s.label} delay={i * 80}>
                <div className="group relative rounded-2xl overflow-hidden
                                bg-white border border-slate-200
                                shadow-[0_8px_24px_rgba(15,58,35,0.08)]
                                transition-all duration-500
                                hover:border-brand-accent/55 hover:-translate-y-1
                                hover:shadow-[0_18px_42px_rgba(158,199,58,0.2)]">
                  {/* Real-life photo banner */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    {photo && (
                      <img
                        src={photo}
                        alt={s.label}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover
                                   transition-transform duration-700
                                   group-hover:scale-110"
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/55 via-brand-deep/10 to-transparent" />
                    <div className="absolute top-2 left-2 inline-flex items-center
                                    px-2 py-0.5 rounded-full
                                    bg-white/90 ring-1 ring-brand-accent/35
                                    text-[9px] font-bold uppercase tracking-[0.22em] text-brand-deep">
                      {s.label}
                    </div>
                  </div>
                  {/* Description */}
                  <div className="p-4 flex items-center gap-3">
                    <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-accent/15 grid place-items-center text-brand-accent
                                    ring-1 ring-brand-accent/30
                                    transition-all duration-300
                                    group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-brand-deep">
                      <s.icon size={16} />
                    </div>
                    <div className="text-sm md:text-base font-semibold text-brand-deep leading-snug">
                      {s.desc}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CorporateHierarchy({
  countryName,
  parentCompany,
  entities,
  entitiesLabel,
  hasParent,
}: {
  countryName: string
  parentCompany: string
  entities: string[]
  entitiesLabel: string
  hasParent: boolean
}) {
  const partners = hasParent ? entities : []
  const shortName = countryName.replace('Sultanate of ', '').replace('United States of America', 'USA')
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              Corporate Hierarchy
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">
              Group structure in {shortName}
            </h2>
          </div>
        </Reveal>

        {/* Parent / registered entity */}
        <Reveal>
          <div className="relative mx-auto max-w-2xl rounded-2xl
                          bg-gradient-to-br from-brand-accent/15 via-white/[0.05] to-transparent
                          backdrop-blur-md border border-brand-accent/45
                          p-6 md:p-7 text-center
                          shadow-[0_18px_42px_rgba(158,199,58,0.18)]">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full
                            bg-brand-accent text-slate-900
                            text-[9px] font-black tracking-[0.32em] uppercase">
              {hasParent ? 'Parent Company' : 'Registered Entity'}
            </div>
            <div className="mt-4 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
              {parentCompany}
            </div>
          </div>
        </Reveal>

        {/* Connecting tree lines + partner companies */}
        {partners.length > 0 && (
          <>
            {/* Trunk + horizontal branch ,visual tree connector from
             *  parent card down to the top row of partner cards. */}
            <div aria-hidden="true" className="relative mx-auto max-w-2xl mt-2 mb-3">
              <div className="mx-auto w-px h-8 bg-brand-accent/50" />
              <div className="mx-auto w-[60%] h-px bg-brand-accent/40" />
              <div className="absolute left-[20%] top-8 w-px h-4 bg-brand-accent/40" />
              <div className="absolute left-[50%] top-8 w-px h-4 bg-brand-accent/40" />
              <div className="absolute left-[80%] top-8 w-px h-4 bg-brand-accent/40" />
            </div>
            <Reveal delay={120}>
              <div className="text-center mb-5 inline-flex items-center justify-center gap-2 w-full">
                <span className="px-2 py-0.5 rounded-full bg-brand-accent text-brand-deep
                                 text-[11px] font-black tracking-wider">
                  {String(partners.length).padStart(2, '0')}
                </span>
                <span className="text-[10px] font-bold tracking-[0.32em] uppercase text-brand-accentDark">
                  {entitiesLabel}
                </span>
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {partners.map((entity, i) => (
                <Reveal key={entity} delay={i * 60}>
                  <div className="relative rounded-xl
                                  bg-gradient-to-br from-brand-accent/10 via-white/[0.03] to-transparent
                                  backdrop-blur-md border border-brand-accent/25
                                  p-4 transition-all duration-500
                                  hover:border-brand-accent/55 hover:-translate-y-0.5
                                  hover:bg-slate-50
                                  hover:shadow-[0_12px_28px_rgba(158,199,58,0.18)]">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 grid place-items-center w-7 h-7 rounded-md
                                       bg-brand-accent text-brand-deep
                                       font-mono text-[10px] font-bold">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-brand-deep leading-snug">
                        {entity}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

function BusinessActivities({
  activities,
}: {
  activities: { code: string; name: string; icon?: string; image?: string }[]
}) {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              Licensed Activities
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">
              {activities.length} business activities under our licence
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {activities.map((a, i) => {
            const linkTo = ACTIVITY_TO_BUSINESS[a.code]
            const cardInner = (
              <>
                {/* Real-life photo banner */}
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                  {a.image && (
                    <img
                      src={a.image}
                      alt={a.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700
                                 group-hover:scale-110"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute top-2 right-2 inline-flex items-center gap-1
                                  px-1.5 py-0.5 rounded-full
                                  bg-white/70 backdrop-blur-sm
                                  ring-1 ring-brand-accent/30
                                  font-mono text-[9px] text-brand-accentDark">
                    {a.code}
                  </div>
                  <span className="absolute bottom-2 left-2 text-2xl leading-none drop-shadow-md">
                    {a.icon ?? '•'}
                  </span>
                </div>
                {/* Activity name */}
                <div className="p-3.5 flex items-start justify-between gap-2">
                  <div className="text-[12px] font-semibold text-brand-deep leading-snug min-w-0 flex-1">
                    {a.name}
                  </div>
                  {linkTo && (
                    <ArrowRight
                      size={12}
                      className="shrink-0 mt-1 text-brand-accent/80
                                 transition-all duration-300
                                 group-hover:translate-x-1 group-hover:text-brand-accent"
                    />
                  )}
                </div>
              </>
            )
            const cardClass = `group relative rounded-xl overflow-hidden
                              bg-white shadow-sm backdrop-blur-md border border-slate-200
                              transition-all duration-500
                              hover:border-brand-accent/55 hover:-translate-y-1
                              hover:shadow-[0_18px_42px_rgba(158,199,58,0.25)]
                              ${linkTo ? 'cursor-pointer' : ''}`
            return (
              <Reveal key={a.code} delay={i * 30}>
                {linkTo ? (
                  <Link to={linkTo} aria-label={`Open ${a.name}`} className={`${cardClass} block`}>
                    {cardInner}
                  </Link>
                ) : (
                  <div className={cardClass}>{cardInner}</div>
                )}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GlobalConnection({
  currentCode,
  currentFlagUrl,
  currentMapUrl,
  otherCountries,
}: {
  currentCode: string
  currentFlagUrl: string
  currentMapUrl: string
  otherCountries: typeof countries
}) {
  const positions = ['top-[14%] left-1/2 -translate-x-1/2', 'top-1/2 left-[12%] -translate-y-1/2', 'bottom-[14%] left-1/2 -translate-x-1/2']
  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              Global Connection
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">One unified network</h2>
            <p className="mt-3 text-sm text-slate-700 max-w-xl mx-auto">
              Linked to every other Yanabiya hub by daily collaboration, shared
              clients, and a single delivery playbook.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div className="relative aspect-square w-full max-w-[560px] mx-auto
                          rounded-full
                          bg-gradient-to-br from-slate-900 via-blue-950/80 to-slate-900
                          ring-1 ring-slate-200 shadow-2xl
                          overflow-hidden">
            {/* Decorative orbit rings */}
            <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
              {[0.92, 0.7, 0.42].map((s, i) => (
                <div
                  key={i}
                  className="absolute rounded-full border border-slate-200"
                  style={{
                    width: `${s * 100}%`,
                    height: `${s * 100}%`,
                    animation: `spin-slow ${30 + i * 20}s linear ${i % 2 === 0 ? 'normal' : 'reverse'} infinite`,
                  }}
                />
              ))}
            </div>

            {/* Connection lines from centre to each peripheral country */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full pointer-events-none"
            >
              {[
                { x: 50, y: 14 },
                { x: 12, y: 50 },
                { x: 50, y: 86 },
              ].map((pos, i) => (
                <line
                  key={i}
                  x1="50" y1="50" x2={pos.x} y2={pos.y}
                  stroke="rgba(158,199,58,0.55)"
                  strokeWidth="0.4"
                  strokeDasharray="0.8 1.2"
                  style={{ animation: `dividerGrow 5s ease-in-out ${i * 0.4}s infinite` }}
                />
              ))}
            </svg>

            {/* Centre ,current country silhouette filled with flag */}
            <div className="absolute inset-0 grid place-items-center pointer-events-none">
              <div
                className="w-32 h-32 md:w-36 md:h-36"
                style={{
                  WebkitMaskImage: `url(${currentMapUrl})`,
                  maskImage: `url(${currentMapUrl})`,
                  WebkitMaskSize: 'contain',
                  maskSize: 'contain',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  maskPosition: 'center',
                  backgroundImage: `url(${currentFlagUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'drop-shadow(0 0 16px rgba(158,199,58,0.5))',
                }}
              />
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[3.5rem] md:translate-y-[4rem] pointer-events-none">
              <span className="px-2.5 py-1 rounded-full bg-brand-accent/15 ring-1 ring-brand-accent/40
                               text-[9px] font-bold uppercase tracking-[0.3em] text-brand-accent">
                You are here
              </span>
            </div>

            {/* Peripheral country nodes */}
            {otherCountries.map((other, i) => {
              const peerMap = `${MAP_BASE}${other.code.toLowerCase()}.svg`
              const peerFlag = `${MAP_BASE}flags/${other.code.toLowerCase()}.svg`
              const shortName = other.name
                .replace('Sultanate of ', '')
                .replace('United States of America', 'USA')
                .replace('United Kingdom', 'UK')
              return (
                <Link
                  key={other.code}
                  to={`/country/${other.code.toLowerCase()}`}
                  className={`group absolute z-10 ${positions[i]}`}
                  aria-label={`Open ${other.name}`}
                  title={other.name}
                >
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        WebkitMaskImage: `url(${peerMap})`,
                        maskImage: `url(${peerMap})`,
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        backgroundImage: `url(${peerFlag})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <span className="text-[10px] font-semibold text-slate-800
                                     group-hover:text-brand-accent transition-colors">
                      {shortName}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Achievements({ achievements }: { achievements: Achievement[] }) {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              Achievements
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">Highlights &amp; milestones</h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="group relative rounded-2xl
                              bg-gradient-to-br from-brand-accent/12 via-white/[0.03] to-transparent
                              backdrop-blur-md border border-brand-accent/30
                              p-6 transition-all duration-500
                              hover:border-brand-accent/65 hover:-translate-y-1
                              hover:shadow-[0_18px_42px_rgba(158,199,58,0.25)]">
                <div className="w-12 h-12 rounded-xl bg-brand-accent text-slate-900 grid place-items-center
                                shadow-[0_8px_24px_rgba(158,199,58,0.4)] mb-4
                                transition-transform duration-300 group-hover:scale-110">
                  <a.icon size={20} />
                </div>
                <div className="font-serif text-xl text-brand-deep leading-tight">
                  {a.title}
                </div>
                <p className="mt-2 text-sm text-slate-700 leading-snug">
                  {a.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({
  country,
  contact,
}: {
  country: typeof countries[number]
  contact: typeof contactByCountry[number] | undefined
}) {
  const [submitted, setSubmitted] = useState(false)
  const mapEmbedQuery = encodeURIComponent(contact?.mapQuery ?? country.address.split('\n').pop() ?? country.name)

  return (
    <section className="relative py-16 md:py-24">
      <div className="container-x max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <div className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-accent mb-3">
              Contact
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep">
              Reach our {country.name.replace('Sultanate of ', '').replace('United States of America', 'US')} team
            </h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-5 md:gap-6">
          {/* Address + map */}
          <Reveal>
            <div className="relative rounded-2xl
                            bg-white shadow-sm backdrop-blur-md border border-slate-200
                            shadow-[0_12px_32px_rgba(15,58,35,0.10)]
                            p-6 overflow-hidden h-full">
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accent mb-3">
                Office
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2.5 text-slate-200">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-brand-accent" />
                  <span className="leading-snug whitespace-pre-line">{country.address}</span>
                </div>
                {contact?.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2.5 text-slate-200 hover:text-brand-accent transition-colors"
                  >
                    <Phone size={14} className="text-brand-accent" />
                    {p}
                  </a>
                ))}
                {contact?.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="flex items-center gap-2.5 text-slate-200 hover:text-brand-accent transition-colors break-all"
                  >
                    <Mail size={14} className="text-brand-accent shrink-0" />
                    {e}
                  </a>
                ))}
                {contact?.hours && (
                  <div className="flex items-center gap-2.5 text-slate-800">
                    <Clock size={14} className="text-brand-accent" />
                    {contact.hours}
                  </div>
                )}
              </div>

              {/* Map embed */}
              <div className="mt-5 aspect-video w-full rounded-xl overflow-hidden border border-slate-200">
                <iframe
                  title={`${country.name} map`}
                  src={`https://www.google.com/maps?q=${mapEmbedQuery}&output=embed`}
                  loading="lazy"
                  className="w-full h-full"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={100}>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="relative rounded-2xl
                         bg-white shadow-sm backdrop-blur-md border border-slate-200
                         shadow-[0_12px_32px_rgba(15,58,35,0.10)]
                         p-6 grid gap-4 h-full"
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accent">
                Send a message
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mb-1.5">Name</label>
                <input
                  required type="text" placeholder="Full name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-sm text-brand-deep placeholder:text-slate-700 focus:outline-none focus:border-brand-accent/65"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mb-1.5">Email</label>
                <input
                  required type="email" placeholder="you@company.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-sm text-brand-deep placeholder:text-slate-700 focus:outline-none focus:border-brand-accent/65"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mb-1.5">Message</label>
                <textarea
                  required rows={5} placeholder="How can we help?"
                  className="w-full bg-slate-50 border border-slate-300 rounded-md px-4 py-3 text-sm text-brand-deep placeholder:text-slate-700 focus:outline-none focus:border-brand-accent/65 resize-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-md
                           bg-brand-accent text-slate-900 uppercase tracking-[0.2em] text-[11px] font-bold
                           hover:bg-brand-accent/85 transition-colors"
              >
                Send <Send size={14} />
              </button>
              {submitted && (
                <div className="text-xs text-brand-accent text-center">
                  Thanks ,your message is on its way to the {country.name.replace('Sultanate of ', '').replace('United States of America', 'US')} team.
                </div>
              )}
            </form>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-10 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.32em]
                       text-brand-accent hover:text-brand-deep transition-colors"
          >
            <Globe2 size={14} /> Back to global view
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
