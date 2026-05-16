function getProvider() {
  const name = (process.env.AI_VIDEO_PROVIDER || '').toLowerCase()

  if (name === 'luma' && process.env.LUMA_API_KEY) return require('./luma')
  if (name === 'runway' && process.env.RUNWAY_API_KEY) return require('./runway')

  // Auto-detect: use whichever key is present
  if (process.env.RUNWAY_API_KEY) return require('./runway')
  if (process.env.LUMA_API_KEY) return require('./luma')

  return null
}

module.exports = { getProvider }
