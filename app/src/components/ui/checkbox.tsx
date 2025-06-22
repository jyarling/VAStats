import * as React from 'react'
import { cn } from '../utils'

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox({ className, ...props }, ref) {
    return (
      <input
        type="checkbox"
        ref={ref}
        className={cn(
          'h-4 w-4 rounded border-primary text-primary focus:ring-primary',
          className,
        )}
        {...props}
      />
    )
  },
)
