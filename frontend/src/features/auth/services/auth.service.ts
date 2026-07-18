import { apiClient, ALIAS_STORAGE_KEY, TOKEN_STORAGE_KEY } from '../../../lib/apiClient'
import type { AuthResponse, LoginPayload } from '../types'

async function authenticate(url: string, payload: LoginPayload): Promise<AuthResponse> {
  const res = await apiClient.post<AuthResponse>(url, payload)
  localStorage.setItem(TOKEN_STORAGE_KEY, res.data.token)
  localStorage.setItem(ALIAS_STORAGE_KEY, res.data.alias)
  return res.data
}

export const register = (payload: LoginPayload): Promise<AuthResponse> =>
  authenticate('/api/auth/register', payload)

export const login = (payload: LoginPayload): Promise<AuthResponse> =>
  authenticate('/api/auth/login', payload)

export const logout = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY)
  localStorage.removeItem(ALIAS_STORAGE_KEY)
}
