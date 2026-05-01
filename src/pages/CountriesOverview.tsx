import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const COUNTRIES = [
  { code: 'om', name: 'Oman',           flag: '🇴🇲', city: 'Muscat',   head: 'Yousuf Al-Lawati', role: 'Country Head — Oman',       blurb: 'Group HQ — corporate, trade, and IT operations across the Sultanate.', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', city: 'London',   head: 'Eleanor Hayward',  role: 'Country Head — UK',         blurb: 'European corporate office — partnerships, advisory, and EU trade.',     image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=900&q=80' },
  { code: 'bd', name: 'Bangladesh',     flag: '🇧🇩', city: 'Dhaka',    head: 'Imran Chowdhury',  role: 'Country Head — Bangladesh', blurb: 'Regional hub — IT delivery, software engineering, and South Asia ops.',  image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=900&q=80' },
  { code: 'us', name: 'United States',  flag: '🇺🇸', city: 'New York', head: 'Michael Reeves',   role: 'Country Head — USA',        blurb: 'North American office — enterprise partnerships, advisory, and growth.', image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80' },
]

export default function CountriesOverview() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a] text-white overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="Tier 04 · Country-Based Management"
        title={<>Local leadership, <span className="italic text-brand-accent">four markets.</span></>}
        subtitle="Country heads and local teams across Oman, the UK, Bangladesh, and the US. Pick a country to meet the team."
        centered
      />

      <section className="relative">
        <div className="container-x py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 max-w-5xl mx-auto">
            {COUNTRIES.map((c, i) => (
              <Reveal key={c.code} delay={i * 100}>
                <Link
                  to={`/leadership/country/${c.code}`}
                  aria-label={`Open ${c.name} management team`}
                  className="group relative block rounded-2xl overflow-hidden
                             bg-white/5 backdrop-blur border border-white/10
                             transition-all duration-500
                             hover:-translate-y-1 hover:border-brand-accent/60
                             hover:bg-white/8"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-white/5">
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/40 to-transparent" />
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5
                                    rounded-full bg-white/95 backdrop-blur px-3 py-1
                                    text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep">
                      <span className="text-base leading-none">{c.flag}</span>
                      {c.name}
                    </div>
                    <div className="absolute bottom-0 inset-x-0 px-5 py-4">
                      <div className="font-serif text-xl text-white leading-tight">
                        {c.head}
                      </div>
                      <div className="text-[11px] uppercase tracking-[0.2em] text-brand-accent mt-1">
                        {c.role}
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between gap-4">
                    <p className="text-[12px] md:text-[13px] text-white/65 leading-snug">
                      {c.blurb}
                    </p>
                    <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5
                                     bg-brand-accent/15 border border-brand-accent/30
                                     text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent
                                     group-hover:gap-2 transition-all duration-300">
                      View Team <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
