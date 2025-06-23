import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface Aircraft {
  tail: string
  hours: number
  status: 'OK' | 'Needs Maintenance'
}

const initialState: Aircraft[] = [
  { tail: 'N12345', hours: 120, status: 'OK' },
]

const fleetSlice = createSlice({
  name: 'fleet',
  initialState,
  reducers: {
    addAircraft(state, action: PayloadAction<Aircraft>) {
      state.push(action.payload)
    },
    markMaintained(state, action: PayloadAction<string>) {
      const tail = action.payload
      const ac = state.find((a) => a.tail === tail)
      if (ac) {
        ac.status = 'OK'
        ac.hours = 20
      }
    },
  },
})

export const { addAircraft, markMaintained } = fleetSlice.actions
export default fleetSlice.reducer

export const selectFleet = (state: RootState) => state.fleet

