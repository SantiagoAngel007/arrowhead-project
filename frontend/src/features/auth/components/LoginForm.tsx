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
      <input
        className="submit-box__input"
        placeholder="Nombre completo"
        value={form.nombre}
        onChange={set('nombre')}
        required
      />
      <input
        className="submit-box__input"
        type="email"
        placeholder="Correo electrónico"
        value={form.correo}
        onChange={set('correo')}
        required
      />
      <input
        className="submit-box__input"
        placeholder="Colegio"
        value={form.colegio}
        onChange={set('colegio')}
        required
      />
      <input
        className="submit-box__input"
        placeholder="Apodo"
        value={form.apodo}
        onChange={set('apodo')}
        required
      />
      <button
        type="submit"
        className="submit-box__btn"
        style={{ width: '100%', padding: '12px', marginTop: 8 }}
      >
        Entrar al CTF
      </button>
    </form>
  )
}
