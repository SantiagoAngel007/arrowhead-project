import { useState } from 'react'

// ── Mock data ─────────────────────────────────────────────────────────────────

interface Player {
  rank: number
  alias: string
  points: number
  correct: number
  total: number
  challenges: { id: string; done: boolean }[]
}

interface ChallengeRank {
  alias: string
  points: number
  correct: number
  time: string
}

const PLAYERS: Player[] = [
  { rank: 1, alias: 'n3ur0hack',    points: 2850, correct: 11, total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: true }, { id: 'ataque', done: true }] },
  { rank: 2, alias: 'phantom_x',    points: 2400, correct: 9,  total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: true }, { id: 'ataque', done: false }] },
  { rank: 3, alias: 'byte_hunter',  points: 1950, correct: 8,  total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: false }, { id: 'ataque', done: true }] },
  { rank: 4, alias: 'cyb3r_wolf',   points: 1500, correct: 6,  total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: true }, { id: 'ataque', done: false }] },
  { rank: 5, alias: 'zero_day_01',  points: 900,  correct: 4,  total: 12, challenges: [{ id: 'trivia', done: false }, { id: 'wireshark', done: true }, { id: 'ataque', done: false }] },
  { rank: 6, alias: 'root_acc3ss',  points: 750,  correct: 3,  total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: false }, { id: 'ataque', done: false }] },
  { rank: 7, alias: 'shell_ghost',  points: 450,  correct: 2,  total: 12, challenges: [{ id: 'trivia', done: false }, { id: 'wireshark', done: false }, { id: 'ataque', done: false }] },
  { rank: 8, alias: 'icesi_agent',  points: 300,  correct: 1,  total: 12, challenges: [{ id: 'trivia', done: true }, { id: 'wireshark', done: false }, { id: 'ataque', done: false }] },
]

const CHALLENGE_RANKINGS: Record<string, { label: string; color: string; players: ChallengeRank[] }> = {
  trivia: {
    label: 'CUESTIONARIO DE INICIACIÓN',
    color: '#00ff88',
    players: [
      { alias: 'n3ur0hack',   points: 950, correct: 8, time: '12:34' },
      { alias: 'phantom_x',   points: 800, correct: 7, time: '15:20' },
      { alias: 'byte_hunter', points: 750, correct: 7, time: '18:05' },
      { alias: 'cyb3r_wolf',  points: 650, correct: 6, time: '21:44' },
      { alias: 'root_acc3ss', points: 500, correct: 5, time: '28:10' },
      { alias: 'icesi_agent', points: 300, correct: 3, time: '35:00' },
    ],
  },
  wireshark: {
    label: 'ANÁLISIS DE TRÁFICO',
    color: '#00d4ff',
    players: [
      { alias: 'n3ur0hack',   points: 1000, correct: 1, time: '08:12' },
      { alias: 'phantom_x',   points: 1000, correct: 1, time: '09:55' },
      { alias: 'cyb3r_wolf',  points: 1000, correct: 1, time: '11:30' },
      { alias: 'zero_day_01', points: 1000, correct: 1, time: '14:22' },
      { alias: 'byte_hunter', points: 0,    correct: 0, time: '—'     },
    ],
  },
  ataque: {
    label: 'DEFENSA Y ATAQUE ACTIVA',
    color: '#ff6a00',
    players: [
      { alias: 'n3ur0hack',   points: 900, correct: 2, time: '22:10' },
      { alias: 'byte_hunter', points: 700, correct: 1, time: '30:45' },
      { alias: 'phantom_x',   points: 600, correct: 1, time: '38:00' },
    ],
  },
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<number, { bg: string; color: string }> = {
  1: { bg: 'rgba(184,134,11,0.25)',  color: '#ffe566' },
  2: { bg: 'rgba(180,180,180,0.15)', color: '#c0c0c0' },
  3: { bg: 'rgba(160,100,40,0.2)',   color: '#cd7f32' },
}
const defaultBadge = { bg: 'rgba(255,255,255,0.04)', color: '#6b7a8d' }

function medal(rank: number) {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return null
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid var(--neon-border)',
      padding: '14px 20px',
      fontFamily: 'monospace',
      flex: 1,
      minWidth: 120,
    }}>
      <div style={{ color: 'var(--neon-dim)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ color: 'var(--neon)', fontSize: 26, fontWeight: 700, lineHeight: 1 }}>
        {value}
      </div>
      {sub && <div style={{ color: '#6b7a8d', fontSize: 9, marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

function ChallengeLeaderboard({ id }: { id: string }) {
  const data = CHALLENGE_RANKINGS[id]
  if (!data) return null
  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: `1px solid ${data.color}22`,
      fontFamily: 'monospace',
      flex: 1,
      minWidth: 220,
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        borderBottom: `1px solid ${data.color}22`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: data.color, boxShadow: `0 0 6px ${data.color}` }} />
        <span style={{ color: data.color, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700 }}>
          {data.label}
        </span>
      </div>

      {/* Column headers */}
      <div style={{ display: 'flex', padding: '6px 14px', borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
        <span style={{ color: '#6b7a8d', fontSize: 8, letterSpacing: '0.15em', flex: 1 }}>JUGADOR</span>
        <span style={{ color: '#6b7a8d', fontSize: 8, letterSpacing: '0.15em', width: 50, textAlign: 'right' }}>RESP.</span>
        <span style={{ color: '#6b7a8d', fontSize: 8, letterSpacing: '0.15em', width: 54, textAlign: 'right' }}>TIEMPO</span>
        <span style={{ color: '#6b7a8d', fontSize: 8, letterSpacing: '0.15em', width: 54, textAlign: 'right' }}>PTS</span>
      </div>

      {/* Rows */}
      {data.players.map((p, i) => (
        <div
          key={p.alias}
          style={{
            display: 'flex', alignItems: 'center', padding: '7px 14px',
            borderBottom: i < data.players.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
            background: i === 0 ? `${data.color}08` : 'transparent',
          }}
        >
          <span style={{ color: '#6b7a8d', fontSize: 10, width: 18 }}>{i + 1}</span>
          <span style={{ color: i === 0 ? data.color : '#c8d8e8', fontSize: 11, flex: 1, letterSpacing: '0.05em' }}>
            {medal(i + 1) ?? ''} {p.alias}
          </span>
          <span style={{ color: '#6b7a8d', fontSize: 10, width: 50, textAlign: 'right' }}>{p.correct}</span>
          <span style={{ color: '#6b7a8d', fontSize: 10, width: 54, textAlign: 'right' }}>{p.time}</span>
          <span style={{ color: p.points > 0 ? data.color : '#374151', fontSize: 11, fontWeight: 700, width: 54, textAlign: 'right' }}>
            {p.points > 0 ? p.points : '—'}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function RankingPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'trivia' | 'wireshark' | 'ataque'>('general')

  const totalCorrect = PLAYERS.reduce((s, p) => s + p.correct, 0)
  const totalPlayers = PLAYERS.length
  const leader = PLAYERS[0]

  return (
    <div className="font-mono" style={{ minHeight: 'calc(100svh - 52px)', background: 'rgba(2,6,14,0.95)', padding: '24px' }}>

      {/* ── Título ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ color: 'var(--neon-dim)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 4 }}>
          ARROWHEAD CTF — CLASIFICACIÓN EN VIVO
        </div>
        <h1 style={{ color: 'var(--neon)', fontSize: 22, fontWeight: 700, letterSpacing: '0.12em', margin: 0 }}>
          RANKING GLOBAL
        </h1>
      </div>

      {/* ── Stat cards ── */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <StatCard label="Participantes"    value={String(totalPlayers)}  sub="equipos activos" />
        <StatCard label="Respuestas correctas" value={String(totalCorrect)} sub={`de ${totalPlayers * 12} posibles`} />
        <StatCard label="Líder actual"     value={leader.alias}          sub={`${leader.points} pts`} />
        <StatCard label="Retos activos"    value="3"                     sub="cuestionario · wireshark · ataque" />
      </div>

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: 2, marginBottom: 0, borderBottom: '1px solid var(--neon-border)' }}>
        {([
          { id: 'general',   label: 'GENERAL' },
          { id: 'trivia',    label: 'CUESTIONARIO' },
          { id: 'wireshark', label: 'WIRESHARK' },
          { id: 'ataque',    label: 'ATAQUE Y DEFENSA' },
        ] as const).map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: activeTab === tab.id ? 'var(--neon-bg)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--neon)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--neon)' : '#6b7a8d',
              padding: '8px 18px',
              fontSize: 10,
              fontFamily: 'monospace',
              letterSpacing: '0.18em',
              cursor: 'pointer',
              textTransform: 'uppercase',
              transition: 'all 0.15s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Contenido por tab ── */}
      <div style={{ marginTop: 16 }}>

        {/* GENERAL */}
        {activeTab === 'general' && (
          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid var(--neon-border)' }}>
            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '40px 1fr 90px 90px 90px 100px',
              padding: '8px 16px',
              borderBottom: '1px solid var(--neon-border)',
              background: 'rgba(0,0,0,0.3)',
            }}>
              {['#', 'JUGADOR', 'CORRECTAS', 'TOTAL', 'RETOS', 'PUNTOS'].map(h => (
                <span key={h} style={{ color: 'var(--neon-dim)', fontSize: 8, letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: h === '#' || h === 'JUGADOR' ? 'left' : 'center' }}>
                  {h}
                </span>
              ))}
            </div>

            {PLAYERS.map((p, i) => {
              const badge = BADGE_COLORS[p.rank] ?? defaultBadge
              const pct = Math.round((p.correct / p.total) * 100)
              return (
                <div
                  key={p.alias}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 90px 90px 90px 100px',
                    padding: '12px 16px',
                    alignItems: 'center',
                    borderBottom: i < PLAYERS.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: i === 0 ? 'rgba(0,255,136,0.04)' : 'transparent',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,255,136,0.03)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = i === 0 ? 'rgba(0,255,136,0.04)' : 'transparent' }}
                >
                  {/* Rank badge */}
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: badge.bg, color: badge.color,
                    fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {p.rank}
                  </div>

                  {/* Alias */}
                  <div>
                    <div style={{ color: i < 3 ? 'var(--neon)' : '#c8d8e8', fontSize: 12, fontWeight: i < 3 ? 700 : 400, letterSpacing: '0.06em' }}>
                      {medal(p.rank) && <span style={{ marginRight: 6 }}>{medal(p.rank)}</span>}
                      {p.alias}
                    </div>
                    {/* Progress bar */}
                    <div style={{ marginTop: 4, width: '80%', height: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 1, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: 'var(--neon)', borderRadius: 1 }} />
                    </div>
                  </div>

                  {/* Correctas */}
                  <div style={{ textAlign: 'center', color: 'var(--neon)', fontSize: 13, fontWeight: 700 }}>
                    {p.correct}
                    <span style={{ color: '#6b7a8d', fontSize: 9, marginLeft: 2 }}>/ {p.total}</span>
                  </div>

                  {/* Porcentaje */}
                  <div style={{ textAlign: 'center', color: '#6b7a8d', fontSize: 11 }}>{pct}%</div>

                  {/* Retos completados */}
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                    {p.challenges.map(ch => (
                      <div
                        key={ch.id}
                        title={ch.id}
                        style={{
                          width: 10, height: 10, borderRadius: '50%',
                          background: ch.done ? 'var(--neon)' : 'rgba(255,255,255,0.08)',
                          boxShadow: ch.done ? '0 0 5px var(--neon)' : 'none',
                        }}
                      />
                    ))}
                  </div>

                  {/* Puntos */}
                  <div style={{ textAlign: 'center', color: 'var(--neon)', fontSize: 14, fontWeight: 700, letterSpacing: '0.05em' }}>
                    {p.points.toLocaleString()}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* POR RETO */}
        {activeTab !== 'general' && (
          <ChallengeLeaderboard id={activeTab} />
        )}
      </div>

      {/* ── Footer ── */}
      <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.15em' }}>
          ● ACTUALIZADO EN TIEMPO REAL
        </div>
        <div style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.15em' }}>
          ○ DOTS = RETOS COMPLETADOS
        </div>
        <div style={{ color: '#6b7a8d', fontSize: 9, letterSpacing: '0.15em' }}>
          RESP. = RESPUESTAS CORRECTAS
        </div>
      </div>

    </div>
  )
}
