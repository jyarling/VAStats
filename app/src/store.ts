import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import acarsReducer from './acarsSlice'
import logbookReducer from './logbookSlice'
import fleetReducer from './fleetSlice'
import flightsReducer from './flightsSlice'
import notificationsReducer from './notificationsSlice'
import rosterReducer from './rosterSlice'
import dashboardReducer from './dashboardSlice'

const STORAGE_KEY = 'va-stats'

function loadState() {
  if (typeof localStorage === 'undefined') return undefined
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : undefined
  } catch {
    return undefined
  }
}

function saveState(state: RootState) {
  if (typeof localStorage === 'undefined') return
  try {
    const { auth, settings } = state
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ auth, settings }),
    )
  } catch {
    // ignore write errors
  }
}

const reducer = combineReducers({
  auth: authReducer,
  settings: settingsReducer,
  acars: acarsReducer,
  logbook: logbookReducer,
  fleet: fleetReducer,
  flights: flightsReducer,
  notifications: notificationsReducer,
  roster: rosterReducer,
  dashboard: dashboardReducer,
})

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  preloadedState: loadState() as any,
})

store.subscribe(() => saveState(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
