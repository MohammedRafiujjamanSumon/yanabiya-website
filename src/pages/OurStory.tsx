import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Compass, Globe2, Leaf, Sparkles, Target,
  Quote, ChevronRight, MapPin,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

/* ───────────────────────── Story data (images only — text from i18n) ───────────────────────── */

function countryFlag(code: string) {
  const base = 0x1F1E6 - 65
  return String.fromCodePoint(base + code.charCodeAt(0), base + code.charCodeAt(1))
}

const regionImages: Record<string, { name: string; image: string }> = {
  OM: { name: 'Oman',           image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=80' },
  GB: { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80' },
  BD: { name: 'Bangladesh',     image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80' },
  US: { name: 'United States',  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=80' },
}

const leaderImages = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
]

const missionImages = [
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80',
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1000&q=80',
]

const stewardStats = [
  { icon: Leaf,     value: '6',    key: 'sustainabilityProgrammes' },
  { icon: Sparkles, value: '4',    key: 'communitiesServed' },
  { icon: Target,   value: '12+',  key: 'welfarePartnerships' },
  { icon: Compass,  value: '24/7', key: 'opsEthics' },
]

/* ───────────────────────── Page ───────────────────────── */

export default function OurStory() {
  const { t } = useTranslation()
  const storyLines = t('ourStory.storyLines', { returnObjects: true }) as string[]
  const milestones = t('ourStory.milestones', { returnObjects: true }) as Array<{ year: string; title: string; body: string }>
  const leaders = t('ourStory.leaders', { returnObjects: true }) as Array<{ name: string; role: string; quote: string }>
  const missionInAction = t('ourStory.missionInAction', { returnObjects: true }) as Array<{ quote: string; body: string }>

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="bg-brand-50 text-slate-900">
      <BackButton to="/about-us" label={t('ourStory.backToAbout')} />

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

        <div className="container-x relative z-10">
          <div className="max-w-4xl">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-accent mb-6">
                {t('ourStory.eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[112px] leading-[0.95] tracking-tight">
                {t('ourStory.heroTitle')}
                <span className="block text-brand-accent">{t('ourStory.heroAccent')}</span>
              </h1>
            </Reveal>
            <Reveal delay={320}>
              <p className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-snug">
                {t('ourStory.heroPara')}
              </p>
            </Reveal>
            <Reveal delay={520}>
              <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                <span className="w-12 h-px bg-white/30" />
                {t('ourStory.scrollToBegin')}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Soft fade at bottom */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#fbfdfb]/80" />
      </section>

      {/* ───────── 2. OUR STORY, line-by-line reveal ───────── */}
      <section className="relative py-4 md:py-6">
        <div className="container-x">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-10 text-center">
                {t('ourStory.s01kicker')}
              </div>
            </Reveal>
            <div className="space-y-8 md:space-y-5 text-center">
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
      <section className="relative py-4 md:py-6 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('ourStory.s02kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('ourStory.s02Title')}
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
                        src={missionImages[i]}
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
      <section className="relative py-4 md:py-6 overflow-hidden bg-brand-50">
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
                {t('ourStory.s03kicker')}
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                {t('ourStory.s03Title')}
                <span className="block mt-2 text-brand-accentDark">{t('ourStory.s03Accent')}</span>
              </h2>
            </Reveal>
            <Reveal delay={350}>
              <p className="mt-8 text-lg text-slate-600 leading-snug max-w-2xl mx-auto">
                {t('ourStory.s03Para')}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 5. JOURNEY TIMELINE ───────── */}
      <section className="relative py-4 md:py-6 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('ourStory.s04kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('ourStory.s04Title')}
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

            <div className="space-y-6">
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

      {/* ───────── 6. GLOBAL STRATEGY, Region Chapters ───────── */}
      <section className="relative bg-brand-50">
        <div className="container-x py-4 md:py-6">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('ourStory.s05kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('ourStory.s05Title')}
              </h2>
            </Reveal>
          </div>
        </div>

        {Object.entries(regionImages).map(([code, r], i) => {
          const reverse = i % 2 === 1
          const regionT = t(`ourStory.regions.${code}`, { returnObjects: true }) as { tag: string; body: string }
          return (
            <div
              key={code}
              className={`relative overflow-hidden border-t border-slate-100 ${i === Object.keys(regionImages).length - 1 ? 'border-b' : ''}`}
            >
              <div className={`container-x py-4 md:py-6 grid lg:grid-cols-12 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <Reveal className="lg:col-span-7">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={r.image}
                      alt={r.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-5 left-5 text-brand-deep text-3xl">{countryFlag(code)}</div>
                  </div>
                </Reveal>
                <Reveal delay={150} className="lg:col-span-5">
                  <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-3">
                    {t('ourStory.chapterPrefix')}{i + 1}, {regionT.tag}
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl leading-tight">
                    {r.name}
                  </h3>
                  <p className="mt-5 text-slate-600 text-lg leading-snug">
                    {regionT.body}
                  </p>
                  <Link
                    to={`/country/${code.toLowerCase()}`}
                    className="mt-6 inline-flex items-center gap-2 text-brand-accentDark font-semibold
                               hover:gap-3 transition-all"
                  >
                    {t('ourStory.visitCountry')} {r.name} <ChevronRight size={16} />
                  </Link>
                </Reveal>
              </div>
            </div>
          )
        })}
      </section>

      {/* ───────── 7. LEADERSHIP ───────── */}
      <section className="relative py-4 md:py-6 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('ourStory.s06kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('ourStory.s06Title')}
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {leaders.map((l, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="group relative rounded-2xl overflow-hidden bg-brand-50 border border-slate-200
                                hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={leaderImages[i]}
                      alt={l.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-brand-accentDark text-[11px] font-semibold tracking-[0.25em] uppercase">
                      {l.role}
                    </div>
                    <h3 className="mt-2 font-serif text-2xl">{l.name}</h3>
                    <blockquote className="mt-4 text-slate-600 italic leading-snug border-l-2 border-brand-accent pl-4">
                      "{l.quote}"
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
              {t('ourStory.meetFullTeam')} <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── 8. SUSTAINABILITY & COMMUNITY ───────── */}
      <section className="relative py-4 md:py-6 bg-brand-50">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-center">
          <Reveal className="lg:col-span-6">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
              {t('ourStory.s07kicker')}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {t('ourStory.s07Title')}
            </h2>
            <p className="mt-5 text-slate-600 text-lg leading-snug">
              {t('ourStory.s07Para')}
            </p>
            <Link
              to="/community/sustainable-growth"
              className="mt-6 inline-flex items-center gap-2 text-brand-accentDark font-semibold hover:gap-3 transition-all"
            >
              {t('ourStory.exploreImpact')} <ChevronRight size={16} />
            </Link>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              {stewardStats.map(({ icon: Icon, value, key }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-slate-200 bg-brand-50 p-6 text-center
                             hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-accent/10 text-brand-accentDark grid place-items-center mx-auto">
                    <Icon size={20} />
                  </div>
                  <div className="mt-4 font-serif text-3xl text-brand-accentDark">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-600">
                    {t(`ourStory.stewardStats.${key}`)}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 9. PARTNERSHIPS ───────── */}
      <section className="relative py-4 md:py-6 bg-brand-50 border-y border-slate-100">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('ourStory.s08kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                {t('ourStory.s08Title')}
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
                {t('ourStory.seeNetwork')}
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

        <div className="container-x relative py-4 md:py-6 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-6">
              {t('ourStory.s09kicker')}
            </div>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05]">
              {t('ourStory.s09Title')}
              <span className="block text-brand-accent">{t('ourStory.s09Accent')}</span>
            </h2>
          </Reveal>
          <Reveal delay={350}>
            <p className="mt-8 text-lg text-brand-deep/70 max-w-xl mx-auto leading-snug">
              {t('ourStory.s09Para')}
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
                {t('ourStory.startConversation')}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/#businesses"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4
                           border border-white/30 text-brand-deep font-semibold uppercase tracking-wider text-sm
                           hover:bg-white/10 hover:border-white transition-all"
              >
                <MapPin size={16} />
                {t('ourStory.exploreSectors')}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
