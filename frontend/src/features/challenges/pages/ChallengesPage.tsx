import { useEffect, useState } from 'react'
import { useColorCycle } from '../../../hooks/useColorCycle'
import { Info } from '../../../components/Info'
import { LevelCard } from '../../../components/LevelCard'

const TARGET = new Date('2026-05-25T23:59:59')

const gifs = [
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif1.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif2.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif3.gif',
  'https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/gif4.gif',
]

const sideLinks = ['Información General', 'Reglas', 'FAQ']

const ranking = [
  { pos: 1, alias: 'CodeMaster_99', points: 1250 },
  { pos: 2, alias: 'Cipher_X',      points: 980  },
  { pos: 3, alias: 'Linux_Fan',     points: 760  },
  { pos: 4, alias: 'ByteHunter',    points: 640  },
  { pos: 5, alias: 'BronzeAccess',  points: 420  },
]

const posColor = (pos: number) =>
  pos === 1 ? '#ffd700' : pos === 2 ? '#c0c0c0' : pos === 3 ? '#cd7f32' : undefined

const cardLinks = [
  {
    level: 'Nivel 1', title: 'INICIACIÓN',
    description: 'Retos básicos para familiarizarte con el formato CTF',
    difficulty: 'Fácil' as const, sideText: 'Ideal para principiantes',
    challenges: [
      { id: 1, name: 'Cuestionario de Iniciación', locked: false, to: '/challenges/trivia' },
    ],
  },
  {
    level: 'Nivel 2', title: 'EXPLORACIÓN',
    description: 'Retos de dificultad media que te ayudarán a aplicar técnicas',
    difficulty: 'Media' as const, sideText: 'Pon a prueba tus habilidades',
    challenges: [
      { id: 3, name: 'Análisis de Tráfico', locked: false, to: '/challenges/wireshark' },
      { id: 5, name: 'Detección de Fraude', locked: false },
    ],
  },
  {
    level: 'Nivel 3', title: 'DESAFÍO',
    description: 'Retos avanzados que requieren mayor análisis',
    difficulty: 'Difícil' as const, sideText: 'Para quienes buscan un desafío real',
    challenges: [
      { id: 4, name: 'Defensa y Ataque Activa', locked: false, to: '/challenges/ataque-defensa' },
    ],
  },
]

function getTimeLeft() {
  const diff = Math.max(0, TARGET.getTime() - Date.now())
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
    total: diff,
  }
}

const pad = (n: number) => String(n).padStart(2, '0')
const TOTAL_DURATION = TARGET.getTime() - new Date('2026-04-01').getTime()

export function ChallengesPage() {
  const [time, setTime] = useState(getTimeLeft)
  const { index } = useColorCycle()

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="font-mono"
      style={{ minHeight: 'calc(100svh - 56px)', position: 'relative', isolation: 'isolate' }}
    >
      {/* GIFs de fondo */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2 }}>
        {gifs.map((gif, i) => (
          <div
            key={gif}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url('${gif}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              opacity: i === index % gifs.length ? 0.99 : 0,
              transition: 'opacity 0.8s ease-in-out',
            }}
          />
        ))}
      </div>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(2,6,14,0.72)', zIndex: -1 }} />

      <div className="flex flex-col md:flex-row p-6 gap-6">

        {/* ── Sidebar ── */}
        <aside className="md:w-64 flex flex-col gap-4 shrink-0">

          {/* Links de info */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--neon-border)' }} className="p-4">
            <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--neon-dim)' }}>
              Navegación
            </p>
            <ul className="flex flex-col space-y-1">
              {sideLinks.map(label => (
                <li
                  key={label}
                  className="flex items-center gap-3 p-3 text-gray-400 cursor-pointer transition-all duration-200"
                  style={{ borderBottom: '1px solid var(--neon-border)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLLIElement
                    el.style.background = 'var(--neon-bg)'
                    el.style.color = 'var(--neon)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLLIElement
                    el.style.background = ''
                    el.style.color = ''
                  }}
                >
                  <span className="text-sm font-bold tracking-widest uppercase">{label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Countdown */}
          <div
            className="p-6 text-center"
            style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid var(--neon-border)' }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] mb-5 uppercase" style={{ color: 'var(--neon-dim)' }}>
              Tiempo Restante
            </p>
            <div className="flex justify-around items-center mb-4 px-2">
              {[
                { val: pad(time.h), label: 'HRS' },
                { val: ':', label: null },
                { val: pad(time.m), label: 'MIN' },
                { val: ':', label: null },
                { val: pad(time.s), label: 'SEG' },
              ].map((item, i) =>
                item.label ? (
                  <div key={i} className="flex flex-col items-center">
                    <span className="text-3xl font-bold" style={{ color: 'var(--neon)' }}>{item.val}</span>
                    <span className="text-[10px] text-gray-500">{item.label}</span>
                  </div>
                ) : (
                  <span key={i} className="text-2xl font-bold mb-4 animate-pulse" style={{ color: 'var(--neon)' }}>:</span>
                )
              )}
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--neon-border)' }}>
              <div
                className="h-full transition-all duration-1000 ease-linear"
                style={{
                  background: 'var(--neon)',
                  boxShadow: '0 0 10px var(--neon)',
                  width: `${Math.max(0, Math.min(100, (time.total / TOTAL_DURATION) * 100))}%`,
                }}
              />
            </div>
          </div>

          {/* Ranking en vivo */}
          <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--neon-border)', overflow: 'hidden' }}>
            <div
              className="px-4 py-3 text-[10px] uppercase tracking-[0.2em]"
              style={{ borderBottom: '1px solid var(--neon-border)', color: 'var(--neon-dim)' }}
            >
              ▶ Clasificación en vivo
            </div>
            {ranking.map(r => (
              <div
                key={r.pos}
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: '1px solid var(--neon-border)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-sm w-4 text-center" style={{ color: posColor(r.pos) ?? 'var(--neon-dim)' }}>
                    {r.pos}
                  </span>
                  <span className="text-xs" style={{ color: '#8aaac8' }}>{r.alias}</span>
                </div>
                <span className="font-bold text-xs" style={{ color: 'var(--neon)' }}>{r.points}</span>
              </div>
            ))}
          </div>

        </aside>

        {/* ── Contenido principal ── */}
        <main className="flex-1 space-y-10">
          <Info />

          <div className="flex flex-col items-center space-y-2">
            <h2 className="font-bold text-xl tracking-widest uppercase text-center" style={{ color: 'var(--neon)' }}>
              Niveles de Retos
            </h2>
            <p className="text-gray-500 text-sm max-w-xl text-center">
              El CTF está organizado en niveles para que puedas progresar a tu propio ritmo.
            </p>
          </div>

          <LevelCard links={cardLinks} />

          <div className="flex flex-col items-center space-y-2 pb-8">
            <h2 className="font-bold text-xl tracking-widest uppercase text-center" style={{ color: 'var(--neon)' }}>
              Recuerda
            </h2>
            <p className="text-gray-500 text-sm max-w-xl text-center">
              Puedes consultar las reglas completas en la sección de Reglas.
            </p>
            <p className="text-xs font-bold tracking-widest uppercase text-center" style={{ color: 'var(--neon-dim)' }}>
              ¡Diviértete, colabora y que gane el mejor!
            </p>
          </div>
        </main>

      </div>
    </div>
  )
}
