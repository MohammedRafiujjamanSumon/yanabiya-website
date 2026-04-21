import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Send } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { businesses, type Business } from '../data/businesses'

// Fallback video if a sector doesn't set its own videoUrl
const DEFAULT_VIDEO =
  'https://videos.pexels.com/video-files/8084618/8084618-uhd_2560_1440_25fps.mp4'

/**
 * Our Businesses — 2-row × 3-col grid (six sectors).
 * Clicking a card opens an in-section "separate page" for that sector
 * (hero + long details + features list + back button).
 */
export default function Businesses() {
  const [active, setActive] = useState<Business | null>(null)

  return (
    <Section id="businesses" className="bg-brand-ink">
      <div className="container-x">

        {active ? (
          /* ───────────── SECTOR DETAIL "PAGE" ───────────── */
          <div className="fade-up">
            <button
              onClick={() => setActive(null)}
              className="inline-flex items-center gap-2 text-brand-accent hover:text-white mb-6 text-sm uppercase tracking-[0.18em] font-semibold"
            >
              <ArrowLeft size={16} /> Back to all sectors
            </button>

            <div className="max-w-5xl mx-auto text-center">
              {/* Big auto-play video banner — full width, centred */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 border-2 border-brand-accent/30 shadow-2xl bg-brand-deep">
                <video
                  key={active.slug}
                  className="absolute inset-0 w-full h-full object-cover"
                  src={active.videoUrl ?? DEFAULT_VIDEO}
                  poster={active.image}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Icon · Title · Description — centred stack */}
              <div className="flex flex-col items-center gap-5">
                <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 grid place-items-center ring-4 ring-white/10 shadow-lg">
                  <active.icon size={36} />
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                  {active.title}
                </h2>
                <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
                <p className="text-slate-200 leading-relaxed text-center max-w-2xl mx-auto">
                  {active.details}
                </p>
              </div>

              {/* What We Offer — centred */}
              <div className="mt-12">
                <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-5">
                  What We Offer 🧩
                </h3>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-2xl mx-auto">
                  {active.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-200">
                      <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {active.footer && (
                <div className="mt-10 overflow-hidden">
                  <p className="text-slate-200 italic whitespace-nowrap text-center"
                     style={{ fontSize: 'clamp(0.55rem, 1.8vw, 1rem)' }}>
                    {active.footer}
                  </p>
                </div>
              )}

              {/* Get Our Service — lead form */}
              <ServiceForm sectorTitle={active.title} features={active.features} />
            </div>
          </div>
        ) : (
          /* ───────────── GRID OF SECTORS ───────────── */
          <>
            <Eyebrow tone="light">Our Businesses</Eyebrow>
            <p className="text-slate-300 leading-relaxed text-center max-w-xl mx-auto mb-10">
              Strategic divisions powering integrated enterprise solutions, global trade, and
              workforce ecosystems across key international markets.
            </p>

            {/* 2 rows × 3 cols on lg; 2 cols on md; 1 col on mobile */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {businesses.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => setActive(b)}
                  className="group relative card-panel overflow-hidden !bg-white hover:-translate-y-1 transition text-center"
                >
                  <div className="relative flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 grid place-items-center mb-4 ring-4 ring-blue-50 shadow-sm">
                      <b.icon size={28} />
                    </div>
                    <h3 className="text-slate-900 mb-2 text-xl">{b.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed text-center">{b.body}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs text-blue-600 uppercase tracking-widest font-semibold group-hover:gap-2 transition-all">
                      Learn more →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  )
}

/* ───────── Get Our Service — simple lead-capture form ───────── */

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
        onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
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
