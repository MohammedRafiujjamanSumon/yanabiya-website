import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  MapPin, Phone, AtSign, Send,
  Linkedin, Facebook, Instagram, Twitter, Youtube,
} from 'lucide-react'
import { contact, contactByCountry, type CountryContact } from '../data/contact'
import { assets } from '../data/assets'

const socials = [
  { Icon: Linkedin,  href: 'https://www.linkedin.com/company/yanabiya-group',  label: 'LinkedIn'  },
  { Icon: Facebook,  href: 'https://www.facebook.com/yanabiyagroup',           label: 'Facebook'  },
  { Icon: Instagram, href: 'https://www.instagram.com/yanabiyagroup',          label: 'Instagram' },
  { Icon: Twitter,   href: 'https://twitter.com/yanabiyagroup',                label: 'Twitter / X' },
  { Icon: Youtube,   href: 'https://www.youtube.com/@yanabiyagroup',           label: 'YouTube'   },
]

const groupLinks = [
  { id: 'home',         label: 'Home'            },
  { id: 'about',        label: 'About Us'        },
  { id: 'global',       label: 'Global Presence' },
  { id: 'businesses',   label: 'Our Service'     },
  { id: 'partnerships', label: 'Trusted Network' },
  { id: 'contact',      label: 'Contact Us'      },
]

const corporateLinks: { to?: string; href?: string; label: string }[] = [
  { to: '/about-us',                       label: 'Group Profile'          },
  { to: '/about/our-story',                label: 'Our Story'              },
  { to: '/contact',                        label: 'Contact Network'        },
  { to: '/leadership/management',          label: 'Our Management'         },
  { to: '/community/blog',                 label: 'Blog'                   },
  { to: '/community/sustainable-growth',   label: 'Sustainable Growth'     },
  { to: '/community/community-care',       label: 'Community Care'         },
  { to: '/community/careers',              label: 'Careers'                },
  { href: 'https://ygiusllc.com/',         label: 'Yanabiya E-Commerce ↗'  },
]

const FLAG: Record<string, string> = { OM: '🇴🇲', GB: '🇬🇧', BD: '🇧🇩', US: '🇺🇸' }

const linkClass =
  'relative inline-block text-white hover:text-white transition-colors ' +
  'after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-px ' +
  'after:w-full after:bg-brand-accent after:scale-x-0 after:origin-left ' +
  'after:transition-transform after:duration-300 hover:after:scale-x-100'

function AddressCard({ c, isHQ }: { c: CountryContact; isHQ?: boolean }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3 hover:border-brand-accent/30 hover:bg-white/[0.07] transition-all duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl leading-none">{FLAG[c.code]}</span>
        <span className="text-sm font-semibold text-white">{c.region}</span>
        {isHQ && (
          <span className="ml-auto text-[8px] uppercase tracking-wider bg-brand-accent/25 text-brand-accent px-2 py-0.5 rounded-full font-bold border border-brand-accent/30">
            HQ
          </span>
        )}
      </div>

      {/* Address */}
      <div className="flex items-start gap-2 mb-2.5">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 mt-0.5 hover:scale-125 transition-transform"
          title="Open in Google Maps"
        >
          <MapPin size={11} className="text-red-400" />
        </a>
        <div className="text-[11px] text-white leading-snug space-y-0.5">
          {c.code === 'OM' ? (
            <>
              <p className="text-[8px] uppercase tracking-wider text-white font-semibold">Postal Address</p>
              {c.postAddress.split('\n').map((line, i) => <p key={i} className="text-white">{line}</p>)}
              <p className="text-[8px] uppercase tracking-wider text-white font-semibold pt-1">Head Office</p>
              {c.officeAddress.split('\n').map((line, i) => <p key={i} className="text-white">{line}</p>)}
            </>
          ) : (
            <>
              {c.officeAddress.split('\n').map((line, i) => <p key={i} className="text-white">{line}</p>)}
              {c.postAddress && c.postAddress.split('\n').map((line, i) => <p key={i} className="text-white">{line}</p>)}
            </>
          )}
        </div>
      </div>

      {/* Phone */}
      {c.phones[0] && (
        <div className="flex items-center gap-2 mb-1.5">
          <Phone size={10} className="text-emerald-400 shrink-0" />
          <a href={`tel:${c.phones[0].replace(/\s/g, '')}`} className="text-[11px] text-white hover:text-white transition-colors">
            {c.phones[0]}
          </a>
        </div>
      )}

      {/* Email */}
      {c.emails[0] && (
        <div className="flex items-start gap-2">
          <AtSign size={10} className="text-sky-400 shrink-0 mt-0.5" />
          <a href={`mailto:${c.emails[0]}`} className="text-[11px] text-white hover:text-white transition-colors break-all">
            {c.emails[0]}
          </a>
        </div>
      )}
    </div>
  )
}

export default function Footer() {
  const year = 2021
  const location = useLocation()
  const navigate = useNavigate()

  const handleHashClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const scrollToHash = () => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (location.pathname === '/') {
      scrollToHash()
    } else {
      navigate('/')
      window.setTimeout(scrollToHash, 80)
    }
  }

  const om = contactByCountry.find(c => c.code === 'OM')!
  const gb = contactByCountry.find(c => c.code === 'GB')!
  const bd = contactByCountry.find(c => c.code === 'BD')!
  const us = contactByCountry.find(c => c.code === 'US')!

  return (
    <footer className="bg-brand-accentDark text-white mt-4 pt-3">
      <div className="relative bg-brand-deep overflow-hidden">

        {/* Watermark */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
          <img src={assets.logo} alt="" className="w-[55%] max-w-[640px] opacity-[0.05] object-contain" />
        </div>

        {/* ── SUBSCRIPTION BAR (top) ── */}
        <div className="relative border-b border-white/10">
          <div className="container-x py-3 flex flex-col items-center gap-2 text-center">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-brand-accent font-semibold">Newsletter</p>
              <p className="text-xs text-white mt-0.5">Stay updated with Yanabiya Group news &amp; insights</p>
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center w-full max-w-sm">
              <input
                type="email"
                required
                placeholder="Your email address"
                className="flex-1 bg-white/10 border border-white/15 rounded-l-full px-3 py-1.5 text-xs
                           text-white placeholder:text-white/40
                           focus:outline-none focus:border-brand-accent focus:bg-white/15 transition"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-1 rounded-r-full bg-brand-accent text-white
                           px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider
                           hover:brightness-110 transition whitespace-nowrap"
              >
                Subscribe <Send size={11} />
              </button>
            </form>
          </div>
        </div>

        {/* ── MAIN 3-COLUMN LAYOUT ── */}
        <div className="relative container-x py-5 grid grid-cols-12 gap-4 items-start">

          {/* LEFT — Oman + UK */}
          <div className="col-span-12 md:col-span-4 space-y-3">
            <AddressCard c={om} isHQ />
            <AddressCard c={gb} />
          </div>

          {/* CENTER — Brand */}
          <div className="col-span-12 md:col-span-4 flex flex-col items-center text-center px-2">
            <Link to="/" className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-xl bg-white grid place-items-center shadow-xl ring-2 ring-white/20 group-hover:ring-brand-accent/50 transition-all">
                <img src={assets.logo} alt="Yanabiya Group" className="h-9 w-auto object-contain" />
              </div>
              <div>
                <div className="font-serif text-xl text-white leading-tight group-hover:text-brand-accent transition-colors">
                  Yanabiya Group
                </div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-brand-accent mt-0.5 font-semibold">
                  Global Enterprise Platform
                </div>
              </div>
            </Link>

            <p className="mt-2 text-[11px] text-white leading-relaxed max-w-[210px]">
              Building &amp; operating high-impact ventures across technology, trade, talent and consulting — worldwide.
            </p>

            {/* Divider */}
            <div className="mt-3 w-12 h-px bg-brand-accent/40" />

            {/* Social icons */}
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-brand-accent text-white
                             grid place-items-center transition-all duration-200
                             hover:scale-110 hover:shadow-[0_0_18px_rgba(158,199,58,0.45)]"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="mt-3 w-full border-t border-white/10 pt-3">
              <p className="text-[9px] uppercase tracking-[0.2em] text-brand-accent font-semibold mb-2">Quick Links</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px]">
                {groupLinks.map((l) => (
                  <a
                    key={l.id}
                    href={`/#${l.id}`}
                    onClick={(e) => handleHashClick(e, l.id)}
                    className={linkClass}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Bangladesh + USA */}
          <div className="col-span-12 md:col-span-4 space-y-3">
            <AddressCard c={bd} />
            <AddressCard c={us} />
          </div>
        </div>

        {/* ── CORPORATE NAV ROW ── */}
        <div className="relative border-t border-white/10">
          <div className="container-x py-2.5 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
            {corporateLinks.map((l) => (
              <span key={l.href ?? l.to} className="text-[10px]">
                {l.href
                  ? <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{l.label}</a>
                  : <Link to={l.to!} className={linkClass}>{l.label}</Link>
                }
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ── BOTTOM STRIP ── */}
      <div className="bg-black/40 w-full">
        <div className="container-x py-2 flex flex-row flex-wrap items-center justify-between gap-2 text-[10px] text-white/70">
          <span>© {year} Yanabiya Group. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/about-us" className={linkClass}>Group Profile</Link>
            <a href={`mailto:${contact.emails[0]}`} className={linkClass}>{contact.emails[0]}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
