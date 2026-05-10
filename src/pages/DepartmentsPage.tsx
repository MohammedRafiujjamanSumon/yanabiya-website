import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import { assets } from '../data/assets'
import { ALL_PEOPLE } from '../data/people'

const COUNTRIES = [
  {
    slug:    'oman',
    name:    'Oman',
    flag:    '🇴🇲',
    cover:   'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    caption: 'Headquarters & Regional Hub',
    color: {
      badge:   'bg-amber-100 text-amber-700 border-amber-300',
      line:    'bg-amber-400',
      btn:     'bg-amber-500 hover:bg-amber-600',
      glow:    'bg-amber-200/30',
      accent:  'text-amber-600',
    },
  },
  {
    slug:    'bangladesh',
    name:    'Bangladesh',
    flag:    '🇧🇩',
    cover:   'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
    caption: 'Technology Delivery & Talent Hub',
    color: {
      badge:   'bg-emerald-100 text-emerald-700 border-emerald-300',
      line:    'bg-emerald-400',
      btn:     'bg-emerald-600 hover:bg-emerald-700',
      glow:    'bg-emerald-200/30',
      accent:  'text-emerald-600',
    },
  },
  {
    slug:    'uk',
    name:    'United Kingdom',
    flag:    '🇬🇧',
    cover:   'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    caption: 'European Hub & Talent Gateway',
    color: {
      badge:   'bg-blue-100 text-blue-700 border-blue-300',
      line:    'bg-blue-400',
      btn:     'bg-blue-500 hover:bg-blue-600',
      glow:    'bg-blue-200/30',
      accent:  'text-blue-600',
    },
  },
  {
    slug:    'usa',
    name:    'United States',
    flag:    '🇺🇸',
    cover:   'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80',
    caption: 'North American Operations',
    color: {
      badge:   'bg-violet-100 text-violet-700 border-violet-300',
      line:    'bg-violet-400',
      btn:     'bg-violet-500 hover:bg-violet-600',
      glow:    'bg-violet-200/30',
      accent:  'text-violet-600',
    },
  },
]

export default function DepartmentsPage() {
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
          <ArrowLeft size={12} /> Our People
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">

        {/* Header */}
        <div className="mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-emerald-100 text-emerald-800 border-emerald-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            Tier 03 — Regional Operations
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-brand-deep mt-4 leading-snug">
            Regional Operations Team<br />
            <span className="italic text-brand-accentDark">Across Four Countries</span>
          </h1>
          <p className="text-[13px] text-brand-deep/55 mt-2 max-w-xl leading-relaxed">
            Yanabiya Group's regional teams drive operations, client relationships, and local expertise
            across Oman, Bangladesh, the United Kingdom, and the United States.
          </p>
        </div>

        {/* Country cards */}
        <div className="grid sm:grid-cols-2 gap-5">
          {COUNTRIES.map((c) => {
            const count = ALL_PEOPLE.filter(
              (p) => p.tier === 'dept' && p.country?.toLowerCase() === c.name.toLowerCase().split(' ')[0],
            ).length
            return (
              <Link
                key={c.slug}
                to={`/people/departments/${c.slug}`}
                className="group relative flex flex-col rounded-2xl bg-white border border-brand-deep/8
                           shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300
                           overflow-hidden"
              >
                {/* Cover image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={c.cover}
                    alt={c.name}
                    className="w-full h-full object-cover object-center
                               transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 to-transparent" />
                  {/* Flag + country name overlay */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-white font-serif text-lg font-semibold drop-shadow">{c.name}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 border
                                      text-[9px] font-bold uppercase tracking-widest ${c.color.badge}`}>
                      {c.caption}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-brand-deep/50 text-[11px]">
                    <Users size={12} />
                    <span>{count} team member{count !== 1 ? 's' : ''}</span>
                  </div>

                  <div className={`w-8 h-0.5 rounded-full ${c.color.line}`} />

                  <div className="mt-auto">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full
                                      text-white text-[10px] font-bold uppercase tracking-wider
                                      ${c.color.btn} group-hover:gap-2.5 transition-all duration-200`}>
                      View Team <ArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}
