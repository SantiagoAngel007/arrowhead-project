import { apiClient } from '../../../lib/apiClient'
import type { AnswerResultDTO, Challenge, ChallengeDetailDTO, ScoreDTO } from '../types'

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

// ── Reto de Wireshark: conectado al backend real ─────────────────────────────

export const getChallengeDetail = async (challengeId: number): Promise<ChallengeDetailDTO> => {
  const res = await apiClient.get<ChallengeDetailDTO>(`/api/challenges/${challengeId}`)
  return res.data
}

export const submitAnswer = async (
  challengeId: number,
  questionId: number,
  optionId: number,
): Promise<AnswerResultDTO> => {
  const res = await apiClient.post<AnswerResultDTO>(`/api/challenges/${challengeId}/answer`, {
    questionId,
    optionId,
  })
  return res.data
}

export const submitFlag = async (challengeId: number, flag: string): Promise<AnswerResultDTO> => {
  const res = await apiClient.post<AnswerResultDTO>(`/api/challenges/${challengeId}/flag`, { flag })
  return res.data
}

export const getScore = async (challengeId: number): Promise<ScoreDTO> => {
  const res = await apiClient.get<ScoreDTO>(`/api/challenges/${challengeId}/score`)
  return res.data
}
