import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Heart, BookOpen, Stethoscope, Sprout, Leaf, Recycle, TreePine, Users } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const communityItems = [
  { icon: Heart,       k: 'welfare' },
  { icon: BookOpen,    k: 'education' },
  { icon: Stethoscope, k: 'health' },
  { icon: Sprout,      k: 'empower' },
]

const SUS_ICONS = [Leaf, Recycle, TreePine, Users]
const SUS_KEYS = ['green', 'circular', 'climate', 'inclusive'] as const

export default function CSR() {
  const { t } = useTranslation()
  const sustainabilityItems = useMemo(
    () => SUS_KEYS.map((k, i) => ({ icon: SUS_ICONS[i], title: t(`csr.sustainability.items.${k}.t`), desc: t(`csr.sustainability.items.${k}.d`) })),
    [t],
  )
  const stats = useMemo(() => [
    { v: '500+', l: t('csr.stats.beneficiaries') },
    { v: '4',    l: t('csr.stats.countries') },
    { v: '15Y',  l: t('csr.stats.track') },
  ], [t])
  return (
    <Section id="csr" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Eyebrow>{t('csr.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('csr.title')}</H2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-snug text-justify [text-align-last:center]">{t('csr.sub')}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-14">
          {stats.map((s) => (
            <div key={s.l} className="card-panel text-center">
              <div className="font-serif text-2xl text-brand-accent">{s.v}</div>
              <div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Sustainable Growth */}
        <h3 id="sustainable-growth" className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6 scroll-mt-28">
          {t('csr.sustainability.title')}
        </h3>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
          {t('csr.sustainability.desc')}
        </p>
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0"><div className="grid grid-cols-4 gap-5 mb-14 min-w-[520px]">
          {sustainabilityItems.map((it) => (
            <div key={it.title} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h4 className="text-slate-900 text-lg mb-1">{it.title}</h4>
              <p className="text-sm text-slate-600 leading-snug">{it.desc}</p>
            </div>
          ))}
        </div></div>

        {/* Community Care */}
        <h3 id="community-care" className="text-center text-brand-accentDark uppercase tracking-[0.22em] text-sm md:text-base font-bold mb-6 scroll-mt-28">
          {t('csr.community.title')}
        </h3>
        <p className="text-center text-slate-600 max-w-2xl mx-auto mb-8">
          {t('csr.community.desc')}
        </p>
        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-4 gap-5 min-w-[520px]">
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
      </div>
    </Section>
  )
}
