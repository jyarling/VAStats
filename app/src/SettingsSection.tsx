import useDarkMode from './hooks/useDarkMode'
import { Switch, Select } from './components'
import { useSettings } from './settingsSlice'

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

export default function SettingsSection() {
  const {
    theme,
    distanceUnit,
    speedUnit,
    altitudeUnit,
    toggleTheme,
    setDistanceUnit,
    setSpeedUnit,
    setAltitudeUnit,
  } = useSettings()

  useDarkMode(theme)

  return (
    <div className="w-full max-w-sm space-y-4 rounded-lg bg-gray-100 p-6 text-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <span>Dark Theme</span>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Distance Unit</label>
        <Select
          value={distanceUnit}
          onChange={setDistanceUnit}
          options={distanceOptions}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Speed Unit</label>
        <Select value={speedUnit} onChange={setSpeedUnit} options={speedOptions} />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Altitude Unit</label>
        <Select
          value={altitudeUnit}
          onChange={setAltitudeUnit}
          options={altitudeOptions}
        />
      </div>
    </div>
  )
}
