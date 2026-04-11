import { CalendarDays, Fish, Home, MapPin, MessageSquare, ShieldCheck, Star, Trees, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import AvailabilityCalendar from '../components/AvailabilityCalendar'
import InteractiveMap from '../components/InteractiveMap'
import PhotoGallery from '../components/PhotoGallery'
import PropertyCard from '../components/PropertyCard'
import SEO from '../components/SEO'
import { marketplace } from '../lib/marketplace'
import { buildStructuredData, calculateBookingBreakdown, formatCurrency, formatDate } from '../lib/utils'

export default function ListingDetailPage() {
  const { id } = useParams()
  const property = marketplace.getProperty(id ?? '')
  const [checkIn, setCheckIn] = useState('2025-07-12')
  const [checkOut, setCheckOut] = useState('2025-07-16')
  const [guests, setGuests] = useState(2)

  const host = property ? marketplace.getProfile(property.hostId) : null
  const reviews = useMemo(() => (property ? marketplace.getPropertyReviews(property.id) : []), [property])
  const similar = useMemo(() => (property ? marketplace.getSimilarProperties(property) : []), [property])
  const pricing = property ? calculateBookingBreakdown(property, checkIn, checkOut, guests) : null
  const metrics = useMemo(() => {
    if (!reviews.length) return { cleanliness: 0, communication: 0, location: 0, value: 0 }
    const total = reviews.length
    return {
      cleanliness: (reviews.reduce((sum, review) => sum + review.cleanliness, 0) / total).toFixed(1),
      communication: (reviews.reduce((sum, review) => sum + review.communication, 0) / total).toFixed(1),
      location: (reviews.reduce((sum, review) => sum + review.location, 0) / total).toFixed(1),
      value: (reviews.reduce((sum, review) => sum + review.value, 0) / total).toFixed(1),
    }
  }, [reviews])

  if (!property || !host || !pricing) {
    return <div className="mx-auto max-w-4xl px-4 py-20 text-center text-[var(--muted)]">This rental could not be found.</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title={property.title + ' | Kenai Peninsula Rentals'} description={property.description} image={property.photos[0]} structuredData={buildStructuredData(property)} />
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-amber-500">{property.featuredLabel}</p>
          <h1 className="mt-2 text-4xl font-semibold">{property.title}</h1>
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-[var(--muted)]"><span className="inline-flex items-center gap-2"><MapPin size={15} /> {property.city}, Alaska</span><span className="inline-flex items-center gap-2"><Star size={15} className="fill-amber-400 text-amber-400" /> {property.rating} ({property.reviewCount} reviews)</span><span className="inline-flex items-center gap-2"><Users size={15} /> Up to {property.maxGuests} guests</span></div>
        </div>
        <Link to={'/booking/' + property.id + '?checkIn=' + checkIn + '&checkOut=' + checkOut + '&guests=' + String(guests)} className="rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950">Reserve this stay</Link>
      </div>

      <PhotoGallery photos={property.photos} title={property.title} />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-8">
          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
            <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]"><span className="chip"><Home size={14} /> {property.bedrooms} bed</span><span className="chip">{property.bathrooms} bath</span><span className="chip">{property.sqft} sqft</span><span className="chip">{property.maxGuests} guests</span></div>
            <p className="mt-5 text-base leading-8 text-[var(--muted)]">{property.description}</p>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
            <h2 className="text-2xl font-semibold">Seasonal pricing</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {property.seasonalPricing.map((season) => (
                <div key={season.id} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.22em] text-amber-500">{season.label}</p>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--text)]">{season.name}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{formatDate(season.startDate)} - {formatDate(season.endDate)}</p>
                  <p className="mt-3 text-2xl font-semibold text-[var(--text)]">{season.priceMultiplier}x</p>
                  <p className="text-sm text-[var(--muted)]">of base nightly rates</p>
                </div>
              ))}
            </div>
          </section>

          <AvailabilityCalendar propertyId={property.id} />

          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
            <h2 className="text-2xl font-semibold">Amenities</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{property.amenities.map((amenity) => <div key={amenity} className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-[var(--text)]">{amenity}</div>)}</div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">House rules</h2>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--muted)]">{property.houseRules.map((rule) => <li key={rule}>• {rule}</li>)}</ul>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
              <h2 className="text-2xl font-semibold">Cancellation policy</h2>
              <p className="mt-5 text-sm leading-7 text-[var(--muted)]">{property.cancellationPolicy}</p>
              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]">Secure messaging keeps all trip communication on-platform before and after checkout.</div>
            </div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
            <h2 className="text-2xl font-semibold">Nearby attractions</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">{property.nearbyAttractions.map((item) => <div key={item} className="rounded-2xl border border-white/10 px-4 py-4 text-sm text-[var(--text)]">{item}</div>)}</div>
            <div className="mt-6"><InteractiveMap properties={[property]} selectedId={property.id} height="320px" /></div>
          </section>

          <section className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
            <div className="flex items-center justify-between"><h2 className="text-2xl font-semibold">Guest reviews</h2><div className="inline-flex items-center gap-2 text-sm text-[var(--muted)]"><Star size={15} className="fill-amber-400 text-amber-400" /> {property.rating} average</div></div>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                ['Cleanliness', metrics.cleanliness],
                ['Communication', metrics.communication],
                ['Location', metrics.location],
                ['Value', metrics.value],
              ].map(([metric, value]) => <div key={String(metric)} className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-sm text-[var(--muted)]">{metric}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>)}
            </div>
            <div className="mt-6 space-y-4">{reviews.slice(0, 4).map((review) => <div key={review.id} className="rounded-2xl border border-white/10 p-5"><p className="text-sm leading-7 text-[var(--muted)]">“{review.comment}”</p><p className="mt-3 text-sm font-semibold text-[var(--text)]">Stayed {formatDate(review.createdAt)}</p></div>)}</div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between"><div><p className="text-3xl font-semibold">{formatCurrency(property.nightlyRate)}</p><p className="text-sm text-[var(--muted)]">/night • {formatCurrency(property.weeklyRate)} weekly • {formatCurrency(property.monthlyRate || property.nightlyRate * 30)} monthly</p></div><span className="chip">Instant quote</span></div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="field"><span>Check-in</span><input type="date" value={checkIn} onChange={(event) => setCheckIn(event.target.value)} /></label>
              <label className="field"><span>Check-out</span><input type="date" value={checkOut} onChange={(event) => setCheckOut(event.target.value)} /></label>
            </div>
            <label className="field mt-4"><span>Guests</span><input type="number" min={1} max={property.maxGuests} value={guests} onChange={(event) => setGuests(Number(event.target.value))} /></label>
            <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]">
              <div className="flex justify-between"><span>Nightly subtotal</span><span>{formatCurrency(pricing.nightlySubtotal)}</span></div>
              <div className="flex justify-between"><span>Cleaning fee</span><span>{formatCurrency(property.cleaningFee)}</span></div>
              <div className="flex justify-between"><span>Service fee</span><span>{formatCurrency(pricing.serviceFee)}</span></div>
              <div className="flex justify-between"><span>Stay discount</span><span>-{formatCurrency(pricing.discount)}</span></div>
              <div className="flex justify-between border-t border-white/10 pt-3 text-base font-semibold text-[var(--text)]"><span>Total</span><span>{formatCurrency(pricing.total)}</span></div>
            </div>
            <Link to={'/booking/' + property.id + '?checkIn=' + checkIn + '&checkOut=' + checkOut + '&guests=' + String(guests)} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950">Book now <CalendarDays size={18} /></Link>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl">
            <div className="flex items-center gap-4"><img src={host.avatarUrl} alt={host.fullName} className="h-16 w-16 rounded-2xl object-cover" /><div><p className="text-xs uppercase tracking-[0.22em] text-amber-500">Hosted by</p><h3 className="text-xl font-semibold">{host.fullName}</h3><p className="text-sm text-[var(--muted)]">Responds in {property.hostResponseTime}</p></div></div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{host.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--muted)]"><span className="chip"><ShieldCheck size={14} /> {host.isSuperhost ? 'Superhost' : 'Verified host'}</span><span className="chip"><Star size={14} className="fill-amber-400 text-amber-400" /> {host.rating}</span></div>
            <button className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-[var(--text)]" type="button"><MessageSquare size={16} /> Message host</button>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl">
            <h3 className="text-xl font-semibold">Perfect for Alaska-specific plans</h3>
            <div className="mt-4 space-y-3 text-sm text-[var(--muted)]"><p className="inline-flex gap-2"><Fish size={16} className="text-emerald-400" /> Fishing access and fish handling amenities noted clearly.</p><p className="inline-flex gap-2"><Trees size={16} className="text-emerald-400" /> Bear-aware outdoor setup and wildfire/winter readiness.</p><p className="inline-flex gap-2"><MapPin size={16} className="text-emerald-400" /> Local attraction guidance from real peninsula hosts.</p></div>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-semibold">Similar rentals nearby</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">{similar.map((candidate) => <PropertyCard key={candidate.id} property={candidate} />)}</div>
      </section>
    </div>
  )
}
