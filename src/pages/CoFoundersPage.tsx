import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'
import { board } from '../data/leadership'

/* Every founder / co-founder of Yanabiya Group, shown together. The list
 * mirrors the Board page entries that carry a 'Co-Founder' role. Members
 * without a photo render the Yanabiya logo placeholder. */
const COFOUNDERS = [
  { id: 'shamim-ahmed',      name: 'S M Shamim Ahmed',     role: 'Founder, Chairman & CEO', image: board[0]?.photo },
  { id: 'abu-jaheed',        name: 'Mohammad Abu Jaheed',  role: 'Vice Chairman',           image: board[1]?.photo },
  { id: 'momim-ahmed',       name: 'S M Momim Ahmed',      role: 'Co-Founder, Oman',        image: assets.people.momiimAhmed },
  { id: 'sumon-ahmed',       name: 'S M Sumon Ahmed',      role: 'Co-Founder, Bangladesh',  image: assets.people.sumonAhmed },
  { id: 'rafiujjaman-sumon', name: 'Md Rafiujjaman Sumon', role: 'Co-Founder, UK',          image: null },
  { id: 'jhohora-akter',     name: 'Jhohora Akter',        role: 'Co-Founder, USA',         image: assets.people.jhohoraAkter },
]

export default function CoFoundersPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 flex items-center justify-center z-0">
        <img src={assets.logo} alt="" className="w-[520px] md:w-[720px] opacity-[0.04] select-none" />
      </div>

      <div className="relative z-10 px-6 md:px-14 pt-6">
        <Link
          to="/#leadership"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest
                     text-brand-deep/50 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={12} /> {t('common.ourPeople', 'Our Leadership')}
        </Link>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-amber-100 text-amber-800 border-amber-300
                           text-[10px] font-bold uppercase tracking-[0.26em] mb-4">
            Founders
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-deep leading-snug mb-4">
            The people who started Yanabiya Group.
          </h1>
          <p className="text-sm text-brand-deep/55 max-w-2xl mx-auto leading-relaxed">
            One founder, several co-founders — together they built a multi-country group spanning trade, technology, manpower and community.
          </p>
          <div className="mt-6 w-16 h-0.5 bg-amber-400 rounded-full mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-6 md:gap-8">
          {COFOUNDERS.map((m) => (
            <Link
              key={m.id}
              to={`/people/${m.id}`}
              className="group flex flex-col items-center text-center gap-2 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-full aspect-square max-w-[140px] rounded-2xl overflow-hidden
                              ring-2 ring-amber-200 ring-offset-2 shadow-md
                              group-hover:ring-amber-400 transition-all">
                {m.image ? (
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full grid place-items-center bg-white">
                    <img src={assets.logo} alt="Yanabiya" className="w-3/5 h-3/5 object-contain" />
                  </div>
                )}
              </div>
              <p className="mt-2 text-[13px] font-semibold text-brand-deep leading-snug">{m.name}</p>
              <p className="text-[10px] text-amber-600 font-medium uppercase tracking-wide leading-snug">{m.role}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
