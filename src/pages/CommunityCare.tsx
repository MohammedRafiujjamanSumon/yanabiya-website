import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import CommunityCareCards from '../components/CommunityCareCards'
import { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'
import { useSection } from '../hooks/useSection'

const pillars: CircleItem[] = [
  {
    label: 'Welfare',
    description: 'Structured charitable drives supporting families in need with dignity and transparency.',
    bg: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Education',
    description: 'Scholarships, school programmes and learning resources for underserved communities.',
    bg: 'bg-sky-500',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Health',
    description: 'Free health camps, medical support and awareness programmes across regions.',
    bg: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Empowerment',
    description: 'Skills training and livelihood programmes that build long-term independence.',
    bg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80',
  },
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

const statKeys = ['beneficiaries', 'countries', 'track', 'programmes']
const statValues = ['500+', '4', '15Y', '25+']

export default function CommunityCare() {
  const { t } = useTranslation()
  const pageHeroes = useSection<Record<string,{eyebrow:string;title:string;subtitle:string}>>('page-heroes')
  const hero = pageHeroes?.['community-care']

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <div className="relative">
        <PageHero
          title={hero?.title || 'Community Care'}
          subtitle={hero?.subtitle || 'Structured charitable donations and welfare programmes focused on transparency, dignity and lasting impact, delivered across every country where we operate.'}
          centered
          ghostText=""
        />
        <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-between pt-5 md:pt-6 pointer-events-none">
          <Link
            to="/community/blog"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200"
          >
            <ArrowLeft size={13} /> Blog
          </Link>
          <Link
            to="/community/donation"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200"
          >
            Donation <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <Section id="community-care" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {statKeys.map((key, idx) => (
            <div key={key} className="card-panel text-center">
              <div className="font-serif text-2xl text-brand-accentDark">{statValues[idx]}</div>
              <div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">{t(`communityCare.stats.${key}`)}</div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <CommunityCareCards
            eyebrow={t('communityCare.eyebrow')}
            titleLine1={t('communityCare.titleLine1')}
            titleLine2={t('communityCare.titleLine2')}
            items={pillars}
          />
        </div>

        <div>
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accentDark mb-2">{t('communityCare.aroundWorld')}</div>
            <h3 className="font-serif text-3xl text-slate-900">{t('communityCare.programmesTitle')}</h3>
            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
              {t('communityCare.programmesDesc')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {countries.map((c) => (
              <div key={c.code} className="card-panel">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl" aria-hidden>{c.flag}</div>
                  <div>
                    <h4 className="text-slate-900 text-lg font-semibold">{c.name}</h4>
                    <div className="text-xs uppercase tracking-widest text-brand-accentDark mt-1">{c.role}</div>
                  </div>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  {(countryPrograms[c.code] ?? []).map((program, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-brand-accentDark shrink-0">•</span>
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
    </>
  )
}
