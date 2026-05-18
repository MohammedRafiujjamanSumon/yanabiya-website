function getProvider() {
  const name = (process.env.AI_VIDEO_PROVIDER || '').toLowerCase()

  const tryPython = () => {
    const p = require('./python_local')
    return p.available ? p : null
  }

  // Explicit selection (only honoured if matching key is present)
  if (name === 'fal'    && (process.env.FAL_KEY || process.env.FAL_API_KEY)) return require('./fal')
  if (name === 'luma'   && process.env.LUMA_API_KEY)   return require('./luma')
  if (name === 'runway' && process.env.RUNWAY_API_KEY) return require('./runway')
  if (name === 'python' || name === 'local' || name === 'pollinations') {
    return tryPython()
  }

  // Auto-detect: prefer paid keys (real motion), fall back to free local slideshow
  if (process.env.FAL_KEY || process.env.FAL_API_KEY) return require('./fal')      // real motion, $1 free
  if (process.env.RUNWAY_API_KEY) return require('./runway')
  if (process.env.LUMA_API_KEY)   return require('./luma')

  return tryPython()   // Available locally, null on AWS without Python
}

module.exports = { getProvider }
