import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Heart, BookOpen, Stethoscope, Sprout } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const items = [
  { icon: Heart,       k: 'welfare' },
  { icon: BookOpen,    k: 'education' },
  { icon: Stethoscope, k: 'health' },
  { icon: Sprout,      k: 'empower' },
]

export default function CommunityCare() {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="community-care" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Community</Eyebrow>
          <H2 className="text-center">Community Care</H2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Structured charitable donations and welfare programmes focused on transparency, dignity, and lasting impact.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.k} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h4 className="text-slate-900 text-lg mb-1">{t(`csr.items.${it.k}.t`)}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{t(`csr.items.${it.k}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
