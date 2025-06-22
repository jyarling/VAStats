import { useState } from 'react'
import { Button, Dialog, Input, Label, Select } from './components'
import { useFleet } from './fleetSlice'

type Status = 'OK' | 'Needs Maintenance'

const statusOptions = [
  { value: 'OK', label: 'OK' },
  { value: 'Needs Maintenance', label: 'Needs Maintenance' },
] as const

export default function FleetPage() {
  const { aircraft, addAircraft } = useFleet()
  const [open, setOpen] = useState(false)
  const [tail, setTail] = useState('')
  const [hours, setHours] = useState('')
  const [status, setStatus] = useState<Status>('OK')

  function reset() {
    setTail('')
    setHours('')
    setStatus('OK')
  }

  function handleSubmit() {
    if (!tail) return
    addAircraft({ tail, hours: Number(hours), status })
    reset()
    setOpen(false)
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fleet</h1>
        <Button onClick={() => setOpen(true)}>Add Aircraft</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {aircraft.map((ac) => (
          <div
            key={ac.tail}
            className="space-y-1 rounded-lg border border-gray-200 bg-white p-4"
          >
            <div className="text-lg font-semibold">{ac.tail}</div>
            <div className="text-sm text-gray-600">Hours: {ac.hours}</div>
            <span
              className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                ac.status === 'OK'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {ac.status}
            </span>
          </div>
        ))}
      </div>
      <Dialog open={open} onClose={() => setOpen(false)} title="Add Aircraft">
        <div className="space-y-2">
          <Label htmlFor="tail">Tail Number</Label>
          <Input id="tail" value={tail} onChange={(e) => setTail(e.target.value)} />
          <Label htmlFor="hours">Hours</Label>
          <Input
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onChange={(val) => setStatus(val as Status)}
            options={statusOptions}
            className="w-full"
          />
          <Button className="w-full" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
