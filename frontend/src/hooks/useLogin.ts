import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/auth.service"

export function useLogin() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogin = async (code: string, alias: string) => {
    if (!code.trim() || !alias.trim()) {
      setError("Todos los campos son requeridos")
      return
    }
    setError(null)
    setLoading(true)
    try {
      await login(code, alias)
      navigate("/challenges")
    } catch {
      setError("Código de acceso inválido")
    } finally {
      setLoading(false)
    }
  }

  return { handleLogin, loading, error }
}