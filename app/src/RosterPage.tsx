import { useRoster } from './rosterSlice'
import PilotCard from './PilotCard'

export default function RosterPage() {
  const pilots = useRoster()

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roster</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {pilots.map(pilot => (
          <PilotCard key={pilot.id} pilot={pilot} />
        ))}
      </div>
    </div>
  )
}
