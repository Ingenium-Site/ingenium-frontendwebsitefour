import React, { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, from = 'up', delay = 0, className = '' }){
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const hasIntersectionObserver =
      typeof window !== 'undefined' && typeof window.IntersectionObserver === 'function'

    const needsManualCheck = (() => {
      if (typeof window === 'undefined') return false
      if (!hasIntersectionObserver) return true

      const viewportWidth = window.innerWidth || document.documentElement?.clientWidth || 0
      if (viewportWidth && viewportWidth <= 900) return true

      if (typeof window.matchMedia === 'function') {
        return window.matchMedia('(hover: none) and (pointer: coarse)').matches
      }

      return false
    })()

    let io = null
    if (hasIntersectionObserver) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setInView(true)
          })
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
      )

      io.observe(el)
    }

    if (!needsManualCheck) {
      return () => io?.disconnect()
    }

    let rafId = 0
    const check = () => {
      rafId = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || document.documentElement.clientHeight || 0
      if (!vh) return
      const isVisible = rect.top <= vh * 0.92 && rect.bottom >= 0
      if (isVisible) setInView(true)
    }

    const onEvent = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(check)
    }

    onEvent()
    window.addEventListener('scroll', onEvent, { passive: true })
    window.addEventListener('resize', onEvent, { passive: true })
    window.addEventListener('orientationchange', onEvent, { passive: true })

    return () => {
      io?.disconnect()
      if (rafId) window.cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onEvent)
      window.removeEventListener('resize', onEvent)
      window.removeEventListener('orientationchange', onEvent)
    }
  }, [])

  const style = {
    transitionDelay: `${delay}ms`,
  }

  const dirClass =
    from === 'right'
      ? 'reveal-from-right'
      : from === 'left'
        ? 'reveal-from-left'
        : from === 'bottom'
          ? 'reveal-from-bottom'
          : 'reveal-from-up'

  return (
    <div ref={ref} className={`reveal ${dirClass} ${inView ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
