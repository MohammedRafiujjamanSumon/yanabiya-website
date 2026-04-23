import { useEffect } from 'react'
import { Quote } from 'lucide-react'
import Section, { H2 } from '../components/Section'
import { board, chairmanMessage, viceChairmanMessage } from '../data/leadership'

export default function Management() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="management-page" className="bg-stone-50">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <H2 className="text-center">Our Management</H2>
          <p className="mt-5 text-slate-600">
            Messages from the founding leadership that shape every engagement at Yanabiya Group.
          </p>
        </div>

        <figure className="mb-12 overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
          <img
            src="./images/management-event.jpg"
            alt="Yanabiya Group management at an official gathering"
            className="w-full h-auto object-cover"
            onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
          />
        </figure>

        {/* Founder & Chairman */}
        <article className="card-panel relative overflow-hidden mb-10">
          <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={160} />
          <div className="relative flex flex-col md:flex-row gap-8 items-start">
            <img
              src={board[0].photo}
              alt={board[0].name}
              className="w-36 h-36 rounded-2xl object-cover border-2 border-brand-accent/40 shrink-0 bg-white"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">
                Founder &amp; Chairman Message
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">
                {board[0].name}
              </h3>
              <p className="text-slate-700 mb-4">Greetings from YANABIYA GROUP,</p>
              <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                {chairmanMessage.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-6 text-slate-700">
                <p>Sincerely,</p>
                <p className="font-semibold text-slate-900 mt-1">S M Shamim Ahmed</p>
                <p className="text-sm text-brand-accent uppercase tracking-widest">
                  Founder &amp; Chairman — Yanabiya Group
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Vice Chairman */}
        <article className="card-panel relative overflow-hidden">
          <Quote className="absolute -top-2 -end-2 text-brand-accent/10" size={140} />
          <div className="relative flex flex-col md:flex-row gap-8 items-start">
            <img
              src={board[1].photo}
              alt={board[1].name}
              className="w-32 h-32 rounded-2xl object-cover border-2 border-brand-accent/40 shrink-0 bg-white"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest text-brand-accent mb-1">
                Vice Chairman Message
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-slate-900 mb-4">
                {board[1].name}
              </h3>
              <p className="text-slate-700 mb-4">Dear Visitors,</p>
              <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                {viceChairmanMessage.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-6 text-slate-700">
                <p>Sincerely,</p>
                <p className="font-semibold text-slate-900 mt-1">Mohammad Abu Jaheed</p>
                <p className="text-sm text-brand-accent uppercase tracking-widest">
                  Vice Chairman — Yanabiya Group
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Section>
  )
}
