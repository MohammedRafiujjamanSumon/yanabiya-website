require('dotenv').config({ path: require('path').join(__dirname, '.env') })
const express = require('express')
const cors = require('cors')
const { connect } = require('./src/db')

const authRoutes = require('./src/routes/auth')
const contentRoutes = require('./src/routes/content')
const pagesRoutes = require('./src/routes/pages')
const messagesRoutes = require('./src/routes/messages')
const aiVideoRoutes = require('./src/routes/aiVideo')
const aiVideoConfigRoutes = require('./src/routes/aiVideoConfig')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5175',
  'http://localhost:4173',
  'https://mohammedrafiujjamansumon.github.io',
  process.env.FRONTEND_URL,
].filter(Boolean)

// Trusted production domain patterns
const trustedPatterns = [
  '.yanabiyagroup.com',
  '.amplifyapp.com',
  '.awsapprunner.com',
]

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true)
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) return cb(null, true)
    if (trustedPatterns.some(p => origin.includes(p))) return cb(null, true)
    if (allowedOrigins.some(o => origin.startsWith(o))) return cb(null, true)
    cb(new Error('CORS blocked'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use('/api/content', contentRoutes)
app.use('/api/pages', pagesRoutes)
app.use('/api/messages', messagesRoutes)
app.use('/api/ai-video', aiVideoRoutes)
app.use('/api/ai-video-config', aiVideoConfigRoutes)
app.get('/api/health', (_, res) => {
  const { useFile } = require('./src/db')
  res.json({ status: 'ok', ts: new Date(), mode: useFile ? 'file' : 'mongodb' })
})

app.use((err, req, res, _next) => {
  console.error(err.message)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

const PORT = process.env.PORT || 4000

connect()
  .then(() => app.listen(PORT, () => console.log(`Yanabiya API running on port ${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1) })
