import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from './storeHooks'
import { selectIsAuthenticated } from './authSlice'

export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
