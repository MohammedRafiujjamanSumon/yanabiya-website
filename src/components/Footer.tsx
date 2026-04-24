import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import {
  MapPin, Phone, Mail, Send,
  Linkedin, Facebook, Instagram, Twitter, Youtube,
  Cpu, Globe2, Shirt, Handshake, Building2, Users,
  ShieldCheck, Leaf, Network, Award, Scale,
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

const groupCompanies = [
  { slug: 'it-software',       icon: Cpu,        label: 'IT & Software'           },
  { slug: 'export-import',     icon: Globe2,     label: 'Global Trade'            },
  { slug: 'clothing',          icon: Shirt,      label: 'Clothing & Accessories'  },
  { slug: 'agents-brokerage',  icon: Handshake,  label: 'Agents & Brokerage'      },
  { slug: 'office-management', icon: Building2,  label: 'Office Management'       },
  { slug: 'manpower',          icon: Users,      label: 'Global Mobility'         },
]

const trustPillars = [
  { icon: Handshake,   label: 'Long-Term Partnership'    },
  { icon: ShieldCheck, label: 'Reliable Global Operations' },
  { icon: Leaf,        label: 'Sustainable Growth'       },
  { icon: Network,     label: 'Cross-Border Collaboration' },
  { icon: Scale,       label: 'Ethical & Transparent'    },
]

const presenceCountries = [
  { flag: '🇴🇲', city: 'Muscat',  country: 'Oman',           role: 'Headquarters'      },
  { flag: '🇬🇧', city: 'London',  country: 'United Kingdom', role: 'European Operations' },
  { flag: '🇧🇩', city: 'Dhaka',   country: 'Bangladesh',     role: 'South Asia Operations' },
  { flag: '🇺🇸', city: 'Austin',  country: 'United States',  role: 'North America Operations' },
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
    <footer className="relative bg-brand-deep text-white mt-24 overflow-hidden">
      {/* Subtle Yanabiya logo watermark */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center select-none">
        <img
          src={assets.logo}
          alt=""
          className="w-[55%] max-w-[640px] opacity-[0.04] object-contain"
        />
      </div>

      {/* ───────── 1. GROUP STATEMENT — top tier */}
      <div className="relative border-b border-white/10">
        <div className="container-x py-12 text-center max-w-4xl mx-auto fade-up">
          <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-3">
            Yanabiya Group of Companies
          </div>
          <h3 className="font-serif text-2xl md:text-3xl text-white leading-tight">
            A diversified global enterprise — multiple businesses operating under one
            unified ecosystem.
          </h3>
          <p className="mt-3 text-sm text-white/70 max-w-3xl mx-auto leading-relaxed">
            Each business unit operates independently with strategic alignment under one group vision —
            built on trust, stability, and long-term value creation across international markets.
          </p>

          {/* Trust pillars row */}
          <div className="mt-6 flex items-center justify-center flex-wrap gap-2.5">
            {trustPillars.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5
                           px-3 py-1.5 text-[11px] font-medium text-white/85"
              >
                <Icon size={12} className="text-brand-accent" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── 2. OUR GROUP OF COMPANIES — business divisions */}
      <div className="relative border-b border-white/10">
        <div className="container-x py-10 fade-up">
          <div className="text-center mb-6">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-2">
              Our Group of Companies
            </div>
            <p className="text-sm text-white/70">
              Six diversified business divisions powering our integrated global platform.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {groupCompanies.map(({ slug, icon: Icon, label }) => (
              <Link
                key={slug}
                to={`/business/${slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5
                           px-3 py-4 text-center
                           hover:border-brand-accent/60 hover:bg-white/10 hover:-translate-y-0.5
                           transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-accent/15 text-brand-accent grid place-items-center
                                group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Icon size={18} />
                </div>
                <div className="text-[12px] font-medium text-white/90 leading-tight">{label}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── 3. GLOBAL PRESENCE — country network */}
      <div className="relative border-b border-white/10">
        <div className="container-x py-10 fade-up">
          <div className="text-center mb-6">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-2">
              Global Presence
            </div>
            <p className="text-sm text-white/70">
              One coordinated global network — not separate offices.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {presenceCountries.map((c) => (
              <div
                key={c.country}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="text-2xl shrink-0">{c.flag}</div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-white leading-tight truncate">
                    {c.city}, {c.country}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-accent">{c.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ───────── 4. NAVIGATION + CONTACT — main grid */}
      <div className="container-x py-14 relative grid gap-12 md:grid-cols-12 fade-up">

        {/* Brand + about + newsletter */}
        <div className="md:col-span-12 lg:col-span-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white grid place-items-center shadow ring-2 ring-white/20">
              <img src={assets.logo} alt="Yanabiya Group" className="h-7 w-auto object-contain" />
            </div>
            <div>
              <div className="font-serif text-xl text-white leading-tight">Yanabiya Group</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-brand-accent mt-0.5">
                Global Enterprise Platform
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            A trusted international group of companies — building, scaling, and operating
            high-impact ventures across technology, trade, talent and consulting.
          </p>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-center gap-0 max-w-sm"
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

        {/* Explore */}
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Group</h4>
          <ul className="space-y-2.5 text-sm">
            {sections.slice(0, 5).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className={linkClass}>{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div className="md:col-span-3 lg:col-span-2">
          <h4 className="text-xs uppercase tracking-widest text-brand-accent mb-4 font-semibold">Corporate</h4>
          <ul className="space-y-2.5 text-sm">
            {sections.slice(5).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className={linkClass}>{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>

        {/* Contact + socials */}
        <div className="md:col-span-6 lg:col-span-4">
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

          <div className="mt-6">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-3 font-semibold">Follow the Group</div>
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

      {/* ───────── 5. BOTTOM BAR — corporate trust line + legal */}
      <div className="relative border-t border-white/10 bg-black/15">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
            <Award size={12} className="text-brand-accent" />
            <span>© {year} Yanabiya Group. All Rights Reserved.</span>
            <span className="hidden md:inline text-white/30">·</span>
            <span className="text-white/50">A trusted international enterprise group.</span>
          </div>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className={linkClass}>Privacy Policy</Link>
            <Link to="/terms"   className={linkClass}>Terms of Service</Link>
            <Link to="/about-us" className={linkClass}>Group Profile</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
