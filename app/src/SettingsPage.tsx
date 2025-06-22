import { useState, useEffect } from 'react'
import { Tabs, Switch, Input, Label, Button } from './components'
import { useSettings } from './settingsSlice'
import { useAuth } from './authSlice'

function ProfileTab() {
  const { user } = useAuth()
  const [name, setName] = useState(user?.username ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const handleSave = () => {
    // Placeholder for saving profile changes
    console.log('Save profile', { name, email, password })
  }
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="password">Change Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button className="mt-2" onClick={handleSave}>
        Save Profile
      </Button>
    </div>
  )
}

function AcarsTab() {
  const {
    acarsPollInterval,
    acarsFormat,
    acarsLogging,
    setAcarsPollInterval,
    setAcarsFormat,
    setAcarsLogging,
  } = useSettings()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>ACARS Poll Interval</span>
        <select
          value={acarsPollInterval}
          onChange={(e) => setAcarsPollInterval(parseInt(e.target.value) as 1 | 5 | 10)}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value={1}>1s</option>
          <option value={5}>5s</option>
          <option value={10}>10s</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <span>Data Format</span>
        <select
          value={acarsFormat}
          onChange={(e) => setAcarsFormat(e.target.value as 'json' | 'xml')}
          className="rounded-md bg-white p-2 text-gray-900 dark:bg-gray-700 dark:text-white"
        >
          <option value="json">JSON</option>
          <option value="xml">XML</option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <span>Enable Logging</span>
        <Switch checked={acarsLogging} onChange={setAcarsLogging} className="" />
      </div>
    </div>
  )
}

function AppTab() {
  const {
    theme,
    distanceUnit,
    speedUnit,
    altitudeUnit,
    mapStyle,
    notificationsPush,
    notificationsEmail,
    toggleTheme,
    setDistanceUnit,
    setSpeedUnit,
    setAltitudeUnit,
    setMapStyle,
    setNotificationsPush,
    setNotificationsEmail,
  } = useSettings()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span>Dark Theme</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} className="" />
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
        <Switch checked={notificationsPush} onChange={setNotificationsPush} className="" />
      </div>
      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <Switch checked={notificationsEmail} onChange={setNotificationsEmail} className="" />
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const tabs = [
    { value: 'profile', label: 'Profile', content: <ProfileTab /> },
    { value: 'acars', label: 'ACARS Settings', content: <AcarsTab /> },
    { value: 'app', label: 'App Settings', content: <AppTab /> },
  ]
  return (
    <div className="max-w-md rounded-lg bg-gray-100 p-6 text-gray-900 dark:bg-gray-800 dark:text-white">
      <Tabs tabs={tabs} />
    </div>
  )
}
