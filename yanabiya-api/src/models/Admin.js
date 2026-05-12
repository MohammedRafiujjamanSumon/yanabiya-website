const bcrypt = require('bcryptjs')
const { useFile, fileRead, fileWrite, mongoose } = require('../db')

// ── Mongoose schema (production) ────────────────────────────────────────────
let Admin
if (!useFile) {
  const schema = new mongoose.Schema({
    _id: { type: String, default: '1' },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, default: 'Admin' },
    role: { type: String, default: 'admin' },
  }, { timestamps: true })
  Admin = mongoose.model('Admin', schema)
}

// ── Public API ───────────────────────────────────────────────────────────────
async function getAdmin() {
  if (useFile) return fileRead('admin')
  return Admin.findById('1').lean()
}

async function createAdmin(email, password, name = 'Admin') {
  const hash = await bcrypt.hash(password, 12)
  if (useFile) {
    const admin = { id: '1', email: email.toLowerCase(), password: hash, name, role: 'admin', createdAt: new Date().toISOString() }
    fileWrite('admin', admin)
    return admin
  }
  return Admin.findByIdAndUpdate(
    '1',
    { email: email.toLowerCase(), password: hash, name, role: 'admin' },
    { upsert: true, new: true, lean: true, setDefaultsOnInsert: true }
  )
}

async function matchPassword(stored, entered) {
  return bcrypt.compare(entered, stored)
}

async function updatePassword(newPassword) {
  const hash = await bcrypt.hash(newPassword, 12)
  if (useFile) {
    const admin = fileRead('admin')
    if (!admin) throw new Error('Admin not found')
    fileWrite('admin', { ...admin, password: hash })
    return
  }
  const admin = await Admin.findByIdAndUpdate('1', { password: hash }, { new: true, lean: true })
  if (!admin) throw new Error('Admin not found')
}

module.exports = { getAdmin, createAdmin, matchPassword, updatePassword }
