import { useEffect } from 'react'
import Section, { Eyebrow, H2 } from '../components/Section'
import CircleInfographic, { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'

const pillars: CircleItem[] = [
  { label: 'Welfare',     description: 'Structured charitable drives supporting families in need with dignity and transparency.', bg: 'bg-emerald-500' },
  { label: 'Education',   description: 'Scholarships, school programmes and learning resources for underserved communities.',     bg: 'bg-sky-500' },
  { label: 'Health',      description: 'Free health camps, medical support and awareness programmes across regions.',             bg: 'bg-amber-500' },
  { label: 'Empowerment', description: 'Skills training and livelihood programmes that build long-term independence.',            bg: 'bg-rose-500' },
]

const countryPrograms: Record<string, string[]> = {
  OM: [
    'Annual welfare drive for low-income households across Muscat',
    'Education scholarships for Omani students pursuing tertiary degrees',
    'Community health camps in partnership with local clinics',
  ],
  GB: [
    'Volunteer hours with UK charity partners and food banks',
    'Academic engagement with London universities',
    'Diversity and inclusion mentorship programmes',
  ],
  BD: [
    'Rural education support across Uttarkhan and nearby communities',
    'Medical camps and subsidised healthcare outreach',
    'Women-led livelihood programmes and vocational training',
  ],
  US: [
    'STEM scholarships for first-generation students in Texas',
    'Community technology workshops for small business owners',
    'Disaster relief contributions through certified US charities',
  ],
}

const stats = [
  { v: '500+', l: 'Beneficiaries' },
  { v: '4',    l: 'Countries' },
  { v: '15Y',  l: 'Track record' },
  { v: '25+',  l: 'Programmes' },
]

export default function CommunityCare() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="community-care" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Our Community</Eyebrow>
          <H2 className="text-center">Community Care</H2>
          <p className="mt-5 text-slate-600 leading-snug">
            Structured charitable donations and welfare programmes focused on transparency,
            dignity and lasting impact — delivered across every country where we operate.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((s) => (
            <div key={s.l} className="card-panel text-center">
              <div className="font-serif text-2xl text-brand-accent">{s.v}</div>
              <div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <CircleInfographic
            eyebrow="Our Commitment"
            titleLine1="Our Pillars of"
            titleLine2="Community Care"
            items={pillars}
          />
        </div>

        <div>
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">Around the world</div>
            <h3 className="font-serif text-3xl text-slate-900">Programmes Across Our Regions</h3>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              Local teams deliver tailored programmes in every country where Yanabiya Group operates.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {countries.map((c) => (
              <div key={c.code} className="card-panel">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl" aria-hidden>{c.flag}</div>
                  <div>
                    <h4 className="text-slate-900 text-lg font-semibold">{c.name}</h4>
                    <div className="text-xs uppercase tracking-widest text-brand-accent mt-1">{c.role}</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {(countryPrograms[c.code] ?? []).map((program, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-brand-accent shrink-0">•</span>
                      <span>{program}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
