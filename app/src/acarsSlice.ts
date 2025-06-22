import { createSlice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import type { RootState } from './store'

export interface AcarsState {
  inFlight: boolean
}

const initialState: AcarsState = {
  inFlight: false,
}

const acarsSlice = createSlice({
  name: 'acars',
  initialState,
  reducers: {
    startFlight(state) {
      state.inFlight = true
    },
    endFlight(state) {
      state.inFlight = false
    },
  },
})

export const { startFlight, endFlight } = acarsSlice.actions
export default acarsSlice.reducer

export const selectInFlight = (state: RootState) => state.acars.inFlight

export function useAcars() {
  const dispatch = useAppDispatch()
  const inFlight = useAppSelector(selectInFlight)
  return {
    inFlight,
    startFlight: () => dispatch(startFlight()),
    endFlight: () => dispatch(endFlight()),
  }
}
