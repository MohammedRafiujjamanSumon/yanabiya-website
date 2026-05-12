const jwt = require('jsonwebtoken')
const { getAdmin } = require('../models/Admin')

const JWT_SECRET = process.env.JWT_SECRET || 'yanabiya_super_secret_jwt_key_2024_admin_panel'

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorisation denied' })
  }
  try {
    const decoded = jwt.verify(auth.split(' ')[1], JWT_SECRET)
    const admin = await getAdmin()
    if (!admin || (admin._id || admin.id) !== decoded.id) {
      return res.status(401).json({ message: 'Admin not found' })
    }
    req.admin = { id: admin._id || admin.id, email: admin.email, name: admin.name, role: admin.role }
    next()
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}
