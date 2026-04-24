import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail, Building2, MapPin, Globe2,
  HardHat, Truck, Laptop, ShipIcon, Coffee,
  ArrowRight, Award,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'
import BackButton from '../components/BackButton'

/* ───────────────────────── Reveal helper ───────────────────────── */
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────── Data ───────────────────────── */

const contactCards: { icon: LucideIcon; eyebrow: string; title: string; body: React.ReactNode }[] = [
  {
    icon: Mail,
    eyebrow: 'Postal Address',
    title: 'P.O. Box 1432',
    body: (
      <>
        PC-133, Al Khuwair<br />
        Muscat, Sultanate of Oman
      </>
    ),
  },
  {
    icon: Building2,
    eyebrow: 'Head Office',
    title: 'Office-41, 4th Floor',
    body: (
      <>
        Building-846, Way-4011, Complex-240<br />
        Al Gubrah, Bushar, Muscat, Oman
      </>
    ),
  },
  {
    icon: MapPin,
    eyebrow: 'Location',
    title: 'Muscat, Sultanate of Oman',
    body: 'GCC Regional Hub — strategic gateway between the Gulf, South Asia, and East Africa.',
  },
  {
    icon: Globe2,
    eyebrow: 'Parent Company',
    title: 'Yanabiya Gulf International',
    body: 'Business & Trade SPC — the operating entity behind every Yanabiya venture in Oman.',
  },
]

/* Each partner is plotted around the Muscat HQ node. Coordinates are in
 * % of the network-map container, picked so nodes don't overlap the HQ or
 * each other. Categories drive the small colour dot in the tooltip. */
const partnerNodes = [
  { name: 'Yanabiya Muscat United Trade',                category: 'Trade & Commerce',     x: 38, y: 30 },
  { name: 'Yanabiya Muscat for Comprehensive Projects',  category: 'Construction',         x: 64, y: 28 },
  { name: 'Yanabiya Muscat Integrated LLC',              category: 'Diversified Holdings', x: 28, y: 52 },
  { name: 'Yanabiya Al Khairat United Trade LLC',        category: 'Trade & Commerce',     x: 72, y: 52 },
  { name: 'Yanabiya Muscat World Business',              category: 'Business Services',    x: 36, y: 76 },
  { name: 'Yanabiya Muscat Al Mumyazat',                 category: 'Services & Operations', x: 66, y: 76 },
  { name: 'Yanabiya Al Rustaq Contracting',              category: 'Contracting',          x: 18, y: 36 },
]

const businessActivities: {
  icon: LucideIcon
  title: string
  bullets: string[]
}[] = [
  {
    icon: HardHat,
    title: 'Construction & Infrastructure',
    bullets: [
      'Building construction & turnkey projects',
      'Water, electricity & telecom network installation',
      'Plastering, painting & specialised finishing',
      'Construction equipment rental with operators',
      'Retail of building & construction materials',
    ],
  },
  {
    icon: Truck,
    title: 'Logistics & Warehousing',
    bullets: [
      'Loading, unloading & cargo handling',
      'Packaging & labelling activities',
      'Cold & frozen storage warehousing',
      'International maritime freight',
    ],
  },
  {
    icon: Laptop,
    title: 'Technology & IT Services',
    bullets: [
      'Software development & website design',
      'Computer network development & maintenance',
      'Cloud, hosting & systems analysis',
      'IT & cyber-security consulting',
      'Hardware repair & technical support',
    ],
  },
  {
    icon: ShipIcon,
    title: 'Trading & Import-Export',
    bullets: [
      'Export & import office operations',
      'Wholesale of clothing & accessories',
      'Retail of textiles & fabrics',
      'Commission agency & commercial brokerage',
    ],
  },
  {
    icon: Coffee,
    title: 'Hospitality & Services',
    bullets: [
      'Café & restaurant operations',
      'Catering & event services',
      'Specialised building cleaning',
      'Management & administrative offices',
    ],
  },
]

/* ───────────────────────── Page ───────────────────────── */

export default function OmanPresence() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-brand-deep text-white overflow-hidden">
      <BackButton to="/#global" label="Back to Global" />

      {/* Ambient gradient orbs (subtle dark-navy gradient feel) */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full bg-brand-accent/20 blur-[160px]" />
        <div className="absolute top-1/2 -right-40 w-[620px] h-[620px] rounded-full bg-brand-accent/15 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 w-[560px] h-[560px] rounded-full bg-brand-accentDark/10 blur-[140px]" />
      </div>
      {/* Soft logo watermark behind everything */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <img src={assets.logo} alt="" className="w-[55%] max-w-[640px] opacity-[0.04] object-contain" />
      </div>

      {/* ───────── 1. HERO ───────── */}
      <section className="relative min-h-[78vh] flex items-center">
        <div className="container-x relative z-10 py-24 text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-white/5
                            px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-accent mb-8
                            backdrop-blur-md">
              <span className="text-base leading-none">🇴🇲</span>
              Sultanate of Oman
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-[96px] leading-[0.95] tracking-tight">
              Oman
              <span className="block text-brand-accent">Global Presence.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed">
              Yanabiya Group · Muscat Headquarters &amp; Operations Hub
            </p>
          </Reveal>
          <Reveal delay={460}>
            <div className="mt-10 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
              <span className="w-12 h-px bg-white/30" />
              Established Excellence
              <span className="w-12 h-px bg-white/30" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 2. CONTACT — Postal first, then Head Office, Location, Parent ───────── */}
      <section className="relative py-20 md:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-3">
                Reach Us in Muscat
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Headquarters &amp; Contact.
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {contactCards.map((c, i) => (
              <Reveal key={c.eyebrow} delay={i * 120}>
                <div className="group relative h-full rounded-2xl
                                bg-white/[0.06] backdrop-blur-md
                                border border-white/10
                                p-7
                                transition-all duration-500
                                hover:bg-white/[0.10] hover:border-brand-accent/40
                                hover:-translate-y-1
                                hover:shadow-[0_30px_80px_-20px_rgba(158,199,58,0.35)]">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-accent/15 ring-1 ring-brand-accent/30
                                    grid place-items-center text-brand-accent
                                    transition-all duration-300
                                    group-hover:bg-brand-accent group-hover:text-brand-deep group-hover:rotate-3">
                      <c.icon size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-1.5">
                        {c.eyebrow}
                      </div>
                      <h3 className="font-serif text-xl text-white leading-tight">{c.title}</h3>
                      <p className="mt-2.5 text-sm text-white/70 leading-relaxed">{c.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 3. PARTNER NETWORK MAP ───────── */}
      <section className="relative py-20 md:py-28 border-y border-white/10">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-3">
                Our Partner Network
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Partner Companies.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-white/65 leading-relaxed">
                Strategic business entities operating across Oman under one integrated ecosystem.
              </p>
            </Reveal>
          </div>

          {/* Network map container */}
          <Reveal delay={300}>
            <div className="relative mx-auto w-full max-w-5xl aspect-[16/10]
                            rounded-3xl bg-[#0b2c1c] border border-white/10
                            overflow-hidden">
              {/* Subtle dot grid for the corporate-dashboard feel */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.18]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(158,199,58,0.35) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              {/* Soft glow behind HQ */}
              <div aria-hidden="true" className="absolute inset-0 grid place-items-center pointer-events-none">
                <div className="w-[55%] h-[70%] rounded-full bg-brand-accent/15 blur-[120px]" />
              </div>

              {/* Faint Oman / Arabian peninsula outline */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 62.5"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <g
                  fill="none"
                  stroke="rgba(158,199,58,0.22)"
                  strokeWidth="0.25"
                  strokeLinejoin="round"
                >
                  {/* Stylised Arabian peninsula silhouette */}
                  <path d="M 12 18 Q 28 8 48 12 Q 64 14 76 22 Q 86 32 82 44 Q 74 54 58 56 Q 38 58 22 50 Q 12 40 12 28 Z" />
                  {/* Musandam enclave */}
                  <path d="M 70 6 Q 76 3 82 8 L 80 14 Q 73 14 70 10 Z" />
                </g>
              </svg>

              {/* Connection lines: every partner → Muscat HQ (centre) */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 62.5"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
              >
                {partnerNodes.map((p) => {
                  const x = p.x
                  const y = p.y * 0.625
                  return (
                    <line
                      key={p.name}
                      x1="50" y1={50 * 0.625} x2={x} y2={y}
                      stroke="rgba(158,199,58,0.32)"
                      strokeWidth="0.18"
                      strokeDasharray="0.9 0.6"
                    />
                  )
                })}
              </svg>

              {/* MUSCAT HQ — central node */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative grid place-items-center">
                  <span
                    className="absolute w-24 h-24 rounded-full bg-brand-accent/30 blur-xl"
                    style={{ animation: 'haloPulse 3.2s ease-in-out infinite' }}
                  />
                  <span
                    className="absolute w-16 h-16 rounded-full bg-brand-accent/40"
                    style={{ animation: 'haloPulse 3.2s ease-in-out 0.4s infinite' }}
                  />
                  <div className="relative w-12 h-12 rounded-full bg-brand-accent
                                  ring-4 ring-white/30 shadow-[0_0_30px_rgba(158,199,58,0.7)]
                                  grid place-items-center text-brand-deep">
                    <Award size={20} strokeWidth={2.4} />
                  </div>
                  <div className="mt-3 px-3 py-1 rounded-full bg-white/95 text-brand-deep
                                  text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap shadow-md">
                    Yanabiya Group HQ · Oman
                  </div>
                </div>
              </div>

              {/* Partner nodes — hover reveals tooltip card */}
              {partnerNodes.map((p, i) => (
                <div
                  key={p.name}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-10 hover:z-30"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  {/* Node */}
                  <span className="relative inline-flex">
                    <span
                      className="absolute inset-0 rounded-full bg-brand-accent/35"
                      style={{ animation: `haloPulse 3s ease-in-out ${i * 0.45}s infinite` }}
                    />
                    <span
                      className="relative block w-3 h-3 rounded-full bg-brand-accent
                                 ring-2 ring-white/30
                                 transition-all duration-300
                                 group-hover:scale-150 group-hover:ring-white
                                 group-hover:shadow-[0_0_18px_rgba(158,199,58,0.85)]"
                    />
                  </span>

                  {/* Hover tooltip card */}
                  <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-3
                                  w-[220px] rounded-xl bg-white/95 backdrop-blur-md text-slate-900
                                  border border-white/60 shadow-[0_18px_40px_-10px_rgba(0,0,0,0.45)]
                                  px-3.5 py-2.5
                                  opacity-0 translate-y-1 transition-all duration-300
                                  group-hover:opacity-100 group-hover:translate-y-0">
                    <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-brand-accentDark">
                      <span className="block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                      {p.category}
                    </div>
                    <div className="mt-1.5 font-serif text-[13px] leading-snug font-semibold">
                      {p.name}
                    </div>
                    {/* Pointer arrow */}
                    <span className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-2.5 h-2.5 rotate-45
                                     bg-white/95 border-r border-b border-white/60" />
                  </div>
                </div>
              ))}

              {/* Corner caption — corporate-dashboard chrome */}
              <div className="absolute top-4 left-4 flex items-center gap-2 text-[10px] font-semibold uppercase
                              tracking-[0.25em] text-white/55">
                <span className="block w-2 h-2 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(158,199,58,0.7)]" />
                Live · 7 Entities
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-semibold uppercase
                              tracking-[0.25em] text-white/40">
                Sultanate of Oman
              </div>
            </div>
          </Reveal>

          {/* Compact partner index — fallback for mobile + accessibility */}
          <Reveal delay={500}>
            <div className="mt-10 max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              {partnerNodes.map((p) => (
                <div
                  key={p.name}
                  className="flex items-start gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3"
                >
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                  <div className="min-w-0">
                    <div className="text-white/90 leading-snug">{p.name}</div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mt-0.5 font-semibold">
                      {p.category}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 4. BUSINESS ACTIVITIES ───────── */}
      <section className="relative py-20 md:py-28">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-3">
                Operating Capabilities
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Business Activities.
              </h2>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-white/65 leading-relaxed">
                Five integrated capability areas under a single licensed group structure
                in the Sultanate of Oman.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {businessActivities.map((b, i) => (
              <Reveal key={b.title} delay={i * 110}>
                <div className="group relative h-full rounded-2xl
                                bg-white/[0.06] backdrop-blur-md border border-white/10 p-7
                                transition-all duration-500
                                hover:bg-white/[0.10] hover:border-brand-accent/40
                                hover:-translate-y-1
                                hover:shadow-[0_30px_80px_-20px_rgba(158,199,58,0.35)]">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/15 ring-1 ring-brand-accent/30
                                  grid place-items-center text-brand-accent
                                  transition-all duration-300
                                  group-hover:bg-brand-accent group-hover:text-brand-deep group-hover:rotate-3">
                    <b.icon size={20} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl text-white leading-tight">{b.title}</h3>
                  <ul className="mt-4 space-y-2">
                    {b.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2 text-sm text-white/70 leading-relaxed">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-brand-accent shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── 5. CTA STRIP ───────── */}
      <section className="relative py-20 border-t border-white/10">
        <div className="container-x text-center max-w-2xl mx-auto">
          <Reveal>
            <h3 className="font-serif text-3xl md:text-4xl leading-tight">
              Connect with our Muscat office.
            </h3>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-4 text-white/65 leading-relaxed">
              Whether you’re a partner, supplier, or client — we’re ready to start the conversation.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                           bg-brand-accent text-brand-deep font-semibold uppercase tracking-wider text-xs
                           shadow-lg hover:bg-white hover:shadow-2xl hover:-translate-y-0.5
                           transition-all duration-300"
              >
                Get in Touch <ArrowRight size={14} />
              </Link>
              <Link
                to="/#global"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                           border border-white/30 text-white text-xs font-semibold uppercase tracking-wider
                           hover:bg-white/10 hover:border-white transition-colors"
              >
                Other Locations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
