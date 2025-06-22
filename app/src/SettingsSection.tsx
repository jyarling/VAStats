import { useEffect } from 'react'
import { Switch } from './components'
import { useSettings } from './settingsSlice'

export default function SettingsSection() {
  const { theme, distanceUnit, toggleTheme, setDistanceUnit } = useSettings()

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="w-full max-w-sm space-y-4 rounded-lg bg-[#101a23] p-6 text-white">
      <div className="flex items-center justify-between">
        <span>Dark Theme</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="space-y-1">
        <label htmlFor="distanceUnit" className="text-sm font-medium">
          Distance Unit
        </label>
        <select
          id="distanceUnit"
          value={distanceUnit}
          onChange={(e) => setDistanceUnit(e.target.value as 'nm' | 'km')}
          className="w-full rounded-md border border-gray-700 bg-gray-800 p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="nm">Nautical Miles</option>
          <option value="km">Kilometers</option>
        </select>
      </div>
    </div>
  )
}
