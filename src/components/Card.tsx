import { LucideIcon } from 'lucide-react'

interface Props {
  icon?: LucideIcon
  title: string
  body: string
}

export default function Card({ icon: Icon, title, body }: Props) {
  return (
    <div className="card-panel">
      {Icon && (
        <div className="w-12 h-12 rounded-lg bg-brand-accent/10 text-brand-accent grid place-items-center mb-5">
          <Icon size={22} />
        </div>
      )}
      <h3 className="text-xl text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{body}</p>
    </div>
  )
}
