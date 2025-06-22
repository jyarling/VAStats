import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface Flight {
  id: number
  pilot: string
  origin: string
  destination: string
  aircraft: string
}

const initialState: Flight[] = [
  { id: 1, pilot: 'John Doe', origin: 'KJFK', destination: 'KLAX', aircraft: 'B737' },
  { id: 2, pilot: 'Jane Smith', origin: 'EGLL', destination: 'EHAM', aircraft: 'A320' },
  { id: 3, pilot: 'Bob Brown', origin: 'KSEA', destination: 'CYYZ', aircraft: 'B777' },
]

const flightsSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    reorderFlights(
      state,
      action: PayloadAction<{ from: number; to: number }>,
    ) {
      const { from, to } = action.payload
      const [flight] = state.splice(from, 1)
      state.splice(to, 0, flight)
    },
  },
})

export const { reorderFlights } = flightsSlice.actions
export default flightsSlice.reducer

export const selectFlights = (state: RootState) => state.flights

export function useFlights() {
  const dispatch = useAppDispatch()
  const flights = useAppSelector(selectFlights)
  return {
    flights,
    reorder: (from: number, to: number) =>
      dispatch(reorderFlights({ from, to })),
  }
}
