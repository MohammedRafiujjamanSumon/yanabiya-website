import { useEffect, useState } from 'react'
import {
  Workflow,
  Handshake,
  Award,
  Users,
  ShieldCheck,
} from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'

type SolutionKey =
  | 'delivery'
  | 'partnership'
  | 'sponsorship'
  | 'community'
  | 'quality'

const solutions: {
  key: SolutionKey
  title: string
  icon: typeof Workflow
  image: string
  teaser: string
  body: string[]
}[] = [
  {
    key: 'delivery',
    title: 'How We Deliver Our Services',
    icon: Workflow,
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    teaser:
      'A structured, transparent, and results-driven approach that ensures quality at every stage — from requirements to long-term support.',
    body: [
      "We follow a structured, transparent, and results-driven approach to ensure quality at every stage. From understanding requirements to execution and long-term support, our process is built around collaboration, reliability, and continuous improvement.",
      "We focus on delivering scalable solutions that align with real business needs and global standards. Every engagement is shaped by clear milestones, measurable outcomes, and open communication.",
      "Our delivery model blends proven methodologies with agile execution — allowing us to adapt quickly, manage risks effectively, and maintain consistent service excellence across every project.",
    ],
  },
  {
    key: 'partnership',
    title: 'Partnership & Collaboration',
    icon: Handshake,
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Long-term partnerships built on trust, shared vision, and mutual growth — combining expertise, resources, and innovation.',
    body: [
      "We build long-term partnerships based on trust, shared vision, and mutual growth. Our partnership model is designed to create value for both sides by combining expertise, resources, and innovation.",
      "We actively engage with partners to develop sustainable opportunities and strengthen global business connections. Every collaboration is guided by transparency, fairness, and a commitment to shared success.",
      "By working closely with partners across industries and regions, we create ecosystems that open new markets, accelerate innovation, and deliver long-lasting value to all stakeholders involved.",
    ],
  },
  {
    key: 'sponsorship',
    title: 'Sponsorship Engagement',
    icon: Award,
    image:
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Meaningful sponsorships aligned with innovation, education, and sustainable development — creating visibility, value, and impact.',
    body: [
      "Our sponsorship approach focuses on meaningful impact and strategic alignment. We support initiatives, projects, and organizations that align with our values of innovation, education, and sustainable development.",
      "Every sponsorship is designed to create visibility, value, and long-term community benefit. We carefully select opportunities where our contribution drives measurable progress and shared purpose.",
      "Through our sponsorship engagements, we support emerging talent, research, and community-led programs — reinforcing our commitment to empowering people and advancing meaningful causes globally.",
    ],
  },
  {
    key: 'community',
    title: 'Community Support & Development',
    icon: Users,
    image:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Empowering communities through digital access, knowledge sharing, and sustainable initiatives that bridge technology and people.',
    body: [
      "We are committed to serving and empowering communities through digital access, knowledge sharing, and sustainable initiatives. Our community programs focus on creating opportunities, supporting local development, and bridging the gap between technology and people.",
      "We invest in programs that uplift underserved communities, expand digital literacy, and enable long-term socio-economic growth. Our aim is to make technology accessible, practical, and genuinely useful in everyday life.",
      "By combining our resources, expertise, and partnerships, we support initiatives that create real, measurable change — leaving a positive footprint wherever we operate.",
    ],
  },
  {
    key: 'quality',
    title: 'Quality & Service Assurance',
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    teaser:
      'Structured quality assurance ensures reliability, security, and performance across every service we deliver.',
    body: [
      "Every project we deliver goes through a structured quality assurance process to ensure reliability, security, and performance. We continuously monitor, optimize, and support our services to maintain excellence and client satisfaction.",
      "Our quality framework combines industry best practices, rigorous testing, and continuous feedback — ensuring each solution meets the highest standards before and after delivery.",
      "We treat quality as a long-term commitment, not a one-time milestone. Ongoing reviews, audits, and improvements keep every service dependable, secure, and aligned with evolving business needs.",
    ],
  },
]

export default function Solutions() {
  const [openKey, setOpenKey] = useState<SolutionKey | null>(null)

  useEffect(() => {
    if (!openKey) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenKey(null)
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [openKey])

  const active = solutions.find((s) => s.key === openKey) ?? null

  return (
    <Section id="solutions">
      <div className="container-x">
        <Eyebrow>Our Solutions</Eyebrow>

        <p className="mt-2 max-w-3xl mx-auto text-slate-600 leading-relaxed text-sm text-justify [text-align-last:center]">
          We deliver end-to-end digital and enterprise solutions designed to help organizations,
          partners, and communities grow together in a connected global ecosystem.
        </p>
      </div>

      {/* Solution cards — small round images with hover Read More slide-up */}
      <div className="group relative w-screen overflow-hidden mt-3">
        <div
          className="flex animate-marquee marquee-pause gap-6 w-max py-3 px-6"
          style={{ animationDuration: '45s' }}
        >
          {[...solutions, ...solutions].map((s, i) => (
            <button
              key={`${s.key}-${i}`}
              type="button"
              onClick={() => setOpenKey(s.key)}
              className="group/card shrink-0 w-44 flex flex-col items-center text-center
                         focus:outline-none"
            >
              <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-md ring-4 ring-white
                              group-hover/card:ring-brand-accent group-focus/card:ring-brand-accent transition-all
                              group-hover/card:-translate-y-1 group-hover/card:shadow-lg">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover
                             transition-transform duration-500 group-hover/card:scale-110"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <h3 className="mt-3 font-serif text-[12px] font-semibold text-slate-800 leading-snug px-1
                             group-hover/card:text-brand-accentDark transition-colors truncate w-full">
                {s.title}
              </h3>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-accentDark
                               opacity-0 -translate-y-1 group-hover/card:opacity-100 group-hover/card:translate-y-0
                               transition-all duration-200">
                Read More <span aria-hidden>↑</span>
              </span>
            </button>
          ))}
        </div>
        <div className="absolute inset-y-0 start-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 end-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>

      {/* Modal overlay for expanded solution content */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          onClick={() => setOpenKey(null)}
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
              onClick={() => setOpenKey(null)}
              aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 rounded-full
                         flex items-center justify-center text-slate-500
                         hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <span className="text-xl leading-none">×</span>
            </button>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-xl bg-brand-accent/10 text-brand-accent grid place-items-center mb-4">
                <active.icon size={26} />
              </div>
              <h3 className="font-serif uppercase tracking-[0.14em] text-xl md:text-2xl
                             font-bold text-brand-accentDark text-center">
                {active.title}
              </h3>
              <div className="mt-2 mx-auto w-16 h-[2px] bg-brand-accent rounded-full" />
            </div>
            <div className="mt-6 space-y-4 text-slate-600 leading-relaxed text-justify">
              {active.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </Section>
  )
}
