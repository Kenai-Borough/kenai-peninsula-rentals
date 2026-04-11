import SEO from '../components/SEO'
import { buildStructuredData } from '../lib/utils'

const steps = [
  ['Search the peninsula', 'Use advanced filters for dates, guests, pets, rental type, amenities, and map view to compare vacation and long-term options.'],
  ['Review local details', 'Every listing shows fishing access, nearby attractions, seasonal pricing, cancellation policy, host profile, and Alaska-specific safety guidance.'],
  ['Book with confidence', 'Move through a three-step booking flow with transparent nightly, weekly, monthly, cleaning, and service fees.'],
  ['Host smarter', 'List properties through a seven-step wizard covering amenities, photos, availability, seasonal pricing, and policies.'],
]

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="How Kenai Peninsula Rentals works" description="See how guests and hosts use the local-first Kenai Peninsula rental marketplace." structuredData={buildStructuredData()} />
      <h1 className="text-4xl font-semibold">How it works</h1>
      <div className="mt-8 space-y-5">{steps.map(([title, description], index) => <div key={title} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><p className="text-sm uppercase tracking-[0.24em] text-amber-500">Step {index + 1}</p><h2 className="mt-2 text-2xl font-semibold">{title}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p></div>)}</div>
    </div>
  )
}
