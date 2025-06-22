import { useAppSelector, useAppDispatch } from './storeHooks'
import { selectFleet, markMaintained } from './fleetSlice'
import { Button } from './components'

export default function MaintenanceDashboard() {
  const dispatch = useAppDispatch()
  const fleet = useAppSelector(selectFleet)

  const urgent = fleet.filter((ac) => ac.hours <= 5)
  const upcoming = fleet.filter((ac) => ac.hours > 5 && ac.hours <= 20)

  function handleDone(tail: string) {
    dispatch(markMaintained(tail))
  }

  const renderCard = (tail: string, hours: number, color: string) => (
    <div key={tail} className={`space-y-1 rounded p-4 text-white ${color}`}>
      <div className="text-lg font-semibold">{tail}</div>
      <div className="text-sm">{hours}h remaining</div>
      <Button size="sm" onClick={() => handleDone(tail)}>
        Mark Done
      </Button>
    </div>
  )

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-semibold">Urgent</h2>
        <div className="space-y-2">
          {urgent.length
            ? urgent.map((ac) => renderCard(ac.tail, ac.hours, 'bg-red-700'))
            : <div className="text-sm text-gray-500">No urgent items</div>}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <h2 className="text-xl font-semibold">Upcoming</h2>
        <div className="space-y-2">
          {upcoming.length
            ? upcoming.map((ac) => renderCard(ac.tail, ac.hours, 'bg-yellow-700'))
            : <div className="text-sm text-gray-500">No upcoming items</div>}
        </div>
      </div>
    </div>
  )
}
