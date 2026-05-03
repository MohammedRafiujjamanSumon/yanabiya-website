import { useEffect } from 'react'
import { Quote, Star } from 'lucide-react'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import { countries } from '../data/countries'
import { assets } from '../data/assets'
import { useSection } from '../hooks/useSection'

type Testimonial = {
  quote: string
  author: string
  role: string
  rating?: number
}

const testimonialsByCountry: Record<string, Testimonial[]> = {
  OM: [
    {
      quote:
        'Yanabiya Group delivered our ERP rollout across three branches without a single business-day disruption. Their delivery discipline is rare in this region.',
      author: 'Khalid Al-Hashmi',
      role: 'Operations Director, Muscat',
      rating: 5,
    },
    {
      quote:
        'From procurement to deployment, the Yanabiya team treated our project as their own. Six months in, the platform still runs exactly as promised.',
      author: 'Aisha Al-Balushi',
      role: 'Group CFO, Al Khuwair',
      rating: 5,
    },
  ],
  GB: [
    {
      quote:
        'A reliable European delivery partner is hard to find. The Yanabiya London team brought enterprise-grade architecture and clear, jargon-free communication.',
      author: 'James Whitcombe',
      role: 'Head of Engineering, London',
      rating: 5,
    },
    {
      quote:
        'Fast, considered, and always on top of compliance. The team understands what UK financial-services clients actually need.',
      author: 'Priya Shah',
      role: 'Programme Manager, Great Portland Street',
      rating: 5,
    },
  ],
  BD: [
    {
      quote:
        'The Dhaka engineering centre has been a true extension of our internal team. 24×7 support without ever feeling like outsourcing.',
      author: 'Tahmid Rahman',
      role: 'CTO, Uttarkhan',
      rating: 5,
    },
    {
      quote:
        'I have worked with Yanabiya for three years. The QA standard alone has saved us countless production incidents.',
      author: 'Nasrin Akter',
      role: 'Product Lead, Dhaka',
      rating: 5,
    },
  ],
  US: [
    {
      quote:
        'Yanabiya brought structured cloud and AI advisory to our growing North-American practice. Honest, hands-on, and well-priced.',
      author: 'Daniel Carter',
      role: 'Partner, Austin TX',
      rating: 5,
    },
    {
      quote:
        'Their team blends seamlessly with our US engineers. Time-zone coverage is the bonus — quality of work is the headline.',
      author: 'Marcus Lee',
      role: 'VP Engineering, Texas',
      rating: 5,
    },
  ],
}

const stats = [
  { v: '4.9/5', l: 'Average rating' },
  { v: '120+',  l: 'Clients served' },
  { v: '4',     l: 'Countries' },
  { v: '15Y',   l: 'Track record' },
]

export default function Testimonials() {
  const pageHeroes = useSection<Record<string,{eyebrow:string;title:string;subtitle:string}>>('page-heroes')
  const hero = pageHeroes?.['testimonials']
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <PageHero
        eyebrow={hero?.eyebrow || 'Our Community'}
        title={hero?.title || 'Testimonials'}
        subtitle={hero?.subtitle || 'Words from our partners, clients and beneficiaries — gathered across the four countries where Yanabiya Group operates.'}
      />

      <Section id="testimonials" className="relative overflow-hidden bg-brand-50">
      <div className="container-x">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
          {stats.map((s) => (
            <div key={s.l} className="card-panel text-center">
              <div className="font-serif text-2xl text-brand-accentDark">{s.v}</div>
              <div className="text-[10px] tracking-widest text-slate-500 uppercase mt-1">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="space-y-12">
          {countries.map((c) => {
            const items = testimonialsByCountry[c.code] ?? []
            if (items.length === 0) return null
            return (
              <div key={c.code}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl" aria-hidden>{c.flag}</div>
                  <div>
                    <h3 className="font-serif text-2xl text-slate-900">{c.name}</h3>
                    <div className="text-xs uppercase tracking-widest text-brand-accentDark mt-0.5">
                      {c.role}
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {items.map((t, i) => (
                    <figure
                      key={i}
                      className="card-panel relative flex flex-col gap-4"
                    >
                      <Quote
                        size={28}
                        className="text-brand-accentDark/40 absolute top-4 right-4"
                        aria-hidden
                      />
                      {t.rating && (
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {Array.from({ length: t.rating }).map((_, idx) => (
                            <Star key={idx} size={14} fill="currentColor" strokeWidth={0} />
                          ))}
                        </div>
                      )}
                      <blockquote className="text-slate-700 leading-relaxed text-[15px]">
                        “{t.quote}”
                      </blockquote>
                      <figcaption className="mt-auto pt-2 border-t border-slate-200">
                        <div className="text-slate-900 font-semibold text-sm">{t.author}</div>
                        <div className="text-xs text-slate-500">{t.role}</div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
    </>
  )
}
