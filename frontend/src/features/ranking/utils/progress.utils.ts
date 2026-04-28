export type Challenge = {
  name: string
  level: Level
  done: boolean
}

export type Level = 'Básico' | 'Intermedio' | 'Avanzado'

export function computeUserProgress(data: Challenge[]):{globalProgress: number
  currentLevel: Level
  levelProgressMap: Record<Level, number>
  lastSolved: string} {
  const levels = ['Básico', 'Intermedio', 'Avanzado'] as const

  // total por nivel
  const totals = levels.map(level =>
    data.filter(ch => ch.level === level)
  )

  // completados por nivel
  const completed = levels.map(level => 
    data.filter(ch => ch.level === level && ch.done)
  )

  // progreso porcentual por nivel 
  const levelProgress = totals.map((group, i) =>
    group.length === 0 ? 0 : (completed[i].length / group.length) * 100
  )

  // progreso global
  const totalChallenges = data.length
  const totalDone = data.filter(ch => ch.done).length
  const globalProgress = (totalDone / totalChallenges) * 100

  // nivel actual (el primero que NO esté completo)
  let currentLevel: Level = 'Avanzado'
  for (let i = 0; i < levels.length; i++) {
    if (levelProgress[i] < 100) {
      currentLevel = levels[i]
      break
    }
  }

  // último reto resuelto
  const lastSolved = [...data].reverse().find(ch => ch.done)?.name ?? 'Ninguno'

  return {
    globalProgress,
    currentLevel,
    levelProgressMap: {
      Básico: levelProgress[0],
      Intermedio: levelProgress[1],
      Avanzado: levelProgress[2],
    },
    lastSolved,
  }
}