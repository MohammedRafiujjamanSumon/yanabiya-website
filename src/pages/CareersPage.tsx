import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, ArrowLeft } from 'lucide-react'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import CareersReasons from '../components/CareersReasons'
import { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'
import { useSection } from '../hooks/useSection'

const reasons: CircleItem[] = [
  {
    label: 'Global Exposure',
    description: 'Work across four countries and dozens of industries.',
    bg: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Modern Stack',
    description: 'Cloud, AI, security and full-stack engineering.',
    bg: 'bg-sky-500',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Career Growth',
    description: 'Flexible, rewarding paths with real ownership.',
    bg: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    label: 'Performance Culture',
    description: 'Teamwork-first with recognition for individual impact.',
    bg: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80',
  },
]

const countryRoles: Record<string, string[]> = {
  OM: [
    'Project Manager',
    'Trade and Logistics Officer',
    'Office Administrator',
    'Full Stack Developer',
    'Cyber Security Engineer',
  ],
  GB: [
    'Business Development Manager',
    'UI / UX Designer',
    'Data Analyst',
  ],
  BD: [
    'Software Engineer',
    'Database Administrator',
    'Business Intelligence Specialist',
    'Data Entry and Operations',
  ],
  US: [
    'Cloud Architect',
    'DevOps Engineer',
    'Technical Account Manager',
  ],
}

export default function CareersPage() {
  const pageHeroes = useSection<Record<string,{eyebrow:string;title:string;subtitle:string}>>('page-heroes')
  const hero = pageHeroes?.['careers']

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <div className="relative">
        <PageHero
          title={hero?.title || 'Career With Us'}
          subtitle={hero?.subtitle || 'Join a global team across Oman, the United Kingdom, Bangladesh and the USA — and help shape the future of trade, technology and community.'}
          centered
          ghostText=""
        />
        <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-start pt-5 md:pt-6 pointer-events-none">
          <Link
            to="/community/testimonials"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200"
          >
            <ArrowLeft size={13} /> Testimonials
          </Link>
        </div>
      </div>

      <Section id="careers" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="mb-16">
          <CareersReasons
            eyebrow="Why Yanabiya"
            titleLine1="Grow Your"
            titleLine2="Career With Us"
            items={reasons}
          />
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accentDark mb-2">Open Roles</div>
            <h3 className="font-serif text-3xl text-slate-900">Opportunities by Office</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {countries.map((c) => {
              const roles = countryRoles[c.code] ?? []
              return (
                <div key={c.code} className="card-panel">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl" aria-hidden>{c.flag}</div>
                    <div className="flex-1">
                      <h4 className="text-slate-900 text-lg font-semibold">{c.name}</h4>
                      <div className="text-xs uppercase tracking-widest text-brand-accentDark mt-1">{c.role}</div>
                      <div className="flex items-start gap-2 text-xs text-slate-500 mt-2">
                        <MapPin size={12} className="shrink-0 mt-0.5" />
                        <span className="whitespace-pre-line">{c.address}</span>
                      </div>
                    </div>
                  </div>
                  {roles.length > 0 ? (
                    <div className="grid gap-2">
                      {roles.map((role) => (
                        <div key={role} className="flex items-center justify-between rounded-lg bg-white/60 border border-slate-100 px-3 py-2">
                          <span className="text-slate-800 text-sm">{role}</span>
                          <span className="text-[10px] text-brand-accentDark uppercase tracking-widest border border-brand-accent/30 px-2 py-1 rounded-full">
                            Open
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500 italic">No open roles right now.</div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="card-panel text-center max-w-xl mx-auto">
          <Mail className="text-brand-accentDark mx-auto mb-3" size={28} />
          <h4 className="font-serif text-2xl text-slate-900 mb-2">Don't see the right role?</h4>
          <p className="text-slate-600 text-sm mb-5">
            Send us your CV and tell us where you'd like to contribute — we're always open to strong talent.
          </p>
          <a href="mailto:careers@yanabiyagroup.com" className="btn-primary">
            careers@yanabiyagroup.com
          </a>
        </div>
      </div>
    </Section>
    </>
  )
}
