import type { EventInfo } from '../types'

const USE_MOCK = true

const mockInfo: EventInfo = {
  name: 'Arrowhead CTF',
  duration: 90,
  location: 'Universidad Icesi — Cali, Colombia',
}

export const getEventInfo = async (): Promise<EventInfo> => {
  if (USE_MOCK) return mockInfo
  // const res = await axios.get('/api/event')
  // return res.data
}
