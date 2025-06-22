import { Fragment } from 'react'
import { Listbox } from '@headlessui/react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../utils'

export interface Option<T> {
  value: T
  label: string
}

export interface SelectProps<T> {
  value: T
  onChange: (value: T) => void
  options: readonly Option<T>[]
  className?: string
}

export function Select<T extends string | number>({
  value,
  onChange,
  options,
  className,
}: SelectProps<T>) {
  const selected = options.find((o) => o.value === value)
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={cn('relative', className)}>
        <Listbox.Button className="flex w-max items-center justify-between rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white">
          <span className="truncate">{selected?.label}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0" />
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 mt-1 w-max rounded-md bg-white text-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <Listbox.Option key={option.value} value={option.value} as={Fragment}>
              {({ active, selected }) => (
                <li
                  className={cn(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-blue-600 text-white' : 'text-gray-900',
                  )}
                >
                  <span className={cn('block truncate', selected ? 'font-medium' : 'font-normal')}>{option.label}</span>
                  {selected && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                  )}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )
}
