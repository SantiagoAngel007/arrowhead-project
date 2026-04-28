import { useState, useEffect } from 'react'

export type Theme = 'dark' | 'purple' | 'minimal' | 'hacker'

const STORAGE_KEY = 'arrowhead-theme'
const DEFAULT_THEME: Theme = 'hacker'
const VALID_THEMES: Theme[] = ['dark', 'purple', 'minimal', 'hacker']

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme
    return VALID_THEMES.includes(stored) ? stored : DEFAULT_THEME
  })

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return { theme, setTheme }
}
