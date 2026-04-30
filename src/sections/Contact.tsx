import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  MapPin, Phone, Mail, Clock, Send, ExternalLink, Globe2,
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

        {/* B. HUB-AND-SPOKES COUNTRY SELECTOR
         *
         *  A central "Get in Touch" hub on the left, four country office
         *  spokes stacked on the right, each connected to the hub by a
         *  curved SVG line. Click a spoke to load that office's details
         *  in the panel below. Faded world-map backdrop ties the whole
         *  thing into the global brand. */}
        <div className="mt-12 md:mt-14 relative max-w-5xl mx-auto px-2 md:px-6">

          {/* Faded world-map backdrop */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 56"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full opacity-[0.18] pointer-events-none"
          >
            <g
              fill="rgba(15,58,35,0.10)"
              stroke="rgba(15,58,35,0.32)"
              strokeWidth="0.14"
              strokeLinejoin="round"
            >
              <path d="M 6 14 Q 16 9 26 12 L 30 18 Q 32 22 28 26 L 22 30 Q 16 32 12 30 L 8 26 Q 5 20 6 14 Z" />
              <path d="M 24 32 L 30 32 L 32 38 L 30 46 L 26 50 L 22 46 L 22 38 Z" />
              <path d="M 44 14 Q 50 12 54 14 L 56 18 Q 54 22 50 22 L 44 22 L 42 18 Z" />
              <path d="M 47 24 L 56 24 L 58 30 L 58 38 L 54 46 L 50 50 L 46 46 L 44 38 L 45 30 Z" />
              <path d="M 58 26 L 64 26 L 66 32 L 64 36 L 60 36 L 58 32 Z" />
              <path d="M 56 10 Q 70 8 84 10 L 88 14 L 86 18 L 70 18 L 60 16 L 56 14 Z" />
              <path d="M 70 20 L 82 20 L 84 26 L 80 30 L 74 30 L 72 26 Z" />
              <path d="M 70 28 L 76 28 L 78 34 L 74 38 L 71 36 Z" />
              <path d="M 82 40 L 92 40 L 94 46 L 90 48 L 84 46 Z" />
            </g>
          </svg>

          {/* Connector curves — hub right edge → each spoke circle's
           *  left edge. Hub centre at (24,50) with radius ~16% so right
           *  edge is at x:40. Spoke circles sit at x:50 (left edge of
           *  the col-span-7 column), evenly spaced at y:14 / 38 / 62 / 86. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
          >
            {[14, 38, 62, 86].map((y, i) => {
              const sx = 40, sy = 50
              const ex = 50, ey = y
              const cx = (sx + ex) / 2
              const path = `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ey}, ${ex} ${ey}`
              return (
                <g key={i}>
                  <path d={path} fill="none" stroke="rgba(15,58,35,0.30)" strokeWidth="0.32" strokeDasharray="0.8 0.8" />
                  <path
                    d={path}
                    fill="none"
                    stroke="rgba(158,199,58,0.95)"
                    strokeWidth="0.45"
                    strokeLinecap="round"
                    className="animate-svg-flow"
                    style={{ animationDelay: `${i * 0.45}s`, animationDuration: '5s' }}
                  />
                  {/* Tiny accent dot where the line meets the spoke */}
                  <circle cx={ex} cy={ey} r="0.7" fill="rgba(158,199,58,0.95)" />
                </g>
              )
            })}
          </svg>

          {/* Two-column layout */}
          <div className="relative grid grid-cols-12 gap-4 md:gap-6 items-center min-h-[420px] md:min-h-[480px]">

            {/* LEFT — central "Get in Touch" hub */}
            <div className="col-span-12 md:col-span-5 grid place-items-center">
              <div
                className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full
                           bg-white border-4 border-brand-accent text-center
                           grid place-items-center
                           shadow-[0_18px_44px_-14px_rgba(125,164,42,0.45)]"
              >
                {/* Soft mint halo */}
                <span
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-full bg-brand-accent/20 blur-2xl animate-pulse pointer-events-none"
                />
                <div className="relative px-6">
                  <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark mb-2">
                    Hub
                  </div>
                  <div className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                    Get in Touch
                  </div>
                  <div className="mt-2 text-[11px] text-slate-600 leading-snug">
                    Pick an office to view contact details.
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — 4 country spokes: round circle + text BESIDE it,
             *  matching the reference's "circle node + caption beside"
             *  composition. Each spoke colour-cycles so they read as
             *  distinct nodes on the connector tree. */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-5 md:gap-7">
              {offices.map((o, idx) => {
                const isActive = o.code === activeCode
                const isHQ = o.country.role === 'Headquarters'
                const palette = [
                  { ring: 'ring-amber-400',   ringActive: 'ring-amber-500',   text: 'text-amber-600'   },
                  { ring: 'ring-rose-400',    ringActive: 'ring-rose-500',    text: 'text-rose-600'    },
                  { ring: 'ring-sky-400',     ringActive: 'ring-sky-500',     text: 'text-sky-600'     },
                  { ring: 'ring-violet-400',  ringActive: 'ring-violet-500',  text: 'text-violet-600'  },
                ][idx % 4]
                return (
                  <button
                    key={o.code}
                    type="button"
                    onClick={() => setActiveCode(o.code)}
                    className="group relative flex items-center gap-4 md:gap-5 text-left
                               focus:outline-none rounded-2xl
                               focus:ring-4 focus:ring-brand-accent/25"
                  >
                    {/* Round flag node (circle) */}
                    <span
                      className={`relative shrink-0 grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full text-3xl md:text-4xl
                                  bg-white ring-[3px] transition-all duration-300
                                  shadow-[0_8px_22px_-8px_rgba(15,58,35,0.30)]
                                  ${isActive
                                    ? `${palette.ringActive} scale-110 shadow-[0_12px_28px_-8px_rgba(125,164,42,0.55)]`
                                    : `${palette.ring} group-hover:scale-105 group-hover:shadow-[0_14px_30px_-10px_rgba(125,164,42,0.40)]`}`}
                    >
                      {o.country.flag}
                      {isActive && (
                        <span
                          aria-hidden="true"
                          className={`absolute -inset-1 rounded-full ${palette.ringActive.replace('ring-', 'bg-')}/25 blur-md animate-pulse pointer-events-none -z-10`}
                        />
                      )}
                    </span>

                    {/* Caption beside the circle */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <div className={`font-serif text-base md:text-lg leading-tight font-semibold transition-colors
                                         ${isActive ? palette.text : 'text-brand-deep'}`}>
                          {o.country.name}
                        </div>
                        {isHQ && (
                          <span className="text-[8px] font-bold uppercase tracking-[0.22em] px-1.5 py-0.5 rounded-full bg-brand-accent text-white">
                            HQ
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] uppercase tracking-[0.22em] mt-0.5 font-semibold
                                       ${isActive ? 'text-brand-accentDark' : 'text-slate-500'}`}>
                        {o.country.role}
                      </div>
                      <div className="text-[12px] text-slate-600 leading-snug mt-1.5 max-w-md">
                        {o.legalName}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
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
                {/* Registered Entity — legal name + established date */}
                <DetailRow icon={FileBadge} label="Registered Entity">
                  <div className="text-slate-800 font-semibold leading-snug">{active.legalName}</div>
                  <div className="mt-1 text-[11px] text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-brand-accentDark">
                      Established
                    </span>{' '}
                    <span className="text-slate-700">{active.established}</span>
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
