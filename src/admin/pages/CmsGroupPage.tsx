import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { CMS_GROUPS } from '../config/cmsGroups'
import CmsGroupEditor from '../components/CmsGroupEditor'
import AdminLayout from '../components/AdminLayout'

export default function CmsGroupPage() {
  const { section = '', group = '' } = useParams<{ section: string; group: string }>()

  const sectionGroups = CMS_GROUPS[section]
  const config = sectionGroups?.[group]

  if (!config) {
    return (
      <AdminLayout>
        <div className="max-w-xl mx-auto mt-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 grid place-items-center mx-auto mb-4">
            <AlertTriangle size={22} className="text-red-400" />
          </div>
          <h1 className="text-lg font-bold text-white mb-2">Group not found</h1>
          <p className="text-slate-400 text-sm mb-6">
            No editor configured for <code className="text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded">{section}/{group}</code>
          </p>
          <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Dashboard
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return <CmsGroupEditor {...config} />
}
