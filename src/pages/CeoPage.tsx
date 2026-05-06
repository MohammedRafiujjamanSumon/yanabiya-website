import { Link } from 'react-router-dom'
import { ArrowLeft, Quote } from 'lucide-react'
import { assets } from '../data/assets'
import { chairmanMessage } from '../data/leadership'

export default function CeoPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ── Full-bleed hero photo ── */}
      <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-slate-900">
        <img
          src={assets.chairman}
          alt="S M Shamim Ahmed"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-slate-900/10" />

        {/* Back */}
        <Link
          to="/#leadership"
          className="absolute top-6 left-6 md:top-8 md:left-10 z-10
                     inline-flex items-center gap-2 rounded-full px-4 py-2
                     bg-white/10 backdrop-blur border border-white/25 text-white
                     text-[11px] font-bold uppercase tracking-widest
                     hover:bg-white/20 transition-all duration-200"
        >
          <ArrowLeft size={12} /> Our People
        </Link>

        {/* Name block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-14 pb-10 md:pb-16">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 border mb-4
                           bg-amber-100 text-amber-800 border-amber-300
                           text-[10px] font-bold uppercase tracking-[0.26em]">
            Founder, Chairman, CEO
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.05]">
            S M Shamim Ahmed
          </h1>
          <p className="mt-2.5 text-sm md:text-base font-semibold uppercase tracking-[0.22em] text-amber-400">
            Founder, Chairman &amp; CEO — Yanabiya Group
          </p>
        </div>
      </div>

      {/* ── Message section ── */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 py-14 md:py-20">

        <div className="w-10 h-[3px] rounded-full bg-amber-400 mb-8" />

        <div className="flex items-start gap-3 mb-8">
          <Quote size={28} className="shrink-0 text-amber-300 mt-1" />
          <p className="font-serif text-xl md:text-2xl text-brand-deep leading-snug italic">
            "The Stamp of Quality &amp; Professionalism."
          </p>
        </div>

        <h2 className="font-serif text-lg md:text-xl text-brand-deep mb-6">
          Message from the Chairman &amp; CEO
        </h2>

        <div className="space-y-5 text-brand-deep/65 text-sm md:text-base leading-relaxed">
          {chairmanMessage.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

      </div>

      {/* ── Vice Chairman nav ── */}
      <div className="border-t border-slate-100">
        <Link
          to="/people/vice-chairman"
          className="group flex items-center justify-end gap-4 max-w-4xl mx-auto
                     px-6 md:px-10 py-6 hover:bg-slate-50 transition-colors duration-200"
        >
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Next</p>
            <p className="text-sm font-semibold text-brand-deep">Mohammad Abu Jaheed</p>
            <p className="text-[11px] text-slate-400">Vice Chairman</p>
          </div>
          <img
            src={assets.viceChairman}
            alt="Mohammad Abu Jaheed"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100
                       group-hover:ring-brand-accent/40 transition-all duration-300"
          />
        </Link>
      </div>

    </div>
  )
}
