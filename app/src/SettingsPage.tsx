import { useEffect } from 'react'
import { Switch } from './components'
import { useSettings } from './settingsSlice'

export default function SettingsPage() {
  const {
    theme,
    distanceUnit,
    speedUnit,
    altitudeUnit,
    mapStyle,
    notificationsPush,
    notificationsEmail,
    acarsPollInterval,
    toggleTheme,
    setDistanceUnit,
    setSpeedUnit,
    setAltitudeUnit,
    setMapStyle,
    setNotificationsPush,
    setNotificationsEmail,
    setAcarsPollInterval,
  } = useSettings()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="max-w-md space-y-4 rounded-lg bg-gray-100 p-6 text-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <span>Dark Theme</span>
        <Switch
          checked={theme === 'dark'}
          onChange={() => toggleTheme()}
          className={`${
            theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Distance Unit</span>
        <select
          value={distanceUnit}
          onChange={(e) => setDistanceUnit(e.target.value as 'nm' | 'km')}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value="nm">Nautical Miles</option>
          <option value="km">Kilometers</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <span>Speed Unit</span>
        <select
          value={speedUnit}
          onChange={(e) => setSpeedUnit(e.target.value as 'kt' | 'kmh')}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value="kt">Knots</option>
          <option value="kmh">km/h</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <span>Altitude Unit</span>
        <select
          value={altitudeUnit}
          onChange={(e) => setAltitudeUnit(e.target.value as 'ft' | 'm')}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value="ft">Feet</option>
          <option value="m">Meters</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <span>Map Style</span>
        <select
          value={mapStyle}
          onChange={(e) => setMapStyle(e.target.value as 'day' | 'night' | 'auto')}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value="day">Day</option>
          <option value="night">Night</option>
          <option value="auto">Auto</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <span>Push Notifications</span>
        <Switch
          checked={notificationsPush}
          onChange={setNotificationsPush}
          className={`${
            notificationsPush ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <Switch
          checked={notificationsEmail}
          onChange={setNotificationsEmail}
          className={`${
            notificationsEmail ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        />
      </div>

      <div className="flex items-center justify-between">
        <span>ACARS Poll Interval</span>
        <select
          value={acarsPollInterval}
          onChange={(e) =>
            setAcarsPollInterval(parseInt(e.target.value) as 1 | 5 | 10)
          }
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value={1}>1s</option>
          <option value={5}>5s</option>
          <option value={10}>10s</option>
        </select>
      </div>
    </div>
  )
}
