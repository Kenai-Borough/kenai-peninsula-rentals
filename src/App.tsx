import { AnimatePresence, motion } from 'framer-motion'
import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import { AdminRoute } from './components/auth/AdminRoute'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Footer from './components/Footer'
import Header from './components/Header'
import InstallPrompt from './components/InstallPrompt'
import LoadingSkeleton from './components/LoadingSkeleton'
import { KenaiAuthProvider } from './contexts/KenaiAuthContext'
import useAnalytics from './hooks/useAnalytics'

const BookingFlow = lazy(() => import('./pages/BookingFlow'))
const BrowsePage = lazy(() => import('./pages/BrowsePage'))
const CreateListingPage = lazy(() => import('./pages/CreateListingPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const HostGuide = lazy(() => import('./pages/HostGuide'))
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'))
const ListingDetailPage = lazy(() => import('./pages/ListingDetailPage'))
const LongTermRentals = lazy(() => import('./pages/LongTermRentals'))
const SafetyPage = lazy(() => import('./pages/SafetyPage'))
const KenaiAccount = lazy(async () => ({ default: (await import('./pages/auth/KenaiAccount')).KenaiAccount }))
const KenaiSignIn = lazy(async () => ({ default: (await import('./pages/auth/KenaiSignIn')).KenaiSignIn }))
const KenaiSignUp = lazy(async () => ({ default: (await import('./pages/auth/KenaiSignUp')).KenaiSignUp }))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'))
const DMCA = lazy(() => import('./pages/legal/DMCA'))
const AcceptableUse = lazy(() => import('./pages/legal/AcceptableUse'))
const FairHousing = lazy(() => import('./pages/legal/FairHousing'))

function AnimatedRoutes() {
  const location = useLocation()
  useAnalytics()
  return (
    <AnimatePresence mode="wait">
      <motion.main
        id="main-content"
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.2 }}
        className="flex-1"
      >
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/browse" element={<BrowsePage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/create-listing" element={<ProtectedRoute allowedRoles={['host', 'admin']}><CreateListingPage /></ProtectedRoute>} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/booking/:id" element={<BookingFlow />} />
            <Route path="/long-term" element={<LongTermRentals />} />
            <Route path="/host-guide" element={<HostGuide />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/sign-in" element={<KenaiSignIn />} />
            <Route path="/signin" element={<KenaiSignIn />} />
            <Route path="/login" element={<KenaiSignIn />} />
            <Route path="/sign-up" element={<KenaiSignUp />} />
            <Route path="/signup" element={<KenaiSignUp />} />
            <Route path="/account" element={<ProtectedRoute><KenaiAccount /></ProtectedRoute>} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/dmca" element={<DMCA />} />
            <Route path="/acceptable-use" element={<AcceptableUse />} />
            <Route path="/fair-housing" element={<FairHousing />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return <KenaiAuthProvider><Router><div className="min-h-screen bg-[var(--surface)] text-[var(--text)]"><a href="#main-content" className="sr-only absolute left-4 top-4 z-[90] rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg focus:not-sr-only">Skip to main content</a><InstallPrompt /><Header /><AnimatedRoutes /><Footer /></div></Router></KenaiAuthProvider>
}
