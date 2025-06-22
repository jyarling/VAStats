import { Calendar } from 'lucide-react'

export default function CommunityHub() {
  const flights = [
    {
      id: 1,
      callsign: 'VA123',
      origin: 'KJFK',
      destination: 'KLAX',
      image: '/images/placeholder-800x450.svg',
    },
    {
      id: 2,
      callsign: 'VA456',
      origin: 'EGLL',
      destination: 'LFPG',
      image: '/images/placeholder-800x450.svg',
    },
  ]

  const activities = [
    {
      id: 1,
      pilot: 'John Doe',
      flight: 'VA123',
      avatar: '/images/placeholder-56.svg',
    },
    {
      id: 2,
      pilot: 'Jane Smith',
      flight: 'VA456',
      avatar: '/images/placeholder-56.svg',
    },
  ]

  const events = [
    { id: 1, name: 'Group Flight', date: 'June 12, 2024' },
    { id: 2, name: 'Training Session', date: 'July 5, 2024' },
  ]

  return (
    <div className="space-y-8 p-6 text-gray-900 dark:text-white">
      <header className="space-y-1">
        <h1 className="font-heading text-3xl">Community Hub</h1>
        <p className="font-body text-[#90adcb]">Latest airline activity and events</p>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Active Flights</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {flights.map(f => (
            <div
              key={f.id}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <img src={f.image} alt="map" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <span className="font-medium">{f.callsign}</span>
                <span className="text-sm text-[#90adcb]">
                  {f.origin} ➜ {f.destination}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Recent Activity</h2>
        <div className="flex gap-3 overflow-x-auto md:grid md:grid-cols-3">
          {activities.map(act => (
            <div
              key={act.id}
              className="flex min-w-[150px] items-center gap-3 rounded-lg bg-gray-200 p-3 flex-shrink-0 dark:bg-gray-800"
            >
              <img src={act.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{act.pilot}</span>
                <span className="text-xs text-[#90adcb]">{act.flight}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl">Upcoming Events</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {events.map(ev => (
            <div
              key={ev.id}
              className="flex items-center gap-3 rounded-lg bg-gray-200 p-4 dark:bg-[#101a23]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 dark:bg-[#223649]">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{ev.name}</span>
                <span className="text-xs text-[#90adcb]">{ev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
