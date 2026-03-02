import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import navLogo from '../assets/ingenium-nav-logo.png'
import navLogoBlack from '../assets/ingenium-nav-logo-black.png'  
import { useTheme } from '../theme/ThemeProvider.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`navWrap ${scrolled ? 'isScrolled' : ''}`}>
      <nav className="navBar" aria-label="Primary navigation">
      <NavLink className="navLogo" to="/" aria-label="Ingenium home">
        <img 
          src={theme === 'dark' ? navLogo : '/src/assets/ingenium-nav-logo-black.png'} 
          alt="Ingenium" 
          draggable={false} 
        />
      </NavLink>

        <div className="navLinks">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Services
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            About
          </NavLink>
          <NavLink to="/insight" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            Insight
          </NavLink>
        </div>

        <div className="navRight">
          <button
            type="button"
            className="themeToggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? (
              // Sun icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M12 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 20v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 12h-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M4.93 4.93 6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M17.66 17.66 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M19.07 4.93 17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6.34 17.66 4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              // Moon icon
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M21 13.1A8.5 8.5 0 0 1 10.9 3a7 7 0 1 0 10.1 10.1Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          <NavLink className="navCta" to="/contact">
            Contact
          </NavLink>
        </div>
      </nav>
    </header>
  )
}
