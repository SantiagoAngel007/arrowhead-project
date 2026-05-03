import { useEffect, useRef } from 'react'
import { LoginForm } from '../components/LoginForm'

function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const FONT_SIZE = 14
    const cols = Math.floor(canvas.width / FONT_SIZE)
    const drops: number[] = Array(cols).fill(1)

    const tick = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0'
        const brightness = Math.random()
        if (brightness > 0.92) {
          ctx.fillStyle = '#ffffff'
        } else if (brightness > 0.7) {
          ctx.fillStyle = '#4a9e5c'
        } else {
          ctx.fillStyle = '#1a5c2a'
        }
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE)
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(tick, 40)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
    />
  )
}

export function LoginPage() {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      background: '#000',
      position: 'relative',
    }}>
      <BinaryRain />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '420px',
          border: '1px solid #1e3a1e',
          borderRadius: '4px',
          padding: '36px 32px',
          background: 'rgba(0, 0, 0, 0.88)',
          backdropFilter: 'blur(6px)',
          opacity: 0.45,
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.opacity = '1'}
        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.opacity = '0.45'}
      >
        <p style={{ fontSize: 11, color: '#4a9e5c', letterSpacing: '0.3em', marginBottom: 8 }}>
          ARROWHEAD CTF
        </p>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', color: '#e8f5e8', fontFamily: '"Courier New", monospace', letterSpacing: '0.1em' }}>
          Bienvenido
        </h1>
        <p style={{ marginBottom: '28px', fontSize: '13px', color: '#4a9e5c', fontFamily: '"Courier New", monospace' }}>
          Completa tu registro para comenzar los retos
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
