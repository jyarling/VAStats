import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import authReducer from './authSlice'
import settingsReducer from './settingsSlice'
import { flightsApi } from './flightsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    [flightsApi.reducerPath]: flightsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(flightsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
