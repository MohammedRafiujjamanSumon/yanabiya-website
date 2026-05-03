const fs = require('fs')
const path = require('path')

const DB_DIR = path.join(__dirname, '../data')
fs.mkdirSync(DB_DIR, { recursive: true })

function filePath(name) {
  return path.join(DB_DIR, `${name}.json`)
}

function read(name) {
  const fp = filePath(name)
  if (!fs.existsSync(fp)) return null
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

function write(name, data) {
  fs.writeFileSync(filePath(name), JSON.stringify(data, null, 2))
}

function readAll(name) {
  const fp = filePath(name)
  if (!fs.existsSync(fp)) return []
  return JSON.parse(fs.readFileSync(fp, 'utf8'))
}

module.exports = { read, write, readAll, filePath }
