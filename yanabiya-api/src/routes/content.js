const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getSection, setSection, listSections } = require('../models/Content')
const protect = require('../middleware/auth')

// ── File upload ─────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads', req.params.folder || 'misc')
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}${ext}`)
  },
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    cb(null, /jpeg|jpg|png|gif|svg|webp/.test(path.extname(file.originalname).toLowerCase()))
  },
})

// GET /api/content  — list all section keys (admin only)
router.get('/', protect, (req, res) => {
  res.json(listSections())
})

// GET /api/content/:key  — public (main site can read)
router.get('/:key', (req, res) => {
  const doc = getSection(req.params.key)
  if (!doc) return res.status(404).json({ message: 'Section not found' })
  res.json(doc)
})

// PUT /api/content/:key  — admin only
router.put('/:key', protect, (req, res) => {
  try {
    const doc = setSection(req.params.key, req.body.data, req.admin.email)
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/content/upload/:folder
router.post('/upload/:folder', protect, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  const url = `${process.env.API_URL || ''}/uploads/${req.params.folder}/${req.file.filename}`
  res.json({ url, filename: req.file.filename })
})

// DELETE /api/content/upload/:folder/:filename
router.delete('/upload/:folder/:filename', protect, (req, res) => {
  const filePath = path.join(__dirname, '../../uploads', req.params.folder, req.params.filename)
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
  res.json({ message: 'Deleted' })
})

module.exports = router
