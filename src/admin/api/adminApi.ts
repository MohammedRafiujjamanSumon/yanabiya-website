const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function authHeaders() {
  const token = localStorage.getItem('yg_token')
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }
  return res.json()
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    req<{ token: string; admin: Admin }>('POST', '/api/auth/login', { email, password }),
  me: () => req<{ admin: Admin }>('GET', '/api/auth/me'),
  changePassword: (currentPassword: string, newPassword: string) =>
    req('PUT', '/api/auth/password', { currentPassword, newPassword }),

  // Content sections
  getSection: (key: string) => req<{ key: string; data: unknown }>('GET', `/api/content/${key}`),
  updateSection: (key: string, data: unknown) => req('PUT', `/api/content/${key}`, { data }),
  listSections: () => req<{ key: string; updatedAt: string }[]>('GET', '/api/content'),

  // Media library
  listMedia: () => req<MediaFile[]>('GET', '/api/content/media'),
  deleteMedia: (folder: string, filename: string) =>
    req('DELETE', `/api/content/media/${folder}/${filename}`),

  // File upload — returns { url, filename, folder, type }
  uploadFile: async (folder: string, file: File, onProgress?: (pct: number) => void): Promise<UploadResult> => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const fd = new FormData()
      fd.append('file', file)
      xhr.open('POST', `${BASE}/api/content/upload/${folder}`)
      xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('yg_token')}`)
      if (onProgress) {
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
        }
      }
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve(JSON.parse(xhr.responseText))
        else reject(new Error(`Upload failed: ${xhr.status}`))
      }
      xhr.onerror = () => reject(new Error('Upload failed'))
      xhr.send(fd)
    })
  },

  // Messages
  getMessages: () => req<Message[]>('GET', '/api/messages'),
  markMessageRead: (id: string) => req<Message>('PATCH', `/api/messages/${id}/read`),
  replyMessage: (id: string, text: string) => req<Message>('POST', `/api/messages/${id}/reply`, { text }),
  deleteMessage: (id: string) => req<{ ok: boolean }>('DELETE', `/api/messages/${id}`),

  // AI Video Studio
  generateVideo: (payload: {
    prompt: string; referenceUrl?: string; aspectRatio?: string
    style?: string; durationSec?: number
  }) => req<{ jobId: string; totalClips: number; status: string; demo?: boolean; message?: string }>('POST', '/api/ai-video/generate', payload),

  pollVideoStatus: (jobId: string) => req<{
    jobId: string; status: string; totalClips: number
    clips: { index: number; status: string; progress: number; outputUrl: string | null; error: string | null }[]
    finalUrls: string[]; createdAt: string; completedAt: string | null
  }>('GET', `/api/ai-video/status/${jobId}`),

  saveVideoToLibrary: (jobId: string) => req<{ saved: string[] }>('POST', '/api/ai-video/save', { jobId }),

  getVideoHistory: () => req<{
    jobId: string; prompt: string; status: string; totalClips: number
    finalUrls: string[]; createdAt: string; aspectRatio: string
  }[]>('GET', '/api/ai-video/history'),

  getVideoProvider: () => req<{ configured: boolean; provider: string | null }>('GET', '/api/ai-video/provider'),

  // Pages
  listPages: () => req<PageMeta[]>('GET', '/api/pages'),
  getPage: (slug: string) => req<CmsPage>('GET', `/api/pages/${slug}`),
  createPage: (data: CreatePageInput) => req<CmsPage>('POST', '/api/pages', data),
  updatePage: (slug: string, data: Partial<CreatePageInput>) => req<CmsPage>('PUT', `/api/pages/${slug}`, data),
  deletePage: (slug: string) => req('DELETE', `/api/pages/${slug}`),
  updateSections: (slug: string, sections: CmsSection[]) => req<CmsPage>('PUT', `/api/pages/${slug}/sections`, { sections }),
  addSection: (slug: string, type: string) => req<CmsPage>('POST', `/api/pages/${slug}/sections`, { type }),
  updateSection_cms: (slug: string, sectionId: string, data: Partial<CmsSection>) => req<CmsPage>('PUT', `/api/pages/${slug}/sections/${sectionId}`, data),
  deleteSection_cms: (slug: string, sectionId: string) => req<CmsPage>('DELETE', `/api/pages/${slug}/sections/${sectionId}`),
}

export interface Admin { id: string; email: string; name: string; role: string }
export interface MessageReply { text: string; sentAt: string }
export interface Message { id: string; name: string; email: string; phone: string; subject: string; message: string; country: string; read: boolean; replies: MessageReply[]; createdAt: string }
export interface MediaFile {
  name: string; folder: string; path: string; url: string
  size: number; mtime: string; type: 'image' | 'video' | 'file'
}
export interface UploadResult { url: string; filename: string; folder: string; type: string }

export interface PageMeta { id: string; slug: string; title: string; status: 'draft' | 'published'; parentSlug: string | null; template: string; updatedAt: string; sectionCount: number }
export interface CmsSection { id: string; type: string; order: number; visible: boolean; data: Record<string, unknown> }
export interface CmsPage extends PageMeta { metaTitle: string; metaDescription: string; heroImage: string; sections: CmsSection[] }
export interface CreatePageInput { slug: string; title: string; metaTitle?: string; metaDescription?: string; status?: 'draft' | 'published'; parentSlug?: string; template?: string; heroImage?: string }
