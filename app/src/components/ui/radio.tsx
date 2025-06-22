import * as React from 'react'
import { cn } from '../utils'

export type RadioProps = React.InputHTMLAttributes<HTMLInputElement>

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio({ className, ...props }, ref) {
    return (
      <input
        type="radio"
        ref={ref}
        className={cn(
          'h-4 w-4 border-primary text-primary focus:ring-primary',
          className,
        )}
        {...props}
      />
    )
  },
)
