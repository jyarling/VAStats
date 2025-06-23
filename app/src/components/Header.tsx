import NotificationBell from './NotificationBell'
import { useAuth } from '../authHooks'
import { useAcars } from '../acarsHooks'

export default function Header() {
  const { user } = useAuth()
  const { isFlying } = useAcars()
  const username = user?.username ?? 'User'

  return (
    <header className="flex h-16 items-center justify-end border-b bg-white px-4 shadow text-gray-900 dark:bg-[#101a23] dark:text-white">
      <div className="mr-4 flex items-center gap-2">
        <img
          src="/images/profile.svg"
          alt="avatar"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-medium">{username}</span>
          <span className="flex items-center gap-1 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${isFlying ? 'bg-green-500' : 'bg-red-500'}`}
            />
            {isFlying ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>
      <NotificationBell />
    </header>
  )
}
