import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getChallengeById } from '../data/mockChallenges'
import { useColorCycle } from '../../../hooks/useColorCycle'

const gifs = [
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif1.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif2.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif3.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif4.gif',
]

const difficultyStyle: Record<string, { color: string; bg: string }> = {
  Easy:   { color: '#4ade80', bg: 'rgba(74, 222, 128, 0.12)' },
  Medium: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)' },
  Hard:   { color: '#f87171', bg: 'rgba(248, 113, 113, 0.12)' },
}

const panel: React.CSSProperties = {
  background: 'rgba(6, 13, 22, 0.85)',
  border: '1px solid var(--neon-border)',
  borderRadius: 4,
  overflow: 'hidden',
  opacity: 0.45,
  transition: 'opacity 0.2s',
}

export function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const challenge = getChallengeById(Number(id))
  const { index } = useColorCycle()

  const [flag, setFlag] = useState('')
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle')
  const [hintOpen, setHintOpen] = useState(false)

  if (!challenge) {
    return (
      <div style={{ padding: 32, fontFamily: 'monospace', color: 'var(--neon)' }}>
        <p>Reto no encontrado.</p>
        <button
          onClick={() => navigate('/challenges')}
          style={{ background: 'transparent', border: '1px solid var(--neon-border)', color: 'var(--neon)', fontFamily: 'monospace', padding: '8px 16px', cursor: 'pointer' }}
        >
          ← Volver
        </button>
      </div>
    )
  }

  const diff = difficultyStyle[challenge.difficulty]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(flag.trim() === challenge.flag ? 'correct' : 'wrong')
  }

  return (
    <div style={{
      minHeight: 'calc(100svh - 56px)',
      margin: '-32px',
      padding: '32px',
      position: 'relative',
      isolation: 'isolate',
    }}>

      {/* Fondo GIF */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2 }}>
        {gifs.map((gif, i) => (
          <div
            key={gif}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${gif}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === index % gifs.length ? 0.99 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(2, 6, 14, 0.65)', zIndex: -1 }} />

      {/* Breadcrumb */}
      <button
        onClick={() => navigate('/challenges')}
        style={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          color: 'var(--neon-dim)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          textTransform: 'uppercase',
        }}
      >
        ← RETOS / {challenge.category.toUpperCase()} / {challenge.name}
      </button>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <span style={{
            fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
            color: 'var(--neon-dim)', textTransform: 'uppercase',
            border: '1px solid var(--neon-border)', padding: '3px 10px', borderRadius: 2,
          }}>
            {challenge.category}
          </span>
          <span style={{
            fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.05em',
            color: diff.color, background: diff.bg, padding: '3px 10px', borderRadius: 2,
          }}>
            {challenge.difficulty}
          </span>
          <span style={{
            fontFamily: 'monospace', fontWeight: 700, fontSize: 15,
            color: 'var(--neon)', marginLeft: 'auto',
          }}>
            {challenge.points} pts
          </span>
        </div>
        <h2 style={{
          fontFamily: 'monospace', fontSize: 22, fontWeight: 700,
          color: 'var(--neon)', letterSpacing: '0.06em', margin: 0,
        }}>
          {challenge.name}
        </h2>
      </div>

      {/* Layout principal */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'start' }}>

        {/* Izquierda: descripción + terminal */}
        <div
          style={panel}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
        >
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--neon-border)' }}>
            <div style={{
              fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
              color: 'var(--neon-dim)', textTransform: 'uppercase', marginBottom: 10,
            }}>
              // descripción
            </div>
            <p style={{ fontFamily: 'monospace', fontSize: 13, color: '#8aaac8', lineHeight: 1.75, margin: 0 }}>
              {challenge.description}
            </p>
          </div>

          <div style={{ padding: '20px 24px' }}>
            <div style={{
              fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
              color: 'var(--neon-dim)', textTransform: 'uppercase', marginBottom: 12,
            }}>
              // terminal
            </div>
            <pre style={{
              fontFamily: 'monospace', fontSize: 12, color: 'var(--neon)',
              background: '#020810',
              border: '1px solid var(--neon-border)',
              borderLeft: '3px solid var(--neon-dim)',
              borderRadius: 2,
              padding: '16px',
              margin: 0,
              overflowX: 'auto',
              lineHeight: 1.65,
              whiteSpace: 'pre-wrap',
            }}>
              {challenge.terminalContent}
            </pre>
          </div>
        </div>

        {/* Derecha: submit flag + pista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Submit */}
          <div
            style={{
              ...panel,
              padding: '20px',
              opacity: challenge.locked ? 0.35 : 0.45,
            }}
            onMouseEnter={e => { if (!challenge.locked) (e.currentTarget as HTMLDivElement).style.opacity = '1' }}
            onMouseLeave={e => { if (!challenge.locked) (e.currentTarget as HTMLDivElement).style.opacity = challenge.locked ? '0.35' : '0.45' }}
          >
            <div style={{
              fontFamily: 'monospace', fontSize: 9, letterSpacing: '0.2em',
              color: 'var(--neon-dim)', textTransform: 'uppercase', marginBottom: 14,
            }}>
              $ submit --flag
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input
                className="submit-box__input"
                placeholder="ARROWHEAD{...}"
                value={flag}
                onChange={e => { setFlag(e.target.value); setStatus('idle') }}
                disabled={challenge.locked || status === 'correct'}
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid var(--neon-border)',
                  color: 'var(--neon)',
                  fontFamily: 'monospace',
                  fontSize: 12,
                }}
              />
              <button
                type="submit"
                disabled={challenge.locked || status === 'correct' || !flag.trim()}
                className="submit-box__btn"
                style={{
                  padding: '10px',
                  fontFamily: 'monospace',
                  letterSpacing: '0.15em',
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: challenge.locked || status === 'correct' || !flag.trim() ? 'not-allowed' : 'pointer',
                  opacity: !flag.trim() ? 0.5 : 1,
                }}
              >
                ENVIAR
              </button>
            </form>

            {status === 'correct' && (
              <div style={{
                marginTop: 14,
                fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.08em',
                color: '#4ade80',
                textShadow: '0 0 10px rgba(74, 222, 128, 0.7)',
              }}>
                ✓ FLAG CORRECTA — +{challenge.points} pts
              </div>
            )}
            {status === 'wrong' && (
              <div style={{
                marginTop: 14,
                fontFamily: 'monospace', fontSize: 12, letterSpacing: '0.08em',
                color: '#f87171',
              }}>
                ✗ FLAG INCORRECTA — intenta de nuevo
              </div>
            )}
          </div>

          {/* Pista */}
          <div
            style={{ ...panel, overflow: 'hidden' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
          >
            <button
              onClick={() => setHintOpen(o => !o)}
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'transparent',
                border: 'none',
                borderBottom: hintOpen ? '1px solid var(--neon-border)' : 'none',
                color: 'var(--neon-dim)',
                fontFamily: 'monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>▶ PISTA</span>
              <span style={{ opacity: 0.5, fontSize: 16, lineHeight: 1 }}>{hintOpen ? '−' : '+'}</span>
            </button>
            {hintOpen && (
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#8aaac8', lineHeight: 1.65, margin: 0 }}>
                  {challenge.hint}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
