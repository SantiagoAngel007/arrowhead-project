import { useEffect, useState } from 'react'
import { ChallengeList } from '../components/ChallengeList'
import { useColorCycle } from '../../../hooks/useColorCycle'

const TARGET = new Date('2026-05-25T23:59:59')

const ranking = [
  { pos: 1, alias: 'CodeMaster_99', points: 1250 },
  { pos: 2, alias: 'Cipher_X',      points: 980  },
  { pos: 3, alias: 'Linux_Fan',     points: 760  },
  { pos: 4, alias: 'ByteHunter',    points: 640  },
  { pos: 5, alias: 'BronzeAccess',  points: 420  },
]

const posColor = (pos: number) =>
  pos === 1 ? '#ffd700' : pos === 2 ? '#c0c0c0' : pos === 3 ? '#cd7f32' : '#4a6a8a'

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

const sidebar: React.CSSProperties = {
  background: '#060d16',
  border: '1px solid var(--neon-border)',
  borderRadius: 4,
  overflow: 'hidden',
}

const sidebarHeader: React.CSSProperties = {
  padding: '10px 14px',
  borderBottom: '1px solid var(--neon-border)',
  fontFamily: 'monospace',
  fontSize: 10,
  letterSpacing: '0.2em',
  color: 'var(--neon-dim)',
  textTransform: 'uppercase',
}

const gifs = [
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif1.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif2.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif3.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif4.gif',
]

export function ChallengesPage() {
  const [time, setTime] = useState(getTimeLeft)
  const { index } = useColorCycle()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{
      minHeight: 'calc(100svh - 56px)',
      margin: '-32px',
      padding: '32px',
      position: 'relative',
      isolation: 'isolate',
    }}>

      {/* GIFs de fondo rotando */}
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

      {/* Overlay oscuro para legibilidad */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 14, 0.65)',
        zIndex: -1,
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>

        {/* Columna izquierda */}
        <div>
          <h2 style={{
            fontFamily: 'monospace',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--neon)',
            letterSpacing: '0.05em',
            marginBottom: 20,
          }}>
            RETOS ACTIVOS
          </h2>
          <ChallengeList />
        </div>

        {/* Columna derecha */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Countdown */}
          <div
            style={{ ...sidebar, padding: '18px 14px', textAlign: 'center', opacity: 0.45, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
          >
            <div style={{
              fontFamily: 'monospace',
              fontSize: 9,
              letterSpacing: '0.2em',
              color: 'var(--neon-dim)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}>
              Próximo evento finaliza en
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 20,
              fontWeight: 700,
              color: 'var(--neon)',
              letterSpacing: '0.05em',
              whiteSpace: 'nowrap',
            }}>
              {pad(time.d)} : {pad(time.h)} : {pad(time.m)} : {pad(time.s)}
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: 9,
              color: 'var(--neon-border)',
              marginTop: 8,
              letterSpacing: '0.15em',
              display: 'flex',
              justifyContent: 'center',
              gap: 18,
            }}>
              <span>DÍAS</span><span>HRS</span><span>MIN</span><span>SEG</span>
            </div>
          </div>

          {/* Clasificación en vivo */}
          <div
            style={{ ...sidebar, opacity: 0.45, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
            onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
          >
            <div style={sidebarHeader}>▶ Clasificación en vivo</div>
            {ranking.map(r => (
              <div
                key={r.pos}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderBottom: '1px solid var(--neon-border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: 14,
                    color: posColor(r.pos),
                    width: 16,
                    textAlign: 'center',
                  }}>
                    {r.pos}
                  </span>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: 12,
                    color: '#8aaac8',
                  }}>
                    {r.alias}
                  </span>
                </div>
                <span style={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: 13,
                  color: 'var(--neon)',
                }}>
                  {r.points}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}