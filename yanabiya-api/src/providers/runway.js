const fetch = (...args) => import('node-fetch').then(m => m.default(...args)).catch(() => {
  // fallback: try built-in fetch (Node 18+)
  return globalThis.fetch(...args)
})

const BASE = 'https://api.dev.runwayml.com/v1'

async function generateClip({ prompt, referenceImageUrl, duration = 10, aspectRatio = '16:9', style = 'cinematic' }) {
  const apiKey = process.env.RUNWAY_API_KEY
  if (!apiKey) throw new Error('RUNWAY_API_KEY not configured')

  const body = {
    model: 'gen3a_turbo',
    promptText: style !== 'cinematic' ? `${style} style: ${prompt}` : prompt,
    duration,
    ratio: aspectRatio === '16:9' ? '1280:768' : aspectRatio === '9:16' ? '768:1280' : '768:768',
  }
  if (referenceImageUrl) body.promptImage = referenceImageUrl

  const res = await fetch(`${BASE}/image_to_video`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'X-Runway-Version': '2024-11-06',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Runway API error: ${res.status}`)
  }
  const data = await res.json()
  return { taskId: data.id, provider: 'runway' }
}

async function pollStatus(taskId) {
  const apiKey = process.env.RUNWAY_API_KEY
  if (!apiKey) throw new Error('RUNWAY_API_KEY not configured')

  const res = await fetch(`${BASE}/tasks/${taskId}`, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'X-Runway-Version': '2024-11-06',
    },
  })
  if (!res.ok) throw new Error(`Runway status error: ${res.status}`)
  const data = await res.json()

  // Runway statuses: PENDING, RUNNING, SUCCEEDED, FAILED, CANCELLED
  const status = data.status === 'SUCCEEDED' ? 'completed'
    : data.status === 'FAILED' || data.status === 'CANCELLED' ? 'failed'
    : 'processing'

  return {
    status,
    progress: data.progress ? Math.round(data.progress * 100) : (status === 'completed' ? 100 : 0),
    outputUrl: data.output?.[0] || null,
    error: data.failure || null,
  }
}

module.exports = { generateClip, pollStatus }
