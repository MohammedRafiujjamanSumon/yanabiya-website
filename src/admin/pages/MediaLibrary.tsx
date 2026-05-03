import { useEffect, useState, useRef, useCallback } from 'react'
import {
  Upload, Trash2, Copy, Check, Image as ImageIcon,
  Film, FileText, Search, RefreshCw, FolderOpen,
} from 'lucide-react'
import AdminLayout from '../components/AdminLayout'
import { api, type MediaFile } from '../api/adminApi'

const FOLDERS = ['logo','hero','partners','leadership','services','countries','pages','misc']

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function UploadZone({ folder, onUploaded }: { folder: string; onUploaded: (f: MediaFile) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState('')

  const doUpload = async (file: File) => {
    setProgress(0); setError('')
    try {
      const result = await api.uploadFile(folder, file, setProgress)
      onUploaded({
        name: result.filename, folder, path: `${folder}/${result.filename}`,
        url: result.url, size: file.size, mtime: new Date().toISOString(),
        type: result.type === 'video' ? 'video' : 'image',
      })
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally { setTimeout(() => setProgress(null), 1000) }
  }

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) doUpload(file)
  }, [folder])

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => fileRef.current?.click()}
      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all
                  ${dragging ? 'border-brand-accent bg-brand-accent/10' : 'border-slate-700 hover:border-slate-500'}`}
    >
      <Upload size={28} className="mx-auto mb-2 text-slate-500" />
      <p className="text-sm text-slate-400">Drop files here or <span className="text-brand-accent">click to upload</span></p>
      <p className="text-xs text-slate-600 mt-1">Images, Videos (up to 200MB)</p>

      {progress !== null && (
        <div className="mt-3">
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-brand-accent transition-all duration-200" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1">{progress}%</p>
        </div>
      )}
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

      <input ref={fileRef} type="file" accept="image/*,video/*" className="hidden"
        onChange={e => { if (e.target.files?.[0]) doUpload(e.target.files[0]) }} />
    </div>
  )
}

function FileCard({ file, onDelete }: { file: MediaFile; onDelete: () => void }) {
  const [copied, setCopied] = useState(false)
  const [confirmDel, setConfirmDel] = useState(false)

  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:4000'
  const fullUrl = file.url.startsWith('http') ? file.url : `${apiBase}${file.url}`

  const copyUrl = () => {
    navigator.clipboard.writeText(fullUrl)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const handleDelete = async () => {
    if (!confirmDel) { setConfirmDel(true); setTimeout(() => setConfirmDel(false), 3000); return }
    try { await api.deleteMedia(file.folder, file.name); onDelete() } catch { /* ignore */ }
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden group">
      {/* Preview */}
      <div className="relative h-36 bg-slate-800 flex items-center justify-center overflow-hidden">
        {file.type === 'video' ? (
          <video src={fullUrl} className="w-full h-full object-cover" muted />
        ) : file.type === 'image' ? (
          <img src={fullUrl} alt={file.name} className="w-full h-full object-contain p-2" />
        ) : (
          <FileText size={36} className="text-slate-600" />
        )}
        <div className="absolute top-2 left-2">
          <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full
            ${file.type === 'video' ? 'bg-purple-500/80 text-white' : 'bg-blue-500/80 text-white'}`}>
            {file.type}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button type="button" onClick={copyUrl}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all text-white">
            {copied ? <Check size={14}/> : <Copy size={14}/>}
          </button>
          <button type="button" onClick={handleDelete}
            className={`p-2 rounded-full backdrop-blur-sm transition-all text-white
              ${confirmDel ? 'bg-red-500' : 'bg-white/20 hover:bg-red-500/50'}`}>
            <Trash2 size={14}/>
          </button>
        </div>
      </div>
      {/* Info */}
      <div className="px-3 py-2">
        <p className="text-xs text-white truncate" title={file.name}>{file.name}</p>
        <p className="text-[10px] text-slate-500 mt-0.5">{file.folder} · {formatSize(file.size)}</p>
      </div>
    </div>
  )
}

export default function MediaLibrary() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [folder, setFolder] = useState('all')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all')

  const load = () => {
    setLoading(true)
    api.listMedia().then(setFiles).catch(() => setFiles([])).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const displayed = files.filter(f =>
    (folder === 'all' || f.folder === folder) &&
    (typeFilter === 'all' || f.type === typeFilter) &&
    (!search || f.name.toLowerCase().includes(search.toLowerCase()))
  )

  const uploadFolder = folder === 'all' ? 'misc' : folder

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Media Library</h1>
            <p className="text-slate-400 text-sm mt-0.5">Upload and manage all images, videos and files</p>
          </div>
          <button type="button" onClick={load}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white border border-slate-700 px-4 py-2 rounded-xl transition-all">
            <RefreshCw size={14}/> Refresh
          </button>
        </div>

        {/* Upload zone */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <FolderOpen size={15} className="text-slate-400" />
            <span className="text-sm text-slate-400">Upload to folder:</span>
            <select value={uploadFolder} onChange={e => setFolder(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-brand-accent">
              {FOLDERS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <UploadZone folder={uploadFolder} onUploaded={f => setFiles(prev => [f, ...prev])} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-48">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search files…"
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all" />
          </div>
          <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
            {(['all','image','video'] as const).map(t => (
              <button key={t} type="button" onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize
                  ${typeFilter === t ? 'bg-brand-accent text-white' : 'text-slate-400 hover:text-white'}`}>
                {t === 'image' ? <><ImageIcon size={12} className="inline mr-1"/>Images</> : t === 'video' ? <><Film size={12} className="inline mr-1"/>Videos</> : 'All'}
              </button>
            ))}
          </div>
          <div className="flex gap-1 flex-wrap">
            {['all', ...FOLDERS].map(f => (
              <button key={f} type="button" onClick={() => setFolder(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize
                  ${folder === f ? 'bg-slate-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array(10).fill(0).map((_, i) => <div key={i} className="h-48 bg-slate-900 rounded-xl animate-pulse" />)}
          </div>
        ) : displayed.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No files found. Upload something above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {displayed.map(f => (
              <FileCard key={f.path} file={f} onDelete={() => setFiles(prev => prev.filter(x => x.path !== f.path))} />
            ))}
          </div>
        )}

        <p className="text-xs text-slate-600 mt-4">{displayed.length} file{displayed.length !== 1 ? 's' : ''} · Click copy icon to get URL, paste into any editor field</p>
      </div>
    </AdminLayout>
  )
}
