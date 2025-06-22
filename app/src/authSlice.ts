import { createSlice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import type { RootState } from './store'

export interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
    },
    logout(state) {
      state.isAuthenticated = false
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated

export function useAuth() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  return {
    isAuthenticated,
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
}
