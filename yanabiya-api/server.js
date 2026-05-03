require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const authRoutes = require('./src/routes/auth')
const contentRoutes = require('./src/routes/content')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://mohammedrafiujjamansumon.github.io',
]
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true)
    cb(new Error('CORS blocked'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.get('/api/health', (_, res) => res.json({ status: 'ok', ts: new Date() }))

app.use((err, req, res, _next) => {
  console.error(err.message)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Yanabiya API running on port ${PORT}`))
