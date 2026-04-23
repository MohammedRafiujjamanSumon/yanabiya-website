import { useEffect } from 'react'
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
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

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

          {/* Mission · Vision · Goals — separated, each its own block */}
          {pillars.map((p, idx) => (
            <div key={p.key} className="mt-12">
              <h2 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight">
                Our {p.title}
              </h2>
              <div className="grid lg:grid-cols-12 gap-6 items-start mt-4">
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="relative rounded-xl overflow-hidden shadow-md h-48 lg:h-56">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-brand-accent text-white grid place-items-center">
                        <p.icon size={18} />
                      </div>
                      <span className="font-serif uppercase tracking-[0.14em] text-white text-sm font-bold drop-shadow">
                        {p.title}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-1' : ''} space-y-3 text-slate-600 leading-relaxed text-justify`}>
                  {p.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

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
