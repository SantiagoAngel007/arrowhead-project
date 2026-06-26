import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function GlitchText({ text }: { text: string }) {
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const trigger = () => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }
    const interval = setInterval(trigger, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{
        fontSize: 'clamp(80px, 18vw, 160px)',
        fontWeight: 900,
        fontFamily: '"Courier New", monospace',
        color: '#22c55e',
        letterSpacing: '-0.04em',
        lineHeight: 1,
        display: 'block',
        textShadow: glitch
          ? '3px 0 #ef4444, -3px 0 #00bcd4'
          : '0 0 40px rgba(34,197,94,0.4)',
        transform: glitch ? 'skewX(-2deg)' : 'none',
        transition: 'text-shadow 0.05s, transform 0.05s',
        userSelect: 'none',
      }}>
        {text}
      </span>
      {glitch && (
        <>
          <span style={{ position: 'absolute', inset: 0, color: '#ef4444', fontSize: 'clamp(80px, 18vw, 160px)', fontWeight: 900, fontFamily: '"Courier New", monospace', letterSpacing: '-0.04em', lineHeight: 1, clipPath: 'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)', transform: 'translate(-4px, 0)', opacity: 0.8 }}>{text}</span>
          <span style={{ position: 'absolute', inset: 0, color: '#00bcd4', fontSize: 'clamp(80px, 18vw, 160px)', fontWeight: 900, fontFamily: '"Courier New", monospace', letterSpacing: '-0.04em', lineHeight: 1, clipPath: 'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)', transform: 'translate(4px, 0)', opacity: 0.8 }}>{text}</span>
        </>
      )}
    </div>
  )
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const FONT_SIZE = 13
    const cols = Math.floor(canvas.width / FONT_SIZE)
    const drops: number[] = Array(cols).fill(1)
    const chars = '404ERRORNOTFOUND01アイウエオ'.split('')

    const tick = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.06)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const b = Math.random()
        ctx.fillStyle = b > 0.95 ? '#ffffff' : b > 0.7 ? '#22c55e' : '#0d3d1a'
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE)
        if (drops[i] * FONT_SIZE > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      }
    }

    const interval = setInterval(tick, 45)
    return () => { clearInterval(interval); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.5 }} />
}

function TerminalLine({ children, delay = 0 }: { children: string; delay?: number }) {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    const show = setTimeout(() => {
      setVisible(true)
      let i = 0
      const type = setInterval(() => {
        setText(children.slice(0, i + 1))
        i++
        if (i >= children.length) clearInterval(type)
      }, 28)
      return () => clearInterval(type)
    }, delay)
    return () => clearTimeout(show)
  }, [children, delay])

  if (!visible) return null
  return (
    <div style={{ fontFamily: '"Courier New", monospace', fontSize: 12, color: '#4a8a4a', letterSpacing: '0.1em', lineHeight: 2 }}>
      {text}
      {text.length < children.length && <span style={{ animation: 'blink 0.8s step-end infinite' }}>▌</span>}
    </div>
  )
}

export function NotFoundPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [seconds, setSeconds] = useState(10)

  useEffect(() => {
    if (seconds <= 0) { navigate('/login'); return }
    const t = setInterval(() => setSeconds(s => s - 1), 1000)
    return () => clearInterval(t)
  }, [seconds, navigate])

  return (
    <div style={{ minHeight: '100svh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>

      <MatrixRain />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, maxWidth: 640, width: '100%' }}>

        {/* 404 glitch */}
        <GlitchText text="404" />

        {/* Title */}
        <div style={{ marginTop: 8, marginBottom: 32, textAlign: 'center' }}>
          <p style={{ fontFamily: '"Courier New", monospace', color: '#22c55e', fontSize: 18, fontWeight: 700, letterSpacing: '0.3em', margin: '0 0 8px' }}>
            RUTA NO ENCONTRADA
          </p>
          <p style={{ fontFamily: '"Courier New", monospace', color: '#2a5a2a', fontSize: 11, letterSpacing: '0.2em', margin: 0 }}>
            ACCESS DENIED — SECTOR INEXISTENTE
          </p>
        </div>

        {/* Terminal block */}
        <div style={{ width: '100%', border: '1px solid #1a3a1a', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(6px)', marginBottom: 32 }}>
          {/* Terminal header */}
          <div style={{ background: '#0a1a0a', padding: '6px 12px', borderBottom: '1px solid #1a3a1a', display: 'flex', alignItems: 'center', gap: 6 }}>
            {['#ef4444', '#eab308', '#22c55e'].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ fontFamily: '"Courier New", monospace', color: '#2a5a2a', fontSize: 10, marginLeft: 8, letterSpacing: '0.15em' }}>bash — arrowhead-ctf</span>
          </div>
          {/* Terminal body */}
          <div style={{ padding: '16px 18px' }}>
            <TerminalLine delay={0}>{'   $ ping ' + location.pathname}</TerminalLine>
            <TerminalLine delay={600}>{'   > FATAL: ruta no existe en la red CTF'}</TerminalLine>
            <TerminalLine delay={1300}>{'  $ traceroute ' + location.pathname}</TerminalLine>
            <TerminalLine delay={2000}>{'  > Destino inalcanzable — TTL expirado'}</TerminalLine>
            <TerminalLine delay={2800}>{'  $ whoami'}</TerminalLine>
            <TerminalLine delay={3400}>{'  > Intruso detectado. Redirigiendo en ' + seconds + 's...'}</TerminalLine>
          </div>
        </div>

        {/* Countdown bar */}
        <div style={{ width: '100%', marginBottom: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontFamily: '"Courier New", monospace', color: '#2a5a2a', fontSize: 9, letterSpacing: '0.15em' }}>REDIRIGIENDO AUTOMÁTICAMENTE</span>
            <span style={{ fontFamily: '"Courier New", monospace', color: '#22c55e', fontSize: 9, fontWeight: 700 }}>{seconds}s</span>
          </div>
          <div style={{ height: 3, background: '#0d1e0d', borderRadius: 2 }}>
            <div style={{ height: '100%', width: `${(seconds / 10) * 100}%`, background: seconds <= 3 ? '#ef4444' : '#22c55e', borderRadius: 2, transition: 'width 1s linear, background 0.3s' }} />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/login')}
            style={{ background: '#0a2a0a', border: '1px solid #22c55e', color: '#22c55e', padding: '10px 28px', fontFamily: '"Courier New", monospace', fontSize: 11, letterSpacing: '0.2em', cursor: 'pointer', fontWeight: 700, transition: 'all 0.2s' }}
          >
            → INICIO
          </button>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'transparent', border: '1px solid #1a3a1a', color: '#4a8a4a', padding: '10px 28px', fontFamily: '"Courier New", monospace', fontSize: 11, letterSpacing: '0.2em', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            ← VOLVER
          </button>
        </div>

      </div>
    </div>
  )
}
