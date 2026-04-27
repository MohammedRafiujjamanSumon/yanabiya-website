import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { company } from '../data/company'

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container-x grid lg:grid-cols-2 gap-10 py-20 lg:py-28 items-center">
        <div>
          <div className="eyebrow mb-4">— Welcome to Yanabiya Group</div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-slate-900 leading-[1.05]">
            Built on Trust,<br />Driven by<br />Excellence
          </h1>
          <p className="mt-6 italic text-2xl text-brand-accent font-serif">{company.subTagline}</p>
          <p className="mt-6 text-slate-600 max-w-xl leading-snug">{company.heroDescription}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/our-businesses" className="btn-primary">
              Explore Our Work <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-ghost">Get in Touch</Link>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-square border-2 border-brand-accent/60 rounded-md relative">
            <div className="absolute inset-6 bg-gradient-to-br from-brand-accent/5 to-transparent rounded-md" />
            <div className="absolute -right-6 top-10 bottom-10 w-44 hidden md:flex flex-col gap-3">
              {company.stats.map((s) => (
                <div
                  key={s.label}
                  className="flex-1 bg-white/90 border border-brand-accent/40 rounded-md px-5 grid place-items-center text-center"
                >
                  <div>
                    <div className="font-serif text-3xl text-brand-accent">{s.value}</div>
                    <div className="text-[10px] tracking-[0.25em] text-slate-500 uppercase mt-1">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
