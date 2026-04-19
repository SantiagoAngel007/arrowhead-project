export interface Challenge {
  id: number
  title: string
  level: 'Básico' | 'Intermedio' | 'Avanzado'
  points: number
  solved: boolean
}
