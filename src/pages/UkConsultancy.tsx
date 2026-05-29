import { Cpu, Code2, ShieldCheck, Cloud, BarChart3, Palette, Bot, Globe } from 'lucide-react'
import PlatformPage, { type PlatformConfig } from './PlatformPage'

const config: PlatformConfig = {
  eyebrow: 'UK IT Consultancy',
  icon: Cpu,
  accent: '#2563eb',
  headline: 'Enterprise technology,',
  headlineAccent: 'engineered in London.',
  intro:
    'Yanabiya Gulf International Business & Trade delivers enterprise software, cloud, AI and digital-transformation consulting from our United Kingdom base — serving clients across the Gulf, Europe, Asia and North America.',
  primary: { label: 'Visit yanabiyagibt.com', href: 'https://yanabiyagibt.com', external: true, icon: Globe },
  secondary: { label: 'Talk to Us', to: '/#contact' },
  sectionLabel: 'What we deliver',
  sectionTitle: 'Full-stack technology consulting.',
  features: [
    { icon: Code2,       title: 'Custom Software Development', body: 'Bespoke web, mobile and SaaS applications engineered around your exact workflows.' },
    { icon: ShieldCheck, title: 'Cyber Security',             body: 'Security assessments, penetration testing and system hardening to protect your business.' },
    { icon: Cloud,       title: 'Cloud & AWS',                body: 'Certified AWS architecture, migration and managed cloud operations built for scale.' },
    { icon: BarChart3,   title: 'Data Analytics',             body: 'Modern data platforms, dashboards and predictive analytics that turn data into decisions.' },
    { icon: Palette,     title: 'UI/UX Design',               body: 'Research-driven interface design that blends clarity, accessibility and brand identity.' },
    { icon: Bot,         title: 'AI & Automation',            body: 'Custom AI agents, prompt-based assistants and intelligent process automation.' },
  ],
  closingTitle: 'Have a technology challenge?',
  closingBody: 'From a single product build to full digital transformation, our UK consultancy team can help.',
}

export default function UkConsultancy() {
  return <PlatformPage config={config} />
}
