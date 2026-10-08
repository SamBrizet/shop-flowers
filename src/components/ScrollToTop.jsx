import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash)

      if (target) {
        const targetTop = target.getBoundingClientRect().top + window.scrollY - 92
        window.scrollTo({ top: targetTop, behavior: 'smooth' })
      }

      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.hash, location.pathname, location.search])

  return null
}