import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ActiveFlights from './ActiveFlights'
import UiElements from './UiElements'
import Dashboard from './pages/Dashboard'
import LiveFlight from './pages/LiveFlight'
import Logbook from './pages/Logbook'
import Fleet from './pages/Fleet'
import VirtualAirline from './pages/VirtualAirline'
import Settings from './pages/Settings'
import { Sidebar } from './components'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-background text-white">
        <Sidebar />
        <div className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/live-flight" element={<LiveFlight />} />
            <Route path="/logbook" element={<Logbook />} />
            <Route path="/fleet" element={<Fleet />} />
            <Route path="/virtual-airline" element={<VirtualAirline />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/active-flights" element={<ActiveFlights />} />
            <Route path="/elements" element={<UiElements />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App;
