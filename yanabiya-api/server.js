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
  '.s3-website-eu-west-1.amazonaws.com',
  '.s3-website.eu-west-1.amazonaws.com',
  '.s3.eu-west-1.amazonaws.com',
  '.cloudfront.net',
]

// Open CORS: API uses JWT in Authorization header (not cookies) so any
// origin can call it. Setting credentials:false lets the browser allow
// requests from networks/proxies that strip the Origin header too.
app.use(cors({
  origin: true,        // reflect request origin (works with credentials:false)
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
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

async function autoSeedAdmin() {
  try {
    const { getAdmin, createAdmin, matchPassword } = require('./src/models/Admin')
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return
    const existing = await getAdmin()
    // First-time setup OR force-sync when env vars don't match the DB record.
    // The env vars are the source of truth for credentials.
    let needsSync = !existing
    if (existing) {
      const emailDiff = existing.email !== process.env.ADMIN_EMAIL.toLowerCase()
      const passOk = await matchPassword(existing.password, process.env.ADMIN_PASSWORD).catch(() => false)
      needsSync = emailDiff || !passOk
    }
    if (needsSync) {
      await createAdmin(process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD)
      console.log(`Admin user synced from env vars: ${process.env.ADMIN_EMAIL}`)
    }
  } catch (err) {
    console.error('Auto-seed failed:', err.message)
  }
}

connect()
  .then(autoSeedAdmin)
  .then(() => app.listen(PORT, () => console.log(`Yanabiya API running on port ${PORT}`)))
  .catch(err => { console.error('MongoDB connection failed:', err.message); process.exit(1) })
