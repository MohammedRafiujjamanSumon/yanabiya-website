import { useEffect } from 'react'
import { Leaf, Recycle, TreePine, Users } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const items = [
  { icon: Leaf,     title: 'Green Operations',    desc: 'Energy-efficient offices and responsible resource usage across all branches.' },
  { icon: Recycle,  title: 'Circular Practices',  desc: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.' },
  { icon: TreePine, title: 'Climate Commitment',  desc: 'Tree plantation drives and lower-emission business models for long-term impact.' },
  { icon: Users,    title: 'Inclusive Growth',    desc: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.' },
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
            Building business practices that protect the environment and support long-term value for every stakeholder we serve.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it) => (
            <div key={it.title} className="card-panel">
              <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <it.icon size={22} />
              </div>
              <h4 className="text-slate-900 text-lg mb-1">{it.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
