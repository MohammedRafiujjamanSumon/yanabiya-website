/**
 * Admin endpoint to save AI video provider configuration.
 * Stores API keys via the same Content store used by CMS (MongoDB on AWS,
 * local files in dev). No .env editing or server restart needed.
 */
const express = require('express')
const protect = require('../middleware/auth')
const { getSection, setSection } = require('../models/Content')
const router = express.Router()

const SECTION_KEY = 'ai-video-config'

async function loadConfig() {
  try {
    const doc = await getSection(SECTION_KEY)
    return doc?.data || { provider: 'auto', falKey: '', hfToken: '', replicateToken: '' }
  } catch (e) {
    console.error('[aiVideoConfig] load error:', e.message)
    return { provider: 'auto', falKey: '', hfToken: '', replicateToken: '' }
  }
}

function applyToEnv(cfg) {
  if (cfg.falKey)         process.env.FAL_KEY = cfg.falKey
  if (cfg.hfToken)        process.env.HF_TOKEN = cfg.hfToken
  if (cfg.replicateToken) process.env.REPLICATE_TOKEN = cfg.replicateToken
  if (cfg.provider && cfg.provider !== 'auto') {
    process.env.AI_VIDEO_PROVIDER = cfg.provider
  }
}

async function saveConfig(cfg, updatedBy) {
  await setSection(SECTION_KEY, cfg, updatedBy || 'admin')
  applyToEnv(cfg)
}

// Boot-time hydration: load config and apply to env. Best-effort — silently
// no-ops if DB isn't ready yet (will reapply on first save).
loadConfig().then(applyToEnv).catch(() => {})

// GET /api/ai-video-config — returns current config (masks keys)
router.get('/', protect, async (req, res) => {
  const cfg = await loadConfig()
  const mask = (k) => k ? `${k.slice(0, 8)}…${k.slice(-4)}` : ''
  res.json({
    provider: cfg.provider || 'auto',
    falKey:   cfg.falKey ? mask(cfg.falKey) : '',
    hfToken:  cfg.hfToken ? mask(cfg.hfToken) : '',
    replicateToken: cfg.replicateToken ? mask(cfg.replicateToken) : '',
    hasFalKey:    !!cfg.falKey,
    hasHfToken:   !!cfg.hfToken,
    hasReplicate: !!cfg.replicateToken,
  })
})

// PUT /api/ai-video-config — save config
router.put('/', protect, async (req, res) => {
  try {
    const { provider, falKey, hfToken, replicateToken } = req.body || {}
    const current = await loadConfig()
    const next = {
      provider: provider || current.provider || 'auto',
      // Only update keys if they're not masked (don't overwrite with mask placeholder)
      falKey:         (falKey         && !falKey.includes('…'))         ? falKey         : current.falKey,
      hfToken:        (hfToken        && !hfToken.includes('…'))        ? hfToken        : current.hfToken,
      replicateToken: (replicateToken && !replicateToken.includes('…')) ? replicateToken : current.replicateToken,
    }
    await saveConfig(next, req.admin?.email)
    res.json({ ok: true })
  } catch (err) {
    console.error('[aiVideoConfig] save error:', err.message)
    res.status(500).json({ message: err.message })
  }
})

// DELETE /api/ai-video-config/:key — clear specific key
router.delete('/:key', protect, async (req, res) => {
  try {
    const current = await loadConfig()
    const keyName = req.params.key
    if (!['falKey', 'hfToken', 'replicateToken'].includes(keyName)) {
      return res.status(400).json({ message: 'Invalid key name' })
    }
    current[keyName] = ''
    await saveConfig(current, req.admin?.email)
    // Clear from process.env
    if (keyName === 'falKey')         delete process.env.FAL_KEY
    if (keyName === 'hfToken')        delete process.env.HF_TOKEN
    if (keyName === 'replicateToken') delete process.env.REPLICATE_TOKEN
    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
