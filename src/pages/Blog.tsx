import { useEffect } from 'react'
import Insights from '../sections/Insights'

export default function Blog() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])
  return <Insights />
}
