import { useState, useMemo } from 'react'
import { User, Pencil, Trash, ChevronUp, ChevronDown } from 'lucide-react'
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
import type { Flight, SortField } from './flightsSlice'
import { useFlights } from './flightsHooks'
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
      className="border-b bg-white text-gray-900 last:border-b-0 dark:bg-gray-800 dark:text-white"
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
  const { flights, sort, reorder, toggleSort } = useFlights()
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

  function handleSort(field: SortField) {
    toggleSort(field)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    const from = flights.findIndex((f) => f.id === active.id)
    const to = flights.findIndex((f) => f.id === over.id)
    if (from !== to) reorder(from, to)
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
          <thead className="sticky top-0 bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
            <tr>
              <th
                onClick={() => handleSort('pilot')}
                className="cursor-pointer px-3 py-2 text-left font-semibold"
              >
                Pilot
                {sort.field === 'pilot' && (
                  sort.direction === 'asc' ? (
                    <ChevronUp className="ml-1 inline h-3 w-3" />
                  ) : (
                    <ChevronDown className="ml-1 inline h-3 w-3" />
                  )
                )}
              </th>
              <th
                onClick={() => handleSort('origin')}
                className="cursor-pointer px-3 py-2 text-left font-semibold"
              >
                Origin
                {sort.field === 'origin' && (
                  sort.direction === 'asc' ? (
                    <ChevronUp className="ml-1 inline h-3 w-3" />
                  ) : (
                    <ChevronDown className="ml-1 inline h-3 w-3" />
                  )
                )}
              </th>
              <th
                onClick={() => handleSort('destination')}
                className="cursor-pointer px-3 py-2 text-left font-semibold"
              >
                Destination
                {sort.field === 'destination' && (
                  sort.direction === 'asc' ? (
                    <ChevronUp className="ml-1 inline h-3 w-3" />
                  ) : (
                    <ChevronDown className="ml-1 inline h-3 w-3" />
                  )
                )}
              </th>
              <th
                onClick={() => handleSort('aircraft')}
                className="cursor-pointer px-3 py-2 text-left font-semibold"
              >
                Aircraft
                {sort.field === 'aircraft' && (
                  sort.direction === 'asc' ? (
                    <ChevronUp className="ml-1 inline h-3 w-3" />
                  ) : (
                    <ChevronDown className="ml-1 inline h-3 w-3" />
                  )
                )}
              </th>
              <th className="px-3 py-2 text-right font-semibold">Actions</th>
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

