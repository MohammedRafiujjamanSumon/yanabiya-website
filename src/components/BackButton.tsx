import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface Props {
  /** Route to navigate to. Hash like `/#about` smooth-scrolls to the section. */
  to: string
  label: string
}

/**
 * Fixed top-left glassmorphic back button — used on subpages to give the
 * user a persistent way back to the previous level (Home / About).
 *
 * Behavior:
 *  - Hash links (e.g. `/#about`) → navigate then smooth-scroll to the anchor.
 *  - Plain routes → navigate then scroll to top.
 */
export default function BackButton({ to, label }: Props) {
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const [path, hash] = to.split('#')
    navigate(path || '/')
    window.setTimeout(() => {
      if (hash) {
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 80)
  }

  return (
    <a
      href={to}
      onClick={handleClick}
      className="group fixed top-24 left-4 sm:left-6 z-30
                 inline-flex items-center gap-2 rounded-full
                 bg-white/70 backdrop-blur-md border border-white/60
                 shadow-lg shadow-slate-900/10
                 px-4 py-2 text-xs font-semibold uppercase tracking-wider
                 text-slate-700 hover:text-brand-accentDark
                 hover:bg-white hover:shadow-xl hover:-translate-x-0.5
                 transition-all duration-300"
    >
      <ArrowLeft
        size={14}
        className="transition-transform duration-300 group-hover:-translate-x-1"
      />
      {label}
    </a>
  )
}
