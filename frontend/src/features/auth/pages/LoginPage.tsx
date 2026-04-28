import { LoginForm } from '../components/LoginForm'
import { useColorCycle } from '../../../hooks/useColorCycle'

const gifs = [
  '/gif.gif',
  '/gif1.gif',
  '/gif2.gif',
  '/gif3.gif',
  '/gif4.gif',
]

export function LoginPage() {
  const { index } = useColorCycle()

  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      isolation: 'isolate',
    }}>

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

      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(2, 6, 14, 0.65)',
        zIndex: -1,
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        border: '1px solid var(--neon-border)',
        borderRadius: '8px',
        padding: '36px 32px',
        background: 'rgba(6, 13, 22, 0.85)',
        opacity: 0.45,
        transition: 'opacity 0.2s',
      }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
      >
        <span className="header-badge" style={{ color: 'var(--neon)', borderColor: 'var(--neon-border)' }}>
          ARROWHEAD CTF
        </span>
        <h1 style={{ fontSize: '32px', margin: '12px 0 4px', color: 'var(--neon)' }}>Bienvenido</h1>
        <p style={{ marginBottom: '28px', fontSize: '14px', color: 'var(--neon-dim)' }}>
          Completa tu registro para comenzar los retos
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
