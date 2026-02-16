import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase, getCurrentUser } from '../lib/supabase'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      navigate('/login')
      return
    }
    setUser(currentUser)
    fetchMyListings(currentUser.id)
  }

  async function fetchMyListings(userId: string) {
    const tableName = window.location.hostname.includes('land') ? 'land_listings' :
                     window.location.hostname.includes('auto') ? 'vehicle_listings' :
                     window.location.hostname.includes('rental') ? 'rental_listings' :
                     'general_listings'
    
    const { data } = await supabase
      .from(tableName)
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (data) setListings(data)
    setLoading(false)
  }

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-16 text-center">Loading...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Account Information</h2>
        <p className="text-gray-600">Email: {user?.email}</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Listings ({listings.length})</h2>
        <Link
          to="/create-listing"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Create New Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-600 mb-4">You haven't created any listings yet.</p>
          <Link
            to="/create-listing"
            className="text-blue-600 hover:underline font-semibold"
          >
            Create your first listing →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{listing.title}</h3>
                <p className="text-gray-600">Status: {listing.status}</p>
                <p className="text-sm text-gray-500">Views: {listing.views}</p>
              </div>
              <Link
                to={`/listing/${listing.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Listing
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
