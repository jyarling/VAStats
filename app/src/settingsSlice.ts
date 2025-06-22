import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './storeHooks'
import type { RootState } from './store'

export interface SettingsState {
  theme: 'light' | 'dark'
  distanceUnit: 'nm' | 'km'
  speedUnit: 'kt' | 'kmh'
  altitudeUnit: 'ft' | 'm'
  mapStyle: 'day' | 'night' | 'auto'
  notificationsPush: boolean
  notificationsEmail: boolean
  acarsPollInterval: 1 | 5 | 10
}

const initialState: SettingsState = {
  theme: 'light',
  distanceUnit: 'nm',
  speedUnit: 'kt',
  altitudeUnit: 'ft',
  mapStyle: 'auto',
  notificationsPush: true,
  notificationsEmail: true,
  acarsPollInterval: 1,
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
    setSpeedUnit(state, action: PayloadAction<'kt' | 'kmh'>) {
      state.speedUnit = action.payload
    },
    setAltitudeUnit(state, action: PayloadAction<'ft' | 'm'>) {
      state.altitudeUnit = action.payload
    },
    setMapStyle(state, action: PayloadAction<'day' | 'night' | 'auto'>) {
      state.mapStyle = action.payload
    },
    setNotificationsPush(state, action: PayloadAction<boolean>) {
      state.notificationsPush = action.payload
    },
    setNotificationsEmail(state, action: PayloadAction<boolean>) {
      state.notificationsEmail = action.payload
    },
    setAcarsPollInterval(state, action: PayloadAction<1 | 5 | 10>) {
      state.acarsPollInterval = action.payload
    },
  },
})

export const {
  setTheme,
  toggleTheme,
  setDistanceUnit,
  setSpeedUnit,
  setAltitudeUnit,
  setMapStyle,
  setNotificationsPush,
  setNotificationsEmail,
  setAcarsPollInterval,
} = settingsSlice.actions
export default settingsSlice.reducer

export const selectTheme = (state: RootState) => state.settings.theme
export const selectDistanceUnit = (state: RootState) => state.settings.distanceUnit
export const selectSpeedUnit = (state: RootState) => state.settings.speedUnit
export const selectAltitudeUnit = (state: RootState) => state.settings.altitudeUnit
export const selectMapStyle = (state: RootState) => state.settings.mapStyle
export const selectNotificationsPush = (state: RootState) =>
  state.settings.notificationsPush
export const selectNotificationsEmail = (state: RootState) =>
  state.settings.notificationsEmail
export const selectAcarsPollInterval = (state: RootState) =>
  state.settings.acarsPollInterval

export function useSettings() {
  const dispatch = useAppDispatch()
  const theme = useAppSelector(selectTheme)
  const distanceUnit = useAppSelector(selectDistanceUnit)
  const speedUnit = useAppSelector(selectSpeedUnit)
  const altitudeUnit = useAppSelector(selectAltitudeUnit)
  const mapStyle = useAppSelector(selectMapStyle)
  const notificationsPush = useAppSelector(selectNotificationsPush)
  const notificationsEmail = useAppSelector(selectNotificationsEmail)
  const acarsPollInterval = useAppSelector(selectAcarsPollInterval)
  return {
    theme,
    distanceUnit,
    speedUnit,
    altitudeUnit,
    mapStyle,
    notificationsPush,
    notificationsEmail,
    acarsPollInterval,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (value: 'light' | 'dark') => dispatch(setTheme(value)),
    setDistanceUnit: (unit: 'nm' | 'km') => dispatch(setDistanceUnit(unit)),
    setSpeedUnit: (unit: 'kt' | 'kmh') => dispatch(setSpeedUnit(unit)),
    setAltitudeUnit: (unit: 'ft' | 'm') => dispatch(setAltitudeUnit(unit)),
    setMapStyle: (style: 'day' | 'night' | 'auto') => dispatch(setMapStyle(style)),
    setNotificationsPush: (val: boolean) => dispatch(setNotificationsPush(val)),
    setNotificationsEmail: (val: boolean) => dispatch(setNotificationsEmail(val)),
    setAcarsPollInterval: (val: 1 | 5 | 10) => dispatch(setAcarsPollInterval(val)),
  }
}
