import { CheckCircle2, CreditCard, MessageSquare, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { useToast } from '../components/ToastProvider'
import { marketplace } from '../lib/marketplace'
import { emailService } from '../lib/email'
import { emailTemplates } from '../lib/email-templates'
import { buildStructuredData, calculateBookingBreakdown, formatCurrency, formatDate } from '../lib/utils'

const steps = ['Review stay', 'Guest details', 'Payment']

export default function BookingFlow() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const property = marketplace.getProperty(id ?? '')
  const [step, setStep] = useState(0)
  const [checkIn, setCheckIn] = useState(params.get('checkIn') ?? '2025-07-12')
  const [checkOut, setCheckOut] = useState(params.get('checkOut') ?? '2025-07-16')
  const [guests, setGuests] = useState(Number(params.get('guests') ?? 2))
  const [name, setName] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const { pushToast } = useToast()
  const pricing = useMemo(() => (property ? calculateBookingBreakdown(property, checkIn, checkOut, guests) : null), [property, checkIn, checkOut, guests])

  if (!property || !pricing) return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-[var(--muted)]">Booking unavailable.</div>
  const currentProperty = property

  async function confirmBooking() {
    const hostNotice = emailTemplates.bookingRequest({ propertyTitle: currentProperty.title, guestName: name || 'Kenai guest', stayDates: `${checkIn} to ${checkOut}`, guestCount: String(guests), detailUrl: window.location.href })
    const guestNotice = emailTemplates.bookingConfirmation({ guestName: name || 'there', propertyTitle: currentProperty.title, stayDates: `${checkIn} to ${checkOut}`, itineraryUrl: `${window.location.origin}/dashboard` })
    const results = await Promise.all([
      emailService.send({ to: marketplace.getProfile(currentProperty.hostId)?.email ?? 'hello@kenaipeninsularentals.com', ...hostNotice, metadata: { notificationType: 'booking-request', propertyId: currentProperty.id, specialRequests } }),
      emailService.send({ to: 'guest@kenaipeninsularentals.com', ...guestNotice, metadata: { notificationType: 'booking-confirmation', propertyId: currentProperty.id } }),
    ])
    pushToast({ tone: 'success', title: 'Booking request submitted', message: results.some((result) => result.queued) ? 'Booking saved. Email delivery may be delayed.' : 'Stripe handoff placeholder completed. Booking emails were prepared successfully.' })
    setStep(0)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title={'Book ' + property.title} description={'Booking flow for ' + property.title} structuredData={buildStructuredData(property)} />
      <div className="rounded-[36px] border border-white/10 bg-[var(--panel)] p-8 shadow-2xl">
        <h1 className="text-4xl font-semibold">Complete your booking</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{steps.map((label, index) => <div key={label} className={index === step ? 'chip chip-active justify-center py-3' : 'chip justify-center py-3'}>{label}</div>)}</div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            {step === 0 ? <div className="space-y-4"><h2 className="text-2xl font-semibold">1. Review dates and pricing</h2><label className="field"><span>Check-in</span><input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} /></label><label className="field"><span>Check-out</span><input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label><label className="field"><span>Guests</span><input type="number" min={1} max={property.maxGuests} value={guests} onChange={(event) => setGuests(Number(event.target.value))} /></label></div> : null}
            {step === 1 ? <div className="space-y-4"><h2 className="text-2xl font-semibold">2. Guest details & requests</h2><label className="field"><span>Primary guest name</span><input value={name} onChange={(event) => setName(event.target.value)} placeholder="Evan Rivers" /></label><label className="field"><span>Special requests</span><textarea rows={5} value={specialRequests} onChange={(event) => setSpecialRequests(event.target.value)} placeholder="Late arrival, fish freezer questions, crib request..." /></label><div className="rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-sm text-[var(--muted)]">Guest messaging, verification, and house-rule acknowledgement all live in this step.</div></div> : null}
            {step === 2 ? <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4"><h2 className="text-2xl font-semibold">3. Payment summary & confirm</h2><div className="rounded-2xl border border-white/10 bg-[var(--panel)] p-5"><p className="inline-flex items-center gap-2 font-semibold text-[var(--text)]"><CreditCard size={18} /> Stripe checkout placeholder</p><p className="mt-2 text-sm leading-7 text-[var(--muted)]">Connect your publishable key and payment intent endpoint to turn this into a production payment flow.</p></div><div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-50"><p className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Reservation summary ready for confirmation.</p></div></motion.div> : null}
            <div className="mt-8 flex justify-between"><button disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-[var(--text)] disabled:opacity-40" type="button">Back</button>{step < 2 ? <button onClick={() => setStep((current) => Math.min(2, current + 1))} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950" type="button">Continue</button> : <button onClick={confirmBooking} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950" type="button">Confirm booking</button>}</div>
          </div>
          <aside className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <img src={property.photos[0]} alt={property.title} loading="lazy" width="1400" height="900" className="h-48 w-full rounded-[24px] object-cover" />
            <h3 className="mt-4 text-2xl font-semibold">{property.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{property.city}, Alaska • {formatDate(checkIn)} - {formatDate(checkOut)}</p>
            <div className="mt-5 space-y-3 text-sm text-[var(--muted)]"><p className="inline-flex gap-2"><User size={16} className="text-amber-500" /> {guests} guests</p><p className="inline-flex gap-2"><MessageSquare size={16} className="text-amber-500" /> {specialRequests || 'No special requests yet'}</p></div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[var(--panel)] p-4 text-sm text-[var(--muted)]"><div className="flex justify-between"><span>Nightly subtotal</span><span>{formatCurrency(pricing.nightlySubtotal)}</span></div><div className="mt-2 flex justify-between"><span>Cleaning fee</span><span>{formatCurrency(property.cleaningFee)}</span></div><div className="mt-2 flex justify-between"><span>Service fee</span><span>{formatCurrency(pricing.serviceFee)}</span></div><div className="mt-4 flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-[var(--text)]"><span>Total</span><span>{formatCurrency(pricing.total)}</span></div></div>
          </aside>
        </div>
      </div>
    </div>
  )
}
