import { useEffect, useRef, useState } from 'react'
import { X, Check, Film, FileText, FolderOpen } from 'lucide-react'
import { api, type MediaFile } from '../api/adminApi'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const FOLDERS = ['all', 'logo', 'hero', 'partners', 'services', 'pages', 'misc']

function fullUrl(url: string): string {
  if (!url) return ''
  return url.startsWith('http') ? url : `${BASE}${url}`
}

function isImageUrl(url: string): boolean {
  return /\.(png|jpe?g|gif|webp|svg|avif)(\?.*)?$/i.test(url)
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MediaPickerProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  accept?: 'image' | 'video' | 'all'
  label?: string
  placeholder?: string
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {Array(10).fill(0).map((_, i) => (
        <div key={i} className="h-32 bg-slate-800 rounded-xl animate-pulse" />
      ))}
    </div>
  )
}

// ─── Media Library Modal ──────────────────────────────────────────────────────

interface LibraryModalProps {
  accept: 'image' | 'video' | 'all'
  selected: string
  onSelect: (url: string) => void
  onClose: () => void
}

function LibraryModal({ accept, selected, onSelect, onClose }: LibraryModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFolder, setActiveFolder] = useState('all')

  useEffect(() => {
    api.listMedia()
      .then(setFiles)
      .catch(() => setFiles([]))
      .finally(() => setLoading(false))
  }, [])

  const displayed = files.filter(f => {
    const folderOk = activeFolder === 'all' || f.folder === activeFolder
    const typeOk =
      accept === 'all' ||
      (accept === 'image' && f.type === 'image') ||
      (accept === 'video' && f.type === 'video')
    return folderOk && typeOk
  })

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={handleBackdrop}
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <FolderOpen size={16} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-white">Media Library</h2>
          </div>

          {/* Folder tabs */}
          <div className="flex items-center gap-1 flex-wrap justify-center">
            {FOLDERS.map(f => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFolder(f)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all capitalize
                  ${activeFolder === f
                    ? 'bg-[#9ec73a] text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Grid */}
        <div className="overflow-y-auto p-4 flex-1">
          {loading ? (
            <Skeleton />
          ) : displayed.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-600">
              <FolderOpen size={36} className="mb-3 opacity-40" />
              <p className="text-sm">No media found in this folder.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayed.map(file => {
                const href = fullUrl(file.url)
                const isSelected =
                  selected === file.url ||
                  selected === href ||
                  fullUrl(selected) === href

                return (
                  <button
                    key={file.path}
                    type="button"
                    onClick={() => onSelect(file.url)}
                    className={`group relative bg-slate-800 rounded-xl overflow-hidden border-2 transition-all text-left
                      ${isSelected
                        ? 'border-[#9ec73a]'
                        : 'border-transparent hover:border-slate-600'
                      }`}
                  >
                    {/* Preview */}
                    <div className="h-28 flex items-center justify-center bg-slate-800 overflow-hidden">
                      {file.type === 'video' ? (
                        <Film size={28} className="text-slate-500" />
                      ) : file.type === 'image' ? (
                        <img
                          src={href}
                          alt={file.name}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      ) : (
                        <FileText size={28} className="text-slate-500" />
                      )}
                    </div>

                    {/* Selected checkmark */}
                    {isSelected && (
                      <span className="absolute top-1.5 right-1.5 bg-[#9ec73a] text-white rounded-full p-0.5">
                        <Check size={10} />
                      </span>
                    )}

                    {/* Info */}
                    <div className="px-2 py-1.5">
                      <p className="text-[10px] text-white truncate" title={file.name}>
                        {file.name}
                      </p>
                      <span className="inline-block mt-0.5 text-[9px] bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full capitalize">
                        {file.folder}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── MediaPicker ──────────────────────────────────────────────────────────────

export default function MediaPicker({
  value,
  onChange,
  folder = 'misc',
  accept = 'image',
  label = 'Image URL',
  placeholder,
}: MediaPickerProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')

  const inputPlaceholder = placeholder ?? 'https://…'

  // Determine the accept attribute for the hidden file input
  const fileAccept =
    accept === 'image' ? 'image/*' :
    accept === 'video' ? 'video/*' :
    'image/*,video/*'

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Reset input so same file can be re-selected
    e.target.value = ''
    setError('')
    setUploading(true)
    setProgress(0)
    try {
      const result = await api.uploadFile(folder, file, setProgress)
      onChange(result.url)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleLibrarySelect = (url: string) => {
    onChange(url)
    setShowLibrary(false)
  }

  const showThumbnail = accept !== 'video' && value && isImageUrl(value)

  return (
    <div>
      {/* Label */}
      <label className="block text-xs text-slate-400 mb-1.5">{label}</label>

      {/* Input row */}
      <div className="flex items-center gap-2">
        {/* Thumbnail preview */}
        {showThumbnail && (
          <div className="shrink-0 h-8 w-8 rounded-md overflow-hidden border border-slate-700 bg-slate-800 flex items-center justify-center">
            <img
              src={fullUrl(value)}
              alt="preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* URL input */}
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={inputPlaceholder}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#9ec73a] transition-all"
        />

        {/* Library button */}
        <button
          type="button"
          onClick={() => setShowLibrary(true)}
          className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg transition-all shrink-0 whitespace-nowrap"
        >
          📁 Library
        </button>

        {/* Upload button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-2 rounded-lg transition-all shrink-0 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ↑ Upload
        </button>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept={fileAccept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload progress */}
      {uploading && (
        <div className="mt-2">
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9ec73a] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Uploading… {progress}%</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 mt-1.5">{error}</p>
      )}

      {/* Library modal */}
      {showLibrary && (
        <LibraryModal
          accept={accept}
          selected={value}
          onSelect={handleLibrarySelect}
          onClose={() => setShowLibrary(false)}
        />
      )}
    </div>
  )
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

export function ImageField({ label, value, onChange, folder, placeholder }: MediaPickerProps) {
  return (
    <MediaPicker
      label={label}
      value={value}
      onChange={onChange}
      folder={folder}
      accept="image"
      placeholder={placeholder}
    />
  )
}

export function VideoField({ label, value, onChange, folder, placeholder }: MediaPickerProps) {
  return (
    <MediaPicker
      label={label}
      value={value}
      onChange={onChange}
      folder={folder}
      accept="video"
      placeholder={placeholder}
    />
  )
}
