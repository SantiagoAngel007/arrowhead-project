// preview-shapes.mjs — preview de shapes antes de implementar en layouts.ts
// Uso: node preview-shapes.mjs

const W = 100, H = 50

// ── Canvas helpers ─────────────────────────────────────────────────────────────

function makeCanvas(nodes) {
  const xs = nodes.map(n => n.x), ys = nodes.map(n => n.y)
  const minX = Math.min(...xs) - 50, maxX = Math.max(...xs) + 50
  const minY = Math.min(...ys) - 35, maxY = Math.max(...ys) + 35
  const sx = (W - 1) / (maxX - minX)
  const sy = (H - 1) / (maxY - minY)
  const toC = ({x, y}) => ({ cx: Math.round((x-minX)*sx), cy: Math.round((y-minY)*sy) })
  return { sx, sy, toC }
}

function line(cv, x0, y0, x1, y1, ch = '-') {
  const dx = Math.abs(x1-x0), dy = Math.abs(y1-y0)
  const sx = x0<x1?1:-1, sy = y0<y1?1:-1
  let err = dx - dy
  while (true) {
    if (x0>=0&&x0<W&&y0>=0&&y0<H && cv[y0][x0]===' ') cv[y0][x0] = ch
    if (x0===x1&&y0===y1) break
    const e2 = 2*err
    if (e2 > -dy) { err -= dy; x0 += sx }
    if (e2 <  dx) { err += dx; y0 += sy }
  }
}

function show(title, nodes, edges) {
  const { toC } = makeCanvas(nodes)
  const cv = Array.from({ length: H }, () => Array(W).fill(' '))

  // draw edges first (so nodes render on top)
  for (const [a, b] of edges) {
    const {cx:x0,cy:y0} = toC(nodes[a])
    const {cx:x1,cy:y1} = toC(nodes[b])
    line(cv, x0, y0, x1, y1, '·')
  }
  // draw nodes on top
  for (const n of nodes) {
    const {cx,cy} = toC(n)
    if (cx>=0&&cx<W&&cy>=0&&cy<H) cv[cy][cx] = 'O'
  }

  const bar = '─'.repeat(W+2)
  console.log(`\n  ┌${bar}┐`)
  console.log(`  │  \x1b[1m${title}\x1b[0m${' '.repeat(Math.max(0,W-title.length))}  │`)
  console.log(`  ├${bar}┤`)
  for (const row of cv) console.log(`  │ ${row.join('')} │`)
  console.log(`  └${bar}┘`)
  console.log(`     ${nodes.length} nodos, ${edges.length} aristas`)
}

// ── CALAVERA (50 nodos) ────────────────────────────────────────────────────────
//
// Índices:
//  0-12  arco superior del cráneo
//  13-16 lados inferiores
//  17-18 mejillas
//  19-20 mandíbula izq  /  21-22 mandíbula der
//  23-24 mandíbula central
//  25-29 ojo izquierdo   /  30-34 ojo derecho
//  35-37 nariz
//  38-46 dientes (zigzag)
//  47-49 frente interior

const skullNodes = [
  /* 0*/ {x:1720,y:1900}, /* 1*/ {x:1730,y:1820}, /* 2*/ {x:1760,y:1745},
  /* 3*/ {x:1810,y:1680}, /* 4*/ {x:1875,y:1630}, /* 5*/ {x:1950,y:1605},
  /* 6*/ {x:2000,y:1600}, /* 7*/ {x:2050,y:1605}, /* 8*/ {x:2125,y:1630},
  /* 9*/ {x:2190,y:1680}, /*10*/ {x:2240,y:1745}, /*11*/ {x:2270,y:1820},
  /*12*/ {x:2280,y:1900},
  /*13*/ {x:1710,y:1975}, /*14*/ {x:1720,y:2050},
  /*15*/ {x:2290,y:1975}, /*16*/ {x:2280,y:2050},
  /*17*/ {x:1745,y:2115}, /*18*/ {x:2255,y:2115},
  /*19*/ {x:1780,y:2170}, /*20*/ {x:1830,y:2225},
  /*21*/ {x:2220,y:2170}, /*22*/ {x:2170,y:2225},
  /*23*/ {x:1910,y:2235}, /*24*/ {x:2090,y:2235},
  /*25*/ {x:1800,y:1785}, /*26*/ {x:1845,y:1748}, /*27*/ {x:1900,y:1763},
  /*28*/ {x:1908,y:1823}, /*29*/ {x:1855,y:1852},
  /*30*/ {x:2060,y:1785}, /*31*/ {x:2105,y:1748}, /*32*/ {x:2160,y:1763},
  /*33*/ {x:2168,y:1823}, /*34*/ {x:2115,y:1852},
  /*35*/ {x:1972,y:1968}, /*36*/ {x:2028,y:1968}, /*37*/ {x:2000,y:2015},
  /*38*/ {x:1840,y:2242}, /*39*/ {x:1883,y:2278}, /*40*/ {x:1930,y:2242},
  /*41*/ {x:1975,y:2278}, /*42*/ {x:2000,y:2242}, /*43*/ {x:2025,y:2278},
  /*44*/ {x:2070,y:2242}, /*45*/ {x:2117,y:2278}, /*46*/ {x:2160,y:2242},
  /*47*/ {x:2000,y:1672}, /*48*/ {x:1952,y:1758}, /*49*/ {x:2048,y:1758},
]

const skullEdges = [
  // Arco cráneo
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],
  // Lados izq
  [0,13],[13,14],[14,17],[17,19],[19,20],
  // Lados der
  [12,15],[15,16],[16,18],[18,21],[21,22],
  // Mandíbula
  [20,23],[23,38],[38,39],[39,40],[40,41],[41,42],[42,43],[43,44],[44,45],[45,46],[46,24],[24,22],
  // Ojo izq
  [25,26],[26,27],[27,28],[28,29],[29,25],
  // Ojo der
  [30,31],[31,32],[32,33],[33,34],[34,30],
  // Nariz
  [35,37],[36,37],
  // Frente
  [6,47],[47,5],[47,7],[1,48],[2,48],[11,49],[10,49],
]

show('CALAVERA (50 nodos)', skullNodes, skullEdges)
