import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Send,
  Linkedin, Facebook, Instagram, Twitter, Youtube,
} from 'lucide-react'
import { contact, sections } from '../data/contact'
import { assets } from '../data/assets'

const socials = [
  { Icon: Linkedin,  href: '#', label: 'LinkedIn'  },
  { Icon: Facebook,  href: '#', label: 'Facebook'  },
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Twitter,   href: '#', label: 'Twitter / X' },
  { Icon: Youtube,   href: '#', label: 'YouTube'   },
]

const linkClass =
  'relative inline-block text-white/80 hover:text-white transition-colors ' +
  'after:content-[""] after:absolute after:left-0 after:-bottom-0.5 after:h-px ' +
  'after:w-full after:bg-brand-accent after:scale-x-0 after:origin-left ' +
  'after:transition-transform after:duration-300 hover:after:scale-x-100'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-brand-deep text-white mt-24 overflow-hidden fade-up">
      {/* Subtle animated logo watermark in background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <img
          src={assets.logo}
          alt=""
          className="w-[60%] max-w-[700px] opacity-[0.04] object-contain"
        />
      </div>

      {/* Top — generous py-20 (80px) */}
      <div className="container-x py-20 relative grid gap-12 md:grid-cols-12">

        {/* Brand + about + newsletter */}
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white grid place-items-center shadow ring-2 ring-white/20">
              <img src={assets.logo} alt="Yanabiya Group" className="h-7 w-auto object-contain" />
            </div>
            <div className="font-serif text-xl text-white">Yanabiya Group</div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            A diversified global enterprise — connecting Oman, the United Kingdom,
            Bangladesh and the United States through technology, trade and talent.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center gap-0 max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="Your email"
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
              Subscribe <Send size={14} />
            </button>
          </form>
        </div>

        {/* Explore + Company */}
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            {sections.slice(0, 7).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className={linkClass}>{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {sections.slice(7).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className={linkClass}>{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact details + socials */}
        <div className="md:col-span-12 lg:col-span-4">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Get in Touch</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <Mail size={14} className="text-brand-accent" />
              </span>
              <a href={`mailto:${contact.emails[0]}`} className="text-white/85 hover:text-white transition-colors break-all">
                {contact.emails[0]}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <Phone size={14} className="text-brand-accent" />
              </span>
              <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="text-white/85 hover:text-white transition-colors">
                {contact.mobile}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-white/10 grid place-items-center">
                <MapPin size={14} className="text-brand-accent" />
              </span>
              <span className="text-white/85">{contact.address}</span>
            </li>
          </ul>

          {/* Socials — hover scale 1.1x + soft glow */}
          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-3 font-semibold">Follow Us</div>
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
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

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div>© {year} Yanabiya Group. All Rights Reserved.</div>
          <div className="flex items-center gap-5">
            <Link to="/privacy"           className={linkClass}>Privacy Policy</Link>
            <Link to="/terms"             className={linkClass}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
