import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, ChevronRight, HelpCircle } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

function newFAQ(): FAQ {
  return { id: `faq-${Date.now()}`, question: '', answer: '', category: '' }
}

interface FAQCardProps {
  faq: FAQ
  idx: number
  total: number
  onChange: (updated: FAQ) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

function FAQCard({ faq, idx, total, onChange, onDelete, onMoveUp, onMoveDown }: FAQCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (field: keyof FAQ, val: string) => onChange({ ...faq, [field]: val })

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
        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center gap-3 text-left min-w-0"
        >
          <ChevronRight
            size={14}
            className={`text-slate-500 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
          <div className="min-w-0">
            <div className="text-sm font-medium text-white truncate">
              {faq.question || (
                <em className="text-slate-500 not-italic font-normal">Untitled question</em>
              )}
            </div>
            {faq.category && !expanded && (
              <div className="text-[10px] text-slate-600 mt-0.5">{faq.category}</div>
            )}
          </div>
        </button>

        {/* Index badge */}
        <span className="text-[10px] font-bold text-slate-600 shrink-0">
          {String(idx + 1).padStart(2, '0')}
        </span>

        {/* Order controls */}
        <button
          type="button"
          onClick={onMoveUp}
          disabled={idx === 0}
          className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all shrink-0"
        >
          <ChevronUp size={13} />
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={idx === total - 1}
          className="p-1 rounded text-slate-600 hover:text-white hover:bg-slate-800 disabled:opacity-30 transition-all shrink-0"
        >
          <ChevronDown size={13} />
        </button>

        {/* Delete */}
        <button
          type="button"
          onClick={handleDelete}
          title={confirmDelete ? 'Click again to confirm' : 'Delete FAQ'}
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
        <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Question</label>
            <input
              value={faq.question}
              onChange={e => update('question', e.target.value)}
              className={ipt}
              placeholder="What services does Yanabiya Group offer?"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Answer</label>
            <textarea
              rows={4}
              value={faq.answer}
              onChange={e => update('answer', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Provide a clear, helpful answer…"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Category <span className="text-slate-600">(optional — for grouping)</span>
            </label>
            <input
              value={faq.category}
              onChange={e => update('category', e.target.value)}
              className={ipt}
              placeholder="e.g. General, Services, Payments…"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function FAQsEdit() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getSection('faqs')
      .then(res => {
        if (Array.isArray(res.data)) setFaqs(res.data as FAQ[])
      })
      .catch(() => {})
  }, [])

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('faqs', faqs)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const updateFAQ = (id: string, updated: FAQ) =>
    setFaqs(prev => prev.map(f => (f.id === id ? updated : f)))

  const removeFAQ = (id: string) => setFaqs(prev => prev.filter(f => f.id !== id))

  const moveUp = (idx: number) => {
    if (idx === 0) return
    const next = [...faqs]
    ;[next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]
    setFaqs(next)
  }

  const moveDown = (idx: number) => {
    if (idx === faqs.length - 1) return
    const next = [...faqs]
    ;[next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]
    setFaqs(next)
  }

  // Collect unique categories for summary
  const categories = Array.from(new Set(faqs.map(f => f.category).filter(Boolean)))

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <HelpCircle size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FAQs</h1>
              <p className="text-slate-400 text-sm">
                {faqs.length} question{faqs.length !== 1 ? 's' : ''}
                {categories.length > 0 && (
                  <span className="ml-1.5 text-slate-600">
                    in {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'}
                  </span>
                )}
              </p>
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
              onClick={() => setFaqs(prev => [...prev, newFAQ()])}
              className="flex items-center gap-1.5 border border-slate-700 hover:border-slate-500
                         text-slate-300 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all"
            >
              <Plus size={14} /> Add FAQ
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

        {faqs.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-2xl py-16 flex flex-col items-center justify-center text-slate-600">
            <HelpCircle size={32} className="mb-3" />
            <div className="text-sm font-medium mb-1">No FAQs yet</div>
            <div className="text-xs">Click "Add FAQ" to create your first question</div>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                idx={idx}
                total={faqs.length}
                onChange={updated => updateFAQ(faq.id, updated)}
                onDelete={() => removeFAQ(faq.id)}
                onMoveUp={() => moveUp(idx)}
                onMoveDown={() => moveDown(idx)}
              />
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
