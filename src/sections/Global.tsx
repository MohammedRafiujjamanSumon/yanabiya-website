import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { countries } from '../data/countries'

type Country = (typeof countries)[number]

const roleLabelMap: Record<string, string> = {
  OM: 'Headquarters',
  GB: 'Branch Office',
  BD: 'Branch Office',
  US: 'Branch Office',
}

const colorMap: Record<string, { bg: string; ring: string; text: string; bullet: string }> = {
  OM: { bg: 'bg-emerald-100', ring: 'ring-emerald-50', text: 'text-emerald-600', bullet: 'text-emerald-600' },
  GB: { bg: 'bg-indigo-100',  ring: 'ring-indigo-50',  text: 'text-indigo-600',  bullet: 'text-indigo-600'  },
  BD: { bg: 'bg-rose-100',    ring: 'ring-rose-50',    text: 'text-rose-600',    bullet: 'text-rose-600'    },
  US: { bg: 'bg-amber-100',   ring: 'ring-amber-50',   text: 'text-amber-600',   bullet: 'text-amber-600'   },
}
const defaultColor = { bg: 'bg-blue-100', ring: 'ring-blue-50', text: 'text-blue-600', bullet: 'text-blue-600' }

export default function Global() {
  const { t } = useTranslation()
  const [active, setActive] = useState<Country | null>(null)

  return (
    <Section id="global" className="bg-brand-ink">
      <div className="container-x">
        {active ? (
          /* ───────────── COUNTRY DETAIL "PAGE" ───────────── */
          <CountryDetail country={active} onBack={() => setActive(null)} t={t} />
        ) : (
          /* ───────────── GRID OF COUNTRIES ───────────── */
          <>
            <Eyebrow tone="light">{t('global.eyebrow')}</Eyebrow>
            <p className="text-slate-300 leading-relaxed text-justify [text-align-last:justify] max-w-3xl mx-auto mb-10">
              {t('global.sub')}
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
              {countries.map((c) => {
                const color = colorMap[c.code] ?? defaultColor
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => setActive(c)}
                    className="group relative card-panel overflow-hidden !bg-white hover:-translate-y-1 transition text-center"
                  >
                    <div className="relative flex flex-col items-center">
                      <div className={`w-14 h-14 rounded-full ${color.bg} grid place-items-center mb-3 ring-4 ${color.ring} shadow-sm text-2xl leading-none`}>
                        {c.flag}
                      </div>
                      <h3 className="text-slate-900 mb-1 text-base font-semibold">{c.name}</h3>
                      <div className={`text-[11px] ${color.text} uppercase tracking-widest font-semibold mb-2`}>
                        {roleLabelMap[c.code]}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed whitespace-nowrap">
                        {(c as typeof c & { parentCompany?: string }).parentCompany ?? c.entities[0]}
                      </p>
                      <span className={`mt-3 inline-flex items-center gap-1 text-[11px] ${color.text} uppercase tracking-widest font-semibold group-hover:gap-2 transition-all`}>
                        Learn more →
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          </>
        )}
      </div>
    </Section>
  )
}

function CountryDetail({
  country: c,
  onBack,
  t,
}: {
  country: Country
  onBack: () => void
  t: (k: string) => string
}) {
  const color = colorMap[c.code] ?? defaultColor
  return (
    <div className="fade-up">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-brand-accent hover:text-white mb-6 text-sm uppercase tracking-[0.18em] font-semibold"
      >
        <ArrowLeft size={16} /> Back to all countries
      </button>

      <div className="max-w-5xl mx-auto text-center">
        {/* Flag · Name · Role */}
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

        {/* Parent Company (if provided) */}
        {(c as Country & { parentCompany?: string }).parentCompany && (
          <div className="mt-12">
            <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-5">
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

        {/* Entities / Partner Companies */}
        <div className="mt-12">
          <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-5">
            {(c as Country & { entitiesLabel?: string }).entitiesLabel ?? t('global.entities')}
          </h3>
          <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-left max-w-4xl mx-auto">
            {c.entities.map((e) => (
              <li key={e} className="flex items-center gap-2 text-sm text-slate-200">
                <CheckCircle2 size={16} className="text-brand-accent shrink-0" />
                <span className="truncate hover:underline hover:underline-offset-4 hover:decoration-brand-accent cursor-pointer transition">
                  {e}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Commercial Activities (if provided) */}
        {(c as Country & { activities?: { code: string; name: string }[] }).activities && (
          <div className="mt-12">
            <h3 className="text-brand-accent uppercase tracking-[0.22em] text-xs font-bold mb-5">
              Commercial Activities
            </h3>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-left max-w-5xl mx-auto">
              {(c as Country & { activities: { code: string; name: string }[] }).activities.map((a) => (
                <li key={a.code + a.name} className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 size={16} className="text-brand-accent shrink-0" />
                  <span className="truncate hover:underline hover:underline-offset-4 hover:decoration-brand-accent cursor-pointer transition">
                    {a.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
