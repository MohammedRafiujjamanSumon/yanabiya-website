import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowLeft, ArrowRight, BadgeCheck, Users, Globe, Award } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Section from '../components/Section'
import PageHero from '../components/PageHero'
import { useSection } from '../hooks/useSection'

/* ── Types ─────────────────────────────────────────────────── */
type Testimonial = {
  quote: string
  author: string
  role: string
  company: string
  rating: number
  code: string
}

/* ── Testimonial data ───────────────────────────────────────── */
const raw: Record<string, Omit<Testimonial, 'code'>[]> = {
  OM: [
    { quote: 'Yanabiya Group delivered our ERP rollout across three branches without a single business-day disruption. Their delivery discipline is rare in this region.', author: 'Khalid Al-Hashmi', role: 'Operations Director', company: 'Al-Hashmi Trading Group', rating: 5 },
    { quote: 'From procurement to deployment, the Yanabiya team treated our project as their own. Six months in, the platform still runs exactly as promised.', author: 'Aisha Al-Balushi', role: 'Group CFO', company: 'Al Khuwair Holdings', rating: 5 },
    { quote: 'Their understanding of Omani business culture combined with global tech standards is what sets Yanabiya apart. I recommend them without hesitation.', author: 'Mohammed Al-Rashdi', role: 'Head of IT', company: 'Muscat Commercial Partners', rating: 5 },
  ],
  GB: [
    { quote: 'A reliable European delivery partner is hard to find. The Yanabiya London team brought enterprise-grade architecture and clear, jargon-free communication.', author: 'James Whitcombe', role: 'Head of Engineering', company: 'FinTech Ventures Ltd', rating: 5 },
    { quote: 'Fast, considered, and always on top of compliance. The team understands what UK financial-services clients actually need.', author: 'Priya Shah', role: 'Programme Manager', company: 'Great Portland Capital', rating: 5 },
    { quote: 'We migrated three legacy systems in under four months. The Yanabiya UK team managed every stakeholder and every deadline with precision.', author: 'Sarah Mitchell', role: 'Chief Technology Officer', company: 'Meridian Digital Group', rating: 5 },
  ],
  BD: [
    { quote: 'The Dhaka engineering centre has been a true extension of our internal team. 24×7 support without ever feeling like outsourcing.', author: 'Tahmid Rahman', role: 'Chief Technology Officer', company: 'Uttarkhan Tech Solutions', rating: 5 },
    { quote: 'I have worked with Yanabiya for three years. The QA standard alone has saved us countless production incidents.', author: 'Nasrin Akter', role: 'Product Lead', company: 'DhakaCommerce Ltd', rating: 5 },
    { quote: 'From discovery to go-live in twelve weeks, the team delivered a product our customers love and our ops team can manage independently.', author: 'Rafiqul Islam', role: 'VP Operations', company: 'Bengal Digital Hub', rating: 5 },
  ],
  US: [
    { quote: 'Yanabiya brought structured cloud and AI advisory to our growing North-American practice. Honest, hands-on, and well-priced.', author: 'Daniel Carter', role: 'Managing Partner', company: 'Carter Advisory Group', rating: 5 },
    { quote: 'Their team blends seamlessly with our US engineers. Time-zone coverage is the bonus, quality of work is the headline.', author: 'Marcus Lee', role: 'VP Engineering', company: 'Texas Innovate Corp', rating: 5 },
    { quote: 'Security-first culture, transparent communication, no surprise invoices. That combination is genuinely rare in the market.', author: 'Jennifer Walsh', role: 'Head of Product', company: 'Austin SaaS Partners', rating: 5 },
  ],
}

const all: Testimonial[] = Object.entries(raw).flatMap(
  ([code, items]) => items.map((t) => ({ ...t, code }))
)

/* ── Country display meta ───────────────────────────────────── */
const COUNTRY: Record<string, { flag: string; name: string }> = {
  OM: { flag: '🇴🇲', name: 'Oman'           },
  GB: { flag: '🇬🇧', name: 'United Kingdom' },
  BD: { flag: '🇧🇩', name: 'Bangladesh'     },
  US: { flag: '🇺🇸', name: 'USA'            },
}

/* ── Country Tailwind class map (JIT-safe literal strings) ──── */
const CC: Record<string, {
  cardGradient:   string   // bg-gradient-to-br stops for featured card
  featQuoteMark:  string   // decorative " on featured card
  avatarBg:       string   // bg class for avatar circle
  badgeText:      string   // color class for BadgeCheck icon
  quoteDecor:     string   // decorative " on grid cards
  borderTopColor: string   // arbitrary CSS for card top border color
  chipBg:         string   // country chip background
  chipText:       string   // country chip text color
}> = {
  OM: {
    cardGradient:   'from-[#0f3a23] via-[#1a5c38] to-emerald-500/20',
    featQuoteMark:  'text-emerald-500/10',
    avatarBg:       'bg-emerald-500',
    badgeText:      'text-emerald-400',
    quoteDecor:     'text-emerald-300/25',
    borderTopColor: '[border-top-color:#10b981]',
    chipBg:         'bg-emerald-50',
    chipText:       'text-emerald-600',
  },
  GB: {
    cardGradient:   'from-[#0f3a23] via-[#1a5c38] to-sky-500/20',
    featQuoteMark:  'text-sky-500/10',
    avatarBg:       'bg-sky-500',
    badgeText:      'text-sky-400',
    quoteDecor:     'text-sky-300/25',
    borderTopColor: '[border-top-color:#0ea5e9]',
    chipBg:         'bg-sky-50',
    chipText:       'text-sky-600',
  },
  BD: {
    cardGradient:   'from-[#0f3a23] via-[#1a5c38] to-amber-500/20',
    featQuoteMark:  'text-amber-500/10',
    avatarBg:       'bg-amber-500',
    badgeText:      'text-amber-400',
    quoteDecor:     'text-amber-300/25',
    borderTopColor: '[border-top-color:#f59e0b]',
    chipBg:         'bg-amber-50',
    chipText:       'text-amber-600',
  },
  US: {
    cardGradient:   'from-[#0f3a23] via-[#1a5c38] to-rose-500/20',
    featQuoteMark:  'text-rose-500/10',
    avatarBg:       'bg-rose-500',
    badgeText:      'text-rose-400',
    quoteDecor:     'text-rose-300/25',
    borderTopColor: '[border-top-color:#f43f5e]',
    chipBg:         'bg-rose-50',
    chipText:       'text-rose-600',
  },
}

/* ── Stats ──────────────────────────────────────────────────── */
const statsData = [
  { Icon: Star,  v: '4.9/5', key: 'avgRating'    },
  { Icon: Users, v: '120+',  key: 'clientsServed' },
  { Icon: Globe, v: '4',     key: 'countries'     },
  { Icon: Award, v: '15Y',   key: 'track'         },
]

/* ── Filter tabs ────────────────────────────────────────────── */
type Code = 'ALL' | 'OM' | 'GB' | 'BD' | 'US'
const TABS: { code: Code; label: string; flag?: string }[] = [
  { code: 'ALL', label: 'All Regions'    },
  { code: 'OM',  label: 'Oman',           flag: '🇴🇲' },
  { code: 'GB',  label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'BD',  label: 'Bangladesh',     flag: '🇧🇩' },
  { code: 'US',  label: 'USA',            flag: '🇺🇸' },
]

function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('').toUpperCase()
}

/* ── Page component ─────────────────────────────────────────── */
export default function Testimonials() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<Code>('ALL')
  const pageHeroes = useSection<Record<string, { eyebrow: string; title: string; subtitle: string }>>('page-heroes')
  const hero = pageHeroes?.['testimonials']
  const apiTestimonials = useSection<{ id: string; country: string; quote: string; author: string; role: string; rating: number }[]>('testimonials')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const displayAll: Testimonial[] = apiTestimonials
    ? apiTestimonials.map((t) => ({
        quote: t.quote, author: t.author,
        role: t.role, company: '', rating: t.rating, code: t.country,
      }))
    : all

  const visible = filter === 'ALL' ? displayAll : displayAll.filter((t) => t.code === filter)
  const [featured, ...rest] = visible

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="relative">
        <PageHero
          title={hero?.title || 'Client Testimonials'}
          subtitle={hero?.subtitle || 'Real words from real clients, gathered across Oman, UK, Bangladesh and the USA.'}
          centered
          ghostText=""
        />
        <div className="absolute inset-0 container-x px-5 md:px-12 flex items-start justify-between pt-5 md:pt-6 pointer-events-none">
          <Link to="/community/donation"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
            <ArrowLeft size={13} /> Donation
          </Link>
          <Link to="/community/careers"
            className="pointer-events-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-brand-accentDark hover:text-brand-deep transition-colors duration-200">
            Career With Us <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      <Section id="testimonials" className="bg-[#F8FAFC]">
        <div className="container-x">

          {/* ── Stats trust bar ───────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200/70 rounded-2xl overflow-hidden mb-14 shadow-sm">
            {statsData.map(({ Icon, v, key }) => (
              <div key={key} className="bg-white flex items-center gap-4 px-6 py-5 group">
                <div className="w-10 h-10 rounded-xl bg-brand-50 border border-brand-accent/20
                               flex items-center justify-center shrink-0
                               group-hover:bg-brand-accent group-hover:border-brand-accent transition-colors duration-300">
                  <Icon size={17} className="text-brand-accentDark group-hover:text-white transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-brand-deep leading-none">{v}</div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 mt-0.5">{t(`testimonialsPage.stats.${key}`)}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Heading ───────────────────────────────────────── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="block w-8 h-px bg-brand-accent rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-brand-accentDark">{t('testimonialsPage.clientVoices')}</span>
              <span className="block w-8 h-px bg-brand-accent rounded-full" />
            </div>
            <h2 className="font-serif text-3xl md:text-[38px] text-slate-900 leading-[1.12]">
              {t('testimonialsPage.title')}
            </h2>
            <p className="text-slate-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              {t('testimonialsPage.desc')}
            </p>
          </div>

          {/* ── Filter tabs ───────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            {TABS.map((tab) => {
              const count = tab.code === 'ALL' ? displayAll.length : displayAll.filter((tm) => tm.code === tab.code).length
              const active = filter === tab.code
              return (
                <button
                  key={tab.code}
                  type="button"
                  onClick={() => setFilter(tab.code)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                             border transition-all duration-200
                             ${active
                               ? 'bg-brand-deep border-brand-deep text-white shadow-md scale-[1.03]'
                               : 'bg-white border-slate-200 text-slate-600 hover:border-brand-accentDark hover:text-brand-accentDark'
                             }`}
                >
                  {tab.flag && <span className="text-base leading-none">{tab.flag}</span>}
                  {tab.code === 'ALL' ? t('common.allRegions') : tab.label}
                  <span className={`text-[10px] font-bold rounded-full px-1.5 py-0.5
                                   ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── Featured testimonial ──────────────────────────── */}
          {featured && (() => {
            const meta = COUNTRY[featured.code]
            const cc   = CC[featured.code]
            return (
              <div className={`relative rounded-3xl overflow-hidden mb-8 p-8 md:p-12
                               shadow-[0_8px_40px_rgba(15,58,35,0.18)]
                               bg-gradient-to-br ${cc.cardGradient}`}>

                {/* Subtle grid pattern */}
                <div aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-[0.04]
                             [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)]
                             [background-size:40px_40px]" />

                {/* Large decorative quote mark */}
                <span aria-hidden
                  className={`absolute top-4 right-8 font-serif text-[120px] font-black leading-none select-none ${cc.featQuoteMark}`}>
                  "
                </span>

                <div className="relative">
                  {/* Top: country + verified + stars */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
                      <span className="text-lg leading-none">{meta.flag}</span>
                      <span className="text-white/70 text-xs font-medium">{meta.name}</span>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5">
                      <BadgeCheck size={12} className={cc.badgeText} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{t('common.verifiedClient')}</span>
                    </div>
                    <div className="flex items-center gap-0.5 ml-auto">
                      {Array.from({ length: featured.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-500 stroke-0" />
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-serif text-xl md:text-[22px] text-white leading-[1.55] mb-8 max-w-2xl">
                    "{featured.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center
                                    text-white font-bold text-sm ring-2 ring-white/20 shrink-0
                                    ${cc.avatarBg}`}>
                      {initials(featured.author)}
                    </div>
                    <div>
                      <div className="text-white font-semibold leading-tight">{featured.author}</div>
                      <div className="text-white/55 text-sm mt-0.5">{featured.role}</div>
                      <div className="text-white/35 text-[11px] mt-0.5">{featured.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}

          {/* ── Testimonial grid ──────────────────────────────── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((tm, i) => {
              const meta = COUNTRY[tm.code]
              const cc   = CC[tm.code]
              return (
                <figure
                  key={i}
                  className={`group bg-white rounded-2xl p-6 flex flex-col
                             border border-slate-100 border-t-[3px] ${cc.borderTopColor}
                             shadow-sm hover:shadow-[0_8px_32px_rgba(15,58,35,0.12)]
                             hover:-translate-y-1 transition-all duration-300`}
                >
                  {/* Stars + verified */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: tm.rating }).map((_, idx) => (
                        <Star key={idx} size={12} className="fill-amber-500 stroke-0" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <BadgeCheck size={11} className={cc.badgeText} />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{t('common.verified')}</span>
                    </div>
                  </div>

                  {/* Decorative quote mark */}
                  <div className={`font-serif text-6xl font-black leading-none mb-1 select-none ${cc.quoteDecor}`} aria-hidden>
                    "
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">
                    {tm.quote}
                  </blockquote>

                  {/* Author row */}
                  <figcaption className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center
                                      text-white text-[11px] font-bold shrink-0 ring-2 ring-white
                                      ${cc.avatarBg}`}>
                        {initials(tm.author)}
                      </div>
                      <div>
                        <div className="text-slate-900 font-semibold text-sm leading-tight">{tm.author}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5">{tm.role}</div>
                        <div className="text-slate-300 text-[10px]">{tm.company}</div>
                      </div>
                    </div>
                    {/* Country chip */}
                    <div className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold shrink-0 ml-2
                                    ${cc.chipBg} ${cc.chipText}`}>
                      <span className="text-sm leading-none">{meta.flag}</span>
                      <span className="hidden sm:inline">{meta.name}</span>
                    </div>
                  </figcaption>
                </figure>
              )
            })}
          </div>

          {visible.length === 0 && (
            <div className="text-center text-slate-400 py-16 text-sm">
              {t('testimonialsPage.noTestimonials')}
            </div>
          )}

        </div>
      </Section>
    </>
  )
}
