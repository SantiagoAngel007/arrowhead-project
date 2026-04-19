const USE_MOCK = true

export const login = async (code: string, alias: string) => {
  if (USE_MOCK) return { token: 'mock-token', alias }
  // const res = await axios.post('/api/auth/login', { code, alias })
  // return res.data
}
