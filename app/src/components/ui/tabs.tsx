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
      <div className="flex border-b mb-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setActive(t.value)}
            className={cn(
              'px-3 py-2 text-sm',
              active === t.value
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted hover:text-white',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>{tabs.find((t) => t.value === active)?.content}</div>
    </div>
  )
}
