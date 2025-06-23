import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { AppDispatch, RootState } from './store'

export interface DataPoint {
  time: number
  ias: number
  alt: number
  vs: number
}

export interface AcarsState {
  isFlying: boolean
  data: DataPoint[]
}

const initialState: AcarsState = {
  isFlying: false,
  data: [],
}

const acarsSlice = createSlice({
  name: 'acars',
  initialState,
  reducers: {
    startFlight(state) {
      state.isFlying = true
      state.data = []
    },
    endFlight(state) {
      state.isFlying = false
    },
    pushData(state, action: PayloadAction<DataPoint>) {
      state.data.push(action.payload)
    },
  },
})

export const { startFlight, endFlight, pushData } = acarsSlice.actions
export default acarsSlice.reducer

export const selectIsFlying = (state: RootState) => state.acars.isFlying
export const selectData = (state: RootState) => state.acars.data

let feedInterval: NodeJS.Timeout | null = null

export const startAcarsFeed = () =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    if (feedInterval) return
    feedInterval = setInterval(() => {
      const { isFlying } = getState().acars
      if (isFlying) {
        dispatch(
          pushData({
            time: Date.now(),
            ias: Math.random() * 400,
            alt: Math.random() * 40000,
            vs: Math.random() * 4000 - 2000,
          }),
        )
      }
    }, 1000)
  }

export const stopAcarsFeed = () => () => {
  if (feedInterval) {
    clearInterval(feedInterval)
    feedInterval = null
  }
}

