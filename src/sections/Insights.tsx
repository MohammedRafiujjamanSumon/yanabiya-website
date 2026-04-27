import { useTranslation } from 'react-i18next'
import { Calendar, ArrowUpRight } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const posts = [
  { c: 'Digital Transformation', t: 'Modernising Gulf enterprises: why cloud-first is no longer optional', d: '2026-04-10', e: 'How regional businesses are rethinking infrastructure and workflows in the era of AI and SaaS.' },
  { c: 'Trade', t: 'Import-export trends connecting South Asia, the Gulf and Europe', d: '2026-03-22', e: 'A look at logistics routes, regulatory shifts and new market openings for 2026 and beyond.' },
  { c: 'Cyber Security', t: 'Practical cyber hygiene for SMEs in the region', d: '2026-03-05', e: 'Five security practices every growing business should adopt — without slowing down the team.' },
  { c: 'Cloud', t: "A buyer's guide to cloud adoption in 2026", d: '2026-02-14', e: 'Comparing strategies, vendors and total cost of ownership for Gulf-based enterprises.' },
  { c: 'IT Outsourcing', t: 'When to build, when to outsource: a decision framework', d: '2026-01-30', e: 'A practical lens for engineering leaders weighing internal vs external delivery.' },
  { c: 'Data & BI', t: 'From dashboards to decisions: getting real value from BI', d: '2026-01-12', e: 'Common pitfalls and the patterns that actually move the needle on decision quality.' },
]

// Magazine layout: feature post + grid
export default function Insights() {
  const { t } = useTranslation()
  const [feature, ...rest] = posts
  return (
    <Section id="insights" className="bg-stone-50">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <Eyebrow>{t('insights.eyebrow')}</Eyebrow>
          <H2>{t('insights.title')}</H2>
          <p className="mt-5 text-slate-600">{t('insights.sub')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <article className="lg:col-span-2 card-panel relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-3">{feature.c}</div>
              <h3 className="font-serif text-3xl text-slate-900 mb-4 leading-tight">{feature.t}</h3>
              <p className="text-slate-600 mb-6 leading-snug">{feature.e}</p>
              <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-4">
                <span className="flex items-center gap-2"><Calendar size={14} /> {feature.d}</span>
                <span className="flex items-center gap-2 text-brand-accent group-hover:gap-3 transition-all">
                  {t('insights.readMore')} <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {rest.slice(0, 2).map((p) => (
              <article key={p.t} className="card-panel">
                <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">{p.c}</div>
                <h3 className="text-lg text-slate-900 mb-2 leading-snug">{p.t}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.d}</span>
                  <span className="text-brand-accent">{t('insights.readMore')} →</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {rest.slice(2).map((p) => (
            <article key={p.t} className="card-panel">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">{p.c}</div>
              <h3 className="text-lg text-slate-900 mb-2 leading-snug">{p.t}</h3>
              <p className="text-sm text-slate-600 mb-4">{p.e}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {p.d}</span>
                <span className="text-brand-accent">→</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}
