import { useEffect, useState } from 'react'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

export function useSection<T>(key: string): T | null {
  const [data, setData] = useState<T | null>(null)
  useEffect(() => {
    fetch(`${BASE}/api/content/${key}`)
      .then(r => r.ok ? r.json() : null)
      .then(res => { if (res?.data) setData(res.data as T) })
      .catch(() => {})
  }, [key])
  return data
}
