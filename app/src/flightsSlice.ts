import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface Flight {
  id: number
  pilot: string
  origin: string
  destination: string
  aircraft: string
}

export type SortField = 'pilot' | 'origin' | 'destination' | 'aircraft'

export interface FlightsState {
  list: Flight[]
  sort: {
    field: SortField
    direction: 'asc' | 'desc'
  }
}

const initialState: FlightsState = {
  list: [
    { id: 1, pilot: 'John Doe', origin: 'KJFK', destination: 'KLAX', aircraft: 'B737' },
    { id: 2, pilot: 'Jane Smith', origin: 'EGLL', destination: 'EHAM', aircraft: 'A320' },
    { id: 3, pilot: 'Bob Brown', origin: 'KSEA', destination: 'CYYZ', aircraft: 'B777' },
  ],
  sort: {
    field: 'pilot',
    direction: 'asc',
  },
}

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    reorderFlights(
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) {
      const { from, to } = action.payload
      const [flight] = state.list.splice(from, 1)
      state.list.splice(to, 0, flight)
    },
    toggleSort(state, action: PayloadAction<SortField>) {
      const field = action.payload
      if (state.sort.field === field) {
        state.sort.direction = state.sort.direction === 'asc' ? 'desc' : 'asc'
      } else {
        state.sort.field = field
        state.sort.direction = 'asc'
      }
      state.list.sort((a, b) => {
        const dir = state.sort.direction === 'asc' ? 1 : -1
        const valA = a[state.sort.field]
        const valB = b[state.sort.field]
        return valA > valB ? dir : valA < valB ? -dir : 0
      })
    },
  },
})

export const { reorderFlights, toggleSort } = flightsSlice.actions
export default flightsSlice.reducer

export const selectFlightsState = (state: RootState) => state.flights

export const selectFlights = (state: RootState) => state.flights.list

export const selectSort = (state: RootState) => state.flights.sort

