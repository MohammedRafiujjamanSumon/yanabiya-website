import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import AdminLayout from './AdminLayout'

export interface HubSection {
  label: string
  icon: LucideIcon
  desc: string
  to?: string           // if missing → "Coming Soon"
  frontendNote?: string // e.g. "Appears at top of About Us page"
}

interface ManagementHubProps {
  title: string         // e.g. "About Us Management"
  subtitle: string      // e.g. "Edit all About Us page content"
  accent: string        // e.g. "text-emerald-400"
  bgAccent: string      // e.g. "bg-emerald-400/10"
  borderAccent: string  // e.g. "border-emerald-400/20"
  frontendPath: string  // e.g. "/about-us" — shown in "View Live" link
  sections: HubSection[]
}

export default function ManagementHub({
  title, subtitle, accent, bgAccent, borderAccent, frontendPath, sections
}: ManagementHubProps) {
  const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') || ''

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-bold text-white mb-1">{title}</h1>
            <p className="text-slate-400 text-sm">{subtitle}</p>
          </div>
          <a href={`${BASE}${frontendPath}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-accent
                       border border-slate-700 hover:border-brand-accent/40 px-3 py-2 rounded-lg transition-all">
            View Live Page <ExternalLink size={11} />
          </a>
        </div>

        {/* Section flow — vertical list mirroring frontend top-to-bottom order */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-[19px] top-10 bottom-10 w-px bg-slate-800 z-0" />

          <div className="space-y-3 relative z-10">
            {sections.map((section, idx) => {
              const Icon = section.icon
              const isLast = idx === sections.length - 1

              if (!section.to) {
                return (
                  <div key={section.label}
                    className="flex items-start gap-4 opacity-50 cursor-not-allowed">
                    {/* Step indicator */}
                    <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center
                                    bg-slate-800 border border-slate-700`}>
                      <Icon size={16} className="text-slate-600" />
                    </div>
                    <div className={`flex-1 bg-slate-900/50 border border-slate-800/50 rounded-xl p-4
                                    ${!isLast ? 'mb-0' : ''}`}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-semibold text-slate-600">{section.label}</div>
                        <span className="text-[9px] bg-slate-800 text-slate-600 border border-slate-700/60
                                         rounded px-1.5 py-0.5 uppercase tracking-wider shrink-0">Soon</span>
                      </div>
                      <div className="text-[12px] text-slate-700 mt-1">{section.desc}</div>
                      {section.frontendNote && (
                        <div className="text-[11px] text-slate-700 mt-1 italic">{section.frontendNote}</div>
                      )}
                    </div>
                  </div>
                )
              }

              return (
                <Link key={section.label} to={section.to}
                  className="flex items-start gap-4 group">
                  <div className={`w-10 h-10 rounded-xl shrink-0 grid place-items-center
                                  ${bgAccent} border ${borderAccent} transition-all
                                  group-hover:scale-110`}>
                    <Icon size={16} className={accent} />
                  </div>
                  <div className={`flex-1 bg-slate-900 border border-slate-800 rounded-xl p-4
                                  hover:border-slate-700 hover:bg-slate-800/50 transition-all`}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold text-white group-hover:text-white">
                        {section.label}
                      </div>
                      <ArrowRight size={14}
                        className={`text-slate-700 group-hover:${accent} group-hover:translate-x-0.5
                                   transition-all shrink-0`} />
                    </div>
                    <div className="text-[12px] text-slate-500 mt-1">{section.desc}</div>
                    {section.frontendNote && (
                      <div className="text-[11px] text-slate-600 mt-1 italic">{section.frontendNote}</div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
