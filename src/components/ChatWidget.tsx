import { useEffect, useRef, useState } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { assets } from '../data/assets'

/**
 * Floating contact widget + WhatsApp shortcut.
 * - Bottom-right of every page
 * - Two always-visible buttons (stacked): WhatsApp + contact form
 * - Form posts to /api/messages → admin inbox + email to info@yanabiyagroup.com
 * - WhatsApp jumps straight to wa.me/<HQ-number> in a new tab
 */

const API_BASE  = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const WHATSAPP_NUMBER = '96891161677' // Yanabiya HQ Oman, digits only
const WHATSAPP_HREF   = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Yanabiya Group, ')}`

function WhatsAppLogo({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
    </svg>
  )
}

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
      {/* Floating buttons: WhatsApp + contact form */}
      {!open && (
        <div className="fixed bottom-5 right-5 z-[80] flex flex-col items-end gap-3 print:hidden">
          {/* WhatsApp */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2"
            aria-label={t('chatWidget.whatsappLabel', 'Chat on WhatsApp')}
          >
            <span className="inline-flex items-center rounded-full bg-brand-deep
                             text-white text-[10px] font-bold uppercase tracking-[0.22em]
                             px-3 py-1.5 shadow-md whitespace-nowrap
                             transition-all duration-200
                             md:opacity-0 md:translate-x-1
                             md:group-hover:opacity-100 md:group-hover:translate-x-0
                             md:group-focus-visible:opacity-100 md:group-focus-visible:translate-x-0">
              {t('chatWidget.whatsappLabel', 'Chat on WhatsApp')}
            </span>
            <span className="grid place-items-center w-14 h-14 rounded-full
                             bg-gradient-to-br from-[#25d366] to-[#128c7e] text-white
                             shadow-2xl shadow-[#25d366]/40
                             ring-2 ring-white/70
                             group-hover:-translate-y-0.5 transition-all duration-300">
              <WhatsAppLogo size={28} />
            </span>
          </a>

          {/* Contact form trigger — real Yanabiya logo */}
          <button
            onClick={() => { setOpen(true); setDone(false); setError('') }}
            className="group relative inline-flex items-center gap-2"
            aria-label={t('chatWidget.openLabel', 'Send a message')}
          >
            <span className="inline-flex items-center rounded-full bg-brand-deep
                             text-white text-[10px] font-bold uppercase tracking-[0.22em]
                             px-3 py-1.5 shadow-md whitespace-nowrap
                             transition-all duration-200
                             md:opacity-0 md:translate-x-1
                             md:group-hover:opacity-100 md:group-hover:translate-x-0
                             md:group-focus-visible:opacity-100 md:group-focus-visible:translate-x-0">
              {t('chatWidget.openLabel', 'Send a message')}
            </span>
            <span className="grid place-items-center w-14 h-14 rounded-full
                             bg-white text-brand-deep overflow-hidden
                             shadow-2xl shadow-brand-accent/30
                             ring-2 ring-brand-accent
                             group-hover:-translate-y-0.5 transition-all duration-300">
              <img
                src={assets.logo}
                alt="Yanabiya"
                className="w-10 h-10 object-contain"
              />
            </span>
          </button>
        </div>
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
          <div className="bg-brand-deep text-white px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white shrink-0 overflow-hidden ring-1 ring-white/30">
                <img src={assets.logo} alt="Yanabiya" className="w-7 h-7 object-contain" />
              </span>
              <div className="min-w-0">
                <p className="font-serif text-sm font-bold truncate">
                  {t('chatWidget.title', 'Talk to Yanabiya')}
                </p>
                <p className="text-[11px] text-white/70 truncate">
                  {t('chatWidget.subtitle', 'Tell us a bit and we’ll get back fast.')}
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1 shrink-0" aria-label="Close">
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
