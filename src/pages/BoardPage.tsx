import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { board } from '../data/leadership'
import { assets } from '../data/assets'
import { useSection } from '../hooks/useSection'

const BOARD_IDS_ORDERED = [
  { id: 'shamim-ahmed',         name: 'S M Shamim Ahmed',         role: 'Founder, Chairman & CEO',    image: board[0].photo },
  { id: 'abu-jaheed',           name: 'Mohammad Abu Jaheed',      role: 'Co-Founder & Vice Chairman', image: board[1].photo },
  { id: 'momim-ahmed',          name: 'S M Momim Ahmed',          role: 'Co-Founder, Oman',           image: assets.people.momiimAhmed },
  { id: 'sumon-ahmed',          name: 'S M Sumon Ahmed',          role: 'Co-Founder, Bangladesh',     image: assets.people.sumonAhmed },
  { id: 'rafiujjaman-sumon',    name: 'Md Rafiujjaman Sumon',     role: 'Co-Founder, UK',             image: null },
  { id: 'jhohora-akter',        name: 'Jhohora Akter',            role: 'Co-Founder, USA',            image: assets.people.jhohoraAkter },
  { id: 'shawrin-ahmed-shammi', name: 'Shawrin Ahmed Shammi',     role: 'Board of Director',          image: null },
  { id: 'abdullah-ibn-ahmed',   name: 'S M Abdullah Ibn Ahmed',   role: 'Board of Director',          image: null },
  { id: 'obaidullah-ibn-ahmed', name: 'S M Obaidullah Ibn Ahmed', role: 'Board of Director',          image: null },
  { id: 'nargis-akter',         name: 'Nargis Akter',             role: 'Board of Director',          image: null },
]

const PH = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0e2d4e&color=9ec73a&size=400&bold=true`

export default function BoardPage() {
  const { t } = useTranslation()
  const apiLeadership = useSection<{
    chairman?: { name: string; role: string; photo: string; bio: string }
    viceChairman?: { name: string; role: string; photo: string; bio: string }
    board?: { name: string; role: string; photo: string; bio: string }[]
    management?: { name: string; role: string; photo: string; bio: string }[]
  }>('leadership')

  const displayMembers = apiLeadership?.board?.length
    ? [
        ...(apiLeadership.chairman
          ? [{ id: 'chairman', name: apiLeadership.chairman.name, role: apiLeadership.chairman.role, image: apiLeadership.chairman.photo || null }]
          : []),
        ...(apiLeadership.viceChairman
          ? [{ id: 'vice-chairman', name: apiLeadership.viceChairman.name, role: apiLeadership.viceChairman.role, image: apiLeadership.viceChairman.photo || null }]
          : []),
        ...apiLeadership.board.map((m, i) => ({ id: `board-${i}`, name: m.name, role: m.role, image: m.photo || null })),
      ]
    : BOARD_IDS_ORDERED

  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">

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

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-10 md:py-14">

        {/* Header — corporate, centered */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-amber-100 text-amber-800 border-amber-300
                           text-[10px] font-bold uppercase tracking-[0.26em] mb-4">
            {t('board.title')}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-brand-deep leading-snug mb-4">
            {t('board.subtitle')}
          </h1>
          <p className="text-sm text-brand-deep/55 max-w-2xl mx-auto leading-relaxed">
            {t('board.desc')}
          </p>
          <div className="mt-6 w-16 h-0.5 bg-amber-400 rounded-full mx-auto" />
        </div>

        {/* Board Members grid — photo + name + role */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
          {displayMembers.map((m) => (
            <div key={m.id} className="flex flex-col items-center text-center gap-2">
              <div className="w-full aspect-square max-w-[110px] rounded-2xl overflow-hidden
                              ring-2 ring-amber-200 ring-offset-2 shadow-md">
                <img
                  src={m.image ?? PH(m.name)}
                  alt={m.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <p className="text-[12px] font-semibold text-brand-deep leading-snug">{m.name}</p>
              <p className="text-[10px] text-amber-600 font-medium uppercase tracking-wide leading-snug">{m.role}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
