import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Save, Layout } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { ImageField } from '../../components/MediaPicker'
import { api } from '../../api/adminApi'

const ipt =
  'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

interface CTAData {
  headline: string
  subtext: string
  primaryButtonText: string
  primaryButtonUrl: string
  secondaryButtonText: string
  secondaryButtonUrl: string
  backgroundImage: string
  backgroundColor: string
  enabled: boolean
}

const DEFAULT: CTAData = {
  headline: '',
  subtext: '',
  primaryButtonText: 'Get In Touch',
  primaryButtonUrl: '/contact',
  secondaryButtonText: 'Learn More',
  secondaryButtonUrl: '#',
  backgroundImage: '',
  backgroundColor: '',
  enabled: true,
}

export default function CTASectionEdit() {
  const { section = 'home' } = useParams<{ section: string }>()
  const [data, setData] = useState<CTAData>(DEFAULT)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const key = `cta-${section}`
  const label = section.charAt(0).toUpperCase() + section.slice(1).replace(/-/g, ' ')

  useEffect(() => {
    api
      .getSection(key)
      .then(res => {
        if (res.data) setData({ ...DEFAULT, ...(res.data as CTAData) })
      })
      .catch(() => {})
  }, [key])

  const set = <K extends keyof CTAData>(field: K, val: CTAData[K]) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true)
    setError('')
    try {
      await api.updateSection(key, data)
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
      <div className="max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-700/50 grid place-items-center">
              <Layout size={18} className="text-slate-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">CTA Section</h1>
              <p className="text-slate-400 text-sm">{label} page call-to-action</p>
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

        <div className="space-y-5">
          {/* Enable toggle */}
          <div className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800 rounded-xl">
            <div>
              <div className="text-sm font-medium text-white">Show CTA Section</div>
              <div className="text-xs text-slate-500 mt-0.5">
                Toggle visibility of this call-to-action block
              </div>
            </div>
            <button
              type="button"
              onClick={() => set('enabled', !data.enabled)}
              className={`relative rounded-full transition-colors shrink-0 ${
                data.enabled ? 'bg-brand-accent/80' : 'bg-slate-700'
              }`}
              style={{ width: '40px', height: '22px' }}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${
                  data.enabled ? 'translate-x-[18px]' : ''
                }`}
              />
            </button>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Headline</label>
            <input
              value={data.headline}
              onChange={e => set('headline', e.target.value)}
              className={ipt}
              placeholder="Ready to grow with us?"
            />
          </div>

          {/* Subtext */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Subtext</label>
            <textarea
              rows={3}
              value={data.subtext}
              onChange={e => set('subtext', e.target.value)}
              className={`${ipt} resize-none`}
              placeholder="Supporting text below the headline…"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Primary Button Text
              </label>
              <input
                value={data.primaryButtonText}
                onChange={e => set('primaryButtonText', e.target.value)}
                className={ipt}
                placeholder="Get In Touch"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Primary Button URL
              </label>
              <input
                value={data.primaryButtonUrl}
                onChange={e => set('primaryButtonUrl', e.target.value)}
                className={ipt}
                placeholder="/contact"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Secondary Button Text
              </label>
              <input
                value={data.secondaryButtonText}
                onChange={e => set('secondaryButtonText', e.target.value)}
                className={ipt}
                placeholder="Learn More"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">
                Secondary Button URL
              </label>
              <input
                value={data.secondaryButtonUrl}
                onChange={e => set('secondaryButtonUrl', e.target.value)}
                className={ipt}
                placeholder="#about"
              />
            </div>
          </div>

          {/* Background image */}
          <ImageField
            label="Background Image (optional)"
            value={data.backgroundImage}
            onChange={v => set('backgroundImage', v)}
            folder="misc"
          />

          {/* Background color */}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">
              Background Colour{' '}
              <span className="text-slate-600">(hex, optional — overrides image tint)</span>
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.backgroundColor || '#0a2818'}
                onChange={e => set('backgroundColor', e.target.value)}
                className="w-10 h-9 rounded-lg border border-slate-700 bg-slate-800 cursor-pointer p-1 shrink-0"
              />
              <input
                value={data.backgroundColor}
                onChange={e => set('backgroundColor', e.target.value)}
                className={ipt}
                placeholder="#0a2818"
              />
            </div>
          </div>

          {/* Live Preview */}
          {data.headline && (
            <div>
              <div className="text-xs text-slate-500 mb-2 font-medium uppercase tracking-wider">
                Preview
              </div>
              <div
                className="relative rounded-xl overflow-hidden"
                style={{ background: data.backgroundColor || '#0a2818' }}
              >
                {data.backgroundImage && (
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${data.backgroundImage})` }}
                  />
                )}
                <div className="relative p-8 text-center">
                  <h3 className="text-white text-lg font-bold mb-2">{data.headline}</h3>
                  {data.subtext && (
                    <p className="text-white/70 text-sm mb-5">{data.subtext}</p>
                  )}
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    {data.primaryButtonText && (
                      <span className="bg-brand-accent text-white text-xs font-semibold px-5 py-2 rounded-lg">
                        {data.primaryButtonText}
                      </span>
                    )}
                    {data.secondaryButtonText && (
                      <span className="border border-white/30 text-white text-xs font-semibold px-5 py-2 rounded-lg">
                        {data.secondaryButtonText}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
