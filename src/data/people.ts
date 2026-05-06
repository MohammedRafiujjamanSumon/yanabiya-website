import { board as boardData, chairmanMessage, viceChairmanMessage } from './leadership'

export type PersonData = {
  id: string
  name: string
  role: string
  image: string
  tier: 'board' | 'exec' | 'country'
  tierLabel: string
  shortBio: string
  fullBio: string[]
  country?: string
  flag?: string
}

export const ALL_PEOPLE: PersonData[] = [
  // ── Tier 01, Board ──────────────────────────────────────────────────
  {
    id: 'khalifa-al-hinai',
    name: 'H.E. Khalifa Al-Hinai',
    role: 'Chairman of the Board',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Three decades of strategic governance across the Gulf region.',
    fullBio: [
      'H.E. Khalifa Al-Hinai brings over three decades of distinguished leadership in public and private sector governance. His visionary approach has shaped the strategic direction of Yanabiya Group since its inception.',
      'With deep roots in Oman\'s business ecosystem, he serves as the bridge between government relations and corporate excellence, ensuring the Group\'s operations align with national and regional development goals.',
      'His tenure has been marked by an unwavering commitment to ethical business practice and sustainable growth across all operating markets.',
    ],
  },
  {
    id: 'anthony-whitfield',
    name: 'Sir Anthony Whitfield',
    role: 'Senior Strategic Advisor',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Senior advisor shaping Yanabiya\'s international expansion strategy.',
    fullBio: [
      'Sir Anthony Whitfield is a globally respected strategist with extensive experience advising multinational corporations across Europe, the Middle East, and Asia.',
      'He joined Yanabiya Group\'s advisory board to provide high-level guidance on international market entry, regulatory compliance, and long-term growth planning.',
      'His network spans government ministries, sovereign wealth funds, and Fortune 500 boards, making him an invaluable asset in the Group\'s global expansion efforts.',
    ],
  },
  {
    id: 'amina-rahman',
    name: 'Dr. Amina Rahman',
    role: 'Independent Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Champion of corporate governance and board-level accountability.',
    fullBio: [
      'Dr. Amina Rahman is a leading authority on corporate governance and board effectiveness with over 20 years of experience across the financial services, technology, and healthcare sectors.',
      'As Independent Director, she champions transparency, accountability, and diversity at the highest levels of organisational leadership.',
      'She holds a PhD in Organisational Governance from the London School of Economics and serves on multiple international advisory panels.',
    ],
  },
  {
    id: 'tariq-al-balushi',
    name: 'Tariq Al-Balushi',
    role: 'Audit & Risk Advisor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    tier: 'board',
    tierLabel: 'Tier 01, Board & Advisory',
    shortBio: 'Expert in enterprise risk management and financial audit across GCC markets.',
    fullBio: [
      'Tariq Al-Balushi is a certified risk and audit professional with deep expertise in financial controls, regulatory frameworks, and enterprise risk across the GCC region.',
      'He oversees the Group\'s audit committee, ensuring financial integrity and rigorous compliance with international accounting standards.',
      'His proactive risk assessment approach has been pivotal in steering Yanabiya Group through complex regulatory environments across four countries.',
    ],
  },

  // ── Tier 02, Exec ───────────────────────────────────────────────────
  {
    id: 'sara-al-mahrouqi',
    name: 'Sara Al-Mahrouqi',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Orchestrating operational excellence across all Yanabiya divisions.',
    fullBio: [
      'Sara Al-Mahrouqi leads Yanabiya Group\'s day-to-day operations with a focus on process excellence, cross-functional alignment, and sustainable performance.',
      'Her operational frameworks have driven measurable improvements in delivery timelines, cost efficiency, and client satisfaction across every business unit.',
      'Sara is a graduate of Sultan Qaboos University and holds an MBA from INSEAD, combining regional insight with global best practice.',
    ],
  },
  {
    id: 'daniel-whitmore',
    name: 'Daniel Whitmore',
    role: 'Chief Financial Officer',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Driving financial discipline and investment strategy across four markets.',
    fullBio: [
      'Daniel Whitmore oversees all financial operations, treasury management, and strategic investment decisions for Yanabiya Group across its four operating territories.',
      'With a background in corporate finance at tier-one banks in London and Dubai, Daniel brings world-class financial rigour to every boardroom decision.',
      'Under his stewardship, the Group has maintained strong credit ratings and successfully structured cross-border financing arrangements to support rapid growth.',
    ],
  },
  {
    id: 'priya-iyer',
    name: 'Priya Iyer',
    role: 'Chief Technology Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Architecting Yanabiya\'s digital transformation and technology roadmap.',
    fullBio: [
      'Priya Iyer leads the Group\'s technology vision, overseeing digital infrastructure, software development, ERP systems, and cybersecurity across all markets.',
      'She joined Yanabiya Group after senior technology roles at Infosys and Oracle, bringing enterprise-grade systems thinking to the Group\'s growing digital estate.',
      'Her focus on automation and data-driven decision-making has materially reduced operational costs while improving service quality for both internal and external stakeholders.',
    ],
  },
  {
    id: 'nasser-al-rawahi',
    name: 'Nasser Al-Rawahi',
    role: 'Chief Marketing Officer',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Building the Yanabiya brand across four continents.',
    fullBio: [
      'Nasser Al-Rawahi drives the Group\'s global brand strategy, marketing campaigns, and stakeholder communications across Oman, Bangladesh, the UK, and the USA.',
      'His data-led marketing approach has elevated Yanabiya\'s brand recognition significantly in all key markets, attracting both premium clients and top-tier talent.',
      'Nasser is a frequent speaker at regional marketing summits and a member of the Oman Brand Council.',
    ],
  },
  {
    id: 'layla-hossain',
    name: 'Layla Hossain',
    role: 'Chief People Officer',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Championing a people-first culture across Yanabiya\'s global workforce.',
    fullBio: [
      'Layla Hossain leads all people strategy for Yanabiya Group, from talent acquisition and learning & development to cultural transformation and employee wellbeing.',
      'Her human-centred leadership philosophy has resulted in industry-leading engagement scores and a workforce that reflects the diversity of the markets we serve.',
      'Layla holds a Master\'s in Organisational Psychology from UCL and serves as a mentor in the Oman Women in Leadership programme.',
    ],
  },
  {
    id: 'james-oconnor',
    name: "James O'Connor",
    role: 'Chief Strategy Officer',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=800&q=80',
    tier: 'exec',
    tierLabel: 'Tier 02, Executive Management',
    shortBio: 'Shaping Yanabiya\'s long-term growth agenda and market expansion strategy.',
    fullBio: [
      "James O'Connor crafts Yanabiya Group's long-range strategic plans, identifying new market opportunities, partnership models, and growth vectors across all operating geographies.",
      'A former management consultant with McKinsey & Company, James brings rigorous analytical frameworks to the Group\'s most complex strategic challenges.',
      'He holds an MBA from Harvard Business School and has led successful market entry programmes in Southeast Asia, the GCC, and Sub-Saharan Africa.',
    ],
  },

  // ── Tier 03, Country Heads ──────────────────────────────────────────
  {
    id: 'yousuf-al-lawati',
    name: 'Yousuf Al-Lawati',
    role: 'Country Head, Oman',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Leading Yanabiya\'s home-market operations with deep local expertise.',
    country: 'Oman',
    flag: '🇴🇲',
    fullBio: [
      'Yousuf Al-Lawati oversees all Yanabiya Group operations in Oman, the Group\'s founding and largest market. His leadership has been instrumental in cementing the Group\'s reputation as Oman\'s stamp of quality and professionalism.',
      'With over 18 years of experience in Oman\'s private sector, Yousuf brings unparalleled local knowledge combined with a modern, growth-oriented management philosophy.',
      'Under his tenure, the Oman entity has expanded its client base across government, semi-government, and private sectors, achieving consistent double-digit annual growth.',
    ],
  },
  {
    id: 'eleanor-hayward',
    name: 'Eleanor Hayward',
    role: 'Country Head, UK',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Driving Yanabiya\'s European growth from the heart of London.',
    country: 'UK',
    flag: '🇬🇧',
    fullBio: [
      'Eleanor Hayward leads Yanabiya Group\'s UK operations from London, focusing on business development, talent acquisition, and strategic partnerships across the European market.',
      'A seasoned executive with a background in international trade and professional services, Eleanor has built a high-performing team that reflects the Group\'s values of excellence and integrity.',
      'Her deep network across UK government, the financial services sector, and the South Asian diaspora community has opened significant new business channels for the Group.',
    ],
  },
  {
    id: 'imran-chowdhury',
    name: 'Imran Chowdhury',
    role: 'Country Head, Bangladesh',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Connecting Bangladesh\'s talent and technology with global opportunity.',
    country: 'Bangladesh',
    flag: '🇧🇩',
    fullBio: [
      'Imran Chowdhury heads Yanabiya Group\'s rapidly growing Bangladesh entity, overseeing technology delivery, talent development, and client management across the country.',
      'Bangladesh represents one of the Group\'s highest-growth markets, and Imran has been the architect of its expansion, building a team of over 100 skilled professionals in Dhaka.',
      'His background spans software engineering, project management, and operations, making him uniquely qualified to bridge the technical and business dimensions of the Bangladesh entity.',
    ],
  },
  {
    id: 'michael-reeves',
    name: 'Michael Reeves',
    role: 'Country Head, USA',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=800&q=80',
    tier: 'country',
    tierLabel: 'Tier 03, Country Management',
    shortBio: 'Anchoring Yanabiya\'s North American presence and partnership network.',
    country: 'USA',
    flag: '🇺🇸',
    fullBio: [
      'Michael Reeves leads Yanabiya Group\'s US operations, focused on building strategic partnerships with North American corporations seeking to expand into the Middle East and South Asia.',
      'Based in New York, Michael leverages his extensive corporate network across the US East Coast to position Yanabiya as the preferred gateway partner for transatlantic business.',
      'His background in investment banking and corporate development at Citigroup and Goldman Sachs gives him a unique understanding of the financial and strategic needs of American multinationals.',
    ],
  },
]

export function getPersonById(id: string): PersonData | undefined {
  return ALL_PEOPLE.find((p) => p.id === id)
}
