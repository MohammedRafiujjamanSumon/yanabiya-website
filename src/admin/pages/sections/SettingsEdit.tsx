import { useState } from 'react'
import { Save, Eye, EyeOff, Shield } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { useAuth } from '../../context/AuthContext'

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function SettingsEdit() {
  const { admin } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'err', text: 'New passwords do not match' }); return
    }
    if (newPassword.length < 6) {
      setMsg({ type: 'err', text: 'Password must be at least 6 characters' }); return
    }
    setSaving(true); setMsg(null)
    try {
      await api.changePassword(currentPassword, newPassword)
      setMsg({ type: 'ok', text: 'Password updated successfully' })
      setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    } catch (err: unknown) {
      setMsg({ type: 'err', text: err instanceof Error ? err.message : 'Failed to update password' })
    } finally { setSaving(false) }
  }

  return (
    <AdminLayout>
      <div className="max-w-lg">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your admin account</p>
        </div>

        {/* Account info */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-accent/20 grid place-items-center text-brand-accent text-2xl font-bold">
              {admin?.name?.[0] ?? 'A'}
            </div>
            <div>
              <div className="font-semibold text-white">{admin?.name}</div>
              <div className="text-slate-400 text-sm">{admin?.email}</div>
              <div className="inline-flex items-center gap-1 mt-1 text-[11px] bg-brand-accent/15 text-brand-accent px-2 py-0.5 rounded-full">
                <Shield size={10} /> {admin?.role}
              </div>
            </div>
          </div>
        </div>

        {/* Change password */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-4">Change Password</h2>
          <form onSubmit={handleChangePassword} className="space-y-3">
            {msg && (
              <div className={`text-sm px-4 py-3 rounded-xl ${
                msg.type === 'ok' ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                                  : 'bg-red-500/10 border border-red-500/30 text-red-400'}`}>
                {msg.text}
              </div>
            )}
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Current Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  required className={`${ipt} pr-10`} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">New Password</label>
              <input type={showPw ? 'text' : 'password'} value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required minLength={6} className={ipt} />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Confirm New Password</label>
              <input type={showPw ? 'text' : 'password'} value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required className={ipt} />
            </div>
            <button type="submit" disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-brand-accent hover:bg-brand-accentDark
                         text-white text-sm font-semibold py-2.5 rounded-xl transition-all disabled:opacity-50 mt-2">
              <Save size={14} /> {saving ? 'Saving…' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
