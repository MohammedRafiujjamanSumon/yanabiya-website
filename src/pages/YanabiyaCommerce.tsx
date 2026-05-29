import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowRight, ShoppingBag, Globe2, Truck, ShieldCheck,
  CreditCard, Headphones, Package, ExternalLink, Store,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import { assets } from '../data/assets'

/* Marketplaces Yanabiya sells through. Replace `href` with the real seller
 * storefront URL when available; until then they point to our own store so
 * there are never dead links. */
const MARKETPLACES = [
  { name: 'Amazon',  logo: '/images/ecommerce/marketplaces/amazon.png',  href: 'https://ygiusllc.com', tint: '#FF9900' },
  { name: 'Walmart', logo: '/images/ecommerce/marketplaces/walmart.png', href: 'https://ygiusllc.com', tint: '#0071DC' },
  { name: 'Shopify', logo: '/images/ecommerce/marketplaces/shopify.png', href: 'https://ygiusllc.com', tint: '#95BF47' },
  { name: 'eBay',    logo: '/images/ecommerce/marketplaces/ebay.png',    href: 'https://ygiusllc.com', tint: '#E53238' },
]

const CAPABILITIES = [
  { icon: Package,     title: 'Multi-Platform Catalogue',   body: 'One synchronised catalogue listed across Amazon, Walmart, Shopify, eBay and our own storefront.' },
  { icon: Truck,       title: 'Global Fulfilment',          body: 'Warehousing, pick-and-pack and last-mile delivery coordinated across four countries.' },
  { icon: CreditCard,  title: 'Secure Payments',            body: 'Multi-currency checkout, digital wallets and cross-border payment processing.' },
  { icon: ShieldCheck, title: 'Brand & Compliance',         body: 'Brand registry, listing optimisation and marketplace policy compliance handled end-to-end.' },
  { icon: Headphones,  title: 'After-Sales Support',        body: 'Returns, replacements and customer care managed for every channel.' },
  { icon: Globe2,      title: 'Cross-Border Reach',         body: 'Sell into the Gulf, South Asia, Europe and North America from a single operation.' },
]

export default function YanabiyaCommerce() {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="bg-brand-50 text-brand-deep">
      <BackButton to="/" label={t('common.back', 'Back')} />

      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-brand-deep text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-brand-accent/20 blur-[130px]" />
          <div className="absolute -bottom-40 -right-24 w-[560px] h-[560px] rounded-full bg-emerald-400/10 blur-[150px]" />
        </div>

        <div className="relative z-10 container-x py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent bg-brand-accent/10 border border-brand-accent/20 rounded-full px-4 py-1.5 mb-6">
              <ShoppingBag size={13} /> Yanabiya e-Commerce
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05]">
              Selling everywhere your
              <span className="block text-brand-accent">customers shop.</span>
            </h1>
            <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-2xl">
              Yanabiya e-Commerce runs our own online store <strong className="text-white">and</strong> active
              storefronts across the world's largest marketplaces — Amazon, Walmart, Shopify and eBay.
              From product listing and payments to fulfilment and after-sales, we manage the full
              online-retail value chain across four countries.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="https://ygiusllc.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                           bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                           shadow-lg hover:bg-brand-accentDark hover:-translate-y-0.5 transition-all"
              >
                <Store size={16} /> Visit Our Store
              </a>
              <Link
                to="/#contact"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3.5
                           border border-white/30 text-white font-semibold uppercase tracking-wider text-sm
                           hover:bg-white/10 hover:border-white transition-all"
              >
                Sell With Us <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-brand-50" />
      </section>

      {/* ───────── MARKETPLACES ───────── */}
      <section className="container-x py-14 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accentDark mb-3">
            Where you'll find us
          </div>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            One brand, every major marketplace.
          </h2>
          <p className="mt-4 text-brand-deep/65 leading-relaxed">
            Our products are available on the platforms shoppers already trust — plus our own
            dedicated online store.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {MARKETPLACES.map((m) => (
            <a
              key={m.name}
              href={m.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col items-center justify-center gap-4
                         rounded-2xl bg-white border border-brand-deep/10 p-8 h-44
                         shadow-sm hover:shadow-xl hover:-translate-y-1.5
                         transition-all duration-300"
              style={{ ['--tint' as string]: m.tint }}
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: m.tint }}
              />
              <img
                src={m.logo}
                alt={m.name}
                className="max-h-12 max-w-[75%] object-contain transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-deep/50 group-hover:text-brand-accentDark transition-colors">
                Shop on {m.name} <ExternalLink size={11} />
              </span>
            </a>
          ))}
        </div>

        {/* Own store highlight */}
        <div className="mt-6 max-w-5xl mx-auto">
          <a
            href="https://ygiusllc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center gap-5 rounded-2xl
                       bg-brand-deep text-white p-6 md:p-8 hover:-translate-y-1
                       shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="w-16 h-16 rounded-2xl bg-white grid place-items-center overflow-hidden shrink-0 ring-2 ring-brand-accent/40">
              <img src={assets.logo} alt="Yanabiya" className="w-12 h-12 object-contain" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="text-[11px] font-bold uppercase tracking-[0.24em] text-brand-accent mb-1">
                Our own storefront
              </div>
              <h3 className="font-serif text-2xl">Yanabiya Online Store</h3>
              <p className="text-white/65 text-sm mt-1">ygiusllc.com — direct from us, shipped worldwide.</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full px-6 py-3
                             bg-brand-accent text-white text-sm font-semibold uppercase tracking-wider
                             group-hover:bg-brand-accentDark transition-colors shrink-0">
              Shop Now <ArrowRight size={15} />
            </span>
          </a>
        </div>
      </section>

      {/* ───────── CAPABILITIES ───────── */}
      <section className="bg-white border-y border-brand-deep/10">
        <div className="container-x py-14 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accentDark mb-3">
              End-to-end online retail
            </div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">
              Everything it takes to sell online — handled.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-deep/10 bg-brand-50 p-6
                           hover:border-brand-accent/40 hover:-translate-y-1 hover:shadow-lg transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-accent/10 text-brand-accentDark grid place-items-center">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-serif text-xl">{title}</h3>
                <p className="mt-2 text-sm text-brand-deep/65 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="container-x py-16 md:py-24 text-center">
        <h2 className="font-serif text-3xl md:text-5xl leading-tight max-w-3xl mx-auto">
          Ready to put your products in front of the world?
        </h2>
        <p className="mt-5 text-brand-deep/65 max-w-xl mx-auto leading-relaxed">
          Whether you want to shop our catalogue or list your brand across global marketplaces,
          our e-commerce team can help.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://ygiusllc.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4
                       bg-brand-accent text-white font-semibold uppercase tracking-wider text-sm
                       shadow-lg hover:bg-brand-accentDark hover:-translate-y-0.5 transition-all"
          >
            <Store size={16} /> Visit Our Store
          </a>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4
                       border border-brand-deep/25 text-brand-deep font-semibold uppercase tracking-wider text-sm
                       hover:border-brand-accent hover:text-brand-accentDark transition-all"
          >
            Talk to Our Team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  )
}
