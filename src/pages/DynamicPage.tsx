import { useEffect, useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import type { CmsPage, CmsSection } from '../admin/api/adminApi'

// Helper: cast unknown to string for safe JSX rendering
const s = (v: unknown, fallback = '') => String(v ?? fallback)
const has = (v: unknown): boolean => !!v

// Section renderers
function HeroSection({ data }: { data: Record<string, unknown> }) {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: 'linear-gradient(135deg, #0e2d4e 0%, #1a5c38 100%)' }}>
      {has(data.overlay) && <div className="absolute inset-0 bg-black/50" />}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-6">
          {s(data.heading)}
        </h1>
        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          {s(data.subheading)}
        </p>
        {has(data.buttonLabel) && (
          <a href={s(data.buttonHref, '#')}
            className="inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            {s(data.buttonLabel)}
          </a>
        )}
      </div>
    </div>
  )
}

function TextSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-16 px-6">
      <div className={`max-w-4xl mx-auto ${data.alignment === 'center' ? 'text-center' : 'text-left'}`}>
        {has(data.heading) && <h2 className="font-serif text-3xl md:text-4xl text-brand-deep font-bold mb-6">{s(data.heading)}</h2>}
        {has(data.body) && <div className="prose prose-lg max-w-none text-brand-deep/75 leading-relaxed" dangerouslySetInnerHTML={{ __html: s(data.body) }} />}
      </div>
    </section>
  )
}

function CardsSection({ data }: { data: Record<string, unknown> }) {
  const cards = (data.cards as {id:string;title:string;body:string;image?:string;link?:string}[]) || []
  const cols = Number(data.columns) || 3
  const gridCols = cols === 2 ? 'grid-cols-1 md:grid-cols-2' : cols === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'
  return (
    <section className="py-16 px-6 bg-brand-50">
      <div className="max-w-6xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl md:text-4xl text-brand-deep font-bold text-center mb-3">{s(data.heading)}</h2>}
        {has(data.subheading) && <p className="text-center text-brand-deep/60 mb-12 text-lg">{s(data.subheading)}</p>}
        <div className={`grid ${gridCols} gap-6`}>
          {cards.map(card => (
            <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 group">
              {card.image && <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-xl mb-4" />}
              <h3 className="font-serif text-xl font-bold text-brand-deep mb-3">{card.title}</h3>
              <p className="text-brand-deep/65 leading-relaxed text-sm">{card.body}</p>
              {card.link && <a href={card.link} className="inline-flex items-center gap-1 text-brand-accent text-sm font-semibold mt-4 hover:gap-2 transition-all">Explore →</a>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection({ data }: { data: Record<string, unknown> }) {
  const stats = (data.stats as {value:string;label:string}[]) || []
  return (
    <section className="py-16 px-6 bg-brand-deep text-white">
      <div className="max-w-5xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-center mb-12">{s(data.heading)}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-serif text-5xl font-bold text-brand-accent mb-2">{s.value}</div>
              <div className="text-sm uppercase tracking-widest text-white/60">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CtaSection({ data }: { data: Record<string, unknown> }) {
  const bg = data.background === 'brand' ? 'bg-gradient-to-r from-brand-deep to-brand-accent' : 'bg-white border border-slate-200'
  const textColor = data.background === 'brand' ? 'text-white' : 'text-brand-deep'
  return (
    <section className={`py-16 px-6 ${bg}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>{String(data.heading || '')}</h2>
        <p className={`text-lg mb-8 ${data.background === 'brand' ? 'text-white/80' : 'text-brand-deep/60'}`}>{String(data.subheading || '')}</p>
        <div className="flex flex-wrap gap-4 justify-center">
          {has(data.primaryLabel) && <a href={s(data.primaryHref, '#')} className="bg-brand-accent hover:bg-brand-accentDark text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg">{s(data.primaryLabel)}</a>}
          {has(data.secondaryLabel) && <a href={s(data.secondaryHref, '#')} className={`border-2 font-semibold px-8 py-3.5 rounded-xl transition-all ${data.background === 'brand' ? 'border-white text-white hover:bg-white hover:text-brand-deep' : 'border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white'}`}>{s(data.secondaryLabel)}</a>}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ data }: { data: Record<string, unknown> }) {
  const [open, setOpen] = useState<string | null>(null)
  const items = (data.items as {id:string;question:string;answer:string}[]) || []
  return (
    <section className="py-16 px-6">
      <div className="max-w-3xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-center text-brand-deep mb-12">{s(data.heading)}</h2>}
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === item.id ? null : item.id)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="font-semibold text-brand-deep">{item.question}</span>
                <span className={`text-brand-accent text-xl font-light transition-transform ${open === item.id ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === item.id && <div className="px-5 pb-5 text-brand-deep/65 leading-relaxed border-t border-slate-100 pt-4">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection({ data }: { data: Record<string, unknown> }) {
  const items = (data.items as {id:string;quote:string;author:string;role:string;rating:number}[]) || []
  return (
    <section className="py-16 px-6 bg-brand-50">
      <div className="max-w-5xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-center text-brand-deep mb-12">{s(data.heading)}</h2>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex gap-1 mb-4">{Array.from({length:item.rating}).map((_,i)=><span key={i} className="text-amber-400">★</span>)}</div>
              <p className="text-brand-deep/70 italic leading-relaxed mb-4">"{item.quote}"</p>
              <div className="font-semibold text-brand-deep text-sm">{item.author}</div>
              <div className="text-xs text-brand-deep/50">{item.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TeamSection({ data }: { data: Record<string, unknown> }) {
  const members = (data.members as {id:string;name:string;role:string;photo:string;bio:string}[]) || []
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-center text-brand-deep mb-12">{s(data.heading)}</h2>}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {members.map(m => (
            <div key={m.id} className="text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 bg-slate-100 ring-2 ring-brand-accent/30">
                {m.photo ? <img src={m.photo} alt={m.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-brand-accent">{m.name[0]}</div>}
              </div>
              <div className="font-semibold text-brand-deep">{m.name}</div>
              <div className="text-xs text-brand-accent font-medium">{m.role}</div>
              {m.bio && <p className="text-xs text-brand-deep/50 mt-1">{m.bio}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ data }: { data: Record<string, unknown> }) {
  return (
    <section className="py-16 px-6 bg-brand-50">
      <div className="max-w-2xl mx-auto text-center">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-brand-deep mb-4">{s(data.heading)}</h2>}
        {has(data.subheading) && <p className="text-brand-deep/60 mb-8">{s(data.subheading)}</p>}
        <div className="space-y-3">
          {has(data.email) && <div className="flex items-center justify-center gap-2 text-brand-deep"><span className="text-brand-accent">✉</span><a href={`mailto:${data.email}`} className="hover:text-brand-accent transition-colors">{s(data.email)}</a></div>}
          {has(data.phone) && <div className="flex items-center justify-center gap-2 text-brand-deep"><span className="text-brand-accent">☎</span><span>{s(data.phone)}</span></div>}
          {has(data.address) && <div className="flex items-center justify-center gap-2 text-brand-deep"><span className="text-brand-accent">📍</span><span>{s(data.address)}</span></div>}
        </div>
      </div>
    </section>
  )
}

function GallerySection({ data }: { data: Record<string, unknown> }) {
  const images = (data.images as {url:string;alt?:string}[]) || []
  const cols = Number(data.columns) || 3
  const gridCols = cols === 2 ? 'grid-cols-2' : cols === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {has(data.heading) && <h2 className="font-serif text-3xl font-bold text-center text-brand-deep mb-10">{s(data.heading)}</h2>}
        {images.length > 0 ? (
          <div className={`grid ${gridCols} gap-4`}>
            {images.map((img, i) => <img key={i} src={img.url} alt={img.alt || ''} className="w-full aspect-video object-cover rounded-xl shadow-sm hover:shadow-md transition-all" />)}
          </div>
        ) : (
          <div className="text-center text-brand-deep/40 py-12 border-2 border-dashed border-slate-200 rounded-xl">No images added yet</div>
        )}
      </div>
    </section>
  )
}

function SpacerSection({ data }: { data: Record<string, unknown> }) {
  return <div style={{ height: `${Number(data.height) || 60}px` }} />
}

function HtmlSection({ data }: { data: Record<string, unknown> }) {
  return <div dangerouslySetInnerHTML={{ __html: String(data.content || '') }} />
}

const SECTION_RENDERERS: Record<string, React.ComponentType<{data: Record<string, unknown>}>> = {
  hero: HeroSection,
  text: TextSection,
  cards: CardsSection,
  stats: StatsSection,
  cta: CtaSection,
  faq: FaqSection,
  testimonials: TestimonialsSection,
  team: TeamSection,
  contact: ContactSection,
  gallery: GallerySection,
  spacer: SpacerSection,
  html: HtmlSection,
}

function renderSection(section: CmsSection) {
  const Renderer = SECTION_RENDERERS[section.type]
  if (!Renderer || !section.visible) return null
  return <Renderer key={section.id} data={section.data} />
}

export default function DynamicPage() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState<CmsPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/api/pages/${slug}`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json() })
      .then(setPage)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (notFound) return <Navigate to="/" replace />

  if (!page) return null

  return (
    <div className="min-h-screen">
      {page.sections
        .filter(s => s.visible)
        .sort((a, b) => a.order - b.order)
        .map(renderSection)}
    </div>
  )
}
