export interface EventStatus {
  status: 'idle' | 'started' | 'ended'
}

export interface Participant {
  id: number
  alias: string
  points: number
}
