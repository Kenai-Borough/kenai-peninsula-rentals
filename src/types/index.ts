export type UserRole = 'guest' | 'host' | 'admin'
export type RentalType = 'cabin' | 'house' | 'apartment' | 'condo' | 'lodge' | 'yurt' | 'glamping' | 'rv-spot'
export type StayDuration = 'nightly' | 'weekly' | 'monthly' | 'long-term'
export type AvailabilityStatus = 'available' | 'booked' | 'blocked'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type SortOption = 'price' | 'rating' | 'newest' | 'popular'
export type ViewMode = 'split' | 'list' | 'map'

export interface Profile {
  id: string
  email: string
  fullName: string
  role: UserRole
  phone: string
  avatarUrl: string
  bio: string
  responseTimeHours: number
  isSuperhost: boolean
  rating: number
  reviewCount: number
  createdAt: string
}

export interface SeasonalPricing {
  id: string
  propertyId: string
  name: string
  startDate: string
  endDate: string
  priceMultiplier: number
  label: string
}

export interface Property {
  id: string
  hostId: string
  title: string
  description: string
  summary: string
  type: RentalType
  address: string
  city: string
  lat: number
  lng: number
  bedrooms: number
  bathrooms: number
  maxGuests: number
  sqft: number
  amenities: string[]
  photos: string[]
  houseRules: string[]
  cancellationPolicy: string
  nightlyRate: number
  weeklyRate: number
  monthlyRate: number
  cleaningFee: number
  minStay: number
  maxStay: number
  isLongTerm: boolean
  petFriendly: boolean
  status: 'draft' | 'active' | 'paused'
  rating: number
  reviewCount: number
  viewCount: number
  featured: boolean
  popularityScore: number
  featuredLabel: string
  hostResponseTime: string
  nearbyAttractions: string[]
  durationOptions: StayDuration[]
  seasonalPricing: SeasonalPricing[]
  createdAt: string
  updatedAt: string
}

export interface AvailabilityDay {
  propertyId: string
  date: string
  status: AvailabilityStatus
  priceOverride?: number
}

export interface Review {
  id: string
  bookingId: string
  reviewerId: string
  revieweeId: string
  propertyId: string
  rating: number
  cleanliness: number
  communication: number
  location: number
  value: number
  comment: string
  createdAt: string
}

export interface Booking {
  id: string
  propertyId: string
  guestId: string
  checkIn: string
  checkOut: string
  guests: number
  totalPrice: number
  cleaningFee: number
  serviceFee: number
  status: BookingStatus
  specialRequests: string
  createdAt: string
}

export interface Message {
  id: string
  bookingId: string
  senderId: string
  receiverId: string
  content: string
  read: boolean
  createdAt: string
}

export interface HostPayout {
  id: string
  hostId: string
  bookingId: string
  amount: number
  status: 'pending' | 'paid'
  paidAt: string
}

export interface LongTermApplication {
  id: string
  propertyId: string
  applicantId: string
  employment: string
  income: string
  references: { name: string; relationship: string }[]
  status: 'submitted' | 'reviewing' | 'approved'
  createdAt: string
}

export interface SearchFilters {
  location: string
  checkIn: string
  checkOut: string
  adults: number
  children: number
  pets: number
  rentalTypes: RentalType[]
  duration: StayDuration | ''
  priceRange: [number, number]
  amenities: string[]
  sortBy: SortOption
  viewMode: ViewMode
  query: string
  longTermOnly: boolean
}

export interface DashboardMetric {
  label: string
  value: string
  detail: string
}

export interface Testimonial {
  name: string
  location: string
  quote: string
  rating: number
}
