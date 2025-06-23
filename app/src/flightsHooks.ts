import { useAppDispatch, useAppSelector } from './storeHooks'
import {
  selectFlights,
  selectSort,
  reorderFlights,
  toggleSort,
  type SortField,
} from './flightsSlice'

export function useFlights() {
  const dispatch = useAppDispatch()
  const flights = useAppSelector(selectFlights)
  const sort = useAppSelector(selectSort)
  return {
    flights,
    sort,
    reorder: (from: number, to: number) =>
      dispatch(reorderFlights({ from, to })),
    toggleSort: (field: SortField) => dispatch(toggleSort(field)),
  }
}
