import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
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
  },
})

export const { addAircraft } = fleetSlice.actions
export default fleetSlice.reducer

export const selectFleet = (state: RootState) => state.fleet

export function useFleet() {
  const dispatch = useAppDispatch()
  const aircraft = useAppSelector(selectFleet)
  return {
    aircraft,
    addAircraft: (a: Aircraft) => dispatch(addAircraft(a)),
  }
}
