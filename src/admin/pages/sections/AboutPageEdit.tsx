import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'

interface AboutPageData {
  heroPara: string
  identityP1: string
  identityP2: string
  identityP3: string
  missionTitle: string
  missionBody: string
  visionTitle: string
  visionBody: string
  valuesTitle: string
  valuesBody: string
}

const DEFAULTS: AboutPageData = {
  heroPara: 'A multi-sector, multi-country group built on trade, technology, and community — operating across Oman, the United Kingdom, Bangladesh, and the USA.',
  identityP1: 'Yanabiya Group was established with a clear purpose: to build enduring businesses that create real value — for clients, communities, and countries.',
  identityP2: 'From logistics and trade to technology and talent, we operate across industries that underpin economic life, providing services that clients in four countries rely on every day.',
  identityP3: 'Our structure — four country operations under one group — gives us the discipline of a global company and the agility of a local partner.',
  missionTitle: 'Mission',
  missionBody: 'To deliver consistent, cross-border value through disciplined operations, principled leadership, and deep local knowledge.',
  visionTitle: 'Vision',
  visionBody: 'To be the most trusted multi-sector group across the markets we serve — measured by client loyalty, community impact, and long-term growth.',
  valuesTitle: 'Values',
  valuesBody: 'Integrity, excellence, collaboration, and accountability — applied equally across every country, every service, and every team.',
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all resize-none'

function Field({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={ipt}
      />
    </div>
  )
}

export default function AboutPageEdit() {
  const [data, setData] = useState<AboutPageData | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('about-page')
      .then(res => {
        if (res?.data) setData(res.data as AboutPageData)
        else setData(DEFAULTS)
      })
      .catch(() => setData(DEFAULTS))
  }, [])

  const save = async () => {
    if (!data) return
    setSaving(true); setError('')
    try {
      await api.updateSection('about-page', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const set = (field: keyof AboutPageData, val: string) => {
    if (!data) return
    setData({ ...data, [field]: val })
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">About Us Page</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit hero paragraph, identity text, and mission/vision/values</p>
          </div>
          <button
            onClick={save}
            disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50"
          >
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {!data && !error && <div className="h-80 bg-slate-900 rounded-xl animate-pulse" />}

        {data && (
          <div className="space-y-6">
            {/* Hero & Intro */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Hero &amp; Intro</h2>
              <Field label="Hero Paragraph" value={data.heroPara} onChange={v => set('heroPara', v)} rows={3} />
              <Field label="Who We Are — Paragraph 1" value={data.identityP1} onChange={v => set('identityP1', v)} rows={3} />
              <Field label="Who We Are — Paragraph 2" value={data.identityP2} onChange={v => set('identityP2', v)} rows={3} />
              <Field label="Who We Are — Paragraph 3" value={data.identityP3} onChange={v => set('identityP3', v)} rows={3} />
            </div>

            {/* Mission / Vision / Values */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Mission / Vision / Values</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <Field label="Mission Title" value={data.missionTitle} onChange={v => set('missionTitle', v)} rows={1} />
                <Field label="Vision Title" value={data.visionTitle} onChange={v => set('visionTitle', v)} rows={1} />
              </div>
              <Field label="Mission Body" value={data.missionBody} onChange={v => set('missionBody', v)} rows={3} />
              <Field label="Vision Body" value={data.visionBody} onChange={v => set('visionBody', v)} rows={3} />
              <Field label="Values Title" value={data.valuesTitle} onChange={v => set('valuesTitle', v)} rows={1} />
              <Field label="Values Body" value={data.valuesBody} onChange={v => set('valuesBody', v)} rows={3} />
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
