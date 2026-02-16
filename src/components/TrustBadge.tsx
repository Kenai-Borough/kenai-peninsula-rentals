import { Shield, CheckCircle, DollarSign, Clock } from 'lucide-react'

export default function TrustBadge() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
      <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
        <Shield className="text-blue-600" size={24} />
        Why Trust Our Platform?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">Verified Listings</h4>
            <p className="text-sm text-gray-600">All sellers verified via email and payment</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <DollarSign className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">Simple Pricing</h4>
            <p className="text-sm text-gray-600">$10 flat fee, no hidden costs</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="text-green-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <h4 className="font-semibold text-gray-900">60-Day Listings</h4>
            <p className="text-sm text-gray-600">Plenty of time to find the right buyer</p>
          </div>
        </div>
      </div>
    </div>
  )
}
