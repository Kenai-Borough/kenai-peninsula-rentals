import { Link } from 'react-router-dom'

const networkLinks = [
  ['kenaiborough.com', 'https://kenaiborough.com'],
  ['kenaiboroughrealty.com', 'https://kenaiboroughrealty.com'],
  ['kenailandsales.com', 'https://kenailandsales.com'],
  ['kenaihomesales.com', 'https://kenaihomesales.com'],
  ['kenaiautosales.com', 'https://kenaiautosales.com'],
  ['kenailistings.com', 'https://kenailistings.com'],
  ['kenainews.com', 'https://kenainews.com'],
]

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[var(--surface-strong)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <h3 className="text-2xl font-semibold text-[var(--text)]">Built for the Kenai Peninsula</h3>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">Vacation cabins, fishing lodges, RV sites, and long-term rentals with Alaska-first details: winter prep, bear safety, fishing access, secure messaging, and truly local hosts.</p>
        </div>
        <div>
          <h4 className="font-semibold text-[var(--text)]">Explore</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li><Link to="/browse">Browse rentals</Link></li>
            <li><Link to="/long-term">Long-term rentals</Link></li>
            <li><Link to="/host-guide">Host resources</Link></li>
            <li><Link to="/safety">Safety center</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-[var(--text)]">Network</h4>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            {networkLinks.map(([label, href]) => (
              <li key={href}><a href={href} target="_blank" rel="noreferrer" className="transition hover:text-[var(--text)]">{label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
        © {new Date().getFullYear()} Kenai Peninsula Rentals • kenaipeninsularentals.com
      </div>
    </footer>
  )
}
