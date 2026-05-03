const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { getSection, setSection, listSections } = require('../models/Content')
const protect = require('../middleware/auth')

const UPLOADS_DIR = path.join(__dirname, '../../uploads')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(UPLOADS_DIR, req.params.folder || 'misc')
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase()
    cb(null, `${base}-${Date.now()}${ext}`)
  },
})

const ALLOWED = /\.(jpeg|jpg|png|gif|svg|webp|mp4|webm|mov|avi|mkv|pdf)$/i

const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200 MB for videos
  fileFilter: (_, file, cb) => {
    cb(null, ALLOWED.test(path.extname(file.originalname)))
  },
})

// ── Helpers ─────────────────────────────────────────────────────────────────
function walkUploads(dir, base = '') {
  const entries = []
  if (!fs.existsSync(dir)) return entries
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f)
    const rel  = base ? `${base}/${f}` : f
    if (fs.statSync(full).isDirectory()) {
      entries.push(...walkUploads(full, rel))
    } else {
      const stat = fs.statSync(full)
      const ext  = path.extname(f).toLowerCase()
      entries.push({
        name: f, folder: base || 'misc', path: rel,
        url: `/uploads/${rel}`,
        size: stat.size, mtime: stat.mtime,
        type: /\.(mp4|webm|mov|avi|mkv)$/.test(ext) ? 'video'
            : /\.(jpg|jpeg|png|gif|svg|webp)$/.test(ext) ? 'image' : 'file',
      })
    }
  }
  return entries
}

// GET /api/content  — list sections (admin)
router.get('/', protect, (req, res) => res.json(listSections()))

// GET /api/media  — list all uploaded files (admin)
router.get('/media', protect, (req, res) => {
  res.json(walkUploads(UPLOADS_DIR))
})

// DELETE /api/content/media/:folder/:filename
router.delete('/media/:folder/:filename', protect, (req, res) => {
  const fp = path.join(UPLOADS_DIR, req.params.folder, req.params.filename)
  if (fs.existsSync(fp)) fs.unlinkSync(fp)
  res.json({ message: 'Deleted' })
})

// GET /api/content/:key  — public
router.get('/:key', (req, res) => {
  const doc = getSection(req.params.key)
  if (!doc) return res.status(404).json({ message: 'Section not found' })
  res.json(doc)
})

// PUT /api/content/:key  — admin
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
  const apiUrl = process.env.API_URL || `http://localhost:${process.env.PORT || 4000}`
  const url = `${apiUrl}/uploads/${req.params.folder}/${req.file.filename}`
  res.json({
    url, filename: req.file.filename, folder: req.params.folder,
    type: /\.(mp4|webm|mov|avi|mkv)$/.test(path.extname(req.file.filename)) ? 'video' : 'image',
  })
})

// DELETE /api/content/upload/:folder/:filename
router.delete('/upload/:folder/:filename', protect, (req, res) => {
  const fp = path.join(UPLOADS_DIR, req.params.folder, req.params.filename)
  if (fs.existsSync(fp)) fs.unlinkSync(fp)
  res.json({ message: 'Deleted' })
})

module.exports = router
