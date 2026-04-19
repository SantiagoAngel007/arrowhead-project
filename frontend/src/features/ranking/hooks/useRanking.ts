import { useQuery } from '@tanstack/react-query'
import { getRanking } from '../services/ranking.service'

export function useRanking() {
  return useQuery({ queryKey: ['ranking'], queryFn: getRanking })
}
