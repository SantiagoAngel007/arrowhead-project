const mockRanking = [
  { pos: 1, alias: 'n3ur0hack', points: 850 },
  { pos: 2, alias: 'phantom_x', points: 600 },
]

export function RankingTable() {
  return (
    <ol>
      {mockRanking.map(p => (
        <li key={p.pos}>{p.alias} — {p.points} pts</li>
      ))}
    </ol>
  )
}
