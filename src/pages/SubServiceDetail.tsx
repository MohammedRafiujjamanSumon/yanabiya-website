import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Send, ArrowRight, ArrowLeft, MapPin, Mail, Phone, User, Building, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react'
import Section from '../components/Section'
import { businesses, type SubService } from '../data/businesses'
import { assets } from '../data/assets'

const COUNTRY_OPTIONS = [
  { value: 'OM', label: 'Oman' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'US', label: 'United States' },
  { value: 'AE', label: 'UAE' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'QA', label: 'Qatar' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'IN', label: 'India' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PH', label: 'Philippines' },
  { value: 'OTHER', label: 'Other' },
]

const HOVER_COLORS = [
  { from: '#065f46', to: '#064e3b' },  // green
  { from: '#1e40af', to: '#1e3a8a' },  // blue
  { from: '#6d28d9', to: '#5b21b6' },  // violet
  { from: '#be185d', to: '#9d174d' },  // pink
  { from: '#b45309', to: '#92400e' },  // amber
  { from: '#0e7490', to: '#155e75' },  // cyan
  { from: '#7e22ce', to: '#6b21a8' },  // purple
  { from: '#0369a1', to: '#075985' },  // sky
  { from: '#b91c1c', to: '#991b1b' },  // red
  { from: '#0f766e', to: '#115e59' },  // teal
  { from: '#4338ca', to: '#3730a3' },  // indigo
  { from: '#15803d', to: '#166534' },  // dark green
]

function FeatureCard({ f, idx }: { f: string; idx: number }) {
  const [hovered, setHovered] = useState(false)
  const color = HOVER_COLORS[idx % HOVER_COLORS.length]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      onTouchEnd={() => setHovered(false)}
      className="grid place-items-center min-h-[64px] rounded-2xl px-5 py-3 cursor-default
                 shadow-[0_4px_16px_rgba(15,58,35,0.30)]
                 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                 transition-all duration-300"
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${color.from}, ${color.to})`
          : 'linear-gradient(135deg, #166534, #15803d, #14532d)',
      }}
    >
      <span className="text-[13px] font-semibold text-white leading-snug text-center">{f}</span>
    </div>
  )
}

export default function SubServiceDetail() {
  const { slug, subSlug } = useParams<{ slug: string; subSlug: string }>()
  const business = businesses.find((b) => b.slug === slug)
  const sub = business?.subServices?.find((s) => s.slug === subSlug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug, subSlug])

  if (!business || !sub) {
    return (
      <Section id="sub-service-not-found" className="bg-brand-ink">
        <div className="container-x text-center text-slate-200 py-20">
          <h2 className="font-serif text-3xl text-brand-deep mb-4">Service not found</h2>
          <Link
            to="/#businesses"
            className="inline-flex items-center gap-2 mt-4 text-brand-accentDark hover:text-brand-deep"
          >
            <ArrowLeft size={14} /> Back to Service List
          </Link>
        </div>
      </Section>
    )
  }

  const subs = business.subServices ?? []
  const idx = subs.findIndex((s) => s.slug === sub.slug)
  const prev = idx > 0 ? subs[idx - 1] : null
  const next = idx < subs.length - 1 ? subs[idx + 1] : null
  const others = subs.filter((s) => s.slug !== sub.slug).slice(0, 6)

  return (
    <Section
      id="sub-service-detail"
      className="relative overflow-hidden
                 bg-brand-50"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[150px]" />
      </div>
      <div className="container-x relative">
        {/* Breadcrumb + prev/next */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-brand-deep/10">
          <div className="flex items-center gap-2 text-xs md:text-sm text-brand-deep/60 flex-wrap">
            <Link
              to="/#businesses"
              className="font-semibold uppercase tracking-[0.18em]
                         hover:text-brand-accentDark transition-colors"
            >
              Our Service
            </Link>
            <span className="text-brand-deep/30">›</span>
            <Link
              to={`/business/${business.slug}`}
              className="font-semibold uppercase tracking-[0.18em]
                         hover:text-brand-accentDark transition-colors"
            >
              {business.title.replace('🤝 ', '')}
            </Link>
            <span className="text-brand-deep/30">›</span>
            <span className="font-semibold text-brand-deep normal-case tracking-normal">
              {sub.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs ml-auto">
            {prev && (
              <Link
                to={`/business/${business.slug}/${prev.slug}`}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full
                           border border-brand-deep/20 text-brand-deep/70 hover:border-brand-accent hover:text-brand-accentDark
                           transition-colors"
                title={prev.title}
              >
                <ArrowLeft size={12} />
                <span>Previous:</span>
                <span className="font-semibold normal-case tracking-normal">
                  {prev.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                to={`/business/${business.slug}/${next.slug}`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
                           bg-brand-accent text-white font-semibold uppercase tracking-[0.14em]
                           hover:bg-brand-accentDark transition-colors"
                title={next.title}
              >
                <span>Next:</span>
                <span className="font-bold normal-case tracking-normal">{next.title}</span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>

        {/* Hero banner + header */}
        <div className="fade-up max-w-5xl mx-auto">
          <div className="relative w-full aspect-[21/8] rounded-2xl overflow-hidden mb-10 shadow-2xl">
            <img
              src={sub.image}
              alt={sub.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
              <div className="w-20 h-20 rounded-full bg-white/90 ring-4 ring-white/50 grid place-items-center overflow-hidden shadow-xl">
                <img src={assets.logo} alt="Yanabiya" className="w-14 h-14 object-contain" />
              </div>
              <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-white/70">
                {business.title.replace('🤝 ', '')}
              </p>
              <h1 className="font-serif text-2xl md:text-4xl text-white drop-shadow-lg text-center">
                {sub.title}
              </h1>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
            <p className="text-brand-deep/70 leading-relaxed max-w-3xl mx-auto">{sub.body}</p>
          </div>

          {/* ── What We Offer — horizontal scroll green cards ── */}
          <div className="mt-10">
            <h3 className="text-brand-accentDark uppercase tracking-[0.22em] text-xs font-bold mb-5 text-center">
              What We Offer
            </h3>
            <div className="max-w-2xl mx-auto flex flex-col gap-3">
              {Array.from({ length: Math.ceil(sub.features.length / 3) }, (_, ci) => {
                const chunk = sub.features.slice(ci * 3, ci * 3 + 3)
                const baseIdx = ci * 3
                return (
                  <div key={ci} className="flex flex-col gap-3">
                    {/* 1 card — full width */}
                    <FeatureCard f={chunk[0]} idx={baseIdx} />
                    {/* 2 cards — side by side */}
                    {chunk.length > 1 && (
                      <div className="grid grid-cols-2 gap-3">
                        {chunk.slice(1).map((f, j) => (
                          <FeatureCard key={f} f={f} idx={baseIdx + j + 1} />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA form */}
          <SubServiceForm sub={sub} businessTitle={business.title} />

          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-brand-deep/10">
              <h3 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight mb-6 text-center">
                More services in this division
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/business/${business.slug}/${s.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden
                               bg-white border border-brand-accent/15
                               shadow-[0_4px_16px_rgba(15,58,35,0.08)]
                               hover:shadow-[0_8px_28px_rgba(15,58,35,0.18)]
                               hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement
                          img.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-transparent to-transparent" />
                      <span className="absolute bottom-2 right-2 w-8 h-8 rounded-full
                                       bg-white/20 backdrop-blur-sm ring-1 ring-white/40
                                       grid place-items-center">
                        <s.icon size={15} className="text-white" strokeWidth={1.8} />
                      </span>
                    </div>
                    {/* Text */}
                    <div className="px-4 py-3 flex items-center justify-between gap-2">
                      <span className="text-[13px] font-bold text-brand-deep leading-snug">
                        {s.title}
                      </span>
                      <span className="shrink-0 inline-flex items-center gap-0.5
                                       text-[10px] font-bold uppercase tracking-[0.18em]
                                       text-brand-accentDark group-hover:gap-1.5 transition-all">
                        Read More <ArrowRight size={10} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}

function SubServiceForm({ sub, businessTitle }: { sub: SubService; businessTitle: string }) {
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  const inputCls =
    'w-full bg-white/70 border border-brand-deep/15 rounded-lg px-4 py-3 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition'
  const labelCls = 'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep/70 mb-2'

  return (
    <div className="mt-16 mx-auto max-w-3xl text-left">
      <div className="text-center mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accentDark mb-2">
          Work with us
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-brand-deep">Get This Service</h3>
        <p className="text-sm text-brand-deep/60 mt-2 max-w-md mx-auto">
          Tell us a bit about yourself and we will get in touch within one business day.
        </p>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 mt-5 px-8 py-3.5 rounded-full
                       bg-brand-accent text-white font-semibold text-sm
                       shadow-lg shadow-brand-accent/30
                       hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-accent/40
                       active:translate-y-0 active:scale-[0.98]
                       transition-all duration-300"
          >
            Request {sub.title}
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {open && !submitted && (
        <form
          onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
          className="bg-white/60 border border-white/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-brand-accent/5 fade-up"
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}><User size={12} />Full Name</label>
              <input required type="text" placeholder="Your full name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}><Building size={12} />Company / Organisation</label>
              <input type="text" placeholder="Company name (optional)" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}><Mail size={12} />Email Address</label>
              <input required type="email" placeholder="you@company.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}><Phone size={12} />Phone Number</label>
              <input required type="tel" placeholder="+968 9000 0000" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}><MapPin size={12} />Your Country</label>
              <div className="relative">
                <select title="Your Country" required defaultValue="" className={`${inputCls} appearance-none pr-10`}>
                  <option value="" disabled>Select country</option>
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep/40 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelCls}><User size={12} />Customer Type</label>
              <div className="relative">
                <select title="Customer Type" defaultValue="" className={`${inputCls} appearance-none pr-10`}>
                  <option value="" disabled>Select one</option>
                  <option>Individual</option>
                  <option>SME / Startup</option>
                  <option>Enterprise / Corporate</option>
                  <option>Government / Public Sector</option>
                  <option>Non-profit / NGO</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep/40 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className={labelCls}>
              <Building size={12} />
              Service
              <span className="normal-case tracking-normal font-normal opacity-60">— {businessTitle.replace('🤝 ', '')}</span>
            </label>
            <div className="relative">
              <select title="Service" defaultValue={sub.title} className={`${inputCls} appearance-none pr-10`}>
                <option value={sub.title}>{sub.title}</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep/40 pointer-events-none" />
            </div>
          </div>

          <div className="mb-6">
            <label className={labelCls}><MessageSquare size={12} />Description / Message</label>
            <textarea
              placeholder="Briefly describe your requirement, project scope, or any specific questions..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2
                         px-8 py-3.5 rounded-full
                         bg-brand-accent text-white font-semibold text-sm
                         shadow-lg shadow-brand-accent/30
                         hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-accent/40
                         active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300"
            >
              Send Request
              <Send size={15} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs text-brand-deep/50 hover:text-brand-deep transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="bg-white/60 border border-brand-accent/30 rounded-2xl p-8 text-center shadow-lg fade-up">
          <div className="w-14 h-14 rounded-full bg-brand-accent/15 text-brand-accentDark grid place-items-center mx-auto mb-4">
            <CheckCircle2 size={28} />
          </div>
          <h4 className="font-serif text-xl text-brand-deep mb-2">Request Received!</h4>
          <p className="text-sm text-brand-deep/60">
            Thank you — our team will contact you within one business day.
          </p>
        </div>
      )}
    </div>
  )
}

