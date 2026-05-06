import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Heart, Send, CheckCircle, Copy, Mail,
  Building2, UserRound, Stethoscope, Shield, BookOpen,
  Star, Gift, Banknote, Leaf, Hammer, Sparkles, HandHeart,
  Check,
} from 'lucide-react'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import { useSection } from '../hooks/useSection'

/* ── Types ──────────────────────────────────────────────────── */
type Cause = {
  label: string
  description: string
  impact: string
  icon: ReactNode
  image: string
  color: string
}

/* ── Data ───────────────────────────────────────────────────── */
const causes: Cause[] = [
  {
    label: 'Masjid Support', description: 'Construction and maintenance of mosques.',
    impact: 'Builds a house of prayer', color: '#10b981',
    icon: <Building2 size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Orphan Care', description: 'Education and welfare for orphaned children.',
    impact: 'Gives a child a future', color: '#f43f5e',
    icon: <Heart size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Elderly Home', description: 'Care and dignity for the elderly in need.',
    impact: 'Restores dignity to elders', color: '#0ea5e9',
    icon: <UserRound size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Medical Support', description: 'Free health camps and medicine for those who cannot afford care.',
    impact: 'Heals a family in need', color: '#f59e0b',
    icon: <Stethoscope size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Ending the Torment', description: 'Emergency relief for families in extreme hardship.',
    impact: 'Brings relief in crisis', color: '#8b5cf6',
    icon: <Shield size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Student Care', description: 'Scholarships and learning resources for underprivileged students.',
    impact: 'Opens doors to knowledge', color: '#0ea5e9',
    icon: <BookOpen size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Special Care', description: 'Support and resources for individuals with special needs.',
    impact: 'Empowers every person', color: '#10b981',
    icon: <Star size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Eid Clothes', description: 'New clothing for those who cannot afford to celebrate.',
    impact: 'Spreads joy on Eid', color: '#f59e0b',
    icon: <Gift size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1604328702728-d26d2062c20b?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Pay Your Zakah', description: 'Fulfil your annual Zakah obligation through us.',
    impact: 'Purifies your wealth', color: '#f43f5e',
    icon: <Banknote size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Sadaqah', description: 'Voluntary charity for any worthy cause, any time.',
    impact: 'Sadaqah never decreases wealth', color: '#8b5cf6',
    icon: <Sparkles size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Environment Care', description: 'Tree plantation and eco initiatives for future generations.',
    impact: 'Sadaqah Jariyah for generations', color: '#10b981',
    icon: <Leaf size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Building & Maintenance', description: 'Upkeep of mosques, madrasas and charitable facilities.',
    impact: 'Preserves a place of worship', color: '#f59e0b',
    icon: <Hammer size={15} strokeWidth={2} />,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80',
  },
]

const amounts = [
  { v: '10',  label: 'Provides a meal for a family'      },
  { v: '25',  label: 'Sponsors a student for a week'     },
  { v: '50',  label: 'Covers medical care for a child'   },
  { v: '100', label: 'Supports an orphan for a month'    },
  { v: 'Custom', label: 'Choose your own impact'         },
]

const bankRows = [
  { k: 'Bank',         v: 'Shahjalal Islami Bank Ltd.'              },
  { k: 'Account Name', v: 'Jamiya Ahmadiya Madrasha & Orphanage'    },
  { k: 'Account No',   v: '4057-11100000795'                        },
  { k: 'Routing',      v: '190260871'                               },
  { k: 'SWIFT',        v: 'SJBLBDDHCPC'                             },
]

const stats = [
  { v: '100%',   l: 'Direct to Cause' },
  { v: '1,000+', l: 'Lives Touched'   },
  { v: '4',      l: 'Countries'       },
  { v: '15Y',    l: 'Track Record'    },
]

/* ── Component ──────────────────────────────────────────────── */
export default function Donation() {
  const pageHeroes = useSection<Record<string, { eyebrow: string; title: string; subtitle: string }>>('page-heroes')
  const hero = pageHeroes?.['donation']

  const [selectedCause, setSelectedCause] = useState('')
  const [selectedAmt,   setSelectedAmt]   = useState('50')
  const [customAmt,     setCustomAmt]      = useState('')
  const [payCountry,    setPayCountry]     = useState<string | null>(null)
  const [payGateway,    setPayGateway]     = useState<string | null>(null)
  const [noInvoice,     setNoInvoice]      = useState(false)
  const [donorName,     setDonorName]      = useState('')
  const [donorPhone,    setDonorPhone]     = useState('')
  const [donorEmail,    setDonorEmail]     = useState('')
  const [submitted,     setSubmitted]      = useState(false)
  const [copied,        setCopied]         = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  function copy(text: string, key: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  const ipt =
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 ' +
    'placeholder:text-slate-400 focus:outline-none focus:border-brand-accent ' +
    'focus:ring-2 focus:ring-brand-accent/20 transition-all'

  const PAY_COUNTRIES = [
    { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',     live: true,  gateways: ['bKash', 'Nagad', 'Bank Transfer'] },
    { code: 'OM', flag: '🇴🇲', name: 'Oman',            live: false, gateways: [] },
    { code: 'GB', flag: '🇬🇧', name: 'United Kingdom',  live: false, gateways: [] },
    { code: 'US', flag: '🇺🇸', name: 'USA',             live: false, gateways: [] },
    { code: 'SA', flag: '🇸🇦', name: 'Saudi Arabia',    live: false, gateways: [] },
    { code: 'AE', flag: '🇦🇪', name: 'UAE',             live: false, gateways: [] },
    { code: 'QA', flag: '🇶🇦', name: 'Qatar',           live: false, gateways: [] },
    { code: 'KW', flag: '🇰🇼', name: 'Kuwait',          live: false, gateways: [] },
    { code: 'BH', flag: '🇧🇭', name: 'Bahrain',         live: false, gateways: [] },
    { code: 'MY', flag: '🇲🇾', name: 'Malaysia',        live: false, gateways: [] },
    { code: 'IN', flag: '🇮🇳', name: 'India',           live: false, gateways: [] },
    { code: 'PK', flag: '🇵🇰', name: 'Pakistan',        live: false, gateways: [] },
    { code: 'TR', flag: '🇹🇷', name: 'Turkey',          live: false, gateways: [] },
    { code: 'EG', flag: '🇪🇬', name: 'Egypt',           live: false, gateways: [] },
    { code: 'SG', flag: '🇸🇬', name: 'Singapore',       live: false, gateways: [] },
    { code: 'ID', flag: '🇮🇩', name: 'Indonesia',       live: false, gateways: [] },
    { code: 'JP', flag: '🇯🇵', name: 'Japan',           live: false, gateways: [] },
    { code: 'KR', flag: '🇰🇷', name: 'South Korea',     live: false, gateways: [] },
    { code: 'CA', flag: '🇨🇦', name: 'Canada',          live: false, gateways: [] },
    { code: 'AU', flag: '🇦🇺', name: 'Australia',       live: false, gateways: [] },
    { code: 'DE', flag: '🇩🇪', name: 'Germany',         live: false, gateways: [] },
    { code: 'FR', flag: '🇫🇷', name: 'France',          live: false, gateways: [] },
    { code: 'NL', flag: '🇳🇱', name: 'Netherlands',     live: false, gateways: [] },
    { code: 'NG', flag: '🇳🇬', name: 'Nigeria',         live: false, gateways: [] },
    { code: 'ZA', flag: '🇿🇦', name: 'South Africa',    live: false, gateways: [] },
  ]
  const GATEWAY_INFO: Record<string, { number: string; rawNumber: string }> = {
    'bKash': { number: '+880 1772 921 788', rawNumber: '01772921788' },
    'Nagad': { number: '+880 1772 921 788', rawNumber: '01772921788' },
  }
  const COUNTRY_CURRENCY: Record<string, string> = {
    BD: 'BDT', OM: 'OMR', GB: 'GBP', US: 'USD',
    SA: 'SAR', AE: 'AED', QA: 'QAR', KW: 'KWD',
    BH: 'BHD', MY: 'MYR', IN: 'INR', PK: 'PKR',
    TR: 'TRY', EG: 'EGP', SG: 'SGD', ID: 'IDR',
    JP: 'JPY', KR: 'KRW', CA: 'CAD', AU: 'AUD',
    DE: 'EUR', FR: 'EUR', NL: 'EUR', NG: 'NGN', ZA: 'ZAR',
  }
  const selectedCountryData = PAY_COUNTRIES.find((c) => c.code === payCountry)

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <div className="relative">
        <PageHero
          eyebrow="Yanabiya Charitable Foundation"
          title={hero?.title || 'Donations Portal for Charitable'}
          subtitle={hero?.subtitle || '100% of every donation goes directly to the cause you choose — no deductions, no hidden fees. Give with confidence.'}
          centered
          ghostText=""
        />
        <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-between pt-5 md:pt-6 pointer-events-none">
          <Link to="/community/community-care"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
            <ArrowLeft size={13} /> Community Care
          </Link>
          <Link to="/community/testimonials"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
            Testimonials <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <Section id="donation" className="relative overflow-hidden bg-[#F9F5EC] !pt-0">

        {/* ── Faith banner ──────────────────────────────────────── */}
        <div className="bg-brand-deep text-center py-10 px-6 relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 opacity-[0.05] pointer-events-none
                                     [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.3)_0px,rgba(255,255,255,0.3)_1px,transparent_1px,transparent_50%)]
                                     [background-size:20px_20px]" />
          <div className="relative flex items-center justify-center gap-2 mb-3">
            <HandHeart size={14} className="text-amber-400" />
            <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.38em]">Yanabiya Charitable Foundation</span>
          </div>
          <h2 className="relative font-serif text-white text-2xl md:text-3xl italic mb-2">
            "A Chance to Build Your Palace in Jannah"
          </h2>
          <p className="relative text-white/50 text-xs max-w-sm mx-auto">
            The Prophet ﷺ said: "Charity does not decrease wealth." — Sahih Muslim
          </p>

          {/* Stats */}
          <div className="relative mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden max-w-2xl mx-auto">
            {stats.map((s) => (
              <div key={s.l} className="bg-brand-deep/80 flex flex-col items-center py-5 px-3">
                <span className="font-serif text-2xl md:text-3xl font-light text-amber-400 leading-none mb-0.5">{s.v}</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container-x py-12">

          {/* ── Cause cards ──────────────────────────────────────── */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="block w-8 h-px bg-amber-400 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-700">Where Your Gift Goes</span>
                <span className="block w-8 h-px bg-amber-400 rounded-full" />
              </div>
              <h3 className="font-serif text-slate-900 text-2xl md:text-3xl">
                Choose a{' '}
                <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Cause to Support
                </span>
              </h3>
              {selectedCause && (
                <p className="mt-2 text-sm text-emerald-700 font-medium">
                  ✓ Selected: {selectedCause}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {causes.map((c) => {
                const active = selectedCause === c.label
                return (
                  <button
                    key={c.label}
                    type="button"
                    onClick={() => setSelectedCause(active ? '' : c.label)}
                    className={`group relative rounded-2xl overflow-hidden aspect-[4/3] text-left
                               transition-all duration-300
                               ${active
                                 ? 'ring-3 ring-offset-2 shadow-xl scale-[1.02]'
                                 : 'hover:-translate-y-1 hover:shadow-lg shadow-md'
                               }`}
                    style={active ? { outlineColor: c.color } : {}}
                  >
                    {/* Photo */}
                    <img
                      src={c.image}
                      alt={c.label}
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Active checkmark */}
                    {active && (
                      <div
                        className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center z-10"
                        style={{ backgroundColor: c.color }}
                      >
                        <Check size={13} strokeWidth={3} className="text-white" />
                      </div>
                    )}

                    {/* Icon top-left */}
                    {!active && (
                      <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm
                                     flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.icon}
                      </div>
                    )}

                    {/* Content bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white font-semibold text-xs leading-snug mb-1">{c.label}</p>
                      <p className="text-white/0 group-hover:text-white/75 text-[10px] leading-snug
                                   transition-all duration-300 max-h-0 group-hover:max-h-12 overflow-hidden">
                        {c.description}
                      </p>
                      {/* Impact pill */}
                      <span
                        className="inline-block mt-1.5 text-[9px] font-bold uppercase tracking-wide
                                   rounded-full px-2 py-0.5 text-white opacity-0 group-hover:opacity-100
                                   transition-opacity duration-300"
                        style={{ backgroundColor: `${c.color}cc` }}
                      >
                        {c.impact}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Donation form + payment ───────────────────────────── */}
          <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
          <div className="grid grid-cols-2 gap-8 min-w-[640px]">

            {/* Left: full checkout card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">

              {/* Header */}
              <div className="bg-brand-deep px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 grid place-items-center shrink-0">
                  <Heart size={16} className="text-brand-accent" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white leading-tight">Payment Method</h3>
                  <p className="text-white/45 text-[10px]">Choose your amount, pick country, follow steps</p>
                </div>
              </div>

              <div className="p-6 space-y-5">

                {/* Choose Programme */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-2">
                    Choose Programme
                  </div>
                  <select
                    value={selectedCause}
                    onChange={(e) => setSelectedCause(e.target.value)}
                    className={ipt}
                  >
                    <option value="">Select a cause to support</option>
                    {causes.map((c) => (
                      <option key={c.label} value={c.label}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Amount tiers */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-3">
                    Your Contribution
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {amounts.map((a) => {
                      const active = selectedAmt === a.v
                      return (
                        <button
                          key={a.v}
                          type="button"
                          onClick={() => { setSelectedAmt(a.v); if (a.v !== 'Custom') setCustomAmt('') }}
                          className={`rounded-xl border-2 px-3 py-2.5 text-left transition-all duration-200
                                     ${active
                                       ? 'border-brand-accent bg-brand-50 shadow-sm'
                                       : 'border-slate-200 bg-white hover:border-brand-accent/50'
                                     }`}
                        >
                          {a.v !== 'Custom' ? (
                            <span className={`block font-bold text-base leading-none mb-0.5
                                             ${active ? 'text-brand-accentDark' : 'text-slate-800'}`}>
                              ${a.v}
                            </span>
                          ) : null}
                          <span className={`block text-[10px] leading-snug
                                           ${active ? 'text-brand-accentDark font-semibold' : 'text-slate-400'}`}>
                            {a.v === 'Custom' ? '✏️ Custom' : a.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  {selectedAmt === 'Custom' && (
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter amount"
                      value={customAmt}
                      onChange={(e) => setCustomAmt(e.target.value)}
                      className={ipt}
                    />
                  )}
                </div>

                {/* Country dropdown */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-2">
                    From where will you make payment?
                  </div>
                  <select
                    value={payCountry ?? ''}
                    onChange={(e) => { setPayCountry(e.target.value || null); setPayGateway(null) }}
                    className={ipt}
                  >
                    <option value="">-- Select your country --</option>
                    {PAY_COUNTRIES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                  <a
                    href="mailto:donate@yanabiyagroup.com"
                    className="mt-2.5 flex items-center justify-center gap-2 w-full rounded-xl border border-brand-accent/40
                               text-brand-accentDark text-xs font-semibold py-2.5
                               hover:bg-brand-accent/10 transition-colors"
                  >
                    <Mail size={13} /> Contact Us to Donate
                  </a>
                </div>

                {/* Gateway — live country */}
                {payCountry && selectedCountryData?.live && (
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">
                      Payment Gateway
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCountryData.gateways.map((gw) => (
                        <button
                          key={gw}
                          type="button"
                          onClick={() => setPayGateway(gw)}
                          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all
                                     ${payGateway === gw
                                       ? 'border-brand-accent bg-brand-50 text-brand-accentDark'
                                       : 'border-slate-200 bg-white text-slate-600 hover:border-brand-accent/50'}`}
                        >
                          {gw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Coming soon — non-live country */}
                {payCountry && selectedCountryData && !selectedCountryData.live && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-center">
                    <p className="text-amber-700 font-semibold text-sm mb-1">
                      Coming Soon
                    </p>
                    <p className="text-amber-600 text-xs leading-relaxed">
                      Payment gateway for your chosen location is on its way.
                      Stay with us — we are working to bring it live soon.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-amber-700
                                 underline underline-offset-2 hover:text-amber-900 transition-colors"
                    >
                      Contact us in the meantime
                    </Link>
                  </div>
                )}

                {/* QR panel — bKash / Nagad */}
                {payGateway && GATEWAY_INFO[payGateway] && (
                  <div className="rounded-xl bg-brand-50 border border-brand-accent/20 p-4">
                    <div className="flex gap-4 items-start">
                      <div className="shrink-0 text-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${GATEWAY_INFO[payGateway].rawNumber}&bgcolor=f0fdf4&color=0f3a23&margin=8`}
                          alt={`${payGateway} QR`}
                          width={112}
                          height={112}
                          className="w-28 h-28 rounded-xl border border-brand-accent/20"
                        />
                        <p className="text-[9px] text-slate-400 mt-1">Scan to pay</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-1.5">
                          {payGateway} Number
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold text-slate-900 leading-tight">{GATEWAY_INFO[payGateway].number}</span>
                          <button
                            type="button"
                            onClick={() => copy(GATEWAY_INFO[payGateway].rawNumber, 'num')}
                            className="text-slate-400 hover:text-brand-accentDark transition-colors shrink-0"
                          >
                            {copied === 'num' ? <CheckCircle size={14} className="text-brand-accent" /> : <Copy size={14} />}
                          </button>
                        </div>
                        <div className="rounded-lg bg-white border border-brand-accent/30 px-3 py-2">
                          <p className="text-[10px] text-slate-400 leading-none mb-0.5">Amount to send</p>
                          <p className="font-bold text-brand-accentDark text-xl leading-none">
                            {COUNTRY_CURRENCY[payCountry ?? ''] ?? ''}&nbsp;{selectedAmt === 'Custom' ? (customAmt || '—') : selectedAmt}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Bank Transfer panel */}
                {payGateway === 'Bank Transfer' && (
                  <div className="rounded-xl bg-brand-50 border border-brand-accent/20 p-4 space-y-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-2">Bank Details</p>
                    {bankRows.map(({ k, v }) => (
                      <div key={k} className="flex items-center justify-between gap-3 py-1 border-b border-slate-100 last:border-0">
                        <span className="text-[11px] text-slate-400 w-20 shrink-0">{k}</span>
                        <div className="flex items-center gap-1.5 justify-end flex-1">
                          <span className="text-[11px] text-slate-800 font-medium text-right">{v}</span>
                          {(k === 'Account No' || k === 'SWIFT') && (
                            <button type="button" onClick={() => copy(v, k)}
                                    className="text-slate-300 hover:text-brand-accentDark transition-colors shrink-0">
                              {copied === k ? <CheckCircle size={12} className="text-brand-accent" /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="rounded-lg bg-white border border-brand-accent/30 px-3 py-2 mt-2">
                      <p className="text-[10px] text-slate-400 leading-none mb-0.5">Amount to transfer</p>
                      <p className="font-bold text-brand-accentDark text-xl leading-none">
                        BDT&nbsp;{selectedAmt === 'Custom' ? (customAmt || '—') : selectedAmt}
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Us panel */}
                {payGateway === 'Contact Us' && (
                  <div className="rounded-xl bg-brand-50 border border-brand-accent/20 p-4 text-center">
                    <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                      For donations from <strong>{selectedCountryData?.name}</strong>, reach out and we'll arrange the best payment method.
                    </p>
                    <a
                      href="mailto:donate@yanabiyagroup.com"
                      className="inline-flex items-center gap-2 rounded-full border-2 border-brand-accent
                                 text-brand-accentDark font-semibold text-sm px-5 py-2.5
                                 hover:bg-brand-accent hover:text-white transition-all"
                    >
                      <Send size={13} /> donate@yanabiyagroup.com
                    </a>
                  </div>
                )}

                {/* Invoice fields */}
                {payGateway && payGateway !== 'Contact Us' && (
                  <div>
                    {!noInvoice && (
                      <div className="space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                          Get Invoice{' '}
                          <span className="font-normal normal-case text-slate-300">(optional)</span>
                        </div>
                        <input
                          placeholder="Your Name"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          className={ipt}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            placeholder="Phone Number"
                            value={donorPhone}
                            onChange={(e) => setDonorPhone(e.target.value)}
                            className={ipt}
                          />
                          <input
                            type="email"
                            placeholder="Email Address"
                            value={donorEmail}
                            onChange={(e) => setDonorEmail(e.target.value)}
                            className={ipt}
                          />
                        </div>
                      </div>
                    )}
                    <label className="flex items-center gap-2 text-xs text-slate-500 cursor-pointer mt-2.5 select-none">
                      <input
                        type="checkbox"
                        checked={noInvoice}
                        onChange={(e) => setNoInvoice(e.target.checked)}
                        className="rounded border-slate-300 accent-brand-deep"
                      />
                      I don't need an invoice
                    </label>
                  </div>
                )}

                {/* Confirm + success */}
                {payGateway && payGateway !== 'Contact Us' && !submitted && (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full
                                 bg-brand-deep text-white font-bold px-7 py-3.5 text-sm
                                 hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-lg
                                 transition-all shadow-md"
                    >
                      Confirm My Donation <Send size={14} />
                    </button>
                  </form>
                )}

                {submitted && (
                  <div className="rounded-xl bg-brand-50 border border-brand-accent/30 p-5 text-center">
                    <CheckCircle size={40} className="text-brand-accent mx-auto mb-3" />
                    <p className="text-slate-900 font-serif text-xl mb-1">JazakAllah Khayran!</p>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed mb-3">
                      Your generous contribution will make a real difference. May Allah reward you with His best.
                    </p>
                    <button type="button" onClick={() => setSubmitted(false)}
                            className="text-xs text-brand-accentDark hover:underline">
                      Donate again →
                    </button>
                  </div>
                )}

              </div>
            </div>

            {/* Right: Why Donate With Us — trust card */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden flex flex-col">

              {/* Header */}
              <div className="bg-brand-deep px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/15 grid place-items-center shrink-0">
                  <Shield size={16} className="text-amber-400" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white leading-tight">Why Donate With Us</h3>
                  <p className="text-white/45 text-[10px]">Trusted, Transparent, Halal verified</p>
                </div>
              </div>

              <div className="p-6 flex flex-col gap-6 flex-1">

                {/* Trust checkpoints */}
                <div className="space-y-3">
                  {([
                    { color: 'bg-emerald-500', title: 'Registered Organisation',    desc: 'Yanabiya Charitable Foundation — officially registered and audited across four countries.' },
                    { color: 'bg-sky-500',     title: '100% Reaches the Cause',     desc: 'Administrative costs are covered separately — every penny of your gift goes directly to the cause.' },
                    { color: 'bg-amber-500',   title: 'Shariah-Compliant',          desc: 'All programmes are reviewed and approved under Islamic guidelines.' },
                    { color: 'bg-rose-500',    title: 'Personal Acknowledgement',   desc: 'Every donor receives a personalised thank-you message and impact update.' },
                  ] as const).map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-6 h-6 rounded-full ${item.color} grid place-items-center shrink-0 text-white`}>
                        <Check size={13} strokeWidth={2.5} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 leading-none mb-0.5">{item.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Fund allocation */}
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-accentDark mb-3">Fund Allocation</p>
                  <div className="space-y-2.5">
                    {([
                      { label: 'Direct to cause', pct: '100%', barClass: 'w-full bg-brand-accent' },
                    ] as const).map((row) => (
                      <div key={row.label}>
                        <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                          <span>{row.label}</span>
                          <span className="font-semibold text-slate-700">{row.pct}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div className={`h-full rounded-full ${row.barClass}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Org details */}
                <div className="rounded-xl bg-brand-50 border border-brand-accent/20 px-4 py-3 space-y-1.5">
                  <p className="text-xs font-bold text-slate-900">Yanabiya Charitable Foundation</p>
                  <p className="text-[11px] text-slate-500">Oman, United Kingdom, Bangladesh, USA</p>
                  <a
                    href="mailto:donate@yanabiyagroup.com"
                    className="inline-flex items-center gap-1.5 text-[11px] text-brand-accentDark font-semibold hover:underline"
                  >
                    <Mail size={11} /> donate@yanabiyagroup.com
                  </a>
                </div>

                {/* Donor quote */}
                <div className="border-l-4 border-brand-accent/40 pl-4">
                  <p className="text-sm italic text-slate-600 leading-relaxed">
                    "I've donated through several platforms — Yanabiya is the only one that sent me a personal message and showed exactly where my money went."
                  </p>
                  <p className="mt-2 text-[11px] font-semibold text-slate-500">— Fatima R., UK donor</p>
                </div>

              </div>
            </div>

          </div>
          </div>

          {/* ── How it works ──────────────────────────────────────────── */}
          <div className="mt-16">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="block w-8 h-px bg-amber-400 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-amber-700">Simple, Transparent, Impactful</span>
                <span className="block w-8 h-px bg-amber-400 rounded-full" />
              </div>
              <h3 className="font-serif text-slate-900 text-2xl md:text-3xl">
                How Your{' '}
                <span className="bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent">
                  Donation Works
                </span>
              </h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {([
                {
                  step: '01',
                  color: 'bg-emerald-500',
                  title: 'Choose a Cause',
                  desc: 'Pick the programme that speaks to your heart — from orphan care and masjid support to student scholarships.',
                },
                {
                  step: '02',
                  color: 'bg-sky-500',
                  title: 'Complete Payment',
                  desc: 'Select your country and follow the gateway steps — bKash, Nagad, bank transfer, or contact us directly.',
                },
                {
                  step: '03',
                  color: 'bg-amber-500',
                  title: 'We Deliver the Impact',
                  desc: 'Funds reach the cause within 7 days. You receive a personal confirmation and an impact update.',
                },
              ] as const).map((s, i) => (
                <div key={s.step} className="card-panel relative text-center overflow-hidden">
                  <span aria-hidden className="absolute top-3 right-4 font-serif text-5xl font-black text-slate-100 leading-none select-none">{s.step}</span>
                  <div className={`relative z-10 w-12 h-12 rounded-full ${s.color} grid place-items-center mx-auto mb-4 shadow-md`}>
                    {i === 0 && <Heart size={20} className="text-white" />}
                    {i === 1 && <Send size={20} className="text-white" />}
                    {i === 2 && <CheckCircle size={20} className="text-white" />}
                  </div>
                  <h4 className="relative z-10 font-semibold text-slate-900 text-base mb-2">{s.title}</h4>
                  <p className="relative z-10 text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── About / Contact strip ─────────────────────────────────── */}
          <div className="mt-10 rounded-2xl bg-brand-deep overflow-hidden relative">
            <div aria-hidden className="absolute inset-0 opacity-[0.04] pointer-events-none
                                       [background-image:repeating-linear-gradient(45deg,rgba(255,255,255,0.3)_0px,rgba(255,255,255,0.3)_1px,transparent_1px,transparent_50%)]
                                       [background-size:20px_20px]" />
            <div className="relative grid md:grid-cols-2">

              {/* Left — About */}
              <div className="px-8 py-8 border-b md:border-b-0 md:border-r border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <HandHeart size={15} className="text-amber-400" />
                  <span className="text-amber-400 text-[10px] font-bold uppercase tracking-[0.32em]">About the Foundation</span>
                </div>
                <h4 className="font-serif text-white text-xl mb-3 leading-snug">Yanabiya Charitable Foundation</h4>
                <p className="text-white/55 text-sm leading-relaxed">
                  Established to serve communities across Oman, Bangladesh, the United Kingdom and the USA —
                  we direct charitable funds to those who need them most with full transparency and Islamic integrity.
                  Every programme is managed by a dedicated team and reviewed by a Shariah board.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Registered NGO', 'Shariah Board Approved', '15+ Years of Service', '4 Countries'].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/20 text-white/55 text-[11px] px-3 py-1">{tag}</span>
                  ))}
                </div>
              </div>

              {/* Right — Contact */}
              <div className="px-8 py-8">
                <div className="flex items-center gap-2 mb-4">
                  <Mail size={14} className="text-sky-400" />
                  <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.32em]">Get in Touch</span>
                </div>
                <p className="text-white/55 text-sm leading-relaxed mb-5">
                  Questions about our programmes, how we serve each cause, or need help with your donation?
                  Our team responds within one business day.
                </p>
                <div className="space-y-2.5">
                  <a
                    href="mailto:donate@yanabiyagroup.com"
                    className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10
                               px-4 py-3 text-sm text-white transition-colors"
                  >
                    <Heart size={14} className="text-amber-400 shrink-0" />
                    donate@yanabiyagroup.com — Donation enquiries
                  </a>
                  <a
                    href="mailto:info@yanabiyagroup.com"
                    className="flex items-center gap-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10
                               px-4 py-3 text-sm text-white transition-colors"
                  >
                    <Building2 size={14} className="text-sky-400 shrink-0" />
                    info@yanabiyagroup.com — General enquiries
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </Section>
    </>
  )
}
