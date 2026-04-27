export const contact = {
  address: 'Al-Khuwair, Muscat, Sultanate of Oman',
  poBox: 'P.O. Box: 1432, Postal Code: 133',
  phones: ['+968 2249 5566'],
  mobile: '+968 9116 1677',
  emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
  webmail: 'https://webmail.yanabiyagroup.com/',
  hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM',
}

// Per-country contact details. Addresses/flags/names come from `data/countries.ts`
// (shared source of truth). This file layers in phones, emails, hours, websites,
// and registration metadata per country, keyed by ISO code.
export type CountryContact = {
  code: 'OM' | 'GB' | 'BD' | 'US'
  legalName: string
  registration: { label: string; value: string }
  established: string
  phones: string[]
  mobile?: string
  /** Active WhatsApp endpoint, when different from `mobile`. */
  whatsapp?: string
  emails: string[]
  websites: string[]
  hours: string
  mapQuery: string
  poBox?: string
}

export const contactByCountry: CountryContact[] = [
  {
    code: 'OM',
    legalName: 'Yanabiya Gulf International Business and Trade SPC',
    registration: { label: 'Commercial Registration', value: '1395664' },
    established: '19 September 2021',
    phones: ['+968 2249 5566'],
    mobile: '+968 9116 1677',
    whatsapp: '+968 9116 1677',
    emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
    websites: ['www.yanabiyagroup.com'],
    hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM (GST)',
    mapQuery: 'Office-41, 4th Floor, Building-846, Way-4011, Al Gubrah, Bushar, Muscat, Oman',
    poBox: 'P.O. Box: 1432, Postal Code: 133',
  },
  {
    code: 'GB',
    legalName: 'Yanabiya Gulf International UK Ltd',
    registration: { label: 'Company No', value: '14907791' },
    established: '1 June 2023',
    phones: ['+44 7988 518877'],
    mobile: '+44 7988 518877',
    emails: ['info@yanabiya.com', 'info@yanabiyagibt.com'],
    websites: ['www.yanabiya.com', 'www.yanabiyagibt.com'],
    hours: 'Monday – Friday, 9:00 AM – 6:00 PM (GMT)',
    mapQuery: '167-169 Great Portland Street, 5th Floor, London W1W 5PF, UK',
  },
  {
    code: 'BD',
    legalName: 'Yanabiya Gulf International BD Trade',
    registration: { label: 'Trade License', value: 'TRAD/DNCC/100677/1998' },
    established: '17 November 1998',
    phones: ['+880 1711 030489'],
    mobile: '+880 1971 161677',
    emails: ['info@yanabiyabd.com'],
    websites: ['www.yanabiyabd.com'],
    hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (BST)',
    mapQuery: 'Office #211, Plot #322/B, Kanchkura, Uttarkhan, Dhaka 1230, Bangladesh',
  },
  {
    code: 'US',
    legalName: 'Yanabiya Gulf International US LLC',
    registration: { label: 'File No', value: '806163411' },
    established: '11 August 2025',
    phones: ['+1 512 355 5715'],
    mobile: '+1 512 355 5715',
    emails: ['info@yanabiyaus.com', 'info@ygiusllc.com'],
    websites: ['www.yanabiyaus.com', 'www.ygiusllc.com'],
    hours: 'Monday – Friday, 9:00 AM – 5:00 PM (CT)',
    mapQuery: '5900 Balcones Drive #18651, Austin, TX 78731, USA',
  },
]

/** Group-wide always-on WhatsApp endpoint. */
export const groupWhatsApp = '+968 9116 1677'

// Single-page navbar — each link scrolls to a section anchor on the same page.
export const sections = [
  { id: 'home',         tKey: 'nav.home' },
  { id: 'about',        tKey: 'nav.about' },
  { id: 'businesses',   tKey: 'nav.businesses' },
  { id: 'solutions',    tKey: 'nav.solutions' },
  { id: 'partnerships', tKey: 'nav.partnerships' },
  { id: 'global',       tKey: 'nav.global' },
  { id: 'csr',          tKey: 'nav.csr' },
  { id: 'network',      tKey: 'nav.network' },
  { id: 'leadership',   tKey: 'nav.leadership' },
  { id: 'strategy',     tKey: 'nav.strategy' },
  { id: 'insights',     tKey: 'nav.insights' },
  { id: 'careers',      tKey: 'nav.careers' },
  { id: 'contact',      tKey: 'nav.contact' },
] as const
