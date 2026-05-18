/**
 * fal.ai provider — REAL motion video generation.
 *
 * Setup:
 *   1. Sign up free at https://fal.ai (gets $1 free credits ≈ 10–20 videos)
 *   2. Get API key at https://fal.ai/dashboard/keys
 *   3. Add to yanabiya-api/.env:
 *        FAL_KEY=fal_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
 *
 * Uses Stable Video Diffusion (SVD) for image-to-video — produces 4-second
 * clips with real camera/subject motion. Chain multiple clips for longer
 * videos.
 */
const fetchFn = (...args) =>
  globalThis.fetch
    ? globalThis.fetch(...args)
    : import('node-fetch').then(m => m.default(...args))

const FAL_KEY    = () => process.env.FAL_KEY || process.env.FAL_API_KEY || ''
// Stable Video Diffusion endpoint on fal.ai
const FAL_URL    = 'https://fal.run/fal-ai/stable-video'

const tasks = new Map()

async function generateClip({
  prompt,
  referenceImageUrl,
  duration = 4,           // SVD is fixed at 4 seconds
  aspectRatio = '16:9',
  style = 'cinematic',
} = {}) {
  const key = FAL_KEY()
  if (!key) throw new Error('FAL_KEY not configured in .env')

  // SVD needs an INPUT IMAGE — if none provided, generate one from Pollinations first
  let inputImageUrl = referenceImageUrl
  if (!inputImageUrl) {
    const enc = encodeURIComponent(`${prompt}, ${style}, high quality`)
    inputImageUrl = `https://image.pollinations.ai/prompt/${enc}?width=1024&height=576&nologo=true&enhance=true`
  }

  const taskId = `fal_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  tasks.set(taskId, { status: 'generating', progress: 5, outputUrl: null, error: null })

  // Fire async — pollStatus reports when done
  ;(async () => {
    try {
      tasks.set(taskId, { status: 'generating', progress: 30, outputUrl: null, error: null })

      const response = await fetchFn(FAL_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${key}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image_url: inputImageUrl,
          motion_bucket_id: 127,    // motion intensity (1-255; 127 = medium)
          cond_aug: 0.02,           // motion strength
          fps: 24,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        throw new Error(`fal.ai ${response.status}: ${errText.slice(0, 300)}`)
      }

      const data = await response.json()
      const videoUrl = data?.video?.url || data?.url
      if (!videoUrl) throw new Error('fal.ai response missing video URL')

      tasks.set(taskId, { status: 'completed', progress: 100, outputUrl: videoUrl, error: null })
    } catch (err) {
      tasks.set(taskId, { status: 'failed', progress: 0, outputUrl: null, error: err.message })
    }
  })()

  return { taskId }
}

async function pollStatus(taskId) {
  const t = tasks.get(taskId)
  if (!t) return { status: 'failed', progress: 0, outputUrl: null, error: 'task not found' }
  if (t.status === 'generating' && t.progress < 90) {
    t.progress = Math.min(90, t.progress + 5)
  }
  return { status: t.status, progress: t.progress, outputUrl: t.outputUrl, error: t.error }
}

module.exports = {
  name: 'fal-ai-svd',
  generateClip,
  pollStatus,
}
