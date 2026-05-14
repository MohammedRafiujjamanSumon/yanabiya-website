import { useEffect, useState } from 'react'
import { RefreshCw, Eye, Trash2, Inbox, ChevronDown, ChevronUp, Send, Mail, Phone, MessageCircle, CheckCircle2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api, type Message } from '../../api/adminApi'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  } catch {
    return iso
  }
}

function whatsappUrl(phone: string, name: string): string {
  const digits = phone.replace(/\D/g, '')
  const text = encodeURIComponent(`Hello ${name}, thank you for reaching out to Yanabiya Group. `)
  return `https://wa.me/${digits}?text=${text}`
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all resize-none'

export default function MessagesEdit() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [replyTexts, setReplyTexts] = useState<Record<string, string>>({})
  const [sendingId, setSendingId] = useState<string | null>(null)
  const [replyError, setReplyError] = useState<Record<string, string>>({})

  const unreadCount = messages.filter(m => !m.read).length

  const fetchMessages = async () => {
    setLoading(true); setError('')
    try {
      const data = await api.getMessages()
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setMessages(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load messages')
    } finally { setLoading(false) }
  }

  useEffect(() => { fetchMessages() }, [])

  const markRead = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    try {
      await api.markMessageRead(id)
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    } catch { /* silent */ }
  }

  const deleteMsg = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this message? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await api.deleteMessage(id)
      setMessages(prev => prev.filter(m => m.id !== id))
      if (expandedId === id) setExpandedId(null)
    } catch { /* silent */ }
    finally { setDeletingId(null) }
  }

  const toggleExpand = (msg: Message) => {
    const isOpening = expandedId !== msg.id
    setExpandedId(isOpening ? msg.id : null)
    if (isOpening && !msg.read) markRead(msg.id)
  }

  const sendReply = async (msg: Message) => {
    const text = replyTexts[msg.id]?.trim()
    if (!text) return
    setSendingId(msg.id)
    setReplyError(prev => ({ ...prev, [msg.id]: '' }))
    try {
      const updated = await api.replyMessage(msg.id, text)
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, replies: updated.replies } : m))
      setReplyTexts(prev => ({ ...prev, [msg.id]: '' }))
    } catch (e: unknown) {
      setReplyError(prev => ({
        ...prev,
        [msg.id]: e instanceof Error ? e.message : 'Failed to send reply',
      }))
    } finally { setSendingId(null) }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Messages</h1>
              {unreadCount > 0 && (
                <span className="bg-brand-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-0.5">Contact form submissions from visitors</p>
          </div>
          <button type="button" onClick={fetchMessages} disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-800 rounded-xl h-16 animate-pulse border border-slate-700" />
            ))}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Inbox size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs mt-1 opacity-60">Contact form submissions will appear here</p>
          </div>
        )}

        {!loading && messages.length > 0 && (
          <div className="space-y-2">
            {messages.map(msg => {
              const isExpanded = expandedId === msg.id
              const isDeleting = deletingId === msg.id
              const isSending = sendingId === msg.id
              const replies = msg.replies || []

              return (
                <div key={msg.id}
                  className={[
                    'rounded-xl border transition-all overflow-hidden',
                    msg.read
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-800 border-slate-600 shadow-md shadow-black/20',
                  ].join(' ')}
                >
                  {/* Row header */}
                  <div onClick={() => toggleExpand(msg)}
                    className="flex items-center gap-3 px-4 py-3.5 cursor-pointer group">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${msg.read ? 'bg-transparent' : 'bg-brand-accent'}`} />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-sm ${msg.read ? 'font-normal text-slate-300' : 'font-bold text-white'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate">{msg.email}</span>
                        {msg.country && <span className="text-xs text-slate-600">{msg.country}</span>}
                        {replies.length > 0 && (
                          <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <CheckCircle2 size={11} /> {replies.length} replied
                          </span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${msg.read ? 'text-slate-500' : 'text-slate-400'}`}>
                        {msg.subject}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 hidden sm:block">{formatDate(msg.createdAt)}</span>

                      {!msg.read && (
                        <button type="button" title="Mark as read"
                          onClick={e => markRead(msg.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                          <Eye size={14} />
                        </button>
                      )}

                      <button type="button" title="Delete"
                        onClick={e => deleteMsg(msg.id, e)}
                        disabled={isDeleting}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40">
                        <Trash2 size={14} />
                      </button>

                      <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="border-t border-slate-700">
                      <div className="px-5 py-4 space-y-4">
                        {/* Meta */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs">
                          {msg.phone && (
                            <>
                              <span className="text-slate-500">Phone</span>
                              <span className="text-slate-300">{msg.phone}</span>
                            </>
                          )}
                          <span className="text-slate-500">Received</span>
                          <span className="text-slate-300">{formatDate(msg.createdAt)}</span>
                        </div>

                        {/* Message body */}
                        <div className="bg-slate-900 rounded-lg p-3 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                          {msg.message}
                        </div>

                        {/* Previous replies */}
                        {replies.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs font-medium text-slate-400">Sent replies</p>
                            {replies.map((r, i) => (
                              <div key={i} className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-3">
                                <p className="text-xs text-slate-200 whitespace-pre-wrap">{r.text}</p>
                                <p className="text-[10px] text-slate-500 mt-1">{formatDate(r.sentAt)}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reply box */}
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-slate-400">Reply to {msg.name}</p>
                          <textarea
                            rows={4}
                            className={ipt}
                            placeholder="Type your reply here…"
                            value={replyTexts[msg.id] || ''}
                            onChange={e => setReplyTexts(prev => ({ ...prev, [msg.id]: e.target.value }))}
                          />
                          {replyError[msg.id] && (
                            <p className="text-xs text-red-400">{replyError[msg.id]}</p>
                          )}
                          <button
                            type="button"
                            onClick={() => sendReply(msg)}
                            disabled={isSending || !(replyTexts[msg.id]?.trim())}
                            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all disabled:opacity-40"
                          >
                            {isSending
                              ? <><RefreshCw size={13} className="animate-spin" /> Sending…</>
                              : <><Send size={13} /> Send Reply</>}
                          </button>
                        </div>

                        {/* Quick contact buttons */}
                        <div className="flex flex-wrap gap-2 pt-1">
                          <a
                            href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(`Dear ${msg.name},\n\n`)}`}
                            className="flex items-center gap-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium px-3 py-1.5 rounded-lg transition-all"
                            title="Open in email client"
                          >
                            <Mail size={12} /> Open in Email App
                          </a>

                          {msg.phone && (
                            <>
                              <a
                                href={whatsappUrl(msg.phone, msg.name)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-xs bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 font-medium px-3 py-1.5 rounded-lg transition-all"
                              >
                                <MessageCircle size={12} /> WhatsApp
                              </a>
                              <a
                                href={`tel:${msg.phone}`}
                                className="flex items-center gap-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium px-3 py-1.5 rounded-lg transition-all"
                              >
                                <Phone size={12} /> Call
                              </a>
                            </>
                          )}
                        </div>
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
