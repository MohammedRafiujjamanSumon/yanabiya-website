import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, ImageIcon } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { ImageField } from '../../components/MediaPicker'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface GalleryImage {
  id: string
  url: string
  caption: string
  alt: string
}

function newImg(): GalleryImage {
  return { id: `img-${Date.now()}`, url: '', caption: '', alt: '' }
}

export default function GalleryEdit() {
  const { key = 'general' } = useParams<{ key: string }>()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const sectionKey = `gallery-${key}`
  const pageLabel = key.charAt(0).toUpperCase() + key.slice(1).replace(/-/g, ' ')

  useEffect(() => {
    api
      .getSection(sectionKey)
      .then(res => {
        if (Array.isArray(res.data)) setImages(res.data as GalleryImage[])
      })
      .catch(() => {})
  }, [sectionKey])

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection(sectionKey, images)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const update = (id: string, field: keyof GalleryImage, val: string) =>
    setImages(prev => prev.map(img => (img.id === id ? { ...img, [field]: val } : img)))

  const remove = (id: string) => setImages(prev => prev.filter(img => img.id !== id))

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const next = [...images]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    setImages(next)
  }

  const moveDown = (idx: number) => {
    if (idx === images.length - 1) return
    const next = [...images]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    setImages(next)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <ImageIcon size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Gallery</h1>
              <p className="text-slate-400 text-sm">{pageLabel} page photos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg">
                {error}
              </span>
            )}
            <button
              type="button"
              onClick={() => setImages(prev => [...prev, newImg()])}
              className="flex items-center gap-1.5 border border-slate-700 hover:border-slate-500
                         text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
            >
              <Plus size={14} /> Add Photo
            </button>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {images.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-2xl py-16 flex flex-col items-center justify-center text-slate-600">
            <ImageIcon size={32} className="mb-3" />
            <div className="text-sm font-medium mb-1">No photos yet</div>
            <div className="text-xs">Click "Add Photo" to upload your first gallery image</div>
          </div>
        ) : (
          <div className="space-y-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
              >
                <div className="flex gap-4 p-4">
                  {/* Image preview */}
                  <div className="w-32 shrink-0">
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.alt || img.caption}
                        className="w-32 h-24 object-cover rounded-lg bg-slate-800"
                      />
                    ) : (
                      <div className="w-32 h-24 bg-slate-800 rounded-lg grid place-items-center">
                        <ImageIcon size={20} className="text-slate-700" />
                      </div>
                    )}
                  </div>

                  {/* Fields */}
                  <div className="flex-1 space-y-3 min-w-0">
                    <ImageField
                      label="Photo"
                      value={img.url}
                      onChange={v => update(img.id, 'url', v)}
                      folder="misc"
                    />
                    <input
                      value={img.caption}
                      onChange={e => update(img.id, 'caption', e.target.value)}
                      className={ipt}
                      placeholder="Caption (shown below photo)"
                    />
                    <input
                      value={img.alt}
                      onChange={e => update(img.id, 'alt', e.target.value)}
                      className={ipt}
                      placeholder="Alt text (for accessibility & SEO)"
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                      <ChevronUp size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={idx === images.length - 1}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all"
                    >
                      <ChevronDown size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => remove(img.id)}
                      className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-all mt-auto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
