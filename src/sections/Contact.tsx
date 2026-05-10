import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Send, ArrowRight, Phone, Mail, User, MessageSquare } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { contactByCountry } from '../data/contact'
import { countries } from '../data/countries'

type Palette = {
  /** Solid header colour. */
  header: string
  /** Slightly darker shade used for the chevron-arrow bleed. */
  arrow: string
}

const PALETTES: Record<string, Palette> = {
  OM: { header: '#b91c1c', arrow: '#7f1d1d' },
  GB: { header: '#ea580c', arrow: '#9a3412' },
  BD: { header: '#d97706', arrow: '#92400e' },
  US: { header: '#0e7490', arrow: '#155e75' },
}

const FLAG_IMG: Record<string, string> = {
  OM: '/yanabiya-website/maps/flags/om.svg',
  GB: '/yanabiya-website/maps/flags/gb.svg',
  BD: '/yanabiya-website/maps/flags/bd.svg',
  US: '/yanabiya-website/maps/flags/us.svg',
}

export default function Contact() {
  const { t } = useTranslation()
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
    'w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 ' +
    'focus:outline-none focus:border-brand-accentDark focus:ring-4 focus:ring-brand-accent/20 transition-all'

  return (
    <Section id="contact" className="bg-brand-50">
      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6">

        {/* HERO */}
        <div className="text-center max-w-3xl mx-auto fade-up" style={{ animationDelay: '60ms' }}>
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <p className="mt-4 text-base md:text-lg text-slate-700 font-medium">
            {t('contact.title')}
          </p>
          <p className="mt-3 text-slate-600 leading-snug">
            {t('contact.sub')}
          </p>
        </div>

        {/* OFFICE BANNERS, compact ribbons, one per country.
         *  Click a banner to jump to the dedicated /contact landing page
         *  with the network diagram + full per-office details. */}
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="mt-8 grid grid-cols-4 gap-6 min-w-[560px]">
          {offices.map((o) => (
            <OfficeBanner
              key={o.code}
              code={o.code}
              countryName={o.country.name}
              palette={PALETTES[o.code] ?? PALETTES.OM}
            />
          ))}
        </div>
        </div>

        {/* CONTACT FORM */}
        <div
          className="mt-12 rounded-2xl overflow-hidden shadow-2xl fade-up"
          style={{ animationDelay: '420ms' }}
        >
          {/* Card header bar */}
          <div className="bg-brand-accent px-8 md:px-10 py-7 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/30 border border-white/50 mb-4">
              <MessageSquare size={22} className="text-slate-900" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900">{t('contact.send')}</h3>
            <p className="mt-2 text-slate-800 text-sm font-medium">
              {t('contact.hours')}
            </p>
          </div>

          {/* Form body */}
          <div className="bg-slate-50 px-8 md:px-10 py-8">
            <form
              className="grid gap-4 max-w-3xl mx-auto"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative">
                  <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input required placeholder={t('contact.name')} className={`${ipt} pl-9`} />
                </label>
                <label className="relative">
                  <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input required type="email" placeholder={t('contact.emailField')} className={`${ipt} pl-9`} />
                </label>
              </div>

              {/* Row 2: Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="relative">
                  <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input type="tel" placeholder={t('contact.phoneField')} className={`${ipt} pl-9`} />
                </label>
                <input required placeholder={t('contact.subject')} className={ipt} />
              </div>

              {/* Row 3: Office selector */}
              <select
                required
                defaultValue=""
                aria-label="Which office should we route this to?"
                className={`${ipt} appearance-none`}
              >
                <option value="" disabled className="bg-white text-slate-400">
                  {t('contact.languages')}
                </option>
                {offices.map((o) => (
                  <option key={o.code} value={o.code} className="bg-white text-slate-900">
                    {o.country.name} — {o.country.role}
                  </option>
                ))}
              </select>

              {/* Row 4: Message */}
              <textarea required rows={5} placeholder={t('contact.message')} className={`${ipt} resize-none`} />

              {/* Submit */}
              <div className="flex justify-center pt-1">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full
                             bg-brand-accent text-white font-semibold px-8 py-3.5
                             hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(158,199,58,0.35)]
                             transition-all shadow-lg"
                >
                  {t('contact.submit')} <Send size={16} />
                </button>
              </div>

              {submitted && (
                <div className="text-sm text-brand-accent text-center mt-1 flex items-center justify-center gap-2">
                  <span className="inline-flex w-5 h-5 rounded-full bg-brand-accent/20 items-center justify-center text-brand-accent text-xs font-bold">✓</span>
                  {t('contact.thanks')}
                </div>
              )}
            </form>
          </div>
        </div>

      </div>
    </Section>
  )
}

function OfficeBanner({
  code,
  countryName,
  palette,
}: {
  code: string
  countryName: string
  palette: Palette
}) {
  const { t } = useTranslation()
  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden
                    shadow-[0_10px_24px_-8px_rgba(15,23,42,0.18)]
                    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-2 hover:shadow-[0_24px_48px_-12px_rgba(15,23,42,0.28)]">

      {/* Full flag image */}
      <div className="relative h-36 md:h-40 overflow-hidden">
        <img
          src={FLAG_IMG[code]}
          alt={countryName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/40" />

        {/* Chevron bleed */}
        <svg
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 -bottom-px"
          width="84" height="28" viewBox="0 0 84 28"
        >
          <polygon points="0,0 84,0 42,28" fill="white" />
        </svg>
      </div>

      {/* Name + button */}
      <div className="bg-white px-4 pt-4 pb-5 flex flex-col items-center text-center gap-3">
        <div className="font-bold uppercase tracking-[0.18em] text-[13px] md:text-[14px] text-slate-900">
          {countryName}
        </div>
        <Link
          to={`/contact#${code}`}
          className="inline-flex items-center gap-1.5 rounded-full px-5 py-2
                     text-[11px] font-bold uppercase tracking-[0.16em] text-white
                     transition-all duration-300 hover:-translate-y-0.5 hover:gap-2.5 hover:brightness-110"
          style={{ backgroundColor: palette.arrow }}
        >
          {t('contact.visitOffice')} <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}
