import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { admin, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="w-8 h-8 rounded-full border-4 border-brand-accent border-t-transparent animate-spin" />
    </div>
  )
  if (!admin) return <Navigate to="/admin/login" replace />
  return <>{children}</>
}
