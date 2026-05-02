import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Compass, Globe2, Leaf, Sparkles, Target,
  Quote, ChevronRight, MapPin,
} from 'lucide-react'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'
import BackButton from '../components/BackButton'

/* ───────────────────────── Reveal helpers ───────────────────────── */

function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'p' | 'h2' | 'h3' | 'span' | 'li'
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <Tag
      ref={ref as never}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ───────────────────────── Story data ───────────────────────── */

const storyLines = [
  'It started in Muscat — one office, one belief.',
  'That trust outlasts trends, and craftsmanship outlasts shortcuts.',
  'A decade on, that belief reaches four countries and six sectors.',
  'We didn’t set out to build a single company.',
  'We set out to build a platform — where many ventures could share one spine.',
  'Today, every Yanabiya business runs on the same operating principles.',
  'Quality before scale. Relationships before transactions. People before process.',
  'From Gulf trade routes to UK boardrooms.',
  'From Dhaka engineering floors to Texas advisory rooms —',
  'we connect markets, capital, and capability.',
  'And the story is still being written.',
  'One chapter at a time.',
]

const milestones = [
  { year: '2014', title: 'Founded in Muscat', body: 'Yanabiya Gulf International Business & Trade SPC opens its doors in Al Khuwair.' },
  { year: '2017', title: 'Trade routes expand',  body: 'Cross-border operations established across Gulf and South Asia corridors.' },
  { year: '2019', title: 'Engineering hub',      body: 'Bangladesh delivery centre launches — software, QA, and 24×7 support.' },
  { year: '2022', title: 'European footprint',   body: 'Yanabiya Gulf International UK Ltd. registered in London for EMEA operations.' },
  { year: '2024', title: 'North America entry',  body: 'Yanabiya Gulf International US LLC opens in Austin, Texas.' },
  { year: '2026', title: 'Group platform',       body: 'Six diversified business units operating under one unified ecosystem.' },
]

const regions = [
  {
    code: 'OM', flag: '🇴🇲',
    name: 'Oman', tag: 'Headquarters',
    body: 'Where the story began. Our Muscat office anchors group strategy, regulatory intelligence, and Gulf trade operations.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=80',
  },
  {
    code: 'GB', flag: '🇬🇧',
    name: 'United Kingdom', tag: 'European Operations',
    body: 'A London base for client engagements, partnerships, and regulated advisory work across EMEA.',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80',
  },
  {
    code: 'BD', flag: '🇧🇩',
    name: 'Bangladesh', tag: 'South Asia Operations',
    body: 'Our engineering and apparel hub. Where craft meets capacity — at scale, with discipline.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80',
  },
  {
    code: 'US', flag: '🇺🇸',
    name: 'United States', tag: 'North America Operations',
    body: 'Frontier-tech advisory and partner network for the Americas — from Austin into the wider continent.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=80',
  },
]

const leaders = [
  {
    name: 'Founder & Chairman',
    role: 'Strategy · Group Vision',
    quote: 'We deliver what we promise — and we measure ourselves by what survives the year, not the quarter.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: 'Vice Chairman',
    role: 'Operations · Global Delivery',
    quote: 'Our job is to make a four-country group feel like one team in one room.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
  },
]

const missionInAction = [
  {
    quote: 'Quality before scale.',
    body: 'Every engagement starts with a single question — would we be proud of this in five years?',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    quote: 'Relationships before transactions.',
    body: 'Most of our business comes from clients who came back. That’s the only metric we trust.',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80',
  },
  {
    quote: 'People before process.',
    body: 'Process serves people, not the other way around. We hire well and we trust deeply.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80',
  },
]

/* ───────────────────────── Page ───────────────────────── */

export default function OurStory() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="bg-brand-50 text-slate-900">
      <BackButton to="/about-us" label="Back to About Us" />

      {/* ───────── 1. CINEMATIC HERO ───────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-brand-deep text-white">
        {/* Background motion: dual gradient orbs + subtle grid */}
        <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-[0.06]" />
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full
                     bg-brand-accent/30 blur-[140px] animate-gradient"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-60 -right-40 w-[720px] h-[720px] rounded-full
                     bg-brand-accent/20 blur-[160px] animate-gradient"
          style={{ animationDelay: '4s' }}
        />
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img src={assets.logo} alt="" className="w-[60%] max-w-[700px] opacity-[0.05] object-contain" />
        </div>

        <div className="container-x relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accent mb-6">
                Yanabiya Group · Our Story
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[112px] leading-[0.95] tracking-tight">
                From Muscat.
                <span className="block text-brand-accent">For the World.</span>
              </h1>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-snug">
                A decade of building enterprises across four countries — written one
                relationship, one delivery, one chapter at a time.
              </p>
            </Reveal>
            <Reveal delay={520}>
              <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                <span className="w-12 h-px bg-white/30" />
                Scroll to begin
              </div>
            </Reveal>
          </div>
        </div>

        {/* Soft fade at bottom */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#fbfdfb]/80" />
      </section>

      {/* ───────── 2. OUR STORY — line-by-line reveal ───────── */}
      <section className="relative py-12 md:py-14">
        <div className="container-x">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-10 text-center">
                01 · The Story
              </div>
            </Reveal>
            <div className="space-y-8 md:space-y-10 text-center">
              {storyLines.map((line, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="font-serif text-2xl md:text-3xl leading-snug text-slate-900">
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 3. MISSION IN ACTION ───────── */}
      <section className="relative py-14 md:py-20 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                02 · Mission in Action
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Three principles. One discipline.
              </h2>
            </Reveal>
          </div>

          <div className="space-y-20 md:space-y-28">
            {missionInAction.map((m, i) => {
              const reverse = i % 2 === 1
              return (
                <div
                  key={i}
                  className={`grid lg:grid-cols-12 gap-8 lg:gap-16 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <Reveal className="lg:col-span-5">
                    <Quote className="text-brand-accent" size={28} />
                    <h3 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">
                      {m.quote}
                    </h3>
                    <p className="mt-4 text-slate-600 text-lg leading-snug max-w-md">
                      {m.body}
                    </p>
                  </Reveal>
                  <Reveal delay={120} className="lg:col-span-7">
                    <div className="relative aspect-[5/3] rounded-2xl overflow-hidden shadow-xl">
                      <img
                        src={m.image}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────── 4. VISION FOR THE FUTURE ───────── */}
      <section className="relative py-12 md:py-14 overflow-hidden bg-brand-50">
        {/* Floating particles */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute block w-1.5 h-1.5 rounded-full bg-brand-accent/40 animate-drift"
              style={{
                left: `${(i * 53) % 100}%`,
                bottom: `-${10 + (i * 7) % 40}px`,
                animationDelay: `${(i * 0.4) % 8}s`,
                animationDuration: `${10 + (i % 5)}s`,
              }}
            />
          ))}
        </div>

        <div className="container-x relative">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-6">
                03 · Vision Forward
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                The next decade isn’t about more.
                <span className="block mt-2 text-brand-accentDark">It’s about deeper.</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-8 text-lg text-slate-600 leading-snug max-w-2xl mx-auto">
                Deeper expertise across our six sectors. Deeper trust with the
                communities we serve. Deeper connections across the four countries
                we already call home.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 5. JOURNEY TIMELINE ───────── */}
      <section className="relative py-14 md:py-20 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                04 · The Journey
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                A decade in milestones.
              </h2>
            </Reveal>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Center spine */}
            <div
              aria-hidden="true"
              className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px
                         bg-gradient-to-b from-transparent via-brand-accent/50 to-transparent"
            />

            <div className="space-y-14">
              {milestones.map((m, i) => {
                const right = i % 2 === 1
                return (
                  <Reveal key={m.year} delay={i * 80}>
                    <div className={`relative grid md:grid-cols-2 gap-6 ${right ? '' : ''}`}>
                      {/* Spine dot */}
                      <span
                        aria-hidden="true"
                        className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-3 h-3 rounded-full
                                   bg-brand-accent ring-4 ring-white shadow-[0_0_0_1px_rgba(125,164,42,0.4)]"
                      />
                      <div className={`pl-10 md:pl-0 ${right ? 'md:order-2 md:pl-12' : 'md:pr-12 md:text-right'}`}>
                        <div className="text-brand-accentDark text-xs font-semibold tracking-[0.25em] uppercase">
                          {m.year}
                        </div>
                        <h3 className="mt-2 font-serif text-2xl md:text-3xl leading-tight">
                          {m.title}
                        </h3>
                        <p className="mt-2 text-slate-600 leading-snug max-w-md md:ml-auto md:mr-0">
                          {right ? m.body : m.body}
                        </p>
                      </div>
                      <div className="hidden md:block" />
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── 6. GLOBAL STRATEGY — Region Chapters ───────── */}
      <section className="relative bg-brand-50">
        <div className="container-x py-12 md:py-16">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                05 · Global Strategy
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                One platform. Four homes.
              </h2>
            </Reveal>
          </div>
        </div>

        {regions.map((r, i) => {
          const reverse = i % 2 === 1
          return (
            <div
              key={r.code}
              className={`relative overflow-hidden border-t border-slate-100 ${i === regions.length - 1 ? 'border-b' : ''}`}
            >
              <div className={`container-x py-12 md:py-14 grid lg:grid-cols-12 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal className="lg:col-span-7">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-brand-deep text-3xl">{r.flag}</div>
                  </div>
                </Reveal>
                <Reveal delay={150} className="lg:col-span-5">
                  <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-3">
                    Chapter 0{i + 1} · {r.tag}
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                    {r.name}
                  </h3>
                  <p className="mt-5 text-slate-600 text-lg leading-snug">
                    {r.body}
                  </p>
                  <Link
                    to={`/country/${r.code.toLowerCase()}`}
                    className="mt-6 inline-flex items-center gap-2 text-brand-accentDark font-semibold
                               hover:gap-3 transition-all"
                  >
                    Visit {r.name} <ChevronRight size={16} />
                  </Link>
                </Reveal>
              </div>
            </div>
          )
        })}
      </section>

      {/* ───────── 7. LEADERSHIP ───────── */}
      <section className="relative py-14 md:py-20 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                06 · Leadership
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                Stewards of the long view.
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {leaders.map((l, i) => (
              <Reveal key={l.name} delay={i * 120}>
                <div className="group relative rounded-2xl overflow-hidden bg-brand-50 border border-slate-200
                                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={l.image}
                      alt={l.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-brand-accentDark text-[11px] font-semibold tracking-[0.25em] uppercase">
                      {l.role}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl">{l.name}</h3>
                    <blockquote className="mt-4 text-slate-600 italic leading-snug border-l-2 border-brand-accent pl-4">
                      “{l.quote}”
                    </blockquote>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/leadership/management"
              className="inline-flex items-center gap-2 text-brand-accentDark font-semibold hover:gap-3 transition-all"
            >
              Meet the full team <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 8. SUSTAINABILITY & COMMUNITY ───────── */}
      <section className="relative py-14 md:py-20 bg-brand-50">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
              07 · Stewardship
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              Growth that gives back.
            </h2>
            <p className="mt-5 text-slate-600 text-lg leading-snug">
              Profit isn’t the only thing we measure. Across every country we operate
              in, we commit to community welfare programmes, education access, and
              environmental responsibility — because long-term value isn’t built any
              other way.
            </p>
            <Link
              to="/community/sustainable-growth"
              className="mt-6 inline-flex items-center gap-2 text-brand-accentDark font-semibold hover:gap-3 transition-all"
            >
              Explore our impact <ChevronRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Leaf,     value: '6',   label: 'Sustainability programmes' },
                { icon: Sparkles, value: '4',   label: 'Communities served' },
                { icon: Target,   value: '12+', label: 'Welfare partnerships' },
                { icon: Compass,  value: '24/7', label: 'Operational ethics review' },
              ].map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-brand-50 p-6 text-center
                             hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-accent/10 text-brand-accentDark grid place-items-center mx-auto">
                    <Icon size={20} />
                  </div>
                  <div className="mt-4 font-serif text-3xl text-brand-accentDark">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 9. PARTNERSHIPS ───────── */}
      <section className="relative py-12 md:py-16 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                08 · Network
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Trusted by enterprises across four continents.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={240}>
            <div className="text-center">
              <Link
                to="/#partnerships"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           border border-slate-300 text-slate-700 text-sm font-semibold
                           hover:border-brand-accent hover:text-brand-accentDark transition-colors"
              >
                <Globe2 size={16} />
                See our trusted network
                <ChevronRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 10. FINAL CTA ───────── */}
      <section className="relative bg-brand-deep text-white overflow-hidden">
        {/* Slow radial pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center pointer-events-none"
        >
          <div className="w-[600px] h-[600px] rounded-full bg-brand-accent/15 blur-[120px] animate-halo" />
        </div>

        <div className="container-x relative py-14 md:py-24 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
              09 · The Next Chapter
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
              Build the next chapter
              <span className="block text-brand-accent">with us.</span>
            </h2>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-8 text-lg text-brand-deep/70 max-w-xl mx-auto leading-snug">
              Whether you’re scaling a venture, sourcing a partner, or entering a new
              market — let’s talk about what’s possible.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4
                           bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                           shadow-lg hover:bg-brand-accentDark hover:shadow-2xl hover:-translate-y-0.5
                           transition-all"
              >
                Start a Conversation
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/#businesses"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4
                           border border-white/30 text-brand-deep font-semibold uppercase tracking-wider text-sm
                           hover:bg-white/10 hover:border-white transition-all"
              >
                <MapPin size={16} />
                Explore our sectors
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
