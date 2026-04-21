import { useTranslation } from 'react-i18next'
import { Building2, Users, Globe, BadgeCheck } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const stats = [
  { icon: Users, value: '500+', kKey: 'clients' },
  { icon: Building2, value: '9', kKey: 'entities' },
  { icon: Globe, value: '4', kKey: 'countries' },
  { icon: BadgeCheck, value: '15Y+', kKey: 'track' },
]

const memberships = [
  'Oman Chamber of Commerce & Industry',
  'UK British-Arab Trade Network',
  'Bangladesh Chamber of Commerce',
  'AWS Partner Network',
  'Microsoft Partner Network',
  'Oracle Partner Network',
]

export default function NetworkSection() {
  const { t } = useTranslation()
  return (
    <Section id="network">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>{t('network.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('network.title')}</H2>
          <p className="mt-5 text-slate-600">{t('network.sub')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.kKey} className="card-panel text-center relative overflow-hidden">
              <div className="absolute -top-4 -end-4 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl" />
              <s.icon className="text-brand-accent mx-auto mb-3 relative" />
              <div className="font-serif text-4xl text-slate-900 relative">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1 relative">
                {t(`network.stats.${s.kKey}`)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-2xl text-slate-900 mb-5">{t('network.memberships')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberships.map((m) => (
              <div key={m} className="card-panel flex items-center gap-3">
                <BadgeCheck className="text-brand-accent shrink-0" />
                <span className="text-sm text-slate-800">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
