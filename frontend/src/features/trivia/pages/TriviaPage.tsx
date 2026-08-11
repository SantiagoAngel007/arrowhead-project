import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TriviaHUD } from '../components/TriviaHUD'
import NodeMap from '../components/NodeMap'
import ChallengePanel from '../components/ChallengePanel'
import Leaderboard from '../components/Leaderboard'
import { QUESTIONS } from '../../../components/Data'
import { type LayoutId, type Theme } from '../components/layouts'

// ── Layout persistence ────────────────────────────────────────────────────────

const LAYOUT_KEY  = 'trivia-layout'
const ALL_LAYOUTS: LayoutId[] = ['C', 'D', 'G', 'H', 'I', 'J']

function getOrAssignLayout(): LayoutId {
  const stored = localStorage.getItem(LAYOUT_KEY)
  if (stored && (ALL_LAYOUTS as string[]).includes(stored)) return stored as LayoutId
  const random = ALL_LAYOUTS[Math.floor(Math.random() * ALL_LAYOUTS.length)]
  localStorage.setItem(LAYOUT_KEY, random)
  return random
}

// ── Branch config ─────────────────────────────────────────────────────────────
// blockIdx from Data.ts:
//   0 Intro  1 Redes  2 CIA  3 OWASP  4 OSI  5 Lógica

type Branch = Exclude<Theme, 'center'>

const BRANCH_BLOCKS: Record<Branch, number[]> = {
  north: [0, 2], // Fundamentos + CIA
  east:  [1, 4], // Redes + OSI
  south: [3, 5], // OWASP + Lógica
  west:  [],     // Próximamente
}

const BRANCH_META: Record<Branch, { title: string; difficulty: string; points: number }> = {
  north: { title: 'FUNDAMENTOS', difficulty: 'BEGINNER',     points: 500  },
  east:  { title: 'REDES',       difficulty: 'INTERMEDIATE', points: 1000 },
  south: { title: 'OWASP & WEB', difficulty: 'INTERMEDIATE', points: 1200 },
  west:  { title: 'AVANZADO',    difficulty: 'ADVANCED',     points: 2000 },
}

// ── Component ─────────────────────────────────────────────────────────────────

type ActiveChallenge = {
  id: number
  number: number
  title: string
  status: string
  difficulty: string
  points: number
  question: string
  options: { id: string; text: string }[]
}

export function TriviaPage() {
  const navigate = useNavigate()
  const [layout, setLayout] = useState<LayoutId>(getOrAssignLayout)
  const [activeChallenge, setActiveChallenge] = useState<ActiveChallenge | null>(null)

  const cycleLayout = () => {
    const next = ALL_LAYOUTS[(ALL_LAYOUTS.indexOf(layout) + 1) % ALL_LAYOUTS.length]
    localStorage.setItem(LAYOUT_KEY, next)
    setLayout(next)
  }

  const handleNodeClick = (_nodeId: string, theme: Theme) => {
    if (theme === 'center') return

    const branch = theme as Branch
    const blockIndices = BRANCH_BLOCKS[branch]
    if (blockIndices.length === 0) return

    const branchQuestions = QUESTIONS.filter(q => blockIndices.includes(q.blockIdx))
    if (branchQuestions.length === 0) return

    const q    = branchQuestions[Math.floor(Math.random() * branchQuestions.length)]
    const meta = BRANCH_META[branch]

    setActiveChallenge({
      id:         q.id,
      number:     q.id,
      title:      meta.title,
      status:     'ACTIVE',
      difficulty: meta.difficulty,
      points:     meta.points,
      question:   q.text,
      options:    q.options,
    })
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <NodeMap layout={layout} onNodeClick={handleNodeClick} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <TriviaHUD
          title="CUESTIONARIO DE INICIACIÓN"
          level="INICIACIÓN"
          onBack={() => navigate('/challenges')}
        />
      </div>

      <Leaderboard />

      {/* Layout switcher */}
      <button
        onClick={cycleLayout}
        title="Cambiar diseño del mapa"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 50,
          background: 'rgba(6,10,20,0.85)',
          border: '1px solid rgba(0,255,136,0.4)',
          borderRadius: 6,
          color: '#00ff88',
          fontFamily: 'monospace',
          fontSize: 11,
          letterSpacing: 2,
          padding: '6px 14px',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#00ff88' }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,255,136,0.4)' }}
      >
        MAPA {layout}
      </button>

      {activeChallenge && (
        <ChallengePanel
          challenge={activeChallenge}
          onReturn={() => setActiveChallenge(null)}
          onAnswer={(challengeId, answerId) => console.log('respuesta:', challengeId, answerId)}
        />
      )}
    </div>
  )
}
