export interface Challenge {
  id: number
  title: string
  level: 'Básico' | 'Intermedio' | 'Avanzado'
  points: number
  solved: boolean
}

// ── Tipos que reflejan las respuestas reales del backend (ChallengeController) ──

export interface OptionDTO {
  id: number
  label: string
  text: string
}

export interface QuestionDTO {
  id: number
  text: string
  points: number
  displayOrder: number
  options: OptionDTO[]
}

export interface ChallengeDetailDTO {
  id: number
  name: string
  description: string
  level: string
  status: string
  maxPoints: number
  displayOrder: number
  questions: QuestionDTO[]
}

export interface AnswerResultDTO {
  correct: boolean
  pointsEarned: number
  message: string
}

export interface ScoreDTO {
  points: number
  maxPoints: number
  completed: boolean
  attempts: number
}
