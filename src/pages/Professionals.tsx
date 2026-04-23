import { useEffect } from 'react'
import Section, { H2 } from '../components/Section'
import { team } from '../data/leadership'

export default function Professionals() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="professionals-page" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <H2 className="text-center">High Skilled Professionals</H2>
          <p className="mt-5 text-slate-600">
            The specialist team driving delivery, engineering, and strategy across Yanabiya Group.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="card-panel text-center group hover:-translate-y-1 transition"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border border-brand-accent/30 bg-white"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="text-slate-900 text-sm font-medium leading-tight">{m.name}</div>
              <div className="text-[10px] text-brand-accent uppercase tracking-widest mt-1">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
