import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import CommunityHub from './components/CommunityHub'
import FlightsPage from './FlightsPage'
import UiElements from './UiElements'

function Placeholder({ title }: { title: string }) {
  return <div className="p-6 text-white">{title}</div>
}

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <Router>
      <Sidebar open={open} onToggle={setOpen} />
      <div className={`ml-16 transition-all lg:ml-80 ${open ? 'ml-80' : 'ml-16'}`}> 
        <Routes>
          <Route path="/" element={<Placeholder title="Home" />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/roster" element={<Placeholder title="Roster" />} />
          <Route path="/settings" element={<Placeholder title="Settings" />} />
          <Route path="/elements" element={<UiElements />} />
          <Route path="/admin" element={<Placeholder title="Admin" />} />
        </Routes>
      </div>
    </Router>
  )
}
