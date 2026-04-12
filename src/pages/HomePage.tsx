import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ArrowRight, CalendarRange, Home, Fish, MapPin, Search, Snowflake, Star, Trees, Users } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SEO from '../components/SEO'
import PropertyCard from '../components/PropertyCard'
import { communities, seasonalHighlights } from '../data/rentals'
import { marketplace } from '../lib/marketplace'
import { buildStructuredData } from '../lib/utils'
import { CrossTrafficAds } from '../components/CrossTrafficAds'

export default function HomePage() {
  const navigate = useNavigate()
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' })
  const featured = useMemo(() => marketplace.properties.filter((property) => property.featured).slice(0, 8), [])
  const [search, setSearch] = useState({ location: 'Kenai', checkIn: '', checkOut: '', guests: 2, type: 'cabin' })
  const stats = {
    total: marketplace.properties.length,
    guests: '6,400+',
    savings: '22%',
  }

  function handleSearch() {
    const params = new URLSearchParams({
      location: search.location,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adults: String(search.guests),
      type: search.type,
    })
    navigate('/browse?' + params.toString())
  }

  return (
    <div>
      <SEO title="Kenai Peninsula Rentals | Kenai Peninsula, Alaska" description="Book Kenai Peninsula vacation rentals, Alaska cabins, fishing lodges, and long-term stays with local hosts across Homer, Seward, Kenai, and beyond." structuredData={buildStructuredData()} />
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img src="/hero-illustration.svg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,105,20,0.34),transparent_36%),linear-gradient(135deg,rgba(8,17,15,.88)_0%,rgba(26,71,42,.74)_46%,rgba(17,24,39,.8)_100%)]" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-18 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-24">
          <div>
            <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-amber-200">Alaska-first rental marketplace</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="mt-6 max-w-3xl text-5xl font-semibold leading-tight text-white sm:text-6xl">Find Kenai cabins, fishing lodges, and long-term homes that feel local from the first click.</motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">Search by community, dates, guests, and rental style. Compare salmon-season pricing, winter-ready amenities, and longer-stay options built for workers, families, and adventure travelers.</motion.p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-200">
              <span className="chip-dark"><Fish size={14} /> Fishing access</span>
              <span className="chip-dark"><Snowflake size={14} /> Winter-ready stays</span>
              <span className="chip-dark"><Trees size={14} /> Remote cabins & yurts</span>
            </div>
          </div>
          <div className="rounded-[32px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl shadow-2xl shadow-slate-950/30">
            <div className="relative mb-4 overflow-hidden rounded-[26px] border border-white/10 bg-slate-950/40">
              <img src="/hero-illustration.svg" alt="" aria-hidden="true" className="h-36 w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 text-sm text-amber-50">Twilight cabins, lake reflections, and peninsula mornings.</div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="field"><span>Location</span><select value={search.location} onChange={(event) => setSearch({ ...search, location: event.target.value })}>{communities.slice(0, 8).map((community) => <option key={community}>{community}</option>)}</select></label>
              <label className="field"><span>Rental type</span><select value={search.type} onChange={(event) => setSearch({ ...search, type: event.target.value })}><option value="cabin">Cabin</option><option value="house">House</option><option value="apartment">Apartment</option><option value="condo">Condo</option><option value="lodge">Lodge</option><option value="yurt">Yurt</option><option value="glamping">Glamping</option><option value="rv-spot">RV spot</option></select></label>
              <label className="field"><span>Check-in</span><input type="date" value={search.checkIn} onChange={(event) => setSearch({ ...search, checkIn: event.target.value })} /></label>
              <label className="field"><span>Check-out</span><input type="date" value={search.checkOut} onChange={(event) => setSearch({ ...search, checkOut: event.target.value })} /></label>
            </div>
            <label className="field mt-4"><span>Guests</span><input type="number" min={1} max={12} value={search.guests} onChange={(event) => setSearch({ ...search, guests: Number(event.target.value) })} /></label>
            <button onClick={handleSearch} className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--accent)] to-emerald-500 px-5 py-3 font-semibold text-slate-950" type="button"><Search size={18} /> Search rentals</button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="stat-card"><span>Total rentals</span><strong>{stats.total}</strong><p>Vacation and 6+ month inventory across the peninsula.</p></div>
          <div className="stat-card"><span>Happy guests</span><strong>{stats.guests}</strong><p>Repeat anglers, road trippers, nurses, and local movers.</p></div>
          <div className="stat-card"><span>Average savings</span><strong>{stats.savings}</strong><p>Compared to big-platform peak-season rates in similar Alaska destinations.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Featured stays</p>
            <h2 className="mt-2 text-3xl font-semibold">Cabins, lodges, and bluff-view escapes</h2>
          </div>
          <Link to="/browse" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400">See all rentals <ArrowRight size={16} /></Link>
        </div>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {featured.map((property) => (
              <div key={property.id} className="min-w-0 flex-[0_0_88%] md:flex-[0_0_48%] xl:flex-[0_0_32%]">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="rounded-[32px] border border-white/10 bg-[var(--panel)] p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Why rent on the Kenai</p>
          <h2 className="mt-3 text-3xl font-semibold">Local stays for salmon season, glacier trips, and practical longer moves.</h2>
          <div className="mt-8 space-y-5 text-[var(--muted)]">
            <div className="flex gap-4"><Home className="mt-1 text-emerald-400" /><p>Properties highlight Alaska-specific details like fish freezer space, bear-proof trash, winter mud rooms, and gear drying setups.</p></div>
            <div className="flex gap-4"><CalendarRange className="mt-1 text-emerald-400" /><p>Seasonal pricing calls out summer fishing premiums, shoulder-season value, and winter baseline pricing up front.</p></div>
            <div className="flex gap-4"><Users className="mt-1 text-emerald-400" /><p>Hosts are local operators, not anonymous portfolios. Expect better answers about launches, trails, road conditions, and leases.</p></div>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {seasonalHighlights.map((item) => (
            <div key={item.title} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl">
              <p className="text-xs uppercase tracking-[0.24em] text-amber-500">Seasonal highlight</p>
              <h3 className="mt-3 text-xl font-semibold text-[var(--text)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {marketplace.testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-[28px] border border-white/10 bg-[var(--panel)] p-6 shadow-xl">
              <div className="flex items-center gap-1 text-amber-400">{Array.from({ length: testimonial.rating }).map((_, index) => <Star key={testimonial.name + String(index)} size={16} className="fill-amber-400" />)}</div>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">“{testimonial.quote}”</p>
              <p className="mt-5 font-semibold text-[var(--text)]">{testimonial.name}</p>
              <p className="text-sm text-[var(--muted)]">{testimonial.location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-8 max-w-7xl rounded-[36px] border border-white/10 bg-gradient-to-r from-[var(--forest)] to-slate-900 px-6 py-12 text-white shadow-2xl shadow-black/20 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-emerald-100">Ready to host?</p>
            <h2 className="mt-3 text-3xl font-semibold">Launch a local-first listing in minutes.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-emerald-50/85">Use the guided 7-step host flow to set pricing, seasons, photos, availability, and policies for both short stays and 6+ month leases.</p>
          </div>
          <Link to="/create-listing" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-900">Start hosting <MapPin size={16} /></Link>
        </div>
      </section>
          <CrossTrafficAds />
</div>
  )
}
