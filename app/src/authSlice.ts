import { createSlice } from '@reduxjs/toolkit'
import { useAppDispatch, useAppSelector } from './store'
import type { RootState } from './store'

export interface AuthState {
  isAuthenticated: boolean
  user: {
    username: string
    email: string
  } | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true
      state.user = { username: 'user', email: 'user@example.com' }
    },
    logout(state) {
      state.isAuthenticated = false
      state.user = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated
export const selectUser = (state: RootState) => state.auth.user

export function useAuth() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const user = useAppSelector(selectUser)
  return {
    isAuthenticated,
    user,
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
  }
}
