import SEO from '../components/SEO'
import { emergencyContacts } from '../data/rentals'
import { buildStructuredData } from '../lib/utils'

const pillars = [
  ['Guest verification', 'Profile completion, ID checks, booking history, and secure messaging create a clear record before arrival.'],
  ['Host verification', 'Hosts publish response time, review history, superhost status, and neighborhood-specific arrival guidance.'],
  ['Property safety standards', 'Listings should note smoke and CO alarms, heating systems, winter access, first aid kits, and bear-aware trash handling.'],
  ['Bear safety for rural rentals', 'Never leave food in vehicles, keep fish and garbage secured, and learn local bear activity before hiking or beach stays.'],
  ['Winter safety', 'Confirm snow removal, tire requirements, generator backup, daylight expectations, and emergency supplies for shoulder and winter travel.'],
  ['Secure messaging', 'Keep arrival instructions, payment questions, and incident documentation inside the platform so support can help quickly.'],
]

export default function SafetyPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Kenai Peninsula Rentals safety center" description="Guest, host, bear, winter, and emergency guidance for Alaska rental stays." structuredData={buildStructuredData()} />
      <section className="rounded-[36px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl"><p className="text-sm uppercase tracking-[0.24em] text-amber-500">Safety center</p><h1 className="mt-2 text-4xl font-semibold">Stay confident in Alaska’s wild, beautiful, and rapidly changing conditions.</h1><p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--muted)]">This safety center focuses on verification, property standards, rural travel awareness, and Alaska-specific guidance that generic marketplaces rarely surface well.</p></section>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{pillars.map(([title, description]) => <article key={title} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p></article>)}</div>
      <section className="mt-8 rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Emergency contacts</h2><div className="mt-5 grid gap-4 md:grid-cols-2">{emergencyContacts.map((contact) => <div key={contact.label} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold text-[var(--text)]">{contact.label}</p><p className="mt-1 text-sm text-[var(--muted)]">{contact.value}</p></div>)}</div></section>
    </div>
  )
}
