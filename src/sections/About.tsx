import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'

type PillarKey = 'mission' | 'vision' | 'goals'

const pillars: { key: PillarKey; title: string; teaser: string; image: string; body: string[] }[] = [
  {
    key: 'mission',
    title: 'Mission',
    teaser:
      'Build and scale diversified ventures that combine innovation, technology, and strategic thinking — delivering reliable solutions that help organizations grow.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    body: [
      "Yanabiya Group is committed to building and scaling diversified business ventures that combine innovation, technology, and strategic thinking. Our mission is to deliver high-quality internet services, software solutions, IT consulting, global trade, and business automation that help organizations grow efficiently.",
      "We transform ideas into practical solutions by exploring new opportunities and adopting future-ready technologies. Through our diversified operations, we create scalable systems that improve productivity, enhance digital transformation, and support long-term business success across industries.",
      "At the core of our mission is value creation — for clients, partners, and communities. We deliver reliable, cost-effective, and innovative services while upholding professional standards and ethical practices in every area we operate.",
      "We support communities through sustainable initiatives and responsible growth, ensuring our success contributes positively to society as a whole.",
    ],
  },
  {
    key: 'vision',
    title: 'Vision',
    teaser:
      'Become a trusted global business ecosystem recognized for innovation, diversified growth, and sustainable impact across markets.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    body: [
      "Yanabiya Group envisions becoming a trusted global business ecosystem recognized for innovation, diversified growth, and sustainable impact. We aim to build and expand ventures that shape the future of technology, digital services, global trade, and strategic consulting across markets.",
      "Our vision is to create a strong network of businesses that deliver meaningful solutions across industries. By embracing innovation and emerging technologies, we strive to stay ahead of change and lead transformation in how businesses operate and grow.",
      "We aspire to establish a long-term legacy built on trust, excellence, and adaptability. Through our diversified approach, we unlock new opportunities, empower businesses, and contribute to global economic and digital development.",
      "Beyond business success, we envision creating positive impact on communities through sustainable growth, ethical practices, and knowledge-driven progress.",
    ],
  },
  {
    key: 'goals',
    title: 'Goals',
    teaser:
      "Build a strong, diversified ecosystem delivering innovative, reliable, and scalable solutions across technology, trade, consulting, and automation.",
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    body: [
      "Yanabiya Group's primary goal is to build a strong, diversified business ecosystem that delivers innovative, reliable, and scalable solutions across industries including technology, digital services, global trade, IT consulting, and business automation.",
      "We continuously develop new ventures and expand existing services by identifying emerging opportunities and transforming ideas into impactful businesses. Our focus is long-term value through sustainable growth and operational excellence.",
      "We strengthen global collaborations through trusted partnerships with clients, organizations, and professionals across regions — delivering high-quality services that meet international standards and evolving market needs.",
      "We empower communities through knowledge sharing, digital transformation, and responsible business practices — building Yanabiya as a respected, future-focused group. 🚀",
    ],
  },
]

export default function About() {
  const { t } = useTranslation()
  const [openPillar, setOpenPillar] = useState<PillarKey | null>(null)
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    if (!openPillar) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPillar(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openPillar])

  const activeIndex = openPillar ? pillars.findIndex((p) => p.key === openPillar) : -1
  const active = activeIndex >= 0 ? pillars[activeIndex] : null
  const prevPillar = activeIndex > 0 ? pillars[activeIndex - 1] : null
  const nextPillar =
    activeIndex >= 0 && activeIndex < pillars.length - 1 ? pillars[activeIndex + 1] : null

  return (
    <Section id="about">
      <div className="container-x">
        {/* Section header — About Us */}
        <Eyebrow>{t('about.eyebrow')}</Eyebrow>

        {/* TOP — Picture LEFT · Who We Are RIGHT (text aligned to picture top) */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mt-2">
          <div className="lg:col-span-4 relative max-w-[220px] mx-auto lg:mx-0 w-full">
            <div className="absolute -top-3 -start-3 w-20 h-20 border-2 border-brand-accent rounded-md -z-0" />
            <img
              src={assets.office}
              alt="Yanabiya Gulf office"
              className="relative rounded-2xl w-full object-cover aspect-[4/5] shadow-2xl bg-slate-50"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          <div className="lg:col-span-8">
            <h2 className="font-serif text-lg md:text-xl text-slate-900 leading-tight text-center">
              Who We Are
            </h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed text-justify">
              <p>
                Yanabiya Group is a diversified global enterprise focused on building, scaling, and
                operating high-impact ventures across multiple industries. With a strategic presence
                across key international markets, we deliver integrated solutions spanning technology,
                digital services, global trade, and strategic advisory.
              </p>
              <p>
                At our core, we are not just a service provider — we are a business builder. We
                identify opportunities, develop ideas into structured ventures, and scale them into
                sustainable operations. Our approach is centered on creating long-term value rather
                than short-term outcomes. Each initiative we take is carefully planned, executed, and
                continuously improved to ensure consistent performance and growth.
              </p>
              {showMore && (
                <>
                  <p>
                    Our global perspective allows us to understand different markets, cultures, and
                    business environments. By operating across regions, we are able to connect
                    opportunities, bridge gaps, and bring international standards into every project we
                    undertake. This enables us to support businesses not only locally but also in
                    expanding beyond their existing boundaries.
                  </p>
                  <p>
                    We believe in building an ecosystem rather than isolated services. Every part of
                    Yanabiya Group is designed to complement the other — technology supports trade,
                    consulting strengthens operations, and digital services enhance scalability. This
                    interconnected structure allows us to deliver complete solutions instead of
                    fragmented services.
                  </p>
                  <p>
                    Our team and partners come from diverse professional backgrounds, including
                    corporate, agency, and entrepreneurial environments. This diversity gives us the
                    flexibility to think strategically, act practically, and adapt quickly in a
                    fast-changing business world.
                  </p>
                  <p>
                    Above all, Yanabiya Group is driven by a clear purpose: to create impactful
                    businesses, empower partners, and contribute to a more connected and efficient
                    global economy.
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowMore((v) => !v)}
              className="mt-4 inline-flex items-center gap-2 rounded-full
                         bg-brand-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider
                         text-white shadow-sm hover:bg-brand-accentDark hover:shadow-md transition-all
                         focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              aria-expanded={showMore ? 'true' : 'false'}
            >
              {showMore ? 'Show Less' : 'Read More'}
              <ArrowRight
                size={12}
                className={`ltr-flip transition-transform duration-200 ${showMore ? 'rotate-90' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Mission · Vision · Goals — compact cards */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {pillars.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setOpenPillar(p.key)}
              className="group relative rounded-xl overflow-hidden shadow-md
                         h-32 hover:-translate-y-0.5 transition-transform text-left
                         focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-500 group-hover:scale-105"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
              <div className="absolute inset-x-0 bottom-0 p-3.5 flex flex-col items-start gap-2">
                <h3 className="font-serif uppercase tracking-[0.16em] text-white
                               text-sm md:text-base font-bold drop-shadow">
                  {p.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full
                                 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider
                                 bg-white/95 text-brand-accentDark
                                 transition-colors group-hover:bg-brand-accent group-hover:text-white">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* Modal overlay for expanded pillar content */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setOpenPillar(null)}
          className="fixed inset-0 z-30 flex items-center justify-center
                     bg-slate-900/25 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md max-h-[68vh] overflow-y-auto
                       bg-white rounded-xl shadow-2xl p-4 md:p-5"
          >
            <button
              type="button"
              onClick={() => setOpenPillar(null)}
              aria-label="Close"
              className="absolute top-2 right-2 w-7 h-7 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-base leading-none">×</span>
            </button>
            <h3 className="font-serif uppercase tracking-[0.16em] text-base md:text-lg
                           font-bold text-brand-accentDark text-center">
              {active.title}
            </h3>
            <div className="mt-1.5 mx-auto w-10 h-[2px] bg-brand-accent rounded-full" />
            <div className="mt-3 space-y-2.5 text-[12.5px] md:text-[13px] text-slate-600 leading-relaxed text-justify">
              {active.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              {prevPillar ? (
                <button
                  type="button"
                  onClick={() => setOpenPillar(prevPillar.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             border border-slate-200 text-slate-600 text-[10.5px] font-semibold
                             hover:border-brand-accent hover:text-brand-accent transition-colors"
                >
                  <ArrowLeft size={11} />
                  <span className="font-bold normal-case tracking-normal">{prevPillar.title}</span>
                </button>
              ) : (
                <span />
              )}
              {nextPillar ? (
                <button
                  type="button"
                  onClick={() => setOpenPillar(nextPillar.key)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                             bg-brand-accent text-white text-[10.5px] font-semibold
                             hover:bg-brand-accentDark transition-colors ml-auto"
                >
                  <span className="font-bold normal-case tracking-normal">{nextPillar.title}</span>
                  <ArrowRight size={11} />
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
