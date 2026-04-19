import { useQuery } from '@tanstack/react-query'
import { getChallenges } from '../services/challenges.service'

export function useChallenges() {
  return useQuery({ queryKey: ['challenges'], queryFn: getChallenges })
}
