import { useState } from 'react'
import { cn } from '../utils'

export interface Tab {
  value: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  tabs: Tab[]
  defaultValue?: string
  className?: string
}

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [active, setActive] = useState(defaultValue ?? tabs[0]?.value)
  return (
    <div className={className}>
      <div className="mb-4 border-b border-gray-300 dark:border-gray-700">
        <nav className="-mb-px flex space-x-2">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActive(t.value)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-md',
                active === t.value
                  ? 'bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 border-b-transparent text-blue-600'
                  : 'border border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700',
              )}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
      <div>{tabs.find((t) => t.value === active)?.content}</div>
    </div>
  )
}
