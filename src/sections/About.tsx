import { useTranslation } from 'react-i18next'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'

export default function About() {
  const { t } = useTranslation()
  return (
    <Section id="about">
      <div className="container-x">
        {/* Section header — About Us */}
        <Eyebrow>{t('about.eyebrow')}</Eyebrow>

        {/* TOP — Picture LEFT · Who We Are RIGHT (text aligned to picture top) */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-4 -start-4 w-32 h-32 border-2 border-brand-accent rounded-md -z-0" />
            <div className="relative rounded-2xl w-full aspect-[4/5] shadow-2xl bg-slate-50 overflow-hidden">
              <img
                src={assets.office}
                alt="Yanabiya Gulf office"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              {/* Wall-only dark blue overlay — shaped with clip-path to match the wall polygon */}
              <div
                className="absolute inset-0 bg-[#141c2c] [clip-path:polygon(69.8%_0%,100%_0%,100%_65%,46.5%_65%,46.5%_20%)]"
              />
              {/* Overlay: new Yanabiya logo covering the old YG wall logo */}
              {/* Wall-colored patch — matches the new dark-blue wall */}
              <div className="absolute left-[56%] top-[27%] w-[42%] h-[30%] bg-[#141c2c]" />
              {/* New logo painted directly onto the wall */}
              <img
                src={assets.logo}
                alt="Yanabiya"
                className="absolute left-[54%] top-[29%] w-[38%] h-[27%] object-contain drop-shadow-[2px_3px_3px_rgba(0,0,0,0.55)]"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
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

        {/* Mission · Vision · Goals */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-5 mt-12">
          <div className="card-panel">
            <div className="text-center mb-4">
              <h3 className="group inline-block relative font-serif uppercase tracking-[0.18em]
                             text-lg md:text-xl font-bold text-brand-accentDark cursor-default
                             after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                             after:h-[2px] after:bg-brand-accent after:rounded-full
                             after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                             hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100">
                Mission
              </h3>
            </div>
            <div className="text-sm text-slate-600 space-y-3 text-justify leading-relaxed">
              <p>
                Yanabiya Group is committed to building and scaling diversified business ventures
                that combine innovation, technology, and strategic thinking. Our mission is to
                deliver high-quality internet services, software solutions, IT consulting, global
                trade, and business automation that help organizations grow efficiently.
              </p>
              <p>
                We transform ideas into practical solutions by exploring new opportunities and
                adopting future-ready technologies. Through our diversified operations, we create
                scalable systems that improve productivity, enhance digital transformation, and
                support long-term business success across industries.
              </p>
              <p>
                At the core of our mission is value creation — for clients, partners, and
                communities. We deliver reliable, cost-effective, and innovative services while
                upholding professional standards and ethical practices in every area we operate.
              </p>
              <p>
                We support communities through sustainable initiatives and responsible growth,
                ensuring our success contributes positively to society as a whole.
              </p>
            </div>
          </div>

          <div className="card-panel">
            <div className="text-center mb-4">
              <h3 className="group inline-block relative font-serif uppercase tracking-[0.18em]
                             text-lg md:text-xl font-bold text-brand-accentDark cursor-default
                             after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                             after:h-[2px] after:bg-brand-accent after:rounded-full
                             after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                             hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100">
                Vision
              </h3>
            </div>
            <div className="text-sm text-slate-600 space-y-3 text-justify leading-relaxed">
              <p>
                Yanabiya Group envisions becoming a trusted global business ecosystem recognized
                for innovation, diversified growth, and sustainable impact. We aim to build and
                expand ventures that shape the future of technology, digital services, global
                trade, and strategic consulting across markets.
              </p>
              <p>
                Our vision is to create a strong network of businesses that deliver meaningful
                solutions across industries. By embracing innovation and emerging technologies,
                we strive to stay ahead of change and lead transformation in how businesses
                operate and grow.
              </p>
              <p>
                We aspire to establish a long-term legacy built on trust, excellence, and
                adaptability. Through our diversified approach, we unlock new opportunities,
                empower businesses, and contribute to global economic and digital development.
              </p>
              <p>
                Beyond business success, we envision creating positive impact on communities
                through sustainable growth, ethical practices, and knowledge-driven progress.
              </p>
            </div>
          </div>

          <div className="card-panel">
            <div className="text-center mb-4">
              <h3 className="group inline-block relative font-serif uppercase tracking-[0.18em]
                             text-lg md:text-xl font-bold text-brand-accentDark cursor-default
                             after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-2
                             after:h-[2px] after:bg-brand-accent after:rounded-full
                             after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                             hover:after:scale-x-100 focus:after:scale-x-100 active:after:scale-x-100">
                Goals
              </h3>
            </div>
            <div className="text-sm text-slate-600 space-y-3 text-justify leading-relaxed">
              <p>
                Yanabiya Group's primary goal is to build a strong, diversified business
                ecosystem that delivers innovative, reliable, and scalable solutions across
                industries including technology, digital services, global trade, IT consulting,
                and business automation.
              </p>
              <p>
                We continuously develop new ventures and expand existing services by identifying
                emerging opportunities and transforming ideas into impactful businesses. Our
                focus is long-term value through sustainable growth and operational excellence.
              </p>
              <p>
                We strengthen global collaborations through trusted partnerships with clients,
                organizations, and professionals across regions — delivering high-quality
                services that meet international standards and evolving market needs.
              </p>
              <p>
                We empower communities through knowledge sharing, digital transformation, and
                responsible business practices — building Yanabiya as a respected, future-focused
                group. 🚀
              </p>
            </div>
          </div>
        </div>

      </div>
    </Section>
  )
}
