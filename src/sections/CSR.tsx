import { useTranslation } from 'react-i18next'
import { Heart, BookOpen, Stethoscope, Sprout } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const items = [
  { icon: Heart,       k: 'welfare' },
  { icon: BookOpen,    k: 'education' },
  { icon: Stethoscope, k: 'health' },
  { icon: Sprout,      k: 'empower' },
]

export default function CSR() {
  const { t } = useTranslation()
  return (
    <Section id="csr" className="bg-stone-50">
      <div className="container-x grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Eyebrow>{t('csr.eyebrow')}</Eyebrow>
          <H2>{t('csr.title')}</H2>
          <p className="mt-5 text-slate-600 leading-relaxed">{t('csr.sub')}</p>

          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { v: '500+', l: 'Beneficiaries' },
              { v: '4',    l: 'Countries' },
              { v: '15Y',  l: 'Track record' },
            ].map((s) => (
              <div key={s.l} className="card-panel text-center">
                <div className="font-serif text-2xl text-brand-accent">{s.v}</div>
                <div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((it) => (
            <div key={it.k} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h3 className="text-slate-900 text-lg mb-1">{t(`csr.items.${it.k}.t`)}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{t(`csr.items.${it.k}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
