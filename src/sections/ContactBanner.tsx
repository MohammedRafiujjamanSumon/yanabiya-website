import { useMemo, useState } from 'react'
import { Send, Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { contactByCountry } from '../data/contact'
import { useSection } from '../hooks/useSection'

const SECTORS = [
  'Information Technology',
  'Cloud Infrastructure & Managed Services',
  'Cyber Security',
  'ERP & Enterprise Software',
  'Data Analytics & Business Intelligence',
  'Modern UI/UX & Product Design',
  'Real Estate',
  'Hospitality & Tourism',
  'Trading & Import/Export',
  'General Inquiry',
]

const BRANCHES = [
  { code: 'OM', flag: '🇴🇲', label: 'Oman',        city: 'Muscat'  },
  { code: 'GB', flag: '🇬🇧', label: 'UK',           city: 'London'  },
  { code: 'BD', flag: '🇧🇩', label: 'Bangladesh',   city: 'Dhaka'   },
  { code: 'US', flag: '🇺🇸', label: 'USA',          city: 'Austin'  },
]

type CmsOffice = { code: string; officeAddress?: string; phones?: string[]; mobile?: string; emails?: string[]; hours?: string }

export default function ContactBanner() {
  const { t } = useTranslation()
  const [submitted, setSubmitted] = useState(false)
  const [branch, setBranch] = useState<'OM'|'GB'|'BD'|'US'>('OM')
  const cmsData = useSection<{ countries?: CmsOffice[] }>('contact')

  const branchData = useMemo(() => {
    const base = contactByCountry.find(c => c.code === branch)!
    const cms = (cmsData?.countries ?? []).find(o => o.code === branch)
    if (!cms) return base
    return {
      ...base,
      phones: cms.phones?.length ? cms.phones : base.phones,
      mobile: cms.mobile || base.mobile,
      emails: cms.emails?.length ? cms.emails : base.emails,
      officeAddress: cms.officeAddress || base.officeAddress,
      hours: cms.hours || base.hours,
    }
  }, [branch, cmsData])

  const ipt =
    'w-full bg-white/[0.06] border border-white/20 rounded-lg px-3 py-2.5 text-sm text-white ' +
    'placeholder:text-white/35 focus:outline-none focus:border-brand-accent/70 ' +
    'focus:bg-white/10 focus:ring-1 focus:ring-brand-accent/25 backdrop-blur-sm transition-all'

  return (
    <section
      id="contact-banner"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0a2e1a 0%, #0f3823 60%, #0d3020 100%)' }}
    >
      <div className="pointer-events-none absolute -top-24 -left-24 w-[360px] h-[360px] rounded-full bg-brand-accent/8 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-brand-accent/6 blur-[120px]" />

      <div className="relative z-10 container-x py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* ── LEFT: Branch selector + dynamic contact ── */}
          <div className="text-white">

            {/* Header */}
            <span className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase
                             text-brand-accent bg-brand-accent/12 border border-brand-accent/25
                             rounded-full px-3 py-1 mb-4">
              {t('contact.getInTouch')}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl leading-tight tracking-tight mb-2">
              {t('contact.bannerHeadline')}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              {t('contact.bannerSub')}
            </p>

            {/* Branch tabs */}
            <p className="text-[10px] uppercase tracking-[0.22em] text-white/40 font-bold mb-2">
              {t('contact.chooseBranch', 'Choose our branch')}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {BRANCHES.map(b => (
                <button
                  key={b.code}
                  type="button"
                  onClick={() => setBranch(b.code as 'OM'|'GB'|'BD'|'US')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                              border transition-all duration-200
                              ${branch === b.code
                                ? 'bg-brand-accent text-white border-brand-accent shadow-md shadow-brand-accent/30'
                                : 'bg-white/6 text-white/70 border-white/15 hover:border-brand-accent/50 hover:text-white'
                              }`}
                >
                  <span className="text-sm">{b.flag}</span>
                  {b.label}
                  {b.code === 'OM' && <span className="text-[9px] opacity-70 ml-0.5">(HQ)</span>}
                </button>
              ))}
            </div>

            {/* Dynamic branch contact info */}
            <div className="rounded-xl p-4 space-y-3 transition-all duration-300
                            backdrop-blur-xl bg-gradient-to-br from-white/8 via-white/4 to-transparent
                            border border-white/15
                            shadow-[0_4px_20px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]">
              <a
                href={`tel:${branchData.phones[0].replace(/\s/g, '')}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0
                                group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Phone size={13} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">{t('contact.phone')}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                    {branchData.phones[0]}
                  </div>
                </div>
              </a>

              <a
                href={`mailto:${branchData.emails[0]}`}
                className="flex items-center gap-3 group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0
                                group-hover:bg-brand-accent group-hover:text-white transition-colors">
                  <Mail size={13} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">{t('contact.email')}</div>
                  <div className="text-sm font-semibold text-white group-hover:text-brand-accent transition-colors">
                    {branchData.emails[0]}
                  </div>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0 mt-0.5">
                  <MapPin size={13} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-white/35 mb-0.5">{t('contact.address')}</div>
                  <div className="text-xs text-white/75 leading-snug whitespace-pre-line">
                    {branchData.officeAddress}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/15 grid place-items-center text-brand-accent shrink-0">
                  <Clock size={13} />
                </div>
                <div>
                  <div className="text-[9px] uppercase tracking-[0.16em] text-white/35">{t('contact.hours')}</div>
                  <div className="text-xs text-white/75">{branchData.hours}</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Compact form ── */}
          <div className="rounded-2xl p-6 backdrop-blur-xl
                          bg-gradient-to-br from-white/10 via-white/5 to-transparent
                          border border-white/20
                          shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <h3 className="font-serif text-lg text-white mb-0.5">{t('contact.formTitle')}</h3>
            <p className="text-white/40 text-xs mb-5">{t('contact.formSubtitle')}</p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
                <CheckCircle size={40} className="text-brand-accent" />
                <p className="text-white font-semibold">{t('contact.messageReceivedTitle')}</p>
                <p className="text-white/50 text-xs">{t('contact.messageReceivedSub')}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-1 text-xs text-brand-accent hover:underline"
                >
                  {t('contact.sendAnother')}
                </button>
              </div>
            ) : (
              <form className="grid gap-3" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                <div className="grid grid-cols-2 gap-3">
                  <input required placeholder={t('contact.yourName')} className={ipt} />
                  <input required type="email" placeholder={t('contact.emailAddress')} className={ipt} />
                </div>

                <select required defaultValue="" className={ipt}>
                  <option value="" disabled className="text-slate-800">{t('contact.selectSector')}</option>
                  {SECTORS.map(s => (
                    <option key={s} value={s} className="text-slate-800">{s}</option>
                  ))}
                </select>

                <input required placeholder={t('contact.subject')} className={ipt} />

                <textarea
                  required
                  rows={3}
                  placeholder={t('contact.message')}
                  className={`${ipt} resize-none`}
                />

                {/* Branch selector in form mirrors the left-panel choice */}
                <select
                  required
                  value={branch}
                  onChange={e => setBranch(e.target.value as 'OM'|'GB'|'BD'|'US')}
                  className={ipt}
                >
                  <option value="OM" className="text-slate-800">{t('contact.countryOM')}</option>
                  <option value="GB" className="text-slate-800">{t('contact.countryGB')}</option>
                  <option value="BD" className="text-slate-800">{t('contact.countryBD')}</option>
                  <option value="US" className="text-slate-800">{t('contact.countryUS')}</option>
                </select>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full
                             bg-brand-accent text-white font-semibold px-6 py-3
                             hover:bg-brand-accentDark hover:-translate-y-0.5 hover:shadow-lg
                             transition-all shadow-md shadow-brand-accent/30 text-sm"
                >
                  {t('contact.sendMessage')} <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
