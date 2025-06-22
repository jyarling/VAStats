import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Plane, Users, Calendar, Settings, Shield, Menu, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../authSlice'

interface SidebarProps {
  open?: boolean
  onToggle?: (open: boolean) => void
}

export default function Sidebar({ open = false, onToggle }: SidebarProps) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = onToggle !== undefined
  const isOpen = isControlled ? open : internalOpen

  const toggle = () => {
    if (isControlled) onToggle?.(!open)
    else setInternalOpen(!internalOpen)
  }

  const items = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/flights', label: 'Flights', icon: Plane },
    { to: '/community', label: 'Community', icon: Users },
    { to: '/roster', label: 'Roster', icon: Calendar },
    { to: '/settings', label: 'Settings', icon: Settings },
  ]

  const admin = { to: '/admin', label: 'Admin', icon: Shield }

  const AdminIcon = admin.icon
  const auth = useAuth()
  const navigate = useNavigate()

  const handleSignOut = () => {
    auth.logout()
    navigate('/login')
  }
  
  return (
    <aside
      className={`fixed left-0 top-0 z-20 h-full transition-all lg:w-80 ${
        isOpen ? 'w-80' : 'w-16'
      } bg-gray-100 text-gray-900 dark:bg-[#101a23] dark:text-white`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 text-gray-900 dark:text-white">
          <span className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <span className={`${isOpen ? 'block' : 'hidden lg:block'} font-heading text-xl`}>VA Stats</span>
          </span>
          <button className="lg:hidden" onClick={toggle}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 px-2">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-[#223649] ${
                  isActive ? 'bg-gray-200 dark:bg-[#223649]' : ''
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto space-y-1 px-2 pb-4">
          <NavLink
            to={admin.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-[#223649] ${
                isActive ? 'bg-gray-200 dark:bg-[#223649]' : ''
              }`
            }
          >
            <AdminIcon className="h-5 w-5" />
            <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>{admin.label}</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-md p-2 text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-[#223649]"
          >
            <LogOut className="h-5 w-5" />
            <span className={`${isOpen ? 'block' : 'hidden lg:block'}`}>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
