import { Link } from 'react-router-dom'
import { ArrowUpRight, Eye, Target, Flag } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import { assets } from '../data/assets'

function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return <div className={className}>{children}</div>
}

const VMG = [
  {
    icon: Eye,
    label: 'Our Vision',
    body: 'To be the most trusted multinational group bridging cultures and markets across four continents.',
    to: '/about-us#vision',
    tone: 'from-cyan-50 to-sky-100',
    iconColor: 'text-sky-600',
    border: 'border-sky-200',
  },
  {
    icon: Target,
    label: 'Our Mission',
    body: 'Delivering excellence through integrity, innovation, and a commitment to people and communities.',
    to: '/about-us#mission',
    tone: 'from-emerald-50 to-emerald-100',
    iconColor: 'text-emerald-600',
    border: 'border-emerald-200',
  },
  {
    icon: Flag,
    label: 'Our Goal',
    body: 'To expand our global footprint while creating sustainable value for partners, employees, and societies.',
    to: '/about-us#values',
    tone: 'from-amber-50 to-orange-100',
    iconColor: 'text-orange-500',
    border: 'border-orange-200',
  },
]

export default function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-brand-50 !pt-0 !pb-0">


      <div className="relative z-10">

        {/* ── About Us eyebrow — full width ── */}
        <div className="container-x pt-3 pb-3">
          <Reveal>
            <Eyebrow>About Us</Eyebrow>
          </Reveal>
        </div>

        {/* ── Two-column grid: 50 / 50 ── */}
        <div className="grid md:grid-cols-2 items-center pb-12">

          {/* ── LEFT — image with transparent logo on wall ── */}
          <div className="hidden md:flex flex-col pl-10 lg:pl-14 pr-6">
            <div className="relative rounded-2xl overflow-hidden
                            shadow-[0_24px_64px_rgba(15,58,35,0.16)]
                            ring-1 ring-brand-deep/10 h-[480px]">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&crop=center&w=1200&h=900&q=90"
                alt="Yanabiya Group office"
                className="w-full h-full object-cover object-center"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
            </div>
          </div>

          {/* ── RIGHT — all text content ── */}
          <div className="flex flex-col justify-center px-5 py-8 sm:px-8 md:pl-14 md:pr-14 md:py-0">

            {/* Tagline pill */}
            <Reveal>
              <span className="inline-flex items-center gap-2 text-[11px] font-bold
                               tracking-[0.20em] uppercase text-brand-accentDark
                               bg-brand-accentDark/8 border border-brand-accentDark/20
                               rounded-full px-4 py-1.5 mb-5 self-start">
                Four Nations. One Trusted Group.
              </span>
            </Reveal>

            {/* Heading */}
            <Reveal delay={80}>
              <h2 className="font-serif text-xl sm:text-2xl md:text-[24px] lg:text-[28px]
                             leading-[1.25] tracking-tight text-brand-deep max-w-lg">
                Global Ambition.{' '}
                <span className="text-brand-accentDark">Grounded in Integrity.</span>
              </h2>
            </Reveal>

            {/* Body */}
            <Reveal delay={160}>
              <p className="mt-4 text-sm md:text-[15px] text-brand-deep/65 leading-relaxed max-w-md text-justify">
                Headquartered in Muscat and operating across the United Kingdom,
                Bangladesh, and the United States. Yanabiya unites four cultures
                under one shared standard of trust, professionalism, and long-term vision.
              </p>
            </Reveal>

            {/* Read More */}
            <Reveal delay={240}>
              <Link
                to="/about-us"
                className="group inline-flex items-center gap-2 self-start mt-6
                           bg-brand-deep text-white text-[13px] font-semibold
                           rounded-full px-6 py-2.5
                           shadow-[0_8px_24px_rgba(15,58,35,0.22)]
                           transition-all duration-300
                           hover:-translate-y-0.5
                           hover:shadow-[0_14px_32px_rgba(15,58,35,0.30)]"
              >
                Read More
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>

            {/* Vision / Mission / Goal cards — compact, bottom aligns with image */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {VMG.map(({ icon: Icon, label, body, to, tone, iconColor, border }, i) => (
                <Reveal key={label} delay={320 + i * 100}>
                  <div className={`group relative rounded-xl bg-gradient-to-br ${tone}
                                  border ${border} p-3
                                  shadow-[0_4px_16px_rgba(15,58,35,0.06)]
                                  transition-all duration-500
                                  hover:-translate-y-0.5
                                  hover:shadow-[0_8px_20px_rgba(15,58,35,0.12)]
                                  h-full flex flex-col`}>

                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`inline-flex items-center justify-center w-6 h-6 rounded-lg
                                       bg-white/70 shadow-sm flex-shrink-0 ${iconColor}`}>
                        <Icon size={12} strokeWidth={2} />
                      </div>
                      <h3 className="font-serif text-[13px] font-semibold text-brand-deep leading-tight">
                        {label}
                      </h3>
                    </div>

                    <p className="text-[11px] text-brand-deep/60 leading-snug mb-2 flex-1">
                      {body}
                    </p>

                    <Link
                      to={to}
                      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold
                                   ${iconColor} hover:underline underline-offset-2 mt-auto`}
                    >
                      Read More
                      <ArrowUpRight size={9} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </div>
    </Section>
  )
}
