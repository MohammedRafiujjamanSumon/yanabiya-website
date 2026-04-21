interface Props {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left' }: Props) {
  return (
    <div className={align === 'center' ? 'text-center max-w-3xl mx-auto mb-12' : 'mb-12 max-w-3xl'}>
      {eyebrow && <div className="eyebrow mb-3">— {eyebrow}</div>}
      <h2 className="font-serif text-4xl md:text-5xl text-slate-900 leading-tight">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-600 leading-relaxed">{subtitle}</p>}
    </div>
  )
}
