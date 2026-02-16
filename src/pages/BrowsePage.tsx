import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { formatCurrency, formatRelativeTime } from '../lib/utils'

export default function BrowsePage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  async function fetchListings() {
    const { data } = await supabase
      .from('rental_listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
    
    if (data) setListings(data)
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Rentals</h1>
      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Link
              key={listing.id}
              to={`/listing/${listing.id}`}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition"
            >
              <div className="aspect-video bg-gray-200">
                {listing.images[0] && (
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{listing.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(listing.monthly_rent)}/mo</p>
                <p className="text-sm text-gray-600">{listing.bedrooms} bed • {listing.bathrooms} bath</p>
                <p className="text-sm text-gray-500 mt-2">{formatRelativeTime(listing.created_at)}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
