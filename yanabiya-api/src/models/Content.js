const { read, write, readAll, filePath } = require('../db')
const fs = require('fs')
const path = require('path')

const CONTENT_DIR = path.join(__dirname, '../../data/content')
fs.mkdirSync(CONTENT_DIR, { recursive: true })

function contentPath(key) {
  return path.join(CONTENT_DIR, `${key}.json`)
}

function getSection(key) {
  const fp = contentPath(key)
  if (!fs.existsSync(fp)) return null
  const raw = JSON.parse(fs.readFileSync(fp, 'utf8'))
  return raw
}

function setSection(key, data, updatedBy = 'admin') {
  const existing = getSection(key) || {}
  const doc = { key, data, updatedBy, updatedAt: new Date().toISOString(), createdAt: existing.createdAt || new Date().toISOString() }
  fs.writeFileSync(contentPath(key), JSON.stringify(doc, null, 2))
  return doc
}

function listSections() {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => {
      const raw = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, f), 'utf8'))
      return { key: raw.key, updatedAt: raw.updatedAt, updatedBy: raw.updatedBy }
    })
}

module.exports = { getSection, setSection, listSections }
