import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Label, Tabs } from './components'
import { useAuth } from './authHooks'

export function LoginScreen() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [regUsername, setRegUsername] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regError, setRegError] = useState('')

  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === 'user' && password === 'pass') {
      auth.login()
      navigate('/dashboard')
    } else {
      setError('Invalid username or password')
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (regUsername && regEmail && regPassword) {
      auth.login()
      navigate('/dashboard')
    } else {
      setRegError('All fields are required')
    }
  }

  const loginForm = (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )

  const registerForm = (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="reg-username">Username</Label>
        <Input
          id="reg-username"
          value={regUsername}
          onChange={(e) => setRegUsername(e.target.value)}
          placeholder="Username"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="reg-email">Email</Label>
        <Input
          id="reg-email"
          type="email"
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
          placeholder="Email"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="reg-password">Password</Label>
        <Input
          id="reg-password"
          type="password"
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
          placeholder="Password"
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>
      {regError && <p className="text-sm text-red-500">{regError}</p>}
      <Button type="submit" className="w-full">
        Register
      </Button>
    </form>
  )

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-sm rounded-md bg-white p-6 shadow">
        <Tabs
          className="space-y-4"
          tabs={[
            { value: 'login', label: 'Sign In', content: loginForm },
            { value: 'register', label: 'Register', content: registerForm },
          ]}
        />
      </div>
    </div>
  )
}

export default LoginScreen
