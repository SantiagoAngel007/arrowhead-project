// ── Types ─────────────────────────────────────────────────────────────────────

export type NodeType = 'center' | 'path' | 'cluster'
export type Theme    = 'center' | 'north' | 'east' | 'south' | 'west'
export type LayoutId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'

export interface NodeData {
  id:    string
  x:     number
  y:     number
  type:  NodeType
  theme: Theme
}

export interface EdgeData {
  from: string
  to:   string
}

export interface ThemeLabel {
  x: number; y: number; theme: Theme; text: string
}

export interface LayoutConfig {
  nodes:  NodeData[]
  edges:  EdgeData[]
  labels: ThemeLabel[]
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function chain(ids: string[]): EdgeData[] {
  return ids.slice(0, -1).map((id, i) => ({ from: id, to: ids[i + 1] }))
}

function cl(id: string, x: number, y: number, theme: Theme): NodeData {
  return { id, x: Math.round(x), y: Math.round(y), type: 'cluster', theme }
}

function pt(id: string, x: number, y: number, theme: Theme): NodeData {
  return { id, x: Math.round(x), y: Math.round(y), type: 'path', theme }
}

const CENTER: NodeData = { id: 'center', x: 2000, y: 2000, type: 'center', theme: 'center' }

// ── Layout A: Cruz lineal ─────────────────────────────────────────────────────
// 10 nodes per arm in a straight line, spacing 175px.
// Total: 1 center + 4×10 = 41 nodes.

const SP_A = 175

function linearArm(prefix: string, theme: Theme, dx: number, dy: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const nodes = Array.from({ length: 10 }, (_, i) =>
    cl(`${prefix}${i + 1}`, 2000 + dx * SP_A * (i + 1), 2000 + dy * SP_A * (i + 1), theme)
  )
  return { nodes, edges: chain(nodes.map(n => n.id)) }
}

const linN = linearArm('n', 'north',  0, -1)
const linE = linearArm('e', 'east',   1,  0)
const linS = linearArm('s', 'south',  0,  1)
const linW = linearArm('w', 'west',  -1,  0)

export const LAYOUT_A: LayoutConfig = {
  nodes: [CENTER, ...linN.nodes, ...linE.nodes, ...linS.nodes, ...linW.nodes],
  edges: [
    { from: 'center', to: 'n1' }, { from: 'center', to: 'e1' },
    { from: 'center', to: 's1' }, { from: 'center', to: 'w1' },
    ...linN.edges, ...linE.edges, ...linS.edges, ...linW.edges,
  ],
  labels: [
    { x: 2000,                 y: 2000 - SP_A * 10 - 55, theme: 'north', text: 'FUNDAMENTOS' },
    { x: 2000 + SP_A * 10 + 70, y: 1980,                 theme: 'east',  text: 'REDES'        },
    { x: 2000,                 y: 2000 + SP_A * 10 + 55, theme: 'south', text: 'OWASP & WEB'  },
    { x: 2000 - SP_A * 10 - 70, y: 1980,                 theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout B: Cruz con bifurcaciones ─────────────────────────────────────────
// Each arm: 4 trunk nodes → splits into 2 sub-branches of 3 nodes each.
// Total per arm: 4 + 3 + 3 = 10 nodes.

function branchArm(prefix: string, theme: Theme, dx: number, dy: number): { nodes: NodeData[]; edges: EdgeData[]; firstId: string } {
  const trunkSp = 250
  const subSp   = 200
  const subOff  = 180

  const trunk = Array.from({ length: 4 }, (_, i) =>
    cl(`${prefix}_t${i + 1}`, 2000 + dx * trunkSp * (i + 1), 2000 + dy * trunkSp * (i + 1), theme)
  )

  const tx = trunk[3].x
  const ty = trunk[3].y
  const [px, py] = dy !== 0 ? [1, 0] : [0, 1]

  const left = Array.from({ length: 3 }, (_, i) =>
    cl(`${prefix}_l${i + 1}`,
      tx + dx * subSp * (i + 1) - px * subOff * (i + 1),
      ty + dy * subSp * (i + 1) - py * subOff * (i + 1),
      theme)
  )
  const right = Array.from({ length: 3 }, (_, i) =>
    cl(`${prefix}_r${i + 1}`,
      tx + dx * subSp * (i + 1) + px * subOff * (i + 1),
      ty + dy * subSp * (i + 1) + py * subOff * (i + 1),
      theme)
  )

  return {
    nodes: [...trunk, ...left, ...right],
    edges: [
      ...chain(trunk.map(n => n.id)),
      { from: trunk[3].id, to: left[0].id },
      { from: trunk[3].id, to: right[0].id },
      ...chain(left.map(n => n.id)),
      ...chain(right.map(n => n.id)),
    ],
    firstId: trunk[0].id,
  }
}

const brN = branchArm('n', 'north',  0, -1)
const brE = branchArm('e', 'east',   1,  0)
const brS = branchArm('s', 'south',  0,  1)
const brW = branchArm('w', 'west',  -1,  0)

// Extremes: trunk = 250×4 = 1000px, sub = 200×3 = 600px from trunk end
const B_EXTENT = 250 * 4 + 200 * 3  // 1600

export const LAYOUT_B: LayoutConfig = {
  nodes: [CENTER, ...brN.nodes, ...brE.nodes, ...brS.nodes, ...brW.nodes],
  edges: [
    { from: 'center', to: brN.firstId }, { from: 'center', to: brE.firstId },
    { from: 'center', to: brS.firstId }, { from: 'center', to: brW.firstId },
    ...brN.edges, ...brE.edges, ...brS.edges, ...brW.edges,
  ],
  labels: [
    { x: 2000,                   y: 2000 - B_EXTENT - 60, theme: 'north', text: 'FUNDAMENTOS' },
    { x: 2000 + B_EXTENT + 70,   y: 1980,                 theme: 'east',  text: 'REDES'        },
    { x: 2000,                   y: 2000 + B_EXTENT + 60, theme: 'south', text: 'OWASP & WEB'  },
    { x: 2000 - B_EXTENT - 70,   y: 1980,                 theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout C: Espiral (zigzag) ────────────────────────────────────────────────
// Each arm zigzags in its cardinal direction, alternating ±offset perpendicular.
// Total: 1 center + 4×10 = 41 nodes.

const SP_C  = 175
const OFF_C = 90

function zigzagArm(prefix: string, theme: Theme, dx: number, dy: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const primary = (i + 1) * SP_C
    const perp    = (i % 2 === 0 ? 1 : -1) * OFF_C
    const x = 2000 + dx * primary + (dy !== 0 ? perp : 0)
    const y = 2000 + dy * primary + (dx !== 0 ? perp : 0)
    return cl(`${prefix}${i + 1}`, x, y, theme)
  })
  return { nodes, edges: chain(nodes.map(n => n.id)) }
}

const zigN = zigzagArm('n', 'north',  0, -1)
const zigE = zigzagArm('e', 'east',   1,  0)
const zigS = zigzagArm('s', 'south',  0,  1)
const zigW = zigzagArm('w', 'west',  -1,  0)

export const LAYOUT_C: LayoutConfig = {
  nodes: [CENTER, ...zigN.nodes, ...zigE.nodes, ...zigS.nodes, ...zigW.nodes],
  edges: [
    { from: 'center', to: 'n1' }, { from: 'center', to: 'e1' },
    { from: 'center', to: 's1' }, { from: 'center', to: 'w1' },
    ...zigN.edges, ...zigE.edges, ...zigS.edges, ...zigW.edges,
  ],
  labels: [
    { x: 2000,                  y: 2000 - SP_C * 10 - 55, theme: 'north', text: 'FUNDAMENTOS' },
    { x: 2000 + SP_C * 10 + 70, y: 1980,                  theme: 'east',  text: 'REDES'        },
    { x: 2000,                  y: 2000 + SP_C * 10 + 55, theme: 'south', text: 'OWASP & WEB'  },
    { x: 2000 - SP_C * 10 - 70, y: 1980,                  theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout D: Cruz con clusters hexagonales ───────────────────────────────────
// Each arm: 4 path (corridor) nodes + 6 cluster nodes in a hex ring.
// Cluster centers: North(2000,900) East(3100,2000) South(2000,3100) West(900,2000), r=130.
// Total: 1 center + 4×10 = 41 nodes.

export const LAYOUT_D: LayoutConfig = {
  nodes: [
    CENTER,
    // North corridor
    cl('n_p1', 2000, 1800, 'north'), cl('n_p2', 2000, 1600, 'north'),
    cl('n_p3', 2000, 1400, 'north'), cl('n_p4', 2000, 1200, 'north'),
    // North cluster (center 2000,900 r=130)
    cl('n_c1', 2000, 770,  'north'), cl('n_c2', 2113, 835,  'north'),
    cl('n_c3', 2113, 965,  'north'), cl('n_c4', 2000, 1030, 'north'),
    cl('n_c5', 1887, 965,  'north'), cl('n_c6', 1887, 835,  'north'),
    // East corridor
    cl('e_p1', 2200, 2000, 'east'), cl('e_p2', 2400, 2000, 'east'),
    cl('e_p3', 2600, 2000, 'east'), cl('e_p4', 2800, 2000, 'east'),
    // East cluster (center 3100,2000 r=130)
    cl('e_c1', 3100, 1870, 'east'), cl('e_c2', 3213, 1935, 'east'),
    cl('e_c3', 3213, 2065, 'east'), cl('e_c4', 3100, 2130, 'east'),
    cl('e_c5', 2987, 2065, 'east'), cl('e_c6', 2987, 1935, 'east'),
    // South corridor
    cl('s_p1', 2000, 2200, 'south'), cl('s_p2', 2000, 2400, 'south'),
    cl('s_p3', 2000, 2600, 'south'), cl('s_p4', 2000, 2800, 'south'),
    // South cluster (center 2000,3100 r=130)
    cl('s_c1', 2000, 2970, 'south'), cl('s_c2', 2113, 3035, 'south'),
    cl('s_c3', 2113, 3165, 'south'), cl('s_c4', 2000, 3230, 'south'),
    cl('s_c5', 1887, 3165, 'south'), cl('s_c6', 1887, 3035, 'south'),
    // West corridor
    cl('w_p1', 1800, 2000, 'west'), cl('w_p2', 1600, 2000, 'west'),
    cl('w_p3', 1400, 2000, 'west'), cl('w_p4', 1200, 2000, 'west'),
    // West cluster (center 900,2000 r=130)
    cl('w_c1', 900,  1870, 'west'), cl('w_c2', 1013, 1935, 'west'),
    cl('w_c3', 1013, 2065, 'west'), cl('w_c4', 900,  2130, 'west'),
    cl('w_c5', 787,  2065, 'west'), cl('w_c6', 787,  1935, 'west'),
  ],
  edges: [
    // Center → corridors
    { from: 'center', to: 'n_p1' }, { from: 'center', to: 'e_p1' },
    { from: 'center', to: 's_p1' }, { from: 'center', to: 'w_p1' },
    // North corridor chain
    { from: 'n_p1', to: 'n_p2' }, { from: 'n_p2', to: 'n_p3' }, { from: 'n_p3', to: 'n_p4' },
    // North: corridor → cluster (fans into 3 entry nodes)
    { from: 'n_p4', to: 'n_c4' }, { from: 'n_p4', to: 'n_c3' }, { from: 'n_p4', to: 'n_c5' },
    // North cluster ring
    { from: 'n_c1', to: 'n_c2' }, { from: 'n_c2', to: 'n_c3' }, { from: 'n_c3', to: 'n_c4' },
    { from: 'n_c4', to: 'n_c5' }, { from: 'n_c5', to: 'n_c6' }, { from: 'n_c6', to: 'n_c1' },
    // East corridor chain
    { from: 'e_p1', to: 'e_p2' }, { from: 'e_p2', to: 'e_p3' }, { from: 'e_p3', to: 'e_p4' },
    { from: 'e_p4', to: 'e_c5' }, { from: 'e_p4', to: 'e_c6' },
    { from: 'e_c1', to: 'e_c2' }, { from: 'e_c2', to: 'e_c3' }, { from: 'e_c3', to: 'e_c4' },
    { from: 'e_c4', to: 'e_c5' }, { from: 'e_c5', to: 'e_c6' }, { from: 'e_c6', to: 'e_c1' },
    // South corridor chain
    { from: 's_p1', to: 's_p2' }, { from: 's_p2', to: 's_p3' }, { from: 's_p3', to: 's_p4' },
    { from: 's_p4', to: 's_c1' }, { from: 's_p4', to: 's_c2' }, { from: 's_p4', to: 's_c6' },
    { from: 's_c1', to: 's_c2' }, { from: 's_c2', to: 's_c3' }, { from: 's_c3', to: 's_c4' },
    { from: 's_c4', to: 's_c5' }, { from: 's_c5', to: 's_c6' }, { from: 's_c6', to: 's_c1' },
    // West corridor chain
    { from: 'w_p1', to: 'w_p2' }, { from: 'w_p2', to: 'w_p3' }, { from: 'w_p3', to: 'w_p4' },
    { from: 'w_p4', to: 'w_c2' }, { from: 'w_p4', to: 'w_c3' },
    { from: 'w_c1', to: 'w_c2' }, { from: 'w_c2', to: 'w_c3' }, { from: 'w_c3', to: 'w_c4' },
    { from: 'w_c4', to: 'w_c5' }, { from: 'w_c5', to: 'w_c6' }, { from: 'w_c6', to: 'w_c1' },
  ],
  labels: [
    { x: 2000, y: 680,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3340, y: 2000, theme: 'east',  text: 'REDES'        },
    { x: 2000, y: 3340, theme: 'south', text: 'OWASP & WEB'  },
    { x: 660,  y: 2000, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout E: Combinado (una rama de cada estilo) ─────────────────────────────
// North: lineal (A) · East: bifurcaciones (B) · South: zigzag (C) · West: clusters (D)

const eLinN = linearArm('en', 'north',  0, -1)
const eBrE  = branchArm('ee', 'east',   1,  0)
const eZigS = zigzagArm('es', 'south',  0,  1)

const eClusterW_nodes: NodeData[] = [
  cl('ew_p1', 1800, 2000, 'west'), cl('ew_p2', 1600, 2000, 'west'),
  cl('ew_p3', 1400, 2000, 'west'), cl('ew_p4', 1200, 2000, 'west'),
  cl('ew_c1', 900,  1870, 'west'), cl('ew_c2', 1013, 1935, 'west'),
  cl('ew_c3', 1013, 2065, 'west'), cl('ew_c4', 900,  2130, 'west'),
  cl('ew_c5', 787,  2065, 'west'), cl('ew_c6', 787,  1935, 'west'),
]
const eClusterW_edges: EdgeData[] = [
  { from: 'ew_p1', to: 'ew_p2' }, { from: 'ew_p2', to: 'ew_p3' }, { from: 'ew_p3', to: 'ew_p4' },
  { from: 'ew_p4', to: 'ew_c2' }, { from: 'ew_p4', to: 'ew_c3' },
  { from: 'ew_c1', to: 'ew_c2' }, { from: 'ew_c2', to: 'ew_c3' }, { from: 'ew_c3', to: 'ew_c4' },
  { from: 'ew_c4', to: 'ew_c5' }, { from: 'ew_c5', to: 'ew_c6' }, { from: 'ew_c6', to: 'ew_c1' },
]

const E_EAST_EXTENT = 250 * 4 + 200 * 3  // 1600

export const LAYOUT_E: LayoutConfig = {
  nodes: [CENTER, ...eLinN.nodes, ...eBrE.nodes, ...eZigS.nodes, ...eClusterW_nodes],
  edges: [
    { from: 'center', to: 'en1'          },
    { from: 'center', to: eBrE.firstId   },
    { from: 'center', to: 'es1'          },
    { from: 'center', to: 'ew_p1'        },
    ...eLinN.edges,
    ...eBrE.edges,
    ...eZigS.edges,
    ...eClusterW_edges,
  ],
  labels: [
    { x: 2000,                     y: 2000 - SP_A * 10 - 55, theme: 'north', text: 'FUNDAMENTOS' },
    { x: 2000 + E_EAST_EXTENT + 70, y: 1980,                 theme: 'east',  text: 'REDES'        },
    { x: 2000,                     y: 2000 + SP_C * 10 + 55, theme: 'south', text: 'OWASP & WEB'  },
    { x: 660,                      y: 2000,                   theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout F: Árbol Binario ────────────────────────────────────────────────────
// Each arm: 2 trunk nodes → junction → 2 branches of 4 nodes each.
// Total: 1 center + 4×10 = 41 nodes.

function binaryArm(
  prefix: string, theme: Theme, dx: number, dy: number
): { nodes: NodeData[]; edges: EdgeData[]; firstId: string } {
  const TRUNK_SP  = 300
  const BRANCH_SP = 250
  const [px, py] = dy !== 0 ? [1, 0] : [0, 1]

  const trunk = [
    cl(`${prefix}_t1`, Math.round(2000 + dx * TRUNK_SP),     Math.round(2000 + dy * TRUNK_SP),     theme),
    cl(`${prefix}_t2`, Math.round(2000 + dx * TRUNK_SP * 2), Math.round(2000 + dy * TRUNK_SP * 2), theme),
  ]
  const jx = trunk[1].x, jy = trunk[1].y

  const left = Array.from({ length: 4 }, (_, i) =>
    cl(`${prefix}_l${i + 1}`,
      Math.round(jx + (dx - px) * BRANCH_SP * (i + 1)),
      Math.round(jy + (dy - py) * BRANCH_SP * (i + 1)),
      theme)
  )
  const right = Array.from({ length: 4 }, (_, i) =>
    cl(`${prefix}_r${i + 1}`,
      Math.round(jx + (dx + px) * BRANCH_SP * (i + 1)),
      Math.round(jy + (dy + py) * BRANCH_SP * (i + 1)),
      theme)
  )

  return {
    nodes: [...trunk, ...left, ...right],
    edges: [
      ...chain(trunk.map(n => n.id)),
      { from: trunk[1].id, to: left[0].id },
      { from: trunk[1].id, to: right[0].id },
      ...chain(left.map(n => n.id)),
      ...chain(right.map(n => n.id)),
    ],
    firstId: trunk[0].id,
  }
}

const fbN = binaryArm('fn', 'north',  0, -1)
const fbE = binaryArm('fe', 'east',   1,  0)
const fbS = binaryArm('fs', 'south',  0,  1)
const fbW = binaryArm('fw', 'west',  -1,  0)

export const LAYOUT_F: LayoutConfig = {
  nodes: [CENTER, ...fbN.nodes, ...fbE.nodes, ...fbS.nodes, ...fbW.nodes],
  edges: [
    { from: 'center', to: fbN.firstId }, { from: 'center', to: fbE.firstId },
    { from: 'center', to: fbS.firstId }, { from: 'center', to: fbW.firstId },
    ...fbN.edges, ...fbE.edges, ...fbS.edges, ...fbW.edges,
  ],
  labels: [
    { x: 2000, y: 330,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3680, y: 1980, theme: 'east',  text: 'REDES'        },
    { x: 2000, y: 3670, theme: 'south', text: 'OWASP & WEB'  },
    { x: 320,  y: 1980, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout G: Doble Hélice (DNA) ──────────────────────────────────────────────
// Each arm: 2 parallel strands of 5 nodes with ladder cross-connections.
// Total: 1 center + 4×10 = 41 nodes.

function helixArm(prefix: string, theme: Theme, dx: number, dy: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const SP  = 220
  const OFF = 65
  const [px, py] = dy !== 0 ? [1, 0] : [0, 1]

  const aNodes = Array.from({ length: 5 }, (_, i) =>
    cl(`${prefix}_a${i + 1}`,
      Math.round(2000 + dx * SP * (i + 1) - px * OFF),
      Math.round(2000 + dy * SP * (i + 1) - py * OFF),
      theme)
  )
  const bNodes = Array.from({ length: 5 }, (_, i) =>
    cl(`${prefix}_b${i + 1}`,
      Math.round(2000 + dx * SP * (i + 1) + px * OFF),
      Math.round(2000 + dy * SP * (i + 1) + py * OFF),
      theme)
  )

  return {
    nodes: [...aNodes, ...bNodes],
    edges: [
      ...chain(aNodes.map(n => n.id)),
      ...chain(bNodes.map(n => n.id)),
      ...aNodes.map((a, i) => ({ from: a.id, to: bNodes[i].id })),
    ],
  }
}

const ghN = helixArm('gn', 'north',  0, -1)
const ghE = helixArm('ge', 'east',   1,  0)
const ghS = helixArm('gs', 'south',  0,  1)
const ghW = helixArm('gw', 'west',  -1,  0)

export const LAYOUT_G: LayoutConfig = {
  nodes: [CENTER, ...ghN.nodes, ...ghE.nodes, ...ghS.nodes, ...ghW.nodes],
  edges: [
    { from: 'center', to: 'gn_a1' }, { from: 'center', to: 'gn_b1' },
    { from: 'center', to: 'ge_a1' }, { from: 'center', to: 'ge_b1' },
    { from: 'center', to: 'gs_a1' }, { from: 'center', to: 'gs_b1' },
    { from: 'center', to: 'gw_a1' }, { from: 'center', to: 'gw_b1' },
    ...ghN.edges, ...ghE.edges, ...ghS.edges, ...ghW.edges,
  ],
  labels: [
    { x: 2000, y: 830,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3180, y: 1960, theme: 'east',  text: 'REDES'        },
    { x: 2000, y: 3170, theme: 'south', text: 'OWASP & WEB'  },
    { x: 820,  y: 1960, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout H: Estallido Radial (Starburst) ────────────────────────────────────
// Each arm: 3 rays — center (4 nodes) + left/right at ±22° (3 nodes each).
// Total: 1 center + 4×10 = 41 nodes.

const RAD = Math.PI / 180

function starburstArm(
  prefix: string, theme: Theme, dx: number, dy: number
): { nodes: NodeData[]; edges: EdgeData[]; firstIds: string[] } {
  const SP    = 280
  const ANGLE = 22 * RAD
  const cos_a = Math.cos(ANGLE), sin_a = Math.sin(ANGLE)

  const cNodes = Array.from({ length: 4 }, (_, i) =>
    cl(`${prefix}_c${i + 1}`, Math.round(2000 + dx * SP * (i + 1)), Math.round(2000 + dy * SP * (i + 1)), theme)
  )

  // CW rotation by ANGLE (left ray)
  const ldx = dx * cos_a + dy * sin_a,  ldy = -dx * sin_a + dy * cos_a
  // CCW rotation by ANGLE (right ray)
  const rdx = dx * cos_a - dy * sin_a,  rdy =  dx * sin_a + dy * cos_a

  const lNodes = Array.from({ length: 3 }, (_, i) =>
    cl(`${prefix}_l${i + 1}`, Math.round(2000 + ldx * SP * (i + 1)), Math.round(2000 + ldy * SP * (i + 1)), theme)
  )
  const rNodes = Array.from({ length: 3 }, (_, i) =>
    cl(`${prefix}_r${i + 1}`, Math.round(2000 + rdx * SP * (i + 1)), Math.round(2000 + rdy * SP * (i + 1)), theme)
  )

  return {
    nodes: [...cNodes, ...lNodes, ...rNodes],
    edges: [
      ...chain(cNodes.map(n => n.id)),
      ...chain(lNodes.map(n => n.id)),
      ...chain(rNodes.map(n => n.id)),
    ],
    firstIds: [cNodes[0].id, lNodes[0].id, rNodes[0].id],
  }
}

const hsbN = starburstArm('hn', 'north',  0, -1)
const hsbE = starburstArm('he', 'east',   1,  0)
const hsbS = starburstArm('hs', 'south',  0,  1)
const hsbW = starburstArm('hw', 'west',  -1,  0)

export const LAYOUT_H: LayoutConfig = {
  nodes: [CENTER, ...hsbN.nodes, ...hsbE.nodes, ...hsbS.nodes, ...hsbW.nodes],
  edges: [
    ...hsbN.firstIds.map(id => ({ from: 'center', to: id })),
    ...hsbE.firstIds.map(id => ({ from: 'center', to: id })),
    ...hsbS.firstIds.map(id => ({ from: 'center', to: id })),
    ...hsbW.firstIds.map(id => ({ from: 'center', to: id })),
    ...hsbN.edges, ...hsbE.edges, ...hsbS.edges, ...hsbW.edges,
  ],
  labels: [
    { x: 2000, y: 800,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3220, y: 1960, theme: 'east',  text: 'REDES'        },
    { x: 2000, y: 3210, theme: 'south', text: 'OWASP & WEB'  },
    { x: 760,  y: 1960, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout I: Cuadrícula por Cuadrante ────────────────────────────────────────
// Each arm: 2 rails of 5 nodes + rungs → visible 2×5 grid per quadrant.
// Total: 1 center + 4×10 = 41 nodes.

function gridArm(prefix: string, theme: Theme, dx: number, dy: number): { nodes: NodeData[]; edges: EdgeData[] } {
  const START = 250  // push grid start away from center to avoid corner collisions
  const SP    = 200
  const OFF   = 160
  const [px, py] = dy !== 0 ? [1, 0] : [0, 1]

  const aNodes = Array.from({ length: 5 }, (_, i) =>
    cl(`${prefix}_a${i + 1}`,
      Math.round(2000 + dx * (START + SP * i) - px * OFF),
      Math.round(2000 + dy * (START + SP * i) - py * OFF),
      theme)
  )
  const bNodes = Array.from({ length: 5 }, (_, i) =>
    cl(`${prefix}_b${i + 1}`,
      Math.round(2000 + dx * (START + SP * i) + px * OFF),
      Math.round(2000 + dy * (START + SP * i) + py * OFF),
      theme)
  )

  return {
    nodes: [...aNodes, ...bNodes],
    edges: [
      ...chain(aNodes.map(n => n.id)),
      ...chain(bNodes.map(n => n.id)),
      ...aNodes.map((a, i) => ({ from: a.id, to: bNodes[i].id })),
    ],
  }
}

const grN = gridArm('in', 'north',  0, -1)
const grE = gridArm('ie', 'east',   1,  0)
const grS = gridArm('is', 'south',  0,  1)
const grW = gridArm('iw', 'west',  -1,  0)

export const LAYOUT_I: LayoutConfig = {
  nodes: [CENTER, ...grN.nodes, ...grE.nodes, ...grS.nodes, ...grW.nodes],
  edges: [
    { from: 'center', to: 'in_a1' }, { from: 'center', to: 'in_b1' },
    { from: 'center', to: 'ie_a1' }, { from: 'center', to: 'ie_b1' },
    { from: 'center', to: 'is_a1' }, { from: 'center', to: 'is_b1' },
    { from: 'center', to: 'iw_a1' }, { from: 'center', to: 'iw_b1' },
    ...grN.edges, ...grE.edges, ...grS.edges, ...grW.edges,
  ],
  labels: [
    { x: 2000, y: 870,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3140, y: 1960, theme: 'east',  text: 'REDES'        },
    { x: 2000, y: 3130, theme: 'south', text: 'OWASP & WEB'  },
    { x: 840,  y: 1960, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Layout J: Constelación ─────────────────────────────────────────────────────
// Hand-designed irregular node positions per quadrant, each forming a recognizable shape:
//   North: Diamante (diamond lattice)  ·  East: Hub-and-spoke (red topology)
//   South: Escorpión (hook chain)      ·  West: Osa Mayor (Big Dipper)

export const LAYOUT_J: LayoutConfig = {
  nodes: [
    CENTER,
    // North — Diamante
    cl('jn1',  2000, 650,  'north'),
    cl('jn2',  1800, 850,  'north'), cl('jn3',  2200, 850,  'north'),
    cl('jn4',  1650, 1100, 'north'), cl('jn5',  2000, 1050, 'north'), cl('jn6',  2350, 1100, 'north'),
    cl('jn7',  1800, 1300, 'north'), cl('jn8',  2200, 1300, 'north'),
    cl('jn9',  2000, 1480, 'north'),
    cl('jn10', 2000, 1650, 'north'),
    // East — Hub-and-spoke
    cl('je1',  2900, 2000, 'east'),
    cl('je2',  2730, 1860, 'east'), cl('je3',  2870, 1770, 'east'),
    cl('je4',  3020, 1770, 'east'), cl('je5',  3160, 1860, 'east'),
    cl('je6',  3180, 2000, 'east'), cl('je7',  3100, 2150, 'east'),
    cl('je8',  2680, 1700, 'east'), cl('je9',  3210, 1680, 'east'),
    cl('je10', 3360, 1990, 'east'),
    // South — Escorpión
    cl('js1',  2000, 2250, 'south'),
    cl('js2',  1980, 2420, 'south'),
    cl('js3',  1940, 2600, 'south'),
    cl('js4',  1960, 2780, 'south'),
    cl('js5',  2050, 2930, 'south'),
    cl('js6',  2200, 3050, 'south'),
    cl('js7',  2390, 3120, 'south'),
    cl('js8',  2570, 3070, 'south'),
    cl('js9',  2700, 2940, 'south'),
    cl('js10', 2760, 2800, 'south'),
    // West — Osa Mayor
    cl('jw1',  1820, 1950, 'west'),
    cl('jw2',  1650, 1900, 'west'),
    cl('jw3',  1630, 1760, 'west'),
    cl('jw4',  1810, 1790, 'west'),
    cl('jw5',  1710, 1650, 'west'),
    cl('jw6',  1540, 1560, 'west'),
    cl('jw7',  1380, 1530, 'west'),
    cl('jw8',  1230, 1570, 'west'),
    cl('jw9',  1130, 1680, 'west'),
    cl('jw10', 1060, 1810, 'west'),
  ],
  edges: [
    { from: 'center', to: 'jn10' },
    { from: 'center', to: 'je1'  },
    { from: 'center', to: 'js1'  },
    { from: 'center', to: 'jw1'  },
    // North diamond
    { from: 'jn1',  to: 'jn2'  }, { from: 'jn1',  to: 'jn3'  },
    { from: 'jn2',  to: 'jn4'  }, { from: 'jn2',  to: 'jn5'  },
    { from: 'jn3',  to: 'jn5'  }, { from: 'jn3',  to: 'jn6'  },
    { from: 'jn4',  to: 'jn7'  }, { from: 'jn5',  to: 'jn7'  },
    { from: 'jn5',  to: 'jn8'  }, { from: 'jn6',  to: 'jn8'  },
    { from: 'jn7',  to: 'jn9'  }, { from: 'jn8',  to: 'jn9'  },
    { from: 'jn9',  to: 'jn10' },
    // East hub-and-spoke
    { from: 'je1',  to: 'je2'  }, { from: 'je1',  to: 'je3'  },
    { from: 'je1',  to: 'je4'  }, { from: 'je1',  to: 'je5'  },
    { from: 'je1',  to: 'je6'  }, { from: 'je1',  to: 'je7'  },
    { from: 'je2',  to: 'je8'  },
    { from: 'je4',  to: 'je9'  },
    { from: 'je6',  to: 'je10' },
    // South scorpion chain
    { from: 'js1',  to: 'js2'  }, { from: 'js2',  to: 'js3'  },
    { from: 'js3',  to: 'js4'  }, { from: 'js4',  to: 'js5'  },
    { from: 'js5',  to: 'js6'  }, { from: 'js6',  to: 'js7'  },
    { from: 'js7',  to: 'js8'  }, { from: 'js8',  to: 'js9'  },
    { from: 'js9',  to: 'js10' },
    // West big dipper — cup (closed) + handle
    { from: 'jw1',  to: 'jw2'  }, { from: 'jw2',  to: 'jw3'  },
    { from: 'jw3',  to: 'jw4'  }, { from: 'jw4',  to: 'jw1'  },
    { from: 'jw4',  to: 'jw5'  },
    { from: 'jw5',  to: 'jw6'  }, { from: 'jw6',  to: 'jw7'  },
    { from: 'jw7',  to: 'jw8'  }, { from: 'jw8',  to: 'jw9'  },
    { from: 'jw9',  to: 'jw10' },
  ],
  labels: [
    { x: 2000, y: 580,  theme: 'north', text: 'FUNDAMENTOS' },
    { x: 3480, y: 2000, theme: 'east',  text: 'REDES'        },
    { x: 2500, y: 3210, theme: 'south', text: 'OWASP & WEB'  },
    { x: 920,  y: 1760, theme: 'west',  text: 'AVANZADO'     },
  ],
}

// ── Registry ──────────────────────────────────────────────────────────────────

export const LAYOUTS: Record<LayoutId, LayoutConfig> = {
  A: LAYOUT_A,
  B: LAYOUT_B,
  C: LAYOUT_C,
  D: LAYOUT_D,
  E: LAYOUT_E,
  F: LAYOUT_F,
  G: LAYOUT_G,
  H: LAYOUT_H,
  I: LAYOUT_I,
  J: LAYOUT_J,
}
