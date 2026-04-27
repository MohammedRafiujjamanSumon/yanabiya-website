import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { board, team } from '../data/leadership'
import { useReveal } from '../hooks/useReveal'

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* Distilled pull quotes — one signature line per founder lifted from
 * their full message on /leadership/management. The full text and
 * formal salutation live on the dedicated page. */
const founders = [
  {
    ...board[0],
    role: 'Founder & Chairman',
    quote:
      '"There is no shortcut to business goals — values, ethics, and honesty come first."',
    href: '/leadership/management#chairman',
  },
  {
    ...board[1],
    role: 'Vice Chairman',
    quote:
      '"Built on values, committed to growth and to building a better tomorrow."',
    href: '/leadership/management#vice-chairman',
  },
]

export default function Leadership() {
  const { t } = useTranslation()

  return (
    <Section id="leadership" className="relative overflow-hidden bg-[#fbfdfb]">
      {/* Ambient mint */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[520px] h-[520px] rounded-full bg-brand-accentDark/6 blur-[140px]" />
      </div>

      <div className="container-x relative pt-4 md:pt-6 pb-8 md:pb-12">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Reveal>
            <Eyebrow>{t('leadership.eyebrow', 'Leadership')}</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="mt-3 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] leading-[1.15] tracking-tight text-brand-deep lg:whitespace-nowrap">
              Built on <span className="italic text-brand-accentDark">trust</span>. Led by <span className="italic text-brand-accentDark">vision</span>.
            </h2>
          </Reveal>
        </div>

        {/* FOUNDERS DIPTYCH */}
        <div id="management" className="grid lg:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto scroll-mt-28">
          {founders.map((f, i) => (
            <Reveal key={f.name} delay={i * 140}>
              <article
                className="group h-full flex flex-col md:flex-row rounded-2xl bg-white
                           border border-slate-200 overflow-hidden
                           shadow-[0_18px_40px_-20px_rgba(15,58,35,0.18)]
                           transition-all duration-500
                           hover:border-brand-deep/30 hover:-translate-y-0.5
                           hover:shadow-[0_28px_60px_-24px_rgba(15,58,35,0.30)]"
              >
                {/* Portrait — banner on mobile, side panel on desktop */}
                <div className="relative md:w-2/5 aspect-[5/3] md:aspect-auto bg-slate-100 overflow-hidden">
                  <img
                    src={f.photo}
                    alt={f.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top
                               transition-transform duration-700 group-hover:scale-[1.03]"
                    onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/60 via-brand-deep/10 to-transparent" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5
                                  rounded-full bg-white/95 backdrop-blur px-3 py-1
                                  text-[10px] font-bold uppercase tracking-[0.28em] text-brand-deep">
                    {i === 0 ? 'Founder' : 'Co-Founder'}
                  </div>
                </div>

                {/* Identity + quote */}
                <div className="relative md:w-3/5 p-6 md:p-7 flex flex-col">
                  <Quote className="absolute top-4 right-4 text-brand-accent/15" size={56} />
                  <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark mb-2">
                    {f.role}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                    {f.name}
                  </h3>
                  <div className="mt-3 mb-5 w-10 h-px bg-brand-accent" />
                  <blockquote className="font-serif italic text-[15px] md:text-base text-slate-700 leading-snug flex-1">
                    {f.quote}
                  </blockquote>
                  <Link
                    to={f.href}
                    className="mt-6 inline-flex items-center gap-1.5 self-start
                               text-[11px] font-bold uppercase tracking-[0.22em]
                               text-brand-accentDark hover:text-brand-deep hover:gap-2.5
                               transition-all duration-300"
                  >
                    Read message <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* LEADERSHIP BENCH — quiet team strip */}
        <div id="professionals" className="mt-16 md:mt-20 max-w-6xl mx-auto scroll-mt-28">
          <Reveal>
            <div className="flex items-center gap-3 justify-center mb-6">
              <span className="w-12 h-px bg-slate-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-brand-accentDark">
                Leadership Bench
              </span>
              <span className="w-12 h-px bg-slate-300" />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-wrap items-start justify-center gap-x-5 gap-y-6 md:gap-x-7">
              {team.slice(0, 8).map((m) => (
                <div key={m.name} className="group flex flex-col items-center text-center w-20 md:w-24">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden
                                  ring-2 ring-slate-200
                                  transition-all duration-300
                                  group-hover:ring-brand-accent group-hover:-translate-y-0.5
                                  shadow-[0_8px_20px_-10px_rgba(15,58,35,0.30)]">
                    <img
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500
                                 group-hover:scale-105"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        img.style.display = 'none'
                      }}
                    />
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-brand-deep leading-tight line-clamp-2">
                    {m.name}
                  </div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-slate-500 mt-0.5 line-clamp-1">
                    {m.role}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 text-center">
              <Link
                to="/leadership/professionals"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-deep text-white text-xs font-bold uppercase tracking-[0.22em]
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5
                           transition-all duration-300"
              >
                Meet the full team <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        </div>

      </div>
    </Section>
  )
}
