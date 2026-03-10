import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useMemo, useRef, useState } from "react"
import Navbar from "./Navbar.jsx"

export default function Layout() {
  const location = useLocation()
  const [showTopBtn, setShowTopBtn] = useState(false)
  const footerObserverRef = useRef(null)
  const footerPollTimerRef = useRef(null)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    setShowTopBtn(false)
  }, [location.pathname])

  useEffect(() => {
    const getFooterElement = () =>
      document.getElementById("site-footer") || document.querySelector("footer")

    const getScrollTop = () =>
      Math.max(
        window.scrollY || 0,
        window.pageYOffset || 0,
        document.documentElement?.scrollTop || 0,
        document.body?.scrollTop || 0
      )

    const getViewportHeight = () =>
      window.innerHeight || document.documentElement?.clientHeight || 0

    const getDocumentHeight = () =>
      Math.max(document.body?.scrollHeight || 0, document.documentElement?.scrollHeight || 0)

    const computeShouldShow = () => {
      const footer = getFooterElement()
      const scrollTop = getScrollTop()
      if (scrollTop <= 120) return false

      if (!footer) {
        const viewportHeight = getViewportHeight()
        const documentHeight = getDocumentHeight()
        return scrollTop + viewportHeight >= documentHeight - Math.max(220, viewportHeight * 0.2)
      }

      const rect = footer.getBoundingClientRect()
      const viewportHeight = getViewportHeight()
      const footerInView = rect.top < viewportHeight && rect.bottom > 0
      return footerInView
    }

    const syncVisibility = () => {
      setShowTopBtn(computeShouldShow())
    }

    const attachObserver = () => {
      const footer = getFooterElement()
      if (!footer) return false

      footerObserverRef.current?.disconnect()
      footerObserverRef.current = new IntersectionObserver(
        () => {
          syncVisibility()
        },
        {
          root: null,
          threshold: [0, 0.01, 0.05, 0.1, 0.2],
          rootMargin: "0px 0px -2% 0px",
        }
      )

      footerObserverRef.current.observe(footer)
      syncVisibility()
      return true
    }

    syncVisibility()
    attachObserver()

    footerPollTimerRef.current = window.setInterval(() => {
      if (attachObserver()) {
        window.clearInterval(footerPollTimerRef.current)
        footerPollTimerRef.current = null
      }
    }, 350)

    window.addEventListener("scroll", syncVisibility, { passive: true })
    window.addEventListener("resize", syncVisibility)
    window.addEventListener("orientationchange", syncVisibility)

    return () => {
      footerObserverRef.current?.disconnect()
      if (footerPollTimerRef.current) window.clearInterval(footerPollTimerRef.current)
      window.removeEventListener("scroll", syncVisibility)
      window.removeEventListener("resize", syncVisibility)
      window.removeEventListener("orientationchange", syncVisibility)
    }
  }, [location.pathname])

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const behavior = prefersReducedMotion ? "auto" : "smooth"
    const scroller = document.scrollingElement || document.documentElement || document.body

    window.scrollTo({ top: 0, left: 0, behavior })
    if (typeof scroller?.scrollTo === "function") {
      scroller.scrollTo({ top: 0, left: 0, behavior })
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    window.requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      if (typeof scroller?.scrollTo === "function") {
        scroller.scrollTo(0, 0)
      }
    })
  }

  const pageClass = useMemo(
    () =>
      `floating-back-to-top-btn floating-back-to-top-btn--${location.pathname === "/" ? "home" : "page"}`,
    [location.pathname]
  )

  return (
    <>
      <div className="app-shell">
        <Navbar />
        <Outlet />
      </div>

      <button
        type="button"
        className={`${pageClass} ${showTopBtn ? "show" : ""}`}
        onClick={scrollToTop}
        title="Back to top"
        aria-label="Back to top"
      >
        <span aria-hidden="true">↑</span>
      </button>
    </>
  )
}
