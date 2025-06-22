import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Flight {
  id: number
  pilot: string
  origin: string
  destination: string
  aircraft: string
}

const flights: Flight[] = [
  { id: 1, pilot: 'John Doe', origin: 'KJFK', destination: 'KLAX', aircraft: 'B737' },
  { id: 2, pilot: 'Jane Smith', origin: 'EGLL', destination: 'EHAM', aircraft: 'A320' },
  { id: 3, pilot: 'Bob Brown', origin: 'KSEA', destination: 'CYYZ', aircraft: 'B777' },
]

export const flightsApi = createApi({
  reducerPath: 'flightsApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getActiveFlights: builder.query<Flight[], void>({
      // Normally this would be `query: () => '/api/active-flights'`.
      // For now return stubbed data.
      async queryFn() {
        return { data: flights }
      },
    }),
  }),
})

export const { useGetActiveFlightsQuery } = flightsApi
