import { CheckCircle2, LifeBuoy } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'

const supportFeatures = [
  'Dedicated post-service follow-up and client support',
  'Regular performance monitoring and health checks',
  'Ongoing maintenance, updates, and system optimization',
  'Technical assistance and rapid troubleshooting',
  'Client success and relationship management',
  'Continuous improvement and enhancement planning',
  'Training sessions and user guidance support',
  'SLA-based priority support and response handling',
  'Upgrade planning and scalability consultation',
  'Feedback collection and service enhancement',
  'Preventive maintenance and risk assessment',
  'Security updates and compliance monitoring',
  'Documentation and knowledge-base support',
  'Quarterly review and performance evaluation',
  'Dedicated account management',
  'Change request handling and feature expansion',
  'Emergency support and escalation management',
  'Integration support for new systems or tools',
  'Long-term roadmap planning and advisory',
  'Business continuity and operational support',
]

export default function Solutions() {
  return (
    <Section id="solutions">
      <div className="container-x">
        <Eyebrow>Our Solutions</Eyebrow>

        {/* Ongoing Support & Client Care — featured block */}
        <div className="card-panel max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 grid place-items-center ring-4 ring-blue-50 shadow-md mb-4">
              <LifeBuoy size={30} />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-slate-900">
              Ongoing Support &amp; Client Care 🤝
            </h3>
            <div className="w-16 h-0.5 bg-brand-accent rounded-full mt-3" />
            <p className="mt-5 text-slate-600 leading-relaxed text-justify max-w-3xl">
              We don't stop at delivery. Yanabiya Group ensures structured follow-up, proactive
              support, and long-term client care after every service. Our approach focuses on
              maintaining performance, resolving challenges quickly, and continuously improving
              solutions as business needs evolve. We prioritize relationship-driven support to
              ensure clients receive sustained value and operational stability.
            </p>
          </div>

          <h4 className="text-brand-accentDark uppercase tracking-[0.22em] text-xs font-bold mb-4 text-center">
            What We Provide 🧩
          </h4>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5 max-w-4xl mx-auto">
            {supportFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-slate-600 italic text-center">
            🚀 We focus on long-term partnerships, ensuring every solution remains efficient,
            scalable, and aligned with our clients' growth.
          </p>
        </div>
      </div>
    </Section>
  )
}
