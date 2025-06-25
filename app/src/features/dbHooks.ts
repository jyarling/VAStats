import { useQuery } from '@tanstack/react-query'

export function usePilots() {
  return useQuery<any[], Error>({
    queryKey: ['pilots'],
    queryFn: () => window.api.db.getPilots(),
  })
}

export function useAircraft() {
  return useQuery<any[], Error>({
    queryKey: ['aircraft'],
    queryFn: () => window.api.db.getAircraft(),
  })
}

export function useFlights() {
  return useQuery<any[], Error>({
    queryKey: ['flights'],
    queryFn: () => window.api.db.getFlights(),
  })
}

export function useEvents() {
  return useQuery<any[], Error>({
    queryKey: ['events'],
    queryFn: () => window.api.db.getEvents(),
  })
}

export function useNotifications() {
  return useQuery<any[], Error>({
    queryKey: ['notifications'],
    queryFn: () => window.api.db.getNotifications(),
  })
}

export function useAcarsLogs(flightId: number) {
  return useQuery<any[], Error>({
    queryKey: ['acarsLogs', flightId],
    queryFn: () => window.api.db.getAcarsLogs(flightId),
  })
}
