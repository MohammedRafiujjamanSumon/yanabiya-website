import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Target, Eye, Award, Workflow, Handshake, Users, ShieldCheck } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'

const pillars = [
  {
    title: 'Mission',
    icon: Target,
    body: "Build and scale diversified ventures that combine innovation, technology, and strategic thinking — delivering reliable solutions that help organizations grow.",
  },
  {
    title: 'Vision',
    icon: Eye,
    body: "Become a trusted global business ecosystem recognized for innovation, diversified growth, and sustainable impact across markets.",
  },
  {
    title: 'Goals',
    icon: Award,
    body: "Build a strong, diversified ecosystem delivering innovative, reliable, and scalable solutions across technology, trade, consulting, and automation.",
  },
]

const solutions = [
  { title: 'How We Deliver Our Services',         icon: Workflow,    body: 'A structured, transparent, and results-driven approach that ensures quality at every stage — from requirements to long-term support.' },
  { title: 'Partnership & Collaboration',         icon: Handshake,   body: 'Long-term partnerships built on trust, shared vision, and mutual growth — combining expertise, resources, and innovation.' },
  { title: 'Sponsorship Engagement',              icon: Award,       body: 'Meaningful sponsorships aligned with innovation, education, and sustainable development — creating visibility, value, and impact.' },
  { title: 'Community Support & Development',     icon: Users,       body: 'Empowering communities through digital access, knowledge sharing, and sustainable initiatives that bridge technology and people.' },
  { title: 'Quality & Service Assurance',         icon: ShieldCheck, body: 'Structured quality assurance ensures reliability, security, and performance across every service we deliver.' },
]

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  return (
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

        {/* Mission · Vision · Goals */}
        <div className="mt-12">
          <h2 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight">
            Our Mission, Vision & Goals
          </h2>
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
            {pillars.map((p) => (
              <div
                key={p.title}
                className="rounded-xl bg-white border border-slate-200 shadow-sm p-5"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-accent/10 text-brand-accentDark grid place-items-center mb-3">
                  <p.icon size={22} />
                </div>
                <h3 className="font-serif uppercase tracking-[0.16em] text-base font-bold text-brand-accentDark">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Solutions */}
        <div className="mt-12">
          <h2 className="font-serif text-xl md:text-2xl text-slate-900 leading-tight">
            Our Solutions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-xl bg-white border border-slate-200 shadow-sm p-5"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-accent/10 text-brand-accentDark grid place-items-center mb-3">
                  <s.icon size={22} />
                </div>
                <h3 className="font-serif uppercase tracking-[0.14em] text-sm font-bold text-brand-accentDark leading-snug">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed text-justify">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
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
      </div>
    </Section>
  )
}
