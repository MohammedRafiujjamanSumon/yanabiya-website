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
// (shared source of truth). This file layers in phones, emails, hours, and map
// queries per country, keyed by ISO code.
export type CountryContact = {
  code: 'OM' | 'GB' | 'BD' | 'US'
  phones: string[]
  mobile?: string
  emails: string[]
  hours: string
  mapQuery: string
  poBox?: string
}

export const contactByCountry: CountryContact[] = [
  {
    code: 'OM',
    phones: ['+968 2249 5566'],
    mobile: '+968 9116 1677',
    emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
    hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM (GST)',
    mapQuery: 'Al-Khuwair, Muscat, Oman',
    poBox: 'P.O. Box: 1432, Postal Code: 133',
  },
  {
    code: 'GB',
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday – Friday, 9:00 AM – 6:00 PM (GMT)',
    mapQuery: '167-169 Great Portland Street, London W1W 5PF, UK',
  },
  {
    code: 'BD',
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (BST)',
    mapQuery: 'Uttarkhan, Dhaka 1230, Bangladesh',
  },
  {
    code: 'US',
    phones: [],
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday – Friday, 9:00 AM – 5:00 PM (CT)',
    mapQuery: '5900 Balcones Drive, Austin, TX 78731, USA',
  },
]

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
