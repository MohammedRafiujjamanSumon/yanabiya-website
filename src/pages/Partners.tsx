import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, Handshake, Users2, ArrowRight, Sparkles } from 'lucide-react'
import BackButton from '../components/BackButton'
import { partners, valuableClients, memberships } from '../data/partners'
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

export default function Partners() {
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [])

  return (
    <main className="relative bg-[#fbfdfb] text-slate-900 overflow-hidden min-h-screen">
      <BackButton to="/" label="Back to Home" />

      {/* Ambient glow */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      {/* HERO */}
      <section className="relative">
        <div className="container-x py-14 md:py-20 text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-4">
              <Sparkles size={12} />
              Trusted Network
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-brand-deep">
              The names behind every delivery.
            </h1>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
              Technology partners, memberships, and clients we serve — the network that makes Yanabiya Group execute.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 text-[11px]">
              <a href="#technology" className="rounded-full px-3 py-1.5 border border-slate-300 text-slate-700 font-semibold uppercase tracking-wider hover:border-brand-accentDark hover:text-brand-accentDark transition">
                Technology · {partners.length}
              </a>
              <a href="#memberships" className="rounded-full px-3 py-1.5 border border-slate-300 text-slate-700 font-semibold uppercase tracking-wider hover:border-brand-accentDark hover:text-brand-accentDark transition">
                Memberships · {memberships.length}
              </a>
              <a href="#clients" className="rounded-full px-3 py-1.5 border border-slate-300 text-slate-700 font-semibold uppercase tracking-wider hover:border-brand-accentDark hover:text-brand-accentDark transition">
                Clients · {valuableClients.length}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TECHNOLOGY PARTNERS */}
      <CategorySection
        id="technology"
        eyebrow="Technology Stack"
        title="Technology partners."
        body="Hyperscalers, enterprise software, and hardware platforms behind our IT and trade systems."
        icon={Handshake}
        items={partners}
      />

      {/* MEMBERSHIPS */}
      <CategorySection
        id="memberships"
        eyebrow="Affiliations"
        title="Memberships & accreditations."
        body="Industry bodies and regulatory affiliations that anchor our cross-border operations."
        icon={Award}
        items={memberships}
      />

      {/* CLIENTS */}
      <CategorySection
        id="clients"
        eyebrow="Trusted By"
        title="Valuable clients."
        body="A selection of organisations we've delivered for — across sectors and countries."
        icon={Users2}
        items={valuableClients}
      />

      {/* CTA */}
      <section className="relative py-16 md:py-24">
        <div className="container-x max-w-4xl mx-auto">
          <Reveal>
            <div className="rounded-3xl bg-brand-deep text-white p-8 md:p-12 text-center
                            shadow-[0_30px_70px_-30px_rgba(15,58,35,0.5)]">
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accent mb-4">
                Become a Partner
              </div>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl mx-auto">
                Building something that needs a network like ours?
              </h2>
              <p className="mt-4 text-white/70 text-base leading-relaxed max-w-xl mx-auto">
                We're always evaluating new partnerships across technology, trade, and operations.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3
                           bg-brand-accent text-brand-deep font-semibold uppercase tracking-wider text-xs
                           shadow-lg hover:bg-white hover:-translate-y-0.5
                           transition-all"
              >
                Get in Touch <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

/* ───────────── CategorySection ───────────── */

function CategorySection({
  id,
  eyebrow,
  title,
  body,
  icon: Icon,
  items,
}: {
  id: string
  eyebrow: string
  title: string
  body: string
  icon: typeof Handshake
  items: { name: string; logo: string }[]
}) {
  return (
    <section id={id} className="relative py-12 md:py-16 scroll-mt-28">
      <div className="container-x max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:items-end mb-8">
          <Reveal className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.32em] uppercase text-brand-accentDark mb-3">
              <Icon size={12} />
              {eyebrow}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-deep leading-tight">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <p className="text-slate-600 leading-relaxed">
              {body}
            </p>
            <div className="mt-3 text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
              {items.length} {items.length === 1 ? 'entry' : 'entries'}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {items.map((p, i) => (
            <Reveal key={p.name + i} delay={Math.min(i, 10) * 40}>
              <div
                title={p.name}
                className="group h-full rounded-2xl bg-white border border-slate-200
                           p-4 aspect-[5/3] flex items-center justify-center
                           transition-all duration-300
                           hover:border-brand-accent/50 hover:-translate-y-0.5
                           hover:shadow-[0_18px_40px_-20px_rgba(158,199,58,0.45)]"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain
                             grayscale opacity-80 transition-all duration-300
                             group-hover:grayscale-0 group-hover:opacity-100"
                  onError={(e) => {
                    const img = e.currentTarget
                    img.style.display = 'none'
                    const parent = img.parentElement
                    if (parent && !parent.querySelector('.fallback')) {
                      const span = document.createElement('span')
                      span.className = 'fallback text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center'
                      span.textContent = p.name
                      parent.appendChild(span)
                    }
                  }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
