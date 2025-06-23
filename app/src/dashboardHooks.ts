import { useAppSelector } from './storeHooks'
import { selectDashboard } from './dashboardSlice'

export function useDashboard() {
  return useAppSelector(selectDashboard)
}
