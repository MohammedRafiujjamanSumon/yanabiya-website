import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const LINKS = [
  { label: 'Overview',         to: '/leadership'              },
  { label: 'CEO & Chairman',   to: '/leadership/management'   },
  { label: 'Board',            to: '/leadership/board'        },
  { label: 'Dept. Heads',      to: '/leadership/departments'  },
  { label: 'Professionals',    to: '/leadership/professionals'},
]

export default function OurPeopleNav() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    window.setTimeout(() => {
      const el = document.getElementById('leadership')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  return (
    <nav className="sticky top-[60px] z-30 bg-white/92 backdrop-blur-md
                    border-b border-brand-accent/20 shadow-sm">
      <div className="container-x">
        <div className="flex items-center gap-2 py-2 overflow-x-auto">

          {/* Back to Our People */}
          <a
            href="/#leadership"
            onClick={handleBack}
            className="group shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       text-[10px] font-bold uppercase tracking-[0.22em]
                       text-brand-deep/60 hover:text-brand-deep hover:bg-brand-accent/12
                       transition-all duration-200 mr-1"
          >
            <ArrowLeft size={11} className="group-hover:-translate-x-0.5 transition-transform" />
            Our People
          </a>

          <div className="w-px h-4 bg-brand-accent/25 shrink-0" />

          {/* Section label */}
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.28em]
                           text-brand-accentDark shrink-0">
            <Users size={11} />
            Pages
          </span>

          {/* Page links */}
          {LINKS.map((l) => {
            const isActive = pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[11px] font-semibold
                           uppercase tracking-wider transition-all duration-200
                           ${isActive
                             ? 'bg-brand-deep text-white shadow-sm'
                             : 'text-brand-deep hover:bg-brand-accent/15'
                           }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
