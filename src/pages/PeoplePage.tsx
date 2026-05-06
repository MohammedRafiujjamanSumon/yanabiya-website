import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ALL_PEOPLE, type PersonData } from '../data/people'

type PageConfig = {
  title: string
  subtitle: string
  tier: 'board' | 'exec'
  people: PersonData[]
}

const PAGES: Record<string, PageConfig> = {
  board: {
    title: 'Board of Directors',
    subtitle: 'Tier 01, Global Board & Advisory',
    tier: 'board',
    people: ALL_PEOPLE.filter((p) => p.tier === 'board'),
  },
  executive: {
    title: 'Executive Leadership',
    subtitle: 'Tier 02, Global Executive Management',
    tier: 'exec',
    people: ALL_PEOPLE.filter((p) => p.tier === 'exec'),
  },
}

const THEME = {
  board: {
    badge:      'bg-amber-100 text-amber-800 border-amber-300',
    headerBg:   'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200',
    heading:    'text-amber-900',
    line:       'bg-amber-400',
    accent:     'text-amber-600',
  },
  exec: {
    badge:      'bg-blue-100 text-blue-800 border-blue-300',
    headerBg:   'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200',
    heading:    'text-blue-900',
    line:       'bg-blue-400',
    accent:     'text-blue-600',
  },
}

export default function PeoplePage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const page = PAGES[slug ?? '']

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-deep">Page not found.</p>
        <Link to="/#leadership" className="text-brand-accentDark underline text-sm">← Our People</Link>
      </div>
    )
  }

  const t = THEME[page.tier]
  const otherPages = Object.entries(PAGES).filter(([k]) => k !== slug)

  return (
    <div className="min-h-screen bg-white">

      {/* Sticky back bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-6 md:px-16 py-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                     text-slate-400 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={13} /> Our People
        </button>
      </div>

      {/* Page hero header */}
      <div className={`border-b px-6 md:px-16 py-14 md:py-20 ${t.headerBg}`}>
        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border mb-4
                         text-[10px] font-bold uppercase tracking-widest ${t.badge}`}>
          {page.subtitle}
        </div>
        <h1 className={`font-serif text-3xl md:text-5xl leading-tight ${t.heading}`}>
          {page.title}
        </h1>
      </div>

      {/* People grid */}
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {page.people.map((person) => (
            <div
              key={person.id}
              className="flex flex-col sm:flex-row gap-5 p-6 rounded-2xl
                         bg-white/60 border border-slate-100 shadow-sm hover:shadow-md
                         transition-shadow duration-300"
            >
              {/* Photo */}
              <div className="shrink-0 w-full sm:w-40 h-52 sm:h-40 rounded-xl overflow-hidden">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className={`w-8 h-0.5 rounded-full mb-3 ${t.line}`} />
                <h3 className="font-serif text-xl text-brand-deep leading-tight">{person.name}</h3>
                <p className={`text-xs font-bold uppercase tracking-[0.18em] mt-1 mb-3 ${t.accent}`}>
                  {person.role}
                </p>
                <p className="text-sm text-brand-deep/60 leading-relaxed mb-3">
                  {person.shortBio}
                </p>
                <div className="space-y-2">
                  {person.fullBio.map((para, i) => (
                    <p key={i} className="text-xs text-brand-deep/50 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other pages nav */}
      {otherPages.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-6 md:px-16 py-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-5">
              Also Explore
            </p>
            <div className="flex flex-wrap gap-3">
              {otherPages.map(([key, pg]) => (
                <Link
                  key={key}
                  to={`/people/${key}`}
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-full
                             bg-white border border-slate-200 hover:border-brand-accent/50
                             hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                >
                  <div className="flex -space-x-2">
                    {pg.people.slice(0, 3).map((p) => (
                      <div key={p.id} className="w-7 h-7 rounded-full overflow-hidden ring-2 ring-white">
                        <img src={p.image} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-brand-deep">{pg.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
