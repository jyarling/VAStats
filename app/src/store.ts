import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import acarsReducer from './acarsSlice'
import logbookReducer from './logbookSlice'
import fleetReducer from './fleetSlice'
import { flightsApi } from './flightsSlice'
import notificationsReducer from './notificationsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    acars: acarsReducer,
    logbook: logbookReducer,
    fleet: fleetReducer,
    notifications: notificationsReducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
