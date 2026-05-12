const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')
const { useFile, mongoose } = require('../db')

// ── File storage paths (local dev) ──────────────────────────────────────────
const PAGES_DIR = path.join(__dirname, '../../data/pages')
if (useFile) fs.mkdirSync(PAGES_DIR, { recursive: true })
const pagePath = (slug) => path.join(PAGES_DIR, `${slug}.json`)

// ── Mongoose schema (production) ────────────────────────────────────────────
let Page
if (!useFile) {
  const schema = new mongoose.Schema({
    _id: { type: String },
    id: { type: String },
    slug: { type: String, required: true },
    title: { type: String, default: '' },
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    status: { type: String, default: 'draft' },
    parentSlug: { type: String, default: null },
    template: { type: String, default: 'default' },
    heroImage: { type: String, default: '' },
    sections: { type: mongoose.Schema.Types.Mixed, default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  })
  Page = mongoose.model('Page', schema)
}

// ── Public API ───────────────────────────────────────────────────────────────
async function savePage(slug, data) {
  const existing = await getPage(slug) || {}
  const doc = {
    id: existing.id || data.id || randomUUID(),
    slug,
    title: data.title || slug,
    metaTitle: data.metaTitle ?? existing.metaTitle ?? '',
    metaDescription: data.metaDescription ?? existing.metaDescription ?? '',
    status: data.status ?? existing.status ?? 'draft',
    parentSlug: data.parentSlug !== undefined ? data.parentSlug : (existing.parentSlug ?? null),
    template: data.template ?? existing.template ?? 'default',
    heroImage: data.heroImage ?? existing.heroImage ?? '',
    sections: data.sections ?? existing.sections ?? [],
    createdAt: existing.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  if (useFile) {
    fs.writeFileSync(pagePath(slug), JSON.stringify(doc, null, 2))
    return doc
  }
  await Page.findByIdAndUpdate(slug, { _id: slug, ...doc }, { upsert: true, new: true })
  return doc
}

async function getPage(slug) {
  if (useFile) {
    const fp = pagePath(slug)
    return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : null
  }
  return Page.findById(slug).lean()
}

async function listPages() {
  let pages
  if (useFile) {
    if (!fs.existsSync(PAGES_DIR)) return []
    pages = fs.readdirSync(PAGES_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(PAGES_DIR, f), 'utf8')))
  } else {
    pages = await Page.find({}).lean()
  }
  return pages
    .map(p => ({ id: p.id, slug: p.slug, title: p.title, status: p.status, parentSlug: p.parentSlug, template: p.template, updatedAt: p.updatedAt, sectionCount: p.sections?.length || 0 }))
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

async function deletePage(slug) {
  if (useFile) {
    const fp = pagePath(slug)
    if (fs.existsSync(fp)) fs.unlinkSync(fp)
    return
  }
  await Page.findByIdAndDelete(slug)
}

async function renamePage(oldSlug, newSlug) {
  const page = await getPage(oldSlug)
  if (!page) return null
  const updated = { ...page, slug: newSlug, updatedAt: new Date().toISOString() }
  if (useFile) {
    fs.writeFileSync(pagePath(newSlug), JSON.stringify(updated, null, 2))
    fs.unlinkSync(pagePath(oldSlug))
    return updated
  }
  await Page.create({ _id: newSlug, ...updated })
  await Page.findByIdAndDelete(oldSlug)
  return updated
}

module.exports = { savePage, getPage, listPages, deletePage, renamePage }
