import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CheckCircle2, Send } from 'lucide-react'
import Section from '../components/Section'
import { businesses } from '../data/businesses'

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

            <ServiceForm sectorTitle={business.title} features={business.features} />
          </div>
        </div>
      </div>
    </Section>
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

