import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircle2, Send, ArrowRight, ArrowLeft } from 'lucide-react'
import Section from '../components/Section'
import { businesses, type SubService } from '../data/businesses'

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
          <h2 className="font-serif text-3xl text-white mb-4">Sector not found</h2>
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
    <Section id="business-detail" className="bg-brand-ink">
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-white/10">
          <Link
            to="/#businesses"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.18em]
                       text-slate-300 hover:text-brand-accent transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Service List
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-xs text-slate-400 ml-auto">
            {prevBusiness && (
              <Link
                to={`/business/${prevBusiness.slug}`}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full
                           border border-white/15 text-slate-200 hover:border-brand-accent/60 hover:text-brand-accent
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
                           hover:bg-white transition-colors"
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
                <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                  {business.title}
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
                <p className="text-slate-200 leading-relaxed text-center max-w-2xl mx-auto">
                  {business.details}
                </p>
              </div>
            )}

            {!hasSubServices && (
              <div className="mt-12">
                <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-5">
                  What We Offer
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-2xl mx-auto">
                  {business.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
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
              <SubServicesSection subServices={business.subServices!} />
            )}

            <ServiceForm sectorTitle={business.title} features={business.features} />
          </div>
        </div>
      </div>
    </Section>
  )
}

function SubServicesSection({ subServices }: { subServices: SubService[] }) {
  const [active, setActive] = useState<SubService | null>(null)
  const [flippedSlug, setFlippedSlug] = useState<string | null>(null)

  return (
    <div className="text-left">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
          Explore Our IT &amp; Development Service
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
                      <h3 className="text-white text-sm sm:text-base font-semibold leading-tight drop-shadow">
                        {s.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setActive(s)
                    }}
                    className="flip-card-face flip-card-back bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-700 flex items-center justify-center text-center cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                                     bg-white/95 text-emerald-700 text-xs font-bold uppercase tracking-[0.18em]
                                     shadow-lg">
                      Read More
                      <ArrowRight size={12} />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {active && <SubServiceModal sub={active} onClose={() => setActive(null)} />}
    </div>
  )
}

function SubServiceModal({ sub, onClose }: { sub: SubService; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-brand-ink border border-brand-accent/30 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white grid place-items-center text-xl"
          aria-label="Close"
        >
          ×
        </button>
        <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
          <img src={sub.image} alt={sub.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/60 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 grid place-items-center ring-2 ring-white/20 shrink-0">
              <sub.icon size={22} />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">
              {sub.title}
            </h3>
          </div>
        </div>
        <div className="p-6 md:p-8">
          <p className="text-slate-200 leading-relaxed mb-6">{sub.body}</p>
          <h4 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-4">
            What We Offer
          </h4>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
            {sub.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ServiceForm({ sectorTitle, features }: { sectorTitle: string; features: string[] }) {
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  const inputCls =
    'w-full bg-white/5 border border-white/15 rounded-md px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-accent'

  return (
    <div className="mt-14 mx-auto max-w-3xl text-left">
      <div className="text-center mb-6">
        <h3 className="font-serif text-2xl md:text-3xl text-white">Get Our Service</h3>
        <p className="text-sm text-slate-300 mt-2">
          Tell us a bit about yourself and we will get in touch within one business day.
        </p>
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[11px] font-bold hover:bg-white transition"
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
                Our Service <span className="opacity-60 normal-case">({sectorTitle})</span>
              </label>
              <select defaultValue="" className={inputCls} required>
                <option value="" disabled className="bg-brand-ink">Select a service</option>
                {features.map((f) => (
                  <option key={f} value={f} className="bg-brand-ink">
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.18em] text-brand-accent mb-2">Customer Type</label>
              <select className={inputCls} defaultValue="">
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

