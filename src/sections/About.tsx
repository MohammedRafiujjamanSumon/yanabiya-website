import { useTranslation } from 'react-i18next'
import Section, { Eyebrow } from '../components/Section'
import AboutCategories from '../components/AboutCategories'
import Solutions from './Solutions'

export default function About() {
  const { t } = useTranslation()

  return (
    <>
      <Section id="about">
        <div className="container-x max-w-5xl">
          {/* Section header — About Us */}
          <Eyebrow>{t('about.eyebrow')}</Eyebrow>

          {/* Country flags marquee — silently scrolls between eyebrow and Who We Are */}
          <div className="mt-2">
            <div className="group relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
              <div
                className="flex animate-marquee marquee-pause gap-3 w-max py-1"
                style={{ animationDuration: '28s' }}
              >
                {Array.from({ length: 3 }).flatMap(() => [
                  { flag: '🇴🇲', city: 'Muscat',  country: 'Oman' },
                  { flag: '🇬🇧', city: 'London',  country: 'United Kingdom' },
                  { flag: '🇺🇸', city: 'Austin',  country: 'USA' },
                  { flag: '🇧🇩', city: 'Dhaka',   country: 'Bangladesh' },
                ]).map((c, i) => (
                  <div
                    key={`${c.city}-${i}`}
                    className="flex items-center gap-2 shrink-0 rounded-full bg-white border border-slate-200 px-4 py-2 shadow-sm"
                  >
                    <span className="text-lg leading-none">{c.flag}</span>
                    <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
                      {c.city}, {c.country}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="font-serif text-2xl md:text-3xl text-brand-accentDark font-bold leading-tight text-center">
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
          </div>

          <AboutCategories />
        </div>
      </Section>

      {/* Solutions section follows directly so the home About area mirrors /about-us */}
      <Solutions />
    </>
  )
}
