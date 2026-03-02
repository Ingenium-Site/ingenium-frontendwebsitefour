import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'

export default function Layout() {
  const location = useLocation()

  // Scroll to top on route change (so each page opens at the top)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="app-shell">
      <Navbar />
      <Outlet />
    </div>
  )
}
