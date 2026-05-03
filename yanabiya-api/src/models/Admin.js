const bcrypt = require('bcryptjs')
const { read, write } = require('../db')

function getAdmin() {
  return read('admin')
}

async function createAdmin(email, password, name = 'Admin') {
  const hash = await bcrypt.hash(password, 12)
  const admin = { id: '1', email: email.toLowerCase(), password: hash, name, role: 'admin', createdAt: new Date().toISOString() }
  write('admin', admin)
  return admin
}

async function matchPassword(stored, entered) {
  return bcrypt.compare(entered, stored)
}

async function updatePassword(newPassword) {
  const admin = getAdmin()
  if (!admin) throw new Error('Admin not found')
  admin.password = await bcrypt.hash(newPassword, 12)
  write('admin', admin)
}

module.exports = { getAdmin, createAdmin, matchPassword, updatePassword }
