import { useEffect, useState } from 'react'
import { RefreshCw, Eye, Trash2, Inbox, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'

interface Message {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  country: string
  read: boolean
  createdAt: string
}

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('yg_token')
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

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

export default function MessagesEdit() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const unreadCount = messages.filter(m => !m.read).length

  const fetchMessages = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${BASE}/api/messages`, { headers: authHeaders() })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data: Message[] = await res.json()
      // newest first
      data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      setMessages(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markRead = async (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    try {
      await fetch(`${BASE}/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: authHeaders(),
      })
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m))
    } catch {
      // silent
    }
  }

  const deleteMsg = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm('Delete this message? This cannot be undone.')) return
    setDeletingId(id)
    try {
      await fetch(`${BASE}/api/messages/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      })
      setMessages(prev => prev.filter(m => m.id !== id))
      if (expandedId === id) setExpandedId(null)
    } catch {
      // silent
    } finally {
      setDeletingId(null)
    }
  }

  const toggleExpand = (msg: Message) => {
    const isOpening = expandedId !== msg.id
    setExpandedId(isOpening ? msg.id : null)
    if (isOpening && !msg.read) {
      markRead(msg.id)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
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
          </div>
          <button
            type="button"
            onClick={fetchMessages}
            disabled={loading}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-slate-800 rounded-xl h-16 animate-pulse border border-slate-700" />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Inbox size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs mt-1 opacity-60">Contact form submissions will appear here</p>
          </div>
        )}

        {/* Message list */}
        {!loading && messages.length > 0 && (
          <div className="space-y-2">
            {messages.map(msg => {
              const isExpanded = expandedId === msg.id
              const isDeleting = deletingId === msg.id

              return (
                <div
                  key={msg.id}
                  className={[
                    'rounded-xl border transition-all overflow-hidden',
                    msg.read
                      ? 'bg-slate-800/60 border-slate-700'
                      : 'bg-slate-800 border-slate-600 shadow-md shadow-black/20',
                  ].join(' ')}
                >
                  {/* Row header — always visible */}
                  <div
                    onClick={() => toggleExpand(msg)}
                    className="flex items-center gap-3 px-4 py-3.5 cursor-pointer group"
                  >
                    {/* Unread dot */}
                    <div className={`w-2 h-2 rounded-full shrink-0 ${msg.read ? 'bg-transparent' : 'bg-brand-accent'}`} />

                    {/* Sender info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className={`text-sm ${msg.read ? 'font-normal text-slate-300' : 'font-bold text-white'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs text-slate-500 truncate">{msg.email}</span>
                        {msg.country && (
                          <span className="text-xs text-slate-600">{msg.country}</span>
                        )}
                      </div>
                      <p className={`text-xs mt-0.5 truncate ${msg.read ? 'text-slate-500' : 'text-slate-400'}`}>
                        {msg.subject}
                      </p>
                    </div>

                    {/* Date + actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 hidden sm:block">{formatDate(msg.createdAt)}</span>

                      {/* Mark read */}
                      {!msg.read && (
                        <button
                          type="button"
                          title="Mark as read"
                          onClick={e => markRead(msg.id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
                        >
                          <Eye size={14} />
                        </button>
                      )}

                      {/* Delete */}
                      <button
                        type="button"
                        title="Delete"
                        onClick={e => deleteMsg(msg.id, e)}
                        disabled={isDeleting}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all disabled:opacity-40"
                      >
                        <Trash2 size={14} />
                      </button>

                      {/* Expand chevron */}
                      <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                        {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      </span>
                    </div>
                  </div>

                  {/* Expanded body */}
                  {isExpanded && (
                    <div className="px-5 pb-4 border-t border-slate-700 pt-3">
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mb-3 text-xs">
                        {msg.phone && (
                          <>
                            <span className="text-slate-500">Phone</span>
                            <span className="text-slate-300">{msg.phone}</span>
                          </>
                        )}
                        <span className="text-slate-500">Received</span>
                        <span className="text-slate-300">{formatDate(msg.createdAt)}</span>
                      </div>

                      <div className="bg-slate-900 rounded-lg p-3 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {msg.message}
                      </div>

                      <div className="flex gap-2 mt-3">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="text-xs bg-brand-accent/10 hover:bg-brand-accent/20 text-brand-accent font-medium px-3 py-1.5 rounded-lg transition-all"
                        >
                          Reply by Email
                        </a>
                        {msg.phone && (
                          <a
                            href={`tel:${msg.phone}`}
                            className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium px-3 py-1.5 rounded-lg transition-all"
                          >
                            Call
                          </a>
                        )}
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
