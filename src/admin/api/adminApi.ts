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
}

export interface Admin { id: string; email: string; name: string; role: string }
export interface MediaFile {
  name: string; folder: string; path: string; url: string
  size: number; mtime: string; type: 'image' | 'video' | 'file'
}
export interface UploadResult { url: string; filename: string; folder: string; type: string }
