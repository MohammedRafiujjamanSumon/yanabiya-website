import { useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { social, contactByCountry } from '../data/contact'

/* Floating bottom-right chat dock — single primary FAB toggling a
 * vertical column of brand-true buttons. Per-country WhatsApp on top
 * (green WhatsApp logo + country flag set inside it), then a divider,
 * then the rest of the social channels with their real brand logos.
 *
 * URLs come from src/data/contact.ts → `social` (handles) and
 * `contactByCountry` (per-country WhatsApp numbers). */

/* ────────── Brand SVGs (Simple-Icons paths, currentColor-aware) ────────── */

function WhatsAppLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
    </svg>
  )
}

function TelegramLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  )
}

function MessengerLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M.001 11.639C.001 4.95 5.241 0 12.001 0S24 4.95 24 11.639c0 6.689-5.24 11.638-12 11.638-1.21 0-2.38-.16-3.47-.46a.96.96 0 0 0-.64.05l-2.39 1.05a.96.96 0 0 1-1.35-.85l-.07-2.14a.97.97 0 0 0-.32-.68A11.39 11.39 0 0 1 0 11.639zm8.32-2.19l-3.52 5.6c-.35.53.32 1.139.82.789l3.79-2.87a.74.74 0 0 1 .91 0l2.8 2.1a1.8 1.8 0 0 0 2.6-.48l3.52-5.59c.35-.53-.32-1.16-.82-.8l-3.79 2.87a.74.74 0 0 1-.91 0l-2.8-2.1a1.8 1.8 0 0 0-2.6.48z"/>
    </svg>
  )
}

function LinkedInLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function InstagramLogo({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

/* ────────── Channel + country definitions ────────── */

type Channel = {
  key: keyof typeof social
  label: string
  logo: ({ size }: { size?: number }) => JSX.Element
  href: string
  bg: string
  ring: string
}

const ALL: Channel[] = [
  {
    key: 'telegram',
    label: 'Message on Telegram',
    logo: TelegramLogo,
    href: social.telegram,
    bg: 'bg-gradient-to-br from-[#36b1f0] to-[#1c93de]',
    ring: 'rgba(54,177,240,0.45)',
  },
  {
    key: 'messenger',
    label: 'Open Messenger',
    logo: MessengerLogo,
    href: social.messenger,
    bg: 'bg-gradient-to-br from-[#00b2ff] to-[#006aff]',
    ring: 'rgba(0,178,255,0.45)',
  },
  {
    key: 'linkedin',
    label: 'Follow on LinkedIn',
    logo: LinkedInLogo,
    href: social.linkedin,
    bg: 'bg-gradient-to-br from-[#0a66c2] to-[#004182]',
    ring: 'rgba(10,102,194,0.45)',
  },
  {
    key: 'instagram',
    label: 'Follow on Instagram',
    logo: InstagramLogo,
    href: social.instagram,
    bg: 'bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]',
    ring: 'rgba(221,42,123,0.45)',
  },
]

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

/* ────────── Component ────────── */

export default function SocialFloat() {
  const [open, setOpen] = useState(false)
  const channels = ALL.filter((c) => c.href.trim().length > 0)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  if (channels.length === 0 && countryWhatsApps.length === 0) return null

  return (
    <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 flex flex-col items-end gap-2 print:hidden">
      <div
        className={`flex flex-col items-end gap-1.5 transition-all duration-300 origin-bottom-right
                    ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}`}
      >
        {/* Per-country WhatsApp — green WhatsApp logo + flag set inside it */}
        {countryWhatsApps.map((c, i) => (
          <a
            key={`wa-${c.code}`}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.label}
            className="group relative inline-flex items-center gap-2 rounded-full
                       transition-all duration-300
                       hover:-translate-y-0.5"
            style={{ transitionDelay: open ? `${i * 30}ms` : '0ms' }}
          >
            <span className="hidden md:inline-flex items-center rounded-full bg-brand-deep
                             text-brand-deep text-[10px] font-bold uppercase tracking-[0.22em]
                             px-2.5 py-1 shadow-md
                             opacity-0 -translate-x-1
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-200 whitespace-nowrap">
              {c.label}
            </span>
            <span className="relative grid place-items-center w-10 h-10 rounded-full text-brand-deep
                             ring-2 ring-white/70
                             bg-gradient-to-br from-[#25d366] to-[#128c7e]
                             shadow-[0_8px_18px_-6px_rgba(37,211,102,0.55)]">
              <WhatsAppLogo size={20} />
              {/* Flag set inside the logo — bottom-right small overlay */}
              <span className="absolute -bottom-0.5 -right-0.5 grid place-items-center
                               w-4 h-4 rounded-full bg-brand-50 text-[10px] leading-none
                               ring-1 ring-white shadow-sm">
                {c.flag}
              </span>
            </span>
          </a>
        ))}

        {countryWhatsApps.length > 0 && channels.length > 0 && (
          <span aria-hidden="true" className="block w-7 h-px bg-slate-300/60 my-0.5" />
        )}

        {/* Other social channels — real brand logo inside coloured pill */}
        {channels.map((c, i) => {
          const Logo = c.logo
          return (
            <a
              key={c.key}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={c.label}
              className="group relative inline-flex items-center gap-2 rounded-full
                         transition-all duration-300
                         hover:-translate-y-0.5"
              style={{
                transitionDelay: open ? `${(countryWhatsApps.length + i) * 30}ms` : '0ms',
              }}
            >
              <span className="hidden md:inline-flex items-center rounded-full bg-brand-deep
                               text-brand-deep text-[10px] font-bold uppercase tracking-[0.22em]
                               px-2.5 py-1 shadow-md
                               opacity-0 -translate-x-1
                               group-hover:opacity-100 group-hover:translate-x-0
                               transition-all duration-200 whitespace-nowrap">
                {c.label}
              </span>
              <span
                className={`grid place-items-center w-10 h-10 rounded-full text-brand-deep
                            ring-2 ring-white/70
                            ${c.bg}`}
                style={{ boxShadow: `0 8px 18px -6px ${c.ring}` }}
              >
                <Logo size={20} />
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
        className="relative grid place-items-center w-12 h-12 rounded-full
                   bg-brand-deep text-brand-accent
                   ring-2 ring-brand-accent
                   shadow-[0_12px_28px_-8px_rgba(15,58,35,0.55)]
                   transition-all duration-300
                   hover:scale-105 hover:bg-brand-accent hover:text-brand-deep"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-brand-accent/40 blur-md animate-pulse pointer-events-none"
        />
        <span className="relative">
          {open ? <X size={20} strokeWidth={2.4} /> : <MessageCircle size={20} strokeWidth={2.2} />}
        </span>
        {!open && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-brand-accent ring-2 ring-brand-deep
                       animate-pulse"
          />
        )}
      </button>
    </div>
  )
}
