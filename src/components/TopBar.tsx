import { Phone, Mail, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { contact } from '../data/contact'
import LanguageSwitcher from './LanguageSwitcher'

export default function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="hidden md:block bg-brand-ink border-b border-brand-accent/30 text-xs">
      <div className="container-x flex items-center justify-between py-2 text-slate-200">
        <div className="flex items-center gap-3">
          <span>🇬🇧 🇴🇲 🇧🇩 🇺🇸</span>
          <span className="opacity-60">| {t('topbar.operating')}</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-brand-accent">
            <Phone size={12} /> {contact.mobile}
          </a>
          <a href={`mailto:${contact.emails[0]}`} className="flex items-center gap-2 hover:text-brand-accent">
            <Mail size={12} /> {contact.emails[0]}
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-brand-accent">
            <Download size={12} /> {t('topbar.downloadPdf')}
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
