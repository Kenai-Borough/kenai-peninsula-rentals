import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isWithinInterval,
  startOfMonth,
} from 'date-fns'
import { availability } from '../data/rentals'
import type { AvailabilityStatus, Property, SearchFilters, SortOption } from '../types'

export const DEFAULT_FILTERS: SearchFilters = {
  location: 'All communities',
  checkIn: '',
  checkOut: '',
  adults: 2,
  children: 0,
  pets: 0,
  rentalTypes: [],
  duration: '',
  priceRange: [75, 9500],
  amenities: [],
  sortBy: 'popular',
  viewMode: 'split',
  query: '',
  longTermOnly: false,
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount)
}

export function formatDate(value: string | Date, pattern = 'MMM d, yyyy') {
  return format(new Date(value), pattern)
}

export function slugToLabel(value: string) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

export function classNames(...values: Array<string | boolean | undefined | null>) {
  return values.filter(Boolean).join(' ')
}

export function calculateNights(checkIn?: string, checkOut?: string) {
  if (!checkIn || !checkOut) return 0
  const nights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  return Math.max(0, nights)
}

export function getSeasonalMultiplier(date: Date) {
  const month = date.getUTCMonth() + 1
  if (month >= 6 && month <= 8) return 2
  if (month === 5 || month === 9) return 1.5
  return 1
}

export function calculateBookingBreakdown(property: Property, checkIn?: string, checkOut?: string, guests = 2) {
  const nights = calculateNights(checkIn, checkOut)
  const startDate = checkIn ? new Date(checkIn) : new Date()
  const seasonalMultiplier = getSeasonalMultiplier(startDate)
  const nightlySubtotal = Math.round(property.nightlyRate * seasonalMultiplier * nights)
  const weeklyDiscount = nights >= 7 ? Math.round(nightlySubtotal * 0.12) : 0
  const monthlyDiscount = nights >= 28 ? Math.round(nightlySubtotal * 0.18) : 0
  const discount = Math.max(weeklyDiscount, monthlyDiscount)
  const serviceFee = Math.round((nightlySubtotal - discount) * 0.11)
  const petFee = guests > 4 && property.petFriendly ? 40 : 0
  const total = Math.max(0, nightlySubtotal - discount + property.cleaningFee + serviceFee + petFee)
  return { nights, seasonalMultiplier, nightlySubtotal, discount, serviceFee, petFee, total }
}

export function getAvailabilityStatus(propertyId: string, date: Date): AvailabilityStatus {
  const found = availability.find(
    (entry) => entry.propertyId === propertyId && format(new Date(entry.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
  )
  return found?.status ?? 'available'
}

export function getMonthAvailability(propertyId: string, month: Date) {
  const start = startOfMonth(month)
  const end = endOfMonth(month)
  return eachDayOfInterval({ start, end }).map((date) => ({
    date,
    status: getAvailabilityStatus(propertyId, date),
    isToday: format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd'),
  }))
}

export function matchesDateWindow(propertyId: string, checkIn: string, checkOut: string) {
  if (!checkIn || !checkOut) return true
  const interval = eachDayOfInterval({ start: new Date(checkIn), end: new Date(checkOut) })
  return interval.every((date) => getAvailabilityStatus(propertyId, date) === 'available')
}

export function sortProperties<T extends Property>(properties: T[], sortBy: SortOption) {
  const sorted = [...properties]
  const byPrice = (property: Property) => (property.isLongTerm ? property.monthlyRate || property.nightlyRate * 30 : property.nightlyRate)
  switch (sortBy) {
    case 'price':
      return sorted.sort((a, b) => byPrice(a) - byPrice(b))
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
    default:
      return sorted.sort((a, b) => b.popularityScore - a.popularityScore)
  }
}

export function filterProperties(properties: Property[], filters: SearchFilters) {
  return sortProperties(
    properties.filter((property) => {
      const locationMatch = filters.location === 'All communities' || property.city === filters.location
      const queryMatch = !filters.query || [property.title, property.city, property.summary, property.description].join(' ').toLowerCase().includes(filters.query.toLowerCase())
      const guestCount = filters.adults + filters.children
      const guestMatch = property.maxGuests >= guestCount
      const petsMatch = filters.pets === 0 || property.petFriendly
      const typeMatch = !filters.rentalTypes.length || filters.rentalTypes.includes(property.type)
      const durationMatch = !filters.duration || property.durationOptions.includes(filters.duration)
      const longTermMatch = !filters.longTermOnly || property.isLongTerm
      const amenityMatch = filters.amenities.every((amenity) => property.amenities.includes(amenity))
      const comparablePrice = property.isLongTerm ? property.monthlyRate || property.nightlyRate * 30 : property.nightlyRate
      const priceMatch = comparablePrice >= filters.priceRange[0] && comparablePrice <= filters.priceRange[1]
      const dateMatch = matchesDateWindow(property.id, filters.checkIn, filters.checkOut)
      return locationMatch && queryMatch && guestMatch && petsMatch && typeMatch && durationMatch && amenityMatch && priceMatch && dateMatch && longTermMatch
    }),
    filters.sortBy,
  )
}

export function buildStructuredData(property?: Property) {
  if (property) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: property.title,
      description: property.description,
      image: property.photos,
      url: 'https://kenaipeninsularentals.com/listing/' + property.id,
      address: {
        '@type': 'PostalAddress',
        streetAddress: property.address,
        addressLocality: property.city,
        addressRegion: 'AK',
        addressCountry: 'US',
      },
      geo: { '@type': 'GeoCoordinates', latitude: property.lat, longitude: property.lng },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: property.rating, reviewCount: property.reviewCount },
      priceRange: formatCurrency(property.nightlyRate) + ' - ' + formatCurrency(property.monthlyRate || property.nightlyRate * 30),
      amenityFeature: property.amenities.map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LodgingBusiness',
        name: 'Kenai Peninsula Rentals',
        url: 'https://kenaipeninsularentals.com',
        description: 'Local-first vacation and long-term rentals across the Kenai Peninsula.',
        areaServed: 'Kenai Peninsula Borough',
      },
      {
        '@type': 'WebSite',
        name: 'Kenai Peninsula Rentals',
        url: 'https://kenaipeninsularentals.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://kenaipeninsularentals.com/browse?query={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }
}

export function withinNextDays(date: string, days: number) {
  return isWithinInterval(new Date(date), {
    start: new Date(),
    end: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  })
}
