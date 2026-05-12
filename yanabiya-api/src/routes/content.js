const router = require('express').Router()
const multer = require('multer')
const path = require('path')
const { S3Client, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { getSection, setSection, listSections } = require('../models/Content')
const protect = require('../middleware/auth')

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const BUCKET = process.env.S3_BUCKET
const REGION = process.env.AWS_REGION || 'us-east-1'

const ALLOWED = /\.(jpeg|jpg|png|gif|svg|webp|mp4|webm|mov|avi|mkv|pdf)$/i

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    cb(null, ALLOWED.test(path.extname(file.originalname)))
  },
})

function s3Url(key) {
  return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`
}

// GET /api/content  — list sections (admin)
router.get('/', protect, async (req, res) => {
  try {
    res.json(await listSections())
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/content/media  — list all uploaded files (admin)
router.get('/media', protect, async (req, res) => {
  if (!BUCKET) return res.status(503).json({ message: 'S3_BUCKET not configured on this server' })
  try {
    const result = await s3.send(new ListObjectsV2Command({ Bucket: BUCKET, Prefix: 'uploads/' }))
    const files = (result.Contents || [])
      .filter(obj => !obj.Key.endsWith('/'))
      .map(obj => {
        const parts = obj.Key.split('/')
        const name = parts[parts.length - 1]
        const folder = parts.length > 2 ? parts[1] : 'misc'
        const ext = path.extname(name).toLowerCase()
        return {
          name, folder,
          path: parts.slice(1).join('/'),
          url: s3Url(obj.Key),
          size: obj.Size,
          mtime: obj.LastModified,
          type: /\.(mp4|webm|mov|avi|mkv)$/.test(ext) ? 'video'
              : /\.(jpg|jpeg|png|gif|svg|webp)$/.test(ext) ? 'image' : 'file',
        }
      })
    res.json(files)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/content/media/:folder/:filename
router.delete('/media/:folder/:filename', protect, async (req, res) => {
  if (!BUCKET) return res.status(503).json({ message: 'S3_BUCKET not configured on this server' })
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: `uploads/${req.params.folder}/${req.params.filename}`,
    }))
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/content/:key  — public; returns empty data instead of 404 so CMS editors start clean
router.get('/:key', async (req, res) => {
  try {
    const doc = await getSection(req.params.key)
    if (!doc) return res.json({ key: req.params.key, data: null, updatedAt: null })
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// PUT /api/content/:key  — admin
router.put('/:key', protect, async (req, res) => {
  try {
    const doc = await setSection(req.params.key, req.body.data, req.admin.email)
    res.json(doc)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// POST /api/content/upload/:folder
router.post('/upload/:folder', protect, upload.single('file'), async (req, res) => {
  if (!BUCKET) return res.status(503).json({ message: 'S3_BUCKET not configured on this server' })
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const ext = path.extname(req.file.originalname)
    const base = path.basename(req.file.originalname, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase()
    const filename = `${base}-${Date.now()}${ext}`
    const key = `uploads/${req.params.folder}/${filename}`

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    }))

    const url = s3Url(key)
    const type = /\.(mp4|webm|mov|avi|mkv)$/.test(ext) ? 'video' : 'image'
    res.json({ url, filename, folder: req.params.folder, type })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/content/upload/:folder/:filename
router.delete('/upload/:folder/:filename', protect, async (req, res) => {
  if (!BUCKET) return res.status(503).json({ message: 'S3_BUCKET not configured on this server' })
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: `uploads/${req.params.folder}/${req.params.filename}`,
    }))
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
