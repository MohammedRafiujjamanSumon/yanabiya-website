const { useFile, fileRead, fileWrite, fileReadAll, mongoose } = require('../db')

// ── Mongoose schema (production) ────────────────────────────────────────────
let Message
if (!useFile) {
  const replySchema = new mongoose.Schema({
    text: String,
    sentAt: { type: Date, default: Date.now },
  }, { _id: false })

  const schema = new mongoose.Schema({
    _id: { type: String },
    name: String,
    email: String,
    phone: { type: String, default: '' },
    subject: { type: String, default: '' },
    message: String,
    country: { type: String, default: '' },
    read: { type: Boolean, default: false },
    replies: { type: [replySchema], default: [] },
    createdAt: { type: Date, default: Date.now },
  })
  Message = mongoose.model('Message', schema)
}

// ── Public API ───────────────────────────────────────────────────────────────
async function getAllMessages() {
  if (useFile) return [...fileReadAll('messages')].reverse()
  return Message.find({}).sort({ createdAt: -1 }).lean()
}

async function createMessage(data) {
  const id = `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`
  if (useFile) {
    const msgs = fileReadAll('messages')
    const doc = { id, ...data, read: false, replies: [], createdAt: new Date().toISOString() }
    msgs.push(doc)
    fileWrite('messages', msgs)
    return doc
  }
  return Message.create({ _id: id, ...data })
}

async function markRead(id) {
  if (useFile) {
    const msgs = fileReadAll('messages')
    const m = msgs.find(x => x.id === id)
    if (!m) return null
    m.read = true
    fileWrite('messages', msgs)
    return m
  }
  return Message.findByIdAndUpdate(id, { read: true }, { new: true, lean: true })
}

async function addReply(id, text) {
  const reply = { text, sentAt: new Date().toISOString() }
  if (useFile) {
    const msgs = fileReadAll('messages')
    const m = msgs.find(x => x.id === id)
    if (!m) return null
    if (!m.replies) m.replies = []
    m.replies.push(reply)
    fileWrite('messages', msgs)
    return m
  }
  return Message.findByIdAndUpdate(
    id,
    { $push: { replies: reply } },
    { new: true, lean: true }
  )
}

async function deleteMessage(id) {
  if (useFile) {
    fileWrite('messages', fileReadAll('messages').filter(x => x.id !== id))
    return
  }
  return Message.findByIdAndDelete(id)
}

module.exports = { getAllMessages, createMessage, markRead, addReply, deleteMessage }
