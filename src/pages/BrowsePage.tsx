import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, List, Map, SlidersHorizontal } from 'lucide-react'
import SEO from '../components/SEO'
import InteractiveMap from '../components/InteractiveMap'
import PropertyCard from '../components/PropertyCard'
import { browseAmenities, communities, rentalTypes } from '../data/rentals'
import { marketplace } from '../lib/marketplace'
import { buildStructuredData, DEFAULT_FILTERS, filterProperties, formatCurrency, slugToLabel } from '../lib/utils'
import type { RentalType, SearchFilters } from '../types'

export default function BrowsePage() {
  const [params] = useSearchParams()
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [filters, setFilters] = useState<SearchFilters>({
    ...DEFAULT_FILTERS,
    location: params.get('location') ?? 'All communities',
    checkIn: params.get('checkIn') ?? '',
    checkOut: params.get('checkOut') ?? '',
    adults: Number(params.get('adults') ?? 2),
    rentalTypes: params.get('type') ? [params.get('type') as RentalType] : [],
  })

  const filtered = useMemo(() => filterProperties(marketplace.properties, filters), [filters])
  const visible = filtered.slice(0, 18)
  const activeId = selectedId ?? visible[0]?.id

  function toggleType(type: RentalType) {
    setFilters((current) => ({
      ...current,
      rentalTypes: current.rentalTypes.includes(type) ? current.rentalTypes.filter((entry) => entry !== type) : [...current.rentalTypes, type],
    }))
  }

  function toggleAmenity(amenity: string) {
    setFilters((current) => ({
      ...current,
      amenities: current.amenities.includes(amenity) ? current.amenities.filter((entry) => entry !== amenity) : [...current.amenities, amenity],
    }))
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SEO title="Browse Kenai Peninsula rentals" description="Filter Alaska cabins, houses, lodges, yurts, condos, and long-term homes across the Kenai Peninsula." structuredData={buildStructuredData()} />
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-amber-500">Browse rentals</p>
          <h1 className="mt-2 text-4xl font-semibold">Search by town, season, amenities, and stay style</h1>
        </div>
        <div className="flex gap-2">
          {[
            { value: 'split', label: 'Split', icon: <Filter size={16} /> },
            { value: 'list', label: 'List', icon: <List size={16} /> },
            { value: 'map', label: 'Map', icon: <Map size={16} /> },
          ].map((option) => (
            <button key={option.value} onClick={() => setFilters((current) => ({ ...current, viewMode: option.value as SearchFilters['viewMode'] }))} className={filters.viewMode === option.value ? 'chip chip-active' : 'chip'} type="button">{option.icon}{option.label}</button>
          ))}
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
        <aside className="space-y-6 rounded-[28px] border border-white/10 bg-[var(--panel)] p-5 shadow-xl">
          <div className="flex items-center justify-between"><div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]"><SlidersHorizontal size={16} /> Filters</div><button onClick={() => setFilters(DEFAULT_FILTERS)} className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]" type="button">Reset</button></div>
          <label className="field"><span>Search</span><input value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} placeholder="riverfront, aurora, harbor..." /></label>
          <label className="field"><span>Location</span><select value={filters.location} onChange={(event) => setFilters({ ...filters, location: event.target.value })}><option>All communities</option>{communities.map((community) => <option key={community}>{community}</option>)}</select></label>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <label className="field"><span>Check-in</span><input type="date" value={filters.checkIn} onChange={(event) => setFilters({ ...filters, checkIn: event.target.value })} /></label>
            <label className="field"><span>Check-out</span><input type="date" value={filters.checkOut} onChange={(event) => setFilters({ ...filters, checkOut: event.target.value })} /></label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <label className="field"><span>Adults</span><input type="number" min={1} value={filters.adults} onChange={(event) => setFilters({ ...filters, adults: Number(event.target.value) })} /></label>
            <label className="field"><span>Children</span><input type="number" min={0} value={filters.children} onChange={(event) => setFilters({ ...filters, children: Number(event.target.value) })} /></label>
            <label className="field"><span>Pets</span><input type="number" min={0} value={filters.pets} onChange={(event) => setFilters({ ...filters, pets: Number(event.target.value) })} /></label>
          </div>
          <label className="field"><span>Duration</span><select value={filters.duration} onChange={(event) => setFilters({ ...filters, duration: event.target.value as SearchFilters['duration'] })}><option value="">Any stay length</option><option value="nightly">Nightly</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option><option value="long-term">Long-term 6+ mo</option></select></label>
          <div>
            <div className="mb-2 flex items-center justify-between text-sm"><span className="text-[var(--muted)]">Price range</span><span className="text-[var(--text)]">{formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}</span></div>
            <input type="range" min={75} max={9500} step={25} value={filters.priceRange[0]} onChange={(event) => setFilters({ ...filters, priceRange: [Number(event.target.value), filters.priceRange[1]] })} className="w-full" />
            <input type="range" min={75} max={9500} step={25} value={filters.priceRange[1]} onChange={(event) => setFilters({ ...filters, priceRange: [filters.priceRange[0], Number(event.target.value)] })} className="mt-2 w-full" />
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text)]">Rental type</p>
            <div className="mt-3 flex flex-wrap gap-2">{rentalTypes.map((type) => <button key={type} onClick={() => toggleType(type)} className={filters.rentalTypes.includes(type) ? 'chip chip-active' : 'chip'} type="button">{slugToLabel(type)}</button>)}</div>
          </div>
          <div>
            <p className="text-sm font-medium text-[var(--text)]">Amenities</p>
            <div className="mt-3 flex flex-wrap gap-2">{browseAmenities.slice(0, 20).map((amenity) => <button key={amenity} onClick={() => toggleAmenity(amenity)} className={filters.amenities.includes(amenity) ? 'chip chip-active' : 'chip'} type="button">{amenity}</button>)}</div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <label className="field"><span>Sort by</span><select value={filters.sortBy} onChange={(event) => setFilters({ ...filters, sortBy: event.target.value as SearchFilters['sortBy'] })}><option value="popular">Most popular</option><option value="price">Price</option><option value="rating">Rating</option><option value="newest">Newest</option></select></label>
            <label className="inline-flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm text-[var(--text)]"><input type="checkbox" checked={filters.longTermOnly} onChange={(event) => setFilters({ ...filters, longTermOnly: event.target.checked })} /> Long-term only</label>
          </div>
        </aside>
        <div className="space-y-6">
          {filters.viewMode !== 'list' ? <InteractiveMap properties={visible} selectedId={activeId} onSelect={setSelectedId} height={filters.viewMode === 'map' ? '620px' : '320px'} /> : null}
          <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-[var(--panel)] px-5 py-4">
            <div className="inline-flex items-center gap-2 text-sm text-[var(--muted)]"><Filter size={16} /> {filtered.length} results</div>
            <p className="text-sm text-[var(--muted)]">Includes vacation and 6+ month inventory.</p>
          </div>
          {filters.viewMode !== 'map' ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{visible.map((property) => <div key={property.id} onMouseEnter={() => setSelectedId(property.id)}><PropertyCard property={property} /></div>)}</div> : null}
        </div>
      </section>
    </div>
  )
}
