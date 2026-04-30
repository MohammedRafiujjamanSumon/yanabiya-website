import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Send,
  Linkedin, Facebook, Instagram, Twitter, Youtube,
  Globe2,
} from 'lucide-react'
import { contact } from '../data/contact'
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

const corporateLinks: { to: string; label: string }[] = [
  { to: '/about-us',                       label: 'Group Profile'              },
  { to: '/about/our-story',                label: 'Our Story'                  },
  { to: '/contact',                        label: 'Contact Network'            },
  { to: '/leadership/management',          label: 'Our Management'             },
  { to: '/leadership/professionals',       label: 'High Skilled Professionals' },
  { to: '/community/blog',                 label: 'Blog'                       },
  { to: '/community/sustainable-growth',   label: 'Sustainable Growth'         },
  { to: '/community/community-care',       label: 'Community Care'             },
  { to: '/community/careers',              label: 'Careers'                    },
]

const linkClass =
  'relative inline-block text-white/80 hover:text-white transition-colors ' +
  'after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-px ' +
  'after:w-full after:bg-brand-accent after:scale-x-0 after:origin-left ' +
  'after:transition-transform after:duration-300 hover:after:scale-x-100'

export default function Footer() {
  const year = new Date().getFullYear()
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

  return (
    <footer className="bg-brand-deep text-white mt-24 pt-2">
      {/* Footer pattern:
       *    pt-2     → top green strip   (footer bg shows through)
       *    bg-black → main body (links, contact, newsletter, watermark)
       *    bottom   → green strip carrying the copyright row
       */}
      <div className="relative bg-black overflow-hidden">

      {/* Subtle Yanabiya logo watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <img
          src={assets.logo}
          alt=""
          className="w-[55%] max-w-[640px] opacity-[0.04] object-contain"
        />
      </div>

      {/* MAIN GRID — Brand + Group + Corporate + Contact */}
      <div className="container-x py-14 relative grid gap-12 md:grid-cols-12">

        {/* Brand + about + newsletter */}
        <div className="md:col-span-12 lg:col-span-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-white grid place-items-center shadow ring-2 ring-white/20">
              <img src={assets.logo} alt="Yanabiya Group" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <div className="font-serif text-xl text-white leading-tight group-hover:text-brand-accent transition-colors">
                Yanabiya Group
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mt-0.5">
                Global Enterprise Platform
              </div>
            </div>
          </Link>
          <p className="mt-4 text-sm text-white/70 leading-snug">
            A trusted international group of companies — building, scaling, and operating
            high-impact ventures across technology, trade, talent and consulting.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="Subscribe to group updates"
              className="flex-1 bg-white/10 border border-white/15 rounded-l-full px-4 py-2.5 text-sm
                         text-white placeholder:text-white/50
                         focus:outline-none focus:border-brand-accent focus:bg-white/15 transition"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-r-full bg-brand-accent text-white
                         px-4 py-2.5 text-xs font-semibold uppercase tracking-wider
                         hover:bg-brand-accentDark transition-colors"
            >
              Join <Send size={14} />
            </button>
          </form>
        </div>

        {/* Group — on-page sections */}
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Group</h4>
          <ul className="space-y-2.5 text-sm">
            {groupLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`/#${l.id}`}
                  onClick={(e) => handleHashClick(e, l.id)}
                  className={linkClass}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate — real subpages */}
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Corporate</h4>
          <ul className="space-y-2.5 text-sm">
            {corporateLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={linkClass}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + socials */}
        <div className="md:col-span-6 lg:col-span-4">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <MapPin size={14} className="text-brand-accent" />
              </span>
              <div className="text-white/85 leading-snug">
                <div className="font-semibold">{contact.poBox}</div>
                <div className="text-white/75 text-sm mt-0.5">{contact.address}</div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <Phone size={14} className="text-brand-accent" />
              </span>
              <div className="space-y-0.5">
                {contact.phones.map((p) => (
                  <a
                    key={p}
                    href={`tel:${p.replace(/\s/g, '')}`}
                    className="block text-white/85 hover:text-white transition-colors"
                  >
                    {p}
                  </a>
                ))}
                <a
                  href={`tel:${contact.mobile.replace(/\s/g, '')}`}
                  className="block text-white/85 hover:text-white transition-colors"
                >
                  {contact.mobile}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <Mail size={14} className="text-brand-accent" />
              </span>
              <div className="space-y-0.5">
                {contact.emails.map((e) => (
                  <a
                    key={e}
                    href={`mailto:${e}`}
                    className="block text-white/85 hover:text-white transition-colors break-all"
                  >
                    {e}
                  </a>
                ))}
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <Globe2 size={14} className="text-brand-accent" />
              </span>
              <a
                href={contact.webmail}
                target="_blank"
                rel="noreferrer"
                className="text-white/85 hover:text-white transition-colors break-all"
              >
                Webmail Portal
              </a>
            </li>
          </ul>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-3 font-semibold">Follow the Group</div>
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-accent text-white
                             grid place-items-center transition-all duration-200
                             hover:scale-110 hover:shadow-[0_0_20px_rgba(158,199,58,0.5)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* BOTTOM GREEN STRIP — copyright + legal. Sits ON the green
       *  margin so the row reads as the closing band of the page,
       *  separated from the black footer body above. */}
      <div className="container-x py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/85">
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start text-center md:text-left">
          <span>
            © {year} Yanabiya Group · Since 2021 · All rights reserved.
          </span>
        </div>
        <div className="flex items-center gap-5">
          <Link to="/about-us" className={linkClass}>Group Profile</Link>
          <a
            href={`mailto:${contact.emails[0]}`}
            className={linkClass}
          >
            {contact.emails[0]}
          </a>
        </div>
      </div>
    </footer>
  )
}
