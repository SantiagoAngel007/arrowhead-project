const GREEN = '#00ff88'
const CYAN  = '#00d4ff'
const HEX_R = 30

function hexPts(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 180) * (60 * i - 30)
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

function offset(x1: number, y1: number, x2: number, y2: number, d: number) {
  const len = Math.hypot(x2 - x1, y2 - y1)
  const ux = (x2 - x1) / len
  const uy = (y2 - y1) / len
  return { x: x1 + ux * d, y: y1 + uy * d }
}

type NType = 'green' | 'cyan' | 'center'

interface GNode { id: string; x: number; y: number; label: string; type: NType }
interface GEdge { from: string; to: string; color: 'green' | 'cyan' }

const NODES: GNode[] = [
  { id: 'g1',     x: 62,  y: 240, label: 'NODE 1', type: 'green'  },
  { id: 'g2',     x: 155, y: 240, label: 'NODE 2', type: 'green'  },
  { id: 'g3',     x: 248, y: 240, label: 'NODE 3', type: 'green'  },
  { id: 'g4',     x: 341, y: 240, label: 'NODE 4', type: 'green'  },
  { id: 'g5',     x: 410, y: 158, label: 'NODE 5', type: 'green'  },
  { id: 'g6',     x: 410, y: 322, label: 'NODE 1', type: 'green'  },
  { id: 'center', x: 480, y: 240, label: 'NODE 5', type: 'center' },
  { id: 'b1',     x: 554, y: 158, label: 'NODE 6', type: 'cyan'   },
  { id: 'b2',     x: 554, y: 322, label: 'NODE 7', type: 'cyan'   },
  { id: 'b3',     x: 644, y: 158, label: 'NODE 9', type: 'cyan'   },
  { id: 'b4',     x: 644, y: 322, label: 'NODE 8', type: 'cyan'   },
  { id: 'b5',     x: 554, y: 406, label: 'NODE 6', type: 'cyan'   },
  { id: 'b6',     x: 644, y: 406, label: 'NODE 9', type: 'cyan'   },
]

const EDGES: GEdge[] = [
  { from: 'g1',     to: 'g2',     color: 'green' },
  { from: 'g2',     to: 'g3',     color: 'green' },
  { from: 'g3',     to: 'g4',     color: 'green' },
  { from: 'g4',     to: 'g5',     color: 'green' },
  { from: 'g4',     to: 'g6',     color: 'green' },
  { from: 'g5',     to: 'center', color: 'green' },
  { from: 'g6',     to: 'center', color: 'green' },
  { from: 'center', to: 'b1',     color: 'cyan'  },
  { from: 'center', to: 'b2',     color: 'cyan'  },
  { from: 'b1',     to: 'b3',     color: 'cyan'  },
  { from: 'b2',     to: 'b4',     color: 'cyan'  },
  { from: 'b2',     to: 'b5',     color: 'cyan'  },
  { from: 'b5',     to: 'b6',     color: 'cyan'  },
]

const nodeMap = Object.fromEntries(NODES.map(n => [n.id, n]))

const EDGE_OFFSET = HEX_R + 3
const CENTER_OFFSET = 46

export function NodeGraph() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg
        viewBox="20 105 670 330"
        style={{ width: '100%', height: '100%' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="ng-glow-green" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ng-glow-cyan" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          <marker id="arrow-g" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill={GREEN} opacity={0.9} />
          </marker>
          <marker id="arrow-c" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill={CYAN} opacity={0.9} />
          </marker>
        </defs>

        {/* Edges */}
        {EDGES.map((edge, i) => {
          const a = nodeMap[edge.from]
          const b = nodeMap[edge.to]
          if (!a || !b) return null

          const fromR = a.type === 'center' ? CENTER_OFFSET : EDGE_OFFSET
          const toR   = b.type === 'center' ? CENTER_OFFSET : EDGE_OFFSET

          const start = offset(a.x, a.y, b.x, b.y, fromR)
          const end   = offset(b.x, b.y, a.x, a.y, toR)

          const color  = edge.color === 'green' ? GREEN : CYAN
          const marker = edge.color === 'green' ? 'url(#arrow-g)' : 'url(#arrow-c)'
          const glow   = `url(#ng-glow-${edge.color})`

          return (
            <line
              key={i}
              x1={start.x} y1={start.y}
              x2={end.x}   y2={end.y}
              stroke={color}
              strokeWidth={2}
              strokeOpacity={0.75}
              markerEnd={marker}
              filter={glow}
            />
          )
        })}

        {/* Nodes */}
        {NODES.map(node => {
          if (node.type === 'center') {
            return (
              <g key={node.id}>
                {/* Pulse ring */}
                <circle cx={node.x} cy={node.y} r={48} fill="none" stroke={GREEN} strokeWidth={1} strokeOpacity={0.3}>
                  <animate attributeName="r" values="48;54;48" dur="2.4s" repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="2.4s" repeatCount="indefinite" />
                </circle>
                {/* Outer ring */}
                <circle cx={node.x} cy={node.y} r={43} fill="none" stroke={GREEN} strokeWidth={2.5} filter="url(#ng-glow-green)" />
                {/* Inner ring */}
                <circle cx={node.x} cy={node.y} r={35} fill="none" stroke={GREEN} strokeWidth={1} strokeOpacity={0.4} />
                {/* Avatar fill */}
                <circle cx={node.x} cy={node.y} r={34} fill="rgba(0,255,136,0.12)" />
                {/* Avatar text */}
                <text x={node.x} y={node.y} textAnchor="middle" dominantBaseline="middle"
                  fill={GREEN} fontSize={13} fontWeight={700} fontFamily="monospace"
                  filter="url(#ng-glow-green)"
                >
                  ANG
                </text>
                {/* Label */}
                <text x={node.x} y={node.y + 56} textAnchor="middle"
                  fill={GREEN} fontSize={8} fontWeight={700} letterSpacing={1.5}
                  fontFamily="monospace" opacity={0.65}
                >
                  {node.label}
                </text>
              </g>
            )
          }

          const color  = node.type === 'green' ? GREEN : CYAN
          const bg     = node.type === 'green' ? 'rgba(0,255,136,0.1)' : 'rgba(0,212,255,0.1)'
          const glowId = `url(#ng-glow-${node.type === 'green' ? 'green' : 'cyan'})`
          const icon   = node.type === 'green' ? '✓' : '?'

          return (
            <g key={node.id}>
              <polygon
                points={hexPts(node.x, node.y, HEX_R)}
                fill={bg}
                stroke={color}
                strokeWidth={2}
                filter={glowId}
              />
              <text
                x={node.x} y={node.y}
                textAnchor="middle" dominantBaseline="middle"
                fill={color} fontSize={15} fontWeight={700} fontFamily="monospace"
              >
                {icon}
              </text>
              <text
                x={node.x} y={node.y + HEX_R + 11}
                textAnchor="middle"
                fill={color} fontSize={7.5} fontWeight={700} letterSpacing={1.5}
                fontFamily="monospace" opacity={0.65}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
