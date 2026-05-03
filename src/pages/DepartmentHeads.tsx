import { useEffect } from 'react'
import {
  Users, Monitor, Settings, Megaphone, Scale, HeadphonesIcon,
} from 'lucide-react'
import BackButton from '../components/BackButton'
import OurPeopleNav from '../components/OurPeopleNav'
import PageHero from '../components/PageHero'
import Section from '../components/Section'
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
      className={`${className} transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const DEPARTMENTS = [
  {
    label: 'HR',
    full: 'Human Resources',
    icon: Users,
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=600&q=80',
    desc: 'Talent acquisition, employee welfare, payroll, and workforce development across all Yanabiya Group countries.',
    responsibilities: ['Recruitment & onboarding', 'Employee relations & welfare', 'Payroll & benefits management', 'Training & development', 'Labour law compliance'],
  },
  {
    label: 'IT',
    full: 'Information Technology',
    icon: Monitor,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
    desc: 'Internal IT infrastructure, systems administration, cybersecurity, and digital tools management for all group operations.',
    responsibilities: ['IT infrastructure & networking', 'Cybersecurity & data protection', 'Software & system administration', 'Digital tools & platform support', 'IT helpdesk & staff support'],
  },
  {
    label: 'Operations',
    full: 'Operations',
    icon: Settings,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80',
    desc: 'Day-to-day business operations, process management, and cross-country coordination for all Yanabiya Group divisions.',
    responsibilities: ['Business process management', 'Cross-division coordination', 'Project planning & delivery', 'Vendor & supplier management', 'Operational performance tracking'],
  },
  {
    label: 'Marketing',
    full: 'Marketing & Communications',
    icon: Megaphone,
    image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80',
    desc: 'Brand management, digital marketing, communications, and business development outreach across all group verticals.',
    responsibilities: ['Brand strategy & identity', 'Digital & social media marketing', 'Content creation & campaigns', 'Business development support', 'PR & external communications'],
  },
  {
    label: 'Legal',
    full: 'Legal & Compliance',
    icon: Scale,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80',
    desc: 'Legal advisory, contract management, regulatory compliance, and corporate governance for all Yanabiya Group entities.',
    responsibilities: ['Contract drafting & review', 'Regulatory compliance monitoring', 'Corporate governance', 'Dispute resolution & advisory', 'Licensing & documentation'],
  },
  {
    label: 'Support Team',
    full: 'Support & Administration',
    icon: HeadphonesIcon,
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80',
    desc: 'Administrative support, customer service, office coordination, and after-sales support across all group divisions.',
    responsibilities: ['Customer support & ticketing', 'Administrative & office services', 'After-sales service coordination', 'Document management', 'Inter-department communication'],
  },
]

export default function DepartmentHeads() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
    <>
      <BackButton to="/#leadership" label="Our People" />
      <OurPeopleNav />

      <PageHero
        eyebrow="Our People"
        title={<>Department <span className="italic text-brand-accentDark">Heads</span></>}
        subtitle="The functional leaders driving operations, technology, and strategy across Yanabiya Group."
        centered
      />

      <Section id="departments-page" className="relative overflow-hidden bg-brand-50">
        <div className="container-x py-4 md:py-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.map((dept, i) => {
              const Icon = dept.icon
              return (
                <Reveal key={dept.label} delay={i * 80}>
                  <div className="group flex flex-col rounded-2xl overflow-hidden bg-white
                                  border border-brand-accent/15
                                  shadow-[0_4px_24px_rgba(15,58,35,0.08)]
                                  hover:shadow-[0_8px_32px_rgba(15,58,35,0.16)]
                                  hover:-translate-y-1 transition-all duration-300">

                    {/* Image */}
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={dept.image}
                        alt={dept.full}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => ((e.currentTarget as HTMLImageElement).style.opacity = '0')}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/70 via-brand-deep/20 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm
                                        flex items-center justify-center ring-1 ring-white/40">
                          <Icon size={15} className="text-white" />
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/90">
                          {dept.label}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-5 py-4 flex flex-col gap-3 flex-1">
                      <div>
                        <h3 className="text-sm font-bold text-brand-deep leading-tight">
                          {dept.full}
                        </h3>
                        <p className="mt-1.5 text-[11px] text-brand-deep/60 leading-relaxed">
                          {dept.desc}
                        </p>
                      </div>

                      <ul className="space-y-1 mt-auto">
                        {dept.responsibilities.map((r) => (
                          <li key={r} className="flex items-center gap-2 text-[11px] text-brand-deep/70">
                            <span className="w-1 h-1 rounded-full bg-brand-accentDark shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Section>
    </>
  )
}
