import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'

type PillarKey = 'mission' | 'vision' | 'goals'

const pillars: { key: PillarKey; title: string; teaser: string; body: string[] }[] = [
  {
    key: 'mission',
    title: 'Mission',
    teaser:
      'Build and scale diversified ventures that combine innovation, technology, and strategic thinking — delivering reliable solutions that help organizations grow.',
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

  const active = pillars.find((p) => p.key === openPillar) ?? null

  return (
    <Section id="about">
      <div className="container-x">
        {/* Section header — About Us */}
        <Eyebrow>{t('about.eyebrow')}</Eyebrow>

        {/* TOP — Picture LEFT · Who We Are RIGHT (text aligned to picture top) */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -start-4 w-32 h-32 border-2 border-brand-accent rounded-md -z-0" />
            <img
              src={assets.office}
              alt="Yanabiya Gulf office"
              className="relative rounded-2xl w-full object-cover aspect-[4/5] shadow-2xl bg-slate-50"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          <div className="lg:col-span-7">
            <div className="flex justify-center mb-4">
              <img
                src={assets.logo}
                alt="Yanabiya Group"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
            <h2 className="font-serif text-lg md:text-xl text-slate-900 leading-tight text-center">
              Who We Are 🌐
            </h2>
            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed text-justify">
              <p>
                Yanabiya Group is a diversified global business group focused on building and
                scaling innovative ventures across multiple industries. We operate across
                technology, digital services, global trade, and strategic consulting, delivering
                integrated solutions that support businesses and communities.
              </p>
              <p>
                We are driven by innovation and continuously explore new ideas to develop
                future-ready services. Our portfolio spans internet and connectivity solutions,
                software and web development, IT consulting, business automation, and international
                trade. By combining these capabilities, we create efficient, scalable, and
                sustainable business models.
              </p>
              <p>
                Yanabiya Group follows a collaborative and forward-thinking approach. We work with
                partners across different markets, bringing together professional expertise from
                corporate, agency, and entrepreneurial environments. This allows us to adapt
                quickly, identify opportunities, and deliver value-driven solutions.
              </p>
              <p>
                Beyond business growth, we are committed to sustainability and community support.
                We believe strong businesses should create positive impact. Our ambition is to
                build a trusted brand that connects innovation, diversified business excellence,
                and long-term value creation.
              </p>
            </div>
          </div>
        </div>

        {/* Mission · Vision · Goals — collapsed cards with Learn More */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
          {pillars.map((p) => (
            <div key={p.key} className="card-panel flex flex-col">
              <div className="text-center mb-4">
                <h3 className="group inline-block relative font-serif uppercase tracking-[0.18em]
                               text-lg md:text-xl font-bold text-brand-accentDark cursor-default
                               after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                               after:h-[2px] after:bg-brand-accent after:rounded-full
                               after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                               hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100">
                  {p.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 text-justify leading-relaxed flex-1">
                {p.teaser}
              </p>
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  onClick={() => setOpenPillar(p.key)}
                  className="inline-flex items-center gap-2 rounded-full border border-brand-accent
                             px-5 py-2 text-sm font-medium text-brand-accentDark
                             transition-colors hover:bg-brand-accent hover:text-white
                             focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
                >
                  Learn More
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
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
              onClick={() => setOpenPillar(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <h3 className="font-serif uppercase tracking-[0.18em] text-xl md:text-2xl
                           font-bold text-brand-accentDark text-center">
              {active.title}
            </h3>
            <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
              {active.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
