import { LoginForm } from '../components/LoginForm'

export function LoginPage() {
  return (
    <div style={{
      minHeight: '100svh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '36px 32px',
      }}>
        <span className="header-badge">ARROWHEAD CTF</span>
        <h1 style={{ fontSize: '32px', margin: '12px 0 4px' }}>Bienvenido</h1>
        <p style={{ marginBottom: '28px', fontSize: '14px' }}>
          Completa tu registro para comenzar los retos
        </p>
        <LoginForm />
      </div>
    </div>
  )
}
