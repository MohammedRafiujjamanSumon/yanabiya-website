import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Send, ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { contactByCountry } from '../data/contact'
import { countries } from '../data/countries'
import { assets } from '../data/assets'

type Palette = {
  /** Solid header colour. */
  header: string
  /** Slightly darker shade used for the chevron-arrow bleed. */
  arrow: string
}

// Per-country palette inspired by the reference infographic
// (red → orange → amber → blue ribbon banners).
const PALETTES: Record<string, Palette> = {
  OM: { header: '#b91c1c', arrow: '#7f1d1d' }, // red — HQ
  GB: { header: '#ea580c', arrow: '#9a3412' }, // orange
  BD: { header: '#d97706', arrow: '#92400e' }, // amber
  US: { header: '#0e7490', arrow: '#155e75' }, // teal-blue
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const offices = useMemo(
    () =>
      contactByCountry.flatMap((cc) => {
        const country = countries.find((c) => c.code === cc.code)
        return country ? [{ ...cc, country }] : []
      }),
    [],
  )

  const ipt =
    'bg-brand-50 border border-brand-deep/15 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 ' +
    'focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 transition-all'

  return (
    <Section id="contact" className="bg-brand-50">
      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto fade-up" style={{ animationDelay: '60ms' }}>
          <Eyebrow>Contact Us</Eyebrow>
          <p className="mt-4 text-base md:text-lg text-slate-700 font-medium">
            Let&rsquo;s start the conversation.
          </p>
          <p className="mt-3 text-slate-600 leading-snug">
            Reach our headquarters in Muscat or any of our offices across the United Kingdom,
            Bangladesh and the United States.
          </p>
        </div>

        {/* OFFICE BANNERS — compact ribbons, one per country.
         *  Click a banner to jump to the dedicated /contact landing page
         *  with the network diagram + full per-office details. */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {offices.map((o) => (
            <OfficeBanner
              key={o.code}
              code={o.code}
              flag={o.country.flag}
              countryName={o.country.name}
              role={o.country.role}
              palette={PALETTES[o.code] ?? PALETTES.OM}
            />
          ))}
        </div>

        {/* CONTACT FORM */}
        <div
          className="mt-12 rounded-2xl bg-brand-50 border border-brand-deep/15 p-8 md:p-10 shadow-sm fade-up"
          style={{ animationDelay: '420ms' }}
        >
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Send Us a Message</h3>
            <p className="mt-2 text-slate-600 text-sm">
              We typically reply within one business day.
            </p>
          </div>
          <form
            className="grid gap-4 max-w-3xl mx-auto"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder="Your Name" className={ipt} />
              <input required type="email" placeholder="Email Address" className={ipt} />
            </div>
            <select required defaultValue="" aria-label="Which office should we route this to?" className={ipt}>
              <option value="" disabled>
                Which office should we route this to?
              </option>
              {offices.map((o) => (
                <option key={o.code} value={o.code}>
                  {o.country.flag} {o.country.name} — {o.country.role}
                </option>
              ))}
            </select>
            <input required placeholder="Subject" className={ipt} />
            <textarea required rows={5} placeholder="Your Message" className={`${ipt} resize-none`} />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full
                         bg-brand-accent text-white font-semibold px-7 py-3.5
                         hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-lg
                         transition-all shadow"
            >
              Send Message <Send size={16} />
            </button>
            {submitted && (
              <div className="text-sm text-brand-accentDark text-center mt-2">
                ✓ Thanks — your message has been received.
              </div>
            )}
          </form>
        </div>

      </div>
    </Section>
  )
}

function OfficeBanner({
  code,
  flag,
  countryName,
  role,
  palette,
}: {
  code: string
  flag: string
  countryName: string
  role: string
  palette: Palette
}) {
  return (
    <Link
      to={`/contact#${code}`}
      aria-label={`Open the ${countryName} office page`}
      className="group relative flex flex-col rounded-md overflow-hidden bg-brand-50
                 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.18)]
                 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-14px_rgba(15,23,42,0.30)]
                 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-accent/40"
    >
      {/* Coloured top header with the flag */}
      <div
        className="relative h-32 md:h-36 grid place-items-center text-white"
        style={{ backgroundColor: palette.header }}
      >
        <span className="text-5xl md:text-6xl drop-shadow leading-none" aria-hidden>
          {flag}
        </span>

        {/* Folded-ribbon chevron */}
        <svg
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -bottom-5 md:-bottom-6"
          width="84"
          height="32"
          viewBox="0 0 84 32"
        >
          <polygon points="0,0 84,0 42,32" fill={palette.arrow} />
        </svg>
      </div>

      {/* Pin icon under the arrow tip */}
      <div className="mt-9 md:mt-10 grid place-items-center">
        <div
          className="w-10 h-10 rounded-full grid place-items-center text-white shadow-sm"
          style={{ backgroundColor: palette.arrow }}
        >
          <MapPin size={18} />
        </div>
      </div>

      {/* Compact content — name + role + CTA */}
      <div className="px-5 md:px-6 pt-4 pb-6 flex-1 flex flex-col items-center text-center">
        <div className="font-bold uppercase tracking-[0.18em] text-[13px] md:text-[14px] text-slate-900">
          {countryName}
        </div>
        <div
          className="mt-1 text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{ color: palette.arrow }}
        >
          {role}
        </div>

        <div className="mt-5 mx-auto h-px w-12 bg-slate-200" />

        <span
          className="mt-5 inline-flex items-center justify-center gap-1.5 rounded-full
                     px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em]
                     text-brand-deep transition-transform duration-300
                     group-hover:-translate-y-0.5 group-hover:gap-2"
          style={{ backgroundColor: palette.arrow }}
        >
          Visit Office <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}
