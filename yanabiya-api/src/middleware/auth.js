const jwt = require('jsonwebtoken')
const { getAdmin } = require('../models/Admin')

module.exports = (req, res, next) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorisation denied' })
  }
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.JWT_SECRET)
    const admin = getAdmin()
    if (!admin || admin.id !== decoded.id) {
      return res.status(401).json({ message: 'Admin not found' })
    }
    req.admin = { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
    next()
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' })
  }
}
