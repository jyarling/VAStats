import type { HTMLAttributes } from 'react'
import { forwardRef } from 'react'
import { cn } from '../utils'

export const Table = forwardRef<HTMLTableElement, HTMLAttributes<HTMLTableElement>>(function Table({ className, ...props }, ref) {
  return <table ref={ref} className={cn('w-full border-collapse text-sm', className)} {...props} />
})

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('sticky top-0 bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300', className)}
      {...props}
    />
  )
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={className} {...props} />
}

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(function TableRow({ className, ...props }, ref) {
  return <tr ref={ref} className={cn('border-b last:border-b-0', className)} {...props} />
})

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('px-3 py-2 text-left font-semibold', className)} {...props} />
}

export function TableCell({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('px-3 py-2', className)} {...props} />
}
