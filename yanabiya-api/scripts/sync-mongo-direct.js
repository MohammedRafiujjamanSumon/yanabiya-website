#!/usr/bin/env node
// Direct MongoDB sync — reads all local content JSON files and upserts to Atlas
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const fs      = require('fs')
const path    = require('path')
const mongoose = require('mongoose')

const URI_B64 = 'bW9uZ29kYitzcnY6Ly95YW5hYml5YTpTdW1vbiU0MDMyMSUyM0B5YW5hYml5YS5ndHdjNXIzLm1vbmdvZGIubmV0L3lhbmFiaXlhP3JldHJ5V3JpdGVzPXRydWUmdz1tYWpvcml0eSZhcHBOYW1lPXlhbmFiaXlh'
const MONGO_URI = process.env.MONGO_URI || Buffer.from(URI_B64, 'base64').toString('utf8')

const CONTENT_DIR = path.join(__dirname, '../data/content')

const ContentSchema = new mongoose.Schema({
  key:       { type: String, required: true, unique: true },
  data:      { type: mongoose.Schema.Types.Mixed },
  updatedBy: String,
  updatedAt: Date,
  createdAt: Date,
})
const Content = mongoose.model('Content', ContentSchema)

async function main() {
  console.log('\n🔗 Connecting to MongoDB Atlas...')
  await mongoose.connect(MONGO_URI, { family: 4 })
  console.log('✓ Connected\n')

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
  console.log(`📦 Syncing ${files.length} content documents...\n`)

  let ok = 0, fail = 0
  for (const file of files) {
    const raw  = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
    const key  = raw.key || file.replace('.json', '')
    const data = raw.data
    if (!data) { console.log(`  ⚠ skip ${file} (no data field)`); continue }

    try {
      await Content.findOneAndUpdate(
        { key },
        { key, data, updatedBy: 'sync', updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      )
      console.log(`  ✓ ${key}`)
      ok++
    } catch (e) {
      console.log(`  ✗ ${key} → ${e.message}`)
      fail++
    }
  }

  console.log(`\n✅ ${ok} synced, ${fail} failed`)
  await mongoose.disconnect()
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1) })
