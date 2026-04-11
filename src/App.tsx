import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import BookingFlow from './pages/BookingFlow'
import BrowsePage from './pages/BrowsePage'
import CreateListingPage from './pages/CreateListingPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import HostGuide from './pages/HostGuide'
import HowItWorksPage from './pages/HowItWorksPage'
import ListingDetailPage from './pages/ListingDetailPage'
import LoginPage from './pages/LoginPage'
import LongTermRentals from './pages/LongTermRentals'
import SafetyPage from './pages/SafetyPage'
import SignUpPage from './pages/SignUpPage'
import AdminDashboard from './pages/admin/AdminDashboard'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.main key={location.pathname} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.2 }} className="flex-1">
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/create-listing" element={<CreateListingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/booking/:id" element={<BookingFlow />} />
          <Route path="/long-term" element={<LongTermRentals />} />
          <Route path="/host-guide" element={<HostGuide />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/safety" element={<SafetyPage />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[var(--surface)] text-[var(--text)]">
        <Header />
        <AnimatedRoutes />
        <Footer />
      </div>
    </Router>
  )
}
