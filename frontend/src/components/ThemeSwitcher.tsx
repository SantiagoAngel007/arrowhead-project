import { useTheme, type Theme } from '../hooks/useTheme'

const themes: { value: Theme; label: string; emoji: string }[] = [
  { value: 'dark', label: 'Dark', emoji: '🌑' },
  { value: 'purple', label: 'Purple', emoji: '🟣' },
  { value: 'minimal', label: 'Minimal', emoji: '⬜' },
  { value: 'hacker', label: 'Hacker', emoji: '💻' },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <div style={{ position: 'fixed', top: 16, right: 16, display: 'flex', gap: 8, zIndex: 999 }}>
      {themes.map(t => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          style={{
            padding: '6px 14px',
            borderRadius: 6,
            border: `2px solid ${theme === t.value ? 'var(--accent)' : 'var(--border)'}`,
            background: theme === t.value ? 'var(--accent-bg, transparent)' : 'var(--bg)',
            color: theme === t.value ? 'var(--accent)' : 'var(--text)',
            cursor: 'pointer',
            fontFamily: 'var(--sans)',
            fontSize: 13,
            fontWeight: theme === t.value ? 700 : 400,
            transition: 'all 0.2s',
          }}
        >
          {t.emoji} {t.label}
        </button>
      ))}
    </div>
  )
}
