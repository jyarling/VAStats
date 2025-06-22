import { Calendar } from 'lucide-react'
import { useDashboard } from './dashboardSlice'

export default function HomePage() {
  const {
    totalFlights,
    totalHours,
    activeFlights,
    upcomingEvents,
    recentFlights,
  } = useDashboard()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-400">Total Flights</span>
          <span className="text-white text-2xl font-bold">{totalFlights}</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-400">Total Hours</span>
          <span className="text-white text-2xl font-bold">{totalHours}</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-400">Active Flights</span>
          <span className="text-white text-2xl font-bold">{activeFlights}</span>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-400">Upcoming Events</span>
          <span className="text-white text-2xl font-bold">{upcomingEvents.length}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Recent Flights</h2>
        <table className="w-full text-sm">
          <thead className="bg-gray-900 text-gray-300 sticky top-0">
            <tr>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Date</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Route</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Duration</th>
              <th className="px-4 py-2 border-b border-gray-700 text-left">Landing Rate</th>
            </tr>
          </thead>
          <tbody>
            {recentFlights.slice(0, 5).map((f) => (
              <tr key={f.id}>
                <td className="px-4 py-2 border-b border-gray-700">{f.date}</td>
                <td className="px-4 py-2 border-b border-gray-700">{f.route}</td>
                <td className="px-4 py-2 border-b border-gray-700">{f.duration}</td>
                <td className="px-4 py-2 border-b border-gray-700">{f.landingRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Upcoming Events</h2>
        <ul className="space-y-2">
          {upcomingEvents.slice(0, 3).map((ev) => (
            <li key={ev.id} className="bg-gray-800 rounded-lg p-2 flex items-center">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="ml-2 text-white">{ev.name}</span>
              <span className="ml-auto text-sm text-gray-400">{ev.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
