import { useAppDispatch, useAppSelector } from './storeHooks'
import {
  startFlight,
  endFlight,
  startAcarsFeed,
  stopAcarsFeed,
  selectIsFlying,
  selectData,
} from './acarsSlice'

export function useAcars() {
  const dispatch = useAppDispatch()
  const isFlying = useAppSelector(selectIsFlying)
  const data = useAppSelector(selectData)
  return {
    isFlying,
    data,
    startFlight: () => dispatch(startFlight()),
    endFlight: () => dispatch(endFlight()),
    startAcarsFeed: () => dispatch(startAcarsFeed()),
    stopAcarsFeed: () => dispatch(stopAcarsFeed()),
  }
}
