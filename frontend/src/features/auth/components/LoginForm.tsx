import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export function LoginForm() {
  const navigate = useNavigate()
  const { login, loading, error } = useLogin()
  const [form, setForm] = useState({ alias: '', codigo: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const ok = await login(form.codigo, form.alias)
    if (ok) navigate('/challenges')
  }

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['alias', 'codigo'] as const).map((field, i) => (
        <input
          key={field}
          className="submit-box__input"
          type="text"
          placeholder={['Apodo', 'Código de acceso del evento'][i]}
          value={form[field]}
          onChange={set(field)}
          required
          style={{
            background: 'rgba(10, 20, 10, 0.9)',
            border: '1px solid #2a3a2a',
            color: '#c8e6c8',
            fontFamily: '"Courier New", monospace',
          }}
        />
      ))}
      {error && (
        <p style={{ color: '#ef4444', fontFamily: '"Courier New", monospace', fontSize: 11, letterSpacing: '0.08em', margin: 0 }}>
          ✕ {error}
        </p>
      )}
      <button
        type="submit"
        className="submit-box__btn"
        disabled={loading}
        style={{
          width: '100%',
          padding: '12px',
          marginTop: 8,
          background: loading ? '#1a3a1a' : '#2a5c34',
          border: 'none',
          color: '#c8f0c8',
          fontFamily: 'monospace',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: loading ? 'not-allowed' : 'pointer',
          borderRadius: 2,
          transition: 'background 0.2s',
        }}
      >
        {loading ? 'Verificando...' : 'Entrar al CTF'}
      </button>
    </form>
  )
}