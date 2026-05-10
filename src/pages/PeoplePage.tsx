import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Mail, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ALL_PEOPLE, type PersonData } from '../data/people'

type FeaturedPerson = { name: string; role: string; image: string; id: string }

type PageConfig = {
  title: string
  subtitle: string
  tier: 'board' | 'exec' | 'dept'
  featured?: FeaturedPerson[]
  people: PersonData[]
}

const sumonAhmed = ALL_PEOPLE.find((p) => p.id === 'sumon-ahmed')!

const PAGES: Record<string, PageConfig> = {
  board: {
    title: 'Board of Members',
    subtitle: 'Tier 01, Board of Members',
    tier: 'board',
    people: ALL_PEOPLE.filter((p) => p.tier === 'board'),
  },
  executive: {
    title: 'Global Executive Management',
    subtitle: 'Tier 02, Global Executive Management',
    tier: 'exec',
    featured: [
      {
        id: sumonAhmed.id,
        name: sumonAhmed.name,
        role: 'Co-Founder, Bangladesh',
        image: sumonAhmed.image,
      },
    ],
    people: ALL_PEOPLE.filter(
      (p) => p.tier === 'exec'
        && p.id !== 'chief-of-accounts'
        && p.id !== 'maysa-yeasmin'
        && !p.id.startsWith('account-')
    ),
  },
  accounts: {
    title: 'Chief of Accounts',
    subtitle: 'Accounts & Finance',
    tier: 'exec',
    people: ALL_PEOPLE.filter((p) => p.id === 'chief-of-accounts'),
  },
  departments: {
    title: 'Business Support Team',
    subtitle: 'Tier 03, Business Support Team',
    tier: 'dept',
    people: ALL_PEOPLE.filter((p) => p.tier === 'dept'),
  },
}

const THEME = {
  board: {
    badge:    'bg-amber-100 text-amber-800 border-amber-300',
    headerBg: 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200',
    heading:  'text-amber-900',
    line:     'bg-amber-400',
    accent:   'text-amber-600',
  },
  exec: {
    badge:    'bg-blue-100 text-blue-800 border-blue-300',
    headerBg: 'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200',
    heading:  'text-blue-900',
    line:     'bg-blue-400',
    accent:   'text-blue-600',
  },
  dept: {
    badge:    'bg-emerald-100 text-emerald-800 border-emerald-300',
    headerBg: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200',
    heading:  'text-emerald-900',
    line:     'bg-emerald-400',
    accent:   'text-emerald-600',
  },
}

export default function PeoplePage({ slug: propSlug }: { slug?: string }) {
  const { t: tr } = useTranslation()
  const params = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const slug = propSlug ?? params.slug
  const page = PAGES[slug ?? '']

  const [drawer, setDrawer] = useState<PersonData | null>(null)

  if (!page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-deep">{tr('people.notFound')}</p>
        <Link to="/#leadership" className="text-brand-accentDark underline text-sm">← {tr('common.ourPeople')}</Link>
      </div>
    )
  }

  const t = THEME[page.tier]

  // ── Accounts page: full profile layout ──────────────────────────────
  if (slug === 'accounts') {
    const cfo = page.people[0]
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-6 md:px-16 py-3">
          <button type="button" onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                       text-slate-400 hover:text-brand-deep transition-colors duration-200">
            <ArrowLeft size={13} /> {tr('common.ourPeople')}
          </button>
        </div>

        <div className={`border-b px-6 md:px-16 py-8 md:py-10 ${t.headerBg}`}>
          <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border mb-4
                           text-[10px] font-bold uppercase tracking-widest ${t.badge}`}>
            {tr('people.accountsFinance')}
          </div>
          <h1 className={`font-serif text-2xl md:text-3xl leading-tight ${t.heading}`}>
            {tr('people.chiefOfAccounts')}
          </h1>
        </div>

        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12 md:py-16">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="shrink-0 w-32 h-32 rounded-2xl overflow-hidden ring-2 ring-blue-100 shadow-md">
              <img src={cfo.image} alt={cfo.name} className="w-full h-full object-cover object-top" />
            </div>
            <div>
              <div className={`w-8 h-0.5 rounded-full mb-3 ${t.line}`} />
              <h2 className="font-serif text-2xl text-brand-deep leading-tight">{cfo.name}</h2>
              <p className={`text-xs font-bold uppercase tracking-[0.18em] mt-1 mb-6 ${t.accent}`}>{cfo.role}</p>
              <div className="space-y-4">
                {cfo.fullBio.map((para, i) => (
                  <p key={i} className="text-sm text-brand-deep/70 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50/60 px-6 md:px-16 py-10">
          <Link to="/#leadership"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-white border border-slate-200 hover:border-brand-accent/50
                       hover:-translate-y-0.5 transition-all duration-200 shadow-sm
                       text-xs font-semibold text-brand-deep">
            <ArrowLeft size={13} /> {tr('common.ourPeople')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Sticky back bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-6 md:px-16 py-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                     text-slate-400 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={13} /> {tr('common.ourPeople')}
        </button>
      </div>

      {/* Page hero header */}
      <div className={`border-b px-6 md:px-16 py-4 md:py-5 ${t.headerBg}`}>
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className={`font-serif text-2xl md:text-3xl leading-tight ${t.heading}`}>
            {page.title}
          </h1>
          {slug === 'executive' && (
            <p className="text-[12px] text-blue-800/60 text-center leading-relaxed"
               style={{ whiteSpace: 'nowrap' }}>
              {tr('people.empowering')}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-2 md:py-3 space-y-3">

        {/* Featured co-founders */}
        {page.featured && page.featured.length > 0 && (
          <div>
            <p className={`text-[10px] font-bold uppercase tracking-[0.28em] mb-3 text-center ${t.accent}`}>
              {tr('people.coFounders')}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {page.featured.map((f) => (
                <Link
                  key={f.id}
                  to={`/people/${f.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white w-64
                             border border-slate-100 shadow-sm hover:shadow-md
                             hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 ring-2 ring-blue-100">
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-brand-deep leading-snug">{f.name}</p>
                    <p className={`text-[11px] font-medium mt-0.5 ${t.accent}`}>{f.role}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-3 h-px bg-slate-100" />
          </div>
        )}

        {/* Management Team label */}
        {page.featured && (
          <p className={`text-[10px] font-bold uppercase tracking-[0.28em] text-center ${t.accent}`}>
            {tr('people.managementTeam')}
          </p>
        )}

        {/* People grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mx-auto w-full">
          {page.people.map((person, idx) => (
            <div
              key={person.id}
              className="flex items-center gap-4 rounded-2xl bg-white
                         border border-slate-100 shadow-sm px-4 py-4
                         hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              {/* Serial */}
              <div className={`shrink-0 w-7 text-center text-[10px] font-bold tabular-nums ${t.accent} opacity-60`}>
                {String(idx + 1).padStart(2, '0')}
              </div>

              {/* Photo */}
              <div className="shrink-0 w-14 h-14 rounded-full overflow-hidden ring-2 ring-slate-100 shadow-sm">
                <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className={`w-5 h-0.5 rounded-full mb-1.5 ${t.line}`} />
                <p className="text-[13px] font-semibold text-brand-deep leading-tight truncate">{person.name}</p>
                <p className={`text-[10px] font-medium mt-0.5 mb-1.5 leading-snug ${t.accent}`}>{person.role}</p>
                {person.email && (
                  <a
                    href={`mailto:${person.email}`}
                    className="inline-flex items-center gap-1 text-[10px] text-slate-400 hover:text-brand-deep transition-colors truncate"
                  >
                    <Mail size={9} />
                    {person.email}
                  </a>
                )}
              </div>

              {/* Open drawer */}
              <button
                type="button"
                onClick={() => setDrawer(person)}
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${t.badge} hover:opacity-80 transition-opacity`}
              >
                <ArrowRight size={11} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Our People */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-6 md:px-16 py-10">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/#leadership"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-white border border-slate-200 hover:border-brand-accent/50
                       hover:-translate-y-0.5 transition-all duration-200 shadow-sm
                       text-xs font-semibold text-brand-deep"
          >
            <ArrowLeft size={13} /> {tr('common.ourPeople')}
          </Link>
        </div>
      </div>

      {/* ── Right-side drawer ─────────────────────────────────────────── */}
      {drawer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setDrawer(null)}
          />

          {/* Panel */}
          <div className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl
                          flex flex-col overflow-hidden animate-slide-in-right">

            {/* Panel header */}
            <div className={`px-6 pt-8 pb-6 border-b ${t.headerBg}`}>
              <button
                type="button"
                onClick={() => setDrawer(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white
                           flex items-center justify-center shadow-sm transition-colors"
              >
                <X size={14} className="text-brand-deep" />
              </button>

              <div className="flex items-center gap-4 mt-2">
                <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-white/60 shadow-md shrink-0">
                  <img src={drawer.image} alt={drawer.name} className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <div className={`w-6 h-0.5 rounded-full mb-2 ${t.line}`} />
                  <p className={`font-serif text-lg leading-snug ${t.heading}`}>{drawer.name}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-[0.18em] mt-1 ${t.accent}`}>{drawer.role}</p>
                </div>
              </div>
            </div>

            {/* Panel body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {drawer.fullBio.length > 0
                ? drawer.fullBio.map((para, i) => (
                    <p key={i} className="text-sm text-brand-deep/70 leading-relaxed">{para}</p>
                  ))
                : <p className="text-sm text-brand-deep/40 italic">{tr('common.bioComing')}</p>
              }

              {drawer.email && (
                <a
                  href={`mailto:${drawer.email}`}
                  className="inline-flex items-center gap-2 mt-4 text-xs text-slate-500 hover:text-brand-deep transition-colors"
                >
                  <Mail size={12} /> {drawer.email}
                </a>
              )}
            </div>

          </div>
        </>
      )}

    </div>
  )
}
