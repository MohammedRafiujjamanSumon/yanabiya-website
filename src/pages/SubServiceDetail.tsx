import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Send, ArrowRight, ArrowLeft } from 'lucide-react'
import Section from '../components/Section'
import {
  businesses,
  type SubService,
  type CountryPresence,
} from '../data/businesses'
import { countries as countryList } from '../data/countries'

function CountryPresenceGrid({
  entries,
  compact = false,
}: {
  entries: CountryPresence[]
  compact?: boolean
}) {
  return (
    <div className={compact ? 'mt-6' : 'mt-12'}>
      <h4 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-4 text-center">
        Our Global Presence
      </h4>
      <div
        className={`grid gap-3 ${
          compact ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-4'
        }`}
      >
        {entries.map((entry) => {
          const country = countryList.find((c) => c.code === entry.code)
          if (!country) return null
          const isHQ = entry.code === 'OM'
          return (
            <div
              key={entry.code}
              className="rounded-xl border border-white/15 bg-white/[0.04] p-4
                         hover:border-brand-accent/40 transition text-left"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl leading-none shrink-0">{country.flag}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h5 className="text-sm font-semibold text-white leading-tight">
                      {country.name}
                    </h5>
                    {isHQ && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded
                                       bg-brand-accent/20 text-brand-accent border border-brand-accent/30">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400 mt-0.5">
                    {country.role}
                  </p>
                  <p className="text-xs text-slate-200 mt-2 leading-relaxed">{entry.note}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
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
          <h2 className="font-serif text-3xl text-white mb-4">Service not found</h2>
          <Link
            to="/#businesses"
            className="inline-flex items-center gap-2 mt-4 text-brand-accent hover:text-white"
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
    <Section id="sub-service-detail" className="bg-brand-ink">
      <div className="container-x">
        {/* Breadcrumb + prev/next */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2 text-xs md:text-sm text-slate-300 flex-wrap">
            <Link
              to="/#businesses"
              className="font-semibold uppercase tracking-[0.18em]
                         hover:text-brand-accent transition-colors"
            >
              Our Service
            </Link>
            <span className="text-slate-500">›</span>
            <Link
              to={`/business/${business.slug}`}
              className="font-semibold uppercase tracking-[0.18em]
                         hover:text-brand-accent transition-colors"
            >
              {business.title.replace('🤝 ', '')}
            </Link>
            <span className="text-slate-500">›</span>
            <span className="font-semibold text-white normal-case tracking-normal">
              {sub.title}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-slate-400 ml-auto">
            {prev && (
              <Link
                to={`/business/${business.slug}/${prev.slug}`}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full
                           border border-white/15 text-slate-200 hover:border-brand-accent/60 hover:text-brand-accent
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
                           bg-brand-accent text-brand-ink font-semibold uppercase tracking-[0.14em]
                           hover:bg-white transition-colors"
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
            <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 grid place-items-center ring-4 ring-white/10 shadow-lg">
              <sub.icon size={36} />
            </div>
            <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-brand-accent">
              {business.title.replace('🤝 ', '')}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-white leading-tight">
              {sub.title}
            </h1>
            <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
            <p className="text-slate-200 leading-relaxed max-w-3xl mx-auto">{sub.body}</p>
          </div>

          {/* Features list — numbered, mirroring the live site's style but in our brand */}
          <div className="mt-8">
            <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-6 text-center">
              What We Offer
            </h3>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto">
              {sub.features.map((f, i) => (
                <li
                  key={f}
                  className="flex items-start gap-3 text-sm text-slate-200 rounded-lg
                             bg-white/[0.03] border border-white/10 p-3
                             hover:border-brand-accent/30 transition"
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/15 text-brand-accent
                               grid place-items-center text-[11px] font-bold tracking-wide"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-1 leading-snug">{f}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Country grid */}
          {sub.countries && sub.countries.length > 0 && (
            <CountryPresenceGrid entries={sub.countries} />
          )}

          {/* CTA form */}
          <SubServiceForm sub={sub} businessTitle={business.title} />

          {/* Other services in this division */}
          {others.length > 0 && (
            <div className="mt-16 pt-10 border-t border-white/10">
              <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-accent mb-2 text-center">
                {business.title.replace('🤝 ', '')}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight mb-6 text-center">
                More services in this division
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/business/${business.slug}/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl bg-white/[0.05] border border-white/10
                               p-4 transition-all duration-300
                               hover:bg-white/[0.10] hover:border-brand-accent/40 hover:-translate-y-0.5"
                  >
                    <span
                      className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                                 bg-brand-accent/15 text-brand-accent
                                 transition-colors duration-300
                                 group-hover:bg-brand-accent group-hover:text-brand-deep"
                    >
                      <s.icon size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-semibold text-white leading-tight">
                        {s.title}
                      </div>
                      <div
                        className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-accent
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
    'w-full bg-white/5 border border-white/15 rounded-md px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-accent'

  return (
    <div className="mt-14 mx-auto max-w-3xl text-left">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl md:text-3xl text-white">Get This Service</h3>
        <p className="text-sm text-slate-300 mt-2">
          Tell us a bit about yourself and we will get in touch within one business day.
        </p>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
          >
            Request {sub.title} →
          </button>
        )}
      </div>

      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="bg-white/5 border border-brand-accent/20 rounded-xl p-5 md:p-6 grid gap-4 fade-up"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Name</label>
              <input required type="text" placeholder="Full name" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Email</label>
              <input required type="email" placeholder="you@company.com" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Phone</label>
              <input required type="tel" placeholder="+968 …" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Location</label>
              <input required type="text" placeholder="City, country" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">
                Service <span className="opacity-60 normal-case">({businessTitle.replace('🤝 ', '')})</span>
              </label>
              <select title="Service" defaultValue={sub.slug} className={inputCls} required>
                <option value={sub.slug} className="bg-brand-ink">
                  {sub.title}
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Customer Type</label>
              <select title="Customer Type" className={inputCls} defaultValue="">
                <option value="" disabled className="bg-brand-ink">Select one</option>
                <option className="bg-brand-ink">Individual</option>
                <option className="bg-brand-ink">SME / Startup</option>
                <option className="bg-brand-ink">Enterprise / Corporate</option>
                <option className="bg-brand-ink">Government / Public sector</option>
                <option className="bg-brand-ink">Non-profit</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
          >
            Request Service <Send size={14} />
          </button>

          {submitted && (
            <div className="text-sm text-brand-accent text-center">
              Thanks — your request has been received. Our team will contact you shortly.
            </div>
          )}
        </form>
      )}
    </div>
  )
}

