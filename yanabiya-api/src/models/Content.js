const fs = require('fs')
const path = require('path')
const { useFile, mongoose } = require('../db')

// ── File storage paths (local dev) ──────────────────────────────────────────
const CONTENT_DIR = path.join(__dirname, '../../data/content')
if (useFile) fs.mkdirSync(CONTENT_DIR, { recursive: true })
const contentPath = (key) => path.join(CONTENT_DIR, `${key}.json`)

// ── Mongoose schema (production) ────────────────────────────────────────────
let Content
if (!useFile) {
  const schema = new mongoose.Schema({
    _id: { type: String },
    key: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed },
    updatedBy: { type: String },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
  })
  Content = mongoose.model('Content', schema)
}

// ── Public API ───────────────────────────────────────────────────────────────
async function getSection(key) {
  if (useFile) {
    const fp = contentPath(key)
    return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : null
  }
  return Content.findById(key).lean()
}

async function setSection(key, data, updatedBy = 'admin') {
  const now = new Date()
  if (useFile) {
    const existing = await getSection(key) || {}
    const doc = { key, data, updatedBy, updatedAt: now.toISOString(), createdAt: existing.createdAt || now.toISOString() }
    fs.writeFileSync(contentPath(key), JSON.stringify(doc, null, 2))
    return doc
  }
  return Content.findByIdAndUpdate(
    key,
    { key, data, updatedBy, updatedAt: now, $setOnInsert: { _id: key, createdAt: now } },
    { upsert: true, new: true, lean: true }
  )
}

async function listSections() {
  if (useFile) {
    if (!fs.existsSync(CONTENT_DIR)) return []
    return fs.readdirSync(CONTENT_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'))
        return { key: raw.key, updatedAt: raw.updatedAt, updatedBy: raw.updatedBy }
      })
  }
  const docs = await Content.find({}, { key: 1, updatedAt: 1, updatedBy: 1 }).lean()
  return docs.map(d => ({ key: d.key || d._id, updatedAt: d.updatedAt, updatedBy: d.updatedBy }))
}

module.exports = { getSection, setSection, listSections }
