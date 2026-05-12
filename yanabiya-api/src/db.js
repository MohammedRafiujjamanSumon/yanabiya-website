const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')

const useFile = !process.env.MONGO_URI

// ── File-based helpers (local dev) ──────────────────────────────────────────
const DB_DIR = path.join(__dirname, '../data')
if (useFile) fs.mkdirSync(DB_DIR, { recursive: true })

function filePath(name) { return path.join(DB_DIR, `${name}.json`) }
function fileRead(name) {
  const fp = filePath(name)
  return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : null
}
function fileWrite(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2))
}
function fileReadAll(name) {
  const fp = filePath(name)
  return fs.existsSync(fp) ? JSON.parse(fs.readFileSync(fp, 'utf8')) : []
}

// ── MongoDB helper ──────────────────────────────────────────────────────────
let connected = false
async function connect() {
  if (useFile) { console.log('Using local file storage (no MONGO_URI set)'); return }
  if (connected) return
  await mongoose.connect(process.env.MONGO_URI)
  connected = true
  console.log('MongoDB connected')
}

module.exports = { connect, mongoose, useFile, fileRead, fileWrite, fileReadAll, filePath }
