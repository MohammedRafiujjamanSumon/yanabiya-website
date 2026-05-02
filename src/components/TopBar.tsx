import { Phone, Mail, Download, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { contact } from '../data/contact'

export default function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="bg-brand-50 text-xs text-brand-deep border-b border-brand-deep/10">
      {/* Row — phone + email left, tagline middle, Download PDF + Contact Us right */}
      <div className="container-x grid grid-cols-1 md:grid-cols-3 md:items-center gap-1.5 md:gap-4 py-2">
        <div className="flex items-center justify-center md:justify-start gap-2 whitespace-nowrap">
          <a
            href={`tel:${contact.mobile.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       hover:bg-brand-deep hover:text-white transition"
          >
            <Phone size={14} /> <span>{contact.mobile}</span>
          </a>
          <a
            href={`mailto:${contact.emails[0]}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       hover:bg-brand-deep hover:text-white transition"
          >
            <Mail size={14} /> <span>{contact.emails[0]}</span>
          </a>
        </div>
        <div className="text-center tracking-wide text-brand-deep/80 font-medium whitespace-nowrap">
          <span className="inline-flex items-center px-3 py-1 rounded-full hover:bg-brand-deep hover:text-white transition cursor-default">
            {t('topbar.tagline')}
          </span>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-2 whitespace-nowrap">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       hover:bg-brand-deep hover:text-white transition"
          >
            <Download size={14} /> <span>{t('topbar.downloadPdf')}</span>
          </a>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
                       bg-brand-deep text-white font-semibold
                       hover:bg-brand-accentDark transition"
          >
            {t('nav.contact')} <ArrowRight size={14} className="ltr-flip" />
          </Link>
        </div>
      </div>
    </div>
  )
}
