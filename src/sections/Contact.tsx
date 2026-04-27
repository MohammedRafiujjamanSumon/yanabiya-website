import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  MapPin, Phone, Mail, Clock, Send, ExternalLink, Globe2, Building2, Layers, Users,
  Smartphone, FileBadge,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section from '../components/Section'
import { contactByCountry } from '../data/contact'
import { countries } from '../data/countries'

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

  const [activeCode, setActiveCode] = useState<string>(offices[0]?.code ?? 'OM')
  const active = offices.find((o) => o.code === activeCode) ?? offices[0]

  const ipt =
    'bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 ' +
    'focus:outline-none focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/15 transition-all'

  return (
    <Section id="contact" className="bg-[#fbfdfb]">
      <div className="container-x pt-2 md:pt-3 pb-4 md:pb-6">

        {/* A. HERO — fade + slide up on load */}
        <div className="text-center max-w-3xl mx-auto fade-up" style={{ animationDelay: '60ms' }}>
          <div className="inline-block text-brand-accentDark text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            {t('contact.eyebrow', 'Contact')}
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight">
            Contact Us
          </h2>
          <p className="mt-5 text-xl text-slate-700 font-medium">
            Let’s start the conversation.
          </p>
          <p className="mt-3 text-slate-600 leading-snug">
            Reach our headquarters in Muscat or any of our offices across the United Kingdom,
            Bangladesh and the United States — choose an office to see contact details and the map.
          </p>
        </div>

        {/* B. COUNTRY SELECTOR — 2x2 premium card grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {offices.map((o, idx) => {
            const isActive = o.code === activeCode
            const isHQ = o.country.role === 'Headquarters'
            return (
              <button
                key={o.code}
                type="button"
                onClick={() => setActiveCode(o.code)}
                style={{ animationDelay: `${120 + idx * 90}ms` }}
                className={`group relative rounded-2xl border bg-white p-5 text-left
                            transition-all duration-300 ease-out
                            focus:outline-none focus:ring-4 focus:ring-brand-accent/20 fade-up
                            ${isActive
                              ? 'border-brand-accent bg-[#eef9ee] scale-[1.03] shadow-[0_10px_30px_-10px_rgba(125,164,42,0.45)] ring-2 ring-brand-accent/30'
                              : 'border-slate-200 hover:-translate-y-1 hover:shadow-lg hover:border-brand-accent/40 ' +
                                (activeCode ? 'opacity-70 hover:opacity-100' : 'opacity-100')
                            }`}
              >
                {isHQ && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-accent text-white shadow">
                    HQ
                  </span>
                )}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-white grid place-items-center text-3xl shadow ring-2 transition-all
                                   ${isActive ? 'ring-brand-accent' : 'ring-white group-hover:ring-brand-accent/40'}`}>
                    {o.country.flag}
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif font-semibold text-slate-900 text-lg leading-tight">
                      {o.country.name}
                    </div>
                    <div className={`text-[11px] uppercase tracking-wider mt-1 font-medium ${isActive ? 'text-brand-accentDark' : 'text-slate-500'}`}>
                      {o.country.role}
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* C. DETAILS PANEL — animated reveal on country change */}
        {active && (
          <div
            key={activeCode}
            className="mt-10 grid lg:grid-cols-5 gap-6 fade-up"
          >
            {/* Details card */}
            <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200 p-7 shadow-sm">
              <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-[#eef9ee] grid place-items-center text-2xl ring-2 ring-brand-accent/20">
                  {active.country.flag}
                </div>
                <div>
                  <div className="font-serif text-xl text-slate-900 font-semibold leading-tight">
                    {active.country.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-brand-accentDark font-medium">
                    {active.country.role}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-5 text-sm">
                {/* Registered Entity — legal name + registration + est. date */}
                <DetailRow icon={FileBadge} label="Registered Entity">
                  <div className="text-slate-800 font-semibold leading-snug">{active.legalName}</div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                    <span>
                      <span className="font-bold uppercase tracking-wider text-brand-accentDark">
                        {active.registration.label}
                      </span>{' '}
                      <span className="font-mono text-slate-700">{active.registration.value}</span>
                    </span>
                    <span>
                      <span className="font-bold uppercase tracking-wider text-brand-accentDark">
                        Established
                      </span>{' '}
                      <span className="text-slate-700">{active.established}</span>
                    </span>
                  </div>
                </DetailRow>

                <DetailRow icon={MapPin} label="Address">
                  <div className="text-slate-800 leading-snug whitespace-pre-line">{active.country.address}</div>
                </DetailRow>

                {active.phones.length > 0 && (
                  <DetailRow icon={Phone} label="Phone">
                    <div className="space-y-0.5">
                      {active.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s/g, '')}`}
                           className="block text-slate-800 hover:text-brand-accentDark transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  </DetailRow>
                )}

                {active.mobile && (
                  <DetailRow icon={Smartphone} label="Mobile / WhatsApp">
                    <a href={`tel:${active.mobile.replace(/\s/g, '')}`}
                       className="block text-slate-800 hover:text-brand-accentDark transition-colors">
                      {active.mobile}
                    </a>
                  </DetailRow>
                )}

                <DetailRow icon={Mail} label="Email">
                  <div className="space-y-0.5">
                    {active.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`}
                         className="block text-slate-800 hover:text-brand-accentDark transition-colors break-all">
                        {e}
                      </a>
                    ))}
                  </div>
                </DetailRow>

                {active.websites.length > 0 && (
                  <DetailRow icon={Globe2} label="Website">
                    <div className="space-y-0.5">
                      {active.websites.map((w) => (
                        <a
                          key={w}
                          href={w.startsWith('http') ? w : `https://${w}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-slate-800 hover:text-brand-accentDark transition-colors break-all"
                        >
                          {w}
                        </a>
                      ))}
                    </div>
                  </DetailRow>
                )}

                <DetailRow icon={Clock} label="Office Hours">
                  <div className="text-slate-800">{active.hours}</div>
                </DetailRow>
              </div>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(active.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full
                           rounded-full px-4 py-3 text-xs font-semibold uppercase tracking-wider
                           bg-brand-accent text-white shadow
                           hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                View on Map <ExternalLink size={14} />
              </a>
            </div>

            {/* Map */}
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

        {/* D. CONTACT FORM — minimal with mint focus */}
        <div className="mt-16 rounded-2xl bg-white border border-slate-200 p-8 md:p-10 shadow-sm fade-up" style={{ animationDelay: '420ms' }}>
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
                ✓ Thanks — your message is on its way to the {active?.country.name} team.
              </div>
            )}
          </form>
        </div>

        {/* E. GLOBAL PRESENCE STATS */}
        <div className="mt-16 fade-up" style={{ animationDelay: '540ms' }}>
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
                className="rounded-2xl bg-white border border-slate-200 p-5 text-center hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <div className="w-11 h-11 rounded-full bg-[#eef9ee] text-brand-accentDark grid place-items-center mx-auto">
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

function DetailRow({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="shrink-0 w-9 h-9 rounded-lg bg-[#eef9ee] text-brand-accentDark grid place-items-center">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] uppercase tracking-wider text-brand-accentDark font-semibold mb-1">{label}</div>
        {children}
      </div>
    </div>
  )
}
