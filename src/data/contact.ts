export const contact = {
  address: 'Al-Khuwair, Muscat, Sultanate of Oman',
  poBox: 'P.O. Box: 1432, Postal Code: 133',
  phones: ['+968 2249 5566', '+968 2267 8669'],
  mobile: '+968 9116 1677',
  emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
  webmail: 'https://webmail.yanabiyagroup.com/',
  hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM',
}

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
