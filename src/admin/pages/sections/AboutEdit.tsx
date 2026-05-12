import { useEffect, useState } from 'react'
import { Save, Plus, Trash2 } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { ImageField } from '../../components/MediaPicker'
import { api } from '../../api/adminApi'

interface Pillar { title: string; body: string }
interface VMGCard { label: string; body: string }
interface AboutData {
  intro: string
  pillars: Pillar[]
  officePhoto: string
  tagline: string
  visionCard: VMGCard
  missionCard: VMGCard
  goalCard: VMGCard
}

const DEFAULTS: AboutData = {
  intro: 'A trusted international group of companies operating across Oman, the United Kingdom, Bangladesh, and the USA — delivering real value through technology, trade, talent and consulting since 1998.',
  pillars: [
    { title: 'Technology & Digital',  body: 'Custom software, AI solutions, ERP systems, cloud infrastructure, and digital transformation for enterprises across all four countries.' },
    { title: 'Trade & Commerce',      body: 'Multi-sector international trading operations — export, import, garment sourcing, brokerage, and end-to-end supply chain management.' },
    { title: 'Talent & Manpower',     body: 'Skilled and semi-skilled recruitment, workforce mobility, visa coordination, student placement, and aviation crew services.' },
    { title: 'Consulting & Advisory', body: 'Business strategy, commercial agency, PRO services, office management, and accounting for companies entering new markets.' },
  ],
  officePhoto: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&crop=center&w=1200&h=900&q=90',
  tagline: 'One Group. Four Countries. Real Impact.',
  visionCard:  { label: 'Vision',  body: 'To be the most trusted multi-sector partner across the markets we serve — measured by client loyalty, community impact, and long-term growth.' },
  missionCard: { label: 'Mission', body: 'To deliver consistent, cross-border value through disciplined operations, principled leadership, and deep local knowledge.' },
  goalCard:    { label: 'Goal',    body: 'Sustainable growth that creates lasting impact for clients, communities, and countries across all regions we operate in.' },
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

export default function AboutEdit() {
  const [data, setData] = useState<AboutData>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.getSection('about')
      .then(res => {
        const d = res.data as Partial<AboutData>
        setData({
          intro:       d?.intro                                        ?? DEFAULTS.intro,
          pillars:     Array.isArray(d?.pillars) && d.pillars.length  ? d.pillars : DEFAULTS.pillars,
          officePhoto: d?.officePhoto                                  ?? DEFAULTS.officePhoto,
          tagline:     d?.tagline                                      ?? DEFAULTS.tagline,
          visionCard:  d?.visionCard?.label  ? d.visionCard  : DEFAULTS.visionCard,
          missionCard: d?.missionCard?.label ? d.missionCard : DEFAULTS.missionCard,
          goalCard:    d?.goalCard?.label    ? d.goalCard    : DEFAULTS.goalCard,
        })
      })
      .catch(() => { /* use defaults */ })
  }, [])

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('about', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const setPillar = (i: number, field: keyof Pillar, val: string) => {
    const pillars = [...data.pillars]; pillars[i] = { ...pillars[i], [field]: val }
    setData({ ...data, pillars })
  }

  const setVMG = (card: 'visionCard' | 'missionCard' | 'goalCard', field: keyof VMGCard, val: string) => {
    setData({ ...data, [card]: { ...data[card], [field]: val } })
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">About Section</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit office photo, tagline, intro, VMG cards and service pillars</p>
          </div>
          <button onClick={save} disabled={saving || !data}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-5">
          {/* Office Photo & Tagline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Photo &amp; Tagline</h2>
            <ImageField
              label="Office Photo (left column image)"
              value={data.officePhoto}
              onChange={v => setData({ ...data, officePhoto: v })}
              folder="pages"
            />
            <div>
              <label className="block text-xs text-slate-400 mb-1.5 font-medium">Tagline Pill Text</label>
              <input value={data.tagline} onChange={e => setData({ ...data, tagline: e.target.value })}
                className={ipt} placeholder="One Group. Four Countries. Real Impact." />
            </div>
          </div>

          {/* Company Intro */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">Company Intro</label>
            <textarea rows={3} value={data.intro}
              onChange={e => setData({ ...data, intro: e.target.value })}
              className={`${ipt} resize-none`}
              placeholder="A trusted international group of companies…" />
          </div>

          {/* Vision / Mission / Goal cards */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Vision / Mission / Goal Cards</h2>
            {(
              [
                { key: 'visionCard',  color: 'text-sky-400',     accent: 'Vision'  },
                { key: 'missionCard', color: 'text-emerald-400', accent: 'Mission' },
                { key: 'goalCard',    color: 'text-orange-400',  accent: 'Goal'    },
              ] as { key: 'visionCard' | 'missionCard' | 'goalCard'; color: string; accent: string }[]
            ).map(({ key, color, accent }) => (
              <div key={key} className="bg-slate-800/60 rounded-xl p-4 space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${color}`}>{accent}</p>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Label (heading)</label>
                  <input value={data[key].label} onChange={e => setVMG(key, 'label', e.target.value)}
                    className={ipt} placeholder={accent} />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Body text</label>
                  <textarea rows={2} value={data[key].body} onChange={e => setVMG(key, 'body', e.target.value)}
                    className={`${ipt} resize-none`} placeholder="Description…" />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Service Pillars Grid</h2>
              <button type="button" onClick={() => setData({ ...data, pillars: [...data.pillars, { title: '', body: '' }] })}
                className="flex items-center gap-1 text-xs text-brand-accent hover:text-brand-accentDark transition-colors">
                <Plus size={12} /> Add Pillar
              </button>
            </div>
            <div className="space-y-4">
              {data.pillars.map((p, i) => (
                <div key={i} className="bg-slate-800 rounded-xl p-4 space-y-3 relative group">
                  <input value={p.title} onChange={e => setPillar(i, 'title', e.target.value)}
                    className={ipt} placeholder="Technology" />
                  <textarea rows={2} value={p.body} onChange={e => setPillar(i, 'body', e.target.value)}
                    className={`${ipt} resize-none`} placeholder="Description…" />
                  <button type="button" onClick={() => setData({ ...data, pillars: data.pillars.filter((_, j) => j !== i) })}
                    aria-label={`Remove pillar ${i+1}`}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 w-6 h-6
                               bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                    <Trash2 size={11} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
