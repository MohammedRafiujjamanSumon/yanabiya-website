const express = require('express')
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3')
const { getProvider } = require('../providers')
const protect = require('../middleware/auth')
const router = express.Router()

// In-memory job store (persists for server lifetime; replace with DB if needed)
const jobs = new Map()

function makeJobId() {
  return `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

// ─── POST /api/ai-video/generate ─────────────────────────────────────────────
// Body: { prompt, referenceUrl, aspectRatio, style, quality, durationSec }
router.post('/generate', protect, async (req, res) => {
  const provider = getProvider()
  if (!provider) {
    return res.json({
      demo: true,
      message: 'No AI video provider configured. Add RUNWAY_API_KEY or LUMA_API_KEY to your .env file.',
      jobId: null,
    })
  }

  const {
    prompt = '',
    referenceUrl = null,
    aspectRatio = '16:9',
    style = 'cinematic',
    quality = 'high',
    durationSec = 10,
  } = req.body

  if (!prompt.trim()) return res.status(400).json({ message: 'Prompt is required' })

  // Split into 10-second clips
  const clipDuration = 10
  const totalClips = Math.max(1, Math.ceil(durationSec / clipDuration))
  const jobId = makeJobId()

  const job = {
    jobId,
    prompt,
    referenceUrl,
    aspectRatio,
    style,
    quality,
    durationSec,
    totalClips,
    clips: Array.from({ length: totalClips }, (_, i) => ({
      index: i,
      status: i === 0 ? 'queued' : 'waiting',
      taskId: null,
      outputUrl: null,
      progress: 0,
      error: null,
    })),
    status: 'processing',
    createdAt: new Date().toISOString(),
    completedAt: null,
    finalUrls: [],
  }

  jobs.set(jobId, job)
  res.json({ jobId, totalClips, status: 'processing' })

  // Start chain in background (non-blocking)
  runChain(job, provider).catch(err => {
    console.error(`[aiVideo] chain error for ${jobId}:`, err.message)
    job.status = 'failed'
    job.clips[0].error = err.message
  })
})

// ─── GET /api/ai-video/status/:jobId ─────────────────────────────────────────
router.get('/status/:jobId', protect, (req, res) => {
  const job = jobs.get(req.params.jobId)
  if (!job) return res.status(404).json({ message: 'Job not found' })
  res.json({
    jobId: job.jobId,
    status: job.status,
    totalClips: job.totalClips,
    clips: job.clips,
    finalUrls: job.finalUrls,
    createdAt: job.createdAt,
    completedAt: job.completedAt,
  })
})

// ─── POST /api/ai-video/save ──────────────────────────────────────────────────
// Saves all generated clips to S3 media library
router.post('/save', protect, async (req, res) => {
  const { jobId } = req.body
  const job = jobs.get(jobId)
  if (!job) return res.status(404).json({ message: 'Job not found' })
  if (job.status !== 'completed') return res.status(400).json({ message: 'Job not completed yet' })

  const saved = []
  for (const url of job.finalUrls) {
    try {
      const savedUrl = await saveToS3(url, job.jobId)
      saved.push(savedUrl)
    } catch (e) {
      console.error('[aiVideo] save error:', e.message)
    }
  }

  res.json({ saved })
})

// ─── GET /api/ai-video/history ────────────────────────────────────────────────
router.get('/history', protect, (req, res) => {
  const history = []
  for (const [, job] of jobs) {
    history.push({
      jobId: job.jobId,
      prompt: job.prompt,
      status: job.status,
      totalClips: job.totalClips,
      finalUrls: job.finalUrls,
      createdAt: job.createdAt,
      completedAt: job.completedAt,
      aspectRatio: job.aspectRatio,
    })
  }
  // Newest first
  history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  res.json(history)
})

// ─── GET /api/ai-video/provider ───────────────────────────────────────────────
router.get('/provider', protect, (req, res) => {
  const provider = getProvider()
  const name = (process.env.AI_VIDEO_PROVIDER || '').toLowerCase()
  const configured = !!provider
  const activeName = !configured ? null
    : process.env.RUNWAY_API_KEY && (name === 'runway' || !name) ? 'Runway ML'
    : process.env.LUMA_API_KEY ? 'Luma AI'
    : null
  res.json({ configured, provider: activeName })
})

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function runChain(job, provider) {
  for (let i = 0; i < job.totalClips; i++) {
    const clip = job.clips[i]
    clip.status = 'generating'

    // Use the previous clip's last frame as reference (if available)
    const referenceUrl = i === 0 ? job.referenceUrl : job.clips[i - 1].outputUrl

    try {
      const { taskId } = await provider.generateClip({
        prompt: job.prompt,
        referenceImageUrl: referenceUrl,
        duration: 10,
        aspectRatio: job.aspectRatio,
        style: job.style,
      })
      clip.taskId = taskId

      // Poll until done
      const outputUrl = await pollUntilDone(provider, taskId, clip)
      clip.outputUrl = outputUrl
      clip.status = 'completed'
      clip.progress = 100
      job.finalUrls.push(outputUrl)
    } catch (err) {
      clip.status = 'failed'
      clip.error = err.message
      job.status = 'failed'
      return
    }
  }
  job.status = 'completed'
  job.completedAt = new Date().toISOString()
}

async function pollUntilDone(provider, taskId, clip) {
  const maxWait = 10 * 60 * 1000 // 10 minutes
  const interval = 4000
  const start = Date.now()

  while (Date.now() - start < maxWait) {
    await sleep(interval)
    const result = await provider.pollStatus(taskId)
    clip.progress = result.progress

    if (result.status === 'completed') return result.outputUrl
    if (result.status === 'failed') throw new Error(result.error || 'Generation failed')
  }
  throw new Error('Timed out waiting for video generation')
}

async function saveToS3(videoUrl, jobId) {
  const bucket = process.env.S3_BUCKET
  const region = process.env.AWS_REGION || 'us-east-1'
  if (!bucket) throw new Error('S3_BUCKET not configured')

  const fetchFn = (...args) => import('node-fetch').then(m => m.default(...args)).catch(() => globalThis.fetch(...args))
  const response = await fetchFn(videoUrl)
  const buffer = Buffer.from(await response.arrayBuffer())

  const key = `uploads/ai-video/${jobId}-${Date.now()}.mp4`
  const s3 = new S3Client({ region })
  await s3.send(new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    Body: buffer,
    ContentType: 'video/mp4',
  }))

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)) }

module.exports = router
