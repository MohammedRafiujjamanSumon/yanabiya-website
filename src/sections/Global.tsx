import { useTranslation } from 'react-i18next'
import { MapPin } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { countries } from '../data/countries'

const roleKeyMap: Record<string, string> = {
  OM: 'global.headquarters',
  GB: 'global.europe',
  BD: 'global.southAsia',
  US: 'global.northAmerica',
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
  return (
    <Section id="global" className="bg-brand-ink">
      <div className="container-x">
        <Eyebrow tone="light">{t('global.eyebrow')}</Eyebrow>
        <p className="text-slate-300 leading-relaxed text-justify [text-align-last:justify] max-w-3xl mx-auto mb-10">
          {t('global.sub')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {countries.map((c) => {
            const color = colorMap[c.code] ?? defaultColor
            return (
              <div
                key={c.code}
                className="group relative card-panel overflow-hidden !bg-white hover:-translate-y-1 transition text-center"
              >
                <div className="relative flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full ${color.bg} grid place-items-center mb-4 ring-4 ${color.ring} shadow-sm text-3xl leading-none`}>
                    {c.flag}
                  </div>
                  <h3 className="text-slate-900 mb-1 text-xl">{c.name}</h3>
                  <div className={`text-xs ${color.text} uppercase tracking-widest font-semibold mb-3`}>
                    {t(roleKeyMap[c.code])}
                  </div>
                  <div className="flex items-start justify-center gap-2 text-sm text-slate-600 leading-relaxed mb-4">
                    <MapPin size={14} className={`mt-1 shrink-0 ${color.text}`} />
                    <span>{c.address}</span>
                  </div>
                  {c.description && (
                    <p className="text-sm text-slate-700 leading-relaxed text-justify [text-align-last:justify] mb-4">
                      {c.description}
                    </p>
                  )}
                  {c.licenceName && (
                    <div className={`w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 mb-4`}>
                      <div className={`text-[11px] uppercase tracking-widest ${color.text} font-semibold mb-0.5`}>
                        Licence Name
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        {c.licenceName}
                      </div>
                    </div>
                  )}
                  {!c.licenceName && (
                    <>
                      <div className="text-xs uppercase tracking-widest text-slate-500 mb-2">
                        {t('global.entities')} ({c.entities.length})
                      </div>
                      <ul className="space-y-1.5 text-sm text-slate-700 text-left inline-block">
                        {c.entities.map((e) => (
                          <li key={e} className="flex gap-2">
                            <span className={color.bullet}>•</span> {e}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
