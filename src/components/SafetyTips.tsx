import { AlertTriangle, Eye, MapPin, CreditCard, FileCheck } from 'lucide-react'

export default function SafetyTips() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center gap-2">
        <AlertTriangle className="text-yellow-600" size={24} />
        Stay Safe - Avoid Scams
      </h3>
      <ul className="space-y-3">
        <li className="flex items-start gap-3">
          <Eye className="text-yellow-600 mt-1 flex-shrink-0" size={18} />
          <span className="text-sm text-gray-700">
            <strong>Inspect in person:</strong> Never buy without seeing the item/property first
          </span>
        </li>
        <li className="flex items-start gap-3">
          <MapPin className="text-yellow-600 mt-1 flex-shrink-0" size={18} />
          <span className="text-sm text-gray-700">
            <strong>Meet in public:</strong> Use well-lit, public locations for exchanges
          </span>
        </li>
        <li className="flex items-start gap-3">
          <CreditCard className="text-yellow-600 mt-1 flex-shrink-0" size={18} />
          <span className="text-sm text-gray-700">
            <strong>No wire transfers:</strong> Never wire money to strangers or send gift cards
          </span>
        </li>
        <li className="flex items-start gap-3">
          <FileCheck className="text-yellow-600 mt-1 flex-shrink-0" size={18} />
          <span className="text-sm text-gray-700">
            <strong>Verify documentation:</strong> Check titles, surveys, and ownership papers
          </span>
        </li>
      </ul>
    </div>
  )
}
