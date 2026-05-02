import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'
import { DISTRIBUTIONS } from '../data/distribution'

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

export default function DistributionDetail() {
  const { slug } = useParams<{ slug: string }>()
  const idx = DISTRIBUTIONS.findIndex((d) => d.slug === slug)
  const d = idx >= 0 ? DISTRIBUTIONS[idx] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [slug])

  if (!d) return <Navigate to="/" replace />

  const prev = DISTRIBUTIONS[(idx - 1 + DISTRIBUTIONS.length) % DISTRIBUTIONS.length]
  const next = DISTRIBUTIONS[(idx + 1) % DISTRIBUTIONS.length]

  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/#distributed-leadership" label="Back to Distributed Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/20 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/12 blur-[160px]" />
      </div>

      <PageHero
        eyebrow={`Distributed Leadership · ${idx + 1}/${DISTRIBUTIONS.length}`}
        title={<>{d.label.split(' ').slice(0, -1).join(' ')}{' '}<span className="italic text-brand-accentDark">{d.label.split(' ').slice(-1)[0]}.</span></>}
        subtitle={d.short}
        centered
      />

      {/* PILL ROW — quick switch between the six */}
      <section className="relative">
        <div className="container-x py-6">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {DISTRIBUTIONS.map((t) => {
              const active = t.slug === slug
              return (
                <Link
                  key={t.slug}
                  to={`/leadership/distributed/${t.slug}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5
                              text-[10px] font-bold uppercase tracking-[0.2em]
                              border transition-all duration-300
                              ${active
                                ? 'bg-brand-deep text-brand-accent border-brand-deep'
                                : 'bg-white text-brand-deep/70 border-slate-200 hover:bg-brand-deep hover:text-white hover:border-brand-deep'}`}
                >
                  {t.label.replace('Distribution ', '')}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* HERO IMAGE + LONG BODY */}
      <section className="relative">
        <div className="container-x py-10 md:py-12">
          <Reveal>
            <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden
                            bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                            grid md:grid-cols-[44%_1fr]">
              <div className="relative aspect-[4/3] md:aspect-auto bg-white">
                <img
                  src={d.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div
                  className="absolute inset-0 mix-blend-multiply"
                  style={{ backgroundImage: `linear-gradient(135deg, ${d.from}66 0%, ${d.to}99 100%)` }}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full
                                 bg-brand-accent/15 border border-brand-accentDark/40
                                 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]
                                 text-brand-accentDark w-fit">
                  {d.label}
                </span>
                <h2 className="mt-3 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                  {d.body}
                </h2>
                <div className="mt-4 space-y-3 text-[13px] md:text-[14px] text-brand-deep/70 leading-relaxed">
                  {d.longBody.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="relative border-t border-slate-200">
        <div className="container-x py-8 md:py-10">
          <div className="grid sm:grid-cols-2 gap-3 max-w-5xl mx-auto">
            <Link
              to={`/leadership/distributed/${prev.slug}`}
              className="group rounded-2xl bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                         p-4 md:p-5 transition-all duration-500
                         hover:bg-white hover:border-brand-accent"
            >
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep/60">
                <ArrowLeft size={11} /> Previous
              </div>
              <div className="mt-1 font-serif text-base md:text-lg text-brand-deep leading-tight">
                {prev.label}
              </div>
            </Link>
            <Link
              to={`/leadership/distributed/${next.slug}`}
              className="group rounded-2xl bg-white border border-slate-200 shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                         p-4 md:p-5 transition-all duration-500
                         hover:bg-white hover:border-brand-accent sm:text-right"
            >
              <div className="flex sm:justify-end items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-brand-deep/60">
                Next <ArrowRight size={11} />
              </div>
              <div className="mt-1 font-serif text-base md:text-lg text-brand-deep leading-tight">
                {next.label}
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
