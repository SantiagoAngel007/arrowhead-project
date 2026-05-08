import type { KnowledgeCard, ConsoleCommand, ThreatCard } from './types'

export const knowledgeCards: KnowledgeCard[] = [
  {
    id: 1,
    title: 'ENTENDIENDO EL CIFRADO',
    level: 'BÁSICO',
    color: '#00ff88',
    icon: '🔐',
    description:
      'El cifrado convierte información legible en datos ilegibles para proteger tu privacidad y la de otros.',
    bullets: [
      'Cifrado simétrico: la misma llave cifra y descifra',
      'Cifrado asimétrico: llave pública + llave privada',
      'HTTPS usa TLS para proteger sitios web',
      'Las contraseñas se almacenan como hashes (no en texto plano)',
    ],
    example: "Texto: 'HOLA' → Cifrado AES → 'X7mK#9pQ2!'",
  },
  {
    id: 2,
    title: 'ATAQUES DE RED COMUNES',
    level: 'INTERMEDIO',
    color: '#ffcc00',
    icon: '⚠️',
    description:
      'Conoce cómo los atacantes intentan comprometer sistemas para poder defenderte mejor.',
    bullets: [
      'Phishing: correos falsos para robar credenciales',
      'Man-in-the-Middle: interceptar comunicaciones activas',
      'DoS/DDoS: saturar servidores con tráfico masivo',
      'Sniffing: capturar paquetes en redes no seguras',
    ],
    example:
      'Un atacante en Wi-Fi pública puede ver tu tráfico HTTP sin cifrar.',
  },
  {
    id: 3,
    title: 'ANÁLISIS DE CÓDIGO',
    level: 'AVANZADO',
    color: '#ff6b35',
    icon: '🔍',
    description:
      'Aprende a identificar vulnerabilidades en el código fuente antes de que lo haga un atacante.',
    bullets: [
      'Busca contraseñas o llaves hardcodeadas en el código',
      'Identifica inyecciones SQL o vulnerabilidades XSS',
      'Revisa el manejo incorrecto de errores y excepciones',
      'Verifica la validación de entradas del usuario',
    ],
    example: "password = 'admin123'  ← ¡Nunca hardcodees credenciales!",
  },
  {
    id: 4,
    title: 'ANÁLISIS DE MALWARE',
    level: 'AVANZADO',
    color: '#ff4757',
    icon: '🦠',
    description:
      'Comprende cómo funciona el software malicioso para poder detectarlo, eliminarlo y prevenirlo.',
    bullets: [
      'Virus: se replica adjuntándose a archivos legítimos',
      'Ransomware: cifra tus archivos y pide rescate económico',
      'Troyanos: se disfrazan de software legítimo y confiable',
      'Spyware: monitorea tu actividad sin tu conocimiento',
    ],
    example:
      'Un archivo .exe en un correo puede ser un troyano disfrazado de PDF.',
  },
]

export const consoleCommands: ConsoleCommand[] = [
  { command: 'ls', function: 'Lista archivos del directorio actual', usage: 'ls -la' },
  { command: 'cd', function: 'Cambia de directorio', usage: 'cd ~/documentos' },
  { command: 'cat', function: 'Muestra el contenido de un archivo', usage: 'cat config.txt' },
  { command: 'grep', function: 'Busca texto dentro de archivos', usage: 'grep -r "password" .' },
  { command: 'ssh', function: 'Conexión remota segura a otro equipo', usage: 'ssh user@host' },
  { command: 'file', function: 'Identifica el tipo real de un archivo', usage: 'file archivo.exe' },
]

export const threatCards: ThreatCard[] = [
  {
    icon: '🛡️',
    title: 'CONTRASEÑAS SEGURAS',
    description:
      'Una contraseña fuerte mezcla letras mayúsculas, minúsculas, números y símbolos especiales.',
    tip: 'Usa mínimo 12 caracteres y un gestor de contraseñas como Bitwarden.',
    color: '#00ff88',
  },
  {
    icon: '📡',
    title: 'REDES SEGURAS',
    description:
      'Evita conectarte a redes Wi-Fi públicas sin protección. Tu tráfico puede ser interceptado.',
    tip: 'Siempre usa HTTPS y activa una VPN confiable en redes públicas.',
    color: '#00ccff',
  },
  {
    icon: '🎣',
    title: 'DETECTAR PHISHING',
    description:
      'Los atacantes crean correos y páginas falsas para robarte datos personales o bancarios.',
    tip: 'Verifica el remitente y la URL completa antes de hacer clic en cualquier enlace.',
    color: '#ffcc00',
  },
  {
    icon: '🔄',
    title: 'ACTUALIZACIONES',
    description:
      'Los parches de seguridad corrigen vulnerabilidades conocidas en tu sistema operativo y apps.',
    tip: 'Mantén siempre actualizado tu SO, navegador y aplicaciones instaladas.',
    color: '#ff6b35',
  },
]
