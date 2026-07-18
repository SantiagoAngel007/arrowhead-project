import { useState } from 'react'
import { login as loginRequest, register as registerRequest } from '../services/auth.service'

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const login = async (code: string, alias: string) => {
    setError('')
    setLoading(true)
    try {
      // Primer ingreso con un alias nuevo crea la cuenta; los siguientes solo inician sesión.
      try {
        await loginRequest({ code, alias })
      } catch {
        await registerRequest({ code, alias })
      }
      return true
    } catch {
      setError('Alias o código de acceso incorrecto.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { login, loading, error }
}
