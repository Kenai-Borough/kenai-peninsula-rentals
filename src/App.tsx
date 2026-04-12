
import { AnimatePresence, motion } from 'framer-motion'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AdminRoute } from './components/auth/AdminRoute'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Footer from './components/Footer'
import Header from './components/Header'
import { KenaiAuthProvider } from './contexts/KenaiAuthContext'
import BookingFlow from './pages/BookingFlow'
import BrowsePage from './pages/BrowsePage'
import CreateListingPage from './pages/CreateListingPage'
import DashboardPage from './pages/DashboardPage'
import HomePage from './pages/HomePage'
import HostGuide from './pages/HostGuide'
import HowItWorksPage from './pages/HowItWorksPage'
import ListingDetailPage from './pages/ListingDetailPage'
import LongTermRentals from './pages/LongTermRentals'
import SafetyPage from './pages/SafetyPage'
import { KenaiAccount } from './pages/auth/KenaiAccount'
import { KenaiSignIn } from './pages/auth/KenaiSignIn'
import { KenaiSignUp } from './pages/auth/KenaiSignUp'
import AdminDashboard from './pages/admin/AdminDashboard'
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import CookiePolicy from './pages/legal/CookiePolicy';
import DMCA from './pages/legal/DMCA';
import AcceptableUse from './pages/legal/AcceptableUse';
import FairHousing from './pages/legal/FairHousing';

function AnimatedRoutes() {
  const location = useLocation()
  return <AnimatePresence mode="wait"><motion.main key={location.pathname} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.2 }} className="flex-1"><Routes location={location}><Route path="/" element={<HomePage />} /><Route path="/browse" element={<BrowsePage />} /><Route path="/listing/:id" element={<ListingDetailPage />} /><Route path="/create-listing" element={<ProtectedRoute allowedRoles={['host', 'admin']}><CreateListingPage /></ProtectedRoute>} /><Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} /><Route path="/booking/:id" element={<BookingFlow />} /><Route path="/long-term" element={<LongTermRentals />} /><Route path="/host-guide" element={<HostGuide />} /><Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} /><Route path="/sign-in" element={<KenaiSignIn />} /><Route path="/signin" element={<KenaiSignIn />} /><Route path="/login" element={<KenaiSignIn />} /><Route path="/sign-up" element={<KenaiSignUp />} /><Route path="/signup" element={<KenaiSignUp />} /><Route path="/account" element={<ProtectedRoute><KenaiAccount /></ProtectedRoute>} /><Route path="/how-it-works" element={<HowItWorksPage />} /><Route path="/safety" element={<SafetyPage />} /></Routes></motion.main></AnimatePresence>
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/cookies" element={<CookiePolicy />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/acceptable-use" element={<AcceptableUse />} />
                <Route path="/fair-housing" element={<FairHousing />} />
}

export default function App() { return <KenaiAuthProvider><Router><div className="min-h-screen bg-[var(--surface)] text-[var(--text)]"><Header /><AnimatedRoutes /><Footer /></div></Router></KenaiAuthProvider> }
