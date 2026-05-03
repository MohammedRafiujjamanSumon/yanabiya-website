import { useEffect } from 'react'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import OurPeopleNav from '../components/OurPeopleNav'
import BackButton from '../components/BackButton'
import { team } from '../data/leadership'

export default function Professionals() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <BackButton to="/#leadership" label="Our People" />
      <OurPeopleNav />
      <PageHero
        eyebrow="Leadership"
        title="High Skilled Professionals"
        subtitle="The specialist team driving delivery, engineering, and strategy across Yanabiya Group."
      />

      <Section id="professionals-page" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {team.map((m) => (
            <div
              key={m.name}
              className="card-panel text-center group hover:-translate-y-1 transition"
            >
              <img
                src={m.photo}
                alt={m.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border border-brand-accent/30 bg-brand-50"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="text-slate-900 text-sm font-medium leading-tight">{m.name}</div>
              <div className="text-[10px] text-brand-accentDark uppercase tracking-widest mt-1">
                {m.role}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
    </>
  )
}
