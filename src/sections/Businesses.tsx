import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Section, { Eyebrow } from '../components/Section'
import { businesses } from '../data/businesses'

export default function Businesses() {
  const { t } = useTranslation()
  return (
    <Section id="businesses" className="bg-brand-ink">
      <div className="container-x">
        <Eyebrow tone="light">{t('businesses.eyebrow')}</Eyebrow>
        <p className="text-slate-300 leading-relaxed text-justify [text-align-last:center] max-w-3xl mx-auto mb-10">
          Strategic divisions powering integrated enterprise solutions, global trade, and
          workforce ecosystems across key international markets.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {businesses.map((b) => (
            <Link
              key={b.slug}
              to={`/business/${b.slug}`}
              className="group relative rounded-2xl overflow-hidden shadow-lg
                         h-80 hover:-translate-y-1 transition-transform text-left
                         focus:outline-none focus:ring-2 focus:ring-brand-accent block"
            >
              <img
                src={b.image}
                alt={b.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-500 group-hover:scale-105"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
              <div className="absolute top-4 right-4 w-11 h-11 rounded-full
                              bg-white/90 text-blue-600 grid place-items-center shadow
                              ring-2 ring-white/70">
                <b.icon size={20} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start gap-3">
                <h3 className="text-white text-lg md:text-xl font-semibold leading-tight drop-shadow">
                  {b.title}
                </h3>
                <span className="inline-flex items-center gap-2 rounded-full
                                 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider
                                 bg-white/95 text-blue-700
                                 transition-colors group-hover:bg-brand-accent group-hover:text-white">
                  Read More
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}
