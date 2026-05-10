import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Lightbulb, Cloud, Shield, Database, Palette, Cpu } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const FOCUS_ICONS = [Cpu, Cloud, Shield, Database, Palette, Lightbulb]
const FOCUS_KEYS = ['erp', 'cloud', 'cyber', 'data', 'ui', 'rd'] as const
const pillarKeys = ['digital', 'talent', 'process', 'customer'] as const

export default function Strategy() {
  const { t } = useTranslation()
  const focus = useMemo(
    () => FOCUS_KEYS.map((k, i) => ({ icon: FOCUS_ICONS[i], t: t(`strategy.focus_items.${k}.t`), d: t(`strategy.focus_items.${k}.d`) })),
    [t],
  )
  return (
    <Section id="strategy">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t('strategy.eyebrow')}</Eyebrow>
          <H2>{t('strategy.title')}</H2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-600 leading-snug text-justify">{t('strategy.sub')}</p>
        </div>

        {/* Numbered timeline pillars */}
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-2 gap-6 mb-16 min-w-[480px]">
          {pillarKeys.map((k, i) => (
            <div key={k} className="card-panel relative pt-10">
              <div className="absolute -top-4 start-6 w-12 h-12 rounded-lg bg-brand-accent text-white grid place-items-center font-serif text-xl font-bold">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-serif text-2xl text-brand-accent mb-2">{t(`strategy.pillars.${k}.t`)}</h3>
              <p className="text-slate-600">{t(`strategy.pillars.${k}.d`)}</p>
            </div>
          ))}
        </div>
        </div>

        <h3 className="font-serif text-2xl text-slate-900 mb-5">{t('strategy.focus')}</h3>
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-3 gap-5 min-w-[480px]">
          {focus.map((f) => (
            <div key={f.t} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <f.icon size={22} />
              </div>
              <h4 className="text-lg text-slate-900 mb-1">{f.t}</h4>
              <p className="text-sm text-slate-600">{f.d}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </Section>
  )
}
