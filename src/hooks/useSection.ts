import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'
const CACHE_PREFIX = 'yg_section_v3_'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

// Evict all entries from the old cache prefix on first load
if (typeof window !== 'undefined') {
  Object.keys(localStorage)
    .filter(k => k.startsWith('yg_section_') && !k.startsWith('yg_section_v2_'))
    .forEach(k => localStorage.removeItem(k))
}

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw) as { data: T; ts: number }
    if (Date.now() - ts > CACHE_TTL_MS) return null
    return data
  } catch {
    return null
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ data, ts: Date.now() }))
  } catch { /* storage full — skip */ }
}

export function useSection<T>(key: string): T | null {
  // Initialise from cache immediately so content shows even before network responds
  const [data, setData] = useState<T | null>(() => readCache<T>(key))
  const keyRef = useRef(key)
  keyRef.current = key

  const fetchData = () => {
    fetch(`${BASE}/api/content/${keyRef.current}`)
      .then(r => r.ok ? r.json() : null)
      .then(res => {
        if (res?.data) {
          setData(res.data as T)
          writeCache(keyRef.current, res.data)
        }
      })
      .catch(() => {
        // Network down — cached state (already set above) stays visible
      })
  }

  useEffect(() => {
    // Fetch fresh data on mount
    fetchData()

    // When network comes back online, re-fetch to get latest content
    window.addEventListener('online', fetchData)
    return () => window.removeEventListener('online', fetchData)
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return data
}
