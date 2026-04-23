import { useEffect } from 'react'
import { Leaf, Recycle, TreePine, Users } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'
import { countries } from '../data/countries'

const pillars = [
  { icon: Leaf,     title: 'Green Operations',    desc: 'Energy-efficient offices and responsible resource usage across all branches.' },
  { icon: Recycle,  title: 'Circular Practices',  desc: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.' },
  { icon: TreePine, title: 'Climate Commitment',  desc: 'Tree plantation drives and lower-emission business models for long-term impact.' },
  { icon: Users,    title: 'Inclusive Growth',    desc: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.' },
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

export default function SustainableGrowth() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="sustainable-growth" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Eyebrow>Community</Eyebrow>
          <H2 className="text-center">Sustainable Growth</H2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Building business practices that protect the environment and support long-term
            value for every stakeholder — in every country we operate.
          </p>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">Our Pillars</div>
            <h3 className="font-serif text-3xl text-slate-900">How We Grow Responsibly</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map((p) => (
              <div key={p.title} className="card-panel">
                <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                  <p.icon size={22} />
                </div>
                <h4 className="text-slate-900 text-lg mb-1">{p.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">On the ground</div>
            <h3 className="font-serif text-3xl text-slate-900">Initiatives Across Our Regions</h3>
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
            <div className="text-xs uppercase tracking-widest text-brand-accent mb-2">Forward commitments</div>
            <h3 className="font-serif text-3xl text-slate-900">Targets We're Working Towards</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {commitments.map((c) => (
              <div key={c.year} className="card-panel text-center">
                <div className="font-serif text-3xl text-brand-accent">{c.year}</div>
                <div className="text-sm text-slate-600 mt-2 leading-relaxed">{c.goal}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
