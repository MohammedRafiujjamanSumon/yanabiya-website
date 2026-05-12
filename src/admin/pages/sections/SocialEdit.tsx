import { useEffect, useState } from 'react'
import { Save, Globe2, Info } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface SocialLinks {
  linkedin: string
  twitter: string
  facebook: string
  instagram: string
  youtube: string
  whatsapp: string
  tiktok: string
}

const DEFAULT: SocialLinks = {
  linkedin: '',
  twitter: '',
  facebook: '',
  instagram: '',
  youtube: '',
  whatsapp: '',
  tiktok: '',
}

const PLATFORMS: { key: keyof SocialLinks; label: string; placeholder: string }[] = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/company/yanabiya',
  },
  {
    key: 'twitter',
    label: 'Twitter / X',
    placeholder: 'https://twitter.com/yanabiya',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/yanabiya',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/yanabiya',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    placeholder: 'https://youtube.com/@yanabiya',
  },
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    placeholder: '+968 9000 0000 or https://wa.me/968…',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@yanabiya',
  },
]

export default function SocialEdit() {
  const [data, setData] = useState<SocialLinks>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .getSection('social-links')
      .then(res => {
        if (res.data) setData({ ...DEFAULT, ...(res.data as SocialLinks) })
      })
      .catch(() => {})
  }, [])

  const set = (field: keyof SocialLinks, val: string) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection('social-links', data)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <Globe2 size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Social Links</h1>
              <p className="text-slate-400 text-sm">Website social media profiles</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {error && (
              <span className="text-xs text-red-400 bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-lg">
                {error}
              </span>
            )}
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                         text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
            >
              <Save size={15} />
              {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Helper tip */}
        <div className="flex items-start gap-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 mb-6">
          <Info size={14} className="text-slate-400 mt-0.5 shrink-0" />
          <p className="text-xs text-slate-400">
            Leave blank to hide a social link from the website. Changes apply to the footer and
            any social icons across the site.
          </p>
        </div>

        <div className="space-y-4">
          {PLATFORMS.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">{label}</label>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-800 border border-slate-700 grid place-items-center">
                  <Globe2 size={13} className="text-slate-500" />
                </div>
                <input
                  value={data[key]}
                  onChange={e => set(key, e.target.value)}
                  className={ipt}
                  placeholder={placeholder}
                  type="url"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
