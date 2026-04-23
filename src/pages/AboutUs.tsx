import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Globe2, Cpu, Plane, TrendingUp, Lightbulb, Gem,
  Layers, Smartphone, ShieldCheck, Handshake, Users, Repeat,
  MapPin, Server, Sparkles, Network, BarChart3, Award,
  Leaf, HeartHandshake, Scale, Recycle, Target, UsersRound,
  Globe, Rocket, LineChart, Maximize2, Link2, RefreshCw,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'
import Solutions from '../sections/Solutions'

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
  intro: string
  items: Item[]
}

const categories: Category[] = [
  {
    key: 'vision',
    label: 'Our Vision',
    intro: 'A unified global platform connecting industries, technology, and people across borders.',
    items: [
      {
        id: 'v1',
        icon: Globe2,
        title: 'Global Integrated Business Ecosystem',
        body: 'We aim to become a unified global platform that connects multiple industries under one structured ecosystem, enabling seamless coordination, scalability, and long-term strategic growth across international markets.',
        insight: 'Our vision is to build a system where different businesses operate as one connected network, creating synergy and global efficiency.',
      },
      {
        id: 'v2',
        icon: Cpu,
        title: 'Technology-Driven Future Leadership',
        body: 'We strive to lead global markets by leveraging innovation, digital transformation, and advanced technology-driven solutions that redefine modern business operations.',
        insight: 'We focus on using technology as the foundation of leadership in the evolving global economy.',
      },
      {
        id: 'v3',
        icon: Plane,
        title: 'Borderless Business Expansion',
        body: 'We aim to expand our operations across multiple countries, building a strong international footprint with scalable and adaptable business models.',
        insight: 'Our goal is to grow beyond geographical boundaries and establish a truly global presence.',
      },
      {
        id: 'v4',
        icon: TrendingUp,
        title: 'Sustainable Growth Leadership',
        body: 'We are committed to achieving long-term growth that balances profitability, operational efficiency, and environmental responsibility.',
        insight: 'Growth is not just about speed, but about stability and sustainability over time.',
      },
      {
        id: 'v5',
        icon: Lightbulb,
        title: 'Innovation-Centric Organization',
        body: 'We continuously develop and implement innovative business models, systems, and strategies to stay ahead in competitive global markets.',
        insight: 'Innovation is at the core of how we build and evolve every business unit.',
      },
      {
        id: 'v6',
        icon: Gem,
        title: 'Global Value Creation Platform',
        body: 'We focus on creating long-term value for clients, partners, and stakeholders through structured, scalable, and impactful business solutions.',
        insight: 'Our vision is to generate meaningful and lasting global value.',
      },
    ],
  },
  {
    key: 'mission',
    label: 'Our Mission',
    intro: 'How we operate every day to turn vision into measurable, sustainable outcomes.',
    items: [
      {
        id: 'm1',
        icon: Layers,
        title: 'Multi-Industry Integration',
        body: 'We integrate diverse industries into a single, scalable global platform that operates efficiently under one unified structure.',
        insight: 'We bring different business sectors together to create a powerful ecosystem.',
      },
      {
        id: 'm2',
        icon: Smartphone,
        title: 'Digital Transformation Focus',
        body: 'We transform traditional business models into modern, digital-first systems that improve speed, efficiency, and scalability.',
        insight: 'Our mission is to modernize businesses through digital innovation.',
      },
      {
        id: 'm3',
        icon: ShieldCheck,
        title: 'Operational Excellence',
        body: 'We ensure high standards of efficiency, transparency, and structured execution across all business operations.',
        insight: 'Every process is designed to be clear, effective, and well-managed.',
      },
      {
        id: 'm4',
        icon: Handshake,
        title: 'Global Partnership Development',
        body: 'We build strong international partnerships and collaborations that strengthen our global network and business reach.',
        insight: 'We believe in growing together through trusted global partnerships.',
      },
      {
        id: 'm5',
        icon: Users,
        title: 'Empowerment of Businesses & Individuals',
        body: 'We provide scalable solutions that empower both enterprises and individuals to grow, expand, and succeed globally.',
        insight: 'Our mission is to create opportunities for sustainable growth for everyone.',
      },
      {
        id: 'm6',
        icon: Repeat,
        title: 'Sustainable Value Delivery',
        body: 'We deliver long-term, reliable, and impactful solutions that ensure continuous value creation over time.',
        insight: 'We focus on consistent and lasting impact, not short-term results.',
      },
    ],
  },
  {
    key: 'goals',
    label: 'Core Goals',
    intro: 'The targets we are building toward — every quarter, every market, every team.',
    items: [
      {
        id: 'g1',
        icon: MapPin,
        title: 'International Market Expansion',
        body: 'We aim to expand into multiple global markets strategically, building a strong and sustainable international presence.',
        insight: 'Growth is achieved through structured and planned global expansion.',
      },
      {
        id: 'g2',
        icon: Server,
        title: 'Scalable Business Platform Development',
        body: 'We develop systems capable of managing and supporting multiple businesses efficiently under one ecosystem.',
        insight: 'Our platform is designed to scale without limitations.',
      },
      {
        id: 'g3',
        icon: Sparkles,
        title: 'Technology Innovation Leadership',
        body: 'We invest in advanced technologies, automation, and intelligent systems to lead in digital transformation.',
        insight: 'Technology is a key driver of our long-term success.',
      },
      {
        id: 'g4',
        icon: Network,
        title: 'Strong Operational Synergy',
        body: 'We ensure all business units operate in coordination, maximizing efficiency and overall performance.',
        insight: 'Every part of our system works together as one unified structure.',
      },
      {
        id: 'g5',
        icon: BarChart3,
        title: 'Sustainable Revenue Growth',
        body: 'We build stable and long-term revenue systems that support continuous business expansion and financial strength.',
        insight: 'Our focus is on consistent and sustainable financial growth.',
      },
      {
        id: 'g6',
        icon: Award,
        title: 'Global Brand Recognition',
        body: 'We aim to establish Yanabiya Group as a trusted, respected, and recognized global business platform.',
        insight: 'Our goal is to build a strong and reputable global identity.',
      },
    ],
  },
  {
    key: 'sustainability',
    label: 'Sustainability & Social Impact',
    intro: 'How we make sure growth benefits people, communities, and the planet — not just balance sheets.',
    items: [
      {
        id: 's1',
        icon: Leaf,
        title: 'Eco-Friendly Operations',
        body: 'We promote environmentally responsible practices across all business activities to minimize ecological impact.',
        insight: 'Sustainability is embedded in our operational structure.',
      },
      {
        id: 's2',
        icon: HeartHandshake,
        title: 'Community Empowerment Programs',
        body: 'We support communities through development initiatives, training programs, and opportunity creation.',
        insight: 'We believe in empowering people at the local level.',
      },
      {
        id: 's3',
        icon: Scale,
        title: 'Ethical Business Practices',
        body: 'We maintain transparency, fairness, and accountability in all business operations and decisions.',
        insight: 'Ethics and trust are fundamental to our operations.',
      },
      {
        id: 's4',
        icon: Recycle,
        title: 'Resource Efficiency',
        body: 'We optimize resources and reduce waste to ensure efficient and responsible business performance.',
        insight: 'We focus on doing more with less.',
      },
      {
        id: 's5',
        icon: Target,
        title: 'Long-Term Impact Strategy',
        body: 'We prioritize initiatives that create lasting social, economic, and environmental benefits.',
        insight: 'Our focus is on meaningful long-term contribution.',
      },
      {
        id: 's6',
        icon: UsersRound,
        title: 'Inclusive Growth Model',
        body: 'We ensure that growth opportunities are shared across all stakeholders, including partners, employees, and communities.',
        insight: 'Growth should benefit everyone in the ecosystem.',
      },
    ],
  },
  {
    key: 'approach',
    label: 'Our Approach',
    intro: 'The operating principles that turn our strategy into consistent, repeatable execution.',
    items: [
      {
        id: 'a1',
        icon: Globe,
        title: 'Unified Global Platform Structure',
        body: 'We operate as a single interconnected ecosystem where all business units function under one strategic framework.',
        insight: 'This ensures alignment, efficiency, and scalability across all operations.',
      },
      {
        id: 'a2',
        icon: Rocket,
        title: 'Innovation + Execution Balance',
        body: 'We combine innovative thinking with strong execution to transform ideas into real-world business success.',
        insight: 'Ideas only matter when they are properly executed.',
      },
      {
        id: 'a3',
        icon: LineChart,
        title: 'Data-Driven Decision Making',
        body: 'We rely on analytics, insights, and structured data to guide strategic business decisions.',
        insight: 'Decisions are based on facts, not assumptions.',
      },
      {
        id: 'a4',
        icon: Maximize2,
        title: 'Scalable Business Design',
        body: 'We build flexible systems that can expand easily without losing efficiency or control.',
        insight: 'Scalability is embedded in our foundation.',
      },
      {
        id: 'a5',
        icon: Link2,
        title: 'Cross-Border Collaboration',
        body: 'We actively collaborate with international partners to strengthen global reach and business capability.',
        insight: 'Collaboration drives global success.',
      },
      {
        id: 'a6',
        icon: RefreshCw,
        title: 'Continuous Improvement Culture',
        body: 'We continuously refine systems, processes, and strategies to stay competitive and future-ready.',
        insight: 'Improvement is a never-ending process in our organization.',
      },
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
    <div className="mt-10">
      <h2 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight">
        {category.label}
      </h2>
      <p className="mt-2 max-w-3xl text-slate-600 leading-relaxed text-sm">
        {category.intro}
      </p>

      <div className="group relative overflow-hidden mt-5">
        <div
          className={`flex ${animClass} marquee-pause gap-4 w-max py-2`}
          style={{ animationDuration: `${duration}s` }}
        >
          {[...category.items, ...category.items].map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              className="shrink-0 w-64 h-32 rounded-xl bg-white border border-slate-200 shadow-sm
                         flex flex-col items-center justify-center text-center p-4
                         hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <h3 className="font-serif font-bold text-sm md:text-[15px] text-slate-900 leading-snug">
                {item.title}
              </h3>
              <button
                type="button"
                onClick={() => onOpen(item.id)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full
                           bg-brand-accent text-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider
                           hover:bg-brand-accentDark transition-colors
                           focus:outline-none focus:ring-2 focus:ring-brand-accent/50"
              >
                Read More <span aria-hidden>→</span>
              </button>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default function AboutUs() {
  const [openId, setOpenId] = useState<string | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

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

  const allItems = categories.flatMap((c) => c.items)
  const active = allItems.find((i) => i.id === openId) ?? null
  const ActiveIcon = active?.icon

  return (
    <>
      <Section id="about-us">
        <div className="container-x max-w-5xl relative">
          <Eyebrow>About Us</Eyebrow>

          <div className="mt-6">
            <h1 className="font-serif text-2xl md:text-3xl text-slate-900 leading-tight">
              Who We Are
            </h1>

            <div className="mt-5 space-y-4 text-slate-600 leading-relaxed text-justify">
              <p>
                Yanabiya Group is a diversified global enterprise operating as a unified business
                platform across multiple international markets. Originating from Al Khuwair, Muscat,
                Oman, we have expanded our presence into the United Kingdom, United States, and
                Bangladesh, building a connected global structure that supports scalable and
                sustainable growth.
              </p>
              <p>
                We operate not as a single-sector company, but as a multi-business global platform
                where different ventures are integrated under one ecosystem. Our platform enables us
                to build, manage, and scale multiple businesses simultaneously, ensuring operational
                synergy, efficiency, and long-term value creation.
              </p>
              <p>
                Across our global network, we are involved in several core business operations
                including technology-driven solutions, international trade facilitation, digital
                services, infrastructure support, manpower deployment, and business management
                services. Each operation functions independently where required, yet remains
                strategically connected under the same unified group vision.
              </p>
              <p>
                Our strength lies in this integrated model — where innovation, execution, and
                operational capability come together. We design systems that allow businesses to
                grow faster, operate smarter, and expand beyond geographical boundaries. This
                approach enables us to support both enterprises and individuals through structured,
                reliable, and scalable solutions.
              </p>
              <p>
                We also provide strategic advisory and automation-focused consulting to help
                organizations improve efficiency, modernize operations, and adopt technology-driven
                workflows. Our focus is always on practical impact, measurable results, and
                sustainable performance improvement.
              </p>
              <p>
                Yanabiya Group is committed to maintaining global standards of quality, transparency,
                and professionalism across all operations. We believe in building strong, long-term
                relationships by delivering consistent value and treating every partner with trust
                and accountability.
              </p>
              <p>
                With a growing international footprint, our mission is to connect markets, create
                opportunities, and develop a strong global business ecosystem that supports
                innovation, collaboration, and economic progress.
              </p>
            </div>
          </div>

          {categories.map((c, idx) => (
            <CategoryMarquee
              key={c.key}
              category={c}
              onOpen={setOpenId}
              duration={45 + idx * 5}
              direction={idx % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>

        {/* Single shared modal — full content for the active card */}
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
              <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
                <p>{active.body}</p>
                <p className="rounded-xl bg-brand-accent/10 border border-brand-accent/30 px-4 py-3 text-slate-700">
                  <span className="me-1">👉</span>{active.insight}
                </p>
              </div>
            </div>
          </div>
        )}
      </Section>

      {/* Full Our Solutions section moved here from the home page */}
      <Solutions />

      <div className="container-x max-w-5xl pb-12">
        <Link
          to="/#about"
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                     border border-slate-200 text-slate-700 text-sm font-semibold
                     hover:border-brand-accent hover:text-brand-accent transition-colors"
        >
          <ArrowLeft size={14} />
          Back to About
        </Link>
      </div>
    </>
  )
}
