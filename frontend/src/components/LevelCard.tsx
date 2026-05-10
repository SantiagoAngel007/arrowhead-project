import { useNavigate } from 'react-router-dom'

interface ChallengeRef {
  id: number
  name: string
  locked?: boolean
}

interface LevelData {
  level: string
  title: string
  description: string
  difficulty: 'Fácil' | 'Media' | 'Difícil' | 'Experto'
  sideText: string
  img?: string
  challenges?: ChallengeRef[]
}

interface LevelCardProps {
  links: LevelData[]
}

const difficultyColor = (diff: string): React.CSSProperties => {
  switch (diff.toLowerCase()) {
    case 'fácil':   return { borderColor: '#22c55e', color: '#22c55e' }
    case 'media':   return { borderColor: '#eab308', color: '#eab308' }
    case 'difícil': return { borderColor: '#f97316', color: '#f97316' }
    case 'experto': return { borderColor: '#dc2626', color: '#dc2626' }
    default:        return { borderColor: 'var(--neon)', color: 'var(--neon)' }
  }
}

export function LevelCard({ links }: LevelCardProps) {
  const navigate = useNavigate()

  return (
    <section className="p-4 space-y-6">
      {links.map((link, index) => (
        <div
          key={index}
          className="relative flex flex-col md:flex-row p-1 max-w-4xl mx-auto transition-all"
          style={{
            background: 'rgba(0,0,0,0.8)',
            border: '1px solid var(--neon-border)',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--neon-dim)'}
          onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--neon-border)'}
        >
          {/* corner brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: 'var(--neon)' }} />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: 'var(--neon)' }} />

          <div className="flex flex-1 items-center p-6 gap-6">
            <div
              className="hidden sm:flex w-24 h-24 shrink-0 items-center justify-center rounded-full"
              style={{ border: '1px solid var(--neon-border)', background: 'var(--neon-bg)' }}
            >
              {link.img ? (
                <img src={link.img} alt={link.title} className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-xs font-mono" style={{ color: 'var(--neon-border)' }}>ICON</span>
              )}
            </div>

            <div className="text-left font-mono">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--neon)' }}>
                {link.level}
              </span>
              <h3 className="text-2xl font-bold text-white mb-2">{link.title}</h3>
              <p className="text-gray-400 text-sm leading-tight max-w-sm">{link.description}</p>
            </div>
          </div>

          <div className="hidden md:block w-[1px] bg-gray-800 my-6" />

          <div className="flex flex-col justify-center p-6 md:w-72 text-left font-mono">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase font-bold" style={{ color: 'var(--neon-dim)' }}>
                Dificultad
              </span>
              <span
                className="px-3 py-1 border text-xs font-bold uppercase"
                style={difficultyColor(link.difficulty)}
              >
                {link.difficulty}
              </span>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed mb-4">
              {link.sideText}.<br />
              <span className="text-gray-600">Aprende y gana confianza.</span>
            </p>
            {link.challenges && link.challenges.length > 0 ? (
              <div className="flex flex-col gap-2">
                {link.challenges.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => !ch.locked && navigate(`/challenges/${ch.id}`)}
                    disabled={ch.locked}
                    className="text-left px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200"
                    style={{
                      border: '1px solid var(--neon-border)',
                      color: ch.locked ? '#4b5563' : 'var(--neon)',
                      background: 'transparent',
                      cursor: ch.locked ? 'not-allowed' : 'pointer',
                      opacity: ch.locked ? 0.5 : 1,
                    }}
                    onMouseEnter={e => {
                      if (!ch.locked) {
                        const el = e.currentTarget
                        el.style.background = 'var(--neon-bg)'
                        el.style.borderColor = 'var(--neon)'
                      }
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget
                      el.style.background = 'transparent'
                      el.style.borderColor = 'var(--neon-border)'
                    }}
                  >
                    {ch.locked ? '🔒 ' : '▶ '}{ch.name}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--neon-dim)' }}>
                Próximamente
              </p>
            )}
          </div>
        </div>
      ))}
    </section>
  )
}
