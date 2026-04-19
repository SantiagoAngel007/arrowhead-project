import { useQuery } from '@tanstack/react-query'
import { getEventInfo } from '../services/info.service'

export function useEventInfo() {
  return useQuery({ queryKey: ['event-info'], queryFn: getEventInfo })
}
