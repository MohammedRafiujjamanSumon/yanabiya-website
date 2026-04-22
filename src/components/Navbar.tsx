import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { sections } from '../data/contact'
import { assets } from '../data/assets'
import { useScrollHeader } from '../hooks/useScrollHeader'

type NavItem = { id: string; label: string; desc?: string; icon?: LucideIcon }
type NavGroup = {
  label: string
  id?: string
  parentSection?: string
  items?: NavItem[]
}

/**
 * n8n.io-style light navbar:
 *  - White background, dark text, subtle bottom border
 *  - Logo far left; nav items left-aligned immediately after
 *  - Hover-open dropdowns with title + description rows
 */
export default function Navbar() {
  const { t } = useTranslation()
  const { scrolled } = useScrollHeader(8, 80)
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [active, setActive] = useState('home')
  const closeTimer = useRef<number | undefined>(undefined)

  const navGroups: NavGroup[] = [
    { label: t('nav.home'),         id: 'home'         },
    { label: t('nav.about'),        id: 'about'        },
    { label: t('nav.businesses'),   id: 'businesses'   },
    { label: t('nav.global'),       id: 'global'       },
    { label: t('nav.solutions'),    id: 'solutions'    },
    {
      label: 'Trusted Network',
      parentSection: 'partnerships',
      items: [
        { id: 'sponsors', label: 'Our Sponsors' },
        { id: 'partners', label: 'Our Partners' },
        { id: 'clients',  label: 'Our Clients'  },
      ],
    },
    {
      label: 'Leadership',
      parentSection: 'leadership',
      items: [
        { id: 'management',    label: 'Our Management' },
        { id: 'professionals', label: 'High Skilled Professionals' },
      ],
    },
    {
      label: 'Community',
      items: [
        { id: 'careers',  label: t('nav.careers')  },
        { id: 'csr',      label: t('nav.csr')      },
        { id: 'strategy', label: t('nav.strategy') },
        { id: 'insights', label: t('nav.insights') },
      ],
    },
  ]

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 160
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= y) { setActive(sections[i].id); return }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const hoverOpen = (label: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
    setOpenMenu(label)
  }
  const hoverClose = () => {
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 120)
  }

  const baseLinkCls = (isActive: boolean) =>
    `relative text-[15px] font-medium whitespace-nowrap py-2
     transition-colors duration-200
     hover:text-white focus:text-white ${
      isActive ? 'text-brand-accent' : 'text-white/80'
    }`

  return (
    <header className="sticky top-0 z-40 bg-brand-deep pt-3 pb-3 px-3 lg:px-6">
      <div
        className={`container-x mx-auto flex items-center gap-8 h-14 lg:h-16 px-4 lg:px-6
                    rounded-full bg-black/90 backdrop-blur-md
                    border border-white/10 transition-shadow duration-200 ${
          scrolled ? 'shadow-xl shadow-black/30'
                   : 'shadow-lg shadow-black/20'
        }`}
      >

        {/* LEFT — LOGO */}
        <a href="#home" className="flex items-center shrink-0 group">
          <img
            src={assets.logo}
            alt="Yanabiya Group"
            className="h-9 lg:h-10 w-auto object-contain group-hover:opacity-90 transition"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </a>

        {/* NAV — pushed right, then CTA on far right */}
        <nav className="hidden lg:flex ms-auto items-center gap-6 xl:gap-7 min-w-0">
          {navGroups.map((g) => {
            if (!g.items) {
              const isActive = !!g.id && active === g.id
              return (
                <a key={g.label} href={`#${g.id}`} className={baseLinkCls(isActive)}>
                  {g.label}
                </a>
              )
            }
            const isOpen = openMenu === g.label
            const groupActive =
              (g.parentSection !== undefined && active === g.parentSection) ||
              g.items.some((i) => i.id === active)
            return (
              <div
                key={g.label}
                className="relative"
                onMouseEnter={() => hoverOpen(g.label)}
                onMouseLeave={hoverClose}
              >
                <button
                  type="button"
                  onClick={() => setOpenMenu(isOpen ? null : g.label)}
                  className={`${baseLinkCls(groupActive)} inline-flex items-center gap-1`}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  {g.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isOpen && (() => {
                  const compact = g.items.every((i) => !i.desc)
                  return (
                    <div
                      className={`absolute top-full left-0 mt-2 rounded-2xl bg-white
                                  shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200/80 p-2 z-50
                                  ${compact ? 'w-60' : 'w-[22rem]'}`}
                      onMouseEnter={() => hoverOpen(g.label)}
                      onMouseLeave={hoverClose}
                    >
                      {g.items.map((item) => {
                        const isActive = active === item.id
                        const Icon = item.icon
                        if (compact) {
                          return (
                            <a
                              key={item.id}
                              href={`#${item.id}`}
                              onClick={() => setOpenMenu(null)}
                              className={`flex items-center gap-3 rounded-xl px-3 py-2.5
                                          transition-all duration-200 group/item
                                          ${isActive
                                            ? 'bg-brand-accent/10 text-brand-accent'
                                            : 'text-slate-800 hover:bg-slate-50 hover:text-slate-950'}`}
                            >
                              {Icon && (
                                <span className={`w-9 h-9 rounded-lg grid place-items-center
                                                  transition-all duration-200
                                                  ${isActive
                                                    ? 'bg-brand-accent text-white'
                                                    : 'bg-slate-100 text-slate-500 group-hover/item:bg-brand-accent group-hover/item:text-white group-hover/item:scale-105'}`}>
                                  <Icon size={18} strokeWidth={2} />
                                </span>
                              )}
                              <span className="text-[15px] font-semibold">{item.label}</span>
                              <ArrowRight
                                size={14}
                                className="ms-auto text-slate-300 opacity-0 -translate-x-1
                                           transition-all duration-200
                                           group-hover/item:opacity-100 group-hover/item:translate-x-0
                                           group-hover/item:text-brand-accent"
                              />
                            </a>
                          )
                        }
                        return (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-xl px-4 py-3 hover:bg-slate-50 transition group/item"
                          >
                            <div className={`text-[15px] font-semibold ${
                              isActive
                                ? 'text-brand-accent'
                                : 'text-slate-900 group-hover/item:text-slate-950'
                            }`}>
                              {item.label}
                            </div>
                            {item.desc && (
                              <div className="text-[13px] text-slate-500 mt-1 leading-snug">
                                {item.desc}
                              </div>
                            )}
                          </a>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </nav>

        {/* RIGHT — Get In Touch CTA (desktop) */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                     bg-brand-accent text-brand-ink text-sm font-semibold
                     hover:bg-brand-accentDark hover:text-white transition-all
                     shadow-sm hover:shadow-md hover:-translate-y-0.5 shrink-0"
        >
          Get In Touch <ArrowRight size={14} className="ltr-flip" />
        </a>

        {/* MOBILE — hamburger only */}
        <div className="flex lg:hidden items-center ms-auto">
          <button
            type="button"
            className="text-white p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-slate-200 bg-white">
          <div className="container-x py-2 flex flex-col">
            {sections.filter((s) => s.id !== 'contact').map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`py-3 text-[15px] font-medium border-b border-slate-100 transition ${
                  active === l.id ? 'text-brand-accent' : 'text-slate-900'
                }`}
              >
                {t(l.tKey)}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
