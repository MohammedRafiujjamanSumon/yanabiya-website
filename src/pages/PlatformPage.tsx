import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import BackButton from '../components/BackButton'

export type PlatformConfig = {
  eyebrow: string
  icon: LucideIcon
  accent: string
  headline: string
  headlineAccent: string
  intro: string
  primary: { label: string; href: string; external?: boolean; icon?: LucideIcon }
  secondary?: { label: string; to: string }
  sectionLabel: string
  sectionTitle: string
  features: { icon: LucideIcon; title: string; body: string }[]
  closingTitle: string
  closingBody: string
}

export default function PlatformPage({ config }: { config: PlatformConfig }) {
  const { t } = useTranslation()
  const { icon: Eyebrow, primary } = config
  const PrimaryIcon = primary.icon

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [config])

  const PrimaryCta = primary.external ? (
    <a
      href={primary.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                 bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                 shadow-lg hover:bg-brand-accentDark hover:-translate-y-0.5 transition-all"
    >
      {PrimaryIcon && <PrimaryIcon size={16} />} {primary.label}
    </a>
  ) : (
    <Link
      to={primary.href}
      className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                 bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                 shadow-lg hover:bg-brand-accentDark hover:-translate-y-0.5 transition-all"
    >
      {PrimaryIcon && <PrimaryIcon size={16} />} {primary.label}
    </Link>
  )

  return (
    <main className="bg-brand-50 text-brand-deep">
      <BackButton to="/" label={t('common.back', 'Back')} />

      {/* HERO — centered, white */}
      <section className="relative overflow-hidden bg-white text-brand-deep">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full blur-[130px]"
            style={{ background: `${config.accent}1f` }}
          />
        </div>
        <div className="relative z-10 container-x py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
            <div
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] rounded-full px-4 py-1.5 mb-6 border"
              style={{ color: config.accent, background: `${config.accent}14`, borderColor: `${config.accent}33` }}
            >
              <Eyebrow size={13} /> {config.eyebrow}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              {config.headline}
              <span className="block" style={{ color: config.accent }}>{config.headlineAccent}</span>
            </h1>
            <p className="mt-6 text-lg text-brand-deep/70 leading-relaxed max-w-2xl mx-auto">
              {config.intro}
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {PrimaryCta}
              {config.secondary && (
                <Link
                  to={config.secondary.to}
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                             border border-brand-deep/25 text-brand-deep font-semibold uppercase tracking-wider text-sm
                             hover:border-brand-accent hover:text-brand-accentDark transition-all"
                >
                  {config.secondary.label} <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white border-y border-brand-deep/10">
        <div className="container-x py-14 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accentDark mb-3">
              {config.sectionLabel}
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              {config.sectionTitle}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {config.features.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-deep/10 bg-brand-50 p-6
                           hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div
                  className="w-11 h-11 rounded-xl grid place-items-center"
                  style={{ background: `${config.accent}1a`, color: config.accent }}
                >
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm text-brand-deep/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-16 md:py-24 text-center">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
          {config.closingTitle}
        </h2>
        <p className="mt-5 text-brand-deep/65 max-w-xl mx-auto leading-relaxed">
          {config.closingBody}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {primary.external ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-8 py-4
                         bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                         shadow-lg hover:bg-brand-accentDark hover:-translate-y-0.5 transition-all"
            >
              {primary.label} <ExternalLink size={15} />
            </a>
          ) : PrimaryCta}
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4
                       border border-brand-deep/25 text-brand-deep font-semibold uppercase tracking-wider text-sm
                       hover:border-brand-accent hover:text-brand-accentDark transition-all"
          >
            {t('common.contactUs', 'Contact Us')} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
