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
      className={cn(
        checked ? 'bg-blue-600' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
        className,
      )}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={cn(
          checked ? 'translate-x-5' : 'translate-x-0',
          'inline-block h-5 w-5 transform rounded-full bg-white transition',
        )}
      />
    </HeadlessSwitch>
  )
}
