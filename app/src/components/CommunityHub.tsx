import { Calendar } from 'lucide-react'

export default function CommunityHub() {
  const activities = [
    { id: 1, pilot: 'John Doe', flight: 'VA123', avatar: 'https://via.placeholder.com/56' },
    { id: 2, pilot: 'Jane Smith', flight: 'VA456', avatar: 'https://via.placeholder.com/56' },
  ]

  const events = [
    { id: 1, name: 'Group Flight', date: 'June 12, 2024' },
    { id: 2, name: 'Training Session', date: 'July 5, 2024' },
  ]

  return (
    <div className="space-y-8 p-6 text-white">
      <header className="space-y-1">
        <h1 className="font-heading text-3xl">Community Hub</h1>
        <p className="font-body text-[#90adcb]">Latest airline activity and events</p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Active Flights</h2>
        <div className="aspect-video w-full overflow-hidden rounded-lg bg-[#223649]">
          <img src="https://via.placeholder.com/800x450" alt="Map" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Recent Activity</h2>
        <div className="space-y-2">
          {activities.map(act => (
            <div key={act.id} className="flex h-18 items-center gap-4 rounded-lg bg-[#101a23] p-4">
              <img src={act.avatar} alt="avatar" className="h-14 w-14 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="font-medium">Pilot: {act.pilot}</span>
                <span className="text-sm text-[#90adcb]">Flight: {act.flight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Upcoming Events</h2>
        <div className="space-y-2">
          {events.map(ev => (
            <div key={ev.id} className="flex h-18 items-center gap-4 rounded-lg bg-[#101a23] p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#223649]">
                <Calendar className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium">{ev.name}</span>
                <span className="text-sm text-[#90adcb]">{ev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
