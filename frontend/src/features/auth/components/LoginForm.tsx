import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ nombre: '', correo: '', colegio: '', apodo: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/challenges')
  }

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {(['nombre', 'correo', 'colegio', 'apodo'] as const).map((field, i) => (
        <input
          key={field}
          className="submit-box__input"
          type={field === 'correo' ? 'email' : 'text'}
          placeholder={['Nombre completo', 'Correo electrónico', 'Colegio', 'Apodo'][i]}
          value={form[field]}
          onChange={set(field)}
          required
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            border: '1px solid var(--neon-border)',
            color: 'var(--neon)',
            fontFamily: 'monospace',
          }}
        />
      ))}
      <button
        type="submit"
        className="submit-box__btn"
        style={{
          width: '100%',
          padding: '12px',
          marginTop: 8,
          background: 'var(--neon-bg)',
          border: '1px solid var(--neon-dim)',
          color: 'var(--neon)',
          fontFamily: 'monospace',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          borderRadius: 2,
          transition: 'background 0.2s',
        }}
      >
        Entrar al CTF
      </button>
    </form>
  )
}