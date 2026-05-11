import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import SustainabilityPillars from '../components/SustainabilityPillars'
import { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'
import { useSection } from '../hooks/useSection'

const pillars: CircleItem[] = [
  {
    label: 'Green Operations',
    description: 'Energy-efficient offices and responsible resource usage across all branches.',
    bg: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Circular Practices',
    description: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.',
    bg: 'bg-sky-500',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Climate Commitment',
    description: 'Tree plantation drives and lower-emission business models for long-term impact.',
    bg: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Inclusive Growth',
    description: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.',
    bg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
  },
]

const countryInitiatives: Record<string, { title: string; body: string }[]> = {
  OM: [
    { title: 'Green HQ retrofit', body: 'LED lighting and low-water fittings rolled out across our Muscat offices.' },
    { title: 'Local sourcing',    body: 'Priority to Omani SMEs for construction materials and facility services.' },
    { title: 'Tree plantation',   body: 'Annual greening drive coordinated with municipal partners.' },
  ],
  GB: [
    { title: 'Carbon reporting', body: 'UK entity tracks emissions under national energy and carbon reporting standards.' },
    { title: 'Supplier code',    body: 'London operations onboard suppliers under ethical sourcing requirements.' },
    { title: 'Digital first',    body: 'Paperless workflows for contracts, invoices and HR documentation.' },
  ],
  BD: [
    { title: 'Local hiring',       body: 'Hiring from communities around our Uttarkhan office in Dhaka.' },
    { title: 'Vocational training', body: 'Skills programmes enabling long-term employability in IT and trade.' },
    { title: 'Plastic reduction',   body: 'Packaging and logistics reviewed to reduce single-use plastics.' },
  ],
  US: [
    { title: 'Clean energy office', body: 'Austin operations adopt renewable-energy plans where available.' },
    { title: 'Diversity hiring',    body: 'Partnerships with Texan community colleges for inclusive talent pipelines.' },
    { title: 'Remote-first',        body: 'Flexible work reduces commute emissions across our US team.' },
  ],
}

const commitments = [
  { year: '2026', goal: 'Baseline emissions reporting across all four countries' },
  { year: '2028', goal: 'Fifty percent renewable-energy share at headquarters' },
  { year: '2030', goal: 'Carbon-neutral operations for all office locations' },
]

type SGData = { pillars?: { label: string; description: string; image: string; bg?: string }[] }

export default function SustainableGrowth() {
  const { t } = useTranslation()
  const pageHeroes = useSection<Record<string,{eyebrow:string;title:string;subtitle:string}>>('page-heroes')
  const hero = pageHeroes?.['sustainable-growth']
  const sgData = useSection<SGData>('sustainable-growth')
  const activePillars = sgData?.pillars
    ? sgData.pillars.map((p, i) => ({
        label: p.label,
        description: p.description,
        image: p.image,
        bg: p.bg ?? pillars[i]?.bg ?? 'bg-emerald-500',
      }))
    : pillars

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <div className="relative">
        <PageHero
          title={hero?.title || 'Sustainable Growth'}
          subtitle={hero?.subtitle || 'Building business practices that protect the environment and support long-term value for every stakeholder, in every country we operate.'}
          centered
          ghostText=""
        />
        <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-between pt-5 md:pt-6 pointer-events-none">
          <Link
            to="/#community"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200"
          >
            <ArrowLeft size={13} /> Our Community
          </Link>
          <Link
            to="/community/blog"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200"
          >
            Blog <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <Section id="sustainable-growth" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="mb-16">
          <SustainabilityPillars
            eyebrow={t('sustainablePage.eyebrow')}
            titleLine1={t('sustainablePage.titleLine1')}
            titleLine2={t('sustainablePage.titleLine2')}
            items={activePillars}
          />
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accentDark mb-2">{t('sustainablePage.onGround')}</div>
            <h3 className="font-serif text-3xl text-slate-900">{t('sustainablePage.initiativesTitle')}</h3>
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
                <ul className="space-y-3 text-sm">
                  {(countryInitiatives[c.code] ?? []).map((it, i) => (
                    <li key={i}>
                      <div className="font-medium text-slate-800">{it.title}</div>
                      <div className="text-slate-600 mt-0.5">{it.body}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accentDark mb-2">{t('sustainablePage.forwardCommitments')}</div>
            <h3 className="font-serif text-3xl text-slate-900">{t('sustainablePage.targetsTitle')}</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {commitments.map((c) => (
              <div key={c.year} className="card-panel text-center">
                <div className="font-serif text-3xl text-brand-accentDark">{c.year}</div>
                <div className="text-sm text-slate-600 mt-2 leading-snug">{c.goal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
    </>
  )
}
