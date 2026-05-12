import { useEffect, useState } from 'react'
import {
  Save, Plus, Trash2, ChevronUp, ChevronDown, Copy, Pencil, Check,
  Layers, ImageIcon,
} from 'lucide-react'
import AdminLayout from './AdminLayout'
import { ImageField, VideoField } from './MediaPicker'
import { api } from '../api/adminApi'

// ─── Exported Types ───────────────────────────────────────────────────────────

export interface FieldDef {
  key: string
  label: string
  type: 'text' | 'textarea' | 'image' | 'video' | 'url' | 'number' | 'color' | 'select' | 'toggle' | 'tags'
  placeholder?: string
  hint?: string
  options?: { value: string; label: string }[]
  folder?: string
  rows?: number
  half?: boolean
}

export interface CmsItem {
  id: string
  enabled: boolean
  [key: string]: unknown
}

export interface CmsGroupEditorProps {
  title: string
  description?: string
  accent?: string
  bgAccent?: string
  apiKey: string
  fields: FieldDef[]
  defaultItem: () => CmsItem
  maxItems?: number
  emptyMessage?: string
  previewField?: string
  previewImageField?: string
  allowDuplicate?: boolean
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

// ─── renderField ──────────────────────────────────────────────────────────────

function renderField(
  field: FieldDef,
  item: CmsItem,
  update: (id: string, key: string, val: unknown) => void,
) {
  const val = item[field.key]
  const colClass = field.half ? 'col-span-1' : 'col-span-2'

  // image and video use their own label internally
  if (field.type === 'image') {
    return (
      <div key={field.key} className={colClass}>
        <ImageField
          label={field.label}
          value={String(val ?? '')}
          onChange={v => update(item.id, field.key, v)}
          folder={field.folder ?? 'misc'}
        />
      </div>
    )
  }

  if (field.type === 'video') {
    return (
      <div key={field.key} className={colClass}>
        <VideoField
          label={field.label}
          value={String(val ?? '')}
          onChange={v => update(item.id, field.key, v)}
          folder={field.folder ?? 'misc'}
        />
      </div>
    )
  }

  // All other types render their own label above the field
  const label = (
    <label className="block text-xs text-slate-400 mb-1.5 font-medium">
      {field.label}
      {field.hint && (
        <span className="text-slate-600 font-normal ml-1">({field.hint})</span>
      )}
    </label>
  )

  let control: React.ReactNode

  switch (field.type) {
    case 'text':
    case 'url':
    case 'number':
      control = (
        <input
          type={field.type}
          value={String(val ?? '')}
          onChange={e => update(item.id, field.key, e.target.value)}
          className={ipt}
          placeholder={field.placeholder}
        />
      )
      break

    case 'textarea':
      control = (
        <textarea
          rows={field.rows ?? 3}
          value={String(val ?? '')}
          onChange={e => update(item.id, field.key, e.target.value)}
          className={`${ipt} resize-none`}
          placeholder={field.placeholder}
        />
      )
      break

    case 'toggle':
      return (
        <div key={field.key} className={colClass}>
          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
            <span className="text-sm text-slate-300">{field.label}</span>
            <button
              type="button"
              onClick={() => update(item.id, field.key, !val)}
              className={`relative rounded-full transition-colors shrink-0 ${
                val ? 'bg-brand-accent/80' : 'bg-slate-700'
              }`}
              style={{ width: '36px', height: '20px' }}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                  val ? 'translate-x-[16px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      )

    case 'select':
      control = (
        <select
          value={String(val ?? '')}
          onChange={e => update(item.id, field.key, e.target.value)}
          className={ipt}
        >
          <option value="">Select…</option>
          {(field.options ?? []).map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )
      break

    case 'color':
      control = (
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={String(val || '#000000')}
            onChange={e => update(item.id, field.key, e.target.value)}
            className="w-10 h-10 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer shrink-0"
          />
          <input
            type="text"
            value={String(val ?? '')}
            onChange={e => update(item.id, field.key, e.target.value)}
            className={`${ipt} font-mono`}
            placeholder="#000000"
          />
        </div>
      )
      break

    case 'tags':
      control = (
        <textarea
          rows={2}
          value={String(val ?? '')}
          onChange={e => update(item.id, field.key, e.target.value)}
          className={`${ipt} resize-none font-mono text-xs`}
          placeholder="tag1, tag2, tag3"
        />
      )
      break

    default:
      control = null
  }

  return (
    <div key={field.key} className={colClass}>
      {label}
      {control}
    </div>
  )
}

// ─── CmsGroupEditor ───────────────────────────────────────────────────────────

export default function CmsGroupEditor(props: CmsGroupEditorProps) {
  const {
    title,
    description,
    apiKey,
    fields,
    defaultItem,
    maxItems,
    emptyMessage,
    previewField,
    previewImageField,
    allowDuplicate,
  } = props

  const [items, setItems] = useState<CmsItem[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)

  // ── Load on mount ────────────────────────────────────────────────────────────

  useEffect(() => {
    api
      .getSection(apiKey)
      .then(res => {
        const raw = res.data
        if (Array.isArray(raw)) {
          setItems(
            raw.map((item: CmsItem, idx: number) => ({
              ...item,
              id: item.id != null ? String(item.id) : String(idx),
              enabled: item.enabled !== undefined ? item.enabled : true,
            })),
          )
        } else if (raw && typeof raw === 'object') {
          const obj = raw as CmsItem
          setItems([
            {
              ...obj,
              id: obj.id != null ? String(obj.id) : '0',
              enabled: obj.enabled !== undefined ? obj.enabled : true,
            },
          ])
        } else {
          setItems([])
        }
      })
      .catch(() => {
        setItems([])
      })
  }, [apiKey])

  // ── Save ─────────────────────────────────────────────────────────────────────

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection(apiKey, items)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  // ── Utility helpers ───────────────────────────────────────────────────────────

  function toggleEnabled(id: string) {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, enabled: !item.enabled } : item)),
    )
  }

  function moveUp(id: string) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx <= 0) return prev
      const next = [...prev]
      ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
      return next
    })
  }

  function moveDown(id: string) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx >= prev.length - 1) return prev
      const next = [...prev]
      ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
      return next
    })
  }

  function duplicate(id: string) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === id)
      if (idx < 0) return prev
      const original = prev[idx]
      const copy: CmsItem = { ...original, id: `${original.id}-copy-${Date.now()}` }
      const next = [...prev]
      next.splice(idx + 1, 0, copy)
      return next
    })
  }

  function deleteItem(id: string) {
    setItems(prev => prev.filter(i => i.id !== id))
    if (editingId === id) setEditingId(null)
    setConfirmDeleteId(null)
  }

  function updateItem(id: string, key: string, val: unknown) {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, [key]: val } : item)),
    )
  }

  function addItem() {
    const item = defaultItem()
    item.id = `item-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
    setItems(prev => [...prev, item])
    setEditingId(item.id)
  }

  function handleDeleteClick(id: string) {
    if (confirmDeleteId === id) {
      deleteItem(id)
    } else {
      setConfirmDeleteId(id)
      setTimeout(() => setConfirmDeleteId(prev => (prev === id ? null : prev)), 3000)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  const canAdd = maxItems == null || items.length < maxItems

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">{title}</h1>
            {description && (
              <p className="text-sm text-slate-400 mt-0.5">{description}</p>
            )}
            {error && (
              <span className="inline-flex mt-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-lg">
                {error}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {canAdd && (
              <button
                type="button"
                onClick={addItem}
                disabled={saving}
                className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white
                           text-sm font-semibold px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
              >
                <Plus size={14} /> Add Item
              </button>
            )}
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

        {/* Empty state */}
        {items.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-2xl py-16 flex flex-col items-center justify-center text-center">
            <Layers size={32} className="text-slate-700 mb-3" />
            <p className="text-sm font-medium text-slate-500">No items yet</p>
            {emptyMessage && (
              <p className="text-xs text-slate-600 mt-1 max-w-xs">{emptyMessage}</p>
            )}
          </div>
        ) : (
          /* Item list */
          <div className="space-y-2">
            {items.map((item, index) => {
              const isEditing = editingId === item.id
              const isFirst = index === 0
              const isLast = index === items.length - 1
              const isPendingDelete = confirmDeleteId === item.id

              return (
                <div
                  key={item.id}
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all"
                >
                  {/* Item row */}
                  <div className="flex items-center gap-3 px-4 py-3">
                    {/* Enabled indicator */}
                    <button
                      type="button"
                      onClick={() => toggleEnabled(item.id)}
                      title={item.enabled ? 'Click to disable' : 'Click to enable'}
                      className={`w-4 h-4 rounded-full border-2 shrink-0 transition-all ${
                        item.enabled
                          ? 'bg-emerald-400 border-emerald-400'
                          : 'bg-transparent border-slate-600'
                      }`}
                    />

                    {/* Thumbnail */}
                    {previewImageField && (
                      <div className="w-10 h-10 rounded-lg bg-slate-800 shrink-0 overflow-hidden">
                        {item[previewImageField] ? (
                          <img
                            src={item[previewImageField] as string}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        ) : (
                          <div className="w-full h-full grid place-items-center text-slate-700">
                            <ImageIcon size={14} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Label */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">
                        {previewField && item[previewField]
                          ? String(item[previewField])
                          : `Item ${index + 1}`}
                      </div>
                      {!item.enabled && (
                        <span className="text-[10px] text-slate-600">Disabled</span>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 shrink-0">
                      {/* Move Up */}
                      <button
                        type="button"
                        onClick={() => moveUp(item.id)}
                        disabled={isFirst}
                        className={`p-1.5 rounded-lg transition-all ${
                          isFirst
                            ? 'opacity-30 cursor-not-allowed text-slate-500'
                            : 'text-slate-500 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Move up"
                      >
                        <ChevronUp size={14} />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        onClick={() => moveDown(item.id)}
                        disabled={isLast}
                        className={`p-1.5 rounded-lg transition-all ${
                          isLast
                            ? 'opacity-30 cursor-not-allowed text-slate-500'
                            : 'text-slate-500 hover:text-white hover:bg-slate-800'
                        }`}
                        title="Move down"
                      >
                        <ChevronDown size={14} />
                      </button>

                      {/* Duplicate */}
                      {allowDuplicate !== false && (
                        <button
                          type="button"
                          onClick={() => duplicate(item.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition-all"
                          title="Duplicate"
                        >
                          <Copy size={14} />
                        </button>
                      )}

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => setEditingId(isEditing ? null : item.id)}
                        className={`p-1.5 rounded-lg transition-all ${
                          isEditing
                            ? 'text-brand-accent bg-brand-accent/10'
                            : 'text-slate-500 hover:text-white hover:bg-slate-800'
                        }`}
                        title={isEditing ? 'Collapse' : 'Edit'}
                      >
                        <Pencil size={14} />
                      </button>

                      {/* Delete — two-step */}
                      <div className="flex items-center gap-1">
                        {isPendingDelete && (
                          <span className="text-[10px] text-red-400 font-semibold whitespace-nowrap">
                            Confirm?
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(item.id)}
                          className={`p-1.5 rounded-lg transition-all ${
                            isPendingDelete
                              ? 'text-red-400 bg-red-500/15'
                              : 'text-slate-500 hover:text-white hover:bg-slate-800'
                          }`}
                          title={isPendingDelete ? 'Click again to confirm delete' : 'Delete'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Edit form */}
                  {isEditing && (
                    <div className="border-t border-slate-800 px-4 py-4">
                      <div className="grid grid-cols-2 gap-3">
                        {fields.map(field => renderField(field, item, updateItem))}
                      </div>
                      <div className="flex justify-end mt-4">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="flex items-center gap-1.5 bg-brand-accent hover:bg-brand-accentDark text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all"
                        >
                          <Check size={13} /> Done Editing
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
