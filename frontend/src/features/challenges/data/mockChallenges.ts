export interface ChallengeDetail {
  id: number
  name: string
  category: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  points: number
  locked: boolean
  description: string
  terminalContent: string
  flag: string
  hint: string
}

export const MOCK_CHALLENGES: ChallengeDetail[] = [
  {
    id: 1,
    name: 'CRIPTOGRAFÍA BÁSICA',
    category: 'Crypto',
    difficulty: 'Easy',
    points: 100,
    locked: false,
    description:
      'Se interceptó el siguiente mensaje cifrado usando una técnica clásica de sustitución. Descifra el texto y construye la flag con el resultado.',
    terminalContent: `$ cat intercepted.txt
Khoor, djhqwh! Dtxl hvwd od iodj:
DUURZKHDA{f3vdu_y3v_dpdgr}

$ # Pista: el desplazamiento es el mismo que usaba el general romano`,
    flag: 'ARROWHEAD{c3sar_y3s_amado}',
    hint: 'El cifrado César desplaza cada letra del alfabeto un número fijo de posiciones. Prueba con ROT-3.',
  },
  {
    id: 2,
    name: 'INGENIERÍA REVERSA: BIN',
    category: 'Rev',
    difficulty: 'Medium',
    points: 300,
    locked: false,
    description:
      'Se encontró un binario sospechoso en el servidor comprometido. Analiza su contenido estático y extrae la flag oculta entre sus cadenas de texto.',
    terminalContent: `$ file suspicious_bin
suspicious_bin: ELF 64-bit LSB executable, x86-64

$ strings suspicious_bin | grep -v "^\\."
/lib64/ld-linux-x86-64.so.2
__libc_start_main
_secret_key
GLIBC_2.34

$ xxd suspicious_bin | grep -A1 "secret"
00004020: 4152 524f 5748 4541 447b 7233 7633 7273  ARROWHEAD{r3v3rs
00004030: 335f 6d34 7374 3372 7d00 0000 0000 0000  3_m4st3r}.......`,
    flag: 'ARROWHEAD{r3v3rs3_m4st3r}',
    hint: 'El comando `strings` extrae texto legible de binarios. Combínalo con `grep` para filtrar patrones como "ARROW".',
  },
  {
    id: 3,
    name: 'ANÁLISIS DE TRÁFICO',
    category: 'Network',
    difficulty: 'Medium',
    points: 250,
    locked: false,
    description:
      'Durante una auditoría se capturó tráfico HTTP sospechoso. Alguien exfiltró datos codificados en los headers de las peticiones. Encuentra la flag.',
    terminalContent: `$ tcpdump -r capture.pcap -A | grep -A 6 "POST /upload"
POST /upload HTTP/1.1
Host: internal.corp
User-Agent: python-requests/2.28.0
X-Exfil-Data: QVJST1dIRUFEe3BhY2tldF9zbmlmZmVyfQ==
Content-Type: application/octet-stream
Content-Length: 0`,
    flag: 'ARROWHEAD{packet_sniffer}',
    hint: 'El header X-Exfil-Data contiene datos en Base64. Decodifícalo: `echo "QVJST..." | base64 -d`',
  },
  {
    id: 4,
    name: 'FORENSE DIGITAL: DISCO',
    category: 'Forensics',
    difficulty: 'Hard',
    points: 455,
    locked: true,
    description: 'RETO BLOQUEADO — Completa los retos anteriores para desbloquear este nivel.',
    terminalContent: `$ file disk_image.dd
disk_image.dd: DOS/MBR boot sector

$ [ACCESO DENEGADO — NIVEL INSUFICIENTE]`,
    flag: 'ARROWHEAD{f0r3ns1cs_h4rd}',
    hint: 'Reto bloqueado.',
  },
  {
    id: 5,
    name: 'WEB EXPLOTACIÓN: SQLi',
    category: 'Web',
    difficulty: 'Medium',
    points: 350,
    locked: false,
    description:
      'Una aplicación web interna tiene un formulario de login vulnerable. Explota la inyección SQL para bypassear la autenticación y recuperar la flag del panel de administración.',
    terminalContent: `$ curl -s -X POST http://target.lab/login \\
  -d "user=admin&pass=test"
{"error": "Credenciales inválidas"}

$ # El servidor ejecuta internamente:
$ # SELECT * FROM users WHERE user='?' AND pass='?'
$ # La tabla 'secrets' contiene: id, user, flag`,
    flag: 'ARROWHEAD{sql_1nj3ct10n_m4st3r}',
    hint: "Prueba con ' OR '1'='1'-- en el campo usuario. El -- comenta el resto de la query y evita la validación de contraseña.",
  },
]

export function getChallengeById(id: number): ChallengeDetail | undefined {
  return MOCK_CHALLENGES.find(c => c.id === id)
}
