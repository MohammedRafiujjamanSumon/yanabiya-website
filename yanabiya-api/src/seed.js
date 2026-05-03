require('dotenv').config()
const { getAdmin, createAdmin } = require('./models/Admin')
const { getSection, setSection } = require('./models/Content')

const defaultContent = [
  {
    key: 'contact',
    data: {
      offices: [
        {
          code: 'OM', region: 'Sultanate of Oman',
          legalName: 'Yanabiya Gulf International Business and Trade SPC',
          officeAddress: 'Office-41, 4th Floor, Building-846, Way-4011, Complex-240, Al Gubrah, Bushar, Muscat',
          postAddress: 'P.O. Box 1432, PC-133, Al Khuwair, Muscat',
          phones: ['+968 2249 5566'], mobile: '+968 9116 1677',
          emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
          hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM (GST)',
        },
        {
          code: 'GB', region: 'United Kingdom',
          legalName: 'Yanabiya Gulf International UK Ltd',
          officeAddress: '124 City Road, London, EC1V 2NX', postAddress: '',
          phones: ['+44 7741 432195'], mobile: '',
          emails: ['uk@yanabiyagroup.com'],
          hours: 'Monday – Friday, 9:00 AM – 5:00 PM (GMT)',
        },
        {
          code: 'BD', region: 'Bangladesh',
          legalName: 'Yanabiya Gulf International BD Ltd',
          officeAddress: 'House-7, Road-2, Sector-3, Uttara, Dhaka-1230', postAddress: '',
          phones: ['+880 1897-456789'], mobile: '',
          emails: ['bd@yanabiyagroup.com'],
          hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (BST)',
        },
        {
          code: 'US', region: 'United States',
          legalName: 'Yanabiya Gulf International USA LLC',
          officeAddress: '30 N Gould St, Ste R, Sheridan, WY 82801', postAddress: '',
          phones: ['+1 307 269 9423'], mobile: '',
          emails: ['usa@yanabiyagroup.com'],
          hours: 'Monday – Friday, 9:00 AM – 5:00 PM (EST)',
        },
      ],
    },
  },
  {
    key: 'hero',
    data: {
      headline: 'One Group. Four Countries. Infinite Possibilities.',
      subheadline: 'Yanabiya Group is a diversified international enterprise operating across technology, trade, talent, and consulting.',
      stats: [
        { label: 'Countries', value: '4' },
        { label: 'Services', value: '20+' },
        { label: 'Partners', value: '50+' },
        { label: 'Founded', value: '2021' },
      ],
    },
  },
  {
    key: 'about',
    data: {
      intro: 'A trusted international group of companies — building, scaling, and operating high-impact ventures across technology, trade, talent and consulting.',
      pillars: [
        { title: 'Technology', body: 'Digital transformation, IT infrastructure, and software development across 4 countries.' },
        { title: 'Trade', body: 'International trading, procurement, and supply chain management.' },
        { title: 'Talent', body: 'HR consulting, recruitment, and professional training programs.' },
        { title: 'Consulting', body: 'Business strategy, management consulting, and advisory services.' },
      ],
    },
  },
  {
    key: 'partners',
    data: {
      partners: [
        { name: 'Amazon Web Services', logo: '/logos/partners/aws.png' },
        { name: 'Microsoft', logo: '/logos/partners/ms.png' },
        { name: 'Oracle', logo: '/logos/partners/oracle.png' },
        { name: 'SAP', logo: '/logos/partners/sap.png' },
        { name: 'Adobe', logo: '/logos/partners/adobe.png' },
        { name: 'Dell', logo: '/logos/partners/dell.png' },
        { name: 'HP', logo: '/logos/partners/hp.png' },
        { name: 'Huawei', logo: '/logos/partners/huawei.png' },
        { name: 'Cisco', logo: '/logos/partners/cisco.png' },
        { name: 'Google Cloud', logo: '/logos/partners/gc.png' },
      ],
      memberships: [
        { name: 'Membership 1', logo: '/logos/mb/1.png' },
        { name: 'Membership 2', logo: '/logos/mb/2.png' },
        { name: 'Membership 3', logo: '/logos/mb/3.png' },
      ],
      affiliations: [
        { name: 'Affiliation 1', logo: '/logos/mb/4.png' },
        { name: 'Affiliation 2', logo: '/logos/mb/5.png' },
        { name: 'Affiliation 3', logo: '/logos/mb/6.png' },
      ],
    },
  },
]

async function seed() {
  // Admin user
  const existing = getAdmin()
  if (!existing) {
    await createAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD, 'Yanabiya Admin')
    console.log(`✓ Admin created: ${process.env.ADMIN_EMAIL}`)
  } else {
    console.log('✓ Admin already exists')
  }

  // Default content
  for (const item of defaultContent) {
    if (!getSection(item.key)) {
      setSection(item.key, item.data)
      console.log(`✓ Seeded: ${item.key}`)
    } else {
      console.log(`  Exists: ${item.key}`)
    }
  }
  console.log('\nSeed complete — run: npm start')
}

seed().catch(err => { console.error(err); process.exit(1) })
