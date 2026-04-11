import SEO from '../components/SEO'
import PropertyCard from '../components/PropertyCard'
import { marketplace } from '../lib/marketplace'
import { buildStructuredData } from '../lib/utils'

export default function LongTermRentals() {
  const longTerm = marketplace.properties.filter((property) => property.isLongTerm)
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Long-term rentals on the Kenai Peninsula" description="Browse 6+ month apartments and homes with application guidance and Alaska tenant resources." structuredData={buildStructuredData()} />
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[32px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl"><p className="text-sm uppercase tracking-[0.24em] text-amber-500">6+ month rentals</p><h1 className="mt-2 text-4xl font-semibold">Apartments and homes for work contracts, family moves, and Alaska seasons.</h1><p className="mt-4 text-sm leading-8 text-[var(--muted)]">Every long-term listing is filtered for practical details: furnished status, workspace, school access, storage, parking, and winter-readiness.</p><div className="mt-6 grid gap-4 md:grid-cols-3"><div className="rounded-2xl border border-white/10 p-4">1. Apply with employment, income, credit, and references.</div><div className="rounded-2xl border border-white/10 p-4">2. Review lease templates, deposits, and move-in condition reports.</div><div className="rounded-2xl border border-white/10 p-4">3. Coordinate Alaska rights, utilities, and winter responsibilities.</div></div></section><section className="rounded-[32px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl"><h2 className="text-2xl font-semibold">Alaska lease essentials</h2><ul className="mt-5 space-y-4 text-sm leading-7 text-[var(--muted)]"><li>• Lease templates include snow removal, fuel/oil heating expectations, and internet availability notes.</li><li>• Tenant rights cover habitability, notice periods, and security deposit requirements under Alaska law.</li><li>• Landlord guidance includes winter prep responsibilities, septic care, wildlife-safe trash, and emergency contact handoff.</li></ul></section></div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{longTerm.map((property) => <PropertyCard key={property.id} property={property} />)}</div>
    </div>
  )
}
