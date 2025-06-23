import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import { Button, Input, Label, Switch } from './components'
import { useAuth } from './authSlice'
import { useSettings } from './settingsSlice'

export function ProfilePage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const user = auth.user ?? { username: 'user', email: 'user@example.com' }

  const {
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
    toggleTheme,
    setDistanceUnit,
    setSpeedUnit,
    setAltitudeUnit,
    setMapStyle,
    setNotificationsPush,
    setNotificationsEmail,
    setAcarsPollInterval,
    setAcarsFormat,
    setAcarsLogging,
  } = useSettings()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const [name, setName] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')

  const handleSave = () => {
    console.log('Save profile', { name, email, password })
  }

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 text-gray-900 dark:bg-[#101a23] dark:text-white">
        <img
          src="/images/profile.svg"
          alt="avatar"
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>
        <Button className="w-full" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          <Tab className={({ selected }) =>
            selected
              ? 'bg-gray-900 text-white px-4 py-2 rounded-md'
              : 'text-gray-400 px-4 py-2 rounded-md'
          }>
            Profile
          </Tab>
          <Tab className={({ selected }) =>
            selected
              ? 'bg-gray-900 text-white px-4 py-2 rounded-md'
              : 'text-gray-400 px-4 py-2 rounded-md'
          }>
            ACARS Settings
          </Tab>
          <Tab className={({ selected }) =>
            selected
              ? 'bg-gray-900 text-white px-4 py-2 rounded-md'
              : 'text-gray-400 px-4 py-2 rounded-md'
          }>
            App Settings
          </Tab>
        </Tab.List>
        <Tab.Panels className="bg-gray-700 p-6 rounded-b-lg">
          <Tab.Panel className="space-y-4">
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
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
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
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
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
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default ProfilePage
