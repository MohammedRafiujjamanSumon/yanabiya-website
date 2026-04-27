import { useTranslation } from 'react-i18next'
import { Heart, BookOpen, Stethoscope, Sprout, Leaf, Recycle, TreePine, Users } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const communityItems = [
  { icon: Heart,       k: 'welfare' },
  { icon: BookOpen,    k: 'education' },
  { icon: Stethoscope, k: 'health' },
  { icon: Sprout,      k: 'empower' },
]

const sustainabilityItems = [
  { icon: Leaf,     title: 'Green Operations',    desc: 'Energy-efficient offices and responsible resource usage across all branches.' },
  { icon: Recycle,  title: 'Circular Practices',  desc: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.' },
  { icon: TreePine, title: 'Climate Commitment',  desc: 'Tree plantation drives and lower-emission business models for long-term impact.' },
  { icon: Users,    title: 'Inclusive Growth',    desc: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.' },
]

export default function CSR() {
  const { t } = useTranslation()
  return (
    <Section id="csr" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Eyebrow>{t('csr.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('csr.title')}</H2>
          <p className="mt-5 text-slate-600 leading-snug">{t('csr.sub')}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-14">
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

        {/* Sustainable Growth */}
        <h3 id="sustainable-growth" className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6 scroll-mt-28">
          Sustainable Growth
        </h3>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
          Building business practices that protect the environment and support long-term value for every stakeholder we serve.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {sustainabilityItems.map((it) => (
            <div key={it.title} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h4 className="text-slate-900 text-lg mb-1">{it.title}</h4>
              <p className="text-sm text-slate-600 leading-snug">{it.desc}</p>
            </div>
          ))}
        </div>

        {/* Community Care */}
        <h3 id="community-care" className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6 scroll-mt-28">
          Community Care
        </h3>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
          Structured charitable donations and welfare programmes focused on transparency, dignity, and lasting impact.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityItems.map((it) => (
            <div key={it.k} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h4 className="text-slate-900 text-lg mb-1">{t(`csr.items.${it.k}.t`)}</h4>
              <p className="text-sm text-slate-600 leading-snug">{t(`csr.items.${it.k}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
