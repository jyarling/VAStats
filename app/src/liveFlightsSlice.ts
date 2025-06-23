import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface LiveFlight {
  id: number
  callsign: string
  lat: number
  lng: number
  altitude: number
}

const initialState: LiveFlight[] = []

const liveFlightsSlice = createSlice({
  name: 'liveFlights',
  initialState,
  reducers: {
    setLiveFlights(_state, action: PayloadAction<LiveFlight[]>) {
      return action.payload
    },
  },
})

export const { setLiveFlights } = liveFlightsSlice.actions
export default liveFlightsSlice.reducer

export const selectLiveFlights = (state: RootState) => state.liveFlights

export function useLiveFlights() {
  return useAppSelector(selectLiveFlights)
}
