const fetch = (...args) => import('node-fetch').then(m => m.default(...args)).catch(() => globalThis.fetch(...args))

const BASE = 'https://api.lumalabs.ai/dream-machine/v1'

async function generateClip({ prompt, referenceImageUrl, duration = 10, aspectRatio = '16:9', style = 'cinematic' }) {
  const apiKey = process.env.LUMA_API_KEY
  if (!apiKey) throw new Error('LUMA_API_KEY not configured')

  const fullPrompt = style !== 'cinematic' ? `${style} style: ${prompt}` : prompt

  const body = {
    prompt: fullPrompt,
    aspect_ratio: aspectRatio,
    loop: false,
  }
  if (referenceImageUrl) {
    body.keyframes = {
      frame0: { type: 'image', url: referenceImageUrl },
    }
  }

  const res = await fetch(`${BASE}/generations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `Luma API error: ${res.status}`)
  }
  const data = await res.json()
  return { taskId: data.id, provider: 'luma' }
}

async function pollStatus(taskId) {
  const apiKey = process.env.LUMA_API_KEY
  if (!apiKey) throw new Error('LUMA_API_KEY not configured')

  const res = await fetch(`${BASE}/generations/${taskId}`, {
    headers: { 'Authorization': `Bearer ${apiKey}` },
  })
  if (!res.ok) throw new Error(`Luma status error: ${res.status}`)
  const data = await res.json()

  const status = data.state === 'completed' ? 'completed'
    : data.state === 'failed' ? 'failed'
    : 'processing'

  return {
    status,
    progress: status === 'completed' ? 100 : status === 'failed' ? 0 : 50,
    outputUrl: data.assets?.video || null,
    error: data.failure_reason || null,
  }
}

module.exports = { generateClip, pollStatus }
