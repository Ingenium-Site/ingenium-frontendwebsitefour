import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

/**
 * ThemeProvider
 * - Controls html[data-theme] = 'dark' | 'light'
 * - Default is time-based:
 *   - 07:00 - 15:59 => light
 *   - 16:00 - 06:59 => dark
 * - Optional manual override: stored in localStorage as 'themeOverride'
 *   (set via toggleTheme)
 */

const ThemeContext = createContext(null)

function getThemeByTime(date = new Date()) {
  const hour = date.getHours()
  // Light mode from 7am to 4pm (exclusive of 4pm)
  return hour >= 7 && hour < 16 ? 'light' : 'dark'
}

function getInitialTheme() {
  if (typeof window === 'undefined') return 'light'

  const override = window.localStorage.getItem('themeOverride')
  if (override === 'light' || override === 'dark') return override

  return getThemeByTime()
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  // Keep theme aligned with the clock when there is no manual override.
  useEffect(() => {
    if (typeof window === 'undefined') return

    const tick = () => {
      const override = window.localStorage.getItem('themeOverride')
      if (override === 'light' || override === 'dark') return
      const next = getThemeByTime()
      setTheme((prev) => (prev === next ? prev : next))
    }

    tick()
    const id = window.setInterval(tick, 60 * 1000)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => {
        setTheme((t) => {
          const next = t === 'dark' ? 'light' : 'dark'
          try {
            window.localStorage.setItem('themeOverride', next)
          } catch {
            // ignore
          }
          return next
        })
      },
      clearThemeOverride: () => {
        try {
          window.localStorage.removeItem('themeOverride')
        } catch {
          // ignore
        }
        setTheme(getThemeByTime())
      },
    }),
    [theme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within <ThemeProvider>')
  }
  return ctx
}
