import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoU from '../../../assets/LogoU.png'
import { TriviaHUD } from '../../trivia/components/TriviaHUD'

const C       = '#00e5ff'
const C_DIM   = 'rgba(0,229,255,0.45)'
const C_BG    = 'rgba(0,229,255,0.06)'
const C_BORDER = 'rgba(0,229,255,0.2)'

const TERMINAL_LINES = [
  { cmd: 'whoami',                    out: ['agent_01'] },
  { cmd: 'cat /etc/firewall.conf',    out: ['[firewall]', 'allow_ports=22,80,443', 'deny_all=true'] },
  { cmd: 'ssh root@192.168.1.1',      out: ['Permission denied (publickey).'] },
  { cmd: 'nmap -sV 192.168.1.1',      out: ['PORT    STATE SERVICE', '22/tcp  open  ssh   OpenSSH 8.9', '80/tcp  open  http  nginx 1.22', '443/tcp open  https nginx 1.22'] },
  { cmd: 'python3 exploit.py --dry',  out: ['[*] Connecting to target...', '[*] Testing auth endpoint...', '[!] Vulnerability detected in authenticate()'] },
]

interface CodeLine { num: number; text: string; vulnerable?: boolean; comment?: boolean }

const CODE_LINES: CodeLine[] = [
  { num: 1,  text: 'import socket' },
  { num: 2,  text: 'import hashlib' },
  { num: 3,  text: '' },
  { num: 4,  text: 'def authenticate(user, password):' },
  { num: 5,  text: '    stored = db.get_hash(user)' },
  { num: 6,  text: '    # MD5 — weak algorithm', comment: true },
  { num: 7,  text: '    if hashlib.md5(password.encode()).hexdigest() == stored:', vulnerable: true },
  { num: 8,  text: '        return True' },
  { num: 9,  text: '    return False' },
  { num: 10, text: '' },
  { num: 11, text: 'def connect(host, port=22):' },
  { num: 12, text: '    s = socket.socket()' },
  { num: 13, text: "    s.connect((host, port))" },
  { num: 14, text: '    return s' },
]

const STEPS = [
  'Analiza los registros del firewall',
  'Identifica el vector de ataque en el código',
  'Ejecuta el exploit en el entorno seguro',
  'Documenta la vulnerabilidad encontrada',
  'Propón el parche de seguridad',
]

const PROGRESS = 15

function Corners() {
  return (
    <>
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l" style={{ borderColor: C }} />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r" style={{ borderColor: C }} />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l" style={{ borderColor: C }} />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r" style={{ borderColor: C }} />
    </>
  )
}

function PanelHeader({ label, badge }: { label: string; badge?: React.ReactNode }) {
  return (
    <div
      style={{
        borderBottom: `1px solid ${C_BORDER}`,
        padding: '8px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        background: C_BG,
        flexShrink: 0,
      }}
    >
      <span style={{ color: C, fontSize: '9px', letterSpacing: '0.2em', fontWeight: 700 }}>
        ▶ {label}
      </span>
      {badge && <span style={{ marginLeft: 'auto' }}>{badge}</span>}
    </div>
  )
}

export function AtaqueDefensaPage() {
  const navigate = useNavigate()
  const [secs, setSecs] = useState(45 * 60)

  useEffect(() => {
    const id = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div
      className="font-mono"
      style={{ height: '100vh', background: '#020608', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
    >
      <TriviaHUD
        title="DEFENSA Y ATAQUE ACTIVA"
        level="DESAFÍO"
        initialSeconds={secs}
        onBack={() => navigate('/challenges')}
      />

      {/* ── Contenido principal ── */}
      <div style={{ flex: 1, display: 'flex', gap: '12px', padding: '12px', minHeight: 0, overflow: 'hidden' }}>

        {/* ── Columna izquierda ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', minWidth: 0, overflow: 'hidden' }}>

          {/* Terminal */}
          <div
            className="relative"
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.85)',
              border: `1px solid ${C_BORDER}`,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', minHeight: 0,
            }}
          >
            <Corners />
            <PanelHeader
              label="TERMINAL — SSH SESSION"
              badge={
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
              }
            />
            <div style={{ padding: '12px 16px', fontSize: '11px', lineHeight: 1.9, overflowY: 'auto', flex: 1 }}>
              {TERMINAL_LINES.map((line, i) => (
                <div key={i} style={{ marginBottom: '4px' }}>
                  <div>
                    <span style={{ color: C }}>$ </span>
                    <span style={{ color: '#e2e8f0' }}>{line.cmd}</span>
                  </div>
                  {line.out.map((o, j) => (
                    <div key={j} style={{ color: '#4b5563', paddingLeft: '12px' }}>{o}</div>
                  ))}
                </div>
              ))}
              <div>
                <span style={{ color: C }}>$ </span>
                <span className="animate-pulse" style={{ color: C }}>█</span>
              </div>
            </div>
          </div>

          {/* Editor de código */}
          <div
            className="relative"
            style={{
              flex: 1,
              background: '#080c14',
              border: `1px solid ${C_BORDER}`,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', minHeight: 0,
            }}
          >
            <Corners />
            <PanelHeader
              label="EDITOR — exploit.py"
              badge={
                <span style={{ color: '#f97316', fontSize: '9px', letterSpacing: '0.1em' }}>
                  ⚠ VULNERABILIDAD DETECTADA
                </span>
              }
            />
            <div style={{ padding: '8px 0', fontSize: '11px', lineHeight: 1.9, overflowY: 'auto', flex: 1 }}>
              {CODE_LINES.map(line => (
                <div
                  key={line.num}
                  style={{
                    display: 'flex',
                    padding: '0 12px',
                    background: line.vulnerable ? 'rgba(249,115,22,0.07)' : 'transparent',
                  }}
                >
                  <span style={{ color: '#374151', width: '28px', textAlign: 'right', marginRight: '16px', userSelect: 'none', flexShrink: 0 }}>
                    {line.num}
                  </span>
                  <span
                    style={{
                      whiteSpace: 'pre',
                      color: line.vulnerable ? '#fb923c' : line.comment ? '#6b7280' : '#93c5fd',
                      boxShadow: line.vulnerable ? '0 0 0 1px rgba(249,115,22,0.45), 0 0 14px rgba(249,115,22,0.18)' : 'none',
                      borderRadius: line.vulnerable ? '3px' : '0',
                      padding: line.vulnerable ? '0 4px' : '0',
                    }}
                  >
                    {line.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Columna derecha ── */}
        <div style={{ width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>

          {/* Imagen hacker + logo */}
          <div
            className="relative"
            style={{
              height: '180px',
              background: 'linear-gradient(160deg, #060d1a 0%, #020608 100%)',
              border: `1px solid ${C_BORDER}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', flexShrink: 0,
            }}
          >
            <Corners />
            <img
              src="https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/hacker2.gif"
              alt="Hacker"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                filter: `drop-shadow(0 0 12px ${C})`,
                opacity: 0.9,
              }}
            />
            <img
              src={logoU}
              alt="Icesi"
              style={{
                position: 'absolute', bottom: 10, right: 10,
                width: '42px',
                filter: 'sepia(1) saturate(6) hue-rotate(160deg) brightness(1.2)',
              }}
            />
          </div>

          {/* Panel de instrucciones */}
          <div
            className="relative"
            style={{
              flex: 1,
              background: 'rgba(0,0,0,0.8)',
              border: `1px solid ${C_BORDER}`,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden', minHeight: 0,
            }}
          >
            <Corners />
            <PanelHeader label="MISIÓN" />
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto' }}>

              <p style={{ color: '#e2e8f0', fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em', marginBottom: '4px' }}>
                Infiltrate the Firewall
              </p>
              <p style={{ color: '#6b7280', fontSize: '10px', lineHeight: 1.6, marginBottom: '14px' }}>
                Analiza el código vulnerable, explota la debilidad en el sistema de autenticación y accede al panel de administración.
              </p>

              <p style={{ color: C_DIM, fontSize: '9px', letterSpacing: '0.15em', marginBottom: '8px' }}>PASOS:</p>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                {STEPS.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '8px',
                      padding: '7px 0',
                      borderBottom: `1px solid ${C_BORDER}`,
                      color: i === 1 ? C : '#4b5563',
                      fontSize: '10px',
                    }}
                  >
                    <span style={{ color: i === 1 ? C : '#374151', fontWeight: 700, flexShrink: 0 }}>
                      {String(i + 1).padStart(2, '0')}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              {/* Barra de progreso */}
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: C_DIM, fontSize: '9px', letterSpacing: '0.15em' }}>PROGRESO</span>
                  <span style={{ color: C, fontSize: '9px', fontWeight: 700 }}>{PROGRESS}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(0,229,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${PROGRESS}%`, height: '100%', background: C, boxShadow: `0 0 8px ${C}` }} />
                </div>
              </div>

              {/* Botón */}
              <button
                style={{
                  marginTop: '14px', width: '100%', padding: '10px',
                  background: 'transparent',
                  border: `1px solid ${C}`,
                  color: C,
                  fontFamily: 'inherit', fontSize: '10px',
                  fontWeight: 700, letterSpacing: '0.2em',
                  textTransform: 'uppercase', cursor: 'pointer',
                  transition: 'background 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = C_BG
                  e.currentTarget.style.boxShadow = `0 0 12px rgba(0,229,255,0.25)`
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                ▶ Siguiente Paso
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
