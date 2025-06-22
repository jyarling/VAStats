import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface LogEntry {
  id: number
  date: string
  route: string
  duration: string
  landingRate: number
}

const initialState: LogEntry[] = [
  { id: 1, date: '2024-05-01', route: 'KJFK-KLAX', duration: '05:30', landingRate: -120 },
  { id: 2, date: '2024-05-05', route: 'EGLL-EDDM', duration: '01:45', landingRate: -250 },
  { id: 3, date: '2024-05-10', route: 'KLAX-YSSY', duration: '14:00', landingRate: -180 },
]

const logbookSlice = createSlice({
  name: 'logbook',
  initialState,
  reducers: {},
})

export default logbookSlice.reducer

export const selectLogbook = (state: RootState) => state.logbook

export function useLogbook() {
  return useAppSelector(selectLogbook)
}
