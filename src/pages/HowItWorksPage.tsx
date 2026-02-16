import { DollarSign, Upload, Eye, MessageSquare } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8">How It Works</h1>
      
      <div className="space-y-12">
        <div className="flex items-start gap-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <Upload className="text-blue-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">1. Create Your Listing</h2>
            <p className="text-gray-600 text-lg">
              Fill out a simple form with details about what you're selling. Add up to 10+ photos and a video if you'd like. The more details, the better!
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <DollarSign className="text-green-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">2. Pay the $10 Listing Fee</h2>
            <p className="text-gray-600 text-lg">
              One simple $10 payment gets your listing live for 60 days. No hidden fees, no commissions. Optional $20 upgrade for homepage featured placement.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <Eye className="text-purple-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">3. Get Discovered</h2>
            <p className="text-gray-600 text-lg">
              Your listing goes live immediately after payment. Buyers can find you through search, filters, and featured sections.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
            <MessageSquare className="text-orange-600" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3">4. Connect with Buyers</h2>
            <p className="text-gray-600 text-lg">
              Interested buyers can message you directly through the platform. You'll receive notifications and can manage all inquiries from your dashboard.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mt-12">
        <h3 className="text-2xl font-semibold mb-4">Pricing</h3>
        <ul className="space-y-3 text-lg">
          <li className="flex items-center gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Standard listing: $10 for 60 days</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Featured upgrade: +$20 for homepage placement</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Unlimited photos and one video</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-600 font-bold">✓</span>
            <span>Edit anytime during the 60 days</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
