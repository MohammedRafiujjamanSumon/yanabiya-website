import { useTranslation } from 'react-i18next'
import { contact, sections } from '../data/contact'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="bg-brand-deep text-white mt-20">
      <div className="container-x py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-serif text-xl text-white mb-2">Yanabiya Group</div>
          <p className="text-sm text-white/70 leading-relaxed">
            A global group of companies — connecting Bangladesh, the United Kingdom,
            Oman and the USA through technology, trade and talent.
          </p>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-brand-accent mb-4">Explore</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {sections.slice(0, 7).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className="hover:text-brand-accent transition-colors">{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-brand-accent mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {sections.slice(7).map((l) => (
              <li key={l.id}><a href={`#${l.id}`} className="hover:text-brand-accent transition-colors">{t(l.tKey)}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm uppercase tracking-widest text-brand-accent mb-4">{t('nav.contact')}</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><MapPin size={14} className="mt-1 text-brand-accent shrink-0" /> {contact.address}</li>
            <li className="flex gap-2"><Phone size={14} className="mt-1 text-brand-accent shrink-0" /> {contact.mobile}</li>
            <li className="flex gap-2"><Mail size={14} className="mt-1 text-brand-accent shrink-0" /> {contact.emails[0]}</li>
            <li className="flex gap-2"><Clock size={14} className="mt-1 text-brand-accent shrink-0" /> {contact.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col md:flex-row items-center justify-between text-xs text-white/60">
          <div>© {new Date().getFullYear()} Yanabiya Group. {t('footer.rights')}</div>
          <div>{t('footer.stamp')}</div>
        </div>
      </div>
    </footer>
  )
}
