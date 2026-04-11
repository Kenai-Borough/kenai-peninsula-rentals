import { useMemo, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { marketplace } from '../lib/marketplace'
import { buildStructuredData, formatCurrency, formatDate } from '../lib/utils'
import type { UserRole } from '../types'

const roleTabs: UserRole[] = ['host', 'guest', 'admin']

export default function DashboardPage() {
  const [role, setRole] = useState<UserRole>('host')
  const profile = marketplace.getDashboardProfile(role)
  const hostProperties = useMemo(() => marketplace.getHostProperties('host-1').slice(0, 4), [])
  const earnings = [{ month: 'Jan', value: 6100 }, { month: 'Feb', value: 5400 }, { month: 'Mar', value: 6800 }, { month: 'Apr', value: 7400 }, { month: 'May', value: 8200 }, { month: 'Jun', value: 9300 }]
  const revenue = [{ name: 'Listings', value: 25 }, { name: 'Pending', value: 4 }, { name: 'Flagged', value: 1 }]

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Marketplace dashboard" description="Host, guest, and admin views for Kenai Peninsula Rentals." structuredData={buildStructuredData()} />
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="text-sm uppercase tracking-[0.24em] text-amber-500">Role-based dashboard</p><h1 className="mt-2 text-4xl font-semibold">Welcome back, {profile.fullName}</h1></div>
        <div className="flex flex-wrap gap-2">{roleTabs.map((tab) => <button key={tab} onClick={() => setRole(tab)} className={role === tab ? 'chip chip-active' : 'chip'} type="button">{tab}</button>)}</div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <div className="stat-card"><span>Role</span><strong>{role}</strong><p>{profile.email}</p></div>
        <div className="stat-card"><span>Response time</span><strong>{profile.responseTimeHours} hr</strong><p>Average reply speed across the platform.</p></div>
        <div className="stat-card"><span>Rating</span><strong>{profile.rating}</strong><p>{profile.reviewCount} public reviews.</p></div>
        <div className="stat-card"><span>Saved stays</span><strong>{marketplace.savedPropertyIds.length}</strong><p>Guest wish list across the peninsula.</p></div>
      </div>

      {role === 'host' ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">Earnings</h2><p className="text-sm text-[var(--muted)]">Payouts and peak-season performance</p></div><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><AreaChart data={earnings}><defs><linearGradient id="earnings" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#d4a338" stopOpacity={0.6} /><stop offset="95%" stopColor="#1a472a" stopOpacity={0.05} /></linearGradient></defs><XAxis dataKey="month" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Area type="monotone" dataKey="value" stroke="#d4a338" fill="url(#earnings)" strokeWidth={3} /></AreaChart></ResponsiveContainer></div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Inbox</h2><div className="mt-5 space-y-3">{marketplace.messages.slice(0, 4).map((message) => <div key={message.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold text-[var(--text)]">Conversation {message.bookingId}</p><p className="mt-1 text-sm text-[var(--muted)]">{message.content}</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl lg:col-span-2"><div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">My properties</h2><p className="text-sm text-[var(--muted)]">Calendar, reviews, and payout snapshots</p></div><div className="mt-5 grid gap-4 md:grid-cols-2">{hostProperties.map((property) => <div key={property.id} className="rounded-2xl border border-white/10 p-5"><p className="font-semibold text-[var(--text)]">{property.title}</p><p className="mt-2 text-sm text-[var(--muted)]">{property.city} • {property.reviewCount} reviews • {property.viewCount} views</p><p className="mt-3 text-sm text-[var(--muted)]">Next payout: {formatCurrency(property.nightlyRate * 3 * 0.88)}</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Booking calendar</h2><div className="mt-5 space-y-3">{marketplace.bookings.slice(0, 4).map((booking) => <div key={booking.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold text-[var(--text)]">{marketplace.getProperty(booking.propertyId)?.title}</p><p className="mt-1 text-sm text-[var(--muted)]">{formatDate(booking.checkIn)} - {formatDate(booking.checkOut)} • {booking.guests} guests</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Payout history</h2><div className="mt-5 space-y-3">{marketplace.hostPayouts.map((payout) => <div key={payout.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold">{formatCurrency(payout.amount)}</p><p className="mt-1 text-sm text-[var(--muted)]">{payout.status} • {formatDate(payout.paidAt)}</p></div>)}</div></section>
        </div>
      ) : null}

      {role === 'guest' ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Upcoming & past trips</h2><div className="mt-5 space-y-3">{marketplace.bookings.slice(0, 5).map((booking) => <div key={booking.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold text-[var(--text)]">{marketplace.getProperty(booking.propertyId)?.title}</p><p className="mt-1 text-sm text-[var(--muted)]">{booking.status} • {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Saved rentals</h2><div className="mt-5 space-y-3">{marketplace.savedPropertyIds.map((propertyId) => <div key={propertyId} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold text-[var(--text)]">{marketplace.getProperty(propertyId)?.title}</p><p className="mt-1 text-sm text-[var(--muted)]">Wish list for fishing, harbor, and long-term options.</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Messages</h2><div className="mt-5 space-y-3">{marketplace.messages.slice(0, 4).map((message) => <div key={message.id} className="rounded-2xl border border-white/10 p-4"><p className="text-sm text-[var(--muted)]">{message.content}</p></div>)}</div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Reviews to write</h2><div className="mt-5 space-y-3">{marketplace.bookings.slice(0, 3).map((booking) => <div key={booking.id} className="rounded-2xl border border-white/10 p-4"><p className="font-semibold">{marketplace.getProperty(booking.propertyId)?.title}</p><p className="mt-1 text-sm text-[var(--muted)]">Share feedback after your stay.</p></div>)}</div></section>
        </div>
      ) : null}

      {role === 'admin' ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Marketplace status</h2><div className="mt-6 h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={revenue}><XAxis dataKey="name" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="value" fill="#1a472a" radius={[12, 12, 0, 0]} /></BarChart></ResponsiveContainer></div></section>
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl"><h2 className="text-2xl font-semibold">Moderation queue</h2><div className="mt-5 space-y-3"><div className="rounded-2xl border border-white/10 p-4">1 flagged listing photo awaiting review</div><div className="rounded-2xl border border-white/10 p-4">4 pending host verifications in rural communities</div><div className="rounded-2xl border border-white/10 p-4">Revenue analytics refreshed for salmon season launch</div></div><Link to="/admin" className="mt-5 inline-flex rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950">Open full admin dashboard</Link></section>
        </div>
      ) : null}
    </div>
  )
}
