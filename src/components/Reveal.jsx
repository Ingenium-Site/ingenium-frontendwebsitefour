import React, { useEffect, useRef, useState } from 'react'

export default function Reveal({ children, from = 'up', delay = 0, className = '' }){
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setInView(true)
        })
      },
      { threshold: 0.18 }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = {
    transitionDelay: `${delay}ms`,
  }

  const dirClass = from === 'right' ? 'reveal-from-right' : from === 'left' ? 'reveal-from-left' : 'reveal-from-up'

  return (
    <div ref={ref} className={`reveal ${dirClass} ${inView ? 'is-in' : ''} ${className}`} style={style}>
      {children}
    </div>
  )
}
