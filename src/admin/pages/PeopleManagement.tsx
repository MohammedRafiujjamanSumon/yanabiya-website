import ManagementHub from '../components/ManagementHub'
import {
  Image, Users, Users2, Building2, Award, ImageIcon, Globe2,
} from 'lucide-react'

export default function PeopleManagement() {
  return (
    <ManagementHub
      title="Our People Management"
      subtitle="Manage leadership profiles, team members, departments and people pages."
      accent="text-amber-400"
      bgAccent="bg-amber-400/10"
      borderAccent="border-amber-400/20"
      frontendPath="/people/executive"
      sections={[
        { label: 'Hero Banner',     icon: Image,     to: '/admin/page-heroes',                desc: 'People page hero banner & headline', frontendNote: 'Top of any people page' },
        { label: 'Leadership Team', icon: Users,     to: '/admin/group/our-people/leadership', desc: 'Board, CEO, vice-chairman & executive profiles', frontendNote: 'Leadership section' },
        { label: 'Team Members',    icon: Users2,    to: '/admin/group/our-people/team',       desc: 'All team member profiles across departments', frontendNote: 'Team grid section' },
        { label: 'Departments',     icon: Building2, to: '/admin/group/our-people/departments',    desc: 'Department structure and country-specific teams', frontendNote: 'Departments section' },
        { label: 'Employee Cards',  icon: Users2,    to: '/admin/group/our-people/employee-cards', desc: 'Styled employee profile card layout', frontendNote: 'Card display section' },
        { label: 'Achievements',    icon: Award,     to: '/admin/group/our-people/achievements',   desc: 'Awards, certifications & recognitions', frontendNote: 'Achievements section' },
        { label: 'Gallery',         icon: ImageIcon, to: '/admin/group/our-people/gallery',    desc: 'Team and office photo gallery', frontendNote: 'Photo gallery section' },
        { label: 'SEO Settings',    icon: Globe2,    to: '/admin/group/our-people/seo',        desc: 'Meta tags for people pages', frontendNote: 'Search engine settings' },
      ]}
    />
  )
}
