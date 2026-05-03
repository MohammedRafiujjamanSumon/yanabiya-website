import { useEffect, useState } from 'react'
import { Calendar, ArrowUpRight } from 'lucide-react'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import CircleInfographic, { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'

const blogCategories: CircleItem[] = [
  { label: 'Group Update', description: 'Major announcements and milestones from across the four Yanabiya regions.', bg: 'bg-emerald-500' },
  { label: 'Insights',     description: 'Market analysis, sector outlooks and commentary from our regional leadership.',   bg: 'bg-sky-500' },
  { label: 'People',       description: 'Team stories, hiring spotlights and culture pieces from every office.',           bg: 'bg-amber-500' },
  { label: 'Technology',   description: 'Product, cloud, AI and security updates from our engineering teams.',             bg: 'bg-rose-500' },
  { label: 'Community',    description: 'CSR, sustainability and outreach reports across all four regions.',               bg: 'bg-teal-700' },
]

type CountryCode = 'OM' | 'GB' | 'BD' | 'US' | 'ALL'

type Post = {
  country: CountryCode
  category: string
  title: string
  date: string
  excerpt: string
}

const posts: Post[] = [
  { country: 'ALL', category: 'Group Update', title: 'Yanabiya Group expands footprint across four countries',                          date: '2026-04-10', excerpt: 'A year of growth across Oman, the United Kingdom, Bangladesh and the USA.' },
  { country: 'OM',  category: 'Trade',        title: 'Inside our Muscat operations: trade, logistics and technology under one roof',   date: '2026-03-22', excerpt: 'How the Omani headquarters coordinates multi-sector activities for the wider group.' },
  { country: 'GB',  category: 'Insights',     title: 'From London: European market outlook for Gulf-based businesses',                 date: '2026-03-05', excerpt: 'Why our UK office sees a widening opportunity for cross-border services in 2026.' },
  { country: 'BD',  category: 'People',       title: 'Bangladesh hub: building a regional talent engine for the group',                date: '2026-02-14', excerpt: 'The story of our growing Dhaka team and their contribution across business lines.' },
  { country: 'US',  category: 'Technology',   title: 'Austin office on cloud, cyber and the AI roadmap',                               date: '2026-01-30', excerpt: 'How our US LLC anchors technology delivery for clients across the group.' },
  { country: 'ALL', category: 'Community',    title: 'Our 2026 CSR report: impact across four regions',                                date: '2026-01-12', excerpt: 'Figures, stories and commitments from our community work this year.' },
]

const filters: { code: CountryCode; label: string; flag?: string }[] = [
  { code: 'ALL', label: 'All Regions' },
  { code: 'OM',  label: 'Oman',           flag: '🇴🇲' },
  { code: 'GB',  label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BD',  label: 'Bangladesh',     flag: '🇧🇩' },
  { code: 'US',  label: 'USA',            flag: '🇺🇸' },
]

function countryLabel(code: CountryCode) {
  if (code === 'ALL') return 'All Regions'
  const c = countries.find((x) => x.code === code)
  return c ? `${c.flag} ${c.name}` : code
}

export default function Blog() {
  const [filter, setFilter] = useState<CountryCode>('ALL')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const visible = filter === 'ALL'
    ? posts
    : posts.filter((p) => p.country === filter || p.country === 'ALL')
  const [feature, ...rest] = visible

  return (
    <>
      <PageHero
        eyebrow="Our Community"
        title="Blog"
        subtitle="Stories, insights and updates from Yanabiya Group teams across Oman, the United Kingdom, Bangladesh and the USA."
      />

      <Section id="blog" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="mb-16">
          <CircleInfographic
            eyebrow="What we cover"
            titleLine1="Our Range of"
            titleLine2="Community Stories"
            items={blogCategories}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => {
            const active = filter === f.code
            return (
              <button
                key={f.code}
                type="button"
                onClick={() => setFilter(f.code)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition border ${
                  active
                    ? 'bg-brand-accent text-brand-ink border-brand-accent'
                    : 'bg-brand-50 text-slate-600 border-slate-200 hover:border-brand-accent hover:text-brand-accentDark'
                }`}
              >
                {f.flag && <span className="me-2">{f.flag}</span>}
                {f.label}
              </button>
            )
          })}
        </div>

        {feature && (
          <article className="card-panel relative overflow-hidden mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/10 to-transparent" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs uppercase tracking-widest text-brand-accentDark">{feature.category}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{countryLabel(feature.country)}</span>
              </div>
              <h3 className="font-serif text-3xl text-slate-900 mb-4 leading-tight">{feature.title}</h3>
              <p className="text-slate-600 mb-6 leading-snug">{feature.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-slate-500 border-t border-slate-200 pt-4">
                <span className="flex items-center gap-2"><Calendar size={14} /> {feature.date}</span>
                <span className="flex items-center gap-2 text-brand-accentDark">
                  Read more <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          </article>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((p) => (
            <article key={p.title} className="card-panel">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-widest text-brand-accentDark">{p.category}</span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500">{countryLabel(p.country)}</span>
              </div>
              <h3 className="text-lg text-slate-900 mb-2 leading-snug">{p.title}</h3>
              <p className="text-sm text-slate-600 mb-4">{p.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {p.date}</span>
                <span className="text-brand-accentDark">→</span>
              </div>
            </article>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="text-center text-slate-500 py-4">
            No posts for this region yet — check back soon.
          </div>
        )}
      </div>
    </Section>
    </>
  )
}
