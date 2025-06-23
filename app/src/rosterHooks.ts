import { useAppSelector } from './storeHooks'
import { selectRoster } from './rosterSlice'

export function useRoster() {
  return useAppSelector(selectRoster)
}
