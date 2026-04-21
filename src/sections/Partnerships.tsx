import { useTranslation } from 'react-i18next'
import Section, { Eyebrow, H2 } from '../components/Section'
import { partners } from '../data/partners'

// Continuous marquee strip — visually distinct from card grids elsewhere.
export default function Partnerships() {
  const { t } = useTranslation()
  const loop = [...partners, ...partners]
  return (
    <Section id="partnerships" className="bg-stone-50">
      <div className="container-x text-center max-w-3xl mx-auto mb-12">
        <Eyebrow>{t('partnerships.eyebrow')}</Eyebrow>
        <H2 className="text-center">{t('partnerships.title')}</H2>
        <p className="mt-5 text-slate-600">{t('partnerships.sub')}</p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex animate-marquee gap-6 w-max">
          {loop.map((p, i) => (
            <div key={`${p.name}-${i}`} className="bg-white rounded-xl p-5 h-24 w-44 grid place-items-center shrink-0 shadow-lg">
              <img src={p.logo} alt={p.name} className="max-h-14 object-contain" />
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 start-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      <div className="container-x mt-14 grid md:grid-cols-3 gap-4 text-center">
        {['Cloud', 'Software', 'Hardware'].map((k) => (
          <div key={k} className="card-panel">
            <div className="font-serif text-2xl text-brand-accent">{k}</div>
            <div className="text-sm text-slate-500 mt-1">Enterprise-grade partnerships</div>
          </div>
        ))}
      </div>
    </Section>
  )
}
