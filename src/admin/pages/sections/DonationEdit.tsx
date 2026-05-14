import { useEffect, useState } from 'react'
import { Save, Plus, Trash2, ChevronDown, ChevronUp, Phone } from 'lucide-react'
import AdminLayout from '../../components/AdminLayout'
import { api } from '../../api/adminApi'
import { ImageField } from '../../components/MediaPicker'

interface CauseCard {
  key: string; label: string; desc: string; impact: string; image: string; color: string
}
interface DonationStat { value: string; label: string }
interface HowItWorksStep { title: string; desc: string }
interface TrustItem { title: string; desc: string }

interface DonationData {
  bankName: string; accountName: string; accountNo: string; routing: string; swift: string
  bkashNumber: string; nagadNumber: string
  stats: DonationStat[]
  quote: string; hadith: string
  whereGiftGoes: string; chooseCause: string
  causes: CauseCard[]
  howItWorksTitle: string; steps: HowItWorksStep[]
  foundationDesc: string
  trustItems: TrustItem[]
}

const ipt = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white ' +
  'placeholder:text-slate-500 focus:outline-none focus:border-brand-accent transition-all'

const DEFAULTS: DonationData = {
  bankName: 'Shahjalal Islami Bank Ltd.',
  accountName: 'Jamiya Ahmadiya Madrasha & Orphanage',
  accountNo: '4057-11100000795',
  routing: '190260871',
  swift: 'SJBLBDDHCPC',
  bkashNumber: '01772921788',
  nagadNumber: '01772921788',
  stats: [
    { value: '100%', label: 'Direct to Cause' },
    { value: '1,000+', label: 'Lives Touched' },
    { value: '4', label: 'Countries' },
    { value: '15Y', label: 'Track Record' },
  ],
  quote: 'A Chance to Build Your Palace in Jannah',
  hadith: 'The Prophet said: Charity does not decrease wealth. (Sahih Muslim)',
  whereGiftGoes: 'Where Your Gift Goes',
  chooseCause: 'Choose a Cause to Support',
  causes: [
    { key: 'masjidSupport',       label: 'Masjid Support',        desc: 'Construction and maintenance of mosques.',            impact: 'Builds a house of prayer',     image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=600&q=80', color: '#10b981' },
    { key: 'orphanCare',          label: 'Orphan Care',           desc: 'Education and welfare for orphaned children.',        impact: 'Gives a child a future',        image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=600&q=80', color: '#f43f5e' },
    { key: 'elderlyHome',         label: 'Elderly Home',          desc: 'Care and dignity for the elderly in need.',           impact: 'Restores dignity to elders',    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=600&q=80', color: '#0ea5e9' },
    { key: 'medicalSupport',      label: 'Medical Support',       desc: 'Healthcare for those who cannot afford it.',          impact: 'Saves a life',                 image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80', color: '#f59e0b' },
    { key: 'endingTorment',       label: 'Ending Torment',        desc: 'Support for victims of abuse and hardship.',          impact: 'Breaks cycles of poverty',     image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80', color: '#8b5cf6' },
    { key: 'studentCare',         label: 'Student Care',          desc: 'Scholarships and educational resources.',             impact: 'Secures a future',             image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80', color: '#0ea5e9' },
    { key: 'specialCare',         label: 'Special Care',          desc: 'Support for people with disabilities.',               impact: 'Enables independence',         image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=600&q=80', color: '#10b981' },
    { key: 'eidClothes',          label: 'Eid Clothes',           desc: 'New clothes for children during Eid celebrations.',   impact: 'Brings joy to children',       image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80', color: '#f59e0b' },
    { key: 'zakah',               label: 'Zakah',                 desc: 'Distribute your annual Zakah with confidence.',       impact: 'Fulfils your obligation',      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=600&q=80', color: '#f43f5e' },
    { key: 'sadaqah',             label: 'Sadaqah',               desc: 'Voluntary charity for any worthy cause.',             impact: 'Multiplied by Allah',          image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80', color: '#8b5cf6' },
    { key: 'environmentCare',     label: 'Environment Care',      desc: 'Tree planting and environmental conservation.',       impact: 'Heals the planet',             image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80', color: '#10b981' },
    { key: 'buildingMaintenance', label: 'Building Maintenance',  desc: 'Upkeep of charitable and community buildings.',       impact: 'Preserves community assets',   image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80', color: '#f59e0b' },
  ],
  howItWorksTitle: 'How Your Donation Works',
  steps: [
    { title: 'Choose a Cause', desc: 'Pick the programme that speaks to your heart, from orphan care and masjid support to student scholarships.' },
    { title: 'Complete Payment', desc: 'Select your country and follow the gateway steps, bKash, Nagad, bank transfer, or contact us directly.' },
    { title: 'We Deliver the Impact', desc: 'Funds reach the cause within 7 days. You receive a personal confirmation and an impact update.' },
  ],
  foundationDesc: 'Established to serve communities across Oman, Bangladesh, the United Kingdom and the USA, we direct charitable funds to those who need them most with full transparency and Islamic integrity.',
  trustItems: [
    { title: 'Registered Organisation', desc: 'Yanabiya Charitable Foundation, officially registered and audited across four countries.' },
    { title: '100% Reaches the Cause', desc: 'Administrative costs are covered separately, every penny of your gift goes directly to the cause.' },
    { title: 'Shariah-Compliant', desc: 'All programmes are reviewed and approved under Islamic guidelines.' },
    { title: 'Personal Acknowledgement', desc: 'Every donor receives a personalised thank-you message and impact update.' },
  ],
}

export default function DonationEdit() {
  const [data, setData] = useState<DonationData>(DEFAULTS)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [expandedCause, setExpandedCause] = useState<string | null>(null)
  const [openSection, setOpenSection] = useState<string>('bank')

  useEffect(() => {
    api.getSection('donation')
      .then(res => {
        if (res.data && typeof res.data === 'object') {
          const d = res.data as Partial<DonationData>
          setData({
            ...DEFAULTS,
            ...d,
            stats:      Array.isArray(d.stats)      && d.stats.length      ? d.stats      : DEFAULTS.stats,
            causes:     Array.isArray(d.causes)     && d.causes.length     ? d.causes     : DEFAULTS.causes,
            steps:      Array.isArray(d.steps)      && d.steps.length      ? d.steps      : DEFAULTS.steps,
            trustItems: Array.isArray(d.trustItems) && d.trustItems.length ? d.trustItems : DEFAULTS.trustItems,
          })
        }
      })
      .catch(() => { /* use defaults */ })
  }, [])

  const set = <K extends keyof DonationData>(field: K, val: DonationData[K]) =>
    setData(prev => ({ ...prev, [field]: val }))

  const save = async () => {
    setSaving(true); setError('')
    try {
      await api.updateSection('donation', data)
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally { setSaving(false) }
  }

  const updateCause = (idx: number, field: keyof CauseCard, val: string) => {
    const next = [...data.causes]; next[idx] = { ...next[idx], [field]: val }; set('causes', next)
  }
  const addCause = () => {
    const c: CauseCard = { key: `cause-${Date.now()}`, label: 'New Cause', desc: '', impact: '', image: '', color: '#10b981' }
    set('causes', [...data.causes, c])
    setExpandedCause(c.key)
  }
  const removeCause = (idx: number) => set('causes', data.causes.filter((_, i) => i !== idx))

  const updateStat = (idx: number, field: keyof DonationStat, val: string) => {
    const next = [...data.stats]; next[idx] = { ...next[idx], [field]: val }; set('stats', next)
  }
  const updateStep = (idx: number, field: keyof HowItWorksStep, val: string) => {
    const next = [...data.steps]; next[idx] = { ...next[idx], [field]: val }; set('steps', next)
  }
  const updateTrust = (idx: number, field: keyof TrustItem, val: string) => {
    const next = [...data.trustItems]; next[idx] = { ...next[idx], [field]: val }; set('trustItems', next)
  }

  const SectionHeader = ({ id, title, sub }: { id: string; title: string; sub?: string }) => (
    <button type="button" onClick={() => setOpenSection(openSection === id ? '' : id)}
      className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-800/50 transition-colors">
      <div>
        <span className="text-sm font-semibold text-white">{title}</span>
        {sub && <span className="block text-xs text-slate-500 mt-0.5">{sub}</span>}
      </div>
      {openSection === id ? <ChevronUp size={16} className="text-slate-400 shrink-0"/> : <ChevronDown size={16} className="text-slate-400 shrink-0"/>}
    </button>
  )

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Donation Page</h1>
            <p className="text-slate-400 text-sm mt-0.5">Edit all content on the Donation page — causes, stats, bank details, and more</p>
          </div>
          <button type="button" onClick={save} disabled={saving}
            className="flex items-center gap-2 bg-brand-accent hover:bg-brand-accentDark text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all disabled:opacity-50">
            <Save size={15}/> {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Changes'}
          </button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <div className="space-y-3">

          {/* ── Faith Banner ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="banner" title="Faith Banner" sub="Quran quote and hadith shown in dark banner" />
            {openSection === 'banner' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Heading Quote</label>
                  <input value={data.quote} onChange={e => set('quote', e.target.value)} className={ipt} placeholder="A Chance to Build Your Palace in Jannah" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Hadith / Source Text</label>
                  <input value={data.hadith} onChange={e => set('hadith', e.target.value)} className={ipt} placeholder="The Prophet said: Charity does not decrease wealth." />
                </div>
              </div>
            )}
          </div>

          {/* ── Stats ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="stats" title="Donation Stats" sub="4 numbers shown in the dark banner" />
            {openSection === 'stats' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  {data.stats.map((s, i) => (
                    <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2">
                      <input value={s.value} onChange={e => updateStat(i, 'value', e.target.value)}
                        className="w-full bg-transparent text-2xl font-bold text-brand-accent focus:outline-none border-b border-slate-700 pb-1" placeholder="100%" />
                      <input value={s.label} onChange={e => updateStat(i, 'label', e.target.value)}
                        className="w-full bg-transparent text-xs text-slate-400 focus:outline-none" placeholder="Direct to Cause" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Cause Cards ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="causes" title={`Donation Causes (${data.causes.length})`} sub="Cards shown in the cause selection grid" />
            {openSection === 'causes' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Eyebrow</label>
                    <input value={data.whereGiftGoes} onChange={e => set('whereGiftGoes', e.target.value)} className={ipt} placeholder="Where Your Gift Goes" aria-label="Section eyebrow" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Section Heading</label>
                    <input value={data.chooseCause} onChange={e => set('chooseCause', e.target.value)} className={ipt} placeholder="Choose a Cause to Support" aria-label="Section heading" />
                  </div>
                </div>

                <p className="text-xs text-slate-500">Click each cause to expand and edit its details.</p>

                {data.causes.map((cause, i) => (
                  <div key={cause.key} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors">
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                        {cause.image ? (
                          <img src={cause.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full rounded-lg" style={{ backgroundColor: cause.color + '40' }} />
                        )}
                      </div>
                      <button type="button" onClick={() => setExpandedCause(expandedCause === cause.key ? null : cause.key)}
                        className="flex-1 text-left text-sm font-medium text-white">
                        <span className="text-slate-500 text-xs mr-2">{i+1}.</span>{cause.label || 'Unnamed Cause'}
                      </button>
                      <div className="flex items-center gap-1 shrink-0">
                        <button type="button" onClick={() => setExpandedCause(expandedCause === cause.key ? null : cause.key)}
                          className="text-slate-500 hover:text-slate-300 p-1.5 transition-colors">
                          {expandedCause === cause.key ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                        </button>
                        <button type="button" onClick={() => removeCause(i)} title={`Remove ${cause.label}`} aria-label={`Remove ${cause.label}`}
                          className="text-slate-600 hover:text-red-400 p-1.5 transition-colors">
                          <Trash2 size={13}/>
                        </button>
                      </div>
                    </div>

                    {expandedCause === cause.key && (
                      <div className="px-4 pb-4 border-t border-slate-700 pt-3 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1.5">Label (displayed name)</label>
                            <input value={cause.label} onChange={e => updateCause(i, 'label', e.target.value)} className={ipt} placeholder="Cause name" aria-label="Cause label" />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1.5">Accent Color</label>
                            <div className="flex gap-2 items-center">
                              <input type="color" value={cause.color} onChange={e => updateCause(i, 'color', e.target.value)}
                                aria-label="Accent color picker"
                                className="w-10 h-10 rounded-lg border border-slate-600 bg-slate-700 cursor-pointer" />
                              <input value={cause.color} onChange={e => updateCause(i, 'color', e.target.value)}
                                className={`${ipt} flex-1`} placeholder="#10b981" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1.5">Description (shown on hover)</label>
                          <input value={cause.desc} onChange={e => updateCause(i, 'desc', e.target.value)} className={ipt} placeholder="Brief description of this cause" />
                        </div>
                        <div>
                          <label className="block text-xs text-slate-400 mb-1.5">Impact Pill (shown on hover)</label>
                          <input value={cause.impact} onChange={e => updateCause(i, 'impact', e.target.value)} className={ipt} placeholder="e.g. Gives a child a future" />
                        </div>
                        <ImageField
                          label="Cause Photo"
                          value={cause.image}
                          onChange={v => updateCause(i, 'image', v)}
                          folder="donation"
                        />
                      </div>
                    )}
                  </div>
                ))}

                <button type="button" onClick={addCause}
                  className="flex items-center gap-1.5 text-xs text-brand-accent hover:text-brand-accentDark font-semibold transition-colors">
                  <Plus size={13}/> Add Cause
                </button>
              </div>
            )}
          </div>

          {/* ── How It Works ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="steps" title="How It Works" sub="3 steps shown at the bottom of the donation page" />
            {openSection === 'steps' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Section Title</label>
                  <input value={data.howItWorksTitle} onChange={e => set('howItWorksTitle', e.target.value)} className={ipt} placeholder="How Your Donation Works" aria-label="How it works section title" />
                </div>
                {data.steps.map((step, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold flex items-center justify-center shrink-0">{i+1}</span>
                      <input value={step.title} onChange={e => updateStep(i, 'title', e.target.value)}
                        className="flex-1 bg-transparent text-sm font-semibold text-white focus:outline-none" placeholder="Step title" />
                    </div>
                    <textarea rows={2} value={step.desc} onChange={e => updateStep(i, 'desc', e.target.value)}
                      className={`${ipt} resize-none text-xs`} placeholder="Step description" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Why Donate / Trust ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="trust" title="Why Donate With Us" sub="4 trust badges shown at the bottom" />
            {openSection === 'trust' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Foundation Description</label>
                  <textarea rows={3} value={data.foundationDesc} onChange={e => set('foundationDesc', e.target.value)}
                    className={`${ipt} resize-none`} placeholder="Foundation description" aria-label="Foundation description" />
                </div>
                <p className="text-xs text-slate-500 pt-1">Trust badges:</p>
                {data.trustItems.map((item, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 space-y-2">
                    <input value={item.title} onChange={e => updateTrust(i, 'title', e.target.value)}
                      className={`${ipt} font-semibold`} placeholder="Badge title" />
                    <textarea rows={2} value={item.desc} onChange={e => updateTrust(i, 'desc', e.target.value)}
                      className={`${ipt} resize-none text-xs`} placeholder="Badge description" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Bank Details ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="bank" title="Bank Transfer Details" sub="Shown in the Bangladesh payment gateway" />
            {openSection === 'bank' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Bank Name</label>
                  <input value={data.bankName} onChange={e => set('bankName', e.target.value)} className={ipt} placeholder="e.g. Shahjalal Islami Bank Ltd." />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Account Name</label>
                  <input value={data.accountName} onChange={e => set('accountName', e.target.value)} className={ipt} placeholder="Account holder name" aria-label="Account name" />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Account Number</label>
                  <input value={data.accountNo} onChange={e => set('accountNo', e.target.value)} className={ipt} placeholder="e.g. 4057-11100000795" aria-label="Account number" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Routing Number</label>
                    <input value={data.routing} onChange={e => set('routing', e.target.value)} className={ipt} placeholder="e.g. 190260871" aria-label="Routing number" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">SWIFT / BIC Code</label>
                    <input value={data.swift} onChange={e => set('swift', e.target.value)} className={ipt} placeholder="e.g. SJBLBDDHCPC" aria-label="SWIFT code" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Payment Gateways ── */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <SectionHeader id="gateways" title="Mobile Payment Numbers" sub="bKash and Nagad numbers for Bangladesh" />
            {openSection === 'gateways' && (
              <div className="px-5 pb-5 border-t border-slate-800 pt-4 space-y-3">
                <p className="text-xs text-slate-500">Enter the raw phone number (no country code). +880 is added automatically.</p>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">bKash Number</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm shrink-0 flex items-center gap-1"><Phone size={13}/> +880</span>
                    <input value={data.bkashNumber} onChange={e => set('bkashNumber', e.target.value)} className={`${ipt} flex-1`} placeholder="01772921788" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Nagad Number</label>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-sm shrink-0 flex items-center gap-1"><Phone size={13}/> +880</span>
                    <input value={data.nagadNumber} onChange={e => set('nagadNumber', e.target.value)} className={`${ipt} flex-1`} placeholder="01772921788" />
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </AdminLayout>
  )
}
