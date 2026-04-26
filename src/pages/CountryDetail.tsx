import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Clock, Building2, Briefcase,
  ArrowRight, ChevronRight, ExternalLink, Globe2, Smartphone,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { countries } from '../data/countries'
import { contactByCountry } from '../data/contact'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const countryAccent: Record<string, string> = {
  OM: 'from-emerald-500/20 via-brand-accent/15 to-transparent',
  GB: 'from-indigo-500/20 via-brand-accent/15 to-transparent',
  BD: 'from-rose-500/20 via-brand-accent/15 to-transparent',
  US: 'from-amber-500/20 via-brand-accent/15 to-transparent',
}

export default function CountryDetail() {
  const { code } = useParams<{ code: string }>()
  const upper = (code ?? '').toUpperCase()
  const country = countries.find((c) => c.code === upper)
  const contact = contactByCountry.find((c) => c.code === upper)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [code])

  if (!country) {
    return (
      <main className="bg-[#fbfdfb] text-slate-900 min-h-screen grid place-items-center px-6">
        <div className="text-center">
          <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-3">
            404
          </div>
          <h2 className="font-serif text-3xl text-brand-deep mb-3">Country not found.</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-accentDark hover:text-brand-deep"
          >
            Back to Home <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    )
  }

  const c = country
  const parentCompany = (c as { parentCompany?: string }).parentCompany
  const entitiesLabel = (c as { entitiesLabel?: string }).entitiesLabel ?? 'Operating Entities'
  const activities = (c as { activities?: { code: string; name: string; icon?: string; image?: string }[] }).activities
  const description = (c as { description?: string }).description
  const accent = countryAccent[c.code] ?? countryAccent.OM
  const otherCountries = countries.filter((o) => o.code !== c.code)

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className={`absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-gradient-radial ${accent} blur-[160px]`} />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="container-x py-12 md:py-16 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <Reveal>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
                  <Globe2 size={12} />
                  {c.role}
                </div>
              </Reveal>
              <Reveal delay={120}>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
                  {c.name}
                </h1>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {description ??
                    `Yanabiya Group's ${c.role.toLowerCase()} — a coordinated team operating under the wider international network.`}
                </p>
              </Reveal>
              <Reveal delay={360}>
                <div className="mt-6 inline-flex items-start gap-2 text-sm text-slate-700 max-w-xl">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-brand-accentDark" />
                  <span className="leading-relaxed">{c.address}</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="md:col-span-5">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-slate-200 shadow-[0_24px_60px_-30px_rgba(15,58,35,0.35)]">
                <img
                  src={c.heroImage}
                  alt={c.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/15 to-transparent" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5
                                rounded-full bg-white/90 backdrop-blur px-3 py-1
                                text-[11px] font-bold uppercase tracking-[0.22em] text-brand-deep">
                  <span className="text-base leading-none">{c.flag}</span>
                  {c.code}
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/85">
                    Operating Hub
                  </div>
                  <div className="font-serif text-lg text-white leading-tight mt-1">
                    {parentCompany ?? c.entities[0]}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AT A GLANCE STRIP */}
      <section className="relative">
        <div className="container-x max-w-6xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat icon={Building2} label="Entities" value={String(c.entities.length)} />
              <Stat icon={Briefcase} label="Activities" value={activities ? String(activities.length) : '—'} />
              <Stat icon={MapPin} label="Country Code" value={c.code} />
              <Stat icon={Globe2} label="Role" value={c.role.split(' ')[0]} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PARENT COMPANY (Oman only) */}
      {parentCompany && (
        <section className="relative mt-12">
          <div className="container-x max-w-6xl mx-auto">
            <Reveal>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark mb-1">
                    Parent Company
                  </div>
                  <div className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                    {parentCompany}
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="self-start md:self-auto inline-flex items-center gap-1.5 rounded-full px-4 py-2
                             border border-slate-300 text-slate-700 text-[11px] font-semibold uppercase tracking-wider
                             hover:border-brand-accentDark hover:text-brand-accentDark transition-all"
                >
                  Contact this office <ArrowRight size={12} />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ENTITIES */}
      <section className="relative mt-14 md:mt-20">
        <div className="container-x max-w-6xl mx-auto">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.32em] uppercase text-brand-accentDark mb-3">
              {entitiesLabel}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight mb-8 max-w-2xl">
              Companies operating under the {c.name} hub.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {c.entities.map((e, i) => (
              <Reveal key={e} delay={i * 60}>
                <div className="group h-full rounded-2xl bg-white border border-slate-200
                                p-5 transition-all duration-300
                                hover:border-brand-deep/40 hover:-translate-y-0.5
                                hover:shadow-[0_18px_40px_-20px_rgba(15,58,35,0.25)]">
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 w-10 h-10 rounded-lg bg-brand-accent/15 text-brand-deep
                                     grid place-items-center transition-colors duration-300
                                     group-hover:bg-brand-accent group-hover:text-white">
                      <Building2 size={18} strokeWidth={1.6} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accentDark mb-0.5">
                        Entity · {String(i + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[14px] font-semibold text-brand-deep leading-snug">
                        {e}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES (Oman) */}
      {activities && (
        <section className="relative mt-14 md:mt-20">
          <div className="container-x max-w-6xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.32em] uppercase text-brand-accentDark mb-3">
                Commercial Activities
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight mb-8 max-w-2xl">
                Licensed across {activities.length} commercial activities.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {activities.map((a, i) => (
                <Reveal key={a.code + a.name} delay={Math.min(i, 8) * 40}>
                  <div className="group h-full rounded-xl bg-white border border-slate-200
                                  px-4 py-3 flex items-center gap-3
                                  transition-all duration-300
                                  hover:border-brand-accent/50 hover:-translate-y-0.5
                                  hover:shadow-[0_12px_30px_-14px_rgba(158,199,58,0.4)]">
                    <span className="text-xl leading-none shrink-0">{a.icon ?? '•'}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-400">
                        Code {a.code}
                      </div>
                      <div className="text-[13px] text-slate-700 leading-snug line-clamp-2">
                        {a.name}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CONTACT BLOCK */}
      {contact && (
        <section className="relative mt-14 md:mt-20">
          <div className="container-x max-w-6xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.32em] uppercase text-brand-accentDark mb-3">
                Reach this office
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight mb-8 max-w-2xl">
                Office details & directions.
              </h2>
            </Reveal>

            <div className="grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-3">
                {contact.phones.length > 0 && (
                  <ContactRow icon={Phone} label="Phone" value={contact.phones.join(' · ')} href={`tel:${contact.phones[0].replace(/\s+/g, '')}`} />
                )}
                {contact.mobile && (
                  <ContactRow icon={Smartphone} label="Mobile" value={contact.mobile} href={`tel:${contact.mobile.replace(/\s+/g, '')}`} />
                )}
                {contact.emails.map((e) => (
                  <ContactRow key={e} icon={Mail} label="Email" value={e} href={`mailto:${e}`} />
                ))}
                <ContactRow icon={Clock} label="Hours" value={contact.hours} />
                {contact.poBox && (
                  <ContactRow icon={MapPin} label="Postal" value={contact.poBox} />
                )}
              </div>

              <div className="lg:col-span-7">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200
                             shadow-[0_18px_40px_-20px_rgba(15,58,35,0.25)]"
                >
                  <iframe
                    title={`Map of ${c.name}`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(contact.mapQuery)}&output=embed`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="absolute top-3 right-3 inline-flex items-center gap-1.5
                                  rounded-full bg-white/95 backdrop-blur px-3 py-1.5
                                  text-[11px] font-bold uppercase tracking-[0.22em] text-brand-deep
                                  opacity-0 group-hover:opacity-100 transition-opacity">
                    Open in Maps <ExternalLink size={11} />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* OTHER COUNTRIES STRIP */}
      <section className="relative mt-16 md:mt-24 pb-20 md:pb-28">
        <div className="container-x max-w-6xl mx-auto">
          <Reveal>
            <div className="border-t border-slate-200 pt-10">
              <div className="text-[11px] font-semibold tracking-[0.32em] uppercase text-brand-accentDark mb-3">
                Across the Group
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-brand-deep leading-tight mb-6">
                Explore other countries
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {otherCountries.map((o) => (
                  <Link
                    key={o.code}
                    to={`/global-presence/${o.code.toLowerCase()}`}
                    className="group flex items-center gap-3 rounded-xl bg-white border border-slate-200
                               p-4 transition-all duration-300
                               hover:border-brand-accent/50 hover:-translate-y-0.5
                               hover:shadow-[0_18px_40px_-20px_rgba(158,199,58,0.4)]"
                  >
                    <span className="text-2xl leading-none shrink-0">{o.flag}</span>
                    <div className="min-w-0 flex-1">
                      <div className="text-[14px] font-semibold text-brand-deep leading-tight">
                        {o.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accentDark mt-0.5">
                        {o.role}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-brand-accentDark transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

/* ───────────── helpers ───────────── */

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm p-4">
      <div className="flex items-center gap-2 text-brand-accentDark">
        <Icon size={14} strokeWidth={1.8} />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em]">{label}</span>
      </div>
      <div className="mt-1 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
        {value}
      </div>
    </div>
  )
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone
  label: string
  value: string
  href?: string
}) {
  const inner = (
    <div className="group flex items-start gap-3 rounded-xl bg-white border border-slate-200
                    p-4 transition-all duration-300
                    hover:border-brand-deep/40 hover:-translate-y-0.5">
      <span className="shrink-0 w-9 h-9 rounded-lg bg-brand-accent/15 text-brand-deep
                       grid place-items-center transition-colors duration-300
                       group-hover:bg-brand-accent group-hover:text-white">
        <Icon size={16} strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-accentDark mb-0.5">
          {label}
        </div>
        <div className="text-[14px] text-slate-700 leading-snug break-words">
          {value}
        </div>
      </div>
    </div>
  )
  return href ? (
    <a href={href} className="block">
      {inner}
    </a>
  ) : (
    inner
  )
}
