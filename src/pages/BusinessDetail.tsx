import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Send, ArrowRight, ArrowLeft } from 'lucide-react'
import Section from '../components/Section'
import { businesses, type SubService } from '../data/businesses'
import { countries as countryList } from '../data/countries'

const DEFAULT_VIDEO =
  'https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4'

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
      className="relative overflow-hidden
                 bg-brand-50"
    >
      {/* Brand backdrop — same dark forest-green / brand-accent halos
       *  as the home About section. Existing page copy stays as-is on
       *  top; only the bg + decorative layers come from About's voice. */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-emerald-500/15 blur-[150px]" />
        <div className="absolute -bottom-32 -right-24 w-[460px] h-[460px] rounded-full bg-amber-400/10 blur-[150px]" />
      </div>
      <div className="container-x relative">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-slate-200">
          <Link
            to="/#businesses"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]
                       text-slate-300 hover:text-brand-accentDark transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Service List
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-slate-400 ml-auto">
            {prevBusiness && (
              <Link
                to={`/business/${prevBusiness.slug}`}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full
                           border border-slate-200 text-slate-200 hover:border-brand-accent hover:text-brand-accentDark
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
                           bg-brand-accent text-brand-ink font-semibold uppercase tracking-[0.14em]
                           hover:bg-brand-50 transition-colors"
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
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 grid place-items-center ring-4 ring-white/10 shadow-lg">
                  <business.icon size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
                  {business.title}
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
                <p className="text-slate-200 leading-snug text-center max-w-2xl mx-auto">
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
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
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
                  className="text-slate-200 italic whitespace-nowrap text-center"
                  style={{ fontSize: 'clamp(0.55rem, 1.8vw, 1rem)' }}
                >
                  {business.footer}
                </p>
              </div>
            )}

            {hasSubServices && (
              <SubServicesSection
                businessSlug={business.slug}
                subServices={business.subServices!}
                heading={business.subServicesHeading ?? 'Explore Our IT & Development Service'}
              />
            )}

            <ServiceForm sectorTitle={business.title} features={business.features} />

            {/* Related Divisions strip — cross-discovery into the rest of the group */}
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

/* Related Divisions — shows every other division as a compact card so
 * visitors can quickly jump to the rest of the Yanabiya Group. The
 * "next" division (already linked from the top Next chip) is filtered
 * out to avoid duplication. */
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
    <div className="mt-12 pt-10 border-t border-slate-200">
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
            className="group flex items-start gap-3 rounded-xl bg-white/[0.05] border border-slate-200
                       p-4 transition-all duration-300
                       hover:bg-white/[0.10] hover:border-brand-accent hover:-translate-y-0.5"
          >
            <span className="shrink-0 grid place-items-center w-10 h-10 rounded-lg
                             bg-brand-accent/15 text-brand-accentDark
                             transition-colors duration-300
                             group-hover:bg-brand-accent group-hover:text-brand-deep">
              <b.icon size={18} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold text-brand-deep leading-tight">
                {b.title.replace('🤝 ', '')}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-brand-accentDark
                              inline-flex items-center gap-1
                              transition-all duration-300
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
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null)

  return (
    <div className="text-left">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
          {heading}
        </h2>
        <div className="w-16 h-0.5 bg-brand-accent rounded-full mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-7">
        {subServices.map((s) => {
          const isFlipped = flippedSlug === s.slug
          return (
            <div key={s.slug}>
              <div
                className={`flip-card h-44 sm:h-48 lg:h-52 ${isFlipped ? 'is-flipped' : ''}`}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  setFlippedSlug((prev) => (prev === s.slug ? null : s.slug))
                }}
              >
                <div className="flip-card-inner shadow-xl">
                  <div className="flip-card-face">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/85" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-3 sm:p-4 gap-2 sm:gap-3">
                      <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 text-blue-600 grid place-items-center ring-2 ring-white/40 shadow-lg">
                        <s.icon size={18} />
                      </div>
                      <h3 className="text-brand-deep text-sm sm:text-base font-semibold leading-tight drop-shadow">
                        {s.title}
                      </h3>
                    </div>
                    {s.countries && s.countries.length > 0 && (
                      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
                        {s.countries.map((c) => {
                          const cc = countryList.find((x) => x.code === c.code)
                          return cc ? (
                            <span
                              key={c.code}
                              className="text-base leading-none drop-shadow-md"
                              title={cc.name}
                            >
                              {cc.flag}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>

                  <Link
                    to={`/business/${businessSlug}/${s.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flip-card-face flip-card-back bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 flex items-center justify-center text-center cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                     bg-white/95 text-emerald-700 text-xs font-bold uppercase tracking-[0.18em]
                                     shadow-lg">
                      Read More
                      <ArrowRight size={12} />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ServiceForm({ sectorTitle, features }: { sectorTitle: string; features: string[] }) {
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  const inputCls =
    'w-full bg-brand-50 border border-brand-deep/15 rounded-md px-4 py-3 text-sm text-brand-deep placeholder:text-slate-400 focus:outline-none focus:border-brand-accent'

  return (
    <div className="mt-14 mx-auto max-w-3xl text-left">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl md:text-3xl text-brand-deep">Get Our Service</h3>
        <p className="text-sm text-slate-300 mt-2">
          Tell us a bit about yourself and we will get in touch within one business day.
        </p>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-brand-50 transition"
          >
            Get Our Service →
          </button>
        )}
      </div>

      {open && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="bg-brand-50 border border-brand-accent/20 rounded-xl p-5 md:p-6 grid gap-4 fade-up"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">Name</label>
              <input required type="text" placeholder="Full name" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">Email</label>
              <input required type="email" placeholder="you@company.com" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">Phone</label>
              <input required type="tel" placeholder="+968 …" className={inputCls} />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">Location</label>
              <input required type="text" placeholder="City, country" className={inputCls} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">
                Our Service <span className="opacity-60 normal-case">({sectorTitle})</span>
              </label>
              <select title="Our Service" defaultValue="" className={inputCls} required>
                <option value="" disabled className="bg-brand-ink">Select a service</option>
                {features.map((f) => (
                  <option key={f} value={f} className="bg-brand-ink">
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accentDark mb-2">Customer Type</label>
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
            className="inline-flex items-center justify-center gap-2 mt-2 px-6 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-brand-50 transition"
          >
            Request Service <Send size={14} />
          </button>

          {submitted && (
            <div className="text-sm text-brand-accentDark text-center">
              Thanks — your request has been received. Our team will contact you shortly.
            </div>
          )}
        </form>
      )}
    </div>
  )
}

