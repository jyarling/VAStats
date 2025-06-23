import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface Event {
  id: number
  name: string
  date: string
}

export interface RecentFlight {
  id: number
  date: string
  route: string
  duration: string
  landingRate: number
}

export interface DashboardState {
  totalFlights: number
  totalHours: number
  activeFlights: number
  upcomingEvents: Event[]
  recentFlights: RecentFlight[]
}

const initialState: DashboardState = {
  totalFlights: 42,
  totalHours: 123.5,
  activeFlights: 3,
  upcomingEvents: [
    { id: 1, name: 'Group Flight', date: '2024-06-12' },
    { id: 2, name: 'Training Session', date: '2024-07-05' },
    { id: 3, name: 'Airshow', date: '2024-08-20' },
  ],
  recentFlights: [
    { id: 1, date: '2024-05-10', route: 'KJFK-KLAX', duration: '05:30', landingRate: -120 },
    { id: 2, date: '2024-05-12', route: 'EGLL-EDDM', duration: '01:45', landingRate: -250 },
    { id: 3, date: '2024-05-14', route: 'KLAX-YSSY', duration: '14:00', landingRate: -180 },
    { id: 4, date: '2024-05-18', route: 'KSEA-CYYZ', duration: '04:20', landingRate: -220 },
    { id: 5, date: '2024-05-20', route: 'EHAM-LFPG', duration: '01:10', landingRate: -150 },
  ],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
})

export default dashboardSlice.reducer

export const selectDashboard = (state: RootState) => state.dashboard

