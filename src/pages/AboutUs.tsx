import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <Section id="about-us">
      <div className="container-x max-w-5xl">
        <Eyebrow>About Us</Eyebrow>

        <div className="grid lg:grid-cols-12 gap-10 items-start mt-6">
          <div className="lg:col-span-4 relative">
            <div className="absolute -top-4 -start-4 w-24 h-24 border-2 border-brand-accent rounded-md -z-0" />
            <img
              src={assets.office}
              alt="Yanabiya Gulf office"
              className="relative rounded-2xl w-full object-cover aspect-[4/5] shadow-xl bg-slate-50"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
          </div>

          <div className="lg:col-span-8">
            <h1 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight">
              Who We Are
            </h1>
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
              <p>
                Through our integrated portfolio and global mindset, Yanabiya Group continues to
                invest in talent, technology, and trusted partnerships. We are shaping a future
                where our ventures contribute meaningfully to economic progress, digital
                transformation, and the communities we serve.
              </p>
            </div>

            <div className="mt-8">
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
          </div>
        </div>
      </div>
    </Section>
  )
}
