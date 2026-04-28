import { useEffect } from 'react'

const palettes = ['red', 'cyan', 'green', 'lightblue', 'lightgreen'] as const
export type Palette = typeof palettes[number]

export const CYCLE_DURATION_MS = 10000

export function useColorCycle() {
  useEffect(() => {
    let index = 0
    document.body.setAttribute('data-palette', palettes[index])

    const id = setInterval(() => {
      index = (index + 1) % palettes.length
      document.body.setAttribute('data-palette', palettes[index])
    }, CYCLE_DURATION_MS)

    return () => clearInterval(id)
  }, [])
}