import type { RankingEntry } from '../types'
import { computeUserProgress } from '../utils/progress.utils.ts'
import type { Challenge } from '../utils/progress.utils'

const USE_MOCK = true

const progressData: Challenge[] = [
  { name: 'Mensaje secreto', level: 'Básico', done: true },
  { name: 'Hash misterioso', level: 'Intermedio', done: true },
  { name: '¿Eres tú?', level: 'Básico', done: true },
  { name: 'CTF Red', level: 'Intermedio', done: true },
  { name: 'Login vulnerable', level: 'Avanzado', done: false },
  { name: 'XSS Challenge', level: 'Avanzado', done: false },
]


const progress = computeUserProgress(progressData)

const mockRanking = [
  { pos: 1, alias: 'n3ur0hack', points: 850, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved },
  { pos: 2, alias: 'phantom_x', points: 600, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved },
  { pos: 3, alias: 'bit_serpent', points: 520, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved },
  { pos: 4, alias: 'zeroc00l', points: 420, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved},
  { pos: 5, alias: 'ghost_shell', points: 300, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved },
  { pos: 6, alias: 'rootkit', points: 200, level: progress.currentLevel, levelProgress: progress.levelProgressMap[progress.currentLevel], lastSolved: progress.lastSolved },
]

export const getRanking = async (): Promise<RankingEntry[]> => {
  if (USE_MOCK) return mockRanking
  // const res = await axios.get('/api/ranking')
  // return res.data
  return []
}
