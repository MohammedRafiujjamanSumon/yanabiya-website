import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { businesses } from '../../../data/businesses'
import { ImageField, VideoField } from '../../components/MediaPicker'

// ─── Interfaces ──────────────────────────────────────────────────────────────

interface CountryPresence {
  code: 'OM' | 'GB' | 'BD' | 'US'
  note: string
}

interface SubService {
  slug: string
  title: string
  body: string
  details?: string
  image: string
  videoUrl?: string
  features: string[]
  countries?: CountryPresence[]
}

interface ServiceCategory {
  slug: string
  title: string
  tagline: string
  body: string
  details: string
  features: string[]
  image: string
  videoUrl?: string
  footer?: string
  subServices?: SubService[]
  countries?: CountryPresence[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

type TabId = 'landing' | 'subpages' | 'countries'

const COUNTRY_META: { code: CountryPresence['code']; flag: string; name: string }[] = [
  { code: 'OM', flag: '🇴🇲', name: 'Oman' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'BD', flag: '🇧🇩', name: 'Bangladesh' },
  { code: 'US', flag: '🇺🇸', name: 'United States' },
]

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function blankCategory(): ServiceCategory {
  return {
    slug: `new-service-${Date.now()}`,
    title: '',
    tagline: '',
    body: '',
    details: '',
    features: [],
    image: '',
    videoUrl: '',
    footer: '',
    subServices: [],
    countries: [],
  }
}

function blankSubService(): SubService {
  return {
    slug: `sub-service-${Date.now()}`,
    title: '',
    body: '',
    details: '',
    image: '',
    videoUrl: '',
    features: [],
    countries: [],
  }
}

// ─── SubServiceCard ───────────────────────────────────────────────────────────

interface SubServiceCardProps {
  sub: SubService
  parentSlug: string
  onChange: (updated: SubService) => void
  onDelete: () => void
}

function SubServiceCard({ sub, parentSlug, onChange, onDelete }: SubServiceCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (field: keyof SubService, val: unknown) =>
    onChange({ ...sub, [field]: val })

  const handleTitleChange = (title: string) => {
    const newSlug = slugify(title) || sub.slug
    onChange({ ...sub, title, slug: newSlug })
  }

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete()
    } else {
      setConfirmDelete(true)
      setTimeout(() => setConfirmDelete(false), 3000)
    }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      {/* Header row */}
      <div className="flex items-center gap-2 px-4 py-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-3 text-left min-w-0"
        >
          <span className="font-medium text-white text-sm truncate">
            {sub.title || <em className="text-slate-500 not-italic">Untitled sub-page</em>}
          </span>
          <span className="shrink-0 text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded font-mono whitespace-nowrap">
            /business/{parentSlug}/{sub.slug}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="text-slate-500 hover:text-white transition-colors shrink-0"
        >
          {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          title={confirmDelete ? 'Click again to confirm delete' : 'Delete sub-page'}
          className={`shrink-0 px-2 py-1 rounded text-xs font-semibold transition-all ${
            confirmDelete
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'text-slate-600 hover:text-red-400 hover:bg-red-500/10'
          }`}
        >
          {confirmDelete ? 'Confirm?' : <Trash2 size={13} />}
        </button>
      </div>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-slate-800 pt-3">
          {/* Title */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title</label>
            <input
              value={sub.title}
              onChange={e => handleTitleChange(e.target.value)}
              className={ipt}
              placeholder="e.g. Custom Software Development"
            />
            <p className="mt-1 text-[10px] text-slate-600">
              URL: <code className="text-slate-500">/business/{parentSlug}/{sub.slug}</code>
            </p>
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Body / Short Description</label>
            <textarea
              rows={3}
              value={sub.body}
              onChange={e => update('body', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Brief description shown in listings"
            />
          </div>

          {/* Details */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Details / Long Description <span className="text-slate-600">(optional)</span></label>
            <textarea
              rows={4}
              value={sub.details ?? ''}
              onChange={e => update('details', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Longer detail copy shown on the sub-page"
            />
          </div>

          {/* Image */}
          <ImageField
            label="Image"
            value={sub.image}
            onChange={v => update('image', v)}
            folder="services"
          />

          {/* Video */}
          <VideoField
            label="Video URL (optional — MP4 hero)"
            value={sub.videoUrl ?? ''}
            onChange={v => update('videoUrl', v)}
            folder="services"
          />

          {/* Features */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Features <span className="text-slate-600">(one per line)</span></label>
            <textarea
              rows={4}
              value={(sub.features ?? []).join('\n')}
              onChange={e =>
                update('features', e.target.value.split('\n').filter(f => f.trim() !== ''))
              }
              className={`${ipt} resize-none font-mono text-xs`}
              placeholder="Feature 1&#10;Feature 2&#10;…"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── LandingTab ───────────────────────────────────────────────────────────────

interface LandingTabProps {
  cat: ServiceCategory
  onChange: (updated: ServiceCategory) => void
}

function LandingTab({ cat, onChange }: LandingTabProps) {
  const update = (field: keyof ServiceCategory, val: unknown) =>
    onChange({ ...cat, [field]: val })

  const handleTitleChange = (title: string) => {
    const newSlug = slugify(title) || cat.slug
    onChange({ ...cat, title, slug: newSlug })
  }

  return (
    <div className="space-y-4">
      {/* Title + slug */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Title</label>
        <input
          value={cat.title}
          onChange={e => handleTitleChange(e.target.value)}
          className={ipt}
          placeholder="e.g. Technology & Digital Solutions"
        />
        <p className="mt-1 text-[10px] text-slate-600">
          URL: <code className="text-slate-500">/business/{cat.slug}</code>
        </p>
      </div>

      {/* Tagline */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Tagline <span className="text-slate-600">(short, shown on card)</span></label>
        <input
          value={cat.tagline}
          onChange={e => update('tagline', e.target.value)}
          className={ipt}
          placeholder="e.g. Custom software, cloud & AI solutions"
        />
      </div>

      {/* Body */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Body / Short Description</label>
        <textarea
          rows={3}
          value={cat.body}
          onChange={e => update('body', e.target.value)}
          className={`${ipt} resize-none`}
          placeholder="Brief overview shown in listings and cards"
        />
      </div>

      {/* Details */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Details / Long Description</label>
        <textarea
          rows={5}
          value={cat.details}
          onChange={e => update('details', e.target.value)}
          className={`${ipt} resize-none`}
          placeholder="Full detail copy shown on the landing page"
        />
      </div>

      {/* Card Image */}
      <ImageField
        label="Card Image"
        value={cat.image}
        onChange={v => update('image', v)}
        folder="services"
      />

      {/* Video */}
      <VideoField
        label="Hero Video URL (optional — MP4, autoplays muted)"
        value={cat.videoUrl ?? ''}
        onChange={v => update('videoUrl', v)}
        folder="services"
      />

      {/* Footer Note */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Footer Note <span className="text-slate-600">(optional)</span></label>
        <input
          value={cat.footer ?? ''}
          onChange={e => update('footer', e.target.value)}
          className={ipt}
          placeholder="e.g. 🚀 We deliver end-to-end solutions…"
        />
      </div>

      {/* Features */}
      <div>
        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Features <span className="text-slate-600">(one per line)</span></label>
        <textarea
          rows={6}
          value={(cat.features ?? []).join('\n')}
          onChange={e =>
            update('features', e.target.value.split('\n').filter(f => f.trim() !== ''))
          }
          className={`${ipt} resize-none font-mono text-xs`}
          placeholder="Feature 1&#10;Feature 2&#10;…"
        />
      </div>
    </div>
  )
}

// ─── SubPagesTab ──────────────────────────────────────────────────────────────

interface SubPagesTabProps {
  cat: ServiceCategory
  onChange: (updated: ServiceCategory) => void
}

function SubPagesTab({ cat, onChange }: SubPagesTabProps) {
  const subServices = cat.subServices ?? []

  const addSubService = () => {
    const newSub = blankSubService()
    onChange({ ...cat, subServices: [...subServices, newSub] })
  }

  const updateSub = (idx: number, updated: SubService) => {
    const next = [...subServices]
    next[idx] = updated
    onChange({ ...cat, subServices: next })
  }

  const deleteSub = (idx: number) => {
    onChange({ ...cat, subServices: subServices.filter((_, i) => i !== idx) })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">
          Sub-pages{' '}
          <span className="text-slate-500 font-normal">({subServices.length})</span>
        </h3>
        <button
          type="button"
          onClick={addSubService}
          className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white
                     text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
        >
          <Plus size={13} /> Add Sub-page
        </button>
      </div>

      {subServices.length === 0 ? (
        <div className="text-center py-10 text-slate-600 text-sm border border-dashed border-slate-800 rounded-xl">
          No sub-pages yet. Click <strong className="text-slate-400">Add Sub-page</strong> to create one.
        </div>
      ) : (
        <div className="space-y-3">
          {subServices.map((sub, idx) => (
            <SubServiceCard
              key={sub.slug + idx}
              sub={sub}
              parentSlug={cat.slug}
              onChange={updated => updateSub(idx, updated)}
              onDelete={() => deleteSub(idx)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── CountriesTab ─────────────────────────────────────────────────────────────

interface CountriesTabProps {
  cat: ServiceCategory
  onChange: (updated: ServiceCategory) => void
}

function CountriesTab({ cat, onChange }: CountriesTabProps) {
  const countries = cat.countries ?? []

  const getNote = (code: CountryPresence['code']) =>
    countries.find(c => c.code === code)?.note ?? ''

  const setNote = (code: CountryPresence['code'], note: string) => {
    const filtered = countries.filter(c => c.code !== code)
    const next = note.trim()
      ? [...filtered, { code, note }]
      : filtered
    onChange({ ...cat, countries: next })
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-500">
        Enter a note describing this country's role in the service. Leave blank to mark the country as not present.
      </p>
      {COUNTRY_META.map(({ code, flag, name }) => (
        <div key={code}>
          <label className="flex items-center gap-2 text-xs text-slate-300 mb-1.5 font-medium">
            <span className="text-base">{flag}</span>
            <span>{name}</span>
            <span className="text-slate-600 font-mono text-[10px]">({code})</span>
          </label>
          <input
            value={getNote(code)}
            onChange={e => setNote(code, e.target.value)}
            className={ipt}
            placeholder={`Role of ${name} in this service…`}
          />
        </div>
      ))}
    </div>
  )
}

// ─── ServicesEdit (main) ──────────────────────────────────────────────────────

export default function ServicesEdit() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabId>('landing')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Load on mount
  useEffect(() => {
    api
      .getSection('services')
      .then(res => {
        const raw = res.data as ServiceCategory[]
        if (Array.isArray(raw) && raw.length > 0) {
          setCategories(raw)
        } else {
          throw new Error('empty')
        }
      })
      .catch(() => {
        setCategories(
          businesses.map(b => ({
            slug: b.slug,
            title: b.title,
            tagline: b.body,
            body: b.body,
            details: b.details,
            features: b.features,
            image: b.image ?? '',
            videoUrl: b.videoUrl,
            footer: b.footer,
            subServices: (b.subServices ?? []).map(s => ({
              slug: s.slug,
              title: s.title,
              body: s.body,
              details: undefined,
              image: s.image ?? '',
              videoUrl: undefined,
              features: s.features,
              countries: s.countries,
            })),
            countries: b.countries,
          }))
        )
      })
  }, [])

  const selectedCat = categories.find(c => c.slug === selectedSlug) ?? null

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('services', categories)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateCategory = (updated: ServiceCategory) => {
    setCategories(prev =>
      prev.map(c => (c.slug === selectedSlug ? updated : c))
    )
    // If slug changed, keep selection in sync
    if (updated.slug !== selectedSlug) {
      setSelectedSlug(updated.slug)
    }
  }

  const addCategory = () => {
    const cat = blankCategory()
    setCategories(prev => [...prev, cat])
    setSelectedSlug(cat.slug)
    setActiveTab('landing')
  }

  const handleDeleteCategory = (slug: string) => {
    if (confirmDelete === slug) {
      setCategories(prev => prev.filter(c => c.slug !== slug))
      if (selectedSlug === slug) setSelectedSlug(null)
      setConfirmDelete(null)
    } else {
      setConfirmDelete(slug)
      setTimeout(() => setConfirmDelete(null), 3000)
    }
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'subpages', label: 'Sub-pages' },
    { id: 'countries', label: 'Countries' },
  ]

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-3rem)] overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h1 className="text-xl font-bold text-white">Services</h1>
          <div className="flex items-center gap-2">
            {error && (
              <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg">
                {error}
              </span>
            )}
            <button
              type="button"
              onClick={save}
              disabled={saving || categories.length === 0}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Two-panel layout */}
        <div className="flex flex-1 gap-0 min-h-0">
          {/* LEFT PANEL */}
          <div className="w-64 shrink-0 flex flex-col border-r border-slate-800">
            {/* Panel header */}
            <div className="flex items-center justify-between px-3 py-3 border-b border-slate-800 shrink-0">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Categories
              </span>
              <button
                type="button"
                onClick={addCategory}
                title="Add category"
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-white bg-brand-accent/10 hover:bg-brand-accent/20 px-2 py-1 rounded-lg transition-all font-semibold"
              >
                <Plus size={12} /> Add
              </button>
            </div>

            {/* Category list */}
            <div className="flex-1 overflow-y-auto py-2 space-y-1 px-2">
              {categories.length === 0 && (
                <div className="text-xs text-slate-600 text-center py-6">
                  No categories yet.
                </div>
              )}
              {categories.map((cat, idx) => {
                const isActive = cat.slug === selectedSlug
                const isConfirm = confirmDelete === cat.slug
                return (
                  <div
                    key={cat.slug}
                    className={`relative flex items-center gap-2 px-2 py-2 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-brand-accent/20 border-brand-accent/30 text-brand-accent'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-600 text-white'
                    }`}
                    onClick={() => {
                      setSelectedSlug(cat.slug)
                      setActiveTab('landing')
                      setConfirmDelete(null)
                    }}
                  >
                    {/* Drag handle (visual only) */}
                    <GripVertical size={13} className="text-slate-700 shrink-0" />

                    {/* Number badge */}
                    <span
                      className={`text-[10px] font-bold w-5 shrink-0 ${
                        isActive ? 'text-brand-accent/70' : 'text-slate-600'
                      }`}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    {/* Title + sub-count */}
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold truncate ${isActive ? 'text-brand-accent' : 'text-white'}`}>
                        {cat.title || <em className="text-slate-500 not-italic font-normal">Untitled</em>}
                      </div>
                      <div className="text-[10px] text-slate-600 mt-0.5">
                        {(cat.subServices ?? []).length} sub-page{(cat.subServices ?? []).length !== 1 ? 's' : ''}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      type="button"
                      title={isConfirm ? 'Click again to confirm' : 'Delete category'}
                      onClick={e => {
                        e.stopPropagation()
                        handleDeleteCategory(cat.slug)
                      }}
                      className={`shrink-0 p-1 rounded transition-all ${
                        isConfirm
                          ? 'text-red-400 bg-red-500/20'
                          : 'text-slate-700 hover:text-red-400 hover:bg-red-500/10'
                      }`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="flex-1 overflow-y-auto pl-6 min-w-0">
            {!selectedCat ? (
              <div className="h-full flex items-center justify-center text-slate-600 text-sm">
                ← Select a service category to edit
              </div>
            ) : (
              <div className="pb-10">
                {/* Tab bar */}
                <div className="flex items-center gap-1 mb-5 border-b border-slate-800 pb-0">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px ${
                        activeTab === tab.id
                          ? 'text-brand-accent border-brand-accent'
                          : 'text-slate-400 border-transparent hover:text-white'
                      }`}
                    >
                      {tab.label}
                      {tab.id === 'subpages' && (
                        <span className="ml-1.5 text-[10px] bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded-full">
                          {(selectedCat.subServices ?? []).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                {activeTab === 'landing' && (
                  <LandingTab cat={selectedCat} onChange={updateCategory} />
                )}
                {activeTab === 'subpages' && (
                  <SubPagesTab cat={selectedCat} onChange={updateCategory} />
                )}
                {activeTab === 'countries' && (
                  <CountriesTab cat={selectedCat} onChange={updateCategory} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
