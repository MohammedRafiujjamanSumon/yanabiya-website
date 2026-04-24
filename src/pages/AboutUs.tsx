import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Target, Eye, Sparkles,
  Cpu, Globe2, Shirt, Handshake, Building2, Users,
  ChevronRight,
} from 'lucide-react'
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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const triptych = [
  {
    icon: Target,
    eyebrow: 'Mission',
    title: 'Why we exist',
    body: 'Build, scale, and operate diversified ventures with technology, trade, and trust at the centre — across every market we enter.',
  },
  {
    icon: Eye,
    eyebrow: 'Vision',
    title: 'Where we’re going',
    body: 'A trusted global ecosystem where many businesses share one operating discipline, one set of values, and one long-term horizon.',
  },
  {
    icon: Sparkles,
    eyebrow: 'Values',
    title: 'How we work',
    body: 'Quality before scale. Relationships before transactions. People before process. Three rules — applied without exception.',
  },
]

const capabilities = [
  { slug: 'it-software',       icon: Cpu,        label: 'IT & Software',          desc: 'Custom software, ERP, cloud, and AI engineering.' },
  { slug: 'export-import',     icon: Globe2,     label: 'Global Trade',           desc: 'Sourcing, freight, customs, and end-to-end fulfilment.' },
  { slug: 'clothing',          icon: Shirt,      label: 'Clothing & Accessories', desc: 'Private-label, bulk garment sourcing, and brand support.' },
  { slug: 'agents-brokerage',  icon: Handshake,  label: 'Agents & Brokerage',     desc: 'Cross-border deals, market entry, and partnerships.' },
  { slug: 'office-management', icon: Building2,  label: 'Office Management',      desc: 'Serviced offices, PRO, accounting, and admin.' },
  { slug: 'manpower',          icon: Users,      label: 'Global Mobility',        desc: 'Workforce, student, and aviation services.' },
]

const presence = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman',           tag: 'Headquarters' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', tag: 'European Operations' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh',     tag: 'South Asia Operations' },
  { code: 'US', flag: '🇺🇸', name: 'United States',  tag: 'North America Operations' },
]

export default function AboutUs() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Wait one frame so the section has mounted before scrolling.
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [hash])

  return (
    <main className="bg-[#fbfdfb] text-slate-900">

      {/* ───────── 1. HERO ───────── */}
      <section id="hero" className="relative min-h-[70vh] flex items-center overflow-hidden scroll-mt-28">
        <div
          aria-hidden="true"
          className="absolute -top-40 left-1/3 w-[520px] h-[520px] rounded-full
                     bg-brand-accent/15 blur-[120px] animate-gradient"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -right-20 w-[460px] h-[460px] rounded-full
                     bg-brand-accent/10 blur-[120px] animate-gradient"
          style={{ animationDelay: '3s' }}
        />

        <div className="container-x relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accentDark mb-6">
                About Yanabiya Group
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight">
                Built to connect.
                <span className="block text-brand-accentDark">Designed to endure.</span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed">
                A diversified international group operating as one platform —
                across technology, trade, talent, and consulting in four countries.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 2. WHO WE ARE ───────── */}
      <section id="identity" className="relative py-24 md:py-28 bg-white border-y border-slate-100 scroll-mt-28">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
              01 · Identity
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Who we are.
            </h2>
          </Reveal>

          <div className="lg:col-span-7 space-y-5 text-slate-600 text-lg leading-relaxed">
            <Reveal>
              <p>
                Yanabiya Group is a diversified global enterprise originating in
                Al Khuwair, Muscat — operating today across the United Kingdom,
                Bangladesh, and the United States.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p>
                We don’t run as a single-sector company. We run as a platform —
                where multiple ventures share one operating discipline and one
                long-term horizon, while remaining independent where they need to be.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p>
                That structure is how a six-sector group stays coherent across four
                countries. Innovation, execution, and operational capability move
                together — not in silos.
              </p>
            </Reveal>
            <Reveal delay={360}>
              <a
                href="#principles"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="mt-2 inline-flex items-center gap-2 rounded-full px-5 py-2.5
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark hover:-translate-y-0.5
                           transition-all"
              >
                View More <ChevronRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 3. MISSION · VISION · VALUES ───────── */}
      <section id="principles" className="relative py-24 md:py-32 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                02 · Principles
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                What we stand for.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {triptych.map((t, i) => (
              <Reveal key={t.eyebrow} delay={i * 150}>
                <div className="group relative h-full rounded-2xl bg-white border border-slate-200 p-7
                                hover:border-brand-accent/40 hover:-translate-y-1
                                hover:shadow-[0_20px_60px_-20px_rgba(158,199,58,0.4)]
                                transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accentDark
                                  grid place-items-center transition-transform duration-300
                                  group-hover:rotate-6 group-hover:bg-brand-accent group-hover:text-white">
                    <t.icon size={22} />
                  </div>
                  <div className="mt-5 text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-accentDark">
                    {t.eyebrow}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{t.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="mt-10 text-center">
              <a
                href="#capability"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('capability')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark hover:-translate-y-0.5
                           transition-all"
              >
                Explore What We Do <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 4. WHAT WE DO ───────── */}
      <section id="capability" className="relative py-24 md:py-28 bg-white border-y border-slate-100 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                03 · Capability
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Six sectors. One discipline.
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {capabilities.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  to={`/business/${c.slug}`}
                  className="group relative block h-full rounded-2xl border border-slate-200 bg-white
                             p-6 overflow-hidden
                             hover:border-brand-accent/40 hover:-translate-y-0.5 hover:shadow-lg
                             transition-all duration-300"
                >
                  {/* Hover fill */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-brand-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="relative">
                    <div className="w-11 h-11 rounded-lg bg-brand-accent/10 text-brand-accentDark
                                    grid place-items-center transition-transform duration-300
                                    group-hover:scale-110 group-hover:bg-brand-accent group-hover:text-white">
                      <c.icon size={20} />
                    </div>
                    <h3 className="mt-4 font-serif text-xl leading-tight">{c.label}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider
                                    text-brand-accentDark opacity-0 -translate-x-1
                                    group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      Explore <ChevronRight size={12} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={600}>
            <div className="mt-10 text-center">
              <a
                href="#presence"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('presence')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark hover:-translate-y-0.5
                           transition-all"
              >
                See Our Global Presence <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 5. GLOBAL PRESENCE ───────── */}
      <section id="presence" className="relative py-24 md:py-32 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                04 · Presence
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                One platform. Four homes.
              </h2>
            </Reveal>
          </div>

          {/* Stat strip */}
          <Reveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
              {[
                { value: '4',   label: 'Countries' },
                { value: '6',   label: 'Sectors' },
                { value: '10+', label: 'Years' },
                { value: '24/7', label: 'Operations' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-center"
                >
                  <div className="font-serif text-3xl md:text-4xl text-brand-accentDark">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-600">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {presence.map((p, i) => (
              <Reveal key={p.code} delay={i * 100}>
                <Link
                  to={`/country/${p.code.toLowerCase()}`}
                  className="group block rounded-2xl border border-slate-200 bg-white p-5
                             hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl">{p.flag}</div>
                  <div className="mt-3 font-serif text-lg leading-tight">{p.name}</div>
                  <div className="text-[11px] uppercase tracking-wider text-brand-accentDark mt-1">
                    {p.tag}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={500}>
            <div className="mt-10 text-center">
              <Link
                to="/#businesses"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                           transition-all"
              >
                Explore Our Business <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 6. TRANSITION CTA ───────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center pointer-events-none"
        >
          <div className="w-[520px] h-[520px] rounded-full bg-brand-accent/15 blur-[120px] animate-halo" />
        </div>

        <div className="container-x relative py-20 md:py-28 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
              The Full Story
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto">
              Every group has a story.
              <span className="block text-brand-accent">Ours is just beginning.</span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-10">
              <Link
                to="/about/our-story"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4
                           bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                           shadow-lg hover:bg-brand-accentDark hover:shadow-2xl hover:-translate-y-0.5
                           transition-all"
              >
                Discover Our Full Story
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="bg-[#fbfdfb] py-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-brand-accentDark transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </main>
  )
}
