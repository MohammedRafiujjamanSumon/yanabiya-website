import { useTranslation } from 'react-i18next'
import { Calendar, ArrowUpRight } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { useSection } from '../hooks/useSection'

type InsightPost = { category: string; title: string; date: string; excerpt: string }

const posts: InsightPost[] = [
  { category: 'Digital Transformation', title: 'Modernising Gulf enterprises: why cloud-first is no longer optional', date: '2026-04-10', excerpt: 'How regional businesses are rethinking infrastructure and workflows in the era of AI and SaaS.' },
  { category: 'Trade', title: 'Import-export trends connecting South Asia, the Gulf and Europe', date: '2026-03-22', excerpt: 'A look at logistics routes, regulatory shifts and new market openings for 2026 and beyond.' },
  { category: 'Cyber Security', title: 'Practical cyber hygiene for SMEs in the region', date: '2026-03-05', excerpt: 'Five security practices every growing business should adopt, without slowing down the team.' },
  { category: 'Cloud', title: "A buyer's guide to cloud adoption in 2026", date: '2026-02-14', excerpt: 'Comparing strategies, vendors and total cost of ownership for Gulf-based enterprises.' },
  { category: 'IT Outsourcing', title: 'When to build, when to outsource: a decision framework', date: '2026-01-30', excerpt: 'A practical lens for engineering leaders weighing internal vs external delivery.' },
  { category: 'Data & BI', title: 'From dashboards to decisions: getting real value from BI', date: '2026-01-12', excerpt: 'Common pitfalls and the patterns that actually move the needle on decision quality.' },
]

// Magazine layout: feature post + grid
export default function Insights() {
  const { t } = useTranslation()
  const apiBlog = useSection<InsightPost[]>('blog')
  const displayPosts = apiBlog ?? posts
  const [feature, ...rest] = displayPosts.slice(0, 6)
  return (
    <Section id="insights" className="bg-stone-50">
      <div className="container-x">
        <div className="max-w-3xl mb-12">
          <Eyebrow>{t('insights.eyebrow')}</Eyebrow>
          <H2>{t('insights.title')}</H2>
          <p className="mt-4 max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-snug text-justify [text-align-last:center]">{t('insights.sub')}</p>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-3 gap-6 min-w-[600px]">
          <article className="col-span-2 card-panel relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent" />
            <div className="relative">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-3">{feature.category}</div>
              <h3 className="font-serif text-3xl text-slate-900 mb-4 leading-tight">{feature.title}</h3>
              <p className="text-slate-600 mb-6 leading-snug">{feature.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-4">
                <span className="flex items-center gap-2"><Calendar size={14} /> {feature.date}</span>
                <span className="flex items-center gap-2 text-brand-accent group-hover:gap-3 transition-all">
                  {t('insights.readMore')} <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </article>

          <div className="grid gap-6">
            {rest.slice(0, 2).map((p) => (
              <article key={p.title} className="card-panel">
                <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">{p.category}</div>
                <h3 className="text-lg text-slate-900 mb-2 leading-snug">{p.title}</h3>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-4 border-t border-slate-200 pt-3">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                  <span className="text-brand-accent">{t('insights.readMore')} →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 md:overflow-visible md:mx-0 md:px-0">
        <div className="grid grid-cols-3 gap-6 mt-6 min-w-[600px]">
          {rest.slice(2).map((p) => (
            <article key={p.title} className="card-panel">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">{p.category}</div>
              <h3 className="text-lg text-slate-900 mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                <span className="text-brand-accent">→</span>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </Section>
  )
}
