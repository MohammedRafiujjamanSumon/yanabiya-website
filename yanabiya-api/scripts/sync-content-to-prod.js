#!/usr/bin/env node
// Syncs all local content JSON files to the production API (MongoDB)
const fs   = require('fs')
const path = require('path')
const https = require('https')
const http  = require('http')

const API   = process.env.PROD_API || 'http://yanabiya-api-prod.eba-p9fy3wmy.eu-west-1.elasticbeanstalk.com'
const EMAIL = process.env.ADMIN_EMAIL || 'admin@yanabiyagroup.com'
const PASS  = process.env.ADMIN_PASSWORD || 'YanabiyaAdmin@2024'
const CONTENT_DIR = path.join(__dirname, '../data/content')

function request(method, url, body, token) {
  return new Promise((resolve, reject) => {
    const u = new URL(url)
    const lib = u.protocol === 'https:' ? https : http
    const data = body ? JSON.stringify(body) : null
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    if (data)  headers['Content-Length'] = Buffer.byteLength(data)
    const req = lib.request({ hostname: u.hostname, port: u.port || (u.protocol === 'https:' ? 443 : 80), path: u.pathname + u.search, method, headers }, res => {
      let buf = ''
      res.on('data', d => buf += d)
      res.on('end', () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(buf) }) }
        catch { resolve({ status: res.statusCode, body: buf }) }
      })
    })
    req.on('error', reject)
    if (data) req.write(data)
    req.end()
  })
}

async function main() {
  console.log(`\n🔐 Logging in to ${API}`)
  const login = await request('POST', `${API}/api/auth/login`, { email: EMAIL, password: PASS })
  if (!login.body.token) {
    console.error('Login failed:', login.body); process.exit(1)
  }
  const token = login.body.token
  console.log('✓ Logged in\n')

  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.json'))
  console.log(`📦 Syncing ${files.length} content files...\n`)

  let ok = 0, fail = 0
  for (const file of files) {
    const raw  = JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'))
    const key  = raw.key || file.replace('.json', '')
    const data = raw.data
    if (!data) { console.log(`  ⚠ skip ${file} (no data field)`); continue }

    const res = await request('PUT', `${API}/api/content/${key}`, { data }, token)
    if (res.status === 200) {
      console.log(`  ✓ ${key}`)
      ok++
    } else {
      console.log(`  ✗ ${key} → ${res.status}`, JSON.stringify(res.body).slice(0, 80))
      fail++
    }
  }

  console.log(`\n${ok} synced, ${fail} failed`)
}

main().catch(e => { console.error(e); process.exit(1) })
