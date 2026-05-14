import { useState, useEffect, useRef, useCallback } from 'react'

// ── Helpers ──────────────────────────────────────────────────────────────────

function hexPoints(cx: number, cy: number, r: number): string {
  return [0, 60, 120, 180, 240, 300]
    .map(deg => {
      const rad = (deg * Math.PI) / 180
      return `${(cx + r * Math.cos(rad)).toFixed(1)},${(cy + r * Math.sin(rad)).toFixed(1)}`
    })
    .join(' ')
}

const NODE_RADIUS: Record<NodeType, number> = { green: 35, cyan: 35, center: 44 }

function edgeEndpoints(a: NodeData, b: NodeData) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  if (len === 0) return { x1: a.x, y1: a.y, x2: b.x, y2: b.y }
  const ux = dx / len
  const uy = dy / len
  const rA = NODE_RADIUS[a.type]
  const rB = NODE_RADIUS[b.type]
  return {
    x1: a.x + ux * rA,
    y1: a.y + uy * rA,
    x2: b.x - ux * rB,
    y2: b.y - uy * rB,
  }
}

// ── Data ─────────────────────────────────────────────────────────────────────

type NodeType = 'green' | 'cyan' | 'center'

interface NodeData {
  id: string
  x: number
  y: number
  label: string
  type: NodeType
}

interface EdgeData {
  from: string
  to: string
  color: 'green' | 'cyan'
}

const NODES: NodeData[] = [
  { id: 'n1',     x: 1480, y: 1500, label: 'NODE 1', type: 'green'  },
  { id: 'n2',     x: 1610, y: 1500, label: 'NODE 2', type: 'green'  },
  { id: 'n3',     x: 1740, y: 1500, label: 'NODE 3', type: 'green'  },
  { id: 'n4',     x: 1870, y: 1500, label: 'NODE 4', type: 'green'  },
  { id: 'n5s',    x: 1970, y: 1400, label: 'NODE 5', type: 'green'  },
  { id: 'n1b',    x: 1970, y: 1600, label: 'NODE 1', type: 'green'  },
  { id: 'center', x: 2000, y: 1500, label: 'NODE 5', type: 'center' },
  { id: 'n6a',    x: 2130, y: 1400, label: 'NODE 6', type: 'cyan'   },
  { id: 'n7a',    x: 2130, y: 1600, label: 'NODE 7', type: 'cyan'   },
  { id: 'n9a',    x: 2260, y: 1400, label: 'NODE 9', type: 'cyan'   },
  { id: 'n8a',    x: 2260, y: 1600, label: 'NODE 8', type: 'cyan'   },
  { id: 'n6b',    x: 2390, y: 1400, label: 'NODE 6', type: 'cyan'   },
  { id: 'n9b',    x: 2390, y: 1600, label: 'NODE 9', type: 'cyan'   },
]

const EDGES: EdgeData[] = [
  { from: 'n1',     to: 'n2',     color: 'green' },
  { from: 'n2',     to: 'n3',     color: 'green' },
  { from: 'n3',     to: 'n4',     color: 'green' },
  { from: 'n4',     to: 'n5s',    color: 'green' },
  { from: 'n4',     to: 'n1b',    color: 'green' },
  { from: 'n5s',    to: 'center', color: 'green' },
  { from: 'n1b',    to: 'center', color: 'green' },
  { from: 'center', to: 'n6a',    color: 'cyan'  },
  { from: 'center', to: 'n7a',    color: 'cyan'  },
  { from: 'n6a',    to: 'n9a',    color: 'cyan'  },
  { from: 'n7a',    to: 'n8a',    color: 'cyan'  },
  { from: 'n9a',    to: 'n6b',    color: 'cyan'  },
  { from: 'n8a',    to: 'n9b',    color: 'cyan'  },
  { from: 'n6b',    to: 'n9b',    color: 'cyan'  },
]

const nodeMap: Record<string, NodeData> = Object.fromEntries(NODES.map(n => [n.id, n]))

// ── Component ─────────────────────────────────────────────────────────────────

interface NodeMapProps {
  onNodeClick?: (nodeId: string) => void
}

export default function NodeMap({ onNodeClick }: NodeMapProps) {
  const [panX, setPanX] = useState(0)
  const [panY, setPanY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const didMove = useRef(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    const centerX = (1480 + 2390) / 2
    const centerY = 1500
    setPanX(window.innerWidth / 2 - centerX)
    setPanY(window.innerHeight / 2 - centerY)
  }, [])

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

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: "url('https://github.com/SantiagoAngel007/arrowhead-project/releases/download/assets-v1/trivia.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          transform: `translate(${panX}px, ${panY}px)`,
          position: 'absolute',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <svg width={4000} height={3000}>
          <defs>
            {/* Dot grid pattern */}
            <pattern id="grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="rgba(0,255,136,0.05)" />
            </pattern>

            {/* Arrow markers */}
            <marker id="arrow-green" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#00ff88" />
            </marker>
            <marker id="arrow-cyan" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill="#00d4ff" />
            </marker>
          </defs>

          {/* Overlay oscuro sobre el GIF */}
          <rect width={4000} height={3000} fill="rgba(6,10,24,0.72)" />
          {/* Dot grid */}
          <rect width={4000} height={3000} fill="url(#grid)" />

          {/* ── Edges ── */}
          {EDGES.map((edge, i) => {
            const a = nodeMap[edge.from]
            const b = nodeMap[edge.to]
            if (!a || !b) return null
            const { x1, y1, x2, y2 } = edgeEndpoints(a, b)
            const color  = edge.color === 'green' ? '#00ff88' : '#00d4ff'
            const marker = edge.color === 'green' ? 'url(#arrow-green)' : 'url(#arrow-cyan)'
            return (
              <line
                key={i}
                x1={x1} y1={y1}
                x2={x2} y2={y2}
                stroke={color}
                strokeWidth={1.5}
                strokeOpacity={0.7}
                markerEnd={marker}
              />
            )
          })}

          {/* ── Nodes ── */}
          {NODES.map(node => {
            // Central node
            if (node.type === 'center') {
              return (
                <g key={node.id}>
                  <circle cx={node.x} cy={node.y} r={44} stroke="#00ff88" strokeWidth={1.5} fill="none" />
                  <circle cx={node.x} cy={node.y} r={36} stroke="#00ff88" strokeWidth={2.5} fill="rgba(0,255,136,0.15)" />
                  <text
                    x={node.x} y={node.y}
                    textAnchor="middle" dominantBaseline="middle"
                    fill="#00ff88" fontSize={14} fontWeight="bold"
                    fontFamily="monospace"
                  >
                    SA
                  </text>
                </g>
              )
            }

            // Green (completed)
            if (node.type === 'green') {
              return (
                <g key={node.id}>
                  <polygon
                    points={hexPoints(node.x, node.y, 35)}
                    stroke="#00ff88" strokeWidth={2}
                    fill="rgba(0,255,136,0.1)"
                  />
                  <polyline
                    points={`${node.x - 10},${node.y} ${node.x - 3},${node.y + 8} ${node.x + 12},${node.y - 8}`}
                    stroke="#00ff88" strokeWidth={2}
                    fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                  <text
                    x={node.x} y={node.y + 45}
                    textAnchor="middle"
                    fill="#aaaaaa" fontSize={10}
                    fontFamily="monospace" letterSpacing={1}
                  >
                    {node.label}
                  </text>
                </g>
              )
            }

            // Cyan (pending)
            return (
              <g
                key={node.id}
                onClick={() => { if (!didMove.current) onNodeClick?.(node.id) }}
                style={{ cursor: 'pointer' }}
              >
                <polygon
                  points={hexPoints(node.x, node.y, 35)}
                  stroke="#00d4ff" strokeWidth={2}
                  fill="rgba(0,212,255,0.08)"
                />
                <text
                  x={node.x} y={node.y}
                  textAnchor="middle" dominantBaseline="middle"
                  fill="#00d4ff" fontSize={18}
                  fontFamily="monospace"
                >
                  ?
                </text>
                <text
                  x={node.x} y={node.y + 45}
                  textAnchor="middle"
                  fill="#aaaaaa" fontSize={10}
                  fontFamily="monospace" letterSpacing={1}
                >
                  {node.label}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}
