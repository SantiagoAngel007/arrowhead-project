import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface Player {
  rank: number
  initials: string
  username: string
  score: number | null
}

interface LeaderboardProps {
  players?: Player[]
}

// ── Data ─────────────────────────────────────────────────────────────────────

const DEFAULT_PLAYERS: Player[] = [
  { rank: 1, initials: 'P1', username: 'PLAYER_ICE_01', score: 4200 },
  { rank: 2, initials: 'P2', username: 'PLAYER_ICE_02', score: null },
  { rank: 3, initials: 'P3', username: 'PLAYER_ICE_03', score: null },
  { rank: 4, initials: 'P4', username: 'PLAYER_ICE_04', score: null },
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function badgeStyle(rank: number): React.CSSProperties {
  const base: React.CSSProperties = {
    width: 20, height: 20, borderRadius: '50%',
    fontSize: 10, fontWeight: 'bold', textAlign: 'center', lineHeight: '20px',
    flexShrink: 0,
  }
  if (rank === 1) return { ...base, background: '#b8860b',               color: '#ffe566' }
  if (rank === 2) return { ...base, background: 'rgba(180,180,180,0.2)', color: '#c0c0c0' }
  if (rank === 3) return { ...base, background: 'rgba(160,100,40,0.2)',  color: '#cd7f32' }
  return             { ...base, background: 'rgba(255,255,255,0.05)', color: '#6b7a8d' }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Leaderboard({ players = DEFAULT_PLAYERS }: LeaderboardProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 320,
      zIndex: 100,
      background: 'rgba(6, 10, 20, 0.92)',
      border: '1px solid rgba(0, 255, 136, 0.15)',
      borderRadius: 8,
      padding: '12px 16px',
      backdropFilter: 'blur(6px)',
      fontFamily: 'monospace',
      boxSizing: 'border-box',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: collapsed ? 0 : 10,
        borderBottom: collapsed ? 'none' : '1px solid rgba(0,255,136,0.1)',
        marginBottom: collapsed ? 0 : 10,
      }}>
        <span style={{ color: '#00ff88', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase' }}>
          LEADERBOARD
        </span>
        <button
          onClick={() => setCollapsed(c => !c)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7a8d',
            fontSize: 10,
            fontFamily: 'monospace',
            letterSpacing: 1,
            padding: '2px 4px',
          }}
        >
          {collapsed ? '▲ SHOW' : '▼ HIDE'}
        </button>
      </div>

      {/* Lista de jugadores */}
      {!collapsed && (
        <div>
          {players.map((player, i) => {
            const isLast = i === players.length - 1
            return (
              <div
                key={player.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: isLast ? 0 : 8,
                  marginBottom: isLast ? 0 : 8,
                }}
              >
                {/* Badge */}
                <div style={badgeStyle(player.rank)}>{player.rank}</div>

                {/* Avatar */}
                <div style={{
                  width: 26, height: 26, borderRadius: '50%',
                  background: 'rgba(0,255,136,0.08)',
                  border: '1px solid rgba(0,255,136,0.2)',
                  color: '#00ff88',
                  fontSize: 10, fontWeight: 'bold',
                  textAlign: 'center', lineHeight: '26px',
                  flexShrink: 0,
                }}>
                  {player.initials}
                </div>

                {/* Username */}
                <div style={{ flex: 1, color: '#ffffff', fontSize: 11, letterSpacing: 1 }}>
                  {player.username}
                </div>

                {/* Score o badge ICESI */}
                {player.score !== null ? (
                  <div style={{ color: '#00ff88', fontSize: 12, fontWeight: 'bold' }}>
                    {player.score}
                  </div>
                ) : (
                  <div style={{
                    color: '#6b7a8d',
                    fontSize: 9,
                    letterSpacing: 2,
                    border: '1px solid rgba(0,255,136,0.15)',
                    borderRadius: 3,
                    padding: '2px 5px',
                  }}>
                    ICESI
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}
