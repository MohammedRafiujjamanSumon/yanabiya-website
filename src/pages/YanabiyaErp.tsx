import {
  Layers, Wallet, Users, ShoppingCart, Boxes,
  LineChart, Workflow, Globe2,
} from 'lucide-react'
import PlatformPage, { type PlatformConfig } from './PlatformPage'

const config: PlatformConfig = {
  eyebrow: 'Yanabiya ERP',
  icon: Layers,
  accent: '#ea580c',
  headline: 'One system to run',
  headlineAccent: 'the whole group.',
  intro:
    'Yanabiya ERP is our unified enterprise platform connecting finance, HR, procurement, inventory and operations across all four countries — giving leadership a single, real-time view of the entire group.',
  primary: { label: 'Request a Demo', href: '/#contact' },
  secondary: undefined,
  sectionLabel: 'Unified modules',
  sectionTitle: 'Everything the group runs on, connected.',
  features: [
    { icon: Wallet,       title: 'Finance & Accounting', body: 'Multi-entity, multi-currency ledgers, invoicing and consolidated reporting.' },
    { icon: Users,        title: 'HR & Payroll',         body: 'Employee records, attendance and payroll across all four countries.' },
    { icon: ShoppingCart, title: 'Procurement',          body: 'Purchase requests, approvals and supplier management in one flow.' },
    { icon: Boxes,        title: 'Inventory & Warehouse',body: 'Real-time stock, warehousing and movement across locations.' },
    { icon: Workflow,     title: 'Operations',           body: 'Project, service and workflow management tying every division together.' },
    { icon: LineChart,    title: 'Analytics & Dashboards', body: 'Executive dashboards with live KPIs across the entire group.' },
  ],
  closingTitle: 'See the whole group in one view.',
  closingBody: 'Book a walkthrough of Yanabiya ERP and see how a single system can run finance, HR, procurement and operations across borders.',
}

export default function YanabiyaErp() {
  return <PlatformPage config={config} />
}
