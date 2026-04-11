import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import SEO from '../../components/SEO'
import { marketplace } from '../../lib/marketplace'
import { buildStructuredData, formatCurrency } from '../../lib/utils'

const moderation = [
  '2 new host verifications pending',
  '1 flagged listing photo awaiting review',
  '4 bookings need manual payout review',
]
const revenueData = [{ month: 'Jan', value: 12000 }, { month: 'Feb', value: 11800 }, { month: 'Mar', value: 14200 }, { month: 'Apr', value: 15100 }, { month: 'May', value: 16700 }, { month: 'Jun', value: 22400 }]
const userData = [{ name: 'Guests', value: 1240 }, { name: 'Hosts', value: 86 }, { name: 'Admins', value: 3 }]

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Admin dashboard" description="Marketplace moderation, users, bookings, and revenue analytics." structuredData={buildStructuredData()} />
      <div><p className="text-sm uppercase tracking-[0.24em] text-amber-500">Marketplace control center</p><h1 className="mt-2 text-4xl font-semibold">Admin dashboard</h1></div>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="stat-card"><span>Listings</span><strong>{marketplace.properties.length}</strong><p>Active inventory across short and long stays.</p></div>
        <div className="stat-card"><span>Users</span><strong>1,329</strong><p>Guests, hosts, and admins.</p></div>
        <div className="stat-card"><span>Bookings</span><strong>{marketplace.bookings.length}</strong><p>Tracked reservations needing oversight.</p></div>
        <div className="stat-card"><span>GMV</span><strong>{formatCurrency(22400)}</strong><p>Projected monthly gross booking volume.</p></div>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Revenue analytics</h2><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={revenueData}><XAxis dataKey="month" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Line type="monotone" dataKey="value" stroke="#d4a338" strokeWidth={3} /></LineChart></ResponsiveContainer></div></section>
        <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">User mix</h2><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={userData}><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="value" fill="#1a472a" radius={[12, 12, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
        <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Moderation queue</h2><div className="mt-5 space-y-3">{moderation.map((item) => <div key={item} className="rounded-2xl border border-white/10 p-4">{item}</div>)}</div></section>
        <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Booking oversight</h2><div className="mt-5 space-y-3">{marketplace.bookings.slice(0, 5).map((booking) => <div key={booking.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold">{marketplace.getProperty(booking.propertyId)?.title}</p><p className="mt-1 text-sm text-[var(--muted)]">{booking.status} • {booking.guests} guests</p></div>)}</div></section>
      </div>
    </div>
  )
}
