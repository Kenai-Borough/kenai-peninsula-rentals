import { Link } from 'react-router-dom'
import { Shield, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{import.meta.env.VITE_APP_NAME || 'Kenai Platform'}</h3>
            <p className="text-gray-400">
              Alaska's most trusted listing platform. Simple, safe, and affordable.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Buyers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/browse" className="hover:text-white">Browse Listings</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link to="/safety" className="hover:text-white">Safety Tips</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Sellers</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/create-listing" className="hover:text-white">Post a Listing</Link></li>
              <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Seller Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <Shield size={20} />
            <span>Secure Platform</span>
            <span className="mx-2">•</span>
            <Heart size={20} />
            <span>Made in Alaska</span>
          </div>
          <p className="text-gray-400 mt-4 md:mt-0">
            © {new Date().getFullYear()} {import.meta.env.VITE_APP_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
