import type { ButtonHTMLAttributes } from 'react'
import { Button } from './ui'
import { downloadCsv } from '../utils/downloadCsv'

export interface CSVExportButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  data: Array<Record<string, unknown>>
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

    downloadCsv(data, filename)
  }

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  )
}

export default CSVExportButton
