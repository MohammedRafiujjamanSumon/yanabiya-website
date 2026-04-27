import { useEffect, useState } from 'react'
import { MessageCircle, Send, MessageSquare, Linkedin, Instagram, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { social, contactByCountry } from '../data/contact'

/* Floating bottom-right chat dock — a single primary FAB that toggles
 * a vertical column of brand-tinted social / messenger buttons.
 *
 * Buttons are pulled from src/data/contact.ts → `social`. Empty URLs
 * are hidden, so the dock auto-shrinks when handles are missing. */

type Channel = {
  key: keyof typeof social
  label: string
  icon: LucideIcon
  href: string
  /** Background gradient for the button. */
  bg: string
  /** Hover ring colour (rgba). */
  ring: string
}

const ALL: Channel[] = [
  {
    key: 'telegram',
    label: 'Message on Telegram',
    icon: Send,
    href: social.telegram,
    bg: 'bg-gradient-to-br from-[#36b1f0] to-[#1c93de]',
    ring: 'rgba(54,177,240,0.45)',
  },
  {
    key: 'messenger',
    label: 'Open Messenger',
    icon: MessageSquare,
    href: social.messenger,
    bg: 'bg-gradient-to-br from-[#00b2ff] to-[#006aff]',
    ring: 'rgba(0,178,255,0.45)',
  },
  {
    key: 'linkedin',
    label: 'Follow on LinkedIn',
    icon: Linkedin,
    href: social.linkedin,
    bg: 'bg-gradient-to-br from-[#0a66c2] to-[#004182]',
    ring: 'rgba(10,102,194,0.45)',
  },
  {
    key: 'instagram',
    label: 'Follow on Instagram',
    icon: Instagram,
    href: social.instagram,
    bg: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]',
    ring: 'rgba(221,42,123,0.45)',
  },
]

/* Per-country WhatsApp buttons (mobile number preferred, falls back
 * to the first listed phone). Stripped of spaces / + so wa.me parses. */
const COUNTRY_LABEL: Record<string, { name: string; flag: string }> = {
  OM: { name: 'Oman',       flag: '🇴🇲' },
  GB: { name: 'UK',         flag: '🇬🇧' },
  BD: { name: 'Bangladesh', flag: '🇧🇩' },
  US: { name: 'USA',        flag: '🇺🇸' },
}

const ORDER = ['OM', 'GB', 'BD', 'US'] as const

const countryWhatsApps = ORDER.flatMap((code) => {
  const k = contactByCountry.find((c) => c.code === code)
  if (!k) return []
  const num = (k.whatsapp ?? k.mobile ?? k.phones[0] ?? '').replace(/[^\d]/g, '')
  if (!num) return []
  const meta = COUNTRY_LABEL[code]
  return [{
    code,
    flag: meta.flag,
    label: `WhatsApp ${meta.name} office`,
    href: `https://wa.me/${num}`,
  }]
})

export default function SocialFloat() {
  const [open, setOpen] = useState(false)
  const channels = ALL.filter((c) => c.href.trim().length > 0)

  // Close on Escape when expanded.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (channels.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-3 print:hidden">
      {/* Channel column — appears above the main FAB when open.
       *  Per-country WhatsApp on top, then a divider, then the rest of
       *  the social channels. */}
      <div
        className={`flex flex-col items-end gap-2 transition-all duration-300 origin-bottom-right
                    ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}
      >
        {/* Country WhatsApp buttons (one per office, real per-country
         *  number from contactByCountry — not the group fallback). */}
        {countryWhatsApps.map((c, i) => (
          <a
            key={`wa-${c.code}`}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            className="group relative inline-flex items-center gap-2 rounded-full
                       shadow-[0_10px_24px_-8px_rgba(37,211,102,0.45)]
                       transition-all duration-300
                       hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(37,211,102,0.55)]"
            style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
          >
            <span className="hidden md:inline-flex items-center rounded-full bg-brand-deep
                             text-white text-[10px] font-bold uppercase tracking-[0.22em]
                             px-3 py-1.5 shadow-md
                             opacity-0 -translate-x-1
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-200 whitespace-nowrap">
              {c.label}
            </span>
            <span className="relative grid place-items-center w-12 h-12 rounded-full text-white
                             ring-2 ring-white/70
                             bg-gradient-to-br from-[#25d366] to-[#128c7e]">
              <MessageCircle size={20} strokeWidth={2.2} />
              <span className="absolute -top-1 -right-1 grid place-items-center
                               w-5 h-5 rounded-full bg-white text-base leading-none
                               ring-2 ring-white shadow-sm">
                {c.flag}
              </span>
            </span>
          </a>
        ))}

        {/* Divider between country group and social group */}
        {countryWhatsApps.length > 0 && channels.length > 0 && (
          <span aria-hidden="true" className="block w-8 h-px bg-slate-300/60 my-1" />
        )}

        {channels.map((c, i) => {
          const Icon = c.icon
          return (
            <a
              key={c.key}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.label}
              className={`group relative inline-flex items-center gap-2 rounded-full
                          shadow-[0_10px_24px_-8px_rgba(15,58,35,0.45)]
                          transition-all duration-300
                          hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_var(--tw-shadow-color)]`}
              style={{
                transitionDelay: open ? `${(countryWhatsApps.length + i) * 30}ms` : '0ms',
                ['--tw-shadow-color' as never]: c.ring,
              }}
            >
              <span className="hidden md:inline-flex items-center rounded-full bg-brand-deep
                               text-white text-[10px] font-bold uppercase tracking-[0.22em]
                               px-3 py-1.5 shadow-md
                               opacity-0 -translate-x-1
                               group-hover:opacity-100 group-hover:translate-x-0
                               transition-all duration-200 whitespace-nowrap">
                {c.label}
              </span>
              <span
                className={`grid place-items-center w-12 h-12 rounded-full text-white
                            ring-2 ring-white/70
                            ${c.bg}`}
              >
                <Icon size={20} strokeWidth={2.2} />
              </span>
            </a>
          )
        })}
      </div>

      {/* Main toggle FAB */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close chat options' : 'Open chat options'}
        aria-expanded={open ? 'true' : 'false'}
        className="relative grid place-items-center w-14 h-14 rounded-full
                   bg-brand-deep text-brand-accent
                   ring-2 ring-brand-accent
                   shadow-[0_14px_32px_-8px_rgba(15,58,35,0.55)]
                   transition-all duration-300
                   hover:scale-105 hover:bg-brand-accent hover:text-brand-deep"
      >
        {/* Soft halo */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brand-accent/40 blur-md animate-pulse pointer-events-none"
        />
        <span className="relative">
          {open ? <X size={22} strokeWidth={2.4} /> : <MessageCircle size={22} strokeWidth={2.2} />}
        </span>
        {/* Online dot */}
        {!open && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-brand-accent ring-2 ring-brand-deep
                       animate-pulse"
          />
        )}
      </button>
    </div>
  )
}
