import { useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Clock, Building2, ExternalLink, ArrowLeft, ArrowRight } from 'lucide-react'
import BackButton from '../components/BackButton'
import PageHero from '../components/PageHero'
import { useSection } from '../hooks/useSection'

type CountryCode = 'OM' | 'GB' | 'BD' | 'US'

type CountryContact = {
  code: CountryCode
  flag: string
  flagImg: string
  name: string
  shortName: string
  region: string
  city: string
  summary: string
  parentCompany: string
  postal?: string[]
  headOffice: string[]
  branchOffice?: string[]
  phones: string[]
  mobile?: string
  emails: string[]
  hours: string
  mapUrl?: string
  status: 'active' | 'launching'
}

const COUNTRIES: CountryContact[] = [
  {
    code: 'OM',
    flag: '🇴🇲',
    flagImg: '/maps/flags/om.svg',
    name: 'Sultanate of Oman',
    shortName: 'Oman',
    region: 'Headquarters',
    city: 'Muscat',
    summary: 'Group HQ, anchoring Gulf trade, regulatory intelligence, and the seven-partner network.',
    parentCompany: 'Yanabiya Gulf International Business & Trade SPC',
    postal: ['P.O. Box 1432, PC-133', 'Al Khuwair, Muscat', 'Sultanate of Oman'],
    headOffice: ['Office-41, 4th Floor, Building-846', 'Way-4011, Complex-240', 'Al Gubrah, Bushar, Muscat', 'Sultanate of Oman'],
    phones: ['+968 2249 5566'],
    mobile: '+968 9116 1677',
    emails: ['info@yanabiyagroup.com', 'admin@yanabiyagroup.com'],
    hours: 'Sunday to Thursday, 8:00 AM to 6:00 PM (GST)',
    mapUrl: 'https://maps.app.goo.gl/8kfKBHGkBEZ7ExsT9',
    status: 'active',
  },
  {
    code: 'GB',
    flag: '🇬🇧',
    flagImg: '/maps/flags/gb.svg',
    name: 'United Kingdom',
    shortName: 'UK',
    region: 'European Operations',
    city: 'London',
    summary: 'European operations hub, connecting 21 IT, retail, and hospitality partners across the UK.',
    parentCompany: 'Yanabiya Gulf International UK Ltd',
    headOffice: ['167-169 Great Portland Street', '5th Floor, London, W1W 5PF', 'United Kingdom'],
    phones: ['+44 7988 518877'],
    mobile: '+44 7988 518877',
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday to Friday, 9:00 AM to 6:00 PM (GMT)',
    status: 'active',
  },
  {
    code: 'BD',
    flag: '🇧🇩',
    flagImg: '/maps/flags/bd.svg',
    name: 'Bangladesh',
    shortName: 'Bangladesh',
    region: 'South Asia Operations',
    city: 'Dhaka',
    summary: 'South Asia delivery hub, engineering, apparel, and a 14-partner connectivity network.',
    parentCompany: 'Yanabiya Gulf International BD Trade',
    headOffice: ['Office #211, Plot #322/B', 'Block #Kanchkura, Uttarkhan', 'Dhaka-1230, Bangladesh'],
    phones: ['+880 1711 030489'],
    mobile: '+880 1971 161677',
    emails: ['info@yanabiyagroup.com'],
    hours: 'Sunday to Thursday, 9:00 AM to 6:00 PM (BST)',
    status: 'active',
  },
  {
    code: 'US',
    flag: '🇺🇸',
    flagImg: '/maps/flags/us.svg',
    name: 'United States of America',
    shortName: 'USA',
    region: 'North America Operations',
    city: 'Austin',
    summary: 'North America presence, partner network onboarding in progress.',
    parentCompany: 'Yanabiya Gulf International US LLC',
    headOffice: ['5900 Balcones Drive #18651', 'Austin, TX 78731', 'United States of America'],
    phones: ['+1 512 355 5715'],
    mobile: '+1 512 355 5715',
    emails: ['info@yanabiyagroup.com'],
    hours: 'Monday to Friday, 9:00 AM to 5:00 PM (CT)',
    status: 'active',
  },
]

const OTHER_COUNTRIES: Record<CountryCode, CountryCode[]> = {
  OM: ['GB', 'BD', 'US'],
  GB: ['OM', 'BD', 'US'],
  BD: ['OM', 'GB', 'US'],
  US: ['OM', 'GB', 'BD'],
}

function InfoRow({ icon: Icon, label, children }: { icon: React.ElementType; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="shrink-0 w-9 h-9 rounded-xl bg-brand-accent/10 grid place-items-center text-brand-accentDark mt-0.5">
        <Icon size={16} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400 font-bold mb-1">{label}</div>
        <div className="text-sm text-slate-800 leading-snug">{children}</div>
      </div>
    </div>
  )
}

type CmsOffice = { code: string; officeAddress?: string; postAddress?: string; phones?: string[]; mobile?: string; emails?: string[]; hours?: string; legalName?: string }

export default function ContactCountry() {
  const { t } = useTranslation()
  const { code } = useParams<{ code: string }>()
  const cmsData = useSection<{ countries?: CmsOffice[] }>('contact')

  const country = useMemo(() => {
    const base = COUNTRIES.find(c => c.code === code?.toUpperCase())
    if (!base) return null
    const cms = (cmsData?.countries ?? []).find(o => o.code === base.code)
    if (!cms) return base
    return {
      ...base,
      phones: cms.phones?.length ? cms.phones : base.phones,
      mobile: cms.mobile || base.mobile,
      emails: cms.emails?.length ? cms.emails : base.emails,
      hours: cms.hours || base.hours,
      headOffice: cms.officeAddress ? cms.officeAddress.split('\n').filter(Boolean) : base.headOffice,
      postal: cms.postAddress ? cms.postAddress.split('\n').filter(Boolean) : base.postal,
    }
  }, [code, cmsData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [code])

  if (!country) {
    return (
      <main className="min-h-screen bg-brand-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500">Country not found.</p>
        <Link to="/contact" className="text-brand-accentDark font-semibold hover:underline inline-flex items-center gap-1">
          <ArrowLeft size={14} /> Back to all offices
        </Link>
      </main>
    )
  }

  const others = OTHER_COUNTRIES[country.code as CountryCode].map(c => COUNTRIES.find(x => x.code === c)!)

  return (
    <main className="relative bg-brand-50 text-brand-deep min-h-screen overflow-hidden">
      <BackButton to="/contact" label="All Offices" />

      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-accent/15 blur-[160px]" />
        <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-brand-accentDark/10 blur-[160px]" />
      </div>

      <PageHero
        eyebrow={country.region}
        title={`${country.flag} ${country.name}`}
        subtitle={country.summary}
        centered
        ghostText=""
      />

      <div className="relative z-10 container-x pb-24 md:pb-32">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">

          {/* Flag card */}
          <div className="rounded-2xl overflow-hidden shadow-xl ring-1 ring-brand-deep/10">
            <img
              src={country.flagImg}
              alt={country.name}
              className="w-full h-52 object-cover"
            />
            <div className="bg-white px-6 py-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-brand-accentDark font-bold mb-1">{country.region}</div>
              <div className="font-serif text-2xl font-bold text-brand-deep">{country.shortName}</div>
              <div className="text-sm text-slate-500 mt-1">{country.city} · {country.name}</div>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1
                              bg-brand-accent/10 border border-brand-accent/30 text-brand-accentDark
                              text-[10px] font-bold uppercase tracking-[0.18em]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                {country.status === 'active' ? t('common.active', 'Active') : t('common.launching', 'Launching')}
              </div>
              <div className="mt-4 text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-4">
                {country.parentCompany}
              </div>
            </div>
          </div>

          {/* Contact details */}
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-brand-deep/10 px-6 py-5">
            <h2 className="font-serif text-lg font-bold text-brand-deep mb-2">Contact Details</h2>

            <InfoRow icon={Phone} label="Phone">
              <div className="flex flex-col gap-1">
                {country.phones.map(p => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-brand-accentDark transition-colors">{p}</a>
                ))}
                {country.mobile && country.mobile !== country.phones[0] && (
                  <a href={`tel:${country.mobile.replace(/\s/g, '')}`} className="hover:text-brand-accentDark transition-colors">{country.mobile}</a>
                )}
              </div>
            </InfoRow>

            <InfoRow icon={Mail} label="Email">
              <div className="flex flex-col gap-1">
                {country.emails.map(e => (
                  <a key={e} href={`mailto:${e}`} className="hover:text-brand-accentDark transition-colors break-all">{e}</a>
                ))}
              </div>
            </InfoRow>

            <InfoRow icon={Building2} label="Head Office">
              <div className="leading-relaxed">{country.headOffice.join(', ')}</div>
            </InfoRow>

            {country.postal && (
              <InfoRow icon={MapPin} label="Postal Address">
                <div className="leading-relaxed">{country.postal.join(', ')}</div>
              </InfoRow>
            )}

            <InfoRow icon={Clock} label="Office Hours">
              {country.hours}
            </InfoRow>

            {country.mapUrl && (
              <div className="mt-4">
                <a
                  href={country.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full rounded-full
                             bg-brand-deep text-white px-5 py-3 text-xs font-bold
                             uppercase tracking-[0.22em] hover:bg-brand-accentDark transition-colors"
                >
                  View on Maps <ExternalLink size={13} />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Other offices */}
        <div className="max-w-4xl mx-auto mt-14">
          <div className="text-[10px] uppercase tracking-[0.28em] text-slate-400 font-bold mb-5 text-center">
            Other Offices
          </div>
          <div className="grid grid-cols-3 gap-4">
            {others.map(o => (
              <Link
                key={o.code}
                to={`/contact/${o.code.toLowerCase()}`}
                className="group flex flex-col items-center gap-2 rounded-2xl bg-white
                           border border-brand-deep/10 p-5 text-center
                           hover:border-brand-accent/50 hover:-translate-y-1 hover:shadow-lg
                           transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-accent/20 group-hover:ring-brand-accent transition-colors">
                  <img src={o.flagImg} alt={o.name} className="w-full h-full object-cover" />
                </div>
                <div className="font-bold text-sm text-brand-deep">{o.shortName}</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{o.city}</div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-accentDark group-hover:gap-1.5 transition-all">
                  Visit <ArrowRight size={10} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
