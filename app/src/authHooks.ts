import { useAppDispatch, useAppSelector } from './storeHooks'
import { login, logout, selectIsAuthenticated, selectUser } from './authSlice'

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
