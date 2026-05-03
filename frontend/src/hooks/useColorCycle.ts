import { createContext, useContext, useEffect, useState, createElement, type ReactNode } from 'react'

const palettes = ['red', 'cyan', 'green', 'lightblue', 'lightgreen'] as const
export type Palette = typeof palettes[number]

export const CYCLE_DURATION_MS = 10000

const ColorCycleContext = createContext(0)

export function ColorCycleProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    document.body.setAttribute('data-palette', palettes[0])
    const id = setInterval(() => {
      setIndex(prev => {
        const next = (prev + 1) % palettes.length
        document.body.setAttribute('data-palette', palettes[next])
        return next
      })
    }, CYCLE_DURATION_MS)
    return () => clearInterval(id)
  }, [])

  return createElement(ColorCycleContext.Provider, { value: index }, children)
}

export function useColorCycle() {
  const index = useContext(ColorCycleContext)
  return { index, total: palettes.length }
}
