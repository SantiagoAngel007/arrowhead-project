import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/auth.service"
import type { LoginPayload } from "../types"

// ── Binary Rain Canvas ──────────────────────────────────────────────────────
function BinaryRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const FONT_SIZE = 14
    const cols = Math.floor(canvas.width / FONT_SIZE)
    const drops: number[] = Array(cols).fill(1)

    const tick = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${FONT_SIZE}px "Courier New", monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = Math.random() > 0.5 ? "1" : "0"
        const brightness = Math.random()
        if (brightness > 0.92) {
          ctx.fillStyle = "#ffffff"
        } else if (brightness > 0.7) {
          ctx.fillStyle = "#4a9e5c"
        } else {
          ctx.fillStyle = "#1a5c2a"
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
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: 0.85,
      }}
    />
  )
}

// ── Login Form ───────────────────────────────────────────────────────────────
export function LoginForm() {
  const [payload, setPayload] = useState<LoginPayload>({ code: "", alias: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<"code" | "alias" | null>(null)
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!payload.code.trim() || !payload.alias.trim()) {
      setError("Todos los campos son requeridos")
      return
    }
    setError(null)
    setLoading(true)
    try {
      await login(payload.code, payload.alias)
      navigate("/challenges")
    } catch {
      setError("Código de acceso inválido")
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit()
  }

  return (
    <div style={styles.root}>
      <BinaryRain />

      {/* Card */}
      <div style={styles.card}>
        {/* Title */}
        <div style={styles.titleRow}>
          <span style={styles.title}>CTF_NEXUS</span>
        </div>
        <p style={styles.subtitle}>AUTENTICACIÓN REQUERIDA</p>
        <div style={styles.divider} />

        {/* Access code field */}
        <label style={styles.label}>&gt; CÓDIGO DE ACCESO_</label>
        <input
          style={{
            ...styles.input,
            borderColor: focused === "code" ? "#4a9e5c" : "#2a3a2a",
            boxShadow: focused === "code" ? "0 0 0 1px #4a9e5c44, 0 0 12px #4a9e5c22" : "none",
          }}
          type="text"
          placeholder="INGRESE CÓDIGO"
          value={payload.code}
          onChange={(e) => setPayload((p) => ({ ...p, code: e.target.value }))}
          onFocus={() => setFocused("code")}
          onBlur={() => setFocused(null)}
          onKeyDown={handleKey}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Alias field */}
        <label style={{ ...styles.label, marginTop: 20 }}>&gt; ALIAS_</label>
        <input
          style={{
            ...styles.input,
            borderColor: focused === "alias" ? "#4a9e5c" : "#2a3a2a",
            boxShadow: focused === "alias" ? "0 0 0 1px #4a9e5c44, 0 0 12px #4a9e5c22" : "none",
          }}
          type="text"
          placeholder="IDENTIFICADOR DE USUARIO"
          value={payload.alias}
          onChange={(e) => setPayload((p) => ({ ...p, alias: e.target.value }))}
          onFocus={() => setFocused("alias")}
          onBlur={() => setFocused(null)}
          onKeyDown={handleKey}
          autoComplete="off"
          spellCheck={false}
        />

        {/* Error */}
        {error && <p style={styles.error}>⚠ {error}</p>}

        {/* Submit */}
        <button
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "VERIFICANDO..." : "INICIAR SECUENCIA"}
        </button>
      </div>

      <style>{`
        @keyframes ctfFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        input::placeholder { color: #3a5c3a; letter-spacing: 0.08em; }
        input:focus { outline: none; }
        button:hover:not(:disabled) {
          background: #3a7a44 !important;
          box-shadow: 0 0 20px #4a9e5c55 !important;
        }
      `}</style>
    </div>
  )
}

// ── Styles ───────────────────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: '"Courier New", Consolas, monospace',
    position: "relative",
  },
  card: {
    position: "relative",
    zIndex: 1,
    background: "rgba(0, 0, 0, 0.88)",
    border: "1px solid #1e3a1e",
    padding: "40px 44px 44px",
    width: "100%",
    maxWidth: 400,
    boxSizing: "border-box",
    animation: "ctfFadeIn 0.6s ease both",
    backdropFilter: "blur(8px)",
  },
  titleRow: {
    textAlign: "center",
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#e8f5e8",
    letterSpacing: "0.18em",
    textShadow: "0 0 24px #4a9e5c88",
    fontFamily: '"Courier New", Consolas, monospace',
  },
  subtitle: {
    textAlign: "center",
    fontSize: 11,
    color: "#4a9e5c",
    letterSpacing: "0.25em",
    margin: "0 0 20px",
  },
  divider: {
    height: 1,
    background: "linear-gradient(90deg, transparent, #2a5c2a, transparent)",
    marginBottom: 28,
  },
  label: {
    display: "block",
    fontSize: 11,
    color: "#4a9e5c",
    letterSpacing: "0.15em",
    marginBottom: 8,
    fontFamily: '"Courier New", Consolas, monospace',
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(10, 20, 10, 0.9)",
    border: "1px solid #2a3a2a",
    color: "#c8e6c8",
    fontFamily: '"Courier New", Consolas, monospace',
    fontSize: 13,
    letterSpacing: "0.1em",
    padding: "12px 14px",
    transition: "border-color 0.2s, box-shadow 0.2s",
  },
  error: {
    color: "#e05555",
    fontSize: 12,
    letterSpacing: "0.1em",
    margin: "14px 0 0",
    fontFamily: '"Courier New", Consolas, monospace',
  },
  button: {
    marginTop: 28,
    width: "100%",
    padding: "14px",
    background: "#2a5c34",
    border: "none",
    color: "#c8f0c8",
    fontFamily: '"Courier New", Consolas, monospace',
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.2em",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s",
  },
}