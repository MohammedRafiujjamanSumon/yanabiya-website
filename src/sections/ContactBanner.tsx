import { useState } from 'react'
import { Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import { contact } from '../data/contact'

// ── Sectors list — add new entries here to extend the dropdown ────────────────
const SECTORS = [
  'Information Technology',
  'Cloud Infrastructure & Managed Services',
  'Cyber Security',
  'ERP & Enterprise Software',
  'Data Analytics & Business Intelligence',
  'Modern UI/UX & Product Design',
  'Real Estate',
  'Hospitality & Tourism',
  'Trading & Import/Export',
  'General Inquiry',
]

export default function ContactBanner() {
  const [submitted, setSubmitted] = useState(false)

  const ipt =
    'w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white ' +
    'placeholder:text-white/40 focus:outline-none focus:border-brand-accent ' +
    'focus:ring-2 focus:ring-brand-accent/30 transition-all'

  return (
    <section
      id="contact-banner"
      className="relative overflow-hidden bg-brand-deep"
      style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #0f3823 60%, #0d3020 100%)' }}
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-brand-accent/8 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-[560px] h-[560px] rounded-full bg-brand-accent/6 blur-[140px]" />

      <div className="relative z-10 container-x py-20 md:py-24">
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-2 gap-16 items-start min-w-[640px]">

          {/* ── LEFT — call to action ───────────────────────────────────── */}
          <div className="text-white">
            <span className="inline-block text-[11px] font-bold tracking-[0.22em] uppercase
                             text-brand-accent bg-brand-accent/12 border border-brand-accent/25
                             rounded-full px-4 py-1.5 mb-6">
              Get In Touch
            </span>

            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight mb-5">
              Let&rsquo;s Start the{' '}
              <span className="text-brand-accent">Conversation.</span>
            </h2>

            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-sm mb-10">
              Whether you&rsquo;re exploring a partnership, need a technology solution, or simply
              want to learn more — our team is ready to respond within one business day.
            </p>

            {/* Quick contact pills */}
            <div className="space-y-4">
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 border border-brand-accent/25
                                grid place-items-center text-brand-accent flex-shrink-0
                                group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Phone size={15} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 mb-0.5">Headquarters</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                    {contact.phones[0]}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${contact.emails[0]}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 border border-brand-accent/25
                                grid place-items-center text-brand-accent flex-shrink-0
                                group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail size={15} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 mb-0.5">Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                    {contact.emails[0]}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/15 border border-brand-accent/25
                                grid place-items-center text-brand-accent flex-shrink-0">
                  <MapPin size={15} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.16em] text-white/40 mb-0.5">Muscat, Oman</div>
                  <div className="text-sm font-semibold text-white/80">
                    {contact.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT — form ────────────────────────────────────────────── */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm">
            <h3 className="font-serif text-xl md:text-2xl text-white mb-1">Send Us a Message</h3>
            <p className="text-white/45 text-sm mb-7">We&rsquo;ll route your message to the right team.</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <CheckCircle size={48} className="text-brand-accent" />
                <p className="text-white font-semibold text-lg">Message Received!</p>
                <p className="text-white/55 text-sm">
                  Thank you — a member of our team will be in touch shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-brand-accent hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="grid gap-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Your Name" className={ipt} />
                  <input required type="email" placeholder="Email Address" className={ipt} />
                </div>

                {/* Sector dropdown — add to SECTORS array above to extend */}
                <select required defaultValue="" aria-label="Select a sector" className={ipt}>
                  <option value="" disabled className="text-slate-800">
                    Select a Sector
                  </option>
                  {SECTORS.map((s) => (
                    <option key={s} value={s} className="text-slate-800">
                      {s}
                    </option>
                  ))}
                </select>

                <input required placeholder="Subject" className={ipt} />
                <textarea
                  required
                  rows={4}
                  placeholder="Your Message"
                  className={`${ipt} resize-none`}
                />

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full
                             bg-brand-accent text-white font-semibold px-7 py-3.5
                             hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-lg
                             transition-all shadow-md shadow-brand-accent/30"
                >
                  Send Message <Send size={15} />
                </button>
              </form>
            )}
          </div>

        </div>
        </div>
      </div>
    </section>
  )
}
