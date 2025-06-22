import NotificationBell from './NotificationBell'

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-end border-b bg-white px-4 shadow dark:bg-[#101a23]">
      <NotificationBell />
    </header>
  )
}
