export const partners = [
  { name: 'Amazon Web Services', logo: 'https://yanabiyagroup.com/img/par/aws.jpg' },
  { name: 'Microsoft', logo: 'https://yanabiyagroup.com/img/par/mslogo.jpg' },
  { name: 'Oracle', logo: 'https://yanabiyagroup.com/img/par/orcl.jpg' },
  { name: 'SAP', logo: 'https://yanabiyagroup.com/img/par/sap.jpg' },
  { name: 'Adobe', logo: 'https://yanabiyagroup.com/img/par/Adobe.jpg' },
  { name: 'Dell', logo: 'https://yanabiyagroup.com/img/par/dell.jpg' },
  { name: 'HP', logo: 'https://yanabiyagroup.com/img/par/hp.jpg' },
  { name: 'Huawei', logo: 'https://yanabiyagroup.com/img/par/Hu.jpg' },
  { name: 'Cisco', logo: 'https://yanabiyagroup.com/img/par/cis.jpg' },
  { name: 'Google Cloud', logo: 'https://yanabiyagroup.com/img/par/gc.jpg' },
]

// Valuable Clients — sourced from yanabiyagroup.com (img/par/1-18, 16 missing)
export const valuableClients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18].map((n) => ({
  name: `Client ${n}`,
  logo: `https://yanabiyagroup.com/img/par/${n}.jpg`,
}))

// Memberships — sourced from yanabiyagroup.com (img/mb/1-3)
export const memberships = [
  { name: 'Membership 1', logo: 'https://yanabiyagroup.com/img/mb/1.jpg' },
  { name: 'Membership 2', logo: 'https://yanabiyagroup.com/img/mb/2.png' },
  { name: 'Membership 3', logo: 'https://yanabiyagroup.com/img/mb/3.jpg' },
]

// Affiliations — sourced from yanabiyagroup.com (img/mb/4-6). Split out of the
// original combined "Memberships & Affiliations" set so the home page can
// surface them in their own marquee.
export const affiliations = [
  { name: 'Affiliation 1', logo: 'https://yanabiyagroup.com/img/mb/4.png' },
  { name: 'Affiliation 2', logo: 'https://yanabiyagroup.com/img/mb/5.png' },
  { name: 'Affiliation 3', logo: 'https://yanabiyagroup.com/img/mb/6.png' },
]
