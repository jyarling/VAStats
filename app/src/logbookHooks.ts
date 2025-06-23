import { useAppSelector } from './storeHooks'
import { selectLogbook } from './logbookSlice'

export function useLogbook() {
  return useAppSelector(selectLogbook)
}
