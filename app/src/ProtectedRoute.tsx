import { Route, Navigate } from 'react-router-dom'
import { useAppSelector } from './storeHooks'
import { selectIsAuthenticated } from './authSlice'
import type { ReactElement } from 'react'

export type ProtectedRouteProps = React.ComponentProps<typeof Route>

export default function ProtectedRoute({ element, ...rest }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const routeElement: ReactElement = isAuthenticated ? (element as ReactElement) : <Navigate to="/login" replace />
  return <Route {...rest} element={routeElement} />
}
