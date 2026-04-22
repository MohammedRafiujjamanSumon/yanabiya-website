import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Building2, Users, Globe, BadgeCheck } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const stats = [
  { icon: Users, value: '500+', kKey: 'clients' },
  { icon: Building2, value: '9', kKey: 'entities' },
  { icon: Globe, value: '4', kKey: 'countries' },
  { icon: BadgeCheck, value: '15Y+', kKey: 'track' },
]

const memberships = [
  'Oman Chamber of Commerce & Industry',
  'UK British-Arab Trade Network',
  'Bangladesh Chamber of Commerce',
  'AWS Partner Network',
  'Microsoft Partner Network',
  'Oracle Partner Network',
]

const networkBody = [
  "Yanabiya Group operates a trusted, multi-regional network that connects clients, partners, and communities across Oman, the UK, Bangladesh, and the USA. Our presence in these markets enables us to identify opportunities, coordinate resources, and deliver services at a global scale.",
  "We maintain active memberships with chambers of commerce, trade bodies, and industry associations — ensuring our operations remain aligned with global standards, regulatory frameworks, and international best practices.",
  "Our network is built on long-term relationships, not transactions. By collaborating with established organizations and reliable partners, we create strong, scalable global businesses that continue to generate value over time.",
]

export default function NetworkSection() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <Section id="network">
      <div className="container-x">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Eyebrow>{t('network.eyebrow')}</Eyebrow>
          <H2 className="text-center">{t('network.title')}</H2>
          <p className="mt-5 text-slate-600">
            {t('network.sub')}
            {' '}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 align-middle rounded-full
                         px-4 py-1.5 text-xs font-semibold uppercase tracking-wider
                         bg-brand-accent/10 text-brand-accentDark
                         hover:bg-brand-accent hover:text-white transition-colors
                         focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              {t('network.readMore', 'Read More')}
              <span aria-hidden>→</span>
            </button>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.kKey} className="card-panel text-center relative overflow-hidden">
              <div className="absolute -top-4 -end-4 w-24 h-24 bg-brand-accent/5 rounded-full blur-xl" />
              <s.icon className="text-brand-accent mx-auto mb-3 relative" />
              <div className="font-serif text-4xl text-slate-900 relative">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mt-1 relative">
                {t(`network.stats.${s.kKey}`)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="font-serif text-2xl text-slate-900 mb-5">{t('network.memberships')}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {memberships.map((m) => (
              <div key={m} className="card-panel flex items-center gap-3">
                <BadgeCheck className="text-brand-accent shrink-0" />
                <span className="text-sm text-slate-800">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('network.title')}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-slate-900/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
                       bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <Globe size={26} />
              </div>
              <h3 className="font-serif uppercase tracking-[0.14em] text-xl md:text-2xl
                             font-bold text-brand-accentDark text-center">
                {t('network.title')}
              </h3>
              <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
            </div>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
              {networkBody.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
