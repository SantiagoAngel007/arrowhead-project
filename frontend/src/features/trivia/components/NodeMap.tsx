import { useState, useEffect, useRef, useCallback } from 'react'
import { type LayoutId, type Theme, type NodeData, LAYOUTS } from './layouts'

// ── Helpers ───────────────────────────────────────────────────────────────────

function hexPoints(cx: number, cy: number, r: number): string {
  return [0, 60, 120, 180, 240, 300]
    .map(deg => {
      const rad = (deg * Math.PI) / 180
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`
    })
    .join(' ')
}

const NODE_RADIUS: Record<string, number> = { center: 44, path: 16, cluster: 35 }

function edgeEndpoints(a: NodeData, b: NodeData) {
  const dx = b.x - a.x, dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  if (len === 0) return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
  const ux = dx / len, uy = dy / len
  return {
    x1: a.x + ux * NODE_RADIUS[a.type],
    y1: a.y + uy * NODE_RADIUS[a.type],
    x2: b.x - ux * NODE_RADIUS[b.type],
    y2: b.y - uy * NODE_RADIUS[b.type],
  }
}

// ── Theme colors ──────────────────────────────────────────────────────────────

const THEME_COLOR: Record<Theme, string> = {
  center: '#00ff88',
  north:  '#00ff88',
  east:   '#00d4ff',
  south:  '#f97316',
  west:   '#a855f7',
}

const THEME_FILL: Record<Theme, string> = {
  center: 'rgba(0,255,136,0.15)',
  north:  'rgba(0,255,136,0.08)',
  east:   'rgba(0,212,255,0.08)',
  south:  'rgba(249,115,22,0.08)',
  west:   'rgba(168,85,247,0.08)',
}

// ── Component ─────────────────────────────────────────────────────────────────

interface NodeMapProps {
  layout:       LayoutId
  onNodeClick?: (nodeId: string, theme: Theme) => void
}

export default function NodeMap({ layout, onNodeClick }: NodeMapProps) {
  const config   = LAYOUTS[layout]
  const nodeMap  = Object.fromEntries(config.nodes.map(n => [n.id, n]))

  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const lastPos     = useRef({ x: 0, y: 0 })
  const didMove     = useRef(false)
  const initialized = useRef(false)

  // Reset pan when layout changes
  useEffect(() => {
    initialized.current = false
  }, [layout])

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    setPanX(window.innerWidth  / 2 - 2000)
    setPanY(window.innerHeight / 2 - 2000)
  })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true)
    didMove.current = false
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) didMove.current = true
    setPanX(prev => prev + dx)
    setPanY(prev => prev + dy)
    lastPos.current = { x: e.clientX, y: e.clientY }
  }, [isDragging])

  const handleMouseUp = useCallback(() => setIsDragging(false), [])

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100vw', height: '100vh', overflow: 'hidden',
        position: 'relative',
        backgroundImage: "url('https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/trivia.gif')",
        backgroundSize: 'cover', backgroundPosition: 'center',
        userSelect: 'none',
      }}
    >
      <div style={{
        transform: `translate(${panX}px, ${panY}px)`,
        position: 'absolute',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}>
        <svg width={4200} height={4200}>
          <defs>
            <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="rgba(0,255,136,0.04)" />
            </pattern>
            {(['north', 'east', 'south', 'west'] as Theme[]).map(theme => (
              <marker key={theme}
                id={`arrow-${theme}`}
                markerWidth="6" markerHeight="6"
                refX="5" refY="3" orient="auto"
              >
                <path d="M 0 0 L 6 3 L 0 6 Z" fill={THEME_COLOR[theme]} />
              </marker>
            ))}
          </defs>

          <rect width={4200} height={4200} fill="rgba(6,10,24,0.75)" />
          <rect width={4200} height={4200} fill="url(#grid)" />

          {/* ── Edges ── */}
          {config.edges.map((edge, i) => {
            const a = nodeMap[edge.from], b = nodeMap[edge.to]
            if (!a || !b) return null
            const { x1, y1, x2, y2 } = edgeEndpoints(a, b)
            const theme: Theme = a.theme === 'center' ? b.theme : a.theme
            return (
              <line key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={THEME_COLOR[theme]}
                strokeWidth={1.5}
                strokeOpacity={0.45}
                markerEnd={`url(#arrow-${theme})`}
              />
            )
          })}

          {/* ── Nodes ── */}
          {config.nodes.map(node => {
            const color = THEME_COLOR[node.theme]
            const fill  = THEME_FILL[node.theme]

            // Central hub
            if (node.type === 'center') {
              return (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={44} stroke={color} strokeWidth={1.5} fill="none" />
                  <circle cx={node.x} cy={node.y} r={36} stroke={color} strokeWidth={2.5} fill={fill} />
                  <text x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={color} fontSize={14} fontWeight="bold" fontFamily="monospace">
                    SA
                  </text>
                </g>
              )
            }

            // Corridor node (small)
            if (node.type === 'path') {
              return (
                <g key={node.id}
                  onClick={() => { if (!didMove.current) onNodeClick?.(node.id, node.theme) }}
                  style={{ cursor: 'pointer' }}
                >
                  <polygon points={hexPoints(node.x, node.y, 16)}
                    stroke={color} strokeWidth={1.5} strokeOpacity={0.7} fill={fill} />
                  <text x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={color} fontSize={9} fontFamily="monospace" fillOpacity={0.9}>?</text>
                </g>
              )
            }

            // Cluster node (large)
            return (
              <g key={node.id}
                onClick={() => { if (!didMove.current) onNodeClick?.(node.id, node.theme) }}
                style={{ cursor: 'pointer' }}
              >
                <polygon points={hexPoints(node.x, node.y, 35)}
                  stroke={color} strokeWidth={2} fill={fill} />
                <text x={node.x} y={node.y}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={color} fontSize={18} fontFamily="monospace">?</text>
              </g>
            )
          })}

          {/* ── Theme labels ── */}
          {config.labels.map(({ x, y, theme, text }) => (
            <text key={theme} x={x} y={y}
              textAnchor="middle"
              fill={THEME_COLOR[theme]}
              fontSize={13} fontFamily="monospace"
              letterSpacing={3} fillOpacity={0.65}>
              {text}
            </text>
          ))}
        </svg>
      </div>
    </div>
  )
}
