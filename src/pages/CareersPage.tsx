import { useEffect } from 'react'
import { MapPin, Mail } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'
import CircleInfographic, { type CircleItem } from '../components/CircleInfographic'
import { countries } from '../data/countries'

const reasons: CircleItem[] = [
  { label: 'Global Exposure',     description: 'Work across four countries and dozens of industries.',          bg: 'bg-emerald-500' },
  { label: 'Modern Stack',        description: 'Cloud, AI, security and full-stack engineering.',                bg: 'bg-sky-500' },
  { label: 'Career Growth',       description: 'Flexible, rewarding paths with real ownership.',                 bg: 'bg-amber-500' },
  { label: 'Performance Culture', description: 'Teamwork-first with recognition for individual impact.',         bg: 'bg-rose-500' },
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="careers" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Community</Eyebrow>
          <H2 className="text-center">Careers</H2>
          <p className="mt-5 text-slate-600 leading-snug">
            Join a global team across Oman, the United Kingdom, Bangladesh and the USA —
            and help shape the future of trade, technology and community.
          </p>
        </div>

        <div className="mb-16">
          <CircleInfographic
            eyebrow="Why Yanabiya"
            titleLine1="Our Range of"
            titleLine2="Career Opportunities"
            items={reasons}
          />
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">Open Roles</div>
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
                      <div className="text-xs uppercase tracking-widest text-brand-accent mt-1">{c.role}</div>
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
                          <span className="text-[10px] text-brand-accent uppercase tracking-widest border border-brand-accent/30 px-2 py-1 rounded-full">
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
          <Mail className="text-brand-accent mx-auto mb-3" size={28} />
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
  )
}
