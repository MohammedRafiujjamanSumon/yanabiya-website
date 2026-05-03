import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api, type Admin } from '../api/adminApi'

interface AuthCtx {
  admin: Admin | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const Ctx = createContext<AuthCtx | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('yg_token')
    if (!token) { setLoading(false); return }
    api.me()
      .then(({ admin }) => setAdmin(admin))
      .catch(() => localStorage.removeItem('yg_token'))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const { token, admin } = await api.login(email, password)
    localStorage.setItem('yg_token', token)
    setAdmin(admin)
  }

  const logout = () => {
    localStorage.removeItem('yg_token')
    setAdmin(null)
  }

  return <Ctx.Provider value={{ admin, loading, login, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
