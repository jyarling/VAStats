import { useNavigate } from 'react-router-dom'
import { Button } from './components'
import SettingsSection from './SettingsSection'
import { useAuth } from './authSlice'

export function ProfilePage() {
  const auth = useAuth()
  const navigate = useNavigate()
  const user = auth.user ?? { username: 'user', email: 'user@example.com' }

  const handleLogout = () => {
    auth.logout()
    navigate('/login')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-sm space-y-4 rounded-lg bg-white p-6 text-gray-900 dark:bg-[#101a23] dark:text-white">
        <img
          src="/images/profile.png"
          alt="avatar"
          className="mx-auto h-24 w-24 rounded-full object-cover"
        />
        <div className="space-y-1 text-center">
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-300">{user.email}</p>
        </div>
        <Button className="w-full" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <SettingsSection />
    </div>
  )
}

export default ProfilePage
