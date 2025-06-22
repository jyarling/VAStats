import { Calendar } from 'lucide-react'
import { useAppSelector } from './storeHooks'
import { selectLogbook } from './logbookSlice'
import { selectFlights } from './flightsSlice'

function parseDuration(duration: string): number {
  const [h, m] = duration.split(':').map(Number)
  return h + m / 60
}

export default function HomePage() {
  const logbook = useAppSelector(selectLogbook)
  const flights = useAppSelector(selectFlights)

  const totalFlights = logbook.length
  const totalHours = logbook.reduce((sum, f) => sum + parseDuration(f.duration), 0)
  const activeFlights = flights.length

  const events = [
    { id: 1, name: 'Group Flight', date: '2024-06-12' },
    { id: 2, name: 'Training Session', date: '2024-07-05' },
    { id: 3, name: 'Airshow', date: '2024-08-20' },
  ]

  const recent = [...logbook].slice(-5).reverse()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
          <span>Total Flights</span>
          <span className="text-3xl font-bold">{totalFlights}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
          <span>Total Hours</span>
          <span className="text-3xl font-bold">{totalHours.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
          <span>Active Flights</span>
          <span className="text-3xl font-bold">{activeFlights}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-gray-800 p-4">
          <span>Upcoming Events</span>
          <span className="text-3xl font-bold">{events.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recent Flights</h2>
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Date</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Route</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Duration</th>
              <th className="px-3 py-2 text-left font-semibold text-gray-400">Landing Rate</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((f) => (
              <tr key={f.id} className="border-b bg-gray-800 text-white last:border-b-0">
                <td className="px-3 py-2">{f.date}</td>
                <td className="px-3 py-2">{f.route}</td>
                <td className="px-3 py-2">{f.duration}</td>
                <td className="px-3 py-2">{f.landingRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <ul className="space-y-2">
          {events.slice(0, 3).map((ev) => (
            <li key={ev.id} className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{ev.name}</span>
              <span className="ml-auto text-sm text-gray-400">{ev.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
