import { Link } from 'react-router-dom'
import { Search, DollarSign, Shield, TrendingUp } from 'lucide-react'
import TrustBadge from '../components/TrustBadge'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Perfect Rental Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover rental properties on the Kenai Peninsula. Simple 0 listing fee for landlords.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/browse"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 text-center"
            >
              Browse Listings
            </Link>
            <Link
              to="/create-listing"
              className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-400 text-center"
            >
              Post a Listing - $10
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Simple Pricing</h3>
            <p className="text-gray-600">$10 flat fee for 60-day listings. Featured upgrades available for $20.</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
            <p className="text-gray-600">Verified sellers, secure payments, and comprehensive safety guidelines.</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Advanced Search</h3>
            <p className="text-gray-600">Filter by price, location, features, and more to find exactly what you need.</p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-orange-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">High Visibility</h3>
            <p className="text-gray-600">Professional listings with photo galleries, videos, and detailed descriptions.</p>
          </div>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TrustBadge />
      </div>

      {/* Featured Listings Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Rentals</h2>
        <div className="text-center text-gray-600">
          <p>Browse all listings to see available rentals</p>
          <Link to="/browse" className="text-blue-600 hover:underline">View all rentals →</Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join hundreds of satisfied buyers and sellers on Alaska's most trusted platform.
          </p>
          <Link
            to="/create-listing"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 inline-block"
          >
            Post Your First Listing - $10
          </Link>
        </div>
      </div>
    </div>
  )
}
