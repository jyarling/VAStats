import { useAppDispatch, useAppSelector } from './storeHooks'
import {
  toggleTheme,
  setTheme,
  setDistanceUnit,
  setSpeedUnit,
  setAltitudeUnit,
  setMapStyle,
  setNotificationsPush,
  setNotificationsEmail,
  setAcarsPollInterval,
  setAcarsFormat,
  setAcarsLogging,
  selectTheme,
  selectDistanceUnit,
  selectSpeedUnit,
  selectAltitudeUnit,
  selectMapStyle,
  selectNotificationsPush,
  selectNotificationsEmail,
  selectAcarsPollInterval,
  selectAcarsFormat,
  selectAcarsLogging,
} from './settingsSlice'

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
  const acarsFormat = useAppSelector(selectAcarsFormat)
  const acarsLogging = useAppSelector(selectAcarsLogging)
  return {
    theme,
    distanceUnit,
    speedUnit,
    altitudeUnit,
    mapStyle,
    notificationsPush,
    notificationsEmail,
    acarsPollInterval,
    acarsFormat,
    acarsLogging,
    toggleTheme: () => dispatch(toggleTheme()),
    setTheme: (value: 'light' | 'dark') => dispatch(setTheme(value)),
    setDistanceUnit: (unit: 'nm' | 'km') => dispatch(setDistanceUnit(unit)),
    setSpeedUnit: (unit: 'kt' | 'kmh') => dispatch(setSpeedUnit(unit)),
    setAltitudeUnit: (unit: 'ft' | 'm') => dispatch(setAltitudeUnit(unit)),
    setMapStyle: (style: 'day' | 'night' | 'auto') => dispatch(setMapStyle(style)),
    setNotificationsPush: (val: boolean) => dispatch(setNotificationsPush(val)),
    setNotificationsEmail: (val: boolean) => dispatch(setNotificationsEmail(val)),
    setAcarsPollInterval: (val: 1 | 5 | 10) => dispatch(setAcarsPollInterval(val)),
    setAcarsFormat: (val: 'json' | 'xml') => dispatch(setAcarsFormat(val)),
    setAcarsLogging: (val: boolean) => dispatch(setAcarsLogging(val)),
  }
}
