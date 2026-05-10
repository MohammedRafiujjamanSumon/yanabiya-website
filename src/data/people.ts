import { assets } from './assets'
import { board as boardData, chairmanMessage, viceChairmanMessage } from './leadership'

export type PersonData = {
  id: string
  name: string
  role: string
  image: string
  tier: 'board' | 'exec' | 'country' | 'dept'
  tierLabel: string
  shortBio: string
  fullBio: string[]
  country?: string
  flag?: string
  email?: string
}

const PH = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0e2d4e&color=9ec73a&size=400&bold=true`

export const ALL_PEOPLE: PersonData[] = [
  // ── Tier 01, Board ──────────────────────────────────────────────────
  {
    id: 'shamim-ahmed',
    name: 'S M Shamim Ahmed',
    role: 'Founder, Chairman & CEO',
    image: boardData[0].photo,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Founder of Yanabiya Group, driving quality and professionalism across global markets.',
    fullBio: chairmanMessage,
  },
  {
    id: 'badar-al-shaqsi',
    name: 'Badar Humaid Salim Al-Shaqsi',
    role: 'Board Member',
    image: assets.people.badarAlShaqsi,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Board Member contributing to Yanabiya Group\'s governance and strategic direction.',
    fullBio: [
      'Badar Humaid Salim Al-Shaqsi serves on the Yanabiya Group Board, bringing leadership experience and strategic insight to the Group\'s governance framework.',
      'His involvement reflects the Group\'s commitment to building a diverse and high-calibre board that represents the full breadth of its operating markets.',
    ],
  },
  {
    id: 'ismail-sulaimani',
    name: 'Ismail Khalfan Gharib Al Sulaimani',
    role: 'Board Member',
    image: assets.people.ismailSulaimani,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Board Member supporting Yanabiya\'s governance and stakeholder engagement.',
    fullBio: [
      'Ismail Khalfan Gharib Al Sulaimani is a Board Member of Yanabiya Group, contributing his expertise to the Group\'s governance discussions and long-term strategic planning.',
      'His participation strengthens the Board\'s ability to provide effective oversight across the Group\'s four-country operations.',
    ],
  },
  {
    id: 'mohammed-al-bakri',
    name: 'Mohammed Nasser Muhannan Al Bakri',
    role: 'Board Member',
    image: assets.people.mohammedAlBakri,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Board Member helping steer Yanabiya\'s corporate vision and accountability.',
    fullBio: [
      'Mohammed Nasser Muhannan Al Bakri serves on the Yanabiya Group Board, providing governance oversight and strategic guidance that supports the Group\'s continued growth.',
      'His engagement at board level exemplifies the Group\'s dedication to principled, accountable corporate leadership.',
    ],
  },
  {
    id: 'salim-suleimani',
    name: 'Salim Saif Ahmed Al-Suleimani',
    role: 'Board Member',
    image: assets.people.salimSuleimani,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Board Member bringing regional expertise and governance leadership to Yanabiya.',
    fullBio: [
      'Salim Saif Ahmed Al-Suleimani is a Board Member of Yanabiya Group, contributing valuable regional expertise and governance experience to the Group\'s board deliberations.',
      'His presence on the board underscores the Group\'s commitment to incorporating diverse and seasoned perspectives at the highest level of leadership.',
    ],
  },
  {
    id: 'jasmin-akter',
    name: 'Jasmin Akter',
    role: 'Board Member',
    image: assets.people.jasminAkter,
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Board Member championing inclusive governance and strategic oversight.',
    fullBio: [
      'Jasmin Akter serves on the Yanabiya Group Board, bringing a thoughtful and inclusive perspective to the Group\'s governance and strategic planning discussions.',
      'Her engagement reflects the Group\'s values-driven approach to building a board that is both diverse and deeply committed to long-term organisational success.',
    ],
  },

  // ── Tier 02, Global Executive Management ────────────────────────────
  {
    id: 'abu-jaheed',
    name: 'Mohammad Abu Jaheed',
    role: 'Co-founder & Vice Chairman',
    image: boardData[1].photo,
    tier: 'board',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Co-founder championing Yanabiya\'s vision and guiding its expansion worldwide.',
    fullBio: viceChairmanMessage,
  },
  {
    id: 'momim-ahmed',
    name: 'S M Momim Ahmed',
    role: 'Managing Director',
    image: assets.people.momiimAhmed,
    tier: 'board',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Managing Director overseeing Yanabiya Group\'s core operations and strategic direction.',
    fullBio: [
      'S M Momim Ahmed serves as Managing Director of Yanabiya Group, bringing strong operational leadership and strategic oversight to the Group\'s day-to-day management.',
      'His focus on delivering measurable results and maintaining the Group\'s reputation for quality has been central to Yanabiya\'s sustained growth across all markets.',
    ],
  },
  {
    id: 'sumon-ahmed',
    name: 'S M Sumon Ahmed',
    role: 'Deputy Managing Director',
    image: assets.people.sumonAhmed,
    tier: 'board',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Deputy Managing Director supporting cross-divisional governance and growth initiatives.',
    fullBio: [
      'S M Sumon Ahmed serves as Deputy Managing Director, working closely with the Chairman and Managing Directors to ensure cohesive leadership across all of Yanabiya Group\'s subsidiaries.',
      'He plays a key role in strategic planning, stakeholder engagement, and the execution of the Group\'s long-term growth agenda.',
    ],
  },
  {
    id: 'jhohora-akter',
    name: 'Jhohora Akter',
    role: 'Asst. Deputy Managing Director',
    image: assets.people.jhohoraAkter,
    tier: 'board',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Supporting senior management in driving operational excellence across the Group.',
    fullBio: [
      'Jhohora Akter serves as Assistant Deputy Managing Director of Yanabiya Group, supporting the senior leadership team in day-to-day governance and strategic coordination.',
      'Her contributions span cross-functional oversight, internal communications, and ensuring the Group\'s values are upheld at every level of the organisation.',
    ],
  },
  {
    id: 'saleheen-bhuiyan',
    name: 'M M Saleheen Bhuiyan',
    role: 'Chief Operating Officer',
    email: 'saleheen@yanabiyagroup.com',
    image: 'https://yanabiyagroup.com/img/slider/4.png',
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Chief Operating Officer orchestrating operational excellence across all Yanabiya divisions.',
    fullBio: [
      'M M Saleheen Bhuiyan leads Yanabiya Group\'s operational functions, ensuring seamless execution across all business units and geographies.',
      'His extensive background in enterprise transformation and technology delivery has made him a cornerstone of the Group\'s operational strategy since its growth phase.',
      'Under his oversight, the Group has implemented scalable processes that have improved delivery timelines and elevated client satisfaction to record levels.',
    ],
  },
  {
    id: 'rafiujjaman-sumon',
    name: 'Md Rafiujjaman Sumon',
    role: 'Chief Technology Officer',
    email: 'sumon@yanabiyagroup.com',
    image: PH('Md Rafiujjaman Sumon'),
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Chief Technology Officer leading Yanabiya Group\'s global technology strategy and digital transformation.',
    fullBio: [
      'Md Rafiujjaman Sumon serves as Chief Technology Officer at Yanabiya Group of Companies, leading the Group\'s global technology strategy and digital transformation across multiple international branches and country-based operations.',
      'Since 2024, he has been responsible for developing scalable IT infrastructure, standardising systems across different regions, and ensuring seamless integration of technology across all business units in the UAE, UK, and other global markets.',
      'His leadership drives innovation and operational efficiency at a global level — positioning Yanabiya Group as a digitally resilient and future-ready enterprise across every market it serves.',
    ],
  },
  {
    id: 'khalid-al-sulaimani-exec',
    name: 'Khalid Saif Ahmed Al Sulaimani',
    role: 'General Manager',
    image: assets.people.khalidSulaimani,
    tier: 'board',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'General Manager steering day-to-day operations and client relationships in Oman.',
    fullBio: [
      'Khalid Saif Ahmed Al Sulaimani serves as General Manager of Yanabiya Group\'s operations in Oman, overseeing client delivery, vendor partnerships, and team performance.',
      'His deep understanding of the regional market and commitment to service excellence have been instrumental in Yanabiya\'s growth as a preferred technology partner in the Sultanate.',
    ],
  },
  {
    id: 'maysa-yeasmin',
    name: 'Maysa Yeasmin',
    role: 'Chief Financial Officer',
    image: assets.people.maysaYeasmin,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'CFO overseeing financial health and investment strategy across all four markets.',
    fullBio: [
      'Maysa Yeasmin serves as Chief Financial Officer of Yanabiya Group, managing all financial planning, reporting, treasury, and compliance functions across the Group\'s four operating countries.',
      'Her rigorous financial discipline and strategic investment insights have been pivotal in maintaining the Group\'s financial stability while funding ambitious growth plans.',
    ],
  },
  {
    id: 'al-montasar-al-masroori',
    name: 'Al Montasar Al Masroori',
    role: 'Global Operations Manager',
    email: 'almontasar@yanabiyagroup.com',
    image: assets.people.alMontasar,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Operation Manager ensuring smooth delivery across all Yanabiya service lines.',
    fullBio: [
      'Al Montasar Al Masroori manages Yanabiya Group\'s operational workflows, coordinating resources and teams to ensure all client commitments are met on time and to specification.',
      'His hands-on approach and meticulous attention to detail keep the Group\'s delivery engine running at peak efficiency across every project.',
    ],
  },
  {
    id: 'mofijur-rahman-khan',
    name: 'MD Mofijur Rahman Khan',
    role: 'Director of Global Marketing',
    email: 'mofijur@yanabiyagroup.com',
    image: assets.people.mofijurKhan,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Marketing Manager driving brand visibility and client acquisition across global markets.',
    fullBio: [
      'MD Mofijur Rahman Khan leads Yanabiya Group\'s marketing efforts, developing campaigns and brand strategies that amplify the Group\'s presence across Oman, Bangladesh, the UK, and the USA.',
      'His data-led approach to marketing has consistently generated high-quality leads and strengthened the Group\'s positioning as a premium technology and services partner.',
    ],
  },
  {
    id: 'mohammed-rashid-al-hashimi',
    name: 'Mohammed Rashid Al Hashimi',
    role: 'Director of Public Relations & Communications',
    email: 'rashid@yanabiyagroup.com',
    image: assets.people.mohammedRashid,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'PR Manager building Yanabiya\'s reputation and stakeholder relationships.',
    fullBio: [
      'Mohammed Rashid Al Hashimi manages Yanabiya Group\'s public relations strategy, media engagement, and government communications across all markets.',
      'His work ensures the Group\'s brand story is told consistently and compellingly, strengthening trust with clients, partners, and the broader community.',
    ],
  },
  {
    id: 'maheswaran-annadurai',
    name: 'Maheswaran Annadurai',
    role: 'Head of Human Resources & Administration',
    email: 'maheswaran@yanabiyagroup.com',
    image: assets.people.maheswaran,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Head of HR and Administration ensuring the Group\'s human capital is nurtured and engaged.',
    fullBio: [
      'Maheswaran Annadurai leads the HR, Administration, and Collections division at Yanabiya Group, ensuring the organisation attracts, retains, and develops top talent across all markets.',
      'His people-first management style and structured administrative frameworks have created a productive and positive working environment that reflects Yanabiya\'s core values.',
    ],
  },
  {
    id: 'zakirul-islam-khan',
    name: 'Mohammad Zakirul Islam Khan',
    role: 'Head of Business Intelligence & Analytics',
    email: 'zakirul@yanabiyagroup.com',
    image: 'https://yanabiyagroup.com/img/slider/7.png',
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Head of Business Intelligence driving data-driven decisions across the Group.',
    fullBio: [
      'Mohammad Zakirul Islam Khan leads Yanabiya Group\'s Business Intelligence function, designing and maintaining analytics frameworks that turn raw data into actionable executive insight.',
      'His work enables the leadership team to monitor performance, identify trends, and make evidence-based decisions that keep the Group ahead of the curve.',
    ],
  },
  {
    id: 'rashedul-islam',
    name: 'Rashedul Islam',
    role: 'Head of Global Implementation',
    email: 'rashedul@yanabiyagroup.com',
    image: 'https://yanabiyagroup.com/img/slider/6.png',
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Head of Implementation ensuring flawless project delivery for every client.',
    fullBio: [
      'Rashedul Islam leads Yanabiya Group\'s implementation practice, overseeing end-to-end project delivery from requirements gathering through to go-live and post-deployment support.',
      'His structured methodology and deep technical knowledge have resulted in an exceptional on-time, on-budget delivery record across hundreds of client engagements.',
    ],
  },
  {
    id: 'ahsan-sabbir',
    name: 'Ahsan Sabbir',
    role: 'Head of Internal Audit & Compliance',
    email: 'ahsan@yanabiyagroup.com',
    image: assets.people.ahsanSabbir,
    tier: 'exec',
    tierLabel: 'Tier 02, Global Executive Management',
    shortBio: 'Auditor maintaining financial integrity and compliance across the Group.',
    fullBio: [
      'Ahsan Sabbir serves as Auditor for Yanabiya Group, conducting rigorous internal and external audit reviews to ensure financial accuracy, regulatory compliance, and operational transparency.',
      'His independent assessments provide the Board with the assurance needed to make sound strategic decisions and uphold the Group\'s reputation for integrity.',
    ],
  },

  {
    id: 'chief-of-accounts',
    name: 'Maysa Yeasmin',
    role: 'Chief Financial Officer',
    image: assets.people.maysaYeasmin,
    tier: 'exec',
    tierLabel: 'Accounts & Finance',
    shortBio: 'CFO overseeing financial health, compliance, and strategic investment across all four markets.',
    fullBio: [
      'As Chief Financial Officer of Yanabiya Group, Maysa Yeasmin holds responsibility for the financial integrity of the entire organisation — spanning Oman, the United Kingdom, the United States, and Bangladesh.',
      'Her leadership of the finance function encompasses financial planning and analysis, treasury management, regulatory compliance, and group-wide reporting. She works closely with the Board and senior leadership to ensure every strategic decision is underpinned by sound financial governance.',
      'Maysa brings a disciplined, data-driven approach to financial management. Under her stewardship, Yanabiya Group has maintained strong liquidity, managed cross-border fiscal obligations effectively, and built the financial infrastructure necessary to support the Group\'s continued global expansion.',
      'Her commitment to transparency, accuracy, and accountability reflects the values at the heart of Yanabiya Group — and her work ensures the organisation remains a financially resilient and trusted partner across every market it serves.',
    ],
  },

  // ── Accounts — Branch Companies ─────────────────────────────────────
  {
    id: 'account-oman',
    name: 'Yanabiya Gulf International Business and Trade SPC',
    role: 'Oman Branch',
    image: PH('Oman'),
    tier: 'exec',
    tierLabel: 'Accounts & Finance',
    shortBio: 'Oman branch — CR No: 1395664, Est. 19 September 2021.',
    flag: '🇴🇲',
    fullBio: [],
  },
  {
    id: 'account-uk',
    name: 'Yanabiya Gulf International UK Ltd',
    role: 'UK Branch',
    image: PH('UK'),
    tier: 'exec',
    tierLabel: 'Accounts & Finance',
    shortBio: 'UK branch — Company No: 14907791, Inc. 1 June 2023.',
    flag: '🇬🇧',
    fullBio: [],
  },
  {
    id: 'account-usa',
    name: 'Yanabiya Gulf International US LLC',
    role: 'USA Branch',
    image: PH('USA'),
    tier: 'exec',
    tierLabel: 'Accounts & Finance',
    shortBio: 'USA branch — File No: 806163411, Formed 11 August 2025.',
    flag: '🇺🇸',
    fullBio: [],
  },
  {
    id: 'account-bd',
    name: 'Yanabiya Gulf International BD Trade',
    role: 'Bangladesh Branch',
    image: PH('Bangladesh'),
    tier: 'exec',
    tierLabel: 'Accounts & Finance',
    shortBio: 'Bangladesh branch — Trade License: TRAD/DNCC/100677/1998.',
    flag: '🇧🇩',
    fullBio: [],
  },

  // ── Tier 03, Regional Operations Team ───────────────────────────────
  {
    id: 'dept-head-oman',
    name: 'Head of Department',
    role: 'Head of Department, Oman',
    image: PH('Head of Department Oman'),
    tier: 'dept',
    tierLabel: 'Tier 03, Regional Operations Team',
    shortBio: 'Leading Yanabiya\'s departmental operations across the Oman market.',
    country: 'Oman',
    flag: '🇴🇲',
    fullBio: [
      'The Head of Department for Oman oversees all departmental functions within Yanabiya\'s flagship market, ensuring seamless delivery of services and alignment with the Group\'s strategic goals.',
    ],
  },
  {
    id: 'dept-head-bangladesh',
    name: 'Head of Department',
    role: 'Head of Department, Bangladesh',
    image: PH('Head of Department Bangladesh'),
    tier: 'dept',
    tierLabel: 'Tier 03, Regional Operations Team',
    shortBio: 'Leading Yanabiya\'s departmental operations across the Bangladesh market.',
    country: 'Bangladesh',
    flag: '🇧🇩',
    fullBio: [
      'The Head of Department for Bangladesh coordinates departmental activities across the Group\'s growing technology delivery and talent hub, driving operational excellence and team development.',
    ],
  },
  {
    id: 'dept-head-uk',
    name: 'Head of Department',
    role: 'Head of Department, UK',
    image: PH('Head of Department UK'),
    tier: 'dept',
    tierLabel: 'Tier 03, Regional Operations Team',
    shortBio: 'Leading Yanabiya\'s departmental operations across the UK market.',
    country: 'UK',
    flag: '🇬🇧',
    fullBio: [
      'The Head of Department for the UK manages departmental functions from Yanabiya\'s European base, supporting business development and international partnerships across the continent.',
    ],
  },
  {
    id: 'dept-head-usa',
    name: 'Head of Department',
    role: 'Head of Department, USA',
    image: PH('Head of Department USA'),
    tier: 'dept',
    tierLabel: 'Tier 03, Regional Operations Team',
    shortBio: 'Leading Yanabiya\'s departmental operations across the North American market.',
    country: 'USA',
    flag: '🇺🇸',
    fullBio: [
      'The Head of Department for the USA leads departmental operations across Yanabiya\'s North American presence, connecting local initiatives with the Group\'s broader global strategy.',
    ],
  },

  // ── Country Entities ─────────────────────────────────────────────────
  {
    id: 'country-oman',
    name: 'Yanabiya Oman',
    role: 'Headquarters & Country Operations',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Yanabiya\'s founding and largest market — the stamp of quality and professionalism.',
    country: 'Oman',
    flag: '🇴🇲',
    fullBio: [
      'Oman is Yanabiya Group\'s home market and global headquarters, established in Muscat with a mission to deliver premium technology and consulting services to government, semi-government, and private sector clients.',
      'The Oman entity leads the Group\'s strategic vision and serves as the operational hub from which all international activities are coordinated.',
      'With over two decades of presence in the Sultanate, Yanabiya Oman has built an unrivalled reputation as the region\'s stamp of quality and professionalism.',
    ],
  },
  {
    id: 'country-uk',
    name: 'Yanabiya UK',
    role: 'European Hub & Talent Gateway',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Yanabiya\'s European base connecting the Group to international markets and partners.',
    country: 'UK',
    flag: '🇬🇧',
    fullBio: [
      'Yanabiya UK operates from London as the Group\'s European gateway, supporting business development, talent acquisition, and strategic partnerships across the continent.',
      'The UK entity bridges Yanabiya\'s Middle Eastern and South Asian operations with the global business community, opening doors to world-class clients and partners.',
      'Its presence in one of the world\'s leading financial and technology centres gives the Group unparalleled access to international expertise and opportunity.',
    ],
  },
  {
    id: 'country-bangladesh',
    name: 'Yanabiya Bangladesh',
    role: 'Technology Delivery & Talent Hub',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Powering Yanabiya\'s technology delivery with Bangladesh\'s deep skilled talent pool.',
    country: 'Bangladesh',
    flag: '🇧🇩',
    fullBio: [
      'Yanabiya Bangladesh is one of the Group\'s highest-growth entities, delivering technology solutions, software development, and ERP implementations from Dhaka.',
      'Bangladesh represents a strategic talent hub for the Group, with a rapidly growing team of skilled engineers, analysts, and consultants serving clients across all four countries.',
      'The entity\'s work exemplifies the Group\'s ability to harness South Asian talent to deliver world-class digital outcomes for international clients.',
    ],
  },
  {
    id: 'country-usa',
    name: 'Yanabiya USA',
    role: 'North American Operations',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Anchoring Yanabiya\'s North American presence and e-commerce operations.',
    country: 'USA',
    flag: '🇺🇸',
    fullBio: [
      'Yanabiya USA anchors the Group\'s North American operations, focusing on e-commerce, strategic partnerships, and business development across the United States.',
      'Operating under the banner of YGIUS LLC, the US entity connects American corporations with Yanabiya\'s extensive capabilities in the Middle East and South Asia.',
      'Its presence in North America reflects the Group\'s ambition to be a truly global enterprise platform spanning four continents.',
    ],
  },
]

export function getPersonById(id: string): PersonData | undefined {
  return ALL_PEOPLE.find((p) => p.id === id)
}
