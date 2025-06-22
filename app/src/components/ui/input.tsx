import * as React from 'react'
import { cn } from '../utils'

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, type = 'text', ...props }, ref) {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          'flex h-10 w-full rounded-md border border-primary bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary',
          className,
        )}
        {...props}
      />
    )
  },
)
