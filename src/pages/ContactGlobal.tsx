import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  X as CloseIcon, Mail, Phone, Globe2, Building2, ArrowRight, ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import BackButton from '../components/BackButton'
import { useReveal } from '../hooks/useReveal'

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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ───────────────────────── Country contact data ───────────────────────── */

type CountryCode = 'OM' | 'GB' | 'BD' | 'US'

type CountryContact = {
  code: CountryCode
  flag: string
  name: string
  shortName: string
  region: string
  city: string
  summary: string
  parentCompany: string
  postal?: string[]
  headOffice: string[]
  branchOffice?: string[]
  phones: string[]
  mobile?: string
  emails: string[]
  hours: string
  mapEmbed?: string
  mapUrl?: string
  status: 'active' | 'launching'
}

const COUNTRIES: CountryContact[] = [
  {
    code: 'OM',
    flag: '🇴🇲',
    name: 'Sultanate of Oman',
    shortName: 'Oman',
    region: 'Headquarters',
    city: 'Muscat',
    summary: 'Group HQ — anchoring Gulf trade, regulatory intelligence, and the seven-partner network.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC',
    postal: ['P.O. Box 1432, PC-133', 'Al Khuwair, Muscat'],
    headOffice: [
      'Office-41, 4th Floor, Building-846',
      'Way-4011, Complex-240',
      'Al Gubrah, Bushar, Muscat, Oman',
    ],
    phones: ['+968 2249 5566'],
    mobile: '+968 9116 1677',
    emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
    hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM (GST)',
    mapEmbed: 'Building 846, Way 4011, Al Gubrah, Bushar, Muscat, Oman',
    mapUrl: 'https://maps.app.goo.gl/8kfKBHGkBEZ7ExsT9',
    status: 'active',
  },
  {
    code: 'GB',
    flag: '🇬🇧',
    name: 'United Kingdom',
    shortName: 'UK',
    region: 'European Operations',
    city: 'London',
    summary: 'European operations hub — connecting 21 IT, retail, and hospitality partners across the UK.',
    parentCompany: 'Yanabiya Gulf International UK Ltd',
    headOffice: [
      '167-169 Great Portland Street',
      '5th Floor, London, W1W 5PF',
      'United Kingdom',
    ],
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday – Friday, 9:00 AM – 6:00 PM (GMT)',
    mapEmbed: '167-169 Great Portland Street, London W1W 5PF, UK',
    status: 'active',
  },
  {
    code: 'BD',
    flag: '🇧🇩',
    name: 'Bangladesh',
    shortName: 'Bangladesh',
    region: 'South Asia Operations',
    city: 'Dhaka',
    summary: 'South Asia delivery hub — engineering, apparel, and a 14-partner connectivity network.',
    parentCompany: 'Yanabiya Gulf International BD Trade',
    headOffice: [
      'Office #211, Plot #322/B',
      'Block #Kanchkura, Uttarkhan',
      'Dhaka-1230, Bangladesh',
    ],
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (BST)',
    mapEmbed: 'Uttarkhan, Dhaka 1230, Bangladesh',
    status: 'active',
  },
  {
    code: 'US',
    flag: '🇺🇸',
    name: 'United States of America',
    shortName: 'USA',
    region: 'North America Operations',
    city: 'Austin',
    summary: 'North America presence — partner network onboarding in progress.',
    parentCompany: 'Yanabiya Gulf International US LLC',
    headOffice: [
      '5900 Balcones Drive #18651',
      'Austin, TX 78731',
      'United States of America',
    ],
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday – Friday, 9:00 AM – 5:00 PM (CT)',
    mapEmbed: '5900 Balcones Drive, Austin, TX 78731, USA',
    status: 'launching',
  },
]

/* ───────────────────────── Country card ───────────────────────── */

function CountryCard({
  data,
  onClick,
  index,
}: {
  data: CountryContact
  onClick: () => void
  index: number
}) {
  return (
    <Reveal delay={index * 90}>
      <button
        type="button"
        onClick={onClick}
        className="group block w-full h-full text-left rounded-2xl
                   bg-white border border-slate-200
                   p-6 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                   transition-all duration-500
                   hover:border-brand-deep/40 hover:-translate-y-1
                   hover:shadow-[0_24px_60px_-20px_rgba(15,58,35,0.25)]"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-14 h-14 rounded-full bg-white grid place-items-center
                          text-3xl shadow-sm ring-2 ring-brand-accent/30
                          group-hover:ring-brand-accent transition-colors duration-300">
            {data.flag}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-serif text-xl font-bold text-brand-deep leading-tight">
              {data.shortName}
            </div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mt-1 font-semibold">
              {data.region}
            </div>
          </div>
          <span
            className={`shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5
                        text-[9px] font-bold uppercase tracking-[0.22em]
                        ${
                          data.status === 'active'
                            ? 'bg-brand-accent/15 text-brand-accentDark border border-brand-accent/40'
                            : 'bg-amber-50 text-amber-700 border border-amber-300'
                        }`}
          >
            <span className="block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {data.status === 'active' ? 'Active' : 'Launching'}
          </span>
        </div>

        <p className="mt-4 text-sm text-slate-600 leading-relaxed">
          {data.summary}
        </p>

        <div className="mt-5 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] font-bold">
          <span className="text-slate-500">{data.city} · {data.name}</span>
          <span className="text-brand-accentDark group-hover:text-brand-deep transition-colors inline-flex items-center gap-1">
            View Page <ArrowRight size={11} />
          </span>
        </div>
      </button>
    </Reveal>
  )
}

/* ───────────────────────── Half-view slide-in preview ───────────────────────── */

function CountryPreviewPanel({
  data,
  onClose,
}: {
  data: CountryContact | null
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${data.shortName} contact preview`}
      className="fixed inset-0 z-[100]"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm animate-[fadeUp_0.3s_ease-out_both]" />

      {/* Half-view panel slides in from the right */}
      <aside
        onClick={(e) => e.stopPropagation()}
        className="absolute top-0 right-0 h-full w-full sm:w-[480px] md:w-[560px]
                   bg-white shadow-[0_0_60px_rgba(0,0,0,0.35)]
                   border-l border-brand-accent/30
                   overflow-y-auto"
        style={{ animation: 'slideInRight 0.4s cubic-bezier(0.22,1,0.36,1) both' }}
      >
        {/* Soft mint accent at the top */}
        <div aria-hidden="true" className="absolute -top-32 -left-20 w-[420px] h-[420px] rounded-full bg-brand-accent/15 blur-[120px] pointer-events-none" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close preview"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full
                     bg-slate-100 hover:bg-slate-200
                     border border-slate-200
                     grid place-items-center text-slate-700 hover:text-brand-deep
                     transition-colors"
        >
          <CloseIcon size={16} />
        </button>

        <div className="relative p-7 md:p-9">

          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-14 h-14 rounded-full bg-white grid place-items-center
                               text-3xl shadow-sm ring-2 ring-brand-accent/40">
                {data.flag}
              </span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-brand-accentDark font-bold mb-2">
              {data.region}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
              {data.name}
            </h2>
            <div className="mt-3 mx-auto w-12 h-px bg-brand-deep/40" />
          </div>

          {/* Centered + justified address block (Head Office / Branch Office) */}
          <Reveal delay={120}>
            <div className="mt-8 max-w-md mx-auto text-center">
              {data.postal && (
                <>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-brand-accentDark font-bold mb-2">
                    Postal Address
                  </div>
                  {data.postal.map((line, i) => (
                    <div key={i} className="text-sm text-slate-800 leading-relaxed">
                      {line}
                    </div>
                  ))}
                  <div className="my-5 mx-auto w-8 h-px bg-slate-300" />
                </>
              )}

              <div className="text-[10px] uppercase tracking-[0.28em] text-brand-accentDark font-bold mb-2">
                Head Office
              </div>
              {data.headOffice.map((line, i) => (
                <div key={i} className="text-sm text-slate-800 leading-relaxed">
                  {line}
                </div>
              ))}

              {data.branchOffice && (
                <>
                  <div className="my-5 mx-auto w-8 h-px bg-slate-300" />
                  <div className="text-[10px] uppercase tracking-[0.28em] text-brand-accentDark font-bold mb-2">
                    Branch Office
                  </div>
                  {data.branchOffice.map((line, i) => (
                    <div key={i} className="text-sm text-slate-800 leading-relaxed">
                      {line}
                    </div>
                  ))}
                </>
              )}
            </div>
          </Reveal>

          {/* Reach-out facts */}
          <Reveal delay={220}>
            <div className="mt-8 grid grid-cols-1 gap-3 max-w-md mx-auto">
              <FactRow icon={Building2} label="Parent Company" value={data.parentCompany} />
              {data.phones.length > 0 && (
                <FactRow icon={Phone} label="Phone" value={data.phones.join(' · ')} />
              )}
              {data.mobile && <FactRow icon={Phone} label="Mobile" value={data.mobile} />}
              <FactRow icon={Mail} label="Email" value={data.emails.join(' · ')} />
              <FactRow icon={Globe2} label="Office Hours" value={data.hours} />
            </div>
          </Reveal>

          {/* Map link */}
          {data.mapUrl && (
            <Reveal delay={320}>
              <div className="mt-8 max-w-md mx-auto">
                <a
                  href={data.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full
                             rounded-full bg-brand-deep text-white
                             px-5 py-3 text-xs font-bold uppercase tracking-[0.22em]
                             hover:bg-brand-accentDark transition-colors"
                >
                  View on Google Maps
                  <ExternalLink size={14} />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </aside>
    </div>
  )
}

function FactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-accent/10 grid place-items-center text-brand-accentDark">
        <Icon size={15} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-bold">
          {label}
        </div>
        <div className="text-sm text-slate-800 mt-0.5 leading-snug break-words">
          {value}
        </div>
      </div>
    </div>
  )
}

/* ───────────────────────── Page (top-level) ───────────────────────── */

export default function ContactGlobal() {
  const [selected, setSelected] = useState<CountryCode | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient mint glow on the white surface */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="container-x py-14 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              Global Contact Network
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
              Contact Yanabiya Group
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
              Choose any country office below to preview its address, phone, email, and office hours.
              Open the page for full details.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COUNTRY CARDS */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28">
          <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {COUNTRIES.map((c, i) => (
              <CountryCard
                key={c.code}
                data={c}
                index={i}
                onClick={() => setSelected(c.code)}
              />
            ))}
          </div>

        </div>
      </section>

      {/* HALF-VIEW PREVIEW PANEL */}
      <CountryPreviewPanel
        data={selected ? COUNTRIES.find((c) => c.code === selected) ?? null : null}
        onClose={() => setSelected(null)}
      />
    </main>
  )
}
