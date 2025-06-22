import { useState, useMemo } from 'react'
import { User, Pencil, Trash } from 'lucide-react'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  closestCenter,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useAppDispatch, useAppSelector } from './storeHooks'
import { selectFlights, reorderFlights, type Flight } from './flightsSlice'
import { Button, Input } from './components'

function SortableRow({ flight }: { flight: Flight }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: flight.id,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-800 text-white border-b last:border-b-0"
    >
      <td className="px-3 py-2">
        <span className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {flight.pilot}
        </span>
      </td>
      <td className="px-3 py-2">{flight.origin}</td>
      <td className="px-3 py-2">{flight.destination}</td>
      <td className="px-3 py-2">{flight.aircraft}</td>
      <td className="px-3 py-2 space-x-2 text-right">
        <Button size="icon" variant="outline" onClick={() => {}}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="destructive" onClick={() => {}}>
          <Trash className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  )
}

export default function FlightsPage() {
  const flights = useAppSelector(selectFlights)
  const dispatch = useAppDispatch()
  const [filter, setFilter] = useState('')

  const filtered = useMemo(() => {
    const term = filter.toLowerCase()
    return flights.filter(
      (f) =>
        f.pilot.toLowerCase().includes(term) ||
        f.origin.toLowerCase().includes(term) ||
        f.destination.toLowerCase().includes(term) ||
        f.aircraft.toLowerCase().includes(term),
    )
  }, [flights, filter])

  const sensors = useSensors(useSensor(PointerSensor))

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const from = flights.findIndex((f) => f.id === active.id)
    const to = flights.findIndex((f) => f.id === over.id)
    if (from !== to) dispatch(reorderFlights({ from, to }))
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Active Flights</h1>
      <Input
        placeholder="Filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-900 text-gray-300 sticky top-0">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Pilot</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Origin</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Destination</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Aircraft</th>
              <th className="px-3 py-2 text-right font-semibold text-gray-400">Actions</th>
            </tr>
          </thead>
          <SortableContext
            items={filtered.map((f) => f.id)}
            strategy={verticalListSortingStrategy}
          >
            <tbody>
              {filtered.map((flight) => (
                <SortableRow key={flight.id} flight={flight} />
              ))}
            </tbody>
          </SortableContext>
        </table>
      </DndContext>
      </div>
  )
}

