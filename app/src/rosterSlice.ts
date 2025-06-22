import { createSlice } from '@reduxjs/toolkit'
import { useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface Pilot {
  id: number
  name: string
  callsign: string
  avatarUrl: string
  totalHours: number
}

const initialState: Pilot[] = [
  {
    id: 1,
    name: 'John Doe',
    callsign: 'EAGLE1',
    avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe',
    totalHours: 120,
  },
  {
    id: 2,
    name: 'Jane Smith',
    callsign: 'HAWK2',
    avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith',
    totalHours: 200,
  },
  {
    id: 3,
    name: 'Bob Brown',
    callsign: 'FALCON3',
    avatarUrl: 'https://ui-avatars.com/api/?name=Bob+Brown',
    totalHours: 75,
  },
]

const rosterSlice = createSlice({
  name: 'roster',
  initialState,
  reducers: {},
})

export default rosterSlice.reducer

export const selectRoster = (state: RootState) => state.roster

export function useRoster() {
  return useAppSelector(selectRoster)
}
