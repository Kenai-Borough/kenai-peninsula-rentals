import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { getCurrentUser, signOut } from '../lib/supabase'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useState(() => {
    getCurrentUser().then(setUser)
  })

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">
                {import.meta.env.VITE_APP_NAME || 'Kenai Platform'}
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/browse" className="text-gray-700 hover:text-blue-600 font-medium">
              Browse Listings
            </Link>
            <Link to="/how-it-works" className="text-gray-700 hover:text-blue-600 font-medium">
              How It Works
            </Link>
            <Link to="/safety" className="text-gray-700 hover:text-blue-600 font-medium">
              Safety Tips
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                  My Dashboard
                </Link>
                <button onClick={handleSignOut} className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 flex items-center gap-2">
                <User size={18} />
                Sign In
              </Link>
            )}
            <Link
              to="/create-listing"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Post Listing - $10
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <Link to="/browse" className="block py-2 text-gray-700 hover:text-blue-600">
              Browse Listings
            </Link>
            <Link to="/how-it-works" className="block py-2 text-gray-700 hover:text-blue-600">
              How It Works
            </Link>
            <Link to="/safety" className="block py-2 text-gray-700 hover:text-blue-600">
              Safety Tips
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="block py-2 text-gray-700 hover:text-blue-600">
                  My Dashboard
                </Link>
                <button onClick={handleSignOut} className="block py-2 text-gray-700 hover:text-blue-600 w-full text-left">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">
                Sign In
              </Link>
            )}
            <Link
              to="/create-listing"
              className="block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg text-center hover:bg-blue-700"
            >
              Post Listing - $10
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
