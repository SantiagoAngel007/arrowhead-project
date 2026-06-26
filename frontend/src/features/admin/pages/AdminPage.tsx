import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

// ─── Palette ──────────────────────────────────────────────────────────────────

const C = {
  bg:          '#f5f4f0',
  sidebar:     '#ffffff',
  card:        '#ffffff',
  border:      '#dedad2',
  borderLight: '#eceae3',
  text:        '#0e180e',
  textSub:     '#546054',
  textMuted:   '#9aaa98',
  accent:      '#166534',
  accentBg:    '#f0faf3',
  accentLight: '#d1fae5',
  danger:      '#991b1b',
  dangerBg:    '#fef2f2',
  warning:     '#92400e',
  warningBg:   '#fffbeb',
  gold:        '#b45309',
  silver:      '#6b7280',
  bronze:      '#92400e',
  marble:      'linear-gradient(135deg, #ffffff 0%, #f5f4f0 40%, #ece9e1 100%)',
}

// ─── Mock data ────────────────────────────────────────────────────────────────

interface User {
  id: number
  alias: string
  email: string
  role: 'player' | 'admin'
  status: 'active' | 'inactive'
  score: number
  completed: number
  joinedAt: string
}

const INITIAL_USERS: User[] = [
  { id: 1, alias: 'h4x0r_prime',  email: 'haxor@icesi.edu.co',   role: 'player', status: 'active',   score: 980, completed: 3, joinedAt: '2026-06-20 09:14' },
  { id: 2, alias: 'CipherGhost',  email: 'cipher@icesi.edu.co',  role: 'player', status: 'active',   score: 870, completed: 3, joinedAt: '2026-06-20 09:21' },
  { id: 3, alias: 'n3t_wr4ith',   email: 'nwraith@icesi.edu.co', role: 'player', status: 'active',   score: 760, completed: 2, joinedAt: '2026-06-20 09:18' },
  { id: 4, alias: 'ByteBreaker',  email: 'byte@icesi.edu.co',    role: 'player', status: 'active',   score: 650, completed: 2, joinedAt: '2026-06-20 09:30' },
  { id: 5, alias: 'ZeroDay_X',    email: 'zero@icesi.edu.co',    role: 'player', status: 'inactive', score: 540, completed: 2, joinedAt: '2026-06-20 09:45' },
  { id: 6, alias: 'ShadowPing',   email: 'shadow@icesi.edu.co',  role: 'player', status: 'active',   score: 430, completed: 1, joinedAt: '2026-06-20 10:02' },
  { id: 7, alias: 'Mal_Hunter',   email: 'mal@icesi.edu.co',     role: 'player', status: 'active',   score: 320, completed: 1, joinedAt: '2026-06-20 10:15' },
  { id: 8, alias: 'r00t_canal',   email: 'root@icesi.edu.co',    role: 'player', status: 'inactive', score: 210, completed: 1, joinedAt: '2026-06-20 10:28' },
  { id: 9, alias: 'admin_icesi',  email: 'admin@icesi.edu.co',   role: 'admin',  status: 'active',   score: 0,   completed: 0, joinedAt: '2026-06-19 08:00' },
]

interface Challenge {
  id: number
  name: string
  level: string
  color: string
  dark: string
  enabled: boolean
  completions: number
  totalPlayers: number
}

const INITIAL_CHALLENGES: Challenge[] = [
  { id: 1, name: 'Cuestionario de Iniciación', level: 'INICIACIÓN',  color: '#d1fae5', dark: '#166534', enabled: true,  completions: 8, totalPlayers: 8 },
  { id: 2, name: 'Análisis de Tráfico',        level: 'EXPLORACIÓN', color: '#e0f2fe', dark: '#0369a1', enabled: true,  completions: 5, totalPlayers: 8 },
  { id: 3, name: 'Defensa y Ataque Activa',    level: 'DESAFÍO',     color: '#ffedd5', dark: '#c2410c', enabled: true,  completions: 3, totalPlayers: 8 },
  { id: 4, name: 'Detección de Fraude',        level: 'EXPLORACIÓN', color: '#f3e8ff', dark: '#7e22ce', enabled: false, completions: 0, totalPlayers: 8 },
]

const ACTIVITY_LOG = [
  { id: 1,  time: '10:31:04', user: 'h4x0r_prime', action: 'Completó', target: 'Defensa y Ataque Activa',    points: '+350', type: 'success' },
  { id: 2,  time: '10:28:47', user: 'CipherGhost', action: 'Completó', target: 'Análisis de Tráfico',        points: '+280', type: 'success' },
  { id: 3,  time: '10:25:12', user: 'n3t_wr4ith',  action: 'Completó', target: 'Análisis de Tráfico',        points: '+280', type: 'success' },
  { id: 4,  time: '10:18:33', user: 'ByteBreaker', action: 'Falló',    target: 'Defensa y Ataque Activa',    points: '-10',  type: 'error'   },
  { id: 5,  time: '10:14:05', user: 'ZeroDay_X',   action: 'Completó', target: 'Cuestionario de Iniciación', points: '+200', type: 'success' },
  { id: 6,  time: '10:09:21', user: 'ShadowPing',  action: 'Completó', target: 'Cuestionario de Iniciación', points: '+200', type: 'success' },
  { id: 7,  time: '10:02:58', user: 'r00t_canal',  action: 'Se unió',  target: 'plataforma',                 points: '+0',   type: 'info'    },
  { id: 8,  time: '09:58:41', user: 'Mal_Hunter',  action: 'Falló',    target: 'Análisis de Tráfico',        points: '-10',  type: 'error'   },
  { id: 9,  time: '09:51:17', user: 'h4x0r_prime', action: 'Completó', target: 'Análisis de Tráfico',        points: '+280', type: 'success' },
  { id: 10, time: '09:44:03', user: 'CipherGhost', action: 'Completó', target: 'Cuestionario de Iniciación', points: '+200', type: 'success' },
]

const logColor = (type: string) =>
  type === 'success' ? C.accent : type === 'error' ? C.danger : C.warning

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = 'dashboard' | 'usuarios' | 'timer' | 'ranking' | 'retos' | 'actividad'

const NAV: { id: Section; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: '▦' },
  { id: 'usuarios',  label: 'Usuarios',   icon: '◈' },
  { id: 'timer',     label: 'Timer CTF',  icon: '◎' },
  { id: 'ranking',   label: 'Ranking',    icon: '◆' },
  { id: 'retos',     label: 'Retos',      icon: '◉' },
  { id: 'actividad', label: 'Actividad',  icon: '≡' },
]

const EMPTY_USER = { alias: '', email: '', role: 'player' as User['role'], status: 'active' as User['status'] }

// ─── Main component ───────────────────────────────────────────────────────────

export function AdminPage() {
  const navigate = useNavigate()
  const [section, setSection] = useState<Section>('dashboard')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '"Courier New", Consolas, monospace', background: C.bg, color: C.text }}>

      {/* Sidebar */}
      <aside style={{ width: 210, background: C.sidebar, borderRight: `1px solid ${C.border}`, display: 'flex', flexDirection: 'column', flexShrink: 0, position: 'sticky', top: 0, height: '100vh', boxShadow: '2px 0 8px rgba(0,0,0,0.06)' }}>

        {/* Logo */}
        <div style={{ padding: '20px 16px 16px', borderBottom: `1px solid ${C.borderLight}`, background: C.marble }}>
          <div style={{ color: C.accent, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em' }}>ARROWHEAD</div>
          <div style={{ color: C.textMuted, fontSize: 8, letterSpacing: '0.18em', marginTop: 3 }}>PANEL DE ADMINISTRACIÓN</div>
          <div style={{ marginTop: 10, height: 1, background: `linear-gradient(to right, ${C.accent}44, transparent)` }} />
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '10px 0' }}>
          {NAV.map(item => {
            const active = section === item.id
            return (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', background: active ? C.accentBg : 'transparent', border: 'none', borderLeft: active ? `3px solid ${C.accent}` : '3px solid transparent', color: active ? C.accent : C.textSub, cursor: 'pointer', fontFamily: 'inherit', fontSize: 10, letterSpacing: '0.14em', textAlign: 'left', transition: 'all 0.15s', fontWeight: active ? 700 : 400 }}
              >
                <span style={{ fontSize: 11, opacity: active ? 1 : 0.6 }}>{item.icon}</span>
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Exit */}
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${C.borderLight}` }}>
          <div style={{ color: C.textMuted, fontSize: 8, letterSpacing: '0.12em', marginBottom: 8 }}>SESIÓN ACTIVA</div>
          <div style={{ color: C.accent, fontSize: 9, fontWeight: 700, marginBottom: 10 }}>admin_icesi</div>
          <button
            onClick={() => navigate('/admin/login')}
            style={{ width: '100%', background: 'transparent', border: `1px solid ${C.border}`, color: C.textSub, padding: '7px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.12em', transition: 'all 0.15s' }}
          >
            ← SALIR
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* Topbar */}
        <div style={{ borderBottom: `1px solid ${C.border}`, background: C.sidebar, padding: '10px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 9, position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: C.textMuted, letterSpacing: '0.12em' }}>ADMIN</span>
            <span style={{ color: C.textMuted }}>/</span>
            <span style={{ color: C.accent, fontWeight: 700, letterSpacing: '0.14em' }}>{NAV.find(n => n.id === section)?.label.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', gap: 20, color: C.textMuted, fontSize: 8 }}>
            <span><span style={{ color: C.accent, fontWeight: 700 }}>●</span> SISTEMA ACTIVO</span>
            <span><span style={{ color: C.accent, fontWeight: 700 }}>●</span> RED SEGURA</span>
            <span style={{ color: C.textSub, fontWeight: 600 }}>ICESI CTF — 2026</span>
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24 }}>
          {section === 'dashboard' && <DashboardSection onNavigate={setSection} />}
          {section === 'usuarios'  && <UsuariosSection />}
          {section === 'timer'     && <TimerSection />}
          {section === 'ranking'   && <RankingSection />}
          {section === 'retos'     && <RetosSection />}
          {section === 'actividad' && <ActividadSection />}
        </div>
      </main>
    </div>
  )
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const stats = [
    { label: 'Participantes',    value: '8',   sub: '1 admin registrado',  accent: C.accent,  bg: C.accentBg,  section: 'usuarios'  as Section },
    { label: 'Retos Activos',    value: '3',   sub: '1 deshabilitado',     accent: '#0369a1', bg: '#f0f9ff',   section: 'retos'     as Section },
    { label: 'Completaciones',   value: '16',  sub: 'total acumulado',     accent: C.gold,    bg: C.warningBg, section: 'ranking'   as Section },
    { label: 'Puntaje Promedio', value: '540', sub: 'pts por jugador',     accent: C.danger,  bg: C.dangerBg,  section: 'ranking'   as Section },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <SectionHeader title="Dashboard" sub="Resumen general del estado del CTF" />

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {stats.map(s => (
          <div key={s.label} onClick={() => onNavigate(s.section)} style={{ background: s.bg, border: `1px solid ${s.accent}22`, padding: '18px 16px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ color: s.accent, fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ color: s.accent, fontSize: 8, fontWeight: 700, letterSpacing: '0.18em', marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
            <div style={{ color: s.accent, fontSize: 8, marginTop: 3, opacity: 0.6 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Top jugadores */}
        <Card title="TOP JUGADORES" action={{ label: 'VER TODO →', onClick: () => onNavigate('ranking') }}>
          {INITIAL_USERS.filter(u => u.role === 'player').sort((a, b) => b.score - a.score).slice(0, 5).map((u, i) => {
            const medal = i === 0 ? C.gold : i === 1 ? C.silver : i === 2 ? C.bronze : C.textMuted
            return (
              <div key={u.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px solid ${C.borderLight}` }}>
                <span style={{ color: medal, fontSize: 10, fontWeight: 700, minWidth: 22 }}>#{i + 1}</span>
                <span style={{ color: C.text, fontSize: 10, flex: 1, fontWeight: 600 }}>{u.alias}</span>
                <span style={{ color: C.accent, fontSize: 10, fontWeight: 700 }}>{u.score} pts</span>
              </div>
            )
          })}
        </Card>

        {/* Actividad reciente */}
        <Card title="ACTIVIDAD RECIENTE" action={{ label: 'VER TODO →', onClick: () => onNavigate('actividad') }}>
          {ACTIVITY_LOG.slice(0, 5).map(e => (
            <div key={e.id} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: `1px solid ${C.borderLight}`, alignItems: 'center' }}>
              <span style={{ color: C.textMuted, fontSize: 8, minWidth: 52, fontFamily: 'monospace' }}>{e.time}</span>
              <span style={{ color: C.textSub, fontSize: 9, flex: 1 }}><span style={{ color: C.text, fontWeight: 600 }}>{e.user}</span> {e.action}</span>
              <span style={{ color: logColor(e.type), fontSize: 9, fontWeight: 700 }}>{e.points}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Progreso por reto */}
      <Card title="PROGRESO POR RETO">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {INITIAL_CHALLENGES.map(c => {
            const pct = Math.round((c.completions / c.totalPlayers) * 100)
            return (
              <div key={c.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: c.enabled ? c.dark : C.textMuted, fontSize: 10, fontWeight: 700 }}>{c.name}</span>
                    {!c.enabled && <span style={{ background: C.dangerBg, color: C.danger, padding: '1px 6px', fontSize: 7, fontWeight: 700, letterSpacing: '0.1em' }}>DESHABILITADO</span>}
                  </div>
                  <span style={{ color: C.textSub, fontSize: 9 }}>{c.completions}/{c.totalPlayers} ({pct}%)</span>
                </div>
                <div style={{ height: 5, background: C.borderLight, borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: c.enabled ? c.dark : C.textMuted, borderRadius: 3, transition: 'width 0.4s' }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ─── Usuarios ─────────────────────────────────────────────────────────────────

function UsuariosSection() {
  const [users, setUsers]       = useState<User[]>(INITIAL_USERS)
  const [modal, setModal]       = useState<'add' | 'edit' | null>(null)
  const [selected, setSelected] = useState<User | null>(null)
  const [form, setForm]         = useState<typeof EMPTY_USER>({ ...EMPTY_USER })
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [filter, setFilter]     = useState<'all' | 'player' | 'admin'>('all')

  const openAdd  = () => { setForm({ ...EMPTY_USER }); setModal('add') }
  const openEdit = (u: User) => { setSelected(u); setForm({ alias: u.alias, email: u.email, role: u.role, status: u.status }); setModal('edit') }

  const save = () => {
    if (!form.alias.trim() || !form.email.trim()) return
    if (modal === 'add') {
      const newUser: User = { ...form, id: Date.now(), score: 0, completed: 0, joinedAt: new Date().toISOString().slice(0, 16).replace('T', ' ') }
      setUsers(prev => [...prev, newUser])
    } else if (modal === 'edit' && selected) {
      setUsers(prev => prev.map(u => u.id === selected.id ? { ...u, ...form } : u))
    }
    setModal(null)
  }

  const remove = (id: number) => { setUsers(prev => prev.filter(u => u.id !== id)); setDeleteId(null) }
  const visible = users.filter(u => filter === 'all' || u.role === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader title="Gestión de Usuarios" sub="Administra los participantes del evento" />

      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <FilterTabs
          options={[{ value: 'all', label: 'TODOS' }, { value: 'player', label: 'JUGADORES' }, { value: 'admin', label: 'ADMINS' }]}
          active={filter}
          onChange={v => setFilter(v as typeof filter)}
        />
        <div style={{ marginLeft: 'auto' }}>
          <Btn color={C.accent} onClick={openAdd}>+ AGREGAR USUARIO</Btn>
        </div>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, overflow: 'auto', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10, minWidth: 720 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}`, background: C.bg }}>
              {['#', 'Alias', 'Email', 'Rol', 'Estado', 'Puntos', 'Retos', 'Ingreso', 'Acciones'].map(h => (
                <th key={h} style={{ padding: '10px 12px', color: C.textSub, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((u, i) => (
              <tr key={u.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '10px 12px', color: C.textMuted }}>{i + 1}</td>
                <td style={{ padding: '10px 12px', color: C.text, fontWeight: 700 }}>{u.alias}</td>
                <td style={{ padding: '10px 12px', color: C.textSub }}>{u.email}</td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ background: u.role === 'admin' ? '#f3e8ff' : C.accentLight, color: u.role === 'admin' ? '#7e22ce' : C.accent, padding: '2px 8px', fontSize: 8, fontWeight: 700, letterSpacing: '0.1em' }}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: u.status === 'active' ? C.accent : C.danger, fontSize: 9, fontWeight: 600 }}>
                    <span style={{ fontSize: 7 }}>●</span>
                    {u.status === 'active' ? 'ACTIVO' : 'INACTIVO'}
                  </span>
                </td>
                <td style={{ padding: '10px 12px', color: C.accent, fontWeight: 700 }}>{u.score}</td>
                <td style={{ padding: '10px 12px', color: C.textSub }}>{u.completed}/3</td>
                <td style={{ padding: '10px 12px', color: C.textMuted, fontSize: 8, whiteSpace: 'nowrap' }}>{u.joinedAt}</td>
                <td style={{ padding: '10px 12px' }}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => openEdit(u)} style={{ background: C.accentBg, border: `1px solid ${C.accent}44`, color: C.accent, padding: '4px 10px', fontSize: 8, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.08em' }}>EDITAR</button>
                    <button onClick={() => setDeleteId(u.id)} style={{ background: C.dangerBg, border: `1px solid ${C.danger}44`, color: C.danger, padding: '4px 10px', fontSize: 8, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, letterSpacing: '0.08em' }}>ELIMINAR</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ color: C.textMuted, fontSize: 8, letterSpacing: '0.1em' }}>
        {visible.length} usuario(s) — {users.filter(u => u.status === 'active').length} activos en total
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'AGREGAR USUARIO' : 'EDITAR USUARIO'} onClose={() => setModal(null)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FormField label="Alias"  value={form.alias} onChange={v => setForm(f => ({ ...f, alias: v }))} />
            <FormField label="Email"  value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} type="email" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ color: C.textSub, fontSize: 8, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>ROL</label>
                <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value as User['role'] }))} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: '8px 10px', fontSize: 10, fontFamily: 'inherit' }}>
                  <option value="player">player</option>
                  <option value="admin">admin</option>
                </select>
              </div>
              <div>
                <label style={{ color: C.textSub, fontSize: 8, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>ESTADO</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as User['status'] }))} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: '8px 10px', fontSize: 10, fontFamily: 'inherit' }}>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
              <Btn color={C.textSub} onClick={() => setModal(null)}>CANCELAR</Btn>
              <Btn color={C.accent} onClick={save}>GUARDAR</Btn>
            </div>
          </div>
        </Modal>
      )}

      {deleteId !== null && (
        <Modal title="CONFIRMAR ELIMINACIÓN" onClose={() => setDeleteId(null)}>
          <p style={{ color: C.textSub, fontSize: 10, lineHeight: 1.7, marginBottom: 20 }}>
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer.
          </p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <Btn color={C.textSub} onClick={() => setDeleteId(null)}>CANCELAR</Btn>
            <Btn color={C.danger}  onClick={() => remove(deleteId)}>ELIMINAR</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── Timer ────────────────────────────────────────────────────────────────────

function TimerSection() {
  const [totalSeconds, setTotalSeconds] = useState(60 * 60)
  const [running, setRunning]           = useState(false)
  const [inputH, setInputH]             = useState('1')
  const [inputM, setInputM]             = useState('0')
  const [inputS, setInputS]             = useState('0')
  const [adjustVal, setAdjustVal]       = useState('5')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTotalSeconds(s => { if (s <= 0) { setRunning(false); return 0 } return s - 1 })
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running])

  const fmt = (s: number) => ({
    h:   String(Math.floor(s / 3600)).padStart(2, '0'),
    m:   String(Math.floor((s % 3600) / 60)).padStart(2, '0'),
    sec: String(s % 60).padStart(2, '0'),
  })

  const applyTime = () => {
    const secs = (parseInt(inputH)||0)*3600 + (parseInt(inputM)||0)*60 + (parseInt(inputS)||0)
    if (secs > 0) { setTotalSeconds(secs); setRunning(false) }
  }
  const adjust = (sign: 1 | -1) => setTotalSeconds(s => Math.max(0, s + sign * (parseInt(adjustVal)||0) * 60))

  const t = fmt(totalSeconds)
  const statusColor = totalSeconds === 0 ? C.danger : totalSeconds < 300 ? C.danger : totalSeconds < 900 ? C.warning : C.accent
  const statusLabel = running ? '● CONTADOR ACTIVO' : totalSeconds === 0 ? '■ TIEMPO AGOTADO' : '■ EN ESPERA'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
      <SectionHeader title="Timer CTF" sub="Controla el tiempo del evento en tiempo real" />

      {/* Display */}
      <div style={{ background: C.text, padding: '36px 28px', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
        <div style={{ color: statusColor, fontSize: 9, fontWeight: 700, letterSpacing: '0.35em', marginBottom: 20 }}>
          {statusLabel}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: 4 }}>
          {[t.h, ':', t.m, ':', t.sec].map((seg, i) => (
            <span key={i} style={{ color: i % 2 === 1 ? statusColor : '#ffffff', fontSize: i % 2 === 1 ? 52 : 88, fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 1, opacity: i % 2 === 1 ? 0.35 : 1 }}>{seg}</span>
          ))}
        </div>
        <div style={{ marginTop: 24, height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
          <div style={{ height: '100%', width: `${Math.min(100, (totalSeconds / 3600) * 100)}%`, background: statusColor, borderRadius: 2, transition: 'width 1s linear, background 0.3s' }} />
        </div>
        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 8, letterSpacing: '0.2em', marginTop: 10 }}>
          ARROWHEAD CTF — ICESI 2026
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Control */}
        <Card title="CONTROL PRINCIPAL">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Btn color={running ? C.danger : C.accent} onClick={() => setRunning(r => !r)} fullWidth>
              {running ? '■ DETENER CONTADOR' : '▶ INICIAR CONTADOR'}
            </Btn>
            <Btn color={C.textSub} onClick={() => { setRunning(false); setTotalSeconds(0) }} fullWidth>
              ↺ RESETEAR A CERO
            </Btn>
          </div>
        </Card>

        {/* Ajuste */}
        <Card title="AJUSTAR TIEMPO">
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <input
              type="number" value={adjustVal} onChange={e => setAdjustVal(e.target.value)} min="1"
              style={{ flex: 1, background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: '8px', fontSize: 20, fontFamily: 'inherit', textAlign: 'center', fontWeight: 700 }}
            />
            <span style={{ color: C.textMuted, fontSize: 9 }}>min</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            <Btn color={C.accent}  onClick={() => adjust(1)}>+ AÑADIR</Btn>
            <Btn color={C.warning} onClick={() => adjust(-1)}>− REDUCIR</Btn>
          </div>
        </Card>
      </div>

      {/* Set time */}
      <Card title="ESTABLECER TIEMPO PERSONALIZADO">
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          {([['Horas', inputH, setInputH], ['Minutos', inputM, setInputM], ['Segundos', inputS, setInputS]] as [string, string, (v: string) => void][]).map(([label, val, setter]) => (
            <div key={label} style={{ flex: 1 }}>
              <label style={{ color: C.textSub, fontSize: 8, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
              <input
                type="number" value={val} onChange={e => setter(e.target.value)} min="0"
                style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: '10px', fontSize: 22, fontFamily: 'inherit', textAlign: 'center', fontWeight: 700, boxSizing: 'border-box' }}
              />
            </div>
          ))}
          <Btn color={C.accent} onClick={applyTime}>APLICAR</Btn>
        </div>
      </Card>
    </div>
  )
}

// ─── Ranking ──────────────────────────────────────────────────────────────────

function RankingSection() {
  const sorted = [...INITIAL_USERS].filter(u => u.role === 'player').sort((a, b) => b.score - a.score)
  const max    = sorted[0]?.score || 1

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader title="Ranking Global" sub="Clasificación general de todos los participantes" />

      <div style={{ background: C.card, border: `1px solid ${C.border}`, overflow: 'auto', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}`, background: C.bg }}>
              {['Pos', 'Alias', 'Email', 'Retos', 'Puntos', 'Progreso relativo'].map(h => (
                <th key={h} style={{ padding: '10px 14px', color: C.textSub, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((u, i) => {
              const medal = i === 0 ? C.gold : i === 1 ? C.silver : i === 2 ? C.bronze : C.textMuted
              return (
                <tr key={u.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ color: medal, fontWeight: 900, fontSize: i < 3 ? 15 : 11 }}>#{i + 1}</span>
                  </td>
                  <td style={{ padding: '12px 14px', color: C.text, fontWeight: 700 }}>{u.alias}</td>
                  <td style={{ padding: '12px 14px', color: C.textSub, fontSize: 9 }}>{u.email}</td>
                  <td style={{ padding: '12px 14px', color: C.textSub }}>{u.completed}/3</td>
                  <td style={{ padding: '12px 14px', color: C.accent, fontWeight: 900, fontSize: 14 }}>{u.score}</td>
                  <td style={{ padding: '12px 14px', minWidth: 200 }}>
                    <div style={{ height: 5, background: C.borderLight, borderRadius: 3 }}>
                      <div style={{ height: '100%', width: `${(u.score / max) * 100}%`, background: i === 0 ? C.gold : C.accent, borderRadius: 3 }} />
                    </div>
                    <div style={{ color: C.textMuted, fontSize: 8, marginTop: 4 }}>{Math.round((u.score / max) * 100)}% del líder</div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ color: C.textMuted, fontSize: 8, letterSpacing: '0.1em' }}>
        Total en competencia: {sorted.reduce((a, u) => a + u.score, 0)} pts — Promedio: {Math.round(sorted.reduce((a, u) => a + u.score, 0) / sorted.length)} pts/jugador
      </div>
    </div>
  )
}

// ─── Retos ────────────────────────────────────────────────────────────────────

function RetosSection() {
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES)
  const toggle = (id: number) => setChallenges(prev => prev.map(c => c.id === id ? { ...c, enabled: !c.enabled } : c))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader title="Gestión de Retos" sub="Habilita o deshabilita retos durante el evento" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {challenges.map(c => {
          const pct = Math.round((c.completions / c.totalPlayers) * 100)
          return (
            <div key={c.id} style={{ background: c.enabled ? c.color : C.card, border: `1px solid ${c.enabled ? c.dark + '33' : C.border}`, padding: '18px 20px', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ color: c.enabled ? c.dark : C.textMuted, fontSize: 11, fontWeight: 700 }}>{c.name}</span>
                    <span style={{ background: c.enabled ? c.dark : C.textMuted, color: '#fff', padding: '1px 8px', fontSize: 7, fontWeight: 700, letterSpacing: '0.12em' }}>{c.level}</span>
                    {!c.enabled && <span style={{ background: C.dangerBg, color: C.danger, padding: '1px 8px', fontSize: 7, fontWeight: 700 }}>DESHABILITADO</span>}
                  </div>
                  <div style={{ display: 'flex', gap: 18, fontSize: 9, color: C.textSub, marginBottom: 10 }}>
                    <span>{c.completions} completaciones</span>
                    <span>{c.totalPlayers - c.completions} pendientes</span>
                    <span>{pct}% tasa de éxito</span>
                  </div>
                  <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 3 }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: c.enabled ? c.dark : C.textMuted, borderRadius: 3, transition: 'width 0.4s' }} />
                  </div>
                </div>
                <button
                  onClick={() => toggle(c.id)}
                  style={{ background: c.enabled ? C.dangerBg : C.accentBg, border: `1px solid ${c.enabled ? C.danger + '66' : C.accent + '66'}`, color: c.enabled ? C.danger : C.accent, padding: '9px 18px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.12em', fontWeight: 700, flexShrink: 0, transition: 'all 0.15s' }}
                >
                  {c.enabled ? '■ DESHABILITAR' : '▶ HABILITAR'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Actividad ────────────────────────────────────────────────────────────────

function ActividadSection() {
  const [filter, setFilter] = useState<'all' | 'Completó' | 'Falló' | 'Se unió'>('all')
  const visible = ACTIVITY_LOG.filter(e => filter === 'all' || e.action === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionHeader title="Log de Actividad" sub="Registro de acciones de los participantes" />

      <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
        <FilterTabs
          options={[{ value: 'all', label: 'TODOS' }, { value: 'Completó', label: 'COMPLETÓ' }, { value: 'Falló', label: 'FALLÓ' }, { value: 'Se unió', label: 'SE UNIÓ' }]}
          active={filter}
          onChange={v => setFilter(v as typeof filter)}
        />
        <span style={{ marginLeft: 'auto', color: C.textMuted, fontSize: 8, letterSpacing: '0.1em' }}>{visible.length} evento(s)</span>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.border}`, overflow: 'auto', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10 }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.border}`, background: C.bg }}>
              {['Hora', 'Usuario', 'Acción', 'Reto / Evento', 'Puntos'].map(h => (
                <th key={h} style={{ padding: '10px 14px', color: C.textSub, fontSize: 8, fontWeight: 700, letterSpacing: '0.14em', textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map(e => (
              <tr key={e.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                <td style={{ padding: '9px 14px', color: C.textMuted, fontSize: 9, fontFamily: 'monospace' }}>{e.time}</td>
                <td style={{ padding: '9px 14px', color: C.text, fontWeight: 700 }}>{e.user}</td>
                <td style={{ padding: '9px 14px' }}>
                  <span style={{ background: e.type === 'success' ? C.accentBg : e.type === 'error' ? C.dangerBg : C.warningBg, color: logColor(e.type), padding: '2px 8px', fontSize: 8, fontWeight: 700, letterSpacing: '0.08em' }}>
                    {e.action.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '9px 14px', color: C.textSub }}>{e.target}</td>
                <td style={{ padding: '9px 14px', color: logColor(e.type), fontWeight: 700 }}>{e.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Shared components ────────────────────────────────────────────────────────

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, paddingBottom: 14, marginBottom: 4 }}>
      <h1 style={{ color: C.text, fontSize: 15, fontWeight: 900, letterSpacing: '0.18em', margin: 0 }}>{title.toUpperCase()}</h1>
      <p style={{ color: C.textMuted, fontSize: 9, letterSpacing: '0.12em', margin: '5px 0 0' }}>{sub}</p>
    </div>
  )
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: { label: string; onClick: () => void } }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ padding: '12px 16px', borderBottom: `1px solid ${C.borderLight}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: C.bg }}>
        <span style={{ color: C.textSub, fontSize: 9, fontWeight: 700, letterSpacing: '0.16em' }}>{title}</span>
        {action && <button onClick={action.onClick} style={{ background: 'transparent', border: 'none', color: C.accent, fontSize: 8, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em', fontWeight: 700 }}>{action.label}</button>}
      </div>
      <div style={{ padding: '14px 16px' }}>{children}</div>
    </div>
  )
}

function Btn({ children, onClick, color, fullWidth }: { children: React.ReactNode; onClick: () => void; color: string; fullWidth?: boolean }) {
  return (
    <button onClick={onClick} style={{ background: `${color}14`, border: `1px solid ${color}55`, color, padding: '8px 16px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.12em', fontWeight: 700, transition: 'all 0.15s', width: fullWidth ? '100%' : undefined }}>
      {children}
    </button>
  )
}

function FilterTabs({ options, active, onChange }: { options: { value: string; label: string }[]; active: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex' }}>
      {options.map((o, i) => (
        <button key={o.value} onClick={() => onChange(o.value)} style={{ background: active === o.value ? C.accentBg : C.card, border: `1px solid ${C.border}`, borderRight: i < options.length - 1 ? 'none' : `1px solid ${C.border}`, color: active === o.value ? C.accent : C.textSub, padding: '6px 14px', fontSize: 9, cursor: 'pointer', fontFamily: 'inherit', letterSpacing: '0.1em', fontWeight: active === o.value ? 700 : 400 }}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

function FormField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label style={{ color: C.textSub, fontSize: 8, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>{label.toUpperCase()}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={{ width: '100%', background: C.bg, border: `1px solid ${C.border}`, color: C.text, padding: '9px 12px', fontSize: 10, fontFamily: 'inherit', boxSizing: 'border-box' }} />
    </div>
  )
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: C.card, border: `1px solid ${C.border}`, width: 460, maxWidth: '90vw', padding: 28, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22, paddingBottom: 14, borderBottom: `1px solid ${C.borderLight}` }}>
          <span style={{ color: C.text, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em' }}>{title}</span>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: C.textMuted, fontSize: 18, cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}
