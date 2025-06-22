import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Plane,
  BookOpen,
  PlaneTakeoff,
  Building2,
  Settings as SettingsIcon,
} from 'lucide-react'
import { cn } from './utils'

interface Item {
  to: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const items: Item[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/live-flight', label: 'Live Flight', icon: Plane },
  { to: '/logbook', label: 'Logbook', icon: BookOpen },
  { to: '/fleet', label: 'Fleet', icon: PlaneTakeoff },
  { to: '/virtual-airline', label: 'Virtual Airline', icon: Building2 },
  { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

export function Sidebar() {
  return (
    <nav className="w-48 space-y-1 bg-background p-4">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
              isActive
                ? 'bg-primary text-white'
                : 'text-muted hover:bg-primary/60'
            )
          }
        >
          <Icon className="h-4 w-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
