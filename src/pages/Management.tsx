import { useEffect } from 'react'
import { Quote, Crown, Users } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useReveal } from '../hooks/useReveal'
import { board, chairmanMessage, viceChairmanMessage } from '../data/leadership'

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

type MessageBlock = {
  kicker: string
  icon: typeof Crown
  name: string
  role: string
  photo: string
  greeting: string
  paragraphs: string[]
  signOffRole: string
}

const BLOCKS: MessageBlock[] = [
  {
    kicker: 'Global CEO Message',
    icon: Crown,
    name: 'S M Shamim Ahmed',
    role: 'Global CEO',
    photo: board[0].photo,
    greeting: 'Greetings from YANABIYA GROUP,',
    paragraphs: chairmanMessage,
    signOffRole: 'Global CEO — Yanabiya Group',
  },
  {
    kicker: 'Vice Chairman Message',
    icon: Users,
    name: 'Mohammad Abu Jaheed',
    role: 'Vice Chairman',
    photo: board[1].photo,
    greeting: 'Dear Visitors,',
    paragraphs: viceChairmanMessage,
    signOffRole: 'Vice Chairman — Yanabiya Group',
  },
]

export default function Management() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <main className="relative bg-gradient-to-br from-[#0a1410] via-[#0c1f17] to-[#04100a] text-white overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/8 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/6 blur-[160px]" />
      </div>

      <PageHero
        eyebrow="Global CEO & Vice Chairman"
        title={<>Messages from <span className="italic text-brand-accent">our leadership.</span></>}
        subtitle="The voices behind Yanabiya Group's strategy, culture, and long-term vision."
      />

      <section className="relative">
        <div className="container-x py-12 md:py-16 space-y-10 md:space-y-14">
          {BLOCKS.map((b, idx) => (
            <Reveal key={b.name} delay={idx * 120}>
              <article className="relative overflow-hidden rounded-3xl
                                  bg-white/5 backdrop-blur border border-white/10
                                  shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]">
                {/* Decorative quote glyph */}
                <Quote
                  className="absolute -top-6 -right-6 text-brand-accent/8"
                  size={180}
                  strokeWidth={1}
                />

                <div className="relative grid md:grid-cols-[280px_1fr] gap-0">
                  {/* Portrait column */}
                  <div className="relative bg-gradient-to-br from-brand-deep/60 to-[#04100a]
                                  p-6 md:p-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden
                                    ring-2 ring-brand-accent/40
                                    shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]">
                      <img
                        src={b.photo}
                        alt={b.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                      />
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1.5 rounded-full
                                     bg-brand-accent/15 border border-brand-accent/30
                                     px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]
                                     text-brand-accent">
                      <b.icon size={11} /> {b.kicker}
                    </span>
                    <div className="mt-3 font-serif text-xl md:text-2xl text-white leading-tight">
                      {b.name}
                    </div>
                    <div className="mt-1 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-brand-accent">
                      {b.role}
                    </div>
                  </div>

                  {/* Message column */}
                  <div className="p-6 md:p-10">
                    <p className="text-white/85 mb-5 text-[14px] md:text-[15px]">{b.greeting}</p>
                    <div className="space-y-4 text-[13px] md:text-[14px] text-white/70 leading-relaxed text-justify">
                      {b.paragraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div className="mt-8 pt-5 border-t border-white/10">
                      <p className="text-white/70 text-[13px]">Sincerely,</p>
                      <p className="font-serif text-lg text-white mt-1">{b.name}</p>
                      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-brand-accent mt-1">
                        {b.signOffRole}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
