import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { ALL_PEOPLE } from '../data/people'

const TIER_THEME = {
  board: {
    badge:   'bg-amber-100 text-amber-800 border-amber-300',
    accent:  'text-amber-500',
    line:    'bg-amber-400',
    glow:    'from-amber-950/70',
  },
  exec: {
    badge:   'bg-blue-100 text-blue-800 border-blue-300',
    accent:  'text-blue-400',
    line:    'bg-blue-400',
    glow:    'from-blue-950/70',
  },
  country: {
    badge:   'bg-emerald-100 text-emerald-800 border-emerald-300',
    accent:  'text-emerald-400',
    line:    'bg-emerald-400',
    glow:    'from-emerald-950/70',
  },
}

export default function PersonPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const idx    = ALL_PEOPLE.findIndex((p) => p.id === id)
  const person = ALL_PEOPLE[idx]
  const prev   = ALL_PEOPLE[idx - 1]
  const next   = ALL_PEOPLE[idx + 1]

  if (!person) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-brand-deep">Person not found.</p>
        <Link to="/#leadership" className="text-sm text-brand-accentDark underline">← Our People</Link>
      </div>
    )
  }

  const t = TIER_THEME[person.tier]

  return (
    <div className="min-h-screen bg-white">

      {/* ── Full-bleed hero ── */}
      <div className="relative w-full h-[60vh] md:h-[72vh] overflow-hidden bg-slate-900">
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${t.glow} via-black/20 to-black/10`} />

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 md:top-8 md:left-10 z-10
                     inline-flex items-center gap-2 rounded-full px-4 py-2
                     bg-white/10 backdrop-blur border border-white/25 text-white
                     text-[11px] font-bold uppercase tracking-widest
                     hover:bg-white/20 transition-all duration-200"
        >
          <ArrowLeft size={12} /> Our People
        </button>

        {/* Name block — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10 md:pb-14">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1
                            border text-[10px] font-bold uppercase tracking-[0.26em] mb-4
                            ${t.badge}`}>
            {person.tierLabel}
            {person.flag && <span className="text-base ml-0.5">{person.flag}</span>}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05]">
            {person.name}
          </h1>
          <p className={`mt-2.5 text-sm md:text-base font-semibold uppercase tracking-[0.22em] ${t.accent}`}>
            {person.role}
          </p>
        </div>
      </div>

      {/* ── Bio ── */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-14 md:py-20">
        <div className={`w-10 h-[3px] rounded-full mb-8 ${t.line}`} />

        <p className="text-brand-deep font-medium text-base md:text-lg leading-relaxed mb-8">
          {person.shortBio}
        </p>

        <div className="space-y-5 text-brand-deep/60 text-sm md:text-base leading-relaxed">
          {person.fullBio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* ── Prev / Next ── */}
      <div className="border-t border-slate-100">
        <div className="max-w-4xl mx-auto flex items-stretch divide-x divide-slate-100">
          {prev ? (
            <Link
              to={`/people/${prev.id}`}
              className="group flex-1 flex items-center gap-4 px-6 md:px-10 py-6 hover:bg-slate-50 transition-colors duration-200"
            >
              <ArrowLeft size={16} className="shrink-0 text-slate-300 group-hover:text-brand-deep transition-colors" />
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Previous</p>
                <p className="text-sm font-semibold text-brand-deep truncate">{prev.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{prev.role}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}

          {next ? (
            <Link
              to={`/people/${next.id}`}
              className="group flex-1 flex items-center justify-end gap-4 px-6 md:px-10 py-6 hover:bg-slate-50 transition-colors duration-200"
            >
              <div className="min-w-0 text-right">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Next</p>
                <p className="text-sm font-semibold text-brand-deep truncate">{next.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{next.role}</p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-slate-300 group-hover:text-brand-deep transition-colors" />
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>

    </div>
  )
}
