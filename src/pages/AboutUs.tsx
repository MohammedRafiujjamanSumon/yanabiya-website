import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  ArrowRight, Target, Eye, Sparkles,
  Cpu, Globe2, Shirt, Handshake, Building2, Users,
  ChevronRight, Layers, MapPinned, ShieldCheck,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import BackButton from '../components/BackButton'

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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const capabilities = [
  { slug: 'it-software',       icon: Cpu       },
  { slug: 'export-import',     icon: Globe2    },
  { slug: 'clothing',          icon: Shirt     },
  { slug: 'agents-brokerage',  icon: Handshake },
  { slug: 'office-management', icon: Building2 },
  { slug: 'manpower',          icon: Users     },
]

const presence = [
  { code: 'OM', flag: '\u{1F1F4}\u{1F1F2}' },
  { code: 'GB', flag: '\u{1F1EC}\u{1F1E7}' },
  { code: 'BD', flag: '\u{1F1E7}\u{1F1E9}' },
  { code: 'US', flag: '\u{1F1FA}\u{1F1F8}' },
]

const triptychKeys = ['mission', 'vision', 'values'] as const
const triptychIcons = [Target, Eye, Sparkles]

export default function AboutUs() {
  const { t } = useTranslation()
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
    <main className="bg-brand-50 text-slate-900">
      <BackButton to="/#about" label={t('common.backToHome')} />

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
                {t('aboutPage.eyebrow')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight">
                {t('aboutPage.heroH1')}
                <span className="block text-brand-accentDark">{t('aboutPage.heroSpan')}</span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 text-lg md:text-xl text-slate-600 max-w-2xl leading-snug">
                {t('aboutPage.heroPara')}
              </p>
            </Reveal>

            {/* Executive summary, three proof points at a glance */}
            <Reveal delay={460}>
              <div className="mt-12 grid sm:grid-cols-3 gap-3 max-w-3xl">
                {[
                  { icon: Layers,      labelKey: 'sectors',   bodyKey: 'sectors' },
                  { icon: MapPinned,   labelKey: 'countries', bodyKey: 'countries' },
                  { icon: ShieldCheck, labelKey: 'trust',     bodyKey: 'trust' },
                ].map((s) => (
                  <div
                    key={s.labelKey}
                    className="rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm
                               p-4 transition-all duration-300
                               hover:border-brand-accent/50 hover:-translate-y-0.5
                               hover:shadow-[0_12px_30px_-12px_rgba(158,199,58,0.35)]"
                  >
                    <div className="flex items-center gap-2 text-brand-accentDark">
                      <s.icon size={16} strokeWidth={1.8} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em]">
                        {t(`aboutPage.proof.${s.labelKey}.label`)}
                      </span>
                    </div>
                    <p className="mt-2 text-[13px] text-slate-600 leading-snug">
                      {t(`aboutPage.proof.${s.bodyKey}.body`)}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 2. WHO WE ARE ───────── */}
      <section id="identity" className="relative py-14 md:py-14 bg-brand-50 border-y border-slate-100 scroll-mt-28">
        <div className="container-x grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
              {t('aboutPage.identity.kicker')}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight">
              {t('aboutPage.identity.title')}
            </h2>
          </Reveal>

          <div className="lg:col-span-7 space-y-5 text-slate-600 text-lg leading-snug">
            <Reveal>
              <p>{t('aboutPage.identity.p1')}</p>
            </Reveal>
            <Reveal delay={120}>
              <p>{t('aboutPage.identity.p2')}</p>
            </Reveal>
            <Reveal delay={240}>
              <p>{t('aboutPage.identity.p3')}</p>
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
                {t('aboutPage.identity.viewMore')} <ChevronRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── 3. MISSION, VISION, VALUES ───────── */}
      <section id="principles" className="relative py-4 md:py-6 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('aboutPage.principles.kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('aboutPage.principles.title')}
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {triptychKeys.map((key, i) => {
              const Icon = triptychIcons[i]
              return (
              <Reveal key={key} delay={i * 150}>
                <div className="group relative h-full rounded-2xl bg-brand-50 border border-brand-deep/15 p-7
                                hover:border-brand-accent/40 hover:-translate-y-1
                                hover:shadow-[0_20px_60px_-20px_rgba(158,199,58,0.4)]
                                transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 text-brand-accentDark
                                  grid place-items-center transition-transform duration-300
                                  group-hover:rotate-6 group-hover:bg-brand-accent group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div className="mt-5 text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-accentDark">
                    {t(`aboutPage.principles.${key}.eyebrow`)}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl leading-tight">{t(`aboutPage.principles.${key}.title`)}</h3>
                  <p className="mt-3 text-slate-600 leading-snug">{t(`aboutPage.principles.${key}.body`)}</p>
                </div>
              </Reveal>
              )
            })}
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
                {t('aboutPage.principles.cta')} <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 4. WHAT WE DO ───────── */}
      <section id="capability" className="relative py-14 md:py-14 bg-brand-50 border-y border-slate-100 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('aboutPage.capability.kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('aboutPage.capability.title')}
              </h2>
            </Reveal>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {capabilities.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  to={`/business/${c.slug}`}
                  className="group relative block h-full rounded-2xl border border-slate-200 bg-brand-50
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
                    <h3 className="mt-4 font-serif text-xl leading-tight">{t(`businesses.items.${c.slug}.title`, c.slug)}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-snug">{t(`businesses.items.${c.slug}.body`, c.slug)}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider
                                    text-brand-accentDark opacity-0 -translate-x-1
                                    group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                      {t('common.explore')} <ChevronRight size={12} />
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
                {t('aboutPage.capability.cta')} <ChevronRight size={14} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────── 5. GLOBAL PRESENCE ───────── */}
      <section id="presence" className="relative py-4 md:py-6 scroll-mt-28">
        <div className="container-x">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <Reveal>
              <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accentDark mb-4">
                {t('aboutPage.presence.kicker')}
              </div>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                {t('aboutPage.presence.title')}
              </h2>
            </Reveal>
          </div>

          {/* Stat strip */}
          <Reveal delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
              {[
                { value: '4',    labelKey: 'countries' },
                { value: '6',    labelKey: 'sectors' },
                { value: '10+',  labelKey: 'years' },
                { value: '24/7', labelKey: 'operations' },
              ].map((s) => (
                <div
                  key={s.labelKey}
                  className="rounded-2xl border border-slate-200 bg-brand-50 p-5 text-center"
                >
                  <div className="font-serif text-3xl md:text-4xl text-brand-accentDark">{s.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-600">{t(`aboutPage.presence.stats.${s.labelKey}`)}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {presence.map((p, i) => (
              <Reveal key={p.code} delay={i * 100}>
                <Link
                  to={`/country/${p.code.toLowerCase()}`}
                  className="group block rounded-2xl border border-slate-200 bg-brand-50 p-5
                             hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
                >
                  <div className="text-3xl">{p.flag}</div>
                  <div className="mt-3 font-serif text-lg leading-tight">{t(`global.nodes.${p.code}.name`)}</div>
                  <div className="text-[11px] uppercase tracking-wider text-brand-accentDark mt-1">
                    {t(`aboutPage.presence.tags.${p.code}`)}
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
                {t('aboutPage.presence.cta')} <ArrowRight size={14} />
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

        <div className="container-x relative py-4 md:py-6 text-center">
          <Reveal>
            <div className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-accent mb-5">
              {t('aboutPage.fullStory.eyebrow')}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight max-w-3xl mx-auto">
              {t('aboutPage.fullStory.h2Part1')}
              <span className="block text-brand-accent">{t('aboutPage.fullStory.h2Part2')}</span>
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
                {t('aboutPage.fullStory.cta')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  )
}
