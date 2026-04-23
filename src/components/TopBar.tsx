import { Phone, Mail, Download, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { contact } from '../data/contact'

export default function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="bg-brand-ink border-b border-brand-accent/30 text-xs text-slate-200">
      {/* Row 1 — phone + email, right-aligned corner */}
      <div className="container-x flex items-center justify-center md:justify-end gap-4 md:gap-6 py-1.5 text-[11px]">
        <a
          href={`tel:${contact.mobile.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 hover:text-brand-accent"
        >
          <Phone size={12} /> <span>{contact.mobile}</span>
        </a>
        <a
          href={`mailto:${contact.emails[0]}`}
          className="flex items-center gap-1.5 hover:text-brand-accent"
        >
          <Mail size={12} /> <span>{contact.emails[0]}</span>
        </a>
      </div>

      {/* Row 2 — flags left, tagline middle, Download PDF + Contact Us right */}
      <div className="container-x grid grid-cols-1 md:grid-cols-3 md:items-center gap-1.5 md:gap-4 py-2 border-t border-white/10">
        <div className="flex items-center justify-center md:justify-start gap-2 text-base leading-none">
          <span aria-hidden>🇬🇧 🇴🇲 🇧🇩 🇺🇸</span>
        </div>
        <div className="text-center text-[11px] md:text-xs tracking-wide text-slate-100">
          {t('topbar.tagline')}
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 md:gap-4 flex-wrap">
          <a href="#" className="flex items-center gap-1.5 hover:text-brand-accent">
            <Download size={12} /> <span className="text-[11px] md:text-xs">{t('topbar.downloadPdf')}</span>
          </a>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       bg-brand-accent text-brand-ink text-[11px] md:text-xs font-semibold
                       hover:bg-brand-accentDark hover:text-white transition"
          >
            {t('nav.contact')} <ArrowRight size={12} className="ltr-flip" />
          </Link>
        </div>
      </div>
    </div>
  )
}
