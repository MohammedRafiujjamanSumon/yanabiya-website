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

  // Content
  getSection: (key: string) => req<{ key: string; data: unknown }>('GET', `/api/content/${key}`),
  updateSection: (key: string, data: unknown) =>
    req('PUT', `/api/content/${key}`, { data }),
  listSections: () => req<{ key: string; updatedAt: string }[]>('GET', '/api/content'),

  // Upload
  uploadFile: async (folder: string, file: File): Promise<{ url: string }> => {
    const fd = new FormData()
    fd.append('file', file)
    const res = await fetch(`${BASE}/api/content/upload/${folder}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${localStorage.getItem('yg_token')}` },
      body: fd,
    })
    if (!res.ok) throw new Error('Upload failed')
    return res.json()
  },
}

export interface Admin {
  id: string
  email: string
  name: string
  role: string
}
