export interface GaugeProps {
  label: string
}

export function Gauge({ label }: GaugeProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-gray-400 dark:border-gray-600">
        <span className="text-lg font-bold">--</span>
      </div>
      <span className="text-sm">{label}</span>
    </div>
  )
}
