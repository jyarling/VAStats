import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import acarsReducer from './acarsSlice'
import logbookReducer from './logbookSlice'
import fleetReducer from './fleetSlice'
import flightsReducer from './flightsSlice'
import notificationsReducer from './notificationsSlice'
import rosterReducer from './rosterSlice'
import liveFlightsReducer from './liveFlightsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    acars: acarsReducer,
    logbook: logbookReducer,
    fleet: fleetReducer,
    flights: flightsReducer,
    liveFlights: liveFlightsReducer,
    notifications: notificationsReducer,
    roster: rosterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
