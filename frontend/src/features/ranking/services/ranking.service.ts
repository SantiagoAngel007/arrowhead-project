import type { RankingEntry } from '../types'

const USE_MOCK = true

const mockRanking: RankingEntry[] = [
  { pos: 1, alias: 'n3ur0hack', points: 850 },
  { pos: 2, alias: 'phantom_x', points: 600 },
]

export const getRanking = async (): Promise<RankingEntry[]> => {
  if (USE_MOCK) return mockRanking
  // const res = await axios.get('/api/ranking')
  // return res.data
}
