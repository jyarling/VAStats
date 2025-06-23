import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Header, ChatAndNotifications } from './components'
import LoginScreen from './LoginScreen'
import ProtectedRoute from './ProtectedRoute'
import FlightsPage from './FlightsPage'
import CommunityHub from './components/CommunityHub'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'
import RosterPage from './RosterPage'
import HomePage from './HomePage'


function ProtectedLayout() {
  const [open, setOpen] = useState(() => window.innerWidth >= 1024)

  return (
    <div className="flex">
      <Sidebar open={open} onToggle={setOpen} />
      <div
        className={`flex flex-1 flex-col transition-all lg:ml-80 ${open ? 'ml-80' : 'ml-16'}`}
      >
        <Header />
        <main className="flex-1 p-4 text-gray-900 dark:text-white">
          <Outlet />
        </main>
      </div>
      <ChatAndNotifications />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ProtectedLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<HomePage />} />
            <Route path="flights" element={<FlightsPage />} />
            <Route path="community" element={<CommunityHub />} />
            <Route path="roster" element={<RosterPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
