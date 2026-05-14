import { useState, useEffect } from 'react'

// --- Data ---

const knowledgeCards = [
  { id: 1, title: 'Entendiendo el Cifrado', level: 'Basico',     icon: '🔒', color: '#22c55e',
    detail: 'El cifrado convierte datos legibles en ilegibles usando algoritmos matematicos. Solo quien tenga la clave puede descifrarlos.' },
  { id: 2, title: 'Ataques de Red Comunes', level: 'Intermedio', icon: '⚠️', color: '#eab308',
    detail: 'Los ataques de red incluyen Man-in-the-Middle, sniffing de paquetes y ataques de denegacion de servicio (DoS/DDoS).' },
  { id: 3, title: 'Analisis de Codigo',     level: 'Avanzado',   icon: '🔍', color: '#f97316',
    detail: 'El analisis estatico y dinamico de codigo permite identificar vulnerabilidades antes de que sean explotadas.' },
  { id: 4, title: 'Analisis de Malware',    level: 'Avanzado',   icon: '🦠', color: '#ef4444',
    detail: 'El malware incluye virus, troyanos, ransomware y spyware. Su analisis requiere entornos aislados (sandboxes).' },
]

const commands = [
  { cmd: 'ls',   fn: 'Lista archivos del directorio actual',  ex: 'ls -la' },
  { cmd: 'cd',   fn: 'Cambia de directorio',                  ex: 'cd ~/documentos' },
  { cmd: 'cat',  fn: 'Muestra el contenido de un archivo',    ex: 'cat config.txt' },
  { cmd: 'grep', fn: 'Busca texto dentro de archivos',        ex: 'grep -r "password"' },
  { cmd: 'ssh',  fn: 'Conexion remota segura a otro equipo',  ex: 'ssh user@host' },
  { cmd: 'file', fn: 'Identifica el tipo real de un archivo', ex: 'file archivo.exe' },
]

const threatCards = [
  { id: 1, icon: '🛡️', title: 'Contrasenas Seguras',
    tip: 'Una contrasena fuerte mezcla letras mayusculas, minusculas, numeros y simbolos especiales.' },
  { id: 2, icon: '📡', title: 'Redes Seguras',
    tip: 'Evita conectarte a redes Wi-Fi publicas sin proteccion. Tu trafico puede ser interceptado.' },
  { id: 3, icon: '🎣', title: 'Detectar Phishing',
    tip: 'Los atacantes crean correos y paginas falsas para robarte datos personales o bancarios.' },
  { id: 4, icon: '🔄', title: 'Actualizaciones',
    tip: 'Los parches de seguridad corrigen vulnerabilidades conocidas en tu sistema operativo y apps.' },
]

const terminalDemos: Record<number, Array<string>> = {
  0: ['$ ls -la', 'total 48', 'drwxr-xr-x  2 user user 4096 May 13 10:00 .', '-rw-r--r--  1 user user 3526 May 13 09:00 .bashrc', '-rwxr-xr-x  1 user user 8192 May 13 10:00 secret_file'],
  1: ['$ cd ~/documentos', '$ pwd', '/home/user/documentos', '$ ls', 'notas.txt  proyectos  imagenes'],
  2: ['$ cat config.txt', '[database]', 'host = localhost', 'port = 5432', '# WARNING: do not share this file'],
  3: ['$ grep -r "password" ./src', './src/config.py:password = "s3cr3t"', './src/auth.py:if input == password:'],
  4: ['$ ssh user@192.168.1.1', 'The authenticity of host cannot be established.', 'Are you sure you want to continue? (yes/no): yes', 'Welcome to Ubuntu 22.04 LTS'],
  5: ['$ file archivo.exe', 'archivo.exe: PE32 executable (GUI) Intel 80386', 'for MS Windows - possible malware detected'],
}

// --- Component ---

export function InfoPage() {
  const [elapsed, setElapsed] = useState(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [threatPage, setThreatPage] = useState(0)
  const [demoIndex, setDemoIndex] = useState<number | null>(null)
  const [terminalLines, setTerminalLines] = useState<Array<string>>([])

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2, '0')}:${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  const runDemo = (idx: number) => {
    setDemoIndex(idx)
    setTerminalLines([])
    const lines = terminalDemos[idx] ?? []
    lines.forEach((line, i) => {
      setTimeout(() => setTerminalLines(prev => [...prev, line]), i * 180)
    })
  }

  const visibleThreats = threatCards.slice(threatPage * 2, threatPage * 2 + 2)

  return (
    <div style={{ fontFamily: '"Courier New", Consolas, monospace', color: '#c8e8c8', minHeight: '100vh', position: 'relative', isolation: 'isolate' }}>

      {/* GIF de fondo */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, backgroundImage: "url('https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/info2.gif')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(2,8,2,0.82)' }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a3a1a', background: '#030803', padding: '4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10 }}>
        <div>
          <span style={{ color: '#4a8a4a', letterSpacing: '0.15em' }}>CHALLENGE TITLE </span>
          <span style={{ color: '#22c55e', fontWeight: 700, letterSpacing: '0.1em' }}>CYBERDEFENDER QUEST</span>
        </div>
        <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, letterSpacing: '0.2em' }}>CYBERDEFENDER QUEST</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <span style={{ color: '#4a8a4a', letterSpacing: '0.12em' }}>SESSION TIME </span>
            <span style={{ color: '#22c55e', fontWeight: 700 }}>{fmt(elapsed)}</span>
          </div>
          <div style={{ background: '#22c55e', color: '#030803', fontWeight: 700, padding: '2px 8px', fontSize: 10, letterSpacing: '0.12em' }}>ICESI</div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ borderBottom: '1px solid #1a3a1a', background: '#040a04', padding: '4px 16px', display: 'flex', justifyContent: 'space-between', fontSize: 10 }}>
        <span><span style={{ color: '#4a8a4a' }}>PLATAFORMA: </span><span style={{ color: '#22c55e' }}>Universidad Icesi</span></span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span><span style={{ color: '#22c55e' }}>*</span><span style={{ color: '#4a8a4a' }}> SISTEMA: </span><span style={{ color: '#22c55e' }}>ACTIVO</span></span>
          <span><span style={{ color: '#22c55e' }}>*</span><span style={{ color: '#4a8a4a' }}> RED: </span><span style={{ color: '#22c55e' }}>SEGURA</span></span>
          <span><span style={{ color: '#22c55e' }}>*</span><span style={{ color: '#4a8a4a' }}> NIVEL: </span><span style={{ color: '#22c55e' }}>PRINCIPIANTE</span></span>
        </div>
      </div>

      {/* Three columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', minHeight: 'calc(100vh - 72px)' }}>

        {/* LEFT: Knowledge cards */}
        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
            Fundamentos de Ciberseguridad
          </h2>
          <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
            Tarjetas de conocimiento interactivo:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {knowledgeCards.map((card, i) => (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px',
                  border: `1px solid ${hoveredCard === card.id ? card.color : '#1a3a1a'}`,
                  background: hoveredCard === card.id ? 'rgba(34,197,94,0.05)' : 'transparent',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}
              >
                <span style={{ color: '#4a8a4a', fontSize: 10, minWidth: 14 }}>{i + 1}.</span>
                <span style={{ fontSize: 14 }}>{card.icon}</span>
                <div>
                  <div style={{ color: '#c8e8c8', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {card.title}
                  </div>
                  <div style={{ color: card.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', marginTop: 2 }}>
                    [{card.level.toUpperCase()}]
                  </div>
                  {hoveredCard === card.id && (
                    <div style={{ color: '#6aaa6a', fontSize: 9, marginTop: 6, lineHeight: 1.6, maxWidth: 260 }}>
                      {card.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', paddingTop: 24, color: '#2a5a2a', fontSize: 9, letterSpacing: '0.1em' }}>
            Pasa el cursor sobre una tarjeta para ver detalles
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: '#1a3a1a' }} />

        {/* CENTER: Command guide */}
        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Guia de Consola y Terminal
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #1a3a1a' }}>
                {['Comando', 'Funcion', 'Ejemplo'].map(h => (
                  <th key={h} style={{ color: '#22c55e', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', fontSize: 9 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {commands.map((c, i) => (
                <tr
                  key={c.cmd}
                  onClick={() => runDemo(i)}
                  style={{ borderBottom: '1px solid #0d1e0d', cursor: 'pointer', background: demoIndex === i ? 'rgba(34,197,94,0.06)' : 'transparent', transition: 'background 0.15s' }}
                >
                  <td style={{ padding: '5px 8px', color: '#22c55e', fontWeight: 700 }}>{c.cmd}</td>
                  <td style={{ padding: '5px 8px', color: '#8aaa8a', lineHeight: 1.4 }}>{c.fn}</td>
                  <td style={{ padding: '5px 8px', color: '#22c55e', opacity: 0.7 }}>{c.ex}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Anatomy */}
          <div>
            <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Anatomia de un comando:</p>
            <div style={{ background: '#030803', border: '1px solid #1a3a1a', padding: '8px 12px', fontSize: 11, display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#22c55e', fontWeight: 700 }}>$</span>
              {[
                { text: 'root@server', color: '#22c55e', bg: '#0a1e0a' },
                { text: 'grep',       color: '#22c55e', bg: '#0f2a0f' },
                { text: '-i',         color: '#eab308', bg: '#1a1500' },
                { text: '"password"', color: '#f97316', bg: '#1a0d00' },
                { text: './src/',     color: '#60a5fa', bg: '#000d1a' },
              ].map(t => (
                <span key={t.text} style={{ background: t.bg, color: t.color, padding: '1px 5px', borderRadius: 2, fontWeight: 600 }}>{t.text}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 9 }}>
              {[['Prompt','#22c55e'],['Comando','#22c55e'],['Opcion / Flag','#eab308'],['Argumento','#f97316'],['Destino','#60a5fa']].map(([label, color]) => (
                <span key={label}><span style={{ color: color as string }}>*</span> <span style={{ color: '#4a8a4a' }}>{label}</span></span>
              ))}
            </div>
          </div>

          {/* Terminal */}
          <div style={{ border: '1px solid #1a3a1a', flex: 1 }}>
            <div style={{ background: '#0a1a0a', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1a3a1a' }}>
              <div style={{ display: 'flex', gap: 5 }}>
                {['#ef4444','#eab308','#22c55e'].map(c => (
                  <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              <span style={{ color: '#4a8a4a', fontSize: 10, letterSpacing: '0.15em' }}>TERMINAL - bash</span>
              <button
                onClick={() => { if (demoIndex !== null) runDemo(demoIndex) }}
                style={{ background: '#0a2a0a', border: '1px solid #22c55e', color: '#22c55e', padding: '2px 10px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
              >
                &gt; DEMO
              </button>
            </div>
            <div style={{ background: '#020702', padding: '10px 12px', minHeight: 80, fontSize: 10, lineHeight: 1.8 }}>
              {terminalLines.length === 0
                ? <span style={{ color: '#1a4a1a' }}>Haz clic en un comando para ver un ejemplo real...</span>
                : terminalLines.map((line, i) => (
                  <div key={i} style={{ color: line.startsWith('$') ? '#22c55e' : '#6aaa6a' }}>{line}</div>
                ))
              }
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: '#1a3a1a' }} />

        {/* RIGHT: Threat awareness */}
        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h2 style={{ color: '#22c55e', fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Conciencia de Amenazas
          </h2>
          <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Haz clic en una tarjeta para ver el consejo practico:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {visibleThreats.map(card => (
              <ThreatCard key={card.id} card={card} />
            ))}
          </div>

          {/* Sabias que */}
          <div style={{ border: '1px solid #1a3a1a', padding: '12px', background: '#030803', marginTop: 4 }}>
            <div style={{ color: '#eab308', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>
              SABIAS QUE...
            </div>
            <p style={{ color: '#6aaa6a', fontSize: 10, lineHeight: 1.7 }}>
              Haz copias de seguridad de tus archivos importantes regularmente.
            </p>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #1a3a1a' }}>
            <button
              onClick={() => setThreatPage(p => Math.max(0, p - 1))}
              disabled={threatPage === 0}
              style={{ background: 'transparent', border: '1px solid #1a3a1a', color: threatPage === 0 ? '#1a3a1a' : '#4a8a4a', padding: '3px 10px', fontSize: 9, cursor: threatPage === 0 ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
            >
              &lt; Anterior
            </button>
            <div style={{ display: 'flex', gap: 6 }}>
              {[0, 1].map(i => (
                <div
                  key={i}
                  onClick={() => setThreatPage(i)}
                  style={{ width: 8, height: 8, borderRadius: '50%', background: i === threatPage ? '#22c55e' : '#1a3a1a', cursor: 'pointer' }}
                />
              ))}
            </div>
            <button
              onClick={() => setThreatPage(p => Math.min(1, p + 1))}
              disabled={threatPage === 1}
              style={{ background: 'transparent', border: '1px solid #1a3a1a', color: threatPage === 1 ? '#1a3a1a' : '#4a8a4a', padding: '3px 10px', fontSize: 9, cursor: threatPage === 1 ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
            >
              Siguiente &gt;
            </button>
          </div>
        </div>

      </div>

      {/* Footer */}
      <div style={{ borderTop: '1px solid #1a3a1a', background: '#030803', padding: '4px 16px', textAlign: 'center', fontSize: 9, color: '#2a5a2a', letterSpacing: '0.15em' }}>
        La ciberseguridad es responsabilidad de todos
      </div>

    </div>
  )
}

// --- ThreatCard ---

interface ThreatCardData {
  id: number
  icon: string
  title: string
  tip: string
}

function ThreatCard({ card }: { card: ThreatCardData }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        border: `1px solid ${open ? '#22c55e' : '#1a3a1a'}`,
        padding: '10px',
        cursor: 'pointer',
        background: open ? 'rgba(34,197,94,0.05)' : 'transparent',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
      <div style={{ color: '#22c55e', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: open ? 8 : 0 }}>
        {card.title}
      </div>
      {open
        ? <p style={{ color: '#6aaa6a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>{card.tip}</p>
        : <div style={{ color: '#2a5a2a', fontSize: 8, marginTop: 4, letterSpacing: '0.1em' }}>ver consejo</div>
      }
    </div>
  )
}
