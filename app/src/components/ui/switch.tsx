import { useState } from 'react'
import { cn } from '../utils'

export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ checked = false, onChange, className }: SwitchProps) {
  const [state, setState] = useState(checked)
  const toggle = () => {
    const value = !state
    setState(value)
    onChange?.(value)
  }
  return (
    <button
      role="switch"
      aria-checked={state}
      onClick={toggle}
      className={cn(
        'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
        state ? 'bg-primary' : 'bg-gray-600',
        className,
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition',
          state ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  )
}
