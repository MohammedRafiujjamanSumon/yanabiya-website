import { useCallback, useEffect, useRef, useState } from 'react'
import AdminLayout from '../components/AdminLayout'
import { api } from '../api/adminApi'
import {
  Mic, MicOff, Sparkles, Play, Pause, Download, Save,
  Upload, X, ChevronDown, Loader2, CheckCircle2, AlertCircle,
  Film, Clock, Layers, Wand2, RefreshCw, Settings2, Image as ImageIcon,
} from 'lucide-react'

// ─── Browser Speech API types ─────────────────────────────────────────────────
interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}
interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}
interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}
interface SpeechRecognitionAlternative {
  transcript: string
}
interface SpeechRecognitionInstance extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((e: SpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start(): void
  stop(): void
}
interface SpeechRecognitionConstructor {
  new (): SpeechRecognitionInstance
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ClipStatus {
  index: number
  status: 'waiting' | 'queued' | 'generating' | 'completed' | 'failed'
  progress: number
  outputUrl: string | null
  error: string | null
}

interface JobStatus {
  jobId: string
  status: 'processing' | 'completed' | 'failed'
  totalClips: number
  clips: ClipStatus[]
  finalUrls: string[]
  createdAt: string
  completedAt: string | null
}

interface HistoryItem {
  jobId: string
  prompt: string
  status: string
  totalClips: number
  finalUrls: string[]
  createdAt: string
  aspectRatio: string
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ASPECT_OPTIONS = [
  { value: '16:9', label: '16:9', sub: 'Landscape' },
  { value: '9:16', label: '9:16', sub: 'Portrait' },
  { value: '1:1',  label: '1:1',  sub: 'Square' },
]

const STYLE_OPTIONS = [
  { value: 'cinematic', label: 'Cinematic', emoji: '🎬' },
  { value: 'realistic', label: 'Realistic', emoji: '📷' },
  { value: 'animation', label: 'Animation', emoji: '✨' },
  { value: '3d',        label: '3D Render',  emoji: '🎲' },
]

const DURATION_OPTIONS = [
  { value: 10,  label: '10s',  sub: '1 clip' },
  { value: 20,  label: '20s',  sub: '2 clips' },
  { value: 30,  label: '30s',  sub: '3 clips' },
  { value: 60,  label: '60s',  sub: '6 clips' },
  { value: 120, label: '2 min', sub: '12 clips' },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AIVideoStudio() {
  // Settings
  const [aspectRatio, setAspectRatio] = useState('16:9')
  const [style, setStyle] = useState('cinematic')
  const [durationSec, setDurationSec] = useState(10)

  // Prompt & voice
  const [prompt, setPrompt] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)

  // Reference media
  const [referenceFile, setReferenceFile] = useState<File | null>(null)
  const [referenceUrl, setReferenceUrl] = useState('')
  const [referencePreview, setReferencePreview] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Generation state
  const [generating, setGenerating] = useState(false)
  const [job, setJob] = useState<JobStatus | null>(null)
  const [demoMode, setDemoMode] = useState(false)
  const [providerName, setProviderName] = useState<string | null>(null)
  const [providerConfigured, setProviderConfigured] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Preview
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // History
  const [history, setHistory] = useState<HistoryItem[]>([])

  // Saving
  const [saving, setSaving] = useState(false)
  const [savedUrls, setSavedUrls] = useState<string[]>([])

  // ── Init ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    setVoiceSupported(!!SR)

    api.getVideoProvider().then(d => {
      setProviderConfigured(d.configured)
      setProviderName(d.provider)
    }).catch(() => {})

    api.getVideoHistory().then(setHistory).catch(() => {})

    return () => { if (pollRef.current) clearInterval(pollRef.current) }
  }, [])

  // ── Voice input ────────────────────────────────────────────────────────────

  function toggleVoice() {
    const w = window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition
    if (!SR) return

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const rec = new SR()
    rec.lang = 'en-US'
    rec.continuous = true
    rec.interimResults = true
    let finalText = prompt

    rec.onresult = (e: SpeechRecognitionEvent) => {
      let interim = ''
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript
        if (e.results[i].isFinal) finalText += (finalText ? ' ' : '') + t
        else interim = t
      }
      setPrompt(finalText + (interim ? ' ' + interim : ''))
    }
    rec.onend = () => setIsListening(false)
    rec.onerror = () => setIsListening(false)

    recognitionRef.current = rec
    rec.start()
    setIsListening(true)
  }

  // ── Reference media ────────────────────────────────────────────────────────

  const handleFileSelect = useCallback((file: File) => {
    setReferenceFile(file)
    setReferencePreview(URL.createObjectURL(file))
    setReferenceUrl('')
  }, [])

  function clearReference() {
    setReferenceFile(null)
    setReferencePreview('')
    setReferenceUrl('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) handleFileSelect(f)
  }

  // ── Generate ───────────────────────────────────────────────────────────────

  async function handleGenerate() {
    if (!prompt.trim()) return
    if (generating) return
    setGenerating(true)
    setJob(null)
    setActiveVideoUrl(null)
    setSavedUrls([])
    setDemoMode(false)

    try {
      // Upload reference file first if needed
      let refUrl = referenceUrl
      if (referenceFile && !referenceUrl) {
        const uploaded = await api.uploadFile('ai-video', referenceFile)
        refUrl = uploaded.url
        setReferenceUrl(refUrl)
      }

      const result = await api.generateVideo({ prompt, referenceUrl: refUrl, aspectRatio, style, durationSec })

      if (result.demo) {
        setDemoMode(true)
        setGenerating(false)
        return
      }

      setJob({
        jobId: result.jobId,
        status: 'processing',
        totalClips: result.totalClips,
        clips: Array.from({ length: result.totalClips }, (_, i) => ({
          index: i,
          status: i === 0 ? 'queued' : 'waiting',
          progress: 0,
          outputUrl: null,
          error: null,
        })),
        finalUrls: [],
        createdAt: new Date().toISOString(),
        completedAt: null,
      })

      // Start polling
      pollRef.current = setInterval(async () => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const raw = await api.pollVideoStatus(result.jobId) as any
          const status: JobStatus = {
            jobId: raw.jobId,
            status: raw.status as JobStatus['status'],
            totalClips: raw.totalClips,
            clips: (raw.clips ?? []).map((c: ClipStatus) => c),
            finalUrls: raw.finalUrls ?? [],
            createdAt: raw.createdAt,
            completedAt: raw.completedAt ?? null,
          }
          setJob(status)
          if (status.finalUrls.length > 0 && !activeVideoUrl) {
            setActiveVideoUrl(status.finalUrls[0])
          }
          if (status.status === 'completed' || status.status === 'failed') {
            clearInterval(pollRef.current!)
            setGenerating(false)
            if (status.status === 'completed') {
              api.getVideoHistory().then(setHistory).catch(() => {})
            }
          }
        } catch {
          clearInterval(pollRef.current!)
          setGenerating(false)
        }
      }, 4000)
    } catch (err: unknown) {
      console.error(err)
      setGenerating(false)
    }
  }

  // ── Video player ───────────────────────────────────────────────────────────

  function togglePlay() {
    if (!videoRef.current) return
    if (playing) { videoRef.current.pause(); setPlaying(false) }
    else { videoRef.current.play(); setPlaying(true) }
  }

  // ── Save to library ────────────────────────────────────────────────────────

  async function handleSave() {
    if (!job || job.status !== 'completed') return
    setSaving(true)
    try {
      const result = await api.saveVideoToLibrary(job.jobId)
      setSavedUrls(result.saved)
    } finally {
      setSaving(false)
    }
  }

  // ── Download ───────────────────────────────────────────────────────────────

  function handleDownload(url: string) {
    const a = document.createElement('a')
    a.href = url
    a.download = `yanabiya-video-${Date.now()}.mp4`
    a.target = '_blank'
    a.click()
  }

  // ── Overall progress ───────────────────────────────────────────────────────

  const overallProgress = job
    ? job.clips.reduce((sum, c) => sum + c.progress, 0) / job.totalClips
    : 0

  const totalClips = job?.totalClips ?? Math.ceil(durationSec / 10)

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <AdminLayout>
      <div className="min-h-screen bg-slate-950 text-white">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 via-slate-900 to-lime-900/20 pointer-events-none" />
          <div className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 80% 50%, #84cc16 0%, transparent 50%)' }} />
          <div className="relative px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-lime-500 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  AI Video Studio
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">Generate cinematic videos with AI — voice or text prompt</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {providerConfigured ? (
                <span className="flex items-center gap-1.5 text-xs bg-lime-500/10 border border-lime-500/30 text-lime-400 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                  {providerName} connected
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  Demo mode — no API key
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Provider banner ─────────────────────────────────────────────── */}
        {!providerConfigured && (
          <div className="mx-6 mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-amber-300 font-medium">No AI provider configured</p>
              <p className="text-slate-400 mt-1">
                Add <code className="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">RUNWAY_API_KEY</code> or{' '}
                <code className="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">LUMA_API_KEY</code> to your{' '}
                <code className="text-amber-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">yanabiya-api/.env</code> file to enable video generation.
                The UI is fully ready — just plug in your key.
              </p>
            </div>
          </div>
        )}

        <div className="px-6 py-6 grid grid-cols-1 xl:grid-cols-[280px_1fr_300px] gap-6">

          {/* ── LEFT: Settings panel ──────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Aspect ratio */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Settings2 className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Aspect Ratio</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ASPECT_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setAspectRatio(opt.value)}
                    className={`rounded-lg py-2.5 text-center transition-all ${
                      aspectRatio === opt.value
                        ? 'bg-violet-600 border border-violet-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div className="text-sm font-bold">{opt.label}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Style */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Wand2 className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Video Style</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {STYLE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setStyle(opt.value)}
                    className={`rounded-lg py-2.5 px-3 flex items-center gap-2 transition-all ${
                      style === opt.value
                        ? 'bg-violet-600 border border-violet-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-base">{opt.emoji}</span>
                    <span className="text-xs font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Duration</span>
              </div>
              <div className="space-y-1.5">
                {DURATION_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setDurationSec(opt.value)}
                    className={`w-full rounded-lg px-3 py-2 flex items-center justify-between transition-all ${
                      durationSec === opt.value
                        ? 'bg-violet-600 border border-violet-500 text-white'
                        : 'bg-slate-800 border border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <span className="text-sm font-bold">{opt.label}</span>
                    <span className="text-xs opacity-70">{opt.sub}</span>
                  </button>
                ))}
              </div>
              {durationSec > 10 && (
                <p className="mt-2 text-[11px] text-slate-500 flex items-center gap-1">
                  <Layers className="w-3 h-3" />
                  Auto-chains {Math.ceil(durationSec / 10)} clips in sequence
                </p>
              )}
            </div>

          </div>

          {/* ── CENTER: Main area ─────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Video preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div
                className={`relative flex items-center justify-center bg-slate-950 ${
                  aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[500px]' :
                  aspectRatio === '1:1'  ? 'aspect-square max-h-[500px]' :
                  'aspect-video'
                }`}
              >
                {activeVideoUrl ? (
                  <>
                    <video
                      ref={videoRef}
                      src={activeVideoUrl}
                      className="w-full h-full object-contain"
                      onEnded={() => setPlaying(false)}
                      loop={false}
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/40">
                      <button
                        onClick={togglePlay}
                        className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition"
                      >
                        {playing ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                      </button>
                    </div>
                    {/* Clip selector when multiple clips */}
                    {(job?.finalUrls.length ?? 0) > 1 && (
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 px-4">
                        {job!.finalUrls.map((url, i) => (
                          <button
                            key={i}
                            onClick={() => { setActiveVideoUrl(url); setPlaying(false) }}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                              activeVideoUrl === url
                                ? 'bg-violet-600 text-white'
                                : 'bg-black/50 text-slate-300 hover:bg-black/70'
                            }`}
                          >
                            Clip {i + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-slate-600">
                    {generating ? (
                      <GeneratingOverlay job={job} totalClips={totalClips} overallProgress={overallProgress} />
                    ) : (
                      <>
                        <Film className="w-12 h-12 opacity-30" />
                        <p className="text-sm">Your generated video will appear here</p>
                      </>
                    )}
                  </div>
                )}

                {/* Generating overlay on top of video during multi-clip chains */}
                {generating && activeVideoUrl && (
                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white">
                      <Loader2 className="w-3 h-3 animate-spin text-violet-400" />
                      Generating next clip…
                    </div>
                  </div>
                )}
              </div>

              {/* Video actions */}
              {activeVideoUrl && (
                <div className="px-4 py-3 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={togglePlay}
                      className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700"
                    >
                      {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {playing ? 'Pause' : 'Play'}
                    </button>
                    <button
                      onClick={() => handleDownload(activeVideoUrl)}
                      className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    {savedUrls.length > 0 ? (
                      <span className="flex items-center gap-1.5 text-xs text-lime-400">
                        <CheckCircle2 className="w-4 h-4" />
                        Saved to library
                      </span>
                    ) : (
                      <button
                        onClick={handleSave}
                        disabled={saving || job?.status !== 'completed'}
                        className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-lime-600 hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed text-white transition"
                      >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save to Library
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Clip progress (when multi-clip) */}
            {job && job.totalClips > 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Layers className="w-4 h-4 text-violet-400" />
                  <span className="text-sm font-medium text-slate-300">Clip Chain Progress</span>
                  <span className="ml-auto text-xs text-slate-500">{Math.round(overallProgress)}%</span>
                </div>
                <div className="flex gap-2">
                  {job.clips.map(clip => (
                    <div key={clip.index} className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-slate-500">Clip {clip.index + 1}</span>
                        <ClipIcon status={clip.status} />
                      </div>
                      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            clip.status === 'completed' ? 'bg-lime-500' :
                            clip.status === 'failed' ? 'bg-red-500' :
                            clip.status === 'generating' ? 'bg-violet-500' :
                            'bg-slate-700'
                          }`}
                          style={{ width: `${clip.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt area */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  placeholder="Describe your video… e.g. 'A sunrise over mountains with golden light and cinematic depth of field'"
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-14 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-violet-500 transition"
                />
                {/* Voice button */}
                <button
                  onClick={toggleVoice}
                  disabled={!voiceSupported}
                  title={voiceSupported ? (isListening ? 'Stop listening' : 'Speak your prompt') : 'Voice not supported in this browser'}
                  className={`absolute right-3 bottom-3 w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/40'
                      : voiceSupported
                      ? 'bg-slate-700 text-slate-300 hover:bg-violet-600 hover:text-white'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
              </div>

              {isListening && (
                <div className="mt-2 flex items-center gap-2 text-xs text-red-400">
                  <span className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className="w-0.5 bg-red-400 rounded-full animate-bounce"
                        style={{ height: `${8 + (i % 3) * 4}px`, animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </span>
                  Listening… speak your prompt
                </div>
              )}

              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={handleGenerate}
                  disabled={generating || !prompt.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed
                    bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 text-white shadow-lg shadow-violet-500/20"
                >
                  {generating ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Generate Video</>
                  )}
                </button>
                {(job || prompt) && (
                  <button
                    onClick={() => { setJob(null); setPrompt(''); setActiveVideoUrl(null); clearReference(); setSavedUrls([]) }}
                    className="px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 transition text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                )}
              </div>

              {demoMode && (
                <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                  Demo mode — no API key configured. The UI is fully functional. Add your key to enable real generation.
                </div>
              )}
            </div>

            {/* Reference media */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <ImageIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Reference Media</span>
                <span className="text-xs text-slate-500 ml-1">(optional — image or video as creative reference)</span>
              </div>

              {referencePreview ? (
                <div className="relative rounded-lg overflow-hidden bg-slate-800 flex items-center justify-center h-32">
                  {referenceFile?.type.startsWith('video') ? (
                    <video src={referencePreview} className="max-h-full max-w-full" />
                  ) : (
                    <img src={referencePreview} className="max-h-full max-w-full object-contain" alt="Reference" />
                  )}
                  <button
                    onClick={clearReference}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div
                  onDrop={onDrop}
                  onDragOver={e => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-500/5 transition"
                >
                  <Upload className="w-6 h-6 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Drop image, video, or file here — or click to browse</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  />
                </div>
              )}
            </div>

          </div>

          {/* ── RIGHT: History panel ──────────────────────────────────────── */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">Recent Generations</span>
                <button
                  onClick={() => api.getVideoHistory().then(setHistory).catch(() => {})}
                  className="ml-auto text-slate-500 hover:text-slate-300 transition"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-8">
                  <Film className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-xs text-slate-600">No videos generated yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  {history.map(item => (
                    <div
                      key={item.jobId}
                      className="rounded-lg bg-slate-800 border border-slate-700 overflow-hidden cursor-pointer hover:border-slate-600 transition"
                      onClick={() => {
                        if (item.finalUrls.length > 0) setActiveVideoUrl(item.finalUrls[0])
                      }}
                    >
                      {/* Thumbnail or placeholder */}
                      <div className="relative h-20 bg-slate-950 flex items-center justify-center">
                        {item.finalUrls.length > 0 ? (
                          <video src={item.finalUrls[0]} className="w-full h-full object-cover" />
                        ) : (
                          <Film className={`w-6 h-6 ${item.status === 'failed' ? 'text-red-600' : 'text-slate-700'}`} />
                        )}
                        <div className={`absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          item.status === 'completed' ? 'bg-lime-500/20 text-lime-400' :
                          item.status === 'failed' ? 'bg-red-500/20 text-red-400' :
                          'bg-violet-500/20 text-violet-400'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      <div className="px-2.5 py-2">
                        <p className="text-[11px] text-slate-300 truncate">{item.prompt}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-600">{item.aspectRatio}</span>
                          <span className="text-[10px] text-slate-600">·</span>
                          <span className="text-[10px] text-slate-600">{item.totalClips} clip{item.totalClips > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips card */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span className="text-sm font-medium text-slate-300">Prompt Tips</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-500">
                <li className="flex gap-2"><span className="text-violet-400">→</span> Include lighting: "golden hour", "blue hour", "studio lit"</li>
                <li className="flex gap-2"><span className="text-violet-400">→</span> Add camera movement: "slow pan", "drone shot", "close-up"</li>
                <li className="flex gap-2"><span className="text-violet-400">→</span> Describe the mood: "dramatic", "peaceful", "energetic"</li>
                <li className="flex gap-2"><span className="text-violet-400">→</span> Use voice input for hands-free prompting</li>
                <li className="flex gap-2"><span className="text-violet-400">→</span> Add a reference image for style consistency</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function GeneratingOverlay({ job, totalClips, overallProgress }: { job: JobStatus | null; totalClips: number; overallProgress: number }) {
  const currentClip = job?.clips.findIndex(c => c.status === 'generating') ?? 0
  const display = currentClip >= 0 ? currentClip + 1 : 1

  return (
    <div className="flex flex-col items-center gap-4 px-8 text-center">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="4" />
          <circle
            cx="32" cy="32" r="28" fill="none" stroke="#7c3aed" strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - overallProgress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
        </div>
      </div>
      <div>
        <p className="text-white font-medium">Generating clip {display} of {totalClips}</p>
        <p className="text-slate-500 text-sm mt-1">{Math.round(overallProgress)}% complete</p>
      </div>
      <div className="w-48 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-lime-500 rounded-full transition-all duration-500"
          style={{ width: `${overallProgress}%` }}
        />
      </div>
    </div>
  )
}

function ClipIcon({ status }: { status: ClipStatus['status'] }) {
  if (status === 'completed')  return <CheckCircle2 className="w-3 h-3 text-lime-400" />
  if (status === 'failed')     return <AlertCircle className="w-3 h-3 text-red-400" />
  if (status === 'generating') return <Loader2 className="w-3 h-3 text-violet-400 animate-spin" />
  return <ChevronDown className="w-3 h-3 text-slate-600" />
}
