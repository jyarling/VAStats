import { createContext, useContext } from 'react'

interface AuthContextValue {
  login: () => void
}

const AuthContext = createContext<AuthContextValue>({
  login: () => {},
})

export function useAuth() {
  return useContext(AuthContext)
}

export default AuthContext
