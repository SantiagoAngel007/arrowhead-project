import { useNavigate } from 'react-router-dom'

const difficultyStyle: Record<string, { color: string; bg: string }> = {
  Easy:   { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
  Medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)' },
  Hard:   { color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)' },
}

const challenges = [
  { id: 1, name: 'CRIPTOGRAFÍA BÁSICA',     category: 'Crypto',    difficulty: 'Easy',   points: 100, locked: false },
  { id: 2, name: 'INGENIERÍA REVERSA: BIN', category: 'Rev',       difficulty: 'Medium', points: 300, locked: false },
  { id: 3, name: 'ANÁLISIS DE TRÁFICO',     category: 'Network',   difficulty: 'Medium', points: 250, locked: false },
  { id: 4, name: 'FORENSE DIGITAL: DISCO',  category: 'Forensics', difficulty: 'Hard',   points: 455, locked: true  },
  { id: 5, name: 'WEB EXPLOTACIÓN: SQLi',   category: 'Web',       difficulty: 'Medium', points: 350, locked: false },
]

export function ChallengeList() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {challenges.map(c => {
        const diff = difficultyStyle[c.difficulty]
        return (
          <div
            key={c.id}
            style={{
              background: '#080f1a',
              border: '1px solid var(--neon-border)',
              borderLeft: '3px solid var(--neon-dim)',
              borderRadius: 4,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              opacity: c.locked ? 0.6 : 0.45,
              cursor: c.locked ? 'default' : 'pointer',
              transition: 'opacity 0.2s, border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { if (!c.locked) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
            onMouseLeave={e => { if (!c.locked) (e.currentTarget as HTMLDivElement).style.opacity = '0.45' }}
          >
            {/* Categoría + candado */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: 9,
                letterSpacing: '0.2em',
                color: 'var(--neon-dim)',
                textTransform: 'uppercase',
              }}>
                {c.category}
              </span>
              {c.locked && <span style={{ fontSize: 14, color: 'var(--neon-border)' }}>🔒</span>}
            </div>

            {/* Ícono */}
            <div style={{
              fontSize: 26,
              color: c.locked ? 'var(--neon-border)' : 'var(--neon-dim)',
              lineHeight: 1,
            }}>
              {c.locked ? '⬡' : '◈'}
            </div>

            {/* Nombre */}
            <div style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 13,
              color: '#c8d8e8',
              lineHeight: 1.3,
            }}>
              {c.name}
            </div>

            {/* Dificultad + puntos */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: 10,
                color: diff.color,
                background: diff.bg,
                padding: '2px 8px',
                borderRadius: 2,
                letterSpacing: '0.05em',
              }}>
                {c.difficulty}
              </span>
              <span style={{ flex: 1 }} />
              <span style={{
                fontFamily: 'monospace',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--neon)',
              }}>
                {c.points} pts
              </span>
            </div>

            {/* Botón */}
            <button
              disabled={c.locked}
              onClick={() => !c.locked && navigate(`/challenges/${c.id}`)}
              style={{
                width: '100%',
                padding: '9px',
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                background: c.locked ? 'transparent' : 'var(--neon-bg)',
                border: `1px solid ${c.locked ? 'var(--neon-border)' : 'var(--neon-dim)'}`,
                color: c.locked ? 'var(--neon-border)' : 'var(--neon)',
                cursor: c.locked ? 'not-allowed' : 'pointer',
                borderRadius: 2,
                transition: 'background 0.2s',
              }}
            >
              {c.locked ? 'BLOQUEADO' : 'COMENZAR'}
            </button>
          </div>
        )
      })}
    </div>
  )
}