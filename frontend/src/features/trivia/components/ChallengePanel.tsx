import { useState } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChallengeOption {
  id: string
  text: string
}

interface Challenge {
  id: number
  number: number
  title: string
  status: string
  difficulty: string
  points: number
  question: string
  options: ChallengeOption[]
}

interface ChallengePanelProps {
  challenge: Challenge
  onReturn: () => void
  onAnswer: (challengeId: number, answerId: string) => void
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChallengePanel({ challenge, onReturn, onAnswer }: ChallengePanelProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [returnHovered, setReturnHovered] = useState(false)

  const handleSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    onAnswer(challenge.id, optionId)
  }

  const optionStyle = (id: string): React.CSSProperties => {
    const selected = selectedAnswer === id
    const hovered  = hoveredOption === id && !selected
    return {
      width: '100%',
      textAlign: 'left',
      padding: '10px 14px',
      marginBottom: 8,
      background: selected
        ? 'rgba(0, 255, 136, 0.12)'
        : hovered
          ? 'rgba(0, 212, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.6)',
      border: selected
        ? '1px solid #00ff88'
        : hovered
          ? '1px solid rgba(0, 212, 255, 0.6)'
          : '1px solid rgba(0, 212, 255, 0.3)',
      borderRadius: 4,
      color: selected ? '#00ff88' : hovered ? '#00d4ff' : '#cccccc',
      fontSize: 12,
      fontFamily: 'monospace',
      cursor: 'pointer',
      letterSpacing: 1,
      transition: 'all 0.15s ease',
      boxSizing: 'border-box',
    }
  }

  return (
    <div style={{
      position: 'fixed',
      right: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      width: 360,
      zIndex: 100,
      background: 'rgba(6, 10, 20, 0.92)',
      border: '1px solid rgba(0, 255, 136, 0.15)',
      borderRadius: 8,
      padding: 24,
      backdropFilter: 'blur(6px)',
      fontFamily: 'monospace',
      boxSizing: 'border-box',
    }}>

      {/* Botón X */}
      <button
        onClick={onReturn}
        style={{
          position: 'absolute',
          top: 12,
          right: 14,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#6b7a8d',
          fontSize: 14,
          lineHeight: 1,
          padding: 2,
          fontFamily: 'monospace',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#00ff88' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = '#6b7a8d' }}
      >
        ✕
      </button>

      {/* Sección 1 — Identificador */}
      <div style={{ fontSize: 11, letterSpacing: 2, color: '#6b7a8d', marginBottom: 4, textTransform: 'uppercase' }}>
        CHALLENGE {challenge.number}:
      </div>

      {/* Sección 2 — Título */}
      <div style={{ fontSize: 16, fontWeight: 'bold', color: '#00ff88', letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
        {challenge.title}
      </div>

      {/* Sección 3 — Metadatos */}
      <div style={{ marginBottom: 16 }}>
        {[
          { label: 'STATUS:',     value: challenge.status     },
          { label: 'DIFFICULTY:', value: challenge.difficulty },
          { label: 'POINTS:',     value: String(challenge.points) },
        ].map(({ label, value }) => (
          <div key={label} style={{ display: 'flex', gap: 8, fontSize: 11, letterSpacing: 1, marginBottom: 4, textTransform: 'uppercase' }}>
            <span style={{ color: '#6b7a8d' }}>{label}</span>
            <span style={{ color: '#00ff88' }}>{value}</span>
          </div>
        ))}
        <div style={{ borderBottom: '1px solid rgba(0,255,136,0.2)', marginTop: 8 }} />
      </div>

      {/* Sección 4 — Pregunta */}
      <div style={{ fontSize: 13, color: '#ffffff', lineHeight: 1.6, marginBottom: 20, fontFamily: 'monospace' }}>
        {challenge.question}
      </div>

      {/* Sección 5 — Opciones */}
      <div>
        {challenge.options.map(option => {
          const selected = selectedAnswer === option.id
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
              style={optionStyle(option.id)}
            >
              <span style={{ marginRight: 10, color: selected ? '#00ff88' : '#00d4ff' }}>
                {option.id})
              </span>
              {option.text}
            </button>
          )
        })}
      </div>

      {/* Sección 6 — Botón RETURN */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
        <button
          onClick={onReturn}
          onMouseEnter={() => setReturnHovered(true)}
          onMouseLeave={() => setReturnHovered(false)}
          style={{
            padding: '6px 16px',
            background: returnHovered ? 'rgba(0,255,136,0.1)' : 'transparent',
            border: returnHovered ? '1px solid #00ff88' : '1px solid rgba(0, 255, 136, 0.4)',
            borderRadius: 4,
            color: '#00ff88',
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: 2,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          RETURN
        </button>
      </div>

    </div>
  )
}
