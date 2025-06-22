import { Button } from './button'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-lg bg-background p-4 space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div>{children}</div>
        <Button className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
