import { useState, useEffect } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const knowledgeCards = [
  { id: 1, title: 'Entendiendo el Cifrado',  level: 'Basico',      icon: '🔒', color: '#22c55e',
    detail: 'El cifrado convierte datos legibles en ilegibles usando algoritmos matemáticos. Solo quien tenga la clave puede descifrarlos.' },
  { id: 2, title: 'Ataques de Red Comunes',  level: 'Intermedio',  icon: '⚠️', color: '#eab308',
    detail: 'Los ataques de red incluyen Man-in-the-Middle, sniffing de paquetes y denegación de servicio (DoS/DDoS).' },
  { id: 3, title: 'Análisis de Código',      level: 'Avanzado',    icon: '🔍', color: '#f97316',
    detail: 'El análisis estático y dinámico de código permite identificar vulnerabilidades antes de que sean explotadas.' },
  { id: 4, title: 'Análisis de Malware',     level: 'Avanzado',    icon: '🦠', color: '#ef4444',
    detail: 'El malware incluye virus, troyanos, ransomware y spyware. Su análisis requiere entornos aislados (sandboxes).' },
]

const commands = [
  { cmd: 'ls',   fn: 'Lista archivos del directorio actual', ex: 'ls -la' },
  { cmd: 'cd',   fn: 'Cambia de directorio',                 ex: 'cd ~/documentos' },
  { cmd: 'cat',  fn: 'Muestra el contenido de un archivo',   ex: 'cat config.txt' },
  { cmd: 'grep', fn: 'Busca texto dentro de archivos',       ex: 'grep -r "password"' },
  { cmd: 'ssh',  fn: 'Conexión remota segura a otro equipo', ex: 'ssh user@host' },
  { cmd: 'file', fn: 'Identifica el tipo real de un archivo',ex: 'file archivo.exe' },
]

const threatCards = [
  { id: 1, icon: '🛡️', title: 'Contraseñas Seguras',
    tip: 'Una contraseña fuerte mezcla letras mayúsculas, minúsculas, números y símbolos especiales.' },
  { id: 2, icon: '📡', title: 'Redes Seguras',
    tip: 'Evita conectarte a redes Wi-Fi públicas sin protección. Tu tráfico puede ser interceptado.' },
  { id: 3, icon: '🎣', title: 'Detectar Phishing',
    tip: 'Los atacantes crean correos y páginas falsas para robarte datos personales o bancarios.' },
  { id: 4, icon: '🔄', title: 'Actualizaciones',
    tip: 'Los parches de seguridad corrigen vulnerabilidades conocidas en tu sistema operativo y apps.' },
]

const terminalDemos: Record<number, string[]> = {
  0: ['$ ls -la','total 48','drwxr-xr-x  2 user user 4096 May 13 10:00 .','-rw-r--r--  1 user user 3526 May 13 09:00 .bashrc','-rwxr-xr-x  1 user user 8192 May 13 10:00 secret_file'],
  1: ['$ cd ~/documentos','$ pwd','/home/user/documentos','$ ls','notas.txt  proyectos  imagenes'],
  2: ['$ cat config.txt','[database]','host = localhost','port = 5432','# WARNING: do not share this file'],
  3: ['$ grep -r "password" ./src','./src/config.py:password = "s3cr3t"','./src/auth.py:if input == password:'],
  4: ['$ ssh user@192.168.1.1','The authenticity of host cannot be established.','Are you sure? (yes/no): yes','Welcome to Ubuntu 22.04 LTS'],
  5: ['$ file archivo.exe','archivo.exe: PE32 executable (GUI) Intel 80386','for MS Windows - possible malware detected'],
}

// ─── Trivia data ─────────────────────────────────────────────────────────────

const triviaCategories = [
  { icon: '🔒', label: 'Criptografía',      color: '#22c55e', desc: 'Cifrado, hashing, claves públicas y privadas' },
  { icon: '🌐', label: 'Ataques de Red',    color: '#00bcd4', desc: 'MITM, DoS, sniffing, spoofing' },
  { icon: '🦠', label: 'Malware',           color: '#ef4444', desc: 'Virus, troyanos, ransomware, spyware' },
  { icon: '🎭', label: 'Ingeniería Social', color: '#eab308', desc: 'Phishing, pretexting, baiting' },
  { icon: '🛡️', label: 'Defensa',           color: '#f97316', desc: 'Firewalls, IDS/IPS, parches, backups' },
  { icon: '🔍', label: 'Análisis Forense',  color: '#a855f7', desc: 'Evidencia digital, cadena de custodia' },
]

const practiceQuestions = [
  { q: '¿Qué significa CIA en ciberseguridad?',
    a: 'Confidencialidad, Integridad y Disponibilidad. Son los tres pilares fundamentales de la seguridad de la información.' },
  { q: '¿Qué tipo de ataque intercepta comunicaciones entre dos partes sin que lo sepan?',
    a: 'Man-in-the-Middle (MITM). El atacante se posiciona entre víctima y servidor para leer o modificar el tráfico.' },
  { q: '¿Cuál es la diferencia entre cifrado simétrico y asimétrico?',
    a: 'Simétrico usa la misma clave para cifrar y descifrar (AES). Asimétrico usa par de claves pública/privada (RSA).' },
  { q: '¿Qué es un hash y para qué se usa en seguridad?',
    a: 'Función unidireccional que convierte datos en un valor de longitud fija. Se usa para verificar integridad y almacenar contraseñas.' },
  { q: '¿Qué diferencia hay entre un virus y un gusano?',
    a: 'Un virus necesita un archivo huésped para propagarse. Un gusano se replica solo a través de la red sin intervención humana.' },
]

// ─── Wireshark data ───────────────────────────────────────────────────────────

const wiresharkConcepts = [
  { icon: '🦈', title: '¿Qué es Wireshark?', color: '#00bcd4',
    detail: 'Wireshark es un analizador de protocolos de red de código abierto. Captura el tráfico en tiempo real y te permite inspeccionar cada paquete individualmente.' },
  { icon: '📦', title: 'Captura de Paquetes', color: '#22c55e',
    detail: 'Un paquete es una unidad de datos transmitida en una red. Wireshark los captura todos en la interfaz de red seleccionada, incluso si no están destinados a tu equipo.' },
  { icon: '🔓', title: 'Texto Plano vs Cifrado', color: '#f97316',
    detail: 'Protocolos como FTP, HTTP y Telnet transmiten credenciales en texto plano. Un atacante con Wireshark puede leer usuario y contraseña directamente del tráfico capturado.' },
  { icon: '🔬', title: 'Análisis Forense', color: '#eab308',
    detail: 'Los archivos .pcap guardados con Wireshark son evidencia forense. Permiten reconstruir sesiones, detectar exfiltraciones y rastrear actividades maliciosas.' },
]

const protocols = [
  { name: 'HTTP',   port: '80',  color: '#ef4444', safe: false, desc: 'Transferencia web sin cifrado. Credenciales visibles.' },
  { name: 'HTTPS',  port: '443', color: '#22c55e', safe: true,  desc: 'HTTP sobre TLS. Tráfico cifrado y seguro.' },
  { name: 'FTP',    port: '21',  color: '#ef4444', safe: false, desc: 'Transferencia de archivos. Usuario y contraseña en texto plano.' },
  { name: 'SSH',    port: '22',  color: '#22c55e', safe: true,  desc: 'Shell remota cifrada. Reemplaza a Telnet y FTP.' },
  { name: 'DNS',    port: '53',  color: '#eab308', safe: null,  desc: 'Resolución de nombres. Puede revelar sitios visitados.' },
  { name: 'Telnet', port: '23',  color: '#ef4444', safe: false, desc: 'Acceso remoto sin cifrado. Completamente inseguro.' },
]

const wiresharkFilters = [
  { filter: 'http',                  desc: 'Solo tráfico HTTP' },
  { filter: 'ftp',                   desc: 'Captura sesiones FTP' },
  { filter: 'ip.addr == 192.168.1.1',desc: 'Tráfico de una IP específica' },
  { filter: 'tcp.port == 80',        desc: 'Puerto 80 (HTTP)' },
  { filter: 'frame contains "pass"', desc: 'Paquetes que contienen "pass"' },
  { filter: 'http.request.method == "POST"', desc: 'Formularios enviados' },
]

// ─── Ataque y Defensa data ────────────────────────────────────────────────────

const attackTypes = [
  { icon: '🐛', title: 'Buffer Overflow',    color: '#ef4444',
    detail: 'Sobreescribir memoria más allá del límite de un buffer para ejecutar código arbitrario o corromper el programa.' },
  { icon: '💉', title: 'SQL Injection',       color: '#f97316',
    detail: 'Insertar sentencias SQL maliciosas en campos de entrada para manipular bases de datos, extraer o eliminar información.' },
  { icon: '🎭', title: 'Ingeniería Social',   color: '#eab308',
    detail: 'Manipular psicológicamente a personas para que revelen información confidencial o realicen acciones peligrosas.' },
  { icon: '🔑', title: 'Fuerza Bruta',        color: '#f97316',
    detail: 'Probar sistemáticamente todas las combinaciones posibles de contraseña hasta encontrar la correcta.' },
]

const defenseStrategies = [
  { icon: '🧱', title: 'Firewall',           desc: 'Filtra el tráfico de red según reglas definidas. Primera línea de defensa perimetral.' },
  { icon: '👁️', title: 'IDS / IPS',          desc: 'Sistema de detección/prevención de intrusiones. Analiza patrones de tráfico en tiempo real.' },
  { icon: '🔐', title: 'Principio de mínimo privilegio', desc: 'Cada usuario/proceso recibe solo los permisos estrictamente necesarios para su función.' },
  { icon: '📋', title: 'Logs y Auditoría',   desc: 'Registrar toda actividad del sistema permite detectar comportamientos anómalos a posteriori.' },
  { icon: '🔄', title: 'Parches y Updates',  desc: 'Mantener el software actualizado cierra vulnerabilidades conocidas y explotadas activamente.' },
  { icon: '🧪', title: 'Sandboxing',         desc: 'Ejecutar código sospechoso en entornos aislados evita que afecte al sistema real.' },
]

const ctfTips = [
  { step: '01', tip: 'Enumera antes de atacar', detail: 'Recolecta toda la información posible: puertos abiertos, servicios, versiones. Herramientas: nmap, netcat.' },
  { step: '02', tip: 'Lee el código fuente',     detail: 'En retos web, el código fuente del cliente puede revelar rutas ocultas, comentarios con pistas o credenciales.' },
  { step: '03', tip: 'Prueba credenciales débiles', detail: 'admin/admin, root/root, guest/guest. Muchos retos usan contraseñas por defecto deliberadamente.' },
  { step: '04', tip: 'Decodifica todo',           detail: 'Base64, hex, ROT13, URL encoding. Si ves texto raro, prueba decodificarlo con CyberChef.' },
]

// ─── Main component ───────────────────────────────────────────────────────────

type Tab = 'intro' | 'wireshark' | 'defensa'

const TABS: { id: Tab; label: string; sublabel: string; color: string }[] = [
  { id: 'intro',     label: 'INTRODUCCIÓN',      sublabel: 'Fundamentos CTF',       color: '#22c55e' },
  { id: 'wireshark', label: 'WIRESHARK',          sublabel: 'Análisis de Tráfico',   color: '#00bcd4' },
  { id: 'defensa',   label: 'ATAQUE & DEFENSA',   sublabel: 'Seguridad Activa',      color: '#f97316' },
]

export function InfoPage() {
  const [elapsed, setElapsed] = useState(0)
  const [activeTab, setActiveTab] = useState<Tab>('intro')

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  const fmt = (s: number) =>
    `${String(Math.floor(s / 3600)).padStart(2,'0')}:${String(Math.floor((s % 3600) / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`

  const currentTab = TABS.find(t => t.id === activeTab)!

  return (
    <div style={{ fontFamily: '"Courier New", Consolas, monospace', color: '#c8e8c8', minHeight: '100vh', position: 'relative', isolation: 'isolate' }}>

      {/* GIF fondo */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -2, backgroundImage: "url('https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/info2.gif')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: -1, background: 'rgba(2,8,2,0.82)' }} />

      {/* Header */}
      <div style={{ borderBottom: '1px solid #1a3a1a', background: '#030803', padding: '4px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10 }}>
        <div>
          <span style={{ color: '#4a8a4a', letterSpacing: '0.15em' }}>MÓDULO </span>
          <span style={{ color: currentTab.color, fontWeight: 700, letterSpacing: '0.1em', transition: 'color 0.3s' }}>{currentTab.label}</span>
        </div>
        <span style={{ color: '#22c55e', fontWeight: 700, fontSize: 13, letterSpacing: '0.2em' }}>ARROWHEAD CTF</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <span style={{ color: '#4a8a4a', letterSpacing: '0.12em' }}>SESSION TIME </span>
            <span style={{ color: '#22c55e', fontWeight: 700 }}>{fmt(elapsed)}</span>
          </div>
          <div style={{ background: '#22c55e', color: '#030803', fontWeight: 700, padding: '2px 8px', fontSize: 10, letterSpacing: '0.12em' }}>ICESI</div>
        </div>
      </div>

      {/* Tab buttons */}
      <div style={{ borderBottom: `1px solid ${currentTab.color}33`, background: '#020602', padding: '0 16px', display: 'flex', gap: 0 }}>
        {TABS.map(tab => {
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: active ? `${tab.color}14` : 'transparent',
                border: 'none',
                borderBottom: active ? `2px solid ${tab.color}` : '2px solid transparent',
                borderTop: active ? `1px solid ${tab.color}44` : '1px solid transparent',
                color: active ? tab.color : '#3a6a3a',
                padding: '10px 28px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.18em',
                fontSize: 10,
                fontWeight: 700,
                transition: 'all 0.2s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
              }}
            >
              <span>{tab.label}</span>
              <span style={{ fontSize: 8, letterSpacing: '0.1em', color: active ? `${tab.color}99` : '#2a4a2a', fontWeight: 400 }}>
                {tab.sublabel}
              </span>
            </button>
          )
        })}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 16, paddingRight: 4, fontSize: 9, color: '#2a5a2a' }}>
          <span><span style={{ color: currentTab.color }}>*</span> SISTEMA: ACTIVO</span>
          <span><span style={{ color: currentTab.color }}>*</span> RED: SEGURA</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ minHeight: 'calc(100vh - 88px)' }}>
        {activeTab === 'intro'     && <IntroContent />}
        {activeTab === 'wireshark' && <WiresharkContent />}
        {activeTab === 'defensa'   && <DefensaContent />}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${currentTab.color}22`, background: '#030803', padding: '4px 16px', textAlign: 'center', fontSize: 9, color: '#2a5a2a', letterSpacing: '0.15em' }}>
        La ciberseguridad es responsabilidad de todos — Universidad Icesi
      </div>
    </div>
  )
}

// ─── Tab 1: Introducción ──────────────────────────────────────────────────────

function IntroContent() {
  const [hoveredCard, setHoveredCard]   = useState<number | null>(null)
  const [threatPage, setThreatPage]     = useState(0)
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const visibleThreats = threatCards.slice(threatPage * 2, threatPage * 2 + 2)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', minHeight: 'calc(100vh - 88px)' }}>

      {/* LEFT */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column' }}>
        <SectionTitle color="#22c55e">Fundamentos de Ciberseguridad</SectionTitle>
        <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
          Tarjetas de conocimiento interactivo:
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {knowledgeCards.map((card, i) => (
            <div
              key={card.id}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 12px', border: `1px solid ${hoveredCard === card.id ? card.color : '#1a3a1a'}`, background: hoveredCard === card.id ? 'rgba(34,197,94,0.05)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <span style={{ color: '#4a8a4a', fontSize: 10, minWidth: 14 }}>{i + 1}.</span>
              <span style={{ fontSize: 14 }}>{card.icon}</span>
              <div>
                <div style={{ color: '#c8e8c8', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{card.title}</div>
                <div style={{ color: card.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', marginTop: 2 }}>[{card.level.toUpperCase()}]</div>
                {hoveredCard === card.id && (
                  <div style={{ color: '#6aaa6a', fontSize: 9, marginTop: 6, lineHeight: 1.6, maxWidth: 260 }}>{card.detail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', paddingTop: 24, color: '#2a5a2a', fontSize: 9, letterSpacing: '0.1em' }}>
          Pasa el cursor sobre una tarjeta para ver detalles
        </div>
      </div>

      <div style={{ background: '#1a3a1a' }} />

      {/* CENTER: Guía del Cuestionario */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionTitle color="#22c55e">Guía del Cuestionario</SectionTitle>

        {/* Categorías */}
        <div>
          <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Temas que se evalúan en el reto:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
            {triviaCategories.map(cat => (
              <div key={cat.label} style={{ border: `1px solid ${cat.color}33`, padding: '8px 10px', background: `${cat.color}08` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13 }}>{cat.icon}</span>
                  <span style={{ color: cat.color, fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}>{cat.label}</span>
                </div>
                <p style={{ color: '#4a6a4a', fontSize: 8, lineHeight: 1.4, margin: 0 }}>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Preguntas de práctica */}
        <div style={{ flex: 1 }}>
          <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
            Preguntas de práctica — haz clic para ver la respuesta:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {practiceQuestions.map((pq, i) => (
              <div
                key={i}
                onClick={() => setOpenQuestion(i === openQuestion ? null : i)}
                style={{ border: `1px solid ${openQuestion === i ? '#22c55e' : '#1a3a1a'}`, padding: '9px 12px', cursor: 'pointer', background: openQuestion === i ? 'rgba(34,197,94,0.05)' : 'transparent', transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ color: '#22c55e44', fontSize: 11, fontWeight: 900, minWidth: 18, marginTop: 1 }}>?</span>
                  <span style={{ color: openQuestion === i ? '#c8e8c8' : '#6a8a6a', fontSize: 9, lineHeight: 1.5, fontWeight: openQuestion === i ? 600 : 400 }}>{pq.q}</span>
                  <span style={{ marginLeft: 'auto', color: '#2a5a2a', fontSize: 8, flexShrink: 0 }}>{openQuestion === i ? '▲' : '▼'}</span>
                </div>
                {openQuestion === i && (
                  <div style={{ marginTop: 8, padding: '7px 10px', background: 'rgba(34,197,94,0.06)', border: '1px solid #1a3a1a' }}>
                    <span style={{ color: '#22c55e', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em' }}>RESPUESTA </span>
                    <p style={{ color: '#6aaa6a', fontSize: 9, lineHeight: 1.6, margin: '4px 0 0' }}>{pq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dato clave */}
        <div style={{ border: '1px solid #1a3a1a', padding: '10px 12px', background: '#030803' }}>
          <div style={{ color: '#eab308', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 6 }}>DATO CLAVE PARA EL RETO</div>
          <p style={{ color: '#6aaa6a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>
            El cuestionario usa un mapa de nodos interactivo. Cada nodo desbloqueado es una pregunta. Estudia los 6 temas de arriba para completar todos los nodos correctamente.
          </p>
        </div>
      </div>

      <div style={{ background: '#1a3a1a' }} />

      {/* RIGHT */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionTitle color="#22c55e">Conciencia de Amenazas</SectionTitle>
        <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Haz clic en una tarjeta para ver el consejo práctico:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {visibleThreats.map(card => <ThreatCard key={card.id} card={card} />)}
        </div>
        <div style={{ border: '1px solid #1a3a1a', padding: '12px', background: '#030803', marginTop: 4 }}>
          <div style={{ color: '#eab308', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>SABÍAS QUE...</div>
          <p style={{ color: '#6aaa6a', fontSize: 10, lineHeight: 1.7 }}>Haz copias de seguridad de tus archivos importantes regularmente. El 93% de las empresas que pierden datos durante más de 10 días quiebran en el primer año.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid #1a3a1a' }}>
          <TabBtn disabled={threatPage === 0} onClick={() => setThreatPage(p => Math.max(0, p - 1))} color="#22c55e">&lt; Anterior</TabBtn>
          <div style={{ display: 'flex', gap: 6 }}>
            {[0, 1].map(i => <div key={i} onClick={() => setThreatPage(i)} style={{ width: 8, height: 8, borderRadius: '50%', background: i === threatPage ? '#22c55e' : '#1a3a1a', cursor: 'pointer' }} />)}
          </div>
          <TabBtn disabled={threatPage === 1} onClick={() => setThreatPage(p => Math.min(1, p + 1))} color="#22c55e">Siguiente &gt;</TabBtn>
        </div>
      </div>
    </div>
  )
}

// ─── Tab 2: Wireshark ─────────────────────────────────────────────────────────

function WiresharkContent() {
  const [activeFilter, setActiveFilter] = useState<number | null>(null)
  const [hoveredProto, setHoveredProto] = useState<number | null>(null)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', minHeight: 'calc(100vh - 88px)' }}>

      {/* LEFT: Conceptos */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionTitle color="#00bcd4">¿Qué es Wireshark?</SectionTitle>
        <p style={{ color: '#4a8a4a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Conceptos clave del analizador de red:
        </p>
        {wiresharkConcepts.map(c => (
          <div key={c.title} style={{ border: '1px solid #0a2a2a', padding: '10px 12px', background: 'rgba(0,188,212,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16 }}>{c.icon}</span>
              <span style={{ color: c.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{c.title}</span>
            </div>
            <p style={{ color: '#6aaa8a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>{c.detail}</p>
          </div>
        ))}

        <div style={{ marginTop: 'auto', border: '1px solid #0a2a2a', padding: '8px 12px', background: '#020a0a' }}>
          <div style={{ color: '#00bcd4', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 6 }}>COMANDO DE CAPTURA</div>
          <div style={{ background: '#010808', padding: '6px 8px', fontSize: 10, color: '#00bcd4' }}>
            $ tcpdump -i eth0 -w captura.pcap
          </div>
          <p style={{ color: '#4a7a7a', fontSize: 9, lineHeight: 1.5, marginTop: 6 }}>
            Captura todo el tráfico de eth0 y lo guarda en un archivo .pcap para análisis posterior en Wireshark.
          </p>
        </div>
      </div>

      <div style={{ background: '#0a2a2a' }} />

      {/* CENTER: Protocolos */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionTitle color="#00bcd4">Protocolos de Red</SectionTitle>
        <p style={{ color: '#4a7a7a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Seguridad por protocolo — pasa el cursor para ver detalles:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {protocols.map((p, i) => (
            <div
              key={p.name}
              onMouseEnter={() => setHoveredProto(i)}
              onMouseLeave={() => setHoveredProto(null)}
              style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 12px', border: `1px solid ${hoveredProto === i ? p.color : '#0a2a2a'}`, background: hoveredProto === i ? `${p.color}0a` : 'transparent', cursor: 'default', transition: 'all 0.2s' }}
            >
              <div style={{ minWidth: 52, color: p.color, fontWeight: 700, fontSize: 11 }}>{p.name}</div>
              <div style={{ color: '#4a7a7a', fontSize: 9, minWidth: 30 }}>:{p.port}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: hoveredProto === i ? 4 : 0 }}>
                  <span style={{ fontSize: 8, color: p.safe === true ? '#22c55e' : p.safe === false ? '#ef4444' : '#eab308', fontWeight: 700, letterSpacing: '0.1em' }}>
                    {p.safe === true ? '■ SEGURO' : p.safe === false ? '■ INSEGURO' : '■ CUIDADO'}
                  </span>
                </div>
                {hoveredProto === i && (
                  <p style={{ color: '#6a9a9a', fontSize: 9, lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estructura de paquete */}
        <div style={{ border: '1px solid #0a2a2a', padding: '10px 12px', background: '#020a0a', marginTop: 4 }}>
          <div style={{ color: '#00bcd4', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 8 }}>ESTRUCTURA DE UN PAQUETE</div>
          <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { label: 'Ethernet', color: '#9c27b0' },
              { label: 'IP',       color: '#00bcd4' },
              { label: 'TCP/UDP',  color: '#22c55e' },
              { label: 'Payload',  color: '#f97316' },
            ].map(layer => (
              <div key={layer.label} style={{ background: `${layer.color}22`, border: `1px solid ${layer.color}55`, color: layer.color, padding: '3px 10px', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em' }}>
                {layer.label}
              </div>
            ))}
          </div>
          <p style={{ color: '#4a7a7a', fontSize: 9, lineHeight: 1.5, marginTop: 8 }}>
            El payload es donde viajan los datos reales. En protocolos sin cifrado, las credenciales aparecen aquí en texto legible.
          </p>
        </div>
      </div>

      <div style={{ background: '#0a2a2a' }} />

      {/* RIGHT: Filtros */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionTitle color="#00bcd4">Filtros de Wireshark</SectionTitle>
        <p style={{ color: '#4a7a7a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Haz clic en un filtro para verlo en la barra:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {wiresharkFilters.map((f, i) => (
            <div
              key={i}
              onClick={() => setActiveFilter(i === activeFilter ? null : i)}
              style={{ padding: '8px 12px', border: `1px solid ${activeFilter === i ? '#00bcd4' : '#0a2a2a'}`, background: activeFilter === i ? 'rgba(0,188,212,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <div style={{ color: '#00bcd4', fontSize: 10, fontFamily: 'monospace', fontWeight: 600 }}>{f.filter}</div>
              {activeFilter === i && (
                <div style={{ color: '#4a9a9a', fontSize: 9, marginTop: 4 }}>{f.desc}</div>
              )}
            </div>
          ))}
        </div>

        {/* Barra de filtro simulada */}
        <div style={{ border: '1px solid #0a2a2a', overflow: 'hidden' }}>
          <div style={{ background: '#0a1a1a', padding: '4px 8px', borderBottom: '1px solid #0a2a2a', display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#eab308' }} />
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#4a7a7a', fontSize: 9, marginLeft: 8, letterSpacing: '0.1em' }}>Wireshark — Filter Bar</span>
          </div>
          <div style={{ background: '#010a0a', padding: '6px 10px', fontSize: 10, color: activeFilter !== null ? '#00bcd4' : '#1a4a4a', fontFamily: 'monospace', minHeight: 28, transition: 'color 0.2s' }}>
            {activeFilter !== null ? wiresharkFilters[activeFilter].filter : '▌ escribe un filtro o haz clic arriba...'}
          </div>
        </div>

        <div style={{ marginTop: 'auto', border: '1px solid #1a3a1a', padding: '10px 12px', background: '#020802' }}>
          <div style={{ color: '#eab308', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 6 }}>DATO CLAVE PARA EL RETO</div>
          <p style={{ color: '#6a8a6a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>
            En el reto de Wireshark deberás identificar qué protocolo transmitió credenciales en texto plano. Busca paquetes FTP o HTTP con usuario y contraseña visibles en el payload.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Tab 3: Ataque y Defensa ──────────────────────────────────────────────────

function DefensaContent() {
  const [hoveredAttack, setHoveredAttack] = useState<number | null>(null)
  const [expandedTip, setExpandedTip]     = useState<number | null>(null)
  const [demoIndex, setDemoIndex]         = useState<number | null>(null)
  const [terminalLines, setTerminalLines] = useState<string[]>([])

  const runDemo = (idx: number) => {
    setDemoIndex(idx)
    setTerminalLines([])
    const lines = terminalDemos[idx] ?? []
    lines.forEach((line, i) => setTimeout(() => setTerminalLines(prev => [...prev, line]), i * 180))
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', minHeight: 'calc(100vh - 88px)' }}>

      {/* LEFT: Tipos de ataque */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionTitle color="#f97316">Tipos de Ataque</SectionTitle>
        <p style={{ color: '#7a4a2a', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
          Vectores de ataque comunes en CTF:
        </p>
        {attackTypes.map((a, i) => (
          <div
            key={a.title}
            onMouseEnter={() => setHoveredAttack(i)}
            onMouseLeave={() => setHoveredAttack(null)}
            style={{ border: `1px solid ${hoveredAttack === i ? a.color : '#2a1a0a'}`, padding: '10px 12px', background: hoveredAttack === i ? `${a.color}0a` : 'transparent', transition: 'all 0.2s', cursor: 'default' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: hoveredAttack === i ? 6 : 0 }}>
              <span style={{ fontSize: 16 }}>{a.icon}</span>
              <span style={{ color: a.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>{a.title}</span>
            </div>
            {hoveredAttack === i && (
              <p style={{ color: '#8a6a4a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>{a.detail}</p>
            )}
          </div>
        ))}

        <div style={{ marginTop: 'auto', border: '1px solid #2a1a0a', padding: '10px 12px', background: '#0a0500' }}>
          <div style={{ color: '#ef4444', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 6 }}>CICLO DE UN ATAQUE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['1. Reconocimiento', '2. Escaneo', '3. Explotación', '4. Persistencia', '5. Borrado de huellas'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 9, color: i < 2 ? '#eab308' : i < 4 ? '#f97316' : '#ef4444' }}>
                <span style={{ color: '#3a2a1a' }}>›</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: '#2a1a0a' }} />

      {/* CENTER: Guía de Consola y Terminal */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <SectionTitle color="#f97316">Guía de Consola y Terminal</SectionTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #2a1a0a' }}>
              {['Comando', 'Función', 'Ejemplo'].map(h => (
                <th key={h} style={{ color: '#f97316', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '4px 8px', textAlign: 'left', fontSize: 9 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {commands.map((c, i) => (
              <tr key={c.cmd} onClick={() => runDemo(i)} style={{ borderBottom: '1px solid #1a0d00', cursor: 'pointer', background: demoIndex === i ? 'rgba(249,115,22,0.06)' : 'transparent', transition: 'background 0.15s' }}>
                <td style={{ padding: '5px 8px', color: '#f97316', fontWeight: 700 }}>{c.cmd}</td>
                <td style={{ padding: '5px 8px', color: '#8a6a4a', lineHeight: 1.4 }}>{c.fn}</td>
                <td style={{ padding: '5px 8px', color: '#f97316', opacity: 0.7 }}>{c.ex}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p style={{ color: '#7a4a2a', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>Anatomía de un comando:</p>
          <div style={{ background: '#080200', border: '1px solid #2a1a0a', padding: '8px 12px', fontSize: 11, display: 'flex', gap: 4, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#f97316', fontWeight: 700 }}>$</span>
            {[
              { text: 'root@server', color: '#f97316', bg: '#1a0800' },
              { text: 'grep',        color: '#f97316', bg: '#1a0d00' },
              { text: '-i',          color: '#eab308', bg: '#1a1500' },
              { text: '"password"',  color: '#ef4444', bg: '#1a0000' },
              { text: './src/',      color: '#60a5fa', bg: '#000d1a' },
            ].map(t => (
              <span key={t.text} style={{ background: t.bg, color: t.color, padding: '1px 5px', borderRadius: 2, fontWeight: 600 }}>{t.text}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, fontSize: 9 }}>
            {[['Prompt','#f97316'],['Comando','#f97316'],['Opción / Flag','#eab308'],['Argumento','#ef4444'],['Destino','#60a5fa']].map(([label, color]) => (
              <span key={label}><span style={{ color: color as string }}>*</span> <span style={{ color: '#7a4a2a' }}>{label}</span></span>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #2a1a0a', flex: 1 }}>
          <div style={{ background: '#100800', padding: '5px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #2a1a0a' }}>
            <div style={{ display: 'flex', gap: 5 }}>
              {['#ef4444','#eab308','#22c55e'].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            </div>
            <span style={{ color: '#7a4a2a', fontSize: 10, letterSpacing: '0.15em' }}>TERMINAL - bash</span>
            <button onClick={() => { if (demoIndex !== null) runDemo(demoIndex) }} style={{ background: '#1a0800', border: '1px solid #f97316', color: '#f97316', padding: '2px 10px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}>
              &gt; DEMO
            </button>
          </div>
          <div style={{ background: '#050200', padding: '10px 12px', minHeight: 80, fontSize: 10, lineHeight: 1.8 }}>
            {terminalLines.length === 0
              ? <span style={{ color: '#3a1a00' }}>Haz clic en un comando para ver un ejemplo real...</span>
              : terminalLines.map((line, i) => <div key={i} style={{ color: line.startsWith('$') ? '#f97316' : '#8a6a4a' }}>{line}</div>)
            }
          </div>
        </div>
      </div>

      <div style={{ background: '#2a1a0a' }} />

      {/* RIGHT: Estrategias de defensa + Tips CTF */}
      <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <SectionTitle color="#f97316">Estrategias de Defensa</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {defenseStrategies.map((d, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '6px 10px', border: '1px solid #2a1a0a', background: '#050200' }}>
              <span style={{ fontSize: 13, minWidth: 20 }}>{d.icon}</span>
              <div>
                <div style={{ color: '#f97316', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 2 }}>{d.title}</div>
                <p style={{ color: '#7a5a3a', fontSize: 8, lineHeight: 1.4, margin: 0 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #2a1a0a', paddingTop: 10, marginTop: 4 }}>
          <SectionTitle color="#f97316">Tips para el Reto CTF</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {ctfTips.map((t, i) => (
              <div
                key={i}
                onClick={() => setExpandedTip(i === expandedTip ? null : i)}
                style={{ border: `1px solid ${expandedTip === i ? '#f97316' : '#2a1a0a'}`, padding: '8px 10px', cursor: 'pointer', background: expandedTip === i ? 'rgba(249,115,22,0.06)' : 'transparent', transition: 'all 0.2s' }}
              >
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#f9731633', fontSize: 14, fontWeight: 900, minWidth: 22 }}>{t.step}</span>
                  <span style={{ color: '#f97316', fontSize: 9, fontWeight: 700, letterSpacing: '0.06em' }}>{t.tip}</span>
                  <span style={{ marginLeft: 'auto', color: '#5a3a2a', fontSize: 8 }}>{expandedTip === i ? '▲' : '▼'}</span>
                </div>
                {expandedTip === i && (
                  <p style={{ color: '#8a6a4a', fontSize: 8, lineHeight: 1.5, margin: '6px 0 0 30px' }}>{t.detail}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 'auto', border: '1px solid #1a3a1a', padding: '8px 10px', background: '#020502' }}>
          <div style={{ color: '#22c55e', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', marginBottom: 6 }}>HERRAMIENTAS COMUNES</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {['nmap','netcat','metasploit','burpsuite','john','hashcat'].map(tool => (
              <span key={tool} style={{ background: '#0a1a0a', border: '1px solid #1a3a1a', color: '#22c55e', padding: '2px 8px', fontSize: 9, letterSpacing: '0.08em' }}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Shared components ────────────────────────────────────────────────────────

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 style={{ color, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </h2>
  )
}

function TabBtn({ children, onClick, disabled, color }: { children: React.ReactNode; onClick: () => void; disabled: boolean; color: string }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ background: 'transparent', border: `1px solid ${disabled ? '#1a3a1a' : color + '44'}`, color: disabled ? '#1a3a1a' : color, padding: '3px 10px', fontSize: 9, cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em' }}
    >
      {children}
    </button>
  )
}

interface ThreatCardData { id: number; icon: string; title: string; tip: string }
function ThreatCard({ card }: { card: ThreatCardData }) {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(o => !o)} style={{ border: `1px solid ${open ? '#22c55e' : '#1a3a1a'}`, padding: '10px', cursor: 'pointer', background: open ? 'rgba(34,197,94,0.05)' : 'transparent', transition: 'all 0.2s' }}>
      <div style={{ fontSize: 20, marginBottom: 6 }}>{card.icon}</div>
      <div style={{ color: '#22c55e', fontSize: 9, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: open ? 8 : 0 }}>{card.title}</div>
      {open
        ? <p style={{ color: '#6aaa6a', fontSize: 9, lineHeight: 1.6, margin: 0 }}>{card.tip}</p>
        : <div style={{ color: '#2a5a2a', fontSize: 8, marginTop: 4, letterSpacing: '0.1em' }}>ver consejo</div>
      }
    </div>
  )
}
