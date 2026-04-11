import SEO from '../components/SEO'
import { buildStructuredData } from '../lib/utils'

const topics = [
  ['Set up your property', 'Create a warm first impression with entry storage, gear drying hooks, spare fuel/oil instructions, and wildlife-safe outdoor storage.'],
  ['Photography tips', 'Show the landscape and the practical details: fish cleaning station, dock, sauna, workspace, snow-cleared access, and daylight from key rooms.'],
  ['Pricing strategy', 'Use seasonal adjustments aggressively: summer peak often runs 2-3x winter, shoulder season fits 1.5x, and longer stays need predictable monthly pricing.'],
  ['Alaska regulations', 'Track borough guidance, short-term rental regulations, occupancy taxes, HOA limitations, and life-safety requirements before going live.'],
  ['Tax obligations', 'Separate lodging taxes, revenue reporting, and annual maintenance reserves from day one.'],
  ['Insurance', 'Confirm STR or landlord coverage, commercial liability, and outbuilding/storage protection for guest gear.'],
  ['Guest communication templates', 'Share road condition alerts, check-in instructions, bear awareness, and departure reminders in one polished workflow.'],
]

export default function HostGuide() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Host guide for Kenai Peninsula rentals" description="Resources for launching and managing Alaska vacation and long-term rental properties." structuredData={buildStructuredData()} />
      <section className="rounded-[36px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl"><p className="text-sm uppercase tracking-[0.24em] text-amber-500">Host resources</p><h1 className="mt-2 text-4xl font-semibold">Build a rental that competes with Airbnb and VRBO, while staying unmistakably local.</h1><p className="mt-4 max-w-3xl text-sm leading-8 text-[var(--muted)]">This guide packages host setup, seasonal pricing, guest messaging, compliance, tax planning, and insurance guidance into one launch playbook.</p></section>
      <div className="mt-8 grid gap-6 md:grid-cols-2">{topics.map(([title, description]) => <article key={title} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">{title}</h2><p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p></article>)}</div>
    </div>
  )
}
