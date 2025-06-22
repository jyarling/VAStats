import NotificationBell from './NotificationBell'

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-end border-b bg-white px-4 shadow text-gray-900 dark:bg-[#101a23] dark:text-white">
      <NotificationBell />
    </header>
  )
}
