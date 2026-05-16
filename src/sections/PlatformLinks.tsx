import { ExternalLink, ShoppingBag, Cpu, Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const PLATFORMS = [
  {
    key: 'ecommerce',
    href: 'https://ygiusllc.com',
    icon: ShoppingBag,
    domain: 'ygiusllc.com',
    from: '#064e3b',
    to: '#065f46',
    accent: '#34d399',
    badge: '🛒',
  },
  {
    key: 'itconsultancy',
    href: 'https://yanabiyagibt.com',
    icon: Cpu,
    domain: 'yanabiyagibt.com',
    from: '#0c1a3d',
    to: '#1e3a5f',
    accent: '#60a5fa',
    badge: '🇬🇧',
  },
  {
    key: 'servicehub',
    href: 'https://yanabiya.com',
    icon: Globe,
    domain: 'yanabiya.com',
    from: '#1a0533',
    to: '#2e0d52',
    accent: '#c084fc',
    badge: '🌐',
  },
]

export default function PlatformLinks() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-brand-deep overflow-hidden">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand-accent/6 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 container-x py-12 md:py-14">
        {/* Section label */}
        <div className="text-center mb-8">
          <span className="inline-block text-[10px] font-bold tracking-[0.28em] uppercase
                           text-brand-accent bg-brand-accent/10 border border-brand-accent/20
                           rounded-full px-4 py-1.5">
            {t('platforms.eyebrow', 'Our Platforms')}
          </span>
          <p className="mt-3 text-white/50 text-xs tracking-wide">
            {t('platforms.sub', 'Explore our dedicated digital services')}
          </p>
        </div>

        {/* 3 platform cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PLATFORMS.map((p) => {
            const Icon = p.icon
            return (
              <a
                key={p.key}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl overflow-hidden
                           border border-white/8 hover:border-white/20
                           shadow-lg hover:shadow-2xl
                           transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]
                           hover:-translate-y-1.5"
                style={{ background: `linear-gradient(145deg, ${p.from} 0%, ${p.to} 100%)` }}
              >
                {/* Hover sheen */}
                <span aria-hidden className="absolute inset-0 bg-white/0 group-hover:bg-white/4 transition-colors duration-400" />

                <div className="relative p-5 md:p-6 flex flex-col gap-3 h-full">
                  {/* Top row: icon + badge */}
                  <div className="flex items-start justify-between">
                    <div
                      className="w-10 h-10 rounded-xl grid place-items-center flex-shrink-0"
                      style={{ background: `${p.accent}20`, color: p.accent }}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
                    <span className="text-lg leading-none">{p.badge}</span>
                  </div>

                  {/* Title + description */}
                  <div className="flex-1">
                    <h3
                      className="font-bold text-sm md:text-[15px] leading-snug mb-1.5"
                      style={{ color: p.accent }}
                    >
                      {t(`platforms.${p.key}.title`)}
                    </h3>
                    <p className="text-white/55 text-[12px] leading-relaxed">
                      {t(`platforms.${p.key}.desc`)}
                    </p>
                  </div>

                  {/* Footer: domain + visit link */}
                  <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/8">
                    <span className="font-mono text-[10px] text-white/30 truncate">
                      {p.domain}
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em]
                                 transition-all duration-300 group-hover:gap-1.5"
                      style={{ color: p.accent }}
                    >
                      {t('platforms.visit', 'Visit')} <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
