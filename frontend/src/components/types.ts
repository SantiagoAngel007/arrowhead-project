export interface KnowledgeCard {
  id: number
  title: string
  level: 'BÁSICO' | 'INTERMEDIO' | 'AVANZADO'
  color: string
  icon: string
  description: string
  bullets: string[]
  example?: string
}

export interface ConsoleCommand {
  command: string
  function: string
  usage: string
}

export interface ThreatCard {
  icon: string
  title: string
  description: string
  tip: string
  color: string
}
