import { useEffect, useState } from 'react'
import {
  Globe2, Cpu, Plane, TrendingUp, Lightbulb, Gem,
  Layers, Smartphone, ShieldCheck, Handshake, Users, Repeat,
  MapPin, Server, Sparkles, Network, BarChart3, Award,
  Leaf, HeartHandshake, Scale, Recycle, Target, UsersRound,
  Globe, Rocket, LineChart, Maximize2, Link2, RefreshCw,
  Quote,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Item = {
  id: string
  icon: LucideIcon
  title: string
  body: string
  insight: string
  image: string
}

const IMG = {
  globe:        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
  tech:         'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  flight:       'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
  growth:       'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
  innovate:     'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
  jewel:        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  layers:       'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
  digital:      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80',
  process:      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
  partnership:  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  empower:      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
  value:        'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  market:       'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  server:       'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  spark:        'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80',
  network:      'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&w=800&q=80',
  chart:        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  brand:        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80',
  leaf:         'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  community:    'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
  ethics:       'https://images.unsplash.com/photo-1589994965851-a8f479c573a9?auto=format&fit=crop&w=800&q=80',
  recycle:      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
  impact:       'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  inclusive:    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  rocket:       'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=800&q=80',
  data:         'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  scale:        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
  collab:       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  loop:         'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
}

type Category = { key: string; label: string; intro: string; items: Item[] }

export const aboutCategories: Category[] = [
  {
    key: 'vision',
    label: 'Our Vision',
    intro: 'A unified global platform connecting industries, technology, and people across borders.',
    items: [
      { id: 'v1', icon: Globe2,     image: IMG.globe,    title: 'Global Integrated Business Ecosystem',  body: 'We aim to become a unified global platform that connects multiple industries under one structured ecosystem, enabling seamless coordination, scalability, and long-term strategic growth across international markets.', insight: 'Our vision is to build a system where different businesses operate as one connected network, creating synergy and global efficiency.' },
      { id: 'v2', icon: Cpu,        image: IMG.tech,     title: 'Technology-Driven Future Leadership',   body: 'We strive to lead global markets by leveraging innovation, digital transformation, and advanced technology-driven solutions that redefine modern business operations.', insight: 'We focus on using technology as the foundation of leadership in the evolving global economy.' },
      { id: 'v3', icon: Plane,      image: IMG.flight,   title: 'Borderless Business Expansion',         body: 'We aim to expand our operations across multiple countries, building a strong international footprint with scalable and adaptable business models.', insight: 'Our goal is to grow beyond geographical boundaries and establish a truly global presence.' },
      { id: 'v4', icon: TrendingUp, image: IMG.growth,   title: 'Sustainable Growth Leadership',         body: 'We are committed to achieving long-term growth that balances profitability, operational efficiency, and environmental responsibility.', insight: 'Growth is not just about speed, but about stability and sustainability over time.' },
      { id: 'v5', icon: Lightbulb,  image: IMG.innovate, title: 'Innovation-Centric Organization',       body: 'We continuously develop and implement innovative business models, systems, and strategies to stay ahead in competitive global markets.', insight: 'Innovation is at the core of how we build and evolve every business unit.' },
      { id: 'v6', icon: Gem,        image: IMG.jewel,    title: 'Global Value Creation Platform',        body: 'We focus on creating long-term value for clients, partners, and stakeholders through structured, scalable, and impactful business solutions.', insight: 'Our vision is to generate meaningful and lasting global value.' },
    ],
  },
  {
    key: 'mission',
    label: 'Our Mission',
    intro: 'How we operate every day to turn vision into measurable, sustainable outcomes.',
    items: [
      { id: 'm1', icon: Layers,      image: IMG.layers,      title: 'Multi-Industry Integration',                body: 'We integrate diverse industries into a single, scalable global platform that operates efficiently under one unified structure.', insight: 'We bring different business sectors together to create a powerful ecosystem.' },
      { id: 'm2', icon: Smartphone,  image: IMG.digital,     title: 'Digital Transformation Focus',              body: 'We transform traditional business models into modern, digital-first systems that improve speed, efficiency, and scalability.', insight: 'Our mission is to modernize businesses through digital innovation.' },
      { id: 'm3', icon: ShieldCheck, image: IMG.process,     title: 'Operational Excellence',                    body: 'We ensure high standards of efficiency, transparency, and structured execution across all business operations.', insight: 'Every process is designed to be clear, effective, and well-managed.' },
      { id: 'm4', icon: Handshake,   image: IMG.partnership, title: 'Global Partnership Development',            body: 'We build strong international partnerships and collaborations that strengthen our global network and business reach.', insight: 'We believe in growing together through trusted global partnerships.' },
      { id: 'm5', icon: Users,       image: IMG.empower,     title: 'Empowerment of Businesses & Individuals',   body: 'We provide scalable solutions that empower both enterprises and individuals to grow, expand, and succeed globally.', insight: 'Our mission is to create opportunities for sustainable growth for everyone.' },
      { id: 'm6', icon: Repeat,      image: IMG.value,       title: 'Sustainable Value Delivery',                body: 'We deliver long-term, reliable, and impactful solutions that ensure continuous value creation over time.', insight: 'We focus on consistent and lasting impact, not short-term results.' },
    ],
  },
  {
    key: 'goals',
    label: 'Core Goals',
    intro: 'The targets we are building toward — every quarter, every market, every team.',
    items: [
      { id: 'g1', icon: MapPin,    image: IMG.market,  title: 'International Market Expansion',           body: 'We aim to expand into multiple global markets strategically, building a strong and sustainable international presence.', insight: 'Growth is achieved through structured and planned global expansion.' },
      { id: 'g2', icon: Server,    image: IMG.server,  title: 'Scalable Business Platform Development',   body: 'We develop systems capable of managing and supporting multiple businesses efficiently under one ecosystem.', insight: 'Our platform is designed to scale without limitations.' },
      { id: 'g3', icon: Sparkles,  image: IMG.spark,   title: 'Technology Innovation Leadership',         body: 'We invest in advanced technologies, automation, and intelligent systems to lead in digital transformation.', insight: 'Technology is a key driver of our long-term success.' },
      { id: 'g4', icon: Network,   image: IMG.network, title: 'Strong Operational Synergy',               body: 'We ensure all business units operate in coordination, maximising efficiency and overall performance.', insight: 'Every part of our system works together as one unified structure.' },
      { id: 'g5', icon: BarChart3, image: IMG.chart,   title: 'Sustainable Revenue Growth',               body: 'We build stable and long-term revenue systems that support continuous business expansion and financial strength.', insight: 'Our focus is on consistent and sustainable financial growth.' },
      { id: 'g6', icon: Award,     image: IMG.brand,   title: 'Global Brand Recognition',                 body: 'We aim to establish Yanabiya Group as a trusted, respected, and recognised global business platform.', insight: 'Our goal is to build a strong and reputable global identity.' },
    ],
  },
  {
    key: 'sustainability',
    label: 'Sustainability & Social Impact',
    intro: 'How we make sure growth benefits people, communities, and the planet — not just balance sheets.',
    items: [
      { id: 's1', icon: Leaf,           image: IMG.leaf,      title: 'Eco-Friendly Operations',          body: 'We promote environmentally responsible practices across all business activities to minimise ecological impact.', insight: 'Sustainability is embedded in our operational structure.' },
      { id: 's2', icon: HeartHandshake, image: IMG.community, title: 'Community Empowerment Programs',   body: 'We support communities through development initiatives, training programmes, and opportunity creation.', insight: 'We believe in empowering people at the local level.' },
      { id: 's3', icon: Scale,          image: IMG.ethics,    title: 'Ethical Business Practices',       body: 'We maintain transparency, fairness, and accountability in all business operations and decisions.', insight: 'Ethics and trust are fundamental to our operations.' },
      { id: 's4', icon: Recycle,        image: IMG.recycle,   title: 'Resource Efficiency',              body: 'We optimise resources and reduce waste to ensure efficient and responsible business performance.', insight: 'We focus on doing more with less.' },
      { id: 's5', icon: Target,         image: IMG.impact,    title: 'Long-Term Impact Strategy',        body: 'We prioritise initiatives that create lasting social, economic, and environmental benefits.', insight: 'Our focus is on meaningful long-term contribution.' },
      { id: 's6', icon: UsersRound,     image: IMG.inclusive, title: 'Inclusive Growth Model',           body: 'We ensure that growth opportunities are shared across all stakeholders, including partners, employees, and communities.', insight: 'Growth should benefit everyone in the ecosystem.' },
    ],
  },
  {
    key: 'approach',
    label: 'Our Approach',
    intro: 'The operating principles that turn our strategy into consistent, repeatable execution.',
    items: [
      { id: 'a1', icon: Globe,     image: IMG.globe,  title: 'Unified Global Platform Structure',   body: 'We operate as a single interconnected ecosystem where all business units function under one strategic framework.', insight: 'This ensures alignment, efficiency, and scalability across all operations.' },
      { id: 'a2', icon: Rocket,    image: IMG.rocket, title: 'Innovation + Execution Balance',      body: 'We combine innovative thinking with strong execution to transform ideas into real-world business success.', insight: 'Ideas only matter when they are properly executed.' },
      { id: 'a3', icon: LineChart, image: IMG.data,   title: 'Data-Driven Decision Making',         body: 'We rely on analytics, insights, and structured data to guide strategic business decisions.', insight: 'Decisions are based on facts, not assumptions.' },
      { id: 'a4', icon: Maximize2, image: IMG.scale,  title: 'Scalable Business Design',            body: 'We build flexible systems that can expand easily without losing efficiency or control.', insight: 'Scalability is embedded in our foundation.' },
      { id: 'a5', icon: Link2,     image: IMG.collab, title: 'Cross-Border Collaboration',          body: 'We actively collaborate with international partners to strengthen global reach and business capability.', insight: 'Collaboration drives global success.' },
      { id: 'a6', icon: RefreshCw, image: IMG.loop,   title: 'Continuous Improvement Culture',      body: 'We continuously refine systems, processes, and strategies to stay competitive and future-ready.', insight: 'Improvement is a never-ending process in our organisation.' },
    ],
  },
]

function CategoryMarquee({
  category,
  onOpen,
  duration,
  direction,
}: {
  category: Category
  onOpen: (id: string) => void
  duration: number
  direction: 'left' | 'right'
}) {
  const animClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'
  return (
    <div className="mt-6">
      <h2 className="font-serif text-2xl md:text-3xl text-brand-accentDark font-bold leading-tight text-center">
        <span className="inline-block relative pb-1
                         after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[3px]
                         after:bg-brand-accent after:rounded-full
                         after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                         hover:after:scale-x-100 focus:after:scale-x-100">
          {category.label}
        </span>
      </h2>
      <p className="mt-1 max-w-3xl mx-auto text-slate-600 leading-snug text-sm text-justify [text-align-last:center]">
        {category.intro}
      </p>

      <div className="group relative w-screen left-1/2 -translate-x-1/2 overflow-hidden mt-3">
        <div
          className={`flex ${animClass} marquee-pause gap-4 w-max py-2`}
          style={{ animationDuration: `${duration}s` }}
        >
          {[...category.items, ...category.items].map((item, i) => (
            <button
              key={`${item.id}-${i}`}
              type="button"
              onClick={() => onOpen(item.id)}
              className="group/card shrink-0 w-44 flex flex-col items-center text-center
                         focus:outline-none"
            >
              <div className="flip-round w-28 h-28 shadow-md rounded-full
                              ring-4 ring-white group-hover/card:ring-brand-accent transition-all">
                <div className="flip-round-inner">
                  <div className="flip-round-face">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </div>
                  <div className="flip-round-face flip-round-back bg-brand-accent text-white grid place-items-center px-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      Read More →
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="mt-3 font-serif text-[12px] font-semibold text-slate-800 leading-snug px-1
                             group-hover/card:text-brand-accentDark transition-colors truncate w-full">
                {item.title}
              </h3>
            </button>
          ))}
        </div>
        <div className="absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default function AboutCategories() {
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    if (!openId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openId])

  const allItems = aboutCategories.flatMap((c) => c.items)
  const active = allItems.find((i) => i.id === openId) ?? null
  const ActiveIcon = active?.icon

  return (
    <>
      {aboutCategories.map((c, idx) => (
        <CategoryMarquee
          key={c.key}
          category={c}
          onOpen={setOpenId}
          duration={45 + idx * 5}
          direction={idx % 2 === 0 ? 'left' : 'right'}
        />
      ))}

      {active && ActiveIcon && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setOpenId(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-slate-900/60 backdrop-blur-sm p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto
                       bg-white rounded-2xl shadow-2xl p-8 md:p-10"
          >
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <ActiveIcon size={26} />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-brand-accentDark text-center leading-snug">
                {active.title}
              </h3>
              <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
            </div>
            <div className="mt-6 space-y-4 text-slate-600 leading-snug text-justify">
              <p>{active.body}</p>
              <div className="rounded-xl bg-brand-accent/10 border-l-4 border-brand-accent px-4 py-3 flex items-start gap-3">
                <span className="mt-0.5 shrink-0 w-7 h-7 rounded-full bg-brand-accent/20 text-brand-accentDark grid place-items-center">
                  <Quote size={14} />
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accentDark">
                    Key Insight
                  </div>
                  <p className="mt-1 text-slate-700 italic">{active.insight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
