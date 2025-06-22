import type { ButtonHTMLAttributes } from 'react'
import { Button } from './ui'

export interface CSVExportButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: any[]
  filename: string
}

export function CSVExportButton({
  data,
  filename,
  children = 'Export CSV',
  onClick,
  ...props
}: CSVExportButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    if (e.defaultPrevented) return

    if (data.length === 0) return
    const headers = Object.keys(data[0])
    const rows = data.map(row =>
      headers.map(h => JSON.stringify((row as Record<string, any>)[h] ?? '')).join(',')
    )
    const csv = [headers.join(','), ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default CSVExportButton
