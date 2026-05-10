import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Globe2, Sparkles, GraduationCap, Briefcase } from 'lucide-react'
import Section, { Eyebrow, H2 } from '../components/Section'

const REASON_ICONS = [Globe2, Sparkles, GraduationCap, Briefcase]
const REASON_KEYS = ['global', 'stack', 'growth', 'culture'] as const

const openRoles = [
  'Software Engineer', 'Full Stack Developer', 'UI / UX Designer',
  'Data Analyst', 'Database Administrator', 'Cyber Security Engineer',
  'Business Intelligence Specialist', 'Project Manager',
  'Trade & Logistics Officer', 'Office Administrator',
]

export default function Careers() {
  const { t } = useTranslation()
  const reasons = useMemo(
    () => REASON_KEYS.map((k, i) => ({ icon: REASON_ICONS[i], t: t(`careers.reasons.${k}.t`), d: t(`careers.reasons.${k}.d`) })),
    [t],
  )
  return (
    <Section id="careers">
      <div className="overflow-x-auto">
      <div className="container-x grid grid-cols-12 gap-10 min-w-[640px]">
        <div className="col-span-5">
          <Eyebrow>{t('careers.eyebrow')}</Eyebrow>
          <H2>{t('careers.title')}</H2>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-slate-600 leading-snug text-justify">{t('careers.sub')}</p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {reasons.map((r) => (
              <div key={r.t} className="card-panel">
                <r.icon className="text-brand-accent mb-3" />
                <h3 className="text-slate-900 text-sm mb-1">{r.t}</h3>
                <p className="text-xs text-slate-600">{r.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-7">
          <h3 className="font-serif text-2xl text-slate-900 mb-5">{t('careers.rolesTitle')}</h3>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {openRoles.map((role) => (
              <div key={role} className="card-panel flex items-center justify-between">
                <span className="text-slate-800 text-sm">{role}</span>
                <span className="text-[10px] text-brand-accent uppercase tracking-widest border border-brand-accent/30 px-2 py-1 rounded-full">
                  {t('careers.open')}
                </span>
              </div>
            ))}
          </div>
          <div className="card-panel text-center">
            <p className="text-slate-600 mb-4 text-sm">{t('careers.sendCv')}</p>
            <a href="mailto:careers@yanabiyagroup.com" className="btn-primary">
              careers@yanabiyagroup.com
            </a>
          </div>
        </div>
      </div>
      </div>
    </Section>
  )
}
