const BASE = import.meta.env.BASE_URL

export const partners = [
  { name: 'Amazon Web Services', logo: `${BASE}logos/partners/aws.png` },
  { name: 'Microsoft',           logo: `${BASE}logos/partners/ms.png`  },
  { name: 'Oracle',              logo: `${BASE}logos/partners/oracle.png` },
  { name: 'SAP',                 logo: `${BASE}logos/partners/sap.png` },
  { name: 'Adobe',               logo: `${BASE}logos/partners/adobe.png` },
  { name: 'Dell',                logo: `${BASE}logos/partners/dell.png` },
  { name: 'HP',                  logo: `${BASE}logos/partners/hp.png`  },
  { name: 'Huawei',              logo: `${BASE}logos/partners/huawei.png` },
  { name: 'Cisco',               logo: `${BASE}logos/partners/cisco.png` },
  { name: 'Google Cloud',        logo: `${BASE}logos/partners/gc.png`  },
]

export const valuableClients = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18].map((n) => ({
  name: `Client ${n}`,
  logo: `${BASE}logos/clients/${n}.png`,
}))

export const ukValuableClients = [1, 2, 3, 4, 5, 6, 7].map((n) => ({
  name: `Valuable Client ${n}`,
  logo: `${BASE}logos/uk-clients/${n}.png`,
}))

export const memberships = [
  { name: 'Membership 1', logo: `${BASE}logos/mb/1.png` },
  { name: 'Membership 2', logo: `${BASE}logos/mb/2.png` },
  { name: 'Membership 3', logo: `${BASE}logos/mb/3.png` },
]

export const affiliations = [
  { name: 'Affiliation 1', logo: `${BASE}logos/mb/4.png` },
  { name: 'Affiliation 2', logo: `${BASE}logos/mb/5.png` },
  { name: 'Affiliation 3', logo: `${BASE}logos/mb/6.png` },
]
