import { Link } from 'react-router-dom'
import { ArrowRight, Newspaper, Leaf, HeartHandshake, Briefcase } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Section, { Eyebrow } from '../components/Section'

type CommunityCard = {
  id: string
  href: string
  eyebrow: string
  title: string
  desc: string
  image: string
  icon: LucideIcon
  cta: string
}

const cards: CommunityCard[] = [
  {
    id: 'blog',
    href: '/community/blog',
    eyebrow: 'Insights',
    title: 'Blog',
    desc: 'Stories, market views and ideas from across our group and partner network.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    icon: Newspaper,
    cta: 'Read articles',
  },
  {
    id: 'sustainable-growth',
    href: '/community/sustainable-growth',
    eyebrow: 'Environment',
    title: 'Sustainable Growth',
    desc: 'Greener operations, circular practices and climate commitments shaping how we work.',
    image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    icon: Leaf,
    cta: 'Explore initiatives',
  },
  {
    id: 'community-care',
    href: '/community/community-care',
    eyebrow: 'Welfare',
    title: 'Community Care',
    desc: 'Charitable donations and welfare programmes built on transparency and lasting impact.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    icon: HeartHandshake,
    cta: 'See programmes',
  },
  {
    id: 'careers',
    href: '/community/careers',
    eyebrow: 'People',
    title: 'Careers',
    desc: 'Join a team that values craft, integrity and growth across the Gulf and beyond.',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
    icon: Briefcase,
    cta: 'View openings',
  },
]

export default function Community() {
  return (
    <Section id="community" className="bg-white">
      <div className="container-x">
        <div className="text-center max-w-4xl mx-auto mb-14">
          <Eyebrow>Community</Eyebrow>
          <h2 className="mt-2 font-serif text-xl md:text-2xl leading-tight text-brand-accentDark">
            Built around <span className="italic text-brand-accent">people</span>
            , Driven by <span className="italic text-brand-accent">purpose</span>.
          </h2>
          <div className="mt-4 mx-auto w-20 h-[2px] bg-brand-accent rounded-full" />
          <p className="mt-6 text-slate-600 leading-relaxed">
            From insights and sustainability to welfare and careers — explore the ways
            Yanabiya Group invests in the communities and teams that grow with us.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((c) => {
            const Icon = c.icon
            return (
              <Link
                key={c.id}
                to={c.href}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition h-72"
              >
                <img
                  src={c.image}
                  alt={c.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

                <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-brand-accent/90 text-brand-ink grid place-items-center shadow-md">
                  <Icon size={18} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col items-start gap-1.5">
                  <div className="text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                    {c.eyebrow}
                  </div>
                  <div className="font-serif text-lg md:text-xl text-white leading-tight drop-shadow">
                    {c.title}
                  </div>
                  <p className="text-[12.5px] text-white/80 leading-snug line-clamp-3">
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-white/90 group-hover:text-brand-accent transition">
                    {c.cta} <ArrowRight size={12} className="ltr-flip" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
