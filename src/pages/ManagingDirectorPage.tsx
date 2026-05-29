import { Link } from 'react-router-dom'
import { ArrowLeft, Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'

const PARAS = [
  'As Managing Director of Yanabiya Group, I am honoured to lead our day-to-day operations across the Sultanate of Oman and our international branches. Our mandate is simple: turn the Group\'s long-term vision into reliable, measurable outcomes for every client we serve.',
  'My priority is delivery — ensuring our trade, technology, manpower and e-commerce teams work as one integrated platform. Whether it is a freight movement out of Muscat, a software build in Dhaka, or a partnership in London, the standard is the same: professionalism, transparency and an unrelenting focus on quality.',
  'I take pride in the trust placed in us by partners, regulators and the communities we operate in. As we expand, we will keep deepening that trust — by investing in our people, modernising our systems, and standing behind every promise we make.',
]

const RESPONSIBILITIES = [
  'Leads the executive team — translates Board strategy into day-to-day execution across every division.',
  'Owns operational performance, client delivery and vendor partnerships across Oman and the international offices.',
  'Oversees governance, compliance and risk management — ensuring policies are followed at every level.',
  'Represents Yanabiya Group with regulators, government bodies and strategic partners in the Sultanate of Oman.',
  'Develops talent and culture across the Group — building a team that scales with the business.',
]

export default function ManagingDirectorPage() {
  const { t } = useTranslation()
  const name = 'Khalid Saif Ahmed Al Sulaimani'

  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">
      {/* Yanabiya logo watermark */}
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
          <ArrowLeft size={12} /> {t('common.ourPeople', 'Our Leadership')}
        </Link>
      </div>

      {/* Main */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">
        {/* Badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-amber-100 text-amber-800 border-amber-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            Managing Director
          </span>
        </div>

        {/* Two-column: photo left, message right */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Photo + name */}
          <div className="shrink-0 flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-amber-300/30 blur-2xl scale-110" />
              <img
                src={assets.people.khalidSulaimani}
                alt={name}
                className="relative w-52 md:w-64 aspect-[3/4] object-cover object-top
                           rounded-2xl shadow-2xl border-2 border-amber-200/60"
              />
              <div className="absolute -bottom-2 left-4 right-4 h-0.5 bg-amber-400 rounded-full" />
            </div>
            <div className="text-center md:text-left mt-2">
              <h1 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">{name}</h1>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600 mt-1">
                Managing Director
              </p>
              <p className="text-[11px] text-brand-deep/40 mt-0.5">Yanabiya Group</p>
            </div>
          </div>

          {/* Message */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-6">
              <Quote size={22} className="shrink-0 text-amber-300 mt-0.5" />
              <p className="font-serif text-base md:text-lg text-brand-deep leading-snug italic">
                "Delivery is the only proof of strategy."
              </p>
            </div>
            <div className="w-8 h-0.5 bg-amber-400 rounded-full mb-5" />
            <h2 className="font-serif text-sm md:text-base text-brand-deep mb-5 uppercase tracking-widest">
              Message from the Managing Director
            </h2>
            <div className="space-y-3.5 text-brand-deep/65 text-[13px] md:text-sm leading-relaxed">
              {PARAS.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Responsibilities */}
            <div className="mt-7 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-4">
              <p className="text-[9px] uppercase tracking-[0.24em] text-amber-600 font-bold mb-3">
                Role & Responsibilities
              </p>
              <ul className="space-y-2">
                {RESPONSIBILITIES.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-brand-deep/70 leading-snug">
                    <span className="mt-1 w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature */}
            <div className="mt-6 pt-5 border-t border-brand-deep/10">
              <p className="text-[11px] text-brand-deep/40 mb-2 italic">{t('common.sincerely', 'Sincerely,')}</p>
              <p className="font-serif text-sm font-semibold text-brand-deep">{name}</p>
              <p className="text-[11px] text-amber-600 font-medium mt-0.5">Managing Director — Yanabiya Group</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
