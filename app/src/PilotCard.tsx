import { UserCircle } from 'lucide-react'
import type { Pilot } from './rosterSlice'

interface PilotCardProps {
  pilot: Pilot
}

export default function PilotCard({ pilot }: PilotCardProps) {
  const { avatarUrl, name, callsign, totalHours } = pilot

  return (
    <div className="flex flex-col items-center rounded-lg bg-white px-4 py-6 text-gray-900 dark:bg-gray-800 dark:text-white">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="h-[60px] w-[60px] rounded-full object-cover"
        />
      ) : (
        <UserCircle className="h-[60px] w-[60px] rounded-full text-gray-500" />
      )}
      <div className="mt-2 max-w-full truncate text-lg font-semibold">{name}</div>
      <span className="mt-1 rounded bg-blue-600 px-2 text-white">{callsign}</span>
      <div className="mt-2 text-sm">Total Hours: {totalHours}</div>
    </div>
  )
}
