import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Menu, X, ArrowRight, Search, Phone, Mail } from 'lucide-react'
import { sections, contact } from '../data/contact'
import { assets } from '../data/assets'
import LanguageSwitcher from './LanguageSwitcher'
import { useScrollHeader } from '../hooks/useScrollHeader'

/**
 * Sustainability Magazine-style navbar:
 *  ┌───────────────┬────────────────────────────────────────────┐
 *  │               │  utility row  (phone · mail · lang · CTA)  │
 *  │     LOGO      │  ─── thin accent divider ───              │
 *  │               │  MAIN NAV ROW (uppercase links)           │
 *  └───────────────┴────────────────────────────────────────────┘
 *  - On scroll DOWN  → utility row slides up out of view
 *  - On scroll UP    → utility row reappears
 *  - At very top     → both rows visible, full-height
 *  - Mobile          → logo + hamburger + Contact CTA only
 */
export default function Navbar() {
  const { t } = useTranslation()
  const { scrolled, hidden } = useScrollHeader(8, 80)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')

  // THREE balanced rows of 4 each (Contact stays as the utility-row CTA).
  const navItems = sections.slice(0, 12)            // Home … Careers
  const navRowA = navItems.slice(0, 4)              // Home, About, Businesses, Solutions
  const navRowB = navItems.slice(4, 8)              // Partnerships, Global, Stewardship, Network
  const navRowC = navItems.slice(8, 12)             // Leadership, Foresight, Insights, Careers

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

  const linkCls = (id: string) =>
    `relative uppercase tracking-[0.18em] text-[10pt] font-semibold py-1
     transition-colors hover:text-brand-accent focus:text-brand-accent active:text-brand-accent
     after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1
     after:h-[2px] after:bg-brand-accent after:rounded-full
     after:scale-x-0 after:origin-center after:transition-transform after:duration-300
     hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100 ${
      active === id ? 'text-brand-accent after:scale-x-100' : 'text-white'
    }`

  return (
    <header className={`sticky top-0 z-40 bg-brand-ink transition-shadow ${
      scrolled ? 'shadow-xl shadow-black/30' : ''
    }`}>
      <div className="container-x flex items-stretch justify-between">

        {/* LEFT — LOGO only */}
        <a href="#home" className="flex items-center py-3 group shrink-0">
          <img
            src={assets.logo}
            alt="Yanabiya Group"
            className="h-14 lg:h-16 w-auto object-contain bg-white rounded p-1.5 group-hover:opacity-90 transition"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </a>

        {/* RIGHT — stacked rows on desktop */}
        <div className="hidden lg:flex flex-col items-end justify-center min-w-0">

          {/* Utility row (collapses on scroll-down) */}
          <div
            className={`flex items-center gap-6 text-[11px] text-white/85
                        overflow-hidden transition-all duration-300 ease-out
                        ${hidden ? 'max-h-0 opacity-0 -translate-y-2'
                                 : 'max-h-12 opacity-100 translate-y-0 mb-2'}`}
          >
            <button className="flex items-center gap-1 hover:text-brand-accent transition">
              <Search size={12} /> Find
            </button>
            <a href={`tel:${contact.mobile.replace(/\s/g, '')}`}
               className="flex items-center gap-1.5 hover:text-brand-accent transition">
              <Phone size={12} /> {contact.mobile}
            </a>
            <a href={`mailto:${contact.emails[0]}`}
               className="flex items-center gap-1.5 hover:text-brand-accent transition">
              <Mail size={12} /> {contact.emails[0]}
            </a>
            <span className="opacity-30">|</span>
            <LanguageSwitcher />
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm
                         bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[10px] font-bold
                         hover:bg-white transition"
            >
              {t('nav.contact')} <ArrowRight size={12} className="ltr-flip" />
            </a>
          </div>

          {/* Thin accent divider — only when row 1 is visible */}
          <div className={`w-full h-px bg-brand-accent/60 transition-opacity duration-300
                           ${hidden ? 'opacity-0' : 'opacity-100'}`} />

          {/* Row 2 — main nav, part A */}
          <nav className="flex items-center gap-7 pt-3">
            {navRowA.map((l) => (
              <a key={l.id} href={`#${l.id}`} className={linkCls(l.id)}>
                {t(l.tKey)}
              </a>
            ))}
          </nav>

          {/* Rows B & C — collapse together with utility on scroll-down,
              so only Row A stays visible while scrolling. */}
          <div className={`overflow-hidden transition-all duration-300 ease-out
                           ${hidden ? 'max-h-0 opacity-0 -translate-y-2'
                                    : 'max-h-40 opacity-100 translate-y-0'}`}>
            <nav className="flex items-center gap-7 pt-2">
              {navRowB.map((l) => (
                <a key={l.id} href={`#${l.id}`} className={linkCls(l.id)}>
                  {t(l.tKey)}
                </a>
              ))}
            </nav>
            <nav className="flex items-center gap-7 pt-2 pb-3">
              {navRowC.map((l) => (
                <a key={l.id} href={`#${l.id}`} className={linkCls(l.id)}>
                  {t(l.tKey)}
                </a>
              ))}
              <a href="#insights" className={linkCls('articles')}>Articles</a>
            </nav>
          </div>
        </div>

        {/* MOBILE controls — hamburger + CTA */}
        <div className="flex lg:hidden items-center gap-2">
          <a href="#contact"
             className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm
                        bg-brand-accent text-brand-ink uppercase tracking-[0.15em] text-[10px] font-bold">
            {t('nav.contact')}
          </a>
          <button
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
        <div className="lg:hidden border-t border-white/10 bg-brand-ink">
          {/* Mobile utility row */}
          <div className="container-x py-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/85 border-b border-white/10">
            <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="flex items-center gap-1.5">
              <Phone size={12} /> {contact.mobile}
            </a>
            <a href={`mailto:${contact.emails[0]}`} className="flex items-center gap-1.5">
              <Mail size={12} /> {contact.emails[0]}
            </a>
            <div className="ms-auto"><LanguageSwitcher /></div>
          </div>

          {/* Mobile main links */}
          <div className="container-x py-2 flex flex-col">
            {sections.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={`py-3 uppercase tracking-[0.18em] text-[12px] font-semibold border-b border-white/10 transition ${
                  active === l.id ? 'text-brand-accent' : 'text-white'
                }`}
              >
                {t(l.tKey)}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 mb-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm bg-brand-accent text-brand-ink uppercase tracking-[0.18em] text-[12px] font-bold"
            >
              {t('nav.contact')} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
