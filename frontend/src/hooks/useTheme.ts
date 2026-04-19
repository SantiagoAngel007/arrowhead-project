import { useState, useEffect } from 'react'

export type Theme = 'dark' | 'purple' | 'minimal' | 'hacker'

const STORAGE_KEY = 'arrowhead-theme'
const DEFAULT_THEME: Theme = 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(STORAGE_KEY) as Theme) ?? DEFAULT_THEME
  )

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
