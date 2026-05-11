const fs = require('fs')
const path = require('path')
const { randomUUID } = require('crypto')

const PAGES_DIR = path.join(__dirname, '../../data/pages')
fs.mkdirSync(PAGES_DIR, { recursive: true })

function pagePath(slug) {
  return path.join(PAGES_DIR, `${slug}.json`)
}

// Create or update a page
function savePage(slug, data) {
  const existing = getPage(slug) || {}
  const page = {
    id: existing.id || randomUUID(),
    slug,
    title: data.title || slug,
    metaTitle: data.metaTitle || '',
    metaDescription: data.metaDescription || '',
    status: data.status || 'draft',
    parentSlug: data.parentSlug || null,
    template: data.template || 'default',
    heroImage: data.heroImage || '',
    sections: data.sections || existing.sections || [],
    createdAt: existing.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  fs.writeFileSync(pagePath(slug), JSON.stringify(page, null, 2))
  return page
}

function getPage(slug) {
  const fp = pagePath(slug)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

function listPages() {
  if (!fs.existsSync(PAGES_DIR)) return []
  return fs.readdirSync(PAGES_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const p = JSON.parse(fs.readFileSync(path.join(PAGES_DIR, f), 'utf8'))
      return { id: p.id, slug: p.slug, title: p.title, status: p.status, parentSlug: p.parentSlug, template: p.template, updatedAt: p.updatedAt, sectionCount: p.sections?.length || 0 }
    })
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

function deletePage(slug) {
  const fp = pagePath(slug)
  if (fs.existsSync(fp)) fs.unlinkSync(fp)
}

// Rename (change slug) — copy + delete
function renamePage(oldSlug, newSlug) {
  const page = getPage(oldSlug)
  if (!page) return null
  const updated = { ...page, slug: newSlug, updatedAt: new Date().toISOString() }
  fs.writeFileSync(pagePath(newSlug), JSON.stringify(updated, null, 2))
  fs.unlinkSync(pagePath(oldSlug))
  return updated
}

module.exports = { savePage, getPage, listPages, deletePage, renamePage }
