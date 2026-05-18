/**
 * Self-hosted Python video generator provider.
 * Uses Pollinations.ai (free, no key) + Pillow + imageio-ffmpeg.
 *
 * No external paid API required.
 */
const { spawn, spawnSync } = require('child_process')
const path = require('path')
const fs   = require('fs')
const os   = require('os')

const PYTHON_BIN  = process.env.PYTHON_BIN || 'python3'
const SCRIPT_PATH = path.join(__dirname, '..', '..', 'python', 'generate_video.py')
const OUTPUT_DIR  = process.env.AI_VIDEO_OUTPUT_DIR || path.join(os.tmpdir(), 'yanabiya-videos')

// Detect once at module load: is Python + the script available?
const PYTHON_AVAILABLE = (() => {
  try {
    if (!fs.existsSync(SCRIPT_PATH)) return false
    const r = spawnSync(PYTHON_BIN, ['--version'], { stdio: ['ignore', 'pipe', 'pipe'] })
    return r.status === 0
  } catch {
    return false
  }
})()

// In-memory task tracker: taskId -> { status, progress, outputUrl, error, outputPath }
const tasks = new Map()

function runPython(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(PYTHON_BIN, [SCRIPT_PATH, ...args], {
      stdio: ['ignore', 'pipe', 'pipe'],
    })
    let stdout = ''
    let stderr = ''
    child.stdout.on('data', d => { stdout += d.toString() })
    child.stderr.on('data', d => { stderr += d.toString() })
    child.on('error', reject)
    child.on('close', code => {
      if (code !== 0) {
        return reject(new Error(`python exited ${code}: ${stderr || stdout}`))
      }
      try {
        const lastLine = stdout.trim().split('\n').filter(Boolean).pop() || '{}'
        resolve(JSON.parse(lastLine))
      } catch (e) {
        reject(new Error(`failed to parse python output: ${e.message}\n${stdout}`))
      }
    })
  })
}

/**
 * Kick off generation. Returns { taskId } immediately and runs Python in background.
 */
async function generateClip({
  prompt,
  referenceImageUrl: _referenceImageUrl,   // not yet used
  duration = 10,
  aspectRatio = '16:9',
  style = 'cinematic',
} = {}) {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const taskId  = `vid_${Date.now()}_${Math.random().toString(36).slice(2, 8)}.mp4`
  const outPath = path.join(OUTPUT_DIR, taskId)

  tasks.set(taskId, { status: 'generating', progress: 5, outputUrl: null, error: null, outputPath: outPath })

  // Fire and forget — pollStatus will report when ready.
  runPython([
    '--prompt',   prompt,
    '--output',   outPath,
    '--aspect',   aspectRatio,
    '--duration', String(duration),
    '--style',    style,
  ])
    .then(result => {
      if (result.ok) {
        tasks.set(taskId, {
          status: 'completed',
          progress: 100,
          outputUrl: `/api/ai-video/file/${taskId}`,
          error: null,
          outputPath: outPath,
        })
      } else {
        tasks.set(taskId, {
          status: 'failed',
          progress: 0,
          outputUrl: null,
          error: result.error || 'unknown',
          outputPath: outPath,
        })
      }
    })
    .catch(err => {
      tasks.set(taskId, {
        status: 'failed',
        progress: 0,
        outputUrl: null,
        error: err.message,
        outputPath: outPath,
      })
    })

  return { taskId }
}

async function pollStatus(taskId) {
  const t = tasks.get(taskId)
  if (!t) return { status: 'failed', progress: 0, outputUrl: null, error: 'task not found' }
  // Heuristic progress while generating (fakes a slow tick so UI animates)
  if (t.status === 'generating' && t.progress < 90) {
    t.progress = Math.min(90, t.progress + 8)
  }
  return {
    status: t.status,
    progress: t.progress,
    outputUrl: t.outputUrl,
    error: t.error,
  }
}

function getOutputPath(taskId) {
  const t = tasks.get(taskId)
  return t ? t.outputPath : null
}

module.exports = {
  name: 'python-pollinations',
  available: PYTHON_AVAILABLE,
  generateClip,
  pollStatus,
  getOutputPath,
  OUTPUT_DIR,
}
