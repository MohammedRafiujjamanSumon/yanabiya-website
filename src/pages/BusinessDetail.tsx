import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, Send, ArrowRight } from 'lucide-react'
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

  return (
    <Section id="business-detail" className="bg-brand-ink">
      <div className="container-x">
        <div className="fade-up">
          <div className="max-w-5xl mx-auto text-center">
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

            {business.footer && (
              <div className="mt-10 overflow-hidden">
                <p
                  className="text-slate-200 italic whitespace-nowrap text-center"
                  style={{ fontSize: 'clamp(0.55rem, 1.8vw, 1rem)' }}
                >
                  {business.footer}
                </p>
              </div>
            )}

            {business.subServices && business.subServices.length > 0 && (
              <SubServicesSection subServices={business.subServices} />
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

  return (
    <div className="mt-20 text-left">
      <div className="text-center mb-10">
        <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-3">
          Our Core Services
        </h3>
        <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
          Explore Our IT & Software Offerings
        </h2>
        <div className="w-16 h-0.5 bg-brand-accent rounded-full mx-auto mt-4" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {subServices.map((s) => (
          <button
            key={s.slug}
            type="button"
            onClick={() => setActive(s)}
            className="group relative rounded-2xl overflow-hidden shadow-lg h-72
                       hover:-translate-y-1 transition-transform text-left
                       focus:outline-none focus:ring-2 focus:ring-brand-accent block"
          >
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover
                         transition-transform duration-500 group-hover:scale-105"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            <div className="absolute top-4 right-4 w-11 h-11 rounded-full
                            bg-white/90 text-blue-600 grid place-items-center shadow
                            ring-2 ring-white/70">
              <s.icon size={20} />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start gap-3">
              <h3 className="text-white text-lg font-semibold leading-tight drop-shadow">
                {s.title}
              </h3>
              <p className="text-slate-200 text-xs leading-relaxed line-clamp-2">
                {s.body}
              </p>
              <span className="inline-flex items-center gap-2 rounded-full
                               px-4 py-1.5 text-xs font-semibold uppercase tracking-wider
                               bg-white/95 text-blue-700
                               transition-colors group-hover:bg-brand-accent group-hover:text-white">
                Read More
                <ArrowRight size={12} />
              </span>
            </div>
          </button>
        ))}
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

