import { Outlet, NavLink } from 'react-router-dom'
import { ThemeSwitcher } from './ThemeSwitcher'
import { useTheme } from '../hooks/useTheme'

const navLinks = [
  { to: '/challenges', label: 'Retos' },
  { to: '/ranking',    label: 'Ranking' },
  { to: '/info',       label: 'Info' },
  { to: '/admin',      label: 'Admin' },
]

export function Layout() {
  useTheme()

  return (
    <div className="app-layout">
      <ThemeSwitcher />

      <nav style={{ display: 'flex', gap: 24, justifyContent: 'center', marginBottom: 32 }}>
        {navLinks.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            style={({ isActive }) => ({
              color: isActive ? 'var(--accent)' : 'var(--text)',
              fontFamily: 'var(--mono)',
              fontSize: 14,
              textDecoration: 'none',
              borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              paddingBottom: 4,
              transition: 'color 0.2s, border-color 0.2s',
            })}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  )
}
