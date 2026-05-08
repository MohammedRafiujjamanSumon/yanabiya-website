import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import { assets } from '../data/assets'
import { board, team } from '../data/leadership'

const BOARD_MEMBERS = [
  {
    name: board[0].name,
    role: 'Founder, Chairman & CEO',
    photo: board[0].photo,
    to: '/people/ceo',
    badge: 'Executive Board',
    color: {
      badge: 'bg-amber-100 text-amber-700 border-amber-300',
      glow:  'bg-amber-300/20',
      border:'border-amber-200/60',
      accent:'border-amber-400',
      role:  'text-amber-600',
      btn:   'bg-amber-500 hover:bg-amber-600',
    },
  },
  {
    name: board[1].name,
    role: 'Vice Chairman',
    photo: board[1].photo,
    to: '/people/vice-chairman',
    badge: 'Executive Board',
    color: {
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
      glow:  'bg-emerald-300/20',
      border:'border-emerald-200/60',
      accent:'border-emerald-400',
      role:  'text-emerald-600',
      btn:   'bg-emerald-600 hover:bg-emerald-700',
    },
  },
]

export default function BoardPage() {
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

        {/* Badge + heading */}
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-blue-100 text-blue-800 border-blue-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            Board of Directors
          </span>
          <h1 className="font-serif text-2xl md:text-3xl text-brand-deep mt-4 leading-snug">
            The People Who Govern<br />
            <span className="italic text-brand-accentDark">Yanabiya Group</span>
          </h1>
          <p className="text-[13px] text-brand-deep/55 mt-2 max-w-xl leading-relaxed">
            Our board provides governance, strategic oversight, and accountability across all four countries and every subsidiary within the Group.
          </p>
        </div>

        {/* ── Executive Board ── */}
        <div className="grid sm:grid-cols-2 gap-5 mb-14">
          {BOARD_MEMBERS.map((m) => (
            <Link
              key={m.name}
              to={m.to}
              className="group relative flex flex-col items-center text-center rounded-2xl bg-white
                         border border-brand-deep/8 shadow-lg hover:-translate-y-1 hover:shadow-xl
                         transition-all duration-300 overflow-hidden p-6"
            >
              {/* Glow */}
              <div className={`absolute inset-0 ${m.color.glow} blur-2xl scale-75 opacity-60`} />

              <div className="relative">
                {/* Badge */}
                <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 border
                                  text-[9px] font-bold uppercase tracking-widest mb-4 ${m.color.badge}`}>
                  {m.badge}
                </span>

                {/* Photo */}
                <div className="relative mx-auto mb-4">
                  <div className={`absolute inset-0 rounded-2xl ${m.color.glow} blur-xl scale-110`} />
                  <img
                    src={m.photo}
                    alt={m.name}
                    className={`relative w-32 aspect-[3/4] object-cover object-top rounded-2xl
                               shadow-xl border-2 ${m.color.border}`}
                  />
                  <div className={`absolute -bottom-1 left-4 right-4 h-0.5 ${m.color.accent} rounded-full`} />
                </div>

                {/* Name + role */}
                <h2 className="font-serif text-lg text-brand-deep font-semibold mt-3 leading-tight">{m.name}</h2>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] mt-1 ${m.color.role}`}>{m.role}</p>
                <p className="text-[10px] text-brand-deep/35 mt-0.5">Yanabiya Group</p>

                {/* CTA */}
                <span className={`inline-flex items-center gap-1.5 mt-4 px-4 py-1.5 rounded-full
                                  text-white text-[10px] font-bold uppercase tracking-wider
                                  ${m.color.btn} group-hover:gap-2.5 transition-all duration-200`}>
                  View Profile <ArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-brand-deep/10" />
          <span className="text-[10px] uppercase tracking-[0.28em] text-brand-deep/40 font-semibold whitespace-nowrap">
            Senior Management Team
          </span>
          <div className="flex-1 h-px bg-brand-deep/10" />
        </div>

        {/* ── Team members ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center text-center gap-2 rounded-2xl bg-white
                         border border-brand-deep/8 shadow-sm px-3 py-4
                         hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-200 ring-offset-2 shrink-0">
                {member.photo
                  ? <img src={member.photo} alt={member.name}
                         className="w-full h-full object-cover object-top" />
                  : <div className="w-full h-full bg-blue-50 grid place-items-center">
                      <Users size={20} className="text-blue-300" />
                    </div>
                }
              </div>
              <div>
                <p className="text-[11px] font-semibold text-brand-deep leading-snug">{member.name}</p>
                <p className="text-[10px] text-blue-600 font-medium mt-0.5 leading-snug">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Back nav */}
        <div className="mt-14 pt-6 border-t border-brand-deep/10 flex justify-between items-center flex-wrap gap-4">
          <Link
            to="/people/vice-chairman"
            className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <ArrowLeft size={14} className="text-brand-accentDark group-hover:-translate-x-1 transition-transform" />
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-deep/40 mb-0.5">Previous</p>
              <p className="text-sm font-semibold text-brand-deep">Mohammad Abu Jaheed</p>
              <p className="text-[11px] text-brand-deep/50">Vice Chairman</p>
            </div>
          </Link>

          <Link
            to="/#leadership"
            className="group inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-deep/40 mb-0.5">Back to</p>
              <p className="text-sm font-semibold text-brand-deep">Our People</p>
            </div>
            <ArrowRight size={14} className="text-brand-accentDark group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}
