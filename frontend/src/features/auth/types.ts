export interface LoginPayload {
  code: string
  alias: string
}

export interface AuthResponse {
  token: string
  alias: string
  role: string
}
