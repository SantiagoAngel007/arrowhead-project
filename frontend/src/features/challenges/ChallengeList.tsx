const mockChallenges = [
  { id: 1, title: 'Caesar Cipher', points: 100 },
  { id: 2, title: 'Base64 Decode', points: 100 },
]

export function ChallengeList() {
  return (
    <ul>
      {mockChallenges.map(ch => (
        <li key={ch.id}>{ch.title} — {ch.points} pts</li>
      ))}
    </ul>
  )
}
