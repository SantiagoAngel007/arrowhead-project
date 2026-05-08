import { useState, useEffect } from 'react'
import Header from './Header'
import ScanlineOverlay from './ScanlineOverlay'
import KnowledgeSection from './KnowledgeSection'
import ConsoleSection from './ConsoleSection'
import ThreatAwarenessSection from './ThreatAwarenessSection'

function useSessionTimer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function InfoResourceHub() {
  const sessionTime = useSessionTimer()

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'radial-gradient(ellipse at 20% 60%, #001a0d 0%, #000d07 45%, #000000 100%)',
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
      }}
    >
      {/* Ambient effects */}
      <ScanlineOverlay />

      {/* Page layout */}
      <div className="relative z-10 flex flex-col h-screen">
        <Header sessionTime={sessionTime} />

        {/* Sub-header bar */}
        <div
          className="flex items-center justify-between px-6 py-1.5 border-b relative z-10"
          style={{
            borderColor: 'rgba(0,255,136,0.15)',
            background: 'rgba(0,255,136,0.03)',
          }}
        >
          <div className="text-[15px] tracking-[0.2em]" style={{ color: 'rgba(0,255,136,0.4)' }}>
            PLATAFORMA:{' '}
            <span style={{ color: 'rgba(0,255,136,0.75)' }}>Universidad Icesi</span>
          </div>

          {/* Status indicators */}
          <div className="flex items-center gap-4">
            {[
              { label: 'SISTEMA', status: 'ACTIVO', color: '#00ff88' },
              { label: 'RED', status: 'SEGURA', color: '#00ccff' },
              { label: 'NIVEL', status: 'PRINCIPIANTE', color: '#ffcc00' },
            ].map(({ label, status, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
                  style={{ background: color, boxShadow: `0 0 5px ${color}` }}
                />
                <span className="text-[15px] tracking-widest" style={{ color: 'rgba(180,240,210,0.4)' }}>
                  {label}:{' '}
                </span>
                <span className="text-[15px] tracking-widest font-bold" style={{ color }}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main 3-column grid */}
        <div
          className="flex-1 grid grid-cols-3 divide-x overflow-hidden"
          style={{ divideColor: 'rgba(0,255,136,0.12)' }}
        >
          {/* Column dividers via border */}
          <div
            className="p-5 overflow-y-auto"
            style={{ borderRight: '1px solid rgba(0,255,136,0.12)' }}
          >
            <KnowledgeSection />
          </div>

          <div
            className="p-5 overflow-y-auto"
            style={{ borderRight: '1px solid rgba(0,255,136,0.12)' }}
          >
            <ConsoleSection />
          </div>

          <div className="p-5 overflow-y-auto">
            <ThreatAwarenessSection />
          </div>
        </div>
      </div>
    </div>
  )
}
