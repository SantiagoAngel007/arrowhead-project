import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TriviaHUD } from '../components/TriviaHUD'
import NodeMap from '../components/NodeMap'
import ChallengePanel from '../components/ChallengePanel'
import Leaderboard from '../components/Leaderboard'

const MOCK_CHALLENGE = {
  id: 1,
  number: 5,
  title: 'WEB VULNERABILITIES',
  status: 'ACTIVE',
  difficulty: 'INTERMEDIATE',
  points: 1500,
  question: 'Identify the type of attack where malicious scripts are injected into trusted websites.',
  options: [
    { id: 'A', text: 'SQL Injection' },
    { id: 'B', text: 'Cross-Site Scripting (XSS)' },
    { id: 'C', text: 'Denial of Service (DoS)' },
    { id: 'D', text: 'Phishing' },
  ],
}

export function TriviaPage() {
  const navigate = useNavigate()
  const [activeChallenge, setActiveChallenge] = useState<typeof MOCK_CHALLENGE | null>(null)

  const handleNodeClick = (_nodeId: string) => {
    setActiveChallenge(MOCK_CHALLENGE)
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <NodeMap onNodeClick={handleNodeClick} />

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }}>
        <TriviaHUD
          title="CUESTIONARIO DE INICIACIÓN"
          level="INICIACIÓN"
          onBack={() => navigate('/challenges')}
        />
      </div>

      <Leaderboard />

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
