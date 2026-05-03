import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Send, ArrowRight, ArrowLeft, MapPin, Mail, Phone, User, Building, MessageSquare, ChevronDown } from 'lucide-react'
import Section from '../components/Section'
import { businesses, type SubService } from '../data/businesses'
import { assets } from '../data/assets'
import { countries as countryList } from '../data/countries'

const DEFAULT_VIDEO =
  'https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4'

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

export default function BusinessDetail() {
  const { slug } = useParams<{ slug: string }>()
  const business = businesses.find((b) => b.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!business) {
    return (
      <Section id="business-not-found" className="bg-brand-ink">
        <div className="container-x text-center text-slate-200 py-20">
          <h2 className="font-serif text-3xl text-brand-deep mb-4">Sector not found</h2>
        </div>
      </Section>
    )
  }

  const hasSubServices = !!business.subServices && business.subServices.length > 0
  const currentIndex = businesses.findIndex((b) => b.slug === business.slug)
  const prevBusiness = currentIndex > 0 ? businesses[currentIndex - 1] : null
  const nextBusiness =
    currentIndex < businesses.length - 1 ? businesses[currentIndex + 1] : null

  return (
    <Section
      id="business-detail"
      className="relative overflow-hidden bg-brand-50"
    >
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[150px]" />
      </div>
      <div className="container-x relative">
        {/* Breadcrumb nav */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-brand-deep/10">
          <Link
            to="/#businesses"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]
                       text-brand-deep/60 hover:text-brand-accentDark transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Service List
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs ml-auto">
            {prevBusiness && (
              <Link
                to={`/business/${prevBusiness.slug}`}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full
                           border border-brand-deep/20 text-brand-deep/70 hover:border-brand-accent hover:text-brand-accentDark
                           transition-colors"
                title={prevBusiness.title}
              >
                <ArrowLeft size={12} />
                <span>Previous:</span>
                <span className="font-semibold normal-case tracking-normal">
                  {prevBusiness.title}
                </span>
              </Link>
            )}
            {nextBusiness && (
              <Link
                to={`/business/${nextBusiness.slug}`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full
                           bg-brand-accent text-white font-semibold uppercase tracking-[0.14em]
                           hover:bg-brand-accentDark transition-colors"
                title={nextBusiness.title}
              >
                <span>Next:</span>
                <span className="font-bold normal-case tracking-normal">
                  {nextBusiness.title}
                </span>
                <ArrowRight size={14} />
              </Link>
            )}
          </div>
        </div>

        <div className="fade-up">
          <div className="max-w-5xl mx-auto text-center">
            {!hasSubServices && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 border-2 border-brand-accent/30 shadow-2xl bg-brand-deep">
                <video
                  key={business.slug}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={business.videoUrl ?? DEFAULT_VIDEO}
                  poster={business.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent pointer-events-none" />
              </div>
            )}

            {!hasSubServices && (
              <div className="flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-white grid place-items-center ring-4 ring-brand-accent/30 shadow-lg overflow-hidden">
                  <img src={assets.logo} alt="Yanabiya" className="w-14 h-14 object-contain" />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
                  {business.title}
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
                <p className="text-brand-deep/70 leading-snug text-center max-w-2xl mx-auto">
                  {business.details}
                </p>
              </div>
            )}

            {!hasSubServices && (
              <div className="mt-12">
                <h3 className="text-brand-accentDark uppercase tracking-[0.22em] text-xs font-bold mb-5">
                  What We Offer
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-2xl mx-auto">
                  {business.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-brand-deep/80">
                      <CheckCircle2 size={16} className="text-brand-accentDark shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {!hasSubServices && business.footer && (
              <div className="mt-10 overflow-hidden">
                <p
                  className="text-brand-deep/60 italic whitespace-nowrap text-center"
                  style={{ fontSize: 'clamp(0.55rem, 1.8vw, 1rem)' }}
                >
                  {business.footer}
                </p>
              </div>
            )}

            {hasSubServices && (
              <>
                {/* Hero banner */}
                <div className="relative w-full aspect-[21/8] rounded-2xl overflow-hidden mb-10 shadow-2xl">
                  <img
                    src={business.image}
                    alt={business.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/80 via-brand-deep/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6">
                    <div className="w-20 h-20 rounded-full bg-white/90 ring-4 ring-white/50 grid place-items-center overflow-hidden shadow-xl">
                      <img src={assets.logo} alt="Yanabiya" className="w-14 h-14 object-contain" />
                    </div>
                    <h2 className="font-serif text-2xl md:text-4xl text-white drop-shadow-lg text-center">
                      {business.title}
                    </h2>
                    {business.details && (
                      <p className="text-white/80 text-sm max-w-xl text-center drop-shadow">
                        {business.details}
                      </p>
                    )}
                  </div>
                </div>
                <SubServicesSection
                  businessSlug={business.slug}
                  subServices={business.subServices!}
                  heading={business.subServicesHeading ?? 'Explore Our Services'}
                />
              </>
            )}

            <ServiceForm sectorTitle={business.title} features={business.features} />

            <RelatedDivisions
              currentSlug={business.slug}
              excludeSlug={nextBusiness?.slug}
            />
          </div>
        </div>
      </div>
    </Section>
  )
}

function RelatedDivisions({
  currentSlug,
  excludeSlug,
}: {
  currentSlug: string
  excludeSlug?: string
}) {
  const others = businesses.filter(
    (b) => b.slug !== currentSlug && b.slug !== excludeSlug,
  )
  if (others.length === 0) return null
  return (
    <div className="mt-12 pt-10 border-t border-brand-deep/10">
      <div className="text-[11px] font-semibold uppercase tracking-[0.32em] text-brand-accentDark mb-2">
        From the Group
      </div>
      <h3 className="font-serif text-2xl md:text-3xl text-brand-deep leading-tight mb-6">
        Explore other divisions
      </h3>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {others.map((b) => (
          <Link
            key={b.slug}
            to={`/business/${b.slug}`}
            className="group flex flex-col rounded-xl overflow-hidden border border-white/70
                       bg-white/50 transition-all duration-300
                       hover:bg-white/70 hover:border-brand-accent hover:-translate-y-1 shadow-sm"
          >
            {/* Image */}
            <div className="relative h-32 overflow-hidden">
              <img
                src={b.image}
                alt={b.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 to-transparent" />
              <span className="absolute bottom-2 left-2 grid place-items-center w-8 h-8 rounded-lg
                               bg-brand-accent/90 text-white shadow
                               transition-colors duration-300 group-hover:bg-brand-accent">
                <b.icon size={15} strokeWidth={1.6} />
              </span>
            </div>

            {/* Text */}
            <div className="p-3">
              <div className="text-[13px] font-semibold text-brand-deep leading-tight">
                {b.title.replace('🤝 ', '')}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-brand-accentDark
                              inline-flex items-center gap-1 transition-all duration-300
                              group-hover:gap-1.5">
                Explore <ArrowRight size={11} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SubServicesSection({
  businessSlug,
  subServices,
  heading,
}: {
  businessSlug: string
  subServices: SubService[]
  heading: string
}) {
  return (
    <div className="text-left">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
          {heading}
        </h2>
        <div className="w-16 h-0.5 bg-brand-accent rounded-full mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
        {subServices.map((s) => (
          <Link
            key={s.slug}
            to={`/business/${businessSlug}/${s.slug}`}
            className="group flex flex-col rounded-2xl overflow-hidden
                       bg-white/60 border border-white/80 shadow-sm
                       hover:shadow-xl hover:shadow-brand-accent/10
                       hover:-translate-y-1 hover:border-brand-accent/40
                       transition-all duration-300"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="w-full h-full object-cover
                           group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement
                  img.style.display = 'none'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent
                              group-hover:from-brand-accent/10 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-2.5 p-4 flex-1">
              <h3 className="text-brand-deep font-semibold text-sm leading-snug">
                {s.title}
              </h3>

              {s.countries && s.countries.length > 0 && (
                <div className="flex gap-1.5 flex-wrap">
                  {s.countries.map((c) => {
                    const cc = countryList.find((x) => x.code === c.code)
                    return cc ? (
                      <span
                        key={c.code}
                        className="text-[15px] leading-none"
                        title={cc.name}
                      >
                        {cc.flag}
                      </span>
                    ) : null
                  })}
                </div>
              )}

              <div className="mt-auto pt-1 inline-flex items-center gap-1
                              text-brand-accentDark text-xs font-semibold
                              group-hover:gap-2 transition-all duration-200">
                Read More
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ServiceForm({ sectorTitle, features }: { sectorTitle: string; features: string[] }) {
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)

  const inputCls =
    'w-full bg-white/70 border border-brand-deep/15 rounded-lg px-4 py-3 text-sm text-brand-deep placeholder:text-brand-deep/40 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition'

  const labelCls = 'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-brand-deep/70 mb-2'

  return (
    <div className="mt-16 mx-auto max-w-3xl text-left">
      {/* Section header */}
      <div className="text-center mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-accentDark mb-2">
          Work with us
        </p>
        <h3 className="font-serif text-2xl md:text-3xl text-brand-deep">Get Our Service</h3>
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
            Get Our Service
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {open && !submitted && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="bg-white/60 border border-white/80 rounded-2xl p-6 md:p-8 shadow-xl shadow-brand-accent/5 fade-up"
        >
          {/* Row 1: Name + Company */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>
                <User size={12} />
                Full Name
              </label>
              <input required type="text" placeholder="Your full name" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <Building size={12} />
                Company / Organisation
              </label>
              <input type="text" placeholder="Company name (optional)" className={inputCls} />
            </div>
          </div>

          {/* Row 2: Email + Phone */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>
                <Mail size={12} />
                Email Address
              </label>
              <input required type="email" placeholder="you@company.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>
                <Phone size={12} />
                Phone Number
              </label>
              <input required type="tel" placeholder="+968 9000 0000" className={inputCls} />
            </div>
          </div>

          {/* Row 3: Location + Customer type */}
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>
                <MapPin size={12} />
                Your Country
              </label>
              <div className="relative">
                <select
                  title="Your Country"
                  required
                  defaultValue=""
                  className={`${inputCls} appearance-none pr-10`}
                >
                  <option value="" disabled>Select country</option>
                  {COUNTRY_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep/40 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className={labelCls}>
                <User size={12} />
                Customer Type
              </label>
              <div className="relative">
                <select
                  title="Customer Type"
                  defaultValue=""
                  className={`${inputCls} appearance-none pr-10`}
                >
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

          {/* Row 4: Service */}
          <div className="mb-4">
            <label className={labelCls}>
              <Building size={12} />
              Service Required
              <span className="normal-case tracking-normal font-normal opacity-60">
                — {sectorTitle.replace('🤝 ', '')}
              </span>
            </label>
            <div className="relative">
              <select
                title="Service Required"
                required
                defaultValue=""
                className={`${inputCls} appearance-none pr-10`}
              >
                <option value="" disabled>Select a service</option>
                {features.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-deep/40 pointer-events-none" />
            </div>
          </div>

          {/* Row 5: Description */}
          <div className="mb-6">
            <label className={labelCls}>
              <MessageSquare size={12} />
              Description / Message
            </label>
            <textarea
              placeholder="Briefly describe your requirement, project scope, or any specific questions..."
              rows={4}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Submit */}
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
