import { useEffect } from 'react'
import Careers from '../sections/Careers'

export default function CareersPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])
  return <Careers />
}
