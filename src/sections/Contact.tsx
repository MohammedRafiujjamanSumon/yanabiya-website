import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { contact } from '../data/contact'
import { languages } from '../i18n'

export default function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const ipt = 'bg-white/60 border border-slate-200 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-brand-accent text-slate-900 placeholder:text-slate-500'

  return (
    <Section id="contact" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('contact.title')}</H2>
          <p className="mt-5 text-slate-600">{t('contact.sub')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card-panel space-y-5">
            <div>
              <div className="flex items-center gap-2 text-brand-accent mb-1"><MapPin size={16} /> {t('contact.address')}</div>
              <div className="text-slate-800 text-sm">{contact.address}</div>
              <div className="text-slate-500 text-xs">{contact.poBox}</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-accent mb-1"><Phone size={16} /> {t('contact.phone')}</div>
              {contact.phones.map((p) => (
                <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-slate-800 hover:text-brand-accent text-sm">{p}</a>
              ))}
              <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="block text-slate-800 hover:text-brand-accent text-sm">
                {contact.mobile}
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-accent mb-1"><Mail size={16} /> {t('contact.email')}</div>
              {contact.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block text-slate-800 hover:text-brand-accent text-sm">{e}</a>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2 text-brand-accent mb-1"><Clock size={16} /> {t('contact.hours')}</div>
              <div className="text-slate-800 text-sm">{contact.hours}</div>
            </div>
            <div>
              <div className="text-brand-accent mb-2 text-sm">{t('contact.languages')}</div>
              <div className="flex gap-2 flex-wrap">
                {languages.map((l) => (
                  <span key={l.code} className="text-xs px-2 py-1 rounded border border-slate-200 text-slate-600">
                    {l.flag} {l.native}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <form
            className="card-panel lg:col-span-2 grid gap-4"
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
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
