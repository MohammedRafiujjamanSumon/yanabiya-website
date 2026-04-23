import { Phone, Mail, Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { contact } from '../data/contact'
import LanguageSwitcher from './LanguageSwitcher'

export default function TopBar() {
  const { t } = useTranslation()
  return (
    <div className="bg-black border-b border-brand-accent/30 text-xs">
      <div className="container-x flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-0 py-2 text-slate-200">
        <div className="flex items-center justify-center md:justify-start gap-2 md:gap-3 flex-wrap">
          <span>🇬🇧 🇴🇲 🇧🇩 🇺🇸</span>
          <span className="opacity-60 hidden sm:inline">| {t('topbar.operating')}</span>
        </div>
        <div className="flex items-center justify-center md:justify-end gap-3 md:gap-5 flex-wrap">
          <a href={`tel:${contact.mobile.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-brand-accent">
            <Phone size={12} /> <span className="text-[11px] md:text-xs">{contact.mobile}</span>
          </a>
          <a href={`mailto:${contact.emails[0]}`} className="flex items-center gap-1.5 hover:text-brand-accent">
            <Mail size={12} /> <span className="text-[11px] md:text-xs hidden sm:inline">{contact.emails[0]}</span>
            <span className="text-[11px] md:text-xs sm:hidden">Email</span>
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-brand-accent">
            <Download size={12} /> <span className="text-[11px] md:text-xs">{t('topbar.downloadPdf')}</span>
          </a>
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  )
}
