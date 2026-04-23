import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Send, ExternalLink } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { contactByCountry } from '../data/contact'
import { countries } from '../data/countries'
import { languages } from '../i18n'

export default function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const ipt =
    'bg-white/60 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-accent text-slate-900 placeholder:text-slate-500'

  // Merge countries (address/flag/name/role — source of truth) with per-country
  // contact details (phones/emails/hours/map).
  const blocks = contactByCountry.flatMap((cc) => {
    const country = countries.find((c) => c.code === cc.code)
    return country ? [{ ...cc, country }] : []
  })

  return (
    <Section id="contact" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('contact.title')}</H2>
          <p className="mt-5 text-slate-600">{t('contact.sub')}</p>
        </div>

        {/* Country-based contact grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {blocks.map((b) => (
            <div
              key={b.code}
              className="card-panel relative overflow-hidden flex flex-col gap-4
                         hover:-translate-y-1 transition-transform"
            >
              <div className="absolute -top-6 -end-6 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl" />

              <div className="flex items-start justify-between gap-3 relative">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white grid place-items-center
                                  text-2xl leading-none shadow ring-2 ring-white/70">
                    {b.country.flag}
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-slate-900 leading-tight">
                      {b.country.name}
                    </h3>
                    <div className="text-[11px] uppercase tracking-wider text-brand-accentDark">
                      {b.country.role}
                    </div>
                  </div>
                </div>
                {b.country.role === 'Headquarters' && (
                  <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-brand-accent text-white">
                    {t('contact.hq', 'HQ')}
                  </span>
                )}
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 text-brand-accent mb-1 text-xs uppercase tracking-wider">
                  <MapPin size={14} /> {t('contact.address')}
                </div>
                <div className="text-slate-800 text-sm leading-relaxed">
                  {b.country.address}
                </div>
                {b.poBox && (
                  <div className="text-slate-500 text-xs mt-1">{b.poBox}</div>
                )}
              </div>

              {(b.phones.length > 0 || b.mobile) && (
                <div className="relative">
                  <div className="flex items-center gap-2 text-brand-accent mb-1 text-xs uppercase tracking-wider">
                    <Phone size={14} /> {t('contact.phone')}
                  </div>
                  {b.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p.replace(/\s/g, '')}`}
                      className="block text-slate-800 hover:text-brand-accent text-sm"
                    >
                      {p}
                    </a>
                  ))}
                  {b.mobile && (
                    <a
                      href={`tel:${b.mobile.replace(/\s/g, '')}`}
                      className="block text-slate-800 hover:text-brand-accent text-sm"
                    >
                      {b.mobile}
                    </a>
                  )}
                </div>
              )}

              <div className="relative">
                <div className="flex items-center gap-2 text-brand-accent mb-1 text-xs uppercase tracking-wider">
                  <Mail size={14} /> {t('contact.email')}
                </div>
                {b.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="block text-slate-800 hover:text-brand-accent text-sm break-all"
                  >
                    {e}
                  </a>
                ))}
              </div>

              <div className="relative">
                <div className="flex items-center gap-2 text-brand-accent mb-1 text-xs uppercase tracking-wider">
                  <Clock size={14} /> {t('contact.hours')}
                </div>
                <div className="text-slate-800 text-sm">{b.hours}</div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(b.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="relative mt-auto inline-flex items-center justify-center gap-2
                           rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider
                           bg-brand-accent/10 text-brand-accentDark
                           hover:bg-brand-accent hover:text-white transition-colors
                           focus:outline-none focus:ring-2 focus:ring-brand-accent"
              >
                {t('contact.viewOnMap', 'View on map')}
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>

        {/* Form + supported languages */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card-panel space-y-4">
            <h3 className="font-serif text-xl text-slate-900">
              {t('contact.languages')}
            </h3>
            <p className="text-sm text-slate-600">
              {t(
                'contact.languagesNote',
                'Our teams respond in the following languages — mention your preferred one when you write to us.',
              )}
            </p>
            <div className="flex gap-2 flex-wrap">
              {languages.map((l) => (
                <span
                  key={l.code}
                  className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-600"
                >
                  {l.flag} {l.native}
                </span>
              ))}
            </div>
          </div>

          <form
            className="card-panel lg:col-span-2 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(true)
            }}
          >
            <h3 className="font-serif text-2xl text-slate-900">{t('contact.send')}</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <input required placeholder={t('contact.name')} className={ipt} />
              <input required type="email" placeholder={t('contact.emailField')} className={ipt} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder={t('contact.company')} className={ipt} />
              <input placeholder={t('contact.phoneField')} className={ipt} />
            </div>
            <select required defaultValue="" className={ipt}>
              <option value="" disabled>
                {t('contact.officeSelect', 'Which office should we route this to?')}
              </option>
              {blocks.map((b) => (
                <option key={b.code} value={b.code}>
                  {b.country.flag} {b.country.name} — {b.country.role}
                </option>
              ))}
            </select>
            <input required placeholder={t('contact.subject')} className={ipt} />
            <textarea required rows={6} placeholder={t('contact.message')} className={`${ipt} resize-none`} />
            <button type="submit" className="btn-primary justify-center">
              {t('contact.submit')} <Send size={16} />
            </button>
            {submitted && <div className="text-sm text-brand-accent">{t('contact.thanks')}</div>}
          </form>
        </div>
      </div>
    </Section>
  )
}
