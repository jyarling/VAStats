import { Button, Gauge } from './components'
import { startFlight, endFlight } from './acarsSlice'
import { useAppDispatch } from './storeHooks'

export default function LiveFlightPage() {
  const dispatch = useAppDispatch()

  return (
    <div className="space-y-4 p-4">
      <div className="space-x-2">
        <Button onClick={() => dispatch(startFlight())}>Start Flight</Button>
        <Button onClick={() => dispatch(endFlight())}>End Flight</Button>
      </div>
      <div className="flex gap-4">
        <Gauge label="IAS" />
        <Gauge label="ALT" />
        <Gauge label="VS" />
      </div>
    </div>
  )
}
