import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { ImageField } from '../../components/MediaPicker'

interface Pillar { label: string; description: string; image: string; bg: string }
interface CountryItem { title: string; body: string }
interface Commitment { year: string; goal: string }
interface CommStat { value: string; label: string }

interface SGData {
  pillars: Pillar[]
  sectionHeading: string
  sectionSub: string
  countryInitiatives: Record<string, CountryItem[]>
  commitments: Commitment[]
}

interface CCData {
  pillars: Pillar[]
  sectionHeading: string
  sectionSub: string
  countryPrograms: Record<string, string[]>
  stats: CommStat[]
}

type Tab = 'sustainable-growth' | 'community-care'

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const COUNTRY_CODES = ['OM', 'GB', 'BD', 'US']
const COUNTRY_LABELS: Record<string, string> = { OM: '🇴🇲 Oman', GB: '🇬🇧 UK', BD: '🇧🇩 Bangladesh', US: '🇺🇸 USA' }

const SG_DEFAULTS: SGData = {
  pillars: [
    { label: 'Green Operations',   description: 'Energy-efficient offices and responsible resource usage across all branches.',                         image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80', bg: 'bg-emerald-500' },
    { label: 'Circular Practices', description: 'Reuse, recycle and minimise waste across procurement, packaging and logistics.',                       image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=400&q=80', bg: 'bg-sky-500' },
    { label: 'Climate Commitment', description: 'Tree plantation drives and lower-emission business models for long-term impact.',                       image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80', bg: 'bg-amber-500' },
    { label: 'Inclusive Growth',   description: 'Fair employment, local hiring, and supplier partnerships that strengthen communities.',                image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80', bg: 'bg-rose-500' },
  ],
  sectionHeading: 'Sustainable Growth',
  sectionSub: 'Building business practices that protect the environment and support long-term value.',
  countryInitiatives: {
    OM: [
      { title: 'Green HQ retrofit', body: 'LED lighting and low-water fittings rolled out across our Muscat offices.' },
      { title: 'Local sourcing',    body: 'Priority to Omani SMEs for construction materials and facility services.' },
      { title: 'Tree plantation',   body: 'Annual greening drive coordinated with municipal partners.' },
    ],
    GB: [
      { title: 'Carbon reporting', body: 'UK entity tracks emissions under national energy and carbon reporting standards.' },
      { title: 'Supplier code',    body: 'London operations onboard suppliers under ethical sourcing requirements.' },
      { title: 'Digital first',    body: 'Paperless workflows for contracts, invoices and HR documentation.' },
    ],
    BD: [
      { title: 'Local hiring',        body: 'Hiring from communities around our Uttarkhan office in Dhaka.' },
      { title: 'Vocational training', body: 'Skills programmes enabling long-term employability in IT and trade.' },
      { title: 'Plastic reduction',   body: 'Packaging and logistics reviewed to reduce single-use plastics.' },
    ],
    US: [
      { title: 'Clean energy office', body: 'Austin operations adopt renewable-energy plans where available.' },
      { title: 'Diversity hiring',    body: 'Partnerships with Texan community colleges for inclusive talent pipelines.' },
      { title: 'Remote-first',        body: 'Flexible work reduces commute emissions across our US team.' },
    ],
  },
  commitments: [
    { year: '2026', goal: 'Baseline emissions reporting across all four countries' },
    { year: '2028', goal: 'Fifty percent renewable-energy share at headquarters' },
    { year: '2030', goal: 'Carbon-neutral operations for all office locations' },
  ],
}

const CC_DEFAULTS: CCData = {
  pillars: [
    { label: 'Welfare',       description: 'Structured charitable drives supporting families in need with dignity and transparency.',             image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80', bg: 'bg-emerald-500' },
    { label: 'Education',     description: 'Scholarships, school programmes and learning resources for underserved communities.',                 image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80', bg: 'bg-sky-500' },
    { label: 'Health',        description: 'Free health camps, medical support and awareness programmes across regions.',                         image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80', bg: 'bg-amber-500' },
    { label: 'Empowerment',   description: 'Skills training and livelihood programmes that build long-term independence.',                        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80', bg: 'bg-rose-500' },
  ],
  sectionHeading: 'Community Care',
  sectionSub: 'Initiatives that make a real difference in the lives of communities we serve.',
  countryPrograms: {
    OM: ['Annual welfare drive for low-income households across Muscat', 'Education scholarships for Omani students pursuing tertiary degrees', 'Community health camps in partnership with local clinics'],
    GB: ['Volunteer hours with UK charity partners and food banks', 'Academic engagement with London universities', 'Diversity and inclusion mentorship programmes'],
    BD: ['Rural education support across Uttarkhan and nearby communities', 'Medical camps and subsidised healthcare outreach', 'Women-led livelihood programmes and vocational training'],
    US: ['STEM scholarships for first-generation students in Texas', 'Community technology workshops for small business owners', 'Disaster relief contributions through certified US charities'],
  },
  stats: [
    { value: '500+', label: 'Beneficiaries' },
    { value: '4',    label: 'Countries' },
    { value: '15Y',  label: 'Track Record' },
    { value: '25+',  label: 'Programmes' },
  ],
}

function PillarEditor({ pillars, onChange }: { pillars: Pillar[]; onChange: (p: Pillar[]) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null)
  const update = (idx: number, f: keyof Pillar, v: string) => {
    const next = [...pillars]; next[idx] = { ...next[idx], [f]: v }; onChange(next)
  }
  const BG_OPTIONS = ['bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-rose-500', 'bg-violet-500', 'bg-orange-500']
  return (
    <div className="space-y-2">
      {pillars.map((p, i) => (
        <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className={`w-3 h-3 rounded-full shrink-0 ${p.bg}`} />
            <button type="button" onClick={() => setExpanded(expanded === i ? null : i)}
              className="flex-1 text-left text-sm text-white font-medium">{p.label || `Pillar ${i+1}`}</button>
            <button type="button" onClick={() => setExpanded(expanded === i ? null : i)}
              className="text-slate-500 hover:text-slate-300 p-1 transition-colors">
              {expanded === i ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
            </button>
            <button type="button" onClick={() => onChange(pillars.filter((_,j)=>j!==i))} aria-label={`Remove pillar ${i+1}`}
              className="text-slate-600 hover:text-red-400 p-1 transition-colors"><Trash2 size={13}/></button>
          </div>
          {expanded === i && (
            <div className="px-3 pb-3 border-t border-slate-700 pt-3 space-y-2">
              <input value={p.label} onChange={e => update(i, 'label', e.target.value)} className={ipt} placeholder="Pillar name" aria-label="Pillar label" />
              <textarea rows={2} value={p.description} onChange={e => update(i, 'description', e.target.value)} className={`${ipt} resize-none`} placeholder="Description" aria-label="Pillar description" />
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Accent Colour</label>
                <div className="flex gap-2 flex-wrap">
                  {BG_OPTIONS.map(bg => (
                    <button key={bg} type="button" onClick={() => update(i, 'bg', bg)}
                      className={`w-6 h-6 rounded-full ${bg} ${p.bg === bg ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''}`}
                      aria-label={bg} />
                  ))}
                </div>
              </div>
              <ImageField label="Photo" value={p.image} onChange={v => update(i, 'image', v)} folder="community" />
            </div>
          )}
        </div>
      ))}
      <button type="button" onClick={() => onChange([...pillars, { label: '', description: '', image: '', bg: 'bg-emerald-500' }])}
        className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
        <Plus size={13}/> Add Pillar
      </button>
    </div>
  )
}

export default function CommunityPagesEdit() {
  const [activeTab, setActiveTab] = useState<Tab>('sustainable-growth')
  const [sgData, setSgData] = useState<SGData>(SG_DEFAULTS)
  const [ccData, setCcData] = useState<CCData>(CC_DEFAULTS)
  const [sgSaving, setSgSaving] = useState(false); const [sgSaved, setSgSaved] = useState(false)
  const [ccSaving, setCcSaving] = useState(false); const [ccSaved, setCcSaved] = useState(false)
  const [error, setError] = useState('')
  const [openSgSection, setOpenSgSection] = useState('pillars')
  const [openCcSection, setOpenCcSection] = useState('pillars')
  const [sgCountry, setSgCountry] = useState('OM')
  const [ccCountry, setCcCountry] = useState('OM')

  useEffect(() => {
    api.getSection('sustainable-growth').then(res => {
      const d = res.data as Partial<SGData>
      setSgData({ ...SG_DEFAULTS, ...d,
        pillars: Array.isArray(d?.pillars) && d.pillars.length ? d.pillars : SG_DEFAULTS.pillars,
        commitments: Array.isArray(d?.commitments) && d.commitments.length ? d.commitments : SG_DEFAULTS.commitments,
        countryInitiatives: d?.countryInitiatives ?? SG_DEFAULTS.countryInitiatives,
      })
    }).catch(() => {})

    api.getSection('community-care').then(res => {
      const d = res.data as Partial<CCData>
      setCcData({ ...CC_DEFAULTS, ...d,
        pillars: Array.isArray(d?.pillars) && d.pillars.length ? d.pillars : CC_DEFAULTS.pillars,
        stats: Array.isArray(d?.stats) && d.stats.length ? d.stats : CC_DEFAULTS.stats,
        countryPrograms: d?.countryPrograms ?? CC_DEFAULTS.countryPrograms,
      })
    }).catch(() => {})
  }, [])

  const saveSG = async () => {
    setSgSaving(true); setError('')
    try { await api.updateSection('sustainable-growth', sgData); setSgSaved(true); setTimeout(() => setSgSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setSgSaving(false) }
  }
  const saveCC = async () => {
    setCcSaving(true); setError('')
    try { await api.updateSection('community-care', ccData); setCcSaved(true); setTimeout(() => setCcSaved(false), 3000) }
    catch (e: unknown) { setError(e instanceof Error ? e.message : 'Save failed') }
    finally { setCcSaving(false) }
  }

  const SectionHeader = ({ id, title, sub, open, onToggle }: { id: string; title: string; sub?: string; open: string; onToggle: (id: string) => void }) => (
    <button type="button" onClick={() => onToggle(id)}
      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors">
      <div>
        <span className="text-sm font-semibold text-white">{title}</span>
        {sub && <span className="block text-xs text-slate-500 mt-0.5">{sub}</span>}
      </div>
      {open === id ? <ChevronUp size={16} className="text-slate-400 shrink-0"/> : <ChevronDown size={16} className="text-slate-400 shrink-0"/>}
    </button>
  )

  const isSG = activeTab === 'sustainable-growth'

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-white">Community Pages</h1>
          <p className="text-slate-400 text-sm mt-0.5">Edit Sustainable Growth and Community Care page content</p>
        </div>

        <div className="flex gap-2 mb-6">
          {(['sustainable-growth', 'community-care'] as Tab[]).map(tab => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all
                ${activeTab === tab ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
              {tab === 'sustainable-growth' ? 'Sustainable Growth' : 'Community Care'}
            </button>
          ))}
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        {/* ── Sustainable Growth Tab ── */}
        {isSG && (
          <div className="space-y-3">
            <div className="flex justify-end mb-2">
              <button type="button" onClick={saveSG} disabled={sgSaving}
                className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
                <Save size={14}/> {sgSaving ? 'Saving…' : sgSaved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>

            {/* Page Intro */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="sg-intro" title="Page Heading" sub="Text shown below the hero banner" open={openSgSection} onToggle={setOpenSgSection} />
              {openSgSection === 'sg-intro' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Heading</label>
                    <input value={sgData.sectionHeading} onChange={e => setSgData(d => ({ ...d, sectionHeading: e.target.value }))} className={ipt} placeholder="Sustainable Growth" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Subtitle</label>
                    <textarea rows={2} value={sgData.sectionSub} onChange={e => setSgData(d => ({ ...d, sectionSub: e.target.value }))} className={`${ipt} resize-none`} placeholder="Building business practices..." />
                  </div>
                </div>
              )}
            </div>

            {/* Pillars */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="pillars" title={`Pillar Cards (${sgData.pillars.length})`} sub="Circle infographic cards on the page" open={openSgSection} onToggle={setOpenSgSection} />
              {openSgSection === 'pillars' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4">
                  <PillarEditor pillars={sgData.pillars} onChange={p => setSgData(d => ({ ...d, pillars: p }))} />
                </div>
              )}
            </div>

            {/* Country Initiatives */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="sg-countries" title="Country Initiatives" sub="Per-country actions shown in the grid" open={openSgSection} onToggle={setOpenSgSection} />
              {openSgSection === 'sg-countries' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {COUNTRY_CODES.map(code => (
                      <button key={code} type="button" onClick={() => setSgCountry(code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                          ${sgCountry === code ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                        {COUNTRY_LABELS[code]}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {(sgData.countryInitiatives[sgCountry] || []).map((item, i) => (
                      <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2 relative group">
                        <input value={item.title} onChange={e => {
                          const ci = { ...sgData.countryInitiatives }
                          ci[sgCountry] = [...(ci[sgCountry] || [])]
                          ci[sgCountry][i] = { ...item, title: e.target.value }
                          setSgData(d => ({ ...d, countryInitiatives: ci }))
                        }} className={ipt} placeholder="Initiative title" aria-label={`Initiative ${i+1} title`} />
                        <textarea rows={2} value={item.body} onChange={e => {
                          const ci = { ...sgData.countryInitiatives }
                          ci[sgCountry] = [...(ci[sgCountry] || [])]
                          ci[sgCountry][i] = { ...item, body: e.target.value }
                          setSgData(d => ({ ...d, countryInitiatives: ci }))
                        }} className={`${ipt} resize-none text-xs`} placeholder="Description" aria-label={`Initiative ${i+1} description`} />
                        <button type="button" aria-label={`Remove initiative ${i+1}`} onClick={() => {
                          const ci = { ...sgData.countryInitiatives }
                          ci[sgCountry] = (ci[sgCountry] || []).filter((_,j) => j !== i)
                          setSgData(d => ({ ...d, countryInitiatives: ci }))
                        }} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 w-6 h-6 bg-red-500/80 rounded-full grid place-items-center transition-opacity">
                          <Trash2 size={11} className="text-white"/>
                        </button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const ci = { ...sgData.countryInitiatives }
                      ci[sgCountry] = [...(ci[sgCountry] || []), { title: '', body: '' }]
                      setSgData(d => ({ ...d, countryInitiatives: ci }))
                    }} className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
                      <Plus size={13}/> Add Initiative
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Commitments Timeline */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="commitments" title="Commitment Timeline" sub="Year-goal roadmap shown at the bottom" open={openSgSection} onToggle={setOpenSgSection} />
              {openSgSection === 'commitments' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-2">
                  {sgData.commitments.map((c, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      <input value={c.year} onChange={e => { const next=[...sgData.commitments]; next[i]={...c,year:e.target.value}; setSgData(d=>({...d,commitments:next})) }}
                        className="w-20 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2.5 text-sm text-white font-bold text-center focus:outline-none focus:border-brand-accent" placeholder="2026" aria-label={`Year ${i+1}`} />
                      <input value={c.goal} onChange={e => { const next=[...sgData.commitments]; next[i]={...c,goal:e.target.value}; setSgData(d=>({...d,commitments:next})) }}
                        className={`${ipt} flex-1`} placeholder="Goal description" aria-label={`Goal ${i+1}`} />
                      <button type="button" aria-label={`Remove commitment ${i+1}`} onClick={() => setSgData(d => ({ ...d, commitments: d.commitments.filter((_,j)=>j!==i) }))}
                        className="text-slate-600 hover:text-red-400 p-1.5 transition-colors"><Trash2 size={13}/></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setSgData(d => ({ ...d, commitments: [...d.commitments, { year: '', goal: '' }] }))}
                    className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
                    <Plus size={13}/> Add Year
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Community Care Tab ── */}
        {!isSG && (
          <div className="space-y-3">
            <div className="flex justify-end mb-2">
              <button type="button" onClick={saveCC} disabled={ccSaving}
                className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
                <Save size={14}/> {ccSaving ? 'Saving…' : ccSaved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>

            {/* Page Intro */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="cc-intro" title="Page Heading" sub="Text shown below the hero banner" open={openCcSection} onToggle={setOpenCcSection} />
              {openCcSection === 'cc-intro' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Heading</label>
                    <input value={ccData.sectionHeading} onChange={e => setCcData(d => ({ ...d, sectionHeading: e.target.value }))} className={ipt} placeholder="Community Care" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Subtitle</label>
                    <textarea rows={2} value={ccData.sectionSub} onChange={e => setCcData(d => ({ ...d, sectionSub: e.target.value }))} className={`${ipt} resize-none`} placeholder="Initiatives that make a real difference..." />
                  </div>
                </div>
              )}
            </div>

            {/* Pillars */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="cc-pillars" title={`Pillar Cards (${ccData.pillars.length})`} sub="Circle infographic cards on the page" open={openCcSection} onToggle={setOpenCcSection} />
              {openCcSection === 'cc-pillars' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4">
                  <PillarEditor pillars={ccData.pillars} onChange={p => setCcData(d => ({ ...d, pillars: p }))} />
                </div>
              )}
            </div>

            {/* Country Programs */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="cc-countries" title="Country Programmes" sub="Bullet list of programmes per country" open={openCcSection} onToggle={setOpenCcSection} />
              {openCcSection === 'cc-countries' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {COUNTRY_CODES.map(code => (
                      <button key={code} type="button" onClick={() => setCcCountry(code)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                          ${ccCountry === code ? 'bg-brand-accent text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}>
                        {COUNTRY_LABELS[code]}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {(ccData.countryPrograms[ccCountry] || []).map((prog, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input value={prog} onChange={e => {
                          const cp = { ...ccData.countryPrograms }
                          cp[ccCountry] = [...(cp[ccCountry] || [])]
                          cp[ccCountry][i] = e.target.value
                          setCcData(d => ({ ...d, countryPrograms: cp }))
                        }} className={`${ipt} flex-1`} placeholder="Programme description" aria-label={`Programme ${i+1}`} />
                        <button type="button" aria-label={`Remove programme ${i+1}`} onClick={() => {
                          const cp = { ...ccData.countryPrograms }
                          cp[ccCountry] = (cp[ccCountry] || []).filter((_,j) => j !== i)
                          setCcData(d => ({ ...d, countryPrograms: cp }))
                        }} className="text-slate-600 hover:text-red-400 p-1.5 transition-colors"><Trash2 size={13}/></button>
                      </div>
                    ))}
                    <button type="button" onClick={() => {
                      const cp = { ...ccData.countryPrograms }
                      cp[ccCountry] = [...(cp[ccCountry] || []), '']
                      setCcData(d => ({ ...d, countryPrograms: cp }))
                    }} className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
                      <Plus size={13}/> Add Programme
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <SectionHeader id="cc-stats" title="Impact Stats" sub="4 numbers shown on the page" open={openCcSection} onToggle={setOpenCcSection} />
              {openCcSection === 'cc-stats' && (
                <div className="px-5 pb-5 border-t border-slate-800 pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    {ccData.stats.map((s, i) => (
                      <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2">
                        <input value={s.value} onChange={e => { const next=[...ccData.stats]; next[i]={...s,value:e.target.value}; setCcData(d=>({...d,stats:next})) }}
                          className="w-full bg-transparent text-2xl font-bold text-brand-accent focus:outline-none border-b border-slate-700 pb-1" placeholder="500+" aria-label={`Stat ${i+1} value`} />
                        <input value={s.label} onChange={e => { const next=[...ccData.stats]; next[i]={...s,label:e.target.value}; setCcData(d=>({...d,stats:next})) }}
                          className="w-full bg-transparent text-xs text-slate-400 focus:outline-none" placeholder="Beneficiaries" aria-label={`Stat ${i+1} label`} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
