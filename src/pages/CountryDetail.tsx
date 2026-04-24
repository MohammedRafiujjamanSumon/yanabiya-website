import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MapPin, CheckCircle2 } from 'lucide-react'
import Section from '../components/Section'
import { countries } from '../data/countries'
import { assets } from '../data/assets'
import OmanPresence from './OmanPresence'

type Country = (typeof countries)[number]

const roleLabelMap: Record<string, string> = {
  OM: 'Headquarters',
  GB: 'Branch Office',
  BD: 'Branch Office',
  US: 'Branch Office',
}

const colorMap: Record<string, { bg: string; ring: string; text: string; bullet: string }> = {
  OM: { bg: 'bg-emerald-100', ring: 'ring-emerald-50', text: 'text-emerald-600', bullet: 'text-emerald-600' },
  GB: { bg: 'bg-indigo-100', ring: 'ring-indigo-50', text: 'text-indigo-600', bullet: 'text-indigo-600' },
  BD: { bg: 'bg-rose-100', ring: 'ring-rose-50', text: 'text-rose-600', bullet: 'text-rose-600' },
  US: { bg: 'bg-amber-100', ring: 'ring-amber-50', text: 'text-amber-600', bullet: 'text-amber-600' },
}
const defaultColor = { bg: 'bg-blue-100', ring: 'ring-blue-50', text: 'text-blue-600', bullet: 'text-blue-600' }

export default function CountryDetail() {
  const { t } = useTranslation()
  const { code } = useParams<{ code: string }>()
  const upper = (code ?? '').toUpperCase()
  const country = countries.find((c) => c.code === upper) as Country | undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [code])

  if (upper === 'OM') return <OmanPresence />

  if (!country) {
    return (
      <Section id="country-not-found" className="bg-brand-ink">
        <div className="container-x text-center text-slate-200 py-20">
          <h2 className="font-serif text-3xl text-white mb-4">Country not found</h2>
        </div>
      </Section>
    )
  }

  const c = country
  const color = colorMap[c.code] ?? defaultColor

  return (
    <Section id="country-detail" className="bg-brand-ink">
      <div className="container-x">
        <div className="fade-up">
          <div className="max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center gap-5">
              <div className={`w-24 h-24 rounded-full ${color.bg} grid place-items-center ring-4 ring-white/10 shadow-lg text-5xl leading-none`}>
                {c.flag}
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                {c.name}
              </h2>
              <div className={`text-xs ${color.text} uppercase tracking-[0.22em] font-bold`}>
                {roleLabelMap[c.code]}
              </div>
              <div className="w-16 h-0.5 bg-brand-accent rounded-full" />
              <div className="flex items-start justify-center gap-2 text-sm text-slate-200 leading-relaxed max-w-2xl">
                <MapPin size={16} className={`mt-1 shrink-0 ${color.text}`} />
                <span>{c.address}</span>
              </div>
              {c.description && (
                <p className="text-slate-200 leading-relaxed text-center max-w-2xl">
                  {c.description}
                </p>
              )}
            </div>

            {(c as Country & { parentCompany?: string }).parentCompany && (
              <div className="mt-12">
                <h3 className="text-brand-accent uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-5">
                  Parent Company
                </h3>
                <div className="inline-flex items-center gap-2 text-lg md:text-xl text-white font-semibold max-w-3xl mx-auto">
                  <CheckCircle2 size={22} className="text-brand-accent shrink-0" />
                  <span className="hover:underline hover:underline-offset-4 hover:decoration-brand-accent cursor-pointer transition">
                    {(c as Country & { parentCompany: string }).parentCompany}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-12 -mx-6 lg:-mx-10">
              <h3 className="text-brand-accent uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-5 text-center">
                {(c as Country & { entitiesLabel?: string }).entitiesLabel ?? t('global.entities')}
              </h3>
              <ul className="mx-auto mb-8 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-4xl px-6 lg:px-10">
                {c.entities.map((e) => (
                  <li key={e} className="flex items-center gap-2 text-sm md:text-base text-slate-200">
                    <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                    <span className="truncate hover:underline hover:underline-offset-4 hover:decoration-brand-accent cursor-pointer transition">
                      {e}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="group overflow-hidden relative">
                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-ink to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-ink to-transparent z-10 pointer-events-none" />
                <div className="flex gap-5 w-max py-2 animate-marquee-reverse marquee-pause group-hover:[animation-play-state:paused]">
                  {[...c.entities, ...c.entities].map((e, i) => (
                    <div
                      key={e + i}
                      className="shrink-0 w-72 bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-brand-accent hover:bg-white/10 hover:-translate-y-1 transition"
                    >
                      <div className="h-32 bg-gradient-to-br from-brand-accent/20 via-white/5 to-brand-accent/10 grid place-items-center">
                        <img
                          src={assets.logo}
                          alt="Yanabiya"
                          className="w-24 h-24 object-contain drop-shadow"
                          onError={(ev) => {
                            const t = ev.currentTarget as HTMLImageElement
                            t.style.display = 'none'
                          }}
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-base text-white font-semibold leading-snug">{e}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {(c as Country & { activities?: { code: string; name: string; icon?: string; image?: string }[] }).activities && (
              <div className="mt-12 -mx-6 lg:-mx-10">
                <h3 className="text-brand-accent uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-5 text-center">
                  Commercial Activities
                </h3>
                <ul className="mx-auto mb-8 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-5xl px-6 lg:px-10">
                  {(c as Country & { activities: { code: string; name: string }[] }).activities.map((a) => (
                    <li key={a.code + a.name} className="flex items-center gap-2 text-sm md:text-base text-slate-200">
                      <CheckCircle2 size={18} className="text-brand-accent shrink-0" />
                      <span className="truncate hover:underline hover:underline-offset-4 hover:decoration-brand-accent cursor-pointer transition">
                        {a.name}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="group overflow-hidden relative">
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-ink to-transparent z-10 pointer-events-none" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-ink to-transparent z-10 pointer-events-none" />
                  <div className="flex gap-5 w-max py-2 animate-marquee marquee-pause group-hover:[animation-play-state:paused]">
                    {(() => {
                      const acts = (c as Country & { activities: { code: string; name: string; icon?: string; image?: string }[] }).activities
                      return [...acts, ...acts].map((a, i) => (
                        <div
                          key={a.code + a.name + i}
                          className="relative shrink-0 w-80 h-80 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-accent hover:-translate-y-1 transition"
                        >
                          {a.image ? (
                            <img
                              src={a.image}
                              alt={a.name}
                              loading="lazy"
                              className="absolute inset-0 w-full h-full object-cover"
                              onError={(ev) => {
                                const t = ev.currentTarget as HTMLImageElement
                                t.style.display = 'none'
                              }}
                            />
                          ) : (
                            <div className="absolute inset-0 bg-white/5" />
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-4 pt-14">
                            <h4 className="text-sm md:text-base text-white font-semibold leading-snug line-clamp-2 drop-shadow">
                              {a.name}
                            </h4>
                          </div>
                        </div>
                      ))
                    })()}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  )
}
