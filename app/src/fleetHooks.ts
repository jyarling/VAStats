import { useAppDispatch, useAppSelector } from './storeHooks'
import { addAircraft, markMaintained, selectFleet, type Aircraft } from './fleetSlice'

export function useFleet() {
  const dispatch = useAppDispatch()
  const aircraft = useAppSelector(selectFleet)
  return {
    aircraft,
    addAircraft: (a: Aircraft) => dispatch(addAircraft(a)),
    markMaintained: (tail: string) => dispatch(markMaintained(tail)),
  }
}
