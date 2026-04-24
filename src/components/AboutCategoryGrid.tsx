import { useEffect, useState } from 'react'
import {
  ArrowRight, Quote,
  Eye, Target, Award, Sparkles, Leaf, Compass,
  Globe2, Cpu, Plane, TrendingUp, Lightbulb, Gem,
  Layers, Smartphone, ShieldCheck, Handshake, Users, Repeat,
  MapPin, Server, Network, BarChart3,
  HeartHandshake, Scale, Recycle, UsersRound,
  Globe, Rocket, LineChart, Maximize2, Link2, RefreshCw,
  Workflow,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Item = {
  id: string
  icon: LucideIcon
  title: string
  body: string
  insight: string
}

type Category = {
  key: string
  label: string
  preview: string
  cardImage: string
  cardIcon: LucideIcon
  items: Item[]
}

const categories: Category[] = [
  {
    key: 'vision',
    label: 'Vision',
    preview: 'A unified global platform connecting industries, technology, and people across borders.',
    cardImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Eye,
    items: [
      { id: 'v1', icon: Globe2,     title: 'Global Integrated Business Ecosystem',  body: 'A unified global platform that connects multiple industries under one structured ecosystem, enabling seamless coordination, scalability, and long-term strategic growth across international markets.', insight: 'Different businesses operate as one connected network — synergy and global efficiency.' },
      { id: 'v2', icon: Cpu,        title: 'Technology-Driven Future Leadership',   body: 'Lead global markets by leveraging innovation, digital transformation, and advanced technology-driven solutions that redefine modern business operations.', insight: 'Technology is the foundation of leadership in the evolving global economy.' },
      { id: 'v3', icon: Plane,      title: 'Borderless Business Expansion',         body: 'Expand operations across multiple countries, building a strong international footprint with scalable and adaptable business models.', insight: 'Grow beyond geographical boundaries — establish a truly global presence.' },
      { id: 'v4', icon: TrendingUp, title: 'Sustainable Growth Leadership',         body: 'Long-term growth that balances profitability, operational efficiency, and environmental responsibility.', insight: 'Growth is not just speed — it’s stability and sustainability over time.' },
      { id: 'v5', icon: Lightbulb,  title: 'Innovation-Centric Organization',       body: 'Continuously develop innovative business models, systems, and strategies to stay ahead in competitive global markets.', insight: 'Innovation is at the core of how we build and evolve every business unit.' },
      { id: 'v6', icon: Gem,        title: 'Global Value Creation Platform',        body: 'Create long-term value for clients, partners, and stakeholders through structured, scalable, and impactful business solutions.', insight: 'Generate meaningful and lasting global value.' },
    ],
  },
  {
    key: 'mission',
    label: 'Mission',
    preview: 'How we operate every day to turn vision into measurable, sustainable outcomes.',
    cardImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Target,
    items: [
      { id: 'm1', icon: Layers,      title: 'Multi-Industry Integration',                body: 'Integrate diverse industries into a single, scalable global platform that operates efficiently under one unified structure.', insight: 'Different business sectors come together to create a powerful ecosystem.' },
      { id: 'm2', icon: Smartphone,  title: 'Digital Transformation Focus',              body: 'Transform traditional business models into modern, digital-first systems that improve speed, efficiency, and scalability.', insight: 'Modernize businesses through digital innovation.' },
      { id: 'm3', icon: ShieldCheck, title: 'Operational Excellence',                    body: 'High standards of efficiency, transparency, and structured execution across all business operations.', insight: 'Every process is clear, effective, and well-managed.' },
      { id: 'm4', icon: Handshake,   title: 'Global Partnership Development',            body: 'Build strong international partnerships and collaborations that strengthen our global network and business reach.', insight: 'Grow together through trusted global partnerships.' },
      { id: 'm5', icon: Users,       title: 'Empowerment of Businesses & Individuals',   body: 'Scalable solutions that empower both enterprises and individuals to grow, expand, and succeed globally.', insight: 'Create opportunities for sustainable growth for everyone.' },
      { id: 'm6', icon: Repeat,      title: 'Sustainable Value Delivery',                body: 'Long-term, reliable, and impactful solutions that ensure continuous value creation over time.', insight: 'Consistent and lasting impact — not short-term results.' },
    ],
  },
  {
    key: 'goals',
    label: 'Core Goals',
    preview: 'The targets we are building toward — every quarter, every market, every team.',
    cardImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Award,
    items: [
      { id: 'g1', icon: MapPin,    title: 'International Market Expansion',           body: 'Expand into multiple global markets strategically, building a strong and sustainable international presence.', insight: 'Growth through structured and planned global expansion.' },
      { id: 'g2', icon: Server,    title: 'Scalable Business Platform Development',   body: 'Systems capable of managing and supporting multiple businesses efficiently under one ecosystem.', insight: 'Designed to scale without limitations.' },
      { id: 'g3', icon: Sparkles,  title: 'Technology Innovation Leadership',         body: 'Invest in advanced technologies, automation, and intelligent systems to lead in digital transformation.', insight: 'Technology is a key driver of our long-term success.' },
      { id: 'g4', icon: Network,   title: 'Strong Operational Synergy',               body: 'All business units operate in coordination, maximizing efficiency and overall performance.', insight: 'Every part of our system works together as one unified structure.' },
      { id: 'g5', icon: BarChart3, title: 'Sustainable Revenue Growth',               body: 'Stable and long-term revenue systems that support continuous business expansion and financial strength.', insight: 'Consistent and sustainable financial growth.' },
      { id: 'g6', icon: Award,     title: 'Global Brand Recognition',                 body: 'Establish Yanabiya Group as a trusted, respected, and recognized global business platform.', insight: 'Build a strong and reputable global identity.' },
    ],
  },
  {
    key: 'solutions',
    label: 'Our Solutions',
    preview: 'End-to-end digital and enterprise solutions designed to help organizations grow together.',
    cardImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Sparkles,
    items: [
      { id: 'sol1', icon: Workflow,    title: 'How We Deliver Our Services',     body: 'A structured, transparent, results-driven approach that ensures quality at every stage — from requirements to long-term support.', insight: 'Scalable solutions, clear milestones, measurable outcomes.' },
      { id: 'sol2', icon: Handshake,   title: 'Partnership & Collaboration',     body: 'Long-term partnerships built on trust, shared vision, and mutual growth — combining expertise, resources, and innovation.', insight: 'Trust, transparency, and a commitment to shared success.' },
      { id: 'sol3', icon: Award,       title: 'Sponsorship Engagement',          body: 'Meaningful sponsorships aligned with innovation, education, and sustainable development — creating visibility, value, and impact.', insight: 'Selected where contribution drives measurable progress.' },
      { id: 'sol4', icon: Users,       title: 'Community Support & Development', body: 'Empowering communities through digital access, knowledge sharing, and sustainable initiatives that bridge technology and people.', insight: 'Creating real, measurable change wherever we operate.' },
      { id: 'sol5', icon: ShieldCheck, title: 'Quality & Service Assurance',     body: 'Structured QA ensures reliability, security, and performance across every service we deliver.', insight: 'Quality is a long-term commitment, not a one-time milestone.' },
    ],
  },
  {
    key: 'sustainability',
    label: 'Sustainability & Social Impact',
    preview: 'How we make sure growth benefits people, communities, and the planet — not just balance sheets.',
    cardImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Leaf,
    items: [
      { id: 's1', icon: Leaf,           title: 'Eco-Friendly Operations',          body: 'Environmentally responsible practices across all business activities to minimize ecological impact.', insight: 'Sustainability is embedded in our operational structure.' },
      { id: 's2', icon: HeartHandshake, title: 'Community Empowerment Programs',   body: 'Support communities through development initiatives, training programs, and opportunity creation.', insight: 'Empowering people at the local level.' },
      { id: 's3', icon: Scale,          title: 'Ethical Business Practices',       body: 'Transparency, fairness, and accountability in all business operations and decisions.', insight: 'Ethics and trust are fundamental to our operations.' },
      { id: 's4', icon: Recycle,        title: 'Resource Efficiency',              body: 'Optimize resources and reduce waste to ensure efficient and responsible business performance.', insight: 'We focus on doing more with less.' },
      { id: 's5', icon: Target,         title: 'Long-Term Impact Strategy',        body: 'Initiatives that create lasting social, economic, and environmental benefits.', insight: 'Meaningful long-term contribution.' },
      { id: 's6', icon: UsersRound,     title: 'Inclusive Growth Model',           body: 'Growth opportunities shared across all stakeholders — partners, employees, and communities.', insight: 'Growth should benefit everyone in the ecosystem.' },
    ],
  },
  {
    key: 'approach',
    label: 'Our Approach',
    preview: 'The operating principles that turn our strategy into consistent, repeatable execution.',
    cardImage: 'https://images.unsplash.com/photo-1517976547714-720226b864c1?auto=format&fit=crop&w=1200&q=80',
    cardIcon: Compass,
    items: [
      { id: 'a1', icon: Globe,     title: 'Unified Global Platform Structure',   body: 'A single interconnected ecosystem where all business units function under one strategic framework.', insight: 'Alignment, efficiency, and scalability across all operations.' },
      { id: 'a2', icon: Rocket,    title: 'Innovation + Execution Balance',      body: 'Combine innovative thinking with strong execution to transform ideas into real-world business success.', insight: 'Ideas only matter when they are properly executed.' },
      { id: 'a3', icon: LineChart, title: 'Data-Driven Decision Making',         body: 'Analytics, insights, and structured data guide strategic business decisions.', insight: 'Decisions are based on facts, not assumptions.' },
      { id: 'a4', icon: Maximize2, title: 'Scalable Business Design',            body: 'Flexible systems that can expand easily without losing efficiency or control.', insight: 'Scalability is embedded in our foundation.' },
      { id: 'a5', icon: Link2,     title: 'Cross-Border Collaboration',          body: 'Active collaboration with international partners to strengthen global reach and business capability.', insight: 'Collaboration drives global success.' },
      { id: 'a6', icon: RefreshCw, title: 'Continuous Improvement Culture',      body: 'Continuously refine systems, processes, and strategies to stay competitive and future-ready.', insight: 'Improvement is a never-ending process.' },
    ],
  },
]

export default function AboutCategoryGrid() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  useEffect(() => {
    if (!openKey) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenKey(null) }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openKey])

  const active = categories.find((c) => c.key === openKey) ?? null

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c) => {
          const Icon = c.cardIcon
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => setOpenKey(c.key)}
              className="group/card relative h-64 rounded-2xl overflow-hidden shadow-md ring-1 ring-slate-200/60
                         bg-white text-left
                         hover:-translate-y-1 hover:shadow-2xl hover:ring-brand-accent/40 transition-all duration-300
                         focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
              <img
                src={c.cardImage}
                alt={c.label}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover
                           transition-transform duration-700 group-hover/card:scale-110"
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/15" />

              <div className="relative h-full p-5 flex flex-col">
                <div className="w-11 h-11 rounded-xl bg-white/95 text-brand-accentDark grid place-items-center shadow">
                  <Icon size={22} />
                </div>
                <div className="mt-auto">
                  <h3 className="font-serif text-white text-xl font-bold drop-shadow leading-tight">
                    {c.label}
                  </h3>
                  <p className="mt-2 text-white/85 text-sm leading-snug line-clamp-2">
                    {c.preview}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full
                                   px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider
                                   bg-white text-brand-accentDark
                                   transition-all group-hover/card:bg-brand-accent group-hover/card:text-white">
                    Explore <ArrowRight size={12} className="ltr-flip transition-transform group-hover/card:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Modal — full detail for the selected category */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.label}
          onClick={() => setOpenKey(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center
                     bg-slate-900/70 backdrop-blur-sm p-4 fade-up"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto
                       bg-white rounded-3xl shadow-2xl"
          >
            {/* Modal header — image hero */}
            <div className="relative h-44 md:h-52 overflow-hidden rounded-t-3xl">
              <img
                src={active.cardImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/20" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-white/95 text-brand-accentDark grid place-items-center shadow">
                    <active.cardIcon size={22} />
                  </div>
                  <h3 className="font-serif text-white text-2xl md:text-3xl font-bold drop-shadow">
                    {active.label}
                  </h3>
                </div>
                <p className="mt-2 text-white/90 text-sm md:text-base max-w-2xl">
                  {active.preview}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenKey(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 rounded-full
                           bg-white/95 text-slate-700 grid place-items-center shadow
                           hover:bg-white hover:text-brand-accentDark transition-colors"
              >
                <span className="text-xl leading-none">×</span>
              </button>
            </div>

            {/* Modal body — items grid */}
            <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {active.items.map((item) => {
                const ItemIcon = item.icon
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-slate-200 p-4 hover:border-brand-accent/50 hover:shadow transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-9 h-9 rounded-lg bg-brand-accent/10 text-brand-accentDark grid place-items-center">
                        <ItemIcon size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-serif font-bold text-sm md:text-[15px] text-slate-900 leading-snug">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-[13px] text-slate-600 leading-relaxed">
                          {item.body}
                        </p>
                        <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-brand-accent/8 border-l-2 border-brand-accent px-2.5 py-1.5">
                          <Quote size={12} className="text-brand-accentDark mt-0.5 shrink-0" />
                          <p className="text-[12px] text-slate-700 italic leading-snug">
                            {item.insight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
