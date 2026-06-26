import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
}

export function AdminLoginPage() {
  const navigate = useNavigate()
  const [form, setForm]     = useState({ usuario: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('')
      setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!form.usuario.trim() || !form.password.trim()) {
      setError('Completa todos los campos.')
      return
    }

    setLoading(true)

    // TODO: reemplazar por llamada real al backend /api/auth/login
    setTimeout(() => {
      if (form.usuario === 'admin' && form.password === 'admin123') {
        navigate('/admin')
      } else {
        setError('Credenciales incorrectas. Acceso denegado.')
        setLoading(false)
      }
    }, 600)
  }

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
        {/* Header */}
        <p style={{ fontSize: 11, color: '#4a9e5c', letterSpacing: '0.3em', marginBottom: 8 }}>
          ARROWHEAD CTF
        </p>
        <h1 style={{ fontSize: '28px', margin: '0 0 4px', color: '#e8f5e8', fontFamily: '"Courier New", monospace', letterSpacing: '0.1em' }}>
          Acceso Admin
        </h1>
        <p style={{ marginBottom: '28px', fontSize: '13px', color: '#4a9e5c', fontFamily: '"Courier New", monospace' }}>
          Área restringida — solo personal autorizado
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: 'linear-gradient(to right, #1e3a1e, transparent)', marginBottom: 28 }} />

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input
            type="text"
            placeholder="Usuario"
            value={form.usuario}
            onChange={set('usuario')}
            required
            autoComplete="username"
            style={{
              background: 'rgba(10, 20, 10, 0.9)',
              border: '1px solid #2a3a2a',
              color: '#c8e6c8',
              fontFamily: '"Courier New", monospace',
              padding: '10px 14px',
              fontSize: 13,
              outline: 'none',
              borderRadius: 2,
              width: '100%',
              boxSizing: 'border-box',
            }}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={set('password')}
            required
            autoComplete="current-password"
            style={{
              background: 'rgba(10, 20, 10, 0.9)',
              border: '1px solid #2a3a2a',
              color: '#c8e6c8',
              fontFamily: '"Courier New", monospace',
              padding: '10px 14px',
              fontSize: 13,
              outline: 'none',
              borderRadius: 2,
              width: '100%',
              boxSizing: 'border-box',
            }}
          />

          {/* Error message */}
          {error && (
            <p style={{ color: '#ef4444', fontFamily: '"Courier New", monospace', fontSize: 11, letterSpacing: '0.08em', margin: 0 }}>
              ✕ {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: 8,
              background: loading ? '#1a3a1a' : '#2a5c34',
              border: 'none',
              color: '#c8f0c8',
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              borderRadius: 2,
              fontSize: 13,
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Verificando...' : 'Acceder al Panel'}
          </button>
        </form>

        {/* Footer */}
        <p style={{ marginTop: 24, fontSize: 10, color: '#2a5a2a', fontFamily: '"Courier New", monospace', letterSpacing: '0.12em', textAlign: 'center' }}>
          ← <span
            onClick={() => navigate('/login')}
            style={{ cursor: 'pointer', color: '#4a9e5c', textDecoration: 'underline' }}
          >
            Volver al login de jugadores
          </span>
        </p>
      </div>
    </div>
  )
}
