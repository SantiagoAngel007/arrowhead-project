import { Outlet, NavLink } from 'react-router-dom'

const navLinks = [
  { to: '/challenges', label: 'INICIO' },
  { to: '/challenges', label: 'RETOS' },
  { to: '/ranking',    label: 'RANKING' },
  { to: '/info',       label: 'INFO' },
]

export function Layout() {
  return (
    <div className="app-layout" style={{ padding: 0 }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: 52,
        borderBottom: '1px solid #0e2236',
        background: '#030810',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontWeight: 700,
          fontSize: 13,
          color: '#00b4d8',
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
                color: isActive ? '#00e5ff' : '#4a8aaa',
                fontFamily: 'monospace',
                fontSize: 11,
                letterSpacing: '0.18em',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #00b4d8' : '2px solid transparent',
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
          border: '1px solid #00b4d8',
          color: '#00e5ff',
          cursor: 'pointer',
          textTransform: 'uppercase',
          borderRadius: 2,
        }}>
          ▶ ACCEDER
        </button>
      </header>

      <div style={{ padding: '32px' }}>
        <Outlet />
      </div>
    </div>
  )
}
