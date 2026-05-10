import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'
import { ALL_PEOPLE } from '../data/people'

const skilledTeam = ALL_PEOPLE.filter((p) => p.tier === 'dept')

function PersonCard({ person }: { person: (typeof ALL_PEOPLE)[0] }) {
  return (
    <Link
      to={`/people/${person.id}`}
      className="group flex flex-col items-center text-center
                 bg-white rounded-2xl border border-brand-deep/8
                 shadow-md hover:-translate-y-1 hover:shadow-xl
                 transition-all duration-300 overflow-hidden"
    >
      <div className="relative w-full h-52 overflow-hidden">
        <img
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover object-top
                     group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/50 to-transparent" />
      </div>
      <div className="px-4 py-4 flex flex-col gap-1">
        <p className="font-serif text-[15px] font-semibold text-brand-deep leading-snug">
          {person.name}
        </p>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accentDark">
          {person.role}
        </p>
        {person.flag && (
          <span className="text-base mt-1">{person.flag}</span>
        )}
      </div>
    </Link>
  )
}

export default function DepartmentsPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">

      {/* Watermark */}
      <div aria-hidden className="pointer-events-none fixed inset-0 flex items-center justify-center z-0">
        <img src={assets.logo} alt="" className="w-[520px] md:w-[720px] opacity-[0.04] select-none" />
      </div>

      {/* Back */}
      <div className="relative z-10 px-6 md:px-14 pt-6">
        <Link
          to="/#leadership"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest
                     text-brand-deep/50 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={12} /> {t('common.ourPeople')}
        </Link>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-12">

        {/* Page header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-emerald-100 text-emerald-800 border-emerald-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            {t('departments.tier')}
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-brand-deep mt-4 leading-snug">
            {t('departments.title')}
          </h1>
          <p className="text-[13px] text-brand-deep/55 mt-2 max-w-xl leading-relaxed">
            {t('departments.desc')}
          </p>
        </div>

        {/* Team grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {skilledTeam.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>

      </div>
    </div>
  )
}
