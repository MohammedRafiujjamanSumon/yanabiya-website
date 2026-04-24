import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Phone, Mail, Clock, Send, ExternalLink, Globe2, Building2, Layers, Users } from 'lucide-react'
import Section from '../components/Section'
import { contactByCountry } from '../data/contact'
import { countries } from '../data/countries'

export default function Contact() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)

  // Merge office contact data with country meta (flag/name/address/role)
  const offices = useMemo(
    () =>
      contactByCountry.flatMap((cc) => {
        const country = countries.find((c) => c.code === cc.code)
        return country ? [{ ...cc, country }] : []
      }),
    [],
  )

  // Default-select Oman (HQ)
  const [activeCode, setActiveCode] = useState<string>(offices[0]?.code ?? 'OM')
  const active = offices.find((o) => o.code === activeCode) ?? offices[0]

  const ipt =
    'bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 text-slate-900 placeholder:text-slate-400 transition'

  return (
    <Section id="contact" className="bg-white">
      <div className="container-x">

        {/* 1. HERO */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block text-brand-accentDark text-xs font-semibold tracking-[0.25em] uppercase mb-3">
            {t('contact.eyebrow', 'Contact')}
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900 leading-tight">
            Contact Us
          </h2>
          <p className="mt-4 text-lg text-slate-700 font-medium">
            Let’s start the conversation.
          </p>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Reach our headquarters in Muscat or any of our offices across the UK, Bangladesh
            and the USA.
          </p>
        </div>

        {/* 2. OFFICE SELECTOR — 4 country cards */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {offices.map((o) => {
            const isActive = o.code === activeCode
            const isHQ = o.country.role === 'Headquarters'
            return (
              <button
                key={o.code}
                type="button"
                onClick={() => setActiveCode(o.code)}
                className={`group relative rounded-2xl border-2 p-4 text-left transition-all
                            focus:outline-none focus:ring-2 focus:ring-brand-accent
                            ${isActive
                              ? 'border-brand-accent bg-brand-accent/10 shadow-md -translate-y-0.5'
                              : 'border-slate-200 bg-white hover:border-brand-accent/40 hover:-translate-y-0.5 hover:shadow-md'}`}
              >
                {isHQ && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-accent text-white">
                    HQ
                  </span>
                )}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-white grid place-items-center text-2xl shadow ring-2 ring-white shrink-0">
                    {o.country.flag}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-semibold text-slate-900 text-sm md:text-base leading-tight truncate">
                      {o.country.name}
                    </div>
                    <div className={`text-[10px] uppercase tracking-wider mt-0.5 ${isActive ? 'text-brand-accentDark' : 'text-slate-500'}`}>
                      {o.country.role}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* 3. DYNAMIC OFFICE DETAILS — switches per active country */}
        {active && (
          <div className="mt-6 grid lg:grid-cols-5 gap-6">
            {/* Details panel */}
            <div className="lg:col-span-2 rounded-2xl bg-stone-50 border border-slate-200 p-6 md:p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-200">
                <div className="w-12 h-12 rounded-full bg-white grid place-items-center text-2xl shadow ring-2 ring-white">
                  {active.country.flag}
                </div>
                <div>
                  <div className="font-serif text-xl text-slate-900 font-semibold leading-tight">
                    {active.country.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-brand-accentDark">
                    {active.country.role}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-5 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-brand-accent mb-1.5 text-[11px] uppercase tracking-wider font-semibold">
                    <MapPin size={14} /> Address
                  </div>
                  <div className="text-slate-800 leading-relaxed">{active.country.address}</div>
                  {active.poBox && (
                    <div className="text-slate-500 text-xs mt-1">{active.poBox}</div>
                  )}
                </div>

                {(active.phones.length > 0 || active.mobile) && (
                  <div>
                    <div className="flex items-center gap-2 text-brand-accent mb-1.5 text-[11px] uppercase tracking-wider font-semibold">
                      <Phone size={14} /> Phone
                    </div>
                    <div className="space-y-0.5">
                      {active.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-slate-800 hover:text-brand-accentDark transition-colors">
                          {p}
                        </a>
                      ))}
                      {active.mobile && (
                        <a href={`tel:${active.mobile.replace(/\s/g, '')}`} className="block text-slate-800 hover:text-brand-accentDark transition-colors">
                          {active.mobile}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-2 text-brand-accent mb-1.5 text-[11px] uppercase tracking-wider font-semibold">
                    <Mail size={14} /> Email
                  </div>
                  <div className="space-y-0.5">
                    {active.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`} className="block text-slate-800 hover:text-brand-accentDark transition-colors break-all">
                        {e}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-brand-accent mb-1.5 text-[11px] uppercase tracking-wider font-semibold">
                    <Clock size={14} /> Office Hours
                  </div>
                  <div className="text-slate-800">{active.hours}</div>
                </div>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full
                           rounded-full px-4 py-2.5 text-xs font-semibold uppercase tracking-wider
                           bg-brand-accent text-white
                           hover:bg-brand-accentDark transition-colors"
              >
                View on Map <ExternalLink size={14} />
              </a>
            </div>

            {/* 5. MAP — switches per active country */}
            <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white min-h-[320px]">
              <iframe
                title={`Map of ${active.country.name}`}
                src={`https://www.google.com/maps?q=${encodeURIComponent(active.mapQuery)}&output=embed`}
                className="w-full h-full min-h-[320px] lg:min-h-[480px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {/* 4. QUICK CONTACT FORM */}
        <div className="mt-12 rounded-2xl bg-stone-50 border border-slate-200 p-6 md:p-8 shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-6">
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
            <input required placeholder="Subject" className={ipt} />
            <textarea required rows={5} placeholder="Your Message" className={`${ipt} resize-none`} />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full
                         bg-brand-accent text-white font-semibold px-6 py-3
                         hover:bg-brand-accentDark transition-colors shadow-sm hover:shadow"
            >
              Send Message <Send size={16} />
            </button>
            {submitted && (
              <div className="text-sm text-brand-accentDark text-center">
                ✓ Thanks — your message is on its way to the {active?.country.name} team.
              </div>
            )}
          </form>
        </div>

        {/* 6. GLOBAL PRESENCE SUMMARY */}
        <div className="mt-12">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900">Global Presence</h3>
            <p className="mt-2 text-slate-600 text-sm">
              One unified business platform — operating across markets, time zones, and cultures.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe2,    label: 'Countries',  value: '4' },
              { icon: Building2, label: 'Offices',    value: `${offices.length}+` },
              { icon: Layers,    label: 'Industries', value: '6' },
              { icon: Users,     label: 'Languages',  value: '4' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white border border-slate-200 p-5 text-center hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-brand-accent/10 text-brand-accentDark grid place-items-center mx-auto">
                  <s.icon size={20} />
                </div>
                <div className="mt-3 font-serif text-3xl font-bold text-brand-accentDark">{s.value}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
