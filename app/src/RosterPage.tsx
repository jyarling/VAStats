import { useRoster } from './rosterSlice'

export default function RosterPage() {
  const pilots = useRoster()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-white">Roster</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pilots.map((pilot) => (
          <div
            key={pilot.id}
            className="flex flex-col items-center rounded-lg bg-gray-800 p-4 text-white"
          >
            <img
              src={pilot.avatarUrl}
              alt={pilot.name}
              className="h-24 w-24 rounded-full"
            />
            <div className="mt-2 text-lg font-semibold">{pilot.name}</div>
            <span className="mt-1 rounded bg-blue-600 px-2 text-white">
              {pilot.callsign}
            </span>
            <div className="mt-2 text-sm">Total Hours: {pilot.totalHours}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
