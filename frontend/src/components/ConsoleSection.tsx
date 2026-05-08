import { useState } from 'react'
import SectionTitle from './SectionTitle'
import { consoleCommands } from './data'

interface TerminalLine {
  text: string
  type: 'input' | 'output' | 'comment'
}

const demoLines: TerminalLine[] = [
  { text: '# Buscar contraseñas hardcodeadas en el código', type: 'comment' },
  { text: '$ grep -r "password" ./src/', type: 'input' },
  { text: './src/auth.py:12:  password = "admin123"  ← VULNERABILIDAD', type: 'output' },
  { text: './src/db.py:5:    db_pass = "root1234"    ← VULNERABILIDAD', type: 'output' },
  { text: '# ¡Encontradas! Deben ir en variables de entorno', type: 'comment' },
]

export default function ConsoleSection() {
  const [activeCmd, setActiveCmd] = useState<number | null>(null)
  const [typedLines, setTypedLines] = useState<TerminalLine[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const runDemo = () => {
    if (isRunning) return
    setIsRunning(true)
    setTypedLines([])
    demoLines.forEach((line, i) => {
      setTimeout(() => {
        setTypedLines((prev) => [...prev, line])
        if (i === demoLines.length - 1) setIsRunning(false)
      }, i * 600)
    })
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      <SectionTitle>GUÍA DE CONSOLA Y TERMINAL</SectionTitle>

      {/* Command reference table */}
      <div
        className="border rounded overflow-hidden"
        style={{ borderColor: 'rgba(0,255,136,0.18)' }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-3 border-b"
          style={{
            background: 'rgba(0,255,136,0.07)',
            borderColor: 'rgba(0,255,136,0.18)',
          }}
        >
          {['COMANDO', 'FUNCIÓN', 'EJEMPLO'].map((h) => (
            <div
              key={h}
              className="px-3 py-1.5 text-[15px] font-bold tracking-[0.18em] font-orbitron"
              style={{ color: 'rgba(0,255,136,0.6)' }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Table rows */}
        {consoleCommands.map((cmd, i) => (
          <div
            key={i}
            className="grid grid-cols-3 border-b cursor-pointer transition-all duration-150 group"
            style={{
              borderColor: 'rgba(0,255,136,0.08)',
              background: activeCmd === i ? 'rgba(0,255,136,0.06)' : 'transparent',
            }}
            onMouseEnter={() => setActiveCmd(i)}
            onMouseLeave={() => setActiveCmd(null)}
          >
            <div
              className="px-3 py-2 text-xs font-bold transition-colors"
              style={{ color: activeCmd === i ? '#00ff88' : 'rgba(0,255,136,0.75)' }}
            >
              {cmd.command}
            </div>
            <div className="px-3 py-2 text-[15px]" style={{ color: 'rgba(180,240,210,0.6)' }}>
              {cmd.function}
            </div>
            <div className="px-3 py-2 text-[15px] font-mono" style={{ color: 'rgba(0,204,255,0.55)' }}>
              {cmd.usage}
            </div>
          </div>
        ))}
      </div>

      {/* Anatomy diagram */}
      <div
        className="border rounded p-3"
        style={{ borderColor: 'rgba(0,255,136,0.15)', background: 'rgba(0,0,0,0.35)' }}
      >
        <div
          className="text-[15px] uppercase mb-2"
          style={{ color: 'rgba(0,255,136,0.4)' }}
        >
          Anatomía de un comando:
        </div>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs mb-2">
          <span style={{ color: 'rgba(0,255,136,0.5)' }}>$</span>
          {[
            { label: 'root@server', color: '#00ff88' },
            { label: 'grep', color: '#ffffff' },
            { label: '-r', color: '#ffcc00' },
            { label: '"password"', color: '#00ccff' },
            { label: './src/', color: '#aaffcc' },
          ].map(({ label, color }, i) => (
            <span
              key={i}
              className="px-1.5 py-0.5 rounded text-[15px]"
              style={{
                color,
                background: `${color}14`,
                border: `1px solid ${color}30`,
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-[15px]">
          {[
            { label: 'Prompt', color: '#00ff88' },
            { label: 'Comando', color: '#ffffff' },
            { label: 'Opción / Flag', color: '#ffcc00' },
            { label: 'Argumento', color: '#00ccff' },
            { label: 'Destino', color: '#aaffcc' },
          ].map(({ label, color }) => (
            <span key={label} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: color }} />
              <span style={{ color: 'rgba(180,240,210,0.55)' }}>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Live demo terminal */}
      <div
        className="border rounded overflow-hidden flex-1 flex flex-col"
        style={{ borderColor: 'rgba(0,255,136,0.18)' }}
      >
        {/* Terminal bar */}
        <div
          className="flex items-center justify-between px-3 py-1.5 border-b"
          style={{
            background: 'rgba(0,255,136,0.07)',
            borderColor: 'rgba(0,255,136,0.15)',
          }}
        >
          <div className="flex gap-1.5">
            {['#ff4757', '#ffcc00', '#00ff88'].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.7 }} />
            ))}
          </div>
          <span className="text-[15px] tracking-widest" style={{ color: 'rgba(0,255,136,0.4)' }}>
            TERMINAL — bash
          </span>
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="text-[15px] px-2 py-0.5 rounded border tracking-widest transition-all duration-150 hover:scale-105 disabled:opacity-40"
            style={{
              borderColor: isRunning ? 'rgba(0,255,136,0.3)' : '#00ff88',
              color: isRunning ? 'rgba(0,255,136,0.4)' : '#00ff88',
            }}
          >
            {isRunning ? 'EJECUTANDO...' : '▶ DEMO'}
          </button>
        </div>

        {/* Terminal output */}
        <div className="flex-1 p-3 font-mono text-[15px] min-h-[80px]" style={{ background: '#000' }}>
          {typedLines.length === 0 && !isRunning && (
            <span style={{ color: 'rgba(0,255,136,0.25)' }}>
              Haz clic en ▶ DEMO para ver un ejemplo real...
            </span>
          )}
          {typedLines.map((line, i) => (
            <div key={i} className="animate-fade-in">
              {line.type === 'comment' && (
                <span style={{ color: 'rgba(0,255,136,0.35)' }}>{line.text}</span>
              )}
              {line.type === 'input' && (
                <span style={{ color: '#00ff88' }}>{line.text}</span>
              )}
              {line.type === 'output' && (
                <span style={{ color: '#ff4757' }}>{line.text}</span>
              )}
            </div>
          ))}
          {isRunning && (
            <span className="animate-blink" style={{ color: '#00ff88' }}>
              █
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
