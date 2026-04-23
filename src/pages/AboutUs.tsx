import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Target, Eye, Award } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import Solutions from '../sections/Solutions'

type PillarKey = 'mission' | 'vision' | 'goals'

const pillars: {
  key: PillarKey
  title: string
  icon: LucideIcon
  image: string
  teaser: string
  body: string[]
}[] = [
  {
    key: 'mission',
    title: 'Mission',
    icon: Target,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Build and scale diversified ventures that combine innovation, technology, and strategic thinking — delivering reliable solutions that help organizations grow.',
    body: [
      'Yanabiya Group is committed to building and scaling diversified business ventures that combine innovation, technology, and strategic thinking. Our mission is to deliver high-quality internet services, software solutions, IT consulting, global trade, and business automation that help organizations grow efficiently.',
      'We transform ideas into practical solutions by exploring new opportunities and adopting future-ready technologies. Through our diversified operations, we create scalable systems that improve productivity, enhance digital transformation, and support long-term business success across industries.',
      'At the core of our mission is value creation — for clients, partners, and communities. We deliver reliable, cost-effective, and innovative services while upholding professional standards and ethical practices in every area we operate.',
    ],
  },
  {
    key: 'vision',
    title: 'Vision',
    icon: Eye,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Become a trusted global business ecosystem recognized for innovation, diversified growth, and sustainable impact across markets.',
    body: [
      'Yanabiya Group envisions becoming a trusted global business ecosystem recognized for innovation, diversified growth, and sustainable impact. We aim to build and expand ventures that shape the future of technology, digital services, global trade, and strategic consulting across markets.',
      'Our vision is to create a strong network of businesses that deliver meaningful solutions across industries. By embracing innovation and emerging technologies, we strive to stay ahead of change and lead transformation in how businesses operate and grow.',
      'We aspire to establish a long-term legacy built on trust, excellence, and adaptability. Through our diversified approach, we unlock new opportunities, empower businesses, and contribute to global economic and digital development.',
    ],
  },
  {
    key: 'goals',
    title: 'Goals',
    icon: Award,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Build a strong, diversified ecosystem delivering innovative, reliable, and scalable solutions across technology, trade, consulting, and automation.',
    body: [
      "Yanabiya Group's primary goal is to build a strong, diversified business ecosystem that delivers innovative, reliable, and scalable solutions across industries including technology, digital services, global trade, IT consulting, and business automation.",
      'We continuously develop new ventures and expand existing services by identifying emerging opportunities and transforming ideas into impactful businesses. Our focus is long-term value through sustainable growth and operational excellence.',
      'We strengthen global collaborations through trusted partnerships with clients, organizations, and professionals across regions — delivering high-quality services that meet international standards and evolving market needs.',
    ],
  },
]

export default function AboutUs() {
  const [openKey, setOpenKey] = useState<PillarKey | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  useEffect(() => {
    if (!openKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openKey])

  const active = pillars.find((p) => p.key === openKey) ?? null

  return (
    <>
      <Section id="about-us">
        <div className="container-x max-w-5xl relative">
          <Eyebrow>About Us</Eyebrow>

          <div className="mt-6">
            <h1 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight">
              Who We Are
            </h1>

            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed text-justify">
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
              <p>
                We also provide strategic advisory and automation-focused consulting to help
                organizations improve efficiency, modernize operations, and adopt technology-driven
                workflows. Our focus is always on practical impact, measurable results, and
                sustainable performance improvement.
              </p>
              <p>
                Yanabiya Group is committed to maintaining global standards of quality, transparency,
                and professionalism across all operations. We believe in building strong, long-term
                relationships by delivering consistent value and treating every partner with trust
                and accountability.
              </p>
              <p>
                With a growing international footprint, our mission is to connect markets, create
                opportunities, and develop a strong global business ecosystem that supports
                innovation, collaboration, and economic progress.
              </p>
            </div>
          </div>

          {/* Mission · Vision · Goals — moving marquee, same pattern as Our Solutions */}
          <div className="mt-12">
            <h2 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight text-center">
              Our Mission, Vision & Goals
            </h2>
            <p className="mt-3 max-w-3xl mx-auto text-slate-600 leading-relaxed text-justify [text-align-last:center]">
              The principles that guide every venture we build, every partnership we forge, and
              every market we enter.
            </p>

            <div className="group relative overflow-hidden mt-6">
              <div
                className="flex animate-marquee marquee-pause gap-4 w-max py-2"
                style={{ animationDuration: '40s' }}
              >
                {[...pillars, ...pillars].map((p, i) => (
                  <button
                    key={`${p.key}-${i}`}
                    type="button"
                    onClick={() => setOpenKey(p.key)}
                    className="group/card relative rounded-xl overflow-hidden shadow-md
                               h-44 w-64 shrink-0 hover:-translate-y-1 transition-transform text-left
                               focus:outline-none focus:ring-2 focus:ring-brand-accent"
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover
                                 transition-transform duration-500 group-hover/card:scale-105"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-4 flex flex-col items-start gap-2">
                      <h3 className="font-serif uppercase tracking-[0.14em] text-white
                                     text-sm md:text-base font-bold drop-shadow leading-snug">
                        {p.title}
                      </h3>
                      <span className="inline-flex items-center gap-1.5 rounded-full
                                       px-3 py-1 text-[11px] font-semibold uppercase tracking-wider
                                       bg-white/95 text-brand-accentDark
                                       transition-colors group-hover/card:bg-brand-accent group-hover/card:text-white">
                        Read More
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="absolute inset-y-0 start-0 w-24 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 end-0 w-24 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Modal popup for the active pillar */}
        {active && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={() => setOpenKey(null)}
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
                onClick={() => setOpenKey(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full
                           flex items-center justify-center text-slate-500
                           hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <span className="text-xl leading-none">×</span>
              </button>
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-xl bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                  <active.icon size={26} />
                </div>
                <h3 className="font-serif uppercase tracking-[0.14em] text-xl md:text-2xl
                               font-bold text-brand-accentDark text-center">
                  {active.title}
                </h3>
                <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
              </div>
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
                {active.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Full Our Solutions section moved here from the home page */}
      <Solutions />

      <div className="container-x max-w-5xl pb-12">
        <Link
          to="/#about"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                     border border-slate-200 text-slate-700 text-sm font-semibold
                     hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to About
        </Link>
      </div>
    </>
  )
}
