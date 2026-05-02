import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { sections } from '../data/contact'
import { assets } from '../data/assets'
import { useScrollHeader } from '../hooks/useScrollHeader'
import LanguageSwitcher from './LanguageSwitcher'

type NavItem = { id: string; label: string; desc?: string; icon?: LucideIcon; href?: string }
type NavSubGroup = {
  label: string
  parentSection?: string
  parentRoute?: string
  items: NavItem[]
}
type NavGroup = {
  label: string
  id?: string
  parentSection?: string
  parentRoute?: string
  items?: NavItem[]
  subGroups?: NavSubGroup[]
}

/**
 * n8n.io-style light navbar:
 *  - White background, dark text, subtle bottom border
 *  - Logo far left; nav items left-aligned immediately after
 *  - Hover-open dropdowns with title + description rows
 */
export default function Navbar() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { scrolled } = useScrollHeader(8, 80)
  const isHome = location.pathname === '/' || location.pathname === ''
  // Home top = fully hidden; scrolled or inner pages = visible glass navbar
  const hidden = isHome && !scrolled
  const transparent = true
  const [open, setOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null)
  const [mobileOpenSubGroup, setMobileOpenSubGroup] = useState<string | null>(null)
  const [active, setActive] = useState('home')
  const closeTimer = useRef<number | undefined>(undefined)

  const scrollToHash = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  const handleHashClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    if (location.pathname === '/' || location.pathname === '') {
      // Already on home — just smooth-scroll.
      scrollToHash(id)
    } else {
      // Navigate to /#id; the Home page reads `useLocation().hash` and
      // smooth-scrolls to that section once it has mounted.
      navigate(`/#${id}`)
    }
  }

  const navGroups: NavGroup[] = [
    { label: t('nav.home'),       id: 'home'         },
    { label: t('nav.about'),      id: 'about'        },
    { label: t('nav.businesses'), id: 'businesses'   },
    { label: t('nav.global'),     id: 'global'       },
    { label: 'Our Network',        id: 'partnerships' },
    { label: 'Our Community',     parentRoute: '/community'   },
    { label: 'Our Leadership',    parentRoute: '/leadership'  },
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
    `relative text-sm font-semibold whitespace-nowrap py-1.5 px-4 rounded-full
     transition-all duration-200
     hover:bg-brand-deep hover:text-white ${
      isActive
        ? 'bg-brand-deep text-white'
        : 'text-brand-deep'
    }`

  return (
    <header
      className={`left-0 right-0 z-40 transition-all duration-500 sticky top-0
                  ${hidden
                    ? 'opacity-0 pointer-events-none'
                    : 'opacity-100 bg-white/15 backdrop-blur-md shadow-sm shadow-black/5'}`}
    >
      <div className="bg-transparent">
        <div className="container-x flex items-center gap-3 md:gap-4 px-2 md:px-4">

        {/* LEFT — LOGO. Larger, brighter, retina-friendly. */}
        <Link to="/#home" className="flex items-center shrink-0 group py-1">
          <img
            src={assets.logo}
            alt="Yanabiya Group"
            width={1024}
            height={765}
            decoding="async"
            // @ts-expect-error - fetchpriority is a valid HTML attr but not yet in React types
            fetchpriority="high"
            className="h-16 md:h-20 lg:h-24 w-auto object-contain
                       brightness-110 contrast-110 saturate-110
                       drop-shadow-[0_4px_10px_rgba(0,0,0,0.45)]
                       drop-shadow-[0_2px_4px_rgba(15,58,35,0.35)]
                       transition-transform duration-300 group-hover:scale-105"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </Link>

        {/* RIGHT — same black bg as the inner bar so logo + nav cluster
         *  read as one black band sandwiched between two green strips. */}
      <div
        className={`flex flex-1 items-center gap-4 h-11 lg:h-12 ps-4 pe-5 lg:pe-8
                    bg-transparent`}
      >

        {/* NAV + CTA — clustered on the right */}
        <div className="hidden lg:flex ms-auto items-center gap-4 xl:gap-5">
        <nav className="flex items-center gap-3 xl:gap-4 min-w-0">
          {navGroups.map((g) => {
            if (!g.items && !g.subGroups) {
              const isActive = !!g.id && active === g.id
              if (g.id === 'home') {
                return (
                  <Link
                    key={g.label}
                    to="/"
                    onClick={(e) => {
                      if (location.pathname === '/' || location.pathname === '') {
                        e.preventDefault()
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                    className={baseLinkCls(isActive)}
                  >
                    {g.label}
                  </Link>
                )
              }
              if (g.parentRoute) {
                return (
                  <Link
                    key={g.label}
                    to={g.parentRoute}
                    className={baseLinkCls(location.pathname.startsWith(g.parentRoute))}
                  >
                    {g.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={g.label}
                  to={`/#${g.id}`}
                  onClick={(e) => handleHashClick(e, g.id!)}
                  className={baseLinkCls(isActive)}
                >
                  {g.label}
                </Link>
              )
            }
            const isOpen = openMenu === g.label
            const groupActive = g.subGroups
              ? g.subGroups.some(
                  (sg) =>
                    (sg.parentSection !== undefined && active === sg.parentSection) ||
                    sg.items.some((i) => i.id === active),
                )
              : (g.parentSection !== undefined && active === g.parentSection) ||
                (g.items?.some((i) => i.id === active) ?? false)
            const isMega = !!g.subGroups
            return (
              <div
                key={g.label}
                className="relative"
                onMouseEnter={() => hoverOpen(g.label)}
                onMouseLeave={hoverClose}
              >
                {g.parentRoute !== undefined ? (
                  <Link
                    to={g.parentRoute}
                    className={`${baseLinkCls(groupActive)} inline-flex items-center gap-1`}
                  >
                    {g.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </Link>
                ) : g.parentSection !== undefined ? (
                  <Link
                    to={`/#${g.parentSection}`}
                    onClick={(e) => handleHashClick(e, g.parentSection!)}
                    className={`${baseLinkCls(groupActive)} inline-flex items-center gap-1`}
                  >
                    {g.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : g.label)}
                    className={`${baseLinkCls(groupActive)} inline-flex items-center gap-1`}
                    aria-haspopup="true"
                    aria-expanded={isOpen ? 'true' : 'false'}
                  >
                    {g.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                )}

                {isOpen && isMega && g.subGroups && (
                  <div
                    className="absolute top-full right-0 mt-2 rounded-2xl bg-white
                               shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 p-4 z-50
                               grid grid-cols-2 gap-4 w-[36rem]"
                    onMouseEnter={() => hoverOpen(g.label)}
                    onMouseLeave={hoverClose}
                  >
                    {g.subGroups.map((sg) => (
                      <div key={sg.label} className="flex flex-col gap-1">
                        {sg.parentRoute ? (
                          <Link
                            to={sg.parentRoute}
                            onClick={() => setOpenMenu(null)}
                            className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider
                                       text-slate-400 hover:text-brand-accentDark transition"
                          >
                            {sg.label}
                          </Link>
                        ) : sg.parentSection ? (
                          <Link
                            to={`/#${sg.parentSection}`}
                            onClick={(e) => { setOpenMenu(null); handleHashClick(e, sg.parentSection!) }}
                            className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider
                                       text-slate-400 hover:text-brand-accentDark transition"
                          >
                            {sg.label}
                          </Link>
                        ) : (
                          <div className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                            {sg.label}
                          </div>
                        )}
                        {sg.items.map((item) => {
                          const isActive = active === item.id
                          const rawTarget = item.href ?? `#${item.id}`
                          const isRoute = rawTarget.startsWith('/')
                          const target = isRoute ? rawTarget : `/${rawTarget}`
                          return (
                            <Link
                              key={item.id}
                              to={target}
                              onClick={() => setOpenMenu(null)}
                              className={`flex items-center gap-2 rounded-xl px-3 py-2 text-[14px]
                                          whitespace-nowrap transition-all duration-200 group/item
                                          ${isActive
                                            ? 'bg-brand-accent/15 text-brand-accentDark'
                                            : 'text-slate-700 hover:bg-brand-accent/10 hover:text-brand-accentDark'}`}
                            >
                              <span className="font-medium">{item.label}</span>
                              <ArrowRight
                                size={12}
                                className={`ms-auto transition-all duration-200
                                            ${isActive
                                              ? 'text-brand-accentDark opacity-100'
                                              : 'text-slate-300 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-brand-accentDark'}`}
                              />
                            </Link>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {isOpen && !isMega && g.items && (() => {
                  const compact = g.items.every((i) => !i.desc)
                  return (
                    <div
                      className={`absolute top-full left-0 mt-2 rounded-2xl bg-white
                                  shadow-2xl shadow-slate-900/10 ring-1 ring-slate-200 p-2 z-50
                                  flex flex-col gap-1.5
                                  ${compact ? 'w-max min-w-[14rem]' : 'w-[22rem]'}`}
                      onMouseEnter={() => hoverOpen(g.label)}
                      onMouseLeave={hoverClose}
                    >
                      {g.items.map((item) => {
                        const isActive = active === item.id
                        const Icon = item.icon
                        if (compact) {
                          const rawTarget = item.href ?? `#${item.id}`
                          const isRoute = rawTarget.startsWith('/')
                          const target = isRoute ? rawTarget : `/${rawTarget}`
                          const compactCls = `flex items-center gap-3 rounded-xl px-4 py-2.5
                                          whitespace-nowrap transition-all duration-200 group/item
                                          ${isActive
                                            ? 'bg-brand-accent/15 text-brand-accentDark'
                                            : 'text-slate-700 hover:bg-brand-accent/10 hover:text-brand-accentDark active:text-brand-accentDark focus:text-brand-accentDark'}`
                          const compactInner = (
                            <>
                              {Icon && (
                                <span className={`w-8 h-8 rounded-lg grid place-items-center
                                                  transition-all duration-200
                                                  ${isActive
                                                    ? 'bg-brand-accent/20 text-brand-accentDark'
                                                    : 'bg-slate-100 text-slate-500 group-hover/item:bg-brand-accent/20 group-hover/item:text-brand-accentDark'}`}>
                                  <Icon size={16} strokeWidth={2} />
                                </span>
                              )}
                              <span className="text-[15px] font-semibold">{item.label}</span>
                              <ArrowRight
                                size={14}
                                className={`ms-auto transition-all duration-200
                                            ${isActive
                                              ? 'text-brand-accentDark opacity-100'
                                              : 'text-slate-300 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 group-hover/item:text-brand-accentDark'}`}
                              />
                            </>
                          )
                          return (
                            <Link
                              key={item.id}
                              to={target}
                              onClick={() => setOpenMenu(null)}
                              className={compactCls}
                            >
                              {compactInner}
                            </Link>
                          )
                        }
                        return (
                          <Link
                            key={item.id}
                            to={`/#${item.id}`}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-xl px-4 py-3 hover:bg-brand-accent/10 transition group/item"
                          >
                            <div className={`text-[15px] font-semibold ${
                              isActive
                                ? 'text-brand-accentDark'
                                : 'text-slate-800 group-hover/item:text-brand-accentDark'
                            }`}>
                              {item.label}
                            </div>
                            {item.desc && (
                              <div className="text-[13px] text-slate-500 mt-1 leading-snug group-hover/item:text-slate-700">
                                {item.desc}
                              </div>
                            )}
                          </Link>
                        )
                      })}
                    </div>
                  )
                })()}
              </div>
            )
          })}
        </nav>

        {/* RIGHT — Language switcher (desktop) */}
        <div className="shrink-0 text-brand-deep">
          <LanguageSwitcher />
        </div>
        </div>

        {/* MOBILE — language + hamburger */}
        <div className="flex lg:hidden items-center ms-auto gap-1 text-brand-deep">
          <LanguageSwitcher />
          <button
            type="button"
            className="text-brand-accent p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
        </div>
      </div>

      {/* Mobile drawer — mirrors desktop nav: all groups + dropdown items as accordions */}
      {open && (
        <div className="lg:hidden mt-3 rounded-2xl bg-white ring-1 ring-slate-200 shadow-2xl shadow-slate-900/10 overflow-hidden">
          <div className="px-3 py-2 flex flex-col divide-y divide-slate-100">
            {navGroups.map((g) => {
              if (!g.items && !g.subGroups) {
                const isActive = !!g.id && active === g.id
                if (g.id === 'home') {
                  return (
                    <Link
                      key={g.label}
                      to="/"
                      onClick={(e) => {
                        setOpen(false)
                        if (location.pathname === '/' || location.pathname === '') {
                          e.preventDefault()
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }
                      }}
                      className={`py-3 px-2 text-[15px] font-medium transition ${
                        isActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                      }`}
                    >
                      {g.label}
                    </Link>
                  )
                }
                if (g.parentRoute) {
                  return (
                    <Link
                      key={g.label}
                      to={g.parentRoute}
                      onClick={() => setOpen(false)}
                      className={`py-3 px-2 text-[15px] font-medium transition ${
                        location.pathname.startsWith(g.parentRoute) ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                      }`}
                    >
                      {g.label}
                    </Link>
                  )
                }
                return (
                  <Link
                    key={g.label}
                    to={`/#${g.id}`}
                    onClick={(e) => { setOpen(false); handleHashClick(e, g.id!) }}
                    className={`py-3 px-2 text-[15px] font-medium transition ${
                      isActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                    }`}
                  >
                    {g.label}
                  </Link>
                )
              }
              const isOpenGroup = mobileOpenGroup === g.label
              const groupActive = g.subGroups
                ? g.subGroups.some(
                    (sg) =>
                      (sg.parentSection !== undefined && active === sg.parentSection) ||
                      sg.items.some((i) => i.id === active),
                  )
                : (g.parentSection !== undefined && active === g.parentSection) ||
                  (g.items?.some((i) => i.id === active) ?? false)
              return (
                <div key={g.label} className="py-1">
                  <div className="flex items-stretch">
                    {g.parentRoute !== undefined ? (
                      <Link
                        to={g.parentRoute}
                        onClick={() => { setOpen(false); setMobileOpenGroup(null) }}
                        className={`flex-1 py-3 px-2 text-[15px] font-medium transition ${
                          groupActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                        }`}
                      >
                        {g.label}
                      </Link>
                    ) : g.parentSection !== undefined ? (
                      <Link
                        to={`/#${g.parentSection}`}
                        onClick={(e) => { setOpen(false); handleHashClick(e, g.parentSection!) }}
                        className={`flex-1 py-3 px-2 text-[15px] font-medium transition ${
                          groupActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                        }`}
                      >
                        {g.label}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setMobileOpenGroup(isOpenGroup ? null : g.label)}
                        className={`flex-1 py-3 px-2 text-left text-[15px] font-medium transition ${
                          groupActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                        }`}
                      >
                        {g.label}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setMobileOpenGroup(isOpenGroup ? null : g.label)}
                      aria-label={`Toggle ${g.label} submenu`}
                      aria-expanded={isOpenGroup}
                      className="px-3 text-slate-400 hover:text-brand-accentDark transition"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpenGroup ? 'rotate-180' : ''}`}
                      />
                    </button>
                  </div>
                  {isOpenGroup && g.subGroups && (
                    <div className="pb-2 pl-2 flex flex-col gap-1">
                      {g.subGroups.map((sg) => {
                        const isOpenSub = mobileOpenSubGroup === `${g.label}:${sg.label}`
                        const subActive =
                          (sg.parentSection !== undefined && active === sg.parentSection) ||
                          sg.items.some((i) => i.id === active)
                        return (
                          <div key={sg.label} className="rounded-lg">
                            <div className="flex items-stretch">
                              {sg.parentRoute ? (
                                <Link
                                  to={sg.parentRoute}
                                  onClick={() => { setOpen(false); setMobileOpenGroup(null); setMobileOpenSubGroup(null) }}
                                  className={`flex-1 py-2.5 px-3 text-[14px] font-semibold transition ${
                                    subActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                                  }`}
                                >
                                  {sg.label}
                                </Link>
                              ) : sg.parentSection ? (
                                <Link
                                  to={`/#${sg.parentSection}`}
                                  onClick={(e) => { setOpen(false); setMobileOpenGroup(null); setMobileOpenSubGroup(null); handleHashClick(e, sg.parentSection!) }}
                                  className={`flex-1 py-2.5 px-3 text-[14px] font-semibold transition ${
                                    subActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                                  }`}
                                >
                                  {sg.label}
                                </Link>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setMobileOpenSubGroup(isOpenSub ? null : `${g.label}:${sg.label}`)}
                                  className={`flex-1 py-2.5 px-3 text-left text-[14px] font-semibold transition ${
                                    subActive ? 'text-brand-accentDark' : 'text-slate-700 hover:text-brand-accentDark'
                                  }`}
                                >
                                  {sg.label}
                                </button>
                              )}
                              {sg.items.length > 0 && (
                                <button
                                  type="button"
                                  onClick={() => setMobileOpenSubGroup(isOpenSub ? null : `${g.label}:${sg.label}`)}
                                  aria-label={`Toggle ${sg.label} submenu`}
                                  aria-expanded={isOpenSub}
                                  className="px-3 text-slate-400 hover:text-brand-accentDark transition"
                                >
                                  <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${isOpenSub ? 'rotate-180' : ''}`}
                                  />
                                </button>
                              )}
                            </div>
                            {isOpenSub && (
                              <div className="pb-2 pl-3 flex flex-col gap-0.5">
                                {sg.items.map((item) => {
                                  const rawTarget = item.href ?? `#${item.id}`
                                  const isRoute = rawTarget.startsWith('/')
                                  const target = isRoute ? rawTarget : `/${rawTarget}`
                                  const isActive = active === item.id
                                  return (
                                    <Link
                                      key={item.id}
                                      to={target}
                                      onClick={() => { setOpen(false); setMobileOpenGroup(null); setMobileOpenSubGroup(null) }}
                                      className={`flex items-center gap-2 py-2 px-3 rounded-lg text-[13px] transition ${
                                        isActive
                                          ? 'bg-brand-accent/15 text-brand-accentDark'
                                          : 'text-slate-700 hover:bg-brand-accent/10 hover:text-brand-accentDark'
                                      }`}
                                    >
                                      <ArrowRight size={12} className="ltr-flip opacity-60" />
                                      {item.label}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                  {isOpenGroup && !g.subGroups && g.items && (
                    <div className="pb-2 pl-3 flex flex-col gap-0.5">
                      {g.items.map((item) => {
                        const rawTarget = item.href ?? `#${item.id}`
                        const isRoute = rawTarget.startsWith('/')
                        const target = isRoute ? rawTarget : `/${rawTarget}`
                        const isActive = active === item.id
                        return (
                          <Link
                            key={item.id}
                            to={target}
                            onClick={() => { setOpen(false); setMobileOpenGroup(null) }}
                            className={`flex items-center gap-2 py-2.5 px-3 rounded-lg text-[14px] transition ${
                              isActive
                                ? 'bg-brand-accent/15 text-brand-accentDark'
                                : 'text-slate-700 hover:bg-brand-accent/10 hover:text-brand-accentDark'
                            }`}
                          >
                            <ArrowRight size={12} className="ltr-flip opacity-60" />
                            {item.label}
                          </Link>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}

          </div>
        </div>
      )}
    </header>
  )
}
