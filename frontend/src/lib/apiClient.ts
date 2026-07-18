import axios from 'axios'

export const TOKEN_STORAGE_KEY = 'arrowhead_token'
export const ALIAS_STORAGE_KEY = 'arrowhead_alias'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
})

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
