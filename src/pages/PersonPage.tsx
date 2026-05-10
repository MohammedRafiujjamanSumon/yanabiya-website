import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ALL_PEOPLE } from '../data/people'

const TIER_THEME = {
  board: {
    badge:  'bg-amber-100 text-amber-800 border-amber-300',
    accent: 'text-amber-500',
    line:   'bg-amber-400',
    glow:   'from-amber-950/80',
  },
  exec: {
    badge:  'bg-blue-100 text-blue-800 border-blue-300',
    accent: 'text-blue-400',
    line:   'bg-blue-400',
    glow:   'from-blue-950/80',
  },
  country: {
    badge:  'bg-emerald-100 text-emerald-800 border-emerald-300',
    accent: 'text-emerald-400',
    line:   'bg-emerald-400',
    glow:   'from-emerald-950/80',
  },
  dept: {
    badge:  'bg-teal-100 text-teal-800 border-teal-300',
    accent: 'text-teal-400',
    line:   'bg-teal-400',
    glow:   'from-teal-950/80',
  },
}

export default function PersonPage() {
  const { t: tr } = useTranslation()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const idx    = ALL_PEOPLE.findIndex((p) => p.id === id)
  const person = ALL_PEOPLE[idx]
  const prev   = ALL_PEOPLE[idx - 1]
  const next   = ALL_PEOPLE[idx + 1]

  if (!person) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-deep">{tr('common.notFound')}</p>
        <Link to="/#leadership" className="text-sm text-brand-accentDark underline">← {tr('common.ourPeople')}</Link>
      </div>
    )
  }

  const t = TIER_THEME[person.tier]

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col md:flex-row">

      {/* ── Left: Photo panel ── */}
      <div className="relative md:w-[44%] h-56 md:h-full shrink-0 bg-slate-900">
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${t.glow} via-black/30 to-transparent`} />

        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-5 left-5 md:top-8 md:left-8 z-10
                     inline-flex items-center gap-2 rounded-full px-4 py-2
                     bg-white/10 backdrop-blur border border-white/25 text-white
                     text-[11px] font-bold uppercase tracking-widest
                     hover:bg-white/20 transition-all duration-200"
        >
          <ArrowLeft size={12} /> {tr('common.ourPeople')}
        </button>

      </div>

      {/* ── Right: Content panel ── */}
      <div className="flex-1 flex flex-col md:h-full md:overflow-y-auto">

        {/* Scrollable content — centered vertically */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-10 md:py-16">

          {/* Badge */}
          <span className={`inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1
                            border text-[10px] font-bold uppercase tracking-[0.26em] mb-5
                            ${t.badge}`}>
            {person.tierLabel}
            {person.flag && <span className="text-base ml-0.5">{person.flag}</span>}
          </span>

          {/* Name + role */}
          <div className="mb-6">
            <h1 className="font-serif text-4xl md:text-5xl text-brand-deep leading-[1.05]">
              {person.name}
            </h1>
            <p className={`mt-2 text-sm font-semibold uppercase tracking-[0.22em] ${t.accent}`}>
              {person.role}
            </p>
          </div>

          {/* Accent line */}
          <div className={`w-10 h-[3px] rounded-full mb-7 ${t.line}`} />

          {/* Short bio */}
          <p className="text-brand-deep font-medium text-base leading-relaxed mb-6 w-full"
             style={{ textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto', wordBreak: 'break-word' }}>
            {person.shortBio}
          </p>

          {/* Full bio */}
          {person.fullBio.length > 0 && (
            <div className="space-y-4 text-brand-deep/60 text-sm leading-relaxed w-full">
              {person.fullBio.map((para, i) => (
                <p key={i} style={{ textAlign: 'justify', textJustify: 'inter-word', hyphens: 'auto', wordBreak: 'break-word' }}>{para}</p>
              ))}
            </div>
          )}
        </div>

        {/* ── Prev / Next ── */}
        <div className="border-t border-slate-100 shrink-0">
          <div className="flex items-stretch divide-x divide-slate-100">
            {prev ? (
              <Link
                to={`/people/${prev.id}`}
                className="group flex-1 flex items-center gap-3 px-6 md:px-8 py-4
                           hover:bg-slate-50 transition-colors duration-200"
              >
                <ArrowLeft size={14} className="shrink-0 text-slate-300 group-hover:text-brand-deep transition-colors" />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{tr('common.previous')}</p>
                  <p className="text-xs font-semibold text-brand-deep truncate">{prev.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{prev.role}</p>
                </div>
              </Link>
            ) : <div className="flex-1" />}

            {next ? (
              <Link
                to={`/people/${next.id}`}
                className="group flex-1 flex items-center justify-end gap-3 px-6 md:px-8 py-4
                           hover:bg-slate-50 transition-colors duration-200"
              >
                <div className="min-w-0 text-right">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">{tr('common.next')}</p>
                  <p className="text-xs font-semibold text-brand-deep truncate">{next.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{next.role}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-slate-300 group-hover:text-brand-deep transition-colors" />
              </Link>
            ) : <div className="flex-1" />}
          </div>
        </div>

      </div>
    </div>
  )
}
