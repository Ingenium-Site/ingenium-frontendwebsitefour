import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import navLogo from "../assets/ingenium-nav-logo.png";
import navLogoBlack from "../assets/ingenium-nav-logo.png";
import { useTheme } from "../theme/ThemeProvider.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null); // Track which dropdown is hovered
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", mobileMenuOpen);
    return () => document.body.classList.remove("mobile-menu-open");
  }, [mobileMenuOpen]);

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen((v) => !v);

  // Handle dropdown hover for desktop
  const handleMouseEnter = (dropdownName) => {
    if (window.innerWidth >= 768) { // Only for desktop
      setHoveredDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) { // Only for desktop
      setHoveredDropdown(null);
    }
  };

  // Optional: close on Escape
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const LogoImg = (
    <img
      src={theme === "dark" ? navLogo : navLogoBlack}
      alt="Ingenium"
      draggable={false}
    />
  );

  const ThemeIcon =
    theme === "dark" ? (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
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
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21 13.1A8.5 8.5 0 0 1 10.9 3a7 7 0 1 0 10.1 10.1Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    );

  return (
    <header className={`navWrap ${scrolled ? "isScrolled" : ""}`}>
      <nav className="navBar" aria-label="Primary navigation">
        {/* Desktop logo stays in the bar */}
        <NavLink className="navLogo desktop-only" to="/" aria-label="Ingenium home">
          {LogoImg}
        </NavLink>

        {/* Desktop links */}
        <div className="navLinks desktop-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : undefined)}>
            Home
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Services
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : undefined)}>
            About
          </NavLink> 
          
         <NavLink to="/integrity" className={({ isActive }) => (isActive ? "active" : undefined)}>
          Integrity
        </NavLink>

         {/* Impact Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => handleMouseEnter('impact')}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink 
              to="/impact" 
              className={({ isActive }) => (isActive || hoveredDropdown === 'impact' ? "active" : undefined)}
            >
              Impact
            </NavLink>
            {hoveredDropdown === 'impact' && (
              <div className="dropdown-menu">
                <NavLink to="/portfolio" className="dropdown-item">Portfolio</NavLink>
              </div>
            )}
          </div>

         {/* The Engine Dropdown */}
          <div 
            className="nav-dropdown"
            onMouseEnter={() => handleMouseEnter('engine')}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink 
              to="/the-engine" 
              className={({ isActive }) => (isActive || hoveredDropdown === 'engine' ? "active" : undefined)}
            >
              The Engine
            </NavLink>
            {hoveredDropdown === 'engine' && (
              <div className="dropdown-menu">
                {/* <NavLink to="/brand-system" className="dropdown-item">Brand System</NavLink> */}
                <NavLink to="/how-we-think" className="dropdown-item">How We Think (IIE)</NavLink>
              </div>
            )}
          </div>
        </div>

        <div className="navRight">
          {/* Desktop theme toggle stays in the bar */}
          <button
            type="button"
            className="themeToggle desktop-only"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
          >
            {ThemeIcon}
          </button>

          <NavLink className="navCta desktop-cta" to="/contact">
            Contact Us
          </NavLink>

          {/* Mobile hamburger ONLY in the bar */}
          <button
            className="mobile-menu-button"
            type="button"
            onClick={toggleMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMenu} role="presentation">
            <div
              className="mobile-menu-content"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <div className="mobile-menu-top">
                <NavLink className="mobile-menu-logo" to="/" onClick={closeMenu} aria-label="Ingenium home">
                  {LogoImg}
                </NavLink>

                <div className="mobile-menu-actions">
                  <button
                    type="button"
                    className="mobile-theme-toggle"
                    onClick={toggleTheme}
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    title={theme === "dark" ? "Light mode" : "Dark mode"}
                  >
                    {ThemeIcon}
                  </button>

                  <button
                    className="mobile-menu-close-button"
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close menu"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>


                {/* Mobile version of Impact dropdown */}
              <div className="mobile-nav-links">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/services"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Services
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  About
                </NavLink>
                
                   <NavLink
                  to="/integrity"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                  onClick={closeMenu}
                >
                  Integrity
                </NavLink>
                
                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header">
                    <NavLink
                      to="/impact"
                      className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                      onClick={closeMenu}
                    >
                      Impact
                    </NavLink>
                  </div>
                  <div className="mobile-submenu">
                    <NavLink
                      to="/portfolio"
                      className="mobile-nav-link submenu-item"
                      onClick={closeMenu}
                    >
                      Portfolio
                    </NavLink>
                  </div>
                </div>
                
          
                <div className="mobile-dropdown">
                  <div className="mobile-dropdown-header">
                    <NavLink
                      to="/the-engine"
                      className={({ isActive }) => `mobile-nav-link ${isActive ? "active" : ""}`}
                      onClick={closeMenu}
                    >
                      The Engine
                    </NavLink>
                  </div>
                  <div className="mobile-submenu">
                    {/* <NavLink
                      to="/brand-system"
                      className="mobile-nav-link submenu-item"
                      onClick={closeMenu}
                    >
                      Brand System
                    </NavLink> */}
                    <NavLink
                      to="/how-we-think"
                      className="mobile-nav-link submenu-item"
                      onClick={closeMenu}
                    >
                      How We Think (IIE)
                    </NavLink>
                  </div>
                </div>

                <NavLink className="navCta mobile-nav-cta" to="/contact" onClick={closeMenu}>
                  Contact Us
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}