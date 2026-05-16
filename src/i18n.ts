import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ar from './locales/ar.json'
import bn from './locales/bn.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import es from './locales/es.json'
import it from './locales/it.json'
import pt from './locales/pt.json'
import nl from './locales/nl.json'
import pl from './locales/pl.json'
import ru from './locales/ru.json'
import sv from './locales/sv.json'

export type LanguageMeta = {
  code: string
  label: string
  native: string
  dir: 'ltr' | 'rtl'
  flag: string
  region: 'gulf' | 'europe' | 'asia' | 'global'
}

export const languages: LanguageMeta[] = [
  // Global / default
  { code: 'en',    label: 'English (UK)',     native: 'English (UK)',  dir: 'ltr', flag: '🇬🇧', region: 'global' },
  { code: 'en-US', label: 'English (US)',     native: 'English (US)',  dir: 'ltr', flag: '🇺🇸', region: 'global' },
  // Gulf
  { code: 'ar', label: 'Arabic', native: 'العربية', dir: 'rtl', flag: '🇴🇲', region: 'gulf' },
  // Europe
  { code: 'fr',    label: 'French',           native: 'Français',     dir: 'ltr', flag: '🇫🇷', region: 'europe' },
  { code: 'de',    label: 'German',           native: 'Deutsch',      dir: 'ltr', flag: '🇩🇪', region: 'europe' },
  { code: 'es',    label: 'Spanish',          native: 'Español',      dir: 'ltr', flag: '🇪🇸', region: 'europe' },
  { code: 'it',    label: 'Italian',          native: 'Italiano',     dir: 'ltr', flag: '🇮🇹', region: 'europe' },
  { code: 'pt',    label: 'Portuguese',       native: 'Português',    dir: 'ltr', flag: '🇵🇹', region: 'europe' },
  { code: 'nl',    label: 'Dutch',            native: 'Nederlands',   dir: 'ltr', flag: '🇳🇱', region: 'europe' },
  { code: 'pl',    label: 'Polish',           native: 'Polski',       dir: 'ltr', flag: '🇵🇱', region: 'europe' },
  { code: 'ru',    label: 'Russian',          native: 'Русский',      dir: 'ltr', flag: '🇷🇺', region: 'europe' },
  { code: 'sv',    label: 'Swedish',          native: 'Svenska',      dir: 'ltr', flag: '🇸🇪', region: 'europe' },
  // Asia
  { code: 'bn',    label: 'Bengali',          native: 'বাংলা',        dir: 'ltr', flag: '🇧🇩', region: 'asia'   },
]

const supportedLngs = languages.map(l => l.code)

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en:      { translation: en },
      'en-US': { translation: en },
      ar:    { translation: ar },
      bn:    { translation: bn },
      fr:    { translation: fr },
      de:    { translation: de },
      es:    { translation: es },
      it:    { translation: it },
      pt:    { translation: pt },
      nl:    { translation: nl },
      pl:    { translation: pl },
      ru:    { translation: ru },
      sv:    { translation: sv },
    },
    fallbackLng: 'en',
    supportedLngs,
    interpolation: { escapeValue: false },
    detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] },
  })

const applyDir = (lng: string) => {
  const meta = languages.find((l) => l.code === lng) ?? languages[0]
  document.documentElement.dir = meta.dir
  document.documentElement.lang = meta.code
}

applyDir(i18n.language)
i18n.on('languageChanged', applyDir)

export default i18n
