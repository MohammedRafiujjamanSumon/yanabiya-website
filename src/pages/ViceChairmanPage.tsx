import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'
import { viceChairmanMessage } from '../data/leadership'
import { useSection } from '../hooks/useSection'

type LeadershipData = {
  viceChairman?: { name?: string; role?: string; image?: string; bio?: string }
}

export default function ViceChairmanPage() {
  const { t } = useTranslation()
  const leadership = useSection<LeadershipData>('leadership')
  const vc = leadership?.viceChairman
  const vcName  = vc?.name  ?? 'Mohammad Abu Jaheed'
  const vcPhoto = vc?.image ?? assets.viceChairman
  const vcParas = vc?.bio ? [vc.bio] : viceChairmanMessage
  return (
    <div className="min-h-screen bg-brand-50 relative overflow-hidden">

      {/* Yanabiya logo watermark background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 flex items-center justify-center z-0"
      >
        <img
          src={assets.logo}
          alt=""
          className="w-[520px] md:w-[720px] opacity-[0.04] select-none"
        />
      </div>

      {/* Back button */}
      <div className="relative z-10 px-6 md:px-14 pt-6">
        <Link
          to="/#leadership"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest
                     text-brand-deep/50 hover:text-brand-deep transition-colors duration-200"
        >
          <ArrowLeft size={12} /> {t('common.ourPeople')}
        </Link>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 py-8 md:py-12">

        {/* Emerald badge */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border
                           bg-emerald-100 text-emerald-800 border-emerald-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            {t('vcPage.badge')}
          </span>
        </div>

        {/* Two-column: photo left, message right */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

          {/* Left — photo + name */}
          <div className="shrink-0 flex flex-col items-center md:items-start gap-4 w-full md:w-auto">
            <div className="relative">
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl bg-emerald-300/30 blur-2xl scale-110" />
              <img
                src={vcPhoto}
                alt={vcName}
                className="relative w-52 md:w-64 aspect-[3/4] object-cover object-top
                           rounded-2xl shadow-2xl border-2 border-emerald-200/60"
              />
              {/* Emerald accent line */}
              <div className="absolute -bottom-2 left-4 right-4 h-0.5 bg-emerald-400 rounded-full" />
            </div>
            <div className="text-center md:text-left mt-2">
              <h1 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                {vcName}
              </h1>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 mt-1">
                {t('vcPage.badge')}
              </p>
              <p className="text-[11px] text-brand-deep/40 mt-0.5">Yanabiya Group</p>
            </div>
          </div>

          {/* Right — message */}
          <div className="flex-1 min-w-0">

            <div className="flex items-start gap-3 mb-6">
              <Quote size={22} className="shrink-0 text-emerald-300 mt-0.5" />
              <p className="font-serif text-base md:text-lg text-brand-deep leading-snug italic">
                "Building a better tomorrow, together."
              </p>
            </div>

            <div className="w-8 h-0.5 bg-emerald-400 rounded-full mb-5" />

            <h2 className="font-serif text-sm md:text-base text-brand-deep mb-5 uppercase tracking-widest">
              {t('vcPage.msgTitle')}
            </h2>

            <div className="space-y-3.5 text-brand-deep/65 text-[13px] md:text-sm leading-relaxed">
              {vcParas.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Role & Responsibilities */}
            <div className="mt-7 rounded-2xl bg-emerald-50 border border-emerald-200 px-5 py-4">
              <p className="text-[9px] uppercase tracking-[0.24em] text-emerald-600 font-bold mb-3">
                {t('common.roleResponsibilities')}
              </p>
              <ul className="space-y-2">
                {[
                  'Board-level governance — supports the Chairman in overseeing company policy, compliance, and major decisions.',
                  'Represents the Group and the Chairman at official engagements, board meetings, and external forums when required.',
                  'Strategic oversight of specific business verticals and inter-company coordination across subsidiaries.',
                  'Assists in ensuring Group-wide alignment between the Board\'s direction and each country\'s executive management.',
                  'Acts as a key liaison between the Board of Directors and senior leadership across all four operating countries.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[11px] text-brand-deep/70 leading-snug">
                    <span className="mt-1 w-1 h-1 rounded-full bg-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Signature */}
            <div className="mt-6 pt-5 border-t border-brand-deep/10">
              <p className="text-[11px] text-brand-deep/40 mb-2 italic">{t('common.sincerely')}</p>
              <p className="font-serif text-sm font-semibold text-brand-deep">Mohammad Abu Jaheed</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">{t('vcPage.badge')} — {t('ceoPage.groupLabel')}</p>
            </div>

          </div>
        </div>

        {/* Back nav */}
        <div className="mt-14 pt-6 border-t border-brand-deep/10 flex justify-end">
          <Link
            to="/#leadership"
            className="group inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="text-right">
              <p className="text-[9px] font-bold uppercase tracking-widest text-brand-deep/40 mb-0.5">{t('common.backTo')}</p>
              <p className="text-sm font-semibold text-brand-deep">{t('common.ourPeople')}</p>
            </div>
            <ArrowRight size={14} className="text-brand-accentDark group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  )
}
