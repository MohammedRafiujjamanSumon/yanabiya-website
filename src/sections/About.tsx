import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Target, Eye, Award, Leaf, Compass } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'

const pillars = [
  {
    title: 'Mission',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    teaser: 'Build and scale diversified ventures with innovation, technology, and strategic thinking.',
  },
  {
    title: 'Vision',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    teaser: 'Become a trusted global business ecosystem recognized for diversified, sustainable growth.',
  },
  {
    title: 'Goals',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    teaser: 'Build a strong, scalable ecosystem across technology, trade, consulting, and automation.',
  },
  {
    title: 'Sustainability',
    icon: Leaf,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    teaser: 'Growth that benefits people, communities, and the planet — not just balance sheets.',
  },
  {
    title: 'Our Approach',
    icon: Compass,
    image: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=800&q=80',
    teaser: 'Operating principles that turn strategy into consistent, repeatable execution.',
  },
]

export default function About() {
  const { t } = useTranslation()

  return (
    <Section id="about">
      <div className="container-x">
        {/* Section header — About Us */}
        <Eyebrow>{t('about.eyebrow')}</Eyebrow>

        <div className="mt-4 grid lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-accentDark font-bold leading-tight">
              <span className="inline-block relative pb-1
                               after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px]
                               after:bg-brand-accent after:rounded-full
                               after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                               hover:after:scale-x-100 focus:after:scale-x-100">
                Who We Are
              </span>
            </h2>

            <div className="mt-3 space-y-3 text-slate-600 leading-relaxed text-justify">
            <p>
              Yanabiya Group is a diversified global enterprise operating as a unified business
              platform across multiple international markets. Originating from Al Khuwair, Muscat,
              Oman, we have expanded our presence into the United Kingdom, United States, and
              Bangladesh, building a connected global structure that supports scalable and
              sustainable growth.
            </p>
            <p>
              We operate not as a single-sector company, but as a multi-business global platform
              where different ventures are integrated under one ecosystem. Our platform enables us
              to build, manage, and scale multiple businesses simultaneously, ensuring operational
              synergy, efficiency, and long-term value creation.
            </p>
            <p>
              Across our global network, we are involved in several core business operations
              including technology-driven solutions, international trade facilitation, digital
              services, infrastructure support, manpower deployment, and business management
              services. Each operation functions independently where required, yet remains
              strategically connected under the same unified group vision.
            </p>
            <p>
              Our strength lies in this integrated model — where innovation, execution, and
              operational capability come together. We design systems that allow businesses to
              grow faster, operate smarter, and expand beyond geographical boundaries. This
              approach enables us to support both enterprises and individuals through structured,
              reliable, and scalable solutions.
            </p>
            </div>

            <div className="mt-5">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full
                           bg-brand-accent px-6 py-2.5 text-xs font-semibold uppercase tracking-wider
                           text-white shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Read More
                <ArrowRight size={14} className="ltr-flip" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mission · Vision · Goals — three teaser cards, each navigates to /about-us */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <Link
              key={p.title}
              to="/about-us"
              className="group/card relative rounded-2xl overflow-hidden shadow-md h-48
                         hover:-translate-y-1 hover:shadow-xl transition-all
                         focus:outline-none focus:ring-2 focus:ring-brand-accent block"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-500 group-hover/card:scale-105"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
              <div className="absolute inset-0 p-5 flex flex-col">
                <div className="w-10 h-10 rounded-lg bg-white/95 text-brand-accentDark grid place-items-center">
                  <p.icon size={20} />
                </div>
                <div className="mt-auto">
                  <h3 className="font-serif uppercase tracking-[0.16em] text-white text-base font-bold drop-shadow">
                    {p.title}
                  </h3>
                  <p className="mt-1 text-white/85 text-xs leading-snug line-clamp-2">
                    {p.teaser}
                  </p>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full
                                   px-3 py-1 text-[11px] font-semibold uppercase tracking-wider
                                   bg-white/95 text-brand-accentDark
                                   transition-colors group-hover/card:bg-brand-accent group-hover/card:text-white">
                    Read More <ArrowRight size={12} className="ltr-flip" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
