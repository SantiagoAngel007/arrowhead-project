import { Outlet, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/challenges', label: 'INICIO' },
  { to: '/challenges', label: 'RETOS' },
  { to: '/ranking',    label: 'RANKING' },
  { to: '/info',       label: 'INFO' },
]

export function Layout() {
  return (
    <div className="app-layout" style={{ padding: 0, width: '100%', minHeight: '100vh' }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        height: 52,
        width: '100%',
        boxSizing: 'border-box',
        borderBottom: '1px solid var(--neon-border)',
        background: '#030810',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: 13,
          color: 'var(--neon-dim)',
          letterSpacing: '0.15em',
        }}>
          // ARROWHEAD CTF
        </span>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {navLinks.map(link => (
            <NavLink
              key={link.label}
              to={link.to}
              style={({ isActive }) => ({
                color: isActive ? 'var(--neon)' : 'var(--neon-border)',
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.18em',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid var(--neon-dim)' : '2px solid transparent',
                paddingBottom: 4,
                transition: 'color 0.2s, border-color 0.2s',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button style={{
          fontFamily: 'monospace',
          fontSize: 10,
          letterSpacing: '0.15em',
          padding: '5px 14px',
          background: 'transparent',
          border: '1px solid var(--neon-dim)',
          color: 'var(--neon)',
          cursor: 'pointer',
          textTransform: 'uppercase',
          borderRadius: 2,
        }}>
          ▶ ACCEDER
        </button>
      </header>

      <div>
        <Outlet />
      </div>
    </div>
  )
}