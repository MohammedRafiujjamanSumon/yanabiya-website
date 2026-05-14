const router = require('express').Router()
const { getAllMessages, createMessage, markRead, addReply, deleteMessage } = require('../models/Message')
const { sendReply, isConfigured } = require('../email')
const protect = require('../middleware/auth')

// POST /api/messages — public (contact form submission)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, country } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' })
    }
    await createMessage({ name, email, phone: phone || '', subject: subject || '', message, country: country || '' })
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/messages — admin only, newest first
router.get('/', protect, async (req, res) => {
  try {
    res.json(await getAllMessages())
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PATCH /api/messages/:id/read — mark read
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const m = await markRead(req.params.id)
    if (!m) return res.status(404).json({ message: 'Not found' })
    res.json(m)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/messages/:id/reply — send email reply
router.post('/:id/reply', protect, async (req, res) => {
  try {
    const { text } = req.body
    if (!text || !text.trim()) return res.status(400).json({ message: 'Reply text is required' })

    // Get message to find recipient details
    const all = await getAllMessages()
    const msg = all.find(m => (m._id || m.id) === req.params.id)
    if (!msg) return res.status(404).json({ message: 'Message not found' })

    if (!isConfigured()) {
      return res.status(503).json({ message: 'Email (SMTP) not configured on server' })
    }

    await sendReply({
      to: msg.email,
      toName: msg.name,
      subject: msg.subject,
      replyText: text.trim(),
    })

    const updated = await addReply(req.params.id, text.trim())
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/messages/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await deleteMessage(req.params.id)
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
