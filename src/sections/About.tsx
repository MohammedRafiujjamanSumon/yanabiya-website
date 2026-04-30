import { Link } from 'react-router-dom'
import { ArrowRight, Quote } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { useReveal } from '../hooks/useReveal'
import { assets } from '../data/assets'

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
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const PROMISE = {
  quote:
    'We deliver what we promise and place customer satisfaction above all — built on trust, integrity, and service excellence across every market we operate in.',
  attribution: 'Yanabiya Group · Built on Trust, Driven by Excellence',
}

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-[#fbfdfb]">

      {/* ───────── Ambient background: abstract global network ───────── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <svg
          viewBox="0 0 1200 600"
          className="absolute inset-0 w-full h-full opacity-[0.18]"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="netLine" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="rgba(125,164,42,0)" />
              <stop offset="50%"  stopColor="rgba(125,164,42,0.55)" />
              <stop offset="100%" stopColor="rgba(125,164,42,0)" />
            </linearGradient>
            <radialGradient id="netNode" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%"   stopColor="rgba(158,199,58,0.9)" />
              <stop offset="100%" stopColor="rgba(158,199,58,0)" />
            </radialGradient>
          </defs>

          <g stroke="url(#netLine)" strokeWidth="1.1" fill="none">
            <path d="M -50 420 Q 240 280 520 360 T 1080 220" />
            <path d="M -50 200 Q 320 320 620 240 T 1250 360" />
            <path d="M -50 320 Q 200 180 480 260 T 920 460" />
            <path d="M 100 540 Q 380 420 700 480 T 1300 380" />
            <path d="M 200 60  Q 460 220 760 140 T 1280 240" />
          </g>

          {[
            [180, 365], [420, 305], [620, 245], [810, 285], [1010, 235],
            [320, 235], [560, 275], [880, 415], [710, 470], [950, 175],
            [240, 95],  [490, 140], [770, 175], [1130, 320],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="14" fill="url(#netNode)" />
              <circle cx={cx} cy={cy} r="2.4" fill="rgba(125,164,42,0.85)" />
            </g>
          ))}
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[80%] h-[60%] rounded-full bg-white/70 blur-[80px]" />
        </div>
      </div>

      {/* ───────── Foreground content ───────── */}
      <div className="container-x relative pt-2 md:pt-3 pb-4 md:pb-6">
        <div className="flex flex-col gap-12 md:gap-16 items-center">

          {/* TOP — eyebrow + serif title + subtitle + CTAs (centered) */}
          <div className="w-full max-w-3xl mx-auto text-center order-1">
            <Reveal>
              <Eyebrow>About Us</Eyebrow>
            </Reveal>
            <Reveal delay={120}>
              <h2 className="font-serif text-[16px]
                             leading-snug tracking-tight text-brand-deep lg:whitespace-nowrap">
                A trusted global group, headquartered in Muscat,{' '}
                <span className="text-brand-accentDark">operating across four continents.</span>
              </h2>
            </Reveal>
          </div>

          {/* BELOW — full-width office photo. Counts moved to the home
           *  Stats strip; this card now leads cleanly with imagery
           *  (no side panel competing for attention). */}
          <div className="w-full max-w-4xl mx-auto order-2">
            <Reveal>
              <div className="relative rounded-2xl overflow-hidden
                              border border-brand-accent/30
                              shadow-[0_18px_44px_-14px_rgba(15,58,35,0.30)]
                              aspect-[16/9] bg-slate-900">
                <img
                  src={assets.office}
                  alt="Yanabiya Group office"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                {/* Soft bottom shade so any potential caption stays legible */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 via-black/10 to-transparent"
                />
              </div>
            </Reveal>
          </div>

          {/* PULL-QUOTE — brand promise under the picture. Replaces the
           *  redundant side-stats panel; gives the section a clear voice
           *  and links the visual to the brand line. */}
          <Reveal delay={200} className="order-3 w-full max-w-3xl mx-auto -mt-2">
            <figure className="relative rounded-2xl bg-white px-6 py-7 md:px-10 md:py-9
                              border border-emerald-100
                              shadow-[0_10px_28px_-14px_rgba(15,58,35,0.18)]">
              {/* Vertical brand-accent bar on the left */}
              <span aria-hidden className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-brand-accent" />
              <Quote
                aria-hidden
                size={26}
                className="absolute -top-3 -left-3 md:-top-4 md:-left-4 text-brand-accent
                           bg-white rounded-full p-1 ring-1 ring-emerald-100"
              />
              <blockquote className="font-serif italic text-slate-800 leading-relaxed text-[15px] md:text-base">
                &ldquo;{PROMISE.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-[10px] md:text-[11px] uppercase tracking-[0.28em]
                                     font-semibold text-brand-accentDark">
                {PROMISE.attribution}
              </figcaption>
            </figure>
          </Reveal>

          {/* BOTTOM — CTAs (centered, below the pull-quote) */}
          <Reveal delay={340} className="order-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-white text-xs font-semibold uppercase tracking-wider
                           shadow-md hover:bg-brand-accentDark hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Explore About
                <ArrowRight size={14} />
              </Link>
              <Link
                to="/about/our-story"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           border border-slate-300 text-slate-700 text-xs font-semibold uppercase tracking-wider
                           hover:border-brand-accentDark hover:text-brand-accentDark transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </Reveal>

        </div>
      </div>
    </Section>
  )
}
