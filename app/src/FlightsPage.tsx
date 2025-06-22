import { useState, useMemo } from 'react'
import { User, Pencil, Trash } from 'lucide-react'
import { useGetActiveFlightsQuery } from './flightsSlice'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Button,
  Input,
} from './components'

export default function FlightsPage() {
  const { data: flights = [], isLoading } = useGetActiveFlightsQuery()
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

  if (isLoading) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold">Active Flights</h1>
      <Input
        placeholder="Filter..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead>Pilot</TableHead>
            <TableHead>Origin</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Aircraft</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {flight.pilot}
                </span>
              </TableCell>
              <TableCell>{flight.origin}</TableCell>
              <TableCell>{flight.destination}</TableCell>
              <TableCell>{flight.aircraft}</TableCell>
              <TableCell className="space-x-2 text-right">
                <Button size="icon" variant="outline" onClick={() => {}}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => {}}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
