import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import ar from './locales/ar.json'
import bn from './locales/bn.json'
import ur from './locales/ur.json'

export const languages = [
  { code: 'en', label: 'English', native: 'English', dir: 'ltr', flag: '🇬🇧' },
  { code: 'ar', label: 'Arabic',  native: 'العربية', dir: 'rtl', flag: '🇴🇲' },
  { code: 'bn', label: 'Bangla',  native: 'বাংলা',   dir: 'ltr', flag: '🇧🇩' },
  { code: 'ur', label: 'Urdu',    native: 'اردو',    dir: 'rtl', flag: '🇵🇰' },
] as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      bn: { translation: bn },
      ur: { translation: ur },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar', 'bn', 'ur'],
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
