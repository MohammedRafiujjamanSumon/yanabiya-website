import { useTranslation } from 'react-i18next'
import { Lightbulb, Cloud, Shield, Database, Palette, Cpu } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const focus = [
  { icon: Cpu, t: 'ERP & Enterprise Software', d: 'End-to-end ERP design and roll-out.' },
  { icon: Cloud, t: 'Cloud Infrastructure', d: 'AWS and Azure architecture and managed services.' },
  { icon: Shield, t: 'Cyber Security', d: 'Penetration testing and ethical-hacking practice.' },
  { icon: Database, t: 'Data Analytics & BI', d: 'Dashboards, ETL pipelines and decision intelligence.' },
  { icon: Palette, t: 'Modern UI/UX', d: 'Research-led product and interface engineering.' },
  { icon: Lightbulb, t: 'R&D Initiatives', d: 'Continuous experimentation in emerging technologies.' },
]

const pillarKeys = ['digital', 'talent', 'process', 'customer'] as const

export default function Strategy() {
  const { t } = useTranslation()
  return (
    <Section id="strategy">
      <div className="container-x">
        <div className="max-w-3xl mb-14">
          <Eyebrow>{t('strategy.eyebrow')}</Eyebrow>
          <H2>{t('strategy.title')}</H2>
          <p className="mt-5 text-slate-600">{t('strategy.sub')}</p>
        </div>

        {/* Numbered timeline pillars */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
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

        <h3 className="font-serif text-2xl text-slate-900 mb-5">{t('strategy.focus')}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </Section>
  )
}
