import SafetyTips from '../components/SafetyTips'
import { AlertTriangle, Shield } from 'lucide-react'

export default function SafetyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 flex items-center gap-3">
        <Shield size={40} className="text-blue-600" />
        Safety Guidelines
      </h1>

      <SafetyTips />

      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Meeting Safely</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Choose public, well-lit locations for in-person meetings</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Bring a friend or family member with you</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Meet during daylight hours whenever possible</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Tell someone where you're going and when you'll be back</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Payment Safety</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Never wire money or send gift cards to strangers</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Use cash for in-person transactions when possible</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>Be wary of offers that seem too good to be true</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              <span>For large purchases, consider using an escrow service</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Common Scam Warning Signs</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <span>Seller refuses to meet in person or show the item</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <span>Requests payment via wire transfer, gift cards, or cryptocurrency</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <span>Offers to ship item before receiving payment</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <span>Pressure to act quickly or "opportunity won't last"</span>
              </li>
              <li className="flex items-start gap-3">
                <AlertTriangle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                <span>Poor grammar, spelling errors, or generic responses</span>
              </li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Report Suspicious Activity</h2>
          <p className="text-gray-700 mb-4">
            If you encounter a suspicious listing or user, please report it immediately using the "Report Listing" button. We take fraud seriously and will investigate all reports.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold">
            Report a Listing
          </button>
        </section>
      </div>
    </div>
  )
}
