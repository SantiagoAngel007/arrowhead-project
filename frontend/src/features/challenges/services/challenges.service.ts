import type { Challenge } from '../types'

const USE_MOCK = true

const mockChallenges: Challenge[] = [
  { id: 1, title: 'Caesar Cipher', level: 'Básico', points: 100, solved: false },
  { id: 2, title: 'Base64 Decode', level: 'Básico', points: 100, solved: false },
]

export const getChallenges = async (): Promise<Challenge[]> => {
  if (USE_MOCK) return mockChallenges
  // const res = await axios.get('/api/challenges')
  // return res.data
}
