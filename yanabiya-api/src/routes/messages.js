const router = require('express').Router()
const { readAll, write } = require('../db')
const protect = require('../middleware/auth')

// POST /api/messages — public (contact form submission)
router.post('/', (req, res) => {
  const { name, email, phone, subject, message, country } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' })
  }
  const msgs = readAll('messages')
  const doc = {
    id: `msg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    name, email,
    phone: phone || '',
    subject: subject || '',
    message,
    country: country || '',
    read: false,
    createdAt: new Date().toISOString(),
  }
  msgs.push(doc)
  write('messages', msgs)
  res.json({ ok: true })
})

// GET /api/messages — admin only, newest first
router.get('/', protect, (req, res) => {
  const msgs = readAll('messages')
  res.json([...msgs].reverse())
})

// PATCH /api/messages/:id/read — mark read
router.patch('/:id/read', protect, (req, res) => {
  const msgs = readAll('messages')
  const m = msgs.find(x => x.id === req.params.id)
  if (!m) return res.status(404).json({ message: 'Not found' })
  m.read = true
  write('messages', msgs)
  res.json(m)
})

// DELETE /api/messages/:id
router.delete('/:id', protect, (req, res) => {
  const msgs = readAll('messages').filter(x => x.id !== req.params.id)
  write('messages', msgs)
  res.json({ ok: true })
})

module.exports = router
