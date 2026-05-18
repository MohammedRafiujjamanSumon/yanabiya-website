import { useEffect, useRef, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { MessageCircle, Send, User, Mail, Clock, RefreshCw } from 'lucide-react'

/**
 * Admin live chat panel — see all customer sessions, reply in real-time.
 */

type Session = {
  sessionId: string
  name: string
  email: string
  createdAt: string
  lastMessageAt: string
  unreadByAdmin?: number
  closed?: boolean
}

type Message = {
  text: string
  sender: 'customer' | 'admin'
  senderName?: string
  createdAt: string
}

const CHAT_HTTP = import.meta.env.VITE_CHAT_URL || 'http://localhost:5001'
const CHAT_WS   = CHAT_HTTP.replace(/^http/, 'ws')

function getToken(): string | null {
  return localStorage.getItem('yg_token')
}

export default function ChatPanel() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [selected, setSelected] = useState<Session | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [draft, setDraft]       = useState('')
  const [connected, setConnected] = useState(false)
  const wsRef     = useRef<WebSocket | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  async function loadSessions() {
    const token = getToken()
    if (!token) return
    try {
      const res = await fetch(`${CHAT_HTTP}/api/chat/sessions?token=${encodeURIComponent(token)}`)
      if (!res.ok) return
      const data = await res.json()
      setSessions(data.sessions || [])
    } catch (e) { console.error(e) }
  }

  async function loadMessages(sid: string) {
    try {
      const res = await fetch(`${CHAT_HTTP}/api/chat/messages/${sid}`)
      const data = await res.json()
      setMessages(data.messages || [])
    } catch { setMessages([]) }
  }

  function openSession(s: Session) {
    setSelected(s)
    loadMessages(s.sessionId)
    // Mark as read on server
    const token = getToken()
    if (token) {
      fetch(`${CHAT_HTTP}/api/chat/mark-read/${s.sessionId}?token=${encodeURIComponent(token)}`, { method: 'POST' }).catch(() => {})
    }
    // Update local unread count
    setSessions(prev => prev.map(x => x.sessionId === s.sessionId ? { ...x, unreadByAdmin: 0 } : x))
  }

  function sendReply() {
    const text = draft.trim()
    if (!text || !selected || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
    wsRef.current.send(JSON.stringify({
      sessionId: selected.sessionId,
      text,
      adminName: 'Yanabiya Team',
    }))
    setDraft('')
  }

  // Connect admin websocket once on mount
  useEffect(() => {
    const token = getToken()
    if (!token) return
    loadSessions()

    const ws = new WebSocket(`${CHAT_WS}/ws/admin?token=${encodeURIComponent(token)}`)
    wsRef.current = ws
    ws.onopen  = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onerror = () => setConnected(false)
    ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data)
        if (data.type === 'message') {
          // If it's for currently selected session, append
          if (selected && data.sessionId === selected.sessionId) {
            setMessages(m => [...m, {
              text: data.text, sender: data.sender,
              senderName: data.senderName, createdAt: data.createdAt,
            }])
          }
          // Refresh sessions list to update lastMessageAt + unread badge
          loadSessions()
        } else if (data.type === 'session-created') {
          loadSessions()
        }
      } catch { /* ignore */ }
    }
    return () => { ws.close() }
  }, [selected?.sessionId])

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <AdminLayout>
      <div className="flex h-[calc(100vh-60px)] -m-6 bg-slate-900">
        {/* Sessions list */}
        <aside className="w-72 border-r border-slate-800 bg-slate-950 flex flex-col">
          <div className="px-4 py-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-brand-accent" />
              <h2 className="text-sm font-bold text-white">Live Chat</h2>
              <span className={`w-1.5 h-1.5 rounded-full ml-1 ${connected ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            </div>
            <button onClick={loadSessions} className="text-slate-500 hover:text-white">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="px-4 py-10 text-center text-xs text-slate-600">
                No customer chats yet.<br/>When a visitor messages, they'll appear here.
              </div>
            ) : sessions.map(s => (
              <button
                key={s.sessionId}
                onClick={() => openSession(s)}
                className={`w-full text-left px-4 py-3 border-b border-slate-800/50 hover:bg-slate-800/40 transition ${
                  selected?.sessionId === s.sessionId ? 'bg-slate-800/70' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-white truncate">{s.name || 'Guest'}</span>
                  {s.unreadByAdmin && s.unreadByAdmin > 0 && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{s.unreadByAdmin}</span>
                  )}
                </div>
                {s.email && <p className="text-[10px] text-slate-500 truncate flex items-center gap-1"><Mail className="w-2.5 h-2.5" />{s.email}</p>}
                <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5" /> {new Date(s.lastMessageAt).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {/* Conversation */}
        <section className="flex-1 flex flex-col">
          {selected ? (
            <>
              <header className="px-5 py-4 border-b border-slate-800 bg-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-accent/20 grid place-items-center text-brand-accent">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{selected.name || 'Guest'}</p>
                    <p className="text-xs text-slate-400">{selected.email || 'no email provided'}</p>
                  </div>
                </div>
              </header>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[60%] px-3 py-2 rounded-2xl text-sm shadow ${
                      m.sender === 'admin'
                        ? 'bg-brand-accent text-white rounded-br-sm'
                        : 'bg-slate-800 text-slate-100 rounded-bl-sm'
                    }`}>
                      <p className="whitespace-pre-wrap leading-snug">{m.text}</p>
                      <p className={`text-[9px] mt-1 opacity-60`}>{new Date(m.createdAt).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-800 px-4 py-3 bg-slate-900 flex items-center gap-2">
                <input
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendReply()}
                  placeholder="Type a reply…"
                  className="flex-1 px-4 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent"
                />
                <button
                  onClick={sendReply}
                  disabled={!draft.trim() || !connected}
                  className="w-10 h-10 rounded-full bg-brand-accent hover:bg-brand-accentDark text-white flex items-center justify-center disabled:opacity-40 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              <div className="text-center">
                <MessageCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a conversation to reply</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </AdminLayout>
  )
}
