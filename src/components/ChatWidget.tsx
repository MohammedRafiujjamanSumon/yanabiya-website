import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

/**
 * Floating contact widget.
 * - Bottom-right floating button on every page
 * - Click → opens form: name, email, subject, business, country (office), message
 * - Submits to /api/messages → appears in admin inbox AND emails info@yanabiyagroup.com
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const BUSINESSES: { slug: string; label: string }[] = [
  { slug: 'it-software',                label: 'Technology & Digital Solutions' },
  { slug: 'export-import',              label: 'Export & Import Business' },
  { slug: 'clothing',                   label: 'Garments, Apparel & Accessories' },
  { slug: 'agents-brokerage',           label: 'Agents & Brokerage Business' },
  { slug: 'office-management',          label: 'Office Management Services' },
  { slug: 'manpower',                   label: 'Manpower Supply Services' },
  { slug: 'yanabiya-commerce',          label: 'Yanabiya e-Commerce' },
  { slug: 'yanabiya-digital-platform',  label: 'Yanabiya Digital Platform' },
  { slug: 'other',                      label: 'Other / General enquiry' },
]

const OFFICES: { code: string; label: string }[] = [
  { code: 'OM', label: 'Oman (Headquarters)' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'BD', label: 'Bangladesh' },
  { code: 'US', label: 'United States' },
]

export default function ChatWidget() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    const payload = {
      name:     String(fd.get('name')    || '').trim(),
      email:    String(fd.get('email')   || '').trim(),
      subject:  String(fd.get('subject') || '').trim(),
      business: String(fd.get('business')|| '').trim(),
      country:  String(fd.get('country') || '').trim(),
      message:  String(fd.get('message') || '').trim(),
    }
    setSending(true)
    try {
      const res = await fetch(`${API_BASE}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to send')
      }
      setDone(true)
      ;(e.currentTarget as HTMLFormElement).reset()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  const ipt = 'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 ' +
    'placeholder:text-slate-400 focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 transition'

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => { setOpen(true); setDone(false); setError('') }}
          className="fixed bottom-5 right-5 z-[80] flex items-center justify-center
                     w-14 h-14 rounded-full bg-brand-accent hover:bg-brand-accentDark
                     text-white shadow-2xl shadow-brand-accent/40
                     hover:-translate-y-0.5 transition-all duration-300"
          aria-label={t('chatWidget.openLabel', 'Open contact form')}
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-5 right-5 z-[80] w-[94vw] max-w-[400px] max-h-[88vh]
                     bg-white rounded-2xl shadow-2xl ring-1 ring-brand-deep/10
                     flex flex-col overflow-hidden animate-[fadeUp_0.25s_ease-out_both]"
        >
          {/* Header */}
          <div className="bg-brand-deep text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-serif text-sm font-bold">
                {t('chatWidget.title', 'Talk to Yanabiya')}
              </p>
              <p className="text-[11px] text-white/70">
                {t('chatWidget.subtitle', 'Tell us a bit and we’ll get back fast.')}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1" aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          {done ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-10 gap-3">
              <div className="w-14 h-14 rounded-full bg-brand-accent/15 text-brand-accentDark flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-serif text-lg text-slate-900">
                {t('chatWidget.thanksTitle', 'Thanks — message received.')}
              </h3>
              <p className="text-sm text-slate-600 leading-snug">
                {t('chatWidget.thanksBody', 'Our team has been notified and will reply within one business day.')}
              </p>
              <button
                onClick={() => { setDone(false) }}
                className="mt-3 text-xs font-semibold text-brand-accentDark hover:underline"
              >
                {t('chatWidget.sendAnother', 'Send another message')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-4 py-4 grid gap-2.5">
              <input
                name="name" required maxLength={120}
                placeholder={t('chatWidget.name', 'Your name *')}
                className={ipt}
                autoComplete="name"
              />
              <input
                name="email" required type="email" maxLength={160}
                placeholder={t('chatWidget.email', 'Email *')}
                className={ipt}
                autoComplete="email"
              />
              <input
                name="subject" required maxLength={160}
                placeholder={t('chatWidget.subject', 'Subject *')}
                className={ipt}
              />
              <select name="business" required defaultValue="" className={`${ipt} appearance-none`}>
                <option value="" disabled>{t('chatWidget.chooseBusiness', 'Choose a business *')}</option>
                {BUSINESSES.map(b => (
                  <option key={b.slug} value={b.slug}>{b.label}</option>
                ))}
              </select>
              <select name="country" defaultValue="" className={`${ipt} appearance-none`}>
                <option value="">{t('chatWidget.chooseOffice', 'Choose an office (optional)')}</option>
                {OFFICES.map(o => (
                  <option key={o.code} value={o.code}>{o.label}</option>
                ))}
              </select>
              <textarea
                name="message" required rows={4} maxLength={2000}
                placeholder={t('chatWidget.message', 'How can we help? *')}
                className={`${ipt} resize-none`}
              />

              {error && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full
                           bg-brand-accent hover:bg-brand-accentDark text-white font-semibold
                           text-sm px-5 py-2.5 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? t('chatWidget.sending', 'Sending…') : (
                  <>
                    {t('chatWidget.send', 'Send message')} <Send size={14} />
                  </>
                )}
              </button>

              <p className="text-[10px] text-slate-400 text-center mt-1">
                {t('chatWidget.privacy', 'We use your details only to reply to your enquiry.')}
              </p>
            </form>
          )}
        </div>
      )}
    </>
  )
}
