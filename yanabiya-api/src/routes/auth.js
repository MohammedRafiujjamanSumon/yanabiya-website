const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { getAdmin, matchPassword, updatePassword } = require('../models/Admin')
const protect = require('../middleware/auth')

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' })

    const admin = getAdmin()
    if (!admin || admin.email !== email.toLowerCase())
      return res.status(401).json({ message: 'Invalid credentials' })

    const ok = await matchPassword(admin.password, password)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })

    res.json({
      token: sign(admin.id),
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role },
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/auth/me
router.get('/me', protect, (req, res) => {
  res.json({ admin: req.admin })
})

// PUT /api/auth/password
router.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const admin = getAdmin()
    const ok = await matchPassword(admin.password, currentPassword)
    if (!ok) return res.status(401).json({ message: 'Current password incorrect' })
    await updatePassword(newPassword)
    res.json({ message: 'Password updated' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
