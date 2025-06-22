import { useState, useEffect, useRef } from 'react'
import { Bell } from 'lucide-react'
import { useNotifications } from '../notificationsSlice'

export default function NotificationBell() {
  const { unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const notifications = [
    'New PIREP received',
    'Group flight at Flight: SBV123',
  ]

  return (
    <div className="relative" ref={bellRef}>
      <button
        className="relative rounded-full p-2"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-6 w-6 text-gray-900 dark:text-white" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-[#101a23]">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            {notifications.map((note, i) => (
              <li
                key={i}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#223649]"
              >
                {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
