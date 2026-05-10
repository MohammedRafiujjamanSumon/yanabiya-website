import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'
import { ALL_PEOPLE, type PersonData } from '../data/people'

type CountryConfig = {
  name: string
  flag: string
  cover: string
  caption: string
  color: {
    badge:   string
    line:    string
    accent:  string
    overlay: string
    btn:     string
    headerBg: string
    heading: string
  }
}

const COUNTRY_MAP: Record<string, CountryConfig> = {
  oman: {
    name:    'Oman',
    flag:    '🇴🇲',
    cover:   'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80',
    caption: 'Headquarters & Regional Hub',
    color: {
      badge:     'bg-amber-100 text-amber-800 border-amber-300',
      line:      'bg-amber-400',
      accent:    'text-amber-600',
      overlay:   'from-amber-950/70',
      btn:       'bg-amber-500 hover:bg-amber-600',
      headerBg:  'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-amber-200',
      heading:   'text-amber-900',
    },
  },
  bangladesh: {
    name:    'Bangladesh',
    flag:    '🇧🇩',
    cover:   'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1600&q=80',
    caption: 'Technology Delivery & Talent Hub',
    color: {
      badge:     'bg-emerald-100 text-emerald-800 border-emerald-300',
      line:      'bg-emerald-400',
      accent:    'text-emerald-600',
      overlay:   'from-emerald-950/70',
      btn:       'bg-emerald-600 hover:bg-emerald-700',
      headerBg:  'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-emerald-200',
      heading:   'text-emerald-900',
    },
  },
  uk: {
    name:    'United Kingdom',
    flag:    '🇬🇧',
    cover:   'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80',
    caption: 'European Hub & Talent Gateway',
    color: {
      badge:     'bg-blue-100 text-blue-800 border-blue-300',
      line:      'bg-blue-400',
      accent:    'text-blue-600',
      overlay:   'from-blue-950/70',
      btn:       'bg-blue-500 hover:bg-blue-600',
      headerBg:  'bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 border-blue-200',
      heading:   'text-blue-900',
    },
  },
  usa: {
    name:    'United States',
    flag:    '🇺🇸',
    cover:   'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1600&q=80',
    caption: 'North American Operations',
    color: {
      badge:     'bg-violet-100 text-violet-800 border-violet-300',
      line:      'bg-violet-400',
      accent:    'text-violet-600',
      overlay:   'from-violet-950/70',
      btn:       'bg-violet-500 hover:bg-violet-600',
      headerBg:  'bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 border-violet-200',
      heading:   'text-violet-900',
    },
  },
}

function PersonCard({ person, color }: { person: PersonData; color: CountryConfig['color'] }) {
  const { t } = useTranslation()
  return (
    <Link
      to={`/people/${person.id}`}
      className="group flex flex-col sm:flex-row gap-5 p-6 rounded-2xl
                 bg-white border border-slate-100 shadow-sm hover:shadow-md
                 transition-shadow duration-300"
    >
      {/* Photo */}
      <div className="shrink-0 w-full sm:w-36 h-44 sm:h-36 rounded-xl overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top
                     transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className={`w-8 h-0.5 rounded-full mb-3 ${color.line}`} />
        <h3 className="font-serif text-lg text-brand-deep leading-tight">{person.name}</h3>
        <p className={`text-xs font-bold uppercase tracking-[0.18em] mt-1 mb-3 ${color.accent}`}>
          {person.role}
          {person.flag && <span className="ml-1.5 text-sm">{person.flag}</span>}
        </p>
        <p className="text-sm text-brand-deep/60 leading-relaxed mb-3">{person.shortBio}</p>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                          text-white text-[10px] font-bold uppercase tracking-wider
                          ${color.btn} group-hover:gap-2.5 transition-all duration-200`}>
          {t('deptCountry.viewProfile')} <ArrowRight size={9} />
        </span>
      </div>
    </Link>
  )
}

export default function DepartmentCountryPage() {
  const { t } = useTranslation()
  const { country } = useParams<{ country: string }>()
  const navigate = useNavigate()
  const config = COUNTRY_MAP[country ?? '']

  if (!config) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-deep">{t('deptCountry.notFound')}</p>
        <Link to="/people/departments" className="text-brand-accentDark underline text-sm">
          ← {t('deptCountry.backToBusiness')}
        </Link>
      </div>
    )
  }

  const people = ALL_PEOPLE.filter(
    (p) => p.tier === 'dept' && p.country?.toLowerCase() === config.name.toLowerCase().split(' ')[0],
  )

  const otherCountries = Object.entries(COUNTRY_MAP).filter(([k]) => k !== country)

  return (
    <div className="min-h-screen bg-white">

      {/* Sticky back bar */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 px-6 md:px-16 py-3">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest
                     text-slate-400 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={13} /> {t('deptCountry.backToBusiness')}
        </button>
      </div>

      {/* Hero banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img src={config.cover} alt={config.name} className="w-full h-full object-cover object-center" />
        <div className={`absolute inset-0 bg-gradient-to-t ${config.color.overlay} via-black/20 to-transparent`} />
        <div className="absolute bottom-6 left-6 md:left-16 flex items-center gap-3">
          <span className="text-4xl">{config.flag}</span>
          <div>
            <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-1">
              {t('departments.title')}
            </p>
            <h1 className="text-white font-serif text-2xl md:text-4xl leading-tight drop-shadow">
              {config.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Page header strip */}
      <div className={`border-b px-6 md:px-16 py-6 ${config.color.headerBg}`}>
        <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 border mb-2
                         text-[10px] font-bold uppercase tracking-widest ${config.color.badge}`}>
          {config.caption}
        </div>
        <p className="text-sm text-slate-600 max-w-xl leading-relaxed mt-1">
          {people.length} team member{people.length !== 1 ? 's' : ''} in Yanabiya's {config.name} operations.
        </p>
      </div>

      {/* People grid */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-10 md:py-14">
        {people.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {people.map((p) => (
              <PersonCard key={p.id} person={p} color={config.color} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <Users size={40} className="text-slate-200" />
            <p className="text-slate-400 text-sm">{t('common.teamMembersListed')}</p>
          </div>
        )}
      </div>

      {/* Other country departments */}
      {otherCountries.length > 0 && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-6 md:px-16 py-10">
          <div className="max-w-5xl mx-auto">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-slate-400 mb-5">
              {t('deptCountry.otherTeams')}
            </p>
            <div className="flex flex-wrap gap-3">
              {otherCountries.map(([key, cfg]) => (
                <Link
                  key={key}
                  to={`/people/departments/${key}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full
                             bg-white border border-slate-200 hover:border-brand-accent/50
                             hover:-translate-y-0.5 transition-all duration-200 shadow-sm text-sm"
                >
                  <span>{cfg.flag}</span>
                  <span className="font-semibold text-brand-deep text-xs">{cfg.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
