import { useEffect } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { Crown, Users, ArrowRight, MapPin, Phone, Mail, Clock, Smartphone } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
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
      className={`${className} transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

type Person = { name: string; role: string; image: string }

type CountryTeam = {
  code: string
  name: string
  flag: string
  city: string
  blurb: string
  head: Person
  leadership: Person[]
  team: Person[]
  contact: {
    address: string[]
    phones: string[]
    mobile?: string
    emails: string[]
    hours: string
    mapUrl?: string
  }
}

const TEAMS: Record<string, CountryTeam> = {
  om: {
    code: 'OM',
    name: 'Oman',
    flag: '🇴🇲',
    city: 'Muscat',
    blurb: 'Group HQ — corporate, trade, and IT operations across the Sultanate.',
    head: {
      name: 'Yousuf Al-Lawati',
      role: 'Country Head — Oman',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    leadership: [
      { name: 'Hessa Al-Saadi',    role: 'Country COO',                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
      { name: 'Khalid Al-Harthi',  role: 'Head of Trade — Oman',       image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Maryam Al-Balushi', role: 'Head of IT — Oman',          image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
      { name: 'Salim Al-Hinai',    role: 'Country CFO',                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    ],
    team: [
      { name: 'Aisha Al-Riyami',   role: 'Operations Manager',         image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Faisal Al-Mahrouqi', role: 'Senior Engineer',           image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80' },
      { name: 'Nadia Al-Wahaibi',  role: 'Marketing Lead',             image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
      { name: 'Tariq Al-Habsi',    role: 'Logistics Coordinator',      image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
    ],
    contact: {
      address: [
        'Office-41, 4th Floor, Building-846',
        'Way-4011, Complex-240',
        'Al Gubrah, Bushar, Muscat',
        'Sultanate of Oman',
      ],
      phones: ['+968 2249 5566'],
      mobile: '+968 9116 1677',
      emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
      hours: 'Sunday – Thursday, 8:00 AM – 6:00 PM (GST)',
      mapUrl: 'https://maps.app.goo.gl/8kfKBHGkBEZ7ExsT9',
    },
  },
  gb: {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    city: 'London',
    blurb: 'European corporate office — partnerships, advisory, and EU trade.',
    head: {
      name: 'Eleanor Hayward',
      role: 'Country Head — UK',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    leadership: [
      { name: 'Sir Anthony Whitfield', role: 'UK Senior Advisor',     image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
      { name: 'Charlotte Mason',       role: 'Head of Partnerships',  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
      { name: 'Rohan Patel',           role: 'Head of Trade — EU',    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sophie Bennett',        role: 'UK CFO',                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
    ],
    team: [
      { name: 'Liam Carter',     role: 'Business Development', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80' },
      { name: 'Hannah Wright',   role: 'Programme Manager',    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80' },
      { name: 'Owen Harris',     role: 'Senior Consultant',    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Zara Ahmed',      role: 'UK Marketing Lead',    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' },
    ],
    contact: {
      address: [
        '167-169 Great Portland Street',
        '5th Floor, London, W1W 5PF',
        'United Kingdom',
      ],
      phones: [],
      emails: ['info@yanabiyagroup.com'],
      hours: 'Monday – Friday, 9:00 AM – 6:00 PM (GMT)',
    },
  },
  bd: {
    code: 'BD',
    name: 'Bangladesh',
    flag: '🇧🇩',
    city: 'Dhaka',
    blurb: 'Regional hub — IT delivery, software engineering, and South Asia operations.',
    head: {
      name: 'Imran Chowdhury',
      role: 'Country Head — Bangladesh',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    },
    leadership: [
      { name: 'Nusrat Jahan',     role: 'Head of Engineering',     image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Ashraful Karim',   role: 'Head of Trade — BD',      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Tanvir Rahman',    role: 'Country CFO',             image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sadia Hossain',    role: 'Head of HR — BD',         image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
    ],
    team: [
      { name: 'Rakib Hasan',     role: 'Senior Engineer',     image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=400&q=80' },
      { name: 'Mehjabin Akter',  role: 'Product Designer',    image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=400&q=80' },
      { name: 'Faruk Ahmed',     role: 'Operations Manager',  image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
      { name: 'Sumi Begum',      role: 'Customer Success',    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' },
    ],
    contact: {
      address: [
        'Office #211, Plot #322/B',
        'Block #Kanchkura, Uttarkhan',
        'Dhaka-1230, Bangladesh',
      ],
      phones: [],
      emails: ['info@yanabiyagroup.com'],
      hours: 'Sunday – Thursday, 9:00 AM – 6:00 PM (BST)',
    },
  },
  us: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    city: 'Austin',
    blurb: 'North American office — enterprise partnerships, advisory, and growth.',
    head: {
      name: 'Michael Reeves',
      role: 'Country Head — USA',
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80',
    },
    leadership: [
      { name: 'Jessica Park',    role: 'Head of Enterprise Sales',  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
      { name: 'David Cohen',     role: 'Head of Partnerships — US', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Ana García',      role: 'Country CFO',               image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80' },
      { name: 'Marcus Coleman',  role: 'Head of Strategy — US',     image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=400&q=80' },
    ],
    team: [
      { name: 'Olivia Bennett',  role: 'Senior Account Manager', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80' },
      { name: 'Ethan Walker',    role: 'Solutions Architect',    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
      { name: 'Priya Iyer',      role: 'Marketing Director',     image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80' },
      { name: 'Daniel Smith',    role: 'Operations Lead',        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=400&q=80' },
    ],
    contact: {
      address: [
        '5900 Balcones Drive #18651',
        'Austin, TX 78731',
        'United States of America',
      ],
      phones: [],
      emails: ['info@yanabiyagroup.com'],
      hours: 'Monday – Friday, 9:00 AM – 5:00 PM (CT)',
    },
  },
}

function PersonCard({ p, accent = false }: { p: Person; accent?: boolean }) {
  return (
    <div className={`group rounded-2xl overflow-hidden border transition-all duration-500
                     hover:-translate-y-1
                     ${accent
                       ? 'bg-brand-50 border-brand-accent/50 hover:border-brand-accent shadow-[0_8px_22px_-14px_rgba(15,58,35,0.25)]'
                       : 'bg-brand-50 border-brand-deep/15 hover:border-brand-accent/60 shadow-[0_4px_16px_rgba(15,58,35,0.06)]'}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-300 group-hover:scale-105"
          onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
        />
      </div>
      <div className="p-3 md:p-4">
        <div className="font-serif text-[14px] md:text-[15px] text-brand-deep leading-tight">{p.name}</div>
        <div className="mt-1 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-brand-accentDark">
          {p.role}
        </div>
      </div>
    </div>
  )
}

const COUNTRY_LINKS = [
  { code: 'om', name: 'Oman',       flag: '🇴🇲' },
  { code: 'gb', name: 'UK',         flag: '🇬🇧' },
  { code: 'bd', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'us', name: 'USA',        flag: '🇺🇸' },
]

export default function CountryManagement() {
  const { code } = useParams<{ code: string }>()
  const team = code ? TEAMS[code.toLowerCase()] : undefined

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [code])

  if (!team) return <Navigate to="/leadership" replace />

  return (
    <main className="relative bg-brand-50 text-brand-deep overflow-hidden min-h-screen">
      <BackButton to="/leadership" label="Back to Leadership" />

      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[640px] h-[640px] rounded-full bg-brand-accent/15 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[560px] h-[560px] rounded-full bg-brand-accentDark/10 blur-[160px]" />
      </div>

      <PageHero
        eyebrow={`${team.flag} ${team.name} Leadership`}
        title={<>The team running <span className="italic text-brand-accent">{team.name}.</span></>}
        subtitle={team.blurb}
      />

      {/* Quick switcher */}
      <section className="relative">
        <div className="container-x py-3">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {COUNTRY_LINKS.map((c) => {
              const active = c.code === code?.toLowerCase()
              return (
                <Link
                  key={c.code}
                  to={`/leadership/country/${c.code}`}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5
                              text-[11px] font-bold uppercase tracking-[0.2em]
                              border transition-all duration-300
                              ${active
                                ? 'bg-brand-deep text-brand-accent border-brand-deep'
                                : 'bg-brand-50 text-brand-deep/70 border-slate-200 hover:bg-brand-deep hover:text-white hover:border-brand-deep'}`}
                >
                  <span className="text-sm leading-none">{c.flag}</span> {c.name}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* COUNTRY HEAD spotlight */}
      <section className="relative">
        <div className="container-x py-4">
          <Reveal>
            <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden
                            bg-brand-50 border border-brand-deep/15
                            shadow-[0_20px_50px_-20px_rgba(15,58,35,0.18)]
                            grid md:grid-cols-[280px_1fr]">
              <div className="relative aspect-square md:aspect-auto bg-slate-100">
                <img
                  src={team.head.image}
                  alt={team.head.name}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full
                                 bg-brand-accent/20 border border-brand-accentDark/40
                                 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em]
                                 text-brand-accentDark w-fit">
                  <Crown size={11} /> Country Co-Founder
                </span>
                <h2 className="mt-3 font-serif text-2xl md:text-3xl text-brand-deep leading-tight">
                  {team.head.name}
                </h2>
                <div className="mt-1 text-[12px] md:text-[13px] uppercase tracking-[0.22em] text-brand-accentDark">
                  {team.head.role}
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 text-brand-deep/70 text-[12px]">
                  <MapPin size={12} /> {team.city}, {team.name}
                </div>
                <p className="mt-4 text-sm text-brand-deep/70 leading-snug max-w-md">
                  Leads the {team.name} office across operations, partnerships, and delivery —
                  with full ownership of the country P&amp;L and team.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* LOCAL LEADERSHIP */}
      <section className="relative">
        <div className="container-x py-4">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full
                              bg-brand-50 border border-brand-deep/15
                              px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-deep/70">
                <Users size={11} /> Executive Management
              </div>
              <h3 className="mt-3 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                {team.name} executive bench.
              </h3>
            </div>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {team.leadership.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <PersonCard p={p} accent />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="relative">
        <div className="container-x pb-20 md:pb-28 pt-6">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
              <div className="inline-flex items-center gap-1.5 rounded-full
                              bg-brand-50 border border-brand-deep/15
                              px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-deep/70">
                High-Skill Professionals
              </div>
              <h3 className="mt-3 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                The {team.name} delivery bench.
              </h3>
            </div>
          </Reveal>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
            {team.team.map((p, i) => (
              <Reveal key={p.name} delay={i * 70}>
                <PersonCard p={p} />
              </Reveal>
            ))}
          </div>

          {/* CONTACT — phone, email, address, hours */}
          <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
            <Reveal>
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center gap-1.5 rounded-full
                                bg-brand-50 border border-brand-deep/15
                                px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-deep/70">
                  <Phone size={11} /> Office Contact
                </div>
                <h3 className="mt-3 font-serif text-xl md:text-2xl text-brand-deep leading-tight">
                  Reach our {team.name} office.
                </h3>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Address */}
                <div className="rounded-2xl bg-brand-50 border border-brand-deep/15 shadow-[0_4px_16px_rgba(15,58,35,0.06)] p-5">
                  <div className="flex items-center gap-2 text-brand-accentDark mb-2">
                    <MapPin size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Address</span>
                  </div>
                  <div className="text-[13px] text-brand-deep/80 leading-snug space-y-0.5">
                    {team.contact.address.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </div>
                  {team.contact.mapUrl && (
                    <a
                      href={team.contact.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase
                                 tracking-[0.2em] text-brand-accentDark hover:gap-1.5 transition-all"
                    >
                      Open in Maps <ArrowRight size={10} />
                    </a>
                  )}
                </div>

                {/* Phone + Mobile */}
                <div className="rounded-2xl bg-brand-50 border border-brand-deep/15 shadow-[0_4px_16px_rgba(15,58,35,0.06)] p-5">
                  <div className="flex items-center gap-2 text-brand-accentDark mb-2">
                    <Phone size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Phone</span>
                  </div>
                  {team.contact.phones.length > 0 ? (
                    <div className="space-y-1">
                      {team.contact.phones.map((p) => (
                        <a key={p} href={`tel:${p.replace(/\s+/g, '')}`}
                           className="block text-[13px] text-brand-deep/80 hover:text-brand-accentDark transition-colors">
                          {p}
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="text-[12px] text-brand-deep/50 italic">Not yet listed</div>
                  )}
                  {team.contact.mobile && (
                    <>
                      <div className="flex items-center gap-2 text-brand-accent mt-4 mb-2">
                        <Smartphone size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Mobile</span>
                      </div>
                      <a href={`tel:${team.contact.mobile.replace(/\s+/g, '')}`}
                         className="block text-[13px] text-brand-deep/80 hover:text-brand-accentDark transition-colors">
                        {team.contact.mobile}
                      </a>
                    </>
                  )}
                </div>

                {/* Email */}
                <div className="rounded-2xl bg-brand-50 border border-brand-deep/15 shadow-[0_4px_16px_rgba(15,58,35,0.06)] p-5">
                  <div className="flex items-center gap-2 text-brand-accentDark mb-2">
                    <Mail size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Email</span>
                  </div>
                  <div className="space-y-1">
                    {team.contact.emails.map((e) => (
                      <a key={e} href={`mailto:${e}`}
                         className="block text-[13px] text-brand-deep/80 hover:text-brand-accentDark transition-colors break-all">
                        {e}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Hours */}
                <div className="rounded-2xl bg-brand-50 border border-brand-deep/15 shadow-[0_4px_16px_rgba(15,58,35,0.06)] p-5">
                  <div className="flex items-center gap-2 text-brand-accentDark mb-2">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em]">Office Hours</span>
                  </div>
                  <div className="text-[13px] text-brand-deep/80 leading-snug">
                    {team.contact.hours}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Closing CTA */}
          <div className="mt-10 md:mt-12 text-center">
            <Reveal>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3
                           bg-brand-accent text-brand-deep text-xs font-bold uppercase tracking-[0.22em]
                           hover:gap-3 transition-all duration-300"
              >
                Contact our {team.name} office <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  )
}
