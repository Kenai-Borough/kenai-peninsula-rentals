import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../lib/supabase'

export default function CreateListingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    getCurrentUser().then(u => {
      if (!u) navigate('/login')
    })
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create Listing</h1>
      <div className="bg-white rounded-lg shadow-sm p-8">
        <p className="text-gray-600">Listing creation form coming soon...</p>
      </div>
    </div>
  )
}
