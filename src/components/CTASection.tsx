import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface Props {
  title?: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
}

export default function CTASection({
  title = 'Ready to build something exceptional?',
  subtitle = 'Connect with our team to discuss your project, partnership, or trade opportunity.',
  ctaLabel = 'Get in touch',
  ctaTo = '/contact',
}: Props) {
  return (
    <section className="container-x my-24">
      <div className="rounded-2xl bg-gradient-to-br from-brand-800 to-brand-900 border border-brand-accent/40 p-10 md:p-14 text-center">
        <h3 className="font-serif text-3xl md:text-4xl text-slate-900">{title}</h3>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">{subtitle}</p>
        <Link to={ctaTo} className="btn-primary mt-7">
          {ctaLabel} <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  )
}
