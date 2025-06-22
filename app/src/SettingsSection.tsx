import { useEffect } from 'react'
import { Listbox } from '@headlessui/react'
import { Switch } from './components'
import { Check, ChevronDown } from 'lucide-react'
import { useSettings } from './settingsSlice'

const distanceOptions = [
  { value: 'nm', label: 'Nautical Miles' },
  { value: 'km', label: 'Kilometers' },
] as const

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
    <div className="w-full max-w-sm space-y-4 rounded-lg bg-gray-100 p-6 text-gray-900 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center justify-between">
        <span>Dark Theme</span>
        <Switch
          checked={theme === 'dark'}
          onChange={toggleTheme}
          className={`${theme === 'dark' ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Distance Unit</label>
        <Listbox value={distanceUnit} onChange={setDistanceUnit}>
          <div className="relative">
            <Listbox.Button className="relative flex min-w-[8rem] cursor-default items-center justify-between rounded-md bg-white py-1.5 pl-3 pr-8 text-left focus:outline-none dark:bg-gray-700 dark:text-white">
              <span className="block truncate">
                {distanceOptions.find((o) => o.value === distanceUnit)?.label}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700 dark:text-white">
              {distanceOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-8 pr-4 ${active ? 'bg-blue-600 text-white' : 'text-gray-200'}`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{option.label}</span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-white">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
    </div>
  )
}
