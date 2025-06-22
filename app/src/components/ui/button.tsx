import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../utils'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'icon'
}

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: 'bg-primary text-white hover:bg-primary/80',
  outline: 'border border-gray-300 hover:bg-primary/20',
  destructive: 'bg-red-600 text-white hover:bg-red-500',
}

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  default: 'h-10 px-4 py-2 text-sm rounded-md',
  sm: 'h-8 px-3 text-sm rounded-md',
  icon: 'h-10 w-10 p-2 rounded-md',
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}
