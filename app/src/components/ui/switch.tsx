import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '../utils'

export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  className?: string
}

export function Switch({ checked = false, onChange, className }: SwitchProps) {
  return (
    <HeadlessSwitch
      checked={checked}
      onChange={onChange}
      aria-checked={checked}
      className={cn(
        checked ? 'bg-blue-600' : 'bg-gray-600',
        'relative inline-flex h-6 w-10 flex-shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
        className,
      )}
    >
      <span className="sr-only">Toggle</span>
      <span
        aria-hidden="true"
        className={cn(
          checked ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0.5 top-0.5 h-5 w-5 transform rounded-full bg-white transition',
        )}
      />
    </HeadlessSwitch>
  )
}
