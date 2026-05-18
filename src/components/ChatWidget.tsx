import { useEffect, useRef, useState } from 'react'
import { MessageCircle, X, Send, User } from 'lucide-react'

/**
 * Floating live-chat widget for site visitors.
 * - Bottom-right floating button
 * - Click → opens chat window
 * - First-time: asks for name + email
 * - Connects to Python WebSocket server (VITE_CHAT_URL)
 * - Persists sessionId in localStorage so returning visitors resume their thread
 */

type Message = {
  text: string
  sender: 'customer' | 'admin'
  senderName?: string
  createdAt: string
}

const CHAT_HTTP = import.meta.env.VITE_CHAT_URL || 'http://localhost:5001'
const CHAT_WS   = CHAT_HTTP.replace(/^http/, 'ws')

const LS_SESSION = 'yg_chat_session_v1'
const LS_NAME    = 'yg_chat_name_v1'
const LS_EMAIL   = 'yg_chat_email_v1'

export default function ChatWidget() {
  const [open, setOpen]         = useState(false)
  const [needsId, setNeedsId]   = useState(false)
  const [name, setName]         = useState(() => localStorage.getItem(LS_NAME) || '')
  const [email, setEmail]       = useState(() => localStorage.getItem(LS_EMAIL) || '')
  const [sessionId, setSession] = useState<string | null>(() => localStorage.getItem(LS_SESSION))
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft]       = useState('')
  const [connected, setConnected] = useState(false)
  const [unread, setUnread]     = useState(0)

  const wsRef     = useRef<WebSocket | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function startSession(n: string, e: string) {
    const res = await fetch(`${CHAT_HTTP}/api/chat/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: n, email: e, sessionId: sessionId || undefined }),
    })
    if (!res.ok) throw new Error('Failed to start chat session')
    const data = await res.json()
    localStorage.setItem(LS_SESSION, data.sessionId)
    localStorage.setItem(LS_NAME, n)
    localStorage.setItem(LS_EMAIL, e)
    setSession(data.sessionId)
    setNeedsId(false)
    connectWS(data.sessionId)
    fetchHistory(data.sessionId)
  }

  async function fetchHistory(sid: string) {
    try {
      const res = await fetch(`${CHAT_HTTP}/api/chat/messages/${sid}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch { /* empty history */ }
  }

  function connectWS(sid: string) {
    if (wsRef.current?.readyState === WebSocket.OPEN) return
    const ws = new WebSocket(`${CHAT_WS}/ws/customer/${sid}`)
    wsRef.current = ws
    ws.onopen    = () => setConnected(true)
    ws.onclose   = () => setConnected(false)
    ws.onerror   = () => setConnected(false)
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data)
        if (data.type === 'message') {
          setMessages(m => [...m, {
            text: data.text, sender: data.sender,
            senderName: data.senderName, createdAt: data.createdAt,
          }])
          if (data.sender === 'admin' && !open) setUnread(u => u + 1)
        }
      } catch { /* ignore */ }
    }
  }

  function handleOpen() {
    setOpen(true)
    setUnread(0)
    if (!sessionId) {
      setNeedsId(true)
    } else {
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        connectWS(sessionId)
        fetchHistory(sessionId)
      }
    }
  }

  function handleSend() {
    const text = draft.trim()
    if (!text || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({ text }))
    setDraft('')
  }

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          className="fixed bottom-5 right-5 z-[80] flex items-center justify-center
                     w-14 h-14 rounded-full bg-brand-accent hover:bg-brand-accentDark
                     text-white shadow-2xl shadow-brand-accent/40
                     hover:-translate-y-0.5 transition-all duration-300"
          aria-label="Open chat"
        >
          <MessageCircle size={26} />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center border-2 border-white">
              {unread > 9 ? '9+' : unread}
            </span>
          )}
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-5 right-5 z-[80] w-[92vw] max-w-[380px] h-[560px]
                        bg-white rounded-2xl shadow-2xl ring-1 ring-brand-deep/10
                        flex flex-col overflow-hidden animate-[fadeUp_0.25s_ease-out_both]">
          {/* Header */}
          <div className="bg-brand-deep text-white px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-serif text-sm font-bold">Yanabiya Live Chat</p>
              <p className="text-[10px] text-white/70 flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                {connected ? 'Online' : 'Connecting…'}
              </p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          {/* Identity gate */}
          {needsId && (
            <div className="flex-1 px-5 py-6 flex flex-col gap-3">
              <p className="text-xs text-slate-500 mb-2">
                Hi 👋 Tell us a bit about yourself so we can help you better.
              </p>
              <input
                value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-accent"
              />
              <input
                value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email (optional)"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-brand-accent"
              />
              <button
                onClick={() => name.trim() && startSession(name.trim(), email.trim())}
                disabled={!name.trim()}
                className="mt-2 w-full py-2.5 rounded-lg bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold transition disabled:opacity-50"
              >
                Start Chat
              </button>
            </div>
          )}

          {/* Message thread */}
          {!needsId && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-slate-50">
                {messages.length === 0 && (
                  <div className="text-center text-xs text-slate-400 mt-6">
                    No messages yet — say hello! 👋
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'customer' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm shadow-sm
                      ${m.sender === 'customer'
                        ? 'bg-brand-accent text-white rounded-br-sm'
                        : 'bg-white text-slate-800 rounded-bl-sm border border-slate-100'}`}>
                      {m.sender === 'admin' && m.senderName && (
                        <p className="text-[10px] text-brand-accentDark font-bold mb-0.5">{m.senderName}</p>
                      )}
                      <p className="whitespace-pre-wrap leading-snug">{m.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Composer */}
              <div className="border-t border-slate-100 px-3 py-2 flex items-center gap-2">
                <input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder="Type a message…"
                  className="flex-1 px-3 py-2 rounded-full bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-brand-accent"
                />
                <button
                  onClick={handleSend}
                  disabled={!draft.trim() || !connected}
                  className="w-9 h-9 rounded-full bg-brand-accent hover:bg-brand-accentDark text-white flex items-center justify-center disabled:opacity-40 transition"
                >
                  <Send size={14} />
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
