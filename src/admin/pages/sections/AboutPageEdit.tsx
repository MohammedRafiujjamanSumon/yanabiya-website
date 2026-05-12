import { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { ImageField } from '../../components/MediaPicker'
import { api } from '../../api/adminApi'

interface AboutPageData {
  heroEyebrow: string; heroH1: string; heroSpan: string
  heroPara: string; heroBg: string
  proofSectorsLabel: string; proofSectorsBody: string
  proofCountriesLabel: string; proofCountriesBody: string
  proofTrustLabel: string; proofTrustBody: string
  identityP1: string; identityP2: string; identityP3: string
  missionTitle: string; missionBody: string
  visionTitle: string; visionBody: string
  valuesTitle: string; valuesBody: string
  urlOurStory: string; urlLeadership: string
  urlBoard: string; urlCeo: string; urlViceChairman: string
  ctaH2Part1: string; ctaH2Part2: string
  ctaButtonText: string; ctaButtonHref: string
}

const DEFAULTS: AboutPageData = {
  heroEyebrow: 'About the Group',
  heroH1:      'We Build for the Long',
  heroSpan:    'Term.',
  heroPara:    'A multi-sector, multi-country group built on trade, technology, and community — operating across Oman, the United Kingdom, Bangladesh, and the USA.',
  heroBg:      '',
  proofSectorsLabel:   'Sectors',   proofSectorsBody:   '6 industries — technology, trade, talent, logistics, consulting, and community.',
  proofCountriesLabel: 'Countries', proofCountriesBody: '4 country operations: Oman, UK, Bangladesh, and USA.',
  proofTrustLabel:     'Trust',     proofTrustBody:     'A decade-plus of consistent delivery to clients across four continents.',
  identityP1: 'Yanabiya Group was established with a clear purpose: to build enduring businesses that create real value — for clients, communities, and countries.',
  identityP2: 'From logistics and trade to technology and talent, we operate across industries that underpin economic life, providing services that clients in four countries rely on every day.',
  identityP3: 'Our structure — four country operations under one group — gives us the discipline of a global company and the agility of a local partner.',
  missionTitle: 'Mission',
  missionBody:  'To deliver consistent, cross-border value through disciplined operations, principled leadership, and deep local knowledge.',
  visionTitle:  'Vision',
  visionBody:   'To be the most trusted multi-sector group across the markets we serve — measured by client loyalty, community impact, and long-term growth.',
  valuesTitle:  'Values',
  valuesBody:   'Integrity, excellence, collaboration, and accountability — applied equally across every country, every service, and every team.',
  urlOurStory:     '/about/our-story',
  urlLeadership:   '/leadership/management',
  urlBoard:        '/people/board',
  urlCeo:          '/people/ceo',
  urlViceChairman: '/people/vice-chairman',
  ctaH2Part1:    'Read the Full',
  ctaH2Part2:    'Story.',
  ctaButtonText: 'Our Full Story',
  ctaButtonHref: '/about/our-story',
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

function TF({ label, value, onChange, rows = 1, placeholder }: { label: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1.5 font-medium">{label}</label>
      {rows === 1
        ? <input value={value} onChange={e => onChange(e.target.value)} className={ipt} placeholder={placeholder} />
        : <textarea rows={rows} value={value} onChange={e => onChange(e.target.value)} className={`${ipt} resize-none`} placeholder={placeholder} />
      }
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
        const d = (res?.data ?? {}) as Partial<AboutPageData>
        setData({
          heroEyebrow:         d.heroEyebrow         ?? DEFAULTS.heroEyebrow,
          heroH1:              d.heroH1              ?? DEFAULTS.heroH1,
          heroSpan:            d.heroSpan            ?? DEFAULTS.heroSpan,
          heroPara:            d.heroPara            ?? DEFAULTS.heroPara,
          heroBg:              d.heroBg              ?? DEFAULTS.heroBg,
          proofSectorsLabel:   d.proofSectorsLabel   ?? DEFAULTS.proofSectorsLabel,
          proofSectorsBody:    d.proofSectorsBody    ?? DEFAULTS.proofSectorsBody,
          proofCountriesLabel: d.proofCountriesLabel ?? DEFAULTS.proofCountriesLabel,
          proofCountriesBody:  d.proofCountriesBody  ?? DEFAULTS.proofCountriesBody,
          proofTrustLabel:     d.proofTrustLabel     ?? DEFAULTS.proofTrustLabel,
          proofTrustBody:      d.proofTrustBody      ?? DEFAULTS.proofTrustBody,
          identityP1:          d.identityP1          ?? DEFAULTS.identityP1,
          identityP2:          d.identityP2          ?? DEFAULTS.identityP2,
          identityP3:          d.identityP3          ?? DEFAULTS.identityP3,
          missionTitle:        d.missionTitle        ?? DEFAULTS.missionTitle,
          missionBody:         d.missionBody         ?? DEFAULTS.missionBody,
          visionTitle:         d.visionTitle         ?? DEFAULTS.visionTitle,
          visionBody:          d.visionBody          ?? DEFAULTS.visionBody,
          valuesTitle:         d.valuesTitle         ?? DEFAULTS.valuesTitle,
          valuesBody:          d.valuesBody          ?? DEFAULTS.valuesBody,
          urlOurStory:         d.urlOurStory         ?? DEFAULTS.urlOurStory,
          urlLeadership:       d.urlLeadership       ?? DEFAULTS.urlLeadership,
          urlBoard:            d.urlBoard            ?? DEFAULTS.urlBoard,
          urlCeo:              d.urlCeo              ?? DEFAULTS.urlCeo,
          urlViceChairman:     d.urlViceChairman     ?? DEFAULTS.urlViceChairman,
          ctaH2Part1:          d.ctaH2Part1          ?? DEFAULTS.ctaH2Part1,
          ctaH2Part2:          d.ctaH2Part2          ?? DEFAULTS.ctaH2Part2,
          ctaButtonText:       d.ctaButtonText       ?? DEFAULTS.ctaButtonText,
          ctaButtonHref:       d.ctaButtonHref       ?? DEFAULTS.ctaButtonHref,
        })
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

  if (!data) return <AdminLayout><div className="h-80 bg-slate-900 rounded-xl animate-pulse" /></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">About Us Page</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit all content on the About Us page</p>
          </div>
          <button onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white
                       text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15} /> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-6">

          {/* ── Hero Section ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Hero Section</h2>
            <TF label="Eyebrow (small label above heading)" value={data.heroEyebrow} onChange={v => set('heroEyebrow', v)} />
            <div className="grid grid-cols-2 gap-3">
              <TF label="H1 — First line" value={data.heroH1} onChange={v => set('heroH1', v)} placeholder="We Build for the Long" />
              <TF label="H1 — Accent line (green)" value={data.heroSpan} onChange={v => set('heroSpan', v)} placeholder="Term." />
            </div>
            <TF label="Hero Paragraph" value={data.heroPara} onChange={v => set('heroPara', v)} rows={3} />
            <ImageField label="Hero Background Image (optional overlay)" value={data.heroBg} onChange={v => set('heroBg', v)} folder="pages" />
          </div>

          {/* ── Proof Points ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Hero Proof Point Cards</h2>
            {(
              [
                { labelF: 'proofSectorsLabel'   as const, bodyF: 'proofSectorsBody'   as const, accent: 'Sectors Card'   },
                { labelF: 'proofCountriesLabel' as const, bodyF: 'proofCountriesBody' as const, accent: 'Countries Card' },
                { labelF: 'proofTrustLabel'     as const, bodyF: 'proofTrustBody'     as const, accent: 'Trust Card'     },
              ]
            ).map(({ labelF, bodyF, accent }) => (
              <div key={labelF} className="bg-slate-800/60 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{accent}</p>
                <div className="grid grid-cols-2 gap-3">
                  <TF label="Label" value={data[labelF]} onChange={v => set(labelF, v)} />
                  <TF label="Body"  value={data[bodyF]}  onChange={v => set(bodyF, v)} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Who We Are ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Who We Are</h2>
            <TF label="Paragraph 1" value={data.identityP1} onChange={v => set('identityP1', v)} rows={3} />
            <TF label="Paragraph 2" value={data.identityP2} onChange={v => set('identityP2', v)} rows={3} />
            <TF label="Paragraph 3" value={data.identityP3} onChange={v => set('identityP3', v)} rows={3} />
          </div>

          {/* ── Mission / Vision / Values ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Mission / Vision / Values</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              <TF label="Mission Title" value={data.missionTitle} onChange={v => set('missionTitle', v)} />
              <TF label="Vision Title"  value={data.visionTitle}  onChange={v => set('visionTitle', v)} />
              <TF label="Values Title"  value={data.valuesTitle}  onChange={v => set('valuesTitle', v)} />
            </div>
            <TF label="Mission Body" value={data.missionBody} onChange={v => set('missionBody', v)} rows={3} />
            <TF label="Vision Body"  value={data.visionBody}  onChange={v => set('visionBody', v)}  rows={3} />
            <TF label="Values Body"  value={data.valuesBody}  onChange={v => set('valuesBody', v)}  rows={3} />
          </div>

          {/* ── CTA Section ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">CTA Section (bottom banner)</h2>
            <div className="grid grid-cols-2 gap-3">
              <TF label="Heading — Line 1"         value={data.ctaH2Part1}    onChange={v => set('ctaH2Part1', v)}    placeholder="Read the Full" />
              <TF label="Heading — Line 2 (accent)" value={data.ctaH2Part2}    onChange={v => set('ctaH2Part2', v)}    placeholder="Story." />
              <TF label="Button Text"               value={data.ctaButtonText} onChange={v => set('ctaButtonText', v)} />
              <TF label="Button Link"               value={data.ctaButtonHref} onChange={v => set('ctaButtonHref', v)} />
            </div>
          </div>

          {/* ── Sub-page URLs ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-slate-800 pb-3">Sub-page URLs</h2>
            <p className="text-xs text-slate-500 -mt-2">Changing these updates the URLs used in the navbar "Our People" dropdown and footer links.</p>
            <TF label="Our Story"       value={data.urlOurStory}     onChange={v => set('urlOurStory', v)}     placeholder="/about/our-story" />
            <TF label="Leadership"      value={data.urlLeadership}   onChange={v => set('urlLeadership', v)}   placeholder="/leadership/management" />
            <TF label="Board"           value={data.urlBoard}        onChange={v => set('urlBoard', v)}        placeholder="/people/board" />
            <TF label="Chairman & CEO"  value={data.urlCeo}          onChange={v => set('urlCeo', v)}          placeholder="/people/ceo" />
            <TF label="Vice Chairman"   value={data.urlViceChairman} onChange={v => set('urlViceChairman', v)} placeholder="/people/vice-chairman" />
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
