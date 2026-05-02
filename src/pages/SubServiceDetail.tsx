import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Send, ArrowRight, ArrowLeft, MapPin, Mail, Phone, User, Building, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react'
import Section from '../components/Section'
import { businesses, type SubService } from '../data/businesses'

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

        {/* Header (no hero image) */}
        <div className="fade-up max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full bg-brand-accent/15 text-brand-accentDark grid place-items-center ring-4 ring-brand-accent/20 shadow-lg">
              <sub.icon size={36} />
            </div>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-brand-accentDark">
              {business.title.replace('🤝 ', '')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
              {sub.title}
            </h1>
            <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
            <p className="text-brand-deep/70 leading-relaxed max-w-3xl mx-auto">{sub.body}</p>
          </div>

          <div className="mt-8">
            <h3 className="text-brand-accentDark uppercase tracking-[0.22em] text-xs font-bold mb-6 text-center">
              What We Offer
            </h3>
            <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-3 max-w-3xl mx-auto">
              {sub.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-brand-deep/80 rounded-xl
                             bg-white/60 border border-white/80 p-3.5 shadow-sm
                             hover:border-brand-accent/30 hover:shadow-md transition"
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/15 text-brand-accentDark
                               grid place-items-center text-[11px] font-bold tracking-wide"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-1 leading-snug">{f}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* CTA form */}
          <SubServiceForm sub={sub} businessTitle={business.title} />

          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-brand-deep/10">
              <h3 className="font-serif text-2xl md:text-3xl text-brand-deep leading-tight mb-6 text-center">
                More services in this division
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/business/${business.slug}/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl bg-white/60 border border-white/80
                               p-4 shadow-sm transition-all duration-300
                               hover:bg-white/80 hover:border-brand-accent hover:-translate-y-0.5"
                  >
                    <span
                      className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                                 bg-brand-accent/15 text-brand-accentDark
                                 transition-colors duration-300
                                 group-hover:bg-brand-accent group-hover:text-white"
                    >
                      <s.icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-brand-deep leading-tight">
                        {s.title}
                      </div>
                      <div
                        className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-accentDark
                                   inline-flex items-center gap-1
                                   transition-all duration-300
                                   group-hover:gap-1.5"
                      >
                        Read More <ArrowRight size={11} />
                      </div>
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

