import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface SettingsState {
  theme: 'light' | 'dark'
  distanceUnit: 'nm' | 'km'
}

const initialState: SettingsState = {
  theme: 'light',
  distanceUnit: 'nm',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setDistanceUnit(state, action: PayloadAction<'nm' | 'km'>) {
      state.distanceUnit = action.payload
    },
  },
})

export const { setTheme, toggleTheme, setDistanceUnit } = settingsSlice.actions
export default settingsSlice.reducer

export const selectTheme = (state: RootState) => state.settings.theme
export const selectDistanceUnit = (state: RootState) => state.settings.distanceUnit

export function useSettings() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const distanceUnit = useAppSelector(selectDistanceUnit)
  return {
    theme,
    distanceUnit,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (value: 'light' | 'dark') => dispatch(setTheme(value)),
    setDistanceUnit: (unit: 'nm' | 'km') => dispatch(setDistanceUnit(unit)),
  }
}
