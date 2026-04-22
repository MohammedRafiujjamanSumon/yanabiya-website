import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Section, { Eyebrow } from '../components/Section'
import { countries } from '../data/countries'

type Country = (typeof countries)[number]

export default function Global() {
  const { t } = useTranslation()

  return (
    <Section id="global" className="bg-brand-ink">
      <div className="container-x">
        <Eyebrow tone="light">{t('global.eyebrow')}</Eyebrow>
        <p className="text-slate-300 leading-relaxed text-justify [text-align-last:center] max-w-3xl mx-auto mb-10">
          {t('global.sub')}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {countries.map((c) => {
            const heroImage = (c as Country & { heroImage?: string }).heroImage
            return (
              <Link
                key={c.code}
                to={`/country/${c.code.toLowerCase()}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg
                           h-80 hover:-translate-y-1 transition-transform text-left
                           focus:outline-none focus:ring-2 focus:ring-brand-accent block"
              >
                {heroImage && (
                  <img
                    src={heroImage}
                    alt={c.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover
                               transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full
                                bg-white/90 grid place-items-center shadow ring-2 ring-white/70
                                text-2xl leading-none">
                  {c.flag}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start gap-3">
                  <h3 className="text-white text-lg md:text-xl font-semibold leading-tight drop-shadow">
                    {c.name}
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
            )
          })}
        </div>
      </div>
    </Section>
  )
}
