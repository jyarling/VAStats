import { useState, useEffect } from 'react'
import { Tabs, Switch, Input, Label, Button, Select } from './components'
import { useSettings } from './settingsHooks'
import { useAuth } from './authHooks'

const acarsPollOptions = [
  { value: 1, label: '1s' },
  { value: 5, label: '5s' },
  { value: 10, label: '10s' },
] as const

const acarsFormatOptions = [
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
] as const

const distanceOptions = [
  { value: 'nm', label: 'Nautical Miles' },
  { value: 'km', label: 'Kilometers' },
] as const

const speedOptions = [
  { value: 'kt', label: 'Knots' },
  { value: 'kmh', label: 'km/h' },
] as const

const altitudeOptions = [
  { value: 'ft', label: 'Feet' },
  { value: 'm', label: 'Meters' },
] as const

const mapStyleOptions = [
  { value: 'day', label: 'Day' },
  { value: 'night', label: 'Night' },
  { value: 'auto', label: 'Auto' },
] as const

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
        <Select
          value={acarsPollInterval}
          onChange={setAcarsPollInterval}
          options={acarsPollOptions}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Data Format</span>
        <Select
          value={acarsFormat}
          onChange={setAcarsFormat}
          options={acarsFormatOptions}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Enable Logging</span>
        <Switch checked={acarsLogging} onChange={setAcarsLogging} />
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
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="flex items-center justify-between">
        <span>Distance Unit</span>
        <Select
          value={distanceUnit}
          onChange={setDistanceUnit}
          options={distanceOptions}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Speed Unit</span>
        <Select
          value={speedUnit}
          onChange={setSpeedUnit}
          options={speedOptions}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Altitude Unit</span>
        <Select
          value={altitudeUnit}
          onChange={setAltitudeUnit}
          options={altitudeOptions}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Map Style</span>
        <Select value={mapStyle} onChange={setMapStyle} options={mapStyleOptions} />
      </div>
      <div className="flex items-center justify-between">
        <span>Push Notifications</span>
        <Switch checked={notificationsPush} onChange={setNotificationsPush} />
      </div>
      <div className="flex items-center justify-between">
        <span>Email Notifications</span>
        <Switch checked={notificationsEmail} onChange={setNotificationsEmail} />
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
