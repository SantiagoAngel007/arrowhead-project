import { useState, useEffect } from 'react'

interface TriviaHUDProps {
  title?: string
  level?: string
  username?: string
  initialSeconds?: number
  onBack?: () => void
}

export function TriviaHUD({
  title    = 'CYBERDEFENDER QUEST',
  level    = 'INTERMEDIATE',
  username = 'CYBER_ICESI_STUDENT_01',
  initialSeconds = 5058,
  onBack,
}: TriviaHUDProps) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const remaining = Math.max(0, initialSeconds - elapsed)
  const hh = Math.floor(remaining / 3600)
  const mm = Math.floor((remaining % 3600) / 60)
  const ss = remaining % 60
  const timeStr = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`

  return (
    <div style={{
      width: '100%',
      height: 56,
      background: 'rgba(6, 10, 20, 0.92)',
      borderBottom: '1px solid rgba(0, 255, 136, 0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      boxSizing: 'border-box',
      flexShrink: 0,
      fontFamily: '"Courier New", "Share Tech Mono", monospace',
    }}>

      {/* Seccion 1: Back arrow */}
      <div style={{ display: 'flex', alignItems: 'center', minWidth: 40 }}>
        <button
          onClick={onBack}
          title="Volver a Challenges"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: onBack ? 'pointer' : 'default',
            padding: '4px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <polyline
              points="13,4 6,11 13,18"
              stroke="#00ff88"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 4px #00ff88)' }}
            />
          </svg>
        </button>
      </div>

      {/* Seccion 2: Challenge Title */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Challenge Title:
        </span>
        <span style={{
          color: '#00ff88',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(0,255,136,0.6)',
        }}>
          {title}
        </span>
      </div>

      {/* Seccion 3: Level */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Level:
        </span>
        <span style={{
          color: '#00ff88',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          textShadow: '0 0 10px rgba(0,255,136,0.6)',
        }}>
          {level}
        </span>
      </div>

      {/* Seccion 4: Time Remaining */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <span style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Time Remaining:
        </span>
        <span style={{
          color: '#00ff88',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.22em',
          fontVariantNumeric: 'tabular-nums',
          textShadow: '0 0 14px rgba(0,255,136,0.7)',
          lineHeight: 1,
        }}>
          {timeStr}
        </span>
      </div>

      {/* Seccion 5: Username */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <span style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Username:
        </span>
        <span style={{
          color: '#00ff88',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          textShadow: '0 0 8px rgba(0,255,136,0.5)',
        }}>
          {username}
        </span>
      </div>

    </div>
  )
}
