import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ArrowUpRight, Building2, FileBadge, Calendar, MapPin,
  Cpu, Boxes, Briefcase, Ship, Plane, Handshake,
  TrendingUp, Sparkles, Lightbulb, Megaphone, Globe2,
  Heart, Send, Users,
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
  /** Section 4 — Our Services / What We Offer */
  services: { label: string; desc: string; icon: LucideIcon; slug: string }[]
  /** Section 5 — Our Network */
  strategicPartners: { name: string; logo?: string }[]
  operationalPartners: { name: string; logo?: string }[]
  /** Section 6 — Business Domains */
  categories: { label: string; icon: LucideIcon; tone: string }[]
  /** Section 7 — Licensed Activities */
  licensedActivities: string[]
  /** Section 8 — Current Operations */
  currentProjects: { title: string; body: string }[]
  activeSectors: string[]
  /** Section 9 — Future Roadmap */
  futurePlans: { title: string; body: string; icon: LucideIcon }[]
}

const OPS: Record<string, CountryOps> = {
  BD: {
    intro:
      'Yanabiya Gulf International BD Trade is the Group\'s South Asia delivery hub — built around an engineering bench in Dhaka, an apparel-manufacturing network nationwide, and a fast-growing partner ecosystem.',
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
      { label: 'IT Software & Web Development',     desc: 'Custom software, cloud platforms, and AI solutions.',                icon: Cpu,       slug: 'it-software' },
      { label: 'Global Trade & Supply Chain',       desc: 'International sourcing, freight, customs, and end-to-end fulfilment.', icon: Boxes,     slug: 'export-import' },
      { label: 'Clothing & Accessories',            desc: 'Private-label apparel sourcing, manufacturing, and retail supply.',  icon: Briefcase, slug: 'clothing' },
      { label: 'Agents & Brokerage Business',       desc: 'Cross-border commercial agency, deals, and partnership matchmaking.', icon: Handshake, slug: 'agents-brokerage' },
      { label: 'Office Management Services',        desc: 'Serviced offices, PRO services, accounting, and administration.',   icon: Building2, slug: 'office-management' },
      { label: 'Global Mobility & Workforce Services', desc: 'Workforce supply, student placement, visa, and aviation coordination.', icon: Plane, slug: 'manpower' },
    ],
    // Group of partner companies operating in Bangladesh under the
    // Yanabiya umbrella. Strategic = long-term partners that anchor
    // core categories (internet, cloud, aviation); Operational =
    // service partners delivering connectivity, comms and tech.
    strategicPartners: [
      { name: 'Connet Online' },
      { name: 'Plexus Cloud' },
      { name: 'Gtech Aviation' },
      { name: 'Idea Tec' },
      { name: 'Citylink Communication' },
      { name: 'Trust Innovation Limited Company' },
      { name: 'Business Zone Limited Company' },
    ],
    operationalPartners: [
      { name: 'Eham WiFi' },
      { name: 'Xlink Limited Company' },
      { name: 'Dot Internet' },
      { name: 'Zero Link' },
      { name: 'Global Communication Limited' },
      { name: 'Dot Exploration Ltd' },
      { name: 'Bongo WiFi' },
    ],
    categories: [
      { label: 'Internet Services & Connectivity',           icon: Globe2,    tone: 'from-emerald-500/40 to-emerald-700/40' },
      { label: 'Cloud Computing & Technology Services',      icon: Cpu,       tone: 'from-cyan-500/40 to-sky-700/40'        },
      { label: 'Aviation & Workforce Mobility',              icon: Plane,     tone: 'from-amber-500/40 to-orange-700/40'    },
      { label: 'Communications & Telecommunications',        icon: Megaphone, tone: 'from-fuchsia-500/40 to-rose-700/40'    },
      { label: 'Trading & International Logistics',          icon: Boxes,     tone: 'from-violet-500/40 to-indigo-700/40'   },
      { label: 'Construction & Civil Infrastructure Works',  icon: Building2, tone: 'from-rose-500/40 to-red-700/40'        },
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
      { title: 'Regional Delivery Centre', body: '24×7 engineering & QA support for clients across the four-country group.' },
      { title: 'Apparel Sourcing Network', body: 'Active relationships with vetted RMG factories supplying private-label clients.' },
      { title: 'Workforce Mobility Pipeline', body: 'Skilled & semi-skilled placement into the Gulf, UK and US under group employer.' },
      { title: 'Government IT Engagements', body: 'Public-sector digitalisation pilots in coordination with local partners.' },
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
      { title: 'Green Data Centre',          body: 'Investment in a sustainable Tier-III data-centre facility serving regional cloud workloads.', icon: Sparkles },
      { title: 'Global Digital Infrastructure', body: 'Expand the Dhaka delivery centre into a 500+ engineer hub serving all four group countries.', icon: TrendingUp },
      { title: 'Innovation-Driven Services',  body: 'Productised AI, security & analytics offerings exported under the Yanabiya brand.', icon: Lightbulb },
      { title: 'New Country Entry — KSA',     body: 'Saudi Arabia entity in 2027 to extend Gulf-wide trade & manpower coverage.',                  icon: Globe2 },
    ],
  },
  // Other countries can be filled in later — the page falls back to a
  // light "coming soon" stub for any country code not in this map.
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
      <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a]
                       text-white overflow-hidden min-h-screen grid place-items-center px-6">
        <BackButton to="/" label="Back to Home" />
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-[0.32em] text-amber-300 mb-3">
            Coming soon
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-white mb-3">
            Operations page launching for this region
          </h1>
          <Link to="/contact" className="inline-flex items-center gap-2 mt-4 text-brand-accent hover:text-white">
            Talk to us → <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a]
                     text-white overflow-hidden min-h-screen">
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
      />

      {/* SECTION 2 — About Our Operation */}
      <SectionFrame eyebrow="About Our Operation" title="Who we are on the ground.">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 [perspective:1400px]">
          <Card3D delay={0} title="Local Branch" body={ops.branchIntro} icon={Building2} />
          <Card3D delay={120} title="Parent Group" body={ops.parentCompany} icon={Globe2} />
          <Card3D delay={240} title="Our Mission" body={ops.mission} icon={Megaphone} />
        </div>
        {ops.vision && (
          <div className="mt-5">
            <Card3D delay={360} title="Our Vision" body={ops.vision} icon={Sparkles} />
          </div>
        )}
      </SectionFrame>

      {/* SECTION 3 — Company Information */}
      <SectionFrame eyebrow="Company Information" title="Registered. Compliant. Anchored.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          <InfoRow label="Established"        value={ops.established}                 icon={Calendar} />
          <InfoRow label={ops.registration.label} value={ops.registration.value}      icon={FileBadge} />
          <InfoRow label="Legal Entity"       value={ops.legalEntity}                 icon={Building2} />
          {ops.license && (
            <>
              <InfoRow label="License Name"   value={ops.license.name}                 icon={FileBadge} />
              <InfoRow label="Issuing Authority" value={ops.license.authority}         icon={Building2} />
            </>
          )}
          <InfoRow label="Office Address"     value={ops.address}                      icon={MapPin} />
        </div>
      </SectionFrame>

      {/* SECTION 4 — What We Offer */}
      <SectionFrame eyebrow="What We Offer" title="Services delivered locally, scaled globally.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 [perspective:1400px]">
          {ops.services.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </SectionFrame>

      {/* SECTION 5 — Our Network */}
      <SectionFrame eyebrow="Our Network" title="Strategic + operational partners working alongside us.">
        <PartnerGroup title="Strategic Partners"   subtitle="Long-term relationships powering core delivery." items={ops.strategicPartners} />
        <PartnerGroup title="Operational Partners" subtitle="Service partners we collaborate with day to day."  items={ops.operationalPartners} className="mt-8" />
      </SectionFrame>

      {/* SECTION 6 — Business Domains */}
      <SectionFrame eyebrow="Business Domains" title="The verticals we operate in.">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 [perspective:1400px]">
          {ops.categories.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div
                className={`group relative rounded-2xl bg-gradient-to-br ${c.tone}
                            border border-white/15 backdrop-blur-md
                            p-5 md:p-6 text-center
                            [transform-style:preserve-3d]
                            transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                            hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(12px)_scale(1.03)]`}
              >
                <div className="w-11 h-11 mx-auto rounded-xl bg-white/15 ring-1 ring-white/20
                                grid place-items-center text-white shadow-md">
                  <c.icon size={20} strokeWidth={2} />
                </div>
                <div className="mt-3 font-serif text-base md:text-lg text-white leading-tight">
                  {c.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      {/* SECTION 7 — Licensed Activities */}
      <SectionFrame eyebrow="Approved Activities Under License" title="Government-approved scope of operations.">
        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm text-white/85">
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

      {/* SECTION 8 — Current Operations */}
      <SectionFrame eyebrow="Current Operations" title="What's running on the ground today.">
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mb-7 [perspective:1400px]">
          {ops.currentProjects.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={Briefcase} delay={i * 110} />
          ))}
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-5 md:p-6">
          <div className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] font-semibold text-amber-300 mb-3">
            Active sectors
          </div>
          <div className="flex flex-wrap gap-2">
            {ops.activeSectors.map((s) => (
              <span
                key={s}
                className="inline-block px-3 py-1.5 rounded-full bg-white/8 border border-white/15
                           text-xs text-white/85"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </SectionFrame>

      {/* SECTION 9 — Future Roadmap */}
      <SectionFrame eyebrow="Future Roadmap" title="Where we're heading next.">
        <div className="grid sm:grid-cols-2 gap-4 md:gap-5 [perspective:1400px]">
          {ops.futurePlans.map((p, i) => (
            <Card3D key={p.title} title={p.title} body={p.body} icon={p.icon} delay={i * 110} accent />
          ))}
        </div>
      </SectionFrame>

      {/* SECTION 10 — Become a Partner */}
      <SectionFrame eyebrow="Become a Partner" title="Build something with the Yanabiya group.">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7 [perspective:1400px]">
          <Card3D title="Business Collaboration" body="Source, supply, or co-deliver with our local team." icon={Handshake} delay={0} />
          <Card3D title="Joint Venture"          body="Form a structured JV around a shared market opportunity." icon={Users}    delay={110} />
          <Card3D title="Strategic Alliance"     body="Multi-year alliances on technology, trade or talent."     icon={TrendingUp} delay={220} />
        </div>
        <div className="text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                       bg-brand-accent text-brand-ink text-xs font-bold uppercase tracking-[0.22em]
                       shadow-md hover:bg-white hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-300"
          >
            Partner With Us <ArrowUpRight size={14} />
          </Link>
        </div>
      </SectionFrame>

      {/* SECTION 11 — Become a Sponsor / Contributor */}
      <SectionFrame eyebrow="Become a Sponsor / Contributor" title="Bring your ideas, capital or expertise.">
        <div className="grid md:grid-cols-3 gap-4 md:gap-5 mb-7 [perspective:1400px]">
          <Card3D title="Share Your Idea"     body="Submit a proposal — we'll review and respond within 5 business days." icon={Lightbulb} delay={0} />
          <Card3D title="Invest With Us"      body="Take a position in our growth roadmap or specific country expansion." icon={TrendingUp} delay={110} />
          <Card3D title="Advisory Support"    body="Lend strategic advice to our board across IT, trade or governance."   icon={Heart}      delay={220} />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3
                       bg-brand-accent text-brand-ink text-xs font-bold uppercase tracking-[0.22em]
                       shadow-md hover:bg-white hover:shadow-lg hover:-translate-y-0.5
                       transition-all duration-300"
          >
            Share Your Idea <Send size={14} />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3
                       border border-white/30 text-white text-xs font-bold uppercase tracking-[0.22em]
                       hover:bg-white/10 hover:-translate-y-0.5
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
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="relative">
      <div className="container-x py-10 md:py-12">
        <Reveal>
          <div className="text-center mb-7 md:mb-8 max-w-2xl mx-auto">
            <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase
                             tracking-[0.32em] text-amber-300 mb-2">
              {eyebrow}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-white leading-tight">
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
}: {
  title: string
  body: string
  icon: LucideIcon
  delay?: number
  accent?: boolean
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`group relative h-full rounded-2xl
                    bg-white/5 backdrop-blur-md
                    border ${accent ? 'border-amber-300/40' : 'border-white/15'}
                    p-5 md:p-6
                    [transform-style:preserve-3d]
                    transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(12px)_scale(1.02)]
                    hover:border-amber-300/60`}
      >
        <div
          className={`w-11 h-11 rounded-xl grid place-items-center
                      ${accent ? 'bg-amber-300/20 text-amber-200' : 'bg-white/10 text-white'}
                      ring-1 ${accent ? 'ring-amber-300/40' : 'ring-white/15'}
                      shadow-md [transform:translateZ(20px)]`}
        >
          <Icon size={20} strokeWidth={2} />
        </div>
        <div className="mt-4 font-serif text-base md:text-lg text-white leading-tight
                        [transform:translateZ(12px)]">
          {title}
        </div>
        <p className="mt-2 text-[13px] text-white/75 leading-relaxed
                      [transform:translateZ(4px)]">
          {body}
        </p>
      </div>
    </Reveal>
  )
}

function InfoRow({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <Reveal>
      <div className="flex items-start gap-3 rounded-2xl bg-white/5 backdrop-blur-md
                      border border-white/10 p-4 md:p-5
                      transition-colors duration-300 hover:border-amber-300/40">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-amber-300/15 text-amber-200
                        ring-1 ring-amber-300/30 grid place-items-center">
          <Icon size={16} strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[10px] uppercase tracking-[0.22em] font-semibold text-amber-300/90 mb-1">
            {label}
          </div>
          <div className="text-sm text-white/90 leading-snug break-words">
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
  service: { label: string; desc: string; icon: LucideIcon; slug: string }
  index: number
}) {
  return (
    <Reveal delay={index * 80}>
      <Link
        to={`/business/${service.slug}`}
        className="group relative block h-full rounded-2xl
                   bg-white/5 backdrop-blur-md border border-white/15
                   p-5 md:p-6
                   [transform-style:preserve-3d]
                   transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                   hover:[transform:rotateY(6deg)_rotateX(-4deg)_translateZ(14px)_scale(1.03)]
                   hover:border-amber-300/60"
      >
        <div className="w-11 h-11 rounded-xl bg-amber-300/15 text-amber-200
                        ring-1 ring-amber-300/40 grid place-items-center shadow-md
                        [transform:translateZ(20px)]">
          <service.icon size={20} strokeWidth={2} />
        </div>
        <div className="mt-4 font-serif text-base md:text-lg text-white leading-tight [transform:translateZ(12px)]">
          {service.label}
        </div>
        <p className="mt-1.5 text-[13px] text-white/75 leading-relaxed [transform:translateZ(4px)]">
          {service.desc}
        </p>
        <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em]
                        text-amber-300 group-hover:gap-2 transition-all">
          Learn more <ArrowRight size={11} />
        </div>
      </Link>
    </Reveal>
  )
}

function PartnerGroup({
  title,
  subtitle,
  items,
  className = '',
}: {
  title: string
  subtitle: string
  items: { name: string; logo?: string }[]
  className?: string
}) {
  return (
    <div className={className}>
      <div className="mb-4">
        <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-amber-300 mb-1">
          {title}
        </div>
        <div className="text-sm text-white/65">{subtitle}</div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
        {items.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <div className="relative h-24 rounded-xl bg-white border border-white/15
                            grid place-items-center p-3
                            transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.04]">
              {p.logo ? (
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              ) : (
                <span className="text-xs font-semibold text-slate-700 text-center px-1">
                  {p.name}
                </span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
