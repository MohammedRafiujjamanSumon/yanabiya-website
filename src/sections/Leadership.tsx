import { useTranslation } from 'react-i18next'
import Section, { Eyebrow, H2 } from '../components/Section'
import { board, team } from '../data/leadership'
import { Quote } from 'lucide-react'

export default function Leadership() {
  const { t } = useTranslation()
  return (
    <Section id="leadership" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>{t('leadership.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('leadership.title')}</H2>
          <p className="mt-5 text-slate-600">{t('leadership.sub')}</p>
        </div>

        <div id="management" className="grid lg:grid-cols-12 gap-6 mb-14 scroll-mt-28">
          <div className="lg:col-span-7 card-panel relative overflow-hidden">
            <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={140} />
            <div className="relative flex flex-col md:flex-row gap-6 items-start">
              <img src={board[0].photo} alt={board[0].name}
                   className="w-32 h-32 rounded-2xl object-cover border-2 border-brand-accent/40 shrink-0 bg-white"
                   onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
              <div>
                <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">{t(board[0].roleKey)}</div>
                <h3 className="font-serif text-2xl text-slate-900 mb-3">{board[0].name}</h3>
                <p className="text-sm text-slate-600 italic leading-relaxed">"{t(board[0].msgKey)}"</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 card-panel relative overflow-hidden">
            <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={100} />
            <div className="relative">
              <img src={board[1].photo} alt={board[1].name}
                   className="w-20 h-20 rounded-full object-cover border-2 border-brand-accent/40 mb-4 bg-white"
                   onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">{t(board[1].roleKey)}</div>
              <h3 className="font-serif text-xl text-slate-900 mb-3">{board[1].name}</h3>
              <p className="text-sm text-slate-600 italic leading-relaxed">"{t(board[1].msgKey)}"</p>
            </div>
          </div>
        </div>

        <h3 id="professionals" className="font-serif text-2xl text-slate-900 mb-6 scroll-mt-28">
          {t('leadership.core')}
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {team.map((m) => (
            <div key={m.name} className="card-panel text-center group hover:-translate-y-1 transition">
              <img src={m.photo} alt={m.name}
                   className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border border-brand-accent/30 bg-white"
                   onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')} />
              <div className="text-slate-900 text-sm font-medium leading-tight">{m.name}</div>
              <div className="text-[10px] text-brand-accent uppercase tracking-widest mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
