import React, { useState, useEffect, useRef, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import { TriviaHUD } from "../../trivia/components/TriviaHUD"

// ── Types ──────────────────────────────────────────────────────────────────────
interface HexData {
  addr: string[]
  bytes: string[]
  ascii: string[]
  hls: number[]
}

interface DetailField {
  key: string
  val: string
  type?: "encrypted" | "flag" | "normal"
}

interface DetailFrame {
  name: string
  fields: DetailField[]
}

interface Packet {
  id: number
  t: string
  src: string
  dst: string
  proto: "TCP" | "ARP" | "TELNET" | "HTTP" | "DNS" | "ICMP"
  len: number
  info: string
  isFlag?: boolean
  detail: { frames: DetailFrame[] }
  hex: HexData
}

// ── Static packet data ─────────────────────────────────────────────────────────
const PACKETS: Packet[] = [
  {
    id: 1, t: "0.000000", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "ARP", len: 42, info: "Who has 192.168.1.1? Tell 192.168.1.100",
    detail: { frames: [
      { name: "Ethernet II", fields: [
        { key: "Destination", val: "ff:ff:ff:ff:ff:ff" },
        { key: "Source", val: "aa:bb:cc:dd:ee:ff" },
        { key: "Type", val: "ARP (0x0806)" },
      ]},
      { name: "Address Resolution Protocol", fields: [
        { key: "Hardware type", val: "Ethernet (1)" },
        { key: "Protocol type", val: "IPv4 (0x0800)" },
        { key: "Sender IP", val: "192.168.1.100" },
        { key: "Target IP", val: "192.168.1.1" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020"], bytes: ["ff ff ff ff ff ff aa bb  cc dd ee ff 08 06 00 01", "08 00 06 04 00 01 aa bb  cc dd ee ff c0 a8 01 64", "00 00 00 00 00 00 c0 a8  01 01"], ascii: ["......J.........", "........D.......", "...............1"], hls: [] },
  },
  {
    id: 2, t: "0.001240", src: "192.168.1.1", dst: "192.168.1.100",
    proto: "ARP", len: 42, info: "192.168.1.1 is at 11:22:33:44:55:66",
    detail: { frames: [
      { name: "Ethernet II", fields: [
        { key: "Destination", val: "aa:bb:cc:dd:ee:ff" },
        { key: "Source", val: "11:22:33:44:55:66" },
        { key: "Type", val: "ARP (0x0806)" },
      ]},
      { name: "Address Resolution Protocol", fields: [
        { key: "Hardware type", val: "Ethernet (1)" },
        { key: "Opcode", val: "reply (2)" },
        { key: "Sender MAC", val: "11:22:33:44:55:66" },
        { key: "Sender IP", val: "192.168.1.1" },
      ]},
    ]},
    hex: { addr: ["0000", "0010"], bytes: ["aa bb cc dd ee ff 11 22  33 44 55 66 08 06 00 01", "08 00 06 04 00 02 11 22  33 44 55 66 c0 a8 01 01"], ascii: ["......\"3DUf.....", "...\"3DUf........"], hls: [] },
  },
  {
    id: 3, t: "0.015820", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "TCP", len: 74, info: "49234 → 23 [SYN] Seq=0 Win=64240 Len=0",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }, { key: "Destination", val: "11:22:33:44:55:66" }] },
      { name: "Internet Protocol Version 4", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "192.168.1.1" }, { key: "Protocol", val: "TCP (6)" }] },
      { name: "Transmission Control Protocol", fields: [
        { key: "Source Port", val: "49234" },
        { key: "Destination Port", val: "23 (Telnet)" },
        { key: "Flags", val: "SYN" },
        { key: "Window Size", val: "64240" },
      ]},
    ]},
    hex: { addr: ["0000", "0010"], bytes: ["11 22 33 44 55 66 aa bb  cc dd ee ff 08 00 45 00", "00 3c c0 45 40 00 40 06  xx xx c0 a8 01 64 c0 a8"], ascii: [".\"3DUf......E.", ".<.E@.@.....d.."], hls: [] },
  },
  {
    id: 4, t: "0.016103", src: "192.168.1.1", dst: "192.168.1.100",
    proto: "TCP", len: 74, info: "23 → 49234 [SYN, ACK] Seq=0 Ack=1",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "11:22:33:44:55:66" }, { key: "Destination", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.1" }, { key: "Destination", val: "192.168.1.100" }] },
      { name: "Transmission Control Protocol", fields: [{ key: "Source Port", val: "23 (Telnet)" }, { key: "Destination Port", val: "49234" }, { key: "Flags", val: "SYN, ACK" }] },
    ]},
    hex: { addr: ["0000"], bytes: ["aa bb cc dd ee ff 11 22  33 44 55 66 08 00 45 00"], ascii: ["......\"3DUf..E."], hls: [] },
  },
  {
    id: 5, t: "0.018450", src: "192.168.1.1", dst: "192.168.1.100",
    proto: "TELNET", len: 89, info: "Telnet Data: \"login: \"",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "11:22:33:44:55:66" }, { key: "Destination", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.1" }, { key: "Destination", val: "192.168.1.100" }] },
      { name: "Telnet", fields: [
        { key: "Data", val: "login: " },
        { key: "Encoding", val: "ASCII plaintext" },
        { key: "Direction", val: "Server → Client" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020"], bytes: ["aa bb cc dd ee ff 11 22  33 44 55 66 08 00 45 00", "xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx xx", "6c 6f 67 69 6e 3a 20"], ascii: ["......\"3DUf..E.", "................", "login: "], hls: [0, 1, 2, 3, 4, 5, 6] },
  },
  {
    id: 6, t: "0.025100", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "TELNET", len: 65, info: "Telnet Data: \"admin\"",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }, { key: "Destination", val: "11:22:33:44:55:66" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "192.168.1.1" }] },
      { name: "Telnet", fields: [
        { key: "Data", val: "admin" },
        { key: "Encoding", val: "ASCII plaintext" },
        { key: "Direction", val: "Client → Server" },
        { key: "Nota", val: "Credencial de usuario capturada", type: "flag" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020"], bytes: ["11 22 33 44 55 66 aa bb  cc dd ee ff 08 00 45 00", "xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx xx", "61 64 6d 69 6e 0d"], ascii: [".\"3DUf......E.", "................", "admin."], hls: [4, 5, 6, 7, 8, 9] },
  },
  {
    id: 7, t: "0.026880", src: "192.168.1.1", dst: "192.168.1.100",
    proto: "TELNET", len: 72, info: "Telnet Data: \"Password: \"",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "11:22:33:44:55:66" }, { key: "Destination", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.1" }, { key: "Destination", val: "192.168.1.100" }] },
      { name: "Telnet", fields: [
        { key: "Data", val: "Password: " },
        { key: "Encoding", val: "ASCII plaintext" },
        { key: "Direction", val: "Server → Client" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020"], bytes: ["aa bb cc dd ee ff 11 22  33 44 55 66 08 00 45 00", "xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx xx", "50 61 73 73 77 6f 72 64  3a 20"], ascii: ["......\"3DUf..E.", "................", "Password: "], hls: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13] },
  },
  {
    id: 8, t: "0.031200", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "TELNET", len: 91, info: "Telnet Data: [CIFRADO] — HASH DE CONTRASENA DETECTADO",
    isFlag: true,
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }, { key: "Destination", val: "11:22:33:44:55:66" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "192.168.1.1" }] },
      { name: "Telnet — CREDENCIAL CAPTURADA", fields: [
        { key: "Campo", val: "Password" },
        { key: "Valor cifrado", val: "QVJST1dIRUFEe3BhY2tldF9zbmlmZmVyfQ==", type: "encrypted" },
        { key: "Codificacion", val: "Base64" },
        { key: "ALERTA", val: "Contrasena detectada en trafico de red", type: "flag" },
        { key: "Pista", val: "Copia el valor cifrado al Descifrador Base64 de abajo", type: "flag" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020", "0030"], bytes: ["11 22 33 44 55 66 aa bb  cc dd ee ff 08 00 45 00", "xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx xx", "51 56 4a 53 54 31 64 49  52 55 46 45 65 33 42 68", "59 32 74 6c 64 46 39 7a  62 6d 6c 6d 5a 6d 56 79"], ascii: [".\"3DUf......E.", "................", "QVJSVldIRUFEe3Bh", "Y2t0bF9zbmlmZmVy"], hls: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31] },
  },
  {
    id: 9, t: "0.055400", src: "192.168.1.1", dst: "192.168.1.100",
    proto: "HTTP", len: 210, info: "HTTP/1.1 401 Unauthorized — WWW-Authenticate: Basic",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "11:22:33:44:55:66" }, { key: "Destination", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.1" }, { key: "Destination", val: "192.168.1.100" }] },
      { name: "Hypertext Transfer Protocol", fields: [
        { key: "Response Code", val: "401 Unauthorized" },
        { key: "WWW-Authenticate", val: "Basic realm=\"Secure Zone\"" },
        { key: "Server", val: "Apache/2.4.41" },
        { key: "Content-Type", val: "text/html" },
      ]},
    ]},
    hex: { addr: ["0000", "0010"], bytes: ["aa bb cc dd ee ff 11 22  33 44 55 66 08 00 45 00", "4f 52 xx xx 00 50 xx xx  48 54 54 50 2f 31 2e 31"], ascii: ["......\"3DUf..E.", "OR...P..HTTP/1.1"], hls: [] },
  },
  {
    id: 10, t: "0.056100", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "HTTP", len: 287, info: "GET /admin/panel HTTP/1.1 — Authorization: Basic YWRtaW46...",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }, { key: "Destination", val: "11:22:33:44:55:66" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "192.168.1.1" }] },
      { name: "Hypertext Transfer Protocol", fields: [
        { key: "Method", val: "GET" },
        { key: "URI", val: "/admin/panel" },
        { key: "Authorization", val: "Basic YWRtaW46c2VjcmV0MTIz", type: "encrypted" },
        { key: "Host", val: "192.168.1.1" },
        { key: "User-Agent", val: "Mozilla/5.0" },
      ]},
    ]},
    hex: { addr: ["0000", "0010", "0020"], bytes: ["11 22 33 44 55 66 aa bb  cc dd ee ff 08 00 45 00", "xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx xx", "47 45 54 20 2f 61 64 6d  69 6e 20 48 54 54 50"], ascii: [".\"3DUf......E.", "................", "GET /admin HTTP"], hls: [] },
  },
  {
    id: 11, t: "0.102330", src: "192.168.1.100", dst: "8.8.8.8",
    proto: "DNS", len: 73, info: "Standard query A ctf.icesi.edu.co",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "8.8.8.8" }] },
      { name: "Domain Name System (query)", fields: [
        { key: "Transaction ID", val: "0x1234" },
        { key: "Flags", val: "Standard query" },
        { key: "Queries", val: "ctf.icesi.edu.co: type A" },
      ]},
    ]},
    hex: { addr: ["0000"], bytes: ["xx xx xx xx xx xx xx xx  xx xx xx xx xx xx 12 34"], ascii: ["...............4"], hls: [14, 15] },
  },
  {
    id: 12, t: "0.255800", src: "192.168.1.100", dst: "192.168.1.1",
    proto: "ICMP", len: 98, info: "Echo (ping) request id=0x0001 seq=1/256",
    detail: { frames: [
      { name: "Ethernet II", fields: [{ key: "Source", val: "aa:bb:cc:dd:ee:ff" }] },
      { name: "Internet Protocol", fields: [{ key: "Source", val: "192.168.1.100" }, { key: "Destination", val: "192.168.1.1" }] },
      { name: "Internet Control Message Protocol", fields: [
        { key: "Type", val: "8 (Echo request)" },
        { key: "Code", val: "0" },
        { key: "Checksum", val: "0x4d4b" },
        { key: "Identifier", val: "0x0001" },
        { key: "Sequence", val: "1" },
      ]},
    ]},
    hex: { addr: ["0000"], bytes: ["xx xx xx xx xx xx xx xx  xx xx xx xx xx xx 08 00"], ascii: ["................"], hls: [] },
  },
]

const SECRET_HASH = "QVJST1dIRUFEe3BhY2tldF9zbmlmZmVyfQ=="
const CORRECT_FLAG = "ARROWHEAD{packet_sniffer}"

// ── Proto color map ────────────────────────────────────────────────────────────
const PROTO_COLORS: Record<string, string> = {
  TCP: "#40a8ff",
  ARP: "#ffaa20",
  TELNET: "#ff6060",
  HTTP: "#60dd80",
  DNS: "#cc88ff",
  ICMP: "#ffcc44",
}

const ROW_BG: Record<string, string> = {
  TELNET: "rgba(40,10,0,0.6)",
  ARP: "rgba(30,20,0,0.5)",
  HTTP: "rgba(0,25,5,0.5)",
}

// ── Question Panel ────────────────────────────────────────────────────────────

const WS_OPTIONS = [
  { id: "A", text: "HTTP" },
  { id: "B", text: "TELNET" },
  { id: "C", text: "SSH" },
  { id: "D", text: "FTP" },
]

function QuestionPanel() {
  const [selected, setSelected] = useState<string | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div style={{
      flex: 1, minWidth: 200,
      background: "#070e1a",
      border: "1px solid #1a3a5a",
      borderRadius: 4,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontFamily: '"Courier New", Consolas, monospace',
    }}>
      <div style={{ fontSize: 9, color: "#4a7a9a", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 2 }}>
        CHALLENGE 3 — PREGUNTA
      </div>
      <div style={{ fontSize: 11, color: "#c8d8e8", lineHeight: 1.6, marginBottom: 4 }}>
        ¿Qué protocolo transmitió las credenciales en texto plano?
      </div>
      {WS_OPTIONS.map(opt => {
        const isSel = selected === opt.id
        const isHov = hovered === opt.id && !isSel
        return (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            onMouseEnter={() => setHovered(opt.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textAlign: "left",
              padding: "6px 10px",
              background: isSel ? "rgba(0,200,255,0.1)" : isHov ? "rgba(0,200,255,0.05)" : "transparent",
              border: `1px solid ${isSel ? "#40c8ff" : isHov ? "rgba(0,200,255,0.5)" : "#1a3a5a"}`,
              borderRadius: 3,
              color: isSel ? "#40c8ff" : isHov ? "#40c8ff" : "#8ab8d8",
              fontSize: 11,
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            <span style={{ marginRight: 8, color: isSel ? "#40c8ff" : "#2a6a9a" }}>{opt.id})</span>
            {opt.text}
          </button>
        )
      })}
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export function WiresharkChallenge() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Packet | null>(null)
  const [filterVal, setFilterVal] = useState("")
  const [hexOpen, setHexOpen] = useState(false)
  const [capturing, setCapturing] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [encryptedInput, setEncryptedInput] = useState("")
  const [decryptResult, setDecryptResult] = useState<{ text: string; status: "idle" | "success" | "fail" }>({ text: "Esperando entrada...", status: "idle" })
  const [flagInput, setFlagInput] = useState("")
  const [flagResult, setFlagResult] = useState<{ text: string; status: "idle" | "success" | "fail" }>({ text: "", status: "idle" })
  const [expandedFrames, setExpandedFrames] = useState<Record<string, boolean>>({})

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (capturing) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [capturing])

  const fmtTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`

  const filteredPackets = PACKETS.filter(p => {
    if (!filterVal.trim()) return true
    const f = filterVal.toLowerCase()
    return p.proto.toLowerCase().includes(f) || p.info.toLowerCase().includes(f) || p.src.includes(f) || p.dst.includes(f)
  })

  const handleSelectPacket = useCallback((p: Packet) => {
    setSelected(p)
    // Auto-fill decryptor if it's the flag packet
    if (p.isFlag) {
      setEncryptedInput(SECRET_HASH)
    }
    // Expand all frames by default
    const expanded: Record<string, boolean> = {}
    p.detail.frames.forEach((_, i) => { expanded[`${p.id}-${i}`] = true })
    setExpandedFrames(expanded)
  }, [])

  const toggleFrame = (key: string) => {
    setExpandedFrames(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const tryDecrypt = () => {
    const val = encryptedInput.trim()
    if (!val) { setDecryptResult({ text: "Ingresa un hash para descifrar", status: "idle" }); return }
    try {
      const decoded = atob(val)
      setDecryptResult({ text: `✓ Descifrado: ${decoded}`, status: "success" })
      setFlagInput(decoded)
    } catch {
      setDecryptResult({ text: "✗ Error: no es Base64 valido", status: "fail" })
    }
  }

  const submitFlag = () => {
    const val = flagInput.trim()
    if (!val) { setFlagResult({ text: "Ingresa la flag", status: "idle" }); return }
    if (val === CORRECT_FLAG) {
      setFlagResult({ text: "✓ FLAG CORRECTA — +250 pts", status: "success" })
    } else {
      setFlagResult({ text: "✗ Flag incorrecta — sigue buscando", status: "fail" })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0f1a' }}>
      <TriviaHUD
        title="ANÁLISIS DE TRÁFICO"
        level="EXPLORACIÓN"
        onBack={() => navigate('/challenges')}
      />
    <div style={{ ...s.root, flex: 1 }}>
      {/* ── Toolbar ── */}
      <div style={s.toolbar}>
        <button style={{ ...s.btn, ...(capturing ? s.btnActive : {}) }} onClick={() => setCapturing(c => !c)}>
          {capturing ? "⏸ Detener" : "▶ Iniciar"}
        </button>
        <button style={s.btn} onClick={() => { setSelected(null); setFilterVal("") }}>Limpiar</button>
        <span style={s.filterLabel}>Filtro:</span>
        <input
          style={s.filterInput}
          placeholder="tcp, arp, telnet, http..."
          value={filterVal}
          onChange={e => setFilterVal(e.target.value)}
        />
        <button style={s.btn} onClick={() => setFilterVal("")}>✕</button>
        <button style={{ ...s.btn, ...(hexOpen ? s.btnActive : {}), marginLeft: "auto" }} onClick={() => setHexOpen(o => !o)}>
          Hex View
        </button>
      </div>

      {/* ── Status bar ── */}
      <div style={s.statusBar}>
        <span>Paquetes: <span style={s.statVal}>{PACKETS.length}</span></span>
        <span>Mostrados: <span style={s.statVal}>{filteredPackets.length}</span></span>
        <span>Interfaz: <span style={s.statVal}>eth0</span></span>
        <span>Duracion: <span style={s.statVal}>{fmtTime(elapsed)}</span></span>
        <span style={{ color: capturing ? "#60dd80" : "#ff6060" }}>
          {capturing ? "● CAPTURANDO" : "■ DETENIDO"}
        </span>
      </div>

      {/* ── Packet list ── */}
      <div style={s.packetList}>
        <table style={s.table}>
          <thead>
            <tr>
              {["#", "Tiempo", "Origen", "Destino", "Protocolo", "Long.", "Informacion"].map(h => (
                <th key={h} style={s.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredPackets.map(p => {
              const isSel = selected?.id === p.id
              return (
                <tr
                  key={p.id}
                  onClick={() => handleSelectPacket(p)}
                  style={{
                    ...s.row,
                    background: isSel ? "#0a2040" : (ROW_BG[p.proto] || "transparent"),
                    cursor: "pointer",
                  }}
                >
                  <td style={{ ...s.td, color: "#4a7a9a" }}>{p.id}</td>
                  <td style={{ ...s.td, color: "#5a8a6a" }}>{p.t}</td>
                  <td style={s.td}>{p.src}</td>
                  <td style={s.td}>{p.dst}</td>
                  <td style={{ ...s.td, color: PROTO_COLORS[p.proto] || "#c8d8e8", fontWeight: 600 }}>{p.proto}</td>
                  <td style={{ ...s.td, color: "#4a7a9a" }}>{p.len}</td>
                  <td style={{ ...s.td, color: p.isFlag ? "#ffaa40" : "#8ab8d8", fontWeight: p.isFlag ? 600 : 400 }}>
                    {p.isFlag ? "★ " : ""}{p.info}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── Resize visual divider ── */}
      <div style={s.divider} />

      {/* ── Packet details ── */}
      <div style={s.detailPanel}>
        {!selected ? (
          <div style={s.detailEmpty}>Selecciona un paquete para ver sus detalles</div>
        ) : (
          <div>
            {selected.detail.frames.map((frame, fi) => {
              const key = `${selected.id}-${fi}`
              const isOpen = expandedFrames[key] !== false
              return (
                <div key={fi} style={s.detailSection}>
                  <div style={s.detailHeader} onClick={() => toggleFrame(key)}>
                    {isOpen ? "▼" : "▶"} {frame.name}
                  </div>
                  {isOpen && frame.fields.map((field, idx) => (
                    <div key={idx} style={s.detailField}>
                      <span style={s.fieldKey}>{field.key}: </span>
                      <span style={{
                        ...s.fieldVal,
                        color: field.type === "encrypted" ? "#ffaa40" : field.type === "flag" ? "#ff6060" : "#c8e8ff",
                        fontWeight: field.type ? 600 : 400,
                      }}>
                        {field.val}
                      </span>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Hex view ── */}
      {hexOpen && selected && (
        <div style={s.hexPanel}>
          {selected.hex.addr.map((addr, i) => {
            const byteArr = selected.hex.bytes[i].split(" ")
            const ascii = selected.hex.ascii[i] || ""
            return (
              <div key={i} style={{ display: "flex", gap: 16, lineHeight: "2", marginBottom: 2 }}>
                <span style={{ color: "#2a5a7a", minWidth: 36 }}>{addr}</span>
                <span style={{ color: "#3a7a5a", letterSpacing: "0.1em", flex: 1 }}>
                  {byteArr.map((b, j) => {
                    const idx = i * 16 + j
                    const hl = selected.hex.hls.includes(idx)
                    return <span key={j} style={{ color: hl ? "#ffaa40" : undefined }}>{b} </span>
                  })}
                </span>
                <span style={{ color: "#4a7a5a", minWidth: 100 }}>{ascii}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Bottom panels ── */}
      <div style={s.bottomPanel}>

        {/* Columna izquierda: descifrador + flag */}
        <div style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Decryptor */}
          <div style={s.decryptPanel}>
            <div style={s.panelLabel}>🔓 Descifrador de contrasena (Base64)</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
              <input
                style={s.decryptInput}
                placeholder="Pega el hash/cifrado aqui..."
                value={encryptedInput}
                onChange={e => setEncryptedInput(e.target.value)}
              />
              <button style={s.decryptBtn} onClick={tryDecrypt}>Descifrar</button>
            </div>
            <div style={{
              ...s.resultBox,
              background: decryptResult.status === "success" ? "#0a2a0a" : decryptResult.status === "fail" ? "#2a0a0a" : "transparent",
              border: `1px solid ${decryptResult.status === "success" ? "#1a5a1a" : decryptResult.status === "fail" ? "#5a1a1a" : "#1a2a3a"}`,
              color: decryptResult.status === "success" ? "#60dd80" : decryptResult.status === "fail" ? "#ff6060" : "#2a4a6a",
            }}>
              {decryptResult.text}
            </div>
          </div>

          {/* Flag submit */}
          <div style={s.flagPanel}>
            <div style={s.panelLabel}>🏁 Enviar flag</div>
            <input
              style={s.flagInput}
              placeholder="ARROWHEAD{...}"
              value={flagInput}
              onChange={e => setFlagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submitFlag()}
            />
            <button style={s.flagBtn} onClick={submitFlag}>VERIFICAR FLAG</button>
            {flagResult.text && (
              <div style={{
                ...s.flagResultText,
                color: flagResult.status === "success" ? "#60dd80" : "#ff6060",
              }}>
                {flagResult.text}
              </div>
            )}
          </div>
        </div>

        {/* Columna derecha: panel de pregunta */}
        <QuestionPanel />

      </div>
    </div>
    </div>
  )
}

// ── Styles ─────────────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  root: {
    background: "#0a0f1a",
    color: "#c8d8e8",
    border: "1px solid #1a2a3a",
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    fontFamily: '"Courier New", Consolas, monospace',
    fontSize: 12,
    minHeight: 580,
  },
  toolbar: {
    background: "#0d1520",
    borderBottom: "1px solid #1a2a3a",
    padding: "6px 10px",
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  btn: {
    background: "#1a2535",
    border: "1px solid #2a3a4a",
    color: "#8aaac8",
    padding: "3px 10px",
    fontSize: 11,
    cursor: "pointer",
    borderRadius: 2,
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  btnActive: {
    background: "#1a3a5a",
    borderColor: "#2a6a9a",
    color: "#40c8ff",
  },
  filterLabel: { color: "#4a7a9a", fontSize: 11, whiteSpace: "nowrap" },
  filterInput: {
    background: "#060d18",
    border: "1px solid #1a3a5a",
    color: "#40c8ff",
    padding: "4px 8px",
    fontFamily: "inherit",
    fontSize: 11,
    flex: 1,
    minWidth: 140,
    borderRadius: 2,
    outline: "none",
  },
  statusBar: {
    background: "#060d18",
    borderTop: "1px solid #1a2a3a",
    borderBottom: "1px solid #1a2a3a",
    padding: "3px 10px",
    display: "flex",
    gap: 16,
    fontSize: 10,
    color: "#4a7a9a",
    flexWrap: "wrap",
  },
  statVal: { color: "#40c8ff" },
  packetList: {
    overflowY: "auto",
    borderBottom: "2px solid #1a3a5a",
    minHeight: 200,
    maxHeight: 240,
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    background: "#0d1a28",
    color: "#4a7a9a",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    padding: "4px 8px",
    textAlign: "left",
    borderBottom: "1px solid #1a2a3a",
    position: "sticky",
    top: 0,
    whiteSpace: "nowrap",
    fontWeight: 500,
  } as React.CSSProperties,
  row: { transition: "background 0.1s" },
  td: {
    padding: "2px 8px",
    borderBottom: "1px solid #0d1520",
    fontSize: 11,
    whiteSpace: "nowrap",
  },
  divider: { height: 4, background: "#1a2a3a", cursor: "ns-resize" },
  detailPanel: {
    background: "#070e1a",
    borderBottom: "2px solid #1a3a5a",
    maxHeight: 180,
    minHeight: 140,
    overflowY: "auto",
    padding: 8,
  },
  detailEmpty: { color: "#2a4a6a", textAlign: "center", padding: 24, fontSize: 11 },
  detailSection: { marginBottom: 6 },
  detailHeader: {
    color: "#40c8ff",
    cursor: "pointer",
    padding: "2px 4px",
    borderLeft: "2px solid #1a3a5a",
    marginBottom: 2,
    userSelect: "none",
    fontSize: 11,
  } as React.CSSProperties,
  detailField: { padding: "1px 4px 1px 16px", lineHeight: 1.6, fontSize: 11 },
  fieldKey: { color: "#4a8aaa" },
  fieldVal: { color: "#c8e8ff" },
  hexPanel: {
    background: "#04090f",
    borderTop: "1px solid #1a2a3a",
    padding: "8px 10px",
    maxHeight: 160,
    overflowY: "auto",
    fontSize: 10.5,
  },
  bottomPanel: {
    background: "#0a1420",
    borderTop: "2px solid #1a3a5a",
    padding: "10px 14px",
    display: "flex",
    gap: 12,
    alignItems: "stretch",
  },
  decryptPanel: { flex: 1, minWidth: 220 },
  panelLabel: {
    fontSize: 10,
    color: "#4a7a9a",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  decryptInput: {
    background: "#060d18",
    border: "1px solid #1a3a5a",
    color: "#ffcc80",
    padding: "5px 8px",
    fontFamily: "inherit",
    fontSize: 11,
    flex: 1,
    borderRadius: 2,
    outline: "none",
    letterSpacing: "0.05em",
    minWidth: 0,
    width: "100%",
    boxSizing: "border-box",
    marginBottom: 6,
  },
  decryptBtn: {
    background: "#152535",
    border: "1px solid #2a5a7a",
    color: "#40c8ff",
    padding: "5px 12px",
    fontFamily: "inherit",
    fontSize: 11,
    cursor: "pointer",
    borderRadius: 2,
    whiteSpace: "nowrap",
  },
  resultBox: {
    fontSize: 11,
    padding: "5px 8px",
    borderRadius: 2,
    minHeight: 24,
    transition: "all 0.2s",
  },
  flagPanel: { flex: 1, minWidth: 180, display: "flex", flexDirection: "column", gap: 6 },
  flagInput: {
    background: "#060d18",
    border: "1px solid #1a3a1a",
    color: "#60dd80",
    padding: "5px 8px",
    fontFamily: "inherit",
    fontSize: 11,
    width: "100%",
    borderRadius: 2,
    outline: "none",
    boxSizing: "border-box",
  },
  flagBtn: {
    background: "#102010",
    border: "1px solid #1a5a1a",
    color: "#60dd80",
    padding: "5px 0",
    fontFamily: "inherit",
    fontSize: 11,
    cursor: "pointer",
    borderRadius: 2,
    width: "100%",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    fontWeight: 600,
  },
  flagResultText: { fontSize: 11, textAlign: "center" },
  hintPanel: {
    fontSize: 10,
    color: "#2a5a7a",
    maxWidth: 160,
    borderLeft: "1px solid #1a2a3a",
    paddingLeft: 10,
    lineHeight: 1.7,
  },
}